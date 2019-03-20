import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const getTableList = ({ commit }, params) => {
    let option = params
    api.workFlow.queryWorkFlow(option, function(res) {
        console.log(res)
        if(res.data.code === 'success'){
            let list = res.data.obj.list
            let pager = {
                pageNo: res.data.obj.pageNum,
                pageSize: res.data.obj.pageSize,
                total: res.data.obj.total,
                totalPages: res.data.obj.pages
            }
            commit(types.SALESADMIN_GET_TABLELIST, { 
                list 
            })
            commit(types.SALESADMIN_SET_PAGE, { 
                pager 
            })
        }                   
    })
}
export const delTableList = ({commit}) => {
    commit(types.SALESADMIN_DEL_TABLELIST)
}
