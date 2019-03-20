import * as types from './mutation-types'
export default {
    [types.CRM_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST](state, { map }) {
        state.crmFollowUpConditionMap = map
    },
    [types.CRM_FOLLOW_UP_GET_SUPPLIER_TYPES](state, { options }) {
        state.taskTypes = options
    }, 
    [types.CRM_CONDITION_PARAM](state, { newParams }) {
        state.param = newParams
    },
    [types.CRM_CONDITION_TYPES](state, { options }) {
        state.crmConditionTypes = options
    },
    [types.CRM_FOLLOW_UP_GET_SPECIALIST](state, { options }) {
        state.taskOperators = options
    },
    [types.CRM_FOLLOW_UP_OPERATOR](state, { operator }) {
        state.operator = operator
    }
}