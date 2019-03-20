<template lang="html">
  <div>
    <button @click="addFinanceArea" type="button" class="btn btn-success btn-sm mb-2">新增</button>
    <table  class="table table-striped table-bordered">
      <thead>
        <tr class="text-center">
          <!-- <th class="text-center">序号</th> -->
          <th class="text-center">全国</th>
          <th class="text-center">销售区域</th>
          <th class="text-center">经销商店</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr  v-for="val in salesData">
          <th></th>
          <th>{{val.remark}}</th>
          <th>全部</th>
          <th class="text-center"><button @click="removeTree(val)" type="button" class="btn btn-danger btn-sm">删除</button></th>
        </tr>
        <tr  v-for="val in shopData">
          <th></th>
          <th>{{val.name}}</th>
          <th>{{val.remark}}</th>
          <th class="text-center"><button @click="removeTree(val)" type="button" class="btn btn-danger btn-sm">删除</button></th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import API from 'common/api.js'
import common from 'common/common.js'

import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
export default {
  data() {
    return {
      tabArr: [], //tab要渲染的数据
      salesDataArr:[],
      shopDataArr:[]
    }
  },
  methods:{
      addFinanceArea(){
        this.$store.dispatch('finance/preserveShop',{
          tabType:'home',
        });
      },
      removeTree(val){
        let obj = {
          "1":{
            data:'salesDataArr',
            code:'salesAreaCode'
          },
          "0":{
            data:'shopDataArr',
            code:'storeCode'
          },
          "2":{
            data:'shopData',
            code:'storeCode'
          }
        }
        let data = this[obj[val.rangeType].data];
        let code = obj[val.rangeType].code;
        let current = [];
        for (var i = 0; i < data.length; i++) {
          if(data[i][code] == val[code]){
              current[0] = data[i]
              data.splice(i,1);
              current[0].isDeleted = "1"; //添加一个参数是否删除
              console.log(current)
              API.finance.batchInsertOrUpdata(current, (msg) => {
                  if (msg.data.message == 'success'){
                  common.alertInfo("success");
                } else {
                  common.alertInfo("warning");
                }
              })
          }
        }
      }
  },
  computed: {
    shopData: {
    get () {
      return this.$store.state.finance.shopData
    },
    set (value) {
      // this.$store.dispatch('finance/setShopData',this.shopData);
    }
  },
  salesData:{
    get () {
      return this.$store.state.finance.salesData
    },
    set (value) {

    }
  }
  },
  watch:{
    salesDataArr:function(){
        this.$store.dispatch('finance/setSalesData',this.salesDataArr);
    },
    shopDataArr:function(){
      this.$store.dispatch('finance/setShopData',this.shopDataArr);
    }
  },
  created(){
    this.salesDataArr = JSON.parse(JSON.stringify(this.salesData))
    this.shopDataArr = JSON.parse(JSON.stringify(this.shopData))
  }
}
</script>

<style lang="css">
</style>
