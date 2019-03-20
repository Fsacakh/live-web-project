import * as types from './mutation-types'
export default {
    [types.CARINFO_GET_FACTORY_CODES](state, { options }) {
        state.factoryCodes = options
    },
    [types.CARINFO_GET_BRAND_CODES](state, { options }) {
        state.brandCodes = options
    },
    [types.CARINFO_GET_SERIES_CODES](state, { options }) {
        state.seriesCodes = options
    },
    [types.CARINFO_GET_MODEL_CODES](state, { options }) {
        state.modelCodes = options
    },
    [types.CARINFO_GET_CAR_CODES](state, { options }) {
        state.carCodes = options
    }
}