<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-12">
                        <b-button size="sm" variant="success" @click="transfer">新建采购单</b-button>
                        <b-button size="sm" type="button" @click="downloadExcel">预设模板导出</b-button>
                        <!-- <b-button size="sm" variant="default" @click="downLoad">导出列表</b-button> -->
                    </div>
                </div>
                <div class="table-scrollable">
                    <b-table striped hover bordered show-empty :items="dataList" :fields="fields">
                        <!-- <template slot="radio" scope="data">
                            <div @click="check(data.index)">
                                <input type="radio" name="radio" />
                            </div>
                        </template> -->
                        <template slot="index" slot-scope="data">
                            {{ data.index + 1 + (page.pageNo - 1)* page.pageSize }}
                        </template>
                        <template slot="orderNo" slot-scope="data">
                            <a href="javascript:;" @click="showDetail(data.item.orderNo)">{{ data.item.orderNo }}</a>
                        </template>
                        <template slot="carFactoryName" slot-scope="data">
                            {{ data.item.purchaseTypeName }}
                        </template>
                        <template slot="skuName" slot-scope="data">
                            {{ data.item.supplierName }}
                        </template>
                        <template slot="carSeriesName" slot-scope="data">
                            {{ data.item.whName }}
                        </template>
                        <template slot="carModelName" slot-scope="data">
                            {{ data.item.orderStatus == 0 ? '草稿' : (data.item.orderStatus == 1 ? '已确认': (data.item.orderStatus == -1 ? '废单': ''))}}
                        </template>
                        <template slot="carOpvName" slot-scope="data">
                            {{ data.item.totalMoney }}
                        </template>
                        <template slot="carIotypeName" slot-scope="data">
                            {{ data.item.totalNums }}
                        </template>
                        <template slot="empty">
                                暂无数据...
                        </template>
                    </b-table>
                </div>
                <div class="row mt-2">
                    <div class="col-md-12">
                        <pagination class="pull-right" @page-change="pageChange" :page-no="page.pageNo" :page-size="page.pageSize" :total-result="page.totalResult" :total-pages="page.totalPages">
                        </pagination>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</template>
<script>
    import Pagination from 'components/pagination/pagination'
    // import InsertModal from './insertModal'
    // import UpdateModal from './updateModal'
    import api from 'common/api'
    import config from 'common/config'
    import common from 'common/common'
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import { COMPLETE_VEHICLE_PURCHASE_ORDER } from 'common/ref-code'
    export default {
        props: {
            dataList:{
                type: Array,
                default: function() {
                    return []
                }
            },
            page: {
                type: Object,
                default: {}
            },
            queryCondition: {
                type: Object,
                default: {}
            },
            giveData: {
                type: Function,
                default: function() {}
            }
        },
        components: {
            Pagination
            // InsertModal,
            // UpdateModal
        },
        data() {
            return {
                // datalist: [],
                // datalistobj:{},
                // pageStart:1,
                // pageNums:5
                //导出表格链接
                excelLink: '',
                fields: {
                    index: {
                        label: '序号'
                    },
                    orderNo: {
                        label: '采购订单号'
                    },
                    carFactoryName: {
                        label: '采购类型'
                    },
                    skuName: {
                        label: '供应商'
                    },
                    accountPeriodName: {
                        label: '额度类型'
                    },
                    accountPeriodValue: {
                        label: '账期天数'
                    },
                    carSeriesName: {
                        label: '仓库'
                    },
                    carOpvName: {
                        label: '订单总金额'
                    },
                    carIotypeName: {
                        label: '商品总数量'
                    },
                    carModelName: {
                        label: '采购状态'
                    },
                    createTimeStr: {
                        label: '创建日期'
                    }
                },
            }
        },
        mounted() {
            this.queryExHallList();
        },
        methods: {
            //查询表格
            queryExHallList(){
                api.dataReport.selectByRelationCode({
                    relationCode: COMPLETE_VEHICLE_PURCHASE_ORDER,
                }, (res) => {
                    this.excelLink = res.data.obj.list[0].filePath;
                })
            },
            downloadExcel(){
                window.location.href = this.excelLink;
            },
            //导出列表
            downLoad: function() {
                this.$emit('downLoadList', '')
            },
            transfer() {
                this.$router.push({
                    path : `/kedaprocurement/intoTicket`
                })
            },
            showDetail(orderNo) {
                const _this = this
                _this.$router.push({
                    path: '/kedaprocurement/editTicket/' + orderNo
                })
            },
            pageChange(page) {
                const _this = this
                let options = {
                    'orderNo': _this.queryCondition.orderNo,
                    'pageStart': page,
                    'pageNums': config.pageNums,
                    'orderType': '0',
                    'storeCode': _this.queryCondition.storeCode,
                    'accountPeriodCode': _this.queryCondition.accountPeriodCode,
                    'storeCodeSet': _this.queryCondition.storeCodeSet,
                    'whCode': _this.queryCondition.whCode,
                    'createTimeFrom': _this.queryCondition.createTimeFrom,
                    'createTimeTo': _this.queryCondition.createTimeTo,
                }
                api.supplyChain.keda.purchaseOrder.queryPurchaseOrderInfo(options, function(res){
                    if(res.data.code === 'success') {
                        _this.giveData(res, _this.queryCondition)
                    }
                })
            }
        },
        computed: {

        },
        watch: {
           
        }
    }
</script>
