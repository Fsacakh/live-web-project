import * as types from './mutation-types'

const mutations = {
    [types.QUERY_POLICY_TABLE] (state, obj) {
        state.policyList = obj.list
        state.pager = obj.pager
    }
}

export default mutations