import api from 'common/api'
import config from 'common/config'
import * as types from './mutation-types'

export const getTaskTypes = ({ commit }) => 
{
    let params = { 'refCode': config.addclientmain.channelCode
    }
    api.ref.getDataDictionary(params).then((res) => 
        {  
            if (res.data.code === 'success'){
                let referenceDetailInfos = res.data.obj.referenceDetailInfos
                let options = [{text: '全部',value: ''}];
                referenceDetailInfos.forEach((element) => {
                    if(element.refDetailName === '散客' 
                    || element.refDetailName === '活跃'
                    || element.refDetailName === '休眠'){
                        return;
                    }
                    options.push({
                        text: element.refDetailName,
                        value: element.refDetailCode
                    })
                });
                commit(types.DCC_FOLLOW_UP_GET_SUPPLIER_TYPES, options)    
            }
        })
}

export const getDccChannelList = ({ commit, state },params) => {
    let modeType = params.modeType
    let par = {
                'storeCodes': params.storeCodeSet, 
                'yearStr': params.dccYear.toString(),
                'monthStr': params.dccMonth.toString(),
                'channelCode': params.taskTypeCode,
                'operatorName': params.currentTaskOperatorName,
                'postType': '0',
                'modeType': modeType
            }
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let parYear = Number.parseInt(par['yearStr']) ;
    let parMonth = Number.parseInt(par['monthStr']);
    let monthArr = []
    // 处理月份
    if(par.monthStr.length == 0){
        // 没有选择月份
        
        for (var i = 1; i <= 12; i++){
            var monstr = par.yearStr + '年' + i + '月'
            monthArr.push(monstr);
        }
    }else {
        //选择了月份
        var monstr = par.yearStr + '年' + par.monthStr + '月'
        monthArr.push(monstr)
    }
    commit(types.TOTAL_MONTH,monthArr)
    if(parYear > currentYear){
        commit(types.DCC_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST, []);
        return;
    }
    if(parYear == currentYear && parMonth > currentMonth){
        commit(types.DCC_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST, []);
        return;
    }
    
    commit(types.DCC_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST, [])
    let _this = this;
    api.dcc.queryDccChannelThreadList(par).then( (res) => {
        // dcc 列表 上部分
        let datalist = []
        if (res.data.code === 'success'){
            let obj = res.data.obj
            var channelName = '全部'
            if(params.taskTypeCode.length === 0){
                channelName = '全部'
            }else {
                state.DCCSupplyTypes.forEach(element => {
                    if(element.value === params.taskTypeCode){
                        channelName = element.text
                        console.log(channelName)
                    }
                })
            }
            if (par.monthStr.length !== 0){
                //选月
                if(modeType == 1) {
                    getDccChannelListBottom({commit, state}, params, channelName, obj, datalist);
                    return;
                }else {
                    var titleArray = [
                        {
                            'keepLeadsCount': `渠道：${channelName}`
                        },
                        {
                            'keepLeadsCount': '数量'
                        }
                    ];
                    datalist.push(titleArray);
                    // 新增名单 + 线索
                    var newLeadsArray = obj['new_leads_count'];
                    dealWithSelectMonth(newLeadsArray, '新增线索+名单',datalist); 
                    // 新增无效线索
                    var invalidArray = obj['invalid_leads_count'];
                    dealWithSelectMonth(invalidArray,'新增无效线索',datalist);
                    // 保有线索总数
                    var keepCountArray = obj['keep_count'];
                    dealWithSelectMonth(keepCountArray, '保有线索总数', datalist);
                    // 预约成功
                    var appointmentArray = obj['appointment_count'];
                    dealWithSelectMonth(appointmentArray, '预约成功线索', datalist);
                    // 进店线索
                    var intoStoreArray = obj['intoStore_count'];
                    dealWithSelectMonth(intoStoreArray, '进店线索', datalist);
                    // 试乘试驾
                    var trialDriveCountArray = obj['trialDrive_count'];
                    dealWithSelectMonth(trialDriveCountArray, '试乘试驾线索数', datalist)
                    //SC准战败数
                    var scDefeatArray = obj['scDefeat_count'];
                    dealWithSelectMonth(scDefeatArray, 'SC准战败数', datalist);
                }
            }else {
                //没选月
                // 标题
                var titleArray = [
                    {
                        'keepLeadsCount': `渠道：${channelName}`
                    }
                ];
                for(var i = 1; i <= 12; i++){
                    titleArray.push({
                        'keepLeadsCount': '数量'
                    });
                }
                datalist.push(titleArray);

                 // 新增名单 + 线索
                 var newLeadsArray = obj['new_leads_count'];
                 if(newLeadsArray.length === 0){
                     // 没有任何数据
                     let array = [];
                     array.push({
                         'keepLeadsCount': '新增名单+线索',
                     })
                     for(var i = 1; i <= 12; i++ ){
                         array.push({
                             'keepLeadsCount': '0',
                         });
                     }
                     datalist.push(array);
                 }else{
                     let newArray = [];
                     newArray.push({
                         'keepLeadsCount': '新增名单+线索',
                     })
                     for(var i = 1; i <= 12; i++ ){
                         newArray.push({
                             'keepLeadsCount': '0',
                         });
                     }
                     newLeadsArray.forEach((item,index,array)=>{
                         var monthIndex = item.dateVersion.slice(5);
                         var element = newArray[parseInt(monthIndex)];
                         element.keepLeadsCount = item.count;
                     })
                     datalist.push(newArray);
                 }
                // 新增无效线索
                var invalidArray = obj['invalid_leads_count'];
                dealWithNoSelectMonth(invalidArray, '新增无效线索', datalist)
                // 保有线索总数
                var keepCountArray = obj['keep_count'];
                dealWithNoSelectMonth(keepCountArray, '保有线索总数', datalist);
                // 预约成功线索
                var appointmentArray = obj['appointment_count'];
                dealWithNoSelectMonth(appointmentArray, '预约成功线索', datalist);
                // 进店线索
                var intoStoreArray = obj['intoStore_count'];
                dealWithNoSelectMonth(intoStoreArray, '进店线索', datalist);
                // 试乘试驾数
                var trialDriveCountArray = obj['trialDrive_count'];
                dealWithNoSelectMonth(trialDriveCountArray, '试乘试驾线索数', datalist)
                // SC准战败数
                var scDefeatArray = obj['scDefeat_count'];
                dealWithNoSelectMonth(scDefeatArray, 'SC准战败数', datalist)
            }
            getDccChannelListBottom({commit, state}, params, channelName, obj, datalist);  
        }else {
            commit(types.DCC_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST, datalist)
        }
    })
}

export const getDccChannelListBottom = ({ commit, state}, params, channelName, leadsObj, datalist) => {
    let modeType = params.modeType
    let par = {
        'storeCodes': params.storeCodeSet, 
        'yearStr': params.dccYear.toString(),
        'monthStr': params.dccMonth.toString(),
        'channelCode': params.taskTypeCode,
        'operatorName': params.currentTaskOperatorName,
        'postType': '0',
        'modeType': modeType,
    }
    let dccList = state.allDcc
    // var datalist = [];
    api.dcc.queryDCCChannelThreadListBottom(par).then( (res) => {
        if(res.data.code === 'success'){
            let obj = res.data.obj
            if(par.monthStr.length !== 0){
                if(modeType == 1) {
                    if(!dccList) {
                        commit(types.DCC_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST, datalist)
                        return;
                    }
                    //汇总所有dcc到operatorArr数组
                    let leadsKeys = [
                        {
                            value : "new_leads_count",
                            text : "新增线索+名单"
                        },
                        {
                            value : "invalid_leads_count",
                            text : "新增无效线索"
                        },
                        {
                            value : "keep_count",
                            text : "保有线索总数"
                        },
                        {
                            value : "appointment_count",
                            text : "预约成功线索"
                        },
                        {
                            value : "intoStore_count",
                            text : "进店线索"
                        },
                        {
                            value : "trialDrive_count",
                            text : "试乘试驾线索数"
                        },
                        {
                            value : "scDefeat_count",
                            text : "SC准战败数"
                        },
                    ]
                    let orderKeys = [
                        {
                            value : "9",
                            text : "报价数"
                        },
                        {
                            value : "2",
                            text : "订单数"
                        },
                        {
                            value : "1",
                            text : "意向单"
                        },
                        // {
                        //     value : "3",
                        //     text : "合同数"
                        // },
                        {
                            value : "0",
                            text : "退订数"
                        },
                        {
                            value : "4",
                            text : "开票数"
                        },
                        {
                            value : "5",
                            text : "交车数"
                        },
                    ]
                    let operatorArr = []
                    leadsKeys.forEach(key => {
                        let arr = leadsObj[key.value]
                        if(Array.isArray(arr) && arr.length > 0) {
                            arr.forEach(o => {
                                operatorArr.push({
                                    operatorCode : o.operatorCode,
                                    operatorName : o.operatorName
                                })
                            });
                        }
                    });
                    orderKeys.forEach(key => {
                        let arr = obj[key.value]
                        if(Array.isArray(arr) && arr.length > 0) {
                            arr.forEach(o => {
                                operatorArr.push({
                                    operatorCode : o.operatorCode,
                                    operatorName : o.operatorName
                                })
                            });
                        }
                    });

                    //去重
                    let tempArr = []
                    let newOperatorArr =[]
                    operatorArr.forEach(op => {
                        dccList.forEach(dcc => {
                            if(dcc && dcc.empCode === op.operatorCode && tempArr.indexOf(op.operatorCode) == -1) {
                                tempArr.push(op.operatorCode)
                                newOperatorArr.push(op)
                            }
                        });
                    });
                    
                    if(newOperatorArr.length <= 0) {
                        commit(types.DCC_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST, datalist)
                        return;
                    }else {
                        //重新commit 表头 月份
                        let monthArr = []
                        for (var i = 1; i <= newOperatorArr.length; i++){
                            var monstr = par.yearStr + '年' + par.monthStr + '月'
                            monthArr.push(monstr);
                        }
                        commit(types.TOTAL_MONTH,monthArr)
                        //根据operatorArr的项当做表格的列拼数据（字段：keepLeadsCount）
                        let names = []
                        newOperatorArr.forEach(operator => {
                            names.push({'keepLeadsCount': operator.operatorName})
                        });
                        names.unshift({'keepLeadsCount': `渠道：${channelName}`})
                        datalist.push(names)
                        dealAllTypeArr(leadsObj, leadsKeys, newOperatorArr, datalist)
                        dealAllTypeArr(obj, orderKeys, newOperatorArr, datalist)
                    }
                }else {
                    // 报价数
                    var quotedPriceArray = obj['9'];
                    dealWithSelectMonth(quotedPriceArray, '报价数', datalist)  
                    // 订单数
                    var ordersArray = obj['9999'];
                    dealWithSelectMonth(ordersArray, '订单数', datalist);
                    // 意向单
                    // var intentions = obj['1'];
                    // dealWithSelectMonth(intentions, '意向单', datalist); 
                    //合同数
                    // var contractArray = obj['3'];
                    // dealWithSelectMonth(contractArray, '合同数', datalist);
                    //退订数
                    var unsubscribeArray = obj['0'];
                    dealWithSelectMonth(unsubscribeArray, '退订数', datalist);
                    // 开票数
                    var onTicketsArray = obj['4']
                    dealWithSelectMonth(onTicketsArray, '开票数', datalist);   
                    // 交车数
                    var handleCarArray = obj['5']
                    dealWithSelectMonth(handleCarArray, '交车数', datalist);
                }
            }else{
                //没选月
                // 报价数
                var quotedPriceArray = obj['9'];
                dealWithNoSelectMonth(quotedPriceArray, '报价数', datalist)    
                //订单数
                var orders = obj['9999'];
                dealWithNoSelectMonth(orders, '订单数', datalist)
                // 意向单
                // var intentions = obj['1'];
                // dealWithNoSelectMonth(intentions, '意向单', datalist)
                //合同数
                // var hetongsArray = obj['3'];
                // dealWithNoSelectMonth(hetongsArray, '合同数', datalist)
                //退订数
                var tuiDingArray = obj['0'];
                dealWithNoSelectMonth(tuiDingArray, '退订数', datalist)
                // 开票数
                var kaiPiaoArray = obj['4'];
                dealWithNoSelectMonth(kaiPiaoArray, '开票数', datalist);
                // 交车数
                var jiaoCheShuArray = obj['5'];
                dealWithNoSelectMonth(jiaoCheShuArray, '交车数', datalist)
            }
            // 将意向单和 订单数合并
            // var dingDanArray = datalist[9];
            // var yixiangArray = datalist[10];
            // var dingDanTempArray = []; 
            // dingDanArray.forEach((element, index, datalist)=> {
            //     if (index > 0){
            //         var item = yixiangArray[index];
            //         element.keepLeadsCount = parseInt(element.keepLeadsCount) + parseInt(item.keepLeadsCount)
            //     }
            //     dingDanTempArray.push(element);
            // })
            // datalist.splice(9, 2, dingDanTempArray);
            commit(types.DCC_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST, datalist) 
        }else {
            commit(types.DCC_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST, []) 
        }
    } )
}
// 店员信息
export const getDccSpecialist = ({ commit }, params) => {
    params.postnTypeCodes = [config.postnTypeCode.dccManager, config.postnTypeCode.dcc]
    api.emp.queryEmpByStoreCode(params, (res) => {
        if (res.data.code === 'success') {
            let list = res.data.obj
            commit(types.ALL_DCC, list)
            let options = []
            if (list != null) {
                options.unshift({
                    value: 'All',
                    text: 'All'
                })
                list.forEach((item) => {
                    options.push({
                        value: item.empCnName,
                        text: item.empCnName
                    })
                })
                commit(types.DCC_FOLLOW_UP_GET_SPECIALIST, options)
                commit(types.DCC_FOLLOW_UP_FILTER_SPECIALIST, options) 
            }   
        } 
    }) 
}
// 筛选店员
export const dealWithDccName= ({commit, state}, dccName)=>{

    if(dccName.length === 0){
        commit(types.DCC_FOLLOW_UP_FILTER_SPECIALIST, state.DccSpecialList)
    }else{
        let taskOperators = state.DccSpecialList
        let newOperators = []
        taskOperators.forEach(element => {
            let op = element.text
            if (op.includes(dccName)) {
                newOperators.push(element)
            }
        });
        commit(types.DCC_FOLLOW_UP_FILTER_SPECIALIST,newOperators)
    }   
}
// 没选月
const dealWithNoSelectMonth = (aimArray, rowTitle, datalist) => {
    if(Array.isArray(aimArray)){
        if(aimArray.length === 0){
            // 没有任何数据
            let array = [];
            array.push({
                'keepLeadsCount': rowTitle,
            })
            for(var i = 1; i <= 12; i++ ){
                array.push({
                    'keepLeadsCount': '0',
                });
            }
            datalist.push(array);
        }else{
            let newArray = [];
            newArray.push({
                'keepLeadsCount': rowTitle,
            })
            for(var i = 1; i <= 12; i++ ){
                newArray.push({
                    'keepLeadsCount': '0',
                });
            }
            aimArray.forEach((item,index,array)=>{
                var monthIndex = item.dateVersion.slice(5);
                var element = newArray[parseInt(monthIndex)];
                element.keepLeadsCount = item.count;
            })
            datalist.push(newArray);
        }
    }else{
         // 没有任何数据
         let array = [];
         array.push({
             'keepLeadsCount': rowTitle,
         })
         for(var i = 1; i <= 12; i++ ){
             array.push({
                 'keepLeadsCount': '0',
             });
         }
         datalist.push(array);
    }
}

// 选月的情况
const dealWithSelectMonth = (aimArray,rowTitle,datalist) => {
    if(Array.isArray(aimArray)){
        if(aimArray.length === 0){
          // 没有任何数据
          var newArray = [{
              'keepLeadsCount': rowTitle,
          },{
              'keepLeadsCount': '0',
          }];
          datalist.push(newArray);
      }else{
              var newArray = [{
                  'keepLeadsCount': rowTitle,
              },{
                  'keepLeadsCount':`${aimArray[0].count}`
              }]
            datalist.push(newArray);
      }
    }else {
        // 没有任何数据
        var newArray = [{
            'keepLeadsCount': rowTitle,
        },{
            'keepLeadsCount': '0',
        }];
        datalist.push(newArray);
    }
}

const dealAllTypeArr = (obj, keys, operatorArr, datalist)=>{
    keys.forEach(key => {
        let arr = obj[key.value]
        let arrow = [{'keepLeadsCount' : key.text}]
        if(Array.isArray(arr) && arr.length > 0) {
            operatorArr.forEach(operator => {
                let count = 0;
                let hasOperator = false;
                arr.forEach(o => {
                    if(operator.operatorCode == o.operatorCode) {
                        count = o.count
                        hasOperator = true
                    }
                });
                if(hasOperator) {
                    arrow.push({'keepLeadsCount' : count})
                }else {
                    arrow.push({'keepLeadsCount' : 0})
                }
            });
        }else {
            arr = []
            operatorArr.forEach(code => {
                arrow.push({'keepLeadsCount' : '0'})
            });
        }
        datalist.push(arrow)
    });
}