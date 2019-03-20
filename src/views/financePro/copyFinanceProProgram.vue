<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <b-card-group columns class="cols-1">
                    <b-card header="适用车辆">
                        <div class="row">
                            <div class="col-md-6 col-lg-6" v-if="showFactory">
                                <b-form-fieldset horizontal label="厂家 *" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="factoryCodes" :state="factoryCodeState" v-model="financeProDetails[0].tDetailCarInfoList[0].factoryCode" @input="factoryCodesChange">
                                    </b-form-select>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="品牌 *" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="brandCodes" :state="brandCodeState" v-model="financeProDetails[0].tDetailCarInfoList[0].brandCode" @input="brandCodesChange">
                                    </b-form-select>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="车系 *" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="seriesCodes" :state="seriesCodeState" v-model="financeProDetails[0].tDetailCarInfoList[0].seriesCode" @input="seriesCodesChange">
                                    </b-form-select>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="车型 *" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="modelCodes" :state="modelCodeState" v-model="financeProDetails[0].tDetailCarInfoList[0].modelCode" @input="modelCodesChange">
                                    </b-form-select>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="车款 *" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="carCodes" :state="carCodeState" v-model="financeProDetails[0].tDetailCarInfoList[0].carCode">
                                    </b-form-select>
                                </b-form-fieldset>
                            </div>
                        </div>
                    </b-card>
                    <b-card header="首尾款">
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="首付类型" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="isPercentTypes" v-model.number="financeProDetails[0].downpaymentType">
                                    </b-form-select>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="尾款类型" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="isPercentTypes" v-model.number="financeProDetails[0].bpIsPercent">
                                    </b-form-select>
                                </b-form-fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="首付下限" label-text-align="right" :label-cols="4">
                                    <b-form-input :state="downpaymentMinState" type="number" placeholder="" v-model.number="financeProDetails[0].downpaymentMin"/>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="尾款下限" label-text-align="right" :label-cols="4">
                                    <b-form-input :state="balancePaymentMinValueState" type="number" placeholder="" v-model.number="financeProDetails[0].balancePaymentMinValue"/>
                                </b-form-fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="首付上限" label-text-align="right" :label-cols="4">
                                    <b-form-input :state="downpaymentMaxState" type="number" placeholder="" v-model.number="financeProDetails[0].downpaymentMax"/>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="尾款上限" label-text-align="right" :label-cols="4">
                                    <b-form-input :state="balancePaymentMaxValueState" type="number" placeholder="" v-model.number="financeProDetails[0].balancePaymentMaxValue"/>
                                </b-form-fieldset>
                            </div>
                        </div>
                    </b-card>
                    <b-card>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="期数(月)" label-text-align="right" :label-cols="4">
                                    <b-form-input :state="cycleMonthState" type="number" placeholder="" v-model.number="financeProDetails[0].cycleMonth"/>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="利率/费率" label-text-align="right" :label-cols="4">
                                    <b-form-input :state="ratesState" type="number" placeholder="" v-model.number="financeProDetails[0].rates"/>
                                </b-form-fieldset>
                            </div>
                        </div>
                        <div class="row" v-show="isLease">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="保值金类型" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="isPercentTypes" v-model.number="financeProDetails[0].evIsPercent">
                                    </b-form-select>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="保值金金额" label-text-align="right" :label-cols="4">
                                    <b-form-input type="number" placeholder="" v-model="financeProDetails[0].endingValue"/>
                                </b-form-fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="保证金类型" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="isPercentTypes" v-model.number="financeProDetails[0].dfInPercent">
                                    </b-form-select>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="保证金金额" label-text-align="right" :label-cols="4">
                                    <b-form-input type="number" v-model.number="financeProDetails[0].depositFree"/>
                                </b-form-fieldset>
                            </div>
                        </div>
                        <div class="row" v-show="isLease">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="期末里程数" label-text-align="right" :label-cols="4">
                                    <b-form-input type="number" v-model.number="financeProDetails[0].finalMileage">
                                    </b-form-input>
                                </b-form-fieldset>
                            </div>
                        </div>
                    </b-card>
                    <b-card header="贴息" v-show="!isStandard">
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="机构贴息类型" label-text-align="right" :label-cols="4">
                                    <b-form-select v-if="isInterSubsidyMapEmpty" :options="isPercentTypes" v-model.number="financeProDetails[0].tDetailIntersubsidyInfoList[0].isPercent"/>
                                    <b-form-select v-else :options="isPercentTypes" v-model.number="interSubsidyIsPercent"/>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="经销商贴息类型" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="isPercentTypes" v-model.number="financeProDetails[0].tDetailIntersubsidyInfoList[0].dealerInPercent"></b-form-select>
                                </b-form-fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="机构贴息数值" label-text-align="right" :label-cols="4">
                                    <b-form-input type="number" v-if="isInterSubsidyMapEmpty" placeholder="" v-model.number="financeProDetails[0].tDetailIntersubsidyInfoList[0].intersubsidyValue"/>
                                    <select class="form-control" v-else v-model.number="financeProDetails[0].tDetailIntersubsidyInfoList[0].intersubsidyValue">
                                       <template v-for="item in interSubsidies">
                                           <option :value="item.intersubsidyName">
                                               {{ item.intersubsidyName }}
                                           </option>
                                       </template>
                                    </select>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="经销商贴息数值" label-text-align="right" :label-cols="4">
                                    <b-form-input type="number" placeholder="" v-model.number="financeProDetails[0].tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue"/>
                                </b-form-fieldset>
                            </div>
                        </div>
                    </b-card>
                    <b-card>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="手续费类型" label-text-align="right" :label-cols="4">
                                    <b-form-select v-if="isServiceChargeMapEmpty" :options="isPercentTypes" v-model.number="financeProDetails[0].scIsPercent"/>
                                    <b-form-select v-else :options="isPercentTypes" v-model.number="serviceChargeIsPercent"/>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="手续费金额" label-text-align="right" :label-cols="4">
                                    <b-form-input type="number" v-if="financeProDetails[0].scIsPercent == 0 || isServiceChargeMapEmpty" v-model.number="financeProDetails[0].scValue"/>
                                    <select class="form-control" v-else v-model.number="financeProDetails[0].scValue">
                                       <template v-for="item in serviceCharges">
                                           <option :value="item.serviceChargeValue">
                                               {{ item.serviceChargeValue }}
                                           </option>
                                       </template>
                                    </select>
                                </b-form-fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="推荐权重" label-text-align="right" :label-cols="4">
                                    <b-form-input :state="priorityLevelState" type="number" v-model.number="financeProDetails[0].tDetailCarInfoList[0].priorityLevel" placeholder="1~99">
                                    </b-form-input>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <b-form-fieldset horizontal label="方案状态" label-text-align="right" :label-cols="4">
                                    <b-form-select :options="onOffFlags" v-model.number="financeProDetails[0].onOffFlag"></b-form-select>
                                </b-form-fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <center>
                                    <b-button size="sm" @click="goBack">取消</b-button>
                                    <b-button size="sm" variant="primary" @click="addFinanceProDetail">确定</b-button>
                                </center>
                            </div>
                        </div>
                    </b-card>
                </b-card-group>
            </div>
        </div>
    </div>
</template>

<script>

    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'

    import config from '../../common/config'

    export default {
        mounted() {
            let _this = this
            _this.getFinanceOrgsServiceCharge({
                financeOrgCode: _this.financeOrgCode
            })
            _this.getFinanceOrgsIntersubsidy({
                financeOrgCode: this.financeOrgCode
            })
            _this.getFinanceProDetailInfo({
                financeDetailCode: _this.$route.params.financeDetailCode,
                callback: function(val) {
                    _this.financeProDetails[0] = _this.filterIn(val)
                    _this.financeProDetails[0].id = ''
                    _this.financeProDetails[0].tDetailCarInfoList[0].id =''
                    _this.financeProDetails[0].tDetailIntersubsidyInfoList[0].id =''
                    _this.interSubsidyIsPercent = _this.financeProDetails[0].tDetailIntersubsidyInfoList[0].isPercent
                    _this.serviceChargeIsPercent = _this.financeProDetails[0].scIsPercent
                    _this.getFinanceDetailCode()
                    _this.getFinanceDetailCarCode()
                    _this.getFinanceDetailInterCode()
                    if (!config.isShowFactory) {
                       _this.queryCarInfoByCarSearch({
                           code: '',
                           level: 1,
                           type: config.car.none
                       })
                    } else {
                       _this.queryCarInfoByCarSearch({
                           code: '',
                           level: 2,
                           type: config.car.factoryRefCode
                       })
                    }
                }
            })
            _this.getFinanceProInfo({
                financeCode: _this.financeProDetails[0].financeCode
            })
        },
        data: function() {
            return {
                financeType: this.$route.params.financeType,
                financeOrgCode: this.$route.params.financeOrgCode,
                serviceCharges: [],
                interSubsidies: [],
                interSubsidyIsPercent: 0,
                serviceChargeIsPercent: 0,
                factoryCodeState: null,
                brandCodeState: null,
                seriesCodeState: null,
                modelCodeState: null,
                carCodeState: null,
                downpaymentMinState: null,
                downpaymentMaxState: null,
                balancePaymentMinValueState: null,
                balancePaymentMaxValueState: null,
                cycleMonthState: null,
                ratesState: null,
                priorityLevelState: null,
                financeProDetails: [
                  {
                    financeCode: this.$route.params.financeCode,
                    financeDetailCode: '',
                    downpaymentType: 0,
                    downpaymentMin: 0,
                    downpaymentMax: 0,
                    bpIsPercent: 0,
                    balancePaymentMinValue: 0,
                    balancePaymentMaxValue: 0,
                    cycleMonth: 0,
                    rates: 0,
                    leaseCode: '',
                    dfInPercent: 0,
                    depositFree: 0,
                    evIsPercent: 0,
                    endingValue: 0,
                    scIsPercent: 0,
                    scCode: '',
                    scValue: 0,
                    finalMileage: 0,
                    onOffFlag: 0,
                    tDetailCarInfoList: [{
                        factoryCode: '',
                        brandCode: '',
                        seriesCode: '',
                        modelCode: '',
                        carCode: '',
                        detailCarCode: '',
                        priorityLevel: 1
                    }],
                    tDetailIntersubsidyInfoList: [{
                         detailIntersubsidyCode: '',
                         isPercent: 0,
                         intersubsidyValue: 0,
                         dealerInPercent: 0,
                         dealerIntersubsidyValue: 0
                    }]
                  }
                ],
                isPercentTypes: [
                    {
                        value: 0,
                        text:  '固定金额'
                    },
                    {
                        value: 1,
                        text: '百分比'
                    }
                ],
                onOffFlags: [
                    {
                        value: 0,
                        text:  '启用'
                    },
                    {
                        value: 1,
                        text:  '停用'
                    }
                ]
             }
        },
        methods: {
            ...mapActions('financePro', [
                'getFinanceProInfo',
                'resetFinancePro',
                'getFinanceOrgsServiceCharge',
                'getFinanceOrgsIntersubsidy',
                'getFinanceDetailCode',
                'getFinanceDetailCarCode',
                'getFinanceDetailInterCode',
                'getFinanceProDetailInfo',
                'queryCarInfoByCarSearch',
                'addOrUpdateDetailInfoBatch'
            ]),
            addFinanceProDetail: function() {
                let _this = this
                let params = {
                    financeProDetails: _this.filterOut(_this.$data.financeProDetails),
                    callback: function() {
                        _this.goBack()
                    }
                }
                if (_this.checkValues()) {
                   _this.addOrUpdateDetailInfoBatch(params)
                }
            },
            filterIn: function(val) {
                let _this = this
                let financeProDetail = JSON.parse(JSON.stringify(val))
                if (financeProDetail.downpaymentType == 1) {
                    financeProDetail.downpaymentMin = (financeProDetail.downpaymentMin ? Number(parseFloat(financeProDetail.downpaymentMin * 100)).toFixed(2): 0)
                    financeProDetail.downpaymentMax = (financeProDetail.downpaymentMax ? Number(parseFloat(financeProDetail.downpaymentMax * 100)).toFixed(2): 0)
                }
                if (financeProDetail.bpIsPercent == 1) {
                    financeProDetail.balancePaymentMinValue = (financeProDetail.balancePaymentMinValue ? Number(parseFloat(financeProDetail.balancePaymentMinValue * 100)).toFixed(2): 0)
                    financeProDetail.balancePaymentMaxValue = (financeProDetail.balancePaymentMaxValue ? Number(parseFloat(financeProDetail.balancePaymentMaxValue * 100)).toFixed(2): 0)
                }
                if (financeProDetail.evIsPercent == 1) {
                    financeProDetail.endingValue = (financeProDetail.endingValue ? Number(parseFloat(financeProDetail.endingValue * 100)).toFixed(2): 0)
                }
                if (financeProDetail.dfInPercent == 1) {
                    financeProDetail.depositFree = (financeProDetail.depositFree ? Number(parseFloat(financeProDetail.depositFree * 100)).toFixed(2): 0)
                }
                if (financeProDetail.tDetailIntersubsidyInfoList[0].isPercent == 1) {
                    financeProDetail.tDetailIntersubsidyInfoList[0].intersubsidyValue = (financeProDetail.tDetailIntersubsidyInfoList[0].intersubsidyValue ? Number(parseFloat(financeProDetail.tDetailIntersubsidyInfoList[0].intersubsidyValue * 100)).toFixed(2): 0)
                }
                if  (financeProDetail.tDetailIntersubsidyInfoList[0].dealerInPercent == 1) {
                    financeProDetail.tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue = (financeProDetail.tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue ? Number(parseFloat(financeProDetail.tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue * 100)).toFixed(2): 0)
                }
                financeProDetail.rates = (financeProDetail.rates ? Number(parseFloat(financeProDetail.rates * 100)).toFixed(2): 0)
                if (financeProDetail.scIsPercent == 1 && financeProDetail.scValue > 0) {
                    financeProDetail.scValue = (financeProDetail.scValue ? Number(parseFloat(financeProDetail.scValue * 100)).toFixed(2): 0)
                }
                financeProDetail.downpaymentMin = (financeProDetail.downpaymentMin ? Number(parseFloat(financeProDetail.downpaymentMin)).toFixed(2): 0)
                financeProDetail.downpaymentMax = (financeProDetail.downpaymentMax ? Number(parseFloat(financeProDetail.downpaymentMax)).toFixed(2): 0)
                financeProDetail.balancePaymentMinValue = (financeProDetail.balancePaymentMinValue ? Number(parseFloat(financeProDetail.balancePaymentMinValue)).toFixed(2): 0)
                financeProDetail.balancePaymentMaxValue = (financeProDetail.balancePaymentMaxValue ? Number(parseFloat(financeProDetail.balancePaymentMaxValue)).toFixed(2): 0)
                financeProDetail.endingValue = (financeProDetail.endingValue ? Number(parseFloat(financeProDetail.endingValue)).toFixed(2): 0)
                financeProDetail.depositFree = (financeProDetail.depositFree ? Number(parseFloat(financeProDetail.depositFree)).toFixed(2): 0)
                financeProDetail.finalMileage = (financeProDetail.finalMileage ? Number(parseFloat(financeProDetail.finalMileage)).toFixed(2): 0)
                financeProDetail.tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue = (financeProDetail.tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue ? Number(parseFloat(financeProDetail.tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue)).toFixed(2): 0)
                if (_this.isInterSubsidyMapEmpty) {
                    financeProDetail.tDetailIntersubsidyInfoList[0].intersubsidyValue = (financeProDetail.tDetailIntersubsidyInfoList[0].intersubsidyValue ? Number(parseFloat(financeProDetail.tDetailIntersubsidyInfoList[0].intersubsidyValue)).toFixed(2): 0)
                }
                if (_this.isServiceChargeMapEmpty) {
                    financeProDetail.scValue = (financeProDetail.scValue ? Number(parseFloat(financeProDetail.scValue)).toFixed(2): 0)
                }
                return financeProDetail
            },
            filterOut: function(val) {
                let financeProDetails = JSON.parse(JSON.stringify(val))
                if (financeProDetails[0].downpaymentType == 1) {
                    financeProDetails[0].downpaymentMin = parseFloat(financeProDetails[0].downpaymentMin/100).toFixed(4)
                    financeProDetails[0].downpaymentMax = parseFloat(financeProDetails[0].downpaymentMax/100).toFixed(4)
                }
                if (financeProDetails[0].bpIsPercent == 1) {
                    financeProDetails[0].balancePaymentMinValue = parseFloat(financeProDetails[0].balancePaymentMinValue/100).toFixed(4)
                    financeProDetails[0].balancePaymentMaxValue = parseFloat(financeProDetails[0].balancePaymentMaxValue/100).toFixed(4)
                }
                if (financeProDetails[0].evIsPercent == 1) {
                    financeProDetails[0].endingValue = parseFloat(financeProDetails[0].endingValue/100).toFixed(4)
                }
                if (financeProDetails[0].dfInPercent == 1) {
                    financeProDetails[0].depositFree =  parseFloat(financeProDetails[0].depositFree/100).toFixed(4)
                }
                if (financeProDetails[0].tDetailIntersubsidyInfoList[0].isPercent == 1) {
                    financeProDetails[0].tDetailIntersubsidyInfoList[0].intersubsidyValue = parseFloat(financeProDetails[0].tDetailIntersubsidyInfoList[0].intersubsidyValue/100).toFixed(4)
                }
                if  (financeProDetails[0].tDetailIntersubsidyInfoList[0].dealerInPercent == 1) {
                    financeProDetails[0].tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue = parseFloat(financeProDetails[0].tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue/100).toFixed(4)
                }
                financeProDetails[0].rates = parseFloat(financeProDetails[0].rates/100).toFixed(4)
                if (financeProDetails[0].scIsPercent == 1) {
                    financeProDetails[0].scValue = parseFloat(financeProDetails[0].scValue/100).toFixed(4)
                }
                if (financeProDetails[0].tDetailIntersubsidyInfoList[0].intersubsidyValue == 0 && financeProDetails[0].tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue == 0) {
                    financeProDetails[0].tDetailIntersubsidyInfoList = []
                }
                return financeProDetails
            },
            checkValues: function() {
                let _this = this
                let result = true
                if (_this.$data.financeProDetails[0].cycleMonth <= 1) {
                    _this.$data.cycleMonthState = 'invalid'
                    result = false
                } else {
                    _this.$data.cycleMonthState = null
                }
                if (_this.$data.financeProDetails[0].rates < 0) {
                    _this.$data.ratesState = 'invalid'
                    result = false
                } else {
                    _this.$data.ratesState = null
                }
                if (!config.isShowFactory && _this.$data.financeProDetails[0].tDetailCarInfoList[0].factoryCode == '') {
                    _this.$data.factoryCodeState = 'invalid'
                    result = false
                } else {
                    _this.$data.factoryCodeState = null
                }
                if (config.isShowFactory && _this.$data.financeProDetails[0].tDetailCarInfoList[0].brandCode == '') {
                    _this.$data.brandCodeState = 'invalid'
                    result = false
                } else {
                    _this.$data.brandCodeState = null
                }
                if (parseFloat(_this.$data.financeProDetails[0].downpaymentMin) > parseFloat(_this.$data.financeProDetails[0].downpaymentMax)) {
                    _this.$data.downpaymentMinState = 'invalid'
                    _this.$data.downpaymentMaxState = 'invalid'
                    result = false
                } else {
                    _this.$data.downpaymentMinState = null
                    _this.$data.downpaymentMaxState = null
                }
                if (parseFloat(_this.$data.financeProDetails[0].balancePaymentMinValue) > parseFloat(_this.$data.financeProDetails[0].balancePaymentMaxValue)) {
                    _this.$data.balancePaymentMinValueState = 'invalid'
                    _this.$data.balancePaymentMaxValueState = 'invalid'
                    result = false
                } else {
                    _this.$data.balancePaymentMinValueState = null
                    _this.$data.balancePaymentMaxValueState = null
                }
                // if (_this.$data.financeProDetails[0].tDetailCarInfoList[0].seriesCode == '') {
                //     _this.$data.seriesCodeState = 'invalid'
                //     result = false
                // } else {
                //     _this.$data.seriesCodeState = null
                // }
                // if (_this.$data.financeProDetails[0].tDetailCarInfoList[0].modelCode == '') {
                //     _this.$data.modelCodeState = 'invalid'
                //     result = false
                // } else {
                //     _this.$data.modelCodeState = null
                // }
                // if (_this.$data.financeProDetails[0].tDetailCarInfoList[0].carCode == '') {
                //     _this.$data.carCodeState = 'invalid'
                //     result = false
                // } else {
                //     _this.$data.carCodeState = null
                // }
                let priorityLevel = _this.$data.financeProDetails[0].tDetailCarInfoList[0].priorityLevel
                if (priorityLevel < 1 || priorityLevel > 99) {
                    _this.$data.priorityLevelState = 'invalid'
                    result = false
                } else {
                    _this.$data.priorityLevelState = null
                }
                return result
            },
            factoryCodesChange: function() {
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: '',
                    level: 2,
                    carFactoryCode: config.isShowFactory ? null : _this.financeProDetails[0].tDetailCarInfoList[0].factoryCode,
                    type: config.car.factoryRefCode
                })
                _this.financeProDetails[0].tDetailCarInfoList[0].brandCode = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].brandName = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].seriesCode = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].seriesName = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].modelCode = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].modelName = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].carCode = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].carName = ''
            },
            brandCodesChange: function() {
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.financeProDetails[0].tDetailCarInfoList[0].brandCode,
                    level: 4,
                    carFactoryCode: config.isShowFactory ? null : _this.financeProDetails[0].tDetailCarInfoList[0].factoryCode,
                    carBrandCode: _this.financeProDetails[0].tDetailCarInfoList[0].brandCode,
                    type: config.car.brandRefCode
                })
                _this.financeProDetails[0].tDetailCarInfoList[0].seriesCode = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].seriesName = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].modelCode = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].modelName = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].carCode = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].carName = ''
            },
            seriesCodesChange: function() {
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.financeProDetails[0].tDetailCarInfoList[0].seriesCode,
                    level: 8,
                    carFactoryCode: config.isShowFactory ? null : _this.financeProDetails[0].tDetailCarInfoList[0].factoryCode,
                    carBrandCode: _this.financeProDetails[0].tDetailCarInfoList[0].brandCode,
                    carSeriesCode: _this.financeProDetails[0].tDetailCarInfoList[0].seriesCode,
                    type: config.car.seriesRefCode
                })
                _this.financeProDetails[0].tDetailCarInfoList[0].modelCode = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].modelName = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].carCode = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].carName = ''
            },
            modelCodesChange: function() {
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.financeProDetails[0].tDetailCarInfoList[0].modelCode,
                    level: 64,
                    carFactoryCode: config.isShowFactory ? null : _this.financeProDetails[0].tDetailCarInfoList[0].factoryCode,
                    carBrandCode: _this.financeProDetails[0].tDetailCarInfoList[0].brandCode,
                    carSeriesCode: _this.financeProDetails[0].tDetailCarInfoList[0].seriesCode,
                    carModelCode: _this.financeProDetails[0].tDetailCarInfoList[0].modelCode,
                    type: config.car.modelRefCode
                })
                _this.financeProDetails[0].tDetailCarInfoList[0].carCode = ''
                _this.financeProDetails[0].tDetailCarInfoList[0].carName = ''
            },
            goBack: function() {
                this.$router.go(-1)
            }
        },
        computed: {
            isStandard: function() {
                let result = false
                if(this.financeType === config.financePro.financeType.standardFatherCode) {
                   result = true
                } else {
                   result = false
                }
                return result
            },
            isLease: function() {
                let result = false
                if(this.financeType === config.financePro.financeType.leaseFatherCode) {
                   result = true
                } else {
                   result = false
                }
                return result
            },
            showFactory: function() {
                return !config.isShowFactory
            },
            ...mapGetters('financePro', [
               'isServiceChargeMapEmpty',
               'isInterSubsidyMapEmpty'
            ]),
            ...mapState('financePro', [
                'financeDetailCode',
                'factoryCodes',
                'financeDetailCarCode',
                'financeDetailInterCode',
                'brandCodes',
                'seriesCodes',
                'modelCodes',
                'carCodes',
                'serviceChargeMap',
                'interSubsidyMap',
                'addFinanceProSuccess'
            ])
        },
        watch: {
            financeDetailCode: {
                handler(val) {
                    this.financeProDetails[0].financeDetailCode = val
                }
            },
            financeDetailCarCode: {
                handler(val) {
                    this.financeProDetails[0].tDetailCarInfoList[0].detailCarCode = val
                }
            },
            financeDetailInterCode: {
                handler(val) {
                    this.financeProDetails[0].tDetailIntersubsidyInfoList[0].detailIntersubsidyCode = val
                }
            },
            interSubsidyMap: {
                handler(val) {
                    this.interSubsidyIsPercent = 0
                    if(!this.isInterSubsidyMapEmpty) {
                       this.interSubsidies = this.interSubsidyMap[0]
                    }
                }
            },
            serviceChargeMap: {
                handler(val) {
                    this.serviceChargeIsPercent = 0
                    if(!this.isServiceChargeMapEmpty) {
                       this.serviceCharges = this.serviceChargeMap[0]
                    }
                }
            },
            serviceChargeIsPercent: {
                handler(isPercent) {
                    this.financeProDetails[0].scIsPercent = isPercent
                    if(!this.isServiceChargeMapEmpty) {
                       this.serviceCharges = this.serviceChargeMap[isPercent]
                    }
                }
            },
            interSubsidyIsPercent: {
                handler(isPercent) {
                    this.financeProDetails[0].tDetailIntersubsidyInfoList[0].isPercent = isPercent
                    if(!this.isInterSubsidyMapEmpty) {
                       this.interSubsidies = this.interSubsidyMap[isPercent]
                    }
                }
            }
        },
        components: {}
    }
</script>
