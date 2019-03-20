<template>
  <div class="PCDA">
    <b-card>
      <div class="row">
        <div class="col-md-6">
          <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
            <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
          </b-form-fieldset>
        </div>
        <div class="col-md-6">
            <b-form-fieldset horizontal label="年月" :label-cols="4" label-text-align="right">
              <el-date-picker v-model="year" type="month" @change="yearChange" placeholder="选择月">
              </el-date-picker>
            </b-form-fieldset>
        </div>
        <!-- <div class="col-md-12"> -->
          
        <!-- </div> -->
      </div>
      <irisCar :col="2" @callBack="backSkuCar" ref="car" :showModel="false" :showCar="false"></irisCar>
      <div class="row">
          <div class="col-md-12 text-right">
              <b-button size="sm" @click="reset">重置</b-button>
              <b-button size="sm" variant="primary" @click="search">查询</b-button>
          </div>
      </div>
    </b-card>
    <b-card>
      <div class="row dashboard">
        <div class="col-md-4 left">
          <div class="ctx-top">
            <instrument :instrumentID="instrumentID"></instrument>
          </div>
          <div class="data">
            <span>实际 &nbsp;
              <b>{{ filterThousand(instrumentID.percent) }}
                <span v-show="instrumentID.percent >= 10000  || instrumentID.percent <= -10000">k</span>
              </b>
            </span> &nbsp;|&nbsp;
            <span>目标 &nbsp;
              <b>{{ filterThousand(instrumentID.target) }}
                <span v-show="instrumentID.target >= 10000  || instrumentID.target <= -10000">k</span>
              </b>
            </span>
          </div>
        </div>
        <div class="center col-md-4">
          <div class="profit">
            <h5>销售额</h5>
            <p>
              <b>{{ filterThousand(TGPData.salesTotalPrice) }}</b>
              <span class="right" v-show="TGPData.salesTotalPrice >= 10000 || TGPData.salesTotalPrice <= -10000">K</span>
            </p>
          </div>
          <div class="profit">
            <h5>销售台次</h5>
            <p>
              <b>{{ TGPData.salesTotalCarNum ? TGPData.salesTotalCarNum : 0 }}</b>
              <span class="right">台</span>
            </p>
          </div>
          <div class="profit">
            <h5>T.GP任务</h5>
            <p>
              <b>{{ filterThousand(TGPData.tgpTargetValue) }}</b>
              <span class="right" v-show="TGPData.tgpTargetValue >= 10000 || TGPData.tgpTargetValue <= -10000">K</span>
            </p>
          </div>
          <div class="profit">
            <h5>T.GP毛利预测目标</h5>
            <p>
              <b>{{ filterThousand(TGPData.tgpForecastValue) }}</b>
              <span class="right" v-show="TGPData.tgpForecastValue >= 10000 || TGPData.tgpForecastValue <= -10000">K</span>
            </p>
          </div>
        </div>
        <div class="right col-md-4 storeRank">
          <h3>门店排名</h3>
          <div class="num">{{ storeRank }}</div>
          <p>总门店数量 {{ storeNum }}</p>
          <template v-if="storeRankHidden">
            <table>
              <tr v-for="(item, index) in storeList" :key="index">
                <td style="width: 10%" :class="{ current: query.storeCode == item[0].storeCode }">{{ item[0]['rankingValue'] }}</td>
                <td style="width: 28%" :class="{ current:query.storeCode  == item[0].storeCode }">{{ item[0].storeName.length > 8 ? item[0].storeName.slice(0,6)+'...' : item[0].storeName }}</td>
                <td style="width: 10%" :class="{ current:query.storeCode  == item[0].storeCode }">{{ item[0].reachRate == '' ? '': toDecimal(item[0].reachRate) }}</td>
                <td style="width: 1%">|</td>
                <td style="width: 10%" :class="{ current:query.storeCode  == item[1].storeCode }">{{ item[1]['rankingValue'] }}</td>
                <td style="width: 28%" :class="{ current:query.storeCode  == item[1].storeCode }">{{ item[1].storeName.length > 8 ? item[1].storeName.slice(0,6)+'...' : item[1].storeName}}</td>
                <td style="width: 10%" :class="{ current:query.storeCode  == item[1].storeCode }">{{ item[1].reachRate == '' ? '': toDecimal(item[1].reachRate) }}</td>
              </tr>
            </table>
          </template>
          <div class="rankShow" v-else>暂无门店排名</div>
        </div>
      </div>
    </b-card>
    <div class="row PCDA_Card">
      <div class="col-md-6">
        <inventoryDashboard :inventoryData="inventoryData" :inventoryID="inventoryID"></inventoryDashboard>
      </div>
      <div class="col-md-6">
        <funnelDashboard :funnelData="funnelData" :funnelID="funnelID"></funnelDashboard>
      </div>
      <div class="col-md-6">
        <marketDashboard :marketData="marketData" :marketID="marketID"></marketDashboard>
      </div>
      <div class="col-md-6">
        <deriveDashboard :deriveData="deriveData" :deriveID="deriveID"></deriveDashboard>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import common from "common/common";
import api from "common/api";
import config from "common/config";
import areaqueryshop from "components/iris-areaqueryshop";
import irisCar from 'components/iris-car'
import inventoryDashboard from "./dashboard/inventoryDashboard";
import funnelDashboard from "./dashboard/funnelDashboard";
import marketDashboard from "./dashboard/marketDashboard";
import deriveDashboard from "./dashboard/deriveDashboard";
import instrument from "./dashboard/instrumentPanel";
import { DatePicker, Message } from "element-ui";

export default {
  data() {
    return {
      isShow: true,
      year: "",
      query: {
        storeCode: "",
        dateVersion: "",
        carFactoryCode: '',
        carBrandCode: '',
        carSeriesCode: ''
      },
      storeRank: "",
      currentIndex: "",
      storeRankHidden: true,
      // 进度条
      progressBar: {
        max: 0,
        value: 0
      },
      //仪表盘
      instrumentID: {
        ID: "instrumentID",
        percent: 0, //数据实际值
        target: 0 //数据目标值
      },
      // TGP相关部分数据
      TGPData: {
        salesTotalPrice: "",
        salesTotalCarNum: "",
        tgpForecastValue: "",
        tgpTargetValue: ""
      },
      //门店排名
      storeNum: "",
      storeList: [],
      // 衍生毛利canvas
      deriveID: {
        ID: "deriveID", //domID
        percent: -1, //数据实际值
        target: 0, //数据目标值
        title: "衍生毛利达成率",
        rankingValue: "", //库存门店排名
        totalStoreNum: "", //总门店数量
        groupAverageRate: "" //集团平均
      },
      // 衍生毛利数据
      deriveData: {},
      // 销售毛利canvas
      marketID: {
        ID: "marketID", //domID
        percent: -1, //数据实际值
        target: 0, //数据目标值
        title: "预计T.GP达成",
        rankingValue: "", //
        totalStoreNum: "", //总门店数量
        TGPValue: ""
      },
      // 销售毛利数据
      marketData: {},
      //漏斗数据canvas
      funnelID: {
        ID: "funnelID", //domID
        percent: -1, //数据实际值
        target: 0, //数据目标值
        title: "零售数达成率",
        rankingValue: "", //
        totalStoreNum: "", //总门店数量
        groupAverageRate: "" //集团平均
      },
      funnelData: {},
      //库存canvas
      inventoryID: {
        ID: "inventoryID", //domID
        percent: 0, //数据实际值
        target: 0, //数据目标值
        title: "库存周转天数",
        rankingValue: "", //库存门店排名
        totalStoreNum: "", //总门店数量
        groupAverageRate: "" //集团平均
      },
      //库存表格数据
      inventoryData: {}
    };
  },
  created() {
    // this.getTimeProgress();
    this.getCurrentTime();
    // this.search()
  },
  methods: {
    //查询方法
    search () {
      if(!this.query.storeCode){
        Message('请选择门店')
        return;
      }
      if(!this.year){
        Message('请选择日期')
        return;
      }
      this.init();
    },
    //重置方法
    reset() {
      this.year = null;
      this.query.dateVersion = null;
      this.$refs.car.clear()
    },
    getCurrentTime() {
      // 调取服务端时间
      api.CurrentTime.getCurrentTime(res => {
        this.year = this.query.dateVersion = res.data.slice(0, 10);
      });
    },
    //初始化
    init() {
      this.querySalesDataInfo(); //销售台数，TGP目标，TGP预测数据，实际值
      this.queryTGPReachSort(); //门店前十排名
      this.queryStockStateModule(); //库存状态
      this.queryFunnelPerformanceModule(); // 漏斗表现
      this.querySaleMaoriModule(); //销售毛利
      this.queryDerivativeServicesModule(); //衍生业务
    },
    //选择门店
    selectStores: function(val1, val2) {
      this.query.storeCode = val2.value;
      if (val2.value) {
        // this.search()
      }
    },
    //选择车系
    backSkuCar(val){
      this.query.carFactoryCode = val.factoryCode
      this.query.carBrandCode = val.brandCode
      this.query.carSeriesCode = val.seriesCode
    },
    // 查询接口TGP达成 门店前十排名
    queryTGPReachSort() {
      api.groupProfitDashboard.queryTGPReachSort(this.query, res => {
        if (res.data.code == "success" && res.data.obj != null) {
          this.storeRankHidden = true;
          let list = res.data.obj;
          //遍历门店,取出当前门店的排名及TGP值
          list.forEach((v, i) => {
            if (this.query.storeCode == v.storeCode) {
              this.marketID.rankingValue = this.storeRank = v.rankingValue;
              this.currentIndex = i + 1;
            }
          });
          let storeList = [];
          //如果当前门店排名小于10的话并且集团门店数量大于10,将前十名门店信息展示出来
          if (this.currentIndex <= 10 && list.length > 10) {
            let rightList = list.slice(0, 5);
            let leftList = list.slice(5, 10);
            rightList.forEach((v, i) => {
              let index = i % 5;
              storeList[index] = [];
              storeList[index].push(v);
            });
            leftList.forEach((v, i) => {
              let index = i % 5;
              storeList[index].push(v);
            });
            this.storeList = storeList;
          } else if (list.length <= 5) {
            //门店数量小于等于5
            let rightList = list.slice(0, list.length);
            let leftList = [];
            for (let i = 0; i < 5 - list.length; i++) {
              rightList.push({
                storeCode: "",
                rankingValue: "",
                storeName: "",
                reachRate: ""
              });
            }
            rightList.forEach((v, i) => {
              let index = i % 5;
              storeList[index] = [];
              storeList[index].push(v);
            });
            for (let i = 0; i < 5; i++) {
              leftList.push({
                storeCode: "",
                rankingValue: "",
                storeName: "",
                reachRate: ""
              });
            }
            leftList.forEach((v, i) => {
              let index = i % 5;
              storeList[index].push(v);
            });
            this.storeList = storeList;
          } else if (list.length > 5 && list.length < 10) {
            // 门店数量大于5但是小于10
            let rightList = list.slice(0, 5);
            let leftList = list.slice(5, list.length);
            for (let i = 0; i < 10 - list.length; i++) {
              leftList.push({
                storeCode: "",
                rankingValue: "",
                storeName: "",
                reachRate: ""
              });
            }
            rightList.forEach((v, i) => {
              let index = i % 5;
              storeList[index] = [];
              storeList[index].push(v);
            });
            leftList.forEach((v, i) => {
              let index = i % 5;
              storeList[index].push(v);
            });
            this.storeList = storeList;
          } else if (
            this.currentIndex > 10 &&
            this.currentIndex == list.length - 1
          ) {
            //如果门店是倒数第二名
            let rightList = list.slice(0, 5);
            let n = this.currentIndex;
            let leftList = list.slice(n - 4, n + 2);
            rightList.forEach((v, i) => {
              let index = i % 5;
              storeList[index] = [];
              storeList[index].push(v);
            });
            leftList.forEach((v, i) => {
              let index = i % 5;
              storeList[index].push(v);
            });
            this.storeList = storeList;
          } else if (
            this.currentIndex > 10 &&
            this.currentIndex == list.length
          ) {
            //如果当前门店排名是倒数第一名
            let rightList = list.slice(0, 5);
            let n = this.currentIndex;
            let leftList = list.slice(n - 5, n + 1);
            rightList.forEach((v, i) => {
              let index = i % 5;
              storeList[index] = [];
              storeList[index].push(v);
            });
            leftList.forEach((v, i) => {
              let index = i % 5;
              storeList[index].push(v);
            });
            this.storeList = storeList;
          } else if (this.currentIndex > 10) {
            //否则
            let rightList = list.slice(0, 5);
            let n = this.currentIndex;
            let leftList = list.slice(n - 3, n + 2);
            rightList.forEach((v, i) => {
              let index = i % 5;
              storeList[index] = [];
              storeList[index].push(v);
            });
            leftList.forEach((v, i) => {
              let index = i % 5;
              storeList[index].push(v);
            });
            this.storeList = storeList;
          }
        } else {
          this.storeRankHidden = false;
          this.marketID.rankingValue = this.storeRank = 0
        }
      });
    },
    // 查询接口销售额，销售台数，TGP目标，TGP预测数据，实际值
    querySalesDataInfo() {
      api.groupProfitDashboard.querySalesDataInfo(this.query, res => {
        if (res.data.code == "success" && res.data.obj != null) {
          let data = res.data.obj;
          this.storeNum = this.inventoryID.totalStoreNum = this.marketID.totalStoreNum = this.funnelID.totalStoreNum = this.deriveID.totalStoreNum =
            data.storeNum;
          this.TGPData.salesTotalCarNum = data.salesTotalCarNum;
          this.TGPData.salesTotalPrice = data.salesTotalPrice;
          this.marketID.target = this.instrumentID.target = this.TGPData.tgpForecastValue = data.tgpForecastValue;  
          this.TGPData.tgpTargetValue = data.tgpTargetValue;
          this.marketID.percent = this.instrumentID.percent =
           data.tgpActualvalue; 
        }else{
          this.storeNum = this.inventoryID.totalStoreNum = this.marketID.totalStoreNum = this.funnelID.totalStoreNum = this.deriveID.totalStoreNum = 0
          this.TGPData.salesTotalCarNum = 0;
          this.TGPData.salesTotalPrice = 0;
          this.TGPData.tgpForecastValue = this.instrumentID.percent = 0;
          this.TGPData.tgpTargetValue = this.instrumentID.target = 0;
          this.marketID.percent = 0;
          this.marketID.target = 0
        }
      });
    },
    //查询接口   库存状态
    queryStockStateModule() {
      api.groupProfitDashboard.queryStockStateModule(this.query, res => {
        if (res.data.code == "success" && res.data.obj != null) {
          let data = res.data.obj;
          this.inventoryID.rankingValue = data.StockTurnoverKpi.rankingValue;
          this.inventoryID.target = data.StockTurnoverKpi.targetValue;
          this.inventoryID.percent = data.StockTurnoverKpi.actualValue
            ? data.StockTurnoverKpi.actualValue
            : 0;
          this.inventoryID.groupAverageRate =
            data.StockTurnoverKpi.groupAverageRate;
          //删除库存周转天数数据
          delete data.StockTurnoverKpi;
          this.inventoryData = data;
        }
      });
    },
    //查询接口   漏斗表现
    queryFunnelPerformanceModule() {
      api.groupProfitDashboard.queryFunnelPerformanceModule(this.query, res => {
        if (res.data.code == "success" && res.data.obj != null) {
          let data = res.data.obj;
          this.funnelID.target = 
          Number(data.RetailRateKpi.targetValue);
          this.funnelID.percent = 
          Number(data.RetailRateKpi.actualValue);
          this.funnelID.rankingValue = data.RetailRateKpi.rankingValue;
          this.funnelID.groupAverageRate = data.RetailRateKpi.groupAverageRate;
          delete data.RetailRateKpi;
          this.funnelData = data;
        }
      });
    },
    // 销售毛利
    querySaleMaoriModule() {
      api.groupProfitDashboard.querySaleMaoriModule(this.query, res => {
        if (res.data.code == "success" && res.data.obj != null) {
          let data = res.data.obj;
          // 平均TGP%值
          this.marketID.TGPPerValue = data.TGP.groupAverageRate;
          // T.GP毛利率
          this.marketID.occupationRate = data.TGP.occupationRate
          delete data.TGP;
          this.marketData = data;
          console.log(this.marketData)
        }
      });
    },
    //衍生业务
    queryDerivativeServicesModule() {
      api.groupProfitDashboard.queryDerivativeServicesModule(
        this.query,
        res => {
          if (res.data.code == "success" && res.data.obj != null) {
            let data = res.data.obj;
            this.deriveID.target = Number(
              data.DerivativeServiceReachRateKpi.targetValue
            );
            this.deriveID.percent = Number(
              data.DerivativeServiceReachRateKpi.actualValue
            );
            this.deriveID.rankingValue =
              data.DerivativeServiceReachRateKpi.rankingValue;
            this.deriveID.groupAverageRate =
              data.DerivativeServiceReachRateKpi.groupAverageRate;
            delete data.DerivativeServiceReachRateKpi;
            this.deriveData = data;
          }
        }
      );
    },
    //选择年份
    yearChange: function() {
      let _this = this;
        this.query.dateVersion = common.eleTimeFormatim2(this.year).slice(0, 10);
    },
    //数值过大转化为万位
    filterThousand (val) {
      if (Number(val) < 10000 && Number(val) > -10000) {
        return Number(val).toFixed(0);
      } else {
        return (Number(val) / 1000).toFixed() ;
      }
    },

    toDecimal(val) {
      return common.toPercent(val);
    },
    //获取时间进度条参数
    getTimeProgress() {
      this.progressBar.value = new Date().getDate();
      this.progressBar.max = common.getMonthDays();
    }
  },
  components: {
    areaqueryshop,
    inventoryDashboard,
    funnelDashboard,
    marketDashboard,
    deriveDashboard,
    instrument,
    DatePicker,
    irisCar
  }
};
</script>
<style lang="scss">
.PCDA {
  .el-input .el-input__inner {
    border-radius: 4px !important;
  }
  .time {
    height: 36px;
    line-height: 36px;
  }
  .progress {
    margin-top: 10px;
  }
  .dashboard {
    .left {
      .ctx-top {
        height: 250px;
      }
      .data {
        color: #8991a4;
        text-align: center;
        font-size: 14px;
        margin-top: 20px;
        b {
          color: #151b1e;
        }
      }
    }
    .center {
      border-left: 1px solid #c2cfd6;
      border-right: 1px solid #c2cfd6;
      padding: 20px;
      .profit {
        float: left;
        margin-left: 5%;
        margin-right: 5%;
        width: 40%;
        background: #f6f9ff;
        padding: 10px;
        margin-bottom: 15px;
        h5 {
          height: 45px;
          color: #244b7e;
          padding-right: 10px;
          font-size: 14px;
          font-weight: normal;
        }
        p {
          text-align: center;
          font-size: 14px;
          b {
            display: inline-block;
            width: 80%;
            text-align: center;
            font-size: 28px;
            color: #1b5de5;
          }
          .right {
            display: inline-block;
            width: 15%;
          }
        }
      }
    }
    .right.storeRank {
      h3 {
        font-size: 18px;
      }
      .num {
        padding-top: 10px;
        font-size: 40px;
        text-align: center;
        color: #000;
      }
      p {
        font-size: 14px;
        text-align: center;
        color: #8d8989;
      }
      .rankShow {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 25px;
        color: #8d8989;
      }
      table {
        color: #48576a;
        width: 100%;
        tr {
          width: 100%;
          // border-top: 1px solid #eef1fa;
          line-height: 40px;
          &:nth-child(odd) {
            background: #f7fbff;
          }
          td:nth-child(4){
            color: #eef1fa;
          }
          // td:nth-child(3) {
          //   position: relative;
          //   &::after {
          //     content: "";
          //     display: inline-block;
          //     width: 1px;
          //     height: 24px;
          //     position: absolute;
          //     right: -0.5px;
          //     top: 6px;
          //     background: #eef1fa;
          //   }
          // }
          td:nth-child(3n-2) {
            padding-left: 10px;
          }
          .current {
            background: #1469e7;
            color: white;
          }
        }
      }
    }
  }
  //组件公共样式
  //
  .PCDA_Card {
    .card-body,
    .card-block {
      padding: 0px;
      // height: 340px;
      padding-bottom: 10px;
    }
    .card-top {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      cursor: pointer;
      .more{
        font-size: 16px;
        color: #ccc;
      }
      .modal-img {
        img {
          width: 20px;
        }
        width: 20px;
        float: left;
        margin-left: 10px;
        cursor: pointer;
      }
      h5 {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
      }
      .bigNum {
        font-weight: 600;
        font-size: 25px;
        vertical-align: middle;
        // color: red;
      }
      border-bottom: 1px solid #ccc;
    }
    .content {
      padding: 10px;
      .left {
        width: 30%;
        height: 100%;
        float: left;
        padding: 10px;
        .cvx {
          position: relative;
          width: 100%;
          height: 140px;
        }
        .content-bottom {
          padding-left: 25px;
          padding-right: 25px;
        }
        .preMonth {
          margin-top: 5px;
          padding-top: 5px;
          span {
            display: inline-block;
            width: 60%;
          }
          span:nth-child(2n) {
            display: inline-block;
            width: 40%;
            text-align: right;
          }
        }
      }
      .right {
        width: 70%;
        height: 100%;
        float: left;
        table {
          .rank {
            text-align: center;
          }
          color: #48576a;
          width: 100%;
          height: 100%;
          thead {
            tr {
              background: #fff;
              th:nth-child(4n-3) {
                padding-left: 10px;
              }
              th:nth-child(4) {
                border-right: 1px solid #ccc;
              }
            }
          }
          tbody {
            tr {
              width: 100%;
              border-top: 1px solid #eef1fa;
              height: 40px;
              &:nth-child(even) {
                background: #f7fbff;
              }
              td:nth-child(4n-3) {
                padding-left: 10px;
              }
              td:nth-child(4) {
                border-right: 1px solid #ccc;
              }
              td:nth-child(1) {
                padding-left: 20px;
                position: relative;
                &:before {
                  content: "";
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  position: absolute;
                  left: 5px;
                  top: 13px;
                  background: #6e9ef1;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>


