<template class="animated">
    <div class="animated">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售顾问" :label-cols="4" class="text-right">
                        <b-form-input v-model="queryParams.salesEmpName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="订单号" :label-cols="4" class="text-right">
                        <b-form-input v-model="queryParams.orderNo" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="客户" :label-cols="4" class="text-right">
                        <b-form-input v-model="queryParams.custName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="手机号" :label-cols="4" class="text-right">
                        <b-form-input v-model="queryParams.custMobile" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" :label-cols="4" class="text-right">
                        <b-form-input v-model="queryParams.searchVinCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="订单状态" :label-cols="4" class="text-right">
                        <b-form-select v-model="orderStatus" :options="statusList">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="预计交车时间" :label-cols="4" class="text-right">
                        <date-picker v-model="queryParams.bookingClosingDate" @change="closingDateChange" type="date" placeholder="选择日期">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="审批通过时间段" label-text-align="right" :label-cols="4">
                        <date-picker v-model="auditTime" type="daterange" @change="auditTimeChange" :clearable="true" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="整车开票时间段" label-text-align="right" :label-cols="4">
                        <date-picker v-model="invoiceTime" type="daterange" @change="invoiceTimeChange" :clearable="true" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <iris-car :flag="isStartByBrand" :col="2" @callBack="getCarInfo" ref="car"></iris-car>
                </div>
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="reset">重置</b-button>
                        <b-button size="sm" variant="primary" @click="search">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="row">
                <div class="col-md-12">
                    <div class="table-scrollable">
                        <b-table striped hover bordered show-empty :items="orderObj.list" :fields="fields">
                            <template slot="index" slot-scope="data">
                                {{ data.index + 1 + listIndex }}
                            </template>
                            <template slot="orderNo" slot-scope="row">
                                <a href="" @click.stop.prevent="toDetail(row.item)">{{row.value}}</a>
                            </template>
                            <template slot="auditPassTime" slot-scope="data">
                                {{ data.item.auditPassTime | formatDate }}
                            </template>
                            <template slot="orderInvoiceTime" slot-scope="data">
                                {{ data.item.orderInvoiceTime | formatDate }}
                            </template>
                            <template slot="bookingClosingDate" slot-scope="data">
                                {{ data.item.bookingClosingDate | switchDate }}
                            </template>
                            <template slot="closingDate" slot-scope="data">
                                {{ data.item.closingDate | switchDate }}
                            </template>
                            <template slot="wfStatus" slot-scope="row">
                                {{ getStatus(row.item) }}
                            </template>
                            <template slot="empty">
                                暂无数据
                            </template>
                        </b-table>
                    </div>
                    <div class="col-md-12">
                        <pagination class="pull-right" @page-change="pageChange" :page-no="orderObj.pageNum" :page-size="orderObj.pageSize" :total-pages="orderObj.pages" :total-result="orderObj.total">
                        </pagination>
                    </div>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    const TO_BE_SUBMIT = '待提交',
      IN_APPROVAL = '审批中',
      INTENTION_ORDER = '意向单',
      ORDER = '订单',
      CONTRACT = '合同',
      UNSUBSCRIBE = '退订',
      GIVE_CAR = '交车';
    const list = config.order.status
    const _statusList = []
    list.forEach(item => {
        if(item.text == '意向单' || item.text == '合同') {

        }else {
            const data = {
                text: item.text,
                value: JSON.stringify(item.value)
            }
            _statusList.push(data)
        }
    })
    import { mapGetters, mapActions } from 'vuex'
    import { DatePicker } from 'element-ui'
    import config from 'common/config'
    import common from 'common/common'
    import IrisCar from 'components/iris-car'
    import Pagination from 'components/pagination/pagination'
    import areaqueryshop from 'components/iris-areaqueryshop'
    export default {
        data: function() {
            return {
                isStartByBrand: config.isShowFactory,
                orderStatus: '',
                statusList: _statusList,
                auditTime: [], //审批通过时间段
                invoiceTime: [], //整车开票时间段
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
                    vinNo: {
                        label: 'vin码'
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
                    carDisplayName: {
                        label: '车款'
                    },
                    custName: {
                        label: '客户姓名'
                    },
                    custMobile: {
                        label: '手机号码'
                    },
                    salesEmpName: {
                        label: '销售顾问'
                    },
                    actualTotalPrice: {
                        label: '订单总价'
                    },
                    wfStatus: {
                        label: '订单状态'
                    },
                    auditPassTime: {
                       label: '最后审批通过时间'
                    },
                    bookingClosingDate: {
                        label: '预计交车时间'
                    },
                    closingDate: {
                        label: '实际交车时间'
                    }
                },
                queryParams: {
                    auditStartTime: '', //审批通过时间-开始
                    auditEndTime: '', //审批通过时间-结束
                    carInvoiceStartTime: '', //整车开票时间-开始
                    carInvoiceEndTime: '', //整车开票时间-结束
                    salesEmpName: '',
                    orderNo: '',
                    custName: '',
                    custMobile: '',
                    searchVinCode: '',
                    bookingClosingDate: '',
                    pageStart: 1,
                    pageNums: config.pageNums,
                    storeCodeSet: []
                }
            }
        },
        computed: {
            listIndex() {
                return (this.orderObj.pageNum - 1) * this.orderObj.pageSize
            },
            ...mapGetters('order', [
                'orderObj'
            ])
        },
        methods: {
            getStatus(item) {
               if (item.closingFlag === 1) {
                   return GIVE_CAR
               } else if (item.wfStatus === -1) {
                   return TO_BE_SUBMIT
               } else if (item.wfStatus === 0) {
                   return IN_APPROVAL
               } else if (item.wfStatus === 1) {
                   if (item.currentOrderWfTypeCode === 'NewCarIntentionOrderWfType') {
                       return INTENTION_ORDER
                   } else if (item.currentOrderWfTypeCode === 'NewCarOrderWfType') {
                       return ORDER
                   } else if (item.currentOrderWfTypeCode === 'NewCarContractWfType') {
                       return CONTRACT
                   } else if (item.currentOrderWfTypeCode === 'NewCarRefuseWfType') {
                       return UNSUBSCRIBE
                   }
               }
            },
            getCarInfo: function(data) {
                this.queryParams.searchBrandCode = data.brandCode
                this.queryParams.searchSeriesCode = data.seriesCode
                this.queryParams.searchModelCode = data.modelCode
                this.queryParams.carCode = data.carCode
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (stores instanceof Array) {
                    _this.queryParams.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.queryParams.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.queryParams.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.queryParams.storeCodeSet = []
                    _this.queryParams.storeCodeSet[0] = stores.value
                }
            },
            closingDateChange: function() {
                let _this = this
                if (_this.$data.queryParams.bookingClosingDate) {
                    let timeOne = _this.$data.queryParams.bookingClosingDate
                    _this.$data.queryParams.bookingClosingDate = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                } else {
                    _this.$data.queryParams.bookingClosingDate = ''
                }
            },
            invoiceTimeChange: function() {
                let _this = this
                if (_this.$data.invoiceTime && _this.$data.invoiceTime.length > 0) {
                    let timeOne = _this.invoiceTime[0]
                    let timeTwo = _this.invoiceTime[1]
                    _this.$data.queryParams.carInvoiceStartTime = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                    _this.$data.queryParams.carInvoiceEndTime = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
                } else {
                    _this.$data.queryParams.carInvoiceStartTime = ''
                    _this.$data.queryParams.carInvoiceEndTime = ''
                }
            },
            auditTimeChange: function() {
                let _this = this
                if (_this.$data.auditTime && _this.$data.auditTime.length > 0) {
                    let timeOne = _this.auditTime[0]
                    let timeTwo = _this.auditTime[1]
                    _this.$data.queryParams.auditStartTime = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                    _this.$data.queryParams.auditEndTime = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
                } else {
                    _this.$data.queryParams.auditStartTime = ''
                    _this.$data.queryParams.auditEndTime = ''
                }
            },
            search: function() {
                let _this = this
                this.queryParams.pageStart = 1
                this.setOrderObj(this.queryParams)
            },
            reset: function() {
                let _this = this
                _this.$refs.car.clear()
                _this.$data.queryParams = {
                    auditStartTime: '',
                    auditEndTime: '',
                    carInvoiceStartTime: '',
                    carInvoiceEndTime: '',
                    salesEmpName: '',
                    orderNo: '',
                    custName: '',
                    custMobile: '',
                    searchVinCode: '',
                    bookingClosingDate: '',
                    pageStart: 1,
                    pageNums: config.pageNums,
                    storeCodeSet: _this.$data.queryParams.storeCodeSet
                }
                _this.$data.orderStatus = ''
                _this.$data.auditTime = []
                _this.$data.invoiceTime = []
            },
            pageChange(page) {
                this.queryParams.pageStart = page;
                this.queryParams.pageNums = config.pageNums
                this.setOrderObj(this.queryParams)
            },
            toDetail(item) {
                let _this = this
                _this.$router.push({
                    path: `/salesQuote/edit/${item.orderNo}`
                })
            },
            ...mapActions({
                setOrderObj: 'order/setOrderObj'
            })
        },
        filters: {
            status(val) {
                if (val == -1) {
                   return '待审批'
                } else if (val == 0) {
                   return '审批中'
                } else if (val == 1) {
                   return '已通过'
                }
            }
        },
        components: {
            IrisCar,
            DatePicker,
            Pagination,
            areaqueryshop
        },
        watch: {
           // 根据订单状态的不同 分别传递不同的参数字段
           orderStatus(val) {
              if(val) {
                const value = JSON.parse(val)
                if (value.wfStatus !== undefined) {
                    delete this.queryParams.wfTypeCode
                    delete this.queryParams.closingFlag
                    this.queryParams.wfStatus = value.wfStatus
                    if(value.wfTypeCode) {
                        delete this.queryParams.closingFlag
                        this.queryParams.wfTypeCode = value.wfTypeCode
                    }
                } else if (value.closingFlag !== undefined) {
                    delete this.queryParams.wfStatus
                    delete this.queryParams.wfTypeCode
                    this.queryParams.closingFlag = value.closingFlag
                }
               }
           }
        }
    }
</script>

<style lang="scss" scoped>

</style>
