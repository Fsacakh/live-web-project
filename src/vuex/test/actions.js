import api from '../../common/api'
import * as types from './mutation-types'

export const search = ({commit},params) => {

    // api.finance
    //     .getQueryInfo(params, (res) => {
    //         console.info(res);
    //         let list = params;

    //         commit(types.TEST_GET_FINANCE, list)
    //     })
	var list = {};
    api.finance
        .getQueryInfo({}).then(function(res){
        	console.info(res.data.obj.list);
        	commit(types.TEST_GET_FINANCE, res.data.obj.list)
        })
    console.info(params);
    commit(types.TEST_GET_EMAIL,params)
}

export const test = ({commit},params) => {

   
    commit(types.TEST_GET_EMAIL,params)
}

