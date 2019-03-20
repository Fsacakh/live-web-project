<template lang="html">
  <div class="">
    <div v-if="!salesTable" class="card card-accent-info card-inverse">
      <div class="card-header">
        销售区域
      </div>
      <div class="card-block p-0">
        <div class="row ml-2">
          <div class="col-5 mt-3">
            <div class="border">
              <div class="tabBodyScroll">
                <Tree :expand-on-click-node=false :highlight-current=true :data="regions" :props="props" :load="loadNodeSales" lazy empty-text="暂无数据" node-key='value' @current-change="currentchange">
                </Tree>
              </div>
            </div>
          </div>
          <div class="col-5 mt-3  mb-3 clearfix p-1">
            <div class="card m-0 float-left ml-2" v-for="value in salesData">
              <div class="card-body p-0 clearfix ml-1">
                {{value.remark}}
                <i @click="removeTree(value.salesAreaCode)" class="fa fa-remove bg-danger p-1  ml-3 float-right white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 text-center mb-3">
        <b-button @click="preserve" type="button" variant="primary">保存</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import API from 'common/api.js'
import common from 'common/common'
import config from 'common/config'
import {
  Tree
} from 'element-ui'
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
export default {
  data() {
    return {
      //树形结构模拟数据
      regions: [{
        'name': 'region1'
      }, {
        'name': 'region2'
      }],
      props: {
        label: 'name',
        children: 'zones'
      },
      rangeType:"1",
      salesTable:false,//销售区域的table显示
      salesDataArr:[],//销售区域的vuex中转
    }
  },
  methods: {
    getTareaTree( code, sc) {
        API.area.getSalesAreaInfoByAreaCode({
          areaCode: code
        }, sc)
    },
    loadNodeSales(node, resolve) {
      this.loadNodeType('sales', node, resolve);
    },
    loadNodeType(type, node, resolve) {
      // =========================================
      if (node.level === 0) {
        //这里是0级目录 也就是说整个树形结构还没有东西
          this.getTareaTree( config.financePro.treeArea, (msg) => {
            console.log(msg.data.obj)
            return resolve([{
              name: msg.data.obj.areaName,
              value: msg.data.obj.areaCode
            }]);
          })
          return;
      }
      this.getTareaTree(node.data.value, (msg) => {
        //获取子集
        let data = msg.data.obj.salesAreaSubInfo || 0
        let arr = [];
        if (data) {
          for (var i = 0; i < data.length; i++) {
            arr[i] = {
              name: data[i].areaName,
              value: data[i].areaCode
            }
          }
          return resolve(arr);
        }
        return resolve([])
      })
      // =========================================
    },
    currentchange(a, b) {

      //当某一行被点击的时候我先判断有没有保存过数据再判断这一行数据有没有保存过
      if (this.salesDataArr.length != 0 && this.removeTree(a.value)) {
        //说明当前这一行数据被保存过了，我就删除他
        return;
      }
      //进入这里要么没有数据要么就是当前这一行数据没保存过，那就保存一份
      API.ordinalInfo.getSequence({
        serviceCode: config.addFinanceCode.salesCode
      }, (msg) => {
        this.salesDataArr.push({
          rangeCode: msg.data.obj,
          rangeType: this.rangeType,
          financeOrgCode: this.financeCode,
          salesAreaCode: a.value,
          remark: a.name
        })
      })
    },
    removeTree(salesAreaCode,isDeleted) {
      for (var i = 0; i < this.salesData.length; i++) {
        if (this.salesData[i].salesAreaCode === salesAreaCode) {
          //说明当前这一行数据被保存过了，我就删除他
          this.salesDataArr.splice(i, 1);
          return true;
        }
      }

      return false;
    },
     preserve(){
        API.finance.batchInsertOrUpdata(this.salesData, (msg) => {
          if (msg.data.message == 'success'){
            let data = msg.data.obj;
            common.alertInfo("success");
            this.$store.dispatch('finance/preserveShop',{
              tabType:'istabType',
              istabType:true
            });
            for(var i=0;i<data.length;i++){
              for(var j=0;j<this.salesData.length;j++){
                if(data[i].rangeCode == this.salesData[j].rangeCode){
                  this.salesData[j].id = data[i].id
                }
              }
            }
            this.$store.dispatch('finance/setSalesData',this.salesData);
            this.$store.dispatch('finance/setTabsAcative',['salestatus',true])
          } else {
            common.alertInfo("error");
          }
        })
     }
  },
  components: {
    Tree
  },
  computed: {
    // mapState是vuex的辅助函数 https://vuex.vuejs.org/zh-cn/state.html#the-mapstate-helper
    // 创建组件的计算属性返回 Vuex store 中的状态
    ...mapState('finance', [
      'financeCode',
    //   'shopData',
    //   'salesData',
    //   'governmentData'
    ]),
  salesData:{
    get () {
      return this.$store.state.finance.salesData;
    },
    set (value) {
      // this.$store.dispatch('finance/setSalesData',value);
    }
  }
  },
  watch:{
    salesDataArr:function(){
      this.$store.dispatch('finance/setSalesData',this.salesDataArr);
      this.$store.dispatch('finance/setTabsAcative',['salestatus',false])
    }
  }
}
</script>
<style lang="css">
.tabBodyScroll {
        height: 250px;
        overflow: auto;
        overflow-x: hidden;
    }
    .white{
      color: #fff;
    }
    .border{
      border: 2px solid #ccc;
    }
    .el-tree-node__expand-icon{
      cursor: pointer;
    width: 0;
    height: 0;
    margin-left: 10px;
    border: 9px solid transparent;
    border-right-width: 0;
    border-left-color: #97a8be;
    border-left-width: 13px;
    -ms-transform: rotate(0);
    transform: rotate(0);
    transition: transform .3s ease-in-out;
    }
</style>
