<template>
    <div class="animated fadeIn">
        <b-card :header="payStatus == '1' ? '收款信息' : '退款信息'">
            <b-card>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="订单号:" label-text-align="right" :label-cols="4">
                            <div class="text-left form-control border-none"><a href="javascript:;" @click.prevent="showDetail(orderInfo.orderNo)">{{orderInfo.orderNo}}</a></div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="客户姓名:" label-text-align="right" :label-cols="4">
                            <div class="text-left form-control border-none">{{orderInfo.custName}}</div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="销售顾问:" label-text-align="right" :label-cols="4">
                            <div class="text-left form-control border-none">{{orderInfo.salesEmpName}}</div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="订单类型:" label-text-align="right" :label-cols="4">
                            <div class="text-left form-control border-none">{{orderInfo.orderTypeName}}</div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="应收订金金额:" label-text-align="right" :label-cols="4">
                            <div class="text-left form-control border-none">{{ parseFloat(orderInfo.orderAddInfoDeposit).toFixed(2) }}</div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="备注:" :label-cols="4"  class="text-right">
                            <b-form-textarea
                                readonly
                                v-model="orderInfo.remark"
                                placeholder="暂无数据"
                                :rows="3"
                                :max-rows="10" 
                                :maxlength="50">
                            </b-form-textarea>
                        </b-form-fieldset>
                    </div>
                </div>
            </b-card>
            <b-card>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="应收金额:" label-text-align="right" :label-cols="4">
                            <div class="text-left form-control border-none">{{ parseFloat(orderInfo.actualTotalPrice).toFixed(2) }}</div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="公司挂账金额:" label-text-align="right" :label-cols="4">
                            <div class="text-left form-control border-none">{{"￥暂无数据"}}</div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="金融挂账金额:" label-text-align="right" :label-cols="4">
                            <div class="text-left form-control border-none">{{parseFloat(orderInfo.onAccountTotalPrice).toFixed(2)}}</div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="实收金额:" label-text-align="right" :label-cols="4">
                            <div class="text-left form-control border-none">{{ parseFloat(orderInfo.actualAmountTotal).toFixed(2) }}</div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="二手车挂账金额:" label-text-align="right" :label-cols="4">
                            <div class="text-left form-control border-none">{{"￥暂无数据"}}</div>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-right">
                        <b-button size="sm" variant="primary" @click="refund(payStatus)">{{btnName}}</b-button>
                    </div>
                </div>
            </b-card>
        </b-card>
        <b-card :header="historyTitle">
            <div>
                <b-button size="sm" variant="danger" @click="deletePayInfo('deleted')">删除</b-button>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="historyList" :fields="payStatus=='1'?fields:fields2">
                    <template slot="checkbox" slot-scope="data">
                        <input type="radio" name="models" v-model="selitem" :value="data.item">
                    </template>
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                    </template>
                    <template slot="moneyPrice" slot-scope="data">
                        {{ data.item.moneyPrice ? parseFloat(data.item.moneyPrice).toFixed(2) : '' }}
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
        <collectmodel 
            @getPayHistory="childModel"
            ref='collect'>
        </collectmodel>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { MessageBox, Message } from 'element-ui'
import config from "common/config";
import api from "common/api";
import collectmodel from "./collectmodel";
import Pagination from 'components/pagination/pagination'
export default {
    components: {
        collectmodel,
        Pagination
    },
    data() {
        return {
            historyTitle: '',
            btnName: '',
            payStatus: '',
            moneyPrice: '',
            selitem: '',
            query: {
                sourceOrderNo: '',
                payStatus: '',
                pageNums: config.pageNums,
                pageStart: 1
            },
            pager: {
                pageNo: 1,
                pageSize: 15,
                total: 1,
                totalPages: 1
            },
            readonly: true,
            select: [],
            historyList: [],
            fields: {
                checkbox: {
                    label: '   '
                },
                index: {
                    label: '序号'
                },
                paymentTypeName: {
                    label: "支付方式"
                },
                moneyPrice: {
                    label: "收款金额"
                },
                updateTimeStr: {
                    label: "收款日期"
                },
                paymentTransactionNo: {
                    label: "交易凭证号"
                },
                payeeName: {
                    label: "收款员"
                },
                remark: {
                    label: "备注"
                }
            },
            fields2: {
                checkbox: {
                    label: '   '
                },
                index: {
                    label: '序号'
                },
                paymentTypeName: {
                    label: "退款方式"
                },
                moneyPrice: {
                    label: "退款金额"
                },
                createTimeStr: {
                    label: "退款日期"
                },
                paymentTransactionNo: {
                    label: "交易凭证号"
                },
                payeeName: {
                    label: "退款员"
                },
                remark: {
                    label: "备注"
                }
            },
        };
    },
  computed: {
    ...mapState("financing", [
            "paymentType",
            "orderInfo"
        ]),
  },
  created() {
    this.queryPayHistory();
    this.initialize();
    this.getPayInfo2();
    this.childModel();
  },
  methods: {
    commonOrderNo: function () {
        let code = this.$route.params.id
        let num = code.indexOf('-')
        let params = code.slice(0, num)
        return params
    },
    // submitAmount: function() {
    //     const $this = this
    //     if(this.moneyPrice<= this.orderInfo.actualAmountTotal) {
    //         $this.deletePayInfo('refund')
    //     }
    // },
    refund: function (code) {

        this.$refs.collect.showMadel(this.payStatus)
        this.moneyPrice = '';
    },
    showDetail(code) {
        this.$router.push({
            path: '/order/detail/' + code
        })
    },
    initialize: function() {
        const $this = this;
        this.$store.dispatch("financing/getType", {
            poros: { refCode: config.financing.paymentTypeCode },
            callBack: function(msg) {
                if (msg.data.code == "success") {
                }
            }
        });
    },
    childModel: function() {
        const $this = this;
        let params = this.commonOrderNo()
                        $this.queryPayHistory();
        // 接口变更之后
        // this.$store.dispatch('financing/getPayInfo2', {
        //     poros: {sourceOrderNo: params},
        //     callBack: function(msg) {
        //     }
        // })
    },
    /*getPayInfo: function() {
        const $this = this;
        let code = this.$route.params.id
        let num = code.indexOf('+')
        let params = code.slice(0, num)
        let status = code.slice(num+1, num+2)
        if(status == '1') {
            this.payStatus = config.income
            this.historyTitle = '收款历史'
            this.btnName = "收款"
        } else {
            this.payStatus = config.outcome
            this.historyTitle = '退款历史'
            this.btnName = "退款"
        }
        $this.$store.dispatch('financing/getPayInfo', {
            poros: {orderNo: params},
            callBack: function(msg) {

            }
        })
    },*/
    getPayInfo2: function() {
        const $this = this;
        let code = this.$route.params.id
        let num = code.indexOf('+')
        let params = code.slice(0, num)
        let status = code.slice(num+1, num+2)
        if(status == '1') {
            this.payStatus = config.income
            this.historyTitle = '收款历史'
            this.btnName = "收款"
        } else {
            this.payStatus = config.outcome
            this.historyTitle = '退款历史'
            this.btnName = "退款"
        }
        $this.$store.dispatch('financing/getPayInfo2', {
            poros: {sourceOrderNo: params},
            callBack: function(msg) {

            }
        })
    },
    queryPayHistory: function() {
      const $this = this;
      this.query.sourceOrderNo = this.commonOrderNo()
      this.query.payStatus = Number(this.payStatus)
      $this.$store.dispatch("financing/queryPayHistory", {
        poros: $this.query,
        callBack: function(msg) {
          if (msg.data.code == "success") {
            $this.historyList = msg.data.obj.list;
            $this.pager.pageNo = msg.data.obj.pageNum
            $this.pager.totalPages = msg.data.obj.pages
            $this.pager.pageSize = msg.data.obj.pageSize
            $this.pager.total = msg.data.obj.total
          }
        }
      });
    },
    pageChange(page) {
        this.query.pageStart = page
        this.queryPayHistory()
    },
    deletePayInfo: function(type) {
        const $this = this;
        if(this.selitem=='') {
            Message({
                type: 'info',
                message: config.messInfo.select
            });
            return
        }
        if(type == 'deleted') {
            let params = [];
            $this.selitem.isDeleted = '1'
            params.push($this.selitem)
            MessageBox.confirm('确定执行此操作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        $this.$store.dispatch("financing/addPayInfoList", {
                            poros: params,
                            callBack: function(msg) {
                                if(msg.data.code == 'success') {
                                    Message({
                                        type: 'info',
                                        message: config.messInfo.success
                                    });
                                    $this.queryPayHistory()
                                    $this.getPayInfo2()
                                    done();
                                }
                            }
                        });
                    } else {
                        done();
                        return
                    }
                },
                callBack: function () {
                }
            })
        }
    }
  }
};
</script>
<style>
    .border-none {
        border: none !important;
    }
</style>