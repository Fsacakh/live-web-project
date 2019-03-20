<template>
<div class="row">
<div class="col-md-12">
    <b-card header="支付相关">
        <div v-show="!show">
            <div class="table-scrollable mb-2">
                <b-table striped hover bordered show-empty :items="list" :fields="fields">
                    <template slot="payStatus" slot-scope="row">{{row.value | status}}</template>
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
                payStatus: {
                    label: '支付状态'
                },
                paymentTypeName: {
                    label: '支付方式'
                },
                moneyPrice: {
                    label: '金额'
                },
                // 下面三个参数不确定
                createTimeStr: {
                    label: '收款日期'
                },
                paymentTransactionNo: {
                    label: '交易凭证号'
                },
                payeeName: {
                    label: '收款员'
                }
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
                pageNums: config.maxPageNums,
                isDeleted: '0'
            }
            api.financing.queryPayHistory(params, res => {
                if(res.data.code === 'success') {
                    this.list = res.data.obj.list
                    let obj = {}, sum = 0
                    for(let i=0; i<this.list.length; i++) {
                        if (this.list[i].payStatus > 0) {
                           sum += this.list[i].moneyPrice
                        } else {
                           sum -= this.list[i].moneyPrice  
                        }
                    }
                    obj = {
                       payStatus: 0,
                       moneyPrice: sum.toFixed(2)
                    }
                    this.list.push(obj)
                }
            })
        }
    },
    watch: {
        orderDetailObj() {
            this.orderNo = this.orderDetailObj.orderNo
            if(this.orderNo) {
                this.queryList(this.orderNo)
            }
        }
    },
    filters: {
        status(val) {
            if(val === -1) {
                return '退款'
            }else if(val === 0) {
                return '小计'
            }else if(val === 1) {
                return '收款'
            }
        }
    }
}
</script>
