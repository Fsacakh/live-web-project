import * as types from './mutation-types'
export default {
    [types.SALESADMIN_GET_TABLELIST](state, { list }) {
        state.tablelist = list
    },
    [types.SALESADMIN_SET_PAGE](state, { pager }) {
        state.pager = pager
    },
    [types.SALESADMIN_DEL_TABLELIST](state) {
        state.tablelist = []
    }
}