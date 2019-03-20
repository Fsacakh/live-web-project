<template>
    <b-modal title="查看报价历史" v-model="showModal" no-close-on-backdrop no-close-on-esc size="lg" button-size="sm" @hidden="hideModal" @ok="commitFinanceProDetailInfo" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12 com-lg-12">
                <div class="table-scrollable">
                    <b-table striped hover bordered show-empty :fields="fields" :items="financeWbHistoryInfoList">
                          <template slot="operate" slot-scope="data">
                              <a @click="showDetail(data.index, data.index.id)" href="#">查看明细</a>
                          </template>
                          <template slot="scSyncTime" slot-scope="data">
                              {{ data.item.scSyncTime | formatDate }}
                          </template>
                          <template slot="empty">
                              暂无数据...
                          </template>
                    </b-table>
                </div>
            </div>
        </div>
        <template>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="首付" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.downPaymentAmount" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="尾款" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.balancePaymentValue" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车辆贷款额" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.valueOfLoan" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="期数" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.cycleMonth" :disabled="getfinanceWorkbenchSucc">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车贷利率/费率" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.taxRate" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="月供" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.payForMonth" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row" v-show="isSubsidyInterest">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="机构贴息" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.financeSubsidyInterest" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="本店贴息" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.storeSubsidyInterest" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row" v-show="isLease">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="期末里程数" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.finalMileage" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="期末保值数" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.finalValue" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="保证金" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="financeWorkbenchInfo.cautionMoney" disabled>
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="备注" :label-cols="4" class="text-right">
                        <b-form-textarea
                            v-model="financeWorkbenchInfo.remark"
                            disabled
                            :rows="3"
                            :max-rows="6">
                        </b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
        </template>
   </b-modal>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../common/config'
    import api from "../../common/api"
    import areaqueryshop from 'components/iris-areaqueryshop'
    import pagination from 'components/pagination/pagination'
    export default {
        mounted() {
            let _this = this
        },
        data: function() {
            return {
                isSCDefeat: [
                  {
                      value: 0,
                      text: '否'
                  },
                  {
                      value: 1,
                      text: '是'
                  }
                ],
                showModal: false,
                selectRow: -1,
                fields: {
                    createTimeStr: {
                        label: '报价更新时间'
                    },
                    financeName: {
                        label: '产品名称'
                    },
                    empName: {
                        label: '操作人'
                    },
                    operate: {
                        label: '操作'
                    }
                },
                items: [],
                financeProInfo: {
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                financeWorkbenchInfo: {},
                WbHistoryInfoList: []
            }
        },
        computed: {
            ...mapState('financeWorkbench', [
                'showHistoryModal',
                'financeWbHistoryInfoList',
                'financeWorkbenchData',
                'authorizationOrgs',
                'financeFailReasonTypes',
                'commitFinanceProInfo',
                'financeTypes',
                'idTypes',
                'approvalResultTypes',
                'approvalResultReasonTypes',
                'getfinanceWorkbenchSucc',
            ]),
            // 租赁产品
            isLease: function() {
                let _this = this
                return (_this.$data.financeWorkbenchInfo.financeTypeCode == config.financePro.financeType.leaseFatherCode)
            },
            // 贴息产品
            isSubsidyInterest: function() {
                let _this = this
                return (_this.$data.financeWorkbenchInfo.financeTypeCode == config.financePro.financeType.interestFatherCode)
            }
        },
        methods: {
            ...mapActions('financeWorkbench', [
                'hideHistoryModal',
                'commitFinanceHistoryInfo',
                'getFinanceWbHistoryInfoList'
            ]),
            // 查询报价推送历史
            search: function() {
                this.$data.financeProInfo.pageStart = 1
                this.getFinanceWbHistoryInfoList(this.$data.financeProInfo)
            },
            //清空数据
            clear: function() {
                this.$data.financeProInfo = {
                    brandCode: '',
                    seriesCode: '',
                    modelCode: '',
                    carCode: '',
                    financeType: '',
                    financeOrgCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            },
            // 隐藏弹层
            hideModal: function() {
                this.$data.selectRow = -1
                this.hideHistoryModal()
                this.clear()             //清除数据
            },
            // 查看报价明细
            showDetail: function(index, id) {
                let _this = this;
                _this.financeWorkbench(index, id);
                _this.$data.selectRow = index
            },
            // 查询报价明细接口
            financeWorkbench(index, id) {
                let that = this;
                var params = {};
                params.id = that.WbHistoryInfoList[index].id;
                api.finWorkbench.getFinanceWbHistoryInfo(params,res => {
                    if(res.data.code === 'success') {
                        if(res.data.obj) {
                            that.financeWorkbenchInfo = res.data.obj;
                        }
                    }
                })
            },
            // 点击确定
            commitFinanceProDetailInfo: function() {
                let _this = this
                if (_this.$data.selectRow >= 0) {
                    _this.commitFinanceHistoryInfo(_this.financeWorkbenchInfo)
                }
            },
            pageChange: function(num) {
                this.$data.financeProInfo.pageStart = num
                this.getFinanceWbHistoryInfoList(this.$data.financeProInfo)
            },
            //清除列表下的输入框数据
            clearWorkInfo() {
                this.financeWorkbenchInfo = {};
            }
        },
        watch: {
            showHistoryModal: {
                handler() {
                    let _this = this
                    _this.showModal = _this.showHistoryModal
                    if (_this.showModal) {
                        _this.clearWorkInfo();
                        _this.search();
                    }
                }
            },
            // 列表数据
            financeWbHistoryInfoList: {
                handler(val) {
                    this.selectRows = [];
                    this.WbHistoryInfoList = val;
                }
            },
            // 查询明细数据
            financeWorkbenchData: {
                handler(val) {
                    let that = this;
                    that.$data.financeWorkbenchInfo = {
                        id: val.id,
                        downPaymentAmount: val.downPaymentAmount,            //首付
                        balancePaymentValue: val.balancePaymentValue,        //尾款
                        valueOfLoan: val.valueOfLoan,                        //车辆贷款额
                        cycleMonth: val.cycleMonth,                          //期数
                        taxRate: val.taxRate,                                //车贷利率/费率
                        payForMonth: val.payForMonth,                        //月供
                        financeSubsidyInterest: val.financeSubsidyInterest,  //机构贴息
                        storeSubsidyInterest: val.storeSubsidyInterest,      //本店贴息
                        finalMileage: val.finalMileage,                      //期末里程数
                        finalValue: val.finalValue,                          //期末保值数
                        cautionMoney: val.cautionMoney,                      //保证金
                        actualServiceFee: val.actualServiceFee,              //金融服务费
                        remark: val.remark,                                  //备注
                        scIsDefeat: val.scIsDefeat,                          //是否SC准战败
                        scDefeatReason: val.scDefeatReason                   //SC准战败原因
                    }
                }
            }
        },
        components: {
            pagination,
            areaqueryshop
        }
    }
</script>

<style lang="css" scoped>
</style>
