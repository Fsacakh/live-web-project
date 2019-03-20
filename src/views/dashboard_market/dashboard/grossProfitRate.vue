<template>
    <div>
        <div class="tab-left tab left">
            <div class="top">
                <div class="top-left left">
                    <div class="grossMargin">{{ thousandBitSeparator(Number(totalGPValue).toFixed(1)) }}</div>
                    <div class="monthGross">当月累计综合毛利</div>
                </div>
                <div class="top-right right">
                    <div class="grossMargin">{{ Number(totalGPPercentage * 100 ).toFixed(2) }}%</div>
                    <div class="monthGross">毛利率</div>
                </div>
            </div>
            <div class="bottom">
                <div class="gpTop">
                    <!-- <table>
                        <tr>
                            <td v-for="(item, index) in GPInfo[0]" :key="index">
                                <span :class="`color${index+1}`"></span>
                                <span>{{item.title}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span>{{item.value}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td v-for="(item, index) in GPInfo[1]" :key="index">
                                <span :class="`color${index+1}`"></span>
                                <span class="distance">{{item.title}}</span>&nbsp;&nbsp;&nbsp;
                                <span>{{item.value}}</span>
                            </td>
                        </tr>
                    </table> -->
            <template v-for="(gpGroup, index) in GPInfo">
                <div class="bottom-up" :key="index">
                    <div class="up-left">
                        <span class="left-label">{{ gpGroup[0] ? gpGroup[0].title : '' }}</span>&nbsp;&nbsp;&nbsp;
                        <span class="left-data">{{ gpGroup[0] ? gpGroup[0].value : '' }}</span>
                    </div>
                    <div class="up-left">
                        <span class="left-label">{{ gpGroup[1] ? gpGroup[1].title : '' }}</span>&nbsp;&nbsp;&nbsp;
                        <span class="left-data">{{ gpGroup[1] ? gpGroup[1].value : '' }}</span>
                    </div>
                    <div class="up-left">
                        <span class="left-label">{{ gpGroup[2] ? gpGroup[2].title : '' }}</span>&nbsp;&nbsp;&nbsp;
                        <span class="left-data">{{ gpGroup[2] ? gpGroup[2].value : '' }}</span>
                    </div>
                </div>
            </template>
                </div>
            </div>
        </div>
        <div class="tab-right tab right">
            <h3>销售员毛利排名</h3>
            <table>
                <tr v-for="(item, index) in scRandInfo" :key="index">
                    <td>{{item[0].rank}}.</td>
                    <td>{{item[0].scName}}</td>
                    <td>{{ thousandBitSeparator((Number(item[0].scTGpValue)).toFixed(1))}} / {{item[0].scSalesCarNum}}台</td>
                    <td>{{item[1].rank}}.</td>
                    <td>{{item[1].scName}}</td>
                    <td>{{thousandBitSeparator((Number(item[1].scTGpValue)).toFixed(1))}} / {{item[1].scSalesCarNum}}台</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Table } from "element-ui";
Vue.use(Table);

export default {
  data() {
    return {
      totalGrossMargin: "155022",
      grossProfitRate: "1.56%"
    };
  },
  props: {
    GPInfo: Array,
    totalGPValue: [String, Number],
    totalGPPercentage: [String, Number],
    scRandInfo: Array
  },
  mounted() {
  },
  methods: {
    thousandBitSeparator(num) {
      return (
        num && (num.toString().indexOf(".") != -1
          ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
              return $1 + ",";
            })
          : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
              return $1 + ",";
            }))
      );
    }
  }
};
</script>
<style lang="scss" scoped>
  .tab {
    width: 49%;
    height: 256px;
    border: 1px solid #c2cfd6;
    text-align: center;
    .top {
      width: 100%;
      height: 170px;
      box-sizing: border-box;
      padding: 43px 0 43px 0;
      .grossMargin {
        font-size: 36px;
      }
      .monthGross {
        font-size: 12px;
        color: #536c78;
      }
      .top-left {
        width: 49%;
        height: 100%;
        border-right: 2px solid #eef1fa;
        color: #48576a;
      }
      .top-right {
        width: 50%;
        height: 100%;
        color: #48576a;
      }
    }
    .bottom {
      .gpTop {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        border-top: 1px solid #eef1fa;
        border-bottom: 1px solid #eef1fa;
        background: #f7fbff;
        color: #48576a;
        .up-left{
            text-align: left;
            padding-left: 20px;
            float:left;
            width: 33%;
        }
        .up-left{
            position: relative;
            &::before{
                content:"";
                width: 8px;
                height: 8px;
                border-radius: 4px;
                display: inline-block;
                background: #A1BFFF;
                position: absolute;
                left: 8px;
                top: 16px;
            }
        }
        .up-left:nth-child(2){
            border-left: 1px solid #eef1fa;
            border-right: 1px solid #eef1fa;
            &::before{
                background: #A1BFFF;
            }
        }
        .up-left:nth-child(1){
            &::before{
                background: #33C1E5;
            }
        }
        .up-left:nth-child(3){
            &::before{
                background: #FF9977;
            }
        }
      }
      .gpBottom {
        border-top: 0px;
        background: #fff;
      }
    }
  }
  .tab-right {
    h3 {
      height: 66px;
      line-height: 66px;
      text-align: left;
      margin-left: 20px;
      font-size: 24px;
      color: #151b1e;
    }
    table {
      color: #48576a;
      width: 100%;
      tr {
        width: 100%;
        border-top: 1px solid #eef1fa;
        height: 36px;
        &:nth-child(odd) {
          background: #f7fbff;
        }
        td:nth-child(3) {
          position: relative;
          &::after {
            content: "";
            display: inline-block;
            width: 1px;
            height: 24px;
            position: absolute;
            right: 0px;
            top: 6px;
            background: #eef1fa;
          }
        }
        td:nth-child(3n-2) {
          padding-left: 10px;
        }
      }
    }
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
</style>

