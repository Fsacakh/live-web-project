export const orderPriceList = (state) => {
    let index = 0
    let orderPriceInfolist = []
    //车辆
    let carPriceInfo = state.orderPriceInfo.carPriceInfo
    index = carPriceInfo.infoList.length
    orderPriceInfolist.push({
        type: '车辆',
        totalPrice: carPriceInfo.addValue,
        infoList:  carPriceInfo.infoList 
    })
    //金融
    let financialPriceInfo = state.orderPriceInfo.financialPriceInfo
    if(index < financialPriceInfo.infoList.length){
        index  = financialPriceInfo.infoList.length
    }
    orderPriceInfolist.push({
        type: '金融',
        totalPrice: financialPriceInfo.addValue,
        infoList:  financialPriceInfo.infoList
    })
    //保险 insurancePriceInfo
    let insurancePriceInfo = state.orderPriceInfo.insurancePriceInfo
    if(index < insurancePriceInfo.infoList.length){
        index = insurancePriceInfo.infoList.length
    }
    orderPriceInfolist.push({
        type: '保险',
        totalPrice: insurancePriceInfo.addValue,
        infoList:  insurancePriceInfo.infoList
    })

    //延保      ybSkuPriceInfo

    let ybSkuPriceInfo = state.orderPriceInfo.ybSkuPriceInfo
    if(index < ybSkuPriceInfo.infoList.length){
        index  = ybSkuPriceInfo.infoList.length
    }
    orderPriceInfolist.push({
        type: '延保',
        totalPrice: ybSkuPriceInfo.addValue,
        infoList:  ybSkuPriceInfo.infoList
    })
    //后市场        skuPriceInfo

    let skuPriceInfo = state.orderPriceInfo.skuPriceInfo
    if(index < skuPriceInfo.infoList.length){
        index  = skuPriceInfo.infoList.length
    }
    orderPriceInfolist.push({
        type: '后市场',
        totalPrice: skuPriceInfo.addValue,
        infoList:  skuPriceInfo.infoList
    })
    //服务费及其他      serviceFeePriceInfo
    let serviceFeePriceInfo = state.orderPriceInfo.serviceFeePriceInfo
    if(index < serviceFeePriceInfo.infoList.length){
        index  = serviceFeePriceInfo.infoList.length
    }
    orderPriceInfolist.push({
        type: '服务费及其他',
        totalPrice: serviceFeePriceInfo.addValue,
        infoList:  serviceFeePriceInfo.infoList
    })
    return {
        num: index,
        orderPriceInfolist: orderPriceInfolist
    }
}