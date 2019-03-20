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
                        <el-date-picker 
                            v-model="dateVal" 
                            type="daterange"
                            @change="dateChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="接待销售顾问" :label-cols="4" label-text-align="right">
                        <b-form-select :options="scList" v-model="query.scCode">
                        </b-form-select>     
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="客户姓名" :label-cols="4" label-text-align="right">
                        <b-form-input v-model="query.customName"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6"> 
                    <b-form-fieldset horizontal label="客户电话" :label-cols="4" label-text-align="right">
                        <b-form-input v-model="query.mobilePhone"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryData(1)">查询</b-button>
                    </div>
                </div>
            </div> 
        </b-card> 
        <b-card>
            <div class="mb-3 text-right">
                <b-button v-if="downLoadBtn" size="sm" @click="downLoad">
                    导出LPE
                </b-button>
            </div>
            <el-table :data="tableData" stripe border>
                <el-table-column prop='index' label="序号" width="120">
                    <template slot-scope="scope">
                        {{ scope.$index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop='receptionDateVersion' label="来店日期" width="120"></el-table-column>
                <el-table-column prop='createByName' label="前台接待" width="120"></el-table-column>
                <el-table-column prop='enterStoreObjectiveViewName' label="客户进店目的" width="150"></el-table-column>
                <el-table-column prop='isFirstInStore' label="来店类型" width="120">
                    <template slot-scope="scope">
                        {{scope.row.isFirstInStore==true?'首次':(scope.row.isFirstInStore==false?'再次':'')}}
                    </template>
                    <!-- true首次， false 再次 -->
                </el-table-column>
                <el-table-column prop='appointScFlag' label="是否指定销售顾问" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.appointScFlag == '1'?'是':'否' }}
                    </template>
                </el-table-column>
                <el-table-column prop='appointmentStatus' label="是否预约" width="120">
                    <template slot-scope="scope">
                        {{scope.row.appointmentStatus == '1'?'是':'否'}}
                    </template>
                    <!-- 1是，其他否 -->
                </el-table-column>
                <el-table-column prop='channelName' label="线索渠道" width="120"></el-table-column>
                <el-table-column prop='isActive' label="再次到店来源渠道" width="120">
                    <template slot-scope="scope">
                        {{scope.row.isActive == '0'?'本月新增':(scope.row.isActive == '1'?'休眠':(scope.row.isActive == '2'?'活跃':scope.row.isActive))}}
                    </template>
                    <!-- 0：本月新增客户；1：休眠 2：活跃 -->
                </el-table-column>
                <el-table-column prop='scName' label="销售顾问" width="120"></el-table-column>
                <el-table-column label="停留时间">
                    <el-table-column prop="receptionStartTime" label="到店时间" width="120"></el-table-column>
                    <el-table-column prop="receptionEndTime" label="离店时间" width="120"></el-table-column>
                    <el-table-column prop="receptionTime" label="停留时间" width="120">
                        <template slot-scope="scope">
                            {{setTime(scope.row.receptionTime)}}
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="试乘试驾">
                    <el-table-column prop="modelName" label="试驾车型" width="120"></el-table-column>
                    <el-table-column prop="actualTryTimeBegin" label="试驾开始" width="120"></el-table-column>
                    <el-table-column prop="actualTryTimeEnd" label="试驾结束" width="120"></el-table-column>
                    <el-table-column prop="actualTryTime" label="试驾时长" width="120"></el-table-column>
                </el-table-column>
                <el-table-column prop="customName" label="客户姓名" width="120"></el-table-column>
                <el-table-column prop="mobilePhone" label="客户电话" width="150"></el-table-column>
                <el-table-column prop="numbleRepeat" label="相同手机号次数" width="120"></el-table-column>
                <el-table-column prop="intentionLevelName" label="客户级别" width="120"></el-table-column>
                <el-table-column prop="customGender" label="客户性别" width="120">
                    <template slot-scope="scope">
                        {{scope.row.customGender == '1'?'男':'女'}}
                    </template>
                    <!-- 0:女 1：男 -->
                </el-table-column>
                <el-table-column prop="leadAddAgeGroup" label="客户大概年龄" width="120"></el-table-column>
                <el-table-column prop="locationCity" label="客户居住城市" width="120"></el-table-column>
                <el-table-column prop="locationCounty" label="客户居住县/区" width="120"></el-table-column>
                <el-table-column prop="leadAddIndustry" label="客户从事行业" width="120"></el-table-column>
                <el-table-column prop="leadAddCustPosition" label="客户职位" width="120"></el-table-column>
                <el-table-column prop="sourceName" label="客户获取信息来源" width="120"></el-table-column>
                <el-table-column label="客户保有车辆信息">
                    <el-table-column prop="" label="置换/保有车辆品牌" width="160"></el-table-column>
                    <el-table-column prop="" label="置换/保有车型" width="150"></el-table-column>
                    <el-table-column prop="" label="置换/保有车辆号牌" width="160"></el-table-column>
                </el-table-column>
                <el-table-column label="购车需求">
                    <el-table-column prop="intentionSeriesName" label="意向车系" width="120"></el-table-column>
                    <el-table-column prop="intentionModelName" label="意向车型" width="120"></el-table-column>
                    <el-table-column prop="colour" label="车身颜色" width="120"></el-table-column>
                    <el-table-column prop="interior" label="内饰颜色" width="120"></el-table-column>
                    <el-table-column prop="buyType" label="购车类型" width="120"></el-table-column>
                    <el-table-column prop="leadAddComBrand" label="竞争品牌" width="120"></el-table-column>
                    <el-table-column prop="leadAddComModel" label="竞争车型" width="120"></el-table-column>
                    <el-table-column prop="leadAddFocus" label="购车主要关注点" width="120"></el-table-column>
                    <el-table-column prop="isTryDriver" label="是否试驾" width="120"></el-table-column>
                    <el-table-column prop="" label="不试驾原因" width="150"></el-table-column>
                    <el-table-column prop="" label="是否草签" width="150"></el-table-column>
                    <el-table-column prop="isSku" label="是否精品" width="120"></el-table-column>
                    <el-table-column prop="" label="不精品原因" width="150"></el-table-column>
                    <el-table-column prop="isSubstitution" label="是否置换评估" width="120"></el-table-column>
                    <el-table-column prop="" label="评估和期望价差" width="120"></el-table-column>
                    <el-table-column prop="" label="不评估原因" width="120"></el-table-column>
                    <el-table-column prop="isFinancial" label="是否金融" width="120"></el-table-column>
                    <el-table-column prop="financialInfo" label="金融产品信息" width="120"></el-table-column>
                    <el-table-column prop="notFinancialReason" label="不金融原因" width="120"></el-table-column>
                    <el-table-column prop="createOrderStatus" label="是否订单" width="120">
                        <template slot-scope="scope">
                            {{scope.row.createOrderStatus == '0'?'否':'是'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="不订单原因（成交瓶颈）" width="120"></el-table-column>
                    <el-table-column prop="finishCarStatus" label="是否交车" width="120">
                        <template slot-scope="scope">
                            {{scope.row.finishCarStatus == '0'?'否':'是'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="scheduleFailName" label="战败原因" width="120"></el-table-column>
                </el-table-column>
                <el-table-column prop="" label="其他目的备注" width="150"></el-table-column>
                <el-table-column prop="dccName" label="PU线索归属" width="150"></el-table-column>
                <el-table-column prop="" label="保安是否通知" width="150"></el-table-column>
                <el-table-column prop="" label="销售顾问是否15分钟内提供信息的卡" width="200"></el-table-column>
                <el-table-column prop="" label="陪战" width="150"></el-table-column>
                <el-table-column prop="" label="数据信息是否完整/正确" width="150"></el-table-column>
                <el-table-column prop="" label="不完整/正确的原因说明" width="150"></el-table-column>
                <el-table-column prop="remark" label="备注" width="150"></el-table-column>
            </el-table>
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
import { MessageBox, Message, Table, TableColumn, DatePicker} from 'element-ui'
import common from 'common/common'
import api from 'common/api'
import config from 'common/config'
import Areaqueryshop from 'components/iris-areaqueryshop/index'
import Pagination from 'components/pagination/pagination'
import apiUrl from 'common/api-url'
import {hasBtn} from 'common/com-api'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
export default {
    data() {
        return {
            scList: [],
            dateVal: [],
            tableData: [],
            query: {
                scCode: '',
                storeCodes: [],
                customName: '',
                mobilePhone: '',
                receptionStartDate: '',
                receptionEndDate: '',
                pageNums: config.pageNums,
                pageStart: 1
            },
            pager: {
                pageNo: 1,
                pageSize: 15,
                total: 1,
                totalPages: 1
            },
            storeCode: '',
        }
    },
    computed:{
        downLoadBtn(){
            return hasBtn(apiUrl.lpe.queryDownLoadURL)
        }
    },
    methods: {
        selectStores: function(val1, val2) {
            this.query.storeCodes = [val2.value]
            this.storeCode = val2.value
            if(val2.value) {
                this.getScInfo({
                    storeCode: val2.value,
                    postnTypeCode: config.postnTypeCode.sc
                })
            }
        },
        dateChange: function() {
            if (this.dateVal[0] && this.dateVal[1]) {
                this.query.receptionStartDate = common.eleTimeFormatim2(this.dateVal[0]).slice(0, 10)
                this.query.receptionEndDate = common.eleTimeFormatim2(this.dateVal[1]).slice(0, 10)
            } else {
                this.query.receptionStartDate = ''
                this.query.receptionEndDate = ''
            }
        },
        getScInfo: function(params) {
            api.emp.queryEmpByStoreCode(params, (res) => {
                if (res.data.code === 'success') {
                    let list = res.data.obj
                    let options = []
                    if (list != null) {
                        list.forEach((item) => {
                            options.push({
                                value: item.empCode,
                                text: item.empCnName
                            })
                        })  
                    }
                    this.scList = options
                } 
            })
        },
        downLoad: function() {
            //数据提交到下载中心
            api.ordinalInfo.getSequence({serviceCode: 'FILEEXPORTSEQ'}, res => {
                    if(res.data.code = 'success'){
                        var fileExportType = res.data.obj
                        this.query.exportFileStatus = 1
                         let options = {
                            fileExportType: config.fileExportType.fileExportTypeLPE,
                            fileExportCode: fileExportType,
                            fileRelactionCode: 'ExportTemplateLPEExhibitionHallFolwLog',
                            parameters: this.query,
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
        setTime: function(val) {
            let hours = parseInt(val / (1000 * 60 * 60));
            let minutes = parseInt((val % (1000 * 60 * 60))/(1000 * 60)) 
            let seconds = parseInt((val % (1000 * 60)) / 1000);
            let time = (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":"+ (seconds < 10 ? '0' + seconds : seconds)
            return time
        },
        queryData: function(page) {
            const $this = this
            this.query.pageStart = page
            api.lpe.queryLpeList($this.query, (res) => {
                if (res.data.code === 'success') {
                    this.tableData = res.data.obj.list
                    this.pager.pageNo = res.data.obj.pageNum
                    this.pager.totalPages = res.data.obj.pages
                    this.pager.pageSize = res.data.obj.pageSize
                    this.pager.total = res.data.obj.total
                }
            })
            this.cacheRecordCustomerEnterStoreObjective()
        },
        cacheRecordCustomerEnterStoreObjective: function() {
            let _this = this
            api.sales
                .reception
                .autoRecordCustomerEnterStoreObjective({
                    storeCode: _this.storeCode
                }, () => {

                })
        },
        clear: function() {
            this.dateVal = []
            this.query = {
                scCode: '',
                storeCodes: this.query.storeCodes,
                customName: '',
                mobilePhone: '',
                receptionStartDate: '',
                receptionEndDate: '',
                pageNums: config.pageNums,
                pageStart: 1
            }
        },
        pageChange: function(page) {
            this.queryData(page)
        }
    },
    components: {
       Areaqueryshop, 
       Pagination
    },
}
</script>