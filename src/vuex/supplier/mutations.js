import * as types from './mutation-types'

export default {

    [types.SUPPLIER_GET_SUPPLIER_INFO_LIST](state, { list }) {
        state.supplierInfoList = list
    },
    [types.SUPPLIER_SET_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.SUPPLIER_GET_SUPPLIER_TYPES](state, { options }) {
        state.supplierTypes = options
    },
    [types.SUPPLIER_REMOVE_SUPPLIER_INFO](state, { index }) {
        state.supplierInfoList[index].isDeleted = '1'
    },
    [types.SUPPLIER_SET_PURCHASING_AREA_NAME](state, { purchasingAreaName }) {
        state.purchasingAreaName = purchasingAreaName   
    }
}