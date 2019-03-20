export const crmMap = (state) => {
    let map = state.crmFollowUpConditionMap
    let arr = Object.keys(state.crmFollowUpConditionMap)
    let length = arr.length;
    if (length > 0) {
        let crmMap = {};
        var newArr = new Array();
        arr.forEach(function (e) {
            /* 
            两位数的key 处理方式
            var str1 = e[0];
            switch (parseInt(str1)) {
                case 1:
                    newArr[newArr.length] = parseInt(e);
                    break;
                case 0:
                    newArr[newArr.length] = parseInt(e[1]);
                    break;
            } */

            //自然数处理方式
            newArr[newArr.length] = parseInt(e);
        });

        newArr.sort((a, b) => a - b)
        newArr.forEach(function (e) {
            let index = new String(e)
            /* 两位数的key 处理方式
            if (e > 9) {
                crmMap[index] = map[index]
            } else {
                crmMap[index] = map["0" + index]
            } */
            //自然数处理方式
            crmMap[index] = map[index]
        });
        return crmMap;
    } else {
        return {};
    }
}

//暂时隐藏全部
/* export const allTypes = (state) => {
    let types = state.taskTypes
    let newTypes = JSON.parse(JSON.stringify(types))
    newTypes.push({
        value: "",
        text: "全部"
    })
    return newTypes;
} */

export const crmKeys = (state, getters) => {
    let newKeys = new Array();
    let keys = Object.keys(getters.crmMap)
    return keys;
}

export const typeStr = (state, getters) => {
    let pa = state.param
    // let allTypes = getters.allTypes
    let allTypes = state.taskTypes
    let typeCode = pa.taskTypeCode
    let type = ""
    allTypes.forEach(function (e) {
        if (e.value === typeCode) {
            type = e.text
        }
    });
    return type;
}


export const storeName = (state) => {
    let pa = state.param
    let storeName = pa.storeName
    return storeName;
}


export const crmName = (state, getters) => {
    let taskOperators = state.taskOperators
    let param = state.param
    let crmCode = param.taskOperatorCode
    let crmName = "全部"
    taskOperators.forEach(element => {
        if (crmCode === element.value) {
            crmName = element.text
        }
    });
    return crmName;
}


export const filterCRMList = (state, getters) => {
    let taskOperators = state.taskOperators
    let operator = state.operator
    let newOperators = []
    taskOperators.forEach(element => {
        let op = element.text
        if (op.includes(operator)) {
            newOperators.push(element)
        }
    });
    return newOperators;
}

// export const name = (state, getters) => {
//     let newKeys = new Array();
//     let keys = Object.keys(getters.crmMap)
//     console.log("11111111:" + JSON.stringify(keys))
//     return keys;
// }


// export const crmTypes = (state) => {
//     let types = state.crmConditionTypes
//     console.log("6666666:" + JSON.stringify(types))
//     return types;
// }


export const isCRMEmpty = (state, getters) => {
    let keys = getters.crmKeys
    let map = getters.crmMap
    let result = true;
    keys.forEach(function (e) {
        let arr = map[e]
        if (arr.length > 0) {
            result = false;
        }
    });
    return result
}

export const dataList = (state, getters) => {
    console.log("dataList start" )
    let operators = state.taskOperators
    let name = "";
    let code = "";
    let param = state.param
    let year = param.crmYear
    let month = param.crmMonth
    var date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    if (month !== undefined && month > 0 && currentYear === year && month > currentMonth) {
        return []
    } else {
        if (param.taskOperatorCode) {
            operators.forEach(function (e) {
                if (e.value === param.taskOperatorCode) {
                    name = e.text
                    code = e.value
                }
            });
        }

        let types = state.crmConditionTypes
        let dataList = [];
        let map = getters.crmMap
        let keys = getters.crmKeys

        let totalList = []
        let preList = []
        totalList[0] = "本月新增调研数"
        preList[0] = "往期调研未完成数"
        for (var index = 0; index < keys.length; index++) {
            let key = keys[index]
            let arr = map[key]
            if (arr.length > 0) {
                let noType = true
                arr.forEach(function (e) {
                    if (e.taskOperatorCode === "*" && e.crmConditionTypeName === null) {
                        // totalList[index + 1] = e.targetTotalCusumer === null ? "0" : e.targetTotalCusumer + ""
                        // preList[index + 1] = e.pastTargetTotalCusumer === null ? "0" : e.pastTargetTotalCusumer + ""
                        totalList[index + 1] = e.targetTotalTask === null ? "0" : e.targetTotalTask + ""
                        preList[index + 1] = e.pastTargetTotalTask === null ? "0" : e.pastTargetTotalTask + ""
                        noType = false
                    }
                });
                if (noType) {
                    totalList[index + 1] = "0"
                    preList[index + 1] = "0"
                }
            } else {
                totalList[index + 1] = "0"
                preList[index + 1] = "0"
            }

        }
        dataList[0] = totalList
        dataList[1] = preList
        for (var i = 0; i < types.length; i++) {
            let rowList = [];
            let type = types[i]
            //需求调整，不显示具体调研人任务数量
            // rowList[0] = type.text + "数"
            /* for (var index = 0; index < keys.length; index++) {
                let key = keys[index]
                let arr = map[key]
                if (arr.length > 0) {
                    let noType = true
                    arr.forEach(function (e) {
                        if (e.taskOperatorCode === "*" && e.crmConditionTypeCode === type.value) {
                            rowList[index + 1] = e.targetTotalTask === null ? "0" : e.targetTotalTask + ""
                            noType = false
                        }
                    });
                    if (noType) {
                        rowList[index + 1] = "0"
                    }
                } else {
                    rowList[index + 1] = "0"
                }
            }
    
            dataList[dataList.length] = rowList */


            /* if (name) {
                let rowChildList = [];
                rowChildList[0] = name
                for (var index = 0; index < keys.length; index++) {
                    let key = keys[index]
                    let arr = map[key]
                    if (arr.length > 0) {
                        let noType = true
                        arr.forEach(function (e) {
                            if (e.taskOperatorCode === code && e.crmConditionTypeCode === type.value) {
                                rowChildList[index + 1] = e.targetTotalTask === null ? "0" : e.targetTotalTask + ""
                                noType = false
                            }
                        });
                        if (noType) {
                            rowChildList[index + 1] = "0"
                        }
                    } else {
                        rowChildList[index + 1] = "0"
                    }
    
                }
                dataList[dataList.length] = rowChildList
            } */

            if (name) {
                let rowChildList = [];
                // rowChildList[0] = name
                rowChildList[0] = type.text + "数"
                for (var index = 0; index < keys.length; index++) {
                    let key = keys[index]
                    let arr = map[key]
                    if (arr.length > 0) {
                        let noType = true
                        arr.forEach(function (e) {
                            if (e.taskOperatorCode === code && e.crmConditionTypeCode === type.value) {
                                rowChildList[index + 1] = e.targetTotalTask === null ? "0" : e.targetTotalTask + ""
                                noType = false
                            }
                        });
                        if (noType) {
                            rowChildList[index + 1] = "0"
                        }
                    } else {
                        rowChildList[index + 1] = "0"
                    }
                }
                dataList[dataList.length] = rowChildList
            } else {

                rowList[0] = type.text + "数"
                for (var index = 0; index < keys.length; index++) {
                    let key = keys[index]
                    let arr = map[key]
                    if (arr.length > 0) {
                        let noType = true
                        arr.forEach(function (e) {
                            if (e.taskOperatorCode === "*" && e.crmConditionTypeCode === type.value) {
                                rowList[index + 1] = e.targetTotalTask === null ? "0" : e.targetTotalTask + ""
                                noType = false
                            }
                        });
                        if (noType) {
                            rowList[index + 1] = "0"
                        }
                    } else {
                        rowList[index + 1] = "0"
                    }
                }
                dataList[dataList.length] = rowList
            }
        }
        return dataList;
    }
}




