import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    showRegionModal: false,
    queryParams: {},
    obj: {},
    financeCode: '',
    financeDetailCode: '',
    financeDetailCarCode: '',
    financeDetailInterCode: '',
    leaseCode: '',
    financeTypes: [],
    rateTypes: [],
    authorizationOrgs: [],
    useRangeList: [],
    addFinanceProSuccess: false,
    showAdditionalField: false,
    factoryCodes: [],
    brandCodes: [],
    seriesCodes: [],
    modelCodes: [],
    carCodes: [],
    serviceChargeMap: {},
    interSubsidyMap: {},
    financeProDetailInfoList: [],
    financeProDetailInfo: {},
    financeProData: {
        financeCode: '',
        financeName: '',
        orgInfo: '',
        financeType: '',
        rateType: '',
        doType: 1,
        loanType: '',
        effectStarttime: '',
        effectEndtime: ''
    },
    pager: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}