import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const getCarAdjustOutStockInfoList = ({ commit }, params) => {
    api.carAdjustOutStockInfo
        .carAdjustOutStockInfo
        .query(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_GET_CAR_ADJUST_OUT_STOCK_LIST, {
                        list
                    })
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_PAGER, {
                        pager
                    })
                }
            }
        })
}

export const getOutStockNo = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.carAdjustOutStockInfo.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let outStockNo = res.data.obj
                params.callback(outStockNo)
            }
        })
}

export const addCarAdjustOutStockOrder = ({ commit }, params) => {
    api.carAdjustOutStockInfo
        .carAdjustOutStockInfo
        .insert(params, (res) => {
            if (res.data.code === 'success') {
                let carAdjustOutStockInfo = res.data.obj
                if (carAdjustOutStockInfo != null) {
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_CAR_ADJUST_OUT_STOCK_INFO, {
                        carAdjustOutStockInfo
                    })
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_ADD_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_SUCC)
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_SHOW_ADDITIONAL_FIELD)
                }
            }
        })
}

export const updateCarAdjustOutStockOrder = ({ commit }, params) => {
    api.carAdjustOutStockInfo
        .carAdjustOutStockInfo
        .update(params, (res) => {
            if (res.data.code === 'success') {
                let carAdjustOutStockInfo = params
                if (carAdjustOutStockInfo != null) {
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_CAR_ADJUST_OUT_STOCK_INFO, {
                        carAdjustOutStockInfo
                    })
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_ADD_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_SUCC)
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_SHOW_ADDITIONAL_FIELD)
                }
            }
        })
}

export const submitCarAdjustOutStockOrder = ({ dispatch, commit, state }, params) => {
    api.carAdjustOutStockInfo
        .carAdjustOutStockInfo
        .confirmAdjustOutCarInfo(params.carAdjustOutStockInfo, (res) => {
            if (res.data.code === 'success') {
                dispatch('getCarAdjustOutStockInfoList', {
                    sourceStoreCode: state.carAdjustOutStockData.sourceStoreCode,
                    sourceWhCode: '',
                    targetStoreCode: '',
                    skuCode: '',
                    produtionCode: '',
                    vin: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                })
                params.callback()
            }
        })
}

export const getCarAdjustOutStockOrder = ({ dispatch, commit, state }, params) => {
    api.carAdjustOutStockInfo
        .carAdjustOutStockInfo
        .get(params, (res) => {
            if (res.data.code === 'success') {
                let carAdjustOutStockInfo = res.data.obj
                if (carAdjustOutStockInfo != null) {
                    let list = carAdjustOutStockInfo.outCarDetails
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_CAR_ADJUST_OUT_STOCK_INFO, {
                        carAdjustOutStockInfo
                    })
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_LIST, {
                        list
                    })
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_ADD_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_SUCC)
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_SHOW_ADDITIONAL_FIELD)
                }
            }
        })
}

export const cancelCarAdjustOutStockOrder = ({ commit }, params) => {
    api.carAdjustOutStockInfo
        .carAdjustOutStockInfo
        .cancelAdjustOutCarInfo(params, (res) => {
            if (res.data.code === 'success') {
                params.callback()
            }
        })
}

export const resetCarAdjustOutStockOrder = ({ commit }, params) => {
    let carAdjustOutStockInfo = {}
    let list = []
    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_CAR_ADJUST_OUT_STOCK_INFO, {
        carAdjustOutStockInfo
    })
    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_LIST, {
        list
    })
    commit(types.CALL_OUT_VEHICLE_RESOURCE_HIDE_ADDITIONAL_FIELD)
    commit(types.CALL_OUT_VEHICLE_RESOURCE_RESET_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_SUCC)
}

export const resetCarAdjustOutStockOrderSucc = ({ commit }, params) => {
    commit(types.CALL_OUT_VEHICLE_RESOURCE_RESET_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_SUCC)
}

export const getWareHouses = ({ commit }, params) => {
    api.supplyChain
        .warehouse
        .getQueryInfo(params)
        .then((res) => {
            if (res.data.code === 'success') {
                let wareHouses = res.data.obj.list
                if (wareHouses != null && wareHouses.length > 0) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_ATTACH_WAREHOUSES, {
                        wareHouses
                    })
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_WAREHOUSES_PAGER, {
                        pager
                    })
                }
            }
        })
}

export const resetWareHouses = ({ commit }, params) => {
    let wareHouses = []
    let pager = {
        pageNo: 0,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_WAREHOUSES, {
        wareHouses
    })
    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_WAREHOUSES_PAGER, {
        pager
    })
}

export const getSkuInfoList = ({ commit }, params) => {
    api.supplyChain
        .carShareDetailInfo
        .queryCarShareDetailsOnFlag(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_GET_SKU_INFO_LIST, {
                        list
                    })
                    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_SKU_PAGER, {
                        pager
                    })
                }
            }
        })
}

export const hideSelectModal = ({ commit }, params) => {
    let list = []
    let pager = {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
    commit(types.CALL_OUT_VEHICLE_RESOURCE_HIDE_MODAL)
    commit(types.CALL_OUT_VEHICLE_RESOURCE_GET_SKU_INFO_LIST, {
        list
    })
    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_ADD_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_LIST, {
        list
    })
    commit(types.CALL_OUT_VEHICLE_RESOURCE_SET_SKU_PAGER, {
        pager
    })
}

export const showSelectModal = ({ commit }, params) => {
    commit(types.CALL_OUT_VEHICLE_RESOURCE_SHOW_MODAL)
}

export const getOutStockDetailNo = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.carShare.detail.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let detailNo = res.data.obj
                params.callback(detailNo)
            }
        })
}

export const addCarAdjustOutStockDetailInfoList = ({ dispatch, commit, state }, params) => {
    let carAdjustOutStockDetailInfo = JSON.parse(JSON.stringify(params))
    dispatch('getOutStockDetailNo', {
        callback: (detailNo) => {
            carAdjustOutStockDetailInfo.id = ''
            carAdjustOutStockDetailInfo.outStockNo = state.carAdjustOutStockData.outStockNo
            carAdjustOutStockDetailInfo.detailNo = detailNo
            commit(types.CALL_OUT_VEHICLE_RESOURCE_ADD_CAR_ADJUST_OUT_STOCK_DETAIL_INFO, {
                carAdjustOutStockDetailInfo
            })
        }
    })
}

export const commitCarAdjustOutStockDetailInfoList = ({ dispatch, commit, state }, params) => {
    var detailList = state.addCarAdjustOutStockDetailList
    detailList.map( (v) => {
         v.targetWhCode = params.targetWhCode
         v.targetWhName = params.targetWhName
    })
    if (detailList.length > 0) {
        api.carAdjustOutStockInfo
            .carAdjustOutStockDetailInfo
            .editCarAdjustOutStockDetailInfoList(detailList, (res) => {
                if (res.data.code === 'success') {
                    let list = res.data.obj
                    if (list != null) {
                        commit(types.CALL_OUT_VEHICLE_RESOURCE_COMMIT_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_LIST, {
                            list
                        })
                    }
                }
            })
    }
}

export const deleteCarAdjustOutStockDetailInfoList = ({ dispatch, commit, state }, params) => {
    let index = params
    commit(types.CALL_OUT_VEHICLE_RESOURCE_DELETE_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_LIST, {
        index
    })
    api.carAdjustOutStockInfo
        .carAdjustOutStockDetailInfo
        .editCarAdjustOutStockDetailInfoList([state.carAdjustOutStockDetailList[index]], (res) => {
            if (res.data.code === 'success') {
                dispatch('getCarAdjustOutStockOrder', {
                    outStockNo: state.carAdjustOutStockData.outStockNo
                })
            }
        })
}

export const removeCarAdjustOutStockDetailInfoList = ({ commit }, params) => {
    let index = params
    commit(types.CALL_OUT_VEHICLE_RESOURCE_REMOVE_CAR_ADJUST_OUT_STOCK_DETAIL_INFO, {
        index
    })
}

export const getCarAdjustOutStockDetailInfoList = ({ dispatch, commit, state }, params) => {
    api.carAdjustOutStockInfo
        .carAdjustOutStockDetailInfo
        .get(params, (res) => {
            if (res.data.code === 'success') {

            }
        })
}