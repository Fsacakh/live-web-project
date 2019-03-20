import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'
export const getType = ({ commit }, params) => {
    api.ref.getDataDictionarys(params.poros, (res) => {
        if (res.data.code == 'success') {
            let type = [{
                value: '',
                text: '请选择'
            }];
            let len = res.data.obj.referenceDetailInfos
            if(len){
                for (let i = 0; i < len.length; i++) {
                    let obj = {};
                    obj.value = len[i].refDetailCode
                    obj.text = len[i].refDetailName
                    type.push(obj)
                }
            }
            commit(types.F_GET_TYPE, { refCode: params.poros.refCode, type })
            params.callBack(res);
        }
    })
}
export const getCode = ({ commit }, params) => {
    api.ordinalInfo.getSequence(params.poros, (res) => {
        if (res.data.code == "success") {
            commit(types.F_GET_CODE, { jugde: params.poros.serviceCode, msg: res.data.obj })
            params.callBack(res)
        }
    })
}
export const addPayInfoList = ({ commit }, params) => {
    api.financing.addPayInfoList(params.poros, (res) => {
        params.callBack(res)
        if (res.data.code == 'success') {

        }
    })
}
export const queryPayHistory = ({ commit }, params) => {
    api.financing.queryPayHistory(params.poros, (res) => {
        params.callBack(res)
        if (res.data.code == 'success') {

        }
    })
}
export const queryPayInfo = ({ commit }, params) => {
    api.financing.queryPayInfo(params.poros, (res) => {
        params.callBack(res)
        if (res.data.code == 'success') {
            let tableList = res.data.obj.list
            let total = res.data.obj.total
            let pager = {};
            pager.pageNo = res.data.obj.pageNum
            pager.totalPages = res.data.obj.pages
            pager.pageSize = res.data.obj.pageSize
            pager.total = res.data.obj.total
            commit(types.F_QUERT_ORDERINFO, {total:total, List: tableList, page: pager, type: params.poros.queryType })
        }
    })
}
export const queryPayInfoList = ({ commit }, params) => {
    api.financing.queryPayInfoList(params.poros, (res) => {
        params.callBack(res)
        if (res.data.code == 'success') {
            let tableList = res.data.obj.list
            let pager = {};
            pager.pageNo = res.data.obj.pageNum
            pager.totalPages = res.data.obj.pages
            pager.pageSize = res.data.obj.pageSize
            pager.total = res.data.obj.total

            commit(types.QUERY_PAYINFO_LIST, { List: tableList, queryPayInfoList: pager, type: params.poros.queryType })
        }
    })
}
export const updataPayInfo = ({ commit }, params) => {
    api.financing.updataPayInfo(params.poros, (res) => {
        if (res.data.code == 'success') {
            params.callBack(res)
        }
    })
}
export const newgetPayInfo = ({ commit }, params) => {
    api.financing.newgetPayInfo(params.poros, (res) => {
        if (res.data.code == 'success') {
            let obj = res.data.obj

            let content = [];
            let subOrderInfo = {
                carOrderInfoVoList: obj.carOrderInfoVoList,
                financialOrderInfoVoList: obj.financialOrderInfoVoList,
                insuranceOrderInfoVoList: obj.insuranceOrderInfoVoList,
                skuOrderInfoVoList: obj.skuOrderInfoVoList,
                orderServiceFeeInfoVoList: obj.orderServiceFeeInfoVoList,
                orderSubstitutionInfoVoList: obj.orderSubstitutionInfoVoList
            };
            let option = [];
            if(subOrderInfo.carOrderInfoVoList.length > 0 
                && obj.carOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.carOrderInfoVoList[0].carOrderNo,
                    text: '整车'
                })
            }
            if(subOrderInfo.financialOrderInfoVoList.length > 0 
                && obj.financialOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.financialOrderInfoVoList[0].financialOrderNo,
                    text: '金融'
                })
            }
            if(subOrderInfo.insuranceOrderInfoVoList.length > 0 
                && obj.insuranceOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.insuranceOrderInfoVoList[0].insuranceOrderNo,
                    text: '保险'
                })
            }
            if(subOrderInfo.skuOrderInfoVoList.length > 0 
                && obj.skuOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.skuOrderInfoVoList[0].skuOrderNo,
                    text: '精品'
                })
            }
            if(subOrderInfo.orderServiceFeeInfoVoList.length > 0 
                && obj.orderServiceFeeInfoVoList[0] != null) {
                option.push({
                    value: obj.orderServiceFeeInfoVoList[0].orderServiceFeeCode,
                    text: '服务费及其他'
                })
            }
            let orderAddInfos = obj.orderAddInfos
            obj.orderAddInfoDeposit = 0
            orderAddInfos.forEach((orderAddInfo) => {
                if (orderAddInfo.addCode === config.financing.orderAddInfoDeposit) {
                    obj.orderAddInfoDeposit = orderAddInfo.addValue
                }
            })
            api.ref.getDataDictionary({
                    'refCode': config.financing.invoiceContentCode
                })
                .then((res) => {
                    if (res.data.code === 'success') {
                        let options = []
                        let arr = res.data.obj.referenceDetailInfos
                        if (arr != null) {
                            let afterSales = new Set(config.financing.afterSalesInvoice)
                            arr.forEach((item) => {
                                if (!afterSales.has(item.refDetailCode)) {
                                    options.push({
                                        value: item.refDetailCode,
                                        text: item.refDetailName
                                    })
                                }
                            })
                        }
                        commit(types.F_GET_PAYINFO, { obj: obj, subOrderInfo: option })
                        params.callBack(res)
                    }
                })
// =======
//             // console.log(content)
//             commit(types.F_GET_PAYINFO, { obj: obj, subOrderInfo: content })
//             params.callBack(res)
// >>>>>>> f5c4c587221395f968771674fb5d935f36a9c1a9
        }
    })
}
export const getPayInfo = ({ commit }, params) => {
    api.financing.getPayInfo(params.poros, (res) => {
        if (res.data.code == 'success') {
            let obj = res.data.obj

            let content = [];
            let subOrderInfo = {
                carOrderInfoVoList: obj.carOrderInfoVoList,
                financialOrderInfoVoList: obj.financialOrderInfoVoList,
                insuranceOrderInfoVoList: obj.insuranceOrderInfoVoList,
                skuOrderInfoVoList: obj.skuOrderInfoVoList,
                orderServiceFeeInfoVoList: obj.orderServiceFeeInfoVoList,
                orderSubstitutionInfoVoList: obj.orderSubstitutionInfoVoList
            };
            let option = [];
            if(subOrderInfo.carOrderInfoVoList.length > 0 
                && obj.carOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.carOrderInfoVoList[0].carOrderNo,
                    text: '整车'
                })
            }
            if(subOrderInfo.financialOrderInfoVoList.length > 0 
                && obj.financialOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.financialOrderInfoVoList[0].financialOrderNo,
                    text: '金融'
                })
            }
            if(subOrderInfo.insuranceOrderInfoVoList.length > 0 
                && obj.insuranceOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.insuranceOrderInfoVoList[0].insuranceOrderNo,
                    text: '保险'
                })
            }
            if(subOrderInfo.skuOrderInfoVoList.length > 0 
                && obj.skuOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.skuOrderInfoVoList[0].skuOrderNo,
                    text: '精品'
                })
            }
            if(subOrderInfo.orderServiceFeeInfoVoList.length > 0 
                && obj.orderServiceFeeInfoVoList[0] != null) {
                option.push({
                    value: obj.orderServiceFeeInfoVoList[0].orderServiceFeeCode,
                    text: '服务费及其他'
                })
            }
            let orderAddInfos = obj.orderAddInfos
            obj.orderAddInfoDeposit = 0
            orderAddInfos.forEach((orderAddInfo) => {
                if (orderAddInfo.addCode === config.financing.orderAddInfoDeposit) {
                    obj.orderAddInfoDeposit = orderAddInfo.addValue
                }
            })
            api.ref.getDataDictionary({
                    'refCode': config.financing.invoiceContentCode
                })
                .then((res) => {
                    if (res.data.code === 'success') {
                        let options = []
                        let arr = res.data.obj.referenceDetailInfos
                        if (arr != null) {
                            let afterSales = new Set(config.financing.afterSalesInvoice)
                            arr.forEach((item) => {
                                if (!afterSales.has(item.refDetailCode)) {
                                    options.push({
                                        value: item.refDetailCode,
                                        text: item.refDetailName
                                    })
                                }
                            })
                        }
                        commit(types.F_GET_PAYINFO, { obj: obj, subOrderInfo: option })
                        params.callBack(res)
                    }
                })
// =======
//             // console.log(content)
//             commit(types.F_GET_PAYINFO, { obj: obj, subOrderInfo: content })
//             params.callBack(res)
// >>>>>>> f5c4c587221395f968771674fb5d935f36a9c1a9
        }
    })
}
export const getPayInfoList = ({ commit }, params) => {
    api.financing.getPayInfoList(params.poros, (res) => {
        if (res.data.code == 'success') {
            let obj = res.data.obj

            let content = [];
            let subOrderInfo = {
                carOrderInfoVoList: obj.carOrderInfoVoList,
                financialOrderInfoVoList: obj.financialOrderInfoVoList,
                insuranceOrderInfoVoList: obj.insuranceOrderInfoVoList,
                skuOrderInfoVoList: obj.skuOrderInfoVoList,
                orderServiceFeeInfoVoList: obj.orderServiceFeeInfoVoList,
                orderSubstitutionInfoVoList: obj.orderSubstitutionInfoVoList
            };
            let option = [];
            if(subOrderInfo.carOrderInfoVoList.length > 0 
                && obj.carOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.carOrderInfoVoList[0].carOrderNo,
                    text: '整车'
                })
            }
            if(subOrderInfo.financialOrderInfoVoList.length > 0 
                && obj.financialOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.financialOrderInfoVoList[0].financialOrderNo,
                    text: '金融'
                })
            }
            if(subOrderInfo.insuranceOrderInfoVoList.length > 0 
                && obj.insuranceOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.insuranceOrderInfoVoList[0].insuranceOrderNo,
                    text: '保险'
                })
            }
            if(subOrderInfo.skuOrderInfoVoList.length > 0 
                && obj.skuOrderInfoVoList[0] != null) {
                option.push({
                    value: obj.skuOrderInfoVoList[0].skuOrderNo,
                    text: '精品'
                })
            }
            if(subOrderInfo.orderServiceFeeInfoVoList.length > 0 
                && obj.orderServiceFeeInfoVoList[0] != null) {
                option.push({
                    value: obj.orderServiceFeeInfoVoList[0].orderServiceFeeCode,
                    text: '服务费及其他'
                })
            }
            let orderAddInfos = obj.orderAddInfos
            obj.orderAddInfoDeposit = 0
            orderAddInfos.forEach((orderAddInfo) => {
                if (orderAddInfo.addCode === config.financing.orderAddInfoDeposit) {
                    obj.orderAddInfoDeposit = orderAddInfo.addValue
                }
            })
            api.ref.getDataDictionary({
                    'refCode': config.financing.invoiceContentCode
                })
                .then((res) => {
                    if (res.data.code === 'success') {
                        let options = []
                        let arr = res.data.obj.referenceDetailInfos
                        if (arr != null) {
                            let afterSales = new Set(config.financing.afterSalesInvoice)
                            arr.forEach((item) => {
                                if (!afterSales.has(item.refDetailCode)) {
                                    options.push({
                                        value: item.refDetailCode,
                                        text: item.refDetailName
                                    })
                                }
                            })
                        }
                        commit(types.F_GET_PAYINFO, { obj: obj, subOrderInfo: option })
                        params.callBack(res)
                    }
                })
        }
    })
}
export const queryOrderBillingInfo = ({ commit }, params) => {
    api.financing.queryOrderBillingInfo(params.poros, (res) => {
        params.callBack(res)
        if (res.data.code == "success") {

        }
    })
}
export const addOrderBillingInfo = ({ commit }, params) => {
    api.financing.addOrderBillingInfo(params.poros, (res) => {
        params.callBack(res);
    })
}
export const getOrderPriceInfo = ({ commit }, params) => {
    api.financing.queryOrderPriceInfoByCodeFromDB(params,(res) => {
      if (res.data.code === "success") {
        let priceInfo = res.data.obj
        commit(types.GET_ORDER_PRICE_INFO, priceInfo)
      }
    });
}
