import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const getSupplierInfoList = ({ commit }, params) => {
    api.supplyChain
        .supplier
        .querySupplierInfo(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                let pager = {
                    pageNo: res.data.obj.pageNum,
                    pageSize: res.data.obj.pageSize,
                    total: res.data.obj.total,
                    totalPages: res.data.obj.pages
                }
                commit(types.SUPPLIER_GET_SUPPLIER_INFO_LIST, {
                    list
                })
                commit(types.SUPPLIER_SET_PAGER, {
                    pager
                })
            }
        })
}

export const insertSupplierInfo = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .supplier
        .insertSupplierInfo(params.supplierInfo, (res) => {
            if (res.data.code === 'success') {
                dispatch('getSupplierInfoList', {
                    supplierCode: '',
                    supplierName: '',
                    supplierType: '',
                    purchasingAreaCode: '',
                    dbEncoding: '',
                    dutyParagraph: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                })
                params.callback()
            }
        })
}

export const updateSupplierInfo = ({ dispatch, commit, state }, params) => {
    api.supplyChain
        .supplier
        .updateSupplierInfo(params.supplierInfo, (res) => {
            if (res.data.code === 'success') {
                dispatch('getSupplierInfoList', {
                    supplierCode: '',
                    supplierName: '',
                    supplierType: '',
                    purchasingAreaCode: '',
                    dbEncoding: '',
                    dutyParagraph: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                })
                params.callback()
            }
        })
}

export const removeSupplierInfo = ({ dispatch, commit, state }, params) => {
    let index = params.index
    commit(types.SUPPLIER_REMOVE_SUPPLIER_INFO, {
        index
    })
    let supplierInfo = state.supplierInfoList[index]
    api.supplyChain
        .supplier
        .updateSupplierInfo(supplierInfo, (res) => {
            if (res.data.code === 'success') {
                params.callback()
            }
        })
}

export const getSupplierTypes = ({ commit }) => {
    let params = { 'refCode': config.supplyChain.supplier.supplierType.refCode }
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
                    commit(types.SUPPLIER_GET_SUPPLIER_TYPES, {
                        options
                    })
                }
            }
        })
}

export const getSupplierCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.supplyChain.supplier.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let supplierCode = res.data.obj
                params.callback(supplierCode)
            }
        })
}

export const getSupplierInfoByCode = ({ commit }, params) => {
    api.supplyChain
        .supplier
        .querySupplierInfo({
            supplierCode: params.supplierCode,
            pageNums: config.pageNums,
            pageStart: 1
        }, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    let supplierInfo = list[0]
                    let purchasingAreaName = ''
                    params.callback(supplierInfo)
                    commit(types.SUPPLIER_SET_PURCHASING_AREA_NAME, {
                        purchasingAreaName
                    }) 
                }
            }
        })
}

export const getSalesAreaInfoByAreaCode = ({ commit }, params) => {
    api.purchase
        .getPurchasingAreaInfoByAreaCode({
            areaCode: params.areaCode
        }, (res) => {
            if (res.data.code === 'success') {
                let list = []
                let options = []
                if (params.level === 0) {
                    let obj = res.data.obj
                    if (obj != null) {
                        list = [obj]
                    }
                } else {
                    list = res.data.obj.purchasingAreaSubInfo
                }
                if (list != null) {
                    list.forEach((item) => {
                        options.push({
                            name: item.areaName,
                            code: item.areaCode
                        })
                    })
                }
                params.callback(options)
            }
        })
}

export const getPurchasingAreaInfoByAreaCode = ({ commit }, params) => {
    api.purchase
       .getPurchasingAreaInfoByAreaCode({
           areaCode: params.areaCode
       }, (res) => {
           let purchasingAreaName = ''
           if (res.data.code === 'success') {
               if (res.data.obj != null) {
                   purchasingAreaName = res.data.obj.areaName
               } 
           }
           commit(types.SUPPLIER_SET_PURCHASING_AREA_NAME, {
               purchasingAreaName
           })
       })
}