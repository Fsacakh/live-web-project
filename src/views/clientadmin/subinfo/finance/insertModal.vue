<template>
    <b-modal id="insert3" title="新增财务信息" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="账期" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.accountPeriod" type="number" @input="datachange" min="0" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="银行账号" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.bankAccount" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="开户行名称" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.bankName" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="营业地址" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.businessAddress" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="信用额度" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.creditLine" type="number" @input="datachange" step="0.01" min="0" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="企业银行账户" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.enterpriseBankAccount" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="企业电话号码" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.enterprisePhoneNumber" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="发票抬头" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.invoiceTitle" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="发票类型" :label-cols="4" class="text-right">
                            <b-form-select v-model="params.invoiceType" :options="receipttype" class="mb-3">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="可逾期天数" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.overdueDays" type="number" @input="datachange" min="0" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="结算方式" :label-cols="4" class="text-right">
                            <b-form-select v-model="params.settlement" :options="settlement" class="mb-3">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="纳税登记号" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.taxRegistrationNumber" />
                        </b-form-fieldset>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import api from 'common/api'
    import config from 'common/config'
    import common from 'common/common'
    import {
        Message
    } from 'element-ui'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        components: {},
        data() {
            return {
                receipttype: [], //发票类型
                settlement: [], //结算方式
                params: {
                    accountPeriod: 0, //账期
                    bankAccount: "", //银行账号
                    bankName: "", //开户行名称（全称）
                    businessAddress: "", //营业地址
                    creditLine: 0, //信用额度
                    enterpriseBankAccount: "", //企业银行账户
                    enterprisePhoneNumber: "", //企业电话号码
                    invoiceTitle: "", //发票抬头  
                    invoiceType: "", //发票类型
                    overdueDays: "", //可逾期天数
                    settlement: "", //结算方式（现结、后付费）
                    taxRegistrationNumber: "", //纳税登记号
                    financeCode: "", //客户财务信息编码
                    customCode: "" //客户编码
                }
            }
        },
        methods: {
            handleOk() {
                //获取编码
                api.ordinalInfo.getSequence({
                    serviceCode: config.client.clientfinancecode
                }, (msg) => {
                    if (msg.data.code == 'success') {
                        this.params.financeCode = msg.data.obj
                        api.clientadmin.clientfinance.addclientfinance(this.params, (msg) => {
                            if (msg.data.code == 'success') {
                                common.alertInfo("success")
                                this.$store.dispatch("clientmaininfo/queryclientmaininfo", this.params.financeCode)
                                    this.params.accountPeriod = 0 //账期
                                    this.params.bankAccount = "" //银行账号
                                    this.params.bankName = "" //开户行名称（全称）
                                    this.params.businessAddress = "" //营业地址
                                    this.params.creditLine = 0 //信用额度
                                    this.params.enterpriseBankAccount = "" //企业银行账户
                                    this.params.enterprisePhoneNumber = "" //企业电话号码
                                    this.params.invoiceTitle = "" //发票抬头  
                                    this.params.invoiceType = "" //发票类型
                                    this.params.overdueDays = "" //可逾期天数
                                    this.params.settlement = "" //结算方式（现结、后付费）
                                    this.params.taxRegistrationNumber = "" //纳税登记号
                            } else {
                                common.alertInfo("warning")
                            }
                        })
                    }
                })
            },
            datachange(value) {
                if (value < 0) {
                    Message({
                        message: "请输入正数",
                        type: "error"
                    })
                }
            },
            getDataDictionary(refCode, obj) {
                api.ref.getDataDictionary({
                    refCode: refCode
                }).then((msg) => {
                    if (msg.data.message == 'success') {
                        let data = msg.data.obj.referenceDetailInfos || [];
                        for (var i = 0; i < data.length; i++) {
                            this.$set(obj, i, {
                                value: data[i].refDetailCode,
                                text: data[i].refDetailName
                            })
                        }
                    }
                })
            },
        },
        mounted() {
            //获取客户编码
            this.params.customCode = this.$route.params.code
            //获取发票类型
            this.getDataDictionary(config.client.clientreceipttype, this.receipttype)
            //获取结算方式
            this.getDataDictionary(config.client.clientsettlement, this.settlement)
        }
    }
</script>
<style>
    .modal-dialog {
        margin: 80px auto !important;
    }
</style>

