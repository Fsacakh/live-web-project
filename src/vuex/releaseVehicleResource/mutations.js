import * as types from './mutation-types'

export default {
    [types.RELEASE_VEHICLE_RESOURCE_SET_CAR_SHARE_INFO](state, { carShareInfo }) {
        state.carShareInfoData = carShareInfo
    },
    [types.RELEASE_VEHICLE_RESOURCE_GET_RESOURCE_LIST](state, { list }) {
        state.vehicleResourceList = list
    },
    [types.RELEASE_VEHICLE_RESOURCE_SET_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.RELEASE_VEHICLE_RESOURCE_SHOW_MODAL](state) {
        state.showSelectModal = true
    },
    [types.RELEASE_VEHICLE_RESOURCE_HIDE_MODAL](state) {
        state.showSelectModal = false
    },
    [types.RELEASE_VEHICLE_RESOURCE_SHOW_SKU_MODAL](state) {
        state.showSkuModal = true 
    },
    [types.RELEASE_VEHICLE_RESOURCE_HIDE_SKU_MODAL](state) {
        state.showSkuModal = false 
    },
    [types.RELEASE_VEHICLE_RESOURCE_GET_SKU_INFO_LIST](state, { list }) {
        state.skuInfoList = list
    },
    [types.RELEASE_VEHICLE_RESOURCE_SET_SKU_PAGER](state, { pager }) {
        state.skuPager = pager
    },
    [types.RELEASE_VEHICLE_RESOURCE_SET_CAR_SHARE_DETAIL_INFO_LIST](state, { list }) {
        state.carShareDetailInfoList = list 
    },
    [types.RELEASE_VEHICLE_RESOURCE_SET_ADD_CAR_SHARE_DETAIL_INFO_LIST](state, { list }) {
        state.addCarShareDetailInfoList = list
    },
    [types.RELEASE_VEHICLE_RESOURCE_ADD_CAR_SHARE_DETAIL_INFO](state, { carShareDetailInfo }) {
        state.addCarShareDetailInfoList.push(carShareDetailInfo)
    },
    [types.RELEASE_VEHICLE_RESOURCE_REMOVE_CAR_SHARE_DETAIL_INFO](state, { index }) {
        state.addCarShareDetailInfoList.splice(index, 1)
    },
    [types.RELEASE_VEHICLE_RESOURCE_ADD_CAR_SHARE_DETAIL_INFO_SUCC](state) {
        state.addCarShareOrderSucc = true
    },
    [types.RELEASE_VEHICLE_RESOURCE_RESET_CAR_SHARE_DETAIL_INFO_SUCC](state) {
        state.addCarShareOrderSucc = false
    },
    [types.RELEASE_VEHICLE_RESOURCE_SHOW_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = true
    },
    [types.RELEASE_VEHICLE_RESOURCE_HIDE_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = false
    },
    [types.RELEASE_VEHICLE_RESOURCE_COMMIT_CAR_SHARE_DETAIL_INFO_LIST](state, { list }) {
        state.carShareDetailInfoList = state.carShareDetailInfoList.concat(list)
    },
    [types.RELEASE_VEHICLE_RESOURCE_DELETE_CAR_SHARE_DETAIL_INFO](state, { index }) {
        state.carShareDetailInfoList[index].isDeleted = '1'
    }
}    