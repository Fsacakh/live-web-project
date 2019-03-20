import * as types from './mutation-types'
export default {
    [types.TEST_GET_FINANCE](state, list) {
    	console.info(list);
        state.list = list
    },
    [types.TEST_GET_EMAIL](state, list){
    	console.info(list);
    	state.email = list;
    }
}
