import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    DCCFollowUpConditionStatisticsList: [],
    DCCSupplyTypes: [],
    DCCPagers: {
        pageNo: 1,
        pageSize: 10,
        total: 100,
        totalPages: 10
    },
    DccSpecialList: [],
    DccFilterSpecialList:[],
    totalMonth:[],
    allDcc:[]
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}