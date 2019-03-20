import mutations from './mutations'
import * as actions from './actions'
const state = {
    skuCode: '', //商品编码
    lockingCode: '',
    archivesList: [],
    boutiqueList: [],
    arList: '',
    addList: [],
    calCostTypes: [],
    pager: {},
    entreList: [],
    locklist: [],
    lockPager: {},
    carloadDetail: {},
    carloadAdditionInfo: {},
    // 是否由编辑进入
    isNotEdit: true
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
