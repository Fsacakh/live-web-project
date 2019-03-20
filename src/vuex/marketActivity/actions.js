import api from '../../common/api'
import config from '../../common/config.js'
import * as types from './mutation-types'

export const queryCall = ({ commit }, params) => {
    api.market.queryCall(params.poros, res => {
        if (res.data.code == 'success') {
            let page = {
                pageNo: res.data.obj.pageNum,
                totalPages: res.data.obj.pages,
                pageSize: res.data.obj.pageSize,
                total: res.data.obj.total,
            }
            commit(types.M_QUERY_CALL, {list: res.data.obj.list, pager: page})
            params.callBack(res)
        }
    })
}

export const getCallList = ({ commit }, params) => {
    commit(types.M_QUERY_CALL, { list: params.list, pager: params.pager })
}     

export const addWords = ({ commit }, params) => {
    commit(types.M_ADD_WORDS, params)
}

export const addMarketActivity = ({ commit }, params) => {      //新增主档信息
    api.marketActivity.createdMarketActivity(params.poros)
        .then(function (res) {
            params.callBack(res)
            if (res.data.code == "success") {
                commit(types.M_ADD_MARKETACTIVITY, true)
            }
    })
}
export const addActivityWords = ({commit}, params) => {        //新增活动话术
    api.marketActivity.addActivityWords(params.poros)
        .then(function (res) {
            params.callBack(res)
            if (res.data.code == "success") {
                commit(types.M_ADD_ACTIVITYWORDS)
            }
    })
}
export const getMaType = ({commit}, params) => {                //获取市场活动类型
    api.ref.getDataDictionary(params.poros)
    .then(function (res) {
        if (res.data.code == "success") {
            let status = [{
                value: '',
                text: ''
            }];
            let len = res.data.obj.referenceDetailInfos
            for (let i = 0; i < len.length; i++) {
                let obj = {};
                obj.value = len[i].refDetailCode
                obj.text = len[i].refDetailName
                status.push(obj)
            }
            commit(types.M_GET_MATYPE, status)
            params.callBack(res);
        }
    })
}
export const getSequence = ({commit}, params) => {                 //根据序列获取编码
    api.ordinalInfo.getSequence(params.poros, (res) => {
        if (res.data.code == "success") {
            if (params.poros.serviceCode == config.market.getMaCode) {
                commit(types.M_GET_MACODE, res.data.obj)
            } else if (params.poros.serviceCode == config.market.getWordsCode) {
                commit(types.M_GET_WORDSCODE, res.data.obj)
            } else if (params.poros.serviceCode == config.market.getMaCarCode) {
                commit(types.M_GET_MACARCODE, res.data.obj)
            }
            params.callBack(res)
        }
    })
    .catch()
    
}
export const addMarketCar = ({commit}, params) => {                     //新增市场活动车型
    api.marketActivity.addCarType(params.poros)
        .then(function (res) {
            params.callBack(res)
        if (res.data.code == "success") {
            commit(types.M_ADD_MARKETCAR)
        }
    })
}
export const getEditData = ({commit}, params) => {                       //获取编辑信息方法 
    api.market.getMarketActivityDetails(params.poros, (res) => {
        if (res.data.code == "success") {
            commit(types.M_GET_EDITDATA, res.data.obj)
            params.callBack(res)

        }
    })
}
export const hideDitionalArea = ({commit}, params) => {
    commit(types.M_ADD_MARKETACTIVITY, false)
}
export const getCarTypeInfo = ({commit}, params) => {                   //获取车型信息
    api.marketActivity.getCarTypeInfo(params.poros)
    .then(function (res) {
        commit(types.M_GET_CARTYPEINFO, {})
        params.callBack(res)
    })
}
export const changeWordsData = ({commit}, params) => {          //监听话术
    commit(types.M_SET_WORDSDATA, params)
}
export const changeCarData = ({commit}, params) => {            //监听车型
    commit (types.M_SET_CARDATA, params)
}