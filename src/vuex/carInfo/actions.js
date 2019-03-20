import api from '../../common/api'
import config from '../../common/config'
import * as types from './mutation-types'

export const queryCarInfoByCarSearch = ({ dispatch, commit, state }, params) => {
    api.car
        .queryCarInfoByCarSearch(params, (res) => {
            if (res.data.code === 'success') {
                let arr = res.data.obj
                let options = []
                if (arr != null) {
                    switch (params.type) {
                        case config.car.none:
                            arr.forEach((item) => {
                                options.push({
                                    value: item.factoryCode,
                                    text: item.factoryName
                                })
                            })
                            commit(types.CARINFO_GET_FACTORY_CODES, {
                                options
                            })
                            break;
                        case config.car.factoryRefCode:
                            arr.forEach((item) => {
                                options.push({
                                    value: item.brandCode,
                                    text: item.brandName
                                })
                            })
                            commit(types.CARINFO_GET_BRAND_CODES, {
                                options
                            })
                            break;
                        case config.car.brandRefCode:
                            arr.forEach((item) => {
                                if (item != null) {
                                    options.push({
                                        value: item.seriesCode,
                                        text: item.seriesName
                                    })
                                }
                            })
                            commit(types.CARINFO_GET_SERIES_CODES, {
                                options
                            })
                            break;
                        case config.car.seriesRefCode:
                            arr.forEach((item) => {
                                if (item != null) {
                                    options.push({
                                        value: item.modelCode,
                                        text: item.modelName
                                    })
                                }
                            })
                            commit(types.CARINFO_GET_MODEL_CODES, {
                                options
                            })
                            break;
                        case config.car.modelRefCode:
                            arr.forEach((item) => {
                                if (item != null) {
                                    options.push({
                                        value: item.carCode,
                                        text: item.displayName
                                    })
                                }
                            })
                            commit(types.CARINFO_GET_CAR_CODES, {
                                options
                            })
                            break;
                    }
                }
            }
        })
}

export const resetCarInfo = ({ commit }, params) => {
    let options = []
    commit(types.CARINFO_GET_FACTORY_CODES, {
        options
    })
    commit(types.CARINFO_GET_BRAND_CODES, {
        options
    })
    commit(types.CARINFO_GET_SERIES_CODES, {
        options
    })
    commit(types.CARINFO_GET_MODEL_CODES, {
        options
    })
    commit(types.CARINFO_GET_CAR_CODES, {
        options
    })
}