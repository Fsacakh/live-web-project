import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    tablelist: [],
    pager: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}