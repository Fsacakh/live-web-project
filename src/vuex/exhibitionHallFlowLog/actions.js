import api from '../../common/api'
import config from '../../common/config'
import common from '../../common/common'
import * as types from './mutation-types'

export const queryExhibitionHallFlowLog = ({ commit }, params) => {
    api.sales
        .reception
        .queryExhibitionHallFlowLog(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.EX_HIBITION_HALL_FLOW_LOG_SET_FLOW_PAGER, {
                        pager
                    })
                    commit(types.EX_HIBITION_HALL_FLOW_LOG_GET_FLOW_LIST, {
                        list
                    })
                }

            }
        })
}

export const getSCPostnTypeCodes = ({ commit }, params) => {
    params.postnTypeCode = config.postnTypeCode.sc
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
                  commit(types.EX_HIBITION_HALL_FLOW_LOG_GET_SC_CODES, {
                      options
                  })
               }
           } 
       }) 
}

export const exportExhibitionHallFlowLog = ({ commit }, params) => {
    api.exHibitionHallFlow
       .export(params, (res) => {
           window.location.href = common.isDevFile() + res.data.obj
       })
}