import * as types from './mutation-types'
const mutations = {
    [types.M_QUERY_CALL] (state, obj) {
        state.callList = obj.list
        state.pager = obj.pager
    },
    [types.M_ADD_WORDS] (state, list) {
       state.wordsList = list
        if(list.length != 0) {
            state.wordsSaveState = true
        }
    },
    [types.M_ADD_MARKETACTIVITY](state, status) {     //主信息创建成功后的状态
        state.additionalArea = status
        state.addBtn = false
        state.editBtn = true
    },
    [types.M_ADD_ACTIVITYWORDS](state, statuus) {       //add话术
        state.wordsSaveState = false
    },
    [types.M_ADD_MARKETCAR](state, status) {
        state.carSaveState = true
    },
    [types.M_GET_MATYPE](state, status) {
        state.getMaTypeList = status
    },
    [types.M_GET_MACODE](state, status) {               //获取市场活动编码
        state.maCode = status
        state.additionalArea = false
        state.addBtn = true
        state.editBtn = false
    },
    [types.M_GET_WORDSCODE](state, status) {            //获取话术编码
        state.wordsCode = status
    },
    [types.M_GET_MACARCODE](state, status) {
        state.maCarCode = status
    },
    [types.M_GET_EDITDATA](state, status) {
        state.maCode = status.maCode
        state.editData = status
        state.additionalArea = true
        state.addBtn = false
        state.editBtn = true
    },

    [types.M_GET_CARTYPEINFO](state, status) {          //根据搜索条件查询车辆信息
        state
    },
    [types.M_SET_WORDSDATA](state, status) {            //监听话术数据改变
        state.addWordsData = JSON.parse(JSON.stringify(status))
        state.wordsSaveState = false
    },
    [types.M_SET_CARDATA](state, status) {               //监听市场活动车型数据变化
        state.addCarData = JSON.parse(JSON.stringify(status))
        if (status.length == '0') {
            state.carSaveState = false
        } else {
            state.carSaveState = false
        }
    }
}
export default mutations