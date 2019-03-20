<template>
  <div class="">
    <b-row>
      <div class=" col-12">
        <div class="row col-12" v-if="tabType=='home'">
          <div class="col-6">
            <b-form-fieldset horizontal label="适用范围类型" :label-cols="4" class="text-right">
              <b-form-select value="home" @input="changeType" :options="scopeType" class="mb-3"></b-form-select>
            </b-form-fieldset>
          </div>
          <div class="col-6 text-right">
            <b-button @click="close" type="button" variant="">取消</b-button>
          </div>
        </div>
        <div class="col-12 float-right">
          <sales :tab-data="tabData" @remove-tr="removetr" v-if="tabType=='sales'" @data-change="datachange" @sales-preserve="salesPreserve"></sales>
          <div v-else-if="tabType=='shop'">
            <shop :onlyStore ="onlyStore" :tab-data="tabData" @remove-tr="removetr" @shop-preserve="shopPreserve" @data-change="datachange"></shop>
          </div>
          <div v-if="tabType=='istabType'">
            <tableShow :availableType="availableType" :suitBtnControl="!suitBtnControl" :tab-data="tabData" @remove-tr="removetr"></tableShow>
          </div>
        </div>
      </div>
    </b-row>
  </div>
</template>
<script>
  import Vue from 'vue'
  import sales from './sales'
  import shop from './shop'
  import tableShow from './tableShow'
  import common from '../../common/common'
  import config from '../../common/config'
  import api from '../../common/api'
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
      },
      suitBtnControl: {
        type: Boolean,
        default: true
      },
      onlyStore: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rangeType: "1", //适用范围类型值
        // 适用范围类型
        scopeType: [{
          value: "home",
          text: "请选择",
        }],
        availableType: null
      }
    },
    methods: {
      changeType(value) {
        this.$store.dispatch('suitscope/preserveShop', {
          tabType: value,
          istabType: false
        });
      },
      close() {
        this.$store.dispatch('suitscope/preserveShop', { //切换到列表页
          tabType: 'istabType',
          istabType: true
        });
      },
      //当销售区域保存的时候触发
      salesPreserve(data) {
        this.$emit('sales-preserve', data)
      },
      //当tab删除的时候触发
      removetr(data) {
        this.$emit('remove-tr', data)
      },
      //当经销商店保存的时候触发
      shopPreserve(data) {
        this.$emit('shop-preserve', data)
      },
      //当数据发生变化的时候触发的事件
      datachange(data) {
        this.$emit('data-change', data)
      }
    },
    components: {
      sales,
      shop,
      tableShow,
    },
    computed: {
      ...mapState('suitscope', [
        'financeCode',
        'tabType',
        'istabType',
        'shopData',
        'salesShop',
        'governmentData',
        'tabsscope',
        'updataFinanceId'
      ])
    },
    created() {
      api.getUserAvailableInfo((msg) => {
        if (msg.data.message === 'success') {
          this.availableType = msg.data.obj.availableType
        }
      })
      if (this.$route.params.id) {
        this.$store.dispatch('suitscope/preserveShop', {
          tabType: 'istabType',
        });
      } else {
        this.$store.dispatch('suitscope/preserveShop', {
          tabType: 'home',
        });
      }
      //获取适用范围类型
      api.menu.getReferenceInfo({
        refCode: config.scope
      }, (msg) => {
        let list = msg.data.obj.referenceDetailInfos
        if (this.availableType == 0) {
          for (var i = 0; i < list.length; i++) {
            if ((list[i].refDetailCode == config.scopeType.sales)) {
              list.splice(i, 1)
            }
          }
        }
        let obj = {}
        if (this.onlyStore) {
          obj = {
            [config.scopeType.shop]: "shop", //经销商店
          }
        } else {
          obj = {
            [config.scopeType.government]: "government", //行政区域
            [config.scopeType.sales]: "sales", //销售区域
            [config.scopeType.shop]: "shop", //经销商店
          }
        }
        for (var j = 0; j < list.length; j++) {
          if (obj[list[j].refDetailCode]) {
            this.$set(this.scopeType, j + 1, {
              value: obj[list[j].refDetailCode],
              text: list[j].refDetailName
            })
          }
        }
      })
    },
  }
</script>
