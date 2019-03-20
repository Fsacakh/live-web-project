import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
const state = {
    orderPriceInfo:{
        carPriceInfo: {
            infoList: []
        },
        financialPriceInfo:{
            infoList: []
        },
        insurancePriceInfo:{
            infoList: []
        },
        ybSkuPriceInfo:{
            infoList: []
        },
        skuPriceInfo:{
            infoList: []
        },
        serviceFeePriceInfo:{
            infoList: []
        }
    },
    paymentType: [],
    sourceOrderType: [],
    paymentCode: '',
    orderInfo: {},
    subOrderInfo: [],
    invoiceType: [],
    invoiceCode: '',
    gpDetail: [],
    gpbelongingCode: '',
    detailSelect: [],
    List: [],
    inList: [],
    outList: [],
    invoList: [],
    total:'',
    pager: {},
    queryPayInfoList:{}
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}