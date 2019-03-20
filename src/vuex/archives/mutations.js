import config from '../../common/config.js'
import * as types from './mutation-types'
export default {
    [types.AR_GET_GETCODE](state, tp) {            //根据序列获取编码
        if (tp.jugde == config.product.archives.getSkuCode) {  //根据序列获取调研编码
            state.skuCode = tp.msg
        } else if (tp.jugde == config.product.archives.getlockCode) {
            state.lockingCode = tp.msg
        }
    },
    [types.AR_GET_LIST](state, tp) {
        state.arList = tp
    },
    [types.GET_DATA_LIST](state, tp) {
        if (tp.type == config.product.archives.archivesType) {
            state.archivesList = tp.list
        } else {
            state.boutiqueList = tp.list
        }
        state.pager = tp.pager
    },
    [types.GET_SKU_ADDINFO](state, tp) {
        state.addList = tp
    },
    [types.GET_CAL_COST_TYPE](state, tp) {
        state.calCostTypes = tp
    },
    [types.GET_LOCK_INFO] (state, tp) {
        state.locklist = tp.List
        state.lockPager = tp.page
    },
    [types.GET_CARLOAD_INFO] (state, carloadDetail) {
        state.carloadDetail = carloadDetail
    },
    [types.SET_CARLOAD_DETAIL_TYPE] (state, isNotEdit) {
        state.isNotEdit = isNotEdit
    },
    [types.GET_WARE_HOUSE_LIST] (state, entreList) {
        state.entreList = entreList
    }
}
