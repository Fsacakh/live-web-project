<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <b-card header="主档信息">
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-group horizontal label="产品编号*" label-text-align="right" :label-cols="4">
                                <b-form-input v-model="financePro.financeCode" readonly/>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-group horizontal label="产品名称*" label-text-align="right" :label-cols="4">
                                <b-form-input v-model="financePro.financeName" :state="financeNameState" :disabled="addFinanceProSuccess" />
                            </b-form-group>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="金融机构*" label-text-align="right" :label-cols="4">
                                <b-form-select :options="authorizationOrgs" :state="orgInfoState" v-model="financePro.orgInfo" :disabled="addFinanceProSuccess">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="产品类型*" label-text-align="right" :label-cols="4">
                                <b-form-select :options="financeTypes" :state="financeTypeState" v-model="financeTypeIndex" :disabled="addFinanceProSuccess">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="贷款类型*" label-text-align="right" :label-cols="4">
                                <b-form-select :options="loanTypes" :state="loanTypeState" v-model="financePro.loanType" :disabled="addFinanceProSuccess">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-group horizontal label="有效时间*" label-text-align="right" :label-cols="4" :class="{'input-box' : effectStarttimeState}">
                                <date-picker v-model="timeStep" type="daterange" @change="dateChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" :disabled="addFinanceProSuccess">
                                </date-picker>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="利率费率类型*" label-text-align="right" :label-cols="4">
                                <b-form-select :options="rateTypes" :state="rateTypeState" v-model="financePro.rateType" :disabled="addFinanceProSuccess">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12">
                            <div v-show="!addFinanceProSuccess" class="pull-right">
                                <b-button size="sm" @click="goBack">取消</b-button>
                                <b-button size="sm" variant="primary" @click="createFinancePro">确定</b-button>
                            </div>
                            <div v-show="addFinanceProSuccess" class="pull-right">
                                <b-button v-show="addFinanceProSuccess" size="sm" variant="warning" @click="resetFinanceProSucc">修改</b-button>
                            </div>
                        </div>
                    </div>
                </b-card>
                <b-card header="附加字段信息" class="mb-3">
                    <b-tabs pills>
                        <b-tab title="适用范围" active>
                            <div class="animated fadeIn">
                                <div class="row mb-2">
                                    <div class="col-md-12">
                                        <suit-scope @shop-preserve="shopPreserve" @sales-preserve="salesPreserve" @remove-tr="removetr" :tab-data="useRanges">
                                        </suit-scope>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="产品方案">
                            <div class="animated fadeIn">
                                <div class="row mb-2">
                                    <div class="col-md-12">
                                        <div class="pull-left">
                                            <b-button size="sm" variant="success" @click="createFinanceProDetail">新增</b-button>
                                            <b-button size="sm" variant="info" @click="editFinanceProDetail">编辑</b-button>
                                            <b-button size="sm" variant="warning" @click="copyFinanceProDetail">复制新增</b-button>
                                            <b-button size="sm" variant="danger" @click="removeFinanceProDetail">删除</b-button>
                                            <upload buttonName="导入" :addParams="addParams" :url="uploadUrl" :analysisExcel="analysisExcel" :showBack="showBack"></upload>
                                            <b-button size="sm" @click="downloadFinanceProTemplateFile">预设模板导出</b-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-scrollable">
                                    <b-table striped hover bordered show-empty :items="financeProDetailInfoList" :fields="fields">
                                        <template slot="selectRow" slot-scope="data">
                                            <input type="radio" :value="data.index" v-model="selectRow" name="selectRow"></input>
                                        </template>
                                        <template slot="Car" slot-scope="data">
                                           {{ data.item.tDetailCarInfoList[0] | carName }}
                                        </template>
                                        <template slot="downpayment" slot-scope="data">
                                            {{ data.item.downpaymentType | switchIsPercent(data.item.downpaymentMin) }} ~ {{ data.item.downpaymentType | switchIsPercent(data.item.downpaymentMax) }}
                                        </template>
                                        <template slot="balancePayment" slot-scope="data">
                                            {{ data.item.bpIsPercent | switchIsPercent(data.item.balancePaymentMinValue) }} ~ {{ data.item.bpIsPercent | switchIsPercent(data.item.balancePaymentMaxValue) }}
                                        </template>
                                        <template slot="rates" slot-scope="data">
                                            {{ parseFloat(data.item.rates * 100).toFixed(2) + '%' }}
                                        </template>
                                        <template slot="depositFree" slot-scope="data">
                                            {{ data.item.dfInPercent | switchIsPercent(data.item.depositFree) }}
                                        </template>
                                        <template slot="scValue" slot-scope="data">
                                            {{ data.item.scIsPercent == 1 ? parseFloat(data.item.scValue * 100).toFixed(2) + '%' : data.item.scValue }}
                                        </template>
                                        <template slot="intersubsidy" slot-scope="data">
                                            {{ data.item.tDetailIntersubsidyInfoList[0].isPercent | switchIsPercent(data.item.tDetailIntersubsidyInfoList[0].intersubsidyValue)}}
                                        </template>
                                        <template slot="dealerIntersubsidy" slot-scope="data">
                                            {{ data.item.tDetailIntersubsidyInfoList[0].dealerInPercent | switchIsPercent(data.item.tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue)}}
                                        </template>
                                        <template slot="weight" slot-scope="data">
                                            {{ data.item.tDetailCarInfoList[0].priorityLevel }}
                                       </template>
                                       <template slot="onOffFlag" slot-scope="data">
                                           <label class="text-default" v-if="data.item.onOffFlag == 0">生效</label>
                                           <label class="text-danger" v-else>失效</label>
                                       </template>
                                       <template slot="empty">
                                           暂无数据...
                                       </template>
                                    </b-table>
                                </div>
                                <div class="row mt-2">
                                   <div class="col-md-12">
                                      <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total" :total-pages="pager.totalPages">
                                      </pagination>
                                   </div>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </b-card>
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
    import pagination from '../../components/pagination/pagination'
    import {
        MessageBox,
        Message,
        DatePicker
    } from 'element-ui'
    import suitScope from '../../components/iris-suitscope'
    import upload from 'components/iris-upload'
    import config from '../../common/config'
    export default {
        mounted() {
            this.getFinanceTypes()
            this.getRateTypes()
            this.getLoanTypes()
            this.getAuthorizationOrgs()
            this.getFinancePro({
                id: this.$route.params.id
            })
        },
        destroyed() {
            this.resetFinancePro()
        },
        data: function() {
            return {
                uploadUrl: config.financePro.uploadUrl,
                downloadTemplateFile: config.financePro.downloadTemplateFileUrl,
                financeNameState: null,
                effectStarttimeState: false,
                effectEndtimeState: false,
                orgInfoState: null,
                financeTypeState: null,
                loanTypeState: null,
                rateTypeState: null,
                timeStep: [],
                selectRow: -1,
                financeTypeIndex: 0,
                loanTypes: [],
                useRanges: [],
                fields: {
                    selectRow: {
                        label: '选择'
                    },
                    Car: {
                        label: '适用车型'
                    },
                    downpayment: {
                        label: '首付'
                    },
                    balancePayment: {
                        label: '尾款'
                    },
                    cycleMonth: {
                        label: '期数(月)'
                    },
                    rates: {
                        label: '利率/费率(%)'
                    },
                    depositFree: {
                        label: '保证金'
                    },
                    scValue: {
                        label: '手续费'
                    },
                    intersubsidy: {
                        label: '机构贴息'
                    },
                    dealerIntersubsidy: {
                        label: '经销商贴息'
                    },
                    weight: {
                        label: '推荐权重'
                    },
                    onOffFlag: {
                        label: '状态'
                    }
                },
                financePro: {
                    financeCode: '',
                    financeName: '',
                    orgInfo: '',
                    financeType: '',
                    rateType: '',
                    doType: 1,
                    onOffFlag: 0,
                    loanType: '',
                    effectStarttime: '',
                    effectEndtime: ''
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                addParams: {
                    relationCode: '',
                    singleFlag: '1',
                    businessType: ''
                },
                showBack: {
                    financeCode: ''
                },
            }
        },
        computed: {
            ...mapState('financePro', [
                'pager',
                'financeCode',
                'financeTypes',
                'rateTypes',
                'authorizationOrgs',
                'financeProDetailInfoList',
                'addFinanceProSuccess',
                'financeProData',
                'obj',
                'useRangeList'
            ])
        },
        methods: {
            createFinancePro: function() {
                if (this.checkFinanceName() && this.checkEffectTime() && this.checkValues()) {
                    let params = {
                        financePro: this.$data.financePro
                    }
                    this.$store.dispatch('financePro/createFinancePro', params)
                }
            },
            createFinanceProDetail: function() {
                let financeCode = this.financePro.financeCode
                let financeType = this.financePro.financeType
                let financeOrgCode = this.financePro.orgInfo.split(';')[0]
                this.$router.push({
                    path: '/financePro/addProgram/' + financeCode + '/' + financeType + '/' + financeOrgCode
                })
            },
            editFinanceProDetail: function() {
                if (parseInt(this.selectRow) != -1) {
                    let financeCode = this.financeProData.financeCode
                    let financeType = this.financeProData.financeType
                    let financeOrgCode = this.financeProData.orgInfo.split(';')[0]
                    let financeDetailCode = this.financeProDetailInfoList[this.selectRow].financeDetailCode
                    this.$router.push({
                        path: '/financePro/editProgram/' + financeCode + '/' + financeType +
                            '/' + financeOrgCode + '/' + financeDetailCode
                    })
                } else {
                    Message.closeAll()
                    Message({
                        type: 'error',
                        message: config.messInfo.selectOneRow
                    })
                }
            },
            copyFinanceProDetail: function() {
                if (parseInt(this.selectRow) != -1) {
                    let financeCode = this.financeProData.financeCode
                    let financeType = this.financeProData.financeType
                    let financeOrgCode = this.financeProData.orgInfo.split(';')[0]
                    let financeDetailCode = this.financeProDetailInfoList[this.selectRow].financeDetailCode
                    this.$router.push({
                        path: '/financePro/copyProgram/' + financeCode + '/' + financeType +
                            '/' + financeOrgCode + '/' + financeDetailCode
                    })
                } else {
                    Message.closeAll()
                    Message({
                        type: 'error',
                        message: config.messInfo.selectOneRow
                    })
                }
            },
            removeFinanceProDetail: function() {
                let _this = this
                if (parseInt(_this.$data.selectRow) != -1) {
                    let h = _this.$createElement
                    MessageBox({
                        title: '提示',
                        message: h('h6', '是否删除该方案!'),
                        showCancelButton: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        callback: (action, instance) => {
                            if (action === 'confirm') {
                                _this.deleteFinanceProDetail({
                                    index: parseInt(_this.selectRow),
                                    callback: () => {
                                        _this.selectRow = -1
                                    }
                                })
                            }
                        }
                    })
                } else {
                    Message.closeAll()
                    Message({
                        type: 'error',
                        message: config.messInfo.selectOneRow
                    })
                }
            },
            initFinancePro: function() {
                this.$data.financePro = {
                    id: this.financeProData.id,
                    financeCode: this.financeProData.financeCode,
                    financeName: this.financeProData.financeName,
                    orgInfo: this.financeProData.orgInfo,
                    financeType: this.financeProData.financeType,
                    rateType: this.financeProData.rateType,
                    doType: 1,
                    onOffFlag: 0,
                    loanType: this.financeProData.loanType,
                    effectStarttime: this.financeProData.effectStarttime,
                    effectEndtime: this.financeProData.effectEndtime
                }
                this.$data.timeStep = []
                this.$data.timeStep.push(new Date(this.financeProData.effectStarttime))
                this.$data.timeStep.push(new Date(this.financeProData.effectEndtime))
                if (this.financeTypes.length > 0) {
                    this.$data.financeTypeIndex = this.financeTypes.findIndex((item) => {
                        return item.code == this.$data.financePro.financeType
                    })
                }
                this.$data.addParams.relationCode = this.financeProData.financeCode
                this.$data.showBack.financeCode = this.financeProData.financeCode
            },
            shopPreserve: function(data) {
                let _this = this
                if (data.length != 0) {
                    let arr = []
                    data.forEach((item) => {
                        arr.push({
                            financeCode: _this.financeProData.financeCode,
                            rangeCode: item.rangeCode,
                            rangeType: item.rangeType,
                            remark: item.remark,
                            storeCode: item.storeCode
                        })
                    })
                    _this.addOrUpdateUseRangeInfoBatch(arr)
                }
            },
            salesPreserve: function(data) {
                let _this = this
                if (data.length != 0) {
                    let arr = []
                    data.forEach((item) => {
                        arr.push({
                            financeCode: _this.financeProData.financeCode,
                            rangeCode: item.rangeCode,
                            rangeType: item.rangeType,
                            remark: item.remark,
                            salesAreaCode: item.salesAreaCode
                        })
                    })
                    _this.addOrUpdateUseRangeInfoBatch(arr)
                }
            },
            removetr: function(items) {
                let _this = this
                if (items.length > 0) {
                    items.forEach((item) => {
                        item.isDeleted = '1'
                    })
                    _this.addOrUpdateUseRangeInfoBatch(items)
                }
            },
            pageChange: function(num) {
                let params = {
                    financeCode: this.financePro.financeCode,
                    pageNums: config.pageNums,
                    pageStart: num
                }
                this.$store.dispatch('financePro/getFinanceProDetailInfoList', params)
            },
            dateChange: function() {
                let _this = this
                if (_this.$data.timeStep && _this.$data.timeStep.length > 0) {
                    let timeOne = _this.timeStep[0]
                    let timeTwo = _this.timeStep[1]
                    _this.$data.financePro.effectStarttime = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                    _this.$data.financePro.effectEndtime = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
                } else {
                    _this.$data.financePro.effectStarttime = ''
                    _this.$data.financePro.effectEndtime = ''
                }
            },
            checkFinanceName: function() {
                let pattern = /^[\u4e00-\u9fa5a-zA-Z0-9\.\!\~_@%^&*#$]{1,20}$/
                let result = false
                if (pattern.test(this.$data.financePro.financeName)) {
                    this.$data.financeNameState = null
                    result = true
                } else {
                    this.$data.financeNameState = 'invalid'
                    result = false
                }
                return result
            },
            checkEffectTime: function() {
                let result = false
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getUTCMonth() + 1
                let day = date.getUTCDate()
                let toDay = new Date(year + '-' + month + '-' + day)
                let effectStarttime = new Date(this.$data.financePro.effectStarttime)
                let effectEndtime = new Date(this.$data.financePro.effectEndtime)
                if (effectStarttime.getTime() >= toDay.getTime() && effectEndtime.getTime() >= effectStarttime.getTime()) {
                    this.$data.effectStarttimeState = false
                    this.$data.effectEndtimeState = false
                    result = true
                } else {
                    this.$data.effectStarttimeState = true
                    this.$data.effectEndtimeState = true
                    result = false
                }
                return result
            },
            checkValues: function() {
                let _this = this
                let result = true
                if (_this.$data.financePro.orgInfo == '') {
                    _this.$data.orgInfoState = 'invalid'
                    result = false
                } else {
                    _this.$data.orgInfoState = null
                }
                if (_this.$data.financePro.financeType == '') {
                    _this.$data.financeTypeState = 'invalid'
                    result = false
                } else {
                    _this.$data.financeTypeState = null
                }
                if (_this.$data.financePro.loanType == '') {
                    _this.$data.loanTypeState = 'invalid'
                    result = false
                } else {
                    _this.$data.loanTypeState = null
                }
                if (_this.$data.financePro.rateType == '') {
                    _this.$data.rateTypeState = 'invalid'
                    result = false
                } else {
                    _this.$data.rateTypeState = null
                }
                return result
            },
            goBack: function() {
                this.$router.push({
                    path: '/financePro/mainFinancePro'
                })
            },
            analysisExcel: function(res) {
                let _this = this
                if (res.data.code === 'success') {
                    this.getFinanceProDetailInfoList({
                        financeCode: _this.$data.financePro.financeCode,
                        pageNums: config.pageNums,
                        pageStart: 1
                    })
                }
            },
            ...mapActions('financePro', [
                'getFinanceCode',
                'getFinanceTypes',
                'getRateTypes',
                'getLoanTypes',
                'getAuthorizationOrgs',
                'getFinanceProDetailInfoList',
                'deleteFinanceProDetail',
                'downloadFinanceProTemplateFile',
                'resetFinancePro',
                'resetFinanceProSucc',
                'getFinancePro',
                'queryUseRangeInfoList',
                'addOrUpdateUseRangeInfoBatch'
            ])
        },
        watch: {
            financeCode: {
                handler(val) {
                    this.financePro.financeCode = val
                }
            },
            financeProData: {
                handler(data) {
                    this.initFinancePro()
                    this.getFinanceProDetailInfoList({
                        financeCode: data.financeCode,
                        pageNums: config.pageNums,
                        pageStart: 1
                    })
                    this.queryUseRangeInfoList({
                        financeCode: data.financeCode
                    })
                }
            },
            financeTypes: {
                handler(val) {
                    if (this.$data.financePro.financeType != '') {
                        this.$data.financeTypeIndex = this.financeTypes.findIndex((item) => {
                            return item.code == this.$data.financePro.financeType
                        })
                        this.financePro.financeType = this.financeTypes[this.$data.financeTypeIndex].code
                        this.loanTypes = this.financeTypes[this.$data.financeTypeIndex].children
                    } else {
                        this.financePro.financeType = this.financeTypes[0].code
                        this.loanTypes = this.financeTypes[0].children
                    }
                }
            },
            financeTypeIndex: {
                handler(index) {
                    let _this = this
                    if (_this.financeTypes.length > 0) {
                        _this.financePro.financeType = _this.financeTypes[index].code
                        _this.loanTypes = _this.financeTypes[index].children
                    }
                }
            },
            useRangeList: {
                handler(data) {
                    let _this = this
                    _this.useRanges = []
                    data.forEach((item) => {
                        _this.useRanges.push(item)
                    })
                },
                deep: true
            }
        },
        components: {
            DatePicker,
            pagination,
            suitScope,
            upload
        }
    }
</script>
