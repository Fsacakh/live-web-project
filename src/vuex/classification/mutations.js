import * as types from './mutation-types'

export default {
    [types.GET_DATALIST](state, datalist) {
        state.datalist = datalist
    },
    [types.GET_DETAIL](state, detail) {
        state.detail = detail
    },
    [types.GET_OBJ](state, obj) {
        state.obj = obj
    },
    [types.GET_CATALOG_DETAIL](state, catalogDetail) {
        state.catalogDetail = catalogDetail
    },
    [types.SET_SEQUENCE](state, getSequence) {
        state.getSequence = getSequence
    },
    [types.GET_WHOBJ](state, getWhObj) {
        state.getWhObj = getWhObj
    },
    [types.GET_WH_DETAIL](state, getWhDetail) {
        state.getWhDetail = getWhDetail
    },
    [types.GET_WHAREAOBJ](state, whAreaObj) {
        state.whAreaObj = whAreaObj
    },
    [types.GET_WHAREA_DETAIL](state, whAreaDetail) {
        state.whAreaDetail = whAreaDetail
    },
    [types.GET_WHLOCATIONOBJ](state, whLocationObj) {
        state.whLocationObj = whLocationObj
    },
    [types.GET_WHLOCATION_DETAIL](state, whLocationDetail) {
        state.whLocationDetail = whLocationDetail
    },
    [types.SET_WHAREA_TYPE](state, whAreaType) {
        state.whAreaType = whAreaType
    },
    [types.SET_IS_WATCH](state, isWatch) {
        state.isWatch = isWatch
    },
}