import * as types from './mutation-types'

export default {
    [types.SHARE_VEHICLE_RESOURCE_GET_RESOURCE_LIST](state, { list }) {
        state.vehicleResourceList = list
    },
    [types.SHARE_VEHICLE_RESOURCE_SHOW_SKU_MODAL](state) {
        state.showSkuModal = true
    },
    [types.SHARE_VEHICLE_RESOURCE_HIDE_SKU_MODAL](state) {
        state.showSkuModal = false
    },
    [types.SHARE_VEHICLE_RESOURCE_SET_PAGER](state, { pager }) {
        state.pager = pager
    }
}    