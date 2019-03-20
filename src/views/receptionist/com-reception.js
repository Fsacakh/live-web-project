import api from 'common/api'

// 分页查询当天进店历史信息 ( 本店当日接待历史 && 个人当日接待历史 )
export function queryTodayList(params, success) {
    api.receptionist.queryToday(params).then( res => {
        let data = res.data
        if(data.code === 'success' && data.obj) {
            success(data.obj)
        }
    })
}
// 查询车辆信息 ( 厂家, 品牌, 车系, 车型级联关系)
export function queryCarInfo(params, success) {
    api.car.queryCarInfoByCarSearch(params, res => {
        if (res.data.code === "success") {
            let obj = res.data.obj
            success(obj)
        }
    })
}
// 获取该账号对应的门店和组织code
export function getStoreCode() {
    return new Promise((resolve, reject) => {
        api.toLogin.getJurisdiction().then(res => {
            const storeInfoVo = res.data.obj.storeInfoVo
            if(res.data.code === 'success' && storeInfoVo !== null) {
                const useInfo = {
                    orgCode: storeInfoVo.orgCode,
                    storeCode: storeInfoVo.storeCode
                }
                resolve(useInfo)
            }
        })
    })
}
// 值班非值班排序
export function compare(property) {
    return function(a, b){
        let val1 = a[property]
        let val2 = b[property]
        return val2 - val1
    }
}



