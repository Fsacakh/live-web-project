import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
// 在全局的store.js（也就是vuex下的store.js）中会引入finance模块下的store.js （相当于这个（finance）模块的入口文件了）来注册一个模块

const state = {
    financeCode:'',//新增金融机构的编码
    tabType:'home',//是否转试用范围首页
    istabType:false,//是否显示table栏
    shopData:[],//门店数据
    salesData:[],//销售区域数据
    governmentData:[],//行政区域数据
    tabsscope:{
      shopstatus:false,
      salestatus:false,
      // governmentstatus:false,
    },//适用范围三个保存否
    interestFlag:true,//贴息方案保存否
    poundage:true,//手续费保存否
    intersubsidyData:[],//贴息方案
    updataFinanceId:""//修改金融机构id 
  }

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
