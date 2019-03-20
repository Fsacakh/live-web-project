import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const getSkuCombList = ({ commit }, params) => {
    api.product
        .skuComb
        .queryCombinationInfoForPageByVo(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.SKUCOMB_SET_PAGER, {
                        pager
                    })
                    commit(types.SKUCOMB_GET_SKUCOMB_LIST, {
                        list
                    })
                }
            }
        })
}

export const getSkuCombCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.product.skuComb.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let skuCombCode = res.data.obj
                params.callback(skuCombCode)
            }
        })
}

export const getSkuCombDetailCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.product.skuComb.detail.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let skuCombDetailCode = res.data.obj
                params.callback(skuCombDetailCode)
            }
        })
}

export const getSkuCombPriceCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.product.skuComb.price.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let skuCombPriceCode = res.data.obj
                params.callback(skuCombPriceCode)
            }
        })
}

export const getSkuCombUseRangeCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.product.skuComb.useRange.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let skuCombRangeCode = res.data.obj
                params.callback(skuCombRangeCode)
            }
        })
}

export const getSkuCatLogInfoByCatlogCode = ({ commit }, params) => {
    api.product
        .catalog
        .getSkuCatLogInfoByCatlogCode({
            catlogCode: params.catlogCode
        }).then((res) => {
            if (res.data.code === 'success') {
                if (res.data.obj != null) {
                    let arr = []
                    let level = params.level
                    if (level === 0) {
                        arr = [{
                            name: res.data.obj.catlogName,
                            code: res.data.obj.catlogCode
                        }]
                    } else {
                        let items = res.data.obj.skuCatLogSubInfo
                        if (items != null) {
                            items.forEach((item) => {
                                arr.push({
                                    name: item.catlogName,
                                    code: item.catlogCode
                                })
                            })
                        }
                    }
                    params.callback(arr)
                }
            }
        })
}

export const getSkuCategoryInfoBycategoryCode = ({ commit }, params) => {
    api.product
        .classification
        .getSkuCategoryInfoBycategoryCode({
            categoryCode: params.categoryCode
        }).then((res) => {
            if (res.data.code === 'success') {
                if (res.data.obj != null) {
                    let arr = []
                    let level = params.level
                    if (level === 0) {
                        arr = [{
                            name: res.data.obj.categoryName,
                            code: res.data.obj.categoryCode
                        }]
                    } else {
                        let items = res.data.obj.skuCategorySubInfo
                        if (items != null) {
                            items.forEach((item) => {
                                arr.push({
                                    name: item.categoryName,
                                    code: item.categoryCode
                                })
                            })
                        }
                    }
                    params.callback(arr)
                }
            }
        })
}

export const editCombinationInfos = ({ dispatch, commit, state }, params) => {
    let skuComb = params.skuComb
    let skuCombs = [skuComb]
    api.product
        .skuComb
        .editCombinationInfos(skuCombs, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                if (list != null && list.length > 0) {
                    let skuCombInfo = list[0]
                    commit(types.SKUCOMB_SET_SKUCOMB_INFO, {
                        skuCombInfo
                    })
                }
                commit(types.SKUCOMB_SET_ADD_SKUCOMB_SUCC)
                commit(types.SKUCOMB_SHOW_ADDITION)
            }
        })
}

export const getCombinationInfo = ({ commit }, params) => {
    api.product
        .skuComb
        .queryCombinationInfoForPageByVo(params, (res) => {
            let list = res.data.obj.list
            if (list != null && list.length > 0) {
                let skuCombInfo = list[0]
                commit(types.SKUCOMB_SET_SKUCOMB_INFO, {
                    skuCombInfo
                })
                commit(types.SKUCOMB_SET_ADD_SKUCOMB_SUCC)
                commit(types.SKUCOMB_SHOW_ADDITION)
            }
        })
}

export const addCombinationDetailList = ({ dispatch, commit, state }, skuInfo) => {
    dispatch('getSkuCombDetailCode', {
        callback: (skuCombDetailCode) => {
            let skuCombDetailInfo = {
                index: skuInfo.index,
                combinationCode: state.skuCombInfo.combinationCode,
                combinationDetailCode: skuCombDetailCode,
                detailCode: skuInfo.skuCode,
                detailName: skuInfo.skuName,
                detailType: 0,
                standardCost: skuInfo.standardCost,
                detailNums: 0,
                isDeleted: 0,
                remark: ''
            }
            commit(types.SKUCOMB_ADD_COMBITION_DETAIL_INFO, {
                skuCombDetailInfo
            })
        }
    })
}

export const removeCombinationDetailList = ({ commit }, index) => {
    commit(types.SKUCOMB_REMOVE_ADD_COMBITION_DETAIL_LIST, {
        index
    })
}

export const commitCombinationDetailList = ({ commit, state }) => {
    let list = state.addSkuCombDetailList
    commit(types.SKUCOMB_COMMIT_COMBITION_DETAIL_LIST, {
        list
    })
}

export const removeSkuCombDetailInfo = ({ commit }, params) => {
    let index = params.index
    commit(types.SKUCOMB_REMOVE_COMBITION_DETAIL_LIST, {
        index
    })
}

export const deleteSkuCombDetailInfo = ({ state, commit, dispatch }, params) => {
    let index = params.index
    commit(types.SKUCOMB_DELETE_COMBITION_DETAIL_LIST, {
        index
    })
    let skuCombDetailInfo = state.skuCombDetailList[index]
    let skuCombDetailInfoList = [skuCombDetailInfo]
    api.product
    .skuComb
    .addOrUpdateCombinationDetailInfoBatch(skuCombDetailInfoList, (res) => {
        if (res.data.code === 'success') {
            dispatch('getSkuCombDetailInfoList', {
                combinationCode: state.skuCombInfo.combinationCode
            })
        }
    })
}

export const getSkuCombDetailInfoList = ({ commit }, params) => {
    api.product
        .skuComb
        .getCombinationDetailInfo(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                commit(types.SKUCOMB_SET_COMBITION_DETAIL_LIST, {
                    list
                })
            }
        })
}

export const editSkuCombDetailInfoList = ({ dispatch, commit, state }, params) => {
    api.product
        .skuComb
        .addOrUpdateCombinationDetailInfoBatch(params, (res) => {
            if (res.data.code === 'success') {
                dispatch('getSkuCombDetailInfoList', {
                    combinationCode: state.skuCombInfo.combinationCode
                })
            }
        })
}

export const addCombinationPriceList = ({ dispatch, commit, state }) => {
    dispatch('getSkuCombPriceCode', {
        callback: (skuCombPriceCode) => {
            let skuCombPriceInfo = {
                combinationCode: state.skuCombInfo.combinationCode,
                combinationPrice: 0,
                combinationPriceCode: skuCombPriceCode,
                channelType: '',
                remark: ''
            }
            commit(types.SKUCOMB_ADD_COMBITION_PRICE_LIST, {
                skuCombPriceInfo
            })
        }
    })
}

export const removeSkuCombPriceInfo = ({ commit }, params) => {
    let index = params.index
    commit(types.SKUCOMB_REMOVE_COMBITION_PRICE_LIST, {
        index
    })
}

export const deleteSkuCombPriceInfo = ({ state, commit, dispatch }, params) => {
    let index = params.index
    commit(types.SKUCOMB_DELETE_COMBITION_PRICE_LIST, {
        index
    })
    let skuCombPriceInfo = state.skuCombPriceList[index]
    let skuCombPriceList = [skuCombPriceInfo]
    api.product
    .skuComb
    .addOrUpdateCombinationPriceInfoBatch(skuCombPriceList, (res) => {
        if (res.data.code === 'success') {
            dispatch('getSkuCombPriceInfoList', {
                combinationCode: state.skuCombInfo.combinationCode
            })
        }
    })
}

export const getSkuCombPriceInfoList = ({ commit }, params) => {
    api.product
        .skuComb
        .getCombinationPriceInfo(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                commit(types.SKUCOMB_SET_COMBITION_PRICE_LIST, {
                    list
                })
            }
        })
}

export const editSkuCombPriceInfoList = ({ dispatch, commit, state }, params) => {
    api.product
        .skuComb
        .addOrUpdateCombinationPriceInfoBatch(params, (res) => {
            if (res.data.code === 'success') {
                dispatch('getSkuCombPriceInfoList', {
                    combinationCode: state.skuCombInfo.combinationCode
                })
            }
        })
}

export const getSkuCombUseRangeList = ({ commit }, params) => {
    api.product
        .skuComb
        .getCombinationUseRange(params, (res) => {
            if (res.data.code === 'success') {
                let list = []
                let arr = res.data.obj
                arr.forEach((item) => {
                    list.push({
                        nationwide: "",
                        sales: item.salesAreaName,
                        shop: item.storeName || '全部',
                        id: item.id,
                        salesAreaCode: item.salesAreaCode,
                        storeCode: item.storeCode,
                        financeCode: item.financeCode,
                        rangeCode: item.rangeCode
                    })
                })
                commit(types.SKUCOMB_SET_COMBITION_USE_RANGE_LIST, {
                    list
                })
            }
        })
}

export const editSkuCombUseRangeList = ({ dispatch, commit, state }, params) => {
    api.product
        .skuComb
        .addOrUpdateCombinationUseRangeBatch(params, (res) => {
            if (res.data.code === 'success') {
                dispatch('getSkuCombUseRangeList', {
                    combinationCode: state.skuCombInfo.combinationCode
                })
            }
        })
}

export const showSelectModal = ({ commit }) => {
    commit(types.SKUCOMB_SHOW_SELECT_MODAL)
}

export const hideSelectModal = ({ commit }) => {
    let list = []
    let pager = {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
    commit(types.SKUCOMB_HIDE_SELECT_MODAL)
    commit(types.SKUCOMB_SET_ADD_COMBITION_DETAIL_LIST, {
        list
    })
    commit(types.SKUCOMB_GET_SKUINFO_LIST, {
        list
    })
    commit(types.SKUCOMB_SET_SKUINFO_PAGER, {
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
                    commit(types.SKUCOMB_SET_SKUINFO_PAGER, {
                        pager
                    })
                    commit(types.SKUCOMB_GET_SKUINFO_LIST, {
                        list
                    })
                }
            }
        })
}

export const resetAddSkuCombSucc = ({ commit }) => {
    commit(types.SKUCOMB_RESET_ADD_SKUCOMB_SUCC)
}
export const cancelResetAddSkuCombSucc = ({ commit }) => {
    commit(types.SKUCOMB_RESET_ADD_SKUCOMB_FAIL)
}
export const resetSkuCombInfo = ({ commit }, params) => {
    let list = []
    let skuCombInfo = {}
    commit(types.SKUCOMB_SET_SKUCOMB_INFO, {
        skuCombInfo
    })
    commit(types.SKUCOMB_SET_COMBITION_DETAIL_LIST, {
        list
    })
    commit(types.SKUCOMB_SET_COMBITION_PRICE_LIST, {
        list
    })
    commit(types.SKUCOMB_SET_COMBITION_USE_RANGE_LIST, {
        list
    })
    commit(types.SKUCOMB_RESET_ADD_SKUCOMB_SUCC)
    commit(types.SKUCOMB_HIDE_ADDITION)
}

export const updateSkuCombInfoFlag = ({ dispatch, commit, state }, params) => {
    let index = params.index
    commit(types.SKUCOMB_SET_SKUPRICE_FLAG, {
        index
    })
    api.product
        .skuComb
        .editCombinationInfos([state.skuCombList[index]], (res) => {
            if (res.data.code === 'success') {
                params.callback()
            }
        })

}