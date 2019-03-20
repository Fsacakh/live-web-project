import * as types from './mutation-types'
export default {
    [types.LOGIN_GET_USERINFO](state, data) {
    	state.userInfo = data;
    },
    [types.LOGIN_BACK_PAGE](state, page) {
        state.page = page
    }
}
