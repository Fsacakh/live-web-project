<template lang="html">
  <div>
    <button v-if="!suitBtnControl" @click="addFinanceArea" type="button" class="btn btn-success btn-sm mb-2">新增</button>
    <table  class="table table-striped table-bordered">
      <thead>
        <tr class="text-center">
          <th class="text-center">全国</th>
          <th class="text-center">销售区域</th>
          <th class="text-center">经销商店</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="val in tabData">
          <th>{{val.nationwide}}</th>
          <th>{{val.sales}}</th>
          <th>{{val.shop}}</th>
          <th class="text-center"><button v-if="!suitBtnControl" @click="removeTree(val)" type="button" class="btn btn-danger btn-sm">删除</button></th>
        </tr>
      <tr v-if="tabData.length==0">
        <td colspan='13' class="text-left">暂无数据...</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import API from '../../common/api.js'
import common from '../../common/common.js'
import { MessageBox } from 'element-ui'
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
Vue.component(MessageBox.name, MessageBox) //用use会在页面一加载的时候弹出一个框来
export default {
  props: {
    tabData: {
      type: Array,
      default: function() {
        return []
      }
    },
    availableType:{
      type: String,
      default: null
    },
    suitBtnControl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabArr: [], //tab要渲染的数据
    }
  },
  methods: {
    addFinanceArea() {
      //点击新增的时候切换回选择页面
      this.$store.dispatch('suitscope/preserveShop', {
        tabType: 'home',
      });
    },
    removeTree(val) {
      MessageBox.confirm('是否确认删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'info'
      }).then(() => {
        this.$emit('remove-tr', [val])//触发事件把删除掉的对象发给他
        for (var i = 0; i < this.tabData.length; i++) {
          if (this.tabData[i].id == val.id) {
            this.tabData.splice(i, 1);
          }
        }
        this.tabindex = this.tabindexArr[this.tabindexArr.length - 2]
      }).catch(() => {
      });

    }
  },
}
</script>

<style lang="css">

</style>
