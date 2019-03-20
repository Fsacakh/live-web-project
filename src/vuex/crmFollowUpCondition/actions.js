import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'
import state from './store'

export const queryCRMFollowUpCondition = ({ commit }, params) => {
    api.dataReport
        .queryCRMFollowUp(params, (res) => {
            if (res.data.code === 'success') {
                let map = res.data.obj
                if (map != null) {
                    // state.crmFollowUpConditionMap = {};
                    commit(types.CRM_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST, {
                        map
                    })
                    let newParams = JSON.parse(JSON.stringify(params))  
                    commit(types.CRM_CONDITION_PARAM, {
                        newParams
                    })
                    
                }
            }
        })
}

// export const queryCRMFollowUpConditionStatistics = ({ commit }, params) => {
//     api.research
//         .getCRMFollowUpConditionStatistics(params, (res) => {
//             if (res.data.code === 'success') {
//                 let list = res.data.obj.list
//                 if (list != null) {
//                     let pager = {
//                         pageNo: res.data.obj.pageNum,
//                         pageSize: res.data.obj.pageSize,
//                         total: res.data.obj.total,
//                         totalPages: res.data.obj.pages
//                     }
//                     commit(types.CRM_FOLLOW_UP_CONDITION_STATISTICS_SET_FLOW_PAGER, {
//                         pager
//                     })
//                     commit(types.CRM_FOLLOW_UP_CONDITION_STATISTICS_GET_FLOW_LIST, {
//                         list
//                     })
//                 }

//             }
//         })
// }


export const getTaskTypes = ({ commit }) => {
    let params = { 'refCode': config.research.taskType }
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
                    commit(types.CRM_FOLLOW_UP_GET_SUPPLIER_TYPES, {
                        options
                    })
                }
            }
        })
}

export const getCrmConditionTypes = ({ commit }) => {
    let params = { 'refCode': config.questionnaire.CRMConditionTask }
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
                    commit(types.CRM_CONDITION_TYPES, {
                        options
                    })
                }
            }
        })
}

export const getCRMCRMSpecialist = ({ commit }, params) => {
    // params.postnTypeCode = config.postnTypeCode.CRMSpecialist
    api.emp
       .queryEmpByStoreCode(params, (res) => {
           if (res.data.code === 'success') {
               let list = res.data.obj
               let options = []
               if (list != null) {
                  list.forEach((item) => {
                      options.push({
                          value: item.empCode,
                          text: item.empCnName
                      })
                  })
                  commit(types.CRM_FOLLOW_UP_GET_SPECIALIST, {
                      options
                  })
               }
           } 
       }) 
}

export const getCRMCRMSpecialistByName = ({ commit }, params) => {
    // params.postnTypeCode = config.postnTypeCode.CRMSpecialist
    api.emp
       .queryEmpByCNName(params, (res) => {
           if (res.data.code === 'success') {
               let list = res.data.obj
               let options = []
               if (list != null) {
                  list.forEach((item) => {
                      options.push({
                          value: item.empCode,
                          text: item.empCnName
                      })
                  })
                  commit(types.CRM_FOLLOW_UP_GET_SPECIALIST, {
                      options
                  })
               }
           } 
       }) 
}

export const exportCRMFollowUpCondition = ({ commit }, params) => {
    api.exHibitionHallFlow
       .export(params, (res) => {
           
       })
}

export const getCRMListByNameAction = ({ commit }, operator) => {
    // let operator = params.operator
    commit(types.CRM_FOLLOW_UP_OPERATOR, {operator});
}