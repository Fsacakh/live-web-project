import api from '../../common/api'
import config from '../../common/config'
import common from '../../common/common'
import * as types from './mutation-types'

export const getSalesManageOrderList = ({ dispatch, commit, state }, params) => {
    dispatch('getGPConfig', {
        callback: () => {
            api.dataReport
                .querySalesManageOrderReports(params, (res) => {
                    if (res.data.code === 'success') {
                        let list = res.data.obj
                        if (list != null) {
                            let salesManagementOrder = JSON.parse(JSON.stringify(params))
                            commit(types.SALESMANAGEORDER_SET_SALES_MANAGE_ORDER, {
                                salesManagementOrder
                            })
                            commit(types.SALESMANAGEORDER_GET_SALESMANAGEORDER_LIST, {
                                list
                            })
                        }
                    }
                })
        }
    })
}

export const getSClist = ({ commit }, params) => {
    params.postnTypeCode = config.postnTypeCode.sc
    api.emp
        .queryEmpByStoreCode(params, (res) => {
            if (res.data.code === 'success') {
                let scs = res.data.obj
                let list = []
                if (scs != null) {
                    scs.forEach((item) => {
                        list.push({
                            value: item.empCode,
                            text: item.empCnName
                        })
                    })
                    commit(types.SALESMANAGEORDER_GET_SC_LIST, {
                        list
                    })
                }
            }
        })
}

export const getGPConfig = ({ commit }, params) => {
    api.ref
        .getDataDictionarys({
            refCode: config.ref.gpconfig
        }, (res) => {
            if (res.data.code === 'success') {
                let gpList = []
                let referenceDetailInfos = res.data.obj.referenceDetailInfos
                referenceDetailInfos.forEach((referenceDetailInfo) => {
                    gpList.push(referenceDetailInfo.refDetailName)
                    gpList.push(referenceDetailInfo.refDetailName + '%')
                })
                gpList.sort((a, b) => {
                    return (a > b ? 1: -1)
                })

                commit(types.SALESMANAGEORDER_GET_GP_LIST, {
                    gpList
                })
                console.log(gpList, 909)
                params.callback()
            }
        })
}

export const exportToExcel = ({ commit }, params) => {
    api.salesManagerOrder
       .exportToExcel(params, (res) => {
           if (res.data.code === 'success') {
               window.location.href = common.isDevFile() + res.data.obj.filePath
           }
       })
}     

