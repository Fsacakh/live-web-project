import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    addSkuCombSucc: false,
    showAddition: false,
    skuCombList: [],
    skuCombInfo: {},
    pager: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
    skuCombDetailList: [],
    skuCombPriceList: [],
    skuCombUseRangeList: [],
    showSelectModal: false,
    skuPager: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
    skuInfoList: [],
    addSkuCombDetailList: [],
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}