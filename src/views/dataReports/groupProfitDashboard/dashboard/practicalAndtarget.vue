<template>
    <div>
        <table>
            <tr>
                <td>实际</td>
                <td>{{ filterThousand(DATA.percent) }}</td>
            </tr>
            <tr>
                <td>{{DATA.ID == "marketID" ? '预测' : '目标'}}</td>
                <td>{{ filterThousand(DATA.target) }}</td>
            </tr>
        </table>
    </div>
</template>
<script>
import common from "common/common";
export default {
  data() {
    return {};
  },
  props: {
    DATA: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    filterThousand(val) {
      if (this.DATA.ID == "marketID") {
        if(isNaN(val)){
          return val
        }
        if (Number(val) < 10000 && Number(val) > -10000) {
          return Number(val).toFixed();
        } else {
          return parseFloat(Number(val) / 1000).toFixed() + "k";
        }
      }
      else if( this.DATA.ID == "deriveID" ){
        if(isNaN(val)){
          return val
        }
        if (Number(val) < 10000 && Number(val) > -10000) {
          return Number(val).toFixed();
        } else {
          return parseFloat(Number(val) / 1000).toFixed(2) + "k";
        }
      } else if (this.DATA.ID == "funnelID") {
        if(isNaN(val)){
          return val
        }
        if (Number(val) <= 10000) {
          return Number(val).toFixed() + "台";
        } else {
          return parseFloat(Number(val) / 1000).toFixed() + "台";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  font-size: 14px;
  tr {
    width: 100%;
    td {
      // text-align: center;
      width: 50%;
    }
    td:nth-child(1) {
      position: relative;
      &:before {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        position: absolute;
        left: -15px;
        top: 5px;
        background: #cfdded;
      }
    }
    td:nth-child(2) {
      text-align: right;
    }
  }
  tr:nth-child(2) {
    border-bottom: 1px solid #e9f0f5;
    td:nth-child(1) {
      position: relative;
      &:before {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        position: absolute;
        left: -15px;
        top: 5px;
        background: #1f39de;
      }
    }
  }
}
</style>


