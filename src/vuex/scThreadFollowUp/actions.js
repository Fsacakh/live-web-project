import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const queryOrderReport = ({ commit }, params) => {
    api.dataReport
        .queryOrderReport(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                if (list != null) {
                    commit(types.ORDER_LIST, {
                        list
                    })
                }

            }
        })
}

export const queryScSalesLeadsReport = ({ commit, dispatch }, params) => {
    let p = JSON.parse(JSON.stringify(params))
    if (p.operatorName == 'All') {
        p.operatorName = ''
    }
    api.dataReport
        .queryScSalesLeadsReport(p, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                if (list != null) {
                    let newParams = {
                        store: p.storeName,
                        year: p.yearStr,
                        month: p.monthStr,
                        sc: p.operatorName,
                        channel: p.channelCode,
                        modeType: p.modeType,
                    }
                    commit(types.PARAM, {
                        newParams
                    })
                    commit(types.LEADS_LIST, {
                        list
                    })
                }
                dispatch("queryOrderReport", p)
            }
        })
}

export const getSClist = ({ commit }, params) => {
    params.postnTypeCode = config.postnTypeCode.sc
    api.emp
        .queryEmpByStoreCode(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj
                let scs = []
                if (list != null) {
                    scs.unshift({
                        value: '',
                        text: 'All'
                    })
                    list.forEach((item) => {
                        scs.push({
                            value: item.empCode,
                            text: item.empCnName
                        })
                    })
                    commit(types.SC_LIST, {
                        scs
                    })
                }
            }
        })
}

export const getSCListByNameAction = ({ commit }, scName) => {
    commit(types.SC_NAME, {scName});
}

//8大渠道
export const getChannels = ({ commit }) => {
    let params = { 'refCode': config.addclientmain.channelCode }
    api.ref
        .getDataDictionary(params)
        .then((res) => {
            if (res.data.code === 'success') {
                let options = []
                let list = res.data.obj.referenceDetailInfos
                if (list != null) {
                    list.forEach((item) => {
                        options.push({
                            value: item.refDetailCode,
                            text: item.refDetailName
                        })
                    })
                    commit(types.LEADS_CHANNEL, {
                        options
                    })
                }
            }
        })
}
