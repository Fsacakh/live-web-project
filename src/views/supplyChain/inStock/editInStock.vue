<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <b-card header="采购订单信息">
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="采购类型" label-text-align="right" :label-cols="4">
                                <b-form-select :options="purchaseTypes" v-model.trim="purchaseOrder.purchaseTypeCode">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="供应商" label-text-align="right" :label-cols="4">
                                <search v-model="purchaseOrder.supplierCode" :searchValue="supplierName" :dataList="suppliers" :valueName="'supplierName'" :keyName="'supplierCode'" @dataChange="getSuppliersListByName" @comScroll="getSuppliersList" @clickShowBack="getSuppliersList">
                                </search>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="收货门店" label-text-align="right" :label-cols="4">
                                <search v-model="purchaseOrder.storeCode" :searchValue="storeName" :dataList="stores" :valueName="'storeName'" :keyName="'storeCode'" @dataChange="getStoresListByName" @comScroll="getStoresList" @clickShowBack="getStoresList">
                                </search>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="收货仓库" label-text-align="right" :label-cols="4">
                                <search v-model="purchaseOrder.whCode" :searchValue="warehouseName" :dataList="wareHouses" :valueName="'warehouseName'" :keyName="'warehouseCode'" @dataChange="getWareHouseListByName" @comScroll="getWareHouseList" @clickShowBack="getWareHouseList">
                                </search>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <b-tabs pills>
                         <b-tab title="商品信息" active>
                            <div class="animated fadeIn">
                                <div class="table-scrollable">
                                    <table class="table table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                               <th v-for="field in fields">
                                                   {{ field.label }}
                                               </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           <tr v-for="(item, index) in items">
                                               <td>
                                                  <input type="checkbox" name="selectRows" :value="index" v-model="selectRows"></input>
                                               </td>
                                               <td>
                                                   {{ item.skuCode }}
                                               </td>
                                               <td>
                                                   {{ item.skuName }}
                                               </td>
                                               <td>
                                                   {{ item.brandName }}
                                               </td>
                                               <td>
                                                   {{ item.skuModel }}
                                               </td>
                                               <td>
                                                   {{ item.skuStandards }}
                                               </td>
                                               <td>
                                                   {{ item.originalCode }}
                                               </td>
                                               <td>
                                                   {{ item.skuNums }}
                                               </td>
                                               <td>
                                                   {{ item.arrivalNums }}
                                               </td>
                                               <td>
                                                   <b-form-input type="number" v-model.number="item.inNums" min="1" :max="item.skuNums - item.arrivalNums" :disabled="item.arrivalNums >= item.skuNums"></b-form-input>
                                               </td>
                                               <td>
                                                   <b-form-select type="number" v-model.number="item.inStockRate" :options="rates" :disabled="true"></b-form-select>
                                               </td>
                                               <td>
                                                   <b-form-input type="number" v-model.number="item.inStockIncludingTaxPrice" min="0" :disabled="item.arrivalNums >= item.skuNums"></b-form-input>
                                               </td>
                                           </tr>
                                           <tr v-if="items.length == 0">
                                              <td colspan='12' class="text-left">暂无数据...</td>
                                           </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                    <div class="row">
                        <div class="col-md-12 col-lg-12">
                           <div class="pull-right mt-2">
                               <b-button size="sm" @click="goBack">取消</b-button>
                               <b-button v-show="purchaseOrder.arrivalNums < purchaseOrder.totalNums" size="sm" variant="primary" @click="inStock">入库</b-button>
                           </div>
                        </div>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import pagination from '../../../components/pagination/pagination'
    import search from '../../../components/search/search'
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import config from '../../../common/config'
    export default {
        mounted() {
            let _this = this
            _this.getPurchaseTypes()
            _this.getRates()
            _this.getPurchaseOrderInfoByCode({
                orderNo: _this.$route.params.orderNo
            })
        },
        destroyed() {

        },
        data: function() {
            return {
                selectRows: [],
                purchaseOrder: {
                    arrivalNums: 0,
                    commonCarrierName: '',
                    contactAddress: '',
                    contactMobile: '',
                    contactName: '',
                    contactPhone: '',
                    deadLineTime: '',
                    deliveryTypeCode: '',
                    estimatedArrivalDate: '',
                    estimatedTotalMoney: 0,
                    orderNo: '',
                    orderStatus: 0,
                    orderType: config.supplyChain.purchaseOrder.normalOrderType,
                    purchaseTypeCode: '',
                    remark: '',
                    storeCode: '',
                    supplierCode: '',
                    totalFreightFee: 0,
                    totalMoney: 0,
                    totalNums: 0,
                    whCode: ''
                },
                warehouseName: '',
                supplierName: '',
                storeName: '',
                fields: {
                    selectRows: {
                        label: '选择'
                    },
                    skuCode: {
                        label: '商品编码'
                    },
                    skuName: {
                        label: '商品名称'
                    },
                    brandName: {
                        label: '商品品牌'
                    },
                    skuModel: {
                        label: '商品型号'
                    },
                    skuStandards: {
                        label: '商品规格'
                    },
                    originalCode: {
                        label: '原厂编码'
                    },
                    skuNums: {
                        label: '采购数量'
                    },
                    arrivalNums: {
                        label: '已入库数量'
                    },
                    inNums: {
                        label: '入库数量'
                    },
                    inStockRate: {
                        label: '入库税率'
                    },
                    inStockIncludingTaxPrice: {
                        label: '入库含税价'
                    }
                },
                items: []
            }
        },
        computed: {
            ...mapGetters('inStock', [
                'getWareHousesPageStart',
                'getSuppliersPageStart',
                'getStoresPageStart'
            ]),
            ...mapState('inStock', [
                'purchaseTypes',
                'stores',
                'rates',
                'wareHouses',
                'suppliers',
                'purchaseOrderInfo',
                'selectPoSkuDetailInfoList',
            ])
        },
        methods: {
            ...mapActions('inStock', [
                'getPurchaseTypes',
                'getRates',
                'getWareHouses',
                'resetWareHouses',
                'getSuppliers',
                'resetSuppliers',
                'getStores',
                'resetStores',
                'getPurchaseOrderInfoByCode',
                'inStockList'
            ]),
            getWareHouseList: function() {
                let _this = this
                _this.getWareHouses({
                    warehouseName: _this.$data.warehouseName,
                    warehouseTypeFlag: 0,
                    storeCode: _this.$data.purchaseOrder.storeCode,
                    pageNums: config.pageNums,
                    pageStart: _this.getWareHousesPageStart
                })
            },
            getWareHouseListByName: function(warehouseName) {
                let _this = this
                _this.$data.warehouseName = warehouseName
                _this.resetWareHouses()
                _this.getWareHouses({
                    warehouseName: warehouseName,
                    warehouseTypeFlag: 0,
                    storeCode: _this.$data.purchaseOrder.storeCode,
                    pageNums: config.pageNums,
                    pageStart: _this.getWareHousesPageStart
                })
            },
            getSuppliersList: function() {
                let _this = this
                _this.getSuppliers({
                    supplierName: _this.$data.supplierName,
                    pageNums: config.pageNums,
                    pageStart: _this.getSuppliersPageStart
                })
            },
            getSuppliersListByName: function(supplierName) {
                let _this = this
                _this.$data.supplierName = supplierName
                _this.resetSuppliers()
                _this.getSuppliers({
                    supplierName: supplierName,
                    pageNums: config.pageNums,
                    pageStart: _this.getSuppliersPageStart
                })
            },
            getStoresList: function() {
                let _this = this
                _this.getStores({
                    storeName: _this.$data.storeName,
                    pageNums: config.pageNums,
                    pageStart: _this.getStoresPageStart
                })
            },
            getStoresListByName: function(storeName) {
                let _this = this
                _this.$data.storeName = storeName
                _this.resetStores()
                _this.getStores({
                    storeName: storeName,
                    pageNums: config.pageNums,
                    pageStart: _this.getStoresPageStart
                })
            },
            inStock: function() {
                let _this = this
                let inSkuStockList = []
                _this.$data.selectRows.forEach((item) => {
                     let inSkuStock = _this.$data.items[parseInt(item)]
                     inSkuStockList.push(inSkuStock)
                })
                if (inSkuStockList.length > 0) {
                    _this.inStockList({
                        inSkuStockList: inSkuStockList,
                        callback: () => { _this.goBack() }
                    })
                } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectInStockSkus
                    })
                }
            },
            checkInStockRate: function(index) {
                let _this = this
                let val = _this.$data.items[index].inStockRate
                if (val > 1) {
                   _this.$data.items[index].inStockRate = 1
                } else if (val < 0) {
                   _this.$data.items[index].inStockRate = 0
                }
                return false
            },
            goBack: function() {
                this.$router.go(-1)
            }
        },
        watch: {
            purchaseOrderInfo: {
                handler(value) {
                    let _this = this
                    _this.$data.purchaseOrder = {
                        id: value.id,
                        arrivalNums: value.arrivalNums,
                        commonCarrierName: value.commonCarrierName,
                        contactAddress: value.contactAddress,
                        contactMobile: value.contactMobile,
                        contactName: value.contactName,
                        contactPhone: value.contactPhone,
                        deadLineTime: value.deadLineTime ? value.deadLineTime : '',
                        deliveryTypeCode: value.deliveryTypeCode,
                        estimatedArrivalDate: value.estimatedArrivalDate ? value.estimatedArrivalDate : '',
                        estimatedTotalMoney: value.estimatedTotalMoney,
                        orderNo: value.orderNo,
                        orderStatus: value.orderStatus,
                        orderType: value.orderType,
                        purchaseTypeCode: value.purchaseTypeCode,
                        remark: value.remark,
                        storeCode: value.storeCode,
                        supplierCode: value.supplierCode,
                        totalFreightFee: value.totalFreightFee,
                        totalMoney: value.totalMoney,
                        totalNums: value.totalNums,
                        whCode: value.whCode
                    }
                    _this.$data.supplierName = value.supplierName
                    _this.$data.warehouseName = value.whName
                    _this.$data.storeName = value.storeName
                }
            },
            selectPoSkuDetailInfoList: {
                handler(list) {
                    let _this = this
                    _this.items = []
                    list.forEach((item) => {
                        _this.items.push({
                            freightFee: _this.$data.purchaseOrder.totalFreightFee,
                            inNums: 0,
                            inSourceNo: item.orderNo,
                            inSourceNoDetailCode: item.detailCode,
                            inSourceTypeCode: config.supplyChain.stockInfo.inStock.inSourceTypeCode,
                            inStockIncludingTaxPrice: 0,
                            inStockRate: item.purchaseRate,
                            rowStatus: item.rowStatus,
                            barCode: item.barCode,
                            brandCode: item.brandCode,
                            brandName: item.brandName,
                            checkUnitCode: item.checkUnitCode,
                            checkUnitName: item.checkUnitName,
                            estimatedPurchaseFee: item.estimatedPurchaseFee,
                            externalCode: item.externalCode,
                            originalCode: item.originalCode,
                            purchaseFee: item.purchaseFee,
                            purchaseRate: item.purchaseRate,
                            purchaseToCheckNums: item.purchaseToCheckNums,
                            purchaseUnitCode: item.purchaseUnitCode,
                            purchaseUnitName: item.purchaseUnitName,
                            skuCode: item.skuCode,
                            skuModel: item.skuModel,
                            skuName: item.skuName,
                            skuNums: item.skuNums,
                            arrivalNums: item.arrivalNums,
                            skuStandards: item.skuStandards,
                            skuTempCode: item.skuTempCode,
                            storeCode: _this.$data.purchaseOrder.storeCode,
                            whCode: _this.$data.purchaseOrder.whCode
                        })
                    })
                }
            },
        },
        components: {
            pagination,
            search
        }
    }
</script>
