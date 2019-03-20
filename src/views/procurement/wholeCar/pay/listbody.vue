<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-12">
                        <b-button size="sm" variant="info" @click="exportReceipts" >导 出</b-button>
                        <div v-if="this.payObj.list" style="float: right">当前查询到的条数为:   {{this.payObj.total}}条</div>
                    </div>
                </div>
                <div class="table-scrollable mb-2">
                    <b-table striped hover bordered show-empty :items="payObj.list" :fields="fields">
                        <template slot="index" slot-scope="data">{{data.index + 1 + listIndex}}</template>
                        <template slot="orderNo" slot-scope="data">
                            <a href="javascript:;" @click="toConfirmByOrderNo(data.index)">{{ isInnerPurchase ? data.item.outStockNo : data.item.orderNo }}</a>
                        </template>
                        <template slot="auditSystemDate" slot-scope="data">
                            {{ isInnerPurchase ? data.item.auditPassTime : data.item.auditSystemDate }}
                        </template>
                        <template slot="skuCode" slot-scope="data">
                            <a href="javascript:;" @click="toConfirmSku(data.index)">{{data.value}}</a>
                        </template>
                        <template slot="purchaseFee" slot-scope="data">
                            {{ isInnerPurchase ? data.item.purchasePrice : data.item.purchaseFee }}
                        </template>
                        <template slot="purchaseRate" slot-scope="data">
                            {{ isInnerPurchase ? data.item.rate : data.item.purchaseRate }}
                        </template>
                        <template slot="estimatedPaymentDate" slot-scope="data" v-model="estimatedPaymentDate">
                            {{ data.value | slice }}
                        </template>
                        <template slot="paymentDate" slot-scope="data">
                            {{ data.value | slice }}
                        </template>
                        <template slot="paymentType" slot-scope="data">
                            {{ data.value | inType }}
                        </template>
                        <template slot="paymentSystemDate" slot-scope="data">
                            {{ data.value | slice }}
                        </template>
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <pagination class="pull-right" @page-change="pageChange" :page-no="payObj.pageNum" :page-size="payObj.pageSize" :total-pages="payObj.pages" :total-result="payObj.total">
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import config from 'common/config'
import common from 'common/common'

export default {
    components: {
        Pagination
    },
    props: ['queryParams'],
    data() {
        return {
            fields: {
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
                storeName: {
                    label: '收货门店'
                },
                supplierName: {
                    label: '供应商名称'
                },
                purchaseFee: {
                    label: '采购价格(含税)'
                },
                purchaseRate: {
                    label: '采购税率'
                },
                paymentFee: {
                    label: '付款价格'
                },
                paymentNo: {
                    label: '付款流水号'
                },
                carVinCode: {
                    label: '车架号'
                },
                estimatedPaymentDate: {
                    label: '预计付款日期'
                },
                paymentDate: {
                    label: '实际付款日期'
                },
                paymentType: {
                    label: '付款状态'
                },
                paymentSystemDate: {
                    label: '确认付款日期'
                },
                paymentOperatorName:{
                    label: '付款确认人'
                }
            },
        }
    },
    mounted() {
        console.log(this.payObj)
    },
    computed: {
        listIndex() {
            return (this.payObj.pageNum - 1) * this.payObj.pageSize
        },
        isInnerPurchase() {
            let _this = this
            return _this.queryParams.invoiceOrderType === config.invoiceOrderType.internalProcurement
        },
        ...mapGetters('lVehicle', [
            'payObj'
        ])
    },
    methods: {
        toConfirmByOrderNo(index) {
            let _this = this
            let orderNo = _this.isInnerPurchase ? this.payObj.list[index].outStockNo : this.payObj.list[index].orderNo
            let invoiceOrderType = _this.isInnerPurchase ? config.invoiceOrderType.internalProcurement : config.invoiceOrderType.carPurchase
            this.$router.push({
                path: 'confirm-pay',
                query: {
                    orderNo: orderNo,
                    invoiceOrderType: invoiceOrderType
                }
            })
        },
        toConfirmSku(index) {
            let _this = this
            let orderNo = _this.isInnerPurchase ? this.payObj.list[index].outStockNo : this.payObj.list[index].orderNo
            let invoiceOrderType = _this.isInnerPurchase ? config.invoiceOrderType.internalProcurement : config.invoiceOrderType.carPurchase
            let skuCode = this.payObj.list[index].skuCode
            this.$router.push({
                path: 'confirm-pay',
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
            this.setPayParams(JSON.parse(JSON.stringify(this.queryParams)))
            let params = this.queryParams;
            if (params.invoiceOrderType === config.invoiceOrderType.carPurchase) {
                this.getPayObj(params)
            } else {
                this.getInternalProPayObj(params)
            }
        },
        search(queryParams){
            let params = queryParams;
            this.setPayParams(JSON.parse(JSON.stringify(params)))
            //整车采购
            if (params.invoiceOrderType === config.invoiceOrderType.carPurchase) {
                this.getPayObj(params)
            } else {
            //内采内销
                this.getInternalProPayObj(params)
            }
        },
        // 导出
        async exportReceipts(){
            let res =  await api.supplyChain.procurement.pay.exportsPayReceipts(this.queryParams)
            if (res.data.code === 'success'){
                window.location.href = common.isDevFile() + res.data.obj;
            }
        },
        ...mapActions({
            getPayObj: "lVehicle/getPayObj",
            getInternalProPayObj: 'lVehicle/getInternalProPayObj'
        }),
        ...mapMutations({
            setDetailParams: "lVehicle/SET_DETAIL_PARAMS",
            setPayParams: 'lVehicle/SET_PAY_PARAMS'
        })
    },
    // watch: {
    //     queryParams: {
    //         handler(params) {
    //             console.info(55);
    //             this.setPayParams(JSON.parse(JSON.stringify(params)))
    //             //整车采购
    //             if (params.invoiceOrderType === config.invoiceOrderType.carPurchase) {
    //                 this.getPayObj(params)
    //             } else {
    //             //内采内销
    //                 this.getInternalProPayObj(params)
    //             }
    //         },
    //         deep: true
    //     }
    // },
    filters: {
        inType(val) {
            if(val) {
                return '已付款'
            }else {
                return '未付款'
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


