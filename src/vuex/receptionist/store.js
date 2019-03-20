import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    today: '',
    seeHistory: false,
    scItem: {},
    userAvailableInfo: {},
    scList: [],
    allObj: {}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}