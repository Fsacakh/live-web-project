import api from '../../common/api'
import config from '../../common/config.js'
import * as types from './mutation-types'
export const saveAnswer = ({ commit }, params) => {
    api.research.saveAnswer(params.poros, (res) => {
        if (res.data.code == "success") {
            params.callBack(res)
        }
    })
}

export const getUserAnswerCode = ({ commit }, params) => {
    api.ordinalInfo.getSequence(params.poros, (res) => {
        if (res.data.code == "success") {
            params.callBack(res)
        }
    })
}

export const getTaskInfo = ({ commit }, params) => {
    api.research.getTaskInfo(params.poros, (res) => {
        if(res.data.code == "success") {
            let info = res.data.obj
            commit(types.GET_TASK_INFO, info)
            params.callBack(res)
        }
    })
}

export const saveTaskResult = ({ commit }, params) => {
    api.research.saveTaskInfo(params.poros, (res) => {
        if (res.data.code == "success") {
            params.callBack(res)
        }
    })
}

export const queryQaTitle = ({ commit }, params) => {
    api.research.queryQaTitie(params.poros, (res) => {
        if (res.data.code == "success") {
            params.callBack(res)
        }
    })
}

export const getTaskType = ({commit}, params) => {                //获取调研任务类型
    api.ref.getDataDictionary(params.poros)
    .then(function (res) {
        if (res.data.code == "success") {
            let typelist = [{
                value: '',
                text: '请选择'
            }];
            let typelistFliter = [{
              value: '',
              text: '请选择'
            }];
            let len = res.data.obj.referenceDetailInfos
            for (let i = 0; i < len.length; i++) {
                let obj = {};
                obj.value = len[i].refDetailCode
                obj.text = len[i].refDetailName
                typelist.push(obj)
                if(len[i].refDetailValue == 0) {
                    typelistFliter.push(obj)
                }
            }
            commit(types.GET_TASK_TYPE, {code: params.poros.refCode, type: typelist})
            commit(types.GET_TASKTYPE_FLITER, typelistFliter)
            params.callBack(res);
        }
    })
}     

export const getTaskTypeList = ({ commit }, params) => {                //获取调研任务类型
    api.ref.getDataDictionary(params)
    .then(function (res) {
        if (res.data.code == "success") {
            let typelistFliter = [{
              value: '',
              text: '请选择'
            }];
            let len = res.data.obj.referenceDetailInfos
            for (let i = 0; i < len.length; i++) {
                let obj = {};
                obj.value = len[i].refDetailCode
                obj.text = len[i].refDetailName
                if(len[i].refDetailValue == 0) {
                    typelistFliter.push(obj)
                }
            }
            commit(types.GET_TASKTYPE_FLITER, typelistFliter)
        }
    })
}

export const getTaskStatusList = ({ commit }, params) => {                //获取调研任务类型
    api.ref.getDataDictionary(params)
    .then(function (res) {
        if (res.data.code == "success") {
            let typelist = [{
                value: '',
                text: '请选择'
            }];
            let len = res.data.obj.referenceDetailInfos
            for (let i = 0; i < len.length; i++) {
                let obj = {};
                obj.value = len[i].refDetailCode
                obj.text = len[i].refDetailName
                typelist.push(obj)
            }
            commit(types.GET_TASK_TYPE, {code: params.refCode, type: typelist})
        }
    })
}

export const queryTaskList = ({ commit }, params) => {
    api.research.queryTaskList(params.poros, (res) => {
        if (res.data.code === "success") {
            let lists = res.data.obj.list
            lists.forEach(function(item, index) {
                lists[index].appointmentVisitTime = item.appointmentVisitTime == null?'':item.appointmentVisitTime.slice(0, 10);
                lists[index].lastVisitTime = item.lastVisitTime == null?'':item.lastVisitTime.slice(0, 10);
            });
            let pages = {
                pageNo: 1,
                pageSize: 15,
                total: 1,
                totalPages: 1
            };
            pages.pageNo = res.data.obj.pageNum
            pages.totalPages = res.data.obj.pages
            pages.pageSize = res.data.obj.pageSize
            pages.total = res.data.obj.total
            commit(types.GET_TASK_LIST, {list: lists, page: pages})
            params.callBack(res)
        }
    })
}
