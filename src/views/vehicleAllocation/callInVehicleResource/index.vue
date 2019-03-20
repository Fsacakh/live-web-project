<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="来源门店" :label-cols="4" label-text-align="right">
                        <areashop @select-change="selectSourceStores"></areashop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="目的门店" :label-cols="4" label-text-align="right">
                        <areaqueryshop @select-change="selectTargetStores"></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="采购单号" :label-cols="4" label-text-align="right">
                        <b-form-input type="text" v-model.trim="carAdjustInStockInfo.purchaseNo"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="生产号" :label-cols="4" label-text-align="right">
                        <b-form-input type="text" v-model.trim="carAdjustInStockInfo.produtionCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" :label-cols="4" label-text-align="right">
                        <b-form-input type="text" v-model.trim="carAdjustInStockInfo.vin"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="SKU编号" :label-cols="4" label-text-align="right">
                        <b-form-input type="text" v-model.trim="carAdjustInStockInfo.skuCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryAllCarAdjustInStockInfos">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="row mb-2">
                <div class="col-md-12">
                    <div class="pull-left">
                        <b-button size="sm" v-if="showAddModalBtn" variant="success" @click="showAddModal">新增调拨入库单</b-button>
                        <b-button size="sm" v-if="editCarAdjustInStockInfoBtn" variant="primary" @click="editCarAdjustInStockInfo">编辑</b-button>
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="carAdjustInStockInfoList" :fields="fields">
                    <template slot="selectRow" slot-scope="data">
                        <input type="radio" :value="data.index" v-model="selectRow" name="selectRow"/>
                    </template>
                    <template slot="purchaseNo" slot-scope="data">
                        <a @click="showDetail(data.item.purchaseNo)">{{ data.item.purchaseNo }}</a>
                    </template>
                    <template slot="orderStatus" slot-scope="data">
                        {{ data.item.orderStatus | switchOrderStatus }}
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination class="pull-right"
                 @page-change="pageChange"
                 :page-no="pager.pageNo"
                 :page-size="pager.pageSize"
                 :total-result="pager.total"
                 :total-pages="pager.totalPages">
            </pagination>
        </b-card>
        <add-modal></add-modal>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../../common/config'
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import Pagination from 'components/pagination/pagination'
    import search from '../../../components/search/search'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import areashop from 'components/iris-areashop'
    import addModal from './addModal'
    import apiUrl from 'common/api-url'
    import {hasBtn} from 'common/com-api'

    export default {
        data: function() {
            return {
                selectRow: -1,
                fields: {
                    selectRow: {
                        label: '选择'
                    },
                    purchaseNo: {
                        label: '调拨入库单号'
                    },
                    sourceStoreName: {
                        label: '调出门店'
                    },
                    targetStoreName: {
                        label: '调入门店'
                    },
                    totalMoney: {
                        label: '总价'
                    },
                    orderStatus: {
                        label: '订单状态'
                    },
                    operate: {
                        label: '操作'
                    }
                },
                carAdjustInStockInfo: {
                    sourceSalesAreaCode: '',
                    sourceStoreCode: '',
                    targetSalesAreaCode: '',
                    targetStoreCode: '',
                    skuCode: '',
                    produtionCode: '',
                    vin: '',
                    purchaseNo: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            }
        },
        computed: {
            ...mapState('callInVehicleResource', [
                'carAdjustInStockInfoList',
                'pager'
            ]),
            showAddModalBtn(){
                return hasBtn(apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.insert)
            },
            editCarAdjustInStockInfoBtn(){
                return hasBtn(apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.submitCarAdjustInStockInfo)
            }
            
        },
        methods: {
            clear: function() {
                let _this = this
                _this.$data.carAdjustInStockInfo = {
                    sourceSalesAreaCode: '',
                    sourceStoreCode: '',
                    targetSalesAreaCode: '',
                    targetStoreCode: '',
                    skuCode: '',
                    produtionCode: '',
                    vin: '',
                    purchaseNo: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            },
            selectSourceStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.carAdjustInStockInfo.sourceSalesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.carAdjustInStockInfo.sourceSalesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.carAdjustInStockInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                    _this.carAdjustInStockInfo.storeCodeSet[0] = stores.value
                    _this.carAdjustInStockInfo.sourceStoreCode = stores.value
                }
            },
            selectTargetStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.carAdjustInStockInfo.targetSalesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.carAdjustInStockInfo.targetSalesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.carAdjustInStockInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.carAdjustInStockInfo.storeCodeSet = []
                    _this.carAdjustInStockInfo.storeCodeSet[0] = stores.value
                    _this.carAdjustInStockInfo.targetStoreCode = stores.value
                }
            },
            editCarAdjustInStockInfo: function() {
                let _this = this
                if(parseInt(_this.selectRow) != -1) {
                    _this.$router.push('/vehicle/callIn/edit/' + _this.carAdjustInStockInfoList[parseInt(_this.selectRow)].purchaseNo + '/' + config.editDetailFlag)
                } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                }
            },
            queryAllCarAdjustInStockInfos: function() {
                let _this = this
                _this.$data.carAdjustInStockInfo.pageStart = 1
                _this.getCarAdjustInStockInfoList(_this.$data.carAdjustInStockInfo)
            },
            pageChange: function(num) {
                let _this = this
                _this.$data.carAdjustInStockInfo.pageStart = num
                _this.getCarAdjustInStockInfoList(_this.$data.carAdjustInStockInfo)
            },
            showDetail: function(purchaseNo) {
                let _this = this
                _this.$router.push('/vehicle/callIn/edit/' + purchaseNo + '/' + config.showDetailFlag)
            },
            ...mapActions('callInVehicleResource', [
                'showAddModal',
                'getCarAdjustInStockInfoList'
            ])
        },
        components: {
            search,
            addModal,
            areashop,
            Pagination,
            areaqueryshop
        }
    }
</script>
