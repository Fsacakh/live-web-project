import api from 'common/api'
import config from '../../common/config'
import * as types from './mutation-types'

//  开票
export const getTicketObj = ({ commit }, params) => {
    api.supplyChain.procurement.ticket.queryInfo(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            obj.pageNo = res.data.obj.pageNum,
            obj.pageSize = res.data.obj.pageSize,
            obj.total = res.data.obj.total,
            obj.totalPages = res.data.obj.pages
            console.log(obj)
            commit(types.SET_TICKET_OBJ, obj)
        }
    })
}

export const getTicketDetail = ({ commit }, params) => {
    api.supplyChain.procurement.ticket.getDetail(params.data).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_TICKET_DETAIL, obj)
            params.callback()
        }
    })
}

// 付款
export const getPayObj = ({ commit }, params) => {
    api.supplyChain.procurement.pay.queryInfo(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_PAY_OBJ, obj)  
        }
    })
}

// 科达付款
export const getKedaPayObj = ({ commit }, params) => {
    api.supplyChain.keda.procurement.pay.queryInfo(params, (res) => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_PAY_OBJ, obj)  
        }
    })
}

// 入库
export const getStorageObj = ({ commit }, params) => {
    api.supplyChain.procurement.storage.queryInfo(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_STORAGE_OBJ, obj)  
        }
    })
}

export const getInvoiceOrderTypes = ({ commit }) => {
    let params = { 'refCode': config.ref.invoiceOrderType }
    api.ref
        .getDataDictionary(params).then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let arr = []
                arr = res.data.obj.referenceDetailInfos
                if (arr != null) {
                    arr.forEach((item, index) => {
                        options.push({
                            text: item.refDetailName,
                            value: item.refDetailCode
                        })
                    })
                }
                commit(types.GET_INVOICE_ORDER_TYPE, {
                    options
                })
            }
        })
}

export const getInternalProPayObj = ({ commit }, params) => {
    api.supplyChain.procurement.pay.queryCarAdjustOutStockPaymentList(params, (res) => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_PAY_OBJ, obj)  
        }
    })
}

export const getInternalProTicketObj = ({ commit }, params) => {
    api.supplyChain.procurement.ticket.queryCarAdjustOutStockInvoiceList(params, (res) => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            obj.pageNo = res.data.obj.pageNum,
            obj.pageSize = res.data.obj.pageSize,
            obj.total = res.data.obj.total,
            obj.totalPages = res.data.obj.pages
            commit(types.SET_TICKET_OBJ, obj)  
        }
    })
}

export const getInternalProStorageObj = ({ commit }, params) => {
    api.supplyChain.procurement.storage.queryCarAdjustInStockInfo(params, (res) => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_STORAGE_OBJ, obj)  
        }
    })
}

