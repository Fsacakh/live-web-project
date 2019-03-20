import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const getSalesTargetPlanList = ({ commit }, params) => {
    api.sales
        .salesTargetPlan
        .querySalesTargetPlanList(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.SALESTARGETPLAN_GET_SALESTARGETPLAN_LIST, {
                        list
                    })
                    commit(types.SALESTARGETPLAN_SET_SALESTARGETPLAN_PAGER, {
                        pager
                    })
                }
            }
        })
}

export const getSalesTargetPlanCode = ({ commit }, params) => {
    let newParams = { 'serviceCode': config.sales.salesTargetPlan.sequence }
    api.ordinalInfo
        .getSequence(newParams, (res) => {
            if (res.data.code === 'success') {
                let salesTargetPlanCode = res.data.obj
                params.callback(salesTargetPlanCode)
            }
        })
}
