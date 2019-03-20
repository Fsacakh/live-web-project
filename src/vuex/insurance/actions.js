import api from 'common/api'
// import config from 'common/config'
import * as types from './mutation-types'

// 获取保险公司列表的方法
export const getInsurance = ({ commit }, insurance) => {
    let params = insurance
    let companies = params.list
    console.log(companies)
    commit(types.INSURANCE_GET_ORGANIZATIONS, {
        companies
    })
}
export const getCoCode = ({ commit }, params) => {
    api.ordinalInfo.getSequence(params, res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.GET_COCODE, {obj})
        }
    })
}