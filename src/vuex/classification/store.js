import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    datalist: [],
    detail: [],
    obj: {},
    catalogDetail: [],
    getSequence: '',
    getWhObj: {},
    getWhDetail: {},
    whAreaObj: {},
    whAreaDetail: {},
    whLocationObj: {},
    whLocationDetail: {},
    whAreaType: [],
    isWatch: false
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}