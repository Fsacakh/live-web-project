import * as types from './mutation-types'
//用来给当前模块的mutation里的方法来命名的 官方上叫事件类型
const mutations = {
  [types.QUERY_COMMODITY_BRAND](state, params) {
    state.querydata = params
  },
  [types.AMEND_COMMODITY_BRAND](state, params){
    state.amenddata = params    
  },
  [types.QUERY_CONTACTS](state, params){
    state.querycontactsdata = params    
  },
  [types.AMEND_CONTACTS](state, params){
    state.amendcontactsdata = params    
  },
  [types.QUERY_IDTYPE](state, params){
    state.queryidtypedata = params    
  },
  [types.AMEND_IDTYPE](state, params){
    state.amendidtypedata = params    
  },
  [types.QUERY_RECEIVER](state, params){
    state.queryclientreceiverdata = params    
  },
  [types.AMEND_RECEIVER](state, params){
    state.amendclientreceiverdata = params    
  }
}

export default mutations
