import config from '../../common/config.js'
import * as types from './mutation-types'
const mutations = {
    [types.GET_TASK_INFO](state, info) {
        state.taskInfo = info
    },
    [types.GET_TASK_TYPE](state, info) {
        if (info.code === config.research.taskStatus) {
            state.taskStatus = info.type
        } else if (info.code === config.research.taskType) {
            state.taskType = info.type
        } else if (info.code === config.research.failReason) {
            state.failReason = info.type
        }
    },
    [types.GET_TASKTYPE_FLITER](state, obj) {
        state.taskTypeFliter = obj
    },
    [types.GET_TASK_LIST](state, obj) {
        state.taskList = obj.list
        state.pager = obj.page
        state.pager.pageSize = 15
    },
    [types.SET_QUERY_PARAMS](state, queryParams) {
        state.queryParams = queryParams
    }
}

export default mutations
