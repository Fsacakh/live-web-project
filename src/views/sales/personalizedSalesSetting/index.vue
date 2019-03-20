<template>
    <div class="animated">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="生产号" :label-cols="4" label-text-align="right">
                        <b-form-input v-model.trim="personalizedSalesSetting.productionCode">
                        </b-form-input>    
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" :label-cols="4" label-text-align="right">
                        <b-form-input v-model.trim="personalizedSalesSetting.carVinNo">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="厂商" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="personalizedSalesSetting.factoryCode" :options="factoryCodes" @input="factoryCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="品牌" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="personalizedSalesSetting.brandCode" :options="brandCodes" @input="brandCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车系" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="personalizedSalesSetting.seriesCode" :options="seriesCodes" @input="seriesCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车型" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="personalizedSalesSetting.modelCode" :options="modelCodes" @input="modelCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车款" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="personalizedSalesSetting.carCode" :options="carCodes">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="所属门店" :label-cols="4" label-text-align="right">
                        <areaqueryshop @select-change="selectStores"></areaqueryshop>
                    </b-form-fieldset>
                </div>
            </div>
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
                        {{ data.item.standardMSRP ? data.item.standardMSRP.toFixed(2) : '' }}
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
                        {{ data.item.manufacturerTarget ? (data.item.manufacturerTarget-0).toFixed(0) : '' }}
                    </template>
                    <template slot="groupTarget" slot-scope="data">
                        {{ (data.item.groupTarget) ? (data.item.groupTarget-0).toFixed(0) : '' }}
                    </template>
                    <template slot="updateTimeStr" slot-scope="data">
                        {{ data.item.updateTimeStr | switchDate }}
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
    import api from 'common/api'
    import { PERSONALIZED_SALES_SETTING } from 'common/ref-code'
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
                uploadUrl: config.sales.personalizedSalesSetting.uploadUrl,
                addParams: {
                    relationCode: '',
                    singleFlag: '1',
                    businessType: ''
                },
                showBack: {
                    orderNo: '',
                    storeCode: ''
                },
                personalizedSalesSetting: {
                    salesFlag: 'salesSIValue',
                    storeCodeSet: [],
                    carVinNo: "",
                    productionCode: "",
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
                    productionCode: {
                        label: '生产号'
                    },
                    carVinNo: {
                        label: '车架号'
                    },
                    manuSellSI: {
                        label: '厂家批售SI'
                    },
                    retailSI: {
                        label: '厂家零售SI'
                    },
                    cashDiscountUpperLimit: {
                        label: '现金折扣上限'
                    },
                    comGrossProfit: {
                        label: '综合毛利'
                    },
                    grossProfitRate: {
                        label: '毛利率(%)'
                    },
                    dealerUpperCostLimit: {
                        label: '经销商随车成本上限'
                    },
                    standardAreaLimit: {
                        label: '标准区域限价(SNP) (含税)'
                    },
                    updateTimeStr: {
                        label: '更新时间'
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
            //查询表格
            queryExHallList(){
                api.dataReport.selectByRelationCode({
                    relationCode: PERSONALIZED_SALES_SETTING
                }, (res) => {
                    this.excelLink = res.data.obj.list[0].filePath;
                })
            },
            downloadExcel(){
                window.location.href = this.excelLink;
            },
            clear: function() {
                let _this = this
                _this.$data.personalizedSalesSetting = {
                    storeCodeSet: _this.$data.personalizedSalesSetting.storeCodeSet,
                    carVinNo: "",
                    productionCode: "",
                    factoryCode: '',
                    brandCode: '',
                    seriesCode: '',
                    modelCode: '',
                    carCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1,
                    salesFlag: 'salesSIValue'
                },
                this.setBrandCodes({options: []})
                this.setSeriesCodes({options: []})
                this.setModelCodes({options: []})
                this.setCarCodes({options: []})
            },
            search: function() {
                let _this = this
                _this.getSalesTargetPlanList(_this.$data.personalizedSalesSetting)
            },
            pageChange: function(num) {
                let _this = this
                _this.$data.personalizedSalesSetting.pageStart = num
                _this.search()
            },
            analysisExcel: function(res) {
                let _this = this
                if (res.data.code === 'success') {
                    _this.clear()
                    _this.search()
                }
            },
            factoryCodesChange: function() {
                if (!this.personalizedSalesSetting.factoryCode) return
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.personalizedSalesSetting.factoryCode,
                    level: 2,
                    type: config.car.factoryRefCode
                })
            },
            brandCodesChange: function() {
                if (!this.personalizedSalesSetting.brandCode) return
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.personalizedSalesSetting.brandCode,
                    level: 4,
                    type: config.car.brandRefCode
                })
            },
            seriesCodesChange: function() {
                if (!this.personalizedSalesSetting.seriesCode ) return
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.personalizedSalesSetting.seriesCode,
                    level: 8,
                    type: config.car.seriesRefCode
                })
            },
            modelCodesChange: function() {
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.personalizedSalesSetting.modelCode,
                    level: 64,
                    type: config.car.modelRefCode
                })
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (stores instanceof Array) {
                    _this.personalizedSalesSetting.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.personalizedSalesSetting.storeCodeSet.push(item.value)
                    })
                    _this.showBack.storeCode = _this.personalizedSalesSetting.storeCodeSet[0]
                } else if (stores.value === 0) {
                    _this.personalizedSalesSetting.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.personalizedSalesSetting.storeCodeSet = []
                    _this.personalizedSalesSetting.storeCodeSet[0] = stores.value
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
            upload,
            DatePicker,
            Pagination,
            areaqueryshop
        }
    }
</script>