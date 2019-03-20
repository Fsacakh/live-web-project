import * as types from './mutation-types'

export default {
    [types.INSURANCE_WORK_BENCH_INFO_LIST](state, { list }) {
        state.insuranceWorkbenchInfoList = list
    },
    [types.INSURANCE_WORK_BENCH_PARAM_INSURANCE_STATUS](state, { status }) {
        state.insuranceStatus = status
    },
    [types.INSURANCE_WORK_BENCH_GET_INSURANCE_WORK_BENCH_INFO](state, { insuranceWorkbenchInfo }) {
        state.insuranceWorkbenchData = insuranceWorkbenchInfo
    },
    [types.INSURANCE_WORK_BENCH_GET_INSURANCE_TYPES](state, { insuranceTypes }) {
        state.insuranceTypesList = insuranceTypes
    },
    [types.INSURANCE_WORK_BENCH_GET_ACCOUNT_TYPES](state, { options }) {
        state.accountTypes = options
    },
    [types.INSURANCE_WORK_BENCH_GET_DEFEAT_REASON_TYPES](state, { options }) {
        state.insuranceFailReasonTypes = options
    },
    [types.INSURANCE_WORK_BENCH_GET_VEHICLE_SPECIES](state, { options }) {
        state.motorVehicleSpecies = options
    },
    [types.INSURANCE_WORK_BENCH_GET_RETREAT_REASON_TYPES](state, { options }) {
        state.insuranceRetreatReasonTypes = options
    },
    [types.INSURANCE_WORK_BENCH_GET_INSWEB_TRACK_INFO_LIST](state, { list }) {
        state.insWbTrackInfoList = list
    },
    [types.INSURANCE_WORK_BENCH_PAGER](state, { pager }) {
        state.pager = pager
    },
}