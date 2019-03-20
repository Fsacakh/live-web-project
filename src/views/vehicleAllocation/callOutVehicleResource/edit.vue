<template>
    <div class="animated fadeIn">
        <b-card header="主档信息">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="调拨出库单单号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="carAdjustOutStockInfo.outStockNo" readonly></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="总价" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="carAdjustOutStockInfo.totalPurchasePrice" readonly></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="来源门店*" label-text-align="right" :label-cols="4">
                        <areaqueryshop ref="sourceStore" @select-change="selectSourceStores"></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="目的门店*" label-text-align="right" :label-cols="4">
                        <areashop ref="targetStore" :readonly="addCarAdjustOutStockInfoSucc" @select-change="selectTargetStores"></areashop>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="订单状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="orderStatusList" v-model="carAdjustOutStockInfo.orderStatus" disabled></b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="内采数量" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="carAdjustOutStockInfo.totalNums" readonly></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="pull-right">
                        <template v-if="addCarAdjustOutStockInfoSucc && !showDetail && carAdjustOutStockInfo.orderStatus == 0 && addCarAdjustOutStockInfoSucc">
                            <b-button v-if="commitCarAdjustOutStockOrderBtn" size="sm" variant="primary" @click="commitCarAdjustOutStockOrder">调出确认</b-button>
                        </template>
                        <template v-if="addCarAdjustOutStockInfoSucc && !showDetail && carAdjustOutStockInfo.orderStatus == 0 && addCarAdjustOutStockInfoSucc">
                            <b-button size="sm" variant="warning" @click="resetCarAdjustOutStockOrderSucc">修改</b-button>
                        </template>
                        <template v-if="addCarAdjustOutStockInfoSucc && !showDetail && carAdjustOutStockInfo.orderStatus == 0 && !addCarAdjustOutStockInfoSucc">
                            <b-button v-if="editCarAdjustOutStockOrderBtn" size="sm" variant="primary" @click="editCarAdjustOutStockOrder">确认</b-button>
                        </template>
                        <template v-if="carAdjustOutStockInfo.orderStatus == 1 && !showDetail">
                            <b-button v-if="deleteCarAdjustOutStockOrderBtn" size="sm" variant="danger" @click="deleteCarAdjustOutStockOrder">废单</b-button>
                        </template>
                        <template v-if="!addCarAdjustOutStockInfoSucc && !showDetail">
                            <b-button size="sm" variant="success" @click="createCarAdjustOutStockOrder">创建</b-button>
                        </template>
                    </div>
                </div>
            </div>
        </b-card>     
        <b-card v-if="showAdditionalField" header="附加字段信息">
            <b-tabs pills>
                <b-tab title="车辆信息" active>
                    <div class="animated fadeIn">
                        <div class="row mb-2"> 
                           <div class="col-md-12">
                               <div class="pull-left">
                                   <template v-if="!showDetail && carAdjustOutStockInfo.orderStatus == 0">
                                       <b-button size="sm" variant="success" @click="showSelectModal">新增</b-button>
                                       <b-button size="sm" variant="danger" @click="deleteCarAdjustOutStockDetailInfo">删除</b-button>
                                   </template>
                               </div>    
                           </div>    
                        </div>
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
                                   <tr v-for="(item, index) in carAdjustOutStockDetailList" :key="index">
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
                                          {{ item.skuName }}
                                      </td>
                                      <td>
                                          1
                                      </td>
                                      <td>
                                          {{ item.msrp }}
                                      </td>
                                      <td>
                                          {{ item.purchasePrice }}
                                      </td>
                                      <td>
                                          {{ item.sourceWhName }}  
                                      </td>
                                   </tr>
                                   <tr v-if="carAdjustOutStockDetailList.length == 0">
                                       <td colspan='13' class="text-left">暂无数据...</td>
                                   </tr>
                               </tbody>
                           </table>
                        </div>
                    </div>
                </b-tab>
            </b-tabs>    
        </b-card>
        <select-modal :targetCode="targetCode"></select-modal>
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
    import selectModal from './selectModal'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import areashop from 'components/iris-areashop'
    import apiUrl from 'common/api-url'
    import {hasBtn} from 'common/com-api'
    export default {
        mounted() {
            let _this = this
            if (_this.isUpdate) {
               _this.getCarAdjustOutStockOrder({
                   outStockNo: _this.$route.params.outStockNo
               }) 
            } else {
                _this.getOutStockNo({
                    callback: (outStockNo) => {
                        _this.$data.carAdjustOutStockInfo.outStockNo = outStockNo
                    }
                })
            }
        },
        destroyed() {
            let _this = this
            _this.resetCarAdjustOutStockOrder()
        },
        data: function() {
            return {
                selectRow: -1,
                warehouseName: '',
                whCodeState: null,
                targetCode: '',
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
                    sourceWhName: {
                        label: '仓库'
                    }
                },
                carAdjustOutStockInfo: {
                    outStockNo: '',
                    sourceSalesAreaCode: '',
                    sourceStoreCode: '',
                    targetSalesAreaCode: '',
                    targetStoreCode: '',
                    skuCode: '',
                    produtionCode: '',
                    vin: '',
                    orderStatus: 0,
                    totalPurchasePrice: null,
                    outStockNums: null
                },
                orderStatusList: [
                    {
                        value: 0,
                        text: '未生效'
                    },
                    {
                        value: 1,
                        text: '已提交'
                    },
                    {
                        value: 2,
                        text: '已生效'
                    },
                    {
                        value: 3,
                        text: '已完成'
                    },
                    {
                        value: 4,
                        text: '已关闭'
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
            ...mapState('callOutVehicleResource', [
                'wareHouses',
                'carAdjustOutStockData',
                'addCarAdjustOutStockInfoSucc',
                'showAdditionalField',
                'carAdjustOutStockDetailList'
            ]),
            ...mapGetters('callOutVehicleResource', [
                'getWareHousesPageStart'
            ]),
            isUpdate: function() {
                let _this = this
                let outStockNo = _this.$route.params.outStockNo
                if(outStockNo != null && outStockNo!= '') {
                    return true 
                } else {
                    return false
                }
            },
            showDetail: function() {
                let _this = this
                let flag = _this.$route.params.flag
                if(flag != null && flag == config.showDetailFlag) {
                    return true 
                } else {
                    return false
                }
            },
            commitCarAdjustOutStockOrderBtn(){
                return hasBtn(apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.confirmAdjustOutCarInfo)
            },
            editCarAdjustOutStockOrderBtn(){
                return hasBtn(apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.update)
            },
            deleteCarAdjustOutStockOrderBtn(){
                return hasBtn(apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.cancelAdjustOutCarInfo)
            }
        },
        methods: {
            goBack: function() {
                this.$router.go(-1)
            },
            selectSourceStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.carAdjustOutStockInfo.sourceSalesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.carAdjustOutStockInfo.sourceSalesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.carAdjustOutStockInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    _this.carAdjustOutStockInfo.sourceStoreCode = ''
                } else if (stores.hasOwnProperty('value')) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    _this.carAdjustOutStockInfo.storeCodeSet[0] = stores.value
                    _this.carAdjustOutStockInfo.sourceStoreCode = stores.value 
                }
            },
            selectTargetStores: function(sales, stores) {
                console.log(11111111111)
                let _this = this
                if (sales instanceof Array) {
                    _this.carAdjustOutStockInfo.targetSalesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.carAdjustOutStockInfo.targetSalesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.carAdjustOutStockInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    _this.carAdjustOutStockInfo.targetStoreCode = ''
                } else if (stores.hasOwnProperty('value')) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    _this.carAdjustOutStockInfo.storeCodeSet[0] = stores.value
                    _this.targetCode = _this.carAdjustOutStockInfo.targetStoreCode = stores.value 
                }
            },
            createCarAdjustOutStockOrder: function() {
                let _this = this
                _this.addCarAdjustOutStockOrder(_this.$data.carAdjustOutStockInfo)
            },
            editCarAdjustOutStockOrder: function() {
                let _this = this
                _this.updateCarAdjustOutStockOrder(_this.$data.carAdjustOutStockInfo)
            },
            commitCarAdjustOutStockOrder: function() {
                let _this = this
                _this.submitCarAdjustOutStockOrder({
                    carAdjustOutStockInfo: _this.$data.carAdjustOutStockInfo,
                    callback: () => {
                        _this.goBack()
                    }
                }) 
            },
            deleteCarAdjustOutStockOrder: function() {
                let _this = this
                _this.cancelCarAdjustOutStockOrder({
                    outStockNo: _this.$route.params.outStockNo,
                    callback: () => {
                        _this.goBack()
                    }
                })  
            },
            deleteCarAdjustOutStockDetailInfo: function() {
                let _this = this
                if(parseInt(_this.selectRow) != -1) {
                   _this.deleteCarAdjustOutStockDetailInfoList(parseInt(_this.selectRow)) 
                } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                }     
            },
            ...mapActions('callOutVehicleResource', [
                'getOutStockNo',
                'getWareHouses',
                'resetWareHouses',
                'addCarAdjustOutStockOrder',
                'updateCarAdjustOutStockOrder',
                'submitCarAdjustOutStockOrder',
                'getCarAdjustOutStockOrder',
                'cancelCarAdjustOutStockOrder',
                'resetCarAdjustOutStockOrder',
                'deleteCarAdjustOutStockDetailInfoList',
                'showSelectModal',
                'resetCarAdjustOutStockOrderSucc'
            ])
        },
        watch: {
            carAdjustOutStockData: {
                 handler(val) {
                     console.log(val)
                    let _this = this
                    _this.$data.carAdjustOutStockInfo = {
                        id: val.id,
                        outStockNo: val.outStockNo,
                        sourceSalesAreaCode: val.sourceSalesAreaCode,
                        sourceStoreCode: val.sourceStoreCode,
                        sourceWhCode: val.sourceWhCode,
                        targetSalesAreaCode: val.targetSalesAreaCode,
                        targetStoreCode: val.targetStoreCode,
                        orderStatus: val.orderStatus,
                        outStockNums: val.outStockNums,
                        totalNums: val.totalNums,
                        totalPurchasePrice: val.totalPurchasePrice
                    }
                    _this.$refs.sourceStore.setselect({
                        value: (_this.$data.carAdjustOutStockInfo.sourceStoreCode === '0' ? '' : _this.$data.carAdjustOutStockInfo.sourceStoreCode),
                        salesCode: _this.$data.carAdjustOutStockInfo.sourceSalesAreaCode
                    })
                    _this.$refs.targetStore.setselect({
                        value: (_this.$data.carAdjustOutStockInfo.targetStoreCode === '0' ? '' : _this.$data.carAdjustOutStockInfo.targetStoreCode),
                        salesCode: _this.$data.carAdjustOutStockInfo.targetSalesAreaCode
                    })
                    this.targetCode = val.targetStoreCode
                },
                deep: true
            }
        },      
        components: {
            search,
            areashop,
            DatePicker,
            Pagination,
            selectModal,
            areaqueryshop
        }
    }
</script>