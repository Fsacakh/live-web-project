import * as types from './mutation-types'

export default {
    // 开票
    [types.SET_TICKET_OBJ](state, ticketObj) {
        state.ticketObj = ticketObj
    },
    [types.SET_TICKET_DETAIL](state, ticketDetail) {
        state.ticketDetail = ticketDetail
    },
    // 付款
    [types.SET_PAY_OBJ](state, payObj) {
        state.payObj = payObj
    },
    [types.SET_DETAIL_PARAMS](state, detailParams) {
        state.detailParams = detailParams
    },
    // 入库
    [types.SET_STORAGE_OBJ](state, storageObj) {
        state.storageObj = storageObj
    },
    [types.SET_STORAGE_PARAMS](state, params) {
        state.storageParams = params
    },
    [types.SET_PAY_PARAMS](state, params) {
        state.payParams = params
    },
    [types.SET_TICKET_PARAMS](state, params) {
        state.ticketParams = params
    },
    [types.GET_INVOICE_ORDER_TYPE](state, { options }) {
        state.invoiceOrderTypes = options
    },
    [types.GET_INVOICERTYPE](state, val) {
        state.isInnerPurchase_ = val
    }
}
