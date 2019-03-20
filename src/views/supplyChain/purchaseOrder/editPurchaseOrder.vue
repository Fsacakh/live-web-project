<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <b-card header="采购订单信息">
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="采购类型*" label-text-align="right" :label-cols="4">
                                <b-form-select :options="purchaseTypes" :state="purchaseTypeState" v-model.trim="purchaseOrder.purchaseTypeCode">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="供应商*" label-text-align="right" :label-cols="4" :state="supplierCodeState">
                                <search v-model="purchaseOrder.supplierCode" :searchValue="supplierName" :hasCheck="supplierCodeState" checkText="" :dataList="suppliers" :valueName="'supplierName'" :keyName="'supplierCode'" @dataChange="getSuppliersListByName" @comScroll="getSuppliersList" @clickShowBack="getSuppliersList">
                                </search>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="预计到货日期" label-text-align="right" :label-cols="4">
                                <date-picker v-model.trim="purchaseOrder.estimatedArrivalDate">
                                </date-picker>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="预计采购总金额" label-text-align="right" :label-cols="4">
                                <b-form-input type="number" v-model.trim="purchaseOrder.estimatedTotalMoney" disabled>
                                </b-form-input>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="实际到货总数" label-text-align="right" :label-cols="4">
                                <b-form-input type="number" v-model.trim="purchaseOrder.arrivalNums" disabled>
                                </b-form-input>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="运费" label-text-align="right" :label-cols="4">
                                <b-form-input type="number" v-model.trim="purchaseOrder.totalFreightFee">
                                </b-form-input>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="配送类型" label-text-align="right" :label-cols="4">
                                <b-form-select :options="deliveryTypes" v-model.trim="purchaseOrder.deliveryTypeCode">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="承运商" label-text-align="right" :label-cols="4">
                                <b-form-input v-model.trim="purchaseOrder.commonCarrierName">
                                </b-form-input>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="采购总金额" label-text-align="right" :label-cols="4">
                                <b-form-input type="number" v-model.trim="purchaseOrder.totalMoney" disabled>
                                </b-form-input>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="采购总数" label-text-align="right" :label-cols="4">
                                <b-form-input type="number" v-model.trim="purchaseOrder.totalNums" disabled>
                                </b-form-input>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="收货门店*" label-text-align="right" :label-cols="4">
                                <search v-model="purchaseOrder.storeCode" :searchValue="storeName" :hasCheck="storeCodeState" :disabled="isOnlyStore" checkText="" :dataList="stores" :valueName="'storeName'" :keyName="'storeCode'" @dataChange="getStoresListByName" @comScroll="getStoresList" @clickShowBack="getStoresList">
                                </search>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="收货仓库*" label-text-align="right" :label-cols="4">
                                <search v-model="purchaseOrder.whCode" :searchValue="warehouseName" :hasCheck="whCodeState" checkText="" :dataList="wareHouses" :valueName="'warehouseName'" :keyName="'warehouseCode'" @dataChange="getWareHouseListByName" @comScroll="getWareHouseList" @clickShowBack="getWareHouseList">
                                </search>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="订单截止时间" label-text-align="right" :label-cols="4">
                                <date-picker v-model.trim="purchaseOrder.deadLineTime">
                                </date-picker>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="备注" label-text-align="right" :label-cols="4">
                                <b-form-textarea v-model.trim="purchaseOrder.remark">
                                </b-form-textarea>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <b-tabs pills>
                        <b-tab title="商品信息" active>
                            <div class="animated fadeIn">
                                <div class="row mb-2">
                                    <div class="col-md-12">
                                        <div class="pull-left">
                                            <b-button v-if="purchaseOrder.orderStatus != 1 && purchaseOrder.orderStatus != -1" size="sm" variant="success" @click="addPoSkuDetailInfo">新增</b-button>
                                            <b-button v-if="!isUpdate" size="sm" variant="danger" @click="removePoSkuDetailInfo">删除</b-button>
                                            <b-button v-if="isUpdate && purchaseOrder.orderStatus == 0" size="sm" variant="danger" @click="updatePoSkuDetailInfo">删除</b-button>
                                            <b-button v-if="isUpdate && purchaseOrder.orderStatus == 1" size="sm" variant="danger" @click="cancelPoSkuDetailInfo">废单</b-button>
                                        </div>
                                    </div>
                                </div>
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
                                           <tr v-for="(item, index) in items" :key="item.skuCode">
                                               <td>
                                                   <input type="radio" :value="item.index" v-model="selectRow" name="selectRow"></input>
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
                                                   <b-form-input type="number" v-model="item.skuNums" @change="checkSkuNums(index)"></b-form-input>
                                               </td>
                                               <td>
                                                   {{ item.arrivalNums }}
                                               </td>
                                               <td>
                                                   <b-form-input type="number" v-model="item.estimatedPurchaseFee"></b-form-input>
                                               </td>
                                               <td>
                                                   <b-form-input type="number" v-model="item.purchaseFee"></b-form-input>
                                               </td>
                                               <td>
                                                   <b-form-select :options="rates" v-model="item.purchaseRate" @change="checkPurchaseRate(index)"></b-form-select>
                                               </td>
                                               <td>
                                                   {{ item.rowStatus == 0 ? '草稿' : (item.rowStatus == 1 ? '已确认': (item.rowStatus == -1 ? '废单': ''))}}
                                               </td>
                                           </tr>
                                           <tr v-if="items.length == 0">
                                              <td colspan='13' class="text-left">暂无数据...</td>
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
                               <b-button v-show="(purchaseOrder.orderStatus == 0 || purchaseOrder.orderStatus == null) && !isUpdate" size="sm" variant="info" @click="createPurchaseOrderInfo">保存</b-button>
                               <b-button v-show="(purchaseOrder.orderStatus == 0 || purchaseOrder.orderStatus == null) && isUpdate" size="sm" variant="info" @click="editPurchaseOrderInfo">保存</b-button>
                               <b-button v-show="purchaseOrder.orderStatus == 0" size="sm" variant="primary" @click="commitPurchaseOrderInfo">提交</b-button>
                           </div>
                        </div>
                    </div>
                </b-card>
            </div>
        </div>
        <select-modal></select-modal>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import DatePicker from '../../../components/datepicker/datepicker'
    import pagination from '../../../components/pagination/pagination'
    import search from '../../../components/search/search'
    import selectModal from './selectModal'
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import config from '../../../common/config'
    export default {
        mounted() {
            let _this = this
            _this.getPurchaseTypes()
            _this.getDeliveryTypes()
            _this.getRates()
            if(_this.isUpdate) {
                _this.getPurchaseOrderInfoByCode({
                    orderNo: _this.$route.params.orderNo
                })
            } else {
               _this.getOrderNo({
                   callback: (orderNo) => {
                       _this.$data.purchaseOrder.orderNo = orderNo
                   }
               })
               _this.getStoresList(true)
            }
        },
        destroyed() {
            let _this = this
            _this.resetPurchaseOrderInfo()
        },
        data: function() {
            return {
                selectRow: -1,
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
                    orderStatus: null,
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
                purchaseTypeState: null,
                supplierCodeState: false,
                storeCodeState: false,
                whCodeState: false,
                fields: {
                    selectRow: {
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
                        label: '实际到货数量'
                    },
                    estimatedPurchaseFee: {
                        label: '预计采购单价'
                    },
                    purchaseFee: {
                        label: '实际采购单价价格'
                    },
                    purchaseRate: {
                        label: '采购税率'
                    },
                    rowStatus: {
                        label: '状态'
                    }
                },
                items: []
            }
        },
        computed: {
            ...mapGetters('purchaseOrder', [
                'getWareHousesPageStart',
                'getSuppliersPageStart',
                'getStoresPageStart',
                'isOnlyStore'
            ]),
            ...mapState('purchaseOrder', [
                'deliveryTypes',
                'purchaseTypes',
                'stores',
                'rates',
                'wareHouses',
                'suppliers',
                'purchaseOrderInfo',
                'selectPoSkuDetailInfoList',
                'addPurchaseOrderSuccess',
                'showAdditionalField'
            ]),
            isUpdate: function() {
                let _this = this
                let orderNo = _this.$route.params.orderNo
                if(orderNo != null && orderNo!= '') {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            ...mapActions('purchaseOrder', [
                'getOrderNo',
                'getRates',
                'getPurchaseTypes',
                'getDeliveryTypes',
                'getWareHouses',
                'resetWareHouses',
                'getSuppliers',
                'resetSuppliers',
                'getStores',
                'resetStores',
                'insertPurchaseOrderInfo',
                'updatePurchaseOrderInfo',
                'submitPurchaseOrderInfo',
                'getPurchaseOrderInfoByCode',
                'getPoSkuDetailInfoList',
                'removeSelectPoSkuDetailList',
                'editPoSkuDetailInfoList',
                'cancelPoSkuDetailList',
                'showSelectModal',
                'resetPurchaseOrderInfo'
            ]),
            createPurchaseOrderInfo: function() {
                let _this = this
                if(_this.checkValues()) {
                   _this.insertPurchaseOrderInfo({
                       purchaseOrder: _this.$data.purchaseOrder,
                       poSkuDetailInfoList: _this.$data.items,
                       callback: () => {
                           _this.goBack()
                       }
                   })
                }
            },
            editPurchaseOrderInfo: function() {
                let _this = this
                if(_this.checkValues()) {
                   _this.updatePurchaseOrderInfo({
                       purchaseOrder: _this.$data.purchaseOrder,
                       poSkuDetailInfoList: _this.$data.items,
                       callback: () => {
                           _this.goBack()
                       }
                   })
                }
            },
            commitPurchaseOrderInfo: function() {
                let _this = this
                var isValid = true
                _this.$data.items.forEach(item => {
                    if (item.skuNums === 0){
                        isValid = false
                    }
                })

                if(!isValid){
                    Message({
                       type: 'error',
                       message: '采购数量不应该为0'
                    })
                    return
                }

                if(_this.checkValues()) {
                   _this.submitPurchaseOrderInfo({
                       purchaseOrderInfo: _this.$data.purchaseOrder,
                       callback: () => {
                           _this.goBack()
                       }
                   })
                }
            },
            removePoSkuDetailInfo: function() {
                let _this = this
                MessageBox.confirm('入库为不可逆操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 配置入库信息
                    if(this.selectRow != -1) {
                        _this.removeSelectPoSkuDetailList({
                            index: _this.selectRow,
                            callback: function() {
                            _this.selectRow = -1
                            }
                        })
                    } else {
                        Message.closeAll()
                        Message({
                        type: 'error',
                        message: config.messInfo.selectOneRow
                        })
                    }
                }).catch(() => {
                    Message({
                    type: 'info',
                    message: '已取消删除'
                    });
                });
            },
            updatePoSkuDetailInfo: function() {
                let _this = this
                if(_this.selectRow != -1) {
                   _this.editPoSkuDetailInfoList({
                       index: _this.selectRow,
                       callback: () => {
                          _this.selectRow = -1
                       }
                   })
                } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                }
            },
            cancelPoSkuDetailInfo: function() {
                let _this = this
                if(_this.selectRow != -1) {
                    let poSkuDetailInfo = _this.items[_this.selectRow]
                    let poSkuDetailList = {
                        orderNo: poSkuDetailInfo.orderNo,
                        id: poSkuDetailInfo.id
                    }
                    _this.cancelPoSkuDetailList({
                        poSkuDetailList: poSkuDetailList,
                        callback: () => {
                            _this.getPoSkuDetailInfoList({
                                orderNo: _this.$route.params.orderNo,
                                pageNums: config.pageNums,
                                pageStart: 1
                            })
                            _this.selectRow != -1
                        }
                    })
                } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                }
            },
            addPoSkuDetailInfo: function() {
                let _this = this
                if(_this.checkValues()) {
                    _this.showSelectModal()
                }
            },
            checkValues: function() {
                let _this = this
                if(_this.purchaseOrder.purchaseTypeCode == null || _this.purchaseOrder.purchaseTypeCode == '') {
                    _this.purchaseTypeState = 'invalid'
                    return false
                } else {
                    _this.purchaseTypeState = null
                }
                if(_this.purchaseOrder.supplierCode == null || _this.purchaseOrder.supplierCode == '') {
                    _this.supplierCodeState = true
                    return false
                } else {
                    _this.supplierCodeState = false
                }
                if(_this.purchaseOrder.storeCode == null || _this.purchaseOrder.storeCode == '') {
                    _this.storeCodeState = true
                    return false
                } else {
                    _this.storeCodeState = false
                }
                if(_this.purchaseOrder.whCode == null || _this.purchaseOrder.whCode == '') {
                    _this.whCodeState = true
                    return false
                } else {
                    _this.whCodeState = false
                }
                return true
            },
            checkPurchaseRate: function(index) {
                let _this = this
                let val = _this.$data.items[index].purchaseRate
                if (val > 1) {
                   _this.$data.items[index].purchaseRate = 1
                } else if (val < 0) {
                   _this.$data.items[index].purchaseRate = 0
                }
                return false
            },
            checkSkuNums: function(index) {
                let _this = this
                let val = _this.$data.items[index].skuNums
                if (val < 0) {
                   _this.$data.items[index].skuNums = 0
                }
                return false
            },
            getWareHouseList: function() {
                let _this = this
                _this.getWareHouses({
                    warehouseName: _this.$data.warehouseName,
                    storeCode: _this.$data.purchaseOrder.storeCode,
                    warehouseTypeFlag: 0,
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
                    storeCode: _this.$data.purchaseOrder.storeCode,
                    warehouseTypeFlag: 0,
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
            goBack: function() {
                this.$router.go(-1)
            }
        },
        watch: {
            purchaseOrderInfo: {
                handler(value) {
                    let _this = this
                    if(_this.isUpdate) {
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
                }
            },
            selectPoSkuDetailInfoList: {
                handler(list) {
                    let _this = this
                    _this.items = []
                    list.forEach((item, index) => {
                        _this.items.push({
                            index: index,
                            detailCode: item.detailCode,
                            arrivalNums: item.arrivalNums,
                            barCode: item.barCode,
                            brandCode: item.brandCode,
                            brandName: item.brandName,
                            checkUnitCode: item.checkUnitCode,
                            checkUnitName: item.checkUnitName,
                            estimatedPurchaseFee: item.estimatedPurchaseFee,
                            externalCode: item.externalCode,
                            orderNo: item.orderNo,
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
                            skuStandards: item.skuStandards,
                            skuTempCode: item.skuTempCode,
                            id: item.id
                        })
                    })
                }
            },
            stores: {
                handler(newList) {
                    let _this = this
                    if(!_this.isUpdate) {
                       let store = newList[0]
                       _this.$data.purchaseOrder.storeCode = store.storeCode
                       _this.resetWareHouses()
                       _this.getWareHouseList()
                    }
                }
            }
        },
        components: {
            DatePicker,
            pagination,
            search,
            selectModal
        }
    }
</script>
