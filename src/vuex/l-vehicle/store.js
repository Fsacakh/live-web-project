import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    isInnerPurchase_: {},
    ticketObj: {},
    ticketDetail: {},
    payObj: {},
    storageObj: {},
    detailParams: {},
    storageParams: {},
    payParams: {},
    ticketParams: {},
    invoiceOrderTypes: []
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
