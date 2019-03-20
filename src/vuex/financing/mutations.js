import config from '../../common/config.js'
import * as types from './mutation-types'
const mutations = {
    [types.F_GET_TYPE](state, tp) {              //根据序列获取编码
        if (tp.refCode == config.financing.paymentTypeCode) {               //根据序列获取调研编码
            state.paymentType = tp.type
        } else if (tp.refCode == config.financing.sourceOrderTypeCode) {
            state.sourceOrderType = tp.type
        } else if (tp.refCode == config.financing.InvoiceType) {
            state.invoiceType = tp.type
        } else if (tp.refCode == config.financing.getGPdetail) {
            state.gpDetail = tp.type
        }else if (tp.refCode == config.financing.getSNPdetail) {
            state.gpDetail = tp.type
        } else {
            state.detailSelect = tp.type
        }
    },
    [types.F_GET_CODE](state, tp) {
        if (tp.jugde == config.financing.paymentCode) {
            state.paymentCode = tp.msg
        } else if (tp.jugde == config.financing.getInvoiceCode) {
            state.invoiceCode = tp.msg
        } else if (tp.jugde == config.financing.gpbelonging) {
            state.gpbelongingCode = tp.msg
        } else if (tp.jugde == config.financing.snpbelonging) {
            state.gpbelongingCode = tp.msg
        }
    },
    [types.F_GET_PAYINFO](state, obj) {
        state.orderInfo = obj.obj;
        state.subOrderInfo = obj.subOrderInfo
    },
    [types.F_QUERT_ORDERINFO](state, obj) {
        state.total = obj.total
        if(obj.type == 'payment') {
            state.inList = obj.List;
        } else if (obj.type == 'refund') {
            state.outList = obj.List;
        } else if (obj.type == 'invoice') {
            state.invoList = obj.List;
        }

        state.List = obj.List;
        state.pager = obj.page;
    },

    [types.QUERY_PAYINFO_LIST](state, obj) {
        state.total = obj.total
        if(obj.type == 'payment') {
            state.inList = obj.List;
        } else if (obj.type == 'refund') {
            state.outList = obj.List;
        } else if (obj.type == 'invoice') {
            state.invoList = obj.List;
        }

        state.List = obj.List;
        // console.log(pager.total)
        state.queryPayInfoList = obj.queryPayInfoList;
    },
    [types.GET_ORDER_PRICE_INFO](state, obj){
        state.orderPriceInfo = obj
    }
}
export default mutations