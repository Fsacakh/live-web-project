import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const getInvoiceCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.supplyChain.supplierInvoice.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let invoiceCode = res.data.obj
                params.callback(invoiceCode)
            }
        })
}

export const getInvoiceTypes = ({ commit }) => {
    let params = { 'refCode': config.supplyChain.supplierInvoice.invoiceType.refCode }
    api.ref
        .getDataDictionary(params)
        .then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let arr = res.data.obj.referenceDetailInfos
                if (arr != null) {
                    arr.forEach((item) => {
                        options.push({
                            value: item.refDetailCode,
                            text: item.refDetailName
                        })
                    })
                    commit(types.SUPPLIER_INVOICE_GET_INVOICE_TYPES, {
                        options
                    })
                }
            }
        })
}

export const getSupplierInvoiceList = ({ commit }, params) => {
    api.supplyChain
        .supplierInvoice
        .querySupplierInvoiceInfoWithNoPage(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                if (list != null) {
                    commit(types.SUPPLIER_INVOICE_GET_INVOICE_INFO_LIST, {
                        list
                    })
                } 
            }
        })
}

export const editSupplierInvoice = ({ state, commit, dispatch }, params) => {
    api.supplyChain
        .supplierInvoice
        .batchEditSupplierInvoiceInfo(params.supplierInvoices, (res) => {
            if (res.data.code === 'success') {
                dispatch('getSupplierInvoiceList', {
                    supplierCode: params.supplierInvoices[0].supplierCode
                })
                params.callback() 
            }
        })
}