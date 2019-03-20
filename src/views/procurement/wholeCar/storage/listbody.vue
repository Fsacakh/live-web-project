<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <!-- <div class="row">
                    <div class="col-md-12">
                        <b-button size="sm" variant="info" >导 出</b-button>
                    </div>
                </div> -->
                <div class="table-scrollable mb-2">
                    <b-table striped hover bordered show-empty :items="storageObj.list" :fields="fields">
                        <template slot="index" slot-scope="data">{{data.index + 1 + listIndex}}</template>
                        <template slot="orderNo" slot-scope="data">
                            <a href="javascript:;" @click="toConfirmByOrderNo(data.index)">{{ isInnerPurchase ? data.item.inStockNo : data.item.orderNo }}</a>
                        </template>
                        <template slot="auditSystemDate" slot-scope="data">
                            {{ (isInnerPurchase ? data.item.auditPassTime : data.item.auditSystemDate) | switchDate }}
                        </template>
                        <template slot="skuCode" slot-scope="data">
                            <a href="javascript:;" @click="toConfirmSku(data.index)">{{data.value}}</a>
                        </template>
                        <template slot="purchaseFee" slot-scope="data">
                            {{ isInnerPurchase ? data.item.purchasePrice : data.item.purchaseFee }}
                        </template>
                        <template slot="purchaseRate" slot-scope="data">
                            {{ isInnerPurchase ? data.item.rate * 100 : data.item.purchaseRate }}
                        </template>
                        <template slot="rowStatus" slot-scope="data">
                            {{data.value | filterStatus}}
                        </template>
                        <template slot="businessActualArriveTime" slot-scope="data">
                            {{ data.value | slice }}
                            {{ /*data.item.rowStatus ? data.value.substring(0, 10) : '' */ }}
                        </template>
                        <template slot="inStockSystemTime" slot-scope="data">
                            {{ data.value | slice }}
                        </template>
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <pagination class="pull-right" @page-change="pageChange" :page-no="storageObj.pageNum" :page-size="storageObj.pageSize" :total-pages="storageObj.pages" :total-result="storageObj.total">
                        </pagination>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</template>
<script>

import Pagination from 'components/pagination/pagination'
import api from 'common/api'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import config from 'common/config'

export default {
    components: {
        Pagination
    },
    props: ['queryParams'],
    data() {
        return {
            fieldsGetInternalProStorageObj:{
                index: {
                    label: '序号'
                },
                orderNo: {
                    label: '单据号'
                },
                auditSystemDate: {
                    label: '确认日期'
                },
                skuCode: {
                    label: 'SKU编码'
                },
                skuName: {
                    label: 'SKU名称'
                },
                carProductionCode: {
                    label: '生产号'
                },
                carVinCode: {
                    label: '车架号'
                },
                targetStoreName: {
                    label: '收货门店'
                },
                businessActualArriveTime: {
                    label: '实际入库日期'
                },
                rowStatus: {
                    label: '入库状态'
                },
                inStockSystemTime: {
                    label: '确认入库日期'
                }
            },
            fieldsGetStorageObj:{
                index: {
                    label: '序号'
                },
                orderNo: {
                    label: '单据号'
                },
                auditSystemDate: {
                    label: '确认日期'
                },
                skuCode: {
                    label: 'SKU编码'
                },
                skuName: {
                    label: 'SKU名称'
                },
                carProductionCode: {
                    label: '生产号'
                },
                carVinCode: {
                    label: '车架号'
                },
                storeName: {
                    label: '收货门店'
                },
                supplierName: {
                    label: '供应商名称'
                },
                businessActualArriveTime: {
                    label: '实际入库日期'
                },
                rowStatus: {
                    label: '入库状态'
                },
                inStockSystemTime: {
                    label: '确认入库日期'
                },
                inStockOperatorName:{
                    label: '入库确认人'
                }
            }
        }
    },
    computed: {
        listIndex() {
            return (this.storageObj.pageNum - 1) * this.storageObj.pageSize
        },
        isInnerPurchase() {
            let _this = this
            return _this.queryParams.invoiceOrderType === config.invoiceOrderType.internalProcurement
        },
        ...mapGetters('lVehicle', [
            'storageObj'
        ]),
        ...mapState('lVehicle', [
            'isInnerPurchase_'
        ])
    },
    created() {
        this.fields = this.fieldsGetStorageObj;
        if(this.isInnerPurchase_.invoiceOrderType == config.invoiceOrderType.internalProcurement) {
            this.getInternalProStorageObj(this.isInnerPurchase_)
        }
    },
    methods: {
        toConfirmByOrderNo(index) {
            let _this = this
            let orderNo = _this.isInnerPurchase ? this.storageObj.list[index].inStockNo : this.storageObj.list[index].orderNo
            let invoiceOrderType = _this.isInnerPurchase ? config.invoiceOrderType.internalProcurement : config.invoiceOrderType.carPurchase
            this.$router.push({
                path: 'confirm-storage',
                query: {
                    orderNo: orderNo,
                    invoiceOrderType: invoiceOrderType
                }
            })
        },
        toConfirmSku(index) {
            let _this = this
            let orderNo = _this.isInnerPurchase ? this.storageObj.list[index].inStockNo : this.storageObj.list[index].orderNo
            let invoiceOrderType = _this.isInnerPurchase ? config.invoiceOrderType.internalProcurement : config.invoiceOrderType.carPurchase
            let skuCode = this.storageObj.list[index].skuCode
            this.$router.push({
                path: 'confirm-storage',
                query: {
                    orderNo: orderNo,
                    invoiceOrderType: invoiceOrderType,
                    skuCode: skuCode
                }
            })
        },
        pageChange(page) {
            this.queryParams.pageStart = page;
            this.queryParams.pageNums = config.pageNums;
            let params = this.queryParams;
            this.setStorageParams(JSON.parse(JSON.stringify(this.queryParams)))
            if (params.invoiceOrderType === config.invoiceOrderType.carPurchase) {
                this.getStorageObj(params)
            } else {
                this.getInternalProStorageObj(params)
            }
        },
        search(params){
            this.setStorageParams(JSON.parse(JSON.stringify(params)))
            if (params.invoiceOrderType === config.invoiceOrderType.carPurchase) {
                this.fields = this.fieldsGetStorageObj;
                this.getStorageObj(params)
            } else {
                this.fields = this.fieldsGetInternalProStorageObj;
                this.getInternalProStorageObj(params)
            }
        },
        ...mapActions({
            getStorageObj: 'lVehicle/getStorageObj',
            getInternalProStorageObj: 'lVehicle/getInternalProStorageObj'
        }),
        ...mapMutations({
            setStorageParams: 'lVehicle/SET_STORAGE_PARAMS'
        })
    },
    // watch: {
    //     queryParams: {
    //         handler(params) {
    //             this.setStorageParams(JSON.parse(JSON.stringify(params)))
    //             if (params.invoiceOrderType === config.invoiceOrderType.carPurchase) {
    //                 this.getStorageObj(params)
    //             } else {
    //                 this.getInternalProStorageObj(params)
    //             }
    //         },
    //         deep: true
    //     }
    // },
    filters: {
        filterStatus(val) {
            if(val === 0) {
                return '未入库'
            }else if (val === 1) {
                return '已入库'
            }
        },
        slice(val) {
            if(val) {
                return val.substring(0, 10)
            }
        }
    }
}
</script>


