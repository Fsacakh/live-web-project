import api from 'common/api'
import * as types from './mutation-types'

export const getUserAbleInfo = ({commit}) => {
    api.toLogin.getJurisdiction().then(res => {
        if(res.data.code === 'success') {
            let obj = res.data.obj;
            commit(types.SET_USER_AVAILABLE_INFO, obj)
        }
    })
}