<template>
  <div class="animated fadeIn">
    <b-card style="border:0; background:none; margin-bottom:0;">
      <div class="row" style="margin-left:-34px;">
        <div class="col-lg-6">
          <areaqueryshop ref="areaqueryshop" :storeAll="true" @select-change="selectedfun"></areaqueryshop>
        </div>
        <div class="col-lg-3">
            <b-form-fieldset horizontal label="日期" :label-cols="4" class="text-right">
                <el-date-picker v-model="yearMonth" @change="yearMonthChange" :picker-options="pickerOptions" type="month" placeholder="选择日期"></el-date-picker>
            </b-form-fieldset>
        </div>
      </div>
    </b-card>
    <b-card>
      <div ref="echartBox" class="row">
        <div class="col-sm-6 col-lg-3 echart-box border-right">
          <!--客流-->
          <echart :type="'a'" ref="echartBox1" :option="passengerFlow"></echart>
        </div>
        <div class="col-sm-6 col-lg-3 echart-box border-right">
          <!--订单-->
          <echart :type="'b'" ref="echartBox2" :option="orderForm"></echart>
        </div>
        <div class="col-sm-6 col-lg-3 echart-box border-right">
          <!--交车-->
          <echart :type="'b'" ref="echartBox3" :option="handOverCar"></echart>
        </div>
        <div class="col-sm-6 col-lg-3 echart-box">
          <!--库存-->
          <echart :type="'a'" ref="echartBox4" :option="inventory"></echart>
        </div>
      </div>
      <!--/.row-->
    </b-card>
    <!-- 整车零售销量图部分 -->
    <b-card id="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="整车零售销量图" name="first">
          <div class="row">
            <div class="col-sm-5">
              <!-- <div class="small text-muted">{{toDayDate}}</div> -->
            </div>
          </div>
          <echart-line :option="kLineObj" ref="echartLineBox" v-if="echartLineBoxIndex == 0"></echart-line>
        </el-tab-pane>
        <!-- 展厅客流趋势图 -->
        <el-tab-pane label="展厅客流趋势图" name="second">
          <div class="row">
            <div class="col-sm-5">
              <!-- <div class="small text-muted">{{toDayDate}}</div> -->
            </div>
          </div>
          <echart-line1 :option="passengerLineObj" ref="echartLineBox1" v-if="echartLineBoxIndex == 1"></echart-line1>
        </el-tab-pane>
      </el-tabs>
    </b-card>
    <!-- 创新工作台 -->
    <b-card v-if="jurisdiction">
      <div class="row">
          <div class="col-md-8">
              <div class="col-md-12 follow_center">
                <h5>跟进中心</h5>
                <div class="follow_board">
                    <div class="col-md-4 dashboard_seq" v-for="(item,index) in followList" :key="index">
                      <p>
                        <span @click="toNewPage(item.url)" class="follow_tit" style="font-family: PingFangSC-Semibold;">{{item.title}}</span>
                      </p>
                      <p class="board_text">{{item.text}}</p>
                      <div>                     
                        <span class="bash_btn" v-if="item.board"><img :src="item.img" width="12" height="12" alt="">&nbsp;{{item.board}}</span>
                      </div>
                    </div>
                </div>
              </div>
              <div class="col-md-12 follow_center search_center">
                <h5>查询中心</h5>
                 <div class="follow_board follow_board1">
                    <div class="col-md-4 dashboard_seq" v-for="(item,index) in searchList" :key="index">
                      <p>
                        <span @click="toNewPage(item.url)" class="follow_tit" style="font-family: PingFangSC-Semibold;">{{item.title}}</span>
                      </p>
                      <p class="board_text">{{item.text}}</p>
                      <div>
                        <span class="bash_btn" v-if="item.board"><img :src="item.img" width="12" height="12" alt="">&nbsp;{{item.board}}</span>                       
                      </div>
                    </div>
                </div>
                 <div class="follow_board follow_board2">
                    <div class="col-md-4 dashboard_seq" v-for="(item,index) in searchList1" :key="index">
                      <p>
                        <span @click="toNewPage(item.url)" class="follow_tit" style="font-family: PingFangSC-Semibold;">{{item.title}}</span>
                      </p>
                      <p class="board_text">{{item.text}}</p>
                      <div>
                        <span class="bash_btn" v-if="item.board"><img :src="item.img" width="12" height="12" alt="">&nbsp;{{item.board}}</span>                        
                      </div>
                    </div>
                </div>
              </div>
          </div>
          <div class="col-md-4">
              <div class="col-md-12 setting_center">
                <h5>设置中心</h5>
                <ul>
                  <li v-for="(item,index) in settingList" :key="index">
                    <span><img :src="item.imgsrc" alt=""></span>
                    <span @click="toNewPage(item.url)">{{item.tit}}</span>
                    <span>更新时间<i style="font-style: normal;">{{item.time}}</i></span>
                  </li>
                </ul>
              </div>
              <div class="col-md-12 storeOrder">
                <div class="seqwraps">
                  <div class="storeOrder_seq">
                    <img src="../../assets/img/oil11.png" width="44px" height="40px" alt="">
                    <div>
                      <p>{{tgpRate}}</p>
                      <p>门店T.GP达成</p>
                    </div>
                  </div>
                </div>
                <div class="seqwraps">
                  <div class="storeOrder_seq">
                    <img src="../../assets/img/peo11.png" width="38px" height="38px" alt="">
                    <div class="grorder">
                      <p class="group_rate"><span>{{strOrder}}</span>/<span>{{groupNums}}</span></p>
                      <p>集团排名</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </b-card>
    <!-- 毛利 -->
    <div v-show="jurisdiction">
      <!-- GP -->
      <b-card>
        <!-- <div class="row"> -->
          <grossProfitRate :GPInfo="GPInfo" :scRandInfo="scRandInfo" :totalGPValue="totalGPValue" :totalGPPercentage="totalGPPercentage"></grossProfitRate>
        <!-- </div> -->
      </b-card>
      <!-- 销售毛利 -->
      <b-card>
        <div class="row">
          <!-- 当月累计精品销售概览 -->
          <div class="col-sm-4">
            <div class="boutiqueSales">
              <p class="boutiqueSalesTitle">当月累计精品销售概览</p>
              <b-row class="boutiqueNum" :class="{smallTitle: competitiveProductsPgValue.length > 7}">
                <b-col>
                  <div class="line">
                    <img src="../../assets/img/boutique.png" width="14.4px" height="14.4px" alt="">
                    {{competitiveProductsPgValue == 0.0 ? '- -' : competitiveProductsPgValue}}
                  </div>
                </b-col>
                <b-col>
                  <img src="../../assets/img/boutiqueIcon.png" width="14.4px" height="14.4px" alt="">
                  - -
                </b-col>
              </b-row>
              <b-row class="boutiqueText">
                <b-col>当月累计毛利</b-col>
                <b-col class="rightTitle">达成率</b-col>
              </b-row>
              <b-row class="boutiqueNum">
                <b-col>
                  <div class="line" :class="{smallTitle: skuRate.length > 7}">
                    <img src="../../assets/img/boutique.png" width="14.4px" height="14.4px" alt="">
                    {{skuRate == 0 ? '- -' : (skuRate + '%')}}
                  </div>
                </b-col>
                <b-col>
                  <img src="../../assets/img/boutiqueIcon.png" width="14.4px" height="14.4px" alt="">
                  - -
                </b-col>
              </b-row>
              <b-row class="boutiqueText">
                <b-col>当月渗透率实际</b-col>
                <b-col class="rightTitle">目标</b-col>
              </b-row>
              <b-row class="boutiqueNum">
                <b-col>
                  <div class="line" :class="{smallTitle: goods_gp_avg.length > 7}">
                    <img src="../../assets/img/boutique.png" width="14.4px" height="14.4px" alt="">
                    {{ goods_gp_avg == 0.0 ? '- -' : goods_gp_avg}}
                  </div>
                </b-col>
                <b-col>
                  <img src="../../assets/img/boutiqueIcon.png" width="14.4px" height="14.4px" alt="">
                  - -
                  </b-col>
              </b-row>
              <b-row class="boutiqueText">
                <b-col>当月累计单台毛利</b-col>
                <b-col class="rightTitle">目标</b-col>
              </b-row>
            </div>
          </div>
          <!-- 当月累计金融按揭概览 -->
          <div class="col-sm-4">
            <div class="financialMortgage">
              <p class="financialMortgageTitle">当月累计金融按揭概览</p>
              <b-row class="financialNum">
                <b-col>
                  <div class="line" :class="{smallTitle: grossrofit.length > 7}">
                    <img src="../../assets/img/financialText.png" width="14.4px" height="14.4px" alt="">
                    {{grossrofit == 0.0 ? '- -' : grossrofit}}
                  </div>
                </b-col>
                <b-col>
                  <img src="../../assets/img/financialIcon.png" width="14.4px" height="14.4px" alt="">
                  - -
                  </b-col>
              </b-row>
              <b-row class="financialText">
                <b-col>当月累计毛利</b-col>
                <b-col class="rightTitle">达成率</b-col>
              </b-row>
              <b-row class="financialNum">
                <b-col>
                  <div class="line" :class="{smallTitle: financialRate.length > 7}">
                    <img src="../../assets/img/financialText.png" width="14.4px" height="14.4px" alt="">
                    {{financialRate == 0 ? '- -' : (financialRate + '%')}}
                  </div>
                  </b-col>
                <b-col>
                  <img src="../../assets/img/financialIcon.png" width="14.4px" height="14.4px" alt="">
                  - -
                  </b-col>
              </b-row>
              <b-row class="financialText">
                <b-col>当月渗透率实际</b-col>
                <b-col class="rightTitle">目标</b-col>
              </b-row>
              <b-row class="financialNum">
                <b-col>
                  <div class="line" :class="{smallTitle: finance_gp_avg.length > 7}">
                    <img src="../../assets/img/financialText.png" width="14.4px" height="14.4px" alt="">
                    {{ finance_gp_avg == 0.0 ? '- -' : finance_gp_avg}}
                  </div>
                </b-col>
                <b-col>
                  <img src="../../assets/img/financialIcon.png" width="14.4px" height="14.4px" alt="">
                  - -
                </b-col>
              </b-row>
              <b-row class="financialText">
                <b-col>当月累计单台毛利</b-col>
                <b-col class="rightTitle">目标</b-col>
              </b-row>
            </div>
          </div>
          <!-- 当月累计保险销售概览 -->
          <div class="col-sm-4">
            <div class="insuranceSales">
              <p class="insuranceSalesTitle">当月累计保险销售概览</p>
              <b-row class="insuranceNum">
                <b-col>
                  <div class="line" :class="{smallTitle: insuranceTotalServiceFee.length > 7}">
                    <img src="../../assets/img/insurance.png" width="14.4px" height="14.4px" alt="">
                    {{insuranceTotalServiceFee == 0.0 ? '- -' : insuranceTotalServiceFee}}
                  </div>
                </b-col>
                <b-col>
                  <img src="../../assets/img/insuranceIcon.png" width="14.4px" height="14.4px" alt="">
                  - -
                </b-col>
              </b-row>
              <b-row class="insuranceText">
                <b-col>当月累计毛利</b-col>
                <b-col class="rightTitle">达成率</b-col>
              </b-row>
              <b-row class="insuranceNum">
                <b-col>
                  <div class="line" :class="{smallTitle: insuranceRate.length > 7}">
                    <img src="../../assets/img/insurance.png" width="14.4px" height="14.4px" alt="">
                    {{insuranceRate == 0 ? '- -' : (insuranceRate + '%')}}
                  </div>
                </b-col>
                <b-col>
                  <img src="../../assets/img/insuranceIcon.png" width="14.4px" height="14.4px" alt="">
                  - -
                </b-col>
              </b-row>
              <b-row class="insuranceText">
                <b-col>当月渗透率实际</b-col>
                <b-col class="rightTitle">目标</b-col>
              </b-row>
              <b-row class="insuranceNum">
                <b-col>
                  <div class="line" :class="{smallTitle: insurance_gp_avg.length > 7}">
                    <img src="../../assets/img/insurance.png" width="14.4px" height="14.4px" alt="">
                    {{ insurance_gp_avg == 0.0 ? '- -' : insurance_gp_avg}}
                  </div>
                </b-col>
                <b-col>
                  <img src="../../assets/img/insuranceIcon.png" width="14.4px" height="14.4px" alt="">
                  - -
                </b-col>
              </b-row>
              <b-row class="insuranceText">
                <b-col>当月累计单台毛利</b-col>
                <b-col class="rightTitle">目标</b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-card>
      <!-- 底部 -->
      <b-card class="dashboardBtom">
        <div class="row">
          <div class="col-sm-4 col-lg-4">
            <img src="../../assets/img/assessment.png" width="50px" height="40px" alt="">
            <span class="firtNum">{{used_car_num}}</span>
            <span class="lastNum">/{{car_num}}</span>
            <p class="usedCar">二手车评估台数</p>
          </div>
          <div class="col-sm-4 col-lg-4">
            <img src="../../assets/img/substitution.png" width="50px" height="40px" alt="">
            <span class="firtNum">0</span>
            <span class="lastNum">/0</span>
            <p class="usedCar">二手车置换</p>
          </div>
          <div class="col-sm-4 col-lg-4">
            <img src="../../assets/img/profit.png" width="35.5px" height="39.8px" alt="">
            <span class="firtNum">￥0</span>
            <p class="usedCar">二手车佣金收益</p>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabs, TabPane, DatePicker } from "element-ui";
import api from "common/api";
import common from "../../common/common";
import config from "../../common/config";
import echart from "./dashboard/echart.vue";
import echartLine from "./dashboard/lineEchart.vue";
import echartLine1 from "./dashboard/lineEchart1.vue";
import areaqueryshop from "components/iris-areaqueryshop/";
import grossProfitRate from "./dashboard/grossProfitRate.vue";
import operateConfig from './operateConfig.js'
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(DatePicker);

export default {
  name: "dashboard",
  components: {
    echart,
    echartLine,
    echartLine1,
    areaqueryshop,
    grossProfitRate
  },
  data: function() {
    return {
      followList: [],
      searchList: [],
      searchList1: [],
      settingList: [],
      activeName: "first",       //tab默认栏选中的一栏name
      toDayDate: "",             //当前日期
      storeCode: "",             //门店code
      postnCodes: '',
      yearData: '',              //已选年份
      monthList: ['01','02','03','04','05','06','07','08','09','10','11','12'],             //月份
      month: '',                 //已选月份
      passengerFlow: {
        title: "线索客流",
        targetTitle: "月进店线索剩余目标",
        targetVal: 0,                        //当月计划线索数
        nowTargetTitle: "月实际进店线索",
        nowTargetVal: 0,                     //当月实际线索数量
        toDayVal: 0,                         //今日客流总数
        color: ["#82e0be", "#cdf3e6"],
        type: "a",
        valDescribe: "今日线索客流"
      },
      orderForm: {
        title: "订单",
        targetTitle: "月订单剩余目标",
        targetVal: 0,
        nowTargetTitle: "月实际订单",
        nowTargetVal: 0,
        toDayVal: 0,                        //今日订单总数
        toDayTarget: 0,                     //今日目标数
        color: ["#2eb9e2", "#cbebf8"],
        type: "b",
        valDescribe: "今日订单"
      },
      handOverCar: {
        title: "交车",
        targetTitle: "月交车剩余目标",
        targetVal: 0,
        nowTargetTitle: "月实际交车",
        nowTargetVal: 0,
        toDayVal: 0,
        toDayTarget: 0, //
        color: ["#97b8ff", "#d5e3fe"],
        type: "b",
        valDescribe: "今日交车"
      },
      inventory: {
        title: "库存",
        targetTitle: "其他库存",
        targetVal: 0,
        nowTargetTitle: "已上报未订单库存",
        nowTargetVal: 0,
        lockTitle: "订单锁定库存",
        lockVal: 0,
        color: ["#ba0005", "#ff6237", "#f9ced5"],
        type: "c",
        valDescribe: "当前库存"
      },
      GPBoard: {
        gpSortInfo: []                               //数据字典排列的数值
      },
      GPInfo: [],                 //GP排名
      scRandInfo: [],             //sc销售排名信息
      salesYear: "",
      salesMonths: "",
      YearAndMonth:"",
      monthArr: [],
      maxRefDetailName: '',       //最大GP值
      maxRefDetailPercentage: '', //最大GP%
      totalGPValue: '' || 0,      //最大GP value值
      totalGPPercentage: '' || 0, //最大GP% value值
      kLineObj: {
        theMonth: [],                                //当月整车开票
        theDay: [],
        facTargetNum: [],                            //厂家目标
        groupTargetNum: []                           //集团目标
      },
      passengerLineObj: {
        passengerTarget: [],                         //客流目标
        passengerResidueTarget: [],                  //月客流线索目标
        ReceptionStatisticsCountArr: [],             //当日客流数
        totalReceptionStatisticsCountArr: [],        //当月客流数
        KeepReceptionStatisticsCountArr: [],         //当日客流留档数
        totalKeepReceptionStatisticsCountArr:[]      //当月客流留档数
      },
      kLineObj:{
        theMonth:[],                                 //当月整车开票
        theDay:[],
        facTargetNum:[],                             //厂家目标
        groupTargetNum: []                           //集团目标
      },
      serviceTime: '',                  //服务器时间
      competitiveProductsPgValue: 0,    //精品商品毛利
      grossrofit: 0,                    //金融毛利
      insuranceTotalServiceFee: 0,      //保险毛利
      skuRate: 0,                       //精品渗透率
      financialRate: 0,                 //金融渗透率
      insuranceRate: 0,                 //保险渗透率
      used_car_num: 0,                  //二手车车辆台数
      car_num: 0,                       //车辆总数
      goods_gp_avg: 0,                  //单台车辆精品毛利
      insurance_gp_avg: 0,              //单台车辆保险毛利
      finance_gp_avg: 0,                //单挑车辆金融毛利
      postnTypes: '',                   //系统权限
      refDetailValue: '',
      jurisdiction: false,
      goods_gp: 0,
      insurance_gp: 0,
      finance_gp: 0,
      echartLineBoxIndex: 0,
      // 当月精品 销售 保险板块(毛利)
      maori: {
        scCode: "",
        carBrandCode: "",
        carSeriesCode: "",
        carFactoryCode: "",
        pageNums: 15,
        pageStart: 1
      },
      // 当月精品 销售 保险模块(渗透率)
      permeability: {
        salesMonthStart: "",
        salesMonthEnd: "",
        scCode: ""
      },
      // 当月累计单台车辆毛利
      carMaori: {},
      //二手车评估台数
      usedCar: {},
      // 门店排名
      strOrder: '',
      // 集团数
      groupNums: '',
      // T.GP达成
      tgpRate: '',
      num: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      yearMonth: '',
    }
  },
  created() {
    this.getCurrentTime();  //调取服务端时间
    this.pcBoardRole();     //PC端数据看板权限
    this.followList = operateConfig.followList
    this.searchList = operateConfig.searchList
    this.searchList1 = operateConfig.searchList1
    this.settingList = operateConfig.settingList
  },
  mounted(){
    let _this = this;
    window.onresize = function() {
      if (_this.$refs.echartLineBox) {
        for (let i = 0; i < 4; i++) {
          _this.$refs["echartBox" + (i + 1)].resizeChart();
        }
      }
      if (_this.$data.echartLineBoxIndex == 0 && _this.$refs.echartLineBox) {
        _this.$refs.echartLineBox.resizeChart();
      } else if(_this.$refs.echartLineBox1){
        _this.$refs.echartLineBox1.resizeChart();
      }
    }

  },
  methods: {
    // 日期切换
    yearMonthChange(data){
        if( data && this.num > 0 ){
          // 展厅客流趋势图数据的初始化
          this.passengerLineObj = {
            passengerTarget:[],
            passengerResidueTarget: [],
            ReceptionStatisticsCountArr: [],
            totalReceptionStatisticsCountArr: [],
            KeepReceptionStatisticsCountArr: [],
            totalKeepReceptionStatisticsCountArr: []
          }

          this.yearData = data.slice(0,4)         //已选年份 
          this.month = data.slice(5,7)            //已选月份
          this.DaysInMonth(1)                     //获取每月的天数

          this.getTGPInfo()                       //门店T.GP达成
          this.getStoreOrderInfo()                //门店排名
          this.departmentStrategyReport()         //客流趋势数据
          this.queryKeepReceptionStatistics()     //留档客流数据
          this.queryReceptionStatistics()          //统计客流数据
          this.getSalesManagementGP()             //获取GP相关数值
          this.getScNameTGpOfRank()               //sc毛利销售排行
          this.querySalesManageOrderReports()     //当月精品 金融 保险板块（渗透率）
          this.queryCarTGpAvgOfInvoiced()         //当月精品 金融 保险板块（毛利） 当月累计单台车辆毛利
          this.queryUsedCarOrderOfInvoiced()      //查询二手车评估台数
          this.num = 2                            //避免因为初次渲染页面时的年月变化导致重复请求
          this.queryInStoreClueInfo()             //请求客流-进店线索数板块
          this.queryOrderInforNums()              //订单板块
          this.queryTheMonthDeliveryReal()        //交车板块
          this.queryPureInvoicerOrderNums()       //整车开票板块
        }
    },
    // 获取T.GP值
    getTGPInfo(){
      this.strOrder = ''
      this.groupNums = ''
      let _this = this
      let time =  this.yearData + '-' + this.month + '-01'
      api.dashboard.getTGPInfo({ dateVersion: time, storeCode: this.storeCode },  res => {
        if(res.data.code == 'success'){
          if(res.data.obj){
            if( this.strOrder == '-') _this.groupNums = '-'
            else _this.groupNums = res.data.obj.storeNum
            let forValue = res.data.obj.tgpForecastValue, actualValue = res.data.obj.tgpActualvalue;
            let rate = Number(forValue) < 0 ? (2-(Number(actualValue)/Number(forValue))) : (Number(forValue) ? Number(actualValue)/Number(forValue) : '--')
            if(rate == '--') this.tgpRate = '--'
            else this.tgpRate = (rate * 100).toFixed(1) + '%'
          }
        }
      })
    },
    // 获取门店排名
    getStoreOrderInfo(){
      this.strOrder = ''
      this.groupNums = ''
      let _this = this
      let time =  this.yearData + '-' + this.month + '-01'
      api.dashboard.getStoreOrderInfo({ dateVersion: time, storeCode: this.storeCode }, res => {
        if(res.data.code == 'success'){
          if(res.data.obj && res.data.obj.length > 0){
            _this.strOrder = res.data.obj[0].rankingValue
          }else{
            _this.strOrder = '-'
            _this.groupNums = '-'
          }
        }
      })
    },
    // 点击看板名跳转新页面
    toNewPage(data){
      let env = process.env.NODE_ENV;
      let url = env === 'development' ? `${window.location.origin + data}` : `${window.location.origin}/livepro${data}`
      window.open(url)
    },
    handleClick(tab, event) {
      let _this = this;
      _this.$data.echartLineBoxIndex = parseInt(tab.index)
    },
    //数值转化为千分号形式
    thousandBitSeparator(num) {
        return num && (num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
            return $1 + ",";
        }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
            return $1 + ",";
        }));
    },
    initPage() {
      // 展厅客流趋势图数据的初始化
      this.passengerLineObj = {
        passengerTarget:[],
        passengerResidueTarget: [],
        ReceptionStatisticsCountArr: [],
        totalReceptionStatisticsCountArr: [],
        KeepReceptionStatisticsCountArr: [],
        totalKeepReceptionStatisticsCountArr: []
      }
      this.DaysInMonth()
      this.queryInStoreClueInfo();            //请求客流-进店线索数板块
      this.queryTheMonthDeliveryReal();       //交车板块
      this.queryPureInvoicerOrderNums();      //整车开票板块
      this.queryOrderInforNums();             //订单板块
      this.queryPureStockInfoNums();          //库存板块
      this.getGPSortType();                   //数据字典查询
      this.getSalesManagementGP();            //获取GP相关数值
      this.getScNameTGpOfRank();              //sc毛利销售排行
      this.departmentStrategyReport();        //客流趋势数据
      this.queryKeepReceptionStatistics();
      this.queryReceptionStatistics()
      this.querySalesManageOrderReports();    //当月精品 金融 保险板块（渗透率）
      this.queryCarTGpAvgOfInvoiced();        //当月精品 金融 保险板块（毛利） 当月累计单台车辆毛利
      this.queryUsedCarOrderOfInvoiced();     //查询二手车评估台数
      this.getTGPInfo();                      //获取T.GP值
      this.getStoreOrderInfo();               //获取门店排名
      this.num = 1;                           //避免因为初次渲染页面时的年月变化导致重复请求
      this.getBusinessaffairsUpdateTime();    //获取商务政策页面的更新时间
      this.getMarketUpdateTime();             //获取市场活动页面的更新时间
      this.getMainFinanceUpdateTime();        //获取金融热销方案页面的更新时间
      this.getskuCombUpdateTime();            //获取组合商品设置页面的更新时间
      this.getLeftPageUpdateTime();           //剩余四个页面的更新时间
    },
    // 获取商务政策页面的更新时间
    getBusinessaffairsUpdateTime(){
        api.dashboard.getBusinessaffairsUpdateTime( { storeCodes: this.storeCode }, res => {
            if(res.data.code == 'success'){
                if( res.data.obj.list && res.data.obj.list.length > 0 && res.data.obj.list[0].updateTimeStr){
                  let time = res.data.obj.list[0].updateTimeStr
                  this.settingList[2].time = `${ Number(time.slice(5,7)) }月${ Number(time.slice(8,10)) }日`
                }else{
                  this.settingList[2].time = '-月-日'
                }
                
            }
        })
    },
    // 获取市场活动页面的更新时间
    getMarketUpdateTime(){
        api.dashboard.getMarketUpdateTime( { storeCodes: [this.storeCode] }, res => {
            if(res.data.code == 'success'){
                if( res.data.obj.list && res.data.obj.list.length > 0 && res.data.obj.list[0].updateTimeStr){
                  let time = res.data.obj.list[0].updateTimeStr
                  this.settingList[4].time = `${ Number(time.slice(5,7)) }月${ Number(time.slice(8,10)) }日`
                }else{
                  this.settingList[4].time = '-月-日'
                }
            }
        })
    },
    // 获取金融热销方案页面的更新时间
    getMainFinanceUpdateTime(){
        api.dashboard.getMainFinanceUpdateTime( { storeCodes: [this.storeCode] }, res => {
            if(res.data.code == 'success'){
                if( res.data.obj.list && res.data.obj.list.length > 0 && res.data.obj.list[0].updateTimeStr){
                  let time = res.data.obj.list[0].updateTimeStr
                  this.settingList[5].time = `${ Number(time.slice(5,7)) }月${ Number(time.slice(8,10)) }日`
                }else{
                  this.settingList[5].time = '-月-日'
                }
            }
        })
    },
    // 获取组合商品设置页面的更新时间
    getskuCombUpdateTime(){
        api.dashboard.getskuCombUpdateTime( { onOffFlag: 1 }, res => {
            if(res.data.code == 'success'){
                if( res.data.obj.list && res.data.obj.list.length > 0 && res.data.obj.list[0].updateTimeStr){
                  let time = res.data.obj.list[0].updateTimeStr
                  this.settingList[7].time = `${ Number(time.slice(5,7)) }月${ Number(time.slice(8,10)) }日`
                }else{
                  this.settingList[7].time = '-月-日'
                }
            }
        })
    },
    // 剩余四个页面的更新时间
    getLeftPageUpdateTime(){
        api.dashboard.getLeftPageUpdateTime( { storeCode: this.storeCode }, res => {
            if(res.data.code == 'success'){
                if( res.data.obj ){         
                  this.settingList.forEach((item,index) => {
                    if(item.code && res.data.obj[item.code]){
                       item.time = `${ Number(res.data.obj[item.code].slice(5,7)) == 0 ? '-' : Number(res.data.obj[item.code].slice(5,7)) }月${ Number(res.data.obj[item.code].slice(8,10)) == 0 ? '-' : Number(res.data.obj[item.code].slice(8,10)) }日`
                    }else if(item.code && !res.data.obj[item.code]){
                       item.time = '-月-日'
                    }
                  })
                }else{
                  this.settingList.forEach((item,index) => {
                    if(item.code && !res.data.obj[item.code]) item.time = '-月-日'
                  })
                }
            }
        })
    },
    // 判断数据报表部分是否显示
    jurisdictionShow(){
      let _this = this
      let postnTypes = JSON.parse(common.getSession('userInfo')).postnTypes;
      postnTypes.forEach((item) => {
        if(_this.refDetailValue.indexOf(item) >= 0){
          _this.jurisdiction = true
        }
      })
    },
    getCurrentTime() {
      // 调取服务端时间
      api.CurrentTime.getCurrentTime(res => {
        this.serviceTime = res.data;
        this.salesYear = res.data.slice(0, 4);
        this.salesMonths = res.data.slice(5, 7);
        this.salesMonth = res.data.slice(5, 7);
        this.YearAndMonth = res.data.slice(0,7);
        this.currentTime = res.data.slice(0, 7);
        this.yearData = this.salesYear
        this.month = this.salesMonth
        this.yearMonth = this.salesYear + '-' + this.salesMonth 
      })
    },
    //判断对象是否拥有一个属性
    hasOwnProperty(data,property){
		 	 return (data.hasOwnProperty(property) ? Math.round(((data[property]['targetKpiValue']) * (data[property]['targetKpiValueRate'] / 100))) : 0)
		 },
    // 门店编码选项变化的时候调用不同的接口
    selectedfun(arg1,arg2){
      this.goods_gp_avg = 0.0;
      this.insurance_gp_avg = 0.0,
      this.finance_gp_avg = 0.0,
      this.skuRate = 0;
      this.storeCode = arg2.value;          //门店编码
      let that = this;
      if(this.storeCode != '' && this.storeCode != undefined){
        this.initPage();
        
      }
    },
    //请求客流-进店线索数板块
    queryInStoreClueInfo(){
      api.dashboard.queryInStoreClueInfo({storeCode: this.storeCode, salesYear: this.yearData, salesMonth: this.month}, {loadingType: false}, (res) => {
        if(res.data.code == 'success'){
          if(res.data.obj.theMonthPredict <= res.data.obj.theMonthActual){
            this.passengerFlow.targetVal = 0
          }else{
            this.passengerFlow.targetVal = res.data.obj.theMonthPredict;       //当月计划线索数
          }
          this.passengerFlow.toDayVal = res.data.obj.toDayActual               //今日客流数
          this.passengerFlow.nowTargetVal = res.data.obj.theMonthActual;       //当月实际线索数量
          this.passengerFlow.toDayActual = res.data.obj.toDayActual;           //今日客流总数
        }
      });
    },
    //订单板块
    queryOrderInforNums(){
      api.dashboard.queryOrderInforNums({storeCode: this.storeCode, salesYear: this.yearData, salesMonth: this.month}, {loadingType: false}, (res) => {
        if(res.data.code == 'success'){
          if(res.data.obj.theMonthPredict <= res.data.obj.theMonthActual){
            this.orderForm.targetVal = 0
          }else{
            this.orderForm.targetVal = res.data.obj.theMonthPredict;         //当月预计订单
          }
          this.orderForm.nowTargetVal = res.data.obj.theMonthActual;         //当月实际订单
          this.orderForm.toDayVal = res.data.obj.toDayActual;                //当日实际订单toDayActual
          if(this.num < 2) this.orderForm.toDayTarget = (res.data.obj.toDayPredict * 1)   //今日目标
        }
      });
    },
    //交车板块
    queryTheMonthDeliveryReal(){
      api.dashboard.queryTheMonthDeliveryReal({storeCode: this.storeCode, salesYear: this.yearData, salesMonth: this.month}, {loadingType: false}, (res) => {
        if(res.data.code == 'success'){
          if(res.data.obj.theMonthPredict <= res.data.obj.theMonthActual){
            this.handOverCar.targetVal = 0
          }else{
            this.handOverCar.targetVal = res.data.obj.theMonthPredict;         //当月预计交车
          }
          this.handOverCar.nowTargetVal = res.data.obj.theMonthActual;         //当月实际交车
          if(this.num < 2) this.handOverCar.toDayTarget = (res.data.obj.toDayPredict * 1);     //当日预计交车
          this.handOverCar.toDayVal = res.data.obj.toDayActual;                //当日实际交车
        }
      });
    },
    //库存板块
    queryPureStockInfoNums(){
      api.dashboard.queryPureStockInfoNums({storeCode: this.storeCode}, {loadingType: false}, (res) => {
        if(res.data.code == 'success'){
          this.inventory.targetVal = res.data.obj.totalStockNums;                    //当前库存总量
          this.inventory.nowTargetVal = res.data.obj.totalNoInDeceitStockNums;       //未开票上报库存
          this.inventory.lockVal = res.data.obj.totalOrderLockNums;                  //订单锁定库存
        }
      });
    },
    //整车开票板块
    queryPureInvoicerOrderNums() {
      let flag = true;
      api.dashboard.queryPureInvoicerOrderNums(
        { storeCode: this.storeCode, salesYear: this.yearData, salesMonth: this.month },
        { loadingType: false },
        res => {
          if (res.data.code == "success") {
            this.toDayDate = res.data.obj.TODayDate;                               //服务器端获取的当天日期
            this.kLineObj.facTargetNum = [];
            this.kLineObj.groupTargetNum = [];
            this.kLineObj.theDay = [];
            this.kLineObj.theMonth = [];
            for (let i in res.data.obj.toDaymap) {
              this.kLineObj.facTargetNum.push(res.data.obj.FacTargetNum);           //厂家目标
              this.kLineObj.groupTargetNum.push(res.data.obj.GroupTargetNum);       //集团目标
              //根据当前日期截取数据
              if (flag) {
                this.kLineObj.theDay.push(res.data.obj.toDaymap[i]);               //单日整车开票数
                this.kLineObj.theMonth.push(res.data.obj.toMonthmap[i]);           //当月累计整车开票数
              }
              if (this.toDayDate == i) {
                flag = false;
              }
            }
          }
        }
      );
    },
    // 展厅客流趋势图
    // 当月客流目标
    departmentStrategyReport(){
      let zttime = this.yearData + '-' + this.month
      let options = {
          storeCode: this.storeCode,
          // dateVersion: this.YearAndMonth
          // dateVersion: common.getPreMonth(this.serviceTime.slice(0,11))
          dateVersion: common.getPreMonth(zttime)
      }
      // api.dashboard.departmentStrategyReport(options,res => {
      //   console.log(res);
      //   if(res.data.code == "success"){
      //       let data = res.data.obj.storeTargetMaps
      //       let passengerTarget = 0;
      //       let passengerResidueTarget = 0;
      //       let sevenstoreTargetNum = (data.LeadsChannelDormancycrossDeptInStoreDormancyRate || 0) + (data.LeadsChannelBuyAgaincrossDeptInStoreBuyAgainRate || 0)
      //       + (data.LeadsChannelActivecrossDeptInStoreActiveRate || 0) + (data.LeadsChannelIncomingcrossDeptInStoreIncomingRate || 0) + (data.leadsSourceClassifyActiveCollectorcrossDeptInStoreActiveCollectorRate || 0)
      //       + (data.LeadsChannelRecommendcrossDeptInStoreRecommendRate || 0) + (data.leadsSourceClassifyWebcrossDeptInStoreWebRate || 0)
      //       passengerTarget = (res.data.obj.kpiMaps.LeadsChannelCustomercrossDeptInStoreCustomerRate || 0) + sevenstoreTargetNum
      //       passengerResidueTarget = (data.LeadsChannelCustomercrossDeptInStoreCustomerRate || 0) + sevenstoreTargetNum
      //       this.monthArr.forEach( v => {
      //         this.passengerLineObj.passengerTarget.push(passengerTarget)
      //         this.passengerLineObj.passengerResidueTarget.push(passengerResidueTarget)
      //     })
      //   }
      // })
      api.policyTable.queryCrossDeptPolicyActualInfo(options, res=>{  
        let _this = this
          if(res.data.code == "success"){
            if( res.data.obj ){
            let returnDate = res.data.obj
            let activeCustomers = 0
            let sleepCustomers = 0
            activeCustomers = (returnDate.hasOwnProperty('LeadsChannelActivecrossDeptLeadCount') ? (Math.round(returnDate.LeadsChannelActivecrossDeptLeadCount.beginningLeadsNum)) : 0)
            sleepCustomers = (returnDate.hasOwnProperty('LeadsChannelDormancycrossDeptLeadCount') ? (Math.round(returnDate.LeadsChannelDormancycrossDeptLeadCount.beginningLeadsNum)) : 0)

          let option = {
          storeCode: this.storeCode,
          // dateVersion: this.YearAndMonth
          dateVersion: zttime
      }
            api.policyTable.queryCrossDeptKpiInfo(option, res=>{
              if(res.data.code == "success"){
                if(res.data.obj){
                  let data = res.data.obj
                  let passengerTarget = 0
                  passengerTarget = (Number(activeCustomers)) * ((data.hasOwnProperty('LeadsChannelActivecrossDeptInStoreActiveRate') ? data.LeadsChannelActivecrossDeptInStoreActiveRate.targetKpiValueRate : 0) / 100)
                  + _this.hasOwnProperty(data,'leadsSourceClassifyActiveCollectorcrossDeptInStoreActiveCollectorRate')  //主动集客进店线索数
                  + this.hasOwnProperty(data,'leadsSourceClassifyWebcrossDeptInStoreWebRate')                            //网络进店线索数 
                  + this.hasOwnProperty(data,'LeadsChannelIncomingcrossDeptInStoreIncomingRate')                         //呼入进店线索数 
                  + Math.round(((data.hasOwnProperty('LeadsChannelCustomercrossDeptInStoreCustomerRate')) ? data.LeadsChannelCustomercrossDeptInStoreCustomerRate.targetKpiValue : 0 ))  //散客客流
                  + this.hasOwnProperty(data,'LeadsChannelBuyAgaincrossDeptInStoreBuyAgainRate')                          //再购进店线索数           
                  + this.hasOwnProperty(data,'LeadsChannelRecommendcrossDeptInStoreRecommendRate')                        //推荐进店线索数
                  + Math.round(Number(sleepCustomers) * ((Number(data.LeadsChannelDormancycrossDeptInStoreDormancyRate.targetKpiValueRate)) / 100))    //休眠进店线索数 
                  let passengerResidueTarget = (Number(activeCustomers)) * ((data.hasOwnProperty('LeadsChannelActivecrossDeptInStoreActiveRate') ? data.LeadsChannelActivecrossDeptInStoreActiveRate.targetKpiValueRate : 0) / 100)
                  + _this.hasOwnProperty(data,'leadsSourceClassifyActiveCollectorcrossDeptInStoreActiveCollectorRate')  //主动集客进店线索数
                  + this.hasOwnProperty(data,'leadsSourceClassifyWebcrossDeptInStoreWebRate')                            //网络进店线索数
                  + this.hasOwnProperty(data,'LeadsChannelIncomingcrossDeptInStoreIncomingRate')                         //呼入进店线索数
                  + Math.round((((data.hasOwnProperty('LeadsChannelCustomercrossDeptInStoreCustomerRate')) ? (data.LeadsChannelCustomercrossDeptInStoreCustomerRate.targetKpiValue) : 0) * (data.LeadsChannelCustomercrossDeptInStoreCustomerRate.targetKpiValueRate / 100)))  //留档客流
                  + this.hasOwnProperty(data,'LeadsChannelBuyAgaincrossDeptInStoreBuyAgainRate')                          //再购进店线索数
                  + this.hasOwnProperty(data,'LeadsChannelRecommendcrossDeptInStoreRecommendRate')                        //推荐进店线索数
                  + Math.round(Number(sleepCustomers) * ((Number(data.LeadsChannelDormancycrossDeptInStoreDormancyRate.targetKpiValueRate)) / 100))    //休眠进店线索数
                  this.monthArr.forEach( v => {
                    this.passengerLineObj.passengerTarget.push(Math.round(passengerTarget))
                    this.passengerLineObj.passengerResidueTarget.push(Math.round(passengerResidueTarget))
                  })
                }else{
                  this.monthArr.forEach( v => {
                    this.passengerLineObj.passengerTarget.push(0)
                    this.passengerLineObj.passengerResidueTarget.push(0)
                })
            }
              }
            })
            } else{
              this.monthArr.forEach( v => {
                  this.passengerLineObj.passengerTarget.push(0)
                  this.passengerLineObj.passengerResidueTarget.push(0)
                })
            }
          }
      })
    },
    //留档客流数据
    queryKeepReceptionStatistics(){
      let options = {
        storeCodes: [this.storeCode],
        // monthStr: this.salesMonths,
        // yearStr: this.salesYear
        monthStr: this.month,
        yearStr: this.yearData
      }
      api.dashboard.queryKeepReceptionStatistics(options, res => {
        let _this = this
        let flag = true
        if(res.data.code == "success"){
          let KeepReceptionStatisticsCount = res.data.obj
          let KeepReceptionStatisticsCountArr = {}
          let KeepReceptionStatisticsCountNum = 0
          this.monthArr.forEach( v =>{
            KeepReceptionStatisticsCountArr[v] = 0
          })
          KeepReceptionStatisticsCount.forEach( v =>{
            if(KeepReceptionStatisticsCountArr[v.date] !==null){
                KeepReceptionStatisticsCountArr[v.date] = v.count
            }
          })
          for(let i in KeepReceptionStatisticsCountArr){
            if(flag){
              _this.passengerLineObj.KeepReceptionStatisticsCountArr.push(KeepReceptionStatisticsCountArr[i])
              _this.passengerLineObj.totalKeepReceptionStatisticsCountArr.push( KeepReceptionStatisticsCountNum += KeepReceptionStatisticsCountArr[i])
            }
            if (this.toDayDate == i) {
                flag = false;
              }
          }
        }
      })
    },
    // 统计客流数据
    queryReceptionStatistics(){
      let options = {
        storeCodes: [this.storeCode],
        // monthStr: this.salesMonths,
        // yearStr: this.salesYear
        monthStr: this.month,
        yearStr: this.yearData
      }
      api.dashboard.queryReceptionStatistics(options ,res => {
        let _this = this
        let flag = true                                           //用于标记当前日,用于截止日期
        let totalReceptionStatisticsCountNum = 0
        if(res.data.code == "success"){
          let ReceptionStatisticsCount = res.data.obj
          let ReceptionStatisticsCountArr = {}                     //声明一个对象用于存储1-30数据
          this.monthArr.forEach( v =>{                             //先默认每日数据为0放入
            ReceptionStatisticsCountArr[v] = 0
          })
          ReceptionStatisticsCount.forEach( v =>{                   //遍历将返回的数据放入ReceptionStatisticsCount覆盖掉上面的0
            if(ReceptionStatisticsCountArr[v.date] !== null){
              ReceptionStatisticsCountArr[v.date] = v.count
            }
          })
          for(let i in ReceptionStatisticsCountArr){
            if(flag){
              _this.passengerLineObj.ReceptionStatisticsCountArr.push(ReceptionStatisticsCountArr[i])                     //将当月所有数据放入data中传给组件
              _this.passengerLineObj.totalReceptionStatisticsCountArr.push( totalReceptionStatisticsCountNum += ReceptionStatisticsCountArr[i])    //累加当月数据放入data中传给组件
            }
            if (this.toDayDate == i) {                 
                flag = false;
              }
          }
        }
      })

    },
    //获取当前月的天数
    DaysInMonth(data) {
      let _this = this
      _this.monthArr = []
      let d = data == undefined ? new Date() : new Date(this.yearMonth)
      let days = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      for(let i= 1;i <= days.getDate();i++ ){
          i = i < 10 ? '0'+i : i
          _this.monthArr.push(this.yearData + '-' + this.month + '-' + i)
      }
    },
    // 获取数据字典GP排行
    getGPSortType() {
      let options = { refCode: config.ref.gpSortType };
      api.ref.getDataDictionarys(options, res => {
        if (res.data.code === "success") {
          let gpSortInfo = [];                                                            // 用于存储GP排名信息
          let maxRefDetailName = "";                                                      //定义最大GP值
          let maxRefDetailArr = []                                                        //用于存储GP值
          let maxRefDetailPercentage = ""                                                 //定义最大GP%
          let maxRefDetailArrPercentage = []                                               //用于存储GP%值
          let referenceDetailInfos = res.data.obj.referenceDetailInfos;                    //将数据字典中的数据取出
          referenceDetailInfos.forEach(referenceDetailInfo => {
              if(referenceDetailInfo.refDetailName.indexOf("%") === -1){                   //将GP值放入maxRefDetailArr
                maxRefDetailArr.push(referenceDetailInfo.refDetailName.slice(2))
              }
              if(referenceDetailInfo.refDetailName.indexOf("%") !== -1){                   //将GP%放入maxRefDetailArrPercentage
                maxRefDetailArrPercentage.push(referenceDetailInfo.refDetailName.slice(2).slice(0,-1))
              }
            gpSortInfo.push({                                                              //循环遍历,将GP名和排名取出放入新数组
              value: referenceDetailInfo.refDetailName,
              sortedIndex: referenceDetailInfo.addField1
            });
          });
          maxRefDetailName = Math.max.apply(null, maxRefDetailArr)                        //找出最大GP值
          maxRefDetailPercentage = Math.max.apply(null, maxRefDetailArrPercentage)        //找出最大GP%
          this.maxRefDetailName = "GP" + maxRefDetailName
          this.maxRefDetailPercentage = "GP" + maxRefDetailPercentage + "%"
          gpSortInfo.sort((a, b) => {                                                     //将新数组中的数据重新排序
            return parseInt(a.sortedIndex) >
              parseInt(b.sortedIndex)
              ? 1
              : -1;
          });
          this.GPBoard.gpSortInfo = gpSortInfo;
        }
      });
    },
    //获取GP相关数值
    getSalesManagementGP() {
      let options = {
        salesYear: this.yearData,                                                       //当前年份
        salesMonth: this.month,                                                    //当前月份
        storeCode: this.storeCode,                                                       //选取的经销商店的Code
      };
      api.dashboard.getGPInfo(options, res => {
        let _this = this;
        let GPInfo = [];
        let GPList = [];
        if (res.data.code === "success") {
          if (res.data.obj.length > 0) {                                              //如果数据大于0
            let count = 0;                                                         
            let GPdata = res.data.obj;                                                  
            this.totalGPValue = 0                                                      //GP排名最大值
            this.totalGPPercentage = 0                                                 //GP%排名最大值
            GPdata.forEach(v => {                                                      //取出GP最大值
                if(v.gp_code == this.maxRefDetailName){
                  this.totalGPValue = v.gp_value_avg
                }
                if(v.gp_code == this.maxRefDetailPercentage){                           ////取出GP%最大值
                  this.totalGPPercentage = v.gp_value_avg
                }
            });
            _this.GPBoard.gpSortInfo.forEach(item => {
              let index = GPdata.findIndex(v => {
                return v.gp_code == item.value;
              });
              if (index >= 0 && count < 6) {                           //取前六组数据
                GPList.push({
                  gp_code: GPdata[index].gp_code,
                  gp_value_avg: GPdata[index].gp_value_avg,
                  sortedIndex: item.sortedIndex
                });
                count++;
              }
            });
          }
           if (res.data.obj.length == 0) {
                let count = 0;  
                this.totalGPValue = 0
                this.totalGPPercentage = 0                                     //返回的数据为空,则前六个都为0
                _this.GPBoard.gpSortInfo.forEach( item =>{
                   if (count < 6) {
                    GPList.push({
                    gp_code: item.value,
                    gp_value_avg: 0,
                    sortedIndex: item.sortedIndex
                  });
                  count++;
                }
                })
              }
            GPList.forEach((item, index) => {                                   //数值划分,将GP%归为一类,GP值归为一类
              let firstIndex = parseInt(index / 3);                           //[0,0,0,1,1,1]
              let secondIndex = parseInt(index % 3);                          // [0,1,2,0,1,2]
              if (secondIndex == 0) {
                GPInfo[firstIndex] = [];
              }
              if (item.gp_code.indexOf("%") < 0) {                              //GP值为一类处理
                GPInfo[firstIndex].push({
                  title: item.gp_code,
                  value:this.thousandBitSeparator( Number(item.gp_value_avg).toFixed(1))
                });
              } else if (item.gp_code.indexOf("%") >= 0) {                       //GP%为一类处理
                GPInfo[firstIndex].push({
                  title: item.gp_code,
                  value: Number(item.gp_value_avg * 100).toFixed(1) + "%"
                });
              }
            });
            this.GPInfo = GPInfo
      }
      })
    },
    //获取SC排名
    getScNameTGpOfRank() {
      let options = {
        storeCode: this.storeCode,
        salesYear: this.yearData,
        salesMonth: this.month
      };
      api.dashboard.queryScNameTGpOfRank(options,res => {
          if (res.data.code == "success") {
            if (res.data.obj.length >= 5) {                                    //店员大于五人
              let randArr = res.data.obj;
              let topRandFive = [];
              let bottomRandFive = [];
              topRandFive = randArr.slice(0, 5);                                //排名前五的销售人员信息
              bottomRandFive = randArr.slice(randArr.length - 5);               //排名后五的销售人员信息
              let scRandInfo = [];                                               //申明一个新数组用于存储前五及后五sc销售排名信息
              topRandFive.forEach((v, index) => {                                 //前五销售人员信息放入新数组
                let firstIndex = index % 5;
                scRandInfo[firstIndex] = [];
                scRandInfo[firstIndex].push({
                  rank: v.rank,
                  scName: v.scName,
                  scSalesCarNum: v.scSalesCarNum,
                  scTGpValue: v.scTGpValue
                });
              });
              bottomRandFive.forEach((v, index) => {                            //后五销售人员信息放入新数组
                let firstIndex = index % 5;
                scRandInfo[firstIndex].push({
                  rank: v.rank,
                  scName: v.scName,
                  scSalesCarNum: v.scSalesCarNum,
                  scTGpValue: v.scTGpValue
                });
              });
              this.scRandInfo = scRandInfo;
            } else if (0 <=res.data.obj.length < 5) {
              //如果返回的数据小于5的话,
              let randArr = res.data.obj;
              let topRandFive = [];
              let bottomRandFive = [];
              topRandFive = randArr.slice(0);                                     //排名前五的销售人员
              bottomRandFive = randArr.slice(0);                                   //排名后五的销售人员
              bottomRandFive.sort((a, b) => {                                       //排序
                return a.rank > b.rank ? -1 : 1;
              });
              let scRandInfo = [];
              topRandFive.forEach((v, index) => {                                //将前五sc销售人员信息放入一个scRandInfo,以便后面循环遍历
                let firstIndex = index % topRandFive.length;
                scRandInfo[firstIndex] = [];
                scRandInfo[firstIndex].push({                                   
                  rank: v.rank,
                  scName: v.scName,
                  scSalesCarNum: v.scSalesCarNum,
                  scTGpValue: v.scTGpValue
                });
              });
              bottomRandFive.forEach((v, index) => {                               //将后五sc销售人员信息放入scRandInfo
                let firstIndex = index % topRandFive.length;
                scRandInfo[firstIndex].push({
                  rank: v.rank,
                  scName: v.scName,
                  scSalesCarNum: v.scSalesCarNum,
                  scTGpValue: v.scTGpValue
                });
              });
              this.scRandInfo = scRandInfo;
            }
          }
      })
    },
    // 当月精品 金融 销售板块(当月渗透率实际)
    querySalesManageOrderReports() {
      // let salesYear = parseInt(this.serviceTime.substring(0,4));
      // let salesMonths = this.serviceTime.substring(5,7);
      this.permeability.salesYear = this.yearData;        //添加年份
      this.permeability.salesMonths = [this.month];  //添加月份
      this.permeability.storeCode = this.storeCode;   //添加门店编码
      // 获取门店名称（调接口）
      api.getUserAvailableInfo(msg => {
        if (msg.data.message === "success") {
          if(msg.data.obj.storeInfoVo && msg.data.obj.storeInfoVo.storeName) {
            this.storeName = msg.data.obj.storeInfoVo.storeName;
          }
        }
        this.permeability.storeName = this.storeName;
        let params = this.permeability;
        // 获取渗透率数据(调接口)
        api.dataReport.querySalesManageOrderReports(params,res => {
          if(res.data.code === 'success') {
            let skuObj =  res.data.obj;
            // 后端返回的渗透率数据进行遍历
            skuObj.forEach(item => {
              let skuCount = item.skuCount;                             //精品台数（净精品台数）
              let manageInvoiceCount = item.manageInvoiceCount;         //整车开票数（净开票数）
              let financialOrderNoCount = item.financialOrderNoCount;   //金融台数（净金融台数）
              let insuranceOrderNoCount = item.insuranceOrderNoCount;   //保险台数（净保险台数）
              //判断精品台数 金融台数 保险台数返回的数据是不是为零
              if(skuCount == 0) {
                this.skuRate = 0;           //精品渗透率
              }
              if(financialOrderNoCount == 0) {
                this.financialRate = 0;     //金融渗透率
              }
              if(insuranceOrderNoCount == 0) {
                this.insuranceRate = 0;     //保险渗透率
              }
              if(manageInvoiceCount == 0) {
                this.skuRate = 0;           //精品渗透率
                this.financialRate = 0;     //金融渗透率
                this.insuranceRate = 0;     //保险渗透率
              }
              if(skuCount != 0 || financialOrderNoCount != 0 || insuranceOrderNoCount != 0 && manageInvoiceCount != 0) {
                this.skuRate = this.thousandBitSeparator((skuCount / manageInvoiceCount * 100).toFixed(1));                     //精品渗透率计算公式
                this.financialRate = this.thousandBitSeparator((financialOrderNoCount / manageInvoiceCount * 100).toFixed(1));  //金融渗透率计算公式
                this.insuranceRate = this.thousandBitSeparator((insuranceOrderNoCount / manageInvoiceCount * 100).toFixed(1));  //保险渗透率计算公式
              }
            })
          }
        });
      })
    },
    //当月精品 金融 销售板块(当月累计毛利)  当月累计单台车辆毛利
    queryCarTGpAvgOfInvoiced() {
      // let salesYear = parseInt(this.serviceTime.substring(0,4));
      // let salesMonths = this.serviceTime.substring(5,7);
      this.carMaori.storeCode = this.storeCode;                    //添加门店编码
      // this.carMaori.salesYear = salesYear.toString();   
      this.carMaori.salesYear = this.yearData;                     //添加当前年份
      this.carMaori.salesMonth = this.month;                      //添加当前月份
      // 请求当前累计单台车辆毛利数据
      let params = this.carMaori;
      let param = this.maori;
      let that = this;
      this.maori.salesYear = this.yearData;        //添加年份
      this.maori.salesMonths = [this.month];       //添加月份
      this.maori.storeCode = this.storeCode;       //添加门店编码
      // 当月累计毛利接口
      api.statement.queryOtherInfo(param,res => {
        if(res.data.code === 'success') {
          let objData = res.data.obj;
          objData.forEach(item => {
            that.competitiveProductsPgValue = this.thousandBitSeparator(item.competitiveProductsPgValue.toFixed(1));  //精品商品毛利
            that.grossrofit = this.thousandBitSeparator(item.grossrofit.toFixed(1));                                  //金融商品毛利
            that.insuranceTotalServiceFee = this.thousandBitSeparator(item.insuranceTotalServiceFee.toFixed(1));      //保险商品毛利
            that.goods_gp = item.competitiveProductsPgValue;
            that.finance_gp = item.grossrofit;
            that.insurance_gp = item.insuranceTotalServiceFee;
            // 当月累计单台车辆毛利
            api.dataReport.queryCarTGpAvgOfInvoiced(params,res => {
              if(res.data.code === 'success') {
                let objData = res.data.obj;
                let goods_car_num = objData.goods_gp_avg.goods_car_num;               //单台车辆精品毛利
                let insurance_car_num = objData.insurance_gp_avg.insurance_car_num;   //单台车辆保险毛利
                let finance_car_num = objData.finance_gp_avg.finance_car_num;         //单台车辆金融毛利
                if(goods_car_num != 0) {
                  that.goods_gp_avg = that.thousandBitSeparator((that.goods_gp / goods_car_num).toFixed(1));
                }
                if(insurance_car_num != 0) {
                  that.insurance_gp_avg = that.thousandBitSeparator((that.insurance_gp / insurance_car_num).toFixed(1));
                }
                if(finance_car_num != 0) {
                  that.finance_gp_avg = that.thousandBitSeparator((that.finance_gp / finance_car_num).toFixed(1));
                }
              }
            })
          })
        }
      })

    },
    // 查询二手车评估台数
    queryUsedCarOrderOfInvoiced() {
      // let salesYear = parseInt(this.serviceTime.substring(0,4));
      // let salesMonths = this.serviceTime.substring(5,7);
      this.usedCar.storeCode = this.storeCode;                 //添加门店编码
      this.usedCar.salesYear = this.yearData;           //添加当前年份
      this.usedCar.salesMonth = this.month;                   //添加当前月份
      // 获取二手车评估台数数据
      let params = this.usedCar;
      api.dataReport.queryUsedCarOrderOfInvoiced(params,res => {
        if(res.data.code === 'success') {
          let usedCarData = res.data.obj;
          this.used_car_num = usedCarData.used_car_num;       //二手车订单
          this.car_num = usedCarData.car_num;                 //车辆数
        }
      })
    },
    //PC端数据看板权限
    pcBoardRole() {
      let params = {refDetailCode: config.ref.pcBoardRole};
      // 调取数据字典数据
      api.ref.getDictionaryDetails(params).then(res => {
        if (res.data.code == 'success' && res.data.obj.refDetailValue) {
          let refDetailValue = res.data.obj.refDetailValue;
          this.refDetailValue = refDetailValue;
          this.jurisdictionShow()                 //判断报表是否显示
        }
      })
    },
    queryTime(time){
      if(time) time = new Date(time)
      else time =  new Date()
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      month = month < 10 ? '0' + month : month
      return year + '-' + month
    }
  },
  watch: {
    yearMonth: {
      handler(val) {
        if(this.queryTime() == this.queryTime(val)){
          this.passengerFlow.valDescribe = '今日线索客流'
          this.orderForm.valDescribe = '今日订单'
          this.handOverCar.valDescribe = '今日交车'
        }else{
          this.passengerFlow.valDescribe = '当月进店线索数'
          this.orderForm.valDescribe = '当月新增订单'
          this.handOverCar.valDescribe = '当月实际交车' 
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
  .boutiqueSalesTitle,.financialMortgageTitle,.insuranceSalesTitle {
    font-size: 16px;
    color: #151B1E;
    padding-top: 15px;
  }
  .boutiqueSales,.financialMortgage,.insuranceSales {
    border: 1px solid #BDCFD6;
    padding-left: 15px;
    padding-bottom: 15px;
  }
  .boutiqueNum {
    color: #4960AC;
    font-size: 24px;
  }
  .smallTitle {
    color: #4960AC;
    font-size: 18px;
  }
  .boutiqueText {
    font-size: 14px;
    color: #48576A;
    margin-left: 4px;
  }
  .financialNum {
    color: #2D3A83;
    font-size: 24px;
  }
  .financialText {
    color: #48576A;
    font-size: 14px;
    margin-left: 4px;
  }
  .insuranceNum {
    color: #5268AE;
    font-size: 24px;
  }
  .insuranceText {
    color: #48576A;
    font-size: 14px;
    margin-left: 4px;
  }
  .line {
    border-right: 2px solid #C2CFD6 !important;
  }
  .dashboardBtom {
    text-align: center;
  }
  .firtNum {
    color: #545D74;
    font-size: 42px;
    margin-left: 15px;
  }
  .lastNum {
    color: #979DD4;
    font-size: 32px;
  }
  .usedCar {
    color: #8991A4;
    font-size: 14px;
    padding-left: 60px;
  }
  .upIcon {
    margin-bottom: 20px;
  }
  .rightTitle {
    margin-left: 25px;
  }
  .pie-bg{
    background-color: #fff;
    margin-bottom: 30px;
  }
  strong {
    font-size: 30px;
    vertical-align: middle;
    margin-right: 5px;
  }
  span {
    vertical-align: middle;
    font-size: 22px;
    color: #7b828c;
  }
  .follow_center{
    background: #FFFFFF;
    border: 1px solid #C2CFD6;
    padding-bottom: 20px;
    h5{
      height: 60px;
      line-height: 60px;
      font-size: 15px;
      color: #151b1E;
      font-weight: 600;
      border-bottom: 1px solid #C2CFD6;
    }
    .follow_board{
      padding-top: 10px; 
      display: flex;
      .dashboard_seq{
        overflow: hidden;
        border-right: 1px solid #C2CFD6;
        flex-grow: 1;
        padding-bottom: 10px;
        p:first-child{
          height: 30px;
          span{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #151B1E;
            margin-left: 25px;
            font-weight: 700;
            cursor: pointer;
          }
          span:hover{
            color: #4960AC;
          }
          span:before{ 
            content:"";
            display: inline-block;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            margin: 0;
            position: absolute;
            left: 20px;
            top: 10px;
            background-color:pink;
          }
        }
        .board_text{
          font-size: 12px;
          color: #888888;
          height: 60px;
          margin-bottom: 6px;
        }
        .bash_btn{
          width: auto !important;
          height: 22px;
          border-radius: 11px;
          border: 1px solid #CDC9C9; 
          text-align: center;
          line-height: 22px;
          font-size: 12px;
          padding: 2px 6px; 
          color: #CDC9C9;
          img{
            margin-top: -2px;
          }
        }
        .timeleft{
          font-size: 12px;
          color: #888888;
          float: right;
          margin-top: 4px;
        }
      }
      .dashboard_seq:last-child{
        border: 0;
        p:first-child{
          span:before{
            background-color: #36C6D3 !important;
          }
        }
      }
      .dashboard_seq:nth-child(2){
        p:first-child{
          span:before{
            background-color: #A894F6 !important;
          }
        }
      }
    }
  }
  .follow_center{
    margin-bottom: 20px;
  }
  .search_center{
    .follow_board1{
      .dashboard_seq{
        border-bottom: 1px solid #C2CFD6 !important;

      }
    }
    .follow_board2{
      padding-top: 0;
      .dashboard_seq{
        padding-top: 10px;
        // background: pink;
        p:first-child{
          span:before{
            position:absolute;
            top: 20px !important;
          }
        }
      }
      
    }
  }
  .setting_center{
    background: #FFFFFF;
    border: 1px solid #C2CFD6;
    margin-bottom: 20px;
    h5{
      height: 60px;
      line-height: 60px;
      font-size: 15px;
      color: #151b1E;
      font-weight: 600;
      border-bottom: 1px solid #C2CFD6;
    }
    ul{
      padding: 10px 0 20px 0;
      margin-top: 10px;
      li{
        list-style: none;
        background: #FAFAFA;
        height: 38px;
        margin-bottom: 10px;
        line-height: 38px;
        padding-right: 5px;
        span:first-child{
          display: inline-block;
          width: 38px;
          height: 38px;
          text-align: center;
          vertical-align: middle;
          img{
            display: block;
            width: 38px;
            height: 38px;
          }
          i{
            width: 38px;
            height: 38px;
            background: #FFFFFF;
          }
        }
        span:nth-child(2){
          font-size: 13px;
          color: #48576A;
          margin-left: 5px;
          font-family: PingFangSC-Regular;
          cursor: pointer;
        }
        span:nth-child(2):hover{
          color: #4960AC;
        }
        span:last-child{
          color: #BDBDBD;
          font-size: 12px;
          float: right;
        }
        .no_setting{
          color: #F11E15 !important;
        }
      }
    }
  }
  .storeOrder{
    border: 1px solid #C2CFD6;
    display: flex;
    padding: 20px 0;
    .seqwraps{
      flex: 1;
      justify-content: center;
	    align-items: center;
      .storeOrder_seq{
        height: 104px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
        }
        div{
          padding-top: 15px; 
          margin-left: 10px;
        }
        p:nth-of-type(1){
          font-size: 30px;
          color: #F11E15;
          margin: 0;
        }
        .group_rate{
          color: #151B1E !important;
          span{
            font-size: 30px;
            color: #151B1E !important;
          }
        }
        p:nth-of-type(2){
          font-size: 16px;
          color: #888888;
        }
      }
      
    }
    .seqwraps:first-child{
      border-right: 2px solid #EBEEF3;
    }
  }
</style>

