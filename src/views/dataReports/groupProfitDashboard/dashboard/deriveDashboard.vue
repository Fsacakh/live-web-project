<template>
    <div>
        <b-card>
            <div class="card-top" @click="router">
                <h5 class="pull-left">衍生业务</h5>
                <div class="modal-img" @click.stop="showHintModal('DerivativeServicesModule')"><img src="../../../../assets/img/exclamation.png" alt=""></div>
                <div class="pull-right more"> more ></div>
                <div class="pull-right" style="padding-right: 20px">
                    集团排名
                    <span class="bigNum" :class="{green:Number(deriveID.groupAverageRate) > ( deriveID.percent / deriveID.target).toFixed(3),red:Number(deriveID.groupAverageRate) < ( deriveID.percent / deriveID.target).toFixed(3)}">{{ deriveID.rankingValue ? deriveID.rankingValue : '-' }}</span>/{{ deriveID.totalStoreNum }}
                </div>
                
            </div>
            <div class="card-text">
                <div class="content">
                    <div class="left">
                        <div class="cvx">
                            <bubble :ID="deriveID"></bubble>
                        </div>
                        <div class="content-bottom">
                            <practicalAndtarget :DATA="deriveID">
                            </practicalAndtarget>
                            <div class="preMonth">
                                <span>集团平均</span><span>{{ toDecimal(deriveID.groupAverageRate) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <table>
                            <thead>
                                <tr>
                                    <th>指标名称</th>
                                    <th>实际</th>
                                    <th>目标</th>
                                    <th>达成率</th>
                                    <th>渗透率</th>
                                    <th>平均</th>
                                    <th class="rank">排名</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, k) in deriveData" :key="k">
                                    <td>{{ dataFilter(k) }}</td>
                                    <td>{{ filterThousand(item.actualValue) }}</td>
                                    <td>{{ filterThousand(item.targetValue) }}</td>
                                    <td>{{ filterThousand(item.targetValue) == 0 ? 'N/A' : toDecimal((item.actualValue / item.targetValue) ? (item.actualValue / item.targetValue) : 0) }}</td>
                                    <td>{{ toDecimal(item.occupationRate) }}</td>
                                    <td>{{ toDecimal(item.groupAverageRate) }}</td>
                                    <td class="rank">{{ item.rankingValue ? item.rankingValue : '--' }}</td>
                                </tr>
                                <tr>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
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
import practicalAndtarget from "./practicalAndtarget";
import bubble from "./canvas";
import hintMessage from '../bModal/index'
export default {
  data() {
    return {
      light: "#ccc",
      rank: 10,
      refDetailRemark: ''
    };
  },
  props: {
    deriveID: {
      type: Object,
      default: {}
    },
    deriveData: {
        type: Object,
        default: {}
    }
  },
  methods:{
      //跳转三级页面
      router(){
          this.$router.push('derivativesDashBoard')
      },
       //百分比处理
      toDecimal(val){
            return common.toPercent(val)
        },
      //数值过大转化为万位
      filterThousand(val){
          if(Number(val) < 10000 && Number(val) > -10000){ 
              return Number(val).toFixed()
          }else{
              return (parseFloat(Number(val) / 1000)).toFixed(2) + 'k' 
          }
      },
      //过滤指标名称
      dataFilter(val){
          return config.DerivativeServicesModule[val]
      },
      //提示消息弹框
      showHintModal(val){
          this.$refs.hintMessageModal.showModal()
           api.groupProfitDashboard.queryHint({refDetailCode:val}, res =>{
          if(res.data.code == 'success'){
              this.refDetailRemark = res.data.obj.refDetailRemark
          }
      })
      }
  },
  components: {
    practicalAndtarget,
    bubble,
    hintMessage
  }
};
</script>
<style lang="scss" scoped>
.bigNum.green{
        color: #00A854;
    }
.bigNum.red{
    color: #f04134;
}
tbody {
  tr:last-child {
    td:nth-child(1) {
      &:before {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        left: 5px;
        top: 13px;
        background: #f7fbff !important;
      }
    }
  }
}
</style>
