import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    list: [],
    insertOver: false,
    coCode: '',
    coCodeDetail: '',
    isUpdata: true,
    costDetail: []
}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}