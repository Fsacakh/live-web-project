import * as types from './mutation-types'

export default {
    [types.SALESTARGETPLAN_GET_SALESTARGETPLAN_LIST](state, { list }) {
        state.salesTargetPlanList = list
    },
    [types.SALESTARGETPLAN_SET_SALESTARGETPLAN_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.RESET_SALES_TARGET_PLAN_LIST](state, { data }) {
        state.salesTargetPlanList = data
    },
    [types.RESET_PAGER](state, { pager }) {
        state.pager = pager
    }
}