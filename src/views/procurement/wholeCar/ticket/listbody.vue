<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
               <div class="text-right">当前查询到{{ticketObj.total}}条开票记录</div>
                <div class="table-scrollable mb-2">
                    <b-table striped hover bordered show-empty :items="ticketObj.list" :fields="fields">
                        <template slot="index" slot-scope="data">{{data.index + 1 + listIndex}}</template>
                        <template slot="orderNo" slot-scope="data">
                            <a href="javascript:;" @click="toConfirmByOrderNo(data.index)">{{ isInnerPurchase ? data.item.outStockNo : data.item.orderNo }}</a>
                        </template>
                        <template slot="auditSystemDate" slot-scope="data">
                            {{ isInnerPurchase ? data.item.auditPassTime : data.item.auditSystemDate }}
                        </template>
                        <template slot="skuCode" slot-scope="data">
                            <a href="javascript:;" @click="toConfirmBySku(data.index)">{{data.value}}</a>
                        </template>
                        <template slot="purchaseFee" slot-scope="data">
                            {{ isInnerPurchase ? data.item.purchasePrice : data.item.purchaseFee }}
                        </template>
                        <template slot="purchaseRate" slot-scope="data">
                            {{ isInnerPurchase ? data.item.rate : data.item.purchaseRate }}
                        </template>
                        <template slot="invoiceType" slot-scope="data">
                            {{ data.value | inType }}
                        </template>
                        <template slot="invoiceDate" slot-scope="data">
                            {{ data.value | slice }}
                        </template>
                        <template slot="auditSystemDate" slot-scope="data">
                            {{ data.value | slice }}
                        </template>
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <pagination
                            class="pull-right"
                            @page-change="pageChange"
                            :page-no="ticketObj.pageNo"
                            :page-size="ticketObj.pageSize"
                            :total-result="ticketObj.total"
                            :total-pages="ticketObj.totalPages">
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
import { mapMutations, mapActions, mapGetters } from 'vuex'
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
                purchaseFee: {
                    label: '采购价格(含税)'
                },
                purchaseRate: {
                    label: '采购税率'
                },
                invoiceType: {
                    label: '开票状态'
                },
                invoiceDate: {
                    label: '确认开票日期'
                },
                invoiceOperatorName:{
                    label: '开票确认人'
                }
            },
        }
    },
    computed: {
        listIndex() {
            return (this.ticketObj.pageNum - 1) * this.ticketObj.pageSize
        },
        isInnerPurchase() {
            let _this = this
            return (_this.queryParams.invoiceOrderType === config.invoiceOrderType.internalProcurement)
        },
        ...mapGetters('lVehicle', [
            'ticketObj'
        ])
    },
    methods: {
        toConfirmByOrderNo(index) {
            let _this = this
            let orderNo = _this.isInnerPurchase ? this.ticketObj.list[index].outStockNo : this.ticketObj.list[index].orderNo
            let invoiceOrderType = _this.isInnerPurchase ? config.invoiceOrderType.internalProcurement : config.invoiceOrderType.carPurchase
            this.$router.push({
                path: 'confirm-ticket',
                query: {
                    orderNo: orderNo,
                    invoiceOrderType: invoiceOrderType
                }
            })
        },
        toConfirmBySku(index) {
            let _this = this
            let orderNo = _this.isInnerPurchase ? this.ticketObj.list[index].outStockNo : this.ticketObj.list[index].orderNo
            let invoiceOrderType = _this.isInnerPurchase ? config.invoiceOrderType.internalProcurement : config.invoiceOrderType.carPurchase
            let skuCode = this.ticketObj.list[index].skuCode
            this.$router.push({
                path: 'confirm-ticket',
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
            this.setTicketParams(JSON.parse(JSON.stringify(this.queryParams)))
            if (this.queryParams.invoiceOrderType === config.invoiceOrderType.carPurchase) {
                this.getTicketObj(this.queryParams)
            } else {
                this.getInternalProTicketObj(this.queryParams)
            }
        },
        search(queryParams){
            let params = queryParams;
            this.setTicketParams(JSON.parse(JSON.stringify(queryParams)))
            if (params.invoiceOrderType === config.invoiceOrderType.carPurchase) {
                this.getTicketObj(params)
            } else {
                this.getInternalProTicketObj(params)
            }
        },
        ...mapMutations({
            setTicketParams: 'lVehicle/SET_TICKET_PARAMS'
        }),
        ...mapActions({
            getTicketObj: 'lVehicle/getTicketObj',
            getTicketDetail: 'lVehicle/getTicketDetail',
            getInternalProTicketObj: 'lVehicle/getInternalProTicketObj'
        })
    },
    // watch: {
    //     queryParams: {
    //         handler(params) {
    //             this.setTicketParams(JSON.parse(JSON.stringify(this.queryParams)))
    //             if (params.invoiceOrderType === config.invoiceOrderType.carPurchase) {
    //                 this.getTicketObj(params)
    //             } else {
    //                 this.getInternalProTicketObj(params)
    //             }
    //         },
    //         deep: true
    //     }
    // },
    filters: {
        inType(val) {
            if(val) {
                return '已开票'
            }else {
                return '未开票'
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


