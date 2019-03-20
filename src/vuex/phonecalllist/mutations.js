import * as types from './mutation-types'
export default {
    [types.PHONE_CALL_LIST](state, { list }) {
        state.list = list
    },
    [types.PHONE_CALL_LIST_PAGER](state, { pager }) {
        state.pager = pager  
    }
}

