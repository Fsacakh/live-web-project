<template>
    <div class="animated fadeIn">
        <b-card header="客户信息">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="姓名" :label-cols="4" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="financeWorkbenchInfo.customName">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="电话" :label-cols="4" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="financeWorkbenchInfo.mobilePhone">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="订单号" :label-cols="4" class="text-right">
                        <a href="#" class="pull-left" @click.prevent="goToOrder(financeWorkbenchInfo.orderNo)">{{ financeWorkbenchInfo.orderNo }}</a>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="门店" :label-cols="4" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="financeWorkbenchInfo.storeName">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="销售顾问" :label-cols="4" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="financeWorkbenchInfo.scName">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="订单状态" :label-cols="4" class="text-right">
                        <b-form-select :options="financeStatusList" :disabled="true" v-model="financeWorkbenchInfo.financeStatus">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <b-form-fieldset horizontal label="车辆" :label-cols="2" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="financeWorkbenchInfo.carName">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车辆销售价" :label-cols="4" class="text-right">
                        <b-form-input type="text" :disabled="true" v-model="financeWorkbenchInfo.actualSalesPrice">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <b-card class="mb-2">
            <template slot="header">
                <span>金融订单</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <small class="text-muted">金融状态: {{ financeStatus }}</small>
                <div class="pull-right" v-show="!isLoan">
                    <b-button size="sm" variant="success" @click="showSelectModal">查询方案</b-button>
                    <b-button size="sm" @click="clearFinanceProInfo">清空</b-button>
                </div>
            </template>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="金融机构" :label-cols="4" class="text-right">
                        <b-form-select type="text" :options="authorizationOrgs" v-model="financeWorkbenchInfo.financeOrgCode" :disabled="true">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="金融产品" :label-cols="4" class="text-right">
                        <b-form-input type="text" v-model="financeWorkbenchInfo.financeName" :disabled="true">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="产品类型" :label-cols="4" class="text-right">
                        <b-form-select type="text" :options="financeTypes" v-model="financeTypeIndex" :disabled="true">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="贷款类型" :label-cols="4" class="text-right">
                        <b-form-select type="text" :options="loanTypes" v-model="financeWorkbenchInfo.loanTypeCode" :disabled="true">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="首付" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.0001" v-model.trim="financeWorkbenchInfo.downPaymentAmount" :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="尾款" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.0001" v-model.trim="financeWorkbenchInfo.balancePaymentValue" :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车辆贷款额" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.0001" v-model.trim="financeWorkbenchInfo.valueOfLoan" :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="期数" :label-cols="4" class="text-right">
                        <b-form-input
                            type="number"
                            onkeyup="this.value=this.value.replace(/\D/g,'')"
                            onafterpaste="this.value=this.value.replace(/\D/g,'')"
                            v-model="financeWorkbenchInfo.cycleMonth"
                            :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车贷利率/费率" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.000000001" v-model="financeWorkbenchInfo.taxRate" :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="月供" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.0001" v-model="financeWorkbenchInfo.payForMonth" :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row" v-show="isSubsidyInterest">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="机构贴息" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.0001" v-model="financeWorkbenchInfo.financeSubsidyInterest" :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="本店贴息" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.0001" v-model="financeWorkbenchInfo.storeSubsidyInterest" :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row" v-show="isLease">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="期末里程数" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.0001" v-model="financeWorkbenchInfo.finalMileage" :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="期末保值数" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.0001" v-model="financeWorkbenchInfo.finalValue" :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="保证金" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.0001" v-model="financeWorkbenchInfo.cautionMoney" :disabled="isLoan">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="金融服务费" :label-cols="4" class="text-right">
                        <b-form-input type="number" step="0.0001"  v-model="financeWorkbenchInfo.actualServiceFee" :disabled="true">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="" :label-cols="1" class="text-right">
                        <span>最后更新时间: {{ financeWorkbenchInfo.updateTimeStr }}</span>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6" v-show="!isLoan">
                    <div class="pull-right">
                          <b-button size="sm" variant="primary" @click="showHistoryModal">查询报价推送历史</b-button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="是否SC准战败" :label-cols="4" class="text-right">
                        <b-form-select :options="isDefeatList" v-model="financeWorkbenchInfo.scIsDefeat"  :disabled="true">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6" v-show="financeWorkbenchInfo.scIsDefeat == 1">
                    <b-form-fieldset horizontal label="SC准战败原因" :label-cols="4" class="text-right">
                        <b-form-select :options="financeFailReasonTypes" v-model="financeWorkbenchInfo.scDefeatReason"  :disabled="true">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="是否金融战败" :label-cols="4" class="text-right">
                        <b-form-select :options="isDefeatList" v-model="financeWorkbenchInfo.isDefeat" :disabled="isLoan">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6" v-show="financeWorkbenchInfo.isDefeat == 1">
                    <b-form-fieldset horizontal label="金融战败原因" :label-cols="4" class="text-right">
                        <b-form-select :options="financeFailReasonTypes" v-model="financeWorkbenchInfo.defeatReason" :disabled="isLoan">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row" v-show="!isLoan">
                <div class="col-md-12">
                    <div class="pull-right" v-show="financeWorkbenchInfo.financeStatus != 7">
                        <b-button size="sm" variant="primary" @click="editFinanceWorkbenchInfo">保存</b-button>
                        <b-button size="sm" variant="warning" @click="synchFinanceWbInfo">同步该方案到订单</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-2" header="贷款客户联系资料" v-show="isLoan">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="客户姓名" :label-cols="4" class="text-right">
                        <b-form-input type="text" v-model.trim="finanCustomInfo.financeCustomName">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="电话" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model.trim="finanCustomInfo.customMobilePhone">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="证件类型" :label-cols="4" class="text-right">
                        <b-form-select :options="idTypes" v-model="finanCustomInfo.customIdType">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="证件号" :label-cols="4" class="text-right">
                        <b-form-input onkeyup="value=value.replace(/[\W]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" type="text" v-model.trim="finanCustomInfo.customIdNum">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-8">
                    <b-form-fieldset horizontal label="联系地址" :label-cols="2" class="text-right">
                        <b-form-textarea :rows="3" v-model.trim="finanCustomInfo.customAddress">
                        </b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="联系人姓名" :label-cols="4" class="text-right">
                        <b-form-input type="text" v-model.trim="finanCustomInfo.contactName">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="电话" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model.trim="finanCustomInfo.contactMobilePhone">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="证件类型" :label-cols="4" class="text-right">
                        <b-form-select :options="idTypes" v-model="finanCustomInfo.contactIdType">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="证件号" :label-cols="4" class="text-right">
                        <b-form-input onkeyup="value=value.replace(/[\W]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" type="text" v-model.trim="finanCustomInfo.contactIdNum">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-8">
                    <b-form-fieldset horizontal label="联系地址" :label-cols="2" class="text-right">
                        <b-form-textarea :rows="3" v-model.trim="finanCustomInfo.contactAddress">
                        </b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" variant="primary" @click="editFinanceCustomInfo()">保存</b-button>
                        <b-button size="sm" @click="goBack">取消</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-2" header="贷款申请跟踪" v-show="isLoan">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="申请结果" :label-cols="4" class="text-right">
                        <b-form-select :options="approvalResultTypes" v-model="financeWorkbenchTrackInfo.trackResultCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4" v-show="financeWorkbenchTrackInfo.trackResultCode == config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.replyFail">
                    <b-form-fieldset horizontal label="批复失败原因" :label-cols="4" class="text-right">
                        <b-form-select :state="replyFailState" :options="approvalResultReasonTypes" v-model="financeWorkbenchTrackInfo.trackResultReasonCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4" v-show="financeWorkbenchTrackInfo.trackResultCode == config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.applySuccess">
                    <b-form-fieldset horizontal label="申请成功日期" label-text-align="right" :label-cols="4" :class="{ 'input-box' : applySuccessState }">
                        <date-picker v-model="financeWorkbenchTrackInfo.trackResultTime" :picker-options="pickerOptions">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4" v-show="financeWorkbenchTrackInfo.trackResultCode == config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.conditionReply">
                    <b-form-group>
                        <b-form-input v-model.trim="financeWorkbenchTrackInfo.trackResultReasonName" >
                        </b-form-input>
                    </b-form-group>
                </div>
                <div class="col-md-4" v-show="financeWorkbenchTrackInfo.trackResultCode == config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.mortgageCompletion">
                    <b-form-fieldset horizontal label="抵押成功日期" label-text-align="right" :label-cols="4" :class="{ 'input-box' : mortgageCompletionState }">
                        <date-picker v-model="financeWorkbenchTrackInfo.trackResultTime" :picker-options="pickerOptions">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4" v-show="financeWorkbenchTrackInfo.trackResultCode == config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.loanCompletion">
                    <b-form-fieldset horizontal label="放款成功日期" label-text-align="right" :label-cols="4" :class="{ 'input-box' : loanCompletionState }">
                        <date-picker v-model="financeWorkbenchTrackInfo.trackResultTime" :picker-options="pickerOptions">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4" v-show="financeWorkbenchTrackInfo.trackResultCode == config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.replyLoan">
                    <b-form-fieldset horizontal label="贷款申请日期" label-text-align="right" :label-cols="4" :class="{ 'input-box' : replyLoanState }">
                        <date-picker v-model="financeWorkbenchTrackInfo.trackResultTime" :picker-options="pickerOptions">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4" v-show="financeWorkbenchTrackInfo.trackResultCode == config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.replySuccess">
                    <b-form-fieldset horizontal label="批复成功日期" label-text-align="right" :label-cols="4" :class="{ 'input-box' : replySuccessState }">
                        <date-picker v-model="financeWorkbenchTrackInfo.trackResultTime" :picker-options="pickerOptions">
                        </date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" variant="primary" @click="editFinanceWorkbenchtrackInfo">保存</b-button>
                        <b-button size="sm" variant="warning" @click="showTrackModal">查看申请跟踪历史</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <select-modal></select-modal>
        <history-modal></history-modal>
        <track-modal></track-modal>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../common/config'
    import api from "../../common/api"
    import pagination from 'components/pagination/pagination'
    import treepicker from 'components/treepicker/treepicker'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import historyModal from './historyModal.vue'
    import selectModal from './selectModal.vue'
    import trackModal from './trackModal.vue'
    import {
        MessageBox,
        Message,
        DatePicker
    } from 'element-ui'
    import common from '../../common/common';
    export default {
        mounted() {
            let _this = this
              _this.getFinanceWorkbenchInfo({
                'financeWbCode': _this.$route.params.financeWbCode,
                'orderNo': _this.$route.params.orderNo,           //订单号
                'id': _this.$route.params.id
            })
            if (_this.isLoan) {
                // 贷款客户联系资料查询
                _this.getFinanceCustomInfo({
                    'financialOrderNo': _this.$route.params.financialOrderNo
                })
                _this.getFinanceWbTrackInfo({
                    'financeWbCode': _this.$route.params.financeWbCode
                })
            }
            _this.getAuthorizationOrgs()
            _this.getFinanceTypes()
            _this.getIdtypes()
            _this.getApprovalResultTypes()
            _this.getApprovalResultReasonTypes()
            _this.getFinanceFailReasonType()
        },
        data: function() {
            return {
                replyFailState : null,
                applySuccessState : null,
                mortgageCompletionState : null,
                loanCompletionState : null,
                replyLoanState : null,
                replySuccessState : null,
                config: config,
                SCFailReasonTypes: config.ref.financeFailReasonType,
                fields: {
                    selectRow: {
                        label: '选择'
                    },
                    skuCode: {
                        label: '商品编码'
                    },
                    skuName: {
                        label: '商品名称'
                    },
                    skuPrice: {
                        label: '商品销售价格'
                    },
                    guidingPrice: {
                        label: '指导价'
                    },
                    marketPrice: {
                        label: '市场价'
                    },
                    startTime: {
                        label: '开始时间'
                    },
                    endTime: {
                        label: '结束时间'
                    },
                    operate: {
                        label: '操作'
                    }
                },
                financeWorkbenchInfo: {},       //金融方案信息
                financeDetailInfo: {
                    orderNo: '',
                    currentOrderWfCode: '',
                    financialOrderNo: '',
                    isDefeat: 0,                        //是否金融战败
                    scIsDefeat: 0,                      //是否SC战败
                    financialOrderDetailInfo: {
                        orderNo: '',
                        financeDetailCode: '',
                        financeTypeCode: '',
                        financeTypeName: '',
                        financeOrgCode: '',
                        financeOrgName: '',
                        downpaymentType: 0,
                        downPaymentAmount: null,
                        downpaymentMin: 0,
                        downpaymentMax: 0,
                        evIsPercent: 0,
                        balancePaymentValue: null,
                        balancePaymentMinValue: 0,
                        balancePaymentMaxValue: 0,
                        valueOfLoan: null,
                        taxRate: null,
                        cycleMonth: '',                  // 期数
                        payForMonth: null,               // 月供
                        repaymentMethod: '',
                        repaymentMethodName: '',
                        cautionMoney: null,
                        commissionFee: null,
                        actualServiceFee: null,          //金融服务费
                        finalMileage: null,
                        endingValueType: 0,
                        finalValue: null,
                        storeInPercent: 0,
                        storeSubsidyInterest: null,      //本店贴息
                        financeInPercent: 0,
                        financeSubsidyInterest: null,
                        remark: ''
                    }
                },
                finanCustomInfo: {
                    id: '',
                    customName: '',
                    customMobilePhone: '',       //客户手机
                    customIdType: '',            //金融贷款客户证件类型
                    customIdNum: '',             //金融贷款客户证件编码
                    customProvinceAreaCode: '',  //金融贷款客户省级编码
                    customCityAreaCode: '',      //金融贷款客户城市编码
                    customAddress: '',           //金融贷款客户地址
                    contactName: '',             //联系客户名称
                    contactMobilePhone: '',      //联系客户手机号
                    contactIdNum: '',            //联系客户证件编码
                    contactIdType: '',           //联系客户证件类型
                    contactProvinceAreaCode: '', //联系客户省级编码
                    contactCityAreaCode: '',     //联系客户城市编码
                    contactAddress: '',          //联系客户地址
                    financialOrderNo: '',        //金融订单号
                    orderNo: '',                 //订单号
                    financeCustomCode: '',       //金融贷款客户编码
                    storeCode: '',               //门店编码
                    customProvinceAreaName: '',  //金融贷款客户省级名称
                    customCityAreaName: '',      //金融贷款客户城市名称
                    contactProvinceAreaName: '', //联系客户省级名称
                    contactCityAreaName: '',     //联系客户城市名称
                    remark: '',                  //备注
                    financeCustomName: ''        //金融贷款客户名称
                },
                financeWorkbenchTrackInfo: {
                    trackResultCode: '',//ApprovalResultTypeApplySuccess  
                    trackResultReasonCode: '',
                    financeWbCode: '',
                    wbRootCode: ''
                },
                financeStatusList: [
                    {
                        value: -1,
                        text: '全部'
                    },
                    {
                        value: 1,
                        text: '待协助'
                    },
                    {
                        value: 2,
                        text: '销售顾问报价'
                    },
                    {
                        value: 3,
                        text: 'SC准战败'
                    },
                    {
                        value: 4,
                        text: '金融专员报价'
                    },
                    {
                        value: 5,
                        text: '金融专员战败'
                    },
                    {
                        value: 6,
                        text: '已完成'
                    },
                    {
                        value: 7,
                        text: '已作废'
                    }
                ],
                isDefeatList: [{
                        value: 0,
                        text: '否'
                    },
                    {
                        value: 1,
                        text: '是'
                    }
                ],
                financeTypeIndex: null,
                loanTypes: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                }
            }
        },
        computed: {
            ...mapState('financeWorkbench', [
                'financeWorkbenchData',
                'customData',
                'financeWorkTrackData',
                'authorizationOrgs',
                'financeTypes',
                'idTypes',
                'approvalResultTypes',
                'approvalResultReasonTypes',
                'financeFailReasonTypes',
                'getfinanceWorkbenchSucc',
            ]),
            ...mapGetters('financeWorkbench', [
                'financeStatus'
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
            },
            // 控制显示是协作报价里面的客户金融订单还是贷款申请的客户金融订单
            isLoan: function() {
                let _this = this;
                return (_this.$route.params.flag === config.financeWorkbench.loanFlag)
            }
        },
        methods: {
            // 贷款客户联系资料取消方法
            goBack: function() {
                this.$router.go(-1)
            },
            // 订单号点击事项
            goToOrder: function(orderNo) {
                let _this = this
                _this.$router.push('/order/detail/' + orderNo)
            },
            // 保存方法
            editFinanceWorkbenchInfo: function() {
                let _this = this
                let val = _this.$data.financeWorkbenchInfo
                let index = _this.authorizationOrgs.findIndex((item) => {
                    return item.value === val.financeOrgCode      //金融机构
                })
                if (index >= 0) {
                   _this.$data.financeWorkbenchInfo.financeOrgName = _this.authorizationOrgs[index].text;
                }
                index = _this.financeTypes.findIndex((item) => {
                    return item.code === val.financeTypeCode      //金融类型编码
                })
                if (index >= 0) {
                   _this.$data.financeWorkbenchInfo.financeTypeName = _this.financeTypes[index].text;
                }
                index = _this.loanTypes.findIndex((item) => {
                    return item.value === val.loanTypeCode  //贷款类型编码
                })
                if (index >= 0) {
                   _this.$data.financeWorkbenchInfo.loanTypeName = _this.loanTypes[index].text
                }
                if (val.isDefeat == 0) {
                   val.scIsDefeat = 0
                   val.scDefeatReason = ''
                }
                // 金融协作报价
                _this.updateFinanceWorkbenchInfo({
                    financeWorkbenchInfo: val,
                    callback: (id) => {
                        Message({
                           type: 'success',
                           message: config.messInfo.updateFinanceWbSucc
                        })
                        _this.$router.replace('/financeWb/order/'+ val.financeWbCode + '/' + val.orderNo + '/' + id + '/' + val.financialOrderNo + '/' + config.financeWorkbench.quoteFlag)
                    }
                })
            },
            // 贷款客户联系资料保存方法
            editFinanceCustomInfo: function() {
                let _this = this
                _this.insertFinanCustomInfo({
                    ..._this.$data.finanCustomInfo,
                    callback: () => {
                        Message({
                            type: 'success',
                            message: config.messInfo.updateFinanceCustomSucc
                        })
                    }
                })
            },
            // 贷款申请跟踪保存方法
            editFinanceWorkbenchtrackInfo: function() {
                let _this = this
                if(this.financeWorkbenchTrackInfo.trackResultCode === config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.replyFail) {
                    if(!this.financeWorkbenchTrackInfo.trackResultReasonCode) {
                        this.replyFailState = 'invalid'
                        return;
                    } else {
                        this.replyFailState = null
                    }
                }
                if(this.financeWorkbenchTrackInfo.trackResultCode === config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.applySuccess) {
                    if(!this.financeWorkbenchTrackInfo.trackResultTime) {
                        this.applySuccessState = 'invalid'
                        return;
                    } else {
                        this.applySuccessState = null
                    }
                }
                if(this.financeWorkbenchTrackInfo.trackResultCode === config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.mortgageCompletion) {
                    if(!this.financeWorkbenchTrackInfo.trackResultTime) {
                        this.mortgageCompletionState = 'invalid'
                        return;
                    } else {
                        this.mortgageCompletionState = null
                    }
                }
                if(this.financeWorkbenchTrackInfo.trackResultCode === config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.loanCompletion) {
                    if(!this.financeWorkbenchTrackInfo.trackResultTime) {
                        this.loanCompletionState = 'invalid'
                        return;
                    } else {
                        this.loanCompletionState = null
                    }
                }
                if(this.financeWorkbenchTrackInfo.trackResultCode === config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.replyLoan) {
                    if(!this.financeWorkbenchTrackInfo.trackResultTime) {
                        this.replyLoanState = 'invalid'
                        return;
                    } else {
                        this.replyLoanState = null
                    }
                }
                if(this.financeWorkbenchTrackInfo.trackResultCode === config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.replySuccess) {
                    if(!this.financeWorkbenchTrackInfo.trackResultTime) {
                        this.replySuccessState = 'invalid'
                        return;
                    } else {
                        this.replySuccessState = null
                    }
                }
                if(this.financeWorkbenchTrackInfo.trackResultCode
                    === config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.conditionReply) {
                    _this.financeWorkbenchTrackInfo.trackResultReasonCode = ''
                } else {
                    _this.financeWorkbenchTrackInfo.trackResultReasonName = ''
                }
                if (_this.financeWorkbenchTrackInfo.trackResultTime != undefined && _this.financeWorkbenchTrackInfo.trackResultTime != '') {
                    _this.financeWorkbenchTrackInfo.trackResultTime = common.eleTimeFormat(_this.financeWorkbenchTrackInfo.trackResultTime)
                }
                let params = this.financeWorkbenchTrackInfo;
                let that = this;
                params.orderNo = that.financeDetailInfo.orderNo;
                params.financialOrderNo = that.financeDetailInfo.financialOrderNo;
                params.financialOrderDetailCode = that.financeDetailInfo.financialOrderDetailInfo.financialOrderDetailCode;
                params.version = that.financeWorkbenchInfo.version;
                api.finWorkbench.insertFinanceWorkbenchTrackInfo(params, (res) => {
                    if (res.data.code === 'success') {
                        if(res.data.obj) {
                            Message({
                                type: 'success',
                                message: config.messInfo.updateFinanceTrackSucc
                            })
                        }
                    }
                })
            },
            // 同步方案
            synchFinanceWbInfo: function() {
                let _this = this;
                _this.updateFinancePro();                      //调用更新金融数据
                _this.synchFinanceWbInfoToFinanceOrder({
                    financeDetailInfo: _this.$data.financeDetailInfo,
                    callback: () => {
                        Message({
                            type: 'success',
                            message: config.messInfo.synchFinanceWbSucc
                        })
                        _this.goBack()
                    }
                })
            },
            // 更新金融数据
            updateFinancePro: function() {
                let _this = this;
                let val = _this.$data.financeWorkbenchInfo;
                _this.$data.financeDetailInfo.currentOrderWfCode = val.financeWbCode;
                _this.$data.financeDetailInfo.orderNo = val.orderNo;
                _this.$data.financeDetailInfo.financialOrderNo = val.financialOrderNo;
                _this.$data.financeDetailInfo.isDefeat = val.isDefeat;
                _this.$data.financeDetailInfo.defeatReason = val.defeatReason;
                if (val.isDefeat == 0) {
                   _this.$data.financeDetailInfo.scDefeatReason = '';
                   _this.$data.financeDetailInfo.scIsDefeat = 0;
                } else {
                   _this.$data.financeDetailInfo.scDefeatReason = val.scDefeatReason;
                   _this.$data.financeDetailInfo.scIsDefeat = val.scIsDefeat;  
                }
                _this.$data.financeDetailInfo.storeCode = val.storeCode;
                _this.$data.financeDetailInfo.financialOrderDetailNo = val.financialOrderDetailNo;
                _this.$data.financeDetailInfo.scCode = val.scCode;
                _this.$data.financeDetailInfo.scName = val.scName;
                _this.$data.financeDetailInfo.customName = val.customName;
                _this.$data.financeDetailInfo.mobilePhone = val.mobilePhone;
                _this.$data.financeDetailInfo.customCode = val.customCode;
                let index = _this.authorizationOrgs.findIndex((item) => {
                    return item.value === val.financeOrgCode
                })
                if (index >= 0) {
                   _this.$data.financeWorkbenchInfo.financeOrgName = _this.authorizationOrgs[index].text
                }
                index = _this.financeTypes.findIndex((item) => {
                    return item.code === val.financeTypeCode
                })
                if (index >= 0) {
                   _this.$data.financeWorkbenchInfo.financeTypeName = _this.financeTypes[index].text
                }
                index = _this.loanTypes.findIndex((item) => {
                    return item.value === val.loanTypeCode
                })
                if (index >= 0) {
                   _this.$data.financeWorkbenchInfo.loanTypeName = _this.loanTypes[index].text
                }
                val = _this.$data.financeWorkbenchInfo
                _this.$data.financeDetailInfo.financialOrderDetailInfo = {
                    orderNo: val.orderNo,
                    financialOrderNo: val.financialOrderNo,
                    financeDetailCode: val.financeDetailCode,
                    financialOrderDetailCode: val.financialOrderDetailNo,
                    financeName: val.financeName,
                    financeCode: val.financeCode,
                    financeTypeCode: val.financeTypeCode,
                    financeTypeName: val.financeTypeName,
                    loanTypeName: val.loanTypeName,      //贷款名称
                    loanTypeCode: val.loanTypeCode,
                    financeOrgCode: val.financeOrgCode,
                    financeOrgName: val.financeOrgName,
                    downpaymentType: val.downpaymentType,
                    downPaymentAmount: val.downPaymentAmount,
                    downpaymentMin: val.downpaymentMin ? val.downpaymentMin : 0,
                    downpaymentMax: val.downpaymentMax ? val.downpaymentMax : 0,
                    evIsPercent: val.evIsPercent,
                    balancePaymentValue: val.balancePaymentValue,
                    balancePaymentMinValue: val.balancePaymentMinValue ? val.balancePaymentMinValue : 0,
                    balancePaymentMaxValue: val.balancePaymentMaxValue ? val.balancePaymentMaxValue : 0,
                    valueOfLoan: val.valueOfLoan,
                    rateType: val.rateType,
                    taxRate: val.taxRate,
                    cycleMonth: val.cycleMonth,
                    payForMonth: val.payForMonth,          //月供
                    repaymentMethod: val.repaymentMethod,
                    repaymentMethodName: val.repaymentMethodName,
                    cautionMoney: val.cautionMoney,                       //保证金
                    actualServiceFee: val.actualServiceFee,               //金融服务费
                    commissionFee: val.commissionFee,
                    finalMileage: val.finalMileage,
                    endingValueType: val.endingValueType,
                    finalValue: val.finalValue,
                    storeSubsidyInterest: val.storeSubsidyInterest,       //本店贴息
                    financeSubsidyInterest: val.financeSubsidyInterest,   //机构贴息
                    remark: val.remark
                }
            },
            // 清空数据
            clearFinanceProInfo: function() {
                let _this = this;
                _this.$data.financeTypeIndex = null;                        //产品类型
                _this.$data.financeWorkbenchInfo.downPaymentAmount = null
                _this.$data.financeWorkbenchInfo.balancePaymentValue = null
                _this.$data.financeWorkbenchInfo.valueOfLoan = null
                _this.$data.financeWorkbenchInfo.cycleMonth = null
                _this.$data.financeWorkbenchInfo.taxRate = null
                _this.$data.financeWorkbenchInfo.payForMonth = null
                _this.$data.financeWorkbenchInfo.cautionMoney = null             //保证金
                _this.$data.financeWorkbenchInfo.commissionFee = null
                _this.$data.financeWorkbenchInfo.actualServiceFee = null         //金融服务费
                _this.$data.financeWorkbenchInfo.finalMileage = null
                _this.$data.financeWorkbenchInfo.finalValue = null
                _this.$data.financeWorkbenchInfo.storeSubsidyInterest = null     //本店贴息
                _this.$data.financeWorkbenchInfo.financeSubsidyInterest = null   //机构贴息
                _this.$data.financeWorkbenchInfo.isDefeat = 0
                _this.$data.financeWorkbenchInfo.scIsDefeat = 0
                _this.$data.financeDetailInfo.financialOrderDetailInfo = {
                    orderNo: _this.financeWorkbenchData.orderNo,
                    financialOrderNo: _this.financeWorkbenchData.financialOrderNo,
                    financeDetailCode: _this.financeWorkbenchData.financeDetailCode,
                    financialOrderDetailCode: _this.financeWorkbenchData.financialOrderDetailNo,
                    financeName: '',
                    financeCode: '',
                    financeTypeCode: '',
                    financeTypeName: '',
                    financeOrgCode: '',
                    financeOrgName: '',
                    downpaymentType: '',
                    downPaymentAmount: '',
                    downpaymentMin: 0,
                    downpaymentMax: 0,
                    evIsPercent: 0,
                    balancePaymentValue: 0,
                    balancePaymentMinValue: 0,
                    balancePaymentMaxValue: 0,
                    valueOfLoan: 0,
                    rateType: '',
                    taxRate: 0,
                    cycleMonth: 0,
                    payForMonth: 0,              //月供
                    repaymentMethod: '',
                    repaymentMethodName: '',
                    cautionMoney: 0,
                    commissionFee: null,
                    actualServiceFee: null,          //金融服务费
                    finalMileage: 0,
                    endingValueType: 0,
                    finalValue: 0,
                    storeSubsidyInterest: null,      //本店贴息
                    financeSubsidyInterest: null,    //机构贴息
                    remark: ''
                }
            },
            ...mapActions('financeWorkbench', [
                'getFinanceWorkbenchInfo',
                'getAuthorizationOrgs',
                'getFinanceTypes',
                'getIdtypes',
                'getApprovalResultTypes',
                'getApprovalResultReasonTypes',
                'getFinanceFailReasonType',
                'getFinanceCustomInfo',
                'getFinanceWbTrackInfo',
                'showSelectModal',     //查询方案
                'showHistoryModal',
                'showTrackModal',
                'updateFinanceWorkbenchInfo',       //更新编辑金融协作报价客户信息
                'insertFinanCustomInfo',
                'insertFinanceWorkbenchTrackInfo',  //贷款申请跟踪保存信息
                'synchFinanceWbInfoToFinanceOrder',
                'getCarOrderActualPriceList'
            ])
        },
        watch: {
            financeWorkbenchData: {
                handler(val) {
                    let _this = this;
                    _this.$data.financeWorkbenchInfo = {
                        id: val.id,
                        financeWbCode: val.financeWbCode,
                        wbRootCode: val.wbRootCode,
                        relationNo: val.relationNo,
                        orderNo: val.orderNo,
                        financialOrderNo: val.financialOrderNo,
                        financialOrderDetailNo: val.financialOrderDetailNo,
                        financeStatus: val.financeStatus,
                        financeCode: val.financeCode,
                        financeDetailCode: val.financeDetailCode,
                        carDisplayName: val.carDisplayName,
                        customCode: val.customCode,
                        customName: val.customName,
                        mobilePhone: val.mobilePhone,
                        salesAreaCode: val.salesAreaCode,
                        salesAreaName: val.salesAreaName,
                        storeCode: val.storeCode,
                        storeName: val.storeName,
                        scCode: val.scCode,
                        scName: val.scName,
                        carName: val.carName,
                        skuCode: val.skuCode,
                        skuName: val.skuName,
                        vinNo: val.vinNo,
                        productionNo: val.productionNo,
                        carFactoryCode: val.carFactoryCode,
                        carFactoryName: val.carFactoryName,
                        carBrandCode: val.carBrandCode,
                        carBrandName: val.carBrandName,
                        carSeriesCode: val.carSeriesCode,
                        carSeriesName: val.carSeriesName,
                        carModelCode: val.carModelCode,
                        carModelName: val.carModelName,
                        carCode: val.carCode,
                        carOpvCode: val.carOpvCode,
                        carOpvName: val.carOpvName,
                        carIotypeCode: val.carIotypeCode,
                        carIotypeName: val.carIotypeName,
                        actualSalesPrice: val.actualSalesPrice,
                        financeTypeCode: val.financeTypeCode,
                        financeTypeName: val.financeTypeName,
                        loanTypeCode: val.loanTypeCode,
                        loanTypeName: val.loanTypeName,
                        financeOrgCode: val.financeOrgCode,
                        financeOrgName: val.financeOrgName,
                        financeName: val.financeName,
                        downPaymentAmount: val.downPaymentAmount,
                        balancePaymentValue: val.balancePaymentValue,
                        valueOfLoan: val.valueOfLoan,            //车辆贷款额
                        cycleMonth: val.cycleMonth,
                        taxRate: val.taxRate,
                        payForMonth: val.payForMonth,            //月供
                        repaymentMethod: val.repaymentMethod,
                        cautionMoney: val.cautionMoney,
                        commissionFee: val.commissionFee,
                        actualServiceFee: val.actualServiceFee,      //金融服务费
                        finalMileage: val.finalMileage,
                        finalValue: val.finalValue,
                        storeSubsidyInterest: val.storeSubsidyInterest,
                        financeSubsidyInterest: val.financeSubsidyInterest,
                        updateTimeStr: val.updateTimeStr,
                        isDefeat: val.isDefeat,                  //是否金融战败
                        scIsDefeat: val.scIsDefeat,              //是否SC战败
                        defeatReason: val.defeatReason,          //金融战败原因
                        scDefeatReason: val.scDefeatReason,      //SC战败原因
                        version: val.version                     //金融版本订单号
                    }
                    _this.$data.financeWorkbenchInfo.commissionFee = val.commissionFee
                    _this.$data.financeWorkbenchInfo.actualServiceFee = val.actualServiceFee  // 金融服务费
                    _this.$data.financeDetailInfo.currentOrderWfCode = val.financeWbCode
                    _this.$data.financeDetailInfo.orderNo = val.orderNo
                    _this.$data.financeDetailInfo.financialOrderNo = val.financialOrderNo
                    _this.$data.financeDetailInfo.financialOrderDetailInfo = {
                        orderNo: val.orderNo,
                        financialOrderNo: val.financialOrderNo,
                        financeDetailCode: val.financeDetailCode,
                        financialOrderDetailCode: val.financialOrderDetailNo,
                        financeName: val.financeName,
                        financeCode: val.financeCode,
                        financeTypeCode: val.financeTypeCode,
                        financeTypeName: val.financeTypeName,
                        loanTypeCode: val.loanTypeCode,
                        loanTypeName: val.loanTypeName,
                        financeOrgCode: val.financeOrgCode,
                        financeOrgName: val.financeOrgName,
                        downpaymentType: val.downpaymentType,
                        downPaymentAmount: val.downPaymentAmount,
                        downpaymentMin: val.downpaymentMin ? val.downpaymentMin : 0,
                        downpaymentMax: val.downpaymentMax ? val.downpaymentMax : 0,
                        evIsPercent: val.evIsPercent,
                        balancePaymentValue: val.balancePaymentValue,
                        balancePaymentMinValue: val.balancePaymentMinValue ? val.balancePaymentMinValue : 0,
                        balancePaymentMaxValue: val.balancePaymentMaxValue ? val.balancePaymentMaxValue : 0,
                        valueOfLoan: val.valueOfLoan,
                        rateType: val.rateType,
                        taxRate: val.taxRate,
                        cycleMonth: val.cycleMonth,
                        payForMonth: val.payForMonth,
                        repaymentMethod: val.repaymentMethod,
                        repaymentMethodName: val.repaymentMethodName,
                        cautionMoney: val.cautionMoney,
                        commissionFee: val.commissionFee,
                        actualServiceFee: val.actualServiceFee,
                        finalMileage: val.finalMileage,
                        endingValueType: val.endingValueType,
                        finalValue: val.finalValue,
                        storeSubsidyInterest: val.storeSubsidyInterest,
                        financeSubsidyInterest: val.financeSubsidyInterest,
                        remark: val.remark
                    }
                    if (_this.customData == null || _this.customData == {} || Object.keys(_this.customData).length == 0) {
                        _this.finanCustomInfo.customCode = val.customCode
                        _this.finanCustomInfo.customName = val.customName
                        _this.finanCustomInfo.customMobilePhone = val.mobilePhone
                    }
                    if (_this.financeTypes.length > 0) {
                        this.$data.financeTypeIndex = this.financeTypes.findIndex((item) => {
                            return (item.code === this.$data.financeWorkbenchInfo.financeTypeCode)
                        })
                    }
                }
            },
            // 贷款客户联系资料
            customData: {
                handler(val) {
                    let _this = this
                    _this.finanCustomInfo = JSON.parse(JSON.stringify(val))
                },
                deep: true
            },
            financeWorkTrackData: {
                handler(val) {
                    let _this = this
                    _this.financeWorkbenchTrackInfo = JSON.parse(JSON.stringify(val))
                    _this.financeWorkbenchTrackInfo = {
                        trackResultCode: _this.financeWorkbenchTrackInfo.trackResultCode,
                        trackResultReasonCode: _this.financeWorkbenchTrackInfo.trackResultReasonCode,
                        trackResultReasonName: _this.financeWorkbenchTrackInfo.trackResultReasonName,
                        trackResultTime: _this.financeWorkbenchTrackInfo.trackResultTime
                    }
                },
                deep: true
            },
            financeTypeIndex: {
                handler(index) {
                    let _this = this
                    if (index != null && index >= 0 && _this.financeTypes.length > 0) {
                        _this.financeWorkbenchInfo.financeTypeCode = _this.financeTypes[index].code
                        _this.loanTypes = _this.financeTypes[index].children
                    }
                }
            },
            financeTypes: {
                handler(val) {
                    let _this = this
                    if (_this.financeWorkbenchInfo.financeTypeCode != '' && _this.financeTypes.length > 0) {
                        _this.$data.financeTypeIndex = val.findIndex((item) => {
                            return (item.code === _this.financeWorkbenchInfo.financeTypeCode)
                        })
                        if (_this.$data.financeTypeIndex > 0) {
                            _this.financeWorkbenchInfo.financeTypeCode = val[_this.$data.financeTypeIndex].code
                            _this.loanTypes = val[_this.$data.financeTypeIndex].children
                        }
                    } else {
                        _this.financeWorkbenchInfo.financeTypeCode = val[0].code
                        _this.loanTypes = val[0].children
                    }
                }
            },
        },
        components: {
            pagination,
            treepicker,
            areaqueryshop,
            DatePicker,
            historyModal,
            selectModal,
            historyModal,
            trackModal
        }
    }
</script>
