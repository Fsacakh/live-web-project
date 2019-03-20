import * as types from './mutation-types'

export default {
    [types.SALESMANAGEORDER_GET_SALESMANAGEORDER_LIST](state, { list }) {
        state.salesManageOrderList = list
    },
    [types.SALESMANAGEORDER_SET_SALESMANAGEORDER_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.SALESMANAGEORDER_GET_SC_LIST](state, { list }) {
        state.filterSCList = list
    },
    [types.SALESMANAGEORDER_SET_SALES_MANAGE_ORDER](state, { salesManagementOrder }) {
        state.salesManagementOrder = salesManagementOrder
    },
    [types.SALESMANAGEORDER_GET_GP_LIST](state, { gpList }) {
        state.gpList = gpList
    }
}
