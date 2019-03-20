import * as types from './mutation-types'

export default {
    [types.SOME_ADD_DATE](state,data){
        state.str = data.name
    },
    [types.SOME_UPDATE_DATE](state,objTest){
        state.obj = objTest
    },
    [types.SOME_SEARCH_DATE](state,list){
        state.arr.push(list)
    }
}