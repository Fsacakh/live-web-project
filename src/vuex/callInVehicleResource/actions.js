import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const getCarAdjustInStockInfoList = ({ commit }, params) => {
    api.carAdjustInStockInfo
        .carAdjustInStockInfo
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
                    commit(types.CALL_IN_VEHICLE_RESOURCE_GET_CAR_ADJUST_IN_STOCK_LIST, {
                        list
                    })
                    commit(types.CALL_IN_VEHICLE_RESOURCE_SET_PAGER, {
                        pager
                    })
                }
            }
        })
}

export const getCarShareNo = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.carShare.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let carShareNo = res.data.obj
                params.callback(carShareNo)
            }
        })
}

export const getUserAvailableInfo = ({ commit }, params) => {
    api.getUserAvailableInfo((res) => {
        if (res.data.code === 'success') {
            let storeInfo = res.data.obj.storeInfoVo
            params.callback(storeInfo)
        }
    })
}

export const addCarAdjustInStockOrder = ({ dispatch, commit, state }, params) => {
    dispatch('getUserAvailableInfo', {
        callback: (storeInfo) => {
            let storeCode = storeInfo.storeCode
            params.targetStoreCode = storeCode
            api.carAdjustInStockInfo
                .carAdjustInStockInfo
                .insert(params, (res) => {
                    if (res.data.code === 'success') {
                        if (res.data.obj != null) {
                            let purchaseNo = res.data.obj.purchaseNo
                            params.callback(purchaseNo)
                        }
                    }
                })
        }
    })
}

export const updateCarAdjustInStockOrder = ({ dispatch, commit, state }, params) => {
    api.carAdjustInStockInfo
        .carAdjustInStockInfo
        .update(params, (res) => {
            if (res.data.code === 'success') {
                if (res.data.obj != null) {
                    let carAdjustInStockInfo = params
                    commit(types.CALL_IN_VEHICLE_RESOURCE_SET_CAR_ADJUST_IN_STOCK_INFO, {
                        carAdjustInStockInfo
                    })
                    commit(types.CALL_IN_VEHICLE_RESOURCE_ADD_CAR_ADJUST_IN_STOCK_INFO_SUCC)
                }
            }
        })
}

export const submitCarAdjustInStockOrder = ({ dispatch, commit, state }, params) => {
    api.carAdjustInStockInfo
        .carAdjustInStockInfo
        .submitCarAdjustInStockInfo(params, (res) => {
            if (res.data.code === 'success') {
                if (res.data.obj != null) {
                    params.callback()
                }
            }
        })
}

export const cancelCarAdjustInStockOrder = ({ dispatch, commit, state }, params) => {
    api.carAdjustInStockInfo
        .carAdjustInStockInfo
        .cancelCarAdjustInStockInfo(params, (res) => {
            if (res.data.code === 'success') {
                if (res.data.obj != null) {
                    params.callback()
                }
            }
        })
}

export const getCarAdjustInStockOrder = ({ dispatch, commit, state }, params) => {
    api.carAdjustInStockInfo
        .carAdjustInStockInfo
        .get(params, (res) => {
            if (res.data.code === 'success') {
                if (res.data.obj != null) {
                    let carAdjustInStockInfo = res.data.obj
                    let list = carAdjustInStockInfo.adjustInDetails
                    commit(types.CALL_IN_VEHICLE_RESOURCE_SET_CAR_ADJUST_IN_STOCK_INFO, {
                        carAdjustInStockInfo
                    })
                    commit(types.CALL_IN_VEHICLE_RESOURCE_SET_CAR_ADJUST_IN_STOCK_DETAIL_INFO_LIST, {
                        list
                    })
                    commit(types.CALL_IN_VEHICLE_RESOURCE_ADD_CAR_ADJUST_IN_STOCK_INFO_SUCC)
                }
            }
        })
}

export const resetCarAdjustInStockOrder = ({ commit }, params) => { 
    let carAdjustInStockInfo = {}
    let list = []
    commit(types.CALL_IN_VEHICLE_RESOURCE_SET_CAR_ADJUST_IN_STOCK_INFO, {
        carAdjustInStockInfo
    })
    commit(types.CALL_IN_VEHICLE_RESOURCE_SET_CAR_ADJUST_IN_STOCK_DETAIL_INFO_LIST, {
        list
    })
    commit(types.CALL_IN_VEHICLE_RESOURCE_RESET_CAR_ADJUST_IN_STOCK_INFO_SUCC)
}

export const resetCarAdjustInStockOrderSucc = ({ commit }, params) => {
    commit(types.CALL_IN_VEHICLE_RESOURCE_RESET_CAR_ADJUST_IN_STOCK_INFO_SUCC)
}

export const getSkuInfoList = ({ commit }, params) => {
    params.skuType = config.product.archives.archivesType
    params.salesStatus = 0
    api.product
        .skuPrice
        .querySkuInfo(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    list.forEach((item) => {
                        let skuAddInfoVoList = item.skuAddInfoVoList
                        if (skuAddInfoVoList != null && skuAddInfoVoList.length > 0) {
                            let orderAddInfos = []
                            skuAddInfoVoList.forEach((skuAddInfo) => {
                                let orderAddInfo = {}
                                switch (skuAddInfo.addCode) {
                                    case config.car.skuAddInfos.actualMSRPInclusiveTax.refCode:
                                        item.msrp = skuAddInfo.addValue
                                        break
                                    case config.car.skuAddInfos.carloadProAddPurchaseFee.refCode:
                                        item.purchaseFee = skuAddInfo.addValue
                                        break
                                }
                            })
                        }
                        item.carVinCode = item.carVinNo
                        item.carProductionCode = item.productionCode
                    })
                }
                let pager = {
                    pageNo: res.data.obj.pageNum,
                    pageSize: res.data.obj.pageSize,
                    total: res.data.obj.total,
                    totalPages: res.data.obj.pages
                }
                commit(types.CALL_IN_VEHICLE_RESOURCE_GET_SKU_INFO_LIST, {
                    list
                })
                commit(types.CALL_IN_VEHICLE_RESOURCE_SET_SKU_PAGER, {
                    pager
                })
            }
        })
}

export const hideAddModal = ({ commit }, params) => {
    commit(types.CALL_IN_VEHICLE_RESOURCE_HIDE_MODAL)
}

export const showAddModal = ({ commit }, params) => {
    commit(types.CALL_IN_VEHICLE_RESOURCE_SHOW_MODAL)
}

export const getCarShareDetailNo = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.carShare.detail.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let carShareDetailNo = res.data.obj
                params.callback(carShareDetailNo)
            }
        })
}

export const addCarShareDetailList = ({ dispatch, commit, state }, params) => {
    dispatch('getCarShareDetailNo', {
        callback: (carShareDetailNo) => {
            let carShareDetailInfo = params
            carShareDetailInfo.carShareNo = state.carShareInfo.carShareNo
            carShareDetailInfo.carShareDetailNo = carShareDetailNo
            commit(types.CALL_IN_VEHICLE_RESOURCE_ADD_CAR_SHARE_DETAIL_INFO, {
                carShareDetailInfo
            })
        }
    })
}

export const getCarAdjustInStockDetailInfoList = ({ dispatch, commit, state }, params) => {
    api.carAdjustInStockInfo
        .carAdjustInStockDetailInfo
        .get(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                commit(types.CALL_IN_VEHICLE_RESOURCE_SET_CAR_ADJUST_IN_STOCK_DETAIL_INFO_LIST, {
                    list
                })
            }
        })
}

export const removeCarShareDetailInfoList = ({ commit }, params) => {
    let index = params
    commit(types.CALL_IN_VEHICLE_RESOURCE_REMOVE_CAR_SHARE_DETAIL_INFO, {
        index
    })
}

export const editCarShareDetailInfoList = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .carShareDetailInfo
        .editCarShareDetailInfoList(params.carShareDetailInfoList, (res) => {
            if (res.data.code === 'success') {
                params.callback()
            }
        })
}