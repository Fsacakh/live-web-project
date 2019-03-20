<template>
    <div class="animated">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="采购订单编码" :label-cols="4" label-text-align="right">
                        <b-form-input v-model="purchaseOrder.orderNo" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="外部编码" :label-cols="4" label-text-align="right">
                        <b-form-input v-model="purchaseOrder.externalCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="供应商" :label-cols="4" label-text-align="right">
                        <search v-model="purchaseOrder.supplierCode" :dataList="suppliers" :valueName="'supplierName'" :keyName="'supplierCode'" @dataChange="getSuppliersListByName" @comScroll="getSuppliersList" @clickShowBack="getSuppliersList">
                        </search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="承运商名称" :label-cols="4" label-text-align="right">
                        <b-form-input v-model="purchaseOrder.commonCarrierName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="收货仓库" :label-cols="4" label-text-align="right">
                        <search v-model="purchaseOrder.whCode" :dataList="wareHouses" :valueName="'warehouseName'" :keyName="'warehouseCode'" @dataChange="getWareHouseListByName" @comScroll="getWareHouseList" @clickShowBack="getWareHouseList">
                        </search>
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
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryAllPurchaseOrders">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div>
                <router-link to="/purchaseOrder/add">
                    <b-button size="sm" variant="success" type="button">新增</b-button>
                </router-link>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="purchaseOrderInfoList" :fields="fields">
                    <template slot="orderNo" slot-scope="data">
                        <a href="#" @click.prevent="editPurchaseOrder(data.item.orderNo)">
                            {{ data.item.orderNo }}
                        </a>
                    </template>
                    <template slot="orderStatus" slot-scope="data">
                        {{ data.item.orderStatus == 0 ? '草稿' : (data.item.orderStatus == 1 ? '已确认': '废单')}}
                    </template>
                    <template slot="createTimeStr" slot-scope="data">
                        {{ data.item.createTimeStr | switchDate }}
                    </template>
                    <template slot="operate" slot-scope="data">
                       <b-button @click="deletePurchaseOrder(data.index)" v-show="data.item.orderStatus == '0'" size="sm" variant="danger" type="button">
                          删除
                       </b-button>
                       <b-button @click="cancelPurchaseOrder(data.index)" v-show="data.item.orderStatus == '1'" size="sm" variant="danger" type="button">
                          废单
                       </b-button>
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
        mapActions
    } from 'vuex'
    import config from '../../../common/config'
    import {
        MessageBox,
        Message,
        DatePicker,
    } from 'element-ui'
    import api from '../../../common/api'
    import Pagination from 'components/pagination/pagination'
    import search from '../../../components/search/search'
    import { format} from 'common/com-api'
    export default {
        data() {
            return {
                date:'',
                selectRow: -1,
                whList: [],
                supplierList: [],
                selitem: '',
                warehouseName: '',
                supplierName: '',
                purchaseOrder: {
                    orderType: config.supplyChain.purchaseOrder.normalOrderType,
                    orderNo: '',
                    commonCarrierName: '',
                    externalCode: '',
                    supplierCode: '',
                    whCode: '',
                    createTimeFrom:'',
                    createTimeTo:'',
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                fields: {
                    orderNo: {
                        label: '采购订单编码'
                    },
                    supplierName: {
                        label: '供应商'
                    },
                    commonCarrierName: {
                        label: '承运商名称'
                    },
                    arrivalNums: {
                        label: '实际到货总数'
                    },
                    contactAddress: {
                        label: '收货地址'
                    },
                    contactMobile: {
                        label: '手机'
                    },
                    contactName: {
                        label: '联系人'
                    },
                    contactPhone: {
                        label: '电话'
                    },
                    deadLineTime: {
                        label: '订单截止时间'
                    },
                    deliveryTypeName: {
                        label: '配送类型'
                    },
                    estimatedArrivalDate: {
                        label: '预计到货日期'
                    },
                    estimatedTotalMoney: {
                        label: '预计采购总金额'
                    },
                    storeName: {
                        label: '收货门店'
                    },
                    totalFreightFee: {
                        label: '运费'
                    },
                    totalMoney: {
                        label: '采购金额'
                    },
                    totalNums: {
                        label: '采购总数'
                    },
                    whName: {
                        label: '收货仓库'
                    },
                    purchaseTypeName: {
                        label: '采购类型'
                    },
                    orderStatus: {
                        label: '订单状态'
                    },
                    createTimeStr: {
                        label: '创建日期'
                    },
                    operate: {
                        label: '操作'
                    }
                }
            }
        },
        components: {
            Pagination,
            search,
            DatePicker
        },
        computed: {
            ...mapGetters('purchaseOrder', [
                'getWareHousesPageStart',
                'getSuppliersPageStart'
            ]),
            ...mapState('purchaseOrder', [
                'suppliers',
                'wareHouses',
                'purchaseOrderInfoList',
                'pager'
            ])
        },
        methods: {
            onDateChange(date){
                const _this = this
                if(_this.date[0]) {
                    let timeOne = _this.date[0]
                    let timeTwo = _this.date[1]
                    _this.purchaseOrder.createTimeFrom = format(timeOne) + " 00:00:00"
                    _this.purchaseOrder.createTimeTo = format(timeTwo) + " 23:59:59"
                }else {
                    _this.purchaseOrder.createTimeFrom = ''
                    _this.purchaseOrder.createTimeTo = ''
                }
            },
            clear: function() { //清除重置
                this.date=''
                this.purchaseOrder = {
                    createTimeFrom : '',
                    createTimeTo :'',
                    orderType: config.supplyChain.purchaseOrder.normalOrderType,
                    orderNo: '',
                    commonCarrierName: '',
                    externalCode: '',
                    supplierCode: '',
                    whCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            },
            cancelPurchaseOrder: function(index) {
                let _this = this
                let purchaseOrderInfo = _this.purchaseOrderInfoList[index]
                MessageBox.confirm('确定废单所选采购订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            _this.$store.dispatch('purchaseOrder/cancelPurchaseOrderInfo', {
                                purchaseOrderInfo: {
                                    orderNo: purchaseOrderInfo.orderNo
                                },
                                callback: function() {
                                    _this.queryPurchaseOrders()
                                    Message({
                                        type: 'info',
                                        message: config.messInfo.success
                                    })
                                }
                            })
                            done()
                        } else {
                            done()
                            return
                        }
                    },
                })
            },
            deletePurchaseOrder: function(index) {
                let _this = this
                MessageBox.confirm('确定删除所选采购订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            _this.deletePurchaseOrderInfo({
                                index: index,
                                callback: function() {
                                    _this.queryPurchaseOrders()
                                    Message({
                                        type: 'info',
                                        message: config.messInfo.success
                                    })
                                }
                            })
                            done()
                        } else {
                            done()
                            return
                        }
                    },
                })
            },
            queryAllPurchaseOrders: function() { //查询列表
                let _this = this
                _this.$data.purchaseOrder.pageStart = 1
                _this.queryPurchaseOrderInfo(_this.$data.purchaseOrder)
            },
            queryPurchaseOrders: function() { //查询列表
                let _this = this
                _this.queryPurchaseOrderInfo(_this.$data.purchaseOrder)
            },
            editPurchaseOrder: function(orderNo) {
                let _this = this
                _this.$router.push('/purchaseOrder/edit/' + orderNo)
            },
            getWareHouseList: function() {
                let _this = this
                _this.getSalesAreaInfoByUser({ callback: (areaCode, storeCode) => {
                    _this.getWareHouses({
                       warehouseName: _this.$data.warehouseName,
                       warehouseTypeFlag: 0,
                       storeCodeSet: storeCode ? [storeCode]: [],
                       pageNums: config.pageNums,
                       pageStart: _this.getWareHousesPageStart
                   })
                }})
            },
            getWareHouseListByName: function(warehouseName) {
                let _this = this
                _this.$data.warehouseName = warehouseName
                _this.resetWareHouses()
                _this.getSalesAreaInfoByUser({ callback: (areaCode, storeCode) => {
                    _this.getWareHouses({
                        warehouseName: warehouseName,
                        warehouseTypeFlag: 0,
                        storeCodeSet: storeCode ? [storeCode]: [],
                        pageNums: config.pageNums,
                        pageStart: _this.getWareHousesPageStart
                    })
                }})
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
            pageChange(page) { //分页查询
                this.purchaseOrder.pageStart = page
                this.queryPurchaseOrders()
            },
            ...mapActions('purchaseOrder', [
                'getSuppliers',
                'resetSuppliers',
                'getWareHouses',
                'resetWareHouses',
                'deletePurchaseOrderInfo',
                'queryPurchaseOrderInfo',
                'getSalesAreaInfoByUser'
            ])
        }
    }
</script>
