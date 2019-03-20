import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
const state = {
    taskInfo: [],
    taskStatus: [],
    taskType: [],
    taskTypeFliter: [],
    taskList: [],
    failReason: [],
    pager: {
        pageNo: 1,
        pageSize: 15,
        total: 1,
        totalPages: 1
    },
    queryParams: {},
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
