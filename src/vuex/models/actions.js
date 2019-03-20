import api from '../../common/api'
import config from '../../common/config.js'
import * as types from './mutation-types'
export const getCode = ({ commit }, params) => {                //根据序列获取编码
    api.ordinalInfo.getSequence(params.poros, (res) => {
        if (res.data.code == "success") {
            commit(types.MO_GET_GETCODE, { jugde: params.poros.serviceCode, msg: res.data.obj })
            params.callBack(res)
        }
    })    
}
export const addModels = ({ commit }, params) => {
    api.product.models.addMOdels(params.poros)
        .then((res) => {
            params.callBack(res)
            if (res.data.code == "success") {
            }
        })
}
export const queryModels = ({ commit }, params) => {
    api.product.models.queryModels(params.poros)
    .then((res) => {
        params.callBack(res)
        if (res.data.code == "success") {

        }
    })
}
export const editModels = ({ commit }, params) => {
    api.product.models.editModels(params.poros)
    .then((res) => {
        params.callBack(res)
        if (res.data.code == "success") {

        }
    })
}