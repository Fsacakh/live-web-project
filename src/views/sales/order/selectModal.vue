<template>
    <b-modal title="选择车辆" v-model="showModal" no-close-on-backdrop no-close-on-esc size="lg" button-size="sm" @hidden="hideModal" @ok="commitCarInfoList" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="门店:" label-text-align="right" :label-cols="4">
                    <areaqueryshop ref="areaqueryshop" :storeAll="true" @select-change="selectStores" readonly></areaqueryshop>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6" v-if="showFactory">
                <b-form-fieldset horizontal label="厂家:" label-text-align="right" :label-cols="4">
                    <b-form-select v-model.trim="skuInfo.carFactoryCode" :options="factoryCodes" @input="factoryCodesChange" disabled></b-form-select>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="品牌:" label-text-align="right" :label-cols="4">
                    <b-form-select v-model.trim="skuInfo.carBrandCode" :options="brandCodes" @input="brandCodesChange" disabled></b-form-select>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="车系:" label-text-align="right" :label-cols="4">
                    <b-form-select v-model.trim="skuInfo.carSeriesCode" :options="seriesCodes" @input="seriesCodesChange" disabled></b-form-select>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="车型:" label-text-align="right" :label-cols="4">
                    <b-form-select v-model.trim="skuInfo.carModelCode" :options="modelCodes" @input="modelCodesChange" disabled></b-form-select>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="车款:" label-text-align="right" :label-cols="4">
                    <b-form-select v-model.trim="skuInfo.carCode" :options="carCodes" disabled></b-form-select>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="SKU编号:" label-text-align="right" :label-cols="4">
                    <b-form-input v-model.trim="skuInfo.skuCode"></b-form-input>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="车架号:" label-text-align="right" :label-cols="4">
                    <b-form-input v-model.trim="skuInfo.carVinNo"></b-form-input>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="生产号:" label-text-align="right" :label-cols="4">
                    <b-form-input v-model.trim="skuInfo.productionCode"></b-form-input>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="pull-right">
                    <b-button size="sm" @click="clear">重置</b-button>
                    <b-button size="sm" variant="primary" @click="search">查询</b-button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 com-lg-12">
                <div class="table-scrollable">
                    <b-table striped hover bordered show-empty :fields="fields" :items="skuInfoList">
                        <template slot="selectRow" slot-scope="data">
                            <input type="radio" name="selectRow" :value="data.index" v-model="selectRow" @change="checkSku(data.item.skuCode, data.index)"/>
                        </template>
                        <template slot="cycle" slot-scope="data">
                            {{ data.item.inStockSourceInvoiceBusinessCycle != null ? data.item.inStockSourceInvoiceBusinessCycle : (data.item.inStockSourceConfirmBusinessCycle != null ? data.item.inStockSourceConfirmBusinessCycle : 0)  }}
                        </template>
                        <template slot="logisticsStatus" slot-scope="data">
                            {{ data.item.logisticsStatus  == 1 ? '在途':  (data.item.logisticsStatus  == 2 ? '在库': '')}}
                        </template>
                        <template slot="preinstalledCarDetail" slot-scope="data">
                            {{ preinstalledCarDetailListFilter(data.item) }}
                        </template>
                        <template slot="empty">
                            暂无数据...
                        </template>
                   </b-table>
                </div>
            </div>
        </div>
        <div class="row">
           <div class="col-md-12">
                <pagination class="pull-right" @page-change="pageChange" :page-no="skuPager.pageNo" :page-size="skuPager.pageSize" :total-result="skuPager.total" :total-pages="skuPager.totalPages">
                </pagination>
           </div>
        </div>
        <div class="row">
          <div class="col-md-12 com-lg-12">
               <b-form-fieldset horizontal label="已选车辆:" label-text-align="right" :label-cols="2">
                   <div class="card">
                       <div class="card-block">
                          <div class="card m-0 float-left ml-2" v-for="(carInfo, index) in selectedCarInfoList" :key="index">
                             <div class="card-body p-0 clearfix ml-1">
                                 {{ carInfo.skuName }}
                                 <i @click="checkSku(carInfo.skuCode, carInfo.index)" class="fa fa-remove bg-danger p-1  ml-3 float-right white"></i>
                             </div>
                          </div>
                       </div>
                   </div>
               </b-form-fieldset>
          </div>
      </div>
   </b-modal>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../../common/config'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import pagination from '../../../components/pagination/pagination'
    export default {
        mounted() {
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
            this.initData()
        },
        data: function() {
            return {
                showModal: false,
                selectRow: null,
                fields: {
                    selectRow: {
                        label: '选择'
                    },
                    skuCode: {
                        label: 'SKU编码'
                    },
                    productionCode: {
                        label: '生产号'
                    },
                    carVinCode: {
                        label: '车架号'
                    },
                    skuName: {
                        label: '商品名称'
                    },
                    cycle: {
                        label: '库龄'
                    },
                    carAppertanceName: {
                        label: '外观色'
                    },
                    carInteriorName: {
                        label: '内饰色'
                    },
                    actualMSRPInclusiveTax: {
                        label: '实际MSRP(含税)'
                    },
                    logisticsStatus: {
                        label: '物流状态'
                    },
                    preinstalledCarDetail: {
                        label: '门店加装'
                    }
                },
                items: [],
                skuInfo: {
                    skuCode: '',
                    brandCode: '',
                    barCode: '',
                    carFactoryCode: '',
                    carBrandCode: '',
                    carSeriesCode: '',
                    carModelCode: '',
                    carCode: '',
                    carVinNo: '',
                    storeCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            }
        },
        computed: {
            showFactory: function() {
                return !config.isShowFactory
            },
            ...mapState('carInfo', [
                'factoryCodes',
                'brandCodes',
                'seriesCodes',
                'modelCodes',
                'carCodes'
            ]),
            ...mapState('order', [
                'showSelectModal',
                'skuInfoList',
                'selectedCarInfoList',
                'skuPager'
            ]),
            ...mapGetters('order', [
                'orderDetailObj'
            ])
        },
        methods: {
            ...mapActions('carInfo', [
                'queryCarInfoByCarSearch',
                'resetCarInfo'
            ]),
            ...mapActions('order', [
                'hideSelectModal',
                'getSkuInfoList',
                'addCarInfoList',
                'commitCarInfoList',
                'removeCarInfoList'
            ]),
            factoryCodesChange: function() {
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.skuInfo.carFactoryCode,
                    level: 2,
                    type: config.car.factoryRefCode
                })
            },
            brandCodesChange: function() {
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.skuInfo.carBrandCode,
                    level: 4,
                    type: config.car.brandRefCode
                })
            },
            seriesCodesChange: function() {
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.skuInfo.carSeriesCode,
                    level: 8,
                    type: config.car.seriesRefCode
                })
            },
            modelCodesChange: function() {
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.skuInfo.carModelCode,
                    level: 64,
                    type: config.car.modelRefCode
                })
            },
            search: function() {
                this.$data.skuInfo.pageStart = 1
                this.getSkuInfoList(this.$data.skuInfo)
            },
            preinstalledCarDetailListFilter: function(data) {
                let text = '';
                if(data.isPreinstalled === 1){
                    if(data.preinstalledCarDetailList.length > 0){
                        for(let i = 0; i < data.preinstalledCarDetailList.length; i++){
                            text += data.preinstalledCarDetailList[i].skuName
                        }
                    }
                } 
                return text;
            },
            clear: function() {
                this.$data.skuInfo = {
                    skuCode: '',
                    brandCode: '',
                    barCode: '',
                    carFactoryCode: this.$data.skuInfo.carFactoryCode,
                    carBrandCode: this.$data.skuInfo.carBrandCode,
                    carSeriesCode: this.$data.skuInfo.carSeriesCode,
                    carModelCode: this.$data.skuInfo.carModelCode,
                    carCode: this.$data.skuInfo.carCode,
                    storeCode: this.$data.skuInfo.storeCode,
                    carVinNo: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            },
            selectStores: function(sales, stores) {
            },
            checkSku: function(skuCode, num) {
                let index = this.selectedCarInfoList.findIndex((item) => {
                    return item.skuCode == skuCode
                })
                if (index == -1) {
                    let skuInfo = this.skuInfoList[num]
                    skuInfo.index = num
                    this.addCarInfoList(skuInfo)
                } else {
                    this.selectRows[num].selected = false
                    this.removeCarInfoList(index)
                }
            },
            initData: function() {
                let _this = this
                if (_this.orderDetailObj && _this.orderDetailObj.carOrderInfoVoList && _this.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList) {
                    _this.$data.skuInfo.carFactoryCode = _this.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0].carFactoryCode
                    _this.$data.skuInfo.carBrandCode = _this.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0].carBrandCode
                    _this.$data.skuInfo.carSeriesCode = _this.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0].carSeriesCode
                    _this.$data.skuInfo.carModelCode = _this.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0].carModelCode
                    _this.$data.skuInfo.carCode = _this.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0].carCode
                    _this.$data.skuInfo.storeCode = _this.orderDetailObj.storeCode
                    _this.$refs.areaqueryshop.setselect({
                        value: _this.$data.skuInfo.storeCode
                    })
                }
            },
            hideModal: function() {
                this.$data.selectRows = []
                this.hideSelectModal()
                this.clear()
            },
            pageChange: function(num) {
                this.$data.skuInfo.pageStart = num
                this.getSkuInfoList(this.$data.skuInfo)
            }
        },
        watch: {
            showSelectModal: {
                handler() {
                    this.showModal = this.showSelectModal
                    if (this.showModal) {
                        this.initData()
                    }
                }
            },
            skuInfoList: {
                handler() {
                    this.selectRows = []
                    this.skuInfoList.forEach((item, index) => {
                        let num = this.selectedCarInfoList.findIndex((carInfo) => {
                            return carInfo.skuCode == item.skuCode
                        })
                        if (num >= 0) {
                            this.selectRow = index
                        } else {
                            this.selectRow = null
                        }
                    })
                }
            },
            orderDetailObj: {
                handler(val) {
                    let _this = this
                    _this.initData()
                },
                deep: true
            }
        },
        components: {
            pagination,
            areaqueryshop
        }
    }
</script>
