import * as types from './mutation-types'

export default {
    [types.SET_ORDER_OBJ](state, orderObj) {
        state.orderObj = orderObj
    },
    [types.SET_ORDER_DETAIL_OBJ](state, orderDetailObj) {
        state.orderDetailObj = orderDetailObj
    },
    [types.ORDER_SHOW_MODAL](state) {
        state.showSelectModal = true
    },
    [types.ORDER_HIDE_MODAL](state) {
        state.showSelectModal = false
    },
    [types.ORDER_GET_SKU_INFO_LIST](state, { list }) {
        state.skuInfoList = list
    },
    [types.ORDER_SET_SKU_PAGER](state, { pager }) {
        state.skuPager = pager
    },
    [types.ORDER_ADD_CAR_INFO](state, { carInfo }) {
        state.selectedCarInfoList.push(carInfo)
    },
    [types.ORDER_REMOVE_CAR_INFO](state, { index }) {
        state.selectedCarInfoList.splice(index, 1)
    },
    [types.ORDER_DELETE_CAR_INFO_LIST](state) {
        state.selectedCarInfoList = []
    },
    [types.QUERT_PARAMS](state) {
        state.selectedCarInfoList = {}
    }
}
