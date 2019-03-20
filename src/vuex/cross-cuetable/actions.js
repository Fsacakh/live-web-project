import api from 'common/api'
import * as types from './mutation-types'

export const initTableInfo = ({commit}, params) => {
    api.cueTable.queryCrossDeptManagerInfo(params, res => {
        if (res && res.data.code == 'success') {
            commit(types.GET_TABLE_INFO, res.data.obj)
        }
    })
} 