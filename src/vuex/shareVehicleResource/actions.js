import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const getVehicleResourceList = ({ commit }, params) => {
    api.supplyChain
        .carShareDetailInfo
        .queryCarShareDetailsOnFlag(params, (res) => {
            if (res.data.code === 'success') {
                let list = res.data.obj.list
                if (list != null) {
                    let pager = {
                        pageNo: res.data.obj.pageNum,
                        pageSize: res.data.obj.pageSize,
                        total: res.data.obj.total,
                        totalPages: res.data.obj.pages
                    }
                    commit(types.SHARE_VEHICLE_RESOURCE_GET_RESOURCE_LIST, {
                        list
                    })
                    commit(types.SHARE_VEHICLE_RESOURCE_SET_PAGER, {
                        pager
                    })
                }
            }
        })
}   

export const showSkuModal = ({ commit }) => {
    commit(types.SHARE_VEHICLE_RESOURCE_SHOW_SKU_MODAL)
}

export const hideSkuModal = ({ commit }) => {
    commit(types.SHARE_VEHICLE_RESOURCE_HIDE_SKU_MODAL)
} 