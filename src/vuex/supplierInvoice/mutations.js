import * as types from './mutation-types'

export default {

    [types.SUPPLIER_INVOICE_GET_INVOICE_TYPES](state, { options }) {
        state.invoiceTypes = options
    },
    [types.SUPPLIER_INVOICE_GET_INVOICE_INFO_LIST](state, { list }) {
        state.supplierInvoiceInfoList = list
    },
    [types.GET_DATA_LIST](state, tp) {
        state.dataList = tp
        console.log(state.dataList)
    }
}