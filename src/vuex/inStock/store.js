import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    purchaseTypes: [],
    stores: [],
    rates: [],
    suppliers: [],
    wareHouses: [],
    selectPoSkuDetailInfoList: [],
    purchaseOrderInfoList: [],
    purchaseOrderInfo: {},
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
    wareHousesPager: {
        pageNo: 0,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
    suppliersPager: {
        pageNo: 0,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
    storesPager: {
        pageNo: 0,
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
