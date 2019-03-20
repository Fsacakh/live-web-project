import api from 'common/api'
import * as types from './mutation-types'

export const getSequence = ({ commit }, params) => {
    api.ordinalInfo.getSequence({ 'serviceCode': params.serviceCode }, res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_SEQUENCE, obj) 
            params.callback()
        }
    })
}

export const getWhObj = ({ commit }, params) => {
    api.supplyChain.warehouse.getQueryInfo(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.GET_WHOBJ, obj) 
        }
    })
}

export const getWhDetail = ({ commit }, params) => {
    api.supplyChain.warehouse.queryInfoByCode(params.whCode).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;  
            commit(types.GET_WH_DETAIL, obj) 
            params.callback()
        }
    })
}

export const getWhAreaObj = ({ commit }, params) => {
    api.supplyChain.whArea.getQueryInfo(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.GET_WHAREAOBJ, obj) 
        }
    })
}

export const getWhAreaDetail = ({ commit }, params) => {
    api.supplyChain.whArea.queryInfoByCode(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.GET_WHAREA_DETAIL, obj) 
        }
    })
}

export const getWhlocationObj = ({ commit }, params) => {
    api.supplyChain.whLocation.getQueryInfo(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.GET_WHLOCATIONOBJ, obj)  
        }
    })
}

export const getWhlocationDetail = ({ commit }, params) => {
    api.supplyChain.whLocation.queryInfoByCode(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.GET_WHLOCATION_DETAIL, obj) 
        }
    })
}

// 仓库类型共享 减少ajax请求 
export const getWhAreaType = ({ commit }, params) => {
    api.ref.getDataDictionary(params).then(res => {
        if (res.data.code === 'success') {
            let list = res.data.obj.referenceDetailInfos, arr = [];
            if(!list) {return}
            list.forEach(item => {
                let data = {
                    value: item.refDetailCode,
                    text: item.refDetailName
                }
                arr.push(data);
            })
            commit(types.SET_WHAREA_TYPE, arr) 
        }
    })
}

