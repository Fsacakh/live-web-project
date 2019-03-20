import config from '../../common/config.js'
import * as types from './mutation-types'
const mutations = {
    [types.QA_GET_QAINFO](state, tp) {              //获取CRM调研数据
        state.pager = tp.page
        if (tp.qaList.length != 0) {
            state.qaList = tp.qaList
            state.qaCode = tp.qaList[0].qaCode
        } else {
            state.qaList = []
        }
    },
    [types.QA_GET_QATYPE](state, tp) {
        state.qaTypes = tp
    },
    [types.QA_GET_QACODE](state, tp) {  
        
        //根据序列获取编码
        if (tp.jugde == config.questionnaire.getQaCode) {               //根据序列获取调研编码
            state.qaCode = tp.msg
        } else if (tp.jugde == config.questionnaire.getQuestionCode) {        //根据序列获取问题编码
            state.questionCode = tp.msg
        } else if (tp.jugde == config.questionnaire.getAnswer) {        //根据序列获取答案编码
            state.answerCode = tp.msg
        } else if (tp.jugde == config.questionnaire.getUseRangeer) {
            state.useRangeCode = tp.msg
        }
    },
    [types.GET_QUESTION_LIST](state, tp) {
        state.storeQuestionList = tp
    }
}
export default mutations