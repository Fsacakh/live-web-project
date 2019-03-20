import config from '../../common/config'
export const dataList = (state) => {
    let data = {}
    let months = []
    let leadCountList = []
    let orderCountList = []
    let ubCountList = []
    let wfCountList = []
    let invoiceCountList = []
    let invoiceOutCountList = []
    let deliveryCarCountList = []
    let financialOrderNoCountList = []
    let insuranceOrderNoCountList = []
    let extensionCountList = []
    let skuCountList = []
    let leadRateList = []
    let invoiceRateList = []
    let financialOrderRateList = []
    let insuranceOrderRateList = []
    let extensionRateList = []
    let skuRateList = []
    let gpNameSet = new Set(state.gpList)
    let gp1List = []
    let gp1PreList = []
    let gp2List = []
    let gp2PreList = []
    let gp3List = []
    let gp3PreList = []
    let gp4List = []
    let gp4PreList = []
    let gp45List = []
    let gp45PreList = []
    let leadKeys = [
        'leadCount',
        'orderCount',
        'ubCount',
        'wfCount',
        'invoiceCount',
        'invoiceOutCount',
        'deliveryCarCount',
        'financialOrderNoCount',
        'insuranceOrderNoCount',
        'extensionCount',
        'skuCount',
        'leadRate',
        'invoiceRate',
        'financialOrderRate',
        'insuranceOrderRate',
        'extensionRate',
        'skuRate'
    ]
    data = {
        months: months,
        leadCountList: leadCountList,
        orderCountList: orderCountList,
        ubCountList: ubCountList,
        wfCountList: wfCountList,
        invoiceCountList: invoiceCountList,
        invoiceOutCountList: invoiceOutCountList,
        deliveryCarCountList: deliveryCarCountList,
        financialOrderNoCountList: financialOrderNoCountList,
        insuranceOrderNoCountList: insuranceOrderNoCountList,
        extensionCountList: extensionCountList,
        skuCountList: skuCountList,
        leadRateList: leadRateList,
        invoiceRateList: invoiceRateList,
        financialOrderRateList: financialOrderRateList,
        insuranceOrderRateList: insuranceOrderRateList,
        extensionRateList: extensionRateList,
        skuRateList: skuRateList
    }
    state.gpList.forEach((gpName) => {
        data[gpName + 'List']  = []
    })
    state.salesManageOrderList.forEach((item) => {
        let month = new Date(item.salesCreateTime).getMonth() + 1
        months.push(month)
        leadCountList.push(item['leadCount'])
        orderCountList.push(item['orderCount'])
        ubCountList.push(item['ubCount'])
        wfCountList.push(item['wfCount'])
        invoiceCountList.push(item['manageInvoiceCount'])
        invoiceOutCountList.push(item['invoiceOutCount'])
        deliveryCarCountList.push(item['deliveryCarCount'])
        financialOrderNoCountList.push(item['financialOrderNoCount'])
        insuranceOrderNoCountList.push(item['insuranceOrderNoCount'])
        extensionCountList.push(item['extensionCount'])
        skuCountList.push(item['skuCount'])
        leadRateList.push((item['leadCount'] == 0 ? '0%': (parseFloat(item['manageOrderCount'])/parseFloat(item['leadCount'])*100).toFixed(1) + '%'))
        invoiceRateList.push((item['manageOrderCount'] == 0 ? '0%': (parseFloat(item['manageInvoiceCount'])/parseFloat(item['manageOrderCount'])*100).toFixed(1) + '%'))
        financialOrderRateList.push((item['manageInvoiceCount'] == 0 ? '0%': (item['financialOrderNoCount']/item['manageInvoiceCount']*100).toFixed(1) + '%'))
        insuranceOrderRateList.push((item['manageInvoiceCount'] == 0 ? '0%': (item['insuranceOrderNoCount']/item['manageInvoiceCount']*100).toFixed(1) + '%'))
        extensionRateList.push((item['manageInvoiceCount'] == 0 ? '0%': (item['extensionCount']/item['manageInvoiceCount']*100).toFixed(1) + '%'))
        skuRateList.push((item['manageInvoiceCount'] == 0 ? '0%': (item['skuCount']/item['manageInvoiceCount']*100).toFixed(1) + '%'))
        
        if(item.salesProfitGpVo && item.salesProfitGpVo.length > 0) {
            item.salesProfitGpVo.forEach((elem) => {
                if (gpNameSet.has(elem.gpName)) {
                     if (elem.gpName.indexOf('%') > 0) {
                        data[elem.gpName + 'List'].push(parseFloat(elem.gpValue*100).toFixed(1) + '%')
                     } else {
                        data[elem.gpName + 'List'].push(elem.gpValue.toFixed(1))
                     }
                }
            })
        }else {
            state.gpList.forEach(element => {
                data[element + 'List'].push(element.indexOf('%') > 0 ? "0%" : "0")
            });
        }
    })
    return data
}
