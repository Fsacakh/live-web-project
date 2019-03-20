import config from '../../common/config.js'
import * as types from './mutation-types'
const mutations = {
    [types.MO_GET_GETCODE](state, tp) {              //根据序列获取编码
        if (tp.jugde == config.product.goodsModels.getRelationCode) {
            state.relationCode = tp.msg
        }
    },
}
export default mutations