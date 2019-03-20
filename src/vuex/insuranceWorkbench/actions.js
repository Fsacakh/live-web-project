import api from '../../common/api'
import config from '../../common/config'
import common from '../../common/common'
import * as types from './mutation-types'

export const getInsuranceWorkbenchInfoList = ({ dispatch, commit, state }, params) => {
    api.insuranceWorkbench.queryInsWorkbenchInfoPage(params, (res) => {
            if (res.data.code === 'success') {
                let status = params.insuranceStatus
                let obj = res.data.obj
                let result = null
                let list = []
                if (obj != null) {
                    result = obj.list
                    if (result != null) {
                        let pager = {
                            pageNo: res.data.obj.pageNum,
                            pageSize: res.data.obj.pageSize,
                            total: res.data.obj.total,
                            totalPages: res.data.obj.pages
                        }
                        result.forEach((item) => {
                            list.push(item)
                        })
                        commit(types.INSURANCE_WORK_BENCH_PAGER, {
                            pager
                        })
                    }
                }
                commit(types.INSURANCE_WORK_BENCH_INFO_LIST, {
                    list
                })
                commit(types.INSURANCE_WORK_BENCH_PARAM_INSURANCE_STATUS, {
                    status
                })
            }
        })
}

export const getInsuranceWorkbenchInfo = ({ dispatch, commit, state }, params) => {
    api.insuranceWorchBench
        .getInsuranceWorkbenchInfoByWorkbenchCode(params, (res) => {
            if (res.data.code === 'success') {
                let insuranceWorkbenchInfo = res.data.obj
                if (insuranceWorkbenchInfo != null) {
                    dispatch('getCarOrderActualPriceList', {
                        orderNoSet: [insuranceWorkbenchInfo.orderNo],
                        callback: (map) => {
                            insuranceWorkbenchInfo.salesPrice = map[insuranceWorkbenchInfo.orderNo]
                            dispatch('getCarOrderInfoByOrderNo', {
                                orderNo: insuranceWorkbenchInfo.orderNo,
                                callback: (wfType) => {
                                    insuranceWorkbenchInfo.wfType = wfType
                                    commit(types.INSURANCE_WORK_BENCH_GET_INSURANCE_WORK_BENCH_INFO, {
                                        insuranceWorkbenchInfo
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
}

export const getInsuranceTypesInfoVosByCoCode = ({ dispatch, commit, state }, params) => {
    api.insuranceWorchBench
        .queryInsuranceTypesInfoVosByCoCode(params, (res) => {
            if (res.data.code === 'success') {
                let insuranceTypes = res.data.obj
                params.callback(insuranceTypes)
            }
        })
}

export const resetInsuranceTypes = ({ dispatch, commit, state }, params) => {
    let insuranceTypes = []
    commit(types.INSURANCE_WORK_BENCH_GET_INSURANCE_TYPES, {
        insuranceTypes
    })
}

export const getAccountTypes = ({ dispatch, commit, state }) => {
    let params = { 'refCode': config.insurance.accountType }
    api.ref
        .getDataDictionary(params).then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let arr = []
                arr = res.data.obj.referenceDetailInfos
                if (arr != null) {
                    arr.forEach((item, index) => {
                        options.push({
                            text: item.refDetailName,
                            value: item.refDetailCode
                        })
                    })
                }
                commit(types.INSURANCE_WORK_BENCH_GET_ACCOUNT_TYPES, {
                    options
                })
            }
        })
}

export const getinsuranceFailReasonTypes = ({ dispatch, commit, state }) => {
    let params = { 'refCode': config.insurance.insuranceFailReasonType }
    api.ref
        .getDataDictionary(params).then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let arr = []
                arr = res.data.obj.referenceDetailInfos
                if (arr != null) {
                    arr.forEach((item, index) => {
                        options.push({
                            text: item.refDetailName,
                            value: item.refDetailCode
                        })
                    })
                }
                commit(types.INSURANCE_WORK_BENCH_GET_DEFEAT_REASON_TYPES, {
                    options
                })
            }
        })
}

export const getInsuranceRetreatingReasonTypes = ({ dispatch, commit, state }) => {
    let params = { 'refCode': config.insuranceWorkbench.retreatingReason }
    api.ref
        .getDataDictionary(params).then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let arr = []
                arr = res.data.obj.referenceDetailInfos
                if (arr != null) {
                    arr.forEach((item, index) => {
                        options.push({
                            text: item.refDetailName,
                            value: item.refDetailCode
                        })
                    })
                }
                commit(types.INSURANCE_WORK_BENCH_GET_RETREAT_REASON_TYPES, {
                    options
                })
            }
        })
}

export const getMotorVehicleSpecies = ({ dispatch, commit, state }) => {
    let params = { 'refCode': config.insuranceWorkbench.vehicleSpecies }
    api.ref
        .getDataDictionary(params).then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let arr = []
                arr = res.data.obj.referenceDetailInfos
                if (arr != null) {
                    arr.forEach((item, index) => {
                        options.push({
                            text: item.refDetailName,
                            value: item.refDetailCode
                        })
                    })
                }
                commit(types.INSURANCE_WORK_BENCH_GET_VEHICLE_SPECIES, {
                    options
                })
            }
        })
}

export const getInsWbTrackInfoList = ({ dispatch, commit, state }, params) => {
    api.insuranceWorchBench
        .queryInsWbTrackInfo(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                commit(types.INSURANCE_WORK_BENCH_GET_INSWEB_TRACK_INFO_LIST, {
                    list
                })
            }
        })
}

export const updateInsWbOrderDetailInfo = ({ dispatch, commit, state }, params) => {
    api.insuranceWorchBench
        .updateInsWbOrderDetailInfo(params.insuranceWorkbenchInfo, (res) => {
            if (res.data.code === 'success') {
                params.callback()
            }
        })
}

export const editInsuranceWorkbenchInfoData = ({ dispatch, commit, state }, params) => {
    api.insuranceWorchBench
        .assistInsuranceWorkbenchInfo(params.insuranceWorkbenchInfo, (res) => {
            if (res.data.code === 'success') {
                let insuranceWorkbenchInfo = res.data.obj
                params.callback(insuranceWorkbenchInfo)
            }
        })
}

export const synchInsuranceWorkbenchInfo = ({ dispatch, commit, state }, params) => {
    api.insuranceWorchBench
        .assistInsuranceWorkbenchInfo(params.insuranceWorkbenchInfo, (res) => {
            if (res.data.code === 'success') {
                let insuranceWorkbenchInfo = res.data.obj
                params.callback(insuranceWorkbenchInfo)
            }
        })
}

export const updateInsWbRecognizeeInfo = ({ dispatch, commit, state }, params) => {
    api.insuranceWorchBench
        .updateInsWbRecognizeeInfo(params.insuranceWorkbenchInfo, (res) => {
            if (res.data.code === 'success') {
                params.callback()
            }
        })
}

export const getCarOrderActualPriceList = ({ commit }, params) => {
    api.finWorkbench
        .queryCarOrderActualPriceList(params, (res) => {
            if (res.data.code === 'success') {
                let obj = res.data.obj
                if (obj != null) {
                    params.callback(obj)
                }
            }
        })
}

export const getCarOrderInfoByOrderNo = ({ state, commit, dispatch }, params) => {
    api.order
        .getCarOrderInfoByOrderNo(params, (res) => {
            if (res.data.code === 'success') {
                let wfType = res.data.obj.currentOrderWfTypeCode
                params.callback(wfType)
            }
        })

}
