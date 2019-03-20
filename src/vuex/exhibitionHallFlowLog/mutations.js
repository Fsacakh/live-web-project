import * as types from './mutation-types'
export default {
    [types.EX_HIBITION_HALL_FLOW_LOG_GET_FLOW_LIST](state, { list }) {
        state.exhibitionHallFlowLogList = list
    },
    [types.EX_HIBITION_HALL_FLOW_LOG_SET_FLOW_PAGER](state, { pager }) {
        state.pager = pager  
    },
    [types.EX_HIBITION_HALL_FLOW_LOG_GET_SC_CODES](state, { options }) {
        state.scCodes = options
    }
}