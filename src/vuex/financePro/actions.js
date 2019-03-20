import api from '../../common/api'
import config from '../../common/config'
import common from '../../common/common'
import * as types from './mutation-types'

export const getQueryParams = ({ commit }, queryParams) => {
    commit(types.SET_QUERYPARAMS, queryParams)
}

export const getObj = ({ commit }, params) => {
    api.financePro.getQueryInfo(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj
            commit(types.GET_OBJ, obj)
        }
    })
}

export const getFinanceCode = ({ commit }) => {
    let params = { 'serviceCode': config.financePro.getFinanceCode }
    api.ordinalInfo
        .getSequence(params, (res) => {
            if (res.data.code === 'success') {
                let financeCode = res.data.obj
                commit(types.FINANCEPRO_GET_FINANCE_CODE, {
                    financeCode
                })
            }
        })
}

export const getFinanceDetailCode = ({ commit }) => {
    let params = { 'serviceCode': config.financePro.getFinanceDetailCode }
    api.ordinalInfo.getSequence(params, (res) => {
            if (res.data.code === 'success') {
                let financeDetailCode = res.data.obj
                commit(types.FINANCEPRO_GET_FINANCE_DETAIL_CODE, {
                    financeDetailCode
                })
            }
        })
}

export const getFinanceDetailCarCode = ({ commit }) => {
    let params = { 'serviceCode': config.financePro.getFinanceDetailCarCode }
    api.ordinalInfo
        .getSequence(params, (res) => {
            if (res.data.code === 'success') {
                let financeDetailCarCode = res.data.obj
                commit(types.FINANCEPRO_GET_FINANCE_DETAIL_CAR_CODE, {
                    financeDetailCarCode
                })
            }
        })
}

export const getFinanceDetailInterCode = ({ commit }) => {
    let params = { 'serviceCode': config.financePro.getFinanceDetailInterCode }
    api.ordinalInfo
        .getSequence(params, (res) => {
            if (res.data.code === 'success') {
                let financeDetailInterCode = res.data.obj
                commit(types.FINANCEPRO_GET_FINANCE_DETAIL_INTER_CODE, {
                    financeDetailInterCode
                })
            }
        })
}

export const getFinanceOrgsLeaseInfo = ({ commit }, params) => {
    api.finance
        .getFinanceOrgsLeaseInfo(params, (res) => {
            if (res.data.code === 'success') {
                let leaseCode = res.data.obj[0].leaseCode
                if (leaseCode != undefined && leaseCode != null) {
                    commit(types.FINANCEPRO_GET_LEASE_CODE, {
                        leaseCode
                    })
                }
            }
        })
}

export const getFinanceTypes = ({ commit }) => {
    let params = { 'refCode': config.financePro.financeType.refCode }
    api.ref
        .getDataDictionary(params)
        .then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let index = 0
                let arr = res.data.obj.referenceDetailInfos
                if (arr != null) {
                    arr.forEach((item) => {
                        switch (item.refDetailFatherCode) {
                            case config.financePro.financeType.refDetailFatherCode:
                                let children = []
                                arr.forEach((arrItem) => {
                                    if (arrItem.refDetailFatherCode == item.refDetailCode) {
                                        children.push({
                                            text: arrItem.refDetailName,
                                            value: arrItem.refDetailCode
                                        })
                                    }
                                })
                                options.push({
                                    value: index,
                                    text: item.refDetailName,
                                    code: item.refDetailCode,
                                    children: children
                                })
                                index++;
                                break;
                        }
                    })
                    commit(types.FINANCEPRO_GET_FINANCE_TYPES, {
                        options
                    })
                }
            }
        })
}

export const getRateTypes = ({ commit }) => {
    let params = { 'refCode': config.financePro.rateType.refCode }
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
                    commit(types.FINANCEPRO_GET_RATE_TYPES, {
                        options
                    })
                }
            }
        })
}

export const getLoanTypes = ({ commit }) => {

}

export const getFinanceOrgsServiceCharge = ({ commit }, params) => {
    api.finance
        .getFinanceOrgsServiceCharge(params, (res) => {
            if (res.data.code === 'success') {
                let obj = res.data.obj
                let serviceCharges = obj[1]
                if (serviceCharges != null && serviceCharges.length > 0) {
                    serviceCharges.forEach((item) => {
                        item.serviceChargeValue = parseFloat(item.serviceChargeValue * 100).toFixed(2)
                    })
                }
                if (obj != null) {
                    commit(types.FINANCEPRO_GET_SERVICE_CHARGES, {
                        obj
                    })
                }
            }
        })
}

export const getFinanceOrgsIntersubsidy = ({ commit }, params) => {
    api.finance
        .getFinanceOrgsIntersubsidy(params, (res) => {
            if (res.data.code === 'success') {
                let obj = res.data.obj
                let interSubsidies = obj[1]
                if (interSubsidies != null && interSubsidies.length > 0) {
                    interSubsidies.forEach((item) => {
                        item.intersubsidyName = parseFloat(item.intersubsidyName * 100).toFixed(2)
                    })
                }
                if (obj != null) {
                    commit(types.FINANCEPRO_GET_INTER_SUBSIDIES, {
                        obj
                    })
                }
            }
        })
}

export const createFinancePro = ({ dispatch, commit, state }, params) => {
    api.financePro
        .editFinanace(params.financePro, (res) => {
            if (res.data.code === 'success') {
                let financePro = res.data.obj
                commit(types.FINANCEPRO_SET_FINANCEPRO, {
                    financePro
                })
                commit(types.FINANCEPRO_ADD_FINANCEPRO_SUCC)
                commit(types.FINANCEPRO_SHOW_ADDITIONAL_FIELD)
                dispatch('queryUseRangeInfoList', {
                    financeCode: financePro.financeCode
                })
            }
        })
}

export const resetFinancePro = ({ commit }) => {
    let financePro = {}
    let list = []
    let pager = {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
    commit(types.FINANCEPRO_SET_FINANCEPRO, {
        financePro
    })
    commit(types.FINANCEPRO_GET_DETAIL_INFO_LIST, {
        list
    })
    commit(types.FINANCEPRO_GET_USE_RANGE_LIST, {
        list
    })
    commit(types.FINANCEPRO_SET_PAGER, {
        pager
    })
    commit(types.FINANCEPRO_RESET_FINANCEPRO_SUCC)
    commit(types.FINANCEPRO_HIDE_ADDITIONAL_FIELD)
}

export const resetFinanceProSucc = ({ commit }) => {
    commit(types.FINANCEPRO_RESET_FINANCEPRO_SUCC)
}

export const getFinancePro = ({ commit }, params) => {
    api.financePro
        .detailFinance(params, (res) => {
            let financePro = res.data.obj
            financePro.orgInfo = financePro.financeOrgCode + ';' + financePro.financeChannel +
                ';' + financePro.leaseFlag + ';' + financePro.interestSubsidyFlag + ';'
            commit(types.FINANCEPRO_SET_FINANCEPRO, {
                financePro
            })
            commit(types.FINANCEPRO_ADD_FINANCEPRO_SUCC)
        })
}

export const getFinanceProInfo = ({ commit }, params) => {
    params.pageStart = 1
    params.pageNums = config.pageNums
    api.financePro
        .queryFinancesInfo(params, (res) => {
            if (res.data.code === 'success') {
                let arr = res.data.obj.list
                if (arr.length > 0) {
                    let financePro = arr[0]
                    financePro.orgInfo = financePro.financeOrgCode + ';' + financePro.financeChannel +
                        ';' + financePro.leaseFlag + ';' + financePro.interestSubsidyFlag + ';'
                    commit(types.FINANCEPRO_SET_FINANCEPRO, {
                        financePro
                    })
                    commit(types.FINANCEPRO_ADD_FINANCEPRO_SUCC)
                    commit(types.FINANCEPRO_SHOW_ADDITIONAL_FIELD)
                }
            }
        })
}

export const getAuthorizationOrgs = ({ commit }) => {
    let empTokenKey = config.empTokenKey
    let params = { 'empToken': common.getCookie(empTokenKey) }
    api.financePro
        .getAuthorizationOrgs(params, (res) => {
            if (res.data.code === 'success') {
                let options = []
                let arr = res.data.obj
                if (arr != null) {
                    arr.forEach((item) => {
                        options.push({
                            value: item.financeOrgCode + ';' + item.financeOrgType + ';' +
                            item.leaseFlag + ';' + item.interestSubsidyFlag + ';',
                            text: item.financeOrgName
                        })
                    })
                    commit(types.FINANCEPRO_GET_AUTHORIZATION_ORGS, {
                        options
                    })
                }
            }
        })
}

export const addOrUpdateUseRangeInfoBatch = ({ dispatch, commit, state }, params) => {
    api.financePro
        .addOrUpdateUseRangeInfoBatch(params, (res) => {
            if (res.data.code === 'success') {
                dispatch('queryUseRangeInfoList', {
                    financeCode: state.financeProData.financeCode
                })
            }
        })
}

export const queryUseRangeInfoList = ({ commit }, params) => {
    api.financePro
        .queryUseRangeInfoList(params, (res) => {
            if (res.data.code === 'success') {
                let list = []
                let arr = res.data.obj || []
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
                commit(types.FINANCEPRO_GET_USE_RANGE_LIST, {
                    list
                })
            }
        })
}

export const getFinanceProDetailInfoList = ({ commit }, params) => {
    api.financePro
        .queryDetailInfoList(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    list.forEach((item) => {
                        if (item.tDetailIntersubsidyInfoList.length == 0) {
                            item.tDetailIntersubsidyInfoList.push({})
                        }
                        if (item.tDetailCarInfoList.length == 0) {
                            item.tDetailCarInfoList.push({})
                        }
                    })
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.FINANCEPRO_SET_PAGER, {
                        pager
                    })
                    commit(types.FINANCEPRO_GET_DETAIL_INFO_LIST, {
                        list
                    })
                }
            }
        })
}

export const getFinanceProDetailInfo = ({ commit }, params) => {
    api.financePro
        .queryDetailInfo({
            financeDetailCode: params.financeDetailCode
        }, (res) => {
            if (res.data.code === 'success') {
                let financeProDetail = res.data.obj
                if ((financeProDetail.tDetailIntersubsidyInfoList === null) || (financeProDetail.tDetailIntersubsidyInfoList.length === 0)) {
                    financeProDetail.tDetailIntersubsidyInfoList = []
                    financeProDetail.tDetailIntersubsidyInfoList.push({
                        detailIntersubsidyCode: '',
                        isPercent: 0,
                        intersubsidyValue: 0,
                        dealerInPercent: 0,
                        dealerIntersubsidyValue: 0
                    })
                }
                params.callback(financeProDetail)
            }
        })
}

export const deleteFinanceProDetail = ({ dispatch, commit, state }, params) => {
    let index = params.index
    commit(types.FINANCEPRO_REMOVE_FINANCEPRO_DETAIL, {
        index
    })
    params.callback()
    let financeProDetail = state.financeProDetailInfoList[index]
    let newParams = [financeProDetail]
    api.financePro
        .addOrUpdateDetailInfoBatch(newParams, (res) => {
            if (res.data.code === 'success') {
                dispatch('getFinanceProDetailInfoList', {
                    financeCode: state.financeProData.financeCode,
                    pageNums: config.pageNums,
                    pageStart: state.pager.pageNo
                })
            }
        })
}

export const addOrUpdateDetailInfoBatch = ({ dispatch, commit, state }, params) => {
    api.financePro
        .addOrUpdateDetailInfoBatch(params.financeProDetails, (res) => {
            if (res.data.code === 'success') {
                params.callback()
            }
        })
}

export const queryCarInfoByCarSearch = ({ dispatch, commit, state }, params) => {
    api.car
        .queryCarInfoByCarSearch(params, (res) => {
            if (res.data.code === 'success') {
                let arr = res.data.obj
                let options = []
                if (arr != null) {
                    switch (params.type) {
                        case config.car.none:
                            arr.forEach((item) => {
                                options.push({
                                    value: item.factoryCode,
                                    text: item.factoryName
                                })
                            })
                            commit(types.FINANCEPRO_GET_CAR_FACTORY_CODES, {
                                options
                            })
                            break;
                        case config.car.factoryRefCode:
                            arr.forEach((item) => {
                                options.push({
                                    value: item.brandCode,
                                    text: item.brandName
                                })
                            })
                            commit(types.FINANCEPRO_GET_CAR_BRAND_CODES, {
                                options
                            })
                            break;
                        case config.car.brandRefCode:
                            arr.forEach((item) => {
                                if (item != null) {
                                    options.push({
                                        value: item.seriesCode,
                                        text: item.seriesName
                                    })
                                }
                            })
                            commit(types.FINANCEPRO_GET_CAR_SERIES_CODES, {
                                options
                            })
                            break;
                        case config.car.seriesRefCode:
                            arr.forEach((item) => {
                                if (item != null) {
                                    options.push({
                                        value: item.modelCode,
                                        text: item.modelName
                                    })
                                }
                            })
                            commit(types.FINANCEPRO_GET_CAR_MODEL_CODES, {
                                options
                            })
                            break;
                        case config.car.modelRefCode:
                            arr.forEach((item) => {
                                if (item != null) {
                                    options.push({
                                        value: item.carCode,
                                        text: item.displayName
                                    })
                                }
                            })
                            commit(types.FINANCEPRO_GET_CAR_CAR_CODES, {
                                options
                            })
                            break;
                    }
                }
            }
        })
}

export const downloadFinanceProTemplateFile = ({ dispatch, commit, state }, params) => {
    api.financePro
       .downLoad({ 'relationCode': config.financePro.templateFileRelationCode }, (res) => {
           if (res.data.code === 'success') {
               let path = res.data.obj[0].fileRelativePath
               window.location.href = common.isDevTemplate() + path
           }
       })
}
