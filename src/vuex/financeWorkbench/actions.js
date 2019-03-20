import api from '../../common/api'
import config from '../../common/config'
import common from '../../common/common'
import * as types from './mutation-types'

export const getFinanceWorkbenchInfoList = ({ dispatch, commit, state }, params) => {
    dispatch('getUserAvailableInfo', {
        callback: (storeInfo, availableType) => {
            if (availableType === '0') {
                params.storeCode = storeInfo.storeCode
                params.storeCodeSet = [storeInfo.storeCode]
            }
            if (!params.storeCode) {
                return;
            }
            // 查询金融协作报价工作台接口
            api.finWorkbench.queryFinanceWorkBenchInfoList(params, (res) => {
                if (res.data.code === 'success') {
                    let list = res.data.obj.list;
                    let orderNoSet = []
                    if (list != null) {
                        let pager = {
                            pageNo: res.data.obj.pageNum,
                            pageSize: res.data.obj.pageSize,
                            total: res.data.obj.total,
                            totalPages: res.data.obj.pages
                        }
                        list.forEach((item) => {
                            orderNoSet.push(item.orderNo)
                        })
                        if (list.length > 0) {
                            dispatch('getCarOrderActualPriceList', {
                                orderNoSet: orderNoSet,
                                callback: (map) => {
                                    list.forEach((item) => {
                                        item.salesPrice = map[item.orderNo]
                                    })
                                    commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_INFO_LIST, {
                                        list
                                    })
                                    commit(types.FINANCE_WORK_BENCH_SET_FINANCE_WORK_BENCH_INFO_PAGER, {
                                        pager
                                    })
                                }
                            })
                        } else {
                            commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_INFO_LIST, {
                                list
                            })
                            commit(types.FINANCE_WORK_BENCH_SET_FINANCE_WORK_BENCH_INFO_PAGER, {
                                pager
                            })
                        }
                    }
                }
            })
        }
    })
}

export const getAuthorizationOrgs = ({ commit }) => {
    let empTokenKey = config.empTokenKey
    let params = { 'empToken': common.getCookie(empTokenKey) }
    // 查询金融机构信息
    api.financePro.getAuthorizationOrgs(params, (res) => {
        if (res.data.code === 'success') {
            let options = []
            let arr = res.data.obj
            if (arr != null) {
                arr.forEach((item) => {
                    options.push({
                        value: item.financeOrgCode,
                        text: item.financeOrgName
                    })
                })
                commit(types.FINANCE_WORK_BENCH_GET_AUTHORIZATION_ORGS, {
                    options
                })
            }
        }
    })
}

export const getFinanceTypes = ({ commit }) => {
    let params = { 'refCode': config.financePro.financeType.refCode }
    // 金融机构CODE
    api.ref.getDataDictionary(params).then((res) => {
        if (res.data.code === 'success') {
            let options = []
            let index = 0
            let arr = res.data.obj.referenceDetailInfos
            if (arr != null) {
                arr.forEach((item) => {
                    switch (item.refDetailFatherCode) {
                        case config.financePro.financeType.refDetailFatherCode:
                            let children = []
                            arr.forEach((arrItem) => {
                                if (arrItem.refDetailFatherCode == item.refDetailCode) {
                                    children.push({
                                        text: arrItem.refDetailName,
                                        value: arrItem.refDetailCode
                                    })
                                }
                            })
                            options.push({
                                value: index,
                                text: item.refDetailName,
                                code: item.refDetailCode,
                                children: children
                            })
                            index++;
                            break;
                    }
                })
                commit(types.FINANCE_WORK_BENCH_GET_FINANCE_TYPES, {
                    options
                })
            }
        }
    })
}

export const getFinanceTypeCodes = ({ commit }) => {
    let params = { 'refCode': config.financePro.financeType.refCode }
    // 金融机构CODE
    api.ref.getDataDictionary(params).then((res) => {
        if (res.data.code === 'success') {
            let options = []
            let index = 0
            let arr = []
            arr = res.data.obj.referenceDetailInfos
            if (arr != null) {
                arr.forEach((item, index) => {
                    if (item.refDetailFatherCode == config.financePro.financeType.refDetailFatherCode) {
                        options.push({
                            text: item.refDetailName,
                            value: item.refDetailCode
                        })
                    }
                })
            }
            commit(types.FINANCE_WORK_BENCH_GET_FINANCE_TYPE_CODES, {
                options
            })
        }
    })
}

export const getIdtypes = ({ commit }) => {
    let params = { 'refCode': config.ref.idtype }
    api.ref.getDataDictionary(params).then((res) => {
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
            commit(types.FINANCE_WORK_BENCH_GET_ID_TYPES, {
                options
            })
        }
    })
}

export const getApprovalResultTypes = ({ commit }) => {
    let params = { 'refCode': config.financeWorkbench.financeWorkbenchTrackInfo.approvalResult.refCode }
    api.ref.getDataDictionary(params).then((res) => {
        if (res.data.code === 'success') {
            let options = [{text:'请选择',value:'',index:0}]
            let arr = []
            arr = res.data.obj.referenceDetailInfos
            if (arr != null) {
                arr.forEach((item, index) => {
                    options.push({
                        text: item.refDetailName,
                        value: item.refDetailCode,
                        index: parseInt(item.refDetailRemark)
                    })
                })
                options.sort((a, b) => {
                    if (a.index < b.index) {
                        return -1
                    }
                    if (a.index > b.index) {
                        return 1
                    }
                    return 0
                })
            }
            commit(types.FINANCE_WORK_BENCH_APPROVAL_RESULT_TYPES, {
                options
            })
        }
    })
}

export const getApprovalResultReasonTypes = ({ commit }) => {
    let params = { 'refCode': config.financeWorkbench.financeWorkbenchTrackInfo.approvalResultReason.refCode }
    api.ref.getDataDictionary(params).then((res) => {
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
            commit(types.FINANCE_WORK_BENCH_APPROVAL_RESULT__REASON_TYPES, {
                options
            })
        }
    })
}

export const getFinanceFailReasonType = ({ commit }) => {
    let params = { 'refCode': config.ref.financeFailReasonType }
    api.ref.getDataDictionary(params).then((res) => {
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
            commit(types.FINANCE_WORK_BENCH_GET_FINANCE_FAIL_REASON_TYPES, {
                options
            })
        }
    })
}

export const getFinanceWbTrackInfoPageList = ({ dispatch, commit, state }, params) => {
    dispatch('getUserAvailableInfo', {
        callback: (storeInfo, availableType) => {
            if (availableType === '0') {
                params.storeCode = storeInfo.storeCode
                params.storeCodeSet = [storeInfo.storeCode]
            }
            params.orderNo = '';    //增加订单号入参(不是必填项)
            delete params.financeStatus; //删除多余入参
            delete params.storeCodeSet;  //删除多余入参
            delete params.salesAreaCode; //删除多余入参
            delete params.isActive;      //删除多余入参
            if (!params.storeCode) {
                return;
            }
            // 查询金融工作台分页信息
            api.finWorkbench.queryFinanceOrderInfoTrackList(params, (res) => {
                if (res.data.code === 'success') {
                    let list = res.data.obj.list;
                    let orderNoSet = []
                    if (list != null) {
                        let pager = {
                            pageNo: res.data.obj.pageNum,
                            pageSize: res.data.obj.pageSize,
                            total: res.data.obj.total,
                            totalPages: res.data.obj.pages
                        }
                        list.forEach((item) => {
                            orderNoSet.push(item.orderNo)
                        })
                        if (list.length > 0) {
                            dispatch('getCarOrderActualPriceList', {
                                orderNoSet: orderNoSet,
                                callback: (map) => {
                                    list.forEach((item) => {
                                        item.salesPrice = map[item.orderNo]
                                    })
                                    commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_TRACK_INFO_LIST, {
                                        list
                                    })
                                    commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_TRACK_INFO_PAGER, {
                                        pager
                                    })
                                }
                            })
                        } else {
                            commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_TRACK_INFO_LIST, {
                                list
                            })
                            commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_TRACK_INFO_PAGER, {
                                pager
                            })
                        }
                    }
                }
            })
        }
    })
}

export const getFinanceWorkbenchInfo = ({ dispatch, commit, state }, params) => {
    delete params.financeWbCode;       //删除多余的入参
    // 查询工作台明细接口
    api.finWorkbench.getFinanceWorkBenchInfoByOrderNo(params, (res) => {
        if (res.data.code === 'success') {
            let financeWorkbenchInfo = res.data.obj
            if (financeWorkbenchInfo != null) {
                dispatch('getCarOrderActualPriceList', {
                    orderNoSet: [financeWorkbenchInfo.orderNo],
                    callback: (map) => {
                        financeWorkbenchInfo.salesPrice = map[financeWorkbenchInfo.orderNo]
                        commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_INFO, {
                            financeWorkbenchInfo
                        })
                        commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_SUCC)
                    }
                })
            }
        }
    })
}

// 金融贷款申请贷款客户联系资料查询
export const getFinanceCustomInfo = ({ commit }, params) => {
    api.finWorkbench.finanCustomInfo.getFinanceTrackCustomerInfo(params, (res) => {
        if (res.data.code === 'success') {
            let customInfo = res.data.obj
            if (customInfo != null) {
                if (customInfo instanceof Array) {
                    customInfo = customInfo[0]
                }
                commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_CUSTOM_INFO, {
                    customInfo
                })
            }
        }
    })
}

// 金融贷款申请客户联系资料保存
export const getFinanceWbTrackInfo = ({ commit }, params) => {
    if (params.financeWbCode == 'null') {
        return
    }
    api.finWorkbench.getFinanceWorkbenchTrackInfo(params, (res) => {
        if (res.data.code === 'success') {
            let trackInfo = res.data.obj
            if (trackInfo != null) {
                if (trackInfo instanceof Array) {
                    trackInfo = trackInfo[0]
                }
                commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_TRACK_INFO, {
                    trackInfo
                })
            }
        }
    })
}

export const resetGetFinanceWorkbenchSucc = ({ commit }) => {
    commit(FINANCE_WORK_BENCH_RESET_FINANCE_WORK_BENCH_SUCC)
}

export const updateFinanceWorkbenchInfo = ({ dispatch, commit, state }, params) => {
    // 添加入参参数
    params.financeWorkbenchInfo.pushOptType = '';   //同步金融订单标识
    if (params.financeWorkbenchInfo.payForMonth == 'NaN' || params.financeWorkbenchInfo.payForMonth == null) {
        params.financeWorkbenchInfo.payForMonth = 0;    //月供
    }
    var infoByOrderNo = {};
    infoByOrderNo.orderNo = params.financeWorkbenchInfo.orderNo;
    // 保存接口
    api.finWorkbench.saveOrSynToOrderFinanceWbInfo(params.financeWorkbenchInfo, (res) => {
        if (res.data.code === 'success') {
            params.callback(res.data.obj);
            // 更新保存的数据
            if (res.data.obj != null) {
                infoByOrderNo.id = res.data.obj;
                api.finWorkbench.getFinanceWorkBenchInfoByOrderNo(infoByOrderNo, (res) => {
                    if (res.data.code === 'success') {
                        let financeWorkbenchInfo = res.data.obj;
                        if (financeWorkbenchInfo instanceof Array) {
                            financeWorkbenchInfo = financeWorkbenchInfo[0];
                        }
                        commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_INFO, {
                            financeWorkbenchInfo
                        })
                    }
                })
            }
        }
    })
}

export const synchFinanceWbInfoToFinanceOrder = ({ dispatch, commit, state }, params) => {
    let paramsArr = {};
    paramsArr = params.financeDetailInfo.financialOrderDetailInfo;
    paramsArr.currentOrderWfCode = params.financeDetailInfo.currentOrderWfCode;
    paramsArr.financialOrderNo = params.financeDetailInfo.financialOrderNo;
    paramsArr.isDefeat = params.financeDetailInfo.isDefeat;
    paramsArr.scIsDefeat = params.financeDetailInfo.scIsDefeat;
    paramsArr.storeCode = params.financeDetailInfo.storeCode;
    paramsArr.financialOrderDetailNo = params.financeDetailInfo.financialOrderDetailNo;
    paramsArr.customName = params.financeDetailInfo.customName;
    paramsArr.mobilePhone = params.financeDetailInfo.mobilePhone;
    paramsArr.customCode = params.financeDetailInfo.customCode;
    paramsArr.scCode = params.financeDetailInfo.scCode;
    paramsArr.scName = params.financeDetailInfo.scName;
    paramsArr.pushOptType = 1;          //同步金融订单标识
    paramsArr.defeatReason = params.financeDetailInfo.defeatReason;        //金融战败原因
    paramsArr.scDefeatReason = params.financeDetailInfo.scDefeatReason;    //SC战败原因
    paramsArr.skuCode = '';             //商品编码
    if (paramsArr.payForMonth == 'NaN' || paramsArr.payForMonth == null) {
        paramsArr.payForMonth = 0;
    }
    var infoByOrderNo = {};
    infoByOrderNo.orderNo = params.financeDetailInfo.orderNo;
    //同步该方案到订单
    api.finWorkbench.saveOrSynToOrderFinanceWbInfo(paramsArr, (res) => {
        if (res.data.code === 'success') {
            params.callback()
            // 更新保存的数据
            if (res.data.obj != null) {
                infoByOrderNo.id = res.data.obj;
                api.finWorkbench.getFinanceWorkBenchInfoByOrderNo(infoByOrderNo, (res) => {
                    if (res.data.code === 'success') {
                        let financeWorkbenchInfo = res.data.obj;
                        if (financeWorkbenchInfo instanceof Array) {
                            financeWorkbenchInfo = financeWorkbenchInfo[0];
                        }
                        commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_INFO, {
                            financeWorkbenchInfo
                        })
                    }
                })
            }
        }
    })
}

export const showSelectModal = ({ commit }, params) => {
    commit(types.FINANCE_WORK_BENCH_SHOW_SELECT_MODAL)
}

export const hideSelectModal = ({ commit }, params) => {
    let list = []
    let pager = {
        pageNo: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    }
    commit(types.FINANCE_WORK_BENCH_HIDE_SELECT_MODAL)
    commit(types.FINANCE_WORK_BENCH_GET_FINANCE_PRO_LIST, {
        list
    })
    commit(types.FINANCE_WORK_BENCH_SET_FINANCE_PRO_PAGER, {
        pager
    })
}

export const showHistoryModal = ({ commit }, params) => {
    commit(types.FINANCE_WORK_BENCH_SHOW_HISTORY_MODAL)
}

export const hideHistoryModal = ({ commit }, params) => {
    commit(types.FINANCE_WORK_BENCH_HIDE_HISTORY_MODAL)
}

export const getFinanceWbHistoryInfoList = ({ dispatch, commit, state }, params) => {
    params.wbRootCode = state.financeWorkbenchData.wbRootCode;
    var paramsInfo = {};
    paramsInfo.id = state.financeWorkbenchData.id;
    paramsInfo.orderNo = state.financeWorkbenchData.orderNo;    //订单编号
    //如果编码code为空则禁止往下执行
    if (!params.wbRootCode) {
        return
    }
    // 查询报价推送历史
    api.finWorkbench.queryFinanceWbHistoryInfo(params, (res) => {
        if (res.data.code === 'success') {
            let list = res.data.obj
            if (list != null) {
                commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WB_HISTORY_LIST, {
                    list
                })
            } else {
                commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WB_HISTORY_LIST, {
                    list
                })
            }
        }
    })
}

export const showTrackModal = ({ commit }, params) => {
    commit(types.FINANCE_WORK_BENCH_SHOW_TRACK_MODAL)
}

export const hideTrackModal = ({ commit }, params) => {
    commit(types.FINANCE_WORK_BENCH_HIDE_TRACK_MODAL)
}

export const getFinanceWorkbenchTrackInfoList = ({ dispatch, commit, state }, params) => {
    params.financialOrderNo = state.financeWorkbenchData.financialOrderNo
    if (!params.financialOrderNo) {
        return
    }
    api.finWorkbench.getFinanceWorkbenchTrackInfo(params, (res) => {
        let list = []
        if (res.data.code === 'success') {
            let list = res.data.obj
            list.map((item)=>{  item.trackResultTime = item.trackResultTime.split(' ')[0] })
            if (list != null) {
                commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WB_TRACK_LIST, {
                    list
                })
            } else {
                list = []
                commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WB_TRACK_LIST, {
                    list
                })
            }
        }
    })
}

export const getFinanceProList = ({ dispatch, commit, state }, params) => {
    params.factoryCode = state.financeWorkbenchData.carFactoryCode
    params.brandCode = state.financeWorkbenchData.carBrandCode
    params.seriesCode = state.financeWorkbenchData.carSeriesCode
    params.modelCode = state.financeWorkbenchData.carModelCode
    params.carCode = state.financeWorkbenchData.carCode
    params.storeCode = state.financeWorkbenchData.storeCode
    api.financePro.queryDetailInfoByCarInfo(params, (res) => {
        if (res.data.code === 'success') {
            let list = res.data.obj.list
            if (list != null) {
                list.forEach((item) => {
                    if (!item.tDetailIntersubsidyInfoList || item.tDetailIntersubsidyInfoList.length == 0) {
                        item.tDetailIntersubsidyInfoList = []
                        item.tDetailIntersubsidyInfoList.push({})
                    }
                    if (item.tDetailCarInfoList.length == 0) {
                        item.tDetailCarInfoList.push({})
                    }
                })
                let pager = {
                    pageNo: res.data.obj.pageNum,
                    pageSize: res.data.obj.pageSize,
                    total: res.data.obj.total,
                    totalPages: res.data.obj.pages
                }
                commit(types.FINANCE_WORK_BENCH_GET_FINANCE_PRO_LIST, {
                    list
                })
                commit(types.FINANCE_WORK_BENCH_SET_FINANCE_PRO_PAGER, {
                    pager
                })
            }
        }
    })
}

export const commitFinanceProInfo = ({ dispatch, commit, state }, params) => {
    let index = params
    if (parseInt(index) < 0) {
        return
    }
    let financialOrderDetailInfo = state.financeProList[parseInt(index)]
    let financeWorkbenchInfo = JSON.parse(JSON.stringify(state.financeWorkbenchData))
    dispatch('getSalesPrice', {
        orderNo: state.financeWorkbenchData.orderNo, callback: (salesPrice) => {
            financeWorkbenchInfo.salesPrice = salesPrice
            financeWorkbenchInfo.financialOrderDetailCode = (financialOrderDetailInfo != undefined ? financialOrderDetailInfo.financialOrderDetailCode : '')
            financeWorkbenchInfo.financeName = financialOrderDetailInfo.financeName
            financeWorkbenchInfo.financeCode = (financialOrderDetailInfo.financeCode ? financialOrderDetailInfo.financeCode : '')
            financeWorkbenchInfo.financeDetailCode = (financialOrderDetailInfo.financeDetailCode ? financialOrderDetailInfo.financeDetailCode : '')
            financeWorkbenchInfo.financeTypeCode = financialOrderDetailInfo.financeType
            financeWorkbenchInfo.financeTypeName = financialOrderDetailInfo.financeTypeName
            financeWorkbenchInfo.financeOrgCode = financialOrderDetailInfo.financeOrgCode
            financeWorkbenchInfo.financeOrgName = financialOrderDetailInfo.financeOrgName
            financeWorkbenchInfo.loanTypeCode = financialOrderDetailInfo.loanType
            financeWorkbenchInfo.downpaymentType = financialOrderDetailInfo.downpaymentType
            financeWorkbenchInfo.downPaymentAmount = parseFloat(financialOrderDetailInfo.downpaymentType == 0 ? financialOrderDetailInfo.downpaymentMin : (financeWorkbenchInfo.salesPrice * financialOrderDetailInfo.downpaymentMin).toFixed(2))
            financeWorkbenchInfo.downpaymentMin = common.filterIsPercent(financialOrderDetailInfo.downpaymentType, financialOrderDetailInfo.downpaymentMin)
            financeWorkbenchInfo.downpaymentMax = common.filterIsPercent(financialOrderDetailInfo.downpaymentType, financialOrderDetailInfo.downpaymentMax)
            financeWorkbenchInfo.bpIsPercent = financialOrderDetailInfo.bpIsPercent
            financeWorkbenchInfo.balancePaymentValue = (financialOrderDetailInfo.bpIsPercent == 0 ? financialOrderDetailInfo.balancePaymentMinValue : (financeWorkbenchInfo.salesPrice * financialOrderDetailInfo.balancePaymentMinValue).toFixed(2))
            financeWorkbenchInfo.balancePaymentMinValue = common.filterIsPercent(financialOrderDetailInfo.bpIsPercent, financialOrderDetailInfo.balancePaymentMinValue)
            financeWorkbenchInfo.balancePaymentMaxValue = common.filterIsPercent(financialOrderDetailInfo.bpIsPercent, financialOrderDetailInfo.balancePaymentMaxValue)
            financeWorkbenchInfo.valueOfLoan = 0
            financeWorkbenchInfo.rateType = financialOrderDetailInfo.rateType
            financeWorkbenchInfo.taxRate = parseFloat(financialOrderDetailInfo.rates * 100).toFixed(2)
            financeWorkbenchInfo.cycleMonth = financialOrderDetailInfo.cycleMonth
            financeWorkbenchInfo.payForMonth = 0
            financeWorkbenchInfo.repaymentMethod = ''
            financeWorkbenchInfo.cautionMoney = parseFloat(financialOrderDetailInfo.dfInPercent == 0 ? financialOrderDetailInfo.depositFree : (financeWorkbenchInfo.salesPrice * financialOrderDetailInfo.depositFree).toFixed(2))
            financeWorkbenchInfo.finalMileage = financialOrderDetailInfo.finalMileage
            financeWorkbenchInfo.evIsPercent = financialOrderDetailInfo.evIsPercent
            financeWorkbenchInfo.finalValue = (financialOrderDetailInfo.evIsPercent == 0 ? financialOrderDetailInfo.endingValue : (financeWorkbenchInfo.salesPrice * financialOrderDetailInfo.endingValue).toFixed(2))
            financeWorkbenchInfo.remark = ''
            if (financialOrderDetailInfo.tDetailIntersubsidyInfoList != null && financialOrderDetailInfo.tDetailIntersubsidyInfoList.length > 0) {
                financeWorkbenchInfo.storeInPercent = financialOrderDetailInfo.tDetailIntersubsidyInfoList[0].dealerInPercent
                financeWorkbenchInfo.storeSubsidyInterest = parseFloat(financialOrderDetailInfo.tDetailIntersubsidyInfoList[0].dealerInPercent == 0 ? financialOrderDetailInfo.tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue : (financeWorkbenchInfo.salesPrice * financialOrderDetailInfo.tDetailIntersubsidyInfoList[0].dealerIntersubsidyValue).toFixed(2))
                financeWorkbenchInfo.financeInPercent = financialOrderDetailInfo.tDetailIntersubsidyInfoList[0].isPercent
                financeWorkbenchInfo.financeSubsidyInterest = parseFloat(financialOrderDetailInfo.tDetailIntersubsidyInfoList[0].isPercent == 0 ? financialOrderDetailInfo.tDetailIntersubsidyInfoList[0].intersubsidyValue : (financeWorkbenchInfo.salesPrice * financialOrderDetailInfo.tDetailIntersubsidyInfoList[0].intersubsidyValue).toFixed(2))
            }
            financeWorkbenchInfo.valueOfLoan = (parseFloat(financeWorkbenchInfo.salesPrice) - parseFloat(financeWorkbenchInfo.downPaymentAmount)).toFixed(2)
            if (parseFloat(financeWorkbenchInfo.taxRate) >= 0 && parseInt(financeWorkbenchInfo.cycleMonth) > 1) {
                let rateMonth = parseFloat(financeWorkbenchInfo.taxRate / 100) / 12
                let cycleMonth = parseFloat(financeWorkbenchInfo.cycleMonth)
                let rateType = financeWorkbenchInfo.rateType
                let valueOfLoan = (parseFloat(financeWorkbenchInfo.salesPrice) - parseFloat(financeWorkbenchInfo.downPaymentAmount) - parseFloat(financeWorkbenchInfo.balancePaymentValue)).toFixed(2)
                if (rateMonth == 0 && rateType == config.financePro.rateType.interest) {
                    financeWorkbenchInfo.payForMonth = (valueOfLoan / cycleMonth).toFixed(2)
                } else if (rateMonth > 0 && rateType == config.financePro.rateType.interest) {
                    financeWorkbenchInfo.payForMonth = ((valueOfLoan * rateMonth * Math.pow((1 + rateMonth), cycleMonth) / (Math.pow((1 + rateMonth), cycleMonth) - 1)) + financeWorkbenchInfo.balancePaymentValue * rateMonth).toFixed(2)
                } else {
                    financeWorkbenchInfo.payForMonth = (valueOfLoan / cycleMonth + (valueOfLoan * rateMonth * 12 / cycleMonth)).toFixed(2)
                }
            }
            commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_INFO, {
                financeWorkbenchInfo
            })
        }
    })
}

export const commitFinanceHistoryInfo = ({ dispatch, commit, state }, params) => {
    let financeWorkbenchInfo = params
    dispatch('getSalesPrice', {
        orderNo: financeWorkbenchInfo.orderNo, callback: (salesPrice) => {
            financeWorkbenchInfo.actualSalesPrice = salesPrice
            financeWorkbenchInfo.actualServiceFee = state.financeWorkbenchData.actualServiceFee
            commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_BENCH_INFO, {
                financeWorkbenchInfo
            })
        }
    })
}

export const getSalesPrice = ({ dispatch, commit, state }, params) => {
    api.order.getCarOrderInfoByOrderNo(params, (res) => {
        if (res.data.code === 'success') {
            let salesPrice = parseFloat(res.data.obj.carOrderDetailInfoList[0].actualSalesPrice)
            params.callback(salesPrice)
        }
    })
}

export const getFinanceCustomCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.financeWorkbench.finanCustomInfo.sequence }
    api.ordinalInfo.getSequence(newParams, (res) => {
        if (res.data.code === 'success') {
            let financeCustomCode = res.data.obj
            params.callback(financeCustomCode)
        }
    })
}

export const getCustomCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.client.clientmaininfosequence }
    api.ordinalInfo.getSequence(newParams, (res) => {
        if (res.data.code === 'success') {
            let customCode = res.data.obj
            params.callback(customCode)
        }
    })
}

export const getFinanceWorkbenchTrackCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.financeWorkbench.financeWorkbenchTrackInfo.sequence }
    api.ordinalInfo.getSequence(newParams, (res) => {
        if (res.data.code === 'success') {
            let trackCode = res.data.obj
            params.callback(trackCode)
        }
    })
}

// 贷款客户联系资料保存
export const insertFinanCustomInfo = ({ dispatch, commit, state }, params) => {
    dispatch('getFinanceCustomCode', {
        callback: (financeCustomCode) => {
            dispatch('getCustomCode', {
                callback: (customCode) => {
                    params.customCode = customCode
                    params.financeWorkbenchCode = state.financeWorkbenchData.financeWbCode
                    params.financeCustomCode = financeCustomCode
                    params.wbRootCode = state.financeWorkbenchData.wbRootCode
                    params.financialOrderNo = state.financeWorkbenchData.financialOrderNo;
                    params.orderNo = state.financeWorkbenchData.orderNo;
                    api.finWorkbench.finanCustomInfo.editFinanceTrackCustomerInfo(params, (res) => {
                        if (res.data.code === 'success') {
                            let customInfo = res.data.obj;
                            if (customInfo) {
                                commit(types.FINANCE_WORK_BENCH_GET_FINANCE_WORK_CUSTOM_INFO, {
                                    customInfo
                                })
                            }
                            params.callback()
                        }
                    })
                }
            })
        }
    })
}

export const getCarOrderActualPriceList = ({ commit }, params) => {
    api.finWorkbench.queryCarOrderActualPriceList(params, (res) => {
        if (res.data.code === 'success') {
            let obj = res.data.obj
            if (obj != null) {
                params.callback(obj)
            }
        }
    })
}

export const getUserAvailableInfo = ({ commit }, params) => {
    api.getUserAvailableInfo((res) => {
        if (res.data.code === 'success') {
            let storeInfo = res.data.obj.storeInfoVo
            let availableType = res.data.obj.availableType
            params.callback(storeInfo, availableType)
        }
    })
}
