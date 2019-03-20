<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <!-- <div class="col-md-4">
                    <b-form-fieldset horizontal label="订单类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="sourceOrderType" v-model="query.orderTypeCode" />
                    </b-form-fieldset>
                </div> -->
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="订单号" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.orderNo" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="销售顾问" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.salesEmpName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车架号" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.vinCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="客户姓名" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.custName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="联系电话" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.custMobile" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="公司名称" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.companyName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="收款状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="sourceCollectMoney" v-model="query.collectMoneyStatus" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交易日期" :label-cols="4" label-text-align="right">
                        <el-date-picker v-model="timeStep" :change="changeTime()" type="daterange" placeholder="请选择" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="开票人姓名" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.invoiceCustName" />
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="reset">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryPayInfoLists(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <b-button size="sm" variant="" @click="downLoadData">导出</b-button>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="dataList.list" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{ data.index + (dataList.pageNum - 1)* dataList.pageSize + 1 }}
                    </template>
                    <template slot="orderNo" slot-scope="data">
                        <a href="javascript:;" @click="routerTo(data.item.orderNo)">{{data.item.orderNo}}</a>
                    </template>
                    <template slot="skuActualSalesPrice" slot-scope="data">
                        {{ roundNum(data.item.skuActualSalesPrice) }}
                    </template>
                    <template slot="carActualSalesPrice" slot-scope="data">
                        {{ roundNum(data.item.carActualSalesPrice) }}
                    </template>
                    <template slot="actualTotalPrice" slot-scope="data">
                        {{ roundNum(data.item.actualTotalPrice) }}
                    </template>
                    <template slot="actualAmountTotal" slot-scope="data">
                        {{ roundNum(data.item.actualAmountTotal) }}
                    </template>
                    <template slot="insuranceActualSalesPrice" slot-scope="data">
                        {{ roundNum(data.item.insuranceActualSalesPrice) }}
                    </template>
                    <template slot="ybActualSalesPrie" slot-scope="data">
                        {{ roundNum(data.item.ybActualSalesPrie) }}
                    </template>
                    <template slot="onAccountPrice" slot-scope="data">
                        {{ roundNum(data.item.onAccountPrice) }}
                    </template>
                    <template slot="serviceFee" slot-scope="data">
                        {{ roundNum(data.item.serviceFee) }}
                    </template>
                    <template slot="valueOfLoan" slot-scope="data">
                        {{ roundNum(data.item.valueOfLoan) }}
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination 
                class="pull-right"
                @page-change="pageChange"
                :page-no="dataList.pageNum"
                :page-size="dataList.pageSize"
                :total-result="dataList.total"
                :total-pages="dataList.pages">
            </pagination>
        </b-card>
    </div>
</template>
<script>
import Vue from 'vue'
import config from 'common/config'
import api from 'common/api'
import common from 'common/common'
import Pagination from 'components/pagination/pagination'
import Areaqueryshop from 'components/iris-areaqueryshop/index'
import { MessageBox } from 'element-ui'
export default {
    data () {
        return {
            query: {
                // 付款界面(收款)原本是in, 现在更改为payment
                queryType: 'payment',
                wfTypeCodeSet: config.financing.wfTypeCode,
                // orderTypeCode: '', //订单类型
                orderNo: '', //订单号
                salesEmpName: '', //销售顾问
                vinCode: '', // 车架号
                custName: '', //客户姓名
                custMobile: '', //联系电话
                companyName: '', //公司名称
                collectMoneyStatus: 2, //收款状态
                collectMoneyStartDate: '', //收款日期-开始
                collectMoneyEndDate: '', //收款日期-结束
                //  点击是公司挂账的  查出来的是工资挂账信息的
                invoiceCustName: '', //开票人姓名
                storeCodeSet:[],
                pageNums: config.pageNums,
                pageStart: 1
            },
            copyQuery:{},
            timeStep: [], // 收款日期
            dataList:{},   //数据列表

            // sourceOrderType:[
            //     {
            //         text: '请选择',
            //         value: ''
            //     }
            // ],
            // 收款状态目录
            sourceCollectMoney: [{
                    text: '全部',
                    value: 2
                },
                {
                    text: '已完款',
                    value: 1
                },
                {
                    text: '未完款',
                    value: 0
                }
            ],
            fields:{
                index: {
                    label: '序号'
                },
                orderNo: {
                    label: '订单号'
                },
                custName: {
                    label: '客户姓名'
                },
                custMobilePhone: {
                    label: '客户电话'
                },
                invoiceCustName: {
                    label: '开票人姓名'
                },
                salesEmpName: {
                    label: '销售顾问'
                },
                payStatusName: {
                    label: '收款类型'
                },
                payAmount: {
                    label: '收款金额'
                },
                payTypeName: {
                    label: '支付方式'
                },
                dealCost: {
                    label: '交易手续费'
                },
                payTransNo: {
                    label: '交易凭证'
                },
                payTime: {
                    label: '记账时间'
                },
                operatorName: {
                    label: '操作人'
                },
                remark: {
                    label: '收款备注'
                }

            }
        }
    },
    created(){
        // 订单类型
        // api.ref.getDataDictionarys({
        //     refCode: 'TransactionNoteType'
        // }, (res) => {
        //     if (res.data.code == 'success') {
        //         this.getordertypes = res.data.obj.referenceDetailInfos
        //         this.getordertypes.forEach(items => {
        //             this.sourceOrderType.push(
        //                 {
        //                   text: items.refDetailName,
        //                   value: items.refDetailCode
        //                  },
        //             )
        //         })
        //     }
        // })
    },
    methods:{
        selectStores(sales, stores){
            let $this = this;
            $this.query.storeCodeSet = []
            if (Array.isArray(stores)) {
                stores.forEach(function(item){
                    if (item.value != 0) {
                        $this.query.storeCodeSet.push(item.value);
                    }
                });
            } else {
                $this.query.storeCodeSet = [stores.value]
            }
        },
        changeTime(){
            if (this.timeStep.length > 0 && this.timeStep[0]) {
                this.query.collectMoneyStartDate = this.timeStep[0].getFullYear() + '-' + ((this.timeStep[0].getMonth()+1).toString().padStart(2,'0')) + '-' + this.timeStep[0].getDate().toString().padStart(2,'0')
                this.query.collectMoneyEndDate = this.timeStep[1].getFullYear() + '-' + ((this.timeStep[1].getMonth() + 1).toString().padStart(2,'0')) + '-' + this.timeStep[1].getDate().toString().padStart(2,'0')
            } else {
                this.query.collectMoneyStartDate = ''
                this.query.collectMoneyEndDate = ''
            }
        },
        reset() {
            this.query.orderTypeCode = '', //订单类型
            this.query.orderNo = '', //订单号
            this.query.salesEmpName = '', //销售顾问
            this.query.vinCode = '', // 车架号
            this.query.custName = '', //客户姓名
            this.query.custMobile = '', //联系电话
            this.query.companyName = '', //公司名称
            this.query.collectMoneyStatus = 2, //收款状态
            this.timeStep = [], //收款日期
            this.query.invoiceCustName = ''  //开票人姓名
        },
         // 异步导出处理
        downLoadData(){
            // 异步导出处理
            api.ordinalInfo.getSequence({ serviceCode: 'FILEEXPORTSEQ'}, res => {
                if(res.data.code == 'success'){
                    let fileExportType = res.data.obj
                    this.query.exportFileStatus = 1
                    let options = {
                        fileExportCode: fileExportType,
                        fileExportType: config.fileExportType.FileExportTypeOrderPayMent,
                        fileRelactionCode: 'ExportTemplateOrderPayInfoList',
                        parameters: this.copyQuery
                    }
                    api.downLoad.insertFileExportInfo(options, res => {
                        if(res.data.code == 'success'){
                            MessageBox.confirm("请在导出中心下载生成的文件", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                            })
                        }
                    })
                }
            })
        },
        // 订单号跳转方法
        routerTo: function(code) {
                const $this = this
                this.$store.dispatch('financing/getPayInfoList', {
                    poros: {
                        sourceOrderNo: code
                    },
                    callBack: function(msg) {
                        $this.$router.push({
                            path: `/incollectmoney/detail/${code}+1`
                        })
                    }
                })
            },
        //数据列表查询接口
        queryPayInfoLists(num){
            this.copyQuery = JSON.parse(JSON.stringify(this.query))
            const $this = this
            this.query.pageStart = num
            api.dataReport.queryOrderPayInfoPage(this.query, res =>{
                if(res.data.code == 'success'){
                    this.dataList = res.data.obj
                }
            })

        },
        pageChange(num){
            this.queryPayInfoLists(num)
        },
        // 过滤数字并对浮点型数字保留两位小数
        roundNum(data) {
            if (typeof data === "number" && data !== parseInt(data)) {
                data = parseFloat(data).toFixed(2)
            }
            return data
        },
        
    },
    components: {
            Pagination, Areaqueryshop
        }
}
</script>

