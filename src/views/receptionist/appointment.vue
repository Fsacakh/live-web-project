<template>
<div class="animated fadeIn">
    <div class="row">
        <div class="col-md-12">
            <b-card header="预约接待">
                <div class="table-scrollable mb-2">
                    <b-table striped hover bordered show-empty :items="obj.list" :fields="fields">
                        <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                        <template slot="displayName" slot-scope="row">{{getIntenCarInfo(row.item)}}</template>
                        <template slot="appointmentTime" slot-scope="data">{{data.value | timeSlice}}</template>
                        <template slot="receptionFlag" slot-scope="data">
                            <b-button size="sm" :disabled="data.item.receptionFlag" :variant="data.item.receptionFlag ? '' : 'success'" @click="startReception(data)">
                                {{ data.item.receptionFlag ? '&nbsp已&nbsp接&nbsp待&nbsp' : '开始接待' }}
                            </b-button>
                        </template>
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <pagination class="pull-right"
                            @page-change="pageChange"
                            :page-no="obj.pageNum"
                            :page-size="obj.pageSize"
                            :total-pages="obj.pages"
                            :total-result="obj.total">
                        </pagination>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</div>
</template>
<script>
import Pagination from 'components/pagination/pagination'
import api from 'common/api'
import config from 'common/config'
import {Message} from 'element-ui'
import {getStoreCode} from './com-reception'
import {getSequence} from 'common/com-api'
import {mapGetters} from 'vuex'
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
                    label: '客户姓名'
                },
                mobilePhone: {
                    label: '电话号码'
                },
                intentionLevelName: {
                    label: '意向级别'
                },
                displayName: {
                    label: '意向车型'
                },
                appointmentTime: {
                    label: '时间'
                },
                remark: {
                    label: '备注内容'
                },
                receptionFlag: {
                    label: '操作'
                }
            },
            list: [],
            obj: {}
        }
    },
    created() {
        this.query()
    },
    computed: {
        ...mapGetters('receptionist', [
            'getUserAvailableInfo'
        ])
    },
    methods: {
        getIntenCarInfo(item) {
            return `${item.brandName} ${item.seriesName} ${item.modelName}  ${item.displayName} `
        },
        query(num = 1) {
            // 页面正常进入 storeCode 从vuex中拿, 页面刷新时调ajax去拿
            if(this.getUserAvailableInfo.storeInfoVo) {
                let params = {
                    storeCode: this.getUserAvailableInfo.storeInfoVo.storeCode,
                    pageNums: config.pageNums,
                    pageStart: num
                }
                this.queryInfo(params)
            }else {
                getStoreCode().then(useInfo => {
                    let params = {
                        storeCode: useInfo.storeCode,
                        pageNums: config.pageNums,
                        pageStart: num
                    }
                    this.queryInfo(params)
                })
            }
        },
        pageChange(num) {
            this.query(num)
        },
        getSeq() {
            return new Promise((resolve, reject) => {
                getSequence(config.reception.receSeq, (res) => {
                    resolve(res)
                })
            })
        },
        startReception(data) {
            this.getSeq().then(res => {
                let params = {
                    receptionCode: res,
                    storeCode: data.item.storeCode,
                    scCode: data.item.scCode,
                    appointmentCode: data.item.appointmentCode,
                    leadCode: data.item.leadCode,
                    mobilePhone: data.item.mobilePhone,
                    customCode: data.item.customCode
                }
                this.start(params, () => {
                    let queryParams = {
                        storeCode: '',
                        pageNums: config.pageNums,
                        pageStart: 1
                    }
                    this.queryInfo(queryParams)
                    this.$router.push({
                        path: '/receptionist'
                    })
                })
            })

        },
        queryInfo(params) {
            api.receptionist.queryAppointmentList(params).then(res => {
                if(res.data.code === 'success') {
                    this.obj = res.data.obj
                }
            })
        },
        start(params, success) {
            api.receptionist.startReception(params).then( res => {
               if(res.data.code === 'success') {
                    success()
                    Message({
                        type: 'success',
                        message: "开始接待成功"
                    })
                }
           })
        }
    },
    filters: {
        timeSlice(val) {
            if(val) {
                return val.slice(0, 19)
            }
        }
    }
}
</script>
