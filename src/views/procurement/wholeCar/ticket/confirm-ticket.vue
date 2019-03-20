<template>
<div class="animated fadeIn">
  <!-- 查询条件 -->
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
    <!-- 查询的列表数据 -->
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div class="table-scrollable mb-2 border-top">
                    <b-table striped hover bordered show-empty :items="ticketDetailAdd" :fields="fields">
                        <template slot="check" slot-scope="data">
                            <b-form-checkbox v-model="ticketDetailAdd[data.index].check" @input="handSelectedDetail(data.index, data.item.skuCode)"></b-form-checkbox>
                        </template>
                        <template slot="index" slot-scope="data">
                            {{ pageData.pageNo ? data.index + (pageData.pageNo - 1)* pageData.pageSize + 1 : data.index + 1 }}
                        </template>
                        <template slot="skuCode" slot-scope="data">
                            <a href="javascript:;" v-b-modal.detail @click="showDetail(data.value)">{{data.value}}</a>
                        </template>
                        <template slot="estimatedPurchaseFee" slot-scope="data">
                            {{ data.item.purchaseFee }}
                        </template>
                        <template slot="purchaseFee" slot-scope="data">
                            <input type="text" v-model="ticketDetailAdd[data.index].purchaseFee" :disabled="ticketDetailAdd[data.index].isTicketed"/>
                        </template>
                        <template slot="calFreigthFlag" slot-scope="row">
                            {{row.value === 1 ? '是' : '否'}}
                        </template>
                        <template slot="invoiceNo" slot-scope="data">
                            <input type="text" v-model="ticketDetailAdd[data.index].invoiceNo" />
                        </template>
                        <template slot="estimatedInvoiceDate" slot-scope="data">
                            <el-date-picker v-model="date[data.index].estimatedInvoiceDate"
                                type="date" placeholder="选择日期">
                            </el-date-picker>
                        </template>
                        <template slot="invoiceDate" slot-scope="data">
                            <el-date-picker v-model="date[data.index].invoiceDate"
                                type="date" :picker-options="pickerOptionsLimit" placeholder="选择日期">
                            </el-date-picker>
                        </template>
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
                <search-btn v-if="handOkType" @reset="back" @query="handOk" resetText="返回" queryText="确认开票"></search-btn>
            </b-card>
            <!-- 分页组件 -->
            <div class="row mt-2" v-if="!isInnerPurchase">
               <div class="col-md-12">
                 <pagination
                    class="pull-right"
                    @page-change="pageChange"
                    :page-no="pageData.pageNo"
                    :page-size="pageData.pageSize"
                    :total-result="pageData.total"
                    :total-pages="pageData.totalPages">
                 </pagination>
               </div>
            </div>
        </div>
    </div>
    <modal ref="model"></modal>
</div>
</template>
<script>
import SearchBtn from "components/searchBtn/searchBtn";
import Modal from './modal'
import common from 'common/common'
import api from 'common/api'
import apiUrl from 'common/api-url'
import {hasBtn} from 'common/com-api'
import Vue from 'vue'
import config from '../../../../common/config'
import { MessageBox, Checkbox, DatePicker, Message  } from  'element-ui'
import pagination from "components/pagination/pagination.vue"
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.component(MessageBox.name, MessageBox)
import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'
import {format, alertInfo} from 'common/com-api'
// 这里将 formatDate 方法 替换成了format （ 可能会出现问题， 暂时没有自测出来问题 ）
export default {
    components: {
        SearchBtn,
        Modal,
        pagination
    },
    data() {
        return {
            //分页
            pageData:{
                total: 0,
                totalPages: 1,
                pageNo: 1,
                pageSize: config.pageNums
            },
            pageStart: 1,
            pickerOptionsLimit: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            fields: {
                check: {
                    label: '   '
                },
                index: {
                    label: '序号'
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
                estimatedPurchaseFee: {
                    label: '采购价格(含税)'
                },
                freightFee: {
                    label: '运费'
                },
                calFreigthFlag: {
                    label: '运费是否需要计算入采购价中'
                },
                purchaseRate: {
                    label: '采购税率'
                },
                purchaseFee: {
                    label: '实际采购价格(含税)'
                },
                invoiceNo: {
                    label: '发票号'
                },
                estimatedInvoiceDate: {
                    label: '预计开票时间'
                },
                invoiceDate: {
                    label: '实际开票时间'
                }
            },
            mainDetail: {},
            // 时间选择占存区
            date: [],
            ticketDetail: [],
            selectedDetailList: [],
            ticketDetailAdd:[]
        }
    },
    mounted() {
        let _this = this
        if (_this.isInnerPurchase) {
            _this.getCarAdjustOutStockOrder({
                outStockNo: _this.$route.query.orderNo
            })
        } else {
            let params = this.$route.query
            this.getOrderNoDetail(params)
            this.getOrderDetail(params)
        }

    },
    destroyed() {
        let _this = this
        _this.resetCarAdjustOutStockOrder()
    },
    computed: {
        handOkType(){
            return hasBtn(apiUrl.supplyChain.procurement.ticket.editCarAdjustOutStockInvoice)
        },
        isInnerPurchase() {
            let _this = this
            return (this.$route.query.invoiceOrderType == config.invoiceOrderType.internalProcurement)
        },
        ...mapState('callOutVehicleResource', [
            'carAdjustOutStockData',
            'carAdjustOutStockDetailList'
        ])
    },
    methods: {
        //分页方法
        pageChange(value){
            this.pageStart = value;
            this.getOrderDetail(this.$route.query);
        },
        setInitDate() {
            this.date = [];
            this.ticketDetailAdd.forEach( item => {
                let obj = {
                    estimatedInvoiceDate: item.estimatedInvoiceDate,
                    invoiceDate: item.invoiceDate
                }
                this.date.push(obj)
            })
        },
        showDetail(code) {
            this.$refs.model.getDefaultInfo(code)
        },
        back() {
            this.$router.push({path: '/ticket/query'})
        },
        checkInvoiceDate() {
            let _this = this
            let result = true
            this.ticketDetailAdd.forEach((item, index) => {
                if (item.check && !this.date[index].invoiceDate && !item.data) {
                    result = false
                }
            })
            return result
        },
        handOk() {
            const createElement = this.$createElement;
            if (!this.checkInvoiceDate()) {
              MessageBox({
                title: '提示',
                message: createElement('p', null, [
                    createElement('span', null, `有实际开票时间为空，是否以当前时间记录？`)
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        this.confirmTicket()
                        done();
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
            } else {
                this.confirmTicket()
            }
        },
        handSelectedDetail(index, skuCode) {
            let _this = this
            if (_this.$data.ticketDetailAdd[index].check) {
                _this.$data.selectedDetailList[skuCode] = _this.$data.ticketDetailAdd[index]
            } else {
                _this.$data.selectedDetailList[skuCode] = null
            }
        },
        getOrderNoDetail(params) {
            api.supplyChain.purchaseOrder.getPurchaseOrderInfoByCode(params, res => {
                if (res.data.code === 'success') {
                    this.mainDetail = res.data.obj;
                }
            })
        },
        getOrderDetail(params) {
            params.pageStart = this.pageStart;
            params.pageNums = config.pageNums;
            api.supplyChain.procurement.ticket.getDetail(params).then(res => {
                if (res.data.code === 'success') {
                    //第一次进来加载表格数据
                    if(this.ticketDetail.length == 0){
                        this.ticketDetail = res.data.obj.list;
                        this.ticketDetailAdd = this.ticketDetail;       //原先这样赋值
                        this.ticketDetailAdd.forEach((item,index)=>{
                            if( Number(item.arrivalNums) >= 1 ){
                                this.$set(this.$data.ticketDetailAdd[index], 'isTicketed', true)
                            }else{
                                this.$set(this.$data.ticketDetailAdd[index], 'isTicketed', false)
                            }
                        })
                    } else {
                        this.ticketDetail = res.data.obj.list;
                        this.ticketDetailAdd = this.ticketDetail;
                        //在确认开票后重新加载表格数据，为了保留check这个属性，所以才这样遍历
                        for(let i = 0; i < this.ticketDetailAdd.length; i++) {
                            let ticketDetail = this.ticketDetailAdd[i];
                            for(let item in res.data.obj.list[i]){
                                this.ticketDetailAdd[i][item] = res.data.obj.list[i][item]
                            }
                            if (this.$data.selectedDetailList[ticketDetail.skuCode]) {
                               this.$set(this.$data.ticketDetailAdd[i], 'check', true)
                            } else {
                               this.$set(this.$data.ticketDetailAdd[i], 'check', false)
                            }

                            if( Number(ticketDetail.arrivalNums) >= 1 ){
                                this.$set(this.$data.ticketDetailAdd[i], 'isTicketed', true)
                            }else{
                                this.$set(this.$data.ticketDetailAdd[i], 'isTicketed', false)
                            }

                        }
                    }
                    this.pageData = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    this.setInitDate()
                }
            })
        },
        confirmTicket() {
             // 提取数组中的check状态, 并区分整体状态
            let params = [], arr = [], flag = false, _this = this;
            // 提取date中的两个时间属性
            for(let i = 0;i < this.date.length; i++) {
                this.ticketDetailAdd[i].estimatedInvoiceDate = this.date[i].estimatedInvoiceDate
                this.ticketDetailAdd[i].invoiceDate = this.date[i].invoiceDate
            }
            // 拿到最终的数据, 并对时间格式进行转化
            this.ticketDetailAdd.forEach((item, index) => {
                if(item.check && !item.invoiceDate) {
                    this.$set(this.ticketDetailAdd[index],
                        'invoiceDate',
                        format(new Date())
                    )
                    this.$set(this.date[index],
                        'invoiceDate',
                        format(new Date())
                    )
                }
                if(item.estimatedInvoiceDate) {
                    item.estimatedInvoiceDate = format(item.estimatedInvoiceDate)
                }
                if(item.invoiceDate) {
                    item.invoiceDate = format(item.invoiceDate)
                }
            })
            let skuCodes = Object.keys(this.selectedDetailList)
            skuCodes.forEach((skuCode, index) => {
               let item = this.selectedDetailList[skuCode]
               if (item) {
                   params.push(item)
                   flag = true
               }
            })
            //  根据之前区分好的整体状态来判断用户选了几条, 或者有没有选
            if(flag) {
                if (this.isInnerPurchase) {
                    api.supplyChain.procurement.ticket.editCarAdjustOutStockInvoice(params, (res) => {
                        alertInfo(res, () => {
                            _this.getCarAdjustOutStockOrder({
                                outStockNo: _this.$route.query.orderNo
                            })
                        })
                    })
                } else {
                    api.supplyChain.procurement.ticket.edit(params).then(res => {
                        alertInfo(res, () => {
                            let params = this.$route.query
                            this.getOrderDetail(params)
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
                _this.ticketDetail = JSON.parse(JSON.stringify(val))
                _this.ticketDetailAdd = _this.ticketDetail
                _this.ticketDetail.forEach(element => {
                    let obj = {}
                    _this.date.push(obj)
                })
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
<style scoped>
</style>
