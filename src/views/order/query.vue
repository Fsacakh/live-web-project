<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="查询">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                            <area-tree ref="area"
                                        @sales-data="getSales"
                                        @select-change="selectChange"
                                        :storeAll='true'
                            ></area-tree>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="销售顾问" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.salesEmpName" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="订单号" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.orderNo" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="客户" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.custName" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="手机号" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.custMobile" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="生产及车架号" :label-cols="4" class="text-right">
                            <div class="col-md-12">
                                <div class="row">
                                    <b-form-input  class="col-md-6" v-model="queryParams.searchVinCode" placeholder="请输入车架号"/>
                                    <b-form-input  class="col-md-6" v-model="queryParams.productionNo" placeholder="请输入生产号"/>
                                </div>
                            </div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="当前审批状态" :label-cols="4" class="text-right">
                            <b-form-select v-model="wfStatus" :options="statusList">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 order">
                        <b-form-fieldset horizontal label="订单类型" :label-cols="4" class="text-right">
                            <el-select class="col-md-12" @change="changOrderType" v-model="queryParams.carOrderTypes" multiple placeholder="请选择">
                                <el-option
                                v-for="item in orderTypes"
                                :key="`${item.value}`"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="开票交车状态" :label-cols="4" class="text-right">
                            <div class="col-md-12">
                                <div class="row">
                                    <b-form-select class="col-md-6" v-model="queryParams.invoiceStatus" :options="makePriceType" placeholder="请选择开票状态">
                                    </b-form-select>
                                    <b-form-select class="col-md-6" v-model="queryParams.closingFlag" :options="closingFlagType" :select-size="1" placeholder="请选择交车状态">
                                    </b-form-select>
                                </div>
                            </div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="首次签署日期" :label-cols="4" class="text-right">
                            <el-date-picker 
                            v-model="carOrderFirstPassTime" 
                            type="daterange" 
                            :clearable="true"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            placeholder="选择日期" 
                            >
                            </el-date-picker>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="实际交车时间段" label-text-align="right" :label-cols="4">
                            <el-date-picker
                                v-model="actualTime"
                                type="daterange"
                                :clearable="true"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                placeholder="选择日期"
                                >
                            </el-date-picker>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="整车开票时间段" label-text-align="right" :label-cols="4">
                            <el-date-picker
                                v-model="invoiceTime"
                                type="daterange"
                                :clearable="true"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                placeholder="选择日期"
                                >
                            </el-date-picker>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-12" v-show="showMore">
                        <div class="row">
                            <div class="col-md-6">
                                <b-form-fieldset horizontal label="预计交车时间" :label-cols="4" class="text-right">
                                    <el-date-picker v-model="time" type="date" placeholder="选择日期" >
                                    </el-date-picker>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6">
                                <b-form-fieldset horizontal label="报价单创建时间段" label-text-align="right" :label-cols="4">
                                    <el-date-picker
                                        v-model="createTime"
                                        type="daterange"
                                        :clearable="true"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        placeholder="选择日期"
                                        >
                                    </el-date-picker>
                                </b-form-fieldset>
                            </div>
                            <div class="col-md-6">
                                <b-form-fieldset horizontal label="最后审批通过时间段" label-text-align="right" :label-cols="4">
                                    <el-date-picker
                                        v-model="auditTime"
                                        type="daterange"
                                        :clearable="true"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        placeholder="选择日期"
                                        >
                                    </el-date-picker>
                                </b-form-fieldset>
                            </div>
                        </div>
                        <iris-car :flag="isStartByBrand" :col="2" @callBack="getCarInfo" ref="car"></iris-car>
                </div>
                <div class="col-md-12">
                    <b-form-fieldset horizontal :label-cols="1" class="text-right">
                        <!-- <b-button size="sm" @click="showClick">{{ showMore ? '收起' : '搜索更多'}}</b-button> -->
                        <div @click="showClick" class="icon">
                            <span v-if="showMore">收起 <i class="fa fa-angle-double-up fa-1x" ></i></span>
                            <span v-else-if="!showMore">更多搜索 <i class="fa fa-angle-double-down fa-1x" ></i></span>
                        </div>
                    </b-form-fieldset>
                </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <search-btn @reset="reset" @query="query"></search-btn>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</template>
<script>
import orderConfig from './config.js'
import AreaTree from 'components/iris-areaqueryshop/index'
import SearchBtn from 'components/searchBtn/searchBtn'
import IrisCar from 'components/iris-car/index'
import {formatDate} from 'common/com-api'
import api from 'common/api'
import config from 'common/config'
import common from 'common/common'
import {mapActions} from 'vuex'
import Vue from 'vue'
import { DatePicker, Select, Option } from 'element-ui'
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
export default {
    components: {
        AreaTree,
        IrisCar,
        SearchBtn,
    },
    data() {
        return {
            orderTypes: orderConfig.orderTypes,
            makePriceType: orderConfig.makePriceType,//开票状态类型
            closingFlagType: orderConfig.closingFlagType, //交车状态类型
            showMore: false,
            statusList: orderConfig.statusList,
            auditTime:'', //审批通过时间段
            createTime: '', // 订单创建时间段
            carOrderFirstPassTime: '',
            actualTime: '', // 实际交车时间段
            invoiceTime:'', //整车开票时间段
            time: '',
            queryParams: {
                auditStartTime:'', //审批通过时间-开始
                auditEndTime:'', //审批通过时间-结束
                carInvoiceStartTime:'',//整车开票时间-开始
                carInvoiceEndTime:'', //整车开票时间-结束
                createStartTime: '', // 整车订单创建开始时间
                createEndTime: '', // 整车订单创建结束时间
                closeStartTime: '', // 整车订单实际交车开始时间
                closeEndTime: '', // 整车订单实际交车结束时间
                carOrderFirstPassStartTime: '', //首签开始时间
                carOrderFirstPassEndTime: '',  //首签结束时间
                salesEmpName: '',
                orderNo: '',
                custName: '',
                custMobile: '',
                wfStatusSet: [],
                closingFlag: '', //交车类型
                carOrderTypes:[], //订单类型
                invoiceStatus: '', //开票类型
                searchVinCode: '', //车架号
                productionNo: '', //生产号码
                bookingClosingDate: '',
                pageStart: 1,
                pageNums: config.pageNums,
                storeCodeSet: []
            },
            wfStatus: 3,
            storeCode: [],
            isStartByBrand: config.isShowFactory,
            list:{},
        }
    },
    methods: {
        changOrderType(){},
        showClick(){
            this.showMore = !this.showMore
        },
        getSales() {},
        selectChange(d, stores) {
            if(Array.isArray(stores) === true) {
                this.storeCode = []
                stores.forEach(item => {
                    this.storeCode.push(item.value)
                })
            }

            if(stores.value === 0) {
                this.storeCode = []
            }else if(stores.hasOwnProperty('value')) {
                this.storeCode = []
                this.storeCode[0] = stores.value
            }
        },
        getCarInfo(data) {
            this.queryParams.searchFactoryCode = data.factoryCode //厂家
            this.queryParams.searchBrandCode = data.brandCode     //品牌
            this.queryParams.searchSeriesCode = data.seriesCode   //车系
            this.queryParams.searchModelCode = data.modelCode     //车型
            this.queryParams.searchCarCode = data.carCode               //车款
        },
        reset() {
            // 注意权限 重置( 不可以重置当前门店 ) => 门店权限
            this.time = ''
            this.auditTime = ''//审批通过时间段
            this.createTime = ''
            this.actualTime = ''
            this.invoiceTime = ''//整车开票时间段
            this.carOrderFirstPassTime = ''
            this.queryParams = {
                auditStartTime:'', //审批通过时间-开始
                auditEndTime:'', //审批通过时间-结束
                carInvoiceStartTime:'',//整车开票时间-开始
                carInvoiceEndTime:'', //整车开票时间-结束
                carOrderFirstPassStartTime: '', //首签时间-开始
                carOrderFirstPassEndTime: '', //首签时间-结束
                salesEmpName: '',
                orderNo: '',
                custName: '',
                custMobile: '',
                searchVinCode: '',
                closingFlag: '', //交车类型
                invoiceStatus:'',
                orderType:[], //订单类型
                productionNo: '', //生产号码
                carOrderTypes: [],
                bookingClosingDate: '',
                searchFactoryCode: '',
                searchBrandCode: '',
                searchSeriesCode: '',
                searchModelCode: '',
                carCode: '',
                pageStart: 1,
                pageNums: config.pageNums
            }
            this.$data.wfStatus = 3
            this.$refs.car.clear()
            this.orderStatus = ''
            this.queryParams.storeCodeSet = this.storeCode
            // delete this.queryParams.wfStatus
            // delete this.queryParams.wfStatus
            // delete this.queryParams.wfStatus
        },
        query(page = 1) {
            this.queryParams.wfStatusSet = orderConfig.statusList.find((item) => {
                  return this.$data.wfStatus == item.value    
            }).arr
            this.queryParams.storeCodeSet = this.storeCode
            this.queryParams.bookingClosingDate = formatDate(this.time)
            this.queryParams.auditStartTime = formatDate(this.auditTime[0])
            this.queryParams.auditEndTime = formatDate(this.auditTime[1])
            this.queryParams.carInvoiceStartTime = formatDate(this.invoiceTime[0])
            this.queryParams.carInvoiceEndTime = formatDate(this.invoiceTime[1])

            this.queryParams.createStartTime = formatDate(this.createTime[0])
            this.queryParams.createEndTime = formatDate(this.createTime[1])
            this.queryParams.closeStartTime = formatDate(this.actualTime[0])
            this.queryParams.closeEndTime = formatDate(this.actualTime[1])
            this.queryParams.carOrderFirstPassStartTime = formatDate(this.carOrderFirstPassTime[0])
            this.queryParams.carOrderFirstPassEndTime = formatDate(this.carOrderFirstPassTime[1])

            this.queryParams.pageStart = page
           api.order.queryList(this.queryParams).then(res => {
		        if (res.data.code === 'success') {
		            this.list = res.data.obj;
                    this.$emit('queryObj', this.list)
		        }
		    })
            this.$emit('query', this.queryParams)

        },
        ...mapActions({
            setOrderObj: 'order/setOrderObj'
        })
    },
    watch: {
        // 根据订单状态的不同 分别传递不同的参数字段
        orderStatus(val) {
            if(val) {
                const value = JSON.parse(val)
                if(value.wfStatus !== undefined) {
                    delete this.queryParams.wfTypeCode
                    delete this.queryParams.closingFlag
                    this.queryParams.wfStatus = value.wfStatus
                    if(value.wfTypeCode) {
                        delete this.queryParams.closingFlag
                        this.queryParams.wfTypeCode = value.wfTypeCode
                    }
                }else if(value.closingFlag !== undefined) {
                    delete this.queryParams.wfStatus
                    delete this.queryParams.wfTypeCode
                    this.queryParams.closingFlag = value.closingFlag
                }
            }
        }
    }
}
</script>
<style scoped lang='scss'>
.order{
    .col-md-12{
        padding-left: 0;
        padding-right: 0;
        & /deep/ .el-input .el-input__inner{
            border-radius: 4px !important;
        }
    }
 }
 
 input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #96A8BD;
}
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    #96A8BD;
}
input::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:    #96A8BD;
}
input:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:    #96A8BD;
}
.icon {
    color: #999;
    .fa-angle-double-down:before{
        color: #999;
    }
    .fa-angle-double-up:before{
        color: #999;
    }
}
</style>
