// /src/vuex/store.js

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from '../common/logger'
import menu from './menu/store' //demo ======
import finance from './finance/store' //引入finance模块
import market from './market/store' //引入market模块
import marketActivity from './marketActivity/store' //新增市场活动模块
import test from './test/store' //引入finance模块===================
import login from './login/store' //引入finance模块
import financePro from './financePro/store'
import insurance from './insurance/store' //引入insurance模块
import questionnaire from './questionnaire/store' //CRM调研模块
import suitscope from './suitscope/store'
import carInfo from './carInfo/store'
import classification from './classification/store'
import models from './models/store'
import archives from './archives/store'
import skuPrice from './skuPrice/store'
import clientmaininfo from './clientmaininfo/store'
import supplier from './supplier/store'
import supplierInvoice from './supplierInvoice/store'
import purchaseOrder from './purchaseOrder/store'
import lVehicle from './l-vehicle/store'
import inStock from './inStock/store'
import receptionist from './receptionist/store'
import salesTargetPlan from './salesTargetPlan/store'
import research from './research/store'
import skuComb from './skuComb/store'
import salesAdmin from './salesAdmin/store' // 工作流设置
import financing from './financing/store' // 财务管理
import order from './order/store'
import exhibitionHallFlowLog from './exhibitionHallFlowLog/store'
import crmFollowUpCondition from './crmFollowUpCondition/store'
import dccThreadFollowUpConversion from './dccThreadFollowUpConversion/store'
import scThreadFollowUp from './scThreadFollowUp/store'
import phonecalllist from './phonecalllist/store'
import financeWorkbench from './financeWorkbench/store'
import insuranceWorkbench from './insuranceWorkbench/store'
import shareVehicleResource from './shareVehicleResource/store'
import releaseVehicleResource from './releaseVehicleResource/store'
import callOutVehicleResource from './callOutVehicleResource/store'
import callInVehicleResource from './callInVehicleResource/store'
import salesManageOrderReports from './salesManageOrderReports/store'
import policyTable from './policyTable/store'
import exportCarModel from './exportCarModel/store'
import cueTable from './cross-cuetable/store'

const env = process.env.NODE_ENV //用来记录错误日志（我也不懂）

Vue.use(Vuex)

const debug = env == 'development' //错误日志的（我也不懂）
export default new Vuex.Store({
    modules: { //在这里注册模块
        menu,
        finance,
        marketActivity,
        market,
        test,
        login,
        financePro,
        insurance,
        questionnaire,
        suitscope,
        carInfo,
        classification,
        models,
        archives,
        skuPrice,
        clientmaininfo,
        supplier,
        supplierInvoice,
        purchaseOrder,
        lVehicle,
        inStock,
        receptionist,
        salesTargetPlan,
        research,
        skuComb,
        salesAdmin,
        financing,
        order,
        exhibitionHallFlowLog,
        crmFollowUpCondition,
        dccThreadFollowUpConversion,
        scThreadFollowUp,
        phonecalllist,
        financeWorkbench,
        insuranceWorkbench,
        shareVehicleResource,
        releaseVehicleResource,
        callOutVehicleResource,
        callInVehicleResource,
        salesManageOrderReports,
        policyTable,
        exportCarModel,  //车辆导出数据模块
        cueTable
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
