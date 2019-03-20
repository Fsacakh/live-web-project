import api from '../../common/api'
import * as types from './mutation-types'

export const AddDate = ({commit},params) => {
    commit(types.SOME_ADD_DATE,params)
}

export const UpdateData = ({commit}) => {
    commit(types.SOME_UPDATE_DATE)
}

export const search = ({commit},params) => {
    api.finance.getQueryInfo({}).then(function(res){
        commit(types.SOME_SEARCH_DATE, res.data.obj.list)
    })
    console.log(params)
    commit(types.SOME_DELETE_DATE,params)
}

