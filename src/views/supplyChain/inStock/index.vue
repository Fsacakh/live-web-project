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
            </div>
            <div class="row">
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
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="收货仓库" :label-cols="4" label-text-align="right">
                        <search v-model="purchaseOrder.whCode" :dataList="wareHouses" :valueName="'warehouseName'" :keyName="'warehouseCode'" @dataChange="getWareHouseListByName" @comScroll="getWareHouseList" @clickShowBack="getWareHouseList">
                        </search>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryAllPurchaseOrders">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
             <div class="table-scrollable">
                 <b-table striped hover bordered show-empty :items="purchaseOrderInfoList" :fields="fields">
                     <template slot="orderNo" slot-scope="data">
                         <a href="#" @click.prevent="inStock(data.index)">
                            {{ data.item.orderNo }}
                         </a>
                         <!-- <span v-else>
                            {{ data.item.orderNo }}
                         </span> -->
                     </template>
                     <template slot="inStockStatus" slot-scope="data">
                         {{data.item.arrivalNums >= 1 ? '已入库' : '未入库'}}
                         <!-- {{ data.item.arrivalNums >= data.item.totalNums ? '已入库': '未入库' }} -->
                     </template>
                     <template slot="auditSystemDate" slot-scope="data">
                         {{ data.item.auditSystemDate | switchDate }}
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
         Message
     } from 'element-ui'
     import api from '../../../common/api'
     import Pagination from 'components/pagination/pagination'
     import search from '../../../components/search/search'

     export default {
         data: function() {
             return {
                 selectRow: -1,
                 warehouseName: '',
                 supplierName: '',
                 purchaseOrder: {
                    orderType: config.supplyChain.purchaseOrder.normalOrderType,
                    orderNo: '',
                    commonCarrierName: '',
                    externalCode: '',
                    supplierCode: '',
                    whCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                 },
                 fields: {
                    orderNo: {
                        label: '采购订单编码'
                    },
                    inStockStatus: {
                        label: '入库状态'
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
                    auditSystemDate: {
                        label: '入库时间'
                    }
                 }
             }
         },
         computed: {
             ...mapGetters('inStock', [
                'getWareHousesPageStart',
                'getSuppliersPageStart'
             ]),
             ...mapState('inStock', [
                 'suppliers',
                 'wareHouses',
                 'purchaseOrderInfoList',
                 'pager'
             ])
         },
         methods: {
             clear: function() { //清除重置
                this.purchaseOrder = {
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
             queryAllPurchaseOrders: function() {
                let _this = this
                _this.$data.purchaseOrder.pageStart = 1
                _this.queryPurchaseOrderInfo(_this.$data.purchaseOrder)
             },
             queryPurchaseOrders: function() { //查询列表
                let _this = this
                _this.queryPurchaseOrderInfo(_this.$data.purchaseOrder)
             },
             inStock: function(index) {
                let _this = this
                let purchaseOrderInfo = _this.purchaseOrderInfoList[index]
                _this.$router.push('/inStock/edit/' + purchaseOrderInfo.orderNo)
             },
             getWareHouseList: function() {
                let _this = this
                _this.getWareHouses({
                    warehouseName: _this.$data.warehouseName,
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
             pageChange(page) { //分页查询
                this.purchaseOrder.pageStart = page
                this.queryPurchaseOrders()
             },
             ...mapActions('inStock', [
                 'getSuppliers',
                 'resetSuppliers',
                 'getWareHouses',
                 'resetWareHouses',
                 'queryPurchaseOrderInfo',
             ])
         },
         components: {
             Pagination,
             search
         }
     }
</script>
