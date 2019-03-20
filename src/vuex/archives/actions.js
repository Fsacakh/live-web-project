import api from '../../common/api'
import config from '../../common/config.js'
import * as types from './mutation-types'
import { resolve } from 'path';
export const getCalCostType = ({ commit }, params) => {                //获取市场活动类型
    api.ref.queryDictionaryDetails(params.poros)
        .then(function (res) {
            params.callBack(res)
            if (res.data.code == "success") {
                let status = [];
                let len = res.data.obj.list
                for (let i = 0; i < len.length; i++) {
                    let obj = {};
                    obj.value = len[i].refDetailCode
                    obj.text = len[i].refDetailName
                    status.push(obj)
                }
                commit(types.GET_CAL_COST_TYPE, status)
            }
        })
}

export const querylockinfo = ({ commit }, params) => {
    api.product.archives.querylockinfo(params.poros, (res) => {
        if (res.data.code == "success") {
            let locklist = res.data.obj.list
            let pager = {
                pageNo: res.data.obj.pageNum,
                totalPages: res.data.obj.pages,
                pageSize: res.data.obj.pageSize,
                total: res.data.obj.total,
            }
            commit(types.GET_LOCK_INFO, { List: locklist, page: pager })
            params.callBack(res)
        }
    })
}

export const editlock = ({ commit }, params) => {
    api.product.archives.editlock(params.poros, (res) => {
        if (res.data.code == "success") {

        }
        params.callBack(res)
    })
}

export const getCode = ({ commit }, params) => {                //根据序列获取编码
    api.ordinalInfo.getSequence(params.poros, (res) => {
        if (res.data.code == "success") {
            commit(types.AR_GET_GETCODE, { jugde: params.poros.serviceCode, msg: res.data.obj })
            params.callBack(res)
        }
    })
}

export const queryArchives = ({ commit }, params) => {
    api.product.archives.queryArchives(params.poros)
        .then((res) => {
            params.callBack(res)
            if (res.data.code == "success") {
                let page = {
                    pageNo: res.data.obj.pageNum,
                    totalPages: res.data.obj.pages,
                    pageSize: res.data.obj.pageSize,
                    total: res.data.obj.total,
                }
                commit(types.GET_DATA_LIST, { type: params.poros.skuType, list: res.data.obj.list, pager: page })
            }
        })
}

export const editArchives = ({ commit }, params) => {
    api.product.archives.editArchives(params.poros)
        .then((res) => {
            params.callBack(res)
            if (res.data.code == "success") {

            }
        })
}

export const addArchives = ({ commit }, params) => {
    api.product.archives.addArchives(params.poros)
        .then((res) => {
            params.callBack(res)
            if (res.data.code == "success") {

            }
        })
}

export const additionInfo = ({ commit }, params) => {
    api.product.archives.additionInfo(params.poros)
        .then((res) => {
            params.callBack(res)
        })
}

//根据Code获取商品信息
export const getEditInfo = ({ commit }, params) => {
    api.product.archives.getEditInfo(params.poros)
        .then((res) => {
            params.callBack(res)
            if (res.data.code == "success") {
                commit(types.AR_GET_LIST, res.data.obj)
            }
        })
}

export const getSukAddInfo = ({ commit }, params) => {
    api.ref.queryDictionaryDetails(params.poros)
        .then(function (res) {
            params.callBack(res)
            if (res.data.code == "success") {
                commit(types.GET_SKU_ADDINFO, res.data.obj.list)
            }
        })
}

export const setIsNotEdit = ({ commit }, isNotEdit) => {
    commit(types.SET_CARLOAD_DETAIL_TYPE, isNotEdit)
}

// 获取整车商品详情
export const getCarloadDetailInfo = ({ state, commit, dispatch }, params) => {
    api.product.archives.getCarloadDetailInfo(params)
        .then(res => {
            if (res.data.code === 'success') {
                let carinfo = resolveCarloadInfo(res.data.obj)
                commit(types.GET_CARLOAD_INFO, carinfo)
                dispatch('getWareHouseList', {
                    storeCode: carinfo.skuInfoVo.storeCode
                })
            }
        })
}

export const getWareHouseList = ({ commit }, params) => {
    let options = {
        storeCodeSet: []
    }
    let entreList = []
    options.storeCodeSet.push(params.storeCode)
    options.warehouseTypeFlag = 1;
    if (options.storeCodeSet.length > 0) {
        api.supplyChain.procurement.getEntrepot(options, function (res) {
            if (res.data.code === "success") {
                let array = res.data.obj
                entreList = []
                for (var i = 0; i < array.length; i++) {
                    entreList.push({
                        text: array[i].warehouseName,
                        value: array[i].warehouseCode
                    });
                }
                if (entreList.length === 0) {
                    entreList.push({
                        text: "请选择仓库",
                        value: ''
                    })
                }
                commit(types.GET_WARE_HOUSE_LIST, entreList)
            }
        })
    } else {
        entreList = []
        commit(types.GET_WARE_HOUSE_LIST, entreList)
    }
}

// 处理整车信息
const resolveCarloadInfo = (obj) => {
    let carObj = obj;
    let skuInfoVo = carObj['skuInfoVo']
    // 附加信息
    let skuvoList = skuInfoVo['skuAddInfoVoList'];
    if (Array.isArray(skuvoList)) {
        skuvoList.forEach(element => {
            let keyName = element['addCode']
            let valueName = element['addValue']
            skuInfoVo[keyName] = valueName
        })
    }
    // 管线时间
    let pipelineTime = []
    pipelineTime.push(skuInfoVo['pipelineStartTime'])
    pipelineTime.push(skuInfoVo['pipelineEndTime'])
    skuInfoVo['pipelineTime'] = pipelineTime
    // 运输中时间
    let transportTime = []
    transportTime.push(skuInfoVo['transportationStartTime'])
    transportTime.push(skuInfoVo['transportationEndTime'])
    skuInfoVo['transportTime'] = transportTime

    // 0.16000000
    let pr = carObj.purchaseRate
    // 0.16
    let prn = parseFloat(pr);
    carObj['purchaseRate'] = prn.toFixed(2)
    // 2017.0
    let carYear = skuInfoVo.carStyleYear
    skuInfoVo.carStyleYear = parseInt(carYear)
    // 1.8L
    let inhaleStyleStr = skuInfoVo.carOpvName
    if (typeof (inhaleStyleStr) === 'string') {
        //L
        let inhaleStyle = inhaleStyleStr.substring(inhaleStyleStr.length - 1, inhaleStyleStr.length)
        // 排量 1.8
        let displacement = inhaleStyleStr.substring(0, inhaleStyleStr.length - 1)
        skuInfoVo['inhaleStyle'] = inhaleStyle
        skuInfoVo['displacement'] = displacement
    }
    carObj['skuInfoVo'] = skuInfoVo
    return carObj
}

// 更新整车详情信息
export const updateCarloadDetail = ({ commit }, payloads) => {
    let updateParams = resolveUpdateCarloadDetail(payloads.params)
    api.product.archives.updateCarloadDetailInfo(updateParams)
        .then(res => {
            if (res.data.code === 'success') {
                if (payloads.callBack) {
                    payloads.callBack()
                }
            }
        })
}

// 将数据处理成从后台传过来的格式
const resolveUpdateCarloadDetail = (carObj) => {
    let skuInfoVo = carObj['skuInfoVo']
    let skuAddInfoVoList = skuInfoVo['skuAddInfoVoList']
    //管线
    let pipelineTime = skuInfoVo['pipelineTime']
    if (pipelineTime.length === 2) {
        skuInfoVo.pipelineStartTime = pipelineTime[0]
        skuInfoVo.pipelineEndTime = pipelineTime[1]
    }
    // 运输中时间
    let transportTime = skuInfoVo['transportTime']
    if (transportTime.length === 2) {
        skuInfoVo.transportationStartTime = transportTime[0]
        skuInfoVo.transportationEndTime = transportTime[1]
    }
    for (const key in skuInfoVo) {
        if (skuInfoVo.hasOwnProperty(key)) {
            const element = skuInfoVo[key];
            if (Array.isArray(skuAddInfoVoList)) {
                for (let i = 0; i < skuAddInfoVoList.length; i++) {
                    let item = skuAddInfoVoList[i];
                    if (item['addCode'] === key) {
                        item['addValue'] = skuInfoVo[key]
                    }
                }
            }
        }
    }
    return carObj;
}
