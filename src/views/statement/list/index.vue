<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="日期" label-text-align="right" :label-cols="4">
                        <div class="row" style="position: relative">
                            <div class="col-md-6">
                                <el-date-picker
                                    v-model="yearsStr"
                                    type="year"
                                    @change="dateChange()"
                                    placeholder="选择年">
                                </el-date-picker>
                            </div>
                            <div class="col-md-6">
                                <div @click="showMonthList = !showMonthList" style="padding: 0 10px; overflow: hidden; line-height: 36px; position: relative; border: 1px solid #ccc; height: 36px; border-radius: 4px;">
                                    {{showData}}
                                </div>
                                <ul v-if="showMonthList" class="form-control month-list">
                                    <li  v-for="(month, index) in months" :key="index">
                                        <input type="checkbox" :id="'month' + index" :value="month" v-model="checkedMonth">
                                        <label :for="'month' + index">{{month}}</label>
                                    </li>
                                    <!-- <li class="text-right">
                                        <b-button variant="primary" size="sm" @click="showMonthList=false">确定</b-button>
                                    </li> -->
                                </ul>
                            </div>

                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="销售顾问" label-text-align="right" :label-cols="4">
                        <b-form-select :options="scList" v-model="query.scCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <iris-car
                :showCar="false"
                :showModel="false"
                :col="3"
                :initData="intentionCarInfoVos[0]"
                :storeCode = 'query.storeCode'
                ref="car"
                @callBack="backSkuCar"
                @twoclick= "twoclear"
                @validete="validateCar">
            </iris-car>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="getGpConfig(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div style="margin-bottom: 10px">
                <b-button v-if="downloadBtn" size="sm"  @click="download()">导出</b-button>
            </div>
           <el-table :data="tableData" stripe border>
                <!-- <el-table-column prop='index' label="序号" width="120">
                    <template slot-scope="scope">
                        {{scope.$index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                    </template>
                </el-table-column> -->
                <el-table-column :label="tableStoreName + tableYear + '年度'" width="205" fixed>
                    <el-table-column prop='title' :label="'车型：'+ cardata" width="205" fixed></el-table-column>
                </el-table-column>
                <el-table-column v-for="(item, index) in labelMonth" :label="item.label" :key="index">
                    <el-table-column :prop='item.props' label="数量" width="150">
                        <template slot-scope="scope">
                            {{titleFilter(scope.row.title)
                            ?scope.row[item.props]?scope.row[item.props] + '%':'0.0%'
                            : scope.row[item.props]?scope.row[item.props]: '0.0'
                            }}
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <!-- <pagination class="pull-right" @page-change="pageChange"
                        :page-no="pager.pageNo"
                        :page-size="pager.pageSize"
                        :total-result="pager.total"
                        :total-pages="pager.totalPages">
            </pagination> -->
        </b-card>

    </div>
</template>

<script>
import Vue from 'vue'
import { MessageBox, Message, Table, TableColumn, DatePicker, Checkbox } from 'element-ui'
import common from 'common/common'
import api from 'common/api'
import config from 'common/config'
import XLSX from "xlsx";
import Areaqueryshop from 'components/iris-areaqueryshop/index'
import Pagination from 'components/pagination/pagination'
import IrisCar from 'components/iris-car'
import apiUrl from 'common/api-url'
import {hasBtn} from 'common/com-api'
Vue.use(DatePicker)
Vue.use(Checkbox)
Vue.use(TableColumn)
Vue.use(Table)
export  default {
    components: {
        Areaqueryshop,
        IrisCar,
        Pagination
    },
    data() {
        return {
            gpConfig: [],
            cardata: '全部',
            tableStoreName: '',
            tableYear: '',
            showMonthList: false,
            showData: '',
            checkedMonth: [],
            yearsStr: new Date(),
            intentionCarInfoVos: [],
            query: {
                salesYear: '',
                salesMonths: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                scCode: '',
                storeCode: '',
                carBrandCode: '',
                carSeriesCode: '',
                carFactoryCode: '',
                pageNums: config.pageNums,
                pageStart: 1
            },
            months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            labelMonth: [
                {
                    label: '1',
                    props: 'month1'
                },
                {
                    label: '2',
                    props: 'month2'
                },
                {
                    label: '3',
                    props: 'month3'
                },
                {
                    label: '4',
                    props: 'month4'
                },
                {
                    label: '5',
                    props: 'month5'
                },
                {
                    label: '6',
                    props: 'month6'
                },
                {
                    label: '7',
                    props: 'month7'
                },
                {
                    label: '8',
                    props: 'month8'
                },
                {
                    label: '9',
                    props: 'month9'
                },
                {
                    label: '10',
                    props: 'month10'
                },
                {
                    label: '11',
                    props: 'month11'
                },
                {
                    label: '12',
                    props: 'month12'
                }

            ],
            scList: [],
            pager: {
                pageNo: 1,
                pageSize: 15,
                total: 1,
                totalPages: 1
            },
            tableData: [],
            dataSort: []
        }
    },
    computed: {
        downloadBtn(){
            return hasBtn(apiUrl.statement.downLoad)
        }
    },
    watch: {
        checkedMonth: {
            handler(val) {
                this.showData = ''
                this.query.salesMonths = [];
                this.checkedMonth.forEach((item) => {
                    let month = String(item)
                    this.query.salesMonths.push(month)
                    this.showData += ' ' + String(item)
                })
                if(this.query.salesMonths.length == 0) {
                   this.query.salesMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
                }
            },
            deep: true
        }
    },
    methods: {
        //导出
        download: function() {
            if(this.tableData.length == 0) {
                Message({
                    message: '请先查询数据',
                    type: 'warning'
                }); 
                return
            }
            api.statement.downLoad(this.query, res => {
                if(res.data.code === 'success') {
                    let path = res.data.obj
                    window.location.href = path
                }
            })
            
        },
        titleFilter: function(val) {
            // console.log(val)
            let ble;
            if(String(val).substring(val.length-1) == '%') {
                ble = true
            } else {
                ble = false
            }
            return ble
        },
        dateChange: function() {
            this.query.salesYear = this.yearsStr.getFullYear()
        },
        backSkuCar(val) {
            const $this = this
            for (let i in val) {
                $this.query['carFactoryCode'] = val['factoryCode']
                $this.query['carBrandCode'] = val['brandCode']
                $this.query['carSeriesCode'] = val['seriesCode']
            }
        },
        // selectData: function(val) {
        //     console.log(val)
        // },
        validateCar() {},
        //选择经销商店
        selectStores: function(val1, val2) {
            // this.query.storeCodes = [val2.value]
            let year = new Date()
            this.yearsStr = year
            this.query.salesYear = year.getFullYear();
            this.tableYear = year.getFullYear()
            this.query.storeCode = val2.value
            this.tableStoreName = val2.text


            if(val2.value) {
                this.getScInfo(
                    {
                        storeCode: val2.value,
                        postnTypeCode: config.postnTypeCode.sc
                    })
            }
            this.clear()
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
        clear: function() {
            // console.log(555)
            this.showMonthList = false
            this.$refs.car.clear()
            this.query.scCode = ''
            this.query.carFactoryCode = ''
            this.query.carBrandCode = ''
            this.query.carSeriesCode = ''
            // this.query.salesYear = ''
            this.query.salesMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            this.checkedMonth = [];
            this.yearsStr = new Date();
        },
        twoclear: function() {
            setTimeout(this.twoClick,500)
            clearTimeout(this.twoClick);   
        },
        twoClick: function() {
            this.$refs.car.clearquery()
        },
        pageChange: function(page) {
            // this.getGpConfig(page)
        },
        getGpConfig: function(page) {
            //GpConverType
            api.ref.getDataDictionarys({refCode: 'GpConverType'}, res => {
                if(res.data.code === 'success') {
                    this.gpConfig = []
                    res.data.obj.referenceDetailInfos.forEach((item, index) => {
                        this.gpConfig.push(item.refDetailName)
                        this.gpConfig.push(item.refDetailName+'%')
                    })
                    this.queryTaskList(page)
                }
            })
        },
        queryTaskList: function(page) {
            const _this = this
            this.query.pageStart = page
            this.showMonthList = false
            if(!this.query.storeCode) {
                Message({
                    message: '请选择门店',
                    type: 'warning'
                });
                return
            }if(!this.query.salesYear) {
                Message({
                    message: '请选择年份',
                    type: 'warning'
                });
                return
            }
            // api.statement.queryStatement(this.query, (res) => {
            //     if(res.data.code == 'success') {
            //         console.log('--------------整体信息--------------')
            //         console.log(res.data.obj)
            //         let data = res.data.obj?res.data.obj:[]

            //         this.cardata = data[0].carBrandName ? data[0].carBrandName + ' ' + (data[0].carSeriesName?data[0].carSeriesName:'') : '全部'
            //         this.tableYear = this.query.salesYear
            //         let data2 = []
                    
            //         let purchaseFee = {title: '车辆采购价格（未税）'}    //车辆采购价格（未税）
            //         let totalFreightFee = {title: '车辆采购运费（未税）'}    //车辆采购运费（未税）
            //         let actualPurchaseFee = {title: '车辆实际采购成本（未税）'}    //车辆实际采购成本（未税）
            //         let actualSalesPrice = {title: '车辆外部销售收入（未税）'}    //车辆外部销售收入（未税）
                
            //         let invoiceCount = {title: '开票数'}           //开票数
            //         let siValue = {title: '厂家SI'}                //厂家SI
            //         let siValuePercent = {title: '厂家SI%'}         //厂家SI%
            //         let totalCommissionFee = {title: '金融佣金（未税）'}    //金融佣金（未税）
            //         let totalServiceFee = {title: '金融服务费（未税）'}    //金融服务费（未税）
            //         let grossrofit = {title: '金融毛利（未税）'}    //金融毛利（未税）
            //         let insuranceTotalServiceFee = {title: '保险佣金（未税）'}    //保险佣金（未税）
            //         let competitiveProductsPgValue = {title: '精品商品毛利（未税）'}    //精品商品毛利（未税）
            //         let extensionProductsPgValue = {title: '延保商品毛利（未税）'}    //延保商品毛利（未税）
            //         let displaceSserviceFee = {title: '置换手续费（未税）'}    //置换手续费（未税）
            //         let ohterSserviceFee = {title: '其他服务费毛利（未税）'}    //其他服务费毛利（未税）
            //         let derivedGrossrofitSum = {title: '衍生类总毛利（未税）'}    //衍生类总毛利（未税）


            //         // let gp1 = {title: 'GP1'}    //GP1
            //         // let gp1_rate = {title: 'GP1%'}    //GP1%
            //         // let gp2 = {title: 'GP2'}    //GP2
            //         // let gp2_rate = {title: 'GP2%'}    //GP2%
            //         // let gp3 = {title: 'GP3'}    //GP3
            //         // let gp3_rate = {title: 'GP3%'}    //GP3%
            //         // let tgp = {title: 'T.GP'}  //GP4.5
            //         // let tgp_rate = {title: 'T.GP%'}  //GP4.5%

            //         let gpdata = {

            //         }

            //         this.gpConfig.forEach((item, index) => {
            //             gpdata[item] = {title: item}
            //         })
                    
            //         // let gptitle = 

            //         this.labelMonth = []
            //         data.forEach((item, index) => {
            //             let num = "month" + item.month
            //             let labelObj = {
            //                 label: item.month,
            //                 props: num
            //             }
            //             this.labelMonth.push(labelObj)

            //             purchaseFee['title'] = '车辆采购价格（未税）'
            //             purchaseFee[num] = Number(item.purchaseFee).toFixed(1)
            //             totalFreightFee['title'] = '车辆采购运费（未税）'
            //             totalFreightFee[num] = Number(item.totalFreightFee).toFixed(1)
            //             actualPurchaseFee['title'] = '车辆实际采购成本（未税）'
            //             actualPurchaseFee[num] = Number(item.actualPurchaseFee).toFixed(1)

            //             actualSalesPrice['title'] = '车辆外部销售收入（未税）'
            //             actualSalesPrice[num] = Number(item.actualSalesPrice).toFixed(1)

            //             invoiceCount['title'] = '开票数'
            //             invoiceCount[num] = Number(item.invoiceCount).toFixed(1)
            //             siValue['title'] = '厂家SI'
            //             siValue[num] = Number(item.siValue).toFixed(1)
            //             siValuePercent['title'] = '厂家SI%'
            //             siValuePercent[num] = (Number(item.siValuePercent)*100).toFixed(3)
            //             totalCommissionFee['title'] = '金融佣金（未税）'
            //             totalCommissionFee[num] = Number(item.totalCommissionFee).toFixed(1)
            //             totalServiceFee['title'] = '金融服务费（未税）'
            //             totalServiceFee[num] = Number(item.totalServiceFee).toFixed(1)
            //             grossrofit['title'] = '金融毛利（未税）'
            //             grossrofit[num] = Number(item.grossrofit).toFixed(1)
            //             insuranceTotalServiceFee['title'] = '保险佣金（未税）'
            //             insuranceTotalServiceFee[num] = Number(item.insuranceTotalServiceFee).toFixed(1)
            //             competitiveProductsPgValue['title'] = '精品商品毛利（未税）'
            //             competitiveProductsPgValue[num] = Number(item.competitiveProductsPgValue).toFixed(1)
            //             extensionProductsPgValue['title'] = '延保商品毛利（未税）'
            //             extensionProductsPgValue[num] = Number(item.extensionProductsPgValue).toFixed(1)
            //             displaceSserviceFee['title'] = '置换手续费（未税）'
            //             displaceSserviceFee[num] = Number(item.displaceSserviceFee).toFixed(1)
            //             ohterSserviceFee['title'] = '其他服务费毛利（未税）'
            //             ohterSserviceFee[num] = Number(item.ohterSserviceFee).toFixed(1)
            //             derivedGrossrofitSum['title'] = '衍生类总毛利（未税）'
            //             derivedGrossrofitSum[num] = Number(item.derivedGrossrofitSum).toFixed(1)

            //             // let tgp = this.filterTgp(item.salesProfitGpVos)
            //             console.log('------------整体-----------')
            //             console.log(item.salesProfitGpVos)
            //             item.salesProfitGpVos.forEach((ele, index) => {

            //                 for(let i in gpdata) {
            //                     if(ele.gpName==i) {
            //                         if(i.includes('%')) {
            //                             gpdata[i].title = i; gpdata[i][num] = (ele.gpValue*100).toFixed(1)
            //                         } else {
            //                             gpdata[i].title = i; gpdata[i][num] = ele.gpValue.toFixed(1)
            //                         }
            //                     } 
            //                 }
            //             })
            //         })
            //         data2.push(purchaseFee)
            //         data2.push(totalFreightFee)
            //         data2.push(actualPurchaseFee)
            //         data2.push(actualSalesPrice)
            //         data2.push(invoiceCount)
            //         data2.push(siValue)
            //         data2.push(siValuePercent)
            //         data2.push(totalCommissionFee)
            //         data2.push(totalServiceFee)
            //         data2.push(grossrofit)
            //         data2.push(insuranceTotalServiceFee)
            //         data2.push(competitiveProductsPgValue)
            //         data2.push(extensionProductsPgValue)
            //         data2.push(displaceSserviceFee)
            //         data2.push(ohterSserviceFee)
            //         data2.push(derivedGrossrofitSum)

            //         for(let i in gpdata) {
            //             data2.push(gpdata[i])
            //         }
            //         console.log(gpdata)

            //         this.tableData = data2
            //         // this.conversion(data2)
            //     }
            // })
            function queryGp(params) {
                let p = new Promise(function(resolve, reject){
                    api.statement.queryGpInfo(params, (res) => {
                        if(res.data.code === 'success') {
                            resolve(res.data.obj)
                        }
                    })
                })
                return p
            }
            function querySi(params) {
                let p = new Promise(function(resolve, reject){
                    api.statement.querySiInfo(params, (res) => {
                        if(res.data.code === 'success') {
                            resolve(res.data.obj)
                        }
                    })
                })
                return p
            }
            function queryOther(params) {
                let p = new Promise(function(resolve, reject){
                    api.statement.queryOtherInfo(params, (res) => {
                        if(res.data.code === 'success') {
                            resolve(res.data.obj)
                        }
                    })
                })
                return p
            }
            Promise.all([queryGp(_this.query),querySi(_this.query),queryOther(_this.query)])
            .then(function(results) {
                let tempDataOne = results[0]
                let tempDataTwo = results[1]
                let tempDataThree = results[2]
                for(let i = 0; i<tempDataOne.length; i++) {
                    for(let j = 0; j<tempDataTwo.length; j++) {
                        if(tempDataOne[i].month === tempDataTwo[j].month) {
                            for(let k in tempDataTwo[j]) {
                                tempDataOne[i][k] = tempDataTwo[j][k]
                            }
                        }
                    }
                }
                for(let i = 0; i<tempDataOne.length; i++) {
                    for(let j = 0; j<tempDataThree.length; j++) {
                        if(tempDataOne[i].month === tempDataThree[j].month) {
                            for(let k in tempDataThree[j]) {
                                tempDataOne[i][k] = tempDataThree[j][k]
                            }
                        }
                    }
                }
                let data = tempDataOne ? tempDataOne : []

                _this.cardata = data[0].carBrandName ? data[0].carBrandName + ' ' + (data[0].carSeriesName?data[0].carSeriesName:'') : '全部'
                _this.tableYear = _this.query.salesYear
                let data2 = []
                
                let purchaseFee = {title: '车辆采购价格（未税）'}    //车辆采购价格（未税）
                let totalFreightFee = {title: '车辆采购运费（未税）'}    //车辆采购运费（未税）
                let actualPurchaseFee = {title: '车辆实际采购成本（未税）'}    //车辆实际采购成本（未税）
                let actualSalesPrice = {title: '车辆外部销售收入（未税）'}    //车辆外部销售收入（未税）
            
                let invoiceCount = {title: '开票数'}           //开票数
                let siValue = {title: '厂家SI'}                //厂家SI
                let siValuePercent = {title: '厂家SI%'}         //厂家SI%
                let totalCommissionFee = {title: '金融佣金（未税）'}    //金融佣金（未税）
                let totalServiceFee = {title: '金融服务费（未税）'}    //金融服务费（未税）
                let grossrofit = {title: '金融毛利（未税）'}    //金融毛利（未税）
                let insuranceTotalServiceFee = {title: '保险佣金（未税）'}    //保险佣金（未税）
                let competitiveProductsPgValue = {title: '精品商品毛利（未税）'}    //精品商品毛利（未税）
                let extensionProductsPgValue = {title: '延保商品毛利（未税）'}    //延保商品毛利（未税）
                let displaceSserviceFee = {title: '置换手续费（未税）'}    //置换手续费（未税）
                let ohterSserviceFee = {title: '其他服务费毛利（未税）'}    //其他服务费毛利（未税）
                let derivedGrossrofitSum = {title: '衍生类总毛利（未税）'}    //衍生类总毛利（未税）


                // let gp1 = {title: 'GP1'}    //GP1
                // let gp1_rate = {title: 'GP1%'}    //GP1%
                // let gp2 = {title: 'GP2'}    //GP2
                // let gp2_rate = {title: 'GP2%'}    //GP2%
                // let gp3 = {title: 'GP3'}    //GP3
                // let gp3_rate = {title: 'GP3%'}    //GP3%
                // let tgp = {title: 'T.GP'}  //GP4.5
                // let tgp_rate = {title: 'T.GP%'}  //GP4.5%

                let gpdata = {

                }

                _this.gpConfig.forEach((item, index) => {
                    gpdata[item] = {title: item}
                })
                
                // let gptitle = 

                _this.labelMonth = []
                data.forEach((item, index) => {
                    let num = "month" + item.month
                    let labelObj = {
                        label: item.month,
                        props: num
                    }
                    _this.labelMonth.push(labelObj)

                    purchaseFee['title'] = '车辆采购价格（未税）'
                    purchaseFee[num] = Number(item.purchaseFee).toFixed(1)
                    totalFreightFee['title'] = '车辆采购运费（未税）'
                    totalFreightFee[num] = Number(item.totalFreightFee).toFixed(1)
                    actualPurchaseFee['title'] = '车辆实际采购成本（未税）'
                    actualPurchaseFee[num] = Number(item.actualPurchaseFee).toFixed(1)

                    actualSalesPrice['title'] = '车辆外部销售收入（未税）'
                    actualSalesPrice[num] = Number(item.actualSalesPrice).toFixed(1)

                    invoiceCount['title'] = '开票数'
                    invoiceCount[num] = Number(item.invoiceCount).toFixed(1)
                    siValue['title'] = '厂家SI'
                    siValue[num] = Number(item.siValue).toFixed(1)
                    siValuePercent['title'] = '厂家SI%'
                    siValuePercent[num] = (Number(item.siValuePercent)*100).toFixed(3)
                    totalCommissionFee['title'] = '金融佣金（未税）'
                    totalCommissionFee[num] = Number(item.totalCommissionFee).toFixed(1)
                    totalServiceFee['title'] = '金融服务费（未税）'
                    totalServiceFee[num] = Number(item.totalServiceFee).toFixed(1)
                    grossrofit['title'] = '金融毛利（未税）'
                    grossrofit[num] = Number(item.grossrofit).toFixed(1)
                    insuranceTotalServiceFee['title'] = '保险佣金（未税）'
                    insuranceTotalServiceFee[num] = Number(item.insuranceTotalServiceFee).toFixed(1)
                    competitiveProductsPgValue['title'] = '精品商品毛利（未税）'
                    competitiveProductsPgValue[num] = Number(item.competitiveProductsPgValue).toFixed(1)
                    extensionProductsPgValue['title'] = '延保商品毛利（未税）'
                    extensionProductsPgValue[num] = Number(item.extensionProductsPgValue).toFixed(1)
                    displaceSserviceFee['title'] = '置换手续费（未税）'
                    displaceSserviceFee[num] = Number(item.displaceSserviceFee).toFixed(1)
                    ohterSserviceFee['title'] = '其他服务费毛利（未税）'
                    ohterSserviceFee[num] = Number(item.ohterSserviceFee).toFixed(1)
                    derivedGrossrofitSum['title'] = '衍生类总毛利（未税）'
                    derivedGrossrofitSum[num] = Number(item.derivedGrossrofitSum).toFixed(1)

                    // let tgp = this.filterTgp(item.salesProfitGpVos)
                    item.salesProfitGpVos.forEach((ele, index) => {

                        for(let i in gpdata) {
                            if(ele.gpName==i) {
                                if(i.includes('%')) {
                                    gpdata[i].title = i; gpdata[i][num] = (ele.gpValue*100).toFixed(1)
                                } else {
                                    gpdata[i].title = i; gpdata[i][num] = ele.gpValue.toFixed(1)
                                }
                            } 
                        }
                    })
                })
                data2.push(purchaseFee)
                data2.push(totalFreightFee)
                data2.push(actualPurchaseFee)
                data2.push(actualSalesPrice)
                data2.push(invoiceCount)
                data2.push(siValue)
                data2.push(siValuePercent)
                data2.push(totalCommissionFee)
                data2.push(totalServiceFee)
                data2.push(grossrofit)
                data2.push(insuranceTotalServiceFee)
                data2.push(competitiveProductsPgValue)
                data2.push(extensionProductsPgValue)
                data2.push(displaceSserviceFee)
                data2.push(ohterSserviceFee)
                data2.push(derivedGrossrofitSum)

                for(let i in gpdata) {
                    data2.push(gpdata[i])
                }
                console.log(gpdata)

                _this.tableData = data2
            })
        },
        filterTgp: function(data) {
            let tgp;
            if(data) {
                data.forEach((item, index) => {

                })
            }
            return tgp
        },
        // mapMethod: function(val, index) {
        //     // console.log(val)
        // }
    }
}
</script>

<style>
    .names {
        position: absolute
    }
    .month-list {
        position: absolute;
        z-index: 2;
        top: 40px;
        list-style-type: none;
    }
    .el-input .el-input__inner {
        border-radius: 4px !important;
    }
    .el-input__inner {
        min-width: 50px !important;
    }
</style>
