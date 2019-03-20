import * as types from './mutation-types'

export default {
    [types.CALL_OUT_VEHICLE_RESOURCE_SET_CAR_ADJUST_OUT_STOCK_INFO](state, { carAdjustOutStockInfo }) {
        state.carAdjustOutStockData = carAdjustOutStockInfo
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_GET_CAR_ADJUST_OUT_STOCK_LIST](state, { list }) {
        state.carAdjustOutStockInfoList = list
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_SET_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_SHOW_MODAL](state) {
        state.showSelectModal = true
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_HIDE_MODAL](state) {
        state.showSelectModal = false
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_GET_SKU_INFO_LIST](state, { list }) {
        state.skuInfoList = list
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_SET_SKU_PAGER](state, { pager }) {
        state.skuPager = pager
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_SET_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_LIST](state, { list }) {
        state.carAdjustOutStockDetailList = list 
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_SET_ADD_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_LIST](state, { list }) {
        state.addCarAdjustOutStockDetailList = list
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_ADD_CAR_ADJUST_OUT_STOCK_DETAIL_INFO](state, { carAdjustOutStockDetailInfo }) {
        state.addCarAdjustOutStockDetailList.push(carAdjustOutStockDetailInfo)
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_REMOVE_CAR_ADJUST_OUT_STOCK_DETAIL_INFO](state, { index }) {
        state.addCarAdjustOutStockDetailList.splice(index, 1)
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_ADD_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_SUCC](state) {
        state.addCarAdjustOutStockInfoSucc = true
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_RESET_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_SUCC](state) {
        state.addCarAdjustOutStockInfoSucc = false
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_SHOW_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = true
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_HIDE_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = false
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_COMMIT_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_LIST](state, { list }) {
        state.carAdjustOutStockDetailList = state.carAdjustOutStockDetailList.concat(list)
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_DELETE_CAR_ADJUST_OUT_STOCK_DETAIL_INFO_LIST](state, { index }) {
        state.carAdjustOutStockDetailList[index].isDeleted = '1'    
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_ATTACH_WAREHOUSES] (state, { wareHouses }) {
        state.wareHouses = state.wareHouses.concat(wareHouses)  
    }, 
    [types.CALL_OUT_VEHICLE_RESOURCE_SET_WAREHOUSES] (state, { wareHouses }) {
        state.wareHouses = wareHouses
    },
    [types.CALL_OUT_VEHICLE_RESOURCE_SET_WAREHOUSES_PAGER] (state, { pager }) {
        state.wareHousesPager = pager
    },
}    