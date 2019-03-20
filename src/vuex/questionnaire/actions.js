import api from '../../common/api'
import config from '../../common/config.js'
import * as types from './mutation-types'
export const queryQaInfo = ({ commit }, params) => {
    api.crm.getQaInfo(params.tp)
        .then((res) => {
            if (res.data.code == "success") {
                let list = res.data.obj.list
                    list.forEach(function(item, index) {
                    if(item.qaUseRangeInfoVos.length != '0') {
                        item.qaUseRangeInfoVos.forEach((val, num) => {
                            let storeName = val.storeName
                            let salesAreaName = val.salesAreaName
                            list[index].qaUseRangeInfoVos = (storeName ? storeName : (salesAreaName ? salesAreaName : ''))
                        })
                    } else {
                        list[index].qaUseRangeInfoVos = ''
                    }
                });
                let pager = {
                    pageNo: 1,
                    pageSize: 15,
                    total: 1,
                    totalPages: 1
                }
                pager.pageNo = res.data.obj.pageNum
                pager.totalPages = res.data.obj.pages
                pager.pageSize = res.data.obj.pageSize
                pager.total = res.data.obj.total
                commit(types.QA_GET_QAINFO, {qaList: list, page: pager})
                params.callBack(res)
            }
        })
}

export const getQaType = ({ commit }, params) => { //获取市场活动类型
    api.ref.queryDictionaryDetails(params.poros)
    .then(function (res) {
        params.callBack(res)
        if (res.data.code == "success") {
            let status = [{
                value: '',
                text: ''
            }];
            let len = res.data.obj.list
            for (let i = 0; i < len.length; i++) {
                let obj = {};
                obj.value = len[i].refDetailCode
                obj.text = len[i].refDetailName
                status.push(obj)
            }
            commit(types.QA_GET_QATYPE, status)
        }
    })
}

export const getQaCode = ({ commit }, params) => { //根据序列获取编码
    api.ordinalInfo.getSequence(params.poros, (res) => {
        if (res.data.code == "success") {
            commit(types.QA_GET_QACODE, { jugde: params.poros.serviceCode, msg: res.data.obj })
            params.callBack(res)
        }
    })
}

export const addQa = ({ commit }, params) => {
    api.crm.addQa(params.tp)
        .then((res) => {
            if (res.data.code == "success") {
                params.callBack(res)
            }
        })
}

export const editQa = ({ commit }, params) => {
    api.crm.editQa(params.tp)
    .then((res) => {
        if (res.data.code == "success") {
            params.callBack(res)
        }
    })
}

export const addQuestion = ({ commit }, params) => {
    api.crm.addQuestionTitle(params.tp)
        .then((res) => {
        params.callBack(res)
    })
}

export const addAnswer = ({ commit }, params) => {
    api.crm.addQuestionAnswer(params.tp)
        .then((res) => {
        params.callBack(res)
    })
}

export const queryQuestion = ({ commit }, params) => {
    api.crm.queryQuestion(params.tp)
        .then((res) => {
            params.callBack(res)
            if (res.data.code == "success") {
                commit(types.GET_QUESTION_LIST, res.data.obj.list)
            }   
    })
}

export const editQuestion = ({ commit }, params) => {
    api.crm.editQuestion(params.tp)
        .then((res) => {
            params.callBack(res)
    })
}

export const quertQaScopc = ({ commit }, params) => {       //查询问卷适用范围
    api.crm.quertQaScopc(params.tp)
        .then((res) => {
        params.callBack(res)
    })
}

export const addQaScope = ({ commit }, params) => {        //新增问卷适用范围
    api.crm.addQaScope(params.tp)
        .then((res) => {
        params.callBack(res)
    })
}