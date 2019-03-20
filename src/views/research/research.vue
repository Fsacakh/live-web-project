<template>
    <div class="animated fadeIn">
        <!--  调研工作台的筛选选择  -->
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户姓名" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.custName"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户电话" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.custMobilePhone"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="选择经销商店" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <areaqueryshop :readonly="false"  @sales-data="salesdata"  @select-change="selectedfun"></areaqueryshop>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="新车调研类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="taskTypeFliter" v-model="query.taskTypeCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="调研状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="taskStatus" v-model="query.taskStatusCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="是否投诉" label-text-align="right" :label-cols="4">
                        <b-form-select :options="select" v-model="query.isHaveComplain"/>
                    </b-form-fieldset>
                </div>
                <!-- 调研完成日期 -->
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="调研完成时段" :label-cols="4" class="text-right">
                        <div>
                            <el-date-picker
                                v-model="date1"
                                type="daterange"
                                @change="datechange('date1', date1)"
                                :clearable="true"
                                :disabled="false"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="下次预约回访时段" label-text-align="right" :label-cols="4">
                        <div>
                            <el-date-picker
                                v-model="date2"
                                type="daterange"
                                @change="datechange('date2', date2)"
                                :clearable="true"
                                :disabled="false"
                                range-separator="至">

                            </el-date-picker>
                        </div>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryTaskList(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <!--  调研工作台查询出来的数据  -->
        <b-card class="mb-4">
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items='taskList' :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                    </template>
                    <template slot="custName" slot-scope="data">
                        <a href="javascript:;" @click="routerTo(data.item.taskCode)">{{data.item.custName}}</a>
                    </template>
                    <template slot="custSex" slot-scope="data">
                        {{data.item.custSex=='1'?'男':'女'}}
                    </template>
                    <template slot="empty">
                            暂无数据...
                    </template>
                </b-table>
            </div>
            <!-- pageNo： 当前页， pageSize： 总页数， total： -->
            <pagination 
                class="pull-right" 
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
    import Vue from 'vue'
    import { mapState, mapMutations, mapGetters, mapActions } from "vuex"
    import { MessageBox, Button, Message, TimePicker, DatePicker} from 'element-ui'
    import config from 'common/config'
    import Pagination from 'components/pagination/pagination'
    import Areaqueryshop from 'components/iris-areaqueryshop/index'
    Vue.use(TimePicker)
    Vue.use(DatePicker)
    export default {
        mounted() {
            this.getTaskStatusList({
                refCode: config.research.taskStatus
            })
            this.getTaskTypeList({
                refCode: config.research.taskType
            })
            const params = JSON.parse(JSON.stringify(this.queryParams))
            if(params.hasOwnProperty('pageNums')) {
                this.query = params
            }
        },
        data() {
            return {
                query: {
                    custName: '',
                    custMobilePhone: '',
                    storeCodeSet: [],
                    taskTypeCode: '',
                    taskStatusCode: '',
                    isHaveComplain: '',
                    taskFinishStartTime: '',
                    taskFinishEndTime: '',
                    appointmentVisitStartTime: '',
                    appointmentVisitEndTime: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                date1: '',
                date2: '',
                select: [
                    {
                        text: '请选择',
                        value: ''
                    },
                    {
                        text: '是',
                        value: '1'
                    },
                    {
                        text: '否',
                        value: '0'
                    }
                ],
                fields: {
                    index: {
                        label: '序号'
                    },
                    taskTypeName : {
                        label: '调研类型'
                    },
                    custName: {
                        label: '客户姓名'
                    },
                    custSex: {
                        label: '性别'
                    },
                    custMobilePhone: {
                        label: '客户电话'
                    },
                    taskStatusName : {
                        label: '调研状态'
                    },
                    channelName: {
                        label: '渠道'
                    },
                    firstOutStoreDate: {
                        label: '首次到店日期'
                    },
                    sleepDate: {
                        label: '休眠时间'
                    },
                    defeatDate: {
                        label: '战败日期'
                    },
                    crossTownDate: {
                        label: '交车日期'
                    },
                    carName: {
                        label: '车辆信息'
                    },
                    leadLastSaName: {
                        label: '销售顾问'
                    },
                    lastVisitTime: {
                        label: '上次回访时间'
                    },
                    appointmentVisitTime: {
                        label: '预约回访时间'
                    }
                },
                chengeStatus: false
            }
        },
        computed: {
            ...mapState('research', [
                'pager',
                'taskInfo',
                'taskStatus',
                'taskType',
                'taskTypeFliter',
                'taskList'
            ]),
            ...mapGetters('research', [
                'queryParams'
            ])
        },
        methods: {
            clear() {
                this.query.custName = '';
                this.query.custMobilePhone = '';
                // this.query.storeCodeSet = [];
                this.query.taskTypeCode = '';
                this.query.taskStatusCode = '';
                this.query.isHaveComplain = '';
                this.query.taskFinishStartTime = '';
                this.query.taskFinishEndTime = '';
                this.query.appointmentVisitStartTime = '';
                this.query.appointmentVisitEndTime = '';
                this.date1 = '';
                this.date2 = '';
                this.query.pageNums = config.pageNums
                this.query.pageStart = 1
            },
            routerTo: function(code) {
                const $this = this
                this.$store.dispatch('research/getTaskInfo', {
                    poros: {taskCode: code},
                    callBack: function(msg) {
                        $this.$router.push({
                            path: 'detail/' + code
                        })
                    }
                })
            },
            salesdata() {},
            selectedfun(arg1, arg2) {
                this.query.storeCodeSet = []
                this.query.storeCodeSet.push(arg2.value)
            },
            //查询任务主表信息
            queryTaskList: function(page) {
                this.query.pageStart = page
                const queryParams = JSON.parse(JSON.stringify(this.query))
                this.setQueryParams(queryParams)
                const $this = this
                this.$store.dispatch('research/queryTaskList', {
                    poros: $this.query,
                    callBack: function (msg) {
                    }
                })
            },
            getRef: function(refCode) {
                const $this = this
                this.$store.dispatch('research/getTaskType', {
                    poros: {refCode: refCode},
                    callBack: function(msg) {
                    }
                })
            },
            //调研任务类型
            getTaskType: function(refCode) {
                this.getRef(refCode)
            },
            //获取调研状态
            getTaskStatus: function(refCode) {
                this.getRef(refCode)
            },
            //日期格式化
            datechange(type, date) {
                if (date[0]==null) {
                    return
                }
                const $this = this
                let years = date[0].getFullYear()
                let month = (date[0].getMonth() + 1)
                let day = date[0].getDate()
                let years2 = date[1].getFullYear()
                let month2 = (date[1].getMonth() + 1)
                let day2 = date[1].getDate()
                if(type === 'date1') {
                    let time = years + '-' + month + '-' + day
                    let time2 = years2 + '-' + month2 + '-' + day2
                    $this.query.taskFinishStartTime = time
                    $this.query.taskFinishEndTime = time2
                } else {
                    let time = years + '-' + month + '-' + day
                    let time2 = years2 + '-' + month2 + '-' + day2
                    $this.query.appointmentVisitStartTime = time
                    $this.query.appointmentVisitEndTime = time2
                }
            },
            pageChange(page) {
                this.queryTaskList(page)
            },
            ...mapMutations({
                'setQueryParams': 'research/SET_QUERY_PARAMS'
            }),
            ...mapActions('research', [
                'getTaskTypeList',
                'getTaskStatusList' 
            ])
        },
        components: {
            Pagination,
            Areaqueryshop,
        }
    }
</script>
<style>
    .el-input {
        width: 100% !important;
    }
</style>
