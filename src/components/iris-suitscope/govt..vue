<template lang="html">
  <div class="">
    <div v-if="!salesTable" class="card">
      <div class="card-header">
        经销商店
      </div>
      <div class="card-block">
        <div class="row mt-3">
          <div class="col-6">
            <div class="border">
              <div class="tabBodyScroll">
                <Tree :expand-on-click-node=false :check-strictly="true" :highlight-current=true :props="props" :load="loadNodeSales" lazy empty-text="暂无数据" node-key='value' @current-change="currentchange">
                </Tree>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card">
              <div class="card-header">经销商店</div>
              <div class="card-block">
                <div class="text-center" v-if="!salesShop.length">
                  暂无数据
                </div>
                <div v-for="(value , index) in salesShop">
                  <label class=""><input :checked="value.checked" type="checkbox" @click="checked(value)"><span class="ml-2">{{value.storeName}}</span></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 text-center mb-3 mt-3">
        <b-button @click="close" type="button" variant="">取消</b-button>
        <b-button @click="preserve" type="button" variant="primary">保存</b-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import API from '../../common/api'
  import common from '../../common/common'
  import config from '../../common/config'
  import {
    Tree
  } from 'element-ui'
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    props: {
      tabData: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    data() {
      return {
        //树形结构模拟数据
        props: {
          label: 'name',
          children: 'zones'
        },
        salesTable: false, //销售区域的显示
        salesShop: [], //选中的销售区域下的商店
        salesName: "", //销售区域的名字
        shopDataArr: [], //选中的经销商店
        shopDataServe: [], //查出来的已选中经销商店
        shopDataServeRemove: [] //删除的已经保存在后台的数据
      }
    },
    methods: {
      getTareaTree(type, code, sc) {
        if (type == 'sales') {
          //获取销售区域
          API.area.getSalesAreaInfoByAreaCode({
            areaCode: code
          }, sc)
        } else if (type == 'shop') {
          // 获取经销商店
          API.finance.queryShopInfo({
            salesAreaCodes: [code],
            needPageFlag: "0"
          }, sc)
        }
      },
      loadNodeSales(node, resolve) {
        // =========================================
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
        // =========================================
      },
      currentchange(a, b) {
        // 获取经销商店
        this.salesShop = []; //把经销商店先清空一遍（因为vue的缓存机制不清空checkbox会有缓存问题）
        this.getTareaTree('shop', a.value, (msg) => {
          if (msg.data.message == "success") {
            this.salesShop = msg.data.obj; //经销商店
            for (var i = 0; i < this.salesShop.length; i++) {
              for (var j = 0; j < this.shopDataServe.length; j++) {
                if (this.salesShop[i].storeCode === this.shopDataServe[j].storeCode) {
                  this.salesShop[i].checked = true;
                }
              }
              for (var h = 0; h < this.shopDataArr.length; h++) {
                if (this.salesShop[i].storeCode === this.shopDataArr[h].storeCode) {
                  this.salesShop[i].checked = true;
                }
              }
            }
            this.salesName = a.name //销售区域的名字
          }
        })
      },
      removeTree(value) {
        //删除相应的经销商店
        for (var i = 0; i < this.shopDataArr.length; i++) {
          if (this.shopDataArr[i].storeCode == value.storeCode) {
            this.shopDataArr.splice(i, 1);
            return true;
          }
        }
        for (var i = 0; i < this.shopDataServe.length; i++) {
          if (this.shopDataServe[i].storeCode == value.storeCode) {
            this.shopDataServeRemove.push(this.shopDataServe[i])
            this.shopDataServe.splice(i, 1);
            return true;
          }
        }
        return false;
      },
      checked(value) {
        this.$emit('data-change', ['shop'])
        //判断选中没有，有就删除，没有就添加进去（选中它）
        if ((this.shopDataArr.length != 0 || this.shopDataServe.length != 0) && this.removeTree(value)) {
          return;
        }
        API.ordinalInfo.getSequence({
          serviceCode: config.addFinanceCode.salesCode
        }, (msg) => {
          this.shopDataArr.push({
            rangeCode: msg.data.obj,
            storeCode: value.storeCode,
            remark: value.storeName,
            salesName: this.salesName,
            rangeType: '0'
          })
        })
      },
      preserve() {
        // 点击保存的时候
        this.$emit('remove-tr', this.shopDataServeRemove)
        this.$emit('shop-preserve', this.shopDataArr) //触发保存事件把数据传送给使用者
        this.$store.dispatch('suitscope/preserveShop', {
          tabType: 'istabType', //切换到列表页面
        });
      },
      close() {
        //点击取消的时候切换到选择页
        this.$store.dispatch('suitscope/preserveShop', {
          tabType: 'home',
        });
      }
    },
    components: {
      Tree
    },
    mounted() {
      var index = 0;
      for (var i = 0; i < this.tabData.length; i++) {
        //经销商店的sales是null ，所以我们用sales来筛选出经销商店
        if (!this.tabData[i].sales) {
          this.$set(this.shopDataServe, index++, this.tabData[i])
        }
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
  .border {
    border: 2px solid #ccc;
  }
</style>
