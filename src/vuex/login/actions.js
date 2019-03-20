import api from '../../common/api'
import * as types from './mutation-types'

export const getUserInfo = ({ commit }, params) => {
    api.toLogin
        .getLoginInfo({}).then(function(res) {
            let userInfo = res.data.obj
            commit(types.LOGIN_GET_USERINFO, userInfo)
            params.callback(userInfo)
        })
}

//保存原网页的操作
export const getBackPage = ({ commit }, data) => {
    commit(types.LOGIN_BACK_PAGE, data)
}