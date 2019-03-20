import * as types from './mutation-types'

export default {
    [types.SET_TODAY](state, today) {
        state.today = today
    },
    [types.SET_SEE_HISTORY](state) {
        state.seeHistory = !state.seeHistory
    },
    [types.SET_SC_ITEM](state, scItem) {
        state.scItem = scItem
    },
    [types.SET_USER_AVAILABLE_INFO](state, userAvailableInfo) {
        state.userAvailableInfo = userAvailableInfo
    },
    [types.SET_SC_LIST](state, scList) {
        state.scList = scList
    },
    [types.SET_ALL_OBJ](state, allObj) {
        state.allObj = allObj
    },
}