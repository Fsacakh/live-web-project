<template>
<div class="animated fadeIn">
  <table class="table table-striped table-bordered">
    <thead>
      <tr class="text-center">
        <th class="text-center" v-for="item in fields">{{item.label}}</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr v-for="(value, index) in params">
        <th class="text-center">{{index+1}}</th>
        <th class="text-center"><select @change="updata" v-model="value.isPercent" class="form-control"><option value="-1">请选择</option><option value="1">{{percentage.first}}</option><option value="0">{{percentage.last}}</option></select></th>
        <th v-if="tabs=='0'" class="text-center"><input type="text" placeholder="百分比请用小数表示" @change="updata" v-model="value.intersubsidyName" class="form-control" /></th>
        <th v-if="tabs=='1'" class="text-center"><input type="text" placeholder="百分比请用小数表示" @change="updata" v-model="value.serviceChargeValue" class="form-control" /></th>
        <th class="text-center"><b-button class="pl-3 pr-3 pt-2 pb-2" variant="danger" @click="remove(index)">删除</b-button></th>

      </tr>
      <tr v-if="params.length==0">
        <td colspan='13' class="text-left">暂无数据...</td>
      </tr>
    </tbody>
  </table>
  <div class="row">
    <div class="col-md-6">
      <div style="display: inline-block;margin-left:10px;">
        <i class="fa fa-plus fa-lg mt-4" @click="addRow"></i>
      </div>
    </div>
    <div class="col-md-6 text-right">
      <b-button type="button" @click="submintInterest()" variant="primary">保存</b-button>
    </div>
  </div>
</div>
</template>
<script>
import Vue from 'vue'
import api from '../../../src/common/api'
import common from '../../../src/common/common'
import config from '../../../src/common/config'
import {
  Message
} from 'element-ui'
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
Vue.component(Message.name, Message) //用use会在页面一加载的时候弹出一个框来
export default {
  data() {
    return {
      // 贴息方案表头模拟数据
      fields: {
        index: {
          label: "序号",
        },
        percentage: {
          label: "百分比/金额",
        },
        interestRate: {
          label: "利率/金额",
        },
        option: {
          label: "操作",
        }
      },
      interestTab: [], //贴息行
      percentage: {
        first: '百分比',
        last: '金额'
      },
      params: [],//所有的数据
      paramsIdArr:[],//有ID的数据
    }
  },
  methods: {
    submintInterest() {
      if (this.tabs == '0') {
        var str = 'intersubsidyName'
      } else if (this.tabs == '1') {
        var str = 'serviceChargeValue'
      }
      if (this.params.length != 0) {
        //打包数据发送给后台
        for (let i = 1, len = this.params.length; i < len; i++) {
          if ((this.params[i].isPercent == "-1") || (!this.params[i][str])) {
            common.alertInfo('error')
            return;
          }
        }
         this.collectInfo(this.tabs)
      } else {
        common.alertInfo('error');
      }
    },
    remove(value) {
      this.params.splice(value, 1);
    },
    setIntersubsidy(params) {
      this.paramsIdArr = [];
      //添加贴息方案ajax
      api.finance.addIntersubsidyCode(params, (msg) => {
        if (msg.data.message == 'success') {
          for (var i = 0; i < params.length; i++) {
            if(params[i].id){
              this.paramsIdArr.push(params[i])
            }
          }
          this.paramsIdArr.push.apply(this.paramsIdArr,msg.data.obj);
          this.params = this.paramsIdArr;
          this.$store.dispatch('finance/setInterest',true)
          common.alertInfo('success');
        } else {
          common.alertInfo('warning');
        }
      })

    },
    setProcedures(params) {
      //添加手续费ajax
      api.finance.addProceduresCode(params, (msg) => {
        if (msg.data.message == 'success') {
          this.$store.dispatch('finance/setPoundage',true)
          common.alertInfo('success');
        } else {
          common.alertInfo('warning');
        }
      })
    },
    collectInfo(value) {
      if (value == '0') {
        // 贴息方案
        this.setIntersubsidy(this.params);
      } else if (value == '1') {
        //手续费方案
        this.setProcedures(this.params);
      }
    },
    addRow() {
          api.ordinalInfo.getSequence({
          serviceCode: config.addFinanceCode.interest
        }, (msg) => {
          let obj = null;
          if(this.tabs == '0'){
          obj ={
            financeOrgCode: this.financeCode,
            intersubsidyName: "",
            intersubsidyCode: msg.data.obj,
            isPercent: ""
          }
          }else if(this.tabs == '1'){
            obj = {
            financeOrgCode: this.financeCode,
            serviceChargeValue: "",
            serviceChargeCode: msg.data.obj,
            isPercent: ""
          }
          }
          this.params.push(obj)
        })
    },
    updata() {
      if(this.tabs == '0'){
        this.$store.dispatch('finance/setInterest',false)
      }else if(this.tabs == '1'){
        this.$store.dispatch('finance/setPoundage',false)
      }
      this.$store.dispatch('finance/setIntersubsidyData', this.params);
    }
  },
  computed: {
    // mapState是vuex的辅助函数 https://vuex.vuejs.org/zh-cn/state.html#the-mapstate-helper
    // 创建组件的计算属性返回 Vuex store 中的状态
    ...mapState('finance', [
      'financeCode',
      'updataFinanceId'
    ]),
    intersubsidyData: {
      get() {
        return this.$store.state.finance.intersubsidyData;
      },
      set() {

      }
    }
  },
  watch: {
    params:function(){
        this.$store.dispatch('finance/setIntersubsidyData',this.params);
    }
  },
    created(){

      if(this.$route.params.id){
        if (this.tabs == '0') {
        // 贴息方案
      api.finance.getQueryIntersubsidy({financeOrgCode:this.financeCode},(msg)=>{
        if(msg.data.message == 'success'){
          this.params = msg.data.obj 
        }
      })
      } else if (this.tabs == '1') {
        //手续费方案
        api.finance.getQueryProcedures({financeOrgCode:this.financeCode},(msg)=>{
        if(msg.data.message == 'success'){
          this.params = msg.data.obj 
        }
      })
      }
      }
  },
  props: ['tabs']
}
</script>

<style lang="css">

</style>
