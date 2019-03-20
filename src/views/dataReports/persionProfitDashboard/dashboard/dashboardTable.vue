<template>
    <b-card>
        <div class="card-top">
            <h5 class="pull-left">{{dashboardData.header}}</h5>
            <!-- <div class="pull-right href">查看详细</div> -->
        </div>
        <div class="card-text">
            <div class="content_left">
                <div class="content_left_top">
                    <div class="center">{{ dashboardData.title }}</div>
                    <div class="ctx">
                        <ctx :ID="dashboardData"></ctx>
                    </div>
                </div>
                <div class="content_left-bottom">
                    <targetAndPre :data="dashboardData" ></targetAndPre>
                </div>
            </div>
            <div class="content-right">
                <table>
                    <thead>
                        <tr>
                            <td style="width: 5%"></td>
                            <td><slot name="name">指标名称</slot></td>
                            <td><slot name="target">目标</slot></td>
                            <td><slot name="percent">实际</slot></td>
                            <td><slot name="pre"></slot></td>
                            <td><slot name="rank"></slot></td>
                            <td><slot name="penetrationRate"></slot></td>
                            <td><slot name="penetrationRank"></slot></td>
                            <td><slot name="average"></slot></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in Data" :key="index">
                            <td><span class="radius" v-show="item.name"></span></td>
                            <td>{{item.name}}</td>
                            <td>{{item.target}}</td>
                            <td>{{item.percent}}</td>
                            <!-- 以上三个四个模块共用 -->
                            <td>{{item.pre}}</td>
                            <td>{{item.rank}}</td>
                            <!-- 衍生业务显示 -->
                            <td>{{item.penetrationRate}}</td>
                            <td>{{item.penetrationRank}}</td>
                            <td>{{item.averageProfit}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </b-card>
</template>
<script>
import targetAndPre from "./targetAndPre";
import ctx from "./canvas";
export default {
  data() {
    return {};
  },
  props: {
    dashboardData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    Data: {
      type: Array,
      default: function (){
        return []
      }
    }
  },
  components: {
    targetAndPre,
    ctx
  }
};
</script>
<style lang="scss" scoped>
.card{
    border-radius: 5px;
}
.card-top {
  height: 30px;
  font-size: 12px;
  border-bottom: 1px solid #c2cfd6;
  .href {
    font-size: 12px;
    color: #244b7e;
    text-decoration: underline;
    cursor: pointer;
  }
}
.card-text {
  .content_left {
    float: left;
    width: 30%;
    .content_left_top {
      height: 170px;
      .center {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        font-weight: 600;
      }
      .ctx {
        position: relative;
      }
    }
    .content_left-bottom {
      padding: 0 20px;
    }
  }
  .content-right {
    float: right;
    width: 68%;
    table {
      tr {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e9f0f5;
      }
      thead {
        background: #fff !important;
        tr{
          td:nth-child(1) {
              padding-left: 20px;
            }
          td:nth-child(n+3){
              text-align: center;
            }
        }
        
      }
      width: 100%;
      tbody {
        .radius{
            margin-left: 5px;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #6E9EF1;
        }
        tr{
          td:nth-child(n+3){
            text-align: center;
          }
        }
        tr:nth-child(2n) {
          background: #f7fbff;
        }
      }
    }
  }
}
</style>

