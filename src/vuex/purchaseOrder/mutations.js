import * as types from './mutation-types'

export default {
    [types.PURCHASEORDER_SET_PURCHASEORDER_CODE](state, { orderNo }) {
        state.purchaseOrderInfo.orderNo = orderNo
    },
    [types.PURCHASEORDER_SHOW_SELECT_MODAL](state) {
        state.showSelectModal = true
    },
    [types.PURCHASEORDER_HIDE_SELECT_MODAL](state) {
        state.showSelectModal = false
    },
    [types.PURCHASEORDER_GET_PURCHASE_TYPES](state, { options }) {
        state.purchaseTypes = options
    },
    [types.PURCHASEORDER_GET_DELIVERY_TYPES](state, { options }) {
        state.deliveryTypes = options
    },
    [types.PURCHASEORDER_GET_RATES](state, { options }) {
        state.rates = options
    },
    [types.PURCHASEORDER_EDIT_PURCHASEORDER_SUCCESS](state) {
        state.addPurchaseOrderSuccess = true
    },
    [types.PURCHASEORDER_RESET_EDIT_PURCHASEORDER_SUCCESS](state) {
        state.addPurchaseOrderSuccess = false
    },
    [types.PURCHASEORDER_ATTACH_WAREHOUSES](state, { wareHouses }) {
        state.wareHouses = state.wareHouses.concat(wareHouses)
    },
    [types.PURCHASEORDER_SET_WAREHOUSES](state, { wareHouses }) {
        state.wareHouses = wareHouses
    },
    [types.PURCHASEORDER_SET_WAREHOUSES_PAGER](state, { pager }) {
        state.wareHousesPager = pager
    },
    [types.PURCHASEORDER_ATTACH_SUPPLIERS](state, { suppliers }) {
        state.suppliers = state.suppliers.concat(suppliers)
    },
    [types.PURCHASEORDER_SET_SUPPLIERS](state, { suppliers }) {
        state.suppliers = suppliers
    },
    [types.PURCHASEORDER_SET_SUPPLIERS_PAGER](state, { pager }) {
        state.suppliersPager = pager
    },
    [types.PURCHASEORDER_ATTACH_STORES](state, { stores }) {
        state.stores = state.stores.concat(stores)
    },
    [types.PURCHASEORDER_SET_STORES](state, { stores }) {
        state.stores = stores
    },
    [types.PURCHASEORDER_SET_STORES_PAGER](state, { pager }) {
        state.storesPager = pager
    },
    [types.PURCHASEORDER_SET_AREA_CODE](state, { areaCode }) {
        state.areaCode = areaCode
    },
    [types.PURCHASEORDER_SET_STORE_CODE](state, { storeCode }) {
        state.storeCode = storeCode
    },
    [types.PURCHASEORDER_SET_AVAILABLE_TYPE](state, { availableType }) {
        state.availableType = availableType
    },
    [types.PURCHASEORDER_SET_PURCHASEORDER_INFO](state, { purchaseOrderInfo }) {
        state.purchaseOrderInfo = purchaseOrderInfo
    },
    [types.PURCHASEORDER_REMOVE_PURCHASEORDER_INFO](state, { index }) {
        state.purchaseOrderInfoList[index].isDeleted = '1'
    },
    [types.PURCHASEORDER_GET_PURCHASEORDER_INFO_LIST](state, { list }) {
        state.purchaseOrderInfoList = list
    },
    [types.PURCHASEORDER_SET_PURCHASEORDER_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.PURCHASEORDER_SHOW_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = true
    },
    [types.PURCHASEORDER_HIDE_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = false
    },
    [types.PURCHASEORDER_REMOVE_POSKUDETAILINFO](state, { index }) {
        state.selectPoSkuDetailInfoList[index].isDeleted = '1'
    },
    [types.PURCHASEORDER_SET_POSKUDETAILINFO_LIST](state, { list }) {
        state.addPoSkuDetailInfoList = list
    },
    [types.PURCHASEORDER_ADD_POSKUDETAILINFO_LIST](state, { poSkuDetailInfo }) {
        state.addPoSkuDetailInfoList.push(poSkuDetailInfo)
    },
    [types.PURCHASEORDER_REMOVE_POSKUDETAILINFO_LIST](state, { index }) {
        state.addPoSkuDetailInfoList.splice(index, 1)
    },
    [types.PURCHASEORDER_COMMIT_POSKUDETAILINFO_LIST](state, { poSkuDetailInfoList }) {
        state.selectPoSkuDetailInfoList = state.selectPoSkuDetailInfoList.concat(poSkuDetailInfoList)
    },
    [types.PURCHASEORDER_SET_SELECT_POSKUDETAILINFO_LIST](state, { list }) {
        state.selectPoSkuDetailInfoList = list
    },
    [types.PURCHASEORDER_REMOVE_SELECT_POSKUDETAILINFO_LIST](state, { index }) {
        state.selectPoSkuDetailInfoList.splice(index, 1)
    },
    [types.PURCHASEORDER_GET_SKUINFO_LIST](state, { list }) {
        state.skuInfoList = list
    },
    [types.PURCHASEORDER_SET_SKUINFO_PAGER](state, { pager }) {
        state.skuPager = pager
    }
}
