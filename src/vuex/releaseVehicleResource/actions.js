import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const getVehicleResourceList = ({ commit }, params) => {
    api.supplyChain
        .carShareDetailInfo
        .queryCarShareDetailsByCondition(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.RELEASE_VEHICLE_RESOURCE_GET_RESOURCE_LIST, {
                        list
                    })
                    commit(types.RELEASE_VEHICLE_RESOURCE_SET_PAGER, {
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

export const addCarShareOrder = ({ commit }, params) => {
    api.supplyChain
        .carShareInfo
        .insert(params, (res) => {
            if (res.data.code === 'success') {
                let carShareInfo = res.data.obj
                if (carShareInfo != null) {
                    commit(types.RELEASE_VEHICLE_RESOURCE_SET_CAR_SHARE_INFO, {
                        carShareInfo
                    })
                    commit(types.RELEASE_VEHICLE_RESOURCE_ADD_CAR_SHARE_DETAIL_INFO_SUCC)
                    commit(types.RELEASE_VEHICLE_RESOURCE_SHOW_ADDITIONAL_FIELD)
                }
            }
        })
}

export const updateCarShareOrder = ({ commit }, params) => {
    api.supplyChain
        .carShareInfo
        .update(params, (res) => {
            if (res.data.code === 'success') {
                let carShareInfo = res.data.obj
                if (carShareInfo != null) {
                    commit(types.RELEASE_VEHICLE_RESOURCE_SET_CAR_SHARE_INFO, {
                        carShareInfo
                    })
                    commit(types.RELEASE_VEHICLE_RESOURCE_ADD_CAR_SHARE_DETAIL_INFO_SUCC)
                    commit(types.RELEASE_VEHICLE_RESOURCE_SHOW_ADDITIONAL_FIELD)
                }
            }
        })
}

export const resetCarShareOrderSucc = ({ commit }, params) => {
    commit(types.RELEASE_VEHICLE_RESOURCE_RESET_CAR_SHARE_DETAIL_INFO_SUCC)
}

export const submitCarShareOrder = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .carShareInfo
        .submitCarShareInfo(params.carShareInfo, (res) => {
            if (res.data.code === 'success') {
                dispatch('getVehicleResourceList', {
                    storeCodeSet: [],
                    carFactoryCode: '',
                    carBrandCode: '',
                    carSeriesCode: '',
                    carModelCode: '',
                    carCode: '',
                    skuCode: '',
                    carVinCode: '',
                    carProductionCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                })
                params.callback()
            }
        })
}

export const resetCarShareOrder = ({ commit }, params) => {
    let list = []
    let carShareInfo = {}
    commit(types.RELEASE_VEHICLE_RESOURCE_SET_CAR_SHARE_INFO, {
        carShareInfo
    })
    commit(types.RELEASE_VEHICLE_RESOURCE_SET_CAR_SHARE_DETAIL_INFO_LIST, {
        list
    })
    commit(types.RELEASE_VEHICLE_RESOURCE_RESET_CAR_SHARE_DETAIL_INFO_SUCC)
    commit(types.RELEASE_VEHICLE_RESOURCE_HIDE_ADDITIONAL_FIELD)
}

export const cancelCarShareInfo = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .carShareInfo
        .cancelCarShareInfo(params.carShareInfo, (res) => {
            if (res.data.code === 'success') {
                dispatch('getVehicleResourceList', {
                    storeCodeSet: [],
                    carFactoryCode: '',
                    carBrandCode: '',
                    carSeriesCode: '',
                    carModelCode: '',
                    carCode: '',
                    skuCode: '',
                    carVinCode: '',
                    carProductionCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                })
                params.callback()
            }
        })
}

export const getCarShareOrder = ({ commit }, params) => {
    api.supplyChain
        .carShareInfo
        .get(params, (res) => {
            if (res.data.code === 'success') {
                let carShareInfo = res.data.obj
                if (carShareInfo != null) {
                    commit(types.RELEASE_VEHICLE_RESOURCE_SET_CAR_SHARE_INFO, {
                        carShareInfo
                    })
                    commit(types.RELEASE_VEHICLE_RESOURCE_ADD_CAR_SHARE_DETAIL_INFO_SUCC)
                    commit(types.RELEASE_VEHICLE_RESOURCE_SHOW_ADDITIONAL_FIELD)
                }
            }
        })
}

export const getUserInfo = ({ commit }, params) => {
    api.getUserAvailableInfo((res) => {
        let userInfo = res.data.obj
        params.callback(userInfo)
    })
}

export const getSkuInfoList = ({ dispatch, commit, state }, params) => {
    dispatch('getUserInfo', {
        callback: (userInfo) => {
            params.skuType = config.product.archives.archivesType
            params.salesStatus = 0
            params.onOffFlag = 1
            params.storeCode = userInfo.storeInfoVo.storeCode
            api.product
                .skuPrice
                .querySkuInfo(params, (res) => {
                    if (res.data.code === 'success') {
                        let list = res.data.obj.list
                        let skuCodeSet = []
                        if (list != null) {
                            list.forEach((item) => {
                                skuCodeSet.push(item.skuCode)
                                let skuAddInfoVoList = item.skuAddInfoVoList
                                if (skuAddInfoVoList != null && skuAddInfoVoList.length > 0) {
                                    let orderAddInfos = []
                                    skuAddInfoVoList.forEach((skuAddInfo) => {
                                        let orderAddInfo = {}
                                        switch (skuAddInfo.addCode) {
                                            case config.car.skuAddInfos.actualMSRPInclusiveTax.refCode:
                                                item.msrp = skuAddInfo.addValue
                                                break
                                        }
                                    })
                                }
                                item.carVinCode = item.carVinNo
                                item.carProductionCode = item.productionCode
                            })
                            if (skuCodeSet != null && skuCodeSet.length > 0) {
                                dispatch('getSkuPurchaseFee', {
                                    skuCodeSet: skuCodeSet,
                                    callback: (map) => {
                                        list.forEach((item) => {
                                            item.purchaseFee = map[item.skuCode]
                                        })
                                        let pager = {
                                            pageNo: res.data.obj.pageNum,
                                            pageSize: res.data.obj.pageSize,
                                            total: res.data.obj.total,
                                            totalPages: res.data.obj.pages
                                        }
                                        commit(types.RELEASE_VEHICLE_RESOURCE_GET_SKU_INFO_LIST, {
                                            list
                                        })
                                        commit(types.RELEASE_VEHICLE_RESOURCE_SET_SKU_PAGER, {
                                            pager
                                        })
                                    }
                                })
                            }
                        }
                    }
                })
        }
    })
}

export const getSkuPurchaseFee = ({ commit }, params) => {
    api.supplyChain
        .purchaseOrder
        .queryPoCarSkuDetailBySkuCodes(params, (res) => {
            if (res.data.code === 'success') {
                let map = res.data.obj
                if (map != null) {
                    params.callback(map)
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
    commit(types.RELEASE_VEHICLE_RESOURCE_HIDE_MODAL)
    commit(types.RELEASE_VEHICLE_RESOURCE_GET_SKU_INFO_LIST, {
        list
    })
    commit(types.RELEASE_VEHICLE_RESOURCE_SET_ADD_CAR_SHARE_DETAIL_INFO_LIST, {
        list
    })
    commit(types.RELEASE_VEHICLE_RESOURCE_SET_SKU_PAGER, {
        pager
    })
}

export const showSelectModal = ({ commit }, params) => {
    commit(types.RELEASE_VEHICLE_RESOURCE_SHOW_MODAL)
}

export const hideSkuModal = ({ commit }, params) => {
    commit(types.RELEASE_VEHICLE_RESOURCE_HIDE_SKU_MODAL)
}

export const showSkuModal = ({ commit }, params) => {
    commit(types.RELEASE_VEHICLE_RESOURCE_SHOW_SKU_MODAL)
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
            let carShareDetailInfo = JSON.parse(JSON.stringify(params))
            carShareDetailInfo.carShareNo = state.carShareInfoData.carShareNo
            carShareDetailInfo.carShareDetailNo = carShareDetailNo
            carShareDetailInfo.id = ''
            commit(types.RELEASE_VEHICLE_RESOURCE_ADD_CAR_SHARE_DETAIL_INFO, {
                carShareDetailInfo
            })
        }
    })
}

export const commitCarShareDetailInfoList = ({ dispatch, commit, state }, params) => {
    let skuInfoList = state.addCarShareDetailInfoList
    if (skuInfoList.length > 0) {
        api.supplyChain
            .carShareDetailInfo
            .editCarShareDetailInfoList(skuInfoList, (res) => {
                if (res.data.code === 'success') {
                    let list = res.data.obj
                    list.forEach((carShareDetailInfo) => {
                        let index = skuInfoList.findIndex((skuInfo) => {
                            return skuInfo.skuCode = carShareDetailInfo.skuCode
                        })
                        carShareDetailInfo.logisticsStatus = skuInfoList[index].logisticsStatus
                    })
                    commit(types.RELEASE_VEHICLE_RESOURCE_COMMIT_CAR_SHARE_DETAIL_INFO_LIST, {
                        list
                    })
                }
            })
    }
}

export const removeCarShareDetailInfoList = ({ commit }, params) => {
    let index = params
    commit(types.RELEASE_VEHICLE_RESOURCE_REMOVE_CAR_SHARE_DETAIL_INFO, {
        index
    })
}

export const getCarShareDetailInfoList = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .carShareDetailInfo
        .queryCarShareDetailInfoVosNoPage(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                commit(types.RELEASE_VEHICLE_RESOURCE_SET_CAR_SHARE_DETAIL_INFO_LIST, {
                    list
                })
            }
        })
}

export const deleteCarShareDetailInfoList = ({ dispatch, commit, state }, params) => {
    let index = params
    commit(types.RELEASE_VEHICLE_RESOURCE_DELETE_CAR_SHARE_DETAIL_INFO, {
        index
    })
    let carShareDetailInfo = state.carShareDetailInfoList[index]
    api.supplyChain
        .carShareDetailInfo
        .update(carShareDetailInfo, (res) => {
            if (res.data.code === 'success') {
                dispatch('getCarShareDetailInfoList', {
                    carShareNo: carShareDetailInfo.carShareNo
                })
            }
        })
}

export const updateCarShareDetailInfoListOff = ({ dispatch, commit, state }, params) => {
    let index = params
    let carShareDetailInfo = state.carShareDetailInfoList[index]
    api.supplyChain
        .carShareDetailInfo
        .updateCarShareDetailOff(carShareDetailInfo, (res) => {
            if (res.data.code === 'success') {
                dispatch('getCarShareDetailInfoList', {
                    carShareNo: carShareDetailInfo.carShareNo
                })
            }
        })
}