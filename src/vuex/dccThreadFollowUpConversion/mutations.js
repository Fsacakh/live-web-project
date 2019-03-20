import * as types from './mutation-types'
export default {

    [types.DCC_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST](state,  list) {
        state.DCCFollowUpConditionStatisticsList = list
    },
    [types.DCC_FOLLOW_UP_GET_SUPPLIER_TYPES](state, options) {
        state.DCCSupplyTypes = options
    },
    [types.DCC_FOLLOW_UP_GET_SPECIALIST](state, options){
        state.DccSpecialList = options
    },
    [types.DCC_FOLLOW_UP_FILTER_SPECIALIST](state, options){
        state.DccFilterSpecialList = options
    },
    [types.TOTAL_MONTH](state, totalMonth){
        state.totalMonth = totalMonth
    },
    [types.ALL_DCC](state, allDcc){
        state.allDcc = allDcc
    }

}