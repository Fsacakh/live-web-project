<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="线索信息">
                <div class="row">
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="归属门店 *" :label-cols="4" class="text-right">
                            <areaShop ref="area" @select-change="areaShop"></areaShop>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="联系电话 *" label-text-align="right" :label-cols="4">
                            <div class="row">
                                <div class="col-md-9">
                                    <b-form-input :maxlength="11" :state="needMust.mobilePhoneStatus" width="80%" type="number" v-model="submitInfo.mobilePhone" v-on:blur="telChange(submitInfo.mobilePhone, $event)" @change="telChange(submitInfo.mobilePhone, $event)" />
                                </div>
                                <div class="col-md-3">
                                    <b-button @click="checkMobile(submitInfo.mobilePhone)" class="ml-1 btn-sm pull-right" type="button" variant="primary">检索</b-button>
                                </div>
                            </div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="客户姓名 *" :label-cols="4" class="text-right">
                            <b-form-input type="tel" :maxlength="6" :state="needMust.customNameStatus" v-model="submitInfo.customName" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="性别" :label-cols="4" class="text-right">
                            <b-form-select v-model="submitInfo.customGender" :options="sex">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="现有车辆" :label-cols="4" class="text-right">
                            <b-form-input v-model="submitInfo.existCarInfoVos[0].displayName" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="拥车时间" value-format="yyyy-MM-dd" :label-cols="4" class="text-right">
                            <b-form-input placeholder="拥有车辆月数" type="text" :maxlength="3" v-model="submitInfo.havaCarPeriod" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="渠道 *" :label-cols="4" class="text-right">
                            <b-form-select
                                :state="needMust.channelCodeStatus"
                                v-model="submitInfo.channelCode"
                                :options="channelMode">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="来源分类" :label-cols="4" class="text-right">
                            <b-form-select v-model="sourceCode" :options="sourceMode">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="来源明细" :label-cols="4" class="text-right">
                            <b-form-select v-model="referenceCode" :options="referenceMode">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <!-- 名单状态 -->
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="名单状态" :label-cols="4" class="text-right">
                            <b-form-select :disabled="(submitInfo.storeCode?false:true)||(editStatus&&(firstLeadType===1))" v-model="submitInfo.leadType" :options="status">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <!-- 无效原因 -->
                    <div class="col-md-4" v-show="this.submitInfo.leadType == 0">
                        <b-form-fieldset horizontal label="无效原因" :label-cols="4" class="text-right">
                            <b-form-select v-model="submitInfo.invalidReason" :options="invalidReasonOpt">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <!-- 客户类型 -->
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="客户类型" :label-cols="4" class="text-right">
                            <b-form-select v-model="submitInfo.customType" :options="customTypeOpts" disabled>
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <!-- 客户公司 -->
                    <div class="col-md-4" v-show="submitInfo.customType == 'customTypeIndividualCus' ? cusTomShow == false:cusTomShow == true">
                        <b-form-fieldset horizontal label="客户公司" :label-cols="4" class="text-right">
                            <b-form-input v-model="submitInfo.companyName" :options="conpanyOpt" disabled />
                        </b-form-fieldset>
                    </div>
                </div>
                <hr/>
                <!-- 名单状态为待甄别线索状态时显示 -->
                <div v-show="submitInfo.leadType != 0">
                    <h5>购车信息</h5>
                    <car-component
                        :initData="intentionCarInfoVos[0]"
                        ref="car"
                        @callBack="back"
                        @validete="validateCar"
                        :disabled="submitInfo.leadType == - 2 ? true : false">
                    </car-component>
                    <div class="row">
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="预计购车时间" :label-cols="4" class="text-right">
                                <el-date-picker v-model="submitInfo.estimatedBuyCarTime" type="date" placeholder="选择日期" :picker-options="pickerOptionsFuture" start-placeholder="" :disabled="submitInfo.leadType == 1 ? isdisabled == true:isdisabled == false ">
                                </el-date-picker>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="意向级别 *" :label-cols="4" class="text-right">
                                <b-form-select :state="intentionLevelCodeStatus" v-model="submitInfo.intentionLevelCode" :options="intentionLeveOption" :disabled="submitInfo.leadType == 1 ? isdisabled == true:isdisabled == false "></b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="是否试乘试驾" :label-cols="4" class="text-right">
                                <b-form-select v-model="submitInfo.tryDriveFlag" :options="[{text:'不需要试驾',value:0},{text:'需要试驾',value:1}]" :disabled="submitInfo.leadType == 1 ? isdisabled == true:isdisabled == false "></b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="是否有二手车" :label-cols="4" class="text-right">
                                <b-form-select v-model="submitInfo.usedCarFlag" :options="[{text:'没有二手车',value:0},{text:'有二手车',value:1}]" :disabled="submitInfo.leadType == 1 ? isdisabled == true:isdisabled == false "></b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="是否需要金融" :label-cols="4" class="text-right">
                                <b-form-select v-model="submitInfo.financeFlag" :options="[{text:'不需要金融',value:0},{text:'需要金融',value:1}]" :disabled="submitInfo.leadType == 1 ? isdisabled == true:isdisabled == false "></b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="下次跟进时间" :label-cols="4" class="text-right">
                                <el-date-picker v-model="submitInfo.estimatedNextFollowTime" type="date" placeholder="选择日期" :picker-options="pickerOptionsFuture">
                                </el-date-picker>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <hr/>
                    <h5>预约</h5>
                    <div class="row">
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="预约销售顾问" :label-cols="4" class="text-right">
                                <b-form-select :state="scCodeStatus" :disabled="submitInfo.leadStatusCode === 1 || (submitInfo.leadType == 1 ? isdisabled == true:isdisabled == false)" v-model.trim="appointmentInfoVos[0].scCode" :options="appointmentInfoOption" >
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="预约到店时间" :label-cols="4" class="text-right" :class="{ red: isred}">
                                <el-date-picker v-model.trim="appointmentInfoVos[0].appointmentTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptionsFuture" :disabled="submitInfo.leadType == 1 ? isdisabled == true:isdisabled == false ">
                                </el-date-picker>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="是否无效线索" :label-cols="4" class="text-right">
                                <b-form-select v-model="submitInfo.leadStatusCode" :options="[{text:'有效线索',value:0},{text:'无效线索',value:1}]" :disabled="submitInfo.leadType == 1 ? isdisabled == true:isdisabled == false ">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4" v-show="submitInfo.leadStatusCode == 1 && submitInfo.uselessReasonCode == uselessReasonCode">
                            <b-form-fieldset horizontal label="其他品牌车辆信息" :label-cols="4" class="text-right">
                                <b-form-input v-model="submitInfo.uselessRemark" :disabled="submitInfo.leadType == 1 ? isdisabled == true:isdisabled == false " />
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="未进店原因" :label-cols="4" class="text-right">
                                <b-form-select :options="notArrivedReasonOpt" v-model="submitInfo.notArrivedReason"  :disabled="submitInfo.leadType == 1 ? isdisabled == true:isdisabled == false " />
                            </b-form-fieldset>
                        </div>
                    </div>
                    <hr/>
                    <!-- 到店情况 -->
                    <template v-show="submitInfo.leadType != 0">
                        <h5>到店情况</h5>
                        <v-reachstore ref="reachStore"></v-reachstore>
                        <hr/>
                    </template>
                    <h5>跟进记录</h5>
                    <div class="row" v-for="(item, index) in followArr" :key="index">
                        <div class="col-md-4">
                          <b-form-fieldset horizontal :label="'跟进记录' + (index + 1)" :label-cols="4" class="text-right" :class="{ red: isred}">
                              <el-date-picker v-model="item.followTime" type="date" placeholder="选择日期" disabled>
                              </el-date-picker>
                          </b-form-fieldset>
                        </div>
                        <div class="col-md-4">
                            <b-form-fieldset horizontal label="跟进方式" :label-cols="4" class="text-right">
                                <b-form-select v-model="item.followTypeCode" :disabled="item.disabledType || item.id !== undefined ? true : false" :options="follType">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-4 elehidden">
                            <b-form-fieldset horizontal label="跟进备注" :label-cols="4" class="text-right">
                                <textarea class="follTextwArea1"></textarea>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-8">
                            <b-form-fieldset horizontal label="跟进备注" :label-cols="2" class="text-right">
                                <textarea class="follTextwArea" v-model="item.remark" maxlength="80" :disabled="item.disabledType || item.id !== undefined ? true : false"></textarea>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <!--addFollow 在新增得时候需要调用一个时间计算，所以这里穿一个0方便判断-->
                    <b-button @click="addFollow(0, 'add')" class="ml-1 btn-sm pull-right" type="button" variant="success" :disabled="newAdd">新增</b-button>
                    <div class="blankArea"></div>
                    <hr/>
                    <template v-show="submitInfo.leadType != 0">
                        <h5>市场活动相关</h5>
                        <div class="row">
                            <div class="col-md-12">
                                <b-table striped hover bordered show-empty :fields="fields" :items="listRelationInfos">
                                    <template slot="time" slot-scope="data">
                                        {{ data.item.startTime | switchDate }} ~
                                        {{ data.item.endTime | switchDate }}
                                    </template>
                                    <template slot="invitationStatus" slot-scope="data">
                                        {{ data.item.attendFlag == 1 ? '已出席': (data.item.invitationStatus == 0 ? '待邀约': (data.item.invitationStatus == 1 ? '邀约成功': (data.item.invitationStatus == -1 ? '邀约未成功': '')))}}
                                    </template>
                                    <template slot="operate" slot-scope="data">
                                        <a href="#" @click.prevent="showMarketModal(data.item.relationCode)">查看</a>
                                    </template>
                                    <template slot="empty">
                                        暂无数据...
                                    </template>
                                </b-table>
                            </div>
                        </div>
                    </template>
                    <hr />
                </div>
                <b-button @click="save()" :disabled="isSaveTel" class="ml-1 btn-sm pull-right" type="button" variant="primary">保存</b-button>
            </b-card>
            <market-modal ref="marketModal"></market-modal>
        </div>
    </div>
</template>
<script>
    import SearchBtn from "components/searchBtn/searchBtn";
    import Vue from "vue";
    import api from "common/api";
    import common from "common/common.js";
    import config from "common/config";
    import carComponent from "./car.vue";
    import areaShop from '../../components/iris-areaqueryshop';
    import VReachstore from './reachStore'
    import marketModal from './marketModal';
    import {
        MessageBox,
        Message,
        DatePicker
    } from "element-ui";
    Vue.component(MessageBox.name, MessageBox, DatePicker);
    Vue.use(DatePicker);
    export default {
        data() {
            return {
                updateBy: '',
                createBy: '',
                leadCode: '',
                initServerTime: '', //初始化得服务器时间戳
                newSalesLeadFollowInfoVos: '',
                buyCar: true,  //购车信息是否禁止修改
                followTimeOpt: [], //跟进方式
                notArrivedReasonOpt: [], //新增无效原因
                cusTomShow: true, //客户公司名称显示
                customTypeOpts: [], //客户类型
                invalidReasonOpt: [], //无效原因
                conpanyOpt: [], //客户公司
                selected: null,
                conpanyOpts: '',
                newAdd: false, //是否禁止点击
                isdisabled: false,  //是否禁止修改
                readonly: false, //是否设置只读
                follType: [],  //跟进方式
                followArr: [], // 跟进记录信息
                invalidCode: [{
                  value: 0,
                  text: '错误电话'
                }],  //无效原因
                editStatus: false, // 编辑状态
                isShow: false,  //跟进记录是否可编辑
                followTime: null, //设置跟进事件
                firstLeadType: '', // 第一次编辑进入时状态值
                reachStoreInfo: {},
                //时间设置
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                // 选择时间设置
                pickerOptionsFuture: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 86400000;
                    }
                },
                mapArr: ['factory', 'brand', 'serise', 'model', 'car'],
                needMust: {
                    storeCodeStatus: null,
                    mobilePhoneStatus: null, //电话号码状态
                    customNameStatus: null, //客户姓名状态
                    channelCodeStatus: null  //渠道状态
                },
                intentionLevelCodeStatus: null, //意向级别
                scCodeStatus: null, //预约销售顾问
                addOrEdit: false, //新增 还是编辑
                // 性别选项
                sex: [{
                        value: 0,
                        text: "女"
                    },
                    {
                        value: 1,
                        text: "男"
                    }
                ],
                uselessReasonCode: config.addclientmain.uselessReasonCode,
                userInfo: null,
                appointmentInfoOption: [],
                isred: false,
                editData: [],
                keyone: {},
                checkCar: '',
                //名单状态选择项
                status: [{
                    value: -2,
                    text: "待甄别"
                }, {
                    value: 0,
                    text: "无效名单"
                }, {
                    value: 1,
                    text: "线索"
                }],
                isSaveTel: false, //保存状态 是否能保存  true为disable
                channelMode: [],  //渠道
                sourceMode: [], //来源分类
                referenceDetailInfos: [], //来源分类 数据总集合
                referenceMode: [], //来源options
                referenceCode: '', //来源
                sourceCode: '', //来源明细
                isTryDriveFlag: 0, //是否需要试乘试驾
                intentionLeveOption: [], //意向车型选项
                uselessReasonOption: [],  //无效线索原因
                //新增修改意向车型
                intentionCarInfoVos: [{
                    id: '',
                    // 线索code
                    leadCode: '',
                    //主车型编码 y
                    carCode: '',
                    //厂家编码 y
                    factoryCode: '',
                    //品牌编码 y
                    brandCode: '',
                    //车系编码 y
                    seriesCode: '',
                    //车型编码 y
                    modelCode: ''
                }],
                //=================新增修改预约信息
                appointmentInfoVos: [{
                    id: '',
                    //线索code y
                    leadCode: '',
                    //门店Code y
                    storeCode: null,
                    //销售顾问 y
                    scCode: '',
                    //客户编码  seq y
                    customCode: '',
                    //客户姓名 y
                    customName: '',
                    //客户手机号码 y
                    mobilePhone: '',
                    //预约时间 y
                    appointmentTime: null,
                    //预约来源编码  y
                    appointmentSourceCode: config.appointmentSourceCode.dcc
                }],
                //===================发起调研任务
                salesLeadsTaskInfoVos: [{
                    id: '',
                    //线索code y
                    leadCode: '',
                    //无效原因
                    taskFailReasonCode: ''
                }],
                listRelationInfos: [],
                //===提交内容
                submitInfo: {
                    //无效原因
                    invalidReason: '',
                    //线索跟进信息
                    salesLeadFollowInfoVos: [],
                    //未进店原因
                    notArrivedReason: '',
                    id: '',
                    //线索编码 y
                    leadCode: '',
                    //客户公司
                    companyName: '',
                    //客流编码
                    receptionCode: '',
                    //门店
                    storeCode: '',
                    //客户编码 Y
                    customCode: '',
                    //客户名称
                    customName: '',
                    //性别 y
                    customGender: 1,
                    //客户手机号码 y
                    mobilePhone: '',
                    //渠道编码 y
                    channelCode: '',
                    //来源分类
                    sourceCode: '',
                    //预计购车时间
                    estimatedBuyCarTime: null,
                    //意向级别编码
                    intentionLevelCode: '',
                    //拥有车时间
                    havaCarPeriod: null,
                    //拥有车名称
                    //displayName:'',
                    //线索名单
                    leadType: -2,
                    //客户类型 普通客户默认，普通客户还是集团客户
                    customType: config.addclientmain.customType,
                    //是否需要试乘试驾
                    tryDriveFlag: 0,
                    //是否有二手车
                    usedCarFlag: 0,
                    //是否需要金融
                    financeFlag: 0,
                    //下次跟进时间
                    estimatedNextFollowTime: null,
                    //备注
                    remark: '',
                    //是否无效线索
                    leadStatusCode: 0,
                    //组织CODE
                    //createOrgCode:'',
                    //无效原因
                    uselessReasonCode: '',
                    //其他品牌
                    uselessRemark: '',
                    //销售顾问
                    //scCode:'',
                    //==新增修改预约信息
                    appointmentInfoVos: [],
                    //==新增修改意向车型
                    intentionCarInfoVos: [],
                    //更新已有车型
                    existCarInfoVos: [{
                        id: '',
                        //线索code
                        leadCode: '',
                        //意向车型编码 seq
                        //intentionCarCode:'',
                        //显示名称
                        displayName: '',
                        havaCarPeriod: ''
                    }],
                    dccFlag: '0',
                    //无效线索  发起任务
                    salesLeadsTaskInfoVos: []
                },
                fields: {
                    relationCode: {
                        label: '活动代码'
                    },
                    relationName: {
                        label: '活动名称'
                    },
                    time: {
                        label: '活动时间'
                    },
                    invitationStatus: {
                        label: '邀约状态'
                    },
                    operate: {
                        label: '操作'
                    }
                },
                currentEmp: JSON.parse(sessionStorage.getItem('userInfo')).empVo.empCode
            };
        },
        computed: {
            _channelCode: function() {
                return this.submitInfo.channelCode;
            },
            _sourceCode: function() {
                return this.sourceCode;
            },
            _leadType: function() {
                return this.submitInfo.leadType;
            },
            _leadStatusCode: function() {
                return this.submitInfo.leadStatusCode;
            }
        },
        components: {
            areaShop,
            marketModal,
            carComponent,
            VReachstore
        },
        mounted() {
           window.vue = this;
        },
        methods: {
            //初始化跟进记录数据
            initFollowArrData(time, data){
                let length = 0;
                if(data){
                    length = data.length;
                }
                this.initServerTime = time; //获取当前得服务器时间
                if(length > 0){
                    this.followArr = data; //获取当前跟进线索数据
                    this.followArr.forEach(item => {
                      item.followTime = item.followTime.substring(0, item.followTime.length - 2)
                    })
                }
                //创建一个空得跟进线索
                this.addFollow(time, 'init');
            },
            //获取当前服务器时间
            getCurrentTime(callBack){
                api.CurrentTime.getCurrentTime((res) => {
                  callBack(res);
                })
            },
            //新增跟进记录
            addFollow(time, type) {
                let length = this.followArr.length - 1;
                //新增时要把上一条记录锁定
                if(type === 'add'){
                    if(this.followArr[length].remark === '' || this.followArr[length].followTypeCode === ''){
                      return false;
                    }else{
                      this.followArr[length].disabledType = true;
                    }
                }
              this.followArr.push({
                  followTime: time === 0 ? this.timeComputed() : time, //跟进时间
                  followTypeCode: '',
                  remark: '',
                  leadCode: '',
                  disabledType: false
              });
            },
            //时间处理 新增跟进记录时，用本地时间减去，初始化获取得服务器时间
            timeComputed(){
              let initServerTime = new Date(this.initServerTime),
                  nowTime = new Date(),
                  result = new Date(initServerTime.getTime() + (nowTime.getTime() - initServerTime.getTime()));
              return new Date(result).Format('yyyy-MM-dd hh:mm:ss')
            },
            //获取渠道
            getChannel(isFromApp = false) {
                var $this = this;
                api.ref.getDataDictionary({
                    refCode: config.addclientmain.channelCode
                }).then(function(res) {
                    if (res.data.code == "success" && res.data.obj) {
                        let data = res.data.obj.referenceDetailInfos
                        let items = []
                        if (!isFromApp) {
                            const addCodeList = new Set(['LeadsChannelCustomer', 'LeadsChannelActive', 'LeadsChannelDormancy'])
                            const editCodeList = new Set(['LeadsChannelActive', 'LeadsChannelDormancy'])
                            data.forEach((item, num) => {
                                // 新增
                            if(item.refDetailName === '推荐'){
                                return
                            }else{
                                if ($this.submitInfo.channelCode == 'LeadsChannelCustomer' && !editCodeList.has(item.refDetailCode)) {
                                    items.push(item)
                                }
                                // 编辑 && 渠道来源不是散客时 需要过滤散客 选项
                                if ($this.submitInfo.channelCode != 'LeadsChannelCustomer' && !addCodeList.has(item.refDetailCode)) {
                                    items.push(item)
                                }
                            }

                            })
                        }
                        $this.setOptionData(items, $this.channelMode);
                    }
                })
            },
            //号码输入事件
            telChange(val, event) {
                if (!this.submitInfo.storeCode) {
                    Message({
                        message: '请选择门店',
                        type: 'warning'
                    });
                    return;
                }
                this.checkMobile(val);
            },
            //区域与门店选择事件
            areaShop(area, store) {
                let _this = this
                if (!area || !store) return;
                this.submitInfo.storeCode = store.value;
                this.appointmentInfoVos.storeCode = store.value;
                if (this.submitInfo.storeCode) {
                    api.receptionist.queryWorkList({
                        storeCode: _this.submitInfo.storeCode,
                        postnTypeCode: 'positionTypeSC'
                    }).then(function(res) {
                        if (res.data.code == 'success') {
                            var data = res.data.obj;
                            _this.appointmentInfoOption = []
                            _this.appointmentInfoOption.push({
                                text: '请选择',
                                value: ''
                            })
                            for (var i = 0, len = data.length; i < len; i++) {
                                _this.appointmentInfoOption.push({
                                    text: data[i].empCnName,
                                    value: data[i].empCode
                                })
                            }
                        }
                    })
                }    
            },
            save() {
                //线索跟进记录
                if(this.submitInfo.leadType != 0) {
                  var list = [];
                  for (let i=0; i<this.followArr.length; i++) {
                    // 跟进方式和跟进备注不能为空
                    if (this.followArr[i].followTypeCode && this.followArr[i].remark) {
                      var Vo = {
                        followTime: this.followArr[i].followTime,
                        followTypeCode: this.followArr[i].followTypeCode,
                        remark: this.followArr[i].remark,
                        leadCode: this.submitInfo.leadCode,
                      }
                      this.followArr[i].id && (Vo.id = this.followArr[i].id)
                      list.push(Vo)
                    }
                    if (this.followArr[i].followTypeCode && !this.followArr[i].remark) {
                      Message.error('跟进记录请填写完整!');
                      return
                    }
                    if (!this.followArr[i].followTypeCode && this.followArr[i].remark) {
                      Message.error('跟进记录请填写完整!');
                      return
                    }
                  }
                  this.submitInfo.salesLeadFollowInfoVos = [...list]
                }
                //来源为空则传来源分类
                this.submitInfo.sourceCode = this.referenceCode || this.sourceCode;
                //拥车时间
                if (this.submitInfo.havaCarPeriod) {
                    this.submitInfo.existCarInfoVos[0].havaCarPeriod = this.submitInfo.havaCarPeriod;
                };
                //预约购车时间
                this.submitInfo.estimatedBuyCarTime = common.eleTimeFormat(this.submitInfo.estimatedBuyCarTime);
                //下次跟进时间
                this.submitInfo.estimatedNextFollowTime = common.eleTimeFormat(this.submitInfo.estimatedNextFollowTime);
                //预约到店时间
                this.appointmentInfoVos[0].appointmentTime = (this.appointmentInfoVos[0].appointmentTime ? common.eleTimeFormatim2(this.appointmentInfoVos[0].appointmentTime) : '');
                if (this.submitInfo.leadType == 1) {
                    this.submitInfo.intentionCarInfoVos[0] = this.intentionCarInfoVos[0];
                }
                // 判断预约信息是否为空的情况
                if (this.appointmentInfoVos[0].scCode) {
                    this.submitInfo.appointmentInfoVos[0] = this.appointmentInfoVos[0];
                    this.submitInfo.appointmentInfoVos[0].appointmentTime = (this.appointmentInfoVos[0].appointmentTime ? common.eleTimeFormatim2(this.appointmentInfoVos[0].appointmentTime) : '');
                }
                if(!this.appointmentInfoVos[0].appointmentTime || !this.appointmentInfoVos[0].scCode) {
                    this.submitInfo.appointmentInfoVos = [];
                }
                if (this.submitInfo.leadStatusCode == 1) {
                    this.submitInfo.salesLeadsTaskInfoVos[0] = {
                        id: '',
                        //线索code y
                        leadCode: this.submitInfo.leadCode,
                        //无效原因
                        taskFailReasonCode: this.submitInfo.uselessReasonCode
                    }
                } else {
                    this.submitInfo.salesLeadsTaskInfoVos = [];
                }
                //校验门店
                if (!this.submitInfo.storeCode) {
                    Message.error('请选择门店');
                    return;
                }
                //校验非有效名单
                var $this = this,
                    flag = true,
                    flag2;
                for (var key in this.needMust) {
                    var str = key.substring(0, key.length - 6);
                    if (!$this.submitInfo[str]) {
                        this.needMust[key] = false;
                        flag = false;
                    } else {
                        if (!common.isTel($this.submitInfo[str]) && str == 'mobilePhone') {
                            this.needMust[key] = false;
                            flag = false;
                        } else {
                            this.needMust[key] = null;
                        }
                    }
                }
                //车辆校验
                if (this.submitInfo.leadType == 1) {
                    this.$refs.car.validate();
                    flag2 = this.checkCar;
                    //判断意向车型
                    if (!$this.submitInfo.intentionLevelCode) {
                        $this.intentionLevelCodeStatus = false;
                    } else {
                        $this.intentionLevelCodeStatus = null;
                    }
                    flag2 = flag2 && $this.submitInfo.intentionLevelCode;
                }
                //校验预约单 门店为空 预约时间为空
                var flag3 = true;
                if (this.appointmentInfoVos[0].scCode && !this.appointmentInfoVos[0].appointmentTime) {
                    flag3 = false;
                    this.isred = true;
                    return;
                }
                //如果预约时间不为空，预约销售顾问为空，那么不能提交
                if (this.appointmentInfoVos[0].appointmentTime && !this.appointmentInfoVos[0].scCode) {
                    this.scCodeStatus = false;
                    return;
                };
                //可以提交条件
                if (!flag) return;
                if (flag && !flag2 && this.submitInfo.leadType == 1) return;
                if (!flag3) return;
                var params = this.submitInfo;
                api.addclientmain[(this.addOrEdit ? 'update' : 'create')](params, function(res) {
                    if (res.data.code == 'success') {
                        $this.$router.push({
                            path: `/dccthread/queryclientmain`,
                            query: {
                                from: 'edit'
                            }
                        })
                    }
                });
            },
            //手机号码验证
            checkMobile(val) {
                if (!this.submitInfo.storeCode) {
                    Message.error('请选择门店');
                    return;
                }
                if (!common.isTel(val)) {
                    Message.error(config.messInfo.mobileFail);
                    return;
                }
                api.addclientmain.checkMobile({
                    mobilePhone: val,
                    storeCode: this.submitInfo.storeCode
                }, this.isCreatClue);
            },
            validateCar(flag) {
                this.checkCar = flag;
            },
            //检测好手机号码后 进行判断是否可以创建客户
            isCreatClue(res) {
                var $this = this;
                if (res.data.code == 'success') {
                    if (res.data.obj.tag == -1) {
                        $this.isSaveTel = false;
                        // 如果返回的tag等于-1,再次调用此接口
                        api.ordinalInfo.getSequence({
                            'serviceCode': 'CUSTOM'
                        }, function(res) {
                            if (res.data.code == 'success') {
                              // 把后端返回数据再传给后端
                              $this.submitInfo.customCode = res.data.obj;
                            }
                        });
                    } else if(res.data.obj.tag == 1 && res.data.obj.salesLeadsInfoVo.isEnd == 1) {
                        $this.isSaveTel = false;
                        //客户姓名
                        $this.submitInfo.customName = res.data.obj.salesLeadsInfoVo.customName;
                        // 客户公司名称
                        $this.submitInfo.companyName = res.data.obj.salesLeadsInfoVo.companyName;
                        // 客户公司类型
                        $this.submitInfo.customType = res.data.obj.salesLeadsInfoVo.customType;
                        // 现有车辆
                        var intentionCarInfoVos = res.data.obj.salesLeadsInfoVo.intentionCarInfoVos;
                        if(res.data.obj.salesLeadsInfoVo && intentionCarInfoVos != null && intentionCarInfoVos != [] ) {
                          $this.submitInfo.existCarInfoVos[0].displayName = intentionCarInfoVos[0].displayName;
                        }
                        //性别
                        $this.submitInfo.customGender = res.data.obj.salesLeadsInfoVo.customGender;
                        //门店查不到线索，也找不到主档
                        api.ordinalInfo.getSequence({
                            'serviceCode': config.client.clientmaininfosequence
                        }, function(res) {
                            if (res.data.code == 'success') {
                                //客户编码
                                $this.submitInfo.customCode = res.data.obj;
                                $this.appointmentInfoVos[0].customCode = res.data.obj;
                                $this.appointmentInfoVos[0].mobilePhone = $this.submitInfo.mobilePhone;
                                $this.appointmentInfoVos[0].storeCode = $this.submitInfo.storeCode;
                            }
                        });
                    } else if (res.data.obj.tag == 2) {
                        $this.isSaveTel = false;
                        //门店查不到线索，查找了主挡
                        Message({
                            message: config.messInfo.dccInfo1,
                            type: 'info'
                        });
                        $this.submitInfo.customCode = res.data.obj.customInfoVo.customCode;
                        $this.appointmentInfoVos[0].customCode = res.data.obj.customInfoVo.customCode;
                        // 客户公司类型
                        $this.submitInfo.customType = res.data.obj.customInfoVo.customType;
                        //客户姓名
                        $this.submitInfo.customName = res.data.obj.customInfoVo.customName;
                        // 客户公司名称
                        $this.submitInfo.companyName = res.data.obj.customInfoVo.companyName;
                        // 现有车辆
                        var intentionCarInfoVos = res.data.obj.customInfoVo.intentionCarInfoVos;
                        if(res.data.obj.customInfoV && intentionCarInfoVos != null && intentionCarInfoVos != [] ) {
                          $this.submitInfo.existCarInfoVos[0].displayName = intentionCarInfoVos[0].displayName;
                        }
                        //性别
                        $this.submitInfo.customGender = res.data.obj.customInfoVo.gender;
                    } else {
                        //门店查到了线索，判断状态 tag:1,defeatStatus:-1 准战败，0 未战败，isEnd：0 未终结，1为终结；
                        $this.submitInfo.customCode = res.data.obj.salesLeadsInfoVo.customCode;
                        $this.isSaveTel = true;
                        Message({
                            message: config.messInfo.dccInfo,
                            type: 'info'
                        });
                         //客户姓名
                        $this.submitInfo.customName = res.data.obj.salesLeadsInfoVo.customName;
                        // 客户公司名称
                        $this.submitInfo.companyName = res.data.obj.salesLeadsInfoVo.companyName;
                        // 客户公司类型
                        $this.submitInfo.customType = res.data.obj.salesLeadsInfoVo.customType;
                        // 现有车辆
                        var intentionCarInfoVos = res.data.obj.salesLeadsInfoVo.intentionCarInfoVos;
                        if(res.data.obj.salesLeadsInfoVo && intentionCarInfoVos != null && intentionCarInfoVos != [] ) {
                          $this.submitInfo.existCarInfoVos[0].displayName = intentionCarInfoVos[0].displayName;
                        }
                        //性别
                        $this.submitInfo.customGender = res.data.obj.salesLeadsInfoVo.customGender;
                    }
                }
            },
            //过滤相关数据
            filterData(name, data, condition) {
                for (var i = 0, len = data.length; i < len; i++) {
                    if (data[i].refDetailFatherCode == condition) {
                        this[name].push({
                            text: data[i].refDetailName,
                            value: data[i].refDetailCode
                        });
                    }
                }
            },
            back(val) {
                var $this = this;
                if (this.submitInfo.leadType == 1) {
                    Object.assign($this.intentionCarInfoVos[0], val);
                }
            },
            setOptionData(data, obj) {
              if(!data)return;
                for (var i = 0, len = data.length; i < len; i++) {
                    obj.push({
                        text: data[i].refDetailName,
                        value: data[i].refDetailCode
                    });
                }
            },
            //修改或者查看
            initLead(data, isFromApp = false) {
                var $this = this;
                this.$refs.reachStore.dataInfo(data[0])
                $this.createBy = data[0].createBy;
                if (data[0].storeCode) {
                    $this.$refs.area.setselect({
                        text: data[0].storeName,
                        value: data[0].storeCode
                    });
                }
                Object.keys($this.submitInfo).forEach((key, i) => {
                    if (typeof $this.submitInfo[key] != 'object') {
                        $this.submitInfo[key] = data[0][key]
                    }
                    //预约信息 , 意向车型
                    if (typeof $this.submitInfo[key] == 'object' && key != 'existCarInfoVos' && data[0][key] && $this.submitInfo.leadType == 1) {
                        Object.keys($this[key][0]).forEach(key1 => {
                            $this[key][0][key1] = data[0][key][0][key1];
                        });
                    }
                });
                if (data[0].existCarInfoVos || data[0].dccCode && data[0].existCarInfoVos) {
                    $this.submitInfo.existCarInfoVos[0] = data[0].existCarInfoVos[0];
                    if (data[0].existCarInfoVos && data[0].existCarInfoVos[0].havaCarPeriod) {
                        $this.submitInfo.havaCarPeriod = data[0].existCarInfoVos[0].havaCarPeriod;
                    }
                }
                //如果为线索，并且线索已经分配 则不能修改,或者createByName为空即为SC创建
                // 可以编辑保存的情况
                if (($this.createBy === $this.currentEmp) && (!data[0].appointmentInfoVos || (data[0].appointmentInfoVos && !data[0].appointmentInfoVos[0].scCode)) && !data[0].scCode) {
                  $this.isSaveTel = false;
                } else if (($this.updateBy === 'xy') && (!data[0].appointmentInfoVos || (data[0].appointmentInfoVos && !data[0].appointmentInfoVos[0].scCode)) && !data[0].scCode) {
                  $this.isSaveTel = false;
                } else if ((data[0].dccCode === $this.currentEmp) && (!data[0].appointmentInfoVos || (data[0].appointmentInfoVos && !data[0].appointmentInfoVos[0].scCode)) && !data[0].scCode) {
                  $this.isSaveTel = false;
                } else if (($this.updateBy === $this.currentEmp) && (!data[0].appointmentInfoVos || (data[0].appointmentInfoVos && !data[0].appointmentInfoVos[0].scCode)) && !data[0].scCode) {
                  $this.isSaveTel = false;
                } else if(!data[0].dccCode && !data[0].scCode) {
                  $this.isSaveTel = false;
                } else {
                  $this.isSaveTel = true;
                }
                $this.getChannel(isFromApp);
            },
            sourceDataSet() {
                if (!this.addOrEdit) return;
                if (this.editData.length != 0 && !this.editData[0].sourceCode) return;
                var sourceType, index;
                //如果是编辑，首次进入，判断该字段为来源分来 还是来源明细
                if (this.addOrEdit) {
                    for (var i = 0, len = this.referenceDetailInfos.length; i < len; i++) {
                        if (this.editData[0].sourceCode == this.referenceDetailInfos[i].refDetailFatherCode) {
                            sourceType = 'sourceCode';
                        }
                        if (this.editData[0].sourceCode == this.referenceDetailInfos[i].refDetailCode) {
                            index = i;
                        }
                    }
                    if (sourceType == 'sourceCode') {
                        this.sourceCode = this.editData[0].sourceCode;
                    } else {
                        this.sourceCode = this.referenceDetailInfos[index].refDetailFatherCode;
                        this.referenceCode = this.editData[0].sourceCode;
                    }
                }
            },
            showMarketModal: function(maCode) {
                let _this = this
                _this.$refs.marketModal.showModal(maCode)
            }
        },
        created() {
            var that = this;
            var $this = this;
            // 客户类型
            api.ref.getDataDictionary({refCode:config.client.clienttypecode}).then(function(res){
                if(res.data.code = 'success' && res.data.obj){
                    that.setOptionData(res.data.obj.referenceDetailInfos, that.customTypeOpts);
                    that.customTypeOpts.sort(common.by("text"));
                    that.customTypeOpts.unshift({text:'请选择',value:''});
                }
            });
            // 未进店原因
            api.ref.getDataDictionary({refCode:config.addclientmain.dotIntoStoreReasonCode}).then(function(res){
                if(res.data.code = 'success' && res.data.obj){
                    that.setOptionData(res.data.obj.referenceDetailInfos, that.notArrivedReasonOpt);
                    that.notArrivedReasonOpt.sort(common.by("text"));
                    that.notArrivedReasonOpt.unshift({text:'请选择',value:''});
                }
            });
            // 名单无效原因
            api.ref.getDataDictionary({refCode:config.addclientmain.invalidReasonCode}).then(function(res){
                if(res.data.code = 'success' && res.data.obj){
                    that.setOptionData(res.data.obj.referenceDetailInfos, that.invalidReasonOpt);
                    that.invalidReasonOpt.sort(common.by("text"));
                    that.invalidReasonOpt.unshift({text:'请选择',value:''});
                }
            });
            // 跟进方式
            api.ref.getDataDictionary({refCode:config.addclientmain.dccFollowTypeCode}).then(function(res){
                if(res.data.code = 'success' && res.data.obj) {
                    that.setOptionData(res.data.obj.referenceDetailInfos, that.follType);
                    that.follType.sort(common.by("text"));
                    that.follType.unshift({text:'请选择',value:''});
                }
            });
            //确定当前页面模式 编辑 还是 新增,true为编辑
            this.addOrEdit = this.$route.params.code ? true : false;
            //新增情况
            if (!this.addOrEdit) {
                api.ordinalInfo.getSequence({
                    'serviceCode': config.addclientmain.serverCode
                }, function(res) {
                    if (res.data.code == 'success') {
                        $this.submitInfo.leadCode = res.data.obj;
                        //新增预约修改
                        $this.appointmentInfoVos[0].leadCode = res.data.obj;
                        //新增修改意向车型
                        $this.intentionCarInfoVos[0].leadCode = res.data.obj;
                        //已有车型
                        $this.submitInfo.existCarInfoVos[0].leadCode = res.data.obj;
                    }
                });
                //渠道
                $this.getChannel();
                $this.getCurrentTime((timeData) => {
                  //初始化跟进记录数据
                  $this.initFollowArrData(timeData.data);
                });
            } else {
                //修改情况
                this.editStatus = true
                api.addclientmain.getSalesLeadsInfo({
                    leadCode: this.$route.params.code
                }, function(res) {
                    if (res.data.code == 'success') {
                        if (res.data.obj && res.data.obj.length != 0) {
                            let info = res.data.obj[0];
                            $this.createBy = info.createBy;
                            $this.updateBy = info.updateBy;
                            if (info.channelCode === 'LeadsChannelActive' ||
                                info.channelCode === 'LeadsChannelDormancy') {
                                $this.initLead(res.data.obj, true);
                            } else {
                                $this.initLead(res.data.obj);
                            }
                            $this.getCurrentTime((timeData) => {
                              //初始化跟进记录数据
                              $this.initFollowArrData(timeData.data, res.data.obj[0].salesLeadFollowInfoVos);
                            });
                            $this.submitInfo.companyName = info.companyName;
                            $this.editData = res.data.obj;
                            $this.listRelationInfos = res.data.obj[0].listRelationInfoVos
                            $this.firstLeadType = $this.submitInfo.leadType
                        } else {
                            $this.$router.push({
                                path: `/dccthread/addclientmain`
                            })
                        }
                    }
                })
            }
        },
        updated() {
            if (!this.editData) return;
            if (this.editData.length != 0 && this.editData[0].intentionCarInfoVos) {
                this.$refs.car.setValue(this.editData[0].intentionCarInfoVos[0]);
            }
        },
        watch: {
            _channelCode(val) {
                //监听渠道获取来源分类
                var $this = this;
                $this.sourceMode = [];
                $this.sourceCode = '';
                api.ref.getDataDictionary({
                    refCode: config.addclientmain.souceCode
                }).then(function(res) {
                    if (res.data.code = 'success' && res.data.obj) {
                        var obj = res.data.obj.referenceDetailInfos;
                        $this.referenceDetailInfos = obj;
                        $this.filterData('sourceMode', obj, val);
                        $this.sourceDataSet();
                    }
                });
            },
            _sourceCode(val) {
                //监听来源分类
                var $this = this,
                    obj = $this.referenceDetailInfos,
                    sourceType, refDetailFatherCode, index;
                $this.referenceMode = [];
                $this.filterData('referenceMode', obj, val);
                if (val) {
                    this.sourceCode = val;
                }
            },
            //监听名单状态，如是有效名单，则拉取数据
            _leadType(val) {
                //获取意向级别下拉
                var $this = this;
                if (val == 1 && this.intentionLeveOption.length == 0) {
                    api.ref.getDataDictionary({
                        refCode: config.addclientmain.intentonLevel
                    }).then(function(res) {
                        if (res.data.code = 'success' && res.data.obj) {
                            $this.setOptionData(res.data.obj.referenceDetailInfos, $this.intentionLeveOption);
                            $this.intentionLeveOption.sort(common.by("text"));
                        }
                    });
                }
                //获取预约销售顾问列表
                if (val == 1 && $this.appointmentInfoOption.length == 0 && $this.submitInfo.storeCode) {
                    api.receptionist.queryWorkList({
                        storeCode: $this.submitInfo.storeCode,
                        postnTypeCode: 'positionTypeSC'
                    }).then(function(res) {
                        if (res.data.code == 'success') {
                            var data = res.data.obj;
                            $this.appointmentInfoOption = []
                            $this.appointmentInfoOption.push({
                                text: '请选择',
                                value: ''
                            });
                            for (var i = 0, len = data.length; i < len; i++) {
                                $this.appointmentInfoOption.push({
                                    text: data[i].empCnName,
                                    value: data[i].empCode
                                });
                            }
                        }
                    })
                }
            },
            //监听是否是无效线索
            _leadStatusCode(val) {
                var $this = this;
                if (val != 1 || $this.uselessReasonOption.length != 0) return;
                api.ref.getDataDictionary({
                    refCode: config.addclientmain.invalidCode
                }).then(function(res) {
                    if (res.data.code = 'success' && res.data.obj) {
                        $this.setOptionData(res.data.obj.referenceDetailInfos, $this.uselessReasonOption);
                    }
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .el-date-editor.el-input {
        width: 100%!important;
        border-radius: 0;
    }
    .el-input__inner {
        border-radius: 0;
    }
    .red .el-input__inner {
        border-color: #f86c6b;
    }
    .blankArea {
        margin-bottom: 40px;
    }
    /* 隐藏的元素样式 */
    .elehidden{
        visibility: hidden;
        height: 0;
    }
    .follTextwArea {
        width: 100%;
        height: 100%;
    }
</style>
