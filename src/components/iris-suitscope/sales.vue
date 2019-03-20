<template lang="html">
  <div class="">
    <div v-if="!salesTable" class="card card-accent-info card-inverse">
      <div class="card-header">
        销售区域
      </div>
      <div class="card-block">
        <div class="row mt-3">
          <div class="col-6">
            <div class="border">
              <div class="tabBodyScroll">
                <Tree :expand-on-click-node=false :highlight-current=true :props="props" :load="loadNodeSales" lazy empty-text="暂无数据" node-key='value' @current-change="currentchange">
                </Tree>
              </div>
            </div>
          </div>
          <div class="col-6  mb-3 clearfix">
            <div class="card">
              <div class="card-header">已选中销售区域</div>
              <div class="card-block max-height-scope">
                <div class="text-center" v-if="!salesDataArr.length && !salesDataArrServe.length ">
                  暂无数据
                </div>
                <div class="card m-0 float-left ml-2" v-for="value in salesDataArr">
                  <div class="card-body p-0 clearfix ml-1">
                    {{value.sales}}
                    <i @click="removeTree(value.salesAreaCode)" class="fa fa-remove bg-danger p-1  ml-3 float-right white"></i>
                  </div>
                </div>
                <div class="card m-0 float-left ml-2" v-for="value in salesDataArrServe">
                  <div class="card-body p-0 clearfix ml-1">
                    {{value.sales}}
                    <i @click="removeTree(value.id)" class="fa fa-remove bg-danger p-1  ml-3 float-right white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 text-center mb-3">
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
          children: 'zones',
        },
        salesTable: false, //销售显示否
        salesDataArr: [], //存储被选中的数据
        salesDataArrServe: [], //存储后台已选中的数据
        salesDataArrRemove: [], //存储后台的需要删除的数据
        availableType: "",
      }
    },
    methods: {
      //  获取销售区域的api
      getTareaTree(code, sc) {
        API.area.getSalesAreaInfoByAreaCode({
          areaCode: code
        }, sc)
      },
      //加载子树节点的函数
      loadNodeSales(node, resolve) {
        if (node.level === 0) {
          API.getUserAvailableInfo((msg) => {
            if (msg.data.message === 'success') {
              this.availableType = msg.data.obj.availableType
              if (this.availableType === '1' || this.availableType === '2') {
                API.getSalesAreaInfoByUserAvailableAllLevel((msg) => {
                  if (msg.data.message == "success" && msg.data.obj.length != 0) {
                    return resolve([{
                      name: msg.data.obj[0].areaName || "",
                      code: msg.data.obj[0].areaCode || "",
                      disabled: true,
                    }]);
                  }
                })
              }
            }
          })
          return;
        }
        this.getTareaTree(node.data.code, (msg) => {
          //获取子集
          let data = msg.data.obj.salesAreaSubInfo || 0
          let arr = [];
          if (data) {
            for (var i = 0; i < data.length; i++) {
              arr[i] = {
                name: data[i].areaName,
                code: data[i].areaCode
              }
            }
            return resolve(arr);
          }
          return resolve([])
        })
      },
      //当树节点被点击的时候的函数
      currentchange(a) {
        this.$emit('data-change', ['sales'])
        //当某一行被点击的时候我先判断有没有保存过数据再判断这一行数据有没有保存过
        if ((this.salesDataArr.length != 0 || this.salesDataArrServe.length != 0) && this.removeTree(a.code)) {
          //说明当前这一行数据被保存过了，我就删除他
          return;
        }
        API.ordinalInfo.getSequence({
          serviceCode: config.addFinanceCode.salesCode
        }, (msg) => {
          this.salesDataArr.push({
            rangeCode: msg.data.obj, //适用范围编码
            salesAreaCode: a.code, //销售区域
            sales: a.name, //销售区名字
            rangeType: '1' //适用范围类型 1 销售区域
          })
        })
      },
      //删除某一个已存储的数据
      removeTree(value) {
        console.log(value)
        for (var i = 0; i < this.salesDataArrServe.length; i++) {
          if (this.salesDataArrServe[i].id == value) {
            this.salesDataArrRemove.push(this.salesDataArrServe[i])
            this.salesDataArrServe.splice(i, 1);
            return true;
          }
          if (this.salesDataArrServe[i].salesAreaCode === value) {
            this.salesDataArrRemove.push(this.salesDataArrServe[i])
            //说明当前这一行数据被保存过了，我就删除他
            this.salesDataArrServe.splice(i, 1);
            return true;
          }
        }
        for (var i = 0; i < this.salesDataArr.length; i++) {
          if (this.salesDataArr[i].salesAreaCode === value) {
            //说明当前这一行数据被保存过了，我就删除他
            this.salesDataArr.splice(i, 1);
            return true;
          }
        }
        return false;
      },
      //点击保存的时候触发
      preserve() {
        this.$store.dispatch('suitscope/preserveShop', { //切换到列表页
          tabType: 'istabType',
          istabType: true
        });
        this.$emit('remove-tr', this.salesDataArrRemove) //触发事件把删除掉的对象发给他
        if (this.salesDataArr.length > 0) {
            this.$emit('sales-preserve', this.salesDataArr) //触发事件把数据给使用者
        }
      },
      //取消按钮
      close() {
        this.$store.dispatch('suitscope/preserveShop', {
          tabType: 'home',
        }); //切换到选择页
      }
    },
    components: {
      Tree
    },
    computed: {
      // mapState是vuex的辅助函数 https://vuex.vuejs.org/zh-cn/state.html#the-mapstate-helper
      // 创建组件的计算属性返回 Vuex store 中的状态
      ...mapState('suitscope', [
        'financeCode',
      ]),
    },
    created() {
      var index = 0;
      for (var i = 0; i < this.tabData.length; i++) {
        //经销商店的sales是null ，所以我们用sales来筛选出销售区域
        if (this.tabData[i].sales) {
          var idx = index++
            this.$set(this.salesDataArrServe, idx, this.tabData[i])
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
  .white {
    color: #fff;
  }
  .border {
    border: 2px solid #ccc;
  }
  .max-height-scope{
    max-height: 205px;
    overflow: auto;
  }
</style>
