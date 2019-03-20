import * as types from './mutation-types'

export default {
    [types.CALL_IN_VEHICLE_RESOURCE_SET_CAR_ADJUST_IN_STOCK_INFO](state, { carAdjustInStockInfo }) {
        state.carAdjustInStockData = carAdjustInStockInfo
    },
    [types.CALL_IN_VEHICLE_RESOURCE_GET_CAR_ADJUST_IN_STOCK_LIST](state, { list }) {
        state.carAdjustInStockInfoList = list
    },
    [types.CALL_IN_VEHICLE_RESOURCE_SET_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.CALL_IN_VEHICLE_RESOURCE_SHOW_MODAL](state) {
        state.showAddModal = true
    },
    [types.CALL_IN_VEHICLE_RESOURCE_HIDE_MODAL](state) {
        state.showAddModal = false
    },
    [types.CALL_IN_VEHICLE_RESOURCE_GET_SKU_INFO_LIST](state, { list }) {
        state.skuInfoList = list
    },
    [types.CALL_IN_VEHICLE_RESOURCE_SET_SKU_PAGER](state, { pager }) {
        state.skuPager = pager
    },
    [types.CALL_IN_VEHICLE_RESOURCE_SET_CAR_ADJUST_IN_STOCK_DETAIL_INFO_LIST](state, { list }) {
        state.carAdjustInStockDetailInfoList = list 
    },
    [types.CALL_IN_VEHICLE_RESOURCE_SET_ADD_CAR_SHARE_DETAIL_INFO_LIST](state, { list }) {
        state.addCarShareDetailInfoList = list
    },
    [types.CALL_IN_VEHICLE_RESOURCE_ADD_CAR_SHARE_DETAIL_INFO](state, { carShareDetailInfo }) {
        state.addCarShareDetailInfoList.push(carShareDetailInfo)
    },
    [types.CALL_IN_VEHICLE_RESOURCE_REMOVE_CAR_SHARE_DETAIL_INFO](state, { index }) {
        state.addCarShareDetailInfoList.splice(index, 1)
    },
    [types.CALL_IN_VEHICLE_RESOURCE_ADD_CAR_ADJUST_IN_STOCK_INFO_SUCC](state) {
        state.addCarAdjustInStockSucc = true
    },
    [types.CALL_IN_VEHICLE_RESOURCE_RESET_CAR_ADJUST_IN_STOCK_INFO_SUCC](state) {
        state.addCarAdjustInStockSucc = false
    },
    [types.CALL_IN_VEHICLE_RESOURCE_SHOW_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = true
    },
    [types.CALL_IN_VEHICLE_RESOURCE_HIDE_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = false
    },
    [types.CALL_IN_VEHICLE_RESOURCE_COMMIT_CAR_SHARE_DETAIL_INFO_LIST](state, { list }) {
        state.carShareDetailInfoList = state.carShareDetailInfoList.concat(list)
    }
}    