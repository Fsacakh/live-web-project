import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
// 在全局的store.js（也就是vuex下的store.js）中会引入finance模块下的store.js （相当于这个（finance）模块的入口文件了）来注册一个模块

const state = {
    querycontactsdata:false,//查询商联系人编码
    amendcontactsdata:false,//修改商联系人编码 
    queryclientreceiverdata :false,//查询商收货信息编码
    amendclientreceiverdata :false,//修改商收货信息编码 
    queryidtypedata:false,//查询证件编码
    amendidtypedata:false,//修改证件编码      
    querydata:false,//查询财务信息的编码
    amenddata:false//修改财务的数据
  }

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
