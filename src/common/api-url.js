/**
 *  create by lwx on 2018/02/01
 *
 *  此文件用于存放每个模块的新增, 编辑等权限接口url
 *    => 用来控制按钮权限
 *
 */

export default {
    //头部导出
    downLoad: {
        queryFileExportInfo: '/v1/fileSys/fileExportInfo/query.htm',    //分页查询文件导出信息
        deleteFileExportInfo: '/v1/fileSys/fileExportInfo/deleteFileExportInfo.htm',  //清空所有未标记的文件导出信息
        insertFileExportInfo: '/v1/fileSys/fileExportInfo/insert.htm',   //新增文件导出信息
        updateFileExportInfo: '/v1/fileSys/fileExportInfo/update.htm'    //更新文件导出信息
    },
    //销售数据看板 dashboard
    dashboard: {
        queryInStoreClueInfo: '/v1/report/queryInStoreClueInfo.htm', //客流-进店线索数板块
        queryTheMonthDeliveryReal: '/v1/report/queryTheMonthDeliveryReal.htm', //交车板块
        queryPureInvoicerOrderNums: '/v1/report/queryPureInvoicerOrderNums.htm', //整车开票板块
        queryOrderInforNums: '/v1/report/queryOrderInforNums.htm', //订单板块
        queryPureStockInfoNums: '/v1/report/queryPureStockInfoNums.htm', //库存板块
        queryScNameTGpOfRank: '/v1/report/clearingSettlement/queryScNameTGpOfRank.htm', //sc销售排名
        departmentStrategyReport: '/v1/fileSys/department/departmentStrategyReport.htm', //目标客流数据
        queryKeepReceptionStatistics: '/v1/report/sales/queryKeepReceptionStatistics.htm',  //留档日统计月统计
        queryReceptionStatistics: '/v1/report/sales/queryReceptionStatistics.htm',  //日统计&月统计
        queryGpCollectionInfoNoRank: '/v1/report/clearingSettlement/queryGpCollectionInfoNoRank.htm', //GP相关
        getTGPInfo: '/v1/report/dashboard/querySalesDataInfo.htm', //T.GP值以及门店集团数
        getStoreOrderInfo: '/v1/report/dashboard/queryTGPReachSort.htm', //门店排名值
        // 设置中心的页面更新时间
        getBusinessaffairsUpdateTime: '/v1/sales/policy/queryPolicyInfo.htm',  //商务政策页面的更新时间
        getMarketUpdateTime: '/v1/market/active/preciseSearchMarkets.htm',  //市场活动页面的更新时间
        getMainFinanceUpdateTime: '/v1/finance/prod/financesSearch.htm',  //金融热销方案页面的更新时间
        getskuCombUpdateTime: '/v1/sku/comb/queryCombinationInfoForPageByVo.htm', //组合商品设置页面的更新时间
        getLeftPageUpdateTime: '/v1/report/dashboard/queryReportUpdateTime.htm', // 剩余四个页面的更新时间
    },
    // 商品
    sku: {
        // 目录
        catalog: {
            query: '/api/v1/sku/catlog/querySkuCatLogInfo.htm',
            insert: '/api/v1/sku/catlog/insertSkuCatLogInfo.htm',
            update: '/api/v1/sku/catlog/updateSkuCatLogInfo.htm'
        },
        // 科达定制化
        keda: {
            querySkuInfoListKeda: '/v1/sku/skuInfo/querySkuInfoListKeda.htm'
        }
    },
    // 打印订单
    printTicket: {
        contact: '/v1/order/orderPrint/general.htm'
    },
    //文件模块
    fileModule: {
        //根据relationCode查询fileInfo
        selectByRelationCode: '/v1/fileSys/file/queryFileInfo.htm',
        //删除文件
        deleteFile: '/v1/fileSys/file/delete/file.htm'
    },
    // crm调研结果
    crmSituation: {
        queryQaCodeByStoreCodeAndQaType: '/v1/questionnaire/questionnaireInfo/queryQaCodeByStoreCodeAndQaType.htm',
        querySingleQuestionnaireAllQuestionAndAnswerByCodeFromDB: '/v1/questionnaire/questionnaireInfo/querySingleQuestionnaireAllQuestionAndAnswerByCodeFromDB.htm',
        queryAnswerRate: '/v1/task/getTaskQaInfoByCodes.htm',
    },
    // 市场活动相关接口
    market: {
        synchronization: '/v1/market/active/initMarKeyActivityToRedisCache.htm',
        delMarketCar: '/v1/market/car/addOrUpdateMultiMaCarInfo.htm',
        getMarketCarInfo: '/v1/market/active/getMarketCarModelSeries.htm',
        getFileInfo: '/v1/fileSys/file/selectByRelationCode.htm',
        getOutput: '/v1/fileSys/file/ListRelationInfosWriteIntoExcel.htm',
        queryCall: '/v1/salesdb/listRelationInfo/queryListRelationInfos.htm',
        queryMarketActivity: '/v1/market/active/preciseSearchMarkets.htm',
        getMarketActivityDetails: '/v1/market/active/getMarketActivityDetail.htm',
        editMarketActivity: '/v1/market/active/editMarketActivity.htm',
        getMarketActivityDetail: '/v1/market/active/getMarketCarModelSeries.htm',
        getMarketActivityStores: '/v1/market/active/getMarketStores.htm'
    },
    // menu
    menu: {
        insertMenuInfo: '/v1/sys/menu/insertMenuInfo',
        updateMenuInfo: '/v1/sys/menu/updateMenuInfo',
        queryMenuInfo: '/v1/sys/menu/queryMenuInfo.htm',
        getMenuInfo: '/v1/sys/menu/getMenuInfo',
        initAllMenuCache: '/v1/sys/menu/initAllMenuCache.htm',
        getReferenceInfo: '/v1/sys/ref/get.htm',
    },
    // 数据字典相关接口
    ordinalInfo: {
        insert: '/v1/sys/seq/insertSequenceInfo.htm',
        search: '/v1/sys/seq/querySequenceInfo.htm',
        edit: '/v1/sys/seq/updateSequenceInfo.htm',
        getSequence: '/v1/sys/seq/getSequence.htm',
        getSequenceList: '/v1/sys/seq/getSequenceList.htm',
        dataSync: '/v1/sys/seq/initSequenceToCache.htm',
    },
    // 登录相关接口
    toLogin: {
        login: '/v1/login.htm',
        getUserMenu: '/v1/getUserMenu.htm',
        getLoginInfo: '/v1/getLoginInfo.htm',
        getOrg: '/v1/login/getOrg.htm',
        changeLoginInfo: '/v1/login/changeLoginInfo.htm',
        loginOut: '/v1/logout.htm',
        getJurisdiction: '/v1/getUserAvailableInfo.htm',
        // 当前集团下的可用菜单
        queryPostUsableGroupResourceInfo: '/v2/systemfoundation/grouppost/queryPostUsableGroupResourceInfo.htm'
    },
    // 金融机构相关接口
    finance: {
        getQueryInfo: '/v1/finance/org/searchFinanceOrgs.htm',
        insertOrUpdata: '/v1/finance/org/editFinanceOrgs.htm',
        detail: '/v1/finance/org/detailFinanceOrg.htm',
        range: '/v1/finance/org/getFinanceOrgsUseRange.htm',
        batchInsertOrUpdata: '/v1/finance/org/addOrUpdateFinanceUseRange.htm',
        addIntersubsidyCode: '/v1/finance/org/editIntersubsidyInfo.htm',
        addProceduresCode: '/v1/finance/org/addOrUpdateFinanceOrgsServiceCharge.htm',
        getFinanceOrgsServiceCharge: '/v1/finance/org/getFinanceOrgsServiceCharge.htm',
        getFinanceOrgsLeaseInfo: '/v1/finance/org/getFinanceOrgsLeaseInfo.htm',
        getFinanceOrgsIntersubsidy: '/v1/finance/org/getFinanceOrgsIntersubsidy.htm',
        queryShopInfo: '/v1/sys/store/queryStoreInfoBySalesCode.htm',
        getSalesArea: '/v1/sys/SalesArea/getSalesAreaInfoByUserAvailableOnlyOneLevel.htm',
        getQueryIntersubsidy: '/v1/finance/org/getFinanceOrgsIntersubsidy.htm',
        getQueryProcedures: '/v1/finance/org/getFinanceOrgsServiceCharge.htm',
        getQueryScope: '/v1/finance/org/getAllFinanceOrgsUseRange.htm',
    },
    // 金融产品
    financePro: {
        downLoad: '/v1/fileSys/file/selectByRelationCode.htm',
        getQueryInfo: '/v1/finance/prod/financesSearch.htm',
        insertOrUpdata: '/v1/finance/prod/editFinanace.htm',
        getProType: '/v1/sys/ref/get.htm',
        queryFinancesInfo: '/v1/finance/prod/queryFinancesInfo.htm',
        editFinanace: '/v1/finance/prod/editFinanace.htm',
        detailFinance: '/v1/finance/prod/detailFinance.htm',
        addOrUpdateDetailInfoBatch: '/v1/finance/product/addOrUpdateDetailInfoBatch.htm',
        queryDetailInfo: '/v1/finance/product/queryDetailInfo.htm',
        queryDetailInfoList: '/v1/finance/product/queryDetailInfoList.htm',
        getAuthorizationOrgs: '/v1/finance/org/getAuthorizationOrgs.htm',
        queryDetailInfo: '/v1/finance/product/queryDetailInfo.htm',
        addOrUpdateDetailInfoBatch: '/v1/finance/product/addOrUpdateDetailInfoBatch.htm',
        addOrUpdateUseRangeInfoBatch: '/v1/finance/product/addOrUpdateUseRangeInfoBatch.htm',
        queryUseRangeInfoList: '/v1/finance/product/queryUseRangeInfoList.htm',
        queryDetailInfoByCarInfo: '/v1/finance/product/queryDetailInfoByCarInfo.htm',
    },
    car: {
        queryCarInfoByCarSearch: '/v1/sys/car/queryCarInfoByCarSearch.htm'
    },
    // 门店相关接口
    store: {
        queryStoreBysale: '/v1/sys/store/queryStoreInfoBySalesCode.htm',
        queryMainInfo: '/v1/sys/store/queryMainInfo.htm',
        queryStoreInfoBySalesCode: '/v1/sys/store/queryStoreInfoBySalesCode.htm'
    },
    // 区域相关接口
    area: {
        getChinaAreaInfoByAreaCode: '/v1/sys/chinaArea/getChinaAreaInfoByAreaCode.htm',
        getSalesAreaInfoByAreaCode: '/v1/sys/salesArea/getSalesAreaInfoByAreaCode.htm',
        getDeliveryAreaInfoByAreaCode: '/v1/sys/deliveryArea/getDeliveryAreaInfoByAreaCode.htm',
        getOrg: '/v1/sys/org/get.htm',
        workFlowGetOrg: '/v1/sys/org/get.htm'
    },
    // dcc相关接口
    dcc: {
        queryDccChannelThreadList: '/v1/report/sales/querySalesLeadsReportStatistics.htm',
        queryDCCChannelThreadListBottom: '/v1/report/sales/queryOrderReportStatistics.htm',
    },
    // ref 基础数据项
    ref: {
        queryDictionaryDetails: '/v1/sys/refDetail/query.htm',
        getDictionaryDetails: '/v1/sys/refDetail/get.htm',
        getDataDictionary: '/v1/sys/ref/get.htm',
        getDataDictionarys: '/v1/sys/ref/get.htm',
        queryNextReferenceDetails: '/v1/sys/refDetail/queryNextReferenceDetails.htm',
        queryFirstLevelReferenceDetails: '/v1/sys/ref/queryFirstLevelReferenceDetails.htm',
        queryRefDetail: '/v1/sys/refDetail/get.htm'
    },
    // 市场活动相关接口
    marketActivity: {
        getCarFactoryInfo: '/v1/sys/car/queryCarFactory.htm',
        getCarBrandInfo: '/v1/sys/car/queryCarBrand.htm',
        getCarSeriesInfo: '/v1/sys/car/queryCarSeries.htm',
        getCarModelInfo: '/v1/sys/car/queryCarModel.htm',
        getCarTypeInfo: '/v1/sys/car/queryCarInfoByCarSearch.htm',
        createdMarketActivity: '/v1/market/active/editMarketActivity.htm',
        addCarType: '/v1/market/car/addOrUpdateMultiMaCarInfo.htm',
        addActivityWords: '/v1/market/active/editMarketWords.htm',
        queryActivityInfo: '/v1/market/active/queryMarketWords.htm',
        queryVehicleRecallInfo: '/v1/market/active/queryVehicleRecallInfo.htm', //厂家召回查询
    },
    // 保险相关方案
    insurancePro: {
        queryInsuranceInfoVos: '/v1/insurance/insuranceInfo/queryInsuranceInfoVos.htm',
        queryCompanyInfoAll: '/v1/insurance/companyInfo/queryCompanyInfoAll.htm',
        insertInsuranceInfo: '/v1/insurance/insuranceInfo/insertInsuranceInfoVo.htm',
        queryInsuranceInfoVoByInsCode: '/v1/insurance/insuranceInfo/queryInsuranceInfoVoByInsCode.htm',
        updateInsuranceInfoVo: '/v1/insurance/insuranceInfo/updateInsuranceInfoVo.htm',
        queryCompanyInfoByCodesAndPagination: '/v1/insurance/companyInfo/queryCompanyInfoByCodesAndPagination.htm',
    },
    // 销售区域相关接口
    sale: {
        getSaleNameBySalecode: '/v1/sys/salesArea/querySalesAreaInfo.htm',
        getSalesAreaInfoByUserAvailableOnlyOneLevel: '/v1/sys/SalesArea/getSalesAreaInfoByUserAvailableOnlyOneLevel.htm',
    },
    // 密码编辑
    resetpassword: {
        reset: '/v1/sys/emp/userUpdatePassword.htm'
    },
    // 保险机构相关接口
    insurance: {
        queryByCocode: '/v1/insurance/companyInfo/queryCompanyInfoByCoCode.htm',
        insertOrUpdata: '/v1/insurance/companyInfo/editCompanyInfo.htm',
        insertOrUpdataRange: '/v1/insurance/companyUseRangeInfo/editCompanyUseRangeInfoVos.htm',
        queryRange: '/v1/insurance/companyUseRangeInfo/queryCompanyUseRangeInfoByCoCode.htm',
        query: '/v1/insurance/insuranceTypesInfo/queryInsuranceTypesInfoVosByCoCode.htm',
        insert: '/v1/insurance/insuranceTypesInfo/editInsuranceTypesInfoVos.htm',
        queryCostByCocode: '/v1/insurance/companyCommissionInfo/queryCompanyCommissionInfoByStoreCodeAndCoCode.htm',
        queryCost: '/v1/insurance/companyCommissionInfo/queryCompanyCommissionInfoByCommCodeAndCoCode.htm',
        queryStoreInfoByCoCode: '/v1/insurance/companyCommissionInfo/queryStoreInfoByCoCode.htm',
        insertCost: '/v1/insurance/companyCommissionInfo/editCompanyCommissionInfos.htm',
        editInsurance: '/v1/insurance/companyInfo/editCompanyInfo.htm',
        getInsuranceDivice: '/v1/insurance/companyInfo/queryCompanyInfoByCodesAndPagination.htm',
        getAreas: '/v1/sys/SalesArea/getSalesAreaInfoByUserAvailableOnlyOneLevel.htm',
    },
    // 获取采购区域名称
    purchase: {
        getPurchasingAreaInfoByAreaCode: '/v1/sys/purchasingArea/getPurchasingAreaInfoByAreaCode.htm'
    },
    // crm 相关接口
    crm: {
        getQaInfo: '/v1/questionnaire/questionnaireInfo/queryAllQuestionnaireInfosByPaginationFromDB.htm',
        addQa: '/v1/questionnaire/questionnaireInfo/insertQuestionnaireInfo.htm',
        editQa: '/v1/questionnaire/questionnaireInfo/updateQuestionnaireInfo.htm',
        addQuestionTitle: '/v1/questionnaire/questionInfo/insertQuestionInfos.htm',
        addQuestionAnswer: '/v1/questionnaire/answerInfo/insertAnswerInfos.htm',
        queryQuestion: '/v1/questionnaire/questionInfo/queryQuestionInfosByPaginationAndQaCode.htm',
        editQuestion: '/v1/questionnaire/questionInfo/updateQuestionInfos.htm',
        quertQaScopc: '/v1/questionnaire/qaUseRangeInfo/queryQaUseRangeInfoByPaginationAndQaCodeFromDB.htm',
        addQaScope: '/v1/questionnaire/qaUseRangeInfo/insertQaUseRangeInfo.htm',
        editQaScope: '/v1/questionnaire/qaUseRangeInfo/updateQaUseRangeInfo.htm',
    },
    // 商品相关接口
    product: {
        classification: {
            getSkuCategoryInfoBycategoryCode: '/v1/sku/category/getSkuCategoryInfoBycategoryCode.htm',
            insert: '/v1/sku/category/insertSkuCategoryInfo.htm',
            update: '/v1/sku/category/updateSkuCategoryInfo.htm',
            getQueryInfo: '/v1/sku/category/querySkuCategoryInfo.htm',
            init: '/v1/sku/category/initSkuCategoryToCache.htm',
        },
        catalog: {
            getSkuCatLogInfoByCatlogCode: '/v1/sku/catlog/getSkuCatLogInfoByCatlogCode.htm',
            insert: '/v1/sku/catlog/insertSkuCatLogInfo.htm',
            update: '/v1/sku/catlog/updateSkuCatLogInfo.htm',
            getQueryInfo: '/v1/sku/catlog/querySkuCatLogInfo.htm',
            init: '/v1/sku/catlog/initSkuCatLogToCache.htm',
        },
        skuPrice: {
            skuInfo:'/v2/sku/skuInfo/query.htm',
            query: '/v1/sku/skuPriceInfo/query.htm',
            initRedis: '/v1/sku/skuPriceInfo/initRedisCache.htm',
            insert: '/v1/sku/skuPriceInfo/insert.htm',
            update: '/v1/sku/skuPriceInfo/update.htm',
            querySkuPriceInfoByCode: '/v1/sku/skuPriceInfo/querySkuPriceInfoByCode.htm',
            editSkuPriceInfoVos: '/v1/sku/skuPriceInfo/editSkuPriceInfoVos.htm',
            initRedisCache: '/v1/sku/skuPriceInfo/initRedisCache.htm',
            querySkuInfo: '/v1/sku/skuInfo/query.htm',
            getSkuPriceInfo: '/v1/sku/skuPriceInfo/getSkuPriceInfo.htm',
        },
        skuComb: {
            queryCombinationInfoForPageByVo: '/v1/sku/comb/queryCombinationInfoForPageByVo.htm',
            editCombinationInfos: '/v1/sku/comb/editCombinationInfos.htm',
            addOrUpdateCombinationDetailInfoBatch: '/v1/sku/comb/addOrUpdateCombinationDetailInfoBatch.htm',
            getCombinationDetailInfo: '/v1/sku/comb/getCombinationDetailInfo.htm',
            addOrUpdateCombinationPriceInfoBatch: '/v1/sku/comb/addOrUpdateCombinationPriceInfoBatch.htm',
            getCombinationPriceInfo: '/v1/sku/comb/getCombinationPriceInfo.htm',
            addOrUpdateCombinationUseRangeBatch: '/v1/sku/userange/addOrUpdateCombinationUseRangeBatch.htm',
            getCombinationUseRange: '/v1/sku/userange/getCombinationUseRange.htm',
            initCombinationInfoToRedisCache: '/v1/sku/comb/initCombinationInfoToRedisCache.htm'  //组合商品同步数据
        },
        commodityBrand: {
            updataCommodityBrand: '/v1/sku/brand/editSkuBrandInfo.htm',
            queryCommodityBrand: '/v1/sku/brand/querySkuBrandInfoForPageByVo.htm',
            initCommodityBrand: '/v1/sku/brand/initSkuBrandInfoToRedisCache.htm'
        },
        commodityUnit: {
            updataCommodityUnit: '/v1/sku/unit/editSkuUnitInfo.htm',
            queryCommodityUnit: '/v1/sku/unit/querySkuUnitInfoForPageByVo.htm',
            initCommodityUnit: '/v1/sku/unit/initSkuUnitInfoToRedisCache.htm',
        },
        commodityPack: {
            updataCommodityPack: '/v1/sku/pack/editSkuPackInfos.htm',
            queryCommodityPack: '/v1/sku/pack/querySkuPackInfoForPageByVo.htm',
            init: '/v1/sku/pack/initSkuPackInfoToRedisCache.htm',
        },
        commodityBirthplace: {
            updataCommodityBirthplace: '/v1/sku/area/editSkuAreaInfo.htm',
            queryCommodityBirthplace: '/v1/sku/area/querySkuAreaInfoForPageByVo.htm',
            init: '/v1/sku/area/initSkuAreaInfoToRedisCache.htm',
        },
        models: {
            queryModels: '/v1/sku/skuCarRelationInfo/query.htm',
            addMOdels: '/v1/sku/skuCarRelationInfo/insert.htm',
            editModels: '/v1/sku/skuCarRelationInfo/update.htm',
            getQueryInfo: '/v1/sys/car/queryCar.htm',
        },
        archives: {
            queryArchives: '/v1/sku/skuInfo/query.htm',
            addArchives: '/v1/sku/skuInfo/insert.htm',
            editArchives: '/v1/sku/skuInfo/update.htm',
            getEditInfo: '/v1/sku/skuInfo/get.htm',
            getCarloadDetailInfo: '/v1/sku/skuInfo/queryCarSkuDetailInfo.htm',
            updateCarloadDetailInfo: '/v1/sku/skuInfo/updateCarSkuDetailInfo.htm',
            additionInfo: '/v1/sku/skuInfo/editAddSkuInfoVo.htm',
            querylockinfo: '/v1/sku/produceLock/querySkuLockInfo.htm',
            editlock: '/v1/sku/produceLock/editProduceLockInfo.htm',
            cache: '/v1/sku/skuInfo/initRedisCache.htm',
        }
    },
    supplyChain: {
        queryInventory: '/v2/report/supplyChain/stockInfo/queryStockInfoVos.htm',
        // /v1/supplyChain/stockInfo/queryStockInfoVos.htm
        // 仓库信息接口
        warehouse: {
            queryInfoByStoreCode: '/v1/supplyChain/getWarehouseInfoWithNoPage/get.htm',
            queryInfoByCode: '/v1/supplyChain/warehouseInfo/get.htm',
            insert: '/v1/supplyChain/warehouseInfo/insert.htm',
            update: '/v1/supplyChain/warehouseInfo/update.htm',
            getQueryInfo: '/v1/supplyChain/warehouseInfo/query.htm',
            init: '/v1/supplyChain/warehouseInfo/initRedisCache.htm',
            insertWhStoreInfoList: '/v1/supplyChain/warehouse/insertWhStoreInfoList.htm',
            queryWhStoreInfoList: '/v1/supplyChain/warehouse/queryWhStoreInfoList.htm',
            deleteWhStoreInfoList: '/v1/supplyChain/warehouse/deleteWhStoreInfoList.htm'
        },
        // 库区相关接口
        whArea: {
            queryInfoByCode: '/v1/supplyChain/warehouse/queryWarehouseAreaInfo.htm',
            getQueryInfo: '/v1/supplyChain/warehouse/queryWarehouseAreaInfoList.htm',
            insert: '/v1/supplyChain/warehouse/insertWarehouseAreaInfo.htm',
            update: '/v1/supplyChain/warehouse/updateWarehouseAreaInfo.htm',
            edit: '/v1/supplyChain/warehouse/editWarehouseAreaInfoList.htm',
        },
        // 库位信息
        whLocation: {
            queryInfoByCode: '/v1/supplyChain/warehouse/queryWarehouseLocationInfo.htm',
            getQueryInfo: '/v1/supplyChain/warehouse/queryWarehouseLocationInfoList.htm',
            insert: '/v1/supplyChain/warehouse/insertWarehouseLocationInfo.htm',
            update: '/v1/supplyChain/warehouse/updateWarehouseLocationInfo.htm',
            edit: '/v1/supplyChain/warehouse/editWarehouseLocationInfoList.htm',
        },
        // 供应商相关接口
        supplier: {
            querySupplierInfo: '/v1/supplier/querySupplierInfo.htm',
            insertSupplierInfo: '/v1/supplier/insertSupplierInfo.htm',
            updateSupplierInfo: '/v1/supplier/updateSupplierInfo.htm',
            supplierSyncBtn: '/v1/supplier/initSupplierInfoToCache.htm'
        },
        // 供应商发票
        supplierInvoice: {
            querySupplierInvoiceInfoWithNoPage: '/v1/supplyChain/supplierInvoice/querySupplierInvoiceInfoWithNoPage.htm',
            batchEditSupplierInvoiceInfo: '/v1/supplyChain/supplierInvoice/batchEditSupplierInvoiceInfo.htm',
        },
        // 采购订单
        purchaseOrder: {
            insertPurchaseOrderInfo: '/v1/purchaseOrder/insertPurchaseOrderInfo.htm',
            updatePurchaseOrderInfo: '/v1/purchaseOrder/updatePurchaseOrderInfo.htm',
            submitPurchaseOrderInfo: '/v1/purchaseOrder/submitPurchaseOrderInfo.htm',
            queryPurchaseOrderInfo: '/v1/purchaseOrder/queryPurchaseOrderInfo.htm',
            getPurchaseOrderInfoByCode: '/v1/purchaseOrder/getPurchaseOrderInfoByCode.htm',
            cancelPurchaseOrderInfo: '/v1/purchaseOrder/cancelPurchaseOrderInfo.htm',
            queryPoSkuDetailInfo: '/v1/purchaseOrder/queryPoSkuDetailInfo.htm',
            editPoSkuDetailInfo: '/v1/purchaseOrder/editPoSkuDetailInfo.htm',
            cancelPoSkuDetailInfo: '/v1/purchaseOrder/cancelPoSkuDetailInfo.htm',
            queryPoCarSkuDetailBySkuCodes: '/v1/purchaseOrder/queryPoCarSkuDetailBySkuCodes.htm',
        },
        // 整车采购 采购管理
        procurement: {
            downloadOrder: '/v1/fileSys/file/goodsStockAccountWriteIntoExcel.htm',
            queryWholeCarByPages: '/v1/purchaseOrder/queryPurchaseOrderInfo.htm',
            queryNewOrder: '/v1/purchaseOrder/queryPoCarSkuDetailInfoNoPage.htm',
            saveProcurementNum: '/v1/purchaseOrder/insertPurchaseOrderInfo.htm',
            queryDictionaryDetails: '/v1/sys/refDetail/query.htm',
            submitOrder: '/v1/purchaseOrder/submitPurchaseOrderInfo.htm',
            changeOrder: '/v1/purchaseOrder/updatePurchaseOrderInfo.htm',
            deleteOrder: '/v1/purchaseOrder/cancelPurchaseOrderInfo.htm',
            deleteItem: '/v1/purchaseOrder/cancelPoCarSkuDetailInfo.htm',
            getEntrepot: '/v1/supplyChain/getWarehouseInfoWithNoPage/get.htm',
            // 开票
            ticket: {
                queryInfo: '/v1/invoice/queryPoCarskuInvoiceList.htm',
                getDetail: '/v1/invoice/queryPoCarskuInvoiceByOrderNoOrSkuCode.htm',
                edit: '/v1/invoice/editCarSkuInvoice.htm',
                editCarAdjustOutStockInvoice: '/v1/invoice/editCarAdjustOutStockInvoice.htm',
                queryCarAdjustOutStockInvoiceByCondition: '/v1/invoice/queryCarAdjustOutStockInvoiceByCondition.htm',
                queryCarAdjustOutStockInvoiceList: '/v1/invoice/queryCarAdjustOutStockInvoiceList.htm',
            },
            // 付款
            pay: {
                queryInfo: '/v1/payment/queryPoCarskuPaymentList.htm',
                getDetail: '/v1/payment/queryPoCarskuPaymentByOrderNoOrSkuCode.htm',
                edit: '/v1/payment/editCarSkuPayment.htm',
                editCarAdjustOutStockPayment: '/v1/payment/editCarAdjustOutStockPayment.htm',
                queryCarAdjustOutStockPaymentByCondition: '/v1/payment/queryCarAdjustOutStockPaymentByCondition.htm',
                queryCarAdjustOutStockPaymentList: '/v1/payment/queryCarAdjustOutStockPaymentList.htm',
                exportPayReceipts: '/v1/fileSys/file/poCarskuPaymentListWriteIntoExcel.htm', // 整车付款导出
            },
            // 入库
            storage: {
                queryInfo: '/v1/stockin/queryStockInList.htm',
                getDetail: '/v1/stockin/getUnconfirmedStockInBySkuCodeOrOrderNo.htm',
                confirm: '/v1/stockin/confirmStockIn.htm',
                submitAdjustInStockInfo: '/v1/stockin/carAdjust/submitAdjustInStockInfo.htm',
                queryCarAdjustInStockInfo: '/v1/carAdjustInStockInfo/carAdjustInStockInfo/queryCarAdjustInStockDetailInfo.htm',
            }
        },
        // 库存信息管理
        stockInfo: {
            inStockList: '/v1/supplyChain/stockInfo/inStockList.htm',
            queryCarStockInfos: '/v1/report/supplyChain/stockInfo/queryCarStockInfos.htm',
            queryCarStockPurchaseFee: '/v1/report/supplyChain/stockInfo/queryCarStockPurchaseFee.htm',
            stockInfoWriteExcel: '/v1/fileSys/file/stockInfoWriteExcel.htm',
        },
        // 整车内采内销-分享平台
        carShareInfo: {
            get: '/v1/supplychain/carShareInfo/get.htm',
            insert: '/v1/supplychain/carShareInfo/insert.htm',
            update: '/v1/supplychain/carShareInfo/update.htm',
            query: '/v1/supplychain/carShareInfo/query.htm',
            submitCarShareInfo: '/v1/supplychain/carShareInfo/submitCarShareInfo.htm',
            cancelCarShareInfo: '/v1/supplychain/carShareInfo/cancelCarShareInfo.htm',
        },
        // 整车内采内销-分享平台-详细
        carShareDetailInfo: {
            queryCarShareDetailsOnFlag: '/v1/supplychain/carShareDetailInfo/queryCarShareDetailsOnFlag.htm',
            queryCarShareDetailsByCondition: '/v1/supplychain/carShareDetailInfo/queryCarShareDetailsByCondition.htm',
            queryCarShareDetailInfoVosNoPage: '/v1/supplychain/carShareDetailInfo/queryCarShareDetailInfoVosNoPage.htm',
            editCarShareDetailInfoList: '/v1/supplychain/carShareDetailInfo/editCarShareDetailInfoList.htm',
            updateCarShareDetailOff: '/v1/supplychain/carShareDetailInfo/updateCarShareDetailOff.htm',
            insert: '/v1/supplychain/carShareDetailInfo/insert.htm',
            update: '/v1/supplychain/carShareDetailInfo/update.htm',
            get: '/v1/supplychain/carShareDetailInfo/get.htm',
        },
        // 科达定制化接口
        kada: {
            purchaseOrder: {
                insertPurchaseOrderInfo: '/v1/keda/purchaseOrder/insertPurchaseOrderInfo.htm',
                updatePurchaseOrderInfo: '/v1/keda/purchaseOrder/updatePurchaseOrderInfo.htm',
                submitPurchaseOrderInfo: '/v1/keda/purchaseOrder/submitPurchaseOrderInfo.htm',
                queryPurchaseOrderInfo: '/v1/keda/purchaseOrder/queryPurchaseOrderInfo.htm'
            },
            procurement: {
                // 付款
                pay: {
                    queryInfo: '/v1/keda/payment/queryPoCarskuPaymentList.htm',
                    getDetail: '/v1/keda/payment/queryPoCarskuPaymentByOrderNoOrSkuCode.htm',
                    edit: '/v1/keda/payment/editCarSkuPayment.htm',
                    editCarAdjustOutStockPayment: '/v1/payment/editCarAdjustOutStockPayment.htm',
                    queryCarAdjustOutStockPaymentByCondition: '/v1/payment/queryCarAdjustOutStockPaymentByCondition.htm',
                    queryCarAdjustOutStockPaymentList: '/v1/payment/queryCarAdjustOutStockPaymentList.htm',
                },
            }
        }
    },
    // 工作流
    workFlow: {
        init: '/v1/workFlow/wf/initRedisCache.htm',
        queryWorkFlow: '/v1/workFlow/wf/queryWorkflowInfoFromDB.htm',
        addWorkFlow: '/v1/workFlow/wf/insertWorkFlowInfo.htm',
        queryAccordingToCode: '/v1/workFlow/wf/queryWorkflowInfoByWfCodeFromDB.htm',
        queryNodesByCode: '/v1/workFlow/wf/queryWorkFlowNode.htm',
        updataWorkFlow: '/v1/workFlow/wf/updateWorkFlowInfo.htm',
        addWorkFlowNode: '/v1/workFlow/wf/editWorkFlowInfo.htm',
        queryWorkflowList: '/v1/dbinit/workflow/queryWorkflowList.htm',
        updateWorkflowOff: '/v1/dbinit/workflow/updateWorkflowOff.htm',
    },
    //客户管理
    clientadmin: {
        clientmaininfo: {
            addclient: '/v1/cus/custom/insertCustomInfo.htm',
            queryclientmaininfo: '/v1/cus/custom/queryCustomMainInfo.htm',
            updataclientmaininfo: '/v1/cus/custom/updateCustomInfo.htm',
            queryallclientmaininfo: '/v1/cus/custom/queryCustomAllInfo.htm',
        },
        clientfinance: {
            addclientfinance: '/v1/cus/finance/insertFinanceInfo.htm',
            queryclientfinance: '/v1/cus/finance/queryFinanceInfo.htm',
            querydetailedclientfinance: '/v1/cus/finance/queryFinanceInfoByCode.htm',
            updataclientfinance: '/v1/cus/finance/updateFinanceInfo.htm',
        },
        clientcontacts: {
            addclientcontacts: '/v1/cus/contact/insertContactInfo.htm',
            queryclientcontacts: '/v1/cus/contact/queryContactInfo.htm',
            querydetailedclientcontacts: '/v1/cus/contact/queryContactInfoByCode.htm',
            updataclientcontacts: '/v1/cus/contact/updateContactInfo.htm',
        },
        clientidtype: {
            addclientidtype: '/v1/cus/contact/insertcertificateTypeInfo.htm',
            queryclientidtype: '/v1/cus/contact/querycertificateTypeInfo.htm',
            querydetailedclientidtype: '/v1/cus/contact/queryCertificateTypeInfoByCode.htm',
            updataclientidtype: '/v1/cus/contact/updatecertificateTypeInfo.htm',
        },
        clientreceiver: {
            addclientreceiver: '/v1/cus/receiver/insertReceiverInfo.htm',
            queryclientreceiver: '/v1/cus/receiver/queryReceiverInfo.htm',
            querydetailedclientreceiver: '/v1/cus/receiver/queryReceiverInfoByCode.htm',
            updataclientreceiver: '/v1/cus/receiver/updateReceiverInfo.htm',
        }
    },
    sales: {
        // 销售目标设置
        salesTargetPlan: {
            querySalesTargetPlanList: '/v1/sales/salesTargetPlan/querySalesTargetPlanList.htm',
            editSalesTargetPlan: '/v1/sales/salesTargetPlan/editSalesTargetPlan.htm',
            parseSalesTargetExcelFile: '/v1/file/parseSalesTargetExcelFile.htm',
        },
        reception: {
            queryExhibitionHallFlowLog: '/v1/sales/reception/queryExhibitionHallFlowLog.htm',
            autoRecordCustomerEnterStoreObjective: '/v1/sales/reception/autoRecordCustomerEnterStoreObjectiveByStoreCode.htm'
        },
        appointment: {
            queryPhoneCallList: '/v1/sales/appointment/querySalesAdviserCluePhone.htm'
        }
    },
    login: {
        login: '/v1/login.htm'
    },
    getUserAvailableInfo: '/v1/getUserAvailableInfo.htm',
    getSalesAreaInfoByUserAvailableAllLevel: '/v1/sys/SalesArea/getSalesAreaInfoByUserAvailableOnlyOneLevel.htm',
    // 前台接待
    receptionist: {
        downLoad: '/v1/fileSys/file/selectByRelationCode.htm',
        downLoadErrorInfo: '/v1/fileSys/file/downloadSalesleadsImportExcelFile.htm',
        queryToday: '/v1/sales/reception/queryReceptionListInfoByDayAndSc.htm',
        queryAppointmentList: '/v1/sales/appointment/queryAppointmentInfoByDayAndStore.htm',
        queryInfoList: '/v1/sales/reception/queryReceptionListInfoVos.htm',
        updateInfoList: '/v1/sales/reception/updateReceptionListInfoVo.htm',
        updateDrives: '/v1/car/updateTryDriver.htm',
        startReception: '/v1/sales/reception/startReceptionListInfo.htm',
        startTryDriver: '/v1/car/startTryDriver.htm',
        cancelReception: '/v1/sales/reception/cancelReceptionListInfoVo.htm',
        queryByPhone: '/v1/leads/validateSalesLeadsByMobilePhone.htm',
        queryWorkSc: '/v1/workSchedule/queryWorkScheduleInfoByPrecise.htm',
        editArrange: '/v1/workSchedule/editWorkScheduleInfo.htm',
        queryWorkList: '/v1/sys/emp/queryEmpByStoreCode.htm',
        getReceptioning: '/v1/sales/reception/queryScInfoByDayAndReception.htm',
        changeReceptionReceiver:'/v1/sales/reception/changeReceptionReceiver.htm'
    },
    // 调研
    research: {
        saveAnswer: '/v1/questionnaire/userAnswerInfo/insertUserAnswerInfos.htm',
        getTaskInfo: '/v1/task/queryTaskInfoAll.htm',
        saveTaskInfo: '/v1/task/saveTaskAnswer.htm',
        queryQaTitie: '/v1/questionnaire/questionnaireInfo/queryQAByQaTypeAndStore.htm',
        queryTaskList: '/v1/task/queryTaskInfoByCodes.htm',
    },
    // 线索相关
    addclientmain: {
        create: '/v1/leads/insertSalesLeads.htm',
        checkMobile: '/v1/leads/validateSalesLeadsByMobilePhone.htm',
        queryList: '/v1/leads/querySalesLeadsInfoList.htm',
        getSalesLeadsInfo: '/v1/leads/getSalesLeadsInfo.htm',
        update: '/v1/leads/updateSalesLeads.htm',
        downLoadData: '/v1/fileSys/file/SalesLeadsListWriteIntoExcel.htm',
    },
    policyInfo: {
        querypolicyInfo: '/v1/sales/policy/queryPolicyInfo.htm',
        revisepolicyInfo: '/v1/sales/sku/policy/editPolicyStatus.htm',
    },
    // 财务管理
    financing: {
        queryPayInfo: '/v1/clearingSettlement/order/queryOrderInfoVosByApproval.htm',
        queryPayInfoList: '/v1/report/order/queryOrderInfoVosByApproval.htm',
        getPayInfo: '/v1/clearingSettlement/order/queryOrderInfoVosByCodeFromDB.htm',
        newgetPayInfo: '/v1/clearingSettlement/orderPayment/queryOrderPaymentBySourceOrderNo.htm',
        getPayInfoList: '/v1/clearingSettlement/orderPayment/queryOrderPaymentBySourceOrderNo.htm',
        queryPayHistory: '/v1/clearingSettlement/orderPayment/queryOrderPaymentInfo.htm',
        addPayInfoList: '/v1/clearingSettlement/orderPayment/editOrderPaymentInfoList.htm',
        updataPayInfo: '/v1/clearingSettlement/orderPayment/updateOrderPaymentInfo.htm',
        queryOrderBillingInfo: '/v1/clearingSettlement/orderInvoice/queryOrderInvoiceInfo.htm',
        addOrderBillingInfo: '/v1/clearingSettlement/orderInvoice/editOrderInvoiceInfoList.htm',
        queryOrderPriceInfoByCodeFromDB:'/v1/clearingSettlement/order/queryOrderPriceInfoByCodeFromDB.htm'
    },
    // GP归属
    GPbelonging: {
        queryDetail: '/v1/sys/GpConfigDetail/queryGpConfigDetailInfoVos.htm',
        addDetail: '/v1/sys/GpConfigDetail/insertGpConfigDetailInfoVo.htm',
        initRedis: '/v1/sys/gpConfig/initRedisCache.htm',
        editDetail: '/v1/sys/GpConfigDetail/updateGpConfigDetailInfoVo.htm',
        getGpConfigDetailInfo: '/v1/sys/gpConfigDetail/getGpConfigDetailInfoVo.htm',
        queryAllReferenceDetailsForGp: '/v1/sys/refDetail/queryAllReferenceDetailsForGp.htm'
    },
    // 订单相关接口
    order: {
        newQueryList: '/v1/report/clearingSettlement/order/queryOrderInfoBySearch.htm',
        queryList: '/v1/report/clearingSettlement/order/queryOrderInfoBySearch.htm',
        queryDetailByOrderNo: '/v1/clearingSettlement/order/queryOrderInfoVosByCodeFromDB.htm',
        getCarOrderInfoByOrderNo: '/v1/clearingsettlement/carOrderInfo/getCarOrderInfoByOrderNo.htm',
        querySkuDetail: '/v1/clearingSettlement/ordersku/querySkuOrderDetailInfo.htm',
        getSkuOrderNo: '/v1/clearingSettlement/ordersku/getSkuOrderInfo.htm',
        queryApproveResume: '/v1/workFlow/orderwf/queryOrderWfDetailInfoByOrderNo.htm',
        downLoadData: '/v1/fileSys/clearingSettlement/orderInfoWriteExcel.htm',
        updateCarOrderInfo: '/v1/clearingsettlement/carOrderInfo/updateCarOrderInfo.htm',
        getMsrp: '/v1/clearingsettlement/carOrderInfo/getMsrp.htm'
    },
    //SNP归属设置
    SNPbelonging: {
        queryDetail: '/v1/sys/snpConfigDetail/querySnpConfigDetailInfoVos.htm',
        addDetail: '/v1/sys/snpConfigDetail/insertSnpConfigDetailInfoVo.htm',
        initRedis: '/v1/sys/snpConfig/initRedisCache.htm',
        editDetail: '/v1/sys/snpConfigDetail/updateSnpConfigDetailInfoVo.htm',
    },
    // SC通话时长导出
    exHibitionHallFlow: {
        export: '/v1/fileSys/file/exhibitionHallFlowLogWriteIntoExcel.htm',
    },
    // 展厅客流
    scPhoneCallList: {
        export: '/v1/fileSys/file/downloadSalesAdviserCluePhoneImportExcelFile.htm'
    },
    // 员工信息
    emp: {
        queryEmpByStoreCode: '/v1/sys/emp/queryEmpByStoreCode.htm'
    },
    // 整车调出
    carAdjustOutStockInfo: {
        carAdjustOutStockInfo: {
            insert: '/v1/carAdjustOutStockInfo/carAdjustOutStockInfo/insert.htm',
            update: '/v1/carAdjustOutStockInfo/carAdjustOutStockInfo/update.htm',
            query: '/v1/carAdjustOutStockInfo/carAdjustOutStockInfo/query.htm',
            get: '/v1/carAdjustOutStockInfo/carAdjustOutStockInfo/get.htm',
            confirmAdjustOutCarInfo: '/v1/carAdjustOutStockInfo/confirmAdjustOutCarInfo.htm',
            editCarAdjustOutStockInfoList: '/v1/carAdjustOutStockInfo/carAdjustOutStockInfo/editCarAdjustOutStockInfoList.htm',
            cancelAdjustOutCarInfo: '/v1/carAdjustOutStockInfo/cancelAdjustOutCarInfo.htm',
        },
        carAdjustOutStockDetailInfo: {
            insert: '/v1/carAdjustOutStockDetailInfo/carAdjustOutStockDetailInfo/insert.htm',
            update: '/v1/carAdjustOutStockDetailInfo/carAdjustOutStockDetailInfo/update.htm',
            get: '/v1/carAdjustOutStockDetailInfo/carAdjustOutStockDetailInfo/get.htm',
            editCarAdjustOutStockDetailInfoList: '/v1/carAdjustOutStockDetailInfo/carAdjustOutStockDetailInfo/editCarAdjustOutStockDetailInfoList.htm',
            deleteOutAdjustDetail: '/v1/carAdjustOutStockInfo/deleteOutAdjustDetail.htm',
        },

    },
    // 整车调入
    carAdjustInStockInfo: {
        carAdjustInStockInfo: {
            insert: '/v1/carAdjustInStockInfo/carAdjustInStockInfo/insert.htm',
            update: '/v1/carAdjustInStockInfo/carAdjustInStockInfo/update.htm',
            query: '/v1/carAdjustInStockInfo/carAdjustInStockInfo/query.htm',
            get: '/v1/carAdjustInStockInfo/carAdjustInStockInfo/get.htm',
            submitCarAdjustInStockInfo: '/v1/carAdjustInStockInfo/submitCarAdjustInStockInfo.htm',
            cancelCarAdjustInStockInfo: '/v1/carAdjustInStockInfo/cancelCarAdjustInStockInfo.htm',
        },
        carAdjustInStockDetailInfo: {
            insert: '/v1/carAdjustInStockDetailInfo/carAdjustInStockDetailInfo/insert.htm',
            get: '/v1/carAdjustInStockDetailInfo/carAdjustInStockDetailInfo/get.htm',
            editCarAdjustInStockDetailInfoList: '/v1/carAdjustInStockDetailInfo/carAdjustInStockDetailInfo/editCarAdjustInStockDetailInfoList.htm',
        }
    },
    // 查询经销商店信息
    storeInfo: {
        queryShopInfo: '/v1/sys/store/get.htm'
    },
    // 保险工作台
    insuranceWorchBench: {
        getInsuranceWorkbenchInfo: '/v1/insWorkbench/queryInsWorkbenchInfoPage.htm',
        getInsuranceWorkbenchInfoByWorkbenchCode: '/v1/insWorkbench/getInsuranceWorkbenchInfoByWorkbenchCode.htm',
        updateInsWbRecognizeeInfo: '/v1/insWorkbench/updateInsWbRecognizeeInfo.htm',
        updateInsWbOrderDetailInfo: '/v1/insWorkbench/updateInsWbOrderDetailInfo.htm',
        queryInsWbTrackInfo: '/v1/insWorkbench/queryInsWbTrackInfo.htm',
        queryInsuranceTypesInfoVosByCoCode: '/v1/insurance/insuranceTypesInfo/queryInsuranceTypesInfoVosByCoCode.htm',
        assistInsuranceWorkbenchInfo: '/v1/insWorkbench/assistInsuranceWorkbenchInfo.htm',
        queryInsuranceOrderInfoByOrderNo: '/v1/clearingSettlement/insuranceOrder/queryInsuranceOrderInfoByOrderNo.htm' // 保险出单信息card的部分数据查询
    },
    // 金融工作台
    finWorkbench: {
        getFinanceWorkbenchInfo: '/v1/finWorkbench/getFinanceWorkbenchInfo.htm',
        getFinanceWorkBenchInfoByOrderNo: '/v1/report/getFinanceWorkBenchInfoByOrderNo.htm',        //金融协作报价新的查询工作台明细
        getFinanceWbHistoryInfo: '/v1/finWorkbench/getFinanceWbHistoryInfo.htm',   //新的金融协作报价查询推送历史查看明细
        editFinanceTrackCustomerInfo: '/v1/financeTrackCustmer/editFinanceTrackCustomerInfo.htm',   //编辑金融贷款客户信息
        pushFinanceWorkbenchInfo: '/v1/finWorkbench/pushFinanceWorkbenchInfo.htm',
        queryFinanceWbHistoryInfo: '/v1/finWorkbench/queryFinanceWbHistoryInfo.htm',
        queryFinanceWbTrackInfoPage: '/v1/finWorkbench/queryFinanceWbTrackInfoPage.htm',
        queryFinanceWorkbenchInfoPage: '/v1/finWorkbench/queryFinanceWorkbenchInfoPage.htm',      //老金融贷款申请查询工作台接口
        queryFinanceOrderInfoTrackList: '/v1/report/queryFinanceOrderInfoTrackList.htm',      //新的金融贷款申请查询工作台接口
        queryFinanceWorkBenchInfoList: '/v1/report/queryFinanceWorkBenchInfoList.htm',             //金融报价新的分页查询金融协作台信息
        synchFinanceWbInfoToFinanceOrder: '/v1/finWorkbench/synchFinanceWbInfoToFinanceOrder.htm',
        updateOrInsertFinanceWorkbenchInfoVo: '/v1/finWorkbench/updateOrInsertFinanceWorkbenchInfoVo.htm',
        getFinanceWorkbenchTrackInfo: '/v1/finWorkbench/financeWorkbenchTrackInfo/get.htm',
        insertFinanceWorkbenchTrackInfo: '/v1/finWorkbench/financeWorkbenchTrackInfo/insert.htm',
        queryCarOrderActualPriceList: '/v1/clearingsettlement/carOrderInfo/queryCarOrderActualPriceList.htm',
        saveOrSynToOrderFinanceWbInfo: '/v1/finWorkbench/saveOrSynToOrderFinanceWbInfo.htm',   //新的金融协作台订单保存推送接口
        finanCustomInfo: {
            insert: '/v1/finWorkbench/finanCustomInfo/insert.htm',
            editFinanceTrackCustomerInfo: '/v1/financeTrackCustmer/editFinanceTrackCustomerInfo.htm',  //客户贷款资料保存接口
            query: '/v1/finWorkbench/finanCustomInfo/query.htm',
            update: '/v1/finWorkbench/finanCustomInfo/update.htm',
            getFinanCustomInfo: '/v1/finWorkbench/finanCustomInfo/getFinanCustomInfo.htm',
            getFinanceTrackCustomerInfo: '/v1/financeTrackCustmer/getFinanceTrackCustomerInfo.htm', //金融贷款申请贷款客户联系资料查询
        }
    },
    // 数据报表
    dataReport: {
        queryCarSkuSalesListNoPage: '/v1/report/sku/queryCarSkuSalesListNoPage.htm',
        queryCarSkuSalesListBySearch: '/v1/report/sku/queryCarSkuSalesListBySearch.htm', //虚拟销售报表查询
        skuSalesListWriteExcel: '/v1/fileSys/sku/skuSalesListWriteExcel.htm', //虚拟销售报表导出
        // 展厅历史客流导入
        exHallPassengerToChannel: '/v1/file/parseHistoryCustomerInfoExcelFile',
        queryCRMFollowUp: '/v1/report/crmFollowUp/query.htm',
        queryOrderReport: '/v1/report/sales/queryOrderReportStatistics.htm',
        querySalesLeadsReport: '/v1/report/sales/querySalesLeadsReportStatistics.htm',
        queryScSalesLeadsReport: '/v1/report/sales/queryScSalesLeadsReportStatistics.htm',
        querySalesManageOrderReports: '/v1/report/sales/querySalesManageOrderReports.htm',
        queryCarTGpAvgOfInvoiced: '/v1/report/clearingSettlement/queryCarTGpAvgOfInvoiced.htm',  //当月累计单台车辆毛利
        queryUsedCarOrderOfInvoiced: '/v1/report/clearingSettlement/queryUsedCarOrderOfInvoiced.htm',   //查询二手车评估台数
        carInfoWriteExcel: '/v1/fileSys/sys/carInfoWriteExcel.htm',   //车款导出接口
        queryOrderPayInfoPage: '/v1/report/orderPay/queryOrderPayInfoPage.htm'
    },
    // 跨部门策略表
    policyTable: {
        output: '/v1/fileSys/export/exportCrossDeptReport.htm',
        queryList: '/v1/report/crossdept/queryCrossDeptManagerInfo.htm',
        editCrossDeptManagerInfoList: '/v1/report/crossdept/editCrossDeptManagerInfoList.htm',
        queryCrossDeptPolicyActualInfo: '/v1/report/crossdept/queryCrossDeptPolicyActualInfo.htm',
        editCrossDeptKpiInfoList: '/v1/report/crossdept/editCrossDeptKpiInfoList.htm',
        queryCrossDeptKpiInfo: '/v1/report/crossdept/queryCrossDeptKpiInfo.htm',
        editCrossDeptPostnRelationInfoList: '/v1/report/crossdept/editCrossDeptPostnRelationInfoList.htm',
        queryCrossDeptPostnRelationInfo: '/v1/report/crossdept/queryCrossDeptPostnRelationInfo.htm',
    },
    // 跨部门线索表
    cueTable: {
        // 列表查询
        queryCrossDeptManagerInfo: '/v1/report/crossdept/queryCrossDeptManagerInfo.htm',
        // 团队总和
        countTeamTotalSum: '/v1/fileSys/export/countTeamTotalSum.htm',
        // 查询八大渠道的实际值
        queryTotalEightChannelsNum: '/v1/report/SalesWeekCrossdept/queryTotalEightChannelsNum.htm',
        // 跨部门分解 实际值 && 目标值
        departmentStrategyReport: '/v1/fileSys/department/departmentStrategyReport.htm',
        // 查询八大渠道的目标值
        queryTargetDepartmentReportLists: '/v1/report/crossdept/queryTargetDepartmentReportLists.htm',
        // 获取 SC && DCC 列表
        queryEmployeeInfoSCByStoreCode: '/v1/fileSys/export/queryEmployeeInfoSCByStoreCode.htm',
        // 创建跨部门策略表
        editCrossDeptManagerInfoList: '/v1/report/crossdept/editCrossDeptManagerInfoList.htm',
        // 导出
        exportDepartmentReport: '/v1/fileSys/export/exportDepartmentReport.htm',
        // 导入
        importDepartmentReport: '/v1/fileSys/export/importDepartmentReport.htm',
        //
        getCrossDerivativeBusinessActualTotal: '/v1/report/crossdept/getCrossDerivativeBusinessActualTotal.htm',
        //
        getCrossDerivativeBusinessTargetTotal: '/v1/report/crossdept/getCrossDerivativeBusinessTargetTotal.htm',
        //
        getScCrossDerivativeBusiness: '/v1/report/crossdept/getScCrossDerivativeBusiness.htm',
        //查询衍生业务SC表现目标【金融、保险、精品、延保、其它】
        getScTargetCrossDerivativeBusiness: '/v1/report/crossdept/getScTargetCrossDerivativeBusiness.htm'
    },
    lpe: {
        queryLpeList: '/v1/sales/reception/queryLPEExhibitionHallFlowLog.htm',
        queryDownLoadURL: '/v1/fileSys/file/LPEExhibitionHallFlowLogWriteIntoExcel.htm',
    },
    // 审批流
    approval: {
        query: '/v2/workFlow/orderwf/queryOrderWfInfoByPostnCode.htm',
    },
    // 财务报表
    statement: {
        downLoad: '/v1/fileSys/export/financeExcelReport.htm',
        queryStatement: '/v1/report/finance/queryFinanceInfo.htm',
        queryGpInfo: '/v1/report/getSalesManagementGP.htm',
        querySiInfo: '/v1/report/getSalesManagementSIAndTickedNum.htm',
        queryOtherInfo: '/v1/report/queryFinanceInfoList.htm',
    },
    salesManagerOrder: {
        exportToExcel: '/v1/fileSys/file/salesManageReportExcelFile.htm'
    },
    // 服务费设置
    serviceFreeSeting: {
        // 分页接口
        queryServiceFeeManageList: '/v1/sys/servicefeemanage/queryServiceFeeManageList.htm',
        // 批量新增编辑接口
        editServiceFeeManageBatch: '/v1/sys/servicefeemanage/editServiceFeeManageBatch.htm',
        // 数据同步接口
        loadServiceFeeManageCacheRedis: '/v1/sys/servicefeemanage/loadServiceFeeManageCacheRedis.htm',
        // 根据id或业务编码查询服务费
        getServiceFeeManage: '/v1/sys/servicefeemanage/getServiceFeeManage.htm'
    },
    //预装车
    preloadedCar: {
        //查询预装车列表信息
        queryPreinstalledCarList: '/v1/sku/preinstalledCar/queryPreinstalledCarList.htm',
        //查询预装车辆详情信息
        getPreinstalledCarInfo: '/v1/sku/preinstalledCar/getPreinstalledCarInfo.htm',
        //分页查询预装车明细信息
        queryPreinstalledCarDetailInfoVos: '/v1/sku/preinstalledCarDetail/queryPreinstalledCarDetailInfoVos.htm',
        //精品商品查询，预装车专用
        querySkuInfoAdapterCarList: '/v1/sku/skuInfo/querySkuInfoAdapterCarList.htm',
        //批量新增／修改预装车信息
        editPreinstalledCarInfoList: '/v1/sku/preinstalledCar/editPreinstalledCarInfoList.htm',
        //删除预装车明细信息
        cancelPreinstalledCarDetailInfo: '/v1/sku/preinstalledCarDetail/cancelPreinstalledCarDetailInfo.htm'
    },
    // 保险客户协作报价
    insuranceWorkbench: {
      // 保险工作台订单查询
      queryInsWorkbenchInfoPage: '/v1/report/queryInsWorkbenchInfoPage.htm'
    },
    //毛利预测
    MaoriForecast:{
      // 查询毛利预测数据
      queryMaoriReportAdd: '/v1/report/maoriForecast/queryMaoriReportAdd.htm',
      // 查询毛利预测报表数据明细
      queryMaoriForecastInfo: '/v1/report/maoriForecast/queryMaoriForecastInfo.htm',
      //更新毛利预测报表信息
      updatemaoriForecastAddInfo: '/v1/reportdb/maoriForecastAddInfo/update.htm',
      // 查询毛利预测报表门店总计信息
      queryMaoriReportAddTotal: '/v1/report/maoriForecast/queryMaoriReportAddTotal.htm',
      // 批量更新毛利预测报表信息
      updateMaoriReportBatch: '/v1/report/maoriForecast/updateMaoriReportBatch.htm',
      // 毛利预测表导出接口查询
      maoLiReportExcelFile: '/v1/fileSys/file/maoLiReportExcelFile.htm',
      // 更新毛利预测表界面信息
      updateMaoriReportAddTotal: '/v1/report/maoriForecast/updateMaoriReportAddTotal.htm'
    },
    // 系统当前时间
    CurrentTime: {
      getCurrentTime: '/v2/system/getCurrentTime.htm'
    },
    // 客户类型
    CustomType: {
      querySalesLeadsInfoList: '/v1/report/sales/querySalesLeadsInfoList.htm'
    },
    // 跟进记录新增
    SalesLeadFollowInfo: {
      editSalesLeadFollowInfo: '/v1/sales/salesFollow/editSalesLeadFollowInfo.htm'
    },
    //公司类型
    queryCompanyFinanceByCustomCode: {
        ByCustomCode: '/v2/custom/company/queryCompanyFinanceByCustomCode.htm'
    },
    //根据逾期是否处理查询可用的授信额度
    ProcessingInfo: {
        getPayInfo: '/v2/custom/company/queryCompanyCreditInfoOverdueProcessingInfo.htm'
    },
    WriteExcel:{
        getWriteExcel:'/v1/fileSys/clearingSettlement/orderReceivablesWriteExcel.htm'
    },
    orderInvoiceWriteExcel: {
        getInvoiceWriteExcel:'/v1/fileSys/clearingSettlement/orderInvoiceWriteExcel.htm'
    },
    si:{
        //分页查询收入调整信息
        queryIncomeManagerListByCondition:'/v1/clearingSettlement/incomeManager/queryIncomeManagerListByCondition.htm',
        //删除收入调整信息
        deleteIncomeManagerment:'/v1/clearingSettlement/incomeManager/deleteIncomeManagerment.htm',
        //新增
        insert:'/v1/clearingSettlement/incomeManager/insert.htm',
        //批量新增
        insertManagermentList:'/v1/clearingSettlement/incomeManager/insertManagermentList.htm',
        //车辆SI调整-导出
        exportCarSiManageInfo: '/v1/fileSys/file/exportCarSiManageInfo.htm',
        //车辆SI调整-导入解析
        parseCarSiManageInfo: '/v1/fileSys/file/parseCarSiManageInfo.htm',
        //佣金调整-导出
        exportCommissionSiManageInfo: '/v1/fileSys/file/exportCommissionSiManageInfo.htm',
        // 新增保存
        checkIncomeManagerment: '/v1/clearingSettlement/incomeManager/checkIncomeManagerment.htm',
        // 预设模板导出
        selectByRelationCode: '/v1/fileSys/file/selectByRelationCode.htm'
    },
    //精品订单台账导出
    orderStand:{
    	orderStandInfo: '/v1/fileSys/sku/skuOrderListWriteExcel.htm'
    },
    //PDCA集团盈利报表
    groupProfitDashboard:{
        //查询接口销售额，销售台数，TGP目标，TGP预测数据，实际值
        querySalesDataInfo: '/v1/report/dashboard/querySalesDataInfo.htm',
        //查询接口TGP达成 门店前十排名
        queryTGPReachSort: '/v1/report/dashboard/queryTGPReachSort.htm',
        //查询接口   库存状态
        queryStockStateModule: '/v1/report/dashboard/queryStockStateModule.htm',
        // 查询接口   漏斗表现
        queryFunnelPerformanceModule: '/v1/report/dashboard/queryFunnelPerformanceModule.htm',
        //查询接口  销售毛利
        querySaleMaoriModule: '/v1/report/dashboard/querySaleMaoriModule.htm',
        // 查询接口   衍生业务
        queryDerivativeServicesModule: '/v1/report/dashboard/queryDerivativeServicesModule.htm',
        // 提示
        queryHint:'/v1/sys/refDetail/get.htm'

    },
    //一丰个性化导入
    individuation: {
        //查询一汽丰田中间关系表数据
        querySystemCarRelationInfo: '/v1/supplyChain/querySystemCarRelationInfo.htm'
    },

    //人员绩效看板
    persionDashboard: {
        //销量达成率
        querySalesAchievementRate: '/v1/report/individualPerformance/querySalesAchievementRate.htm',
        // 查询车系销量对比
        queryCarSeriesContrast: '/v1/report/individualPerformance/queryCarSeriesContrast.htm',
        //查询集客相关信息
        queryCollectorInfo: '/v1/report/individualPerformance/queryCollectorInfo.htm',
        //查询接待相关信息
        queryReceptionInfo: '/v1/report/individualPerformance/queryReceptionInfo.htm',
        //查询商谈相关信息
        queryDiscussInfo: '/v1/report/individualPerformance/queryDiscussInfo.htm',
        //查询衍生业务相关信息
        queryDerivativesBusiness: '/v1/report/individualPerformance/queryDerivativesBusiness.htm',
        //查询岗位类型
        queryEmpByPostn: '/v1/sys/empPstn/queryEmpByPostn.htm',
        //查询门店下岗位信息
        queryStorePostList: '/v1/system/position/queryStorePostList.htm',
        //查询门店总数
        getTotalNum: '/v1/report/individualPerformance/getTotalNum.htm'
    }
}
