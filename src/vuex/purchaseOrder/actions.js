import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const showSelectModal = ({ commit }) => {
    commit(types.PURCHASEORDER_SHOW_SELECT_MODAL)
}

export const hideSelectModal = ({ commit, state }) => {
    let list = []
    let pager = {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
    commit(types.PURCHASEORDER_HIDE_SELECT_MODAL)
    commit(types.PURCHASEORDER_SET_POSKUDETAILINFO_LIST, {
        list
    })
    commit(types.PURCHASEORDER_GET_SKUINFO_LIST, {
        list
    })
    commit(types.PURCHASEORDER_SET_SKUINFO_PAGER, {
        pager
    })
}

export const getSkuInfoList = ({ commit }, params) => {
    api.product
        .skuPrice
        .querySkuInfo(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.PURCHASEORDER_SET_SKUINFO_PAGER, {
                        pager
                    })
                    commit(types.PURCHASEORDER_GET_SKUINFO_LIST, {
                        list
                    })
                }
            }
        })
}

export const getPoSkuDetailCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.supplyChain.purchaseOrder.poSkuDetail.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let detailCode = res.data.obj
                params.callback(detailCode)
            }
        })
}

export const addPoSkuDetailList = ({ dispatch, commit, state }, skuInfo) => {
    dispatch('getPoSkuDetailCode', {
        callback: function (detailCode) {
            let poSkuDetailInfo = {
                index: skuInfo.index,
                detailCode: detailCode,
                barCode: skuInfo.barCode,
                brandCode: skuInfo.brandCode,
                brandName: skuInfo.brandName,
                checkUnitCode: skuInfo.checkUnitCode,
                checkUnitName: skuInfo.checkUnitName,
                estimatedPurchaseFee: 0,
                externalCode: skuInfo.externalCode,
                orderNo: state.purchaseOrderInfo.orderNo,
                originalCode: skuInfo.originalCode,
                purchaseFee: 0,
                purchaseRate: 0,
                purchaseToCheckNums: skuInfo.purchaseToCheckNums,
                purchaseUnitCode: skuInfo.purchaseUnitCode,
                purchaseUnitName: skuInfo.purchaseUnitName,
                skuCode: skuInfo.skuCode,
                skuModel: skuInfo.skuModel,
                skuName: skuInfo.skuName,
                skuNums: 0,
                skuStandards: skuInfo.skuStandards,
                skuTempCode: skuInfo.skuTempCode
            }
            commit(types.PURCHASEORDER_ADD_POSKUDETAILINFO_LIST, {
                poSkuDetailInfo
            })
        }
    })
}

export const removePoSkuDetailList = ({ commit }, index) => {
    commit(types.PURCHASEORDER_REMOVE_POSKUDETAILINFO_LIST, {
        index
    })
}

export const commitPoSkuDetailList = ({ dispatch, commit, state }) => {
    let poSkuDetailInfoList = state.addPoSkuDetailInfoList
    commit(types.PURCHASEORDER_COMMIT_POSKUDETAILINFO_LIST, {
        poSkuDetailInfoList
    })
}

export const editPoSkuDetailInfoList = ({ dispatch, commit, state }, params) => {
    let index = params.index
    commit(types.PURCHASEORDER_REMOVE_POSKUDETAILINFO, {
        index
    })
    let poSkuDetailInfo = state.selectPoSkuDetailInfoList[index]
    api.supplyChain
        .purchaseOrder
        .editPoSkuDetailInfo([poSkuDetailInfo], (res) => {
            if (res.data.code === 'success') {
                dispatch('getPoSkuDetailInfoList', {
                    orderNo: state.purchaseOrderInfo.orderNo,
                    pageNums: config.maxPageNums,
                    pageStart: 1
                })
                params.callback()
            }
        })
}

export const cancelPoSkuDetailList = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .purchaseOrder
        .cancelPoSkuDetailInfo(params.poSkuDetailList, (res) => {
            if (res.data.code === 'success') {
                dispatch('getPoSkuDetailInfoList', {
                    orderNo: state.purchaseOrderInfo.orderNo,
                    pageNums: config.maxPageNums,
                    pageStart: 1
                })
                params.callback()
            }
        })
}

export const removeSelectPoSkuDetailList = ({ commit }, params) => {
    let index = params.index
    commit(types.PURCHASEORDER_REMOVE_SELECT_POSKUDETAILINFO_LIST, {
        index
    })
    params.callback()
}

export const getOrderNo = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.supplyChain.purchaseOrder.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let orderNo = res.data.obj
                commit(types.PURCHASEORDER_SET_PURCHASEORDER_CODE, {
                    orderNo
                })
                params.callback(orderNo)
            }
        })
}

export const getPurchaseTypes = ({ commit }) => {
    let params = { 'refCode': config.supplyChain.purchaseOrder.purchaseType.refCode }
    api.ref
        .getDataDictionary(params)
        .then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let arr = res.data.obj.referenceDetailInfos
                if (arr != null) {
                    arr.forEach((item) => {
                        options.push({
                            value: item.refDetailCode,
                            text: item.refDetailName
                        })
                    })
                    commit(types.PURCHASEORDER_GET_PURCHASE_TYPES, {
                        options
                    })
                }
            }
        })
}

export const getDeliveryTypes = ({ commit }) => {
    let params = { 'refCode': config.supplyChain.purchaseOrder.deliveryType.refCode }
    api.ref
        .getDataDictionary(params)
        .then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let arr = res.data.obj.referenceDetailInfos
                if (arr != null) {
                    arr.forEach((item) => {
                        options.push({
                            value: item.refDetailCode,
                            text: item.refDetailName
                        })
                    })
                    commit(types.PURCHASEORDER_GET_DELIVERY_TYPES, {
                        options
                    })
                }
            }
        })
}

export const getRates = ({ commit }) => {
    let params = { 'refCode': config.rate.refCode }
    api.ref
        .getDataDictionary(params)
        .then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let arr = res.data.obj.referenceDetailInfos
                if (arr != null) {
                    arr.forEach((item) => {
                        options.push({
                            value: parseFloat(item.refDetailValue).toFixed(2),
                            text: (parseFloat(item.refDetailName) * 100).toFixed(2)
                        })
                    })
                    commit(types.PURCHASEORDER_GET_RATES, {
                        options
                    })
                }
            }
        })
}    

export const queryPurchaseOrderInfo = ({ commit }, params) => {
    api.supplyChain
        .purchaseOrder
        .queryPurchaseOrderInfo(params, (res) => {
            if (res.data.code == "success") {
                let list = res.data.obj.list
                let pager = {
                    pageNo: res.data.obj.pageNum,
                    pageSize: res.data.obj.pageSize,
                    total: res.data.obj.total,
                    totalPages: res.data.obj.pages
                }
                commit(types.PURCHASEORDER_SET_PURCHASEORDER_PAGER, {
                    pager
                })
                commit(types.PURCHASEORDER_GET_PURCHASEORDER_INFO_LIST, {
                    list
                })
            }
        })
}

export const insertPurchaseOrderInfo = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .purchaseOrder
        .insertPurchaseOrderInfo(params.purchaseOrder, (res) => {
            if (res.data.code === 'success') {
                dispatch('editPoSkuDetailInfo', params)
            }
        })
}

export const submitPurchaseOrderInfo = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .purchaseOrder
        .submitPurchaseOrderInfo(params.purchaseOrderInfo, (res) => {
            if (res.data.code === 'success') {
                params.callback()
                dispatch('resetPurchaseOrderInfo')
            }
        })
}

export const updatePurchaseOrderInfo = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .purchaseOrder
        .updatePurchaseOrderInfo(params.purchaseOrder, (res) => {
            if (res.data.code === 'success') {
                dispatch('editPoSkuDetailInfo', params)
            }
        })
}

export const getPurchaseOrderInfoByCode = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .purchaseOrder
        .getPurchaseOrderInfoByCode(params, (res) => {
            if (res.data.code === 'success') {
                let purchaseOrderInfo = res.data.obj
                commit(types.PURCHASEORDER_SET_PURCHASEORDER_INFO, {
                    purchaseOrderInfo
                })
                dispatch('getPoSkuDetailInfoList', {
                    orderNo: purchaseOrderInfo.orderNo,
                    pageNums: config.maxPageNums,
                    pageStart: 1
                })
            }
        })
}

export const cancelPurchaseOrderInfo = ({ commit }, params) => {
    api.supplyChain
        .purchaseOrder
        .cancelPurchaseOrderInfo(params.purchaseOrderInfo, (res) => {
            if (res.data.code == 'success') {
                params.callback()
            }
        })
}

export const deletePurchaseOrderInfo = ({ dispatch, commit, state }, params) => {
    let index = params.index
    commit(types.PURCHASEORDER_REMOVE_PURCHASEORDER_INFO, {
        index
    })
    let purchaseOrderInfo = state.purchaseOrderInfoList[index]
    api.supplyChain
        .purchaseOrder
        .updatePurchaseOrderInfo(purchaseOrderInfo, (res) => {
            if (res.data.code === 'success') {
                params.callback()
            }
        })
}

export const resetPurchaseOrderInfo = ({ commit }) => {
    let purchaseOrderInfo = {}
    let list = []
    let suppliers = []
    let stores = []
    let wareHouses = []
    let pager = {
        pageNo: 0,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
    commit(types.PURCHASEORDER_SET_PURCHASEORDER_INFO, {
        purchaseOrderInfo
    })
    commit(types.PURCHASEORDER_SET_WAREHOUSES, {
        wareHouses
    })
    commit(types.PURCHASEORDER_SET_SUPPLIERS, {
        suppliers
    })
    commit(types.PURCHASEORDER_SET_STORES, {
        stores
    })
    commit(types.PURCHASEORDER_SET_SELECT_POSKUDETAILINFO_LIST, {
        list
    })
    commit(types.PURCHASEORDER_SET_WAREHOUSES_PAGER, {
        pager
    })
    commit(types.PURCHASEORDER_SET_SUPPLIERS_PAGER, {
        pager
    })
    commit(types.PURCHASEORDER_SET_STORES_PAGER, {
        pager
    })
}

export const getPoSkuDetailInfoList = ({ commit }, params) => {
    api.supplyChain
        .purchaseOrder
        .queryPoSkuDetailInfo(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    commit(types.PURCHASEORDER_SET_SELECT_POSKUDETAILINFO_LIST, {
                        list
                    })
                }
            }
        })
}

export const editPoSkuDetailInfo = ({ dispatch, commit, state }, params) => {
    if (params.poSkuDetailInfoList != null && params.poSkuDetailInfoList.length > 0) {
        api.supplyChain
            .purchaseOrder
            .editPoSkuDetailInfo(params.poSkuDetailInfoList, (res) => {
                if (res.data.code === 'success') {
                    params.callback()
                    dispatch('queryPurchaseOrderInfo', {
                        orderType: '1',
                        orderNo: '',
                        commonCarrierName: '',
                        externalCode: '',
                        supplierCode: '',
                        whCode: '',
                        pageNums: config.pageNums,
                        pageStart: 1
                    })
                }
            })
    } else {
        params.callback()
        dispatch('queryPurchaseOrderInfo', {
            orderType: '1',
            orderNo: '',
            commonCarrierName: '',
            externalCode: '',
            supplierCode: '',
            whCode: '',
            pageNums: config.pageNums,
            pageStart: 1
        })
    }
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
                    commit(types.PURCHASEORDER_ATTACH_WAREHOUSES, {
                        wareHouses
                    })
                    commit(types.PURCHASEORDER_SET_WAREHOUSES_PAGER, {
                        pager
                    })
                }
            }
        })
}

export const resetWareHouses = ({ commit }) => {
    let wareHouses = []
    let pager = {
        pageNo: 0,
        pageSize: config.pageNums,
        total: 0,
        totalPages: 0
    }
    commit(types.PURCHASEORDER_SET_WAREHOUSES, {
        wareHouses
    })
    commit(types.PURCHASEORDER_SET_WAREHOUSES_PAGER, {
        pager
    })
}

export const getSuppliers = ({ commit }, params) => {
    api.supplyChain
        .supplier
        .querySupplierInfo(params, (res) => {
            if (res.data.code === 'success') {
                let suppliers = res.data.obj.list
                if (suppliers != null && suppliers.length > 0) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.PURCHASEORDER_ATTACH_SUPPLIERS, {
                        suppliers
                    })
                    commit(types.PURCHASEORDER_SET_SUPPLIERS_PAGER, {
                        pager
                    })
                }
            }
        })
}

export const resetSuppliers = ({ commit }) => {
    let suppliers = []
    let pager = {
        pageNo: 0,
        pageSize: config.pageNums,
        total: 0,
        totalPages: 0
    }
    commit(types.PURCHASEORDER_SET_SUPPLIERS, {
        suppliers
    })
    commit(types.PURCHASEORDER_SET_SUPPLIERS_PAGER, {
        pager
    })
}

export const getSalesAreaInfoByUser = ({ commit, state }, params) => {
    if (state.areaCode === '') {
        api.getUserAvailableInfo((res) => {
                if (res.data.code === 'success') {
                    let areaCode = ''
                    let storeCode = ''
                    if (res.data.obj.storeInfoVo != null) {
                        areaCode = res.data.obj.storeInfoVo.salesCode
                    }
                    if (res.data.obj.storeInfoVo != null) {
                        storeCode = res.data.obj.storeInfoVo.storeCode
                    }
                    let availableType = res.data.obj.availableType
                    commit(types.PURCHASEORDER_SET_AREA_CODE, {
                        areaCode
                    })
                    commit(types.PURCHASEORDER_SET_STORE_CODE, {
                        storeCode
                    })
                    commit(types.PURCHASEORDER_SET_AVAILABLE_TYPE, {
                        availableType
                    })
                    params.callback(areaCode, storeCode)
                }
            })
    } else {
        params.callback(state.areaCode, state.storeCode)
    }
}

export const getStores = ({ dispatch, commit, state }, params) => {
    dispatch('getSalesAreaInfoByUser', {
        callback: (areaCode, storeCode) => {
            params.salesCode = areaCode
            params.storeCode = storeCode
            api.store
                .queryMainInfo(params, (res) => {
                    if (res.data.code === 'success') {
                        let stores = res.data.obj.list
                        if (stores != null && stores.length > 0) {
                            let pager = {
                                pageNo: res.data.obj.pageNum,
                                pageSize: res.data.obj.pageSize,
                                total: res.data.obj.total,
                                totalPages: res.data.obj.pages
                            }
                            commit(types.PURCHASEORDER_ATTACH_STORES, {
                                stores
                            })
                            commit(types.PURCHASEORDER_SET_STORES_PAGER, {
                                pager
                            })
                        }
                    }
                })
        }
    })

}

export const resetStores = ({ commit }) => {
    let stores = []
    let pager = {
        pageNo: 0,
        pageSize: config.pageNums,
        total: 0,
        totalPages: 0
    }
    commit(types.PURCHASEORDER_SET_STORES, {
        stores
    })
    commit(types.PURCHASEORDER_SET_STORES_PAGER, {
        pager
    })
}