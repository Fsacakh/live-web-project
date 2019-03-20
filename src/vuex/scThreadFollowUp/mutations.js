import * as types from './mutation-types'
export default {
    [types.LEADS_LIST](state, { list }) {
        state.leadsList = list
    },
    [types.ORDER_LIST](state, { list }) {
        state.orderList = list
    },
    [types.LEADS_CHANNEL](state, { options }) {
        state.channels = options
    },
    [types.SC_LIST](state, { scs }) {
        state.scs = scs
    },
    [types.PARAM](state, { newParams }) {
        state.param = newParams
    },
    [types.SC_NAME](state, { scName }) {
        state.scNameInput = scName
    }
}