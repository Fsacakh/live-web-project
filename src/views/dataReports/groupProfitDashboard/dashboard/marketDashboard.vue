<template>
    <div>
        <b-card>
            <div class="card-top" @click="router">
                <h5 class="pull-left">销售毛利</h5>
                <div class="modal-img" @click.stop="showHintModal('SaleMaoriModule')"><img src="../../../../assets/img/exclamation.png" alt=""></div>
                <div class="pull-right more"  @click="router"> more ></div>
                <div class="pull-right" style="padding-right: 20px">
                    集团排名 <span class="bigNum" :class="{red:Number(marketID.TGPPerValue) > ( marketID.percent / marketID.target),green:Number(marketID.TGPPerValue) < ( marketID.percent / marketID.target)}">{{ marketID.rankingValue ? marketID.rankingValue : '-' }}</span>/{{ marketID.totalStoreNum}}
                </div>
            </div>
            <div class="card-text">
                <div class="content">
                    <div class="left">
                        <div class="cvx">
                            <bubble :ID="marketID"></bubble>
                        </div>
                        <div class="content-bottom">
                            <practicalAndtarget :DATA="marketID"></practicalAndtarget>
                            <div class="preMonth">
                                <span>T.GP毛利率</span><span>{{ marketID.occupationRate ? toPercent(marketID.occupationRate) : 0 }}</span>
                                <span style="width: 60%">平均T.GP%</span><span>{{ marketID.TGPPerValue ? toPercent(marketID.TGPPerValue) : 0 }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <table>
                            <thead>
                                <tr>
                                    <th width="30%">指标名称</th>
                                    <th>实际</th>
                                    <th>目标</th>
                                    <th>达成率</th>
                                    <th>毛利率</th>
                                    <th>平均</th>
                                    <th style="text-align: center">排名</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, k) in marketData" :key="k">
                                    <td>{{ k == 'FactorySiReachKpi' ? dataFilter(k) : k == 'StoreforecastSiKpi' ? dataFilter(k) :  k == 'BatchSaleAndRetailGP1Kpi' ? dataFilter(k) : k }}</td>
                                    <td>{{ filterThousand(item.actualValue) }}</td>
                                    <td>{{ k == 'BatchSaleAndRetailGP1Kpi' ? '--' : filterThousand(item.targetValue) }}</td>
                                    <td>{{ k == 'BatchSaleAndRetailGP1Kpi' ? '--' : (filterThousand(item.targetValue) == 0 ? 'N/A' : item.targetValue < 0 ? toDecimal(2-(item.actualValue / item.targetValue)) : toDecimal(item.actualValue / item.targetValue)) }}</td>
                                    <td>{{ k == 'FactorySiReachKpi' ? '--' : (k == 'StoreforecastSiKpi') ? '--' : (k == 'BatchSaleAndRetailGP1Kpi') ? '--' : toPercent(item.occupationRate) }}</td>
                                    <td>{{ k == 'FactorySiReachKpi' ? '--' : (k == 'StoreforecastSiKpi') ? '--' : (k == 'BatchSaleAndRetailGP1Kpi') ? '--' : toPercent(item.groupAverageRate) }}</td>
                                    <td style="text-align: center">{{ item.rankingValue ? item.rankingValue : '--' }}</td>
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
            refDetailRemark: ''
        }
    },
    props:{
        marketID: {
            type: Object,
            default: {}
        },
        marketData: {
            type: Object,
            default: {}
        }
    },
    methods:{
    //跳转三级页面
    router(){
        this.$router.push('grossProfitDashboard')
    },
        //百分比处理
    toDecimal(val){
            return common.toPercent(val)
        },
     //百分比保留一位小数
    toPercent(point){
        var str=Number(point*100).toFixed(1);
        str+="%";
        return str;
    },
    //数值过大转化为万位
    filterThousand(val){
        if(Number(val) < 10000 && Number(val)> -10000 ){ 
            return Number(val).toFixed()
        }else{
            return (Number(val) / 1000).toFixed() + 'k' 
        }
    },
    dataFilter(val){
        return config.SaleMaoriModule[val]
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
.bigNum.green{
        color: #00A854;
    }
.bigNum.red{
    color: #f04134;
}
.preMonth{
    width: 100%;
    span:nth-child(2n-1){
        width: 75% !important;
        display: inline-block;
        margin-left: -20px;
    }
    span:nth-child(2n){
        width: 35% !important;
        display: inline-block;
        float: right;
    }
}
</style>
