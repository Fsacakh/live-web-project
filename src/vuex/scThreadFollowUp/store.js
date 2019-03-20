import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    param: {
        store: "",
        year: "",
        month: "",
        sc: "",
        scName: "",
        channel: "",
        modeType:0
    },
    orderList: {},
    leadsList: {},
    channels: [],
    scs: [],
    scNameInput: "",
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}