<template>
    <div class="animated fadeIn">
        <b-card header="主档信息">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="调拨入库单单号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="carAdjustInStockInfo.purchaseNo" readonly></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="总价" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="carAdjustInStockInfo.totalMoney" readonly></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="来源门店*" label-text-align="right" :label-cols="4">
                        <areashop ref="sourceStore" @select-change="selectSourceStores" :readonly="addCarAdjustInStockSucc"></areashop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="目的门店*" label-text-align="right" :label-cols="4">
                        <areaqueryshop ref="targetStore" @select-change="selectTargetStores"></areaqueryshop>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="订单状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="orderStatusList" v-model="carAdjustInStockInfo.orderStatus" disabled></b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="内采数量" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="carAdjustInStockInfo.totalNums" readonly></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="pull-right">
                        <template v-if="carAdjustInStockInfo.orderStatus == 0 && !showDetail && addCarAdjustInStockSucc">
                            <b-button v-if="commitCarAdjustInStockOrderBtn" size="sm" variant="primary" @click="commitCarAdjustInStockOrder">提交</b-button>
                        </template>
                        <template v-if="carAdjustInStockInfo.orderStatus == 0 && !showDetail && addCarAdjustInStockSucc">
                            <b-button size="sm" variant="warning" @click="resetCarAdjustInStockOrderSucc">修改</b-button>
                        </template>
                        <template v-if="carAdjustInStockInfo.orderStatus == 0 && !showDetail && !addCarAdjustInStockSucc">
                            <b-button v-if="editCarAdjustInStockOrderBtn" size="sm" variant="primary" @click="editCarAdjustInStockOrder">确认</b-button>
                        </template>
                        <template v-if="carAdjustInStockInfo.orderStatus == 1 && !showDetail">
                            <b-button v-if="deleteCarAdjustInStockOrderBtn" size="sm" variant="danger" @click="deleteCarAdjustInStockOrder">废单</b-button>
                        </template>
                    </div>
                </div>
            </div>
        </b-card>     
        <b-card header="附加字段信息">
            <b-tabs pills>
                <b-tab title="车辆信息" active>
                    <div class="animated fadeIn">
                        <div class="table-scrollable">
                           <table class="table table-striped table-hover table-bordered">
                               <thead>
                                   <tr>
                                      <th v-for="field in fields" :key="field.label">
                                         {{ field.label }}
                                      </th> 
                                   </tr>
                               </thead>
                               <tbody>
                                   <tr v-for="(item, index) in carAdjustInStockDetailInfoList" :key="index">
                                      <td>
                                          <input type="radio" :value="index" v-model="selectRow" name="selectRow"/>
                                      </td>
                                      <td>
                                          {{ item.skuCode }}
                                      </td>
                                      <td>
                                          {{ item.carProductionCode }}
                                      </td>
                                      <td>
                                          {{ item.carVinCode }}
                                      </td>
                                      <td>
                                          {{ item.sourceWhName }}
                                      </td>
                                      <td>
                                          {{ item.soureMsrp }}
                                      </td>
                                      <td>
                                          {{ item.targetMsrp }}
                                      </td>
                                      <td>
                                          {{ item.purchaseFee }}  
                                      </td>
                                   </tr>
                                   <tr v-if="carAdjustInStockDetailInfoList.length == 0">
                                       <td colspan='13' class="text-left">暂无数据...</td>
                                   </tr>
                               </tbody>
                           </table>
                        </div>
                    </div>
                </b-tab>
            </b-tabs>    
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
    import {
        MessageBox,
        Message,
        DatePicker
    } from 'element-ui'
    import api from '../../../common/api'
    import Pagination from 'components/pagination/pagination'
    import search from '../../../components/search/search'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import areashop from 'components/iris-areashop'
    import apiUrl from 'common/api-url'
    import {hasBtn} from 'common/com-api'
    export default {
        mounted() {
            let _this = this
            _this.getCarAdjustInStockOrder({
                purchaseNo: _this.$route.params.purchaseNo
            })
        },
        data: function() {
            return {
                selectRow: -1,
                fields: {
                    selectRow: {
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
                    sourceWhName: {
                        label: '所在仓库'
                    },
                    soureMsrp: {
                        label: '来源MSRP'
                    },
                    targetMsrp: {
                        label: '目的MSRP'
                    },
                    purchaseFee: {
                        label: '采购价格'
                    }
                },
                carAdjustInStockInfo: {
                    purchaseNo: '',
                    sourceSalesAreaCode: '',
                    sourceStoreCode: '',
                    sourceWhCode: '',
                    targetSalesAreaCode: '',
                    targetStoreCode: '',
                    skuCode: '',
                    produtionCode: '',
                    vin: '',
                    orderStatus: 0,
                    totalMoney: null,
                    totalNums: null
                },
                orderStatusList: [
                    {
                        value: 0,
                        text: '草稿'
                    },
                    {
                        value: 1,
                        text: '已确认'
                    },
                    {
                        value: -1,
                        text: '作废'
                    }
                ],
                timeStep: []
            }
        },
        computed: {
            ...mapState('callInVehicleResource', [
                'carAdjustInStockData',
                'addCarAdjustInStockSucc',
                'showAdditionalField',
                'carAdjustInStockDetailInfoList'
            ]),
            showDetail: function() {
                let _this = this
                let flag = _this.$route.params.flag
                if(flag != null && flag == config.showDetailFlag) {
                    return true 
                } else {
                    return false
                }
            },
            commitCarAdjustInStockOrderBtn(){
                return hasBtn(apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.submitCarAdjustInStockInfo)
            },
            editCarAdjustInStockOrderBtn(){
                return hasBtn(apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.update)
            },
            deleteCarAdjustInStockOrderBtn(){
                return hasBtn(apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.cancelCarAdjustInStockInfo)
            }
        },
        methods: {
            goBack: function() {
                this.$router.go(-1)
            },
            selectSourceStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.carAdjustInStockInfo.sourceSalesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.carAdjustInStockInfo.sourceSalesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.carAdjustInStockInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                    _this.carAdjustInStockInfo.storeCodeSet[0] = stores.value
                    _this.carAdjustInStockInfo.sourceStoreCode = stores.value 
                }
            },
            selectTargetStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.carAdjustInStockInfo.targetSalesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.carAdjustInStockInfo.targetSalesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.carAdjustInStockInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                    _this.carAdjustInStockInfo.storeCodeSet[0] = stores.value
                    _this.carAdjustInStockInfo.targetStoreCode = stores.value 
                }
            },
            editCarAdjustInStockOrder: function() {
                let _this = this
                _this.updateCarAdjustInStockOrder(_this.$data.carAdjustInStockInfo)
            },
            commitCarAdjustInStockOrder: function() {
                let _this = this
                _this.submitCarAdjustInStockOrder({
                    purchaseNo: _this.$route.params.purchaseNo,
                    callback: () => {
                        _this.goBack()
                    }
                }) 
            },
            deleteCarAdjustInStockOrder: function() {
                let _this = this
                _this.cancelCarAdjustInStockOrder({
                    purchaseNo: _this.$route.params.purchaseNo,
                    callback: () => {
                        _this.goBack()
                    }
                }) 
            }, 
            ...mapActions('callInVehicleResource', [
                'submitCarAdjustInStockOrder',
                'getCarAdjustInStockOrder',
                'updateCarAdjustInStockOrder',
                'cancelCarAdjustInStockOrder',
                'getCarAdjustInStockDetailInfoList',
                'resetCarAdjustInStockOrderSucc'
            ])
        },
        watch: {
            carAdjustInStockData: {
                handler(val) {
                    let _this = this
                    _this.$data.carAdjustInStockInfo = {
                        id: val.id,
                        purchaseNo: val.purchaseNo,
                        sourceSalesAreaCode: val.sourceSalesAreaCode,
                        sourceStoreCode: val.sourceStoreCode,
                        sourceWhCode: val.sourceWhCode,
                        targetSalesAreaCode: val.targetSalesAreaCode,
                        targetStoreCode: val.targetStoreCode,
                        skuCode: val.skuCode,
                        produtionCode: val.produtionCode,
                        vin: val.vin,
                        orderStatus: val.orderStatus,
                        totalMoney: val.totalMoney,
                        totalNums: val.totalNums
                    }
                    _this.$refs.sourceStore.setselect({
                        value: (val.sourceStoreCode === '0' ? '' : val.sourceStoreCode),
                        salesCode: val.sourceSalesAreaCode
                    })
                    _this.$refs.targetStore.setselect({
                        value: (val.targetStoreCode === '0' ? '' : val.targetStoreCode),
                        salesCode: val.targetSalesAreaCode
                    })
                }
            }
        },
        components: {
            search,
            areashop,
            DatePicker,
            Pagination,
            areaqueryshop
        }
    }
</script>