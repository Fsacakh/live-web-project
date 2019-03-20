import api from 'common/api'
import * as types from './mutation-types'
import config from '../../common/config'

export const newSetOrderObj = ({ commit }, params) => {
    api.order.newQueryList(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_ORDER_OBJ, obj)
        }
    })
}

export const setOrderObj = ({ commit }, params) => {
    api.order.queryList(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_ORDER_OBJ, obj)
        }
    })
}

export const setOrderDetailObj = ({ commit }, params) => {
    api.order.queryDetailByOrderNo(params).then(res => {
        if (res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_ORDER_DETAIL_OBJ, obj)
        }
    })
}

export const hideSelectModal = ({ commit }, params) => {
    let list = []
    let pager = {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
    commit(types.ORDER_HIDE_MODAL)
    commit(types.ORDER_GET_SKU_INFO_LIST, {
        list
    })
    commit(types.ORDER_DELETE_CAR_INFO_LIST)
    commit(types.ORDER_SET_SKU_PAGER, {
        pager
    })
}

export const showSelectModal = ({ commit }, params) => {
    commit(types.ORDER_SHOW_MODAL)
}

export const getSkuInfoList = ({ dispatch, commit, state }, params) => {
    params.skuType = config.product.archives.archivesType
    params.salesStatus = 0
    params.onOffFlag = 1
    params.lockStatus = 0
    api.product
        .models
        .querySkuInfoListKeda(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    list.forEach((item) => {
                        let skuCode = item.skuCode
                        let skuAddInfoVoList = item.skuAddInfoVoList
                        if (skuAddInfoVoList != null && skuAddInfoVoList.length > 0) {
                            let orderAddInfos = []
                            skuAddInfoVoList.forEach((skuAddInfo) => {
                                let orderAddInfo = {}
                                switch (skuAddInfo.addCode) {
                                    case config.order.carInfo.skuAddInfos.carAppertanceName.refCode:
                                        item.carAppertanceName = skuAddInfo.addValue
                                        orderAddInfo = {
                                            addCode: config.order.carInfo.carAppertanceName.refCode,
                                            addName: 'carAppertanceName',
                                            addValue: skuAddInfo.addValue
                                        }
                                        orderAddInfos.push(orderAddInfo)
                                        break;
                                    case config.order.carInfo.skuAddInfos.carInteriorName.refCode:
                                        item.carInteriorName = skuAddInfo.addValue
                                        orderAddInfo = {
                                            addCode: config.order.carInfo.carInteriorName.refCode,
                                            addName: 'carInteriorName',
                                            addValue: skuAddInfo.addValue
                                        }
                                        orderAddInfos.push(orderAddInfo)
                                        break;
                                    case config.order.carInfo.skuAddInfos.actualMSRPInclusiveTax.refCode:
                                        item.actualMSRPInclusiveTax = skuAddInfo.addValue
                                        break;
                                    case config.order.carInfo.skuAddInfos.originalAddition.refCode:
                                        item.originalAddition = skuAddInfo.addValue
                                        break;
                                }
                            })
                            item.orderAddInfos = orderAddInfos
                            item.carVinCode = item.carVinNo
                            item.carProductionCode = item.productionCode
                        }
                    })
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.ORDER_GET_SKU_INFO_LIST, {
                        list
                    })
                    commit(types.ORDER_SET_SKU_PAGER, {
                        pager
                    })
                }
            }
        })
}

export const addCarInfoList = ({ dispatch, commit, state }, params) => {
    let carInfo = JSON.parse(JSON.stringify(params))
    commit(types.ORDER_DELETE_CAR_INFO_LIST)
    commit(types.ORDER_ADD_CAR_INFO, {
        carInfo
    })
}

export const commitCarInfoList = ({ dispatch, commit, state }, params) => {
    let val = state.selectedCarInfoList[0]
    dispatch('getMsrp', {
        carFactoryCode: val.carFactoryCode,
        carBrandCode: val.carBrandCode,
        carModelCode: val.carModelCode,
        carSeriesCode: val.carSeriesCode,
        carCode: val.carCode,
        skuCode: val.skuCode,
        callback: (actualMSRPInclusiveTax) => {
            val.actualMSRPInclusiveTax = actualMSRPInclusiveTax
            val.carOrderNo = state.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0].carOrderNo
            val.carOrderDetailCode = state.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0].carOrderDetailCode
            val.additionalFee = state.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0].additionalFee
            val.actualSalesPrice = state.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0].actualSalesPrice
            let car = {
                orderNo: state.orderDetailObj.orderNo,
                carFactoryCode: val.carFactoryCode,
                carFactoryName: val.carFactoryName,
                carBrandCode: val.carBrandCode,
                carBrandName: val.carBrandName,
                carSeriesCode: val.carSeriesCode,
                carSeriesName: val.carSeriesName,
                carModelCode: val.carModelCode,
                carModelName: val.carModelName,
                carCode: val.carCode,
                carDisplayName: val.carDisplayName,
                displayName: val.displayName,
                remark: val.remark,
                channelType: config.channelType,
                skuCode: val.skuCode,
                carOrderNo: val.carOrderNo,
                carOrderDetailCode: val.carOrderDetailCode,
                additionalFee: val.additionalFee ? val.additionalFee : null,
                originalSalesPrice: val.originalSalesPrice,
                actualSalesPrice: val.actualSalesPrice ? val.actualSalesPrice : null,
                discount: val.discount ? val.discount : null,
                afterDiscountPrice: val.afterDiscountPrice ? val.afterDiscountPrice : null,
                productionCode: val.productionCode,
                carVinNo: val.carVinNo,
                carAppertanceName: val.carAppertanceName,
                carInteriorName: val.carInteriorName,
                actualMSRPInclusiveTax: val.actualMSRPInclusiveTax,
                originalAddition: val.originalAddition,
                orderAddInfos: val.orderAddInfos
            }
            car.afterDiscountPrice = (parseFloat(car.actualSalesPrice) - parseFloat(car.additionalFee)).toFixed(2)
            car.discount = parseFloat(car.actualMSRPInclusiveTax) - parseFloat(car.afterDiscountPrice)
            car.displayName = car.displayName ? car.displayName : (`${car.carFactoryName || ''} ${car.carBrandName || ''} ${car.carSeriesName || ''} ${car.carModelName || ''}`)
            api.order
                .updateCarOrderInfo({
                    orderNo: car.orderNo,
                    carOrderNo: car.carOrderNo,
                    carOrderDetailInfoList: [
                        car
                    ]
                }, (res) => {
                    if (res.data.code === 'success') {
                        dispatch('setOrderDetailObj', {
                            orderNo: state.orderDetailObj.orderNo,
                            allSubOrderFlag: true
                        })
                    }
                })
        }
    })
}

export const removeCarInfoList = ({ commit }, params) => {
    let index = params
    commit(types.ORDER_REMOVE_CAR_INFO, {
        index
    })
}

export const getUserInfo = ({ commit }, params) => {
    api.getUserAvailableInfo((res) => {
        let userInfo = res.data.obj
        params.callback(userInfo)
    })
}

export const getMsrp = ({ state, commit, dispatch }, params) => {
    api.order
        .getMsrp(params, (res) => {
            if (res.data.code === 'success') {
                let actualMSRPInclusiveTax = res.data.obj.msrp
                params.callback(actualMSRPInclusiveTax)
            }
        })
}

