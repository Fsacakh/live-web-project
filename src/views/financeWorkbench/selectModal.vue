<template>
    <b-modal title="选择金融方案" v-model="showModal" no-close-on-backdrop no-close-on-esc size="lg" button-size="sm" @hidden="hideModal" @ok="commitFinanceProDetailInfo" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="产品类型:" label-text-align="right" :label-cols="4">
                    <b-form-select :options="financeTypeCodes" v-model.trim="financeProInfo.financeType"></b-form-select>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="金融机构:" label-text-align="right" :label-cols="4">
                    <b-form-select :options="authorizationOrgs" v-model.trim="financeProInfo.financeOrgCode"></b-form-select>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="pull-right">
                    <b-button size="sm" @click="clear">重置</b-button>
                    <b-button size="sm" variant="primary" @click="search">查询</b-button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 com-lg-12">
                <div class="table-scrollable">
                    <b-table striped hover bordered show-empty :fields="fields" :items="financeProList">
                          <template slot="selectRow" slot-scope="data">
                              <input type="radio" :value="data.index" v-model="selectRow" name="selectRow" />
                          </template>
                          <template slot="Car" slot-scope="data">
                              {{ data.item.tDetailCarInfoList[0] | carName }}
                          </template>
                          <template slot="downpayment" slot-scope="data">
                              {{ data.item.downpaymentType | switchIsPercent(data.item.downpaymentMin) }} ~
                              {{ data.item.downpaymentType | switchIsPercent(data.item.downpaymentMax) }}
                          </template>
                          <template slot="balancePayment" slot-scope="data">
                              {{ data.item.bpIsPercent | switchIsPercent(data.item.balancePaymentMinValue) }} ~
                              {{ data.item.bpIsPercent | switchIsPercent(data.item.balancePaymentMaxValue) }}
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
            </div>
        </div>
        <div class="row">
           <div class="col-md-12">
                <pagination class="pull-right" @page-change="pageChange" :page-no="financePager.pageNo" :page-size="financePager.pageSize" :total-result="financePager.total" :total-pages="financePager.totalPages">
                </pagination>
           </div>
        </div>
   </b-modal>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../common/config'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import pagination from 'components/pagination/pagination'
    export default {
        mounted() {
            let _this = this
            _this.getFinanceTypeCodes()
            _this.getAuthorizationOrgs()
        },
        data: function() {
            return {
                showModal: false,
                selectRow: -1,
                fields: {
                    selectRow: {
                        label: '选择'
                    },
                    financeName: {
                        label: '金融产品名称'
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
                items: [],
                financeProInfo: {
                    factoryCode: '',
                    brandCode: '',
                    seriesCode: '',
                    modelCode: '',
                    carCode: '',
                    financeType: '',
                    financeOrgCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            }
        },
        computed: {
            ...mapState('financeWorkbench', [
                'showSelectModal',
                'financeProList',
                'carAdjustOutStockData',
                'authorizationOrgs',
                'financeTypeCodes',
                'addCarAdjustOutStockDetailList',
                'financePager'
            ])
        },
        methods: {
            ...mapActions('financeWorkbench', [
                'hideSelectModal',
                'getFinanceProList',
                'getAuthorizationOrgs',
                'getFinanceTypeCodes',
                'addCarAdjustOutStockDetailInfoList',
                'commitFinanceProInfo',
                'removeCarAdjustOutStockDetailInfoList'
            ]),
            search: function() {
                this.$data.financeProInfo.pageStart = 1
                this.getFinanceProList(this.$data.financeProInfo)
            },
            clear: function() {
                this.$data.financeProInfo = {
                    factoryCode: '',
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
            hideModal: function() {
                this.$data.selectRow = -1
                this.hideSelectModal()
                this.clear()
            },
            commitFinanceProDetailInfo: function() {
                this.commitFinanceProInfo(this.selectRow)
            },
            pageChange: function(num) {
                this.$data.financeProInfo.pageStart = num
                this.getFinanceProList(this.$data.financeProInfo)
            }
        },
        watch: {
            showSelectModal: {
                handler() {
                    let _this = this
                    _this.showModal = _this.showSelectModal
                }
            },
            financeProList: {
                handler() {
                    this.selectRows = []
                }
            }
        },
        components: {
            pagination,
            areaqueryshop
        }
    }
</script>
