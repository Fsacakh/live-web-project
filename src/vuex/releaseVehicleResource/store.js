import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    carShareInfoData: {},
    addCarShareOrderSucc: false,
    showAdditionalField: false,
    showSelectModal: false,
    showSkuModal: false,
    vehicleResourceList: [],
    skuInfoList: [],
    addCarShareDetailInfoList: [],
    carShareDetailInfoList: [],
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
