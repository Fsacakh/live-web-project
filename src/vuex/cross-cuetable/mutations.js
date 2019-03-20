import * as types from './mutation-types'

export default {
    [types.GET_TABLE_INFO](state, data) {
        state.tableInfoVo = data
    }
}