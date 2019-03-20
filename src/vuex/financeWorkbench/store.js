import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    financeWorkbenchData: {},
    customData: {},
    financeWorkTrackData: {},
    getfinanceWorkbenchSucc: false,
    addfinanceCustomSucc: false,
    financeWorkbenchInfoList: [],
    authorizationOrgs: [],
    financeTypes: [],
    financeTypeCodes: [],
    financeFailReasonTypes: [],
    showSelectModal: false,
    showHistoryModal: false,
    showTrackModal: false,
    financeWbHistoryInfoList: [],
    financeWbTrackInfoList: [],
    financeWbTrackHistoryList: [],
    financeWorkbenchInfo: {},    //查询明细
    financeProList: [],
    idTypes: [],
    approvalResultTypes: [],
    approvalResultReasonTypes: [],
    wbPager: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
    wbTrackPager: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
    financePager: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
