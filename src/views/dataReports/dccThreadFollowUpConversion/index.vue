<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="选择经销商店" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-3">
                    <b-form-fieldset horizontal label="年度" :label-cols="4" label-text-align="right">
                        <date-picker format="yyyy" v-model="year"  type="year" @change="yearChange" text='2018' >
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-3">
                    <b-form-fieldset horizontal label="月份" :label-cols="4" label-text-align="right">
                        <b-form-select
                            :plain="true"
                            :options="['01','02','03','04','05','06','07','08','09','10','11','12']"
                            v-model="dccFollowUpCondition.dccMonth"
                            >
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="首次来源渠道" :label-cols="4" label-text-align="right">
                        <b-form-select
                            :options="DCCSupplyTypes" 
                            v-model="dccFollowUpCondition.taskTypeCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="线索创建人" :label-cols="2" label-text-align="right">
                        <search v-model="dccFollowUpCondition.currentTaskOperatorName"
                            :dataList="DccFilterSpecialList"
                            :valueName="'text'"
                            :keyName="'value'"
                            @dataChange="getDccListByName"
                        ></search>
                    </b-form-fieldset>
                </div>
            </div> 
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="searchDCCFollowUpConditions">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <div>
            <b-button size="sm" variant="info" type="button" @click="exportDccTable">导出</b-button>
        </div><br>
        <b-card header="DCC分渠道线索漏斗及转化率" align="center" id="dccTable">
            <div class="table-scrollable row"  >
                <table class="table table-striped table-hover table-bordered col-md-12">
                    <tbody>
                        <tr v-if="shopShowName.length !== 0">
                            <th class="text-center">
                                {{shopShowName}}
                            </th>
                            <th v-for="(month,index) in totalMonth" :key="index" class="text-center"> 
                                {{month}}
                            </th>
                        </tr>
                        <tr v-for="(rowDataList, rowIndex) in DCCFollowUpConditionStatisticsList" :key="rowIndex">
                            <td v-for="(item,index) in rowDataList" :key="index +'row'">{{item.keepLeadsCount}}</td>
                        </tr>
                        <tr v-if="DCCFollowUpConditionStatisticsList.length === 0">
                            <td>暂无数据</td>    
                        </tr>
                    </tbody>
                </table>
            </div>
        </b-card>
    </div>
</template>
<script>

   import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../../common/config'
    import createLog from '../../../common/logger'
    import pagination from '../../../components/pagination/pagination'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import search from "../../../components/search/search";
    import { MessageBox, Message, DatePicker } from 'element-ui'
    import apiUrl from 'common/api-url'
    import {hasBtn} from 'common/com-api'
    import XLSX from "xlsx"
    export default {
        mounted() {
            this.getTaskTypes()
            let today = new Date();
            this.year = today;
         },
        data: function () {
            return {
                config: config,
                year:'',
                dccFollowUpCondition: {
                    salesAreaCodeSet: [],
                    storeCodeSet: [],
                    dccMonth: '',
                    dccYear: '',
                    taskTypeCode:'',
                    currentTaskOperatorName:'',
                    channelName : ''
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                // totalMonth: [],
                shopName: '门店：全国',
                shopShowName: ''
            }
        },
        computed: {
            ...mapState('dccThreadFollowUpConversion', [
                'DCCFollowUpConditionStatisticsList',
                'DCCSupplyTypes',
                'DccSpecialList',
                'DccFilterSpecialList',
                'totalMonth'
            ])
        },
        methods: {
            clear: function() {
                let _this = this
                _this.$data.dccFollowUpCondition = {
                    salesAreaCodeSet: _this.$data.dccFollowUpCondition.salesAreaCodeSet,
                    storeCodeSet: _this.$data.dccFollowUpCondition.storeCodeSet,
                    dccMonth: '',
                    dccYear: '',
                    taskTypeCode:'',
                    currentTaskOperatorName:'',
                    channelName: ''
                }
                _this.$data.year = ''
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.dccFollowUpCondition.salesAreaCodeSet = []
                    sales.forEach((item) => {
                        _this.dccFollowUpCondition.salesAreaCodeSet.push(item.code)
                    })
                } else if (sales.code === 0) {
                    _this.dccFollowUpCondition.salesAreaCodeSet = []
                }
                if (stores instanceof Array) {
                    _this.dccFollowUpCondition.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.dccFollowUpCondition.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.dccFollowUpCondition.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.dccFollowUpCondition.storeCodeSet = []
                    _this.dccFollowUpCondition.storeCodeSet[0] = stores.value
                    if(stores.hasOwnProperty('text')){
                        _this.shopName = '门店：' + stores.text
                    }
                    _this.getDccSpecialist({storeCode: _this.dccFollowUpCondition.storeCodeSet[0]})
                }
            },
            yearChange: function() {
                let _this = this
                if (_this.year != undefined && _this.year != '') {
                    let time = _this.year.getFullYear()
                    _this.dccFollowUpCondition.dccYear = time 
                } else {
                    _this.dccFollowUpCondition.dccYear = ''
                }
            },
            searchDCCFollowUpConditions: function() {
                let _this = this
                let isAll = _this.$data.dccFollowUpCondition.currentTaskOperatorName === "All"
                if (isAll && _this.$data.dccFollowUpCondition.dccMonth.length === 0){
                    Message.closeAll()
                    Message({
                        type: 'warning',
                        message: '请选择月份'
                    })
                    return;
                }
                if (_this.$data.dccFollowUpCondition.storeCodeSet.length !== 1 ) {
                    Message.closeAll()
                    Message({
                        type: 'warning',
                        message: '请选择门店'
                    })
                    return;
                }
                if (_this.$data.dccFollowUpCondition.dccYear.length === 0){
                    Message.closeAll()
                    Message({
                        type: 'warning',
                        message: '请选择年份'
                    })
                    return;
                }
            
                _this.shopShowName = _this.shopName
                let p = {
                    ..._this.$data.dccFollowUpCondition,
                    'currentTaskOperatorName': isAll ? "" : _this.$data.dccFollowUpCondition.currentTaskOperatorName,
                    'modeType': isAll ? 1 : 0
                }
                _this.getDccChannelList(p)
                
            },
            pageChange: function(num) {
                let _this = this
                _this.$data.crmFollowUpCondition.pageStart = num
                _this.queryCRMFollowUpCondition(_this.$data.crmFollowUpCondition) 
            },
            exportDccTable: function (){
                let _this = this;
                let worksheet = XLSX.utils.table_to_book(
                    document.getElementById("dccTable")
                );
                var date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let d = date.getDate();
                let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                let currentTimeStr = year + "-" + month + "-" + d + " " + hour + ":" + minute + ":" + second ;
                XLSX.writeFile(worksheet, "DCC线索跟进表-" + currentTimeStr + ".xlsx");
            },
            getDccListByName: function (dccName){
                let _this = this;
                _this.dealWithDccName(dccName)
            },
            ...mapActions('dccThreadFollowUpConversion', [
                'getTaskTypes',
                'getDccChannelList',
                'getDccSpecialist',
                'dealWithDccName'
            ])
        },
        components: {
            areaqueryshop,
            pagination,
            DatePicker,
            search  
        }
    }
</script>
<style>

</style>