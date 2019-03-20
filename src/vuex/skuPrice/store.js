import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'


const state = {
    channelTypes: [],
    skuPriceInfo: {},
    skuPriceInfoList: [],
    skuInfoList: [],
    addSkuPriceInfoList: [],
    selectSkuPriceInfoList: [],
    showSelectModal: false,
    skuBrands: [],
    pager: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
    skuPager: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
    skuBrandPager: {
        pageNo: 0,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}