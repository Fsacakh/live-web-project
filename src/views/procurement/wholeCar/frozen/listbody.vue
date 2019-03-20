<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-12">
                        <b-button size="sm" variant="info" >导 出</b-button>
                    </div>
                </div>
                <div class="table-scrollable mb-2">
                    <b-table striped hover bordered show-empty :items="payObj.list" :fields="fields">
                        <template slot="index" slot-scope="data">{{data.index + 1 + listIndex}}</template>
                        <template slot="orderNo" slot-scope="data">
                            <a href="javascript:;" @click="toConfirmByOrderNo(data.value)">{{data.value}}</a>
                        </template>
                        <template slot="skuCode" slot-scope="data">
                            <a href="javascript:;" @click="toConfirmSku(data)">{{data.value}}</a>
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
                    label: '采购单号'
                },
                auditSystemDate: {
                    label: '采购确认日期'
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
                estimatedPaymentDate: {
                    label: '预计付款日期'
                },
                paymentDate: {
                    label: '实际付款日期'
                },
                paymentType: {
                    label: '付款状态'
                },
                invoiceDate: {
                    label: '确认日期'
                },
                invoiceOperatorName:{
                    label: '付款确认人'
                }
            }
        }
    },
    computed: {
        listIndex() {
            return (this.payObj.pageNum - 1) * this.payObj.pageSize
        },
        ...mapGetters('lVehicle', [
            'payObj'
        ])
    },
    methods: {
        toConfirmByOrderNo(data) {
            let params = {orderNo: data}
            this.setDetailParams(params)
            this.$router.push({path: 'confirm-frozen'})
        },
        toConfirmSku(data) {
            let params = {
                orderNo: data.item.orderNo,
                skuCode: data.value
            }
            this.setDetailParams(params)
            this.$router.push({path: 'confirm-frozen'})
        },
        pageChange(page) {
            this.queryParams.pageStart = page;
            this.queryParams.pageNums = config.pageNums;
            let params = this.queryParams;
            this.getPayObj(params)
        },
        ...mapActions({
            getPayObj: "lVehicle/getPayObj"
        }),
        ...mapMutations({
            setDetailParams: "lVehicle/SET_DETAIL_PARAMS"
        })
    }
}
</script>


