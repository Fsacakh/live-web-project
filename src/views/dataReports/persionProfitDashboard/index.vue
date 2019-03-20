<template>
  <div class="persionDashboard">
    <b-card>
      <div class="search_top">
        <div class="row">
          <!-- <div class="col-md-3">
            <b-form-fieldset horizontal label="统计周期" label-text-align="right" :label-cols="3">
              <label><input type="radio" value="month" v-model="query.timeType">
                <span>本月</span>
              </label>
              <label><input type="radio" value="year" v-model="query.timeType">
                <span>本年</span>
              </label>
            </b-form-fieldset>
          </div> -->
          <div class="col-md-12 row">
            <div class="col-md-6">
              <b-form-fieldset horizontal label="门店筛选" label-text-align="right" :label-cols="2">
                <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
              </b-form-fieldset>
            </div>
          </div>
          <div class="col-md-12 row">
            <div class="col-md-6">
              <b-form-fieldset horizontal label="查询年月" :label-cols="2" label-text-align="right">
                <div class="row">
                  <div class="col-md-6">
                    <date-picker format="yyyy" v-model="year" type="year" @change="yearChange" placeholder="请选择年">
                    </date-picker>
                  </div>
                  <div class="col-md-6">
                    <b-form-select placehilder="请输入月份" :options="['01','02','03','04','05','06','07','08','09','10','11','12']" v-model="month" placeholder="请选择月">
                    </b-form-select>
                  </div>
                </div>
              </b-form-fieldset>
            </div>
            <div class="col-md-6 row">
              <div class="col-md-6">
                <b-form-fieldset horizontal label="岗位筛选" :label-cols="4" label-text-align="right">
                  <b-form-select :options="storePostList" v-model="storePost">
                  </b-form-select>
                </b-form-fieldset>
              </div>
              <div class="col-md-6">
                <b-form-fieldset horizontal label="SC筛选" :label-cols="3">
                  <b-form-select :options="empByPostn" placeholder="SC筛选" v-model="query.scCode">
                  </b-form-select>
                </b-form-fieldset>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 row search">
          <div class="col-md-12 text-right">
            <b-button @click="reset" size="sm" variant="variant">重置</b-button>
            <b-button size="sm" variant="primary" @click="search">查询</b-button>
          </div>
        </div>
      </div>
      <div class="dashboard_bottom">
        <div class="dashboard_bottom_left">
          <div class="ctx_left">
            <div class="header">销量达成率</div>
            <div class="canvas">
              <ctx :ID="salesVolume"></ctx>
            </div>
          </div>
          <div class="target">
            <div>销售目标</div>
            <div>
              <span class="num">{{ salesVolume.target }}</span>
              <span>辆</span>
            </div>
            <div style="margin-top: 20px">销售数量</div>
            <div>
              <span class="num">{{ salesVolume.percent }}</span>
              <span>辆</span>
            </div>
          </div>
        </div>
        <div class="dashboard_bottom_right" height="200px">
          <div class="currentDate">{{ currentDate }}</div>
          <Echarts :seriesName="seriesName" :seriesNum="seriesNum"></Echarts>
        </div>
      </div>
    </b-card>
    <div class="row">
      <div class="col-md-6">
        <dashboard :dashboardData="gatherGuestID" :Data="gatherGuestData">
          <div slot="pre">上月</div>
          <div slot="rank">排名</div>
        </dashboard>
      </div>
      <div class="col-md-6">
        <dashboard :dashboardData="receptionID" :Data="receptionData">
          <div slot="pre">上月</div>
          <div slot="rank">排名</div>
        </dashboard>
      </div>
      <div class="col-md-6">
        <dashboard :dashboardData="negotiateID" :Data="negotiateData">
          <div slot="pre">上月</div>
          <div slot="rank">排名</div>
        </dashboard>
      </div>
      <div class="col-md-6">
        <dashboard :dashboardData="deriveID" :Data="deriveData">
          <div slot="penetrationRate">渗透率</div>
          <div slot="penetrationRank">渗透率排名</div>
          <div slot="average">毛利</div>
        </dashboard>
      </div>
    </div>

  </div>
</template>
<script>
import Vue from "vue";
import api from "common/api";
import common from "./common";
import areaqueryshop from "components/iris-areaqueryshop";
import dashboard from "./dashboard/dashboardTable";
import Echarts from "./dashboard/EchartColumnar";
import ctx from "./dashboard/canvas";
import { DatePicker, Message } from "element-ui";
export default {
  data() {
    return {
      year: "",
      month: "",
      query: {
        dateVersion: "",
        storeCode: "",
        scCode: ""
      },
      storePost: '',
      storePostList: [],  //门店岗位类型
      empByPostn: [],   //岗位人员
      currentDate: "",
      seriesName: [],   //车系名称
      seriesNum: [],    //车系数量
      //销量
      salesVolume: {
        ID: "salesVolume",
        target: -1,
        percent: 0,
        startColor: "#1C29A5", 
        endColor: "#CE5A7E" 
      },
      //集客
      gatherGuestID: {
        ID: "gatherGuest",
        header: "集客",
        title: "进店线索达成率",
        target: -1,
        percent: 0,
        startColor: "#2038DE", 
        endColor: "#0DD3FF", 
        rank: '',
        totalNum: ''
      },
      gatherGuestData: [],
      //接待
      receptionID: {
        ID: "reception",
        header: "接待",
        title: "报价数达成率",
        target: -1,
        percent: 0,
        startColor: "#2038DE", 
        endColor: "#0DD3FF", 
        rank: '',
        totalNum: ''
      },
      receptionData: [],
      // 商谈
      negotiateID: {
        ID: "negotiate",
        header: "商谈",
        title: "订单达成率",
        target: -1,
        percent: 0,
        startColor: "#2038DE", //圆环渐变开始颜色
        endColor: "#0DD3FF", //结束的颜色
        rank: '',
        totalNum: ''
      },
      negotiateData: [],
      //衍生
      deriveID: {
        ID: "deriveID",
        header: "衍生业务",
        title: "精品产值完成率",
        target: -1,
        percent: 0,
        startColor: "#2038DE", //圆环渐变开始颜色
        endColor: "#0DD3FF", //结束的颜色
        rank: '',
        totalNum: ''
      },
      deriveData: [],
      totalNum: ''
    };
  },
  created(){
    this.year  = new Date()
    this.month = (new Date().getMonth()+1+'').padStart(2, '0')
    this.query.dateVersion = this.year.getFullYear() + '-' + this.month
    this.queryStorePostList()
  },
  methods: {
    //sc岗位查询
    queryStorePostList(){
      this.empByPostn = []

      let params = {
        "dateVersion":this.query.dateVersion,
        "storeCode":this.query.storeCode
        }
        api.persionDashboard.queryStorePostList(params, res =>{
        this.storePostList = []
        if (res.data.code == 'success' && res.data.obj) {
          res.data.obj.forEach(v => {
            this.storePostList.push({
              value:v.postCode,
              text: v.postName
            })
          })
        this.storePostList.length === 1 && (this.storePost = this.storePostList[0].value)
        if (this.storePostList.length === 1) {
            api.persionDashboard.queryEmpByPostn({postCode: this.storePost}, res => {
            this.empByPostn = []

              if (res.data.code == 'success' && res.data.obj ) {
                this.storePostList.length === 1 && this.empByPostn.push({value: '',text: '全部'})
                res.data.obj.forEach(v =>{
                  this.empByPostn.push({
                    value: v.empCode,
                    text: v.empCnName
                  })
                })
              }
            })
          }
        }
      })
    },
    //重置
    reset() {
      this.year = null
      this.month = null
      this.query.dateVersion = ''
      this.query.scCode = ''
      this.storePost = ''
      this.empByPostn = []

    },
    yearChange() {
      
    },
    selectStores(val1, val2) {
      this.query.storeCode = val2.value;
      if (val2.value) {
      }
    },
    search() {
      if(!this.query.storeCode){
        Message('请选择门店')
        return;
      }
      if(!this.year || !this.month){
        Message('请选择查询的年月')
        return;
      }
      this.currentDate = this.year.getFullYear() + "年" + this.month + "月"
      this.query.dateVersion = this.year.getFullYear() + '-' + this.month
      this.init()
    },

    init(){
      this.querySalesAchievementRate()
      this.queryCarSeriesContrast()
      this.queryCollectorInfo()
      this.queryReceptionInfo()
      this.queryDiscussInfo()
      this.queryDerivativesBusiness()
      this.getTotalNum()
    },
    //获取门店总数量
    getTotalNum(){
      api.persionDashboard.getTotalNum(this.query, res=> {
        if (res.data.code == "success" && res.data.obj){
         this.totalNum = this.gatherGuestID.totalNum = this.receptionID.totalNum = this.negotiateID.totalNum = this.deriveID.totalNum = res.data.obj
        } else {
          this.totalNum = this.gatherGuestID.totalNum = this.receptionID.totalNum = this.negotiateID.totalNum = this.deriveID.totalNum = '--'
        }
      })
    },
    //销量达成率
    querySalesAchievementRate() {
      api.persionDashboard.querySalesAchievementRate(this.query, res => {
        if (res.data.code == "success" && res.data.obj) {
          this.salesVolume.target = res.data.obj.targetSalesNum;
          this.salesVolume.percent = res.data.obj.actSalesNum;
        }
      });
    },
    //查询车系销量对比
    // 如果查询到的车系数量大于9,则新增一个'其他',将车系数量相加
    queryCarSeriesContrast(){
      api.persionDashboard.queryCarSeriesContrast(this.query, res => {
        this.seriesNum = []
        this.seriesName = []
        if (res.data.code == 'success' && res.data.obj.length) {
          let obj = res.data.obj
          if (obj.length <= 9 ){
              obj.forEach( v => {
              this.seriesNum.push(v.num) 
              this.seriesName.push(v.carSeriesName)
            })
            for (var i = this.seriesNum.length; 9-this.seriesNum.length > 0;i++){
              this.seriesNum.push(0) 
              this.seriesName.push('')    
            }
          } else if (obj.length > 9) {
            obj.splice(0, 8).forEach( v => {
              this.seriesNum.push(v.num) 
              this.seriesName.push(v.carSeriesName)
            })
            let otherTotal = 0
            obj.splice(0).forEach( v=> {
              otherTotal += v.num
            })
            this.seriesNum.push(otherTotal)
            this.seriesName.push('其他')
          }
        }
      })
    },
    //集客
    queryCollectorInfo(){
      api.persionDashboard.queryCollectorInfo(this.query, res => {
        this.gatherGuestData = []
        if(res.data.code == 'success' && res.data.obj){
          let obj = res.data.obj
          this.gatherGuestData.push({
              name: '有效线索',
              target: obj.effectiveLeadsTarget ? obj.effectiveLeadsTarget : '0',
              percent: obj.effectiveLeadsActual ? obj.effectiveLeadsActual : '0',
              pre: obj.lastEffectiveLeadsActual ? obj.lastEffectiveLeadsActual : '0',
              rank: '--'
            })
          this.gatherGuestData.push({
              name: '跟进拨打数',
              target: obj.followUpCallNumTarget,
              percent: obj.followUpCallNumActual,
              pre: obj.lastFollowUpCallNumActual,
              rank: '--'
            })
          this.gatherGuestData.push({
              name: '接通率',
              target: '--',
              percent: common.toPercent(obj.actCallRate),
              pre: common.toPercent(obj.lastActCallRate),
              rank: (obj.actCallRateRank ? obj.actCallRateRank : '--')  + '/' + this.totalNum
            })
          this.gatherGuestData.push({
              name: '平均通话时长',
              target: '--',
              percent: common.millisecondToDate(obj.actCallTime),
              pre: common.millisecondToDate(obj.lastActCallTime),
              rank: (obj.actCallTimeRank ? obj.actCallTimeRank : '--') + '/' + this.totalNum
            })
            this.gatherGuestData.push({
              name: '逾期率',
              target: '0%',
              percent: common.toPercent(obj.actOverdueRate),
              pre: common.toPercent(obj.lastActOverdueRate),
              rank: (obj.actOverdueRateRank ? obj.actOverdueRateRank : '--') + '/' + this.totalNum
            })
            this.gatherGuestData.push({
              name: '',
              target: '',
              percent: '',
              pre: '',
              rank: ''
            })
            this.gatherGuestID.percent = obj.inStoreLeadsAct
            this.gatherGuestID.target = obj.inStoreLeadsTarget
            this.gatherGuestID.rank = !(obj.inStoreLeadsAct && obj.inStoreLeadsTarget) ? '--' : (obj.inStoreLeadsRateRank ? obj.inStoreLeadsRateRank : '--')
        }
      })
    },
    //接待
    queryReceptionInfo(){
      
      api.persionDashboard.queryReceptionInfo(this.query, res =>{
        this.receptionData = []
        if (res.data.code == 'success' && res.data.obj){
          let obj = res.data.obj
          this.receptionData.push({
              name: '散客留档率',
              target: common.toPercent(obj.leadsTargetRate), //散客留档率目标
              percent: common.toPercent(obj.leadsActRate),  //散客留档率实际
              pre: common.toPercent(obj.lastLeadsActRate),   //
              rank: (obj.leadsActRateRank ? obj.leadsActRateRank : '--') + '/' + this.totalNum  //散客留档率排名
          })
          this.receptionData.push({
            name: '平均停留时长',
            target: '--',
            percent: common.millisecondToDate(obj.actAvgStayTime), //实际平均通话时长
            pre: common.millisecondToDate(obj.lastActAvgStayTime), //上期实际平均通话时长
            rank: (obj.actAvgStayTimeRank ? obj.actAvgStayTimeRank : '--') + '/' + this.totalNum //实际平均通话时长排名
          })
          this.receptionData.push({
            name: '首次进店试驾率',
            target: common.toPercent(obj.targetFistTryCarRate), //首次进店试驾率-目标
            percent: common.toPercent(obj.actFistTryCarRate), //首次进店试驾率-实际
            pre: common.toPercent(obj.lastActFistTryCarRate), //首次进店试驾率-上期
            rank: (obj.actFistTryCarRateRank ? obj.actFistTryCarRateRank : '--')  + '/' + this.totalNum //首次进店试驾率排名
          })
          //已下代码无用,新增代码为了行数保持统一美观
          for (let i =0; i<=2; i++){
              this.receptionData.push({
                name: '',
                target: '', 
                percent: '', 
                pre: '', 
                rank: '' 
              })
          }
          this.receptionID.percent = obj.actCreateOrderNum //实际报价数量
          this.receptionID.target = obj.targetCreateOrderNum //目标报价数量
          this.receptionID.rank =  !(obj.actCreateOrderNum && obj.targetCreateOrderNum) ? '--' :   (obj.createOrderRateRank ? obj.createOrderRateRank : '--') //报价率排名
        }
      })
    },
    //商谈
    queryDiscussInfo(){
      
      api.persionDashboard.queryDiscussInfo(this.query, res =>{
        this.negotiateData = []
        if (res.data.code == 'success' && res.data.obj){
          let obj = res.data.obj
          this.negotiateData.push({
            name: '订单数',
            target: obj.targetOrderNum, //目标订单数
            percent: obj.actOrderNum, //实际订单数
            pre: obj.lastActOrderNum, //上期-实际订单数
            rank: '--' //订单率排名
          })
          this.negotiateData.push({
            name: '零售开票数',
            target: obj.targetFinishCarNum, //目标零售开票数
            percent: obj.actFinishCarNum, //实际零售开票数
            pre: obj.lastActFinishCarNum, //上期-实际零售开票数
            rank: '--'
          })
          this.negotiateData.push({
            name: '交车数',
            target: '--', //目标零售开票数
            percent: obj.actFinishCarNum, //实际零售开票数
            pre: obj.lastActFinishCarNum, //上期-实际零售开票数
            rank: '--'
          })
          this.negotiateData.push({
            name: '超限占比率',
            target: '--', 
            percent: obj.approvalRate ? common.toPercent(obj.approvalRate) : '0%', //超限占比率
            pre: obj.lastApprovalRate ? common.toPercent(obj.lastApprovalRate) : '0%', // 超限占比率-上期
            rank: (obj.approvalRateRank ? obj.approvalRateRank : '--')  + '/' + this.totalNum //超限占比率-排名
          })
          this.negotiateData.push({
            name: '批售·零售',
            target: '--', 
            percent: obj.actBatchSale + '/' + obj.actRetailSale, //超限占比率
            pre: obj.lastActBatchSale + '/' + obj.lastActRetailSale, // 超限占比率-上期
            rank: '--' 
          })
          this.negotiateData.push({
            name: '',
            target: '', 
            percent: '', 
            pre: '', 
            rank: '' 
          })
          this.negotiateID.percent = obj.actOrderNum
          this.negotiateID.target = obj.targetOrderNum
          this.negotiateID.rank =  !(obj.actOrderNum && obj.targetOrderNum) ? '--' :   (obj.orderRateRank ? obj.orderRateRank : '--')
        }
      })
    },
    //衍生业务
    queryDerivativesBusiness(){
      
      api.persionDashboard.queryDerivativesBusiness(this.query, res =>{
        this.deriveData = []
        if (res.data.code == 'success' && res.data.obj){
          let obj = res.data.obj
          this.deriveData.push({
            name: '金融(台)',
            target: obj.targetFinanceNum, //金融目标
            percent: obj.actFinanceNum, //金融实际
            penetrationRate: common.toPercent(obj.financeRate), //金融渗透率
            penetrationRank: (obj.financeRateRank ? obj.financeRateRank : '--') + '/' + this.totalNum, //金融渗透率排名
            averageProfit: common.toThousand(obj.financeGrossProfit)  //金融毛利   && =>一false得false
          })
          this.deriveData.push({
            name: '保险(台)',
            target: obj.targetInsuranceNum, //保险目标
            percent: obj.actInsuranceNum, //保险实际
            penetrationRate: common.toPercent(obj.insuranceRate), //保险渗透率
            penetrationRank: (obj.insuranceRateRank ? obj.insuranceRateRank : '--') + '/' + this.totalNum, //保险渗透率排名
            averageProfit: common.toThousand(obj.insuranceGrossProfit) //保险毛利
          })
          this.deriveData.push({
            name: '延保(台)',
            target: obj.targetYanBaoNum, //延保目标
            percent: obj.actYanBaoNum, //延保实际
            penetrationRate: common.toPercent(obj.yanBaoRate), //延保渗透率
            penetrationRank: (obj.yanBaoRateRank ? obj.yanBaoRateRank : '--') + '/' + this.totalNum, //延保渗透率排名
            averageProfit: common.toThousand(obj.yanBaoGrossProfit) //延保毛利
          })
          this.deriveData.push({
            name: '其他服务费(台)',
            target: obj.targetOtherServiceFeeNum, //延保目标
            percent: obj.actOtherServiceFeeNum, //延保实际
            penetrationRate: common.toPercent(obj.otherServiceFeeRate), //延保渗透率
            penetrationRank: (obj.otherServiceFeeRateRank ? obj.otherServiceFeeRateRank : '--') + '/' + this.totalNum, //延保渗透率排名
            averageProfit: common.toThousand(obj.otherServiceFeeGrossProfit) //延保毛利
          })
          for (let i = 0; i<=1; i++){
              this.deriveData.push({
              name: '',
              target: '', 
              percent: '', 
              penetrationRate: '',
              penetrationRank: '', 
              averageProfit: '' 
            })
          }
          this.deriveID.percent = obj.actSkuCompletion //实际-精品产值完成率
          this.deriveID.target = obj.targetSkuCompletion //目标-精品产值完成率
          this.deriveID.rank = !(obj.actSkuCompletion && obj.targetSkuCompletion) ? '--' : (obj.skuCompletionRateRank ? obj.skuCompletionRateRank : '--')  //精品产值完成率排名
        }
      })
    }
  },
  components: {
    DatePicker,
    areaqueryshop,
    dashboard,
    Echarts,
    ctx
  },
  watch: {
    query: {
      handler(val, oldVal){
        if(val.dateVersion && val.storeCode){
          this.getTotalNum()
          this.search()
        }
      },
      deep: true
    },
    //sc查询接口联动
    'query.storeCode'(){
        this.queryStorePostList()
    },
    storePost(val, oldVal) {
      if(!val){
        return;
      }
      api.persionDashboard.queryEmpByPostn({postCode: val}, res => {
        this.empByPostn = []

        if (res.data.code == 'success' && res.data.obj ) {
          this.storePostList.length === 1 && this.empByPostn.push({value: '',text: '全部'})
          res.data.obj.forEach(v =>{
            this.empByPostn.push({
              value: v.empCode,
              text: v.empCnName
            })
          })
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.persionDashboard {
  .search {
    margin-bottom: 10px;
  }
  .search_top {
    border-bottom: 1px solid #e1e8eb;
    padding-left: 1.25rem;
  }
  //统计周期
  // label {
  //   width: 50px;
  //   height: 30px;
  //   border: 1px solid #f2f2f2;
  //   border-radius: 5px;
  //   line-height: 30px;
  //   text-align: center;
  //   input {
  //     display: none;
  //   }
  //   input:checked + span {
  //     display: inline-block;
  //     width: 100%;
  //     height: 100%;
  //     background: #244b7e;
  //     color: white;
  //     border-radius: 5px;
  //   }
  // }
  //年份选择input框添加radius
  & /deep/ .el-input .el-input__inner {
    border-radius: 5px !important;
  }
  //销量达成率
  .card-body {
    padding-bottom: 0px;
    padding-left: 0px;
  }

  .dashboard_bottom_left {
    float: left;
    overflow: hidden;
    width: 30%;
    position: relative;
    .ctx_left {
      float: left;
      position: relative;
      height: 300px;
      width: 45%;
      overflow: hidden;
      .header {
        padding-left: 1.25rem;
        padding-top: 10px;
        font-size: 20px;
        font-weight: 600;
      }
      .canvas {
        margin-top: 30px;
        overflow: hidden;
      }
    }
    .target {
      width: 45%;
      font-size: 12px;
      float: right;
      text-align: left;
      margin-top: 80px;
      margin-left: 10px;
      .num {
        line-height: 34px;
        font-size: 25px;
        font-weight: 600;
      }
    }
  }
  .dashboard_bottom_right {
    position: relative;
    width: 70%;
    height: 290px;
    float: right;
    border-left: 1px solid #c2cfd6;
    .currentDate {
      color: "#151B1E";
      position: absolute;
      top: 0.8rem;
      left: 11rem;
    }
  }
}
</style>
