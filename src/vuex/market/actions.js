import api from '../../common/api'
import * as types from './mutation-types'

// 获取列表数据方法
export const getMarkets = ({ commit }, market) => {
    // 声明一个对象用于接受传入的数据
    let params = market.options

    api.market
        .queryMarketActivity(params, (res) => {
            // 列表的数据
            console.log('------action------------')
            console.log(res)
            console.log('-------------------')
            let markets = res.data.obj.list ? res.data.obj.list : []
            console.log(markets)
                // 分页的相关数据
            let pager = {
                    // 页面编号
                    pageNo: res.data.obj.pageNum ? res.data.obj.pageNum : 0 ,
                    // 页面数据量
                    pageSize: res.data.obj.pageSize ? res.data.obj.pageSize : 0,
                    // 总计数据
                    total: res.data.obj.total ? res.data.obj.total : 0,
                    totalPages: res.data.obj.pages ? res.data.obj.pages : 0
                }
            console.log(pager)
            market.callback(res)
                // 通过commit将数据放到仓库
            commit(types.MARKET_GET_MARKETS, {
                    markets
                })
                // 通过commit将数据放到仓库
            commit(types.MARKET_SET_PAGER, {
                    pager
                })
        })
}

// 点击禁用或启用的方法
export const modifyMarket = ({ commit }, market) => {
    let params = market.options
    console.log(api.market.queryMarketActivity)
    api.market
        .editMarketActivity(params,market.callback)
}

// 获取区域的方法向store中存储获取的区域数据
export const getMarketAreas = ( {commit}, market ) => {
    let params = market.options

    let areas = api.area.getSalesAreaInfoByAreaCode(params,(res) => {
        let areas = res.data.obj.salesAreaSubInfo

        commit(types.MARKET_SAVE_AREAS, { areas })
    })
}
// 获取区域的方法向store中存储获取的区域数据
export const getMarketCurrent = ( {commit}, market ) => {
    let params = market.options

    let areas = api.area.getSalesAreaInfoByAreaCode(params, market.callback)
}

// 通过区域信息  获取经销商店信息
export const getMarketStore = ( {commit}, market ) => {
    let params = market

    let shops = api.store.queryStoreBysale(params, (res) => {
        console.log(res)
    })

    console.log(shops)
}
// 根据获取到的活动信息  获取活动的车型车系
export const getMarketActivityDetail = ({commit}, market) => {
    let params = market.maCodesList
    console.log(params)
    api.market.getMarketActivityDetail(params, (res) =>{
        // console.log(res)
        let cars = res.data.obj
        // console.log(cars)
        let obj = {}
        // for循环  根据params的长度  填充对象
        for(let k =0;k<params.length;k++){
            obj[params[k]] = []
        }
        // 双重for循环  分配数据  根据不同的键
        for(let i =0;i<params.length;i++){
            for(let j=0;j<cars.length;j++){
                if(params[i]===cars[j].maCode){
                    obj[params[i]].push((cars[j].brandName?cars[j].brandName:"")+(cars[j].seriesName?"/"+cars[j].seriesName:"")+(cars[j].modelName?"/"+cars[j].modelName:''))
                }
            }
        }
        // console.log(obj)
        // 将分配好的数据对象 传入
        commit(types.MARKET_CAR_STYLE, { obj })
    })
}

// 根据获取到的活动信息  获取活动的所属门店

export const getMarketActivityStores = ({commit}, market) => {
    let params = market.maCodesList
    console.log(params)
    api.market.getMarketActivityStores(params, (res) => {
        console.log(params)
        console.log(res)
        let stores = res.data.obj
        let obj = {}
        for(let k =0;k<params.length;k++){
            obj[params[k]] = []
        }
        // 双重for循环  分配数据  根据不同的键
        for(let i =0;i<params.length;i++){
            for(let j=0;j<stores.length;j++){
                if(params[i]===stores[j].maCode){
                    obj[params[i]].push(stores[j].storeName)
                }
            }
        }
        // console.log(obj)
        commit(types.MARKET_GET_STORES, { obj })
    })
}