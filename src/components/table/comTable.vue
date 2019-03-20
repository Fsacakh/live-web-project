<template>
    <b-card>
        <div class="card-top">
            <h5 class="pull-left">{{ dashboardData.title }}</h5>
            <div class="pull-right">{{ dashboardData.totalNum }}</div>
        </div>
        <div class="card-text">
            <div class="content-right">
                <table>
                    <thead>
                        <tr>
                            <td style="width: 5%"></td>
                            <th v-for="(item, index) in dashboardData.thead" :key="index">{{item}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dashboardData.body" :key="index">
                          <td class="radius"></td>
                          <td v-for="(v, index) in item" :key="index">{{v}}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </b-card>
</template>
<script>

export default {
  data() {
    return {
      
    };
  },
  props: {
    dashboardData: {
      type: Object,
      default: function() {
        return {};
      }
    }
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
}
.card-text {
  .content-right {
    width: 100%;
    table {
      // text-align: center
      tr {
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #e9f0f5;
      }
      thead {
        background: #fff !important;
        th:nth-child(1) {
          padding-left: 20px;
        }
        th:nth-child(n+3){
          text-align: center
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
          &:hover{
          box-shadow: 0px 2px 2px #ccc;
          cursor: pointer;
        }
        }
        tr:nth-child(2n) {
          background: #f7fbff;
        }
        td:nth-child(n+3){
          text-align: center
        }
      }
    }
  }
}
</style>

