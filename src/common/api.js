import axios from 'axios'
import common from "./common.js";
import apiUrl from "./api-url.js"
axios.defaults.headers.post['Content-Type'] = 'application/json'; //请求头
axios.defaults.headers.Accept = 'application/json'; //请求头
axios.defaults.baseURL = '/';
axios.defaults.withCredentials = true;
import {
    Loading,
    Message
} from 'element-ui'

const options = {
    text: '加载中. . .'
}
let _loading;


// 统一处理重复请求
let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken
let removePending = (config) => {
    for (let p in pending) {
        if (pending[p].u === config.url + '&' + config.method + '&' + config.data) { // 当前请求在数组中存在时执行函数体
            pending[p].f() // 执行取消操作
            pending.splice(p, 1) // 把这条记录从数组中移除
        }
    }
}


// post传参序列化
axios.interceptors.request.use((config) => {
    removePending(config) // 在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c)=>{
        pending.push({ u: config.url + '&' + config.method, f: c })
    })

    if(config.url == common.isdev()+apiUrl.downLoad.queryFileExportInfo){
        _loading.close()
    }
    // if (config.method === 'post') {
    //     config.data = JSON.stringify(config.data);
    //     // console.info(55);
    // }
    // console.info(config);
    // console.log('正在请求中...')
    //console.log(config);
    else if (config.loadingType == undefined) {
        _loading = Loading.service(options)
    } else {
        _loading.close()
    }
    return config;
}, (error) => {
    // console.log("错误的传参", 'fail');
    Message({
        message: '参数错误',
        type: 'error',
    })
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
    removePending(res.config)
    // console.log('请求结束了,返回结果...')
    _loading.close()
    if (!res.data) {
        return Promise.reject(res);
    }
    if (res.data.code === 'login') {
        const env = process.env.NODE_ENV
        const _origin = env == 'development' ? 'http://dev.iris.com' : window.location.origin
        window.location.href = `${_origin}/web/login/login.html`
    } else if (res.data.code === 'fail') {
        Message({
            message: res.data.message,
            type: 'error',
        })
    }
    return res;
}, (error) => {
    _loading.close()
    Message({
        message: '网络错误',
        type: 'error',
    })
    return Promise.reject(error);
});

var setParams = function (params, type) {
    var params = common.parseData(params);
    var pm = common.parseData(params.body) || params;
    var type = type == 'GET' ? 'GET' : 'POST';
    return pm;
}

export default {
    downLoad: {
        //分页查询文件导出信息
        queryFileExportInfo: function (params, sc){
            axios.post(common.isdev() + apiUrl.downLoad.queryFileExportInfo, params)
            .then((r) => {
                sc(r)
            })
        },
        //清空所有未标记的文件导出信息
        deleteFileExportInfo: function (params, sc){
            axios.post(common.isdev() + apiUrl.downLoad.deleteFileExportInfo, params)
            .then((r) => {
                sc(r)
            })
        },
        //新增文件导出信息
        insertFileExportInfo: function (params, sc){
            axios.post(common.isdev() + apiUrl.downLoad.insertFileExportInfo, params)
            .then((r) => {
                sc(r)
            })
        },
        //更新文件导出信息
        updateFileExportInfo: function (params, sc){
            axios.post(common.isdev() + apiUrl.downLoad.updateFileExportInfo, params)
            .then((r) => {
                sc(r)
            })
        }
    },
    //预装车
    preloadedCar: {
        //查询预装车列表信息
        queryPreinstalledCarList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.preloadedCar.queryPreinstalledCarList, params)
                .then((r) => {
                    sc(r)
                })
        },
        //查询预装车辆详情信息
        getPreinstalledCarInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.preloadedCar.getPreinstalledCarInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        //精品商品查询，预装车专用
        querySkuInfoAdapterCarList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.preloadedCar.querySkuInfoAdapterCarList, params)
                .then(res => {
                    sc(res)
                })
        },
        //分页查询预装车明细信息
        queryPreinstalledCarDetailInfoVos: function (params, sc) {
            axios.post(common.isdev() + apiUrl.preloadedCar.queryPreinstalledCarDetailInfoVos, params)
                .then((r) => {
                    sc(r)
                })
        },
        //批量新增／修改预装车信息
        editPreinstalledCarInfoList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.preloadedCar.editPreinstalledCarInfoList, params)
                .then((r) => {
                    sc(r)
                })
        },
        //删除预装车明细信息
        cancelPreinstalledCarDetailInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.preloadedCar.cancelPreinstalledCarDetailInfo, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    //销售数据看板 dashboard
    dashboard: {
        //客流-进店线索数板块
        queryInStoreClueInfo: function (params, ajConfig, sc) {
            axios
                .post(common.isdev() + apiUrl.dashboard.queryInStoreClueInfo, params, ajConfig)
                .then((r) => {
                    sc(r)
                })
        },
        //交车板块
        queryTheMonthDeliveryReal: function (params, ajConfig, sc) {
            axios
                .post(common.isdev() + apiUrl.dashboard.queryTheMonthDeliveryReal, params, ajConfig)
                .then((r) => {
                    sc(r)
                })
        },
        //整车开票板块
        queryPureInvoicerOrderNums: function (params, ajConfig, sc) {
            axios
                .post(common.isdev() + apiUrl.dashboard.queryPureInvoicerOrderNums, params, ajConfig)
                .then((r) => {
                    sc(r)
                })
        },
        //订单板块
        queryOrderInforNums: function (params, ajConfig, sc) {
            axios
                .post(common.isdev() + apiUrl.dashboard.queryOrderInforNums, params, ajConfig)
                .then((r) => {
                    sc(r)
                })
        },
        //库存板块
        queryPureStockInfoNums: function (params, ajConfig, sc) {
            axios
                .post(common.isdev() + apiUrl.dashboard.queryPureStockInfoNums, params, ajConfig)
                .then((r) => {
                    sc(r)
                })
        },
        //sc毛利销售排名
        queryScNameTGpOfRank: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.dashboard.queryScNameTGpOfRank, params)
                .then((r) => {
                    sc(r)
                })
        },
        //客流数据
        departmentStrategyReport: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.dashboard.departmentStrategyReport, params)
                .then((r) => {
                    sc(r)
                })
        },
        //留档客流数据
        queryKeepReceptionStatistics: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.dashboard.queryKeepReceptionStatistics, params)
                .then((r) => {
                    sc(r)
                })
        },
         //统计客流数据
        queryReceptionStatistics: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.dashboard.queryReceptionStatistics, params)
                .then((r) => {
                    sc(r)
                })
        },
        // GP相关信息
        getGPInfo: function (params, sc) {
            axios
              .post(common.isdev() + apiUrl.dashboard.queryGpCollectionInfoNoRank, params)
              .then((r) => {
                sc(r)
              })
        },
        // T.GP值
        getTGPInfo: function (params, sc) {
            axios
              .post(common.isdev() + apiUrl.dashboard.getTGPInfo, params)
              .then((r) => {
                sc(r)
              })
        },
        // 门店排名值
        getStoreOrderInfo: function (params, sc) {
            axios
              .post(common.isdev() + apiUrl.dashboard.getStoreOrderInfo, params)
              .then((r) => {
                sc(r)
              })
        },
        // 设置中心的页面更新时间
        // 商务政策页面的更新时间
        getBusinessaffairsUpdateTime: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dashboard.getBusinessaffairsUpdateTime, params).then((r) => {
                sc(r)
            })
        },
        // 市场活动页面的更新时间
        getMarketUpdateTime: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dashboard.getMarketUpdateTime, params).then((r) => {
                sc(r)
            })
        },
        // 金融热销方案页面的更新时间
        getMainFinanceUpdateTime: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dashboard.getMainFinanceUpdateTime, params).then((r) => {
                sc(r)
            })
        },
        // 组合商品设置页面的更新时间
        getskuCombUpdateTime: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dashboard.getskuCombUpdateTime, params).then((r) => {
                sc(r)
            })
        },
        // 剩余四个页面的更新时间
        getLeftPageUpdateTime: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dashboard.getLeftPageUpdateTime, params).then((r) => {
                sc(r)
            })
        }
    },
    crmSituation: {
        // 通过门店和任务类型查询问卷版本号
        queryQaCodeByStoreCodeAndQaType: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.crmSituation.queryQaCodeByStoreCodeAndQaType, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 获得问卷所有的题目和答案
        querySingleQuestionnaireAllQuestionAndAnswerByCodeFromDB: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.crmSituation.querySingleQuestionnaireAllQuestionAndAnswerByCodeFromDB, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询答案的比例
        queryAnswerRate: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.crmSituation.queryAnswerRate, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    market: {
        //同步市场活动名单信息
        synchronization: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.synchronization, params)
                .then((r) => {
                    sc(r)
                })
        },
        //
        delMarketCar: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.delMarketCar, params)
                .then((r) => {
                    sc(r)
                })
        },
        getMarketCarInfo: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.getMarketCarInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        //根据relationCode查询文件信息 /v1/fileSys/file/selectByRelationCode
        getFileInfo: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.getFileInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        //查询导出名单URL信息
        getOutput: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.getOutput, params)
                .then((r) => {
                    sc(r)
                })
        },
        //分页查询活动活动名单
        queryCall: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.queryCall, params)
                .then((r) => {
                    sc(r)
                })
        },
        //获取市场活动列表
        queryMarketActivity: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.queryMarketActivity, params)
                .then((r) => {
                    sc(r)
                })
        },
        getMarketActivityDetails: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.getMarketActivityDetails, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 编辑市场活动
        editMarketActivity: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.editMarketActivity, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 根据查询到的市场活动编码 获取车型信息
        getMarketActivityDetail: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.getMarketActivityDetail, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 根据查询到的市场活动编码 获取活动所属门店
        getMarketActivityStores: function (params, sc) {
            axios
                .post(common.isdev() + apiUrl.market.getMarketActivityStores, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    menu: {
        insertMenuInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.menu.insertMenuInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        updateMenuInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.menu.updateMenuInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        queryMenuInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.menu.queryMenuInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        getMenuInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.menu.getMenuInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        initAllMenuCache: function (params, sc) {
            axios.post(common.isdev() + apiUrl.menu.initAllMenuCache, params)
                .then((r) => {
                    sc(r)
                })
        },
        getReferenceInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.menu.getReferenceInfo, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    //业务信息
    ordinalInfo: {
        insert: function (params) {
            return axios.post(common.isdev() + apiUrl.ordinalInfo.insert, params)
        },
        search: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.ordinalInfo.search, params)
        },
        edit: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.ordinalInfo.edit, params)
        },
        //根据应用编码获得相关的应用序列
        getSequence: function (params, sc) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.ordinalInfo.getSequence, params)
                .then((r) => {
                    sc(r)
                })
        },
        //根据应用编码获得相关的应用序列List
        getSequenceList: function (params, sc) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.ordinalInfo.getSequenceList, params)
                .then((r) => {
                    sc(r)
                })
        },
        //同步数据
        dataSync: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.ordinalInfo.dataSync, params)
        }
    },
    toLogin: {
        //登录调用接口
        login: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.toLogin.login, params);
        },
        //获取用户菜单
        getUserMenu: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.toLogin.getUserMenu, params);
        },
        //获取登录信息
        getLoginInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.toLogin.getLoginInfo, params);
        },
        //获取组织信息
        getOrg: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.toLogin.getOrg, params);
        },
        //切换组织
        changeLoginInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.toLogin.changeLoginInfo, params);
        },
        //退出
        loginOut: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrl.toLogin.loginOut, params);
        },
        // 销售区域门店权限
        getJurisdiction(params) {
            return axios.post(common.isdev() + apiUrl.toLogin.getJurisdiction, params);
        },
        // 菜单
        queryPostUsableGroupResourceInfo(params, sc) {
            axios.post(common.isdev() + apiUrl.toLogin.queryPostUsableGroupResourceInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    // 金融机构
    finance: {
        // 分页查询
        getQueryInfo(params) {
            return axios.post(common.isdev() + apiUrl.finance.getQueryInfo, params)
        },
        // 新增 / 编辑  主档信息
        insertOrUpdata(params, sc) {
            return axios.post(common.isdev() + apiUrl.finance.insertOrUpdata, params)
                .then((r) => {
                    sc(r)
                });
        },
        // 详情
        detail(params) {
            return axios.post(common.isdev() + apiUrl.finance.detail, params);
        },
        // 查询使用范围信息 - 分页
        range(params) {
            return axios.post(common.isdev() + apiUrl.finance.range, params);
        },
        // 批量新增或更新使用范围信息
        batchInsertOrUpdata(params, sc) {
            let _params = setParams(params);
            return axios.post(common.isdev() + apiUrl.finance.batchInsertOrUpdata, _params)
                .then((r) => {
                    sc(r)
                });
        },
        //新增贴息方案或者更新贴息方案
        addIntersubsidyCode(params, sc) {
            return axios.post(common.isdev() + apiUrl.finance.addIntersubsidyCode, params)
                .then((r) => {
                    sc(r)
                })
        },
        addProceduresCode(params, sc) {
            return axios.post(common.isdev() + apiUrl.finance.addProceduresCode, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询手续费信息
        getFinanceOrgsServiceCharge(params, sc) {
            axios.post(common.isdev() + apiUrl.finance.getFinanceOrgsServiceCharge, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询租赁信息
        getFinanceOrgsLeaseInfo(params, sc) {
            axios.post(common.isdev() + apiUrl.finance.getFinanceOrgsLeaseInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询贴息信息
        getFinanceOrgsIntersubsidy(params, sc) {
            axios.post(common.isdev() + apiUrl.finance.getFinanceOrgsIntersubsidy, params)
                .then((r) => {
                    sc(r)
                })
        },
        //查询经销商门店信息
        queryShopInfo(params, sc) {
            return axios.post(common.isdev() + apiUrl.finance.queryShopInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询    =>    销售区域获取
        getSalesArea(params) {
            return axios.post(common.isdev() + apiUrl.finance.getSalesArea, params)
        },
        //查询贴息方案
        getQueryIntersubsidy(params, sc) {
            return axios.post(common.isdev() + apiUrl.finance.getQueryIntersubsidy, params)
                .then((r) => {
                    sc(r)
                });
        },
        //查询手续费方案
        getQueryProcedures(params, sc) {
            return axios.post(common.isdev() + apiUrl.finance.getQueryProcedures, params)
                .then((r) => {
                    sc(r)
                });
        },
        getQueryScope(params, sc) {
            return axios.post(common.isdev() + apiUrl.finance.getQueryScope, params)
                .then((r) => {
                    sc(r)
                });
        }
    },
    // 金融产品
    financePro: {
        downLoad(params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.downLoad, params)
                .then((r) => {
                    sc(r)
                })
        },
        //查询列表信息
        getQueryInfo(params) {
            return axios.post(common.isdev() + apiUrl.financePro.getQueryInfo, params)
        },
        //新增或者编辑
        insertOrUpdata(params) {
            return axios.post(common.isdev() + apiUrl.financePro.insertOrUpdata, params)
        },
        //获取金融产品类型
        getProType(params) {
            return axios.post(common.isdev() + apiUrl.financePro.getProType, params)
        },
        //分页查询金融产品
        queryFinancesInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.queryFinancesInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        //新增或编辑金融产品
        editFinanace: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.editFinanace, params)
                .then((r) => {
                    sc(r)
                })
        },
        //查询金融产品详情
        detailFinance: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.detailFinance, params)
                .then((r) => {
                    sc(r)
                })
        },
        //批量新增或更新金融方案
        addOrUpdateDetailInfoBatch: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.addOrUpdateDetailInfoBatch, params)
                .then((r) => {
                    sc(r)
                })
        },
        //精确查询金融方案
        queryDetailInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.queryDetailInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        //分页查询金融方案
        queryDetailInfoList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.queryDetailInfoList, params)
                .then((r) => {
                    sc(r)
                })
        },
        //金融机构下拉框查询
        getAuthorizationOrgs: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.getAuthorizationOrgs, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询金融方案详情
        queryDetailInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.queryDetailInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 批量新增或更新金融方案
        addOrUpdateDetailInfoBatch: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.addOrUpdateDetailInfoBatch, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 新增更新金融产品适用范围
        addOrUpdateUseRangeInfoBatch: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.addOrUpdateUseRangeInfoBatch, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询金融产品适用范围
        queryUseRangeInfoList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.queryUseRangeInfoList, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 根据车辆查询金融方案
        queryDetailInfoByCarInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financePro.queryDetailInfoByCarInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    // 车辆信息
    car: {
        queryCarInfoByCarSearch: function (params, sc) {
            axios.post(common.isdev() + apiUrl.car.queryCarInfoByCarSearch, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    // 门店
    store: {
        queryStoreBysale(params) {
            return axios.post(common.isdev() + apiUrl.store.queryStoreBysale, params)
        },
        queryMainInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.store.queryMainInfo, params)
                .then((r) => {
                    sc(r)
                });
        },
        queryStoreInfoBySalesCode: function (params, sc) {
            axios.post(common.isdev() + apiUrl.store.queryStoreInfoBySalesCode, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    // 区域树状图接口
    area: {
        getChinaAreaInfoByAreaCode(params) {
            return axios.post(common.isdev() + apiUrl.area.getChinaAreaInfoByAreaCode, params);
        },
        getSalesAreaInfoByAreaCode(params, sc) {
            return axios.post(common.isdev() + apiUrl.area.getSalesAreaInfoByAreaCode, params)
                .then((r) => {
                    sc(r)
                });
        },
        getDeliveryAreaInfoByAreaCode(params) {
            return axios.post(common.isdev() + apiUrl.area.getDeliveryAreaInfoByAreaCode, params);
        },
        getOrg(params) {
            return axios.post(common.isdev() + apiUrl.area.getOrg, params);
        },
        workFlowGetOrg(params, sc) {
            axios.post(common.isdev() + apiUrl.area.workFlowGetOrg, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    // dcc 分渠道线索
    dcc: {
        // dcc 分渠道线索列表 上部分
        queryDccChannelThreadList(params) {
            return axios.post(common.isdev() + apiUrl.dcc.queryDccChannelThreadList, params)
        },
        //dcc 分渠道线索列表 下部分
        queryDCCChannelThreadListBottom(params) {
            return axios.post(common.isdev() + apiUrl.dcc.queryDCCChannelThreadListBottom, params)
        }
    },
    ref: {
        //从数据字典获取类型数据接口
        queryDictionaryDetails(params) {
            return axios.post(common.isdev() + apiUrl.ref.queryDictionaryDetails, params)
        },
        // 拿数据字典明细
        getDictionaryDetails(params) {
            return axios.post(common.isdev() + apiUrl.ref.getDictionaryDetails, params)
        },
        //从数据字典获取主表信息
        getDataDictionary(params) {
            return axios.post(common.isdev() + apiUrl.ref.getDataDictionary, params)
        },
        //从数据字典获取主表信息
        getDataDictionarys(params, sc) {
            axios.post(common.isdev() + apiUrl.ref.getDataDictionarys, params)
                .then(r => {
                    sc(r)
                })
        },
        //根据主档code获取第一级子节点
        queryFirstLevelReferenceDetails(params, sc) {
            axios.post(common.isdev() + apiUrl.ref.queryFirstLevelReferenceDetails, params)
                .then(r => {
                    sc(r)
                })
        },
        //根据子节点code获取第一级子节点
        queryNextReferenceDetails(params, sc) {
            axios.post(common.isdev() + apiUrl.ref.queryNextReferenceDetails, params)
                .then(r => {
                    sc(r)
                })
        },
        //数据字典配置
        queryRefDetail(params, sc) {
            axios.post(common.isdev() + apiUrl.ref.queryRefDetail, params)
                .then(r => {
                    sc(r)
                })
        }
    },
    //市场活动部分
    marketActivity: {
        //查询市场活动对应车辆信息
        //厂家信息
        getCarFactoryInfo: function (params) {
            return axios.post(common.isdev() + apiUrl.marketActivity.getCarFactoryInfo, params);
        },
        //品牌信息
        getCarBrandInfo: function (params) {
            return axios.post(common.isdev() + apiUrl.marketActivity.getCarBrandInfo, params);
        },
        //车系信息
        getCarSeriesInfo: function (params) {
            return axios.post(common.isdev() + apiUrl.marketActivity.getCarSeriesInfo, params);
        },
        //车型信息
        getCarModelInfo: function (params) {
            return axios.post(common.isdev() + apiUrl.marketActivity.getCarModelInfo, params);
        },
        //根据搜索条件查询车辆信息
        getCarTypeInfo: function (params) {
            return axios.post(common.isdev() + apiUrl.marketActivity.getCarTypeInfo, params);
        },
        //新增/编辑市场活动主信息
        createdMarketActivity: function (params) {
            return axios.post(common.isdev() + apiUrl.marketActivity.createdMarketActivity, params);
        },
        //添加车型
        addCarType: function (params) {
            return axios.post(common.isdev() + apiUrl.marketActivity.addCarType, params);
        },
        //添加话术信息
        addActivityWords: function (params) {
            return axios.post(common.isdev() + apiUrl.marketActivity.addActivityWords, params);
        },
        queryActivityInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.marketActivity.queryActivityInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 厂家召回导入
        queryVehicleRecallInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.marketActivity.queryVehicleRecallInfo, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    //保险方案
    insurancePro: {
        //查询保险方案
        queryInsuranceInfoVos: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insurancePro.queryInsuranceInfoVos, params)
                .then((r) => {
                    sc(r)
                })
        },
        //查询保险公司信息
        queryCompanyInfoAll: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insurancePro.queryCompanyInfoAll, params)
                .then((r) => {
                    sc(r)
                })
        },
        //新增保险方案
        insertInsuranceInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insurancePro.insertInsuranceInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        //根据inscode 查询方案信息
        queryInsuranceInfoVoByInsCode: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insurancePro.queryInsuranceInfoVoByInsCode, params)
                .then((r) => {
                    sc(r)
                })
        },
        //更新保险方案
        updateInsuranceInfoVo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insurancePro.updateInsuranceInfoVo, params)
                .then((r) => {
                    sc(r)
                })
        },
        //查询保险机构
        queryCompanyInfoByCodesAndPagination: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insurancePro.queryCompanyInfoByCodesAndPagination, params)
                .then((r) => {
                    sc(r)
                })
        },

    },
    // 获取销售区域名称
    sale: {
        getSaleNameBySalecode(params) {
            return axios.post(common.isdev() + apiUrl.sale.getSaleNameBySalecode, params)
        },
        getSalesAreaInfoByUserAvailableOnlyOneLevel: function (params, sc) {
            axios.post(common.isdev() + apiUrl.sale.getSalesAreaInfoByUserAvailableOnlyOneLevel, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    //编辑密码
    resetpassword: {
        reset: function (params, sc) {
            axios.post(common.isdev() + apiUrl.resetpassword.reset, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    // 保险机构
    insurance: {
        // 根据coCode查询保险公司信息
        queryByCocode(params) {
            return axios.post(common.isdev() + apiUrl.insurance.queryByCocode, params)
        },
        // 新增编辑
        insertOrUpdata(params) {
            return axios.post(common.isdev() + apiUrl.insurance.insertOrUpdata, params)
        },
        // 新增编辑 => 适用范围
        insertOrUpdataRange(params) {
            return axios.post(common.isdev() + apiUrl.insurance.insertOrUpdataRange, params)
        },
        // 查询 => 适用范围
        queryRange(params) {
            return axios.post(common.isdev() + apiUrl.insurance.queryRange, params)
        },
        // 险种
        query(params) {
            return axios.post(common.isdev() + apiUrl.insurance.query, params)
        },
        // 新增自定义险种
        insert(params) {
            return axios.post(common.isdev() + apiUrl.insurance.insert, params)
        },
        // 根据保险公司code、storeCode查询保险公司手续费信息
        queryCostByCocode(params) {
            return axios.post(common.isdev() + apiUrl.insurance.queryCostByCocode, params)
        },
        // 根据手续费code、storeCode查询保险公司手续费信息
        queryCost(params) {
            return axios.post(common.isdev() + apiUrl.insurance.queryCost, params)
        },
        //
        queryStoreInfoByCoCode(params) {
            return axios.post(common.isdev() + apiUrl.insurance.queryStoreInfoByCoCode, params)
        },
        // 批量新增手续费
        insertCost(params) {
            return axios.post(common.isdev() + apiUrl.insurance.insertCost, params)
        },
        editInsurance: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insurance.editInsurance, params)
                .then((r) => {
                    sc(r)
                })
        },
        //保险机构  分页查询
        getInsuranceDivice: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insurance.getInsuranceDivice, params)
                .then((r) => {
                    sc(r)
                })
        },
        //获取 区域
        getAreas(params) {
            return axios.post(common.isdev() + apiUrl.insurance.getAreas, params)
        }
    },
    // 获取采购区域名称
    purchase: {
        getPurchasingAreaInfoByAreaCode: function (params, sc) {
            axios.post(common.isdev() + apiUrl.purchase.getPurchasingAreaInfoByAreaCode, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    //CRM调研
    crm: {
        //查询列表
        getQaInfo: function (params) {
            return axios.post(common.isdev() + apiUrl.crm.getQaInfo, params)
        },
        //新增问卷信息
        addQa: function (params) {
            return axios.post(common.isdev() + apiUrl.crm.addQa, params)
        },
        editQa: function (params) {
            return axios.post(common.isdev() + apiUrl.crm.editQa, params)
        },
        //新增问卷问题
        addQuestionTitle: function (params) {
            return axios.post(common.isdev() + apiUrl.crm.addQuestionTitle, params)
        },
        //问题答案
        addQuestionAnswer: function (params) {
            return axios.post(common.isdev() + apiUrl.crm.addQuestionAnswer, params)
        },
        //根据QACode分页查询问卷问题
        queryQuestion: function (params) {
            return axios.post(common.isdev() + apiUrl.crm.queryQuestion, params)
        },
        //编辑问卷问题
        editQuestion: function (params) {
            return axios.post(common.isdev() + apiUrl.crm.editQuestion, params)
        },
        //查询问卷使用范围信息
        quertQaScopc: function (params) {
            return axios.post(common.isdev() + apiUrl.crm.quertQaScopc, params)
        },
        //新增问卷使用范围信息
        addQaScope: function (params) {
            return axios.post(common.isdev() + apiUrl.crm.addQaScope, params)
        },
        //新增问卷使用范围信息
        editQaScope: function (params) {
            return axios.post(common.isdev() + apiUrl.crm.editQaScope, params)
        },

    },
    // 商品
    product: {
        //精品商品
        boutique: {
            //删除图片
            deleteImg(params, sc) {
                axios.post(common.isdev() + apiUrl.fileModule.deleteFile, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        // 商品分类
        classification: {
            // 根据商品分类编码获取直属下级所有信息
            getSkuCategoryInfoBycategoryCode(params) {
                return axios.post(common.isdev() + apiUrl.product.classification.getSkuCategoryInfoBycategoryCode, params)
            },
            // 新增
            insert(params) {
                return axios.post(common.isdev() + apiUrl.product.classification.insert, params)
            },
            // 编辑
            update(params) {
                return axios.post(common.isdev() + apiUrl.product.classification.update, params)
            },
            // 查询
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrl.product.classification.getQueryInfo, params)
            },
            // 初始化缓存
            init() {
                return axios.post(common.isdev() + apiUrl.product.classification.init)
            },
        },
        // 商品目录
        catalog: {
            // 根据商品目录编码获取直属下级所有信息
            getSkuCatLogInfoByCatlogCode(params) {
                return axios.post(common.isdev() + apiUrl.product.catalog.getSkuCatLogInfoByCatlogCode, params)
            },
            // 新增
            insert(params) {
                return axios.post(common.isdev() + apiUrl.product.catalog.insert, params)
            },
            // 编辑
            update(params) {
                return axios.post(common.isdev() + apiUrl.product.catalog.update, params)
            },
            // 查询
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrl.product.catalog.getQueryInfo, params)
            },
            // 初始化缓存
            init() {
                return axios.post(common.isdev() + apiUrl.product.catalog.init)
            },
        },
        // 商品价格
        skuPrice: {
            skuInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuPrice.skuInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            query: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuPrice.query, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            initRedis: function (sc) {
                axios.post(common.isdev() + apiUrl.product.skuPrice.initRedis)
                    .then((r) => {
                        sc(r)
                    })
            },
            insert: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuPrice.insert, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            update: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuPrice.update, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            querySkuPriceInfoByCode: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuPrice.querySkuPriceInfoByCode, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            editSkuPriceInfoVos: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuPrice.editSkuPriceInfoVos, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            initRedisCache: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuPrice.initRedisCache, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            querySkuInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuPrice.querySkuInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            getSkuPriceInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuPrice.getSkuPriceInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        // 商品组合
        skuComb: {
            ///v1/sku/comb/queryCombinationInfoForPageByVo
            queryCombinationInfoForPageByVo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuComb.queryCombinationInfoForPageByVo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 组合商品同步数据
            initCombinationInfoToRedisCache: function (params,sc) {
                axios.post(common.isdev() + apiUrl.product.skuComb.initCombinationInfoToRedisCache, params)
                  .then((r) => {
                      sc(r)
                  })
            },
            editCombinationInfos: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuComb.editCombinationInfos, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            addOrUpdateCombinationDetailInfoBatch: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuComb.addOrUpdateCombinationDetailInfoBatch, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            getCombinationDetailInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuComb.getCombinationDetailInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            addOrUpdateCombinationPriceInfoBatch: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuComb.addOrUpdateCombinationPriceInfoBatch, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            getCombinationPriceInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuComb.getCombinationPriceInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            addOrUpdateCombinationUseRangeBatch: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuComb.addOrUpdateCombinationUseRangeBatch, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            getCombinationUseRange: function (params, sc) {
                axios.post(common.isdev() + apiUrl.product.skuComb.getCombinationUseRange, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        //商品品牌
        commodityBrand: {
            updataCommodityBrand: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.commodityBrand.updataCommodityBrand, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryCommodityBrand: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.commodityBrand.queryCommodityBrand, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            initCommodityBrand: function (sc) {
                return axios.post(common.isdev() + apiUrl.product.commodityBrand.initCommodityBrand)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        commodityUnit: {
            updataCommodityUnit: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.commodityUnit.updataCommodityUnit, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryCommodityUnit: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.commodityUnit.queryCommodityUnit, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            initCommodityUnit: function (sc) {
                return axios.post(common.isdev() + apiUrl.product.commodityUnit.initCommodityUnit)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        // 商品包装
        commodityPack: {
            updataCommodityPack: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.commodityPack.updataCommodityPack, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryCommodityPack: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.commodityPack.queryCommodityPack, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            init() {
                return axios.post(common.isdev() + apiUrl.product.commodityPack.init)
            },
        },
        // 商品产地
        commodityBirthplace: {
            updataCommodityBirthplace: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.commodityBirthplace.updataCommodityBirthplace, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryCommodityBirthplace: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.commodityBirthplace.queryCommodityBirthplace, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            init() {
                return axios.post(common.isdev() + apiUrl.product.commodityBirthplace.init)
            },
        },
        //商品车型
        models: {
            queryModels: function (params) {
                return axios.post(common.isdev() + apiUrl.product.models.queryModels, params)
            },
            addMOdels: function (params) {
                return axios.post(common.isdev() + apiUrl.product.models.addMOdels, params)
            },
            editModels: function (params) {
                return axios.post(common.isdev() + apiUrl.product.models.editModels, params)
            },
            //查询车辆信息
            getQueryInfo: function (params) {
                return axios.post(common.isdev() + apiUrl.product.models.getQueryInfo, params);
            },
            querySkuInfoListKeda: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.sku.keda.querySkuInfoListKeda, params)
                    .then((r) => {
                        sc(r)
                    })
            }
            // //初始化进缓存
            // cache: function(params, sc) {
            //     return axios.post(common.isdev() + '/v1/sku/skuInfo/initRedisCache.htm', params)
            //         .then((r) => {
            //             sc(r)
            //         })
            // },
        },
        //商品档案模块
        archives: {
            //整车商品查询
            queryArchives: function (params) {
                return axios.post(common.isdev() + apiUrl.product.archives.queryArchives, params)
            },
            addArchives: function (params) {
                return axios.post(common.isdev() + apiUrl.product.archives.addArchives, params)
            },
            editArchives: function (params) {
                return axios.post(common.isdev() + apiUrl.product.archives.editArchives, params)
            },
            getEditInfo: function (params) {
                return axios.post(common.isdev() + apiUrl.product.archives.getEditInfo, params)
            },
            getCarloadDetailInfo: function (params) {
                return axios.post(common.isdev() + apiUrl.product.archives.getCarloadDetailInfo, params)
            },
            //修改整车详情
            updateCarloadDetailInfo: function (params) {
                return axios.post(common.isdev() + apiUrl.product.archives.updateCarloadDetailInfo, params)
            },
            //附加信息部分
            additionInfo: function (params) {
                return axios.post(common.isdev() + apiUrl.product.archives.additionInfo, params)
            },
            //锁定查询
            querylockinfo: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.archives.querylockinfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            //锁定/解锁
            editlock: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.archives.editlock, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            //初始化进缓存
            cache: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.product.archives.cache, params)
                    .then((r) => {
                        sc(r)
                    })
            },
        },
    },
    // 供应链
    supplyChain: {
        //库存查询
        queryInventory(params, sc) {
            return axios.post(common.isdev() + apiUrl.supplyChain.queryInventory, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 仓库信息
        warehouse: {
            queryInfoByStoreCode(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.warehouse.queryInfoByStoreCode, params)
            },
            queryInfoByCode(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.warehouse.queryInfoByCode, params)
            },
            insert(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.warehouse.insert, params)
            },
            update(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.warehouse.update, params)
            },
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.warehouse.getQueryInfo, params)
            },
            init() {
                return axios.post(common.isdev() + apiUrl.supplyChain.warehouse.init)
            },
            insertWhStoreInfoList: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.warehouse.insertWhStoreInfoList, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryWhStoreInfoList: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.warehouse.queryWhStoreInfoList, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            deleteWhStoreInfoList: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.warehouse.deleteWhStoreInfoList, params)
                    .then((r) => {
                        sc(r)
                    })
            },
        },
        // 仓库库区信息
        whArea: {
            queryInfoByCode(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.whArea.queryInfoByCode, params)
            },
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.whArea.getQueryInfo, params)
            },
            insert(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.whArea.insert, params)
            },
            update(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.whArea.update, params)
            },
            edit(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.whArea.edit, params)
            }
        },
        // 仓库库位信息
        whLocation: {
            queryInfoByCode(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.whLocation.queryInfoByCode, params)
            },
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.whLocation.getQueryInfo, params)
            },
            insert(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.whLocation.insert, params)
            },
            update(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.whLocation.update, params)
            },
            edit(params) {
                return axios.post(common.isdev() + apiUrl.supplyChain.whLocation.edit, params)
            }
        },
        // 供应商
        supplier: {
            querySupplierInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.supplier.querySupplierInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            insertSupplierInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.supplier.insertSupplierInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            updateSupplierInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.supplier.updateSupplierInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            supplierSyncBtn: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.supplier.supplierSyncBtn, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        // 供应商发票
        supplierInvoice: {
            querySupplierInvoiceInfoWithNoPage: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.supplierInvoice.querySupplierInvoiceInfoWithNoPage, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            batchEditSupplierInvoiceInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.supplierInvoice.batchEditSupplierInvoiceInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        // 采购订单
        purchaseOrder: {
            insertPurchaseOrderInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.purchaseOrder.insertPurchaseOrderInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            updatePurchaseOrderInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.purchaseOrder.updatePurchaseOrderInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            submitPurchaseOrderInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.purchaseOrder.submitPurchaseOrderInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryPurchaseOrderInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.purchaseOrder.queryPurchaseOrderInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            getPurchaseOrderInfoByCode: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.purchaseOrder.getPurchaseOrderInfoByCode, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            cancelPurchaseOrderInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.purchaseOrder.cancelPurchaseOrderInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryPoSkuDetailInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.purchaseOrder.queryPoSkuDetailInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            editPoSkuDetailInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.purchaseOrder.editPoSkuDetailInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            cancelPoSkuDetailInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.purchaseOrder.cancelPoSkuDetailInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryPoCarSkuDetailBySkuCodes: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.purchaseOrder.queryPoCarSkuDetailBySkuCodes, params)
                    .then((r) => {
                        sc(r)
                    })
            },
        },
        // 采购（整车采购）管理
        procurement: {
            //导出列表
            downloadOrder: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.procurement.downloadOrder, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 分页查询主表信息 /v1/purchaseOrder/queryPurchaseOrderInfo
            queryWholeCarByPages: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.procurement.queryWholeCarByPages, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 订单导入解析成功后   查询订单信息
            queryNewOrder: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.procurement.queryNewOrder, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 保存采购单
            saveProcurementNum: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.procurement.saveProcurementNum, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 获取类型
            queryDictionaryDetails: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.procurement.queryDictionaryDetails, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 提交订单
            submitOrder: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.procurement.submitOrder, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 编辑订单
            changeOrder: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.procurement.changeOrder, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 废除订单（整车订单）
            deleteOrder: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.procurement.deleteOrder, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 废除订单（明细）
            deleteItem: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.procurement.deleteItem, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 导入明细（导入明细）
            importDetail: function (params, sc) {
                axios.post(common.isdev() + '.htm', params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 导出列表
            outportList: function (params, sc) {
                axios.post(common.isdev() + '.htm', params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 获取仓库信息
            getEntrepot: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.procurement.getEntrepot, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 开票 by lwx
            ticket: {
                queryInfo(params) {
                    return axios.post(common.isdev() + apiUrl.supplyChain.procurement.ticket.queryInfo, params)
                },
                getDetail(params) {
                    return axios.post(common.isdev() + apiUrl.supplyChain.procurement.ticket.getDetail, params)
                },
                edit(params) {
                    return axios.post(common.isdev() + apiUrl.supplyChain.procurement.ticket.edit, params)
                },
                editCarAdjustOutStockInvoice: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.procurement.ticket.editCarAdjustOutStockInvoice, params)
                        .then((r) => {
                            sc(r)
                        })
                },
                queryCarAdjustOutStockInvoiceByCondition: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.procurement.ticket.queryCarAdjustOutStockInvoiceByCondition, params)
                        .then((r) => {
                            sc(r)
                        })
                },
                queryCarAdjustOutStockInvoiceList: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.procurement.ticket.queryCarAdjustOutStockInvoiceList, params)
                        .then((r) => {
                            sc(r)
                        })
                }
            },
            // 付款 by lwx
            pay: {
                queryInfo(params) {
                    return axios.post(common.isdev() + apiUrl.supplyChain.procurement.pay.queryInfo, params)
                },
                getDetail(params) {
                    return axios.post(common.isdev() + apiUrl.supplyChain.procurement.pay.getDetail, params)
                },
                edit(params) {
                    return axios.post(common.isdev() + apiUrl.supplyChain.procurement.pay.edit, params)
                },
                //整车付款导出
                exportsPayReceipts(params){
                    return axios.post(common.isdev() + apiUrl.supplyChain.procurement.pay.exportPayReceipts, params)
                },
                editCarAdjustOutStockPayment: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.procurement.pay.editCarAdjustOutStockPayment, params)
                        .then((r) => {
                            sc(r)
                        })
                },
                queryCarAdjustOutStockPaymentByCondition: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.procurement.pay.queryCarAdjustOutStockPaymentByCondition, params)
                        .then((r) => {
                            sc(r)
                        })
                },
                queryCarAdjustOutStockPaymentList: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.procurement.pay.queryCarAdjustOutStockPaymentList, params)
                        .then((r) => {
                            sc(r)
                        })
                },
            },
            // 入库 by lwx
            storage: {
                queryInfo(params) {
                    return axios.post(common.isdev() + apiUrl.supplyChain.procurement.storage.queryInfo, params)
                },
                getDetail(params) {
                    return axios.post(common.isdev() + apiUrl.supplyChain.procurement.storage.getDetail, params)
                },
                confirm(params) {
                    return axios.post(common.isdev() + apiUrl.supplyChain.procurement.storage.confirm, params)
                },
                submitAdjustInStockInfo: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.procurement.storage.submitAdjustInStockInfo, params)
                        .then((r) => {
                            sc(r)
                        })
                },
                queryCarAdjustInStockInfo: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.procurement.storage.queryCarAdjustInStockInfo, params)
                        .then((r) => {
                            sc(r)
                        })
                },
            }
        },
        // 库存信息管理
        stockInfo: {
            inStockList: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.stockInfo.inStockList, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryCarStockPurchaseFee: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.stockInfo.queryCarStockPurchaseFee, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryCarStockInfos: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.stockInfo.queryCarStockInfos, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            stockInfoWriteExcel: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.stockInfo.stockInfoWriteExcel, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        // 整车内采内销-分享平台信息
        carShareInfo: {
            get: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareInfo.get, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            insert: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareInfo.insert, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            update: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareInfo.update, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            query: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareInfo.query, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            submitCarShareInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareInfo.submitCarShareInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            cancelCarShareInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareInfo.cancelCarShareInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        // 整车内采内销-分享平台-详细
        carShareDetailInfo: {
            queryCarShareDetailsOnFlag: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareDetailInfo.queryCarShareDetailsOnFlag, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryCarShareDetailsByCondition: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareDetailInfo.queryCarShareDetailsByCondition, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryCarShareDetailInfoVosNoPage: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareDetailInfo.queryCarShareDetailInfoVosNoPage, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            editCarShareDetailInfoList: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareDetailInfo.editCarShareDetailInfoList, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            updateCarShareDetailOff: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareDetailInfo.updateCarShareDetailOff, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            insert: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareDetailInfo.insert, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            update: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareDetailInfo.update, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            get: function (params, sc) {
                axios.post(common.isdev() + apiUrl.supplyChain.carShareDetailInfo.get, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        // 科达定制化接口
        keda: {
            purchaseOrder: {
                insertPurchaseOrderInfo: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.kada.purchaseOrder.insertPurchaseOrderInfo, params)
                        .then((r) => {
                            sc(r)
                        })
                },
                updatePurchaseOrderInfo: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.kada.purchaseOrder.updatePurchaseOrderInfo, params)
                        .then((r) => {
                            sc(r)
                        })
                },
                submitPurchaseOrderInfo: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.kada.purchaseOrder.submitPurchaseOrderInfo, params)
                        .then((r) => {
                            sc(r)
                        })
                },
                queryPurchaseOrderInfo: function (params, sc) {
                    axios.post(common.isdev() + apiUrl.supplyChain.kada.purchaseOrder.queryPurchaseOrderInfo, params)
                        .then((r) => {
                            sc(r)
                        })
                },
            },
            procurement: {
                pay: {
                    queryInfo: function (params, sc) {
                        axios.post(common.isdev() + apiUrl.supplyChain.kada.procurement.pay.queryInfo, params)
                            .then((r) => {
                                sc(r)
                            })
                    },
                    getDetail: function (params, sc) {
                        axios.post(common.isdev() + apiUrl.supplyChain.kada.procurement.pay.getDetail, params)
                            .then((r) => {
                                sc(r)
                            })
                    },
                    edit: function (params, sc) {
                        axios.post(common.isdev() + apiUrl.supplyChain.kada.procurement.pay.edit, params)
                            .then((r) => {
                                sc(r)
                            })
                    }
                }
            }
        }
    },
    // 工作流
    workFlow: {
        // 初始化缓存
        init: function (sc) {
            axios.post(common.isdev() + apiUrl.workFlow.init)
                .then((r) => {
                    sc(r)
                })
        },
        // 分页查询工作流主表
        queryWorkFlow: function (params, sc) {
            axios.post(common.isdev() + apiUrl.workFlow.queryWorkFlow, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 新增工作流主表
        addWorkFlow: function (params, sc) {
            axios.post(common.isdev() + apiUrl.workFlow.addWorkFlow, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 根据工作流编码查询主表信息
        queryAccordingToCode: function (params, sc) {
            axios.post(common.isdev() + apiUrl.workFlow.queryAccordingToCode, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 根据工作流编码查询节点信息
        queryNodesByCode: function (params, sc) {
            axios.post(common.isdev() + apiUrl.workFlow.queryNodesByCode, params)
                .then((r) => {
                    sc(r)
                })
        },
        //更新工作流 主表状态（启用/停用/删除）
        updataWorkFlow: function (params, sc) {
            axios.post(common.isdev() + apiUrl.workFlow.updataWorkFlow, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 新增工作流节点
        addWorkFlowNode: function (params, sc) {
            axios.post(common.isdev() + apiUrl.workFlow.addWorkFlowNode, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 作废
        cancelWorkFlow: function (params, sc) {
            // axios.post(common.isdev() + '/v1/workFlow/wf/editWorkFlowInfo.htm', params)
            // .then((r) => {
            //     sc(r)
            // })
        },
        queryWorkflowList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.workFlow.queryWorkflowList, params)
                .then((r) => {
                    sc(r)
                })
        },
        updateWorkflowOff: function (params, sc) {
            axios.post(common.isdev() + apiUrl.workFlow.updateWorkflowOff, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    //客户管理
    clientadmin: {
        clientmaininfo: {
            addclient: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientmaininfo.addclient, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryclientmaininfo: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientmaininfo.queryclientmaininfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            updataclientmaininfo: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientmaininfo.updataclientmaininfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryallclientmaininfo: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientmaininfo.queryallclientmaininfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
        },
        clientfinance: {
            addclientfinance: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientfinance.addclientfinance, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryclientfinance: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientfinance.queryclientfinance, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            querydetailedclientfinance: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientfinance.querydetailedclientfinance, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            updataclientfinance: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientfinance.updataclientfinance, params)
                    .then((r) => {
                        sc(r)
                    })
            },
        },
        clientcontacts: {
            addclientcontacts: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientcontacts.addclientcontacts, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryclientcontacts: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientcontacts.queryclientcontacts, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            querydetailedclientcontacts: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientcontacts.querydetailedclientcontacts, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            updataclientcontacts: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientcontacts.updataclientcontacts, params)
                    .then((r) => {
                        sc(r)
                    })
            },
        },
        clientidtype: {
            addclientidtype: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientidtype.addclientidtype, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryclientidtype: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientidtype.queryclientidtype, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            querydetailedclientidtype: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientidtype.querydetailedclientidtype, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            updataclientidtype: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientidtype.updataclientidtype, params)
                    .then((r) => {
                        sc(r)
                    })
            },
        },
        clientreceiver: {
            addclientreceiver: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientreceiver.addclientreceiver, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            queryclientreceiver: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientreceiver.queryclientreceiver, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            querydetailedclientreceiver: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientreceiver.querydetailedclientreceiver, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            updataclientreceiver: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.clientadmin.clientreceiver.updataclientreceiver, params)
                    .then((r) => {
                        sc(r)
                    })
            },
        }
    },
    // 销售
    sales: {
        // 销售目标设置
        salesTargetPlan: {
            querySalesTargetPlanList: function (params, sc) {
                axios.post(common.isdev() + apiUrl.sales.salesTargetPlan.querySalesTargetPlanList, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            editSalesTargetPlan: function (params, sc) {
                axios.post(common.isdev() + apiUrl.sales.salesTargetPlan.editSalesTargetPlan, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            parseSalesTargetExcelFile: function (params, sc) {
                axios.post(common.isdev() + apiUrl.sales.salesTargetPlan.parseSalesTargetExcelFile, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        // 接待
        reception: {
            queryExhibitionHallFlowLog: function (params, sc) {
                axios.post(common.isdev() + apiUrl.sales.reception.queryExhibitionHallFlowLog, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            autoRecordCustomerEnterStoreObjective: function (params, sc) {
                axios.post(common.isdev() + apiUrl.sales.reception.autoRecordCustomerEnterStoreObjective, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        },
        appointment: {
            // 查询销售顾问线索电话跟进信息
            queryPhoneCallList: function (params, sc) {
                axios.post(common.isdev() + apiUrl.sales.appointment.queryPhoneCallList, params)
                    .then((r) => {
                        sc(r)
                    })
            }
        }
    },
    //解析Excel
    analysisExcel: {
        methods: function (params, url) {
            return axios.post(common.isdev() + url + '.htm', params);
        }
    },
    //登录
    login: {
        login: function (params, sc) {
            axios.post(common.isdev() + apiUrl.login.login, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    getUserAvailableInfo: function (sc) {
        axios.post(common.isdev() + apiUrl.getUserAvailableInfo)
            .then((r) => {
                sc(r)
            })
    },
    getSalesAreaInfoByUserAvailableAllLevel: function (sc) {
        axios.post(common.isdev() + apiUrl.getSalesAreaInfoByUserAvailableAllLevel)
            .then((r) => {
                sc(r)
            })
    },
    // 前台接待
    receptionist: {
        downLoad(params, sc) {
            axios.post(common.isdev() + apiUrl.receptionist.downLoad, params)
                .then((r) => {
                    sc(r)
                })
        },
        downLoadErrorInfo(params, sc) {
            axios.post(common.isdev() + apiUrl.receptionist.downLoadErrorInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询当天进店接待列表信息 ( 通过门店分页查询当天全部客流和sc客流 )
        queryToday(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.queryToday, params)
        },
        // 分页查询预约接待列表信息
        queryAppointmentList(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.queryAppointmentList, params)
        },
        // 分页查询进店接待列表信息
        queryInfoList(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.queryInfoList, params)
        },
        // 更新进店接待列表信息
        updateInfoList(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.updateInfoList, params)
        },
        // 更新试驾清单
        updateDrives(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.updateDrives, params)
        },
        // 开始接待
        startReception(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.startReception, params)
        },
        // 开始试驾
        startTryDriver(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.startTryDriver, params)
        },
        // 取消进店接待
        cancelReception(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.cancelReception, params)
        },
        // 通过客户手机号码查询顾客信息
        queryByPhone(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.queryByPhone, params)
        },
        // 根据条件精确查询某时间内的排班上钟信息
        queryWorkSc(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.queryWorkSc, params)
        },
        // 批量编辑前台接待排班上钟信息
        editArrange(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.editArrange, params)
        },
        // 查询该门店所有员工
        queryWorkList(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.queryWorkList, params)
        },
        // 接待中
        getReceptioning(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.getReceptioning, params)
        },
        // 切换SC
        changeReceptionReceiver(params) {
            return axios.post(common.isdev() + apiUrl.receptionist.changeReceptionReceiver, params)
        }
    },
    //调研
    research: {
        saveAnswer: function (params, sc) {
            axios.post(common.isdev() + apiUrl.research.saveAnswer, params)
                .then((r) => {
                    sc(r)
                })
        },
        //获取调研任务信息
        getTaskInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.research.getTaskInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        //保存调研任务结果
        saveTaskInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.research.saveTaskInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        //根据门店题目类型查询问卷题目
        queryQaTitie: function (params, sc) {
            axios.post(common.isdev() + apiUrl.research.queryQaTitie, params)
                .then((res) => {
                    sc(res)
                })
        },
        //查询调研任务主表信息
        queryTaskList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.research.queryTaskList, params)
                .then((res) => {
                    sc(res)
                })
        }
    },
    addclientmain: {
        //创建线索
        create: function (params, sc) {
            axios.post(common.isdev() + apiUrl.addclientmain.create, params).then((r) => {
                sc(r)
            })
        },
        //手机号码校验线索是否存在
        checkMobile: function (params, sc) {
            axios.post(common.isdev() + apiUrl.addclientmain.checkMobile, params).then((r) => {
                sc(r)
            })
        },
        queryList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.addclientmain.queryList, params).then((r) => {
                sc(r)
            })
        },
        getSalesLeadsInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.addclientmain.getSalesLeadsInfo, params).then((r) => {
                sc(r)
            })
        },
        update: function (params, sc) {
            axios.post(common.isdev() + apiUrl.addclientmain.update, params).then((r) => {
                sc(r)
            })
        },
        downLoadData: function (params, sc) {
            axios.post(common.isdev() + apiUrl.addclientmain.downLoadData, params).then((r) => {
                sc(r)
            })
        },
    },
    policyInfo: {
        querypolicyInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.policyInfo.querypolicyInfo, params).then((r) => {
                sc(r)
            })
        },
        revisepolicyInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.policyInfo.revisepolicyInfo, params).then((r) => {
                sc(r)
            })
        },
    },
    // 跨部门线索表
    cueTable: {
        // 列表查询
        queryCrossDeptManagerInfo(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.queryCrossDeptManagerInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 团队总和
        countTeamTotalSum(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.countTeamTotalSum, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询八大渠道实际值
        queryTotalEightChannelsNum(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.queryTotalEightChannelsNum, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询八大渠道的目标值
        departmentStrategyReport(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.departmentStrategyReport, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 查询八大渠道目标值
        queryTargetDepartmentReportLists(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.queryTargetDepartmentReportLists, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 获取 SC && DCC 列表
        queryEmployeeInfoSCByStoreCode(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.queryEmployeeInfoSCByStoreCode, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 创建跨部门策略表
        editCrossDeptManagerInfoList(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.editCrossDeptManagerInfoList, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 导出
        exportDepartmentReport(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.exportDepartmentReport, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 导入
        importDepartmentReport(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.importDepartmentReport, params)
                .then((r) => {
                    sc(r)
                })
        },
        //
        getCrossDerivativeBusinessActualTotal(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.getCrossDerivativeBusinessActualTotal, params)
                .then((r) => {
                    sc(r)
                })
        },
        //
        getCrossDerivativeBusinessTargetTotal(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.getCrossDerivativeBusinessTargetTotal, params)
                .then((r) => {
                    sc(r)
                })
        },
        //
        getScCrossDerivativeBusiness(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.getScCrossDerivativeBusiness, params)
                .then((r) => {
                    sc(r)
                })
        },
        // getScTargetCrossDerivativeBusiness
        getScTargetCrossDerivativeBusiness(params, sc) {
            axios.post(common.isdev() + apiUrl.cueTable.getScTargetCrossDerivativeBusiness, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    //财务管理
    financing: {
        newgetPayInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.newgetPayInfo, params).then((r) => {
                sc(r)
            })
        },
        queryOrderPriceInfoByCodeFromDB: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.queryOrderPriceInfoByCodeFromDB, params).then((r) => {
                sc(r)
            })
        },
        //查询订单信息
        queryPayInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.queryPayInfo, params).then((r) => {
                sc(r)
            })
        },
        //分页查询审批通过订单信息
        queryPayInfoList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.queryPayInfoList, params).then((r) => {
                sc(r)
            })
        },
        //根据编码查询订单信息
        getPayInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.getPayInfo, params).then((r) => {
                sc(r)
            })
        },
        //根据交易单号查询收款信息
        getPayInfoList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.getPayInfoList, params).then((r) => {
                sc(r)
            })
        },
        //查询订单支付信息
        queryPayHistory: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.queryPayHistory, params).then((r) => {
                sc(r)
            })
        },
        //批量新增订单支付信息
        addPayInfoList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.addPayInfoList, params).then((r) => {
                sc(r)
            })
        },
        //更新订单支付信息
        updataPayInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.updataPayInfo, params).then((r) => {
                sc(r)
            })
        },
        //查询订单开票信息
        queryOrderBillingInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.queryOrderBillingInfo, params).then((r) => {
                sc(r)
            })
        },
        //批量新增或编辑订单发票信息
        addOrderBillingInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.financing.addOrderBillingInfo, params).then((r) => {
                sc(r)
            })
        }
    },
    //GP归属设置
    GPbelonging: {
        queryDetail: function (params, sc) {
            axios.post(common.isdev() + apiUrl.GPbelonging.queryDetail, params).then((r) => {
                sc(r)
            })
        },
        addDetail: function (params, sc) {
            axios.post(common.isdev() + apiUrl.GPbelonging.addDetail, params).then((r) => {
                sc(r)
            })
        },
        initRedis: function (sc) {
            axios.post(common.isdev() + apiUrl.GPbelonging.initRedis)
                .then((r) => {
                    sc(r)
                })
        },
        editDetail: function (params, sc) {
            axios.post(common.isdev() + apiUrl.GPbelonging.editDetail, params).then((r) => {
                sc(r)
            })
        },
        getGpConfigDetailInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.GPbelonging.getGpConfigDetailInfo, params).then((r) => {
                sc(r)
            })
        },
        queryAllReferenceDetailsForGp: function (params, sc) {
            axios.post(common.isdev() + apiUrl.GPbelonging.queryAllReferenceDetailsForGp, params).then((r) => {
                sc(r)
            })
        }
    },
    // 订单
    order: {
        //2018年5月25日16点添加，新查询订单列表，用于新车销售-销售订单台账导出及订单优化功能
        //查询订单列表
        newQueryList(params) {
            return axios.post(common.isdev() + apiUrl.order.newQueryList, params)
        },
        // 查询订单列表
        queryList(params) {
            return axios.post(common.isdev() + apiUrl.order.queryList, params)
        },
        // 根据订单号查询订单详情
        queryDetailByOrderNo(params) {
            return axios.post(common.isdev() + apiUrl.order.queryDetailByOrderNo, params)
        },
        getCarOrderInfoByOrderNo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.order.getCarOrderInfoByOrderNo, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 根据skuCode查询后市场详情
        querySkuDetail(params) {
            return axios.post(common.isdev() + apiUrl.order.querySkuDetail, params)
        },
        // 根绝订单号获取后市场订单号( 头信息 )
        getSkuOrderNo(params) {
            return axios.post(common.isdev() + apiUrl.order.getSkuOrderNo, params)
        },
        // 根据订单号查询审批履历
        queryApproveResume(params) {
            return axios.post(common.isdev() + apiUrl.order.queryApproveResume, params)
        },
        downLoadData: function (params, sc) {
            axios.post(common.isdev() + apiUrl.order.downLoadData, params).then((r) => {
                sc(r)
            })
        },
        updateCarOrderInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.order.updateCarOrderInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        getMsrp: function (params, sc) {
            axios.post(common.isdev() + apiUrl.order.getMsrp, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    //SNP归属设置
    SNPbelonging: {
        queryDetail: function (params, sc) {
            axios.post(common.isdev() + apiUrl.SNPbelonging.queryDetail, params).then((r) => {
                sc(r)
            })
        },
        addDetail: function (params, sc) {
            axios.post(common.isdev() + apiUrl.SNPbelonging.addDetail, params).then((r) => {
                sc(r)
            })
        },
        initRedis: function (sc) {
            axios.post(common.isdev() + apiUrl.SNPbelonging.initRedis)
                .then((r) => {
                    sc(r)
                })
        },
        editDetail: function (params, sc) {
            axios.post(common.isdev() + apiUrl.SNPbelonging.editDetail, params).then((r) => {
                sc(r)
            })
        },
    },
    queryselect: function (params, sc) {
        return axios.post(common.isdev() + params.url + '.htm', params.params)
            .then((r) => {
                sc(r)
            })
    },
    // SC通话时长导出
    exHibitionHallFlow: {
        export: function (params, sc) {
            axios.post(common.isdev() + apiUrl.exHibitionHallFlow.export, params).then((r) => {
                sc(r)
            })
        }
    },
    // 展厅客流日志
    scPhoneCallList: {
        export: function (params, sc) {
            axios.post(common.isdev() + apiUrl.scPhoneCallList.export, params).then((r) => {
                sc(r)
            })
        }
    },
    //员工信息
    emp: {
        queryEmpByStoreCode: function (params, sc) {
            axios.post(common.isdev() + apiUrl.emp.queryEmpByStoreCode, params).then((r) => {
                sc(r)
            })
        }
    },
    //整车调出单
    carAdjustOutStockInfo: {
        carAdjustOutStockInfo: {
            insert: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.insert, params).then((r) => {
                    sc(r)
                })
            },
            update: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.update, params).then((r) => {
                    sc(r)
                })
            },
            query: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.query, params).then((r) => {
                    sc(r)
                })
            },
            get: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.get, params).then((r) => {
                    sc(r)
                })
            },
            confirmAdjustOutCarInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.confirmAdjustOutCarInfo, params).then((r) => {
                    sc(r)
                })
            },
            editCarAdjustOutStockInfoList: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.editCarAdjustOutStockInfoList, params).then((r) => {
                    sc(r)
                })
            },
            cancelAdjustOutCarInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockInfo.cancelAdjustOutCarInfo, params).then((r) => {
                    sc(r)
                })
            }
        },
        carAdjustOutStockDetailInfo: {
            insert: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockDetailInfo.insert, params).then((r) => {
                    sc(r)
                })
            },
            update: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockDetailInfo.update, params).then((r) => {
                    sc(r)
                })
            },
            get: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockDetailInfo.get, params).then((r) => {
                    sc(r)
                })
            },
            editCarAdjustOutStockDetailInfoList: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockDetailInfo.editCarAdjustOutStockDetailInfoList, params).then((r) => {
                    sc(r)
                })
            },
            deleteOutAdjustDetail: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustOutStockInfo.carAdjustOutStockDetailInfo.deleteOutAdjustDetail, params).then((r) => {
                    sc(r)
                })
            },
        }
    },
    //整车调入单
    carAdjustInStockInfo: {
        carAdjustInStockInfo: {
            insert: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.insert, params).then((r) => {
                    sc(r)
                })
            },
            update: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.update, params).then((r) => {
                    sc(r)
                })
            },
            query: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.query, params).then((r) => {
                    sc(r)
                })
            },
            get: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.get, params).then((r) => {
                    sc(r)
                })
            },
            submitCarAdjustInStockInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.submitCarAdjustInStockInfo, params).then((r) => {
                    sc(r)
                })
            },
            cancelCarAdjustInStockInfo: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustInStockInfo.carAdjustInStockInfo.cancelCarAdjustInStockInfo, params).then((r) => {
                    sc(r)
                })
            },
        },
        carAdjustInStockDetailInfo: {
            insert: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustInStockInfo.carAdjustInStockDetailInfo.insert, params).then((r) => {
                    sc(r)
                })
            },
            get: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustInStockInfo.carAdjustInStockDetailInfo.get, params).then((r) => {
                    sc(r)
                })
            },
            editCarAdjustInStockDetailInfoList: function (params, sc) {
                axios.post(common.isdev() + apiUrl.carAdjustInStockInfo.carAdjustInStockDetailInfo.editCarAdjustInStockDetailInfoList, params).then((r) => {
                    sc(r)
                })
            },
        }
    },
    storeInfo: {
        //查询经销商门店信息
        queryShopInfo(params, sc) {
            return axios.post(common.isdev() + apiUrl.storeInfo.queryShopInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    // 保险工作台
    insuranceWorchBench: {
        //列表
        getInsuranceWorkbenchInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.insuranceWorchBench.getInsuranceWorkbenchInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        getInsuranceWorkbenchInfoByWorkbenchCode: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.insuranceWorchBench.getInsuranceWorkbenchInfoByWorkbenchCode, params)
                .then((r) => {
                    sc(r)
                })
        },
        updateInsWbRecognizeeInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.insuranceWorchBench.updateInsWbRecognizeeInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        updateInsWbOrderDetailInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.insuranceWorchBench.updateInsWbOrderDetailInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        queryInsWbTrackInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insuranceWorchBench.queryInsWbTrackInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        queryInsuranceTypesInfoVosByCoCode: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insuranceWorchBench.queryInsuranceTypesInfoVosByCoCode, params)
                .then((r) => {
                    sc(r)
                })
        },
        assistInsuranceWorkbenchInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.insuranceWorchBench.assistInsuranceWorkbenchInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        //保险出单信息card的部分数据查询
        queryInsuranceOrderInfoByOrderNo:function(params,sc) {
            axios.post(common.isdev() + apiUrl.insuranceWorchBench.queryInsuranceOrderInfoByOrderNo, params)
                .then(res => {
                    sc(res)
                })
        }
    },
    // 金融工作台
    finWorkbench: {
        getFinanceWorkbenchInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.getFinanceWorkbenchInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 金融协作报价新的查询工作台明细
        getFinanceWorkBenchInfoByOrderNo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.getFinanceWorkBenchInfoByOrderNo, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 新的金融协作报价新的查询工作台明细
        getFinanceWbHistoryInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.getFinanceWbHistoryInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 金融贷款申请客户联系资料保存
        editFinanceTrackCustomerInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.editFinanceTrackCustomerInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        pushFinanceWorkbenchInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.pushFinanceWorkbenchInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        queryFinanceWbHistoryInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.queryFinanceWbHistoryInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        queryFinanceWbTrackInfoPage: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.queryFinanceWbTrackInfoPage, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 老的金融贷款申请查询工作台信息
        queryFinanceWorkbenchInfoPage: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.queryFinanceWorkbenchInfoPage, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 新的金融贷款申请查询工作台信息
        queryFinanceOrderInfoTrackList: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.queryFinanceOrderInfoTrackList, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 新的分页查询金融协作台信息
        queryFinanceWorkBenchInfoList: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.queryFinanceWorkBenchInfoList, params)
                .then((r) => {
                    sc(r)
                })
        },
        synchFinanceWbInfoToFinanceOrder: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.synchFinanceWbInfoToFinanceOrder, params)
                .then((r) => {
                    sc(r)
                })
        },
        updateOrInsertFinanceWorkbenchInfoVo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.updateOrInsertFinanceWorkbenchInfoVo, params)
                .then((r) => {
                    sc(r)
                })
        },
        getFinanceWorkbenchTrackInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.getFinanceWorkbenchTrackInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        insertFinanceWorkbenchTrackInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.insertFinanceWorkbenchTrackInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        queryCarOrderActualPriceList: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.queryCarOrderActualPriceList, params)
                .then((r) => {
                    sc(r)
                })
        },
        // 新的金融协作台订单保存推送接口
        saveOrSynToOrderFinanceWbInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.finWorkbench.saveOrSynToOrderFinanceWbInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
        finanCustomInfo: {
            insert: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.finWorkbench.finanCustomInfo.insert, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 贷款客户资料保存接口
            editFinanceTrackCustomerInfo: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.finWorkbench.finanCustomInfo.editFinanceTrackCustomerInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            query: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.finWorkbench.finanCustomInfo.query, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            update: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.finWorkbench.finanCustomInfo.update, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            getFinanCustomInfo: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.finWorkbench.finanCustomInfo.getFinanCustomInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
            // 金融贷款申请贷款客户联系资料查询
            getFinanceTrackCustomerInfo: function (params, sc) {
                return axios.post(common.isdev() + apiUrl.finWorkbench.finanCustomInfo.getFinanceTrackCustomerInfo, params)
                    .then((r) => {
                        sc(r)
                    })
            },
        }
    },
    //数据报表
    dataReport: {
        //虚拟销售管理报表价格合计
        queryCarSkuSalesListNoPage: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dataReport.queryCarSkuSalesListNoPage, params)
                .then((res) => {
                    sc(res)
                })
        },
        //虚拟销售管理报表
        queryCarSkuSalesListBySearch: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dataReport.queryCarSkuSalesListBySearch, params)
                .then((res) => {
                    sc(res)
                })
        },
        //虚拟销售报表导出
        skuSalesListWriteExcel: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dataReport.skuSalesListWriteExcel, params)
                .then((res) => {
                    sc(res)
                })
        },
        //展厅历史客流导入查询
        selectByRelationCode: function (params, sc) {
            axios.post(common.isdev() + apiUrl.fileModule.selectByRelationCode, params)
                .then((res) => {
                    sc(res)
                })
        },
        //查询CRM跟进情况表信息
        queryCRMFollowUp: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dataReport.queryCRMFollowUp, params)
                .then((res) => {
                    sc(res)
                })
        },
        //查询订单相关统计报表 (sc dcc  跟进情况表 共用)
        queryOrderReport: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dataReport.queryOrderReport, params)
                .then((res) => {
                    sc(res)
                })
        },
        //查询DCC线索相关统计报表
        querySalesLeadsReport: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dataReport.querySalesLeadsReport, params)
                .then((res) => {
                    sc(res)
                })
        },
        //查询SC线索相关统计报表
        queryScSalesLeadsReport: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dataReport.queryScSalesLeadsReport, params)
                .then((res) => {
                    sc(res)
                })
        },
        //销售管理报表
        querySalesManageOrderReports: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dataReport.querySalesManageOrderReports, params)
                .then((res) => {
                    sc(res)
                })
        },
        // 当月累计单台车辆毛利
        queryCarTGpAvgOfInvoiced: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dataReport.queryCarTGpAvgOfInvoiced, params)
            .then((res) => {
                sc(res)
            })
        },
        // 查询二手车评估台数
        queryUsedCarOrderOfInvoiced: function (params, sc) {
            axios.post(common.isdev() + apiUrl.dataReport.queryUsedCarOrderOfInvoiced, params)
            .then((res) => {
              sc(res)
            })
        },
        //车款导出
        carInfoWriteExcel: function(params, sc){
            axios.post(common.isdev() + apiUrl.dataReport.carInfoWriteExcel, params)
            .then((res) => {
                sc(res)
            })
        },
        //收款明细查询
        queryOrderPayInfoPage: function(params, sc){
            axios.post(common.isdev() + apiUrl.dataReport.queryOrderPayInfoPage, params)
            .then((res) => {
                sc(res)
            })
        }
    },
    //跨部门策略表
    policyTable: {
        //策略表导出
        output: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.policyTable.output, params)
                .then(res => {
                    sc(res)
                })
        },
        queryList: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.policyTable.queryList, params)
                .then(res => {
                    sc(res)
                })
        },
        editCrossDeptManagerInfoList: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.policyTable.editCrossDeptManagerInfoList, params)
                .then(res => {
                    sc(res)
                })
        },
        queryCrossDeptPolicyActualInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.policyTable.queryCrossDeptPolicyActualInfo, params)
                .then(res => {
                    sc(res)
                })
        },
        editCrossDeptKpiInfoList: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.policyTable.editCrossDeptKpiInfoList, params)
        },
        queryCrossDeptKpiInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.policyTable.queryCrossDeptKpiInfo, params)
                .then(res => {
                    sc(res)
                })
        },
        editCrossDeptPostnRelationInfoList: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.policyTable.editCrossDeptPostnRelationInfoList, params)
                .then(res => {
                    sc(res)
                })
        },
        queryCrossDeptPostnRelationInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.policyTable.queryCrossDeptPostnRelationInfo, params)
                .then(res => {
                    sc(res)
                })
        }
    },
    lpe: {
        queryLpeList: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.lpe.queryLpeList, params)
                .then(res => {
                    sc(res)
                })
        },
        //导出lpe
        queryDownLoadURL: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.lpe.queryDownLoadURL, params)
                .then(res => {
                    sc(res)
                })
        },
    },
    //审批流
    approval: {
        query: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.approval.query, params)
                .then(res => {
                    sc(res)
                })
        }
    },
    //财务报表
    statement: {
        downLoad: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.statement.downLoad, params)
                .then(res => {
                    sc(res)
                })
        },

        queryStatement: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.statement.queryStatement, params)
                .then(res => {
                    sc(res)
                })
        },
        // 查询GP信息
        queryGpInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.statement.queryGpInfo, params)
                .then(res => {
                    sc(res)
                })
        },
        // 查询si和开票信息
        querySiInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.statement.querySiInfo, params)
                .then(res => {
                    sc(res)
                })
        },
        // 查询其他未税信息
        queryOtherInfo: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.statement.queryOtherInfo, params)
                .then(res => {
                    sc(res)
                })
        },
    },
    //销售管理报表
    salesManagerOrder: {
        exportToExcel: function (params, sc) {
            return axios.post(common.isdev() + apiUrl.salesManagerOrder.exportToExcel, params)
                .then(res => {
                    sc(res)
                })
        },
    },
    // 保险客户协作报价
    insuranceWorkbench: {
      queryInsWorkbenchInfoPage:function(params,sc) {
        axios.post(common.isdev() + apiUrl.insuranceWorkbench.queryInsWorkbenchInfoPage, params)
          .then(res => {
              sc(res)
        })
      }
    },
    serviceFreeSeting: {
        // 分页查询
        queryServiceFeeManageList: function (params, sc) {
            axios.post(common.isdev() + apiUrl.serviceFreeSeting.queryServiceFeeManageList, params)
                .then(res => {
                    sc(res)
                })
        },
        // 批量新增或修改
        editServiceFeeManageBatch: function (params, sc) {
            axios.post(common.isdev() + apiUrl.serviceFreeSeting.editServiceFeeManageBatch, params)
                .then(res => {
                    sc(res)
                })
        },
        // 同步数据
        loadServiceFeeManageCacheRedis: function (sc) {
            axios.post(common.isdev() + apiUrl.serviceFreeSeting.loadServiceFeeManageCacheRedis)
                .then(res => {
                    sc(res)
                })
        },
        // 根据相关id获取服务费信息
        getServiceFeeManage: function (params, sc) {
            axios.post(common.isdev() + apiUrl.serviceFreeSeting.getServiceFeeManage, params)
                .then(res => {
                    sc(res)
                })
        }
    },
    dynamicAllocation: {
        api: function (url, params, sc) {
            axios.post(common.isdev() + url + '.htm', params).then((r) => {
                sc(r)
            })
        }
    },
    /*毛利预测*/
   	MaoriForecast:{
        // 毛利预测表查询
        queryMaoriReportAdd: function (params, sc) {
            axios.post(common.isdev() + apiUrl.MaoriForecast.queryMaoriReportAdd, params)
                .then(res => {
                    sc(res)
                })
        },
        // 查询毛利预测报表数据明细
        queryMaoriForecastInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.MaoriForecast.queryMaoriForecastInfo, params)
                .then(res => {
                    sc(res)
                })
        },
        //更新毛利预测报表信息
        updatemaoriForecastAddInfo: function (params, sc) {
            axios.post(common.isdev() + apiUrl.MaoriForecast.updatemaoriForecastAddInfo, params)
                .then(res => {
                    sc(res)
                })
        },
        // 查询毛利预测报表门店总计信息
        queryMaoriReportAddTotal: function (params, sc) {
            axios.post(common.isdev() + apiUrl.MaoriForecast.queryMaoriReportAddTotal, params)
                .then(res => {
                    sc(res)
                })
        },
        // 批量更新毛利预测报表信息
        updateMaoriReportBatch: function (params, sc) {
            axios.post(common.isdev() + apiUrl.MaoriForecast.updateMaoriReportBatch, params)
                .then(res => {
                    sc(res)
                })
        },
        // 毛利预测表导出报表
        maoLiReportExcelFile: function (params, sc) {
            axios.post(common.isdev() + apiUrl.MaoriForecast.maoLiReportExcelFile, params)
                .then(res => {
                    sc(res)
                })
        },
        // 更新毛利预测表页面信息
        updateMaoriReportAddTotal: function (params, sc) {
            axios.post(common.isdev() + apiUrl.MaoriForecast.updateMaoriReportAddTotal, params)
                .then(res => {
                    sc(res)
                })
        },
   },
  //获取系统当前时间
  CurrentTime: {
    getCurrentTime: function (sc) {
      axios.post(common.isdev() + apiUrl.CurrentTime.getCurrentTime)
          .then(res => {
              sc(res)
          })
    },
  },
  // 客户类型
  CustomType: {
    querySalesLeadsInfoList: function(params, sc) {
      axios.post(common.isdev() + apiUrl.CustomType.querySalesLeadsInfoList, params)
        .then(res => {
            sc(res)
        })
    },
  },
  // 跟进记录新增
  SalesLeadFollowInfo: {
    editSalesLeadFollowInfo:function(params,sc) {
      axios.post(common.isdev() + apiUrl.SalesLeadFollowInfo.editSalesLeadFollowInfo, params)
        .then(res => {
            sc(res)
        })
    }
  },
  ByCustomCode: {
    ByCustomCodes:function(params,sc) {
        axios.post(common.isdev() + apiUrl.queryCompanyFinanceByCustomCode.ByCustomCode, params)
          .then(res => {
              sc(res)
          })
      }
  },
  ProcessingInfo:{
    getPayInfo:function(params,sc) {
        axios.post(common.isdev() + apiUrl.ProcessingInfo.getPayInfo, params)
          .then(res => {
              sc(res)
          })
      }
  },
  //收款导出
  WriteExcel:{
    getWriteExcel:function(params,sc) {
        axios.post(common.isdev() + apiUrl.WriteExcel.getWriteExcel, params)
          .then(res => {
              sc(res)
          })
      }
  },
  orderInvoiceWriteExcel:{
    getInvoiceWriteExcel:function(params,sc) {
        axios.post(common.isdev() + apiUrl.orderInvoiceWriteExcel.getInvoiceWriteExcel, params)
          .then(res => {
              sc(res)
          })
      }
  },
  //收入调整信息
  incomeadjustment:{
    //查询
    queryIncomeManagerListByCondition:function(params, sc){
        axios.post(common.isdev() + apiUrl.si.queryIncomeManagerListByCondition, params)
          .then(res => {
              sc(res)
        })
    },
    //删除收入调整信息
    deleteIncomeManagerment:function(params, sc){
        axios.post(common.isdev() + apiUrl.si.deleteIncomeManagerment, params)
          .then(res => {
              sc(res)
        })
    },
    //新增
    insert:function(params, sc){
        axios.post(common.isdev() + apiUrl.si.insert, params)
          .then(res => {
              sc(res)
        })
    },
    //批量新增
    insertManagermentList:function(params, sc){
        axios.post(common.isdev() + apiUrl.si.insertManagermentList, params)
          .then(res => {
              sc(res)
        })

    },
    //批量导出
    exportCarSiManageInfo:function(params, sc){
        axios.post(common.isdev() + apiUrl.si.exportCarSiManageInfo, params)
          .then(res => {
              sc(res)
        })
    },
    //批量导入
    parseCarSiManageInfo:function(params, sc){
        axios.post(common.isdev() + apiUrl.si.parseCarSiManageInfo, params)
          .then(res => {
              sc(res)
        })
    },
    //批量导出
    exportCommissionSiManageInfo:function(params, sc){
        axios.post(common.isdev() + apiUrl.si.exportCommissionSiManageInfo, params)
          .then(res => {
              sc(res)
        })
    },
    // 预测模板导出
    selectByRelationCode:function(params, sc){
        axios.post(common.isdev() + apiUrl.si.selectByRelationCode, params)
          .then(res => {
              sc(res)
        })
    },
    checkIncomeManagerment: function(params, sc) {
        axios.post(common.isdev() + apiUrl.si.checkIncomeManagerment, params)
        .then(res => {
            sc(res)
      	})
    }
  },
  //精品订单台账导出
  orderStand:{
  	orderStandInfo: function(params, sc){
  		axios.post(common.isdev() + apiUrl.orderStand.orderStandInfo, params)
  		.then(res => {
  			sc(res)
  		})
  	}
  },
  //PDCA集团盈利报表
  groupProfitDashboard: {
        //查询接口销售额，销售台数，TGP目标，TGP预测数据，实际值
    querySalesDataInfo: function (params, sc){
        axios.post(common.isdev() + apiUrl.groupProfitDashboard.querySalesDataInfo, params)
  		.then(res => {
  			sc(res)
  		})
    },
        //查询接口TGP达成 门店前十排名
    queryTGPReachSort: function (params, sc){
        axios.post(common.isdev() + apiUrl.groupProfitDashboard.queryTGPReachSort, params)
  		.then(res => {
  			sc(res)
  		})
    },
        //查询接口   库存状态
    queryStockStateModule: function (params, sc){
        axios.post(common.isdev() + apiUrl.groupProfitDashboard.queryStockStateModule, params)
  		.then(res => {
  			sc(res)
  		})
    },
        // 查询接口   漏斗表现
    queryFunnelPerformanceModule: function (params, sc){
        axios.post(common.isdev() + apiUrl.groupProfitDashboard.queryFunnelPerformanceModule, params)
  		.then(res => {
  			sc(res)
  		})
    },
        //查询接口  销售毛利
    querySaleMaoriModule: function (params, sc){
        axios.post(common.isdev() + apiUrl.groupProfitDashboard.querySaleMaoriModule, params)
  		.then(res => {
  			sc(res)
  		})
    },
        // 查询接口   衍生业务
        //queryDerivativeServicesModule
    queryDerivativeServicesModule: function (params, sc){
        axios.post(common.isdev() + apiUrl.groupProfitDashboard.queryDerivativeServicesModule, params)
            .then(res => {
                sc(res)
            })
        }, //queryHint
        //提示配置
    queryHint: function (params, sc){
        axios.post(common.isdev() + apiUrl.groupProfitDashboard.queryHint, params)
            .then(res => {
                sc(res)
            })
        },
  },
  individuation: {
    querySystemCarRelationInfo: function(params, sc){
        axios.post(common.isdev() + apiUrl.individuation.querySystemCarRelationInfo, params)
            .then(res => {
                sc(res)
            })
        },
    },
  persionDashboard: {
      //销量达成率
    querySalesAchievementRate: function(params, sc){
        axios.post(common.isdev() + apiUrl.persionDashboard.querySalesAchievementRate, params)
            .then(res => {
                sc(res)
            })
        },
    //查询车系销量对比
    queryCarSeriesContrast: function(params, sc){
        axios.post(common.isdev() + apiUrl.persionDashboard.queryCarSeriesContrast, params)
            .then(res => {
                sc(res)
            })
        },
    //查询集客相关信息
    queryCollectorInfo: function(params, sc){
        axios.post(common.isdev() + apiUrl.persionDashboard.queryCollectorInfo, params)
            .then(res => {
                sc(res)
            })
        },
    queryReceptionInfo: function(params, sc){
        axios.post(common.isdev() + apiUrl.persionDashboard.queryReceptionInfo, params)
            .then(res => {
                sc(res)
            })
        },
    queryDiscussInfo: function(params, sc){
        axios.post(common.isdev() + apiUrl.persionDashboard.queryDiscussInfo, params)
            .then(res => {
                sc(res)
            })
        },
    queryDerivativesBusiness: function(params, sc){
        axios.post(common.isdev() + apiUrl.persionDashboard.queryDerivativesBusiness, params)
            .then(res => {
                sc(res)
            })
        },
        //查询岗位类型
    queryEmpByPostn: function(params, sc){
        axios.post(common.isdev() + apiUrl.persionDashboard.queryEmpByPostn, params)
            .then(res => {
                sc(res)
            })
        },
       //查询门店下岗位信息
    queryStorePostList: function(params, sc){
        axios.post(common.isdev() + apiUrl.persionDashboard.queryStorePostList, params)
            .then(res => {
                sc(res)
            })
        },
    getTotalNum: function(params, sc){
        axios.post(common.isdev() + apiUrl.persionDashboard.getTotalNum, params)
            .then(res => {
                sc(res)
            })
        },
    }
}
