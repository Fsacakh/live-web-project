<template>
<div class="animated fadeIn">
    <div class="row">
        <div class="col-md-12">
            <b-card header="主档信息">
                <div class="row">
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="采购单号:" :label-cols="4" class="text-right">
                            <b-form-input v-if="isInnerPurchase" :value="mainDetail.outStockNo" readonly/>
                            <b-form-input v-else :value="mainDetail.orderNo" readonly/>
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
                            <b-form-input v-if="isInnerPurchase" :value="mainDetail.auditOperatorName" readonly/>
                            <b-form-input v-else :value="mainDetail.auditPassOperatorName" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="状态" :label-cols="4" class="text-right">
                            <b-form-input :value="mainDetail.orderStatus | filterStatus" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="采购总金额" :label-cols="4" class="text-right">
                            <b-form-input v-if="isInnerPurchase" :value="mainDetail.totalPurchasePrice" readonly/>
                            <b-form-input v-else :value="mainDetail.totalMoney" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="制单日期" :label-cols="4" class="text-right">
                            <b-form-input v-if="isInnerPurchase" :value="mainDetail.auditPassTime | timeSlice" readonly/>
                            <b-form-input v-else :value="mainDetail.auditSystemDate | timeSlice" readonly/>
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
                            <b-form-checkbox v-model="detailList[data.index].check" @input="handSelectedDetail(data.index, data.item.skuCode)"></b-form-checkbox>
                        </template>
                        <template slot="index" slot-scope="data">{{ isInnerPurchase ? data.index + 1: (data.index + (pageData.pageNum - 1)* pageData.pageSize + 1) }}</template>
                        <template slot="skuCode" slot-scope="data">
                            <a href="javascript:;" v-b-modal.detail @click="showDetail(data.value)">{{data.value}}</a>
                        </template>
                        <template slot="estimatedPurchaseFee" slot-scope="data">
                            {{ data.item.purchaseFee }}
                        </template>
                        <template slot="purchaseFee" slot-scope="data">
                            <input type="text" v-model="detailList[data.index].purchaseFee" :disabled="detailList[data.index].isInbound"/>
                        </template>
                        <template slot="estimatedPaymentDate" slot-scope="data">
                            <el-date-picker v-model="detailList[data.index].estimatedPaymentDate"
                                            type="date" placeholder="选择日期">
                            </el-date-picker>
                        </template>
                        <template slot="paymentDate" slot-scope="data">
                            <el-date-picker v-model="detailList[data.index].paymentDate"
                                            type="date" :picker-options="pickerOptionsLimit" placeholder="选择日期">
                            </el-date-picker>
                        </template>
                        <template slot="paymentFee" slot-scope="data">
                            <input type="number" v-model="detailList[data.index].paymentFee" />
                        </template>
                        <template slot="calFreigthFlag" slot-scope="row">
                            {{row.value === 1 ? '是' : '否'}}
                        </template>
                        <template slot="paymentNo" slot-scope="data">
                            <input type="text" v-model="detailList[data.index].paymentNo" />
                        </template>
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
                <div class="row mt-2" v-if="!isInnerPurchase">
                    <div class="col-md-12">
                        <pagination class="pull-right" @page-change="pageChange" :page-no="pageData.pageNum" :page-size="pageData.pageSize" :total-result="pageData.total" :total-pages="pageData.pages">
                        </pagination>
                    </div>
                </div>
                <search-btn v-if="confirmPayBtn" @reset="back" @query="handOk" resetText="返回" queryText="确认付款"></search-btn>
            </b-card>
        </div>
    </div>
    <modal ref="model"></modal>
</div>
</template>
<script>
import SearchBtn from "components/searchBtn/searchBtn"
import Modal from './modal'
import pagination from "components/pagination/pagination.vue"
import common from 'common/common'
import api from 'common/api'
import apiUrl from 'common/api-url'
import Vue from 'vue'
import config from '../../../../common/config'
import {hasBtn} from 'common/com-api'
import { MessageBox, Checkbox, DatePicker, Message } from  'element-ui'
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.component(MessageBox.name, MessageBox)
import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'
import { format, alertInfo } from 'common/com-api'

export default {
    components: {
        pagination,
        SearchBtn,
        Modal
    },
    data() {
        return {
            pageStart: 1,
            //分页
            pageData:{
                pageNum: config.pageNums
            },
            pickerOptionsLimit: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            fields: {
                check: {
                    label: '  '
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
            selectedDetailList: []
        }
    },
    computed: {
        confirmPayBtn(){
            return hasBtn(apiUrl.supplyChain.procurement.pay.editCarAdjustOutStockPayment)
        },
        status() {
            let val = this.mainDetail.orderStatus
            if(val === 0) {
                return '草稿'
            }else if(val === -1) {
                return '作废'
            }else if(val === 1) {
                return '正式不可修改'
            }
        },
        isInnerPurchase() {
            let _this = this
            return (this.$route.query.invoiceOrderType == config.invoiceOrderType.internalProcurement)
        },
        ...mapState('callOutVehicleResource', [
            'carAdjustOutStockData',
            'carAdjustOutStockDetailList'
        ]),
        ...mapGetters('lVehicle', [
            'detailParams'
        ])
    },
    mounted() {
        let _this = this
        if (_this.isInnerPurchase) {
            _this.getCarAdjustOutStockOrder({
                outStockNo: _this.$route.query.orderNo
            })
        } else {
            this.getMainInfo()
            this.getDetailList()
        }
    },
    destroyed() {
        let _this = this
        _this.resetCarAdjustOutStockOrder()
    },
    methods: {
        //分页方法
        pageChange(value){
            this.pageStart = value;
            this.getDetailList();
        },
        showDetail(code) {
            this.$refs.model.getDefaultInfo(code)
        },
        back() {
            this.$router.push({path: 'query'})
        },
        handOk() {
            const createElement = this.$createElement;
            MessageBox({
                title: '提示',
                message: createElement('p', null, [
                    createElement('span', null, `是否确定付款!`)
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
        handSelectedDetail(index, skuCode) {
            let _this = this
            if (_this.$data.detailList[index].check) {
                _this.$data.selectedDetailList[skuCode] = _this.$data.detailList[index]
            } else {
                _this.$data.selectedDetailList[skuCode] = null
            }
        },
        getMainInfo() {
            let params = this.$route.query
            api.supplyChain.purchaseOrder.getPurchaseOrderInfoByCode(params, res => {
                if (res.data.code === 'success') {
                    this.mainDetail = res.data.obj;
                }
            })
        },
        getDetailList() {
            let params = this.$route.query
            params.pageStart = this.pageStart;
            params.pageNums = config.pageNums;
            api.supplyChain.procurement.pay.getDetail(params).then( res => {
                if (res.data.code === 'success') {
                    this.detailList = res.data.obj.list;
                    this.pageData = res.data.obj; 
                    this.detailList.forEach((item, index) => {
                        if (this.$data.selectedDetailList[item.skuCode]) {
                           this.$set(this.$data.detailList[index], 'check', true)
                        } else {
                           this.$set(this.$data.detailList[index], 'check', false)
                        }

                        if( Number(item.arrivalNums) >= 1 ){
                            this.$set(this.$data.detailList[index], 'isInbound', true)
                        }else{
                            this.$set(this.$data.detailList[index], 'isInbound', false)
                        } 

                    })
                }
            })
        },
        // 确认付款
        confirmPay() {
            // 提取数组中的check状态, 并区分整体状态
            let params = [], arr = [], flag = false, _this = this;
            // 拿到最终的数据, 并对时间格式进行转化
            let skuCodes = Object.keys(this.selectedDetailList)
            skuCodes.forEach((skuCode, index) => {
               let item = this.selectedDetailList[skuCode]
               if (item) {
                   item.estimatedPaymentDate = format(item.estimatedPaymentDate)
                   item.paymentDate = format(item.paymentDate)
                   params.push(item)
                   flag = true
               }
            })
            //  根据之前区分好的整体状态来判断用户选了几条, 或者有没有选
            if(flag) {
                if (this.isInnerPurchase) {
                    api.supplyChain.procurement.pay.editCarAdjustOutStockPayment(params, (res) => {
                        alertInfo(res, () => {
                            _this.getCarAdjustOutStockOrder({
                                outStockNo: _this.$route.query.orderNo
                            })
                        })
                    })
                } else {
                    api.supplyChain.procurement.pay.edit(params).then( res => {
                        alertInfo(res, () => {
                            this.getDetailList()
                        })
                    })
                }
            } else {
                Message({
                    type: 'warning',
                    message: "请选择一条数据!"
                })
            }
        },
        ...mapActions('callOutVehicleResource', [
            'getCarAdjustOutStockOrder',
            'resetCarAdjustOutStockOrder'
        ])
    },
    watch: {
        carAdjustOutStockData: {
            handler(val) {
                let _this = this
                _this.mainDetail = JSON.parse(JSON.stringify(val))
            },
            deep: true
        },
        carAdjustOutStockDetailList: {
            handler(val) {
                let _this = this
                _this.detailList = JSON.parse(JSON.stringify(val))
            },
            deep: true
        }
    },
    filters: {
        filterStatus(val) {
            if(val === 0) {
                return '草稿'
            }else if(val === 1) {
                return '正式不可修改'
            }else if(val === -1) {
                return '作废'
            }
        },
        timeSlice(val) {
            if(val) {
                return val.substring(0, 19)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.el-input__inner {
    min-width: 125px;
}
</style>
