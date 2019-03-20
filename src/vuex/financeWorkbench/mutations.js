import * as types from './mutation-types'

export default {
    [types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_INFO_LIST](state, { list }) {
        state.financeWorkbenchInfoList = list
    },
    [types.FINANCE_WORK_BENCH_SET_FINANCE_WORK_BENCH_INFO_PAGER](state, { pager }) {
        state.wbPager = pager
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_TRACK_INFO_LIST](state, { list }) {
        state.financeWbTrackInfoList = list
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_TRACK_INFO_PAGER](state, { pager }) {
        state.wbTrackPager = pager
    },
    // 金融机构信息
    [types.FINANCE_WORK_BENCH_GET_AUTHORIZATION_ORGS](state, { options }) {
        state.authorizationOrgs = options
    },
    [types.FINANCE_WORK_BENCH_GET_ID_TYPES](state, { options }) {
        state.idTypes = options
    },
    [types.FINANCE_WORK_BENCH_APPROVAL_RESULT_TYPES](state, { options }) {
        state.approvalResultTypes = options
    },
    [types.FINANCE_WORK_BENCH_APPROVAL_RESULT__REASON_TYPES](state, { options }) {
        state.approvalResultReasonTypes = options
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_SUCC](state) {
        state.getfinanceWorkbenchSucc = true
    },
    [types.FINANCE_WORK_BENCH_RESET_FINANCE_WORK_BENCH_SUCC](state) {
        state.getfinanceWorkbenchSucc = false
    },
    [types.FINANCE_WORK_BENCH_ADD_FINANCE_CUSTOM_SUCC](state) {
        state.addfinanceCustomSucc = true
    },
    [types.FINANCE_WORK_BENCH_RESET_ADD_FINANCE_CUSTOM_SUCC](state) {
        state.addfinanceCustomSucc = false
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_INFO](state, { financeWorkbenchInfo }) {
        state.financeWorkbenchData = financeWorkbenchInfo
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_CUSTOM_INFO](state, { customInfo }) {
        state.customData = customInfo
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_TRACK_INFO](state, { trackInfo }) {
        state.financeWorkTrackData = trackInfo
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_TYPES](state, { options }) {
        state.financeTypes = options
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_FAIL_REASON_TYPES](state, { options }) {
        state.financeFailReasonTypes = options
    },
    [types.FINANCE_WORK_BENCH_SHOW_SELECT_MODAL](state) {
        state.showSelectModal = true
    },
    [types.FINANCE_WORK_BENCH_HIDE_SELECT_MODAL](state) {
        state.showSelectModal = false
    },
    [types.FINANCE_WORK_BENCH_SHOW_HISTORY_MODAL](state) {
        state.showHistoryModal = true
    },
    [types.FINANCE_WORK_BENCH_HIDE_HISTORY_MODAL](state) {
        state.showHistoryModal = false
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_TYPE_CODES](state, { options }) {
        state.financeTypeCodes = options
    },
    [types.FINANCE_WORK_BENCH_SHOW_TRACK_MODAL](state) {
        state.showTrackModal = true
    },
    [types.FINANCE_WORK_BENCH_HIDE_TRACK_MODAL](state) {
        state.showTrackModal = false
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_PRO_LIST](state, { list }) {
        state.financeProList = list
    },
    [types.FINANCE_WORK_BENCH_SET_FINANCE_PRO_PAGER](state, { pager }) {
        state.financePager = pager
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_WB_HISTORY_LIST](state, { list }) {
        state.financeWbHistoryInfoList = list
    },
    [types.FINANCE_WORK_BENCH_GET_FINANCE_WB_TRACK_LIST](state, { list }) {
        state.financeWbTrackHistoryList = list
    },
    // 查询报价推送历史明细
    [types.FIANCE_WORK_BENCH_INFO_OBJECT](state, { objects }) {
        state.financeWorkbenchInfo = objects
    }
}
