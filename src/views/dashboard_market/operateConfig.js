export default {
    followList: [{
        title: '车型盈利销售看板',
        text: '从月维度统计门店销售运营情况的统计，直观展现了销售漏斗和盈利情况',
        board: '查看本月盈利达成看板',
        color: 'blue',
        url: '/dataReport/groupProfitDashboard',
        img: require('../../assets/img/lookgray.png')
    },{
        title: '人员绩效销售看板',
        text: '从线索跟进、接待转化、毛利等维度分析销售顾问的战力，进行排名和诊断',
        board: '查看本月销售顾问达成看板',
        color: 'grope',
        url: '/dataReport/persionProfitDashboard',
        img: require('../../assets/img/lookgray.png')
    },{
        title: '线索跟进看板',
        text: '审核销售顾问每天的线索跟进情况和通话情况，销售日总结会的必备报告',
        board: '下载今日跟进情况表',
        color: 'green',
        url: '/dataReport/phonecalllist',
        img: require('../../assets/img/downgray.png')
    }],
    searchList: [{
        title: '销售订单信息',
        text: '所有意向、订单的信息集合，包括商品内容、售价、毛利等重要信息',
        board: '下载今日新增订单台账',
        color: 'blue',
        url: '/order',
        img: require('../../assets/img/downgray.png')
    },{
        title: '整车库存查询',
        text: '跟进各车型和库龄进行整车库存的查询，可查询在售、锁定、成本等信息',
        board: '查看当前整车库存情况',
        color: 'grope',
        url: '/storeInfo/car',
        img: require('../../assets/img/lookgray.png')
    },{
        title: '展厅客流日志',
        text: '跟踪每天实时的展厅客流和散客留档情况，销售日总结会的必备报告',
        board: '下载今日展厅客流日志',
        color: 'green',
        url: '/dataReport/exHallPassengerLog',
        img: require('../../assets/img/downgray.png')
    }],
    searchList1: [{
        title: '精品销售报告',
        text: '整合所有精品、组合套餐的销售情况，可按车型、顾问、商品多维度分析',
        board: '下载今日精品销售明细',
        color: 'blue',
        url: '/dataReport/qualityGoodsExport',
        img: require('../../assets/img/downgray.png')
    },{
        title: '销售线索',
        text: '查询所有门店各个渠道的线索信息，按跟进状态、意向级别、预约时间等筛选',
        board: '下载今日待跟进销售线索',
        color: 'grope',
        url: '/dccthread/queryclientmain',
        img: require('../../assets/img/downgray.png')
    },{
        title: 'CRM调研内容情况',
        text: 'CRM中心各类调研问卷的结果和客户答题情况的展示',
        board: '',
        color: 'green',
        url: '/crm/index',
        img: require('../../assets/img/lookgray.png')
    }],
    settingList:[{
        tit: '毛利预测设置',
        time: '',
        imgsrc: require('../../assets/img/dasetting.png'),
        url: '/dataReport/grossProfitForecastTable',
        code: 'MaoRi'
    },{
        tit: '跨部门策略表月报',
        time: '',
        imgsrc: require('../../assets/img/datable.png'),
        url: '/cross-cuetable/query',
        code: 'CrossDept'
    },{
        tit: '商务激励政策',
        time: '',
        imgsrc: require('../../assets/img/dastar.png'),
        url: '/businessaffairs',
        code: ''
    },{
        tit: '区域限价SNP表',
        time: '',
        imgsrc: require('../../assets/img/dasnp.png'),
        url: '/salesTargetPlan/query',
        code: 'SalesTargetPlan'
    },{
        tit: '市场活动KPI',
        time: '',
        imgsrc: require('../../assets/img/dakpi.png'),
        url: '/market/query',
        code: ''
    },{
        tit: '金融热销方案设置',
        time: '',
        imgsrc: require('../../assets/img/dacount.png'),
        url: '/financePro/mainFinancePro',
        code: ''
    },{
        tit: '整车采购订单',
        time: '',
        imgsrc: require('../../assets/img/dabuy.png'),
        url: '/procurement/orderForm',
        code: 'PurchaseOrder'
    },{
        tit: '组合商品设置',
        time: '',
        imgsrc: require('../../assets/img/dasetting.png'),
        url: '/skuComb/query',
        code: ''
    }]
}