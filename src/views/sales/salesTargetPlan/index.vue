<template>
    <div class="animated">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="所属门店" :label-cols="4" label-text-align="right">
                        <areaqueryshop @select-change="selectStores"></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="年度" :label-cols="4" label-text-align="right">
                        <date-picker v-model="year" format="yyyy" type="year" @change="dataChange">
                        </date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="月份" :label-cols="4" label-text-align="right">
                        <b-form-select
                            :plain="true"
                            :options="[1,2,3,4,5,6,7,8,9,10,11,12]"
                            v-model="salesTargetPlan.month">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <!-- 车型组件 -->
            <IrisCar :col="2" @callBack="backSkuCar" ref="car"></IrisCar>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="search">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div v-show="addParams.relationCode != ''">
                <upload buttonName="导入" :addParams="addParams" :url="uploadUrl" :analysisExcel="analysisExcel" :showBack="showBack"></upload>
                <b-button size="sm" variant="info" type="button" v-show="false">导出</b-button>
                <b-button size="sm" type="button" @click="downloadExcel">预设模板导出</b-button>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="salesTargetPlanList" :fields="fields">
                    <template slot="standardMSRP" slot-scope="data">
                        {{ data.item.standardMSRP ? data.item.standardMSRP.toFixed(2): '' }}
                    </template>
                    <template slot="standardCost" slot-scope="data">
                        {{ data.item.standardCost ? data.item.standardCost.toFixed(2) : '' }}
                    </template>
                    <template slot="comGrossProfit" slot-scope="data">
                        {{ data.item.comGrossProfit ? data.item.comGrossProfit.toFixed(2) : '' }}
                    </template>
                    <template slot="cashDiscountUpperLimit" slot-scope="data">
                        {{ data.item.cashDiscountUpperLimit ? data.item.cashDiscountUpperLimit.toFixed(2) : '' }}
                    </template>
                    <template slot="dealerUpperCostLimit" slot-scope="data">
                        {{ data.item.dealerUpperCostLimit ? data.item.dealerUpperCostLimit.toFixed(2) : '' }}
                    </template>
                    <template slot="standardAreaLimit" slot-scope="data">
                        {{ data.item.standardAreaLimit ? data.item.standardAreaLimit.toFixed(2) : '' }}
                    </template>
                    <template slot="retailSI" slot-scope="data">
                        {{ data.item.retailSI ? data.item.retailSI.toFixed(2) : '' }}
                    </template>
                    <template slot="manuSellSI" slot-scope="data">
                        {{ data.item.manuSellSI ? data.item.manuSellSI.toFixed(2) : '' }}
                    </template>
                    <template slot="manufacturerTarget" slot-scope="data">
                        {{ data.item.manufacturerTarget ? (data.item.manufacturerTarget - 0).toFixed(0) : '' }}
                    </template>
                    <template slot="groupTarget" slot-scope="data">
                        {{ data.item.groupTarget ? (data.item.groupTarget - 0).toFixed(0) : '' }}
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination class="pull-right"
                 @page-change="pageChange"
                 :page-no="pager.pageNo"
                 :page-size="pager.pageSize"
                 :total-result="pager.total"
                 :total-pages="pager.totalPages">
            </pagination>
        </b-card>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex'
    import config from '../../../common/config'
    import {
        MessageBox,
        Message,
        DatePicker
    } from 'element-ui'
    import upload from 'components/iris-upload'
    import Pagination from 'components/pagination/pagination'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import IrisCar from 'components/iris-car'
    import api from 'common/api'
    import { VEHICLESALES_TARGET } from 'common/ref-code'
    export default {
        mounted() {
            let _this = this
            _this.getSalesTargetPlanCode({
                callback: (salesTargetPlanCode) => {
                    _this.addParams.relationCode = salesTargetPlanCode
                    _this.showBack.orderNo = salesTargetPlanCode
                }
            })
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
            this.queryExHallList();
        },
        data: function() {
            return {
                //导出表格链接
                excelLink: '',
                uploadUrl: config.sales.salesTargetPlan.uploadUrl,
                year: null,
                addParams: {
                    relationCode: '',
                    singleFlag: '1',
                    businessType: '',
                },
                showBack: {
                    orderNo: '',
                    storeCode: '',
                },
                salesTargetPlan: {
                    salesFlag: 'salesTarget',
                    storeCodeSet: [],
                    year: '',
                    month: '',
                    factoryCode: '',
                    brandCode: '',
                    seriesCode: '',
                    modelCode: '',
                    carCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                fields: {
                    factoryName: {
                        label: '厂家'
                    },
                    brandName: {
                        label: '品牌'
                    },
                    seriesName: {
                        label: '车系'
                    },
                    modelName : {
                        label: '车型'
                    },
                    displayName: {
                        label: '车款'
                    },
                    standardMSRP: {
                        label: '标准MSRP'
                    },
                    standardCost: {
                        label: '标准成本'
                    },
                    comGrossProfit: {
                        label: '综合毛利'
                    },
                    grossProfitRate: {
                        label: '毛利率(小数)'
                    },
                    cashDiscountUpperLimit: {
                        label: '现金折扣上限'
                    },
                    dealerUpperCostLimit: {
                        label: '经销商随车成本上限'
                    },
                    standardAreaLimit: {
                        label: '标准区域限价(SNP) (含税)'
                    },
                    retailSI: {
                        label: '厂家零售SI'
                    },
                    manuSellSI: {
                        label: '厂家批售SI'
                    },
                    manufacturerTarget: {
                        label: '厂家目标'
                    },
                    groupTarget: {
                        label: '集团目标'
                    }
                }
            }
        },
        computed: {
            ...mapState('salesTargetPlan', [
                'salesTargetPlanList',
                'pager'
            ]),
            ...mapState('carInfo', [
                'factoryCodes',
                'brandCodes',
                'seriesCodes',
                'modelCodes',
                'carCodes'
            ])
        },
        methods: {
            //车型车款取值
            backSkuCar(val) {
                this.salesTargetPlan.factoryCode = val.factoryCode     //厂家
                this.salesTargetPlan.brandCode = val.brandCode         //品牌
                this.salesTargetPlan.seriesCode = val.seriesCode       //车系
                this.salesTargetPlan.modelCode = val.modelCode         //车型
                this.salesTargetPlan.carCode = val.carCode                //车款
            },
            //查询表格
            queryExHallList(){
                api.dataReport.selectByRelationCode({
                    relationCode: VEHICLESALES_TARGET,
                }, (res) => {
                    this.excelLink = res.data.obj.list[0].filePath;
                })
            },
            downloadExcel(){
                window.location.href = this.excelLink;
            },
            clear: function() {
                let _this = this
                _this.$data.salesTargetPlan = {
                    storeCodeSet: _this.$data.salesTargetPlan.storeCodeSet,
                    year: '',
                    month: '',
                    factoryCode: '',
                    brandCode: '',
                    seriesCode: '',
                    modelCode: '',
                    carCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1,
                    salesFlag: 'salesTarget',
                }
                // 清空车辆信息
                _this.$refs.car.clear();
                _this.salesTargetPlan.factoryCode = ''       //厂家
                _this.salesTargetPlan.brandCode = ''         //品牌
                _this.salesTargetPlan.seriesCode = ''        //车系
                _this.salesTargetPlan.modelCode = ''         //车型
                _this.salesTargetPlan.carCode = ''           //车款
                _this.$data.year = ''
                this.setBrandCodes({options: []})
                this.setSeriesCodes({options: []})
                this.setModelCodes({options: []})
                this.setCarCodes({options: []})
            },
            search: function() {
                let _this = this
                _this.getSalesTargetPlanList(_this.$data.salesTargetPlan)
            },
            pageChange: function(num) {
                let _this = this
                _this.$data.salesTargetPlan.pageStart = num
                _this.search()
            },
            analysisExcel: function(res) {
                let _this = this
                if (res.data.code === 'success') {
                    _this.clear()
                    _this.search()
                }
            },
            dataChange: function() {
                let _this = this
                if (_this.year != undefined && _this.year != '') {
                    let time = _this.year.getFullYear()
                    _this.salesTargetPlan.year = time
                } else {
                    _this.salesTargetPlan.year = ''
                }
            },
            factoryCodesChange: function() {

                if (!this.salesTargetPlan.factoryCode) return

                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.salesTargetPlan.factoryCode,
                    level: 2,
                    type: config.car.factoryRefCode
                })
            },
            brandCodesChange: function() {

                if (!this.salesTargetPlan.brandCode) return

                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.salesTargetPlan.brandCode,
                    level: 4,
                    type: config.car.brandRefCode
                })
            },
            seriesCodesChange: function() {
                if (!this.salesTargetPlan.seriesCode ) return
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.salesTargetPlan.seriesCode,
                    level: 8,
                    type: config.car.seriesRefCode
                })
            },
            modelCodesChange: function() {

                if (!this.salesTargetPlan.modelCode) return

                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.salesTargetPlan.modelCode,
                    level: 64,
                    type: config.car.modelRefCode
                })
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (stores instanceof Array) {
                    _this.salesTargetPlan.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.salesTargetPlan.storeCodeSet.push(item.value)
                    })
                    _this.showBack.storeCode = _this.salesTargetPlan.storeCodeSet[0]
                } else if (stores.value === 0) {
                    _this.salesTargetPlan.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.salesTargetPlan.storeCodeSet = []
                    _this.salesTargetPlan.storeCodeSet[0] = stores.value
                    _this.showBack.storeCode = stores.value
                }
            },
            ...mapActions('salesTargetPlan', [
                'getSalesTargetPlanCode',
                'getSalesTargetPlanList'
            ]),
            ...mapActions('carInfo', [
                'queryCarInfoByCarSearch'
            ]),
            ...mapMutations({
                setBrandCodes: 'carInfo/CARINFO_GET_BRAND_CODES',
                setSeriesCodes: 'carInfo/CARINFO_GET_SERIES_CODES',
                setModelCodes: 'carInfo/CARINFO_GET_MODEL_CODES',
                setCarCodes: 'carInfo/CARINFO_GET_CAR_CODES',
                resetSalesTargetPlanList: 'salesTargetPlan/RESET_SALES_TARGET_PLAN_LIST',
                resetPager: 'salesTargetPlan/RESET_PAGER'
            })
        },
        beforeRouteLeave(to, from, next) {
            this.clear()
            this.resetSalesTargetPlanList({data: []})
            this.resetPager({pager: {
                pageNo: 1,
                pageSize: 15,
                total: 0,
                totalPages: 0
            }})
            next()
        },
        components: {
            Pagination,
            upload,
            DatePicker,
            areaqueryshop,
            IrisCar
        }
    }
</script>
