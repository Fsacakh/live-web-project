<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="来源门店" :label-cols="4" label-text-align="right">
                        <areaqueryshop @select-change="selectSourceStores"></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="来源仓库" :label-cols="4" label-text-align="right">
                        <search v-model="carAdjustOutStockInfo.sourceWhCode" :searchValue="warehouseName" checkText="" :dataList="wareHouses" :valueName="'warehouseName'" :keyName="'warehouseCode'" @dataChange="getWareHouseListByName" @comScroll="getWareHouseList" @clickShowBack="getWareHouseList"></search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="目的门店" :label-cols="4" label-text-align="right">
                        <areashop @select-change="selectTargetStores"></areashop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="内采/内销单号" :label-cols="4" label-text-align="right">
                        <b-form-input type="text" v-model.trim="carAdjustOutStockInfo.outStockNo"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="SKU编号" :label-cols="4" label-text-align="right">
                        <b-form-input type="text" v-model.trim="carAdjustOutStockInfo.skuCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="生产号" :label-cols="4" label-text-align="right">
                        <b-form-input type="text" v-model.trim="carAdjustOutStockInfo.produtionCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" :label-cols="4" label-text-align="right">
                        <b-form-input type="text" v-model.trim="carAdjustOutStockInfo.vin"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryAllCarAdjustOutStockInfos">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="row mb-2">
                <div class="col-md-12">
                    <div class="pull-left">
                        <b-button size="sm" v-if="addCarAdjustOutStockInfoBtn" variant="success" @click="addCarAdjustOutStockInfo">新增内采内销单</b-button>
                        <b-button size="sm" v-if="editCarAdjustOutStockInfoBtn" variant="primary" @click="editCarAdjustOutStockInfo">编辑</b-button>
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="carAdjustOutStockInfoList" :fields="fields">
                    <template slot="selectRow" slot-scope="data">
                        <input type="radio" :value="data.index" v-model="selectRow" name="selectRow"></input>
                    </template>
                    <template slot="outStockNo" slot-scope="data">
                         <a @click="showDetail(data.item.outStockNo)">{{ data.item.outStockNo }}</a>
                    </template>
                    <template slot="orderType" slot-scope="data">
                        {{
                            '内采/内销'
                        }}
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
    import apiUrl from 'common/api-url'
    import {hasBtn} from 'common/com-api'
    export default {
        mounted () {
            let _this = this
            _this.resetWareHouses()
        },
        data: function() {
            return {
                selectRow: -1,
                warehouseName: '',
                fields: {
                    selectRow: {
                        label: '选择'
                    },
                    outStockNo: {
                        label: '内采内销单号'
                    },
                    orderType: {
                        label: '调拨类型'
                    },
                    sourceStoreName: {
                        label: '调出门店'
                    },
                    targetStoreName: {
                        label: '调入门店'
                    },
                    orderStatus: {
                        label: '订单状态'
                    }
                },
                carAdjustOutStockInfo: {
                    outStockNo: '',
                    sourceStoreCode: '',
                    sourceWhCode: '',
                    targetStoreCode: '',
                    skuCode: '',
                    produtionCode: '',
                    vin: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            }
        },
        computed: {
            ...mapState('callOutVehicleResource', [
                'wareHouses',
                'carAdjustOutStockInfoList',
                'skuInfoList',
                'addCarShareDetailInfoList',
                'pager'
            ]),
            ...mapGetters('callOutVehicleResource', [
                'getWareHousesPageStart'
            ]),
            addCarAdjustOutStockInfoBtn(){
                return hasBtn(apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.insert)
            },
            editCarAdjustOutStockInfoBtn(){
                return hasBtn(apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.update)
            }
        },
        methods: {
            clear: function() {
                let _this = this
                _this.$data.carAdjustOutStockInfo = {
                    outStockNo: '',
                    sourceSalesAreaCode: _this.$data.carAdjustOutStockInfo.sourceSalesAreaCode,
                    sourceStoreCode: _this.$data.carAdjustOutStockInfo.sourceStoreCode,
                    sourceWhCode: '',
                    targetSalesAreaCode: _this.$data.carAdjustOutStockInfo.targetSalesAreaCode,
                    targetStoreCode: _this.$data.carAdjustOutStockInfo.targetStoreCode,
                    skuCode: '',
                    produtionCode: '',
                    vin: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            },
            selectSourceStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.carAdjustOutStockInfo.sourceSalesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.carAdjustOutStockInfo.sourceSalesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.carAdjustOutStockInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    _this.carAdjustOutStockInfo.sourceStoreCode = ''
                } else if (stores.hasOwnProperty('value')) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    _this.carAdjustOutStockInfo.storeCodeSet[0] = stores.value
                    _this.carAdjustOutStockInfo.sourceStoreCode = stores.value
                }
            },
            selectTargetStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.carAdjustOutStockInfo.targetSalesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.carAdjustOutStockInfo.targetSalesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.carAdjustOutStockInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    _this.carAdjustOutStockInfo.targetStoreCode = ''
                } else if (stores.hasOwnProperty('value')) {
                    _this.carAdjustOutStockInfo.storeCodeSet = []
                    _this.carAdjustOutStockInfo.storeCodeSet[0] = stores.value
                    _this.carAdjustOutStockInfo.targetStoreCode = stores.value
                }
            },
            addCarAdjustOutStockInfo: function() {
                let _this = this
                _this.$router.push('/vehicle/callOut/add')
            },
            editCarAdjustOutStockInfo: function() {
                let _this = this
                if(parseInt(_this.selectRow) != -1) {
                    _this.$router.push('/vehicle/callOut/edit/' + _this.carAdjustOutStockInfoList[parseInt(_this.selectRow)].outStockNo + '/' + config.editDetailFlag)
                } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                }
            },
            queryAllCarAdjustOutStockInfos: function() {
                let _this = this
                _this.$data.carAdjustOutStockInfo.pageStart = 1
                _this.getCarAdjustOutStockInfoList(_this.$data.carAdjustOutStockInfo)
            },
            getWareHouseList: function() {
                let _this = this
                _this.getWareHouses({
                    warehouseName: _this.$data.warehouseName,
                    storeCode: _this.$data.carAdjustOutStockInfo.sourceStoreCode,
                    pageNums: config.pageNums,
                    pageStart: _this.getWareHousesPageStart
                })
            },
            getWareHouseListByName: function(warehouseName) {
                let _this = this
                _this.$data.warehouseName = warehouseName
                _this.resetWareHouses()
                _this.getWareHouses({
                    warehouseName: warehouseName,
                    storeCode: _this.$data.carAdjustOutStockInfo.sourceStoreCode,
                    pageNums: config.pageNums,
                    pageStart: _this.getWareHousesPageStart
                })
            },
            pageChange: function(num) {
                let _this = this
                _this.$data.carAdjustOutStockInfo.pageStart = num
                _this.getCarAdjustOutStockInfoList(_this.$data.carAdjustOutStockInfo)
            },
            showDetail: function(outStockNo) {
                let _this = this
                _this.$router.push('/vehicle/callOut/edit/' + outStockNo + '/' + config.showDetailFlag)
            },
            ...mapActions('callOutVehicleResource', [
                'getCarAdjustOutStockInfoList',
                'getWareHouses',
                'resetWareHouses',
            ])
        },
        filters: {
            switchOrderStatus: function(value) {
                let name = ''
                if (value == 0) {
                    name = '未生效'
                } else if (value == 1) {
                    name = '已提交'
                } else if (value == 2) {
                    name = '已生效'
                } else if (value == 3) {
                    name = '已完成'
                } else if (value == 4) {
                    name = '已关闭'
                }  else if (value == -1) {
                    name = '作废'
                }
                return name
            }
        },
        components: {
            search,
            areashop,
            Pagination,
            areaqueryshop
        }
    }
</script>
