<template>
    <div>
        <b-card>
            <div class="card-top" @click="router">
                <h5 class="pull-left">漏斗表现</h5>
                <div class="modal-img" @click.stop="showHintModal('FunnelPerformanceModule')"><img src="../../../../assets/img/exclamation.png" alt=""></div>
                <div class="pull-right more"> more ></div>
                <div class="pull-right" style="padding-right: 20px">
                    集团排名 <span class="bigNum" :class="{green:Number(funnelID.groupAverageRate) > ( funnelID.percent / funnelID.target ).toFixed(3),red:Number(funnelID.groupAverageRate) < ( funnelID.percent / funnelID.target).toFixed(3)}">{{ funnelID.rankingValue ? funnelID.rankingValue : '-'}}</span>/{{ funnelID.totalStoreNum }}
                </div>
            </div>
            <div class="card-text">
                <div class="content">
                    <div class="left">
                        <div class="cvx">
                            <bubble :ID="funnelID"></bubble>
                        </div>
                        <div class="content-bottom">
                            <practicalAndtarget :DATA="funnelID"></practicalAndtarget>
                            <div class="preMonth">
                                <span>集团平均</span><span>{{ toDecimal(funnelID.groupAverageRate) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <table>
                            <thead>
                                <tr>
                                    <th>指标数</th>
                                    <th>实际</th>
                                    <th>目标</th>
                                    <th>达成率</th>
                                    <th>平均</th>
                                    <th class="rank">排名</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, k) in funnelData" :key="k">
                                    <td>{{ dataFilter(k) }}</td>
                                    <td>{{ k == 'BatchSaleKpi' ? toPercentOne(item.actualValue) : (k == 'InStoreLeadOrderRateKpi') ? toPercent(item.actualValue) : item.actualValue ? parseInt(item.actualValue): 0 }}</td>
                                    <td>{{ k == 'InStoreLeadOrderRateKpi' ? toPercent(item.targetValue) : item.targetValue == '--' ? '--' : item.targetValue ? parseInt(item.targetValue) : 0 }}</td>
                                    <td>{{ k =='RetainOrderNumKpi'? '--' : (k =='InStoreLeadOrderRateKpi') ? '--' : (k =='BatchSaleKpi') ? '--' : item.targetValue == 0 ? 'N/A' : item.targetValue == null ? 'N/A' : toDecimal(item.actualValue / item.targetValue) }}</td>
                                    <td>{{ k == 'BatchSaleKpi' ? toPercentOne(item.groupAverageRate) : (k == 'InStoreLeadOrderRateKpi') ? toPercent(item.groupAverageRate) : toDecimal(item.groupAverageRate) }}</td>
                                    <td class="rank">{{ item.rankingValue ? item.rankingValue : '--' }}</td>
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
import practicalAndtarget from './practicalAndtarget'
import bubble from './canvas'
import hintMessage from '../bModal/index'
export default {
    data () {
        return {
            light: '#ccc',
            rank: 10,
            DATA:{},
            refDetailRemark: ''
        }
    },
    props:{
        funnelID:{
            type: Object,
            default: {}
        },
        funnelData: {
            type: Object,
            default: {}
        }
    },
    mounted(){
        
    },
    methods:{
        //跳转三级页面
        router(){
            this.$router.push('funnelDashboard')
        },
        //百分比保留到个位
       toDecimal(val){
            return common.toPercent(val)
        },
        //百分比保留一位小数
        toPercent(point){
            var str=Number(point*100).toFixed(1);
            str+="%";
            return str;
        },
        //小数保留两位小数
        toPercentOne(val){
            return Number(val).toFixed(2)
        },
        // 指标名称过滤
        dataFilter(val){
            return config.FunnelPerformanceModule[val]
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
    components:{
        practicalAndtarget, bubble, hintMessage
    }
}
</script>
<style lang="scss" scoped>
    th:nth-child(4){
        border-right: 0px solid #ccc !important;
    }
    td:nth-child(4){
        border-right: 0px solid #ccc !important;
    }
    .bigNum.green{
        color: #00A854;
    }
    .bigNum.red{
        color: #f04134;
    }
</style>
