import * as types from './mutation-types'

export default {
    [types.INSURANCE_GET_ORGANIZATIONS](state, { companies }) {
        state.list = companies
    },
    [types.GET_INSERT_OVER](state, insertOver) {
        state.insertOver = insertOver
    },
    [types.GET_COCODE](state, coCode) {
        state.coCode = coCode.obj
    },
    [types.GET_COCODE_DETAIL](state, coCodeDetail) {
        state.coCodeDetail = coCodeDetail
    },
    [types.TO_INSERT_OR_UPDATA](state, isUpdata) {
        state.isUpdata = isUpdata
    },
    [types.GET_COST_DETAIL](state, costDetail) {
        state.costDetail = costDetail
    }
}