import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    orderObj: {},
    orderDetailObj: {},
    showSelectModal: false,
    skuInfoList: [],
    selectedCarInfoList: [],
    skuPager: {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
    queryParams:{},
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
