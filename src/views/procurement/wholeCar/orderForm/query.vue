<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset label="选择经销商店" :label-cols="4" horizontal class="text-right">
                            <areaqueryshop ref="areaqueryshop" :reset="storeShow" :readonly="isforbidden"  @select-change="selectedfun"></areaqueryshop>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="收货仓库" :label-cols="4" class="text-right">
                            <b-form-select v-model="queryParams.whCode" :options="entreList"></b-form-select>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="采购单号" :label-cols="4" class="text-right">
                            <b-form-input
                            v-model="queryParams.orderNo"
                            type="text"
                            :state="judgeState"
                            aria-describedby="input-help input-feeback"
                            placeholder=""/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="创建日期" label-text-align="right" :label-cols="4">
                            <date-picker
                                @change="onDateChange"
                                format="yyyy-MM-dd"
                                v-model="date"
                                type="daterange"
                                :editable="false"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                >
                            </date-picker>
                        </b-form-fieldset>
                    </div>
                </div>
                <search-btn @reset="reset" @query="query"></search-btn>
            </b-card>
        </div>
    </div>
</template>
<script>
import SearchBtn from 'components/searchBtn/searchBtn'
import api from 'common/api'
import config from 'common/config'
import { MessageBox, Message,DatePicker } from 'element-ui'
import areaqueryshop from 'components/iris-areaqueryshop/'
import { format} from 'common/com-api'
export default {
    components: {
        SearchBtn,
        DatePicker,
        areaqueryshop
    },
    props: {
        giveData: {
            type: Function,
            default: function() {}
        }
    },
    data() {
        return {
            orderJudge: false,
            sureJudge: false,
            date:"",
            storeShow: false,
            entreList: [],
            queryParams: {
                orderType: '0',
                orderNo: '',
                skuCode: '',
                carFactoryCode: '',
                carBrandCode: '',
                carSeriesCode: '',
                carModelCode: '',
                storeCode: '',
                storeCodeSet: [],
                whCode: '',
                createTimeFrom:'',
                createTimeTo:'',
            },
            tableData: '',
            isforbidden: false,
            judgeState: null,
            pageStart: 1
        }
    },
    methods: {
        downLoadList: function() {
            api.supplyChain.procurement.downloadOrder(this.queryParams, res => {
                if(res.data.code == 'success') {
                    let path = res.data.obj
                    window.location.href = path
                }
            })
        },
        onDateChange(date){
            const _this = this
                if(_this.date[0]) {
                    let timeOne = _this.date[0]
                    let timeTwo = _this.date[1]
                    _this.queryParams.createTimeFrom = format(timeOne) + " 00:00:00"
                    _this.queryParams.createTimeTo = format(timeTwo) + " 23:59:59"
                }else {
                    _this.queryParams.createTimeFrom = ''
                    _this.queryParams.createTimeTo = ''
                }
        },
        query() {
            let _this = this
            _this.judgeState = null
            const option = {
                'orderNo': _this.queryParams.orderNo,
                'orderType': _this.queryParams.orderType,
                'storeCodeSet': _this.queryParams.storeCodeSet,
                'storeCode': _this.queryParams.storeCode,
                'whCode': _this.queryParams.whCode,
                'createTimeFrom': _this.queryParams.createTimeFrom,
                'createTimeTo': _this.queryParams.createTimeTo,
                'pageStart': _this.pageStart,
                'pageNums': config.pageNums
            }
            api.supplyChain.procurement.queryWholeCarByPages(option, function(res){
                if(res.data.code === 'success') {
                    _this.giveData(res, _this.queryParams)
                }
            })
            // }
        },
        reset() {
            this.queryParams.orderNo = ''
            this.queryParams.skuCode = ''
            this.queryParams.carFactoryCode = ''
            this.queryParams.carBrandCode = ''
            this.queryParams.carSeriesCode = ''
            this.queryParams.carModelCode = ''
            this.queryParams.whCode = ''
            this.queryParams.createTimeFrom = ''
            this.queryParams.createTimeTo = ''
            this.storeShow = true
            this.date = ''
            this.entreList = []
            this.queryParams.storeCode = ''
            this.queryParams.storeCodeSet = []
            this.$refs.areaqueryshop.reset()
        },
        selectedfun(sales, stores){
            let _this = this
            //在这里可以获取到经销商店的选择数据
            let options = {
                'storeCodeSet': []
            }
            if (stores instanceof Array) {
                stores.forEach((item) => {
                    options.storeCodeSet.push(item.value)
                    _this.$data.queryParams.storeCodeSet.push(item.value)
                })
            } else if (stores.value === 0) {
                options.storeCodeSet = []
                _this.$data.queryParams.storeCode = ''
                _this.$data.queryParams.storeCodeSet = []
            } else if (stores.hasOwnProperty('value')) {
                options.storeCodeSet = []
                options.storeCodeSet[0] = stores.value
                _this.$data.queryParams.storeCode = stores.value
                _this.$data.queryParams.storeCodeSet[0] = stores.value
            }
            options.warehouseTypeFlag = 1;
            // 根据经销商店获取仓库
            if (options.storeCodeSet.length > 0) {
              api.supplyChain.procurement.getEntrepot(options, function(res){
                if(res.data.code === 'success') {
                    const array = res.data.obj
                    _this.entreList = [];
                    for(var i =0; i< array.length; i++) {
                        let obj = {}
                        obj.text = array[i].warehouseName
                        obj.value = array[i].warehouseCode
                        _this.entreList.push(obj)
                    }
                }
              })
            }
        },
    }
}
</script>
