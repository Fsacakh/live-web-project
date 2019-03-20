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
                        <b-form-fieldset horizontal label="制单人" :label-cols="4" class="text-right">
                            <b-form-input v-if="isInnerPurchase" :value="mainDetail.auditOperatorName" readonly/>
                            <b-form-input v-else :value="mainDetail.auditPassOperatorName" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="制单日期" :label-cols="4" class="text-right">
                            <b-form-input v-if="isInnerPurchase" :value="mainDetail.auditPassTime | timeSlice" readonly/>
                            <b-form-input v-else :value="mainDetail.auditSystemDate | timeSlice" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <b-form-fieldset horizontal label="状态" :label-cols="4" class="text-right">
                            <b-form-input :value="status" readonly/>
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
                    <b-table striped hover bordered show-empty :items="list" :fields="fields">
                        <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                        <template slot="skuCode" slot-scope="data">
                            <a href="javascript:;" v-b-modal.detail @click="showDetail(data.value)">{{data.value}}</a>
                        </template>
                        <template slot="businessActualArriveTime" slot-scope="data">
                            <el-date-picker v-model="list[data.index].businessActualArriveTime"
                                            :disabled="isDisable(data)"
                                            :picker-options="pickerOptionsLimit"
                                            type="date" placeholder="选择日期" >
                            </el-date-picker>
                        </template>
                        <template slot="rowStatus" slot-scope="data">
                            <b-button v-if="handOkBtnType" size="sm" :disabled="isDisable(data)" :variant="data.value ? '' : 'primary'" @click="handOk(data.item)">
                                {{ data.value ? '&nbsp已&nbsp入&nbsp库&nbsp' : '入库确认' }}
                            </b-button>
                        </template>
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
            </b-card>
            <div class="row mt-2">
               <div class="col-md-12">
                 <pagination class="pull-right" @page-change="pageChange" :page-no="pageData.pageNum" :page-size="pageData.pageSize" :total-result="pageData.total" :total-pages="pageData.pages">
                 </pagination>
               </div>
            </div>
        </div>
    </div>
    <modal ref="model"></modal>
</div>
</template>
<script>
import common from 'common/common'
import api from 'common/api'
import apiUrl from 'common/api-url'
import {hasBtn} from 'common/com-api'
import Vue from 'vue'
import config from '../../../../common/config'
import { MessageBox, DatePicker, Message } from  'element-ui'
Vue.use(DatePicker)
Vue.component(MessageBox.name, MessageBox)
import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'
import {alertInfo, format} from 'common/com-api'
import Modal from './modal'
import pagination from "components/pagination/pagination.vue"
export default {
    components: {
        Modal,
        pagination
    },
    data() {
        return {
            handOkBtnType: true,//确认入库按钮显示状态
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
                index: {
                    label: '序号'
                },
                skuCode: {
                    label: 'SKU编码'
                },
                skuName: {
                    label: 'SKU名称'
                },
                carDisplayName: {  // 无参数
                    label: '车款'
                },
                carProductionCode: {
                    label: '生产号'
                },
                carVinCode: {
                    label: '车架号'
                },
                businessActualArriveTime: {
                    label: '实际入库日期'
                },
                rowStatus: {
                    label: '操作'
                }
            },
            mainDetail: {},
            list: []
        }
    },
    computed: {
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
        ...mapGetters('lVehicle', [
            'storageParams'
        ]),
        ...mapState('callInVehicleResource', [
            'carAdjustInStockData',
            'carAdjustInStockDetailInfoList'
        ])
    },
    mounted() {
        let _this = this
        if (this.isInnerPurchase) {
            _this.getCarAdjustInStockOrder({
                purchaseNo: _this.$route.query.orderNo
            })
        } else {
            this.getMainInfo()
            this.getDetailList()
        }
        handOkBtnType = hasBtn(apiUrl.supplyChain.procurement.storage.submitAdjustInStockInfo);
    },
    destroyed() {
        let _this = this
        _this.resetCarAdjustInStockOrder()
    },
    methods: {
        //分页方法
        pageChange(value){
            this.pageStart = value;
            this.getDetailList();
        },
        isDisable(data) {
            if(data.item.rowStatus === 1) {
                return true
            }else {
                return false
            }
        },
        showDetail(code) {
            this.$refs.model.getDefaultInfo(code)
        },
        handOk(params) {
            // console.log(data)
            const createElement = this.$createElement;
            params.storeCode = this.$data.mainDetail.targetStoreCode
            params.businessActualArriveTime = common.eleTimeFormat(params.businessActualArriveTime)
            if(!params.businessActualArriveTime) {
                Message({
                    type: 'warning',
                    message: '入库时间必填'
                })
                return
            }
            MessageBox({
                title: '提示',
                message: createElement('p', null, [
                    createElement('span', null, `是否确认入库  ${params.skuName}!`)
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        this.confirmStorage(params)
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
        // 获取主信息
        getMainInfo() {
            // let params = this.storageParams
            let params = this.$route.query
            api.supplyChain.purchaseOrder.getPurchaseOrderInfoByCode(params, res => {
                if (res.data.code === 'success') {
                    this.mainDetail = res.data.obj;
                }
            })
        },
        // 获取列表信息
        getDetailList() {
            // let params = this.storageParams
            let params = this.$route.query;
            console.log(this.pageData);
            params.pageStart = this.pageStart;
            params.pageNums = config.pageNums;
            api.supplyChain.procurement.storage.getDetail(params).then( res => {
                if (res.data.code === 'success') {
                    this.list = res.data.obj.list;
                    this.pageData = res.data.obj;
                }
            })
        },
        // 入库确认
        confirmStorage(params) {
            let _this = this
            if (_this.isInnerPurchase) {
               params.detailCode = params.detailNo
               params.orderNo = params.inStockNo 
               api.supplyChain.procurement.storage.submitAdjustInStockInfo(params, (res) => {
                   alertInfo(res, () => {
                       _this.getCarAdjustInStockOrder({
                           purchaseNo: _this.$route.query.orderNo
                       })
                   }, (msg) => {
                    
                   })
                })
            } else {
                api.supplyChain.procurement.storage.confirm(params).then(res => {
                   alertInfo(res, () => {
                       this.getDetailList()
                   }, (msg) => {
                    
                   })
                })
            }
        },
        ...mapActions('callInVehicleResource', [
            'getCarAdjustInStockOrder',
            'resetCarAdjustInStockOrder'
        ])
    },
    watch: {
        carAdjustInStockData: {
            handler(val) {
                let _this = this
                _this.mainDetail = JSON.parse(JSON.stringify(val))
            },
            deep: true
        },
        carAdjustInStockDetailInfoList: {
            handler(val) {
                let _this = this
                _this.list = JSON.parse(JSON.stringify(val))
            },
            deep: true
        }
    },
    filters: {
        timeSlice(val) {
            if(val) {
                return val.substring(0, 19)
            }
        }
    }
}
</script>
<style scoped>

</style>
