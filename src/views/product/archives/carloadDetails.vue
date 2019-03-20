<template>
    <!-- 整车商品详情 -->
    <div>
        <!-- 基础信息 -->
        <b-card header='车辆基础信息'>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="厂家:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.skuInfoVo.carFactoryName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="品牌:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.skuInfoVo.carBrandName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车系:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.skuInfoVo.carSeriesName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车型:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.skuInfoVo.carModelName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="排量:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.skuInfoVo.displacement" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="进气方式:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.skuInfoVo.inhaleStyle" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车款:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.skuInfoVo.carDisplayName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车款年份:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.skuInfoVo.carStyleYear" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="生产号:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.productionCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车架号:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.carVinNo" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="SKU名称:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.skuName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="生产日期:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.skuInfoVo.productDate" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="底盘号:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.chassisNun" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="发动机号:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.engineCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="外观颜色:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.carAppertanceName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="外观颜色代码:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.carAppertanceCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="内饰颜色:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.carInteriorName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="内饰颜色代码:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.carInteriorCode" />
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <!-- 厂家采购和上报信息 -->
        <b-card header="厂家采购和上报信息">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="供应商:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.supplierName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="标配MSRP（含税）:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.standardMSRPInclusiveTax" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="实际MSRP（含税）:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.actualMSRPInclusiveTax" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="加配价格（含税）:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.carWithInclusiveTax" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="采购税率:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.purchaseRate" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="采购单号:" :label-cols="4" class="text-right">
                        <b-form-input readonly v-model="carloadDetailInfo.orderNo" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="原厂配置:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.originalPlantConfiguration" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="原厂加配:" :label-cols="4" class="text-right">
                        <b-form-input :readonly="isNotEdit" v-model="carloadDetailInfo.skuInfoVo.originalAddition" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="上报厂家日期:" :label-cols="4" class="text-right">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="carloadDetailInfo.skuInfoVo.reportFactoryDate" @change="uploadFactoryChange" :picker-options="pickerOptions" :readonly="isNotEdit">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <!-- 物流信息 -->
        <b-card header="物流信息">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="港口名称:" :label-cols="4" class="text-right">
                        <b-form-input v-model="carloadDetailInfo.skuInfoVo.portName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="关单到店日期:" :label-cols="4" class="text-right">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="carloadDetailInfo.skuInfoVo.relationStoreDate" @change="relaDateChange">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="关单号:" :label-cols="4" class="text-right">
                        <b-form-input v-model="carloadDetailInfo.skuInfoVo.relationOrderNo" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="厂商禁止销售日期:" :label-cols="4" class="text-right">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="carloadDetailInfo.skuInfoVo.factoryNoSalesDate" @change="factoryForbidSaleChange">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="合格证到店日期:" :label-cols="4" class="text-right">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="carloadDetailInfo.skuInfoVo.certificateStoreDate" @change="certiToStoreChange">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="合格证号:" :label-cols="4" class="text-right">
                        <b-form-input v-model="carloadDetailInfo.skuInfoVo.certificateCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="申请允许销售日期:" :label-cols="4" class="text-right">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="carloadDetailInfo.skuInfoVo.applyCanSalesDate">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="批发日期:" :label-cols="4" class="text-right">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="carloadDetailInfo.skuInfoVo.wholesaleDate" @change="wholesaleDateChange">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="批发付款到期日:" :label-cols="4" class="text-right">
                        <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="carloadDetailInfo.skuInfoVo.wholesalePayDate" @change="wholesalePayDateChange">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商检单号:" :label-cols="4" class="text-right">
                        <b-form-input v-model="carloadDetailInfo.skuInfoVo.commodityInspectionCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商检单到店日期:" :label-cols="4" class="text-right">
                        <b-form-input v-model="carloadDetailInfo.skuInfoVo.commodityInspectionCodeArrivlaDate" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="仓库名称" :label-cols="4" class="text-right">
                        <b-form-select v-model="carloadDetailInfo.skuInfoVo.whCode" :options="entreList" disabled></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="管线中:" :label-cols="4" label-text-align="right">
                        <date-picker v-model="carloadDetailInfo.skuInfoVo.pipelineTime" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :readonly="isNotEdit">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="运输中:" :label-cols="4" label-text-align="right">
                        <date-picker v-model="carloadDetailInfo.skuInfoVo.transportTime" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :readonly="isNotEdit">
                        </date-picker>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <!-- 其他信息 -->
        <b-card header="车辆其他信息">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="钥匙号:" :label-cols="4" class="text-right">
                        <b-form-input v-model="carloadDetailInfo.skuInfoVo.keyNo" :readonly="isNotEdit" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="建议经销商PDI日期:" :label-cols="4" class="text-right">
                        <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="carloadDetailInfo.skuInfoVo.recommendDealerPdiDate" :readonly="isNotEdit">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="经销商PDI完成日期:" :label-cols="4" class="text-right">
                        <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="carloadDetailInfo.skuInfoVo.dealerPdicompletiondate" :readonly="isNotEdit">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="经销商PDI结果:" :label-cols="4" label-text-align="right">
                        <b-form-select :options="pdiItem" v-model="carloadDetailInfo.skuInfoVo.dealerPdiResults" :disabled="isNotEdit">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <b-form-fieldset horizontal label="车辆受损情况:" :label-cols="2" label-text-align="right">
                        <b-form-textarea :rows="3" :max-rows="6" v-model="carloadDetailInfo.skuInfoVo.vehicleDamage" />
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <b-card header="车辆状态">
            <div class="row">
                <div class="col-md-3">
                    <p class="text-center">物流状态：&ensp;
                        <span>{{carloadDetailInfo.skuInfoVo.logisticsStatus == '-1' ? '采购待确认' : (carloadDetailInfo.skuInfoVo.logisticsStatus == '1' ? '在途' : '入库' )}}</span>
                    </p>
                </div>
                <div class="col-md-3">
                    <p class="text-center">锁定状态：&ensp;
                        <span>{{carloadDetailInfo.skuInfoVo.lockStatus == '1'
                                ?(carloadDetailInfo.skuInfoVo.lockSubStatus=='1'
                                ?'集团/经销商锁定'
                                :(carloadDetailInfo.skuInfoVo.lockSubStatus=='0'?'销售锁定'
                                :(carloadDetailInfo.skuInfoVo.lockSubStatus=='2'?'厂家锁定'
                                :'调拨锁定')))
                                :'未锁定'}}</span>
                    </p>
                </div>
                <div class="col-md-3">
                    <p class="text-center">销售状态：&ensp;<span>{{ carloadDetailInfo.skuInfoVo.salesStatus == '-1' ? '不可销售' : (carloadDetailInfo.skuInfoVo.salesStatus == '0' ? '可销售' : '已销售') }}</span></p>
                </div>
            </div>
        </b-card>
        <div class="row" v-if="!isNotEdit">
            <div class="col-md-12">
                <div class="pull-right">
                    <b-button v-if="updateBtn" size="sm" variant="primary" @click="saveData">保存</b-button>
                    <b-button size="sm" @click="backAction">取消</b-button>
                </div>
            </div>
        </div><br/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {
        DatePicker,
        CarouselItem,
        Carousel
    } from 'element-ui'
    import { hasBtn } from 'common/com-api'
    import api from 'common/api'
    import apiUrls from 'common/api-url'
    import {
        mapActions,
        mapState
    } from 'vuex';
    import {
        Loading,
        Message
    } from 'element-ui'
    Vue.use(DatePicker)
    export default {
        components: {
            CarouselItem,
            Carousel,
            DatePicker
        },
        mounted() {
            this.getCarloadDetail()
        },
        data() {
            return {
                pdiItem: ['待处理', '完成', '未通过'],
                carloadDetailInfo: {
                    skuInfoVo: {
                        skuAddInfoVoList:[]
                    }
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                }
            }
        },
        methods: {
            // 获取整车详情
            getCarloadDetail: function() {
                const $this = this
                let params = {
                    'skuCode': $this.$route.params.id
                }
                $this.getCarloadDetailInfo(params)
            },
            //保存
            saveData: function() {
                const $this = this
                //扩展信息转为keymap
                let map = {};
                if($this.carloadDetailInfo.skuInfoVo.skuAddInfoVoList){
                    $this.carloadDetailInfo.skuInfoVo.skuAddInfoVoList.forEach(element => {
                    let keyName = element['addCode']
                    let valueName = element['addValue']
                    map[keyName] = valueName
                    });
                }

                //定义页面上显示了哪些扩展信息
                var arrAddInfo = {
                    //底盘号
                    chassisNun:{
                        addCode:'chassisNun',
                        addValue:'',
                        addName:'底盘号'
                    },
                    //发动机号
                    engineCode:{
                        addCode:'engineCode',
                        addValue:'',
                        addName:'发动机号'
                    },
                    //外观颜色
                    carAppertanceName:{
                        addCode:'carAppertanceName',
                        addValue:'',
                        addName:'发动机号'
                    },
                    //外观颜色代码
                    carAppertanceCode:{
                        addCode:'carAppertanceCode',
                        addValue:'',
                        addName:'外观颜色代码'
                    },
                    //内饰颜色
                    carInteriorName:{
                        addCode:'carInteriorName',
                        addValue:'',
                        addName:'外观颜色代码'
                    },
                    //内饰颜色代码
                    carInteriorCode:{
                        addCode:'carInteriorCode',
                        addValue:'',
                        addName:'内饰颜色代码'
                    },
                    //标准MSRP(含税)
                    actualMSRPInclusiveTax:{
                        addCode:'actualMSRPInclusiveTax',
                        addValue:'',
                        addName:'标准MSRP(含税)'
                    },
                    //实际MSRP不包含税
                    actualMSRPOutTax:{
                        addCode:'actualMSRPOutTax',
                        addValue:'',
                        addName:'实际MSRP不包含税'
                    },
                    //加配价格(含税)
                    carWithInclusiveTax:{
                        addCode:'carWithInclusiveTax',
                        addValue:'',
                        addName:'加配价格(含税)'
                    },
                    //原厂配置
                    originalPlantConfiguration:{
                        addCode:'originalPlantConfiguration',
                        addValue:'',
                        addName:'原厂配置'
                    },
                    //原厂加配
                    originalAddition:{
                        addCode:'originalAddition',
                        addValue:'',
                        addName:'原厂加配'
                    },
                    //上报厂家日期
                    reportFactoryDate:{
                        addCode:'reportFactoryDate',
                        addValue:'',
                        addName:'上报厂家日期'
                    },
                    //港口名称
                    portName:{
                        addCode:'portName',
                        addValue:'',
                        addName:'港口名称'
                    },
                    //关单到店日期
                    closeOrderToStoreDate:{
                        addCode:'closeOrderToStoreDate',
                        addValue:'',
                        addName:'关单到店日期'
                    },
                    //关单号
                    closeOrderCode:{
                        addCode:'closeOrderCode',
                        addValue:'',
                        addName:'关单号'
                    },
                    //厂商禁止销售日期
                    factoryNoSalesDate:{
                        addCode:'factoryNoSalesDate',
                        addValue:'',
                        addName:'厂商禁止销售日期'
                    },
                    //合格证到店日期
                    certificateNumArrivalDate:{
                        addCode:'certificateNumArrivalDate',
                        addValue:'',
                        addName:'合格证到店日期'
                    },
                    //合格证号
                    certificateCode:{
                        addCode:'certificateCode',
                        addValue:'',
                        addName:'合格证号'
                    },
                    //申请允许销售日期
                    applyCanSalesDate:{
                        addCode:'applyCanSalesDate',
                        addValue:'',
                        addName:'申请允许销售日期'
                    },
                    //批发日期
                    wholesaleDate:{
                        addCode:'wholesaleDate',
                        addValue:'',
                        addName:'批发日期'
                    },
                    //批发付款到期日
                    wholesalePayDate:{
                        addCode:'wholesalePayDate',
                        addValue:'',
                        addName:'批发付款到期日'
                    },
                    //商检单号
                    commodityInspectionCode:{
                        addCode:'commodityInspectionCode',
                        addValue:'',
                        addName:'商检单号'
                    },
                    //商检单到店日期
                    commodityInspectionCodeArrivlaDate:{
                        addCode:'commodityInspectionCodeArrivlaDate',
                        addValue:'',
                        addName:'商检单到店日期'
                    },
                    //商检单到店日期
                    keyNo:{
                        addCode:'keyNo',
                        addValue:'',
                        addName:'钥匙号'
                    },
                    //建议经销商PDI日期
                    recommendDealerPdiDate:{
                        addCode:'recommendDealerPdiDate',
                        addValue:'',
                        addName:'建议经销商PDI日期'
                    },
                    //经销商PDI结果
                    dealerPdiResults:{
                        addCode:'dealerPdiResults',
                        addValue:'',
                        addName:'经销商PDI结果'
                    },
                    //车辆受损情况
                    vehicleDamage:{
                        addCode:'vehicleDamage',
                        addValue:'',
                        addName:'车辆受损情况'
                    }
                }

                for(let key in arrAddInfo){
                    if(!map.hasOwnProperty(key)){
                        arrAddInfo[key].addValue = $this.carloadDetailInfo.skuInfoVo[key]
                        arrAddInfo[key].skuCode = $this.carloadDetailInfo.skuInfoVo.skuCode
                        arrAddInfo[key].createOrgCode = $this.carloadDetailInfo.skuInfoVo.createOrgCode
                        $this.carloadDetailInfo.skuInfoVo.skuAddInfoVoList.push(arrAddInfo[key])
                    }
                }

                if($this.carloadDetailInfo.skuInfoVo.lockSubStatus == -1) {
                    $this.updateCarloadDetail({
                        params: $this.carloadDetailInfo,
                        callBack: () => {
                            Message({
                                type: 'success',
                                message: "数据保存成功"
                            });
                            $this.getCarloadDetail()
                        }
                    })
                }else {
                    Message({
                        type: 'warning',
                        message: "该商品已被订单锁定,请联系销售顾问或撤回订单后再编辑"
                    });
                }
            },
            //返回
            backAction: function() {
                this.$router.go(-1)
            },
            // 上报厂家时间
            uploadFactoryChange: function(date) {
                this.carloadDetailInfo.skuInfoVo.reportFactoryDate = date
            },
            // 批发付款到期日
            wholesalePayDateChange: function(date) {
                this.carloadDetailInfo.skuInfoVo.wholesalePayDate = date;
            },
            // 关单到店日期
            relaDateChange: function(date) {
                this.carloadDetailInfo.skuInfoVo.relationStoreDate = date;
            },
            // 厂商禁止销售
            factoryForbidSaleChange: function(date) {
                this.carloadDetailInfo.skuInfoVo.factoryNoSalesDate = date;
            },
            // 合格证到店
            certiToStoreChange: function(date) {
                this.carloadDetailInfo.skuInfoVo.certificateStoreDate = date;
            },
            // 申请允许销售
            applySaleChange: function(date) {
                this.carloadDetailInfo.skuInfoVo.applyCanSalesDate = date;
            },
            //批发日期
            wholesaleDateChange: function(date) {
                this.carloadDetailInfo.skuInfoVo.wholesaleDate = date;
            },
            // 建议经销商PDI日期
            suggestPdiChange: function(date) {
                this.carloadDetailInfo.skuInfoVo.recommendDealerPdiDate = date;
            },
            // 经销商PDI完成日期
            finishPdiChange: function(date) {
                this.carloadDetailInfo.skuInfoVo.dealerPdicompletiondate = date;
            },
            compareDate: function(startDate, endDate) {
                //全为null
                if (!startDate && !endDate) return true
                // 2018-06-06
                if (startDate.length === endDate.length) {
                    let startDate = new Date(startDate)
                    let endDate = new Date(endDate)
                    // 时间戳
                    let startTime = startDate.getTime()
                    let endTime = endDate.getTime()
                    alert(startTime)
                    alert(endTime)
                    if (endTime < startTime) {
                        return false
                    } else {
                        return true
                    }
                }
            },
            ...mapActions('archives', [
                'getCarloadDetailInfo', // 获取商品详情
                'updateCarloadDetail' // 更新商品详情
            ])
        },
        computed: {
            updateBtn() {
                return hasBtn(apiUrls.product.archives.updateCarloadDetailInfo)
            },
            ...mapState('archives', [
                'carloadDetail',
                'isNotEdit',
                'entreList'
            ]),
        },
        watch: {
            carloadDetail: {
                handler(obj) {
                    let _this = this
                    _this.carloadDetailInfo = JSON.parse(JSON.stringify(obj))
                },
                deep: true
            }
        }
    }
</script>
<style lang="scss" scoped>
    .text-end {
        justify-content: 'center'
    }
</style>


