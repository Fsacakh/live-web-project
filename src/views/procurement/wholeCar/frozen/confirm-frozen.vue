<template>
<div class="animated fadeIn">
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div slot="header">
                    <strong>主档信息</strong>
                </div>
                <div class="row">
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="采购单号:" :label-cols="4" class="text-right">
                            <b-form-input :value="mainDetail.orderNo" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="收货门店" :label-cols="4" class="text-right">
                            <b-form-input :value="mainDetail.storeName" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="供应商" :label-cols="4" class="text-right">
                            <b-form-input :value="mainDetail.supplierName" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="运费总金额" :label-cols="4" class="text-right">
                            <b-form-input :value="mainDetail.totalFreightFee" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="制单人" :label-cols="4" class="text-right">
                            <b-form-input :value="mainDetail.auditOperatorName" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="状态" :label-cols="4" class="text-right">
                            <b-form-input :value="mainDetail.orderType" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="采购总金额" :label-cols="4" class="text-right">
                            <b-form-input :value="mainDetail.totalMoney" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="制单日期" :label-cols="4" class="text-right">
                            <b-form-input :value="mainDetail.auditSystemDate" readonly/>
                        </b-form-fieldset>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div class="table-scrollable mb-2 border-top">
                    <b-table striped hover bordered show-empty :items="detailList" :fields="fields">
                        <template slot="check" slot-scope="data">
                            <el-checkbox v-model="detailList[data.index].check"></el-checkbox>
                        </template>
                        <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                        <template slot="skuCode" slot-scope="data">
                            <a href="javascript:;" v-b-modal.detail @click="showDetail(data.value)">{{data.value}}</a>
                        </template>
                        <template slot="purchaseFee" slot-scope="data">
                            <input type="text" v-model="detailList[data.index].purchaseFee" />
                        </template>
                        <template slot="estimatedPaymentDate" slot-scope="data">
                            <el-date-picker v-model="detailList[data.index].estimatedPaymentDate"
                                            type="date" placeholder="选择日期">
                            </el-date-picker>
                        </template>
                        <template slot="paymentDate" slot-scope="data">
                            <el-date-picker v-model="detailList[data.index].paymentDate"
                                            type="date" placeholder="选择日期">
                            </el-date-picker>
                        </template>
                        <template slot="paymentFee" slot-scope="data">
                            <input type="text" v-model="detailList[data.index].paymentFee" />
                        </template>
                        <template slot="paymentNo" slot-scope="data">
                            <input type="text" v-model="detailList[data.index].paymentNo" />
                        </template>
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
                <search-btn @reset="back" @query="handOk" resetText="返回" queryText="确认付款"></search-btn>
            </b-card>
        </div>
    </div>
    <modal :detailList="detailListBySku"></modal>
</div>
</template>
<script>
import SearchBtn from "components/searchBtn/searchBtn"
import Modal from './modal'
import common from 'common/common'
import api from 'common/api'
import Vue from 'vue'
import { MessageBox, Checkbox, DatePicker, Message } from  'element-ui'
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.component(MessageBox.name, MessageBox)
import {mapGetters} from 'vuex'
import {formatDate, alertInfo} from 'common/com-api'

export default {
    components: {
        SearchBtn,
        Modal
    },
    data() {
        return {
            fields: {
                check: {
                    label: ''
                },
                index: {
                    label: '序号'
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
                freightFee: {
                    label: '运费'
                },
                calFreigthFlag: {
                    label: '运费是否计入采购成本'
                },
                estimatedPurchaseFee: {
                    label: '采购价格(含税)'
                },
                purchaseRate: {
                    label: '采购税率'
                },
                status: {  // 无参数
                    label: '车辆物流状态'
                },
                purchaseFee: {
                    label: '实际采购价格(含税)'
                },
                estimatedPaymentDate: {
                    label: '预计付款日期'
                },
                paymentDate: {
                    label: '实际付款日期'
                },
                paymentFee: {
                    label: '付款金额'
                },
                paymentNo: {
                    label: '付款流水号'
                }
            },
            mainDetail: {},
            detailList: [],
            detailListBySku: []
        }
    },
    computed: {
        ...mapGetters('lVehicle', [
            'detailParams'
        ])
    },
    mounted() {
        this.getMainInfo()
        this.getDetailList()
    },
    methods: {
        showDetail(code) {
            let params = {skuCode: code}
            api.product.archives.queryArchives(params).then( res => {
                if(res.data.code === 'success') {
                    this.detailListBySku = res.data.obj.list[0]
                }
            })
        },
        back() {
            this.$router.push({path: 'query'})
        },
        handOk() {
            const createElement = this.$createElement;
            MessageBox({
                title: '提示',
                message: createElement('p', null, [
                    createElement('span', null, `是否确定 ( ${this.detailList.length} ) 辆车付款!`)
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        this.confirmPay()
                        done()
                        instance.confirmButtonLoading = false;
                    } else {
                        done();
                        instance.confirmButtonLoading = false;
                        return
                    }
                }
            }).then(action => {
                common.alertInfo(success)
            }).catch(() => {})
        },
        getMainInfo() {
            let params = this.detailParams
            api.supplyChain.purchaseOrder.getPurchaseOrderInfoByCode(params, res => {
                if (res.data.code === 'success') {
                    this.mainDetail = res.data.obj;
                }
            })
        },
        getDetailList() {
            let params = this.detailParams
            api.supplyChain.procurement.pay.getDetail(params).then( res => {
                if (res.data.code === 'success') {
                    this.detailList = res.data.obj;
                }
            })
        },
        // 确认付款
        confirmPay() {
            // 提取数组中的check状态, 并区分整体状态
            let params = [], arr = [], flag;
            this.detailList.forEach( item => {
                arr.push(item.check)
            })
            for(let j = 0; j < arr.length; j++) {
                if(arr[j]) {
                    flag = true
                    break;
                }
                flag = false
            }
            // 拿到最终的数据, 并对时间格式进行转化
            this.detailList.forEach( item => {
                let data = {
                    id: item.id,
                    orderNo: item.orderNo,
                    skuCode: item.skuCode,
                    detailCode: item.detailCode,
                    purchaseFee: item.purchaseFee,                                // 实际采购价格( 含税 )
                    estimatedPaymentDate: formatDate(item.estimatedPaymentDate),  // 预计付款时间
                    paymentDate: formatDate(item.paymentDate),                    // 实际付款时间
                    paymentFee: item.paymentFee,                                  // 付款金额
                    paymentNo: item.paymentNo                                     // 付款流水号
                }
                if(item.check) {
                    params.push(data)
                }
            })
            //  根据之前区分好的整体状态来判断用户选了几条, 或者有没有选
            if(flag) {
                api.supplyChain.procurement.pay.edit(params).then( res => {
                    alertInfo(res)
                })
            }else {
                Message({
                    type: 'warning',
                    message: "请选择一条数据!"
                })
            }


        }
    }
}
</script>
<style scoped>

</style>
