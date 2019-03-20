<template lang="html">
  <div class="">
    <div v-if="!salesTable" class="card card-accent-info card-inverse">
      <div class="card-header">
        经销商店
      </div>
      <div class="card-block p-0">
        <div class="row mt-3">
          <div class="col-6 ml-1">
            <div class="border">
              <div class="tabBodyScroll">
                <Tree :expand-on-click-node=false :highlight-current=true :data="regions" :props="props" :load="loadNodeSales" lazy empty-text="暂无数据" node-key='value' @current-change="currentchange">
                </Tree>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="border-success card">
              <button type="button" class="btn btn-outline-success btn-sm btn-block">经销商店</button>
              <div class="card-block">
                <div class="text-center" v-if="!salesShop.length">
                  暂无数据
                </div>
                <div  v-for="(value , index) in salesShop">
                  <label class=""><input type="checkbox" @click="checked(value.storeCode,value.storeName)"><span>{{value.storeName}}</span></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 text-center mb-3 mt-3">
        <b-button @click="preserve" type="button" variant="primary">保存</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import API from 'common/api'
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
      regions: [],
      props: {
        label: 'name',
        children: 'zones'
      },
      salesTable: false, //销售区域的table显示
      salesShop: [],//选中的销售区域下的商店
      checkedShop: [],//选中的商店
      rangeType: "0",//0:经销商店,1:销售区域,2:行政区域
      salesShopName: "",
      shopDataArr: []//经销商店的vuex中转
    }
  },
  methods: {
    getTareaTree(type, code, sc) {
      if (type == 'sales') {
        API.area.getSalesAreaInfoByAreaCode({
          areaCode: code
        }, sc)
      } else if (type == 'shop') {
        API.finance.queryShopInfo({
          salesAreaCodes: [code],
          needPageFlag: "0"
        }, sc)
      }
    },
    loadNodeSales(node, resolve) {
      this.loadNodeType('sales', node, resolve);
    },
    loadNodeType(type, node, resolve) {
      if (node.level === 0) {
        //这里是0级目录 也就是说整个树形结构还没有东西
        this.getTareaTree('sales', config.financePro.treeArea, (msg) => {
          return resolve([{
            name: msg.data.obj.areaName,
            value: msg.data.obj.areaCode
          }]);
        })
        return;
      }
      this.getTareaTree('sales', node.data.value, (msg) => {
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
    },
    currentchange(a, b) {
      this.salesShop = [];
      this.getTareaTree('shop', a.value, (msg) => {
        if (msg.data.message == "success") {
          this.salesShop = msg.data.obj;
          this.salesShopName = a.name
        }
      })
    },
    removeTree(storeCode, isDeleted) {
      //判断选中没有，有就删除
      for (var i = 0; i < this.shopDataArr.length; i++) {
        if (this.shopDataArr[i].storeCode == storeCode) {
          this.shopDataArr.splice(i, 1);
          return true;
        }
      }
      return false;
    },
    checked(storeCode, storeName) {
      //判断选中没有，有就删除，没有就添加进去（选中它）
      if (this.shopDataArr.length != 0 && this.removeTree(storeCode)) {
        return;
      }
      API.ordinalInfo.getSequence({
        serviceCode: config.addFinanceCode.salesCode
      }, (msg) => {
        this.shopDataArr.push({
          rangeCode: msg.data.obj,
          rangeType: this.rangeType,
          financeOrgCode: this.financeCode,
          storeCode: storeCode,
          remark: storeName,
          name: this.salesShopName
        })
      })
    },
    preserve() {
      API.finance.batchInsertOrUpdata(this.shopDataArr, (msg) => {
        if (msg.data.message == 'success') {
          let data = msg.data.obj
          common.alertInfo("success");
          this.$store.dispatch('finance/preserveShop', {
            tabType: 'istabType',
          });
          for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < this.shopDataArr.length; j++) {
              if (data[i].rangeCode == this.shopDataArr[j].rangeCode) {
                this.shopDataArr[j].id = data[i].id
              }
            }
          }
          this.$store.dispatch('finance/setShopData', this.shopDataArr);
          this.$store.dispatch('finance/setTabsAcative', ['shopstatus', true])
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
    ...mapState('finance', [
      'financeCode',
    ]),
    shopData: {
      get() {
        return this.$store.state.finance.shopData
      },
      set(value) {
        // this.$store.dispatch('finance/setShopData',value);
      }
    }
  },
  watch: {
    shopDataArr: function() {
      this.$store.dispatch('finance/setShopData', this.shopDataArr);
      this.$store.dispatch('finance/setTabsAcative', ['shopstatus', false])
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

    .white {
      color: #fff;
    }

    .red {
      color: #63c2de;
    }

    .border {
      border: 2px solid #ccc;
    }

    .el-tree-node__expand-icon {
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
