import { M_ADD_MARKETACTIVITY } from './mutation-types'
import mutations from './mutations'
import * as actions from './actions'
const state = {
    callList: [],
    maType: '',
    pager: {
        pageNo: 1,
        pageSize: 15,
        total: 1,
        totalPages: 1
    },
    wordsList: [],
    addBtn: true,
    editBtn: false,
    dataList: '',
    additionalArea: false,
    getMaTypeList: [],      //从数据字典中获取市场活动类型
    maCode: '',             //根据业务编码获取的序列
    wordsCode: '',          //活动话术编码
    maCarCode: '',          //活动车型明细编码
    editData: [],             //要编辑的市场活动数据
    wordsSaveState: false,     //话术保存状态
    carSaveState: true,       //车型保存状态
    listSaveState: true,         //活动名单状态
    addCarData: [],               //车型参数
    addWordsData: [],             //活动话术参数
    addlistData: []               //活动名单参数
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}