import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state: {
        tableInfoVo: {}
    }
}