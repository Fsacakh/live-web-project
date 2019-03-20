<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="选择经销商店" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <areaqueryshop :storeAll='true'  @select-change="selectedfun"></areaqueryshop>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="订单类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="ordertypeoptions" v-model="query.orderTypeCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="订单号" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.orderNo" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售顾问" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.salesEmpName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.vinCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="客户姓名" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.custName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="联系电话" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.custMobile" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="企业名称" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.companyName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="社会信用代码" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.socialCreditCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="收款状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="sourceCollectMoney" v-model="query.collectMoneyStatus" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="发票登记状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="invoiceStatus" v-model="query.invoiceStatus" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="发票更新日期" label-text-align="right" :label-cols="4">
                        <el-date-picker v-model="value3" type="daterange" @change="datechange()" :clearable="true" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="reset">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryOrderInfo(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <p style="float:right" v-if="this.total">共搜索到{{this.total}}条数据</p>
            <b-button size="sm" variant="" @click="downLoadData">导出</b-button>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="inList" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                    </template>
                    <template slot="orderNo" slot-scope="data">
                        <a href="javascript:;" @click="routerTo(data.item.orderNo)">{{data.item.orderNo}}</a>
                    </template>
                    <template slot="actualTotalPrice" slot-scope="data">
                        {{ data.item.actualTotalPrice ? parseFloat(data.item.actualTotalPrice).toFixed(2) : '' }}
                    </template>
                    <template slot="carActualSalesPrice" slot-scope="data">
                        {{ data.item.carActualSalesPrice ? parseFloat(data.item.carActualSalesPrice).toFixed(2) : '' }}
                    </template>
                    <template slot="valueOfLoan" slot-scope="data">
                        {{ data.item.valueOfLoan ? parseFloat(data.item.valueOfLoan).toFixed(2) : '' }}
                    </template>
                    <template slot="insuranceActualSalesPrice" slot-scope="data">
                        {{ data.item.insuranceActualSalesPrice ? parseFloat(data.item.insuranceActualSalesPrice).toFixed(2) : '' }}
                    </template>
                    <template slot="ybActualSalesPrie" slot-scope="data">
                        {{ data.item.ybActualSalesPrie ? parseFloat(data.item.ybActualSalesPrie).toFixed(2) : '' }}
                    </template>
                    <template slot="skuActualSalesPrice" slot-scope="data">
                        {{ data.item.skuActualSalesPrice ? parseFloat(data.item.skuActualSalesPrice).toFixed(2) : '' }}
                    </template>
                    <template slot="serviceFee" slot-scope="data">
                        {{ data.item.serviceFee ? parseFloat(data.item.serviceFee).toFixed(2) : '' }}
                    </template>
                    <template slot="actualAmountTotal" slot-scope="data">
                        {{ data.item.actualAmountTotal ? parseFloat(data.item.actualAmountTotal).toFixed(2) : '' }}
                    </template>
                    <template slot="onAccountPrice" slot-scope="data">
                        {{ data.item.onAccountPrice ? parseFloat(data.item.onAccountPrice).toFixed(2) : '' }}
                    </template>
                    <template slot="actualInvoiceTotal" slot-scope="data">
                        {{ data.item.actualInvoiceTotal ? parseFloat(data.item.actualInvoiceTotal).toFixed(2) : '' }}
                    </template>
                    <template slot="currentUpdateTime" slot-scope="data">
                        {{ data.item.currentUpdateTime ? data.item.currentUpdateTime.slice(0, 19) : '' }}
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination 
                class="pull-right"
                @page-change="pageChange"
                :page-no="pager.pageNo"
                :page-size="pager.pageSize"
                :total-result="pager.total"
                :total-pages="pager.totalPages">
            </pagination>
        </b-card>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {
        DatePicker, MessageBox
    } from 'element-ui'
    import {
        mapState
    } from 'vuex'
    import config from 'common/config'
    import common from 'common/common'
    import api from 'common/api'
    import Areaqueryshop from 'components/iris-areaqueryshop'
    import Pagination from 'components/pagination/pagination'
    Vue.use(DatePicker)
    Vue.prototype.$confirm = MessageBox.confirm;
    export default {
        components: {
            Areaqueryshop,
            Pagination
        },
        data() {
            return {
                getordertypes: [],
                total:'',
                ordertypeoptions: [
                  {
                    text: '请选择',
                    value: ''
                  }
                ],
                inList: [],
                value3: '',
                query: {
                    // 付款界面(收款)原本是in, 现在更改为payment
                    queryType: 'invoice',
                    orderTypeCode: '', //订单类型
                    orderNo: '', //订单号
                    salesEmpName: '', //销售顾问
                    vinCode: '', // 车架号
                    custName: '', //客户姓名
                    custMobile: '', //联系电话
                    socialCreditCode: '', //社会信用代码
                    collectMoneyStatus: 2, //收款状态
                    //  点击是公司挂账的  查出来的是工资挂账信息的
                    companyName: '', //公司名称
                    invoiceStatus: '', //登記狀態
                    startTime: '',
                    endTime: '',
                    storeCodeSet:[],
                    pageNums: config.pageNums,
                    pageStart: 1
                },
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
                invoiceStatus: [{ //發票登記狀態
                        text: '已完成',
                        value: 1
                    },
                    {
                        text: '未完成',
                        value: 0
                    },
                ],
                select: [],
                fields: {
                    index: {
                        label: '序号'
                    },
                    orderNo: {
                        label: '订单号'
                    },
                    storeName: {
                        label: '门店'
                    },
                    custName: {
                        label: '客户'
                    },
                    custMobile: {
                        label: '客户手机'
                    },
                    salesEmpName: {
                        label: '销售顾问'
                    },
                    vinNo: {
                        label: '车架号'
                    },
                    actualTotalPrice: {
                        label: '应收金额'
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
                    actualAmountTotal: {
                        label: '实收金额'
                    },
                    onAccountPrice: {
                        label: '挂账金额'
                    },
                    actualInvoiceTotal: {
                        label: '已开票金额'
                    },
                    currentUpdateTime: {
                        label: '发票更新日期'
                    },
                    updateTimeStr: {
                        label: '订单更新日期'
                    },
                },
                tableList: [],
                pager: {
                    pageNo: 1,
                    pageSize: 15,
                    total: 1,
                    totalPages: 1
                },
            }
        },
        computed: {
            ...mapState('financing', [
                'sourceOrderType'
            ])
        },
        created() {
            // 订单类型
            api.ref.getDataDictionarys({
                refCode: 'TransactionNoteType'
                // refCode: "OrderSalesType"
            }, (res) => {
                if (res.data.code == 'success') {
                  this.getordertypes = res.data.obj.referenceDetailInfos
                  this.getordertypes.forEach(items => {
                      this.ordertypeoptions.push(
                        {
                          text: items.refDetailName,
                          value: items.refDetailCode
                        },
                      )
                  })
                }
            })
            // this.demo();
        },
        methods: {
            setOptionData(data, obj) {
              if(!data) {
                return
              }
              for (var i = 0, len = data.length; i < len; i++) {
                obj.push({
                    text: data[i].refDetailName,
                    value: data[i].refDetailCode
                });
              }
            },
            //貌似没用,页面报错先注释
            // demo() {
            //     var a = []
            //     for (var i = 0; i < 10; i++) {
            //         a[i] = function() {
            //             console.log(i)
            //         }
            //     }
            //     a[i]()
            // },
            downLoadData() {
                if (this.invoList === '') {
                    Message({
                        type: "warning",
                        message: "请查询信息！"
                    });
                } else {
                    api.orderInvoiceWriteExcel.getInvoiceWriteExcel(this.query, res => {
                        if (res.data.code == 'success') {
                            let path = res.data.obj
                            window.location.href = common.isDevTemplate() + path
                        }
                    })
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
                    //             })
                    //             }
                    //         })
                    //     }
                    // })
                }
            },
            datechange() {
                if (this.value3[0] == null) {
                    this.query.startTime = ''
                    this.query.endTime = ''
                } else {
                    this.query.startTime = common.eleTimeFormatim2(this.value3[0])
                    this.query.endTime = common.eleTimeFormatim2(this.value3[1]).slice(0, 10) + " 23:59:59"
                }
            },
            reset() {
                this.value3 = '';
                this.query.orderTypeCode = '';
                this.query.orderNo = '';
                this.query.salesEmpName = '';
                this.query.vinCode = '';
                this.query.custName = '';
                this.query.custMobile = '';
                this.query.socialCreditCode = '';
                this.query.collectMoneyStatus = '';
                this.query.companyName = '';
                this.query.startTime = '';
                this.query.endTime = '';
                this.query.invoiceStatus = ''
            },
            pageChange(page) {
                this.queryOrderInfo(page)
            },
            selectedfun(sales, stores) {
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
            routerTo(code) {
                const $this = this
                this.$store.dispatch('financing/getPayInfo', {
                    poros: {
                        orderNo: code,
                        allSubOrderFlag: true
                    },
                    callBack: function(msg) {
                        $this.$router.push({
                            path: `/billing/detail/${code}`
                        })
                    }
                })
            },
            queryOrderInfo: function(page) {
                const $this = this
                this.query.pageStart = page
                api.financing.queryPayInfoList(this.query, (res) => {
                    if (res.data.code == 'success') {
                        this.inList = res.data.obj.list
                        this.total = res.data.obj.total
                        this.pager.pageNo = res.data.obj.pageNum
                        this.pager.totalPages = res.data.obj.pages
                        this.pager.pageSize = res.data.obj.pageSize
                        this.pager.total = res.data.obj.total
                    }
                })
            },
        }
    }
</script>
<style lang="css" scoped>
    .fff {
        float: right;
    }
</style>
