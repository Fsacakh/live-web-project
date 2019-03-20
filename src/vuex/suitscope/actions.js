import api from '../../common/api'
import * as types from './mutation-types'
import API from '../../common/api.js'

//用来给当前模块的mutation里的方法来命名的 官方上叫事件类型
export const getFinanceCode = ({ commit },params) => {
  //finance模块下的action commit 会触发同一个模块下的mutation finance是自定义的参数
  if(params){
    commit(types.FINANCE_ADD_FINANCECODE,params);    
  }else{
    console.log(111111)
    API.ordinalInfo.getSequence({serviceCode:"FINORG"},(msg)=>{
      commit(types.FINANCE_ADD_FINANCECODE,msg.data.obj);
  })
  }
}
export const preserveShop = ({ commit }, params) => {
  commit(types.PRESERVE_SHOP,params);
}
export const setShopData = ({ commit }, params) => {
  commit(types.FINANCE_SET_SHOPDATA,params)
}
export const setSalesData = ({ commit }, params) => {
  commit(types.FINANCE_SET_SALESDATA,params)
}
export const setGovernmentData  = ({ commit }, params) => {
  commit(types.FINANCE_SET_GOVERNMENTDATA,params)
}
export const setTabsAcative  = ({ commit }, params) => {
  commit(types.FINANCE_SET_SETTABACATIVE,params)
}
export const setIntersubsidyData = ({ commit }, params) => {
  commit(types.SETINTERSUBSIDYDATA, params)
}
export const setInterest = ({ commit }, params) => {
  commit(types.SETINTEREST, params)
}
export const setPoundage = ({ commit }, params) => {
  commit(types.SETPOUNDAGE, params)
}
export const setFinanceId = ({ commit }, params) => {
  commit(types.UPDATAFINANCEID, params)
}