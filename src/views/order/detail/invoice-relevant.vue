<template>
<div class="row">
<div class="col-md-12">
    <b-card header="发票相关">
        <!-- <div slot="header" @click="toggle">
            <strong>发票相关</strong>
        </div> -->
        <div v-show="!show">
            <div class="table-scrollable mb-2">
                <b-table striped hover bordered show-empty :items="list" :fields="fields">
                    <template slot="isReturnTicket" slot-scope="row">{{getIsReturnTicket(row.item)}}</template>
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
        </div>
    </b-card>
</div>
</div>
</template>
<script>
import api from 'common/api'
import config from 'common/config'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            fields: {
                // 暂无对应字段
                isReturnTicket: {
                    label: '是否退票'
                },
                sourceSubOrderNo: {
                    label: '开票内容'
                },
                invoiceTypeName: {
                    label: '发票类型'
                },
                invoiceTitle: {
                    label: '开票人/企业名称'
                },
                taxRegistrationNo: {
                    label: '纳税人识别号'
                },
                companyAddress: {
                    label: '地址'
                },
                companyTelephone: {
                    label: '电话'
                },
                openBankName: {
                    label: '开户行'
                },
                openBankAccount: {
                    label: '账号'
                },
                invoicePrice: {
                    label: '已开票金额'
                },
                invoiceNo: {
                    label: '发票号'
                },
                refundInvoiceNo: {
                    label: '红冲发票号'
                },
            },
            list: [],
            show: false,
            orderNo: ''
        }
    },
    computed: {
        ...mapGetters('order', [
            'orderDetailObj'
        ])
    },
    methods: {
        toggle() {
            this.show = !this.show
        },
        queryList(_orderNo) {
            const params = {
                sourceOrderNo: _orderNo,
                pageStart: 1,
                pageNums: config.maxPageNums
            }
            api.financing.queryOrderBillingInfo(params, res => {
                if(res.data.code === 'success') {
                   this.list = res.data.obj.list
                }
            })
        },
        getIsReturnTicket(item) {
            return item.refundInvoiceNo ? '是' : '否'
        }
    },
    watch: {
        orderDetailObj() {
            this.orderNo = this.orderDetailObj.orderNo
            if(this.orderNo) {
                this.queryList(this.orderNo)
            }
        }
    }
}
</script>
