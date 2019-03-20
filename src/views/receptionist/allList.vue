<template>
<div>
    <div class="row">
        <div class="col-md-12">
            <div class="table-scrollable mb-2">
                <b-table striped hover bordered show-empty :items="obj.list" :fields="fields">
                    <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                    <template slot="intentionCarName" slot-scope="row">{{intentionCarName(row.item)}}</template>

                    <template slot="receptionStartTime" slot-scope="data">{{data.value | timeSlice}}</template>
                    <template slot="receptionEndTime" slot-scope="data">{{data.value | timeSlice}}</template>
                    <template slot="tryDriveStatus" slot-scope="data">{{data.value | comStatus}}</template>
                    <template slot="keepFileStatus" slot-scope="data">{{data.value | comStatus}}</template>
                    <template slot="quotedPriceStatus" slot-scope="data">{{data.value | comStatus}}</template>
                    <template slot="createOrderStatus" slot-scope="data">{{data.value | comStatus}}</template>
                    <template slot="finishCarStatus" slot-scope="data">{{data.value | comStatus}}</template>
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <pagination class="pull-right" @page-change="pageChange" :page-no="obj.pageNum" :page-size="obj.pageSize" :total-pages="obj.pages" :total-result="obj.total">
            </pagination>
        </div>
    </div>
</div>
</template>
<script>
import Pagination from 'components/pagination/pagination'
import config from 'common/config'
import {queryTodayList, getStoreCode} from './com-reception'
import {mapMutations} from 'vuex'
// const PAGE_NUMS = 10
const PAGE_NUMS = 1000
export default {
    components: {
        Pagination
    },
    data() {
        return {
            fields: {
                index: {
                    label: '序号'
                },
                scName: {
                    label: '销售顾问'
                },
                customName: {
                    label: '顾客姓名'
                },
                mobilePhone: {
                    label: '电话号码'
                },
                // displayName: {
                //     label: '意向车型'
                // },
                intentionCarName: {
                    label: '意向车型'
                },
                channelName: {
                    label: '渠道'
                },
                intentionLevelName: {
                    label: '客户级别'
                },
                receptionStartTime: {
                    label: '开始接待时间'
                },
                receptionEndTime: {
                    label: '结束接待时间'
                },
                keepFileStatus: {
                    label: '留档'
                },
                tryDriveStatus: {
                    label: '试乘试驾'
                },
                quotedPriceStatus: {
                    label: '报价'
                },
                createOrderStatus: {
                    label: '订单'
                },
                finishCarStatus: {
                    label: '交车'
                }
            },
            obj: {},
            useInfo: {}
        }
    },
    mounted() {
        this.query()
    },
    methods: {
        query() {
            getStoreCode().then(useInfo => {
                this.useInfo = useInfo
                this._queryTodayList(useInfo)
            })
        },
        pageChange(num) {
            this._queryTodayList(this.useInfo, num)
        },
        _queryTodayList(useInfo, pageStart = 1) {
            let params = {
                storeCode: useInfo.storeCode,
                // pageNums: config.pageNums,
                pageNums: PAGE_NUMS,
                pageStart: pageStart
            }
            queryTodayList(params, (obj) => {
                this.obj = obj
                this.setAllObj(obj)
            })
        },
        intentionCarName(item) {
            return `${item.factoryName || ''} ${item.brandName || ''} ${item.seriesName || ''} ${item.modelName || ''}`
        },
        ...mapMutations({
            setAllObj: 'receptionist/SET_ALL_OBJ'
        })
    },
    filters: {
        comStatus(val) {
            if(val === 0) {
                return '否'
            }else if(val >= 1) {
                return '是'
            }
        },
        timeSlice(val) {
            if(val) {
                return val.slice(0, 19)
            }
        }
    }
}
</script>

