import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    crmFollowUpConditionMap :{},
    taskTypes : [],
    taskOperators : [],
    operator:"",
    crmConditionTypes : [],
    param : {
        storeCodeSet : [],
        crmYear : "",
        crmMonth : "",
        taskTypeCode : "",
        taskOperatorCode : ""
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}