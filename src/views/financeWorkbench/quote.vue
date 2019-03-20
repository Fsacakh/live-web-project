<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="销售顾问" label-text-align="right" :label-cols="4">
                        <b-form-input type="text" v-model.trim="storeManageSalesOrder.scName"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="金融机构" label-text-align="right" :label-cols="4">
                        <b-form-select :options="authorizationOrgs" v-model="storeManageSalesOrder.financeOrgCode"></b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="金融报价状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="financeStatusList" v-model="storeManageSalesOrder.financeStatus"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户姓名" label-text-align="right" :label-cols="4">
                        <b-form-input type="text" v-model.trim="storeManageSalesOrder.customName"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户电话" label-text-align="right" :label-cols="4">
                        <b-form-input type="text" v-model.trim="storeManageSalesOrder.mobilePhone"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
               <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="search">查询</b-button>
                    </div>
               </div>
           </div>
        </b-card>
        <b-card class="mb-4">
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :fields="fields" :items="financeWorkbenchInfoList">
                    <template slot="index" slot-scope="data">
                        {{ data.index + 1 + (wbPager.pageNo - 1)* wbPager.pageSize }}
                    </template>
                    <template slot="customName" slot-scope="data">
                        <a @click.prevent="showDetail(data.item.financeWbCode, data.item.orderNo, data.item.id, data.item.financialOrderNo)" href="javascript:;">{{ data.item.customName }}</a>
                    </template>
                    <template slot="financeStatus" slot-scope="data">
                        {{ data.item.financeStatus | switchFinanceStatus }}
                    </template>
                    <template slot="scSyncTime" slot-scope="data">
                        {{ data.item.scSyncTime | formatDate }}
                    </template>
                    <template slot="syncTime" slot-scope="data">
                        {{ data.item.syncTime | formatDate }}
                    </template>
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
            <div class="row">
                <div class="col-md-12">
                     <pagination class="pull-right" @page-change="pageChange" :page-no="wbPager.pageNo" :page-size="wbPager.pageSize" :total-result="wbPager.total" :total-pages="wbPager.totalPages">
                     </pagination>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../common/config'
    import pagination from 'components/pagination/pagination'
    import treepicker from 'components/treepicker/treepicker'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import { MessageBox, Message } from 'element-ui'

    export default {
        mounted() {
            let _this = this
            _this.getAuthorizationOrgs()
            _this.getApprovalResultTypes()
            _this.queryFinanceWorkbenchInfoList() //查询列表数据
        },
        destroyed(){
            let _this = this
        },
        data: function() {
            return {
                fields: {
                    index: {
                        label: '序号'
                    },
                    customName: {
                        label: '客户姓名'
                    },
                    mobilePhone: {
                        label: '手机号码'
                    },
                    storeName: {
                        label: '门店'
                    },
                    carFactoryName: {
                        label: '厂家'
                    },
                    carBrandName: {
                        label: '品牌'
                    },
                    carSeriesName: {
                        label: '车系'
                    },
                    carModelName: {
                        label: '车型'
                    },
                    financeStatus: {
                        label: '金融报价状态'
                    },
                    salesPrice: {
                        label: '整车销售价'
                    },
                    financeOrgName: {
                        label: '金融机构'
                    },
                    financeTypeName: {
                        label: '产品类型'
                    },
                    financeName: {
                        label: '金融产品名称'
                    },
                    scName: {
                        label: '所属SC'
                    },
                    scSyncTime: {
                        label: '销售顾问推送时间'
                    },
                    syncTime: {
                        label: '金融专员同步时间'
                    },
                    updateName: {
                        label: '操作人'
                    }
                },
                financeStatusList: [
                    {
                        value: null,
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
                        text: '金融战败'
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
                storeManageSalesOrder: {
                    scName: '',
                    financeOrgCode: '',
                    financeStatus: null,   //金融报价状态
                    customName: '',
                    mobilePhone: '',
                    salesAreaCode: '',
                    orderNo: '',
                    storeCode: '',
                    trackResultCode: '',
                    isActive: 1,
                    pageStart: 1,
                    pageNums: config.pageNums
                }
            }
        },
        computed: {
            ...mapState('financeWorkbench', [
                'authorizationOrgs',
                'approvalResultTypes',
                'financeWorkbenchInfoList',
                'wbPager'
            ])
        },
        methods: {
            // 重置(清空相应的数据)
            clear: function() {
                let _this = this
                _this.$data.storeManageSalesOrder = {
                    scName: '',
                    financeOrgCode: '',
                    financeStatus: '',
                    customName: '',
                    mobilePhone: '',
                    salesAreaCode: _this.storeManageSalesOrder.salesAreaCode,
                    storeCode: _this.storeManageSalesOrder.storeCode,
                    trackResultCode: '',
                    isActive: 1,
                    pageStart: 1,
                    pageNums: config.pageNums
                }
            },
            // 门店区域选择
            selectStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.storeManageSalesOrder.salesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.storeManageSalesOrder.salesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.storeManageSalesOrder.storeCodeSet = []
                    _this.storeManageSalesOrder.salesAreaCode = ''
                    stores.forEach((item) => {
                        _this.storeManageSalesOrder.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.storeManageSalesOrder.storeCodeSet = []
                    _this.storeManageSalesOrder.storeCode = ''
                } else if (stores.hasOwnProperty('value')) {
                    _this.storeManageSalesOrder.salesAreaCode = ''
                    _this.storeManageSalesOrder.storeCodeSet = []
                    _this.storeManageSalesOrder.storeCodeSet[0] = stores.value
                    _this.storeManageSalesOrder.storeCode = stores.value
                }
            },
            // 查询列表数据
            search: function() {
                let _this = this
                if (!_this.$data.storeManageSalesOrder.storeCode) {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectStore
                    })
                }
                _this.$data.storeManageSalesOrder.pageStart = 1
                _this.getFinanceWorkbenchInfoList(_this.$data.storeManageSalesOrder)   //调取列表数据
            },
            // 分页
            pageChange: function(num) {
                let _this = this
                _this.$data.storeManageSalesOrder.pageStart = num
                _this.getFinanceWorkbenchInfoList(_this.$data.storeManageSalesOrder)  //调取列表数据
            },
            queryFinanceWorkbenchInfoList: function() {
                let _this = this
                _this.$data.storeManageSalesOrder.pageStart = 1
                _this.getFinanceWorkbenchInfoList(_this.$data.storeManageSalesOrder)   //调取列表数据
            },
            // 金融报价详情
            showDetail: function(financeWbCode, orderNo, id, financialOrderNo) {
                let _this = this
                _this.$router.push('/financeWb/order/'+ financeWbCode + '/' + orderNo + '/' + id + '/' + financialOrderNo + '/' + config.financeWorkbench.quoteFlag)   //数据详情页面跳转路径
            },
            ...mapActions('financeWorkbench', [
                'getFinanceWorkbenchInfoList',
                'getAuthorizationOrgs',
                'getApprovalResultTypes',
            ])
        },
        components: {
            pagination,
            treepicker,
            areaqueryshop,
            Message,
            MessageBox
        }
    }
</script>
