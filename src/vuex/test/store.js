import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    list:[],
    email:1,
    kk:1,
    selectedRow: 0,
    showAddModal: false,
    showUpdateModal: false
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}