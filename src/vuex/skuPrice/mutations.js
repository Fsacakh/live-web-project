import * as types from './mutation-types'

export default {
    [types.SKUPRICE_GET_CHANNEL_TYPES](state, { options }) {
        state.channelTypes = options
    },
    [types.SKUPRICE_GET_SKUPRICE_LIST](state, { list }) {
        state.skuPriceInfoList = list
    },
    [types.SKUPRICE_GET_BRANDS](state, { list }) {
        state.skuBrands = list
    },
    [types.SKUPRICE_ATTACH_BRANDS](state, { list }) {
        state.skuBrands = state.skuBrands.concat(list)
    },
    [types.SKUPRICE_SET_PAGER](state, { pager }) {
        state.pager = pager
    },
    [types.SKUPRICE_SET_SKUINFO_PAGER](state, { pager }) {
        state.skuPager = pager
    },
    [types.SKUPRICE_SET_SKUBRAND_PAGER](state, { pager }) {
        state.skuBrandPager = pager
    },
    [types.SKUPRICE_SHOW_SELECT_MODAL](state) {
        state.showSelectModal = true
    },
    [types.SKUPRICE_HIDE_SELECT_MODAL](state) {
        state.showSelectModal = false
    },
    [types.SKUPRICE_GET_SKUINFO_LIST](state, { list }) {
        state.skuInfoList = list
    },
    [types.SKUPRICE_SET_ADD_SKUPRICE_LIST](state, { list }) {
        state.addSkuPriceInfoList = list
    },
    [types.SKUPRICE_ADD_SKUPRICE_LIST](state, { skuPriceInfo }) {
        state.addSkuPriceInfoList.push(skuPriceInfo)
    },
    [types.SKUPRICE_REMOVE_SKUPRICE_LIST](state, { index }) {
        state.addSkuPriceInfoList.splice(index, 1)
    },
    [types.SKUPRICE_SET_SKUPRICE_INFO](state, { skuPriceInfo }) {
        state.skuPriceInfo = skuPriceInfo
    },
    [types.SKUPRICE_ADD_SELECT_SKUPRICE_LIST](state, { skuPriceInfoList }) {
        state.selectSkuPriceInfoList = state.selectSkuPriceInfoList.concat(skuPriceInfoList)
    },
    [types.SKUPRICE_REMOVE_SELECT_SKUPRICE_LIST](state, { index }) {
        state.selectSkuPriceInfoList.splice(index, 1)
    },
    [types.SKUPRICE_RESET_SELECT_SKUPRICE_LIST](state) {
        state.selectSkuPriceInfoList = []
    },
    [types.SKUPRICE_SET_SKUPRICE_FLAG](state, { index }) {
        let onOffFlag = state.skuPriceInfoList[index].onOffFlag
        if (onOffFlag == 0) {
            state.skuPriceInfoList[index].onOffFlag = 1
        } else if (onOffFlag == 1) {
            state.skuPriceInfoList[index].onOffFlag = 0
        }
    }
}