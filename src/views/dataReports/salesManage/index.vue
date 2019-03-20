<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="选择经销商店*" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="日期" :label-cols="4" label-text-align="right">
                        <div class="row">
                            <div class="col-md-6">
                                <date-picker format="yyyy" v-model="year" type="year" @change="yearChange">
                                </date-picker>
                            </div>
                            <div class="col-md-6">
                                <month-picker v-model="salesManagementCollection.salesMonths"></month-picker>
                            </div>
                        </div>
                    </b-form-fieldset>
                </div>
<!--                 <div class="col-md-6">
                    <b-form-fieldset horizontal label="日期" :label-cols="4" label-text-align="right">
                        <el-date-picker 
                            v-model="dateVal"
                            type="daterange"
                            @change="yearChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </b-form-fieldset>
                </div> -->
                <template v-if="!config.isShowFactory">
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="厂商" :label-cols="4" label-text-align="right">
                                <b-form-select v-model="salesManagementCollection.carFactoryCode" :options="factoryCodes" @input="factoryCodesChange">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                </template>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="品牌" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="salesManagementCollection.carBrandCode" :options="brandCodes" @input="brandCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车系" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="salesManagementCollection.carSeriesCode" :options="seriesCodes">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售顾问" label-text-align="right" :label-cols="4">
                        <search v-model="salesManagementCollection.scCode" :dataList="filterSCList" :valueName="'text'" :keyName="'value'" @comScroll="getSCList" @dataChange="getSCListByName" @clickShowBack="checkStore"></search>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="getSalesManageOrderReports">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div>
                <b-button v-if="exportTabBtn" size="sm" variant="info" type="button" @click="exportTab">导出</b-button>
            </div>
            <div class="col-md-12 text-center table-title">销售管理报表</div>
            <div class="table-scrollable">
                <table class="table table-striped table-hover table-bordered" id="dataTable">
                   <template v-if="dataList.months.length > 0">
                        <thead>
                            <tr>
                                <td colspan="2">{{ salesManagementOrder.storeName + '   ' + salesManagementOrder.salesYear + '年度' }}</td>
                                <td v-for="(month, index) in dataList.months" :key="index">
                                    {{ month }}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">车型: {{ ((!config.isShowFactory && (salesManagementOrder.carFactoryCode == '')) || (config.isShowFactory && (salesManagementOrder.carBrandCode == ''))) ? '全部' : salesManagementOrder.carFactoryName + ' ' + salesManagementOrder.carBrandName + ' ' + salesManagementOrder.carSeriesName }}</td>
                                <td v-for="(month, index) in dataList.months" :key="index">
                                    数量
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="max-td-width" rowspan="17">运营</td>
                                <td>进店线索数</td>
                                <td v-for="(leadCount, index) in dataList.leadCountList" :key="index">
                                    {{ leadCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>本月新增订单数</td>
                                <td v-for="(orderCount, index) in dataList.orderCountList" :key="index">
                                    {{ orderCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>本月退订数</td>
                                <td v-for="(ubCount, index) in dataList.ubCountList" :key="index">
                                    {{ ubCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>本月订单审批数</td>
                                <td v-for="(wfCount, index) in dataList.wfCountList" :key="index">
                                    {{ wfCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>新增开票数</td>
                                <td v-for="(invoiceCount, index) in dataList.invoiceCountList" :key="index">
                                    {{ invoiceCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>退票数</td>
                                <td v-for="(invoiceOutCount, index) in dataList.invoiceOutCountList" :key="index">
                                    {{ invoiceOutCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>交车数</td>
                                <td v-for="(deliveryCarCount, index) in dataList.deliveryCarCountList" :key="index">
                                    {{ deliveryCarCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>净金融台数</td>
                                <td v-for="(financialOrderNoCount, index) in dataList.financialOrderNoCountList" :key="index">
                                    {{ financialOrderNoCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>净保险台数</td>
                                <td v-for="(insuranceOrderNoCount, index) in dataList.insuranceOrderNoCountList" :key="index">
                                    {{ insuranceOrderNoCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>净延保台数</td>
                                <td v-for="(extensionCount, index) in dataList.extensionCountList" :key="index">
                                    {{ extensionCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>净精品台数</td>
                                <td v-for="(skuCount, index) in dataList.skuCountList" :key="index">
                                    {{ skuCount }}
                                </td>
                            </tr>
                            <tr>
                                <td>进店线索订单率</td>
                                <td v-for="(leadRate, index) in dataList.leadRateList" :key="index">
                                    {{ leadRate }}
                                </td>
                            </tr>
                            <tr>
                                <td>订单开票率</td>
                                <td v-for="(invoiceRate, index) in dataList.invoiceRateList" :key="index">
                                    {{ invoiceRate }}
                                </td>
                            </tr>
                            <tr>
                                <td>金融渗透率</td>
                                <td v-for="(financialOrderRate, index) in dataList.financialOrderRateList" :key="index">
                                    {{ financialOrderRate }}
                                </td>
                            </tr>
                            <tr>
                                <td>保险渗透率</td>
                                <td v-for="(insuranceOrderRate, index) in dataList.insuranceOrderRateList" :key="index">
                                    {{ insuranceOrderRate }}
                                </td>
                            </tr>
                            <tr>
                                <td>延保渗透率</td>
                                <td v-for="(extensionRate, index) in dataList.extensionRateList" :key="index">
                                    {{ extensionRate }}
                                </td>
                            </tr>
                            <tr>
                                <td>精品渗透率</td>
                                <td v-for="(skuRate, index) in dataList.skuRateList" :key="index">
                                    {{ skuRate }}
                                </td>
                            </tr>
                            <tr>
                                <td cols="20">
                                </td>
                            </tr>

                            <tr v-for="(gp, index) in gpList" :key="index">
                                <template v-if="index == 0">
                                    <td  class="max-td-width" rowspan="1000">盈利</td>
                                    <td>{{ gp }}</td>
                                    <td v-for="(gpValue, newindex) in dataList[gp + 'List']" :key="newindex">
                                        {{ gpValue }}
                                    </td>
                                </template>
                                <template v-else>
                                    <td>{{ gp }}</td>
                                    <td v-for="(gpValue, newindex) in dataList[gp + 'List']" :key="newindex">
                                        {{ gpValue }}
                                    </td>
                                </template>
                            </tr>
                        </tbody>
                    </template>
                    <template v-else>
                        <tbody>
                            <tr>
                                <td cols="12">
                                    暂无数据...
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </b-card>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {
        mapState,
        mapGetters,
        mapActions,
mapMutations
    } from "vuex";
    import config from "../../../common/config";
    import common from "../../../common/common";
    import XLSX from "xlsx";
    import pagination from "../../../components/pagination/pagination";
    import areaqueryshop from "components/iris-areaqueryshop";
    import monthPicker from "components/monthPicker";
    import {
        MessageBox,
        Message,
        DatePicker
    } from "element-ui";
    import search from "../../../components/search/search";
    import apiUrl from 'common/api-url'
    import {hasBtn} from 'common/com-api'
    Vue.use(DatePicker)
    export default {
        mounted() {
            window.vue = this
            let _this = this
            if (!config.isShowFactory) {
                this.queryCarInfoByCarSearch({
                    code: '',
                    level: 1,
                    type: config.car.none
                })
            } else {
                this.queryCarInfoByCarSearch({
                    code: '',
                    level: 2,
                    type: config.car.factoryRefCode
                })
            }
            setTimeout(() => {
                console.log(this.gpList, 113)
            }, 3000)
        },
        data: function() {
            return {
                isSearch: false,
                config: config,
                year: '',
                scName: '',
                dateVal: '',
                months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                salesManagementCollection: {
                    carFactoryCode: '',
                    carFactoryName: '',
                    carBrandCode: '',
                    carBrandName: '',
                    carSeriesCode: '',
                    carSeriesName: '',
                    storeName: '',
                    storeCode: '',
                    salesYear: '',
                    salesMonthStart: '', //开始时间
                    salesMonthEnd: '', //结束时间
                    salesMonths: [],
                    scCode: '',
                }
            }
        },
        methods: {
            clear: function() {
                let _this = this
                _this.dateVal = []
                _this.$data.salesManagementCollection = {
                    carFactoryCode: '',
                    carBrandCode: '',
                    carSeriesCode: '',
                    // salesAreaCode: _this.$data.salesManagementCollection.salesAreaCode,
                    storeCode: _this.$data.salesManagementCollection.storeCode,
                    storeName: '',
                    salesYear: '',
                    salesMonthStart: '', //开始时间
                    salesMonthEnd: '', //结束时间
                    salesMonths: [],
                    scCode: ''
                }
                _this.year = ''

                this.setBrandCodes({options: []})
                this.setModelCodes({options: []})
            },
            checkStore: function() {
                if (this.$data.salesManagementCollection.storeCode !== '') {
                    return true;
                } else {
                    Message.closeAll();
                    Message({
                        type: "warning",
                        message: "请选择门店"
                    });
                    return false;
                }
            },
            checkYear: function() {
                if (this.$data.salesManagementCollection.salesYear !== "") {
                // if (this.$data.salesManagementCollection.salesMonthStart !== "") {
                    return true;
                } else {
                    Message.closeAll();
                    Message({
                        type: "warning",
                        message: "请选择年份"
                    });
                    return false;
                }
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (stores.value === 0) {
                    _this.salesManagementCollection.storeCode = ''
                    _this.salesManagementCollection.storeName = ''
                } else if (stores.hasOwnProperty('value')) {
                    _this.salesManagementCollection.storeCode = stores.value
                    _this.salesManagementCollection.storeName = stores.text
                }
                if (_this.salesManagementCollection.storeCode != '') {
                    _this.getSCList()
                    if (!config.isShowFactory) {
                        this.queryCarInfoByCarSearch({
                            storeCode: _this.salesManagementCollection.storeCode,
                            code: '',
                            level: 1,
                            type: config.car.none
                        })
                    } else {
                        this.queryCarInfoByCarSearch({
                            storeCode: _this.salesManagementCollection.storeCode,
                            code: '',
                            level: 2,
                            type: config.car.factoryRefCode
                        })
                    }
                }
            },
            yearChange: function(val) {
                // this.salesManagementCollection.salesMonthStart = this.dateVal[0] ? common.eleTimeFormatim2(this.dateVal[0]).slice(0, 10) : '';
                // this.salesManagementCollection.salesMonthEnd = this.dateVal[1] ? common.eleTimeFormatim2(this.dateVal[1]).slice(0, 10) : '';
                let _this = this
                if (_this.year != undefined && _this.year != "") {
                    let time = _this.year.getFullYear();
                    _this.salesManagementCollection.salesYear = time;
                    _this.salesManagementCollection.salesMonths = []
                } else {
                    _this.salesManagementCollection.salesYear = "";
                }
            },
            exportTab: function() {
                if(this.isSearch){
                    let _this = this
                    _this.exportToExcel(_this.$data.salesManagementCollection)
                }else{
                    Message.closeAll();
                    Message({
                       type: 'warning',
                       message: '请查询数据'
                    }) 
                }
            },
            factoryCodesChange: function() {
                
                if (!this.salesManagementCollection.carFactoryCode) return
                
                let _this = this
                _this.queryCarInfoByCarSearch({
                    storeCode: _this.salesManagementCollection.storeCode,
                    code: _this.salesManagementCollection.carFactoryCode,
                    level: 2,
                    type: config.car.factoryRefCode
                })
            },
            brandCodesChange: function() {
                if (!this.salesManagementCollection.carBrandCode) return

                let _this = this
                _this.queryCarInfoByCarSearch({
                    storeCode: _this.salesManagementCollection.storeCode,
                    code: _this.salesManagementCollection.carBrandCode,
                    level: 4,
                    type: config.car.brandRefCode
                })
            },
            getSalesManageOrderReports: function() {
                this.isSearch = true
                let _this = this
                if (this.checkStore() && this.checkYear()) {
                    let index = _this.factoryCodes.findIndex((item) => {
                        return (item.value === _this.$data.salesManagementCollection.carFactoryCode)
                    })
                    if (index != -1) {
                        _this.$data.salesManagementCollection.carFactoryName = _this.factoryCodes[index].text
                    }
                    index = _this.brandCodes.findIndex((item) => {
                        return (item.value === _this.$data.salesManagementCollection.carBrandCode)
                    })
                    if (index != -1) {
                        _this.$data.salesManagementCollection.carBrandName = _this.brandCodes[index].text
                    }
                    index = _this.seriesCodes.findIndex((item) => {
                        return (item.value === _this.$data.salesManagementCollection.carSeriesCode)
                    })
                    if (index != -1) {
                        _this.$data.salesManagementCollection.carSeriesName = _this.seriesCodes[index].text
                    }
                    _this.getSalesManageOrderList(_this.$data.salesManagementCollection);
                }
            },
            getSCList: function() {
                let _this = this
                _this.getSClist({
                    empCnName: _this.scName,
                    storeCode: _this.$data.salesManagementCollection.storeCode
                })
            },
            getSCListByName: function(scName) {
                let _this = this
                _this.scName = scName
                _this.getSClist({
                    empCnName: _this.scName,
                    storeCode: _this.$data.salesManagementCollection.storeCode
                })
            },
            ...mapActions('salesManageOrderReports', [
                'getSalesManageOrderList',
                'exportToExcel',
                'getSClist'
            ]),
            ...mapActions('carInfo', [
                'queryCarInfoByCarSearch'
            ]),
            ...mapMutations({
                setBrandCodes: 'carInfo/CARINFO_GET_BRAND_CODES',
                setModelCodes: 'carInfo/CARINFO_GET_SERIES_CODES'
            })
        },
        computed: {
            exportTabBtn(){
                return hasBtn(apiUrl.salesManagerOrder.exportToExcel)
            },
            showFactory: function() {
                return !config.isShowFactory
            },
            ...mapState('salesManageOrderReports', [
                'gpList',
                'filterSCList',
                'salesManagementOrder'
            ]),
            ...mapState('carInfo', [
                'factoryCodes',
                'brandCodes',
                'seriesCodes',
                'modelCodes',
                'carCodes'
            ]),
            ...mapGetters('salesManageOrderReports', [
                'dataList'
            ])
        },
        components: {
            areaqueryshop,
            pagination,
            DatePicker,
            monthPicker,
            search
        }
    }
</script>
<style lang="scss" @scoped>
    .table-title {
        font-size: 20px;
    }
    .max-td-width {
        width: 120px !important;
    }
</style>
