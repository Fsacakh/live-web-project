<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="选择经销商店" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="日期" :label-cols="4" label-text-align="right">
                        <date-picker v-model="timeStep" type="daterange" @change="dateChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="接待销售顾问" :label-cols="4" label-text-align="right">
                        <b-form-select :options="scCodes" v-model.trim="exHallPassengerLog.scCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="客户姓名" :label-cols="4" label-text-align="right">
                        <b-form-input v-model.trim="exHallPassengerLog.customName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="客户电话" :label-cols="4" label-text-align="right">
                        <b-form-input v-model.trim="exHallPassengerLog.mobilePhone" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="searchAllExhibitionHallFlowLog">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div>
                <b-button v-if="exportAllExhibitionHallFlowLogBtn" size="sm" variant="info" type="button" @click="exportAllExhibitionHallFlowLog">导出</b-button>
            </div>
            <div class="table-scrollable">
                <el-table :data="exhibitionHallFlowLogList" border>
                    <el-table-column type="index" label="序列" width="120">
                        <template slot-scope="scope">
                            {{ scope.$index + 1 + (pager.pageNo - 1) * config.pageNums }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="storeName" label="门店" width="120">
                    </el-table-column>
                    <el-table-column prop="createByName" label="客流创建人" width="120">
                    </el-table-column>
                    <el-table-column prop="isFirstInStore" label="是否首次" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.isFirstInStore == null ? '': (scope.row.isFirstInStore == 0 ? '否': '是') }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="停留时间">
                        <el-table-column prop="receptionStartTime" label="到店时间" width="120">
                        </el-table-column>
                        <el-table-column prop="receptionEndTime" label="离店时间" width="120">
                        </el-table-column>
                        <el-table-column prop="receptionTime" label="停留时间" width="120">
                            <template slot-scope="scope">
                                {{ scope.row.receptionTime | switchDateToMinutes }}
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column align="center" label="试乘试驾">
                        <el-table-column prop="actualTryTimeBegin" label="试驾开始" width="120">
                        </el-table-column>
                        <el-table-column prop="actualTryTimeEnd" label="试驾结束" width="120">
                        </el-table-column>
                        <el-table-column prop="actualTryTime" label="试驾时长" width="120">
                        </el-table-column>
                        <el-table-column prop="carName" label="试驾车型" width="180">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="scName" label="接待sc" width="120">
                    </el-table-column>
                    <el-table-column prop="keepFileStatus" label="是否留档" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.keepFileStatus == 0 ? '否': '是' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="appointmentStatus" label="是否预约" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.appointmentStatus == null ? '': (scope.row.appointmentStatus == 0 ? '否': '是')}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="customName" label="顾客姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="mobilePhone" label="联系电话" width="120">
                    </el-table-column>
                    <el-table-column prop="intentionCar" label="意向车" width="180">
                    </el-table-column>
                    <el-table-column prop="intentionLevelName" label="客户级别" width="120">
                    </el-table-column>
                    <el-table-column prop="channelName" label="首次来源渠道" width="120">
                    </el-table-column>
                    <el-table-column prop="sourceName" label="来源分类" width="120">
                    </el-table-column>
                    <el-table-column prop="isActive" label="再次来源渠道" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.isActive == null ? '': (scope.row.isActive == 2 ? '活跃': (scope.row.isActive == 1 ? '休眠': '' )) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="quotedPriceStatus" label="报价数" width="120">
                    </el-table-column>
                    <el-table-column prop="createOrderStatus" label="订单数" width="120">
                    </el-table-column>
                    <el-table-column prop="createContractStatus" label="合同数" width="120">
                    </el-table-column>
                    <el-table-column prop="finishCarStatus" label="交车数" width="120">
                    </el-table-column>
                    <el-table-column prop="enterStoreActualObjectiveName" label="到店目的" width="120">
                    </el-table-column>
                    <el-table-column prop="receptionDateVersion" label="日期" width="120">
                    </el-table-column>
                    <el-table-column prop="appointScFlag" label="是否指定sc" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.appointScFlag == 0 ? "否" : '是'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" width="120">
                    </el-table-column>
                    <template slot="empty">
                        暂无数据
                    </template>
                </el-table>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total" :total-pages="pager.totalPages">
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
    import Vue from 'vue'
    import config from '../../../common/config'
    import pagination from '../../../components/pagination/pagination'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import { MessageBox, Message, DatePicker, tableColumn, table } from 'element-ui'
    import apiUrl from 'common/api-url'
    import api from 'common/api'
    import common from 'common/common'
    import {hasBtn} from 'common/com-api'
    Vue.use(table)
    Vue.use(tableColumn)

    export default {
        data: function() {
            return {
                config: config,
                timeStep: [],
                exHallPassengerLog: {
                    salesAreaCodes: [],
                    storeCodes: [],
                    scCode: '',
                    customName: '',
                    mobilePhone: '',
                    receptionStartDate: '',
                    receptionEndDate: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                fields: [
                    {
                        label: '序列',
                        children: [
                        ]
                    },
                    {
                        label: '门店',
                        children: [
                        ]
                    },
                    {
                        label: '客流创建人',
                        children: [
                        ]
                    },
                    {
                        label: '是否首次',
                        children: [
                        ]
                    },
                    {
                        label: '停留时间',
                        children: [
                            {
                                label: '到店时间',
                            },
                            {
                                label: '离店时间',
                            },
                            {
                                label: '停留时间',
                            }
                        ]
                    },
                    {
                        label: '试乘试驾',
                        children: [
                            {
                                label: '试驾开始',
                            },
                            {
                                label: '试驾结束',
                            },
                            {
                                label: '试驾时长',
                            },
                            {
                                label: '试驾车型',
                            }
                        ]
                    },
                    {
                        label: '接待sc',
                        children: [
                        ]
                    },
                    {
                        label: '是否留档',
                        children: [
                        ]
                    },
                    {
                        label: '是否预约',
                        children: [
                        ]
                    },
                    {
                        label: '顾客姓名',
                        children: [
                        ]
                    },
                    {
                        label: '联系电话',
                        children: [
                        ]
                    },
                    {
                        label: '意向车',
                        children: [
                        ]
                    },
                    {
                        label: '客户级别',
                        children: [
                        ]
                    },
                    {
                        label: '首次来源渠道',
                        children: [
                        ]
                    },
                    {
                        label: '来源分类',
                        children: [
                        ]
                    },
                    {
                        label: '再次来源渠道',
                        children: [
                        ]
                    },
                    {
                        label: '报价数',
                        children: [
                        ]
                    },
                    {
                        label: '订单数',
                        children: [
                        ]
                    },
                    {
                        label: '合同数',
                        children: [
                        ]
                    },
                    {
                        label: '交车数',
                        children: [
                        ]
                    },
                    {
                        label: '日期',
                        children: [
                        ]
                    },
                ]
            }
        },
        methods: {
            clear: function() {
                let _this = this
                _this.$data.exHallPassengerLog = {
                    salesAreaCodes: _this.$data.exHallPassengerLog.salesAreaCodes,
                    storeCodes: _this.$data.exHallPassengerLog.storeCodes,
                    scCode: '',
                    customName: '',
                    mobilePhone: '',
                    receptionStartDate: '',
                    receptionEndDate: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
                _this.$data.timeStep = []
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.exHallPassengerLog.salesAreaCodes = []
                    sales.forEach((item) => {
                        _this.exHallPassengerLog.salesAreaCodes.push(item.code)
                    })
                } else if (sales.code === 0) {
                    _this.exHallPassengerLog.salesAreaCodes = []
                }
                if (stores instanceof Array) {
                    _this.exHallPassengerLog.storeCodes = []
                    stores.forEach((item) => {
                        _this.exHallPassengerLog.storeCodes.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.exHallPassengerLog.storeCodes = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.exHallPassengerLog.storeCodes = []
                    _this.exHallPassengerLog.storeCodes[0] = stores.value
                    _this.getSCPostnTypeCodes({
                        storeCode:  _this.exHallPassengerLog.storeCodes[0]
                    })
                }
            },
            dateChange: function() {
                let _this = this
                if (_this.$data.timeStep && _this.$data.timeStep.length > 0) {
                   let timeOne = _this.timeStep[0]
                   let timeTwo = _this.timeStep[1]
                   let monthOne = (timeOne.getMonth() + 1) < 10 ? '0' + (timeOne.getMonth() + 1) : (timeOne.getMonth() + 1)
                   let monthTwo = (timeTwo.getMonth() + 1) < 10 ? '0' + (timeTwo.getMonth() + 1) : (timeTwo.getMonth() + 1)
                   let dayOne = timeOne.getDate() < 10 ? '0' + timeOne.getDate(): timeOne.getDate()
                   let dayTwo = timeTwo.getDate() < 10 ? '0' + timeTwo.getDate(): timeTwo.getDate()
                   _this.$data.exHallPassengerLog.receptionStartDate = timeOne.getFullYear() + '-' + monthOne + '-' + dayOne
                   _this.$data.exHallPassengerLog.receptionEndDate = timeTwo.getFullYear() + '-' + monthTwo + '-' + dayTwo
                } else {
                   _this.$data.exHallPassengerLog.receptionStartDate = ''
                   _this.$data.exHallPassengerLog.receptionEndDate = ''
               }
            },
            searchAllExhibitionHallFlowLog: function() {
                let _this = this
                _this.$data.exHallPassengerLog.pageStart = 1
                _this.queryExhibitionHallFlowLog(_this.$data.exHallPassengerLog)
                _this.cacheRecordCustomerEnterStoreObjective()
            },
            exportAllExhibitionHallFlowLog: function() {
                let _this = this
                //数据下载新增下载中心
                api.ordinalInfo.getSequence({serviceCode: 'FILEEXPORTSEQ'}, res => {
                    if(res.data.code = 'success'){
                        var fileExportType = res.data.obj
                         let options = {
                            fileExportType: 'FileExportTypeReception',
                            fileExportCode: fileExportType,
                            fileRelactionCode: 'FileExportTypeReception',
                            parameters: {
                                salesAreaCodes: _this.$data.exHallPassengerLog.salesAreaCodes,
                                storeCodes: _this.$data.exHallPassengerLog.storeCodes,
                                scCode: _this.$data.exHallPassengerLog.scCode,
                                customName: _this.$data.exHallPassengerLog.customName,
                                mobilePhone: _this.$data.exHallPassengerLog.mobilePhone,
                                receptionStartDate: _this.$data.exHallPassengerLog.receptionStartDate,
                                receptionEndDate: _this.$data.exHallPassengerLog.receptionEndDate,
                                pageNums: config.pageNums,
                                pageStart: 1,
                                exportFileStatus: 1    //新增字段,后台用于异步下载
                            }
                        }
                            api.downLoad.insertFileExportInfo(options, (res) => {
                                if(res.data.code == 'success'){
                                    MessageBox.confirm("请在导出中心下载生成的文件", "提示", {
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消",
                                    type: "warning"
                                    })   
                                }    
                            })
                    }
                })  
            },
            pageChange: function(num) {
                let _this = this
                _this.$data.exHallPassengerLog.pageStart = num
                _this.queryExhibitionHallFlowLog(_this.$data.exHallPassengerLog)
                _this.cacheRecordCustomerEnterStoreObjective()
            },
            cacheRecordCustomerEnterStoreObjective: function() {
                let _this = this
                api.sales
                   .reception
                   .autoRecordCustomerEnterStoreObjective({
                       storeCode: _this.exHallPassengerLog.storeCodes[0]
                    }, () => {

                   })
            },
            ...mapActions('exhibitionHallFlowLog', [
                'queryExhibitionHallFlowLog',
                'getSCPostnTypeCodes',
                'exportExhibitionHallFlowLog'
            ])
        },
        computed: {
            ...mapState('exhibitionHallFlowLog', [
                'exhibitionHallFlowLogList',
                'scCodes',
                'pager'
            ]),
            exportAllExhibitionHallFlowLogBtn(){
                return hasBtn(apiUrl.exHibitionHallFlow.export)
            }
        },
        components: {
            areaqueryshop,
            pagination,
            DatePicker
        }
    }
</script>
