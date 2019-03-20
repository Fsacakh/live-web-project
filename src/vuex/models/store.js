import mutations from './mutations'
import * as actions from './actions'
const state = {
    addCode: '',                  //商品扩展编码
    skuCode: '',                  //商品编码
    relationCode: ''              //关系编码
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}