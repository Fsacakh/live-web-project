<template>
    <div>
        <b-card>
            <div class="card-top" @click="router">
                <h5 class="pull-left">库存状态</h5>
                <div class="modal-img" @click.stop="showHintModal('StockStateModule')"><img src="../../../../assets/img/exclamation.png" alt=""></div>
                <div class="pull-right more"  @click="router"> more ></div>
                <div class="pull-right" style="padding-right: 20px">
                    集团排名
                    <span class="bigNum" :class="{green:Number(inventoryID.groupAverageRate) > ( inventoryID.percent / inventoryID.target),red:Number(inventoryID.groupAverageRate) < ( inventoryID.percent / inventoryID.target)}">{{ inventoryID.rankingValue ? inventoryID.rankingValue : '-' }}</span>/{{ inventoryID.totalStoreNum}}
                </div>
            </div>
            <div class="card-text">
                <div class="content">
                    <div class="left">
                        <div class="cvx">
                            <hotCanvas :ID="inventoryID"></hotCanvas>
                        </div>
                        <div class="content-bottom">
                            <!-- <practicalAndtarget :DATA="inventoryID"></practicalAndtarget> -->
                            <table class="tab">
                                <tr>
                                    <td>目标</td>
                                    <td>{{ inventoryID.target | toFixed(0) }} 天</td>
                                </tr>
                            </table>
                            <div class="preMonth">
                                <span>集团平均</span><span>{{ inventoryID.groupAverageRate }}天</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <table>
                            <thead>
                                <tr>
                                    <th>指标名称</th>
                                    <th>台数</th>
                                    <th>占比</th>
                                    <th>平均</th>
                                    <th class="rank">排名</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, k) in inventoryData" :key="k">
                                    <td>{{ dataFilter(k) }}</td>
                                    <td>{{parseInt(Number(item.actualValue))}}</td>
                                    <td>{{ toPercent(item.occupationRate) }}</td>
                                    <td>{{ toPercent(item.groupAverageRate) }}</td>
                                    <td class="rank">{{item.rankingValue ? item.rankingValue : '--' }} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </b-card>
        <hintMessage :refDetailRemark="refDetailRemark" ref="hintMessageModal"></hintMessage>
    </div>
</template>
<script>
import api from "common/api";
import config from "common/config";
import common from "common/common";
import hotCanvas from "./hotCanvas";
import hintMessage from "../bModal/index";
export default {
  data() {
    return {
      light: "#ccc",
      rank: 10,
      refDetailRemark: ''
    };
  },
  props: {
    inventoryID: {
      type: Object,
      default: {}
    },
    inventoryData: {
      type: Object,
      default: {}
    }
  },
  mounted(){
  },
  methods: {
    //跳转三级页面
    router(){
        this.$router.push('carModelProfitStock')
    },
    //指标名称过滤
    dataFilter(val) {
      return config.StockStateModule[val];
    },
    //百分比转换
    toPercent(val) {
      return (val * 1000) / 10 + '%'
    },
    //提示消息弹框
    showHintModal(val) {
      this.$refs.hintMessageModal.showModal();
    //   提示
      api.groupProfitDashboard.queryHint({refDetailCode:val}, res =>{
          if(res.data.code == 'success'){
              this.refDetailRemark = res.data.obj.refDetailRemark
          }
      })
    },
    //提示
  },
  components: {
    hotCanvas,
    hintMessage
  }
};
</script>
<style lang="scss" scoped>
th:nth-child(4) {
  border-right: 0px solid #ccc !important;
}
td:nth-child(4) {
  border-right: 0px solid #ccc !important;
}
.bigNum.green{
        color: #00A854;
    }
.bigNum.red{
    color: #f04134;
}
table.tab{
        width: 100%;
        font-size: 14px;
        tr{
            width: 100%;
            td{
                // text-align: center;
                width: 50%;
            }
            td:nth-child(1){
                position: relative;
                &:before{
                    content: '';
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 4px;
                    position: absolute;
                    left: -15px;
                    top: 5px;
                    background: #CFDDED;
                }
            }
            td:nth-child(2){
                text-align: right;
            }
        }
    }
</style>
