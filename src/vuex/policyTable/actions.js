import api from 'common/api'
import * as types from './mutation-types'

export const queryPolicy = ({commit}, params) => {
    api.policyTable.queryList(params.poros, res => {
        console.info(JSON.stringify(params.poros));
        if(res.data.code === 'success') {
            let pages = {
                pageNo: 1,
                pageSize: 15,
                total: 1,
                totalPages: 1
            };
            pages.pageNo = res.data.obj.pageNum
            pages.totalPages = res.data.obj.pages
            pages.pageSize = res.data.obj.pageSize
            pages.total = res.data.obj.total
            commit(types.QUERY_POLICY_TABLE, {list: res.data.obj.list, pager: pages})
        }
    })
}