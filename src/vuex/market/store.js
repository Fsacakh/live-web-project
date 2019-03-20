import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    list: [],
    areas: [],
    pager: {},
    selectedRow: 0
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}