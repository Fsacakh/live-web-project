<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="订单类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="sourceOrderType" v-model="query.orderTypeCode" />
                    </b-form-fieldset>
                </div>
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
                    <b-form-fieldset horizontal label="社会信用代码" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.socialCreditCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="收款状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="sourceCollectMoney" v-model="query.collectMoneyStatus" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="收款日期" :label-cols="4" label-text-align="right">
                        <el-date-picker v-model="timeStep" type="daterange" placeholder="请选择" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="是否公司挂账" label-text-align="right" :label-cols="4">
                        <b-form-select :options="sourceCompanyOnAccount" v-model="query.isCompanyOnAccount" />
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
            <div style="float:right" class="text-showTotalData" v-if="queryPayInfoList.total !== undefined" v-text="'共搜索到 ' +queryPayInfoList.total+ ' 条数据'"></div>
            <b-button size="sm" variant="" @click="downLoadData">导出</b-button>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="inList" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{ data.index + (queryPayInfoList.pageNo - 1)* queryPayInfoList.pageSize + 1 }}
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
                :page-no="queryPayInfoList.pageNo"
                :page-size="queryPayInfoList.pageSize"
                :total-result="queryPayInfoList.total"
                :total-pages="queryPayInfoList.totalPages">
            </pagination>
        </b-card>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {
        mapState
    } from 'vuex'
    import config from 'common/config'
    import api from 'common/api'
    import common from 'common/common'
    import Pagination from 'components/pagination/pagination'
    import Areaqueryshop from 'components/iris-areaqueryshop/index'
    import {MessageBox} from 'element-ui'
    Vue.prototype.$confirm = MessageBox.confirm;
    import {
        DatePicker
    } from 'element-ui'
    Vue.use(DatePicker)
    export default {
        components: {
            Pagination,
            Areaqueryshop
        },
        data() {
            return {
                getordertypes: [],
                sourceOrderType: [
                  {
                    text: '请选择',
                    value: ''
                  }
                ], //订单类型
                timeStep: [], // 收款日期
                query: {
                    // 付款界面(收款)原本是in, 现在更改为payment
                    queryType: 'payment',
                    wfTypeCodeSet: config.financing.wfTypeCode,
                    orderTypeCode: '', //订单类型
                    orderNo: '', //订单号
                    salesEmpName: '', //销售顾问
                    vinCode: '', // 车架号
                    custName: '', //客户姓名
                    custMobile: '', //联系电话
                    companyName: '', //公司名称
                    socialCreditCode: '', //社会信用代码
                    collectMoneyStatus: 2, //收款状态
                    collectMoneyStartDate: '', //收款日期-开始
                    collectMoneyEndDate: '', //收款日期-结束
                    isCompanyOnAccount: '', //是否公司挂账  全部 2  是 1    否  0
                    //  点击是公司挂账的  查出来的是工资挂账信息的
                    storeCodeSet:[],
                    pageNums: config.pageNums,
                    pageStart: 1
                },
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
                // 公司挂账状态目录
                sourceCompanyOnAccount: [{
                        text: '全部',
                        value: 2
                    },
                    {
                        text: '是',
                        value: 1
                    },
                    {
                        text: '否',
                        value: 0
                    }
                ],
                select: [],
                fields: {
                    index: {
                        label: '序号'
                    },
                    orderNo: {
                        label: '订单号'
                    },
                    orderTypeName: {
                        label: '订单类型'
                    },
                    custName: {
                        label: '客户姓名'
                    },
                    custMobile: {
                        label: '客户电话'
                    },
                    companyName: {
                        label: '公司名称'
                    },
                    socialCreditCode: {
                        label: '社会信用代码'
                    },
                    vinNo: {
                        label: '车架号'
                    },
                    salesEmpName: {
                        label: '销售顾问'
                    },
                    carActualSalesPrice: {
                        label: '整车金额'
                    },
                    valueOfLoan: {
                        label: '金融金额'
                    },
                    insuranceActualSalesPrice: {
                        label: '保险金额'
                    },
                    ybActualSalesPrie: {
                        label: '延保金额'
                    },
                    skuActualSalesPrice: {
                        label: '后市场金额'
                    },
                    serviceFee: {
                        label: '服务费及其他总金额'
                    },
                    actualTotalPrice: {
                        label: '应收金额'
                    },
                    actualAmountTotal: {
                        label: '实收金额'
                    },
                    onAccountPrice: {
                        label: '挂账金额'
                    }
                }
            }
        },
        computed: {
            ...mapState('financing', [
                'queryPayInfoList',
                'inList'
                // 'sourceOrderType',
            ])
        },
        watch: {
            timeStep(newVal, oldVal) {
                if (newVal && newVal.length > 0 && newVal[0]) {
                    let timeOne = newVal[0]
                    let timeTwo = newVal[1]
                    this.query.collectMoneyStartDate = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                    this.query.collectMoneyEndDate = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
                } else {
                    this.query.collectMoneyStartDate = ''
                    this.query.collectMoneyEndDate = ''
                }
            }
        },
        created() {
            // 订单类型
            api.ref.getDataDictionarys({
                refCode: 'TransactionNoteType'
            }, (res) => {
                if (res.data.code == 'success') {
                  this.getordertypes = res.data.obj.referenceDetailInfos
                  this.getordertypes.forEach(items => {
                      this.sourceOrderType.push(
                        {
                          text: items.refDetailName,
                          value: items.refDetailCode
                        },
                      )
                  })
                }
            })
            this.getOrderNoType()
        },
        methods: {
            selectStores(sales, stores){
                let $this = this;
                $this.query.storeCodeSet = []
                if(Array.isArray(stores)){
                    stores.forEach(function(item){
                      if(item.value != 0){
                        $this.query.storeCodeSet.push(item.value);
                      }
                    });
                }else{
                    $this.query.storeCodeSet = [stores.value]
                }
            },
            downLoadData() {
                if (this.downLoadDataParams === '') {
                    Message({
                        type: "warning",
                        message: "请查询线索！"
                    });
                    return;
                }else{
                    this.exportList()
                    //导出信息
                    // api.ordinalInfo.getSequence({ serviceCode: 'FILEEXPORTSEQ'}, res => {
                    //     if(res.data.code == 'success'){
                    //         let fileExportType = res.data.obj
                    //         this.query.exportFileStatus = 1
                    //         let options = {
                    //             fileExportCode: fileExportType,
                    //             fileExportType: config.fileExportType.fileExportTypeOrder,
                    //             fileRelactionCode: 'ExportTemplateSalesOrderList',
                    //             parameters: this.query
                    //         }
                    //         api.downLoad.insertFileExportInfo(options, res => {
                    //             if(res.data.code == 'success'){
                    //                 MessageBox.confirm("请在导出中心下载生成的文件", "提示", {
                    //                 confirmButtonText: "确定",
                    //                 cancelButtonText: "取消",
                    //                 type: "warning"
                    //                 })
                    //             }
                    //         })
                    //     }
                    // })
                }
            },
            exportList() {
                api.WriteExcel.getWriteExcel(this.query, res => {
                    if (res.data.code == 'success') {
                        let path = res.data.obj
                        window.location.href = common.isDevTemplate() + path
                    }
                })
            },
            // 过滤数字并对浮点型数字保留两位小数
            roundNum(data) {
                if (typeof data === "number" && data !== parseInt(data)) {
                    data = parseFloat(data).toFixed(2)
                }
                return data
            },
            reset() {
                this.query.orderTypeCode = '', //订单类型
                this.query.orderNo = '', //订单号
                this.query.salesEmpName = '', //销售顾问
                this.query.vinCode = '', // 车架号
                this.query.custName = '', //客户姓名
                this.query.custMobile = '', //联系电话
                this.query.companyName = '', //公司名称
                this.query.socialCreditCode = '', //社会信用代码
                this.query.collectMoneyStatus = 2, //收款状态
                this.query.isCompanyOnAccount = 2, //是否公司挂账
                this.timeStep = []; //收款日期
            },
            getOrderNoType: function() {
                this.$store.dispatch("financing/getType", {
                    poros: {
                        refCode: config.financing.sourceOrderTypeCode
                    },
                    callBack: function(msg) {
                        if (msg.data.code == "success") {}
                    }
                });
            },
            queryPayInfoLists: function(page) {
                const $this = this
                this.query.pageStart = page
                this.$store.dispatch('financing/queryPayInfoList', {
                    poros: $this.query,
                    callBack: function(msg) {
                        if (msg.data.code == 'success') {}
                    }
                })
            },
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
            pageChange(page) {
                this.queryPayInfoLists(page)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .text-showTotalData {
        line-height: 40px;
    }
</style>
