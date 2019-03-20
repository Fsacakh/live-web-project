import * as types from './mutation-types'

export default {
    [types.MARKET_GET_MARKETS](state, { markets }) {
        state.list = markets
    },
    [types.MARKET_SET_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.MARKET_ISFORBIDDEN_ACTIVITY](state, { result }) {
        state.backresult = result
    },
    [types.MARKET_SAVE_AREAS](state, { areas }) {
        state.areas = areas
    },
    [types.MARKET_CAR_STYLE](state, { obj }) {
        // 数据处理  补全state.list中的每一个对象的 extendInfoList  方便渲染
        for(let i=0;i<state.list.length;i++){
            for(let k in obj){
                if(state.list[i].maCode === k){
                    if(obj[k].length === 1){
                        state.list[i].extendInfoList = obj[k][0]                        
                    }else if(obj[k].length > 1){
                        state.list[i].extendInfoList = obj[k][0]+"/等"
                    }else{
                        state.list[i].extendInfoList = ""
                    }
                }
            }
        }
    },
    [types.MARKET_GET_STORES](state, { obj }){
        // 数据处理  补全state.list中的每一个对象的 storeCode  方便渲染
        for(let i=0;i<state.list.length;i++){
            for(let k in obj){
                if(state.list[i].maCode === k){
                    state.list[i].storeCode = obj[k][0]  
                    // if(obj[k].length === 1){
                    //     state.list[i].extendInfoList = obj[k][0]                        
                    // }else if(obj[k].length > 1){
                    //     state.list[i].extendInfoList = obj[k][0]+"/等"
                    // }else{
                    //     state.list[i].extendInfoList = ""
                    // }
                }
            }
        }
    }
}