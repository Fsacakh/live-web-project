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
                    <b-form-fieldset horizontal label="调整日期" :label-cols="4" label-text-align="right">
                        <el-date-picker
                            v-model="periodStart"
                            type="daterange"
                            @change="dateChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="开票日期" :label-cols="4" label-text-align="right">
                        <el-date-picker
                            v-model="invoiceDate"
                            type="daterange"
                            @change="dateChangeInvoice"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="开票人/企业名称" :label-cols="4" label-text-align="right">
                        <b-form-input v-model.trim="query.invoiceTitle"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="调整方式" :label-cols="4" label-text-align="right">
                        <b-form-select :options="managerType" v-model="query.adjustWayCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6" v-if="type">
                    <b-form-fieldset horizontal label="SI类型" :label-cols="4" label-text-align="right">
                        <b-form-select :options="siType" v-model="query.siTypeCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6" v-if="!type">
                    <b-form-fieldset horizontal label="手续费类型" :label-cols="4" label-text-align="right">
                        <b-form-select :options="commissionFeeType" v-model="query.commissionFeeTypeCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <IrisCar :col="2" @callBack="backSkuCar" ref="car" :validateLen="validateLen"></IrisCar>
            <div class="row" v-if="query.adjustWayCode == AdjustWayCarManagerment">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" :label-cols="4" class="text-right">
                        <b-form-input v-model.trim="query.vinNo" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="生产号" :label-cols="4" class="text-right">
                        <b-form-input v-model.trim="query.productionNo"/>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryData(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="mb-3 text-left">
                <b-button size="sm" class="btn btn-primary btn-sm" @click="newAddshowModal()">新建非车辆调整</b-button>
                <b-button size="sm" class="btn btn-danger" @click="del()">删除</b-button>
                <upload buttonName="导入" :addParams="addParams" :url="uploadUrl" :analysisExcel="analysisExcel" :showBack="showBack"></upload>
                <b-button size="sm" variant="info" type="button" @click="exportIntoExcel">导出</b-button>
                <b-button size="sm" variant="info" type="button" @click="presetTemplateExport">预设模板导出</b-button>
            </div>
            <!-- SI调整表格 -->
            <el-table :data="tableData" stripe border v-show="type">
                <el-table-column width="80" label="选择">
                    <template slot-scope="scope">
                        <input type="radio" name="radio" v-model="radioselected" :value="scope.row.id">
                    </template>
                </el-table-column>
                <el-table-column prop='managerCode' label="调整代码" width="160"></el-table-column>
                <el-table-column prop='adjustWayName' label="调整方式" width="120"></el-table-column>
                <el-table-column prop='periodStartTime' label="开始时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.periodStartTime && scope.row.periodStartTime.slice(0,10) }}
                    </template>
                </el-table-column>
                <el-table-column prop='periodEndTime' label="结束时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.periodEndTime && scope.row.periodEndTime.slice(0,10) }}
                    </template>
                </el-table-column>
                <el-table-column prop='vinNo' label="车架号" width="120"></el-table-column>
                <el-table-column prop='productionNo' label="生产号" width="120"></el-table-column>
                <el-table-column prop='carFactoryName' label="厂家" width="120"></el-table-column>
                <el-table-column prop='carBrandName' label="品牌" width="120"></el-table-column>
                <el-table-column prop='carSeriesName' label="车系" width="120"></el-table-column>
                <el-table-column prop='carModelName' label="车型" width="120"></el-table-column>
                <el-table-column prop='carDisplayName' label="车款" width="120"></el-table-column>
                <el-table-column prop='invoiceTitle' label="开票人/企业名称" width="150"></el-table-column>
                <el-table-column prop='scName' label="销售顾问" width="120"></el-table-column>
                <el-table-column prop='invoiceDate' label="开票日期" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.invoiceDate && scope.row.invoiceDate.slice(0,16) }}
                    </template>
                </el-table-column>
                <!--预计手续费:estimateCommissionFee;  预计SI返利:estimateSiValue-->
                <el-table-column prop='estimateSiValue' label="预估销售奖励(未税)" width="160"></el-table-column>
                <el-table-column prop='actualMoney' label="实际销售奖励(未税)" width="160"></el-table-column>
                <el-table-column prop='siTypeName' label="SI类型" width="120"></el-table-column>
                <el-table-column prop='createTimeStr' label="创建日期" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.createTimeStr && scope.row.createTimeStr.slice(0,10) }}
                    </template>
                </el-table-column>
            </el-table>
            <!-- 手续费调整表格 -->
            <el-table :data="tableData" stripe border v-show="!type">
                <el-table-column width="80" label="选择">
                    <template slot-scope="data">
                        <input type="radio" name="radio" v-model="radioselected" :value="data.row.id">
                    </template>
                </el-table-column>
                <el-table-column prop='managerCode' label="调整代码" width="160"></el-table-column>
                <el-table-column prop='commissionFeeTypeName' label="手续费类型" width="160"></el-table-column>
                <el-table-column prop='adjustWayName' label="调整方式" width="120"></el-table-column>
                <el-table-column prop='periodStartTime' label="开始时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.periodStartTime && scope.row.periodStartTime.slice(0,10) }}
                    </template>
                </el-table-column>
                <el-table-column prop='periodEndTime' label="结束时间" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.periodEndTime && scope.row.periodEndTime.slice(0,10) }}
                    </template>
                </el-table-column>
                <el-table-column prop='vinNo' label="车架号" width="120"></el-table-column>
                <el-table-column prop='productionNo' label="生产号" width="120"></el-table-column>
                <el-table-column prop='carFactoryName' label="厂家" width="120"></el-table-column>
                <el-table-column prop='carBrandName' label="品牌" width="120"></el-table-column>
                <el-table-column prop='carSeriesName' label="车系" width="120"></el-table-column>
                <el-table-column prop='carModelName' label="车型" width="120"></el-table-column>
                <el-table-column prop='carDisplayName' label="车款" width="120"></el-table-column>

                <el-table-column prop='invoiceTitle' label="开票人/企业名称" width="150"></el-table-column>
                <el-table-column prop='scName' label="销售顾问" width="120"></el-table-column>
                <el-table-column prop='invoiceDate' label="开票日期" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.invoiceDate && scope.row.invoiceDate.slice(0,16) }}
                    </template>
                </el-table-column>
                <!--预计手续费:estimateCommissionFee;  预计SI返利:estimateSiValue-->
                <el-table-column prop='estimateCommissionFee' label="预估手续费(含税)" width="160"></el-table-column>
                <el-table-column prop='actualMoney' label="实际手续费(含税)" width="160"></el-table-column>
                <el-table-column prop='createTimeStr' label="创建日期" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.createTimeStr && scope.row.createTimeStr.slice(0,10) }}
                    </template>
                </el-table-column>
            </el-table>
            <pagination
                class="pull-right mt-2"
                @page-change="pageChange"
                :page-no="pager.pageNo"
                :page-size="pager.pageSize"
                :total-result="pager.total"
                :total-pages="pager.totalPages">
            </pagination>
        </b-card>
        <b-modal ref="modal" size="lg" title="新建非车辆调整">
            <b-container fluid>
                <IrisCar :col="2" @callBack="carSelectBack" ref="addCar" :validateLen="validateLen"></IrisCar>
                <div class="row">
                    <div class="col-md-6" v-if="type">
                        <b-form-fieldset horizontal label="调整的SI类型" :label-cols="4" class="text-right">
                            <b-form-select :options="addSiType" v-model="newAddParams.siTypeCode"></b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6" v-if="!type">
                        <b-form-fieldset horizontal label="手续费类型" :label-cols="4" class="text-right">
                            <b-form-select :options="newBuildcommissionFeeType" v-model="newAddParams.commissionFeeTypeCode"></b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6" v-show="type">
                        <b-form-fieldset horizontal label="*实际销售奖励(未税)" :label-cols="4" class="text-right">
                            <b-form-input v-model="newAddParams.actualMoney"/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6" v-show="!type">
                        <b-form-fieldset horizontal label="*实际手续费(含税)" :label-cols="4" class="text-right">
                            <b-form-input v-model="newAddParams.actualMoney"/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="*调整日期" :label-cols="4" class="text-right">
                            <el-date-picker
                                v-model="newAddperiodStart"
                                type="daterange"
                                @change="addDateChange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </b-form-fieldset>
                    </div>
                </div>
            </b-container>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="primary" @click="newAddSure()">保存</b-btn>
                <b-btn size="sm" class="float-right" style="margin-right:10px;" variant="default" @click="modalHiden">取消</b-btn>
            </div>
        </b-modal>
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
import upload from 'components/iris-upload'
import apiUrl from 'common/api-url'
import {hasBtn, getSequence} from 'common/com-api'
import IrisCar from 'components/iris-car'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
export default {
    data() {
        return {
            scList: [],
            dateVal: [],
            tableData: [],
            validateLen: config.isShowFactory ? 3: 3,
            query: {
                //调整类型  默认为SI调整
                managerTypeCode:'ManagermentTypeSi',
                //门店编码
                storeCodeSet:null,
                //开票时间-开始
                invoiceDateStart:'',
                //开票时间-结束
                invoiceDateEnd:'',
                //厂家编码
                carFactoryCode:'',
                //品牌编码
                carBrandCode:'',
                //车系编码
                carSeriesCode:'',
                //车型编码
                carModelCode:'',
                //主车型编码
                carCode:'',
                //VIN码
                vinNo:'',
                //生产号
                productionNo:'',
                //调整方式编码
                adjustWayCode:'',
                //SI类型编码
                siTypeCode:'',
                //开票人编码
                invoiceTitle:'',
                //调整日期-开始
                periodStartTime:'',
                //调整日期-结束
                periodEndTime:'',
                commissionFeeTypeCode: '',
                pageNums: config.pageNums,
                pageStart: 1
            },
            newAddParams:{
                //调整编码
                managerCode:'',
                //调整类型  默认为SI调整
                managerTypeCode:'ManagermentTypeSi',
                //门店编码
                storeCodeSet:null,
                //厂家编码
                carFactoryCode:'',
                //品牌编码
                carBrandCode:'',
                //车系编码
                carSeriesCode:'',
                //车型编码
                carModelCode:'',
                //主车型编码
                carCode:'',
                //SI类型编码
                siTypeCode: 'SiTypeRetail',
                //手续费调整类型
                commissionFeeTypeCode:'ComFeeTypeFinancial',   //默认是金融手续费类型
                //调整日期-开始
                periodStartTime:'',
                //调整日期-结束
                periodEndTime:'',
                //实际金额
                actualMoney:'',
                //调整方式编码
                adjustWayCode:'AdjustWayNoCarManagerment'
            },
            pager: {
                pageNo: 1,
                pageSize: 15,
                total: 1,
                totalPages: 1
            },
            storeCode: '',
            //调整方式
            managerType:[
              {
                value: '',
                text: '所有调整方式'
              }
            ],
            //SI类型
            siType:[
              {
                value: '',
                text: '所有SI类型'
              }
            ],
            addSiType: [],
            //手续费类型
            commissionFeeType:[
              {
                value: '',
                text: '所有类型'
              }
            ],
            // 新建非车辆调整手续费类型
            newBuildcommissionFeeType: [],
            //调整日期
            periodStart:'',
            //开票日期
            invoiceDate:'',
            //车辆调整
            AdjustWayCarManagerment: config.si.AdjustWayCarManagerment,
            radioselected: '',            //表格数据
            //新增调整时间
            newAddperiodStart:'',
            uploadUrl: config.si.siUploadUrl,
            addParams: {
                relationCode: '',
                singleFlag: '1',
                businessType: ''
            },
            showBack: {
                financeCode: ''
            },
        }
    },
    computed:{
        downLoadBtn(){
            return hasBtn(apiUrl.lpe.queryDownLoadURL)
        },
        type: function() {
            //判断是SI调整还是手续费调整，type为true则为SI调整
            return (this.$route.params.type == 'si' ? true: false)
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            let _this = this;
            if(!this.type) {
                this.query.managerTypeCode = 'ManagermentTypeComFee';
            } else {
                this.query.managerTypeCode = 'ManagermentTypeSi'
            }
            if(!this.type){
                this.newAddParams.managerTypeCode = 'ManagermentTypeComFee'
            } else {
                this.newAddParams.managerTypeCode = 'ManagermentTypeSi'
            }
            if(!this.type){
                this.uploadUrl = config.si.scUploadUrl
            } else {
                this.uploadUrl = config.si.siUploadUrl
            }
            //调整方式
            api.ref.getDataDictionarys({refCode:config.si.AdjustWay}, (res) => {
                if(res.data.code === 'success' && res.data.obj){
                    let data = res.data.obj.referenceDetailInfos;
                    this.setOption(this.managerType, data);
                }
            })
            //返利调整类型
            api.ref.getDataDictionarys({refCode:config.si.SiType}, (res) => {
                if(res.data.code === 'success' && res.data.obj){
                    let data = res.data.obj.referenceDetailInfos;
                    this.setOption(this.siType, data);             //首页SI类型
                    this.setOption(this.addSiType,data);           //新建非车辆调整SI类型
                }
            })
            //手续费类型
            api.ref.getDataDictionarys({refCode:config.si.ComFeeType}, (res) => {
                if(res.data.code === 'success'){
                    let data = res.data.obj.referenceDetailInfos;
                    this.setOption(this.commissionFeeType, data);           //首页手续费类型
                    this.setOption(this.newBuildcommissionFeeType, data);   //新建非车辆调整手续费类型
                }
            })
            _this.tableData.length = 0;
        },
        backSkuCar(val) {
            const $this = this
            $this.query.carFactoryCode = val.factoryCode
            $this.query.carBrandCode = val.brandCode
            $this.query.carSeriesCode = val.seriesCode
            $this.query.carModelCode = val.modelCode
            $this.query.carCode = val.carCode
        },
        setOption(obj, data){
            if(obj.length > 0) {
                obj.length = 1;
                for(let i = 0, len = data.length; i < len; i ++){
                    obj.push({
                        text: data[i].refDetailName,
                        value: data[i].refDetailCode
                    })
                }
            } else {
                obj.length = 0;
                for(let i = 0, len = data.length; i < len; i ++){
                    obj.push({
                        text: data[i].refDetailName,
                        value: data[i].refDetailCode
                    })
                }
            }
        },
        selectStores: function(val1, val2) {
            this.query.storeCodeSet = [val2.value]
        },
        //调整日期
        dateChange: function() {
            if (this.periodStart[0] && this.periodStart[1]) {
                this.query.periodStartTime = common.eleTimeFormatim2(this.periodStart[0]).slice(0, 10)
                this.query.periodEndTime = common.eleTimeFormatim2(this.periodStart[1]).slice(0, 10)
            } else {
                this.query.periodStartTime = ''
                this.query.periodEndTime = ''
            }
        },
        //开票日期
        dateChangeInvoice: function() {
            if (this.invoiceDate[0] && this.invoiceDate[1]) {
                this.query.invoiceDateStart = common.eleTimeFormatim2(this.invoiceDate[0]).slice(0, 10)
                this.query.invoiceDateEnd = common.eleTimeFormatim2(this.invoiceDate[1]).slice(0, 10)
            } else {
                this.query.invoiceDateStart = ''
                this.query.invoiceDateEnd = ''
            }
        },
        //新增调整时间
        addDateChange:function() {
            if (this.newAddperiodStart[0] && this.newAddperiodStart[1]) {
                this.newAddParams.periodStartTime = common.eleTimeFormatim2(this.newAddperiodStart[0]).slice(0, 10)+ ' 00:00:01'
                this.newAddParams.periodEndTime = common.eleTimeFormatim2(this.newAddperiodStart[1]).slice(0, 10) + ' 00:00:01'
            } else {
                this.newAddParams.periodStartTime = ''
                this.newAddParams.periodEndTime = ''
            }
        },
        setTime: function(val) {
            let hours = parseInt(val / (1000 * 60 * 60));
            let minutes = parseInt((val % (1000 * 60 * 60))/(1000 * 60))
            let seconds = parseInt((val % (1000 * 60)) / 1000);
            let time = (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":"+ (seconds < 10 ? '0' + seconds : seconds)
            return time
        },
        queryData: function(page) {
            const $this = this;
            this.query.pageStart = page;
            //手续费调整查询
            if(!$this.type) {
                $this.query.managerTypeCode = 'ManagermentTypeComFee'
            }
            // SI调整查询
            if($this.type) {
                $this.query.managerTypeCode = 'ManagermentTypeSi'
            }
            // 如果不是车辆调整则不传vinNo和生产号入参
            if(this.query.adjustWayCode != 'AdjustWayCarManagerment') {
                delete this.query.vinNo;              //删除vinNO入参
                delete this.query.productionNo;       //删除生产号
            }
            this.tableData = [];
            var invoiceDate;
            api.incomeadjustment.queryIncomeManagerListByCondition($this.query, (res) => {
                if (res.data.code === 'success' && res.data.obj && res.data.obj.list.length > 0) {
                    this.tableData = res.data.obj.list;
                    this.tableData.forEach(item => {
                        //实际销售奖励保留两位小数
                        if(item.actualMoney) {
                            item.actualMoney = item.actualMoney.toFixed(2);
                        }
                        //预估销售奖励保留两位小数
                        if(item.estimateSiValue) {
                            item.estimateSiValue = item.estimateSiValue.toFixed(2);
                        }
                        //预估手续费保留两位小数
                        if(item.estimateCommissionFee) {
                            item.estimateCommissionFee = item.estimateCommissionFee.toFixed(2);
                        }
                    })
                    this.pager.total = res.data.obj.total;
                    this.pager.totalPages = res.data.obj.pages;
                    this.pager.pageNo = res.data.obj.pageNum;
                }
            })
        },
        // 删除表格数据
        del: function(){
            if(!this.radioselected){
                Message('请选择一条消息');
                return;
            }
            MessageBox.confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.incomeadjustment.deleteIncomeManagerment({id:this.radioselected}, (res) => {
                    this.queryData();
                });
                this.radioselected = '';
            }).catch(() => {
                console.info('取消删除');
            });
        },
        clear: function() {
            this.$refs.car.clear();
            this.periodStart = null;
            this.invoiceDate = null;
            //调整类型  
            this.query.managerTypeCode = '',
            //门店编码
            // storeCodeSet: [],
            //开票时间-开始
            this.query.invoiceDateStart = '',
            //开票时间-结束
            this.query.invoiceDateEnd = '',
            //厂家编码
            this.query.carFactoryCode = '',
            //品牌编码
            this.query.carBrandCode = '',
            //车系编码
            this.query.carSeriesCode = '',
            //车型编码
            this.query.carModelCode = '',
            //主车型编码
            this.query.carCode = '',
            //VIN码
            this.query.vinNo = '',
            //生产号
            this.query.productionNo = '',
            //调整方式编码
            this.query.adjustWayCode = '',
            //SI类型编码
            this.query.siTypeCode = '',
            //开票人编码
            this.query.invoiceTitle = '',
            //调整日期-开始
            this.query.periodStartTime = '',
            //调整日期-结束
            this.query.periodEndTime = '',
            this.query.commissionFeeTypeCode = '',
            this.query.pageNums = config.pageNums,
            this.query.pageStart = 1
        },
        pageChange: function(page) {
            this.queryData(page)
        },
        // 数组去重
        arrRemove() {
            // 数组去重（新建非车辆调整中的调整的SI类型选项和手续费类型选项去重）
            let newBuildcommissionFeeType = this.newBuildcommissionFeeType;
            let addSiType = this.addSiType;
            let newFeeType = [];
            let newAddSiType = [];
            let newFeeTypeObj = {};
            let newAddSiTypeOBj = {};
            for(var i = 0; i < newBuildcommissionFeeType.length; i ++) {
                if(!newFeeTypeObj[newBuildcommissionFeeType[i].text]){
                    newFeeType.push(newBuildcommissionFeeType[i]);
                    newFeeTypeObj[newBuildcommissionFeeType[i].text] = true;
                }
            }
            for(var i = 0; i < addSiType.length; i ++) {
                if(!newAddSiTypeOBj[addSiType[i].text]){
                    newAddSiType.push(addSiType[i]);
                    newAddSiTypeOBj[addSiType[i].text] = true;
                }
            }
            this.newBuildcommissionFeeType = newFeeType;
            this.addSiType = newAddSiType;
        },
        newAddshowModal:function(){
            this.arrRemove();       //调用数组去重方法
            let _this = this;
            getSequence(config.si.serviceCode, function(res){
                _this.$refs.modal.show();
                _this.newAddParams.managerCode = res;
            })
        },
        checkSubmit(){
            if(!this.newAddParams.carFactoryCode && !this.newAddParams.carBrandCode){
                console.info('厂家或品牌必选');
                this.$refs.addCar.validate();
                return false;
            }
            if(!this.newAddParams.periodStartTime && !this.newAddParams.actualMoney){
                console.info('调整时间');
                if(!this.newAddParams.periodStartTime){
                    Message('请填入调整时间')
                }
                if(!this.newAddParams.actualMoney){
                    Message('实际销售奖励不能为空')
                }
                return false;
            }
            if(!this.newAddParams.actualMoney){
                console.info('金额');
                return false;
            }
            return true;
        },
        newAddSure(){
            if(!this.checkSubmit()) {
                return;
            }
            if(this.newAddperiodStart == '') {
                Message('调整时间不能为空');
                return;
            }
            if(this.type) {
                if(isNaN(Number(this.newAddParams.actualMoney))) {
                    Message('实际销售奖励必须为数字');
                    return;
                }
            }
            if(!this.type) {
                if(isNaN(Number(this.newAddParams.actualMoney))) {
                    Message('实际手续费必须为数字');
                    return;
                }
            }
            // 区分SI调整和手续费调整的入参
            if(this.type) {
                delete this.newAddParams.commissionFeeTypeCode;
            }
            if(!this.type) {
                delete this.newAddParams.siTypeCode;
                this.newAddParams.managerTypeCode = 'ManagermentTypeComFee';
            }
            // 保存接口
            api.incomeadjustment.checkIncomeManagerment(this.newAddParams, (res) => {
                if(res.data.code === 'success') {
                    if(res.data.obj && res.data.obj.length > 0) {
                        //  提示是否覆盖已有调整
                        MessageBox.confirm('是否覆盖已有调整?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            beforeClose: (action, instance, done) => {
                                if (action === 'confirm') {
                                    instance.confirmButtonLoading = true;
                                    api.incomeadjustment.insert(this.newAddParams, (res) => {
                                        this.queryData(1);
                                        this.modalHiden();
                                    });
                                    done();
                                    instance.confirmButtonLoading = false;
                                } else {
                                    done();
                                    instance.confirmButtonLoading = false;
                                    return
                                }
                            }
                        }).then((action) => {
                        }).catch(() => {
                        });
                    } else {
                        api.incomeadjustment.insert(this.newAddParams, (res) => {
                            this.queryData(1);
                            this.modalHiden();
                        });
                  }
                }
            });
        },
        modalHiden(){
            this.$refs.addCar.clear();
            this.newAddperiodStart = null;
            this.newAddParams = {
                //调整编码
                managerCode:'',
                //调整类型  默认为SI调整
                managerTypeCode:'ManagermentTypeSi',
                //门店编码
                storeCodeSet: null,
                //厂家编码
                carFactoryCode:'',
                //品牌编码
                carBrandCode:'',
                //车系编码
                carSeriesCode:'',
                //车型编码
                carModelCode:'',
                //主车型编码
                carCode:'',
                //SI类型编码
                siTypeCode:'SiTypeRetail',   //默认是零售SI
                //手续费调整类型
                commissionFeeTypeCode:'ComFeeTypeFinancial',    //默认是金融手续费类型
                //调整日期-开始
                periodStartTime:'',
                //调整日期-结束
                periodEndTime:'',
                //实际金额
                actualMoney:'',
                //调整方式编码
                adjustWayCode:'AdjustWayNoCarManagerment'
            },
            this.$refs.modal.hide();
        },
        carSelectBack(data){
            this.newAddParams.carFactoryCode = data.factoryCode;
            this.newAddParams.carBrandCode = data.brandCode;
            this.newAddParams.carSeriesCode = data.seriesCode;
            this.newAddParams.carModelCode = data.modelCode;
            this.newAddParams.carCode = data.carCode;
        },
        analysisExcel: function(res) {
            let _this = this
            if (res.data.code === 'success') {
                _this.clear()
                _this.queryData(1)
            }
        },
        // 导出
        exportIntoExcel: function() {
            let _this = this
            let params = _this.$data.query;
            if (_this.type) {
               api.incomeadjustment.exportCarSiManageInfo(params, res => {
                    if (res.data.code === "success") {
                       window.location.href = common.isDevFile() + res.data.obj;
                    }
                })
            } else {
                api.incomeadjustment.exportCommissionSiManageInfo(params, res => {
                    if (res.data.code === "success") {
                       window.location.href = common.isDevFile() + res.data.obj;
                    }
                })
            }
        },
        // 预设模板导出
        presetTemplateExport() {
          // SI预设模板导出
          if (this.type) {
            api.incomeadjustment.selectByRelationCode({ relationCode: "ImportCarSiTemplete" }, res => {
                if(res.data.code === 'success') {
                  let path = res.data.obj[0].fileRelativePath
                  window.location.href = common.isDevTemplate() + path
                }
            })
          } else {
            // 手续费预设模板导出
            api.incomeadjustment.selectByRelationCode({ relationCode: "ImportCarCommFeeTemplete" }, res => {
                if(res.data.code === 'success') {
                  let path = res.data.obj[0].fileRelativePath
                  window.location.href = common.isDevTemplate() + path
                }
            })
          }
        }
    },
    watch: {
        type: {
            handler(val) {
                let _this = this;
                //保证SI调整和手续费调整页面互不影响
                _this.clear();
                _this.init()
            },
            deep: true
        }
    },
    components: {
       Areaqueryshop,
       Pagination,
       IrisCar,
       upload
    },
}
</script>


