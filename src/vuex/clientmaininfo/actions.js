import api from '../../common/api'
import * as types from './mutation-types'
import API from '../../common/api.js'

//用来给当前模块的mutation里的方法来命名的 官方上叫事件类型
export const queryclientmaininfo = ({ commit },params) => {
      commit(types.QUERY_COMMODITY_BRAND,params);
}
export const amendclientmaininfo = ({ commit },params) => {
      commit(types.AMEND_COMMODITY_BRAND,params);
}
export const querycontacts = ({ commit },params) => {
      commit(types.QUERY_CONTACTS,params);
}
export const amendcontacts = ({ commit },params) => {
      commit(types.AMEND_CONTACTS,params);
}
export const queryidtype = ({ commit },params) => {
      commit(types.QUERY_IDTYPE,params);
}
export const amendidtype = ({ commit },params) => {
      commit(types.AMEND_IDTYPE,params);
}
export const queryclientreceiver = ({ commit },params) => {
      commit(types.QUERY_RECEIVER,params);
}
export const amendclientreceiver = ({ commit },params) => {
      commit(types.AMEND_RECEIVER,params);
}