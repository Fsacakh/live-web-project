<template>
    <div class="row">
        <div class="col-md-12 whole-car-payment">
            <b-card>
                <!-- <div class="row">
                    <div class="col-md-12">
                        <b-button size="sm" variant="info" >导 出</b-button>
                    </div>
                </div> -->
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
                            {{ isInnerPurchase ? data.item.rate * 100 : data.item.purchaseRate }}
                        </template>
                        <template slot="estimatedPaymentDate" slot-scope="data">
                            {{ data.value | slice }}
                        </template>
                        <template slot="paymentDate" slot-scope="data">
                            {{ data.value | slice }}
                        </template>
                        <template slot="despatchDay" slot-scope="data">
                            {{ (data.item.despatchDay ? data.item.despatchDay : '') + '-' + (data.item.serviceDay ? data.item.serviceDay : '') }}
                        </template>
                        <template slot="accountRemindingStatu" slot-scope="data">
                            <div :class="[{'near-payment': data.item.accountRemindingStatu == 1},{'pass-payment': data.item.accountRemindingStatu == 2}]"><span>{{ data.item.accountRemindingStatu | inType }}</span></div>
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
                despatchDay: {
                    label: '发送及送达日期'
                },
                // paymentNo: {
                //     label: '付款流水号'
                // },
                estimatedPaymentDate: {
                    label: '预计付款日期'
                },
                paymentDate: {
                    label: '实际付款日期'
                },
                accountRemindingStatu: {
                    label: '付款状态'
                },
                paymentSystemDate: {
                    label: '确认付款日期'
                },
                paymentOperatorName:{
                    label: '付款确认人'
                }
            }
        }
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
            // let params = {orderNo: data}
            // this.setDetailParams(params)
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
            // let params = {
            //     orderNo: data.item.orderNo,
            //     skuCode: data.value
            // }
            // this.setDetailParams(params)
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
        ...mapActions({
            getPayObj: "lVehicle/getKedaPayObj",
            getInternalProPayObj: 'lVehicle/getInternalProPayObj'
        }),
        ...mapMutations({
            setDetailParams: "lVehicle/SET_DETAIL_PARAMS",
            setPayParams: 'lVehicle/SET_PAY_PARAMS'
        })
    },
    watch: {
        queryParams: {
            handler(params) {
                this.setPayParams(JSON.parse(JSON.stringify(params)))
                if (params.invoiceOrderType === config.invoiceOrderType.carPurchase) {
                    this.getPayObj(params)
                } else {
                    this.getInternalProPayObj(params)
                }
            },
            deep: true
        }
    },
    filters: {
        inType(val) {
            if(val == 1) {
                return '临近付款'
            }else if(val == 2) {
                return '逾期付款'
            }else if(val == 3) {
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
<style>
    .whole-car-payment table td {
        position: relative;
    }
    .near-payment {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: yellow;
    }
    .pass-payment {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: red;
    }
    .near-payment span {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        text-align: center;
        transform: translate(-50%, -50%)
    }
    .pass-payment span {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        text-align: center;
        transform: translate(-50%, -50%)
    }
</style>
