import config from "../../common/config";

export const list = (state) => {
    let insuranceWorkbenchInfoList = state.insuranceWorkbenchInfoList;
    let paramStatus = state.insuranceStatus;
    let newList = []
    if (insuranceWorkbenchInfoList != undefined && insuranceWorkbenchInfoList != null && insuranceWorkbenchInfoList.length > 0) {
        insuranceWorkbenchInfoList.forEach(info => {
            let trackInfo = info.insuranceWbWorkbenchTrackInfoVos;
            let insuranceList = info.insuranceWbDetailInfoVos
            let result = {
                strongInsuranceOrg: '',
                strongInsurancePrice: '',
                businessInsuranceOrg: '',
                businessInsurancePrice: '',
                insOrderStatus: '未出单',
            }
            if (insuranceList != undefined && insuranceList != null && insuranceList.length > 0) {
                let businessPrice = 0;
                insuranceList.forEach(element => {
                    if (element.insTypeCode == config.insurance.strongInsuranceType) {
                        result.strongInsuranceOrg = element.insOrgName
                        result.strongInsurancePrice = element.vvtaxActualPrice != null ? (element.vvtaxActualPrice).toFixed(2) + '' : ''
                    } else {
                        if(element.insTypeCode != config.insurance.vehicleAndVesselTaxType && element.insTypeCode != config.insurance.commercialAllInsuranceType && info.businessPriceModelType == 0) {
                            result.businessInsuranceOrg = element.insOrgName
                            businessPrice += (element.actualPrice != null ? element.actualPrice  : 0)
                        } else if (element.insTypeCode == config.insurance.commercialAllInsuranceType && info.businessPriceModelType == 1) {
                            result.businessInsuranceOrg = element.insOrgName
                            businessPrice += (element.actualPrice != null ? element.actualPrice  : 0)
                        }
                    }
                });
                businessPrice = businessPrice.toFixed(2);
                result.businessInsurancePrice = businessPrice + "";
            }
            if (trackInfo != undefined && trackInfo != null && trackInfo.length > 0) {
                let closeTime = 0;
                let z = 0
                trackInfo.forEach(element => {
                    let updateTime = element.updateTime
                    if (updateTime > closeTime) {
                        closeTime = updateTime
                        z = element.applyType
                    }
                });
                switch (z) {
                    case 0:
                        result.insOrderStatus = '未出单'
                        break;
                    case 1:
                        result.insOrderStatus = '批增'
                        break;
                    case 2:
                        result.insOrderStatus = '批减'
                        break;
                    case 3:
                        result.insOrderStatus = '出单成功'
                        break;
                    case -1:
                        result.insOrderStatus = '批退'
                        break;
                    default:
                        result.insOrderStatus = '未出单'
                        break;
                }
            }
            info = {
                ...info,
                ...result
            }
            if(paramStatus == 2 && info.syncByCode == null) {//保险专员报价 & 操作人syncByCode为空，则为销售顾问报价

            }else {
                newList.push(info)
            }

        });
    }
    return newList
}
export const insuranceStatus = (state) => {
    let result = ''
    if (state.insuranceWorkbenchData != {}) {
        let insuranceStatus = state.insuranceWorkbenchData.insuranceStatus
        switch (insuranceStatus) {
            case 0:
                result = '待报价'; break;
            case 1:
                result = '销售顾问报价'; break;
            case 2:
                result = '保险专员报价'; break;
            case 3:
                result = '保险战败'; break;
        }
    }
    return result
}
