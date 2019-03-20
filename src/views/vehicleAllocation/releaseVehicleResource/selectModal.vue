<template>
    <b-modal title="选择车辆" v-model="showModal" no-close-on-backdrop no-close-on-esc size="lg" button-size="sm" @hidden="hideModal" @ok="commitCarShareDetailInfoList" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="门店:" label-text-align="right" :label-cols="4">
                    <areaqueryshop :storeAll="true" @select-change="selectStores"></areaqueryshop>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="厂家:" label-text-align="right" :label-cols="4">
                    <b-form-select v-model.trim="skuInfo.carFactoryCode" :options="factoryCodes" @input="factoryCodesChange"></b-form-select>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="品牌:" label-text-align="right" :label-cols="4">
                    <b-form-select v-model.trim="skuInfo.carBrandCode" :options="brandCodes" @input="brandCodesChange"></b-form-select>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="车系:" label-text-align="right" :label-cols="4">
                    <b-form-select v-model.trim="skuInfo.carSeriesCode" :options="seriesCodes" @input="seriesCodesChange"></b-form-select>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="车型:" label-text-align="right" :label-cols="4">
                    <b-form-select v-model.trim="skuInfo.carModelCode" :options="modelCodes" @input="modelCodesChange"></b-form-select>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="车款:" label-text-align="right" :label-cols="4">
                    <b-form-select v-model.trim="skuInfo.carCode" :options="carCodes"></b-form-select>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
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
        </div>
        <div class="row">
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
                        <template slot="selectRows" slot-scope="data">
                            <input type="checkbox" name="selectRows" v-model="selectRows[data.index].selected" @change="checkSku(data.item.skuCode, data.index)"/>
                        </template>
                        <template slot="number" slot-scope="data">
                            1
                        </template>
                        <template slot="logisticsStatus" slot-scope="data">
                            {{ data.item.logisticsStatus  == 1 ? '在途':  (data.item.logisticsStatus  == 2 ? '在库': '')}}
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
                          <div class="card m-0 float-left ml-2" v-for="carShareDetailInfo in addCarShareDetailInfoList">
                             <div class="card-body p-0 clearfix ml-1">
                                 {{ carShareDetailInfo.skuName }}
                                 <i @click="checkSku(carShareDetailInfo.skuCode, carShareDetailInfo.index)" class="fa fa-remove bg-danger p-1  ml-3 float-right white"></i>
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
        },
        data: function() {
            return {
                showModal: false,
                selectRows: [],
                fields: {
                    selectRows: {
                        label: '选择'
                    },
                    skuCode: {
                        label: 'SKU编码'
                    },
                    carProductionCode: {
                        label: '生产号'
                    },
                    carVinCode: {
                        label: '车架号'
                    },
                    skuName: {
                        label: '商品名称'
                    },
                    number: {
                        label: '数量'
                    },
                    msrp: {
                        label: '实际MSRP(含税)'
                    },
                    purchaseFee: {
                        label: '采购价格'
                    },
                    logisticsStatus: {
                        label: '物流状态'
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
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            }
        },
        computed: {
            ...mapState('carInfo', [
                'factoryCodes',
                'brandCodes',
                'seriesCodes',
                'modelCodes',
                'carCodes'
            ]),
            ...mapState('releaseVehicleResource', [
                'showSelectModal',
                'skuInfoList',
                'addCarShareDetailInfoList',
                'skuPager'
            ])
        },
        methods: {
            ...mapActions('carInfo', [
                'queryCarInfoByCarSearch',
                'resetCarInfo'
            ]),
            ...mapActions('releaseVehicleResource', [
                'hideSelectModal',
                'getSkuInfoList',
                'addCarShareDetailList',
                'commitCarShareDetailInfoList',
                'removeCarShareDetailInfoList'
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
            clear: function() {
                this.$data.skuInfo = {
                    skuCode: '',
                    brandCode: '',
                    barCode: '',
                    carFactoryCode: '',
                    carBrandCode: '',
                    carSeriesCode: '',
                    carModelCode: '',
                    carCode: '',
                    carVinNo: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            },
            selectStores: function(sales, stores) {
            },
            checkSku: function(skuCode, num) {
                let index = this.addCarShareDetailInfoList.findIndex((item) => {
                    return item.skuCode == skuCode
                })
                if (index == -1) {
                    let skuInfo = this.skuInfoList[num]
                    skuInfo.index = num
                    this.addCarShareDetailList(skuInfo)
                } else {
                    this.selectRows[num].selected = false
                    this.removeCarShareDetailInfoList(index)
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
                }
            },
            skuInfoList: {
                handler() {
                    this.selectRows = []
                    this.skuInfoList.forEach((item) => {
                        let index = this.addCarShareDetailInfoList.findIndex((carShareDetailInfo) => {
                            return carShareDetailInfo.skuCode == item.skuCode
                        })
                        if (index == -1) {
                            this.selectRows.push({
                                selected: false
                            })
                        } else {
                            this.selectRows.push({
                                selected: true
                            })
                        }
                    })
                }
            }
        },
        components: {
            pagination,
            areaqueryshop
        }
    }
</script>
