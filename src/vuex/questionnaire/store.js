import mutations from './mutations'
import * as actions from './actions'
const state = {
    qaList: [],             //crm调研数据
    qaTypes: [],             //crm类型
    qaCode: '',             //CRM调研编码
    useRangeCode: '',
    questionCode: '',
    answerCode: '',
    storeQuestionList: [],
    pager: {},
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}