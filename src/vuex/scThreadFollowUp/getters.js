export const allChannels = (state) => {
    let channels = state.channels
    let newChannels = JSON.parse(JSON.stringify(channels))
    newChannels.push({
        value: "",
        text: "全部"
    })
    return newChannels;
}

export const filterSCList = (state) => {
    let scs = state.scs
    let scName = state.scNameInput
    let newSCs = []
    scs.forEach(element => {
        let op = element.text
        if (op.includes(scName)) {
            newSCs.push(element)
        }
    });
    return newSCs;
}


export const dataList = (state) => {
    // 9：报价 1：意向单 2：订单 3：合同 4：开票 5： 交车 0：退订
    let leadKeys = [
        "keep_count",//保留线索
        "individual_leads_count",//新增散客
        "unIndividual_leads_count",//新增非散客
        "intoStore_count",  //进店
        "trialDrive_count",//试乘试驾
        "scDefeat_count",//准战败
    ]
    let orderKeys = [
        "9",//报价
        // "1",//意向单
        "9999",//订单
        // "3",//合同
        "0",//退订
        "4",//开票
        "5",//交车
    ]
    let param = state.param
    let channels = state.channels
    let scs = state.scs
    let storeName = param.store
    let leadsList = state.leadsList
    let orderList = state.orderList
    let modeType = param.modeType
    let dataList = []
    let year = parseInt(param.year)
    let month = parseInt(param.month)
    var date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    if ((year !== NaN && month !== NaN && currentYear === year && month > currentMonth) || currentYear < year) {
        return []
    } else {
        let scName = param.sc !== "" ? param.sc : "全部"
        let channelName = "全部"
        if (param.channel !== "") {
            let chCode = param.channel
            channels.forEach(element => {
                if (chCode === element.value) {
                    channelName = element.text
                }
            })
        }
        if ((orderList === undefined || orderList === null || Object.keys(orderList).length === 0)
            && (leadsList === undefined || leadsList === null || Object.keys(leadsList).length === 0)) {
            //暂无数据
            // 搜单月无数据全显示0
            if (param.month !== "") {
                let object = {
                    store: storeName,
                    year: param.year,
                    month: param.month,
                    scName: scName,
                    channel: channelName
                }
                orderKeys.forEach(element => {
                    let keyStr = "order" + element
                    object[keyStr] = 0
                })
                leadKeys.forEach(element => {
                    object[element] = 0
                })
            }
        } else {
            if (param.month === "") {
                for (let i = 0; i < 12; i++) {
                    let object = {
                        store: storeName,
                        year: param.year,
                        month: "",
                        scName: scName,
                        channel: channelName,
                    }
                    let mStr = i + 1 > 9 ? (i + 1) + "" : "0" + (i + 1)
                    object.month = mStr
                    orderKeys.forEach(element => {//循环线索KEY
                        let keyStr = "order" + element
                        if (orderList !== undefined && orderList !== null && orderList !== {}) {
                            let oList = orderList[element] //取到相应KEY的数组
                            if (oList !== undefined && oList !== {}) {
                                let arr = oList.length !== undefined && oList.length > 0 ? oList : []
                                if (arr.length > 0) {
                                    let noMonth = true;
                                    arr.forEach(e => {
                                        if (e.dateVersion !== undefined && e.dateVersion.length > 2) {
                                            let dateStr = e.dateVersion
                                            let monthStr = dateStr.substring(dateStr.length - 2, dateStr.length)
                                            if (monthStr === mStr) {
                                                object[keyStr] = e.count !== undefined ? e.count : 0
                                                noMonth = false
                                            }
                                        }
                                    });
                                    if (noMonth) {
                                        object[keyStr] = 0
                                    }
                                } else {
                                    object[keyStr] = 0
                                }
                            } else {
                                object[keyStr] = 0
                            }
                        } else {
                            object[keyStr] = 0
                        }
                    });
                    leadKeys.forEach(element => {
                        if (leadsList !== undefined && leadsList !== null && leadsList !== {}) {
                            let lList = leadsList[element]//取到相应KEY的数组
                            if (lList !== undefined && lList !== {}) {
                                let arr = lList.length !== undefined && lList.length > 0 ? lList : []
                                if (arr.length > 0) {
                                    let noMonth = true;
                                    arr.forEach(e => {
                                        if (e.dateVersion !== undefined && e.dateVersion.length > 2) {
                                            let dateStr = e.dateVersion
                                            let monthStr = dateStr.substring(dateStr.length - 2, dateStr.length)
                                            if (monthStr === mStr) {

                                                object[element] = e.count !== undefined ? e.count : 0
                                                noMonth = false
                                            }
                                        }
                                    });
                                    if (noMonth) {
                                        object[element] = 0
                                    }
                                } else {
                                    object[element] = 0
                                }
                            } else {
                                object[element] = 0
                            }
                        } else {
                            object[element] = 0
                        }
                    });
                    dataList.push(object)
                }
            } else {
                if (modeType == 1) {//查ALL时
                    /* 1、根据sccode 和 表头key打平数据
                    2、再根据sccode 去重合并数据 
                    3、拿到两个接口返回并处理好的数据再根据sccode对比合并 */
                    let orderArr = []
                    orderKeys.forEach(element => {//循环线索KEY
                        let keyStr = "order" + element
                        if (orderList !== undefined && orderList !== null && orderList !== {}) {
                            let oList = orderList[element] //取到相应KEY的数组
                            if (oList !== undefined && oList !== {}) {
                                let arr = oList.length !== undefined && oList.length > 0 ? oList : []
                                if (arr.length > 0) {
                                    arr.forEach(e => {
                                        let operator = {
                                            operatorCode: e.operatorCode,
                                            operatorName: e.operatorName
                                        }
                                        operator[keyStr] = e.count
                                        orderArr.push(operator)
                                    });
                                }
                            }
                        }
                    });
                    let operatorCodeArr1 = []//operatorCode数组，去重
                    let operatorArr1 = []
                    orderArr.forEach(element => {
                        let operatorCode = element.operatorCode
                        let index = operatorCodeArr1.indexOf(operatorCode)
                        if (index == -1) {
                            operatorCodeArr1.push(operatorCode)
                            operatorArr1.push(element);
                        } else {
                            operatorArr1.forEach((op, index) => {
                                if (op.operatorCode == element.operatorCode) {
                                    operatorArr1[index] = {
                                        ...op,
                                        ...element
                                    }
                                }
                            });
                        }
                    });

                    console.log("订单数组：" + JSON.stringify(operatorArr1))

                    let leadsArr = []
                    leadKeys.forEach(element => {
                        if (leadsList !== undefined && leadsList !== null && leadsList !== {}) {
                            let lList = leadsList[element]//取到相应KEY的数组
                            if (lList !== undefined && lList !== {}) {
                                let arr = lList.length !== undefined && lList.length > 0 ? lList : []
                                if (arr.length > 0) {
                                    arr.forEach(e => {
                                        let operator = {
                                            operatorCode: e.operatorCode,
                                            operatorName: e.operatorName
                                        } 
                                        operator[element] = e.count
                                        leadsArr.push(operator)
                                    });
                                }
                            }
                        }
                    });

                    let operatorCodeArr2 = []//operatorCode数组，去重
                    let operatorArr2 = []
                    leadsArr.forEach(element => {
                        let operatorCode = element.operatorCode
                        let index = operatorCodeArr2.indexOf(operatorCode)
                        if (index == -1) {
                            operatorCodeArr2.push(operatorCode)
                            operatorArr2.push(element);
                        } else {
                            operatorArr2.forEach((op, index) => {
                                if (op.operatorCode == element.operatorCode) {
                                    operatorArr2[index] = {
                                        ...op,
                                        ...element
                                    }
                                }
                            });
                        }
                    });

                    console.log("线索数组：" + JSON.stringify(operatorArr2))

                    let object = {
                        store: storeName,
                        year: param.year,
                        month: param.month,
                        channel: channelName,
                    }
                    operatorArr2.forEach(leadsOperator => {
                        let leadsOperatorCode = leadsOperator.operatorCode
                        let index = operatorArr1.findIndex((item) => {
                            return leadsOperatorCode == item.operatorCode
                        })
                        if (index > 0) {
                            let orderOperator = operatorArr1[index] 
                            let result = {
                                ...object,
                                ...orderOperator,
                                ...leadsOperator,
                                scName: orderOperator.operatorName
                            }
                            dataList.push(result)
                        } else {
                            let result = {
                                ...object,
                                ...leadsOperator,
                                scName: leadsOperator.operatorName
                            }
                            dataList.push(result)
                        }
                    })
                    let reg = /^\d+$/;
                    dataList.forEach((data, index) => {
                        orderKeys.forEach(orderKey => {
                            let x = data
                            if(!reg.test(x["order" + orderKey])) {
                                x["order" + orderKey] = 0;
                            }
                            dataList[index] = x
                        });
                        leadKeys.forEach(leadsKey => {
                            let y = data
                            if(!reg.test(y[leadsKey])) {
                                y[leadsKey] = 0;
                            }
                            dataList[index] = y
                        });
                    })
                } else {
                    let object = {
                        store: storeName,
                        year: param.year,
                        month: param.month,
                        scName: scName,
                        channel: channelName,
                    }
                    orderKeys.forEach(element => {
                        let keyStr = "order" + element
                        if (orderList !== undefined && orderList !== null && orderList !== {}) {
                            let list = orderList[element]
                            if (list !== undefined) {
                                let value = list[0] ? list[0] : {}
                                if (value.count !== undefined) {
                                    object[keyStr] = value.count
                                } else {
                                    object[keyStr] = 0
                                }
                            } else {
                                object[keyStr] = 0
                            }
                        } else {
                            object[keyStr] = 0
                        }
                    });
                    leadKeys.forEach(element => {
                        if (leadsList !== undefined && leadsList !== null && leadsList !== {}) {
                            let list = leadsList[element]
                            if (list !== undefined) {
                                let value = list[0] ? list[0] : {}
                                if (value.count !== undefined) {
                                    object[element] = value.count
                                } else {
                                    object[element] = 0
                                }
                            } else {
                                object[element] = 0
                            }
                        } else {
                            object[element] = 0
                        }
                    });
                    dataList.push(object)
                }
            }
        }
        return dataList
    }
}