import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    factoryCodes: [],
    brandCodes: [],
    seriesCodes: [],
    modelCodes: [],
    carCodes: []
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}