import * as types from './mutation-types'

export default {
    [types.INSTOCK_GET_PURCHASE_TYPES](state, { options }) {
        state.purchaseTypes = options
    },
    [types.INSTOCK_GET_RATES](state, { options }) {
        state.rates = options 
    },
    [types.INSTOCK_ATTACH_WAREHOUSES](state, { wareHouses }) {
        state.wareHouses = state.wareHouses.concat(wareHouses)
    },
    [types.INSTOCK_SET_WAREHOUSES](state, { wareHouses }) {
        state.wareHouses = wareHouses
    },
    [types.INSTOCK_SET_WAREHOUSES_PAGER](state, { pager }) {
        state.wareHousesPager = pager
    },
    [types.INSTOCK_ATTACH_SUPPLIERS](state, { suppliers }) {
        state.suppliers = state.suppliers.concat(suppliers)
    },
    [types.INSTOCK_SET_SUPPLIERS](state, { suppliers }) {
        state.suppliers = suppliers
    },
    [types.INSTOCK_SET_SUPPLIERS_PAGER](state, { pager }) {
        state.suppliersPager = pager
    },
    [types.INSTOCK_ATTACH_STORES](state, { stores }) {
        state.stores = state.stores.concat(stores)
    },
    [types.INSTOCK_SET_STORES](state, { stores }) {
        state.stores = stores
    },
    [types.INSTOCK_SET_STORES_PAGER](state, { pager }) {
        state.storesPager = pager
    },
    [types.INSTOCK_SET_AREA_CODE](state, { areaCode }) {
        state.areaCode = areaCode
    },
    [types.INSTOCK_SET_PURCHASEORDER_INFO](state, { purchaseOrderInfo }) {
        state.purchaseOrderInfo = purchaseOrderInfo
    },
    [types.INSTOCK_GET_PURCHASEORDER_INFO_LIST](state, { list }) {
        state.purchaseOrderInfoList = list
    },
    [types.INSTOCK_SET_PURCHASEORDER_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.INSTOCK_SHOW_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = true
    },
    [types.INSTOCK_HIDE_ADDITIONAL_FIELD](state) {
        state.showAdditionalField = false
    },
    [types.INSTOCK_SET_POSKUDETAILINFO_LIST](state, { list }) {
        state.addPoSkuDetailInfoList = list
    },
    [types.INSTOCK_ADD_POSKUDETAILINFO_LIST](state, { poSkuDetailInfo }) {
        state.addPoSkuDetailInfoList.push(poSkuDetailInfo)
    },
    [types.INSTOCK_REMOVE_POSKUDETAILINFO_LIST](state, { index }) {
        state.addPoSkuDetailInfoList.splice(index, 1)
    },
    [types.INSTOCK_COMMIT_POSKUDETAILINFO_LIST](state, { poSkuDetailInfoList }) {
        state.selectPoSkuDetailInfoList = state.selectPoSkuDetailInfoList.concat(poSkuDetailInfoList)
    },
    [types.INSTOCK_SET_SELECT_POSKUDETAILINFO_LIST](state, { list }) {
        state.selectPoSkuDetailInfoList = list
    }
}