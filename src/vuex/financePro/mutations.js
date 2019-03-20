import * as types from './mutation-types'
export default {
    [types.SET_QUERYPARAMS](state, queryParams) {
        state.queryParams = queryParams
    },
    [types.GET_OBJ](state, obj) {
        state.obj = obj
    },
    [types.FINANCEPRO_SET_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.FINANCEPRO_SET_FINANCEPRO](state, { financePro }) {
        state.financeProData = financePro
    },
    [types.FINANCEPRO_ADD_FINANCEPRO_SUCC](state) {
        state.addFinanceProSuccess = true
    },
    [types.FINANCEPRO_RESET_FINANCEPRO_SUCC](state) {
        state.addFinanceProSuccess = false
    },
    [types.FINANCEPRO_SHOW_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = true
    },
    [types.FINANCEPRO_HIDE_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = false
    },
    [types.FINANCEPRO_GET_FINANCE_CODE](state, { financeCode }) {
        state.financeCode = financeCode
    },
    [types.FINANCEPRO_GET_FINANCE_DETAIL_CODE](state, { financeDetailCode }) {
        state.financeDetailCode = financeDetailCode
    },
    [types.FINANCEPRO_GET_FINANCE_DETAIL_CAR_CODE](state, { financeDetailCarCode }) {
        state.financeDetailCarCode = financeDetailCarCode
    },
    [types.FINANCEPRO_GET_FINANCE_DETAIL_INTER_CODE](state, { financeDetailInterCode }) {
        state.financeDetailInterCode = financeDetailInterCode
    },
    [types.FINANCEPRO_GET_LEASE_CODE](state, { leaseCode }) {
        state.leaseCode = leaseCode
    },
    [types.FINANCEPRO_GET_FINANCE_TYPES](state, { options }) {
        state.financeTypes = options
    },
    [types.FINANCEPRO_GET_RATE_TYPES](state, { options }) {
        state.rateTypes = options
    },
    [types.FINANCEPRO_GET_LOAN_TYPES](state, { options }) {
        state.loanTypes = options
    },
    [types.FINANCEPRO_GET_AUTHORIZATION_ORGS](state, { options }) {
        state.authorizationOrgs = options
    },
    [types.FINANCEPRO_GET_USE_RANGE_LIST](state, { list }) {
        state.useRangeList = list
    },
    [types.FINANCEPRO_GET_DETAIL_INFO_LIST](state, { list }) {
        state.financeProDetailInfoList = list
    },
    [types.FINANCEPRO_REMOVE_FINANCEPRO_DETAIL](state, { index }) {
        state.financeProDetailInfoList[index].isDeleted = '1'
    },
    [types.FINANCEPRO_GET_CAR_FACTORY_CODES](state, { options }) {
        state.factoryCodes = options
    },
    [types.FINANCEPRO_GET_CAR_BRAND_CODES](state, { options }) {
        state.brandCodes = options
    },
    [types.FINANCEPRO_GET_CAR_SERIES_CODES](state, { options }) {
        state.seriesCodes = options
    },
    [types.FINANCEPRO_GET_CAR_MODEL_CODES](state, { options }) {
        state.modelCodes = options
    },
    [types.FINANCEPRO_GET_CAR_CAR_CODES](state, { options }) {
        state.carCodes = options
    },
    [types.FINANCEPRO_GET_SERVICE_CHARGES](state, { obj }) {
        state.serviceChargeMap = obj
    },
    [types.FINANCEPRO_GET_INTER_SUBSIDIES](state, { obj }) {
        state.interSubsidyMap = obj
    }

}