import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

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
                    commit(types.INSTOCK_GET_PURCHASE_TYPES, {
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
                    commit(types.INSTOCK_GET_RATES, {
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
                commit(types.INSTOCK_SET_PURCHASEORDER_PAGER, {
                    pager
                })
                commit(types.INSTOCK_GET_PURCHASEORDER_INFO_LIST, {
                    list
                })
            }
        })
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
                    commit(types.INSTOCK_ATTACH_WAREHOUSES, {
                        wareHouses
                    })
                    commit(types.INSTOCK_SET_WAREHOUSES_PAGER, {
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
    commit(types.INSTOCK_SET_WAREHOUSES, {
        wareHouses
    })
    commit(types.INSTOCK_SET_WAREHOUSES_PAGER, {
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
                    commit(types.INSTOCK_ATTACH_SUPPLIERS, {
                        suppliers
                    })
                    commit(types.INSTOCK_SET_SUPPLIERS_PAGER, {
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
    commit(types.INSTOCK_SET_SUPPLIERS, {
        suppliers
    })
    commit(types.INSTOCK_SET_SUPPLIERS_PAGER, {
        pager
    })
}

export const getSalesAreaInfoByUser = ({ commit, state }, params) => {
    if (state.areaCode === '') {
        api.sale
            .getSalesAreaInfoByUserAvailableOnlyOneLevel({}, (res) => {
                if (res.data.code === 'success') {
                    let areaCode = res.data.obj[0].areaCode
                    commit(types.INSTOCK_SET_AREA_CODE, {
                        areaCode
                    })
                    params.callback(areaCode)
                }
            })
    } else {
        params.callback(state.areaCode)
    }
}

export const getStores = ({ dispatch, commit, state }, params) => {
    dispatch('getSalesAreaInfoByUser', {
        callback: (areaCode) => {
            params.salesCode = areaCode
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
                            commit(types.INSTOCK_ATTACH_STORES, {
                                stores
                            })
                            commit(types.INSTOCK_SET_STORES_PAGER, {
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
    commit(types.INSTOCK_SET_STORES, {
        stores
    })
    commit(types.INSTOCK_SET_STORES_PAGER, {
        pager
    })
}

export const getPurchaseOrderInfoByCode = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .purchaseOrder
        .getPurchaseOrderInfoByCode(params, (res) => {
            if (res.data.code === 'success') {
                let purchaseOrderInfo = res.data.obj
                commit(types.INSTOCK_SET_PURCHASEORDER_INFO, {
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

export const getPoSkuDetailInfoList = ({ commit }, params) => {
    api.supplyChain
        .purchaseOrder
        .queryPoSkuDetailInfo(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null && list.length > 0) {
                    commit(types.INSTOCK_SET_SELECT_POSKUDETAILINFO_LIST, {
                        list
                    })
                }
            }
        })
}

export const inStockList = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .stockInfo
        .inStockList(params.inSkuStockList, (res) => {
            if (res.data.code === 'success') {
                dispatch('queryPurchaseOrderInfo', {
                    orderType: config.supplyChain.purchaseOrder.normalOrderType,
                    orderNo: '',
                    commonCarrierName: '',
                    externalCode: '',
                    supplierCode: '',
                    whCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                })
                params.callback()
            }
        })
}
