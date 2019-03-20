import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const getChannelTypes = ({ commit }) => {
    let params = { 'refCode': config.product.channelType.refCode }
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
                    commit(types.SKUPRICE_GET_CHANNEL_TYPES, {
                        options
                    })
                }
            }
        })
}

export const getChinaAreaInfoByAreaCode = ({ commit }, params) => {
    let newParams = {
        'areaCode': params.areaCode
    }
    api.getChinaAreaInfoByAreaCode(newParams)
        .then((res) => {
            if (res.data.code === 'success') {

            }
        })
}

export const getSkuBrands = ({ commit }, params) => {
    api.product.commodityBrand.queryCommodityBrand(params, (res) => {
        if (res.data.message == 'success') {
            let list = res.data.obj.list
            let pager = {
                pageNo: res.data.obj.pageNum,
                pageSize: res.data.obj.pageSize,
                total: res.data.obj.total,
                totalPages: res.data.obj.pages
            }
            commit(types.SKUPRICE_ATTACH_BRANDS, {
                list
            })
            commit(types.SKUPRICE_SET_SKUBRAND_PAGER, {
                pager
            })
        }
    })
}

export const resetSkuBrands = ({ commit }, params) => {
    let list = []
    let pager = {
        pageNo: 0,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
    commit(types.SKUPRICE_GET_BRANDS, {
        list
    })
    commit(types.SKUPRICE_SET_SKUBRAND_PAGER, {
        pager
    })
}

export const getSkuPriceList = ({ commit }, params) => {
    api.product
        .skuPrice
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
                    commit(types.SKUPRICE_SET_PAGER, {
                        pager
                    })
                    commit(types.SKUPRICE_GET_SKUPRICE_LIST, {
                        list
                    })
                }
            }
        })
}

export const showSelectModal = ({ commit }) => {
    commit(types.SKUPRICE_SHOW_SELECT_MODAL)
}

export const hideSelectModal = ({ commit, state }) => {
    let list = []
    let pager = {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
    commit(types.SKUPRICE_HIDE_SELECT_MODAL)
    commit(types.SKUPRICE_SET_ADD_SKUPRICE_LIST, {
        list
    })
    commit(types.SKUPRICE_GET_SKUINFO_LIST, {
        list
    })
    commit(types.SKUPRICE_SET_SKUINFO_PAGER, {
        pager
    })
}

export const getSkuPriceCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.product.skuPrice.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let priceCode = res.data.obj
                params.callback(priceCode)
            }
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
                    commit(types.SKUPRICE_SET_SKUINFO_PAGER, {
                        pager
                    })
                    commit(types.SKUPRICE_GET_SKUINFO_LIST, {
                        list
                    })
                }
            }
        })
}

export const getSkuInfo = ({ commit }, params) => {
    api.product
        .skuPrice
        .querySkuInfo(params.skuInfo, (res) => {
            if (res.data.code === 'success') {
                let skuPriceInfo = params.skuPriceInfo
                let skuInfo = res.data.obj.list[0]
                skuPriceInfo.skuCode = skuInfo.skuCode
                skuPriceInfo.skuName = skuInfo.skuName
                let skuPriceInfoList = [skuPriceInfo]
                if (skuPriceInfoList != null) {
                    commit(types.SKUPRICE_ADD_SELECT_SKUPRICE_LIST, {
                        skuPriceInfoList
                    })
                }
            }
        })
}

export const setSkuPriceInfo = ({ commit }, params) => {
    let skuPriceInfo = params.skuPriceInfo
    commit(types.SKUPRICE_SET_SKUPRICE_INFO, {
        skuPriceInfo
    })
}

export const getSkuPriceInfoByCode = ({ dispatch, commit, state }, params) => {
    api.product
        .skuPrice
        .getSkuPriceInfo({ priceCode: params.priceCode }, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                if (list != null) {
                    let skuPriceInfo = list[0]
                    params.callback(skuPriceInfo)
                    dispatch('getSkuInfo', {
                        skuInfo: {
                            skuCode: skuPriceInfo.skuCode,
                            pageNums: config.pageNums,
                            pageStart: 1
                        },
                        skuPriceInfo: skuPriceInfo
                    })
                }
            }
        })
}

export const addSkuPriceList = ({ dispatch, commit, state }, skuInfo) => {
    dispatch('getSkuPriceCode', {
        callback: function(priceCode) {
            let skuPriceInfo = {
                index: skuInfo.index,
                priceCode: priceCode,
                skuCode: skuInfo.skuCode,
                skuName: skuInfo.skuName,
                originalCode:skuInfo.originalCode,
                startTime: state.skuPriceInfo.startTime,
                endTime: state.skuPriceInfo.endTime,
                onOffFlag: 1,
                chinaAreaCode: state.skuPriceInfo.chinaAreaCode,
                salesAreaCode: state.skuPriceInfo.salesAreaCode,
                storeCode: state.skuPriceInfo.storeCode,
                channelType: state.skuPriceInfo.channelType
            }
            commit(types.SKUPRICE_ADD_SKUPRICE_LIST, {
                skuPriceInfo
            })
        }
    })
}

export const removeSkuPriceList = ({ commit }, index) => {
    commit(types.SKUPRICE_REMOVE_SKUPRICE_LIST, {
        index
    })
}

export const commitSkuPriceList = ({ commit, state }) => {
    let skuPriceInfoList = state.addSkuPriceInfoList
    commit(types.SKUPRICE_ADD_SELECT_SKUPRICE_LIST, {
        skuPriceInfoList
    })
}

export const removeSelectedSkuPriceList = ({ commit }, params) => {
    let index = params.index
    commit(types.SKUPRICE_REMOVE_SELECT_SKUPRICE_LIST, {
        index
    })
    params.callback()
}

export const resetSkuPriceList = ({ commit }) => {
    commit(types.SKUPRICE_RESET_SELECT_SKUPRICE_LIST)
}

export const editSkuPriceInfo = ({ dispatch, commit, state }, params) => {
    let skuPriceInfoList = params.skuPriceInfoList
    api.product
        .skuPrice
        .editSkuPriceInfoVos(skuPriceInfoList, (res) => {
            if (res.data.code === 'success') {
                dispatch('getUserInfo', {
                    callback: (userInfo) => {
                        let salseAreaCodes = []
                        let storeCodes = []
                        // 这里有问题
                        if (userInfo.availableType != '2' && userInfo.storeInfoVo != null) {
                            salseAreaCodes.push(userInfo.storeInfoVo.salesCode)
                            storeCodes = userInfo.availableStoreCodes // .push(userInfo.storeInfoVo.storeCode)
                        }
                        dispatch('getSkuPriceList', {
                            priceCode: '',
                            skuCode: '',
                            salseAreaCodes: [],
                            storeCodes: storeCodes,
                            channelType: '',
                            pageNums: config.pageNums,
                            pageStart: 1
                        })
                    }
                })
                params.callback()
            }
        })
}

export const updateSkuPriceInfoFlag = ({ dispatch, commit, state }, params) => {
    let index = params.index
    let skuPriceInfo = {
        ...state.skuPriceInfoList[index]
    }
    if (skuPriceInfo.onOffFlag == 0) {
      skuPriceInfo.onOffFlag = 1
    } else {
      skuPriceInfo.onOffFlag = 0  
    }
    api.product
        .skuPrice
        .update(skuPriceInfo, (res) => {
            if (res.data.code === 'success') {
                params.callback()
            }
        })
}

export const getUserInfo = ({ commit }, params) => {
    api.getUserAvailableInfo((res) => {
            let userInfo = res.data.obj
            params.callback(userInfo)
        })
}
