<template>
    <b-modal title="查看申报跟踪历史" v-model="showModal" no-close-on-backdrop no-close-on-esc size="lg" button-size="sm" @hidden="hideModal" @ok="commitFinanceProDetailInfo" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12 com-lg-12">
                <div class="table-scrollable">
                    <b-table striped hover bordered show-empty :fields="fields" :items="financeWbTrackHistoryList">
                          <template slot="createTime" slot-scope="data">
                              {{ data.item.createTime | formatDate }}
                          </template>
                          <template slot="trackResultReasonName" slot-scope="data">
                              {{ data.item.trackResultCode == 'ApprovalResultTypeConditionApproval' || data.item.trackResultCode == 'ApprovalResultTypeReplyFail' ?  data.item.trackResultReasonName :  data.item.trackResultTime}}
                          </template>
                          <template slot="empty">
                              暂无数据...
                          </template>
                    </b-table>
                </div>
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
    import common from '../../common/common'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import pagination from 'components/pagination/pagination'
    export default {
        mounted() {
            let _this = this
        },
        data: function() {
            return {
                common: common,
                showModal: false,
                selectRow: -1,
                fields: {
                    createTime: {
                        label: '记录时间'
                    },
                    trackResultName: {
                        label: '操作'
                    },
                    empName: {
                        label: '操作人'
                    },
                    version: {
                        label: '金融订单版本号'
                    },
                    trackResultReasonName: {
                        label: '内容'
                    }
                },
                items: [],
                financeProInfo: {
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                financeWorkbenchInfo: {}
            }
        },
        computed: {
            ...mapState('financeWorkbench', [
                'showTrackModal',
                'financeWbTrackHistoryList',
                'financeWorkbenchData',
                'authorizationOrgs',
                'financeTypes',
                'idTypes',
                'approvalResultTypes',
                'approvalResultReasonTypes',
                'getfinanceWorkbenchSucc',
            ]),
            isLease: function() {
                let _this = this
                return (_this.$data.financeWorkbenchInfo.financeTypeCode == config.financePro.financeType.leaseFatherCode)
            },
            isSubsidyInterest: function() {
                let _this = this
                return (_this.$data.financeWorkbenchInfo.financeTypeCode == config.financePro.financeType.interestFatherCode)
            }
        },
        methods: {
            ...mapActions('financeWorkbench', [
                'hideTrackModal',
                'getFinanceWorkbenchTrackInfoList',
                'commitFinanceProInfo'
            ]),
            search: function() {
                this.$data.financeProInfo.pageStart = 1
                this.getFinanceWorkbenchTrackInfoList(this.$data.financeProInfo)
            },
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
            hideModal: function() {
                this.$data.selectRow = -1
                this.hideTrackModal()
                this.clear()
            },
            showDetail: function(index) {
                let _this = this
                _this.$data.financeWorkbenchInfo = JSON.parse(JSON.stringify(_this.financeWbHistoryInfoList[parseInt(index)]))
            },
            commitFinanceProDetailInfo: function() {
                this.commitFinanceProInfo(this.selectRow)
            },
            pageChange: function(num) {
                this.$data.financeProInfo.pageStart = num
                this.getFinanceWorkbenchTrackInfoList(this.$data.financeProInfo)
            }
        },
        watch: {
            showTrackModal: {
                handler() {
                    let _this = this
                    _this.showModal = _this.showTrackModal
                    if (_this.showModal) {
                        _this.search()
                    }
                },
                deep: true
            },
            financeWbHistoryInfoList: {
                handler() {
                    this.selectRows = []
                },
                deep: true
            }
        },
        components: {
            pagination,
            areaqueryshop
        }
    }
</script>
