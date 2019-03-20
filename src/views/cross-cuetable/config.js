
/* 
    数组中的字段顺序为表格中 从左到右 顺序
    其中效率计算公式 为数组中的 后一项 / 前一项 
*/

// 查询页 table 对应字段
export const fields =  {
    radio: {
        label: '选择'
    },
    managerCode: {
        label: '编码'
    },
    storeName: {
        label: '门店名称'
    },
    yearStr: {
        label: '年份'
    },
    monthStr: {
        label: '月份'
    },
    updateTimeStr: {
        label: '最后更新时间'
    },
    updateName: {
        label: '最后更新人'
    }
} 

export const collectEffectThead = [
    '散客线索',
    '呼入线索',
    '网络线索',
    '主动集客线索',
    '推荐线索',
    '再购线索',
    '活跃线索',
    '休眠线索'
]

export const businessPerformThead = [
    '散客客流+线索',
    '进店线索数',
    '报价数',
    '订单数',
    '成交数',
    '首次进店试乘试驾数'
]

export const drivePerformThead = [
    '金融(台)',
    '保险(台)',
    '精品(产值单位:K)',
    '延保(台)',
    '其他收费类(台)'
]
export const collectEffectRateThead = [
    '散客留档率',
    '呼入线索进店率',
    '网络线索进店率',
    '主动集客线索进店率',
    '推荐线索进店率',
    '再购线索进店率',
    '活跃线索进店率',
    '休眠线索进店率'
]

export const businessPerformRateThead = [
    '集客效率',
    '进店线索报价率',
    '报价订单率',
    '订单成交率',
    '进店线索订单率',
    '首次进店试驾率'
]

// 集客渠道团队总和
export const effectTeamCountVo = [
    'targetsMap_LeadsChannelCustomer_crossDeptLeadCount', // 散客 客流 目标
    'totalMap_LeadsChannelCustomer_crossDeptLeadCount', // 散客 客流 实际
    'targetsMap_LeadsChannelCustomer_crossDeptInStoreLeadCount', // 散客 客流 目标
    'totalMap_LeadsChannelCustomer_crossDeptInStoreLeadCount', // 散客 客流 实际

    'targetsMap_LeadsChannelIncoming_crossDeptLeadCount', // 呼入 总量 目标
    'totalMap_LeadsChannelIncoming_crossDeptLeadCount', // 呼入 总量 实际
    'targetsMap_LeadsChannelIncoming_crossDeptInStoreLeadCount', // 呼入 进店 目标
    'totalMap_LeadsChannelIncoming_crossDeptInStoreLeadCount', // 呼入 进店 实际

    'targetsMap_leadsSourceClassifyWeb_crossDeptLeadCount', // 网络 总量 目标
    'totalMap_leadsSourceClassifyWeb_crossDeptLeadCount', // 网络 总量 实际
    'targetsMap_leadsSourceClassifyWeb_crossDeptInStoreLeadCount', // 网络 进店 目标
    'totalMap_leadsSourceClassifyWeb_crossDeptInStoreLeadCount', // 网络 进店 实际

    'targetsMap_leadsSourceClassifyActiveCollector_crossDeptLeadCount', // 主动集客 总量 
    'totalMap_leadsSourceClassifyActiveCollector_crossDeptLeadCount', // 主动集客 总量 实际
    'targetsMap_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount', // 主动集客 进店
    'totalMap_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount', // 主动集客 进店 实际

    'targetsMap_LeadsChannelRecommend_crossDeptLeadCount', // 推荐 总量 目标
    'totalMap_LeadsChannelRecommend_crossDeptLeadCount', // 推荐 总量 实际
    'targetsMap_LeadsChannelRecommend_crossDeptInStoreLeadCount', // 推荐 进店 目标
    'totalMap_LeadsChannelRecommend_crossDeptInStoreLeadCount', // 推荐 进店 实际
  
    'targetsMap_LeadsChannelBuyAgain_crossDeptLeadCount', // 再购 总量 目标
    'totalMap_LeadsChannelBuyAgain_crossDeptLeadCount', // 再购 总量 实际
    'targetsMap_LeadsChannelBuyAgain_crossDeptInStoreLeadCount', // 再购 进店 目标
    'totalMap_LeadsChannelBuyAgain_crossDeptInStoreLeadCount', // 再购 进店 实际

    'targetsMap_LeadsChannelActive_crossDeptLeadCount', // 活跃 总量 目标
    'totalMap_LeadsChannelActive_crossDeptLeadCount', // 活跃 总量 实际
    'targetsMap_LeadsChannelActive_crossDeptInStoreLeadCount', // 活跃 进店 目标
    'totalMap_LeadsChannelActive_crossDeptInStoreLeadCount', // 活跃 进店 实际
    
    'targetsMap_LeadsChannelDormancy_crossDeptLeadCount', // 休眠 总量 目标
    'totalMap_LeadsChannelDormancy_crossDeptLeadCount', // 休眠 总量 实际
    'targetsMap_LeadsChannelDormancy_crossDeptInStoreLeadCount', // 休眠 进店 目标
    'totalMap_LeadsChannelDormancy_crossDeptInStoreLeadCount', // 休眠 进店 实际
] 

export const performTeamCountVo = [
    'customer_clue_target',
    'customer_clue',
    'inStore_clue_target',
    'inStore_clue',
    'targetsMap_crossDeptCreateQuoteCount', // 报价 目标
    'totalMap_crossDeptCreateQuoteCount', // 报价 实际
    'targetsMap_crossDeptCreateOrderCount', // 订单 目标
    'totalMap_crossDeptCreateOrderCount', // 订单 实际
    'targetsMap_crossDeptFinishCarCount', // 成交 目标
    'totalMap_crossDeptFinishCarCount', // 成交 实际
    'driveCountTarget',
    'crossDeptFirstStoreTestDriveCount'
]

// sc 八大渠道实际值 && 目标值 
export const scEffectColVal = [
    'sc_*_LeadsChannelCustomer_crossDeptFlowCount_target_*_',
    'sc_*_LeadsChannelCustomer_crossDeptLeadCount_*_',
    'sc_*_LeadsChannelCustomer_crossDeptInFileCount_target_*_',
    'sc_*_LeadsChannelCustomer_crossDeptInStoreLeadCount_*_',

    '',
    '',
    'sc_*_LeadsChannelIncoming_crossDeptInStoreLeadCount_target_*_',
    'sc_*_LeadsChannelIncoming_crossDeptInStoreLeadCount_*_',

    '',
    '',
    'sc_*_leadsSourceClassifyWeb_crossDeptInStoreLeadCount_target_*_',
    'sc_*_leadsSourceClassifyWeb_crossDeptInStoreLeadCount_*_',
    
    '',
    '',
    'sc_*_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount_target_*_',
    'sc_*_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount_*_',
    
    'sc_*_LeadsChannelRecommend_crossDeptLeadCount_target_*_',
    'sc_*_LeadsChannelRecommend_crossDeptLeadCount_*_',
    'sc_*_LeadsChannelRecommend_crossDeptInStoreLeadCount_target_*_',
    'sc_*_LeadsChannelRecommend_crossDeptInStoreLeadCount_*_',
    
    'sc_*_LeadsChannelBuyAgain_crossDeptLeadCount_target_*_',
    'sc_*_LeadsChannelBuyAgain_crossDeptLeadCount_*_',
    'sc_*_LeadsChannelBuyAgain_crossDeptInStoreLeadCount_target_*_',
    'sc_*_LeadsChannelBuyAgain_crossDeptInStoreLeadCount_*_',
    
    'sc_*_LeadsChannelActive_crossDeptLeadCount_target_*_',
    'sc_*_LeadsChannelActive_crossDeptLeadCount_*_',
    'sc_*_LeadsChannelActive_crossDeptInStoreLeadCount_target_*_',
    'sc_*_LeadsChannelActive_crossDeptInStoreLeadCount_*_',
    
    'sc_*_LeadsChannelDormancy_crossDeptLeadCount_target_*_',
    'sc_*_LeadsChannelDormancy_crossDeptLeadCount_*_',
    'sc_*_LeadsChannelDormancy_crossDeptInStoreLeadCount_target_*_',
    'sc_*_LeadsChannelDormancy_crossDeptInStoreLeadCount_*_'
]

// dcc 八大渠道实际值 && 目标值 
export const dccEffectColVal = [
    'dcc_*_LeadsChannelCustomer_crossDeptFlowCount_target_*_',
    'dcc_*_LeadsChannelCustomer_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelCustomer_crossDeptInFileCount_target_*_',
    'dcc_*_LeadsChannelCustomer_crossDeptInStoreLeadCount_*_',

    'dcc_*_LeadsChannelIncoming_crossDeptLeadCount_target_*_',
    'dcc_*_LeadsChannelIncoming_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelIncoming_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_LeadsChannelIncoming_crossDeptInStoreLeadCount_*_',
    
    'dcc_*_leadsSourceClassifyWeb_crossDeptLeadCount_target_*_',
    'dcc_*_leadsSourceClassifyWeb_crossDeptLeadCount_*_',
    'dcc_*_leadsSourceClassifyWeb_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_leadsSourceClassifyWeb_crossDeptInStoreLeadCount_*_',
    
    'dcc_*_leadsSourceClassifyActiveCollector_crossDeptLeadCount_target_*_',
    'dcc_*_leadsSourceClassifyActiveCollector_crossDeptLeadCount_*_',
    'dcc_*_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount_*_',
    
    'dcc_*_LeadsChannelRecommend_crossDeptLeadCount_target_*_',
    'dcc_*_LeadsChannelRecommend_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelRecommend_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_LeadsChannelRecommend_crossDeptInStoreLeadCount_*_',
    
    'dcc_*_LeadsChannelBuyAgain_crossDeptLeadCount_target_*_',
    'dcc_*_LeadsChannelBuyAgain_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelBuyAgain_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_LeadsChannelBuyAgain_crossDeptInStoreLeadCount_*_',
    
    'dcc_*_LeadsChannelActive_crossDeptLeadCount_target_*_',
    'dcc_*_LeadsChannelActive_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelActive_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_LeadsChannelActive_crossDeptInStoreLeadCount_*_',
    
    'dcc_*_LeadsChannelDormancy_crossDeptLeadCount_target_*_',
    'dcc_*_LeadsChannelDormancy_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelDormancy_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_LeadsChannelDormancy_crossDeptInStoreLeadCount_*_'
]

// sc 销售漏斗业务表现 实际值 || 目标值
export const scPerformColVal = [
    'sc_*_customer_clue_target_*_',
    'sc_*_customer_clue_*_',
    'sc_*_inStore_clue_target_*_',
    'sc_*_inStore_clue_*_',
    'sc_*_all_crossDeptCreateQuoteCount_target_*_',
    'sc_*_crossDeptCreateQuoteCount_*_',
    'sc_*_all_crossDeptCreateOrderCount_target_*_',
    'sc_*_crossDeptCreateOrderCount_*_',
    'sc_*_all_crossDeptFinishCarCount_target_*_',
    'sc_*_crossDeptFinishCarCount_*_',
    'sc_*_all_crossDeptFirstStoreTestDriveCount_target_*_',
    'sc_*_crossDeptFirstStoreTestDriveCount_*_'
]

// dcc 销售漏斗业务表现 实际值 || 目标值
export const dccPerformColVal = [
    'dcc_*_customer_clue_target_*_',
    'dcc_*_customer_clue_*_',
    'dcc_*_inStore_clue_target_*_',
    'dcc_*_inStore_clue_*_',
    'dcc_*_all_crossDeptCreateQuoteCount_target_*_',
    'dcc_*_crossDeptCreateQuoteCount_*_',
    'dcc_*_all_crossDeptCreateOrderCount_target_*_',
    'dcc_*_crossDeptCreateOrderCount_*_',
    'dcc_*_all_crossDeptFinishCarCount_target_*_',
    'dcc_*_crossDeptFinishCarCount_*_',
    'dcc_*_all_crossDeptFirstStoreTestDriveCount_target_*_',
    'dcc_*_crossDeptFirstStoreTestDriveCount_*_'
]

// 销售漏斗业务表现 散客客流 + 线索 实际值
export const dccCustomerClueActual = [
    'dcc_*_LeadsChannelCustomer_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelIncoming_crossDeptLeadCount_*_',
    'dcc_*_leadsSourceClassifyWeb_crossDeptLeadCount_*_',
    'dcc_*_leadsSourceClassifyActiveCollector_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelRecommend_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelBuyAgain_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelActive_crossDeptLeadCount_*_',
    'dcc_*_LeadsChannelDormancy_crossDeptLeadCount_*_'
]

export const scCustomerClueActual = [
    'sc_*_LeadsChannelCustomer_crossDeptLeadCount_*_',
    '',
    '',
    '',
    'sc_*_LeadsChannelRecommend_crossDeptLeadCount_*_',
    'sc_*_LeadsChannelBuyAgain_crossDeptLeadCount_*_',
    'sc_*_LeadsChannelActive_crossDeptLeadCount_*_',
    'sc_*_LeadsChannelDormancy_crossDeptLeadCount_*_',
]

// 销售漏斗业务表现 散客客流 + 线索 目标值
export const dccCustomerClueTarget = [
    'dcc_*_LeadsChannelCustomer_crossDeptFlowCount_target_*_',
    'dcc_*_LeadsChannelIncoming_crossDeptLeadCount_target_*_',
    'dcc_*_leadsSourceClassifyWeb_crossDeptLeadCount_target_*_',
    'dcc_*_leadsSourceClassifyActiveCollector_crossDeptLeadCount_target_*_',
    'dcc_*_LeadsChannelRecommend_crossDeptLeadCount_target_*_',
    'dcc_*_LeadsChannelBuyAgain_crossDeptLeadCount_target_*_',
    'dcc_*_LeadsChannelActive_crossDeptLeadCount_target_*_',
    'dcc_*_LeadsChannelDormancy_crossDeptLeadCount_target_*_'
]

export const scCustomerClueTarget = [
    'sc_*_LeadsChannelCustomer_crossDeptFlowCount_target_*_',
    '',
    '',
    '',
    'sc_*_LeadsChannelRecommend_crossDeptLeadCount_target_*_',
    'sc_*_LeadsChannelBuyAgain_crossDeptLeadCount_target_*_',
    'sc_*_LeadsChannelActive_crossDeptLeadCount_target_*_',
    'sc_*_LeadsChannelDormancy_crossDeptLeadCount_target_*_'
]

// dcc 进店线索 实际值
export const dccInstStoreClueActual = [
    'dcc_*_LeadsChannelCustomer_crossDeptInStoreLeadCount_*_',
    'dcc_*_LeadsChannelIncoming_crossDeptInStoreLeadCount_*_',
    'dcc_*_leadsSourceClassifyWeb_crossDeptInStoreLeadCount_*_',
    'dcc_*_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount_*_',
    'dcc_*_LeadsChannelRecommend_crossDeptInStoreLeadCount_*_',
    'dcc_*_LeadsChannelBuyAgain_crossDeptInStoreLeadCount_*_',
    'dcc_*_LeadsChannelActive_crossDeptInStoreLeadCount_*_',
    'dcc_*_LeadsChannelDormancy_crossDeptInStoreLeadCount_*_'
]

export const scInstStoreClueActual = [
    'sc_*_LeadsChannelCustomer_crossDeptInStoreLeadCount_*_',
    'sc_*_LeadsChannelIncoming_crossDeptInStoreLeadCount_*_',
    'sc_*_leadsSourceClassifyWeb_crossDeptInStoreLeadCount_*_',
    'sc_*_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount_*_',
    'sc_*_LeadsChannelRecommend_crossDeptInStoreLeadCount_*_',
    'sc_*_LeadsChannelBuyAgain_crossDeptInStoreLeadCount_*_',
    'sc_*_LeadsChannelActive_crossDeptInStoreLeadCount_*_',
    'sc_*_LeadsChannelDormancy_crossDeptInStoreLeadCount_*_'
]

// 进店线索 目标值
export const dccInstStoreClueTarget = [
    'dcc_*_LeadsChannelCustomer_crossDeptInFileCount_target_*_',
    'dcc_*_LeadsChannelIncoming_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_leadsSourceClassifyWeb_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_LeadsChannelRecommend_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_LeadsChannelBuyAgain_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_LeadsChannelActive_crossDeptInStoreLeadCount_target_*_',
    'dcc_*_LeadsChannelDormancy_crossDeptInStoreLeadCount_target_*_'
]

export const scInstStoreClueTarget = [
    'sc_*_LeadsChannelCustomer_crossDeptInFileCount_target_*_',
    'sc_*_LeadsChannelIncoming_crossDeptInStoreLeadCount_target_*_',
    'sc_*_leadsSourceClassifyWeb_crossDeptInStoreLeadCount_target_*_',
    'sc_*_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount_target_*_',
    'sc_*_LeadsChannelRecommend_crossDeptInStoreLeadCount_target_*_',
    'sc_*_LeadsChannelBuyAgain_crossDeptInStoreLeadCount_target_*_',
    'sc_*_LeadsChannelActive_crossDeptInStoreLeadCount_target_*_',
    'sc_*_LeadsChannelDormancy_crossDeptInStoreLeadCount_target_*_',
]

// 八大渠道实际值 && 目标值 效率 
export const effectColRate = [
    [   
        'sc_*_LeadsChannelCustomer_crossDeptFlowCount_target_*_',
        'sc_*_LeadsChannelCustomer_crossDeptInFileCount_target_*_'
    ], [
        'sc_*_LeadsChannelCustomer_crossDeptLeadCount_*_',
        'sc_*_LeadsChannelCustomer_crossDeptInStoreLeadCount_*_'
    ], [
    ], [
    ], [
    ], [
    ], [
    ], [
    ], [
        'sc_*_LeadsChannelRecommend_crossDeptLeadCount_target_*_',
        'sc_*_LeadsChannelRecommend_crossDeptInStoreLeadCount_target_*_'
    ], [
        'sc_*_LeadsChannelRecommend_crossDeptLeadCount_*_',
        'sc_*_LeadsChannelRecommend_crossDeptInStoreLeadCount_*_'
    ], [
        'sc_*_LeadsChannelBuyAgain_crossDeptLeadCount_target_*_',
        'sc_*_LeadsChannelBuyAgain_crossDeptInStoreLeadCount_target_*_'
    ], [
        'sc_*_LeadsChannelBuyAgain_crossDeptLeadCount_*_',
        'sc_*_LeadsChannelBuyAgain_crossDeptInStoreLeadCount_*_'
    ], [
        'sc_*_LeadsChannelActive_crossDeptLeadCount_target_*_',
        'sc_*_LeadsChannelActive_crossDeptInStoreLeadCount_target_*_'
    ], [
        'sc_*_LeadsChannelActive_crossDeptLeadCount_*_',
        'sc_*_LeadsChannelActive_crossDeptInStoreLeadCount_*_'
    ], [
        'sc_*_LeadsChannelDormancy_crossDeptLeadCount_target_*_',
        'sc_*_LeadsChannelDormancy_crossDeptInStoreLeadCount_target_*_'
    ], [
        'sc_*_LeadsChannelDormancy_crossDeptLeadCount_*_',
        'sc_*_LeadsChannelDormancy_crossDeptInStoreLeadCount_*_'
    ]
]

// 团队总和效率
export const effectTeamRate = [
    [   
        'targetsMap_LeadsChannelCustomer_crossDeptLeadCount',
        'targetsMap_LeadsChannelCustomer_crossDeptInStoreLeadCount'
    ], [
        'totalMap_LeadsChannelCustomer_crossDeptLeadCount',
        'totalMap_LeadsChannelCustomer_crossDeptInStoreLeadCount'
    ],  [
        'targetsMap_LeadsChannelIncoming_crossDeptLeadCount',
        'targetsMap_LeadsChannelIncoming_crossDeptInStoreLeadCount'
    ], [
        'totalMap_LeadsChannelIncoming_crossDeptLeadCount',
        'totalMap_LeadsChannelIncoming_crossDeptInStoreLeadCount'
    ], [
        'targetsMap_leadsSourceClassifyWeb_crossDeptLeadCount',
        'targetsMap_leadsSourceClassifyWeb_crossDeptInStoreLeadCount'
    ], [
        'totalMap_leadsSourceClassifyWeb_crossDeptLeadCount',
        'totalMap_leadsSourceClassifyWeb_crossDeptInStoreLeadCount'
    ], [
        'targetsMap_leadsSourceClassifyActiveCollector_crossDeptLeadCount',
        'targetsMap_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount'
    ], [
        'totalMap_leadsSourceClassifyActiveCollector_crossDeptLeadCount',
        'totalMap_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount'
    ], [
        'targetsMap_LeadsChannelRecommend_crossDeptLeadCount',
        'targetsMap_LeadsChannelRecommend_crossDeptInStoreLeadCount'
    ], [
        'totalMap_LeadsChannelRecommend_crossDeptLeadCount',
        'totalMap_LeadsChannelRecommend_crossDeptInStoreLeadCount'
    ], [
        'targetsMap_LeadsChannelBuyAgain_crossDeptLeadCount',
        'targetsMap_LeadsChannelBuyAgain_crossDeptInStoreLeadCount',
    ], [
        'totalMap_LeadsChannelBuyAgain_crossDeptLeadCount',
        'totalMap_LeadsChannelBuyAgain_crossDeptInStoreLeadCount',
    ], [
        'targetsMap_LeadsChannelActive_crossDeptLeadCount',
        'targetsMap_LeadsChannelActive_crossDeptInStoreLeadCount'
    ], [
        'totalMap_LeadsChannelActive_crossDeptLeadCount',
        'totalMap_LeadsChannelActive_crossDeptInStoreLeadCount'
    ], [
        'targetsMap_LeadsChannelDormancy_crossDeptLeadCount', 
        'targetsMap_LeadsChannelDormancy_crossDeptInStoreLeadCount'
    ], [
        'totalMap_LeadsChannelDormancy_crossDeptLeadCount', 
        'totalMap_LeadsChannelDormancy_crossDeptInStoreLeadCount'
    ]
]

export const performTeamRate = [
    [   
        'customer_clue_target',
        'inStore_clue_target'
    ], [
        'customer_clue',
        'inStore_clue'
    ], [
        'inStore_clue_target',
        'targetsMap_crossDeptCreateQuoteCount'
    ], [
        'inStore_clue',
        'totalMap_crossDeptCreateQuoteCount'
    ], [
        'targetsMap_crossDeptCreateQuoteCount',
        'targetsMap_crossDeptCreateOrderCount'
    ], [
        'totalMap_crossDeptCreateQuoteCount',
        'totalMap_crossDeptCreateOrderCount'
    ], [
        'targetsMap_crossDeptCreateOrderCount',
        'targetsMap_crossDeptFinishCarCount'
    ], [
        'totalMap_crossDeptCreateOrderCount',
        'totalMap_crossDeptFinishCarCount'
    ], [
        'inStore_clue_target',
        'targetsMap_crossDeptCreateOrderCount'
    ], [
        'inStore_clue',
        'totalMap_crossDeptCreateOrderCount'
    ],  [   
        'sc_*_inStore_clue_target_*_',
        'sc_*_all_crossDeptFirstStoreTestDriveCount_target_*_'
    ], [
        'sc_*_inStore_clue_*_',
        'sc_*_crossDeptFirstStoreTestDriveCount_*_'
    ]
]

// 销售漏斗业务表现 目标值 && 实际值 效率
export const performColRate = [
    [   
        'sc_*_customer_clue_target_*_',
        'sc_*_inStore_clue_target_*_'
    ], [
        'sc_*_customer_clue_*_',
        'sc_*_inStore_clue_*_'
    ], [   
        'sc_*_inStore_clue_target_*_',
        'sc_*_all_crossDeptCreateQuoteCount_target_*_'
    ], [
        'sc_*_inStore_clue_*_',
        'sc_*_all_crossDeptCreateQuoteCount_*_'
    ], [ 
        'sc_*_all_crossDeptCreateQuoteCount_target_*_',
        'sc_*_all_crossDeptCreateOrderCount_target_*_'
    ], [
        'sc_*_all_crossDeptCreateQuoteCount_*_',
        'sc_*_all_crossDeptCreateOrderCount_*_'
    ], [   
        'sc_*_all_crossDeptCreateOrderCount_target_*_',
        'sc_*_all_crossDeptFinishCarCount_target_*_'
    ], [
        'sc_*_all_crossDeptCreateOrderCount_*_',
        'sc_*_all_crossDeptFinishCarCount_*_'
    ], [   
        'sc_*_inStore_clue_target_*_',
        'sc_*_all_crossDeptCreateOrderCount_target_*_'
    ], [
        'sc_*_inStore_clue_*_',
        'sc_*_crossDeptCreateOrderCount_*_'
    ], [   
        'sc_*_inStore_clue_target_*_',
        'sc_*_all_crossDeptFirstStoreTestDriveCount_target_*_'
    ], [
        'sc_*_inStore_clue_*_',
        'sc_*_crossDeptFirstStoreTestDriveCount_*_'
    ]
]

// 集客渠道 跨部门分解
export const effectDeptVal = [
    'kpiMapsLeadsChannelCustomercrossDeptInStoreCustomerRate',  // 散客 客流 目标 1
    'policyActualLeadsChannelCustomercrossDeptLeadCount', // 散客 客流 实际 0
    'storeTargetMapsLeadsChannelCustomercrossDeptInStoreCustomerRate', // 散客 留档 目标 3
    'policyActualLeadsChannelCustomercrossDeptInStoreLeadCount', // 散客 留档 实际 2

    'kpiMapsLeadsChannelIncomingcrossDeptInStoreIncomingRate', // 呼入 总量 目标 5
    'policyActualLeadsChannelIncomingcrossDeptLeadCount', // 呼入 总量 实际 4
    'storeTargetMapsLeadsChannelIncomingcrossDeptInStoreIncomingRate', // 呼入 进店 目标 7
    'policyActualLeadsChannelIncomingcrossDeptInStoreLeadCount', // 呼入 进店 实际 6

    'kpiMapsleadsSourceClassifyWebcrossDeptInStoreWebRate', // 网络 总量 目标 9
    'policyActualleadsSourceClassifyWebcrossDeptLeadCount', // 网络 总量 实际 8
    'storeTargetMapsleadsSourceClassifyWebcrossDeptInStoreWebRate', // 网络 进店 目标 11
    'policyActualleadsSourceClassifyWebcrossDeptInStoreLeadCount', // 网络 进店 实际 10

    'kpiMapsleadsSourceClassifyActiveCollectorcrossDeptInStoreActiveCollectorRate', // 主动集客 总量 目标 13
    'policyActualleadsSourceClassifyActiveCollectorcrossDeptLeadCount', // 主动集客 总量 实际 12
    'storeTargetMapsleadsSourceClassifyActiveCollectorcrossDeptInStoreActiveCollectorRate', // 主动集客 进店 目标 15
    'policyActualleadsSourceClassifyActiveCollectorcrossDeptInStoreLeadCount', // 主动集客 进店 实际 14
    
    'kpiMapsLeadsChannelRecommendcrossDeptInStoreRecommendRate', // 推荐 总量 目标 17
    'policyActualLeadsChannelRecommendcrossDeptLeadCount', // 推荐 总量 实际 16
    'storeTargetMapsLeadsChannelRecommendcrossDeptInStoreRecommendRate', // 推荐  进店 目标 19	
    'policyActualLeadsChannelRecommendcrossDeptInStoreLeadCount', // 推荐 进店 实际 18
    
    'kpiMapsLeadsChannelBuyAgaincrossDeptInStoreBuyAgainRate', // 再购 总量 目标 21
    'policyActualLeadsChannelBuyAgaincrossDeptLeadCount', // 再购 总量 实际 20
    'storeTargetMapsLeadsChannelBuyAgaincrossDeptInStoreBuyAgainRate', // 再购 进店 目标 23
    "policyActualLeadsChannelBuyAgaincrossDeptInStoreLeadCount", // 再购 进店 实际 22
    
    'beginningMapsLeadsChannelActivecrossDeptLeadCount', // 活跃 总量 目标 25
    'policyActualLeadsChannelActivecrossDeptLeadCount', // 活跃 总量 实际 24
    'storeTargetMapsLeadsChannelActivecrossDeptInStoreActiveRate', // 活跃 进店 目标 27
    'policyActualLeadsChannelActivecrossDeptInStoreLeadCount', // 活跃 进店 实际 26
    
    'beginningMapsLeadsChannelDormancycrossDeptLeadCount', // 休眠 总量 目标 29
    'policyActualLeadsChannelDormancycrossDeptLeadCount', // 休眠 总量 实际 28
    'storeTargetMapsLeadsChannelDormancycrossDeptInStoreDormancyRate', // 休眠 进店 目标 31
    'policyActualLeadsChannelDormancycrossDeptInStoreLeadCount', // 休眠 进店  实际 30
]

// 业务漏斗表现跨 部门分解
export const performDeptVal = [
    'customerClueTarget', // 散客客流 + 线索 目标  	
    'customerClueActual', // 散客客流 + 线索 实际
    'inStoreTarget', // 进店线索 目标
    'policyActualallcrossDeptInStoreLeadCount', // 进店线索 实际
    'storeTargetMapsallcrossDeptCreateOrderRate', // 报价数  目标
    'policyActualallcrossDeptCreateQuoteCount', // 报价数 实际
    'storeTargetMapsallcrossDeptFinishCarRate', // 订单数 目标
    'policyActualallcrossDeptCreateOrderCount', // 订单数 实际
    'kpiMapsallcrossDeptFinishCarRate', // 成交数 目标
    'policyActualallcrossDeptFinishCarCount', // 成交数 实际
    'driveCountTarget', // 试乘 目标
    'crossDeptFirstStoreTestDriveCount' // 试乘 实际
]

//

// 散客客流 + 线索 目标
export const custClueTarget = [
    'kpiMapsLeadsChannelCustomercrossDeptInStoreCustomerRate',
    'kpiMapsLeadsChannelIncomingcrossDeptInStoreIncomingRate',
    'kpiMapsleadsSourceClassifyWebcrossDeptInStoreWebRate',
    'kpiMapsleadsSourceClassifyActiveCollectorcrossDeptInStoreActiveCollectorRate',
    'kpiMapsLeadsChannelRecommendcrossDeptInStoreRecommendRate',
    'kpiMapsLeadsChannelBuyAgaincrossDeptInStoreBuyAgainRate',
    'beginningMapsLeadsChannelActivecrossDeptLeadCount',
    'beginningMapsLeadsChannelDormancycrossDeptLeadCount'
]

// 散客客流 + 线索 实际
export const custClueActual = [
    'policyActualLeadsChannelCustomercrossDeptLeadCount',
    'policyActualLeadsChannelIncomingcrossDeptLeadCount',
    'policyActualleadsSourceClassifyWebcrossDeptLeadCount',
    'policyActualleadsSourceClassifyActiveCollectorcrossDeptLeadCount',
    'policyActualLeadsChannelRecommendcrossDeptLeadCount',
    'policyActualLeadsChannelBuyAgaincrossDeptLeadCount',
    'policyActualLeadsChannelActivecrossDeptLeadCount',
    'policyActualLeadsChannelDormancycrossDeptLeadCount'
]

// 进店线索目标值
export const inStoreTarget = [
    'storeTargetMapsLeadsChannelCustomercrossDeptInStoreCustomerRate',
    'storeTargetMapsLeadsChannelIncomingcrossDeptInStoreIncomingRate',
    'storeTargetMapsleadsSourceClassifyWebcrossDeptInStoreWebRate',
    'storeTargetMapsleadsSourceClassifyActiveCollectorcrossDeptInStoreActiveCollectorRate',
    'storeTargetMapsLeadsChannelRecommendcrossDeptInStoreRecommendRate',
    'storeTargetMapsLeadsChannelBuyAgaincrossDeptInStoreBuyAgainRate',
    'storeTargetMapsLeadsChannelActivecrossDeptInStoreActiveRate',
    'storeTargetMapsLeadsChannelDormancycrossDeptInStoreDormancyRate'
]

//  销售漏斗业务表现 团队总和 散客客流 + 线索 目标值 
export const customerClueTeamTarget = [
    'targetsMap_LeadsChannelCustomer_crossDeptLeadCount', // 散客 客流 目标
    'targetsMap_LeadsChannelIncoming_crossDeptLeadCount', // 呼入 总量 目标
    'targetsMap_leadsSourceClassifyWeb_crossDeptLeadCount', // 网络 总量 目标
    'targetsMap_leadsSourceClassifyActiveCollector_crossDeptLeadCount', // 主动集客 总量 
    'targetsMap_LeadsChannelRecommend_crossDeptLeadCount', // 推荐 总量 目标
    'targetsMap_LeadsChannelBuyAgain_crossDeptLeadCount', // 再购 总量 目标
    'targetsMap_LeadsChannelActive_crossDeptLeadCount', // 活跃 总量 目标
    'targetsMap_LeadsChannelDormancy_crossDeptLeadCount', // 休眠 总量 目标
]

//  销售漏斗业务表现 团队总和 散客客流 + 线索 实际值
export const customerClueTeamActual = [
    'totalMap_LeadsChannelCustomer_crossDeptLeadCount', // 散客 客流 实际
    'totalMap_LeadsChannelIncoming_crossDeptLeadCount', // 呼入 总量 实际
    'totalMap_leadsSourceClassifyWeb_crossDeptLeadCount', // 网络 总量 实际
    'totalMap_leadsSourceClassifyActiveCollector_crossDeptLeadCount', // 主动集客 总量 实际
    'totalMap_LeadsChannelRecommend_crossDeptLeadCount', // 推荐 总量 实际
    'totalMap_LeadsChannelBuyAgain_crossDeptLeadCount', // 再购 总量 实际
    'totalMap_LeadsChannelActive_crossDeptLeadCount', // 活跃 总量 实际
    'totalMap_LeadsChannelDormancy_crossDeptLeadCount', // 休眠 总量 实际
]

//  销售漏斗业务表现 团队总和 进店线索 目标值
export const inStoreClueTeamTarget = [
    'targetsMap_LeadsChannelCustomer_crossDeptInStoreLeadCount', // 散客 客流 目标
    'targetsMap_LeadsChannelIncoming_crossDeptInStoreLeadCount', // 呼入 进店 目标
    'targetsMap_leadsSourceClassifyWeb_crossDeptInStoreLeadCount', // 网络 进店 目标
    'targetsMap_leadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount', // 主动集客 进店
    'targetsMap_LeadsChannelRecommend_crossDeptInStoreLeadCount', // 推荐 进店 目标
    'targetsMap_LeadsChannelBuyAgain_crossDeptInStoreLeadCount', // 再购 进店 目标
    'targetsMap_LeadsChannelActive_crossDeptInStoreLeadCount', // 活跃 进店 目标
    'targetsMap_LeadsChannelDormancy_crossDeptInStoreLeadCount', // 休眠 进店 目标
]

//  销售漏斗业务表现 团队总和 进店线索 实际值
export const inStoreClueTeamActual = [
    'totalMap_LeadsChannelCustomer_crossDeptInStoreLeadCount', // 散客 客流 实际
    'totalMap_LeadsChannelIncoming_crossDeptInStoreLeadCount', // 呼入 进店 实际
    'totalMap_leadsSourceClassifyWeb_crossDeptInStoreLeadCount', // 网络 进店 实际
    'totalMapleadsSourceClassifyActiveCollector_crossDeptInStoreLeadCount', // 主动集客 进店 实际
    'totalMap_LeadsChannelRecommend_crossDeptInStoreLeadCount', // 推荐 进店 实际
    'totalMap_LeadsChannelBuyAgain_crossDeptInStoreLeadCount', // 再购 进店 实际
    'totalMap_LeadsChannelActive_crossDeptInStoreLeadCount', // 活跃 进店 实际
    'totalMap_LeadsChannelDormancy_crossDeptInStoreLeadCount', // 休眠 进店 实际
]


export const deriveDeptVal = [
    'financialTargetNumTotal',
    'FinancialActualNum',
    'insuranceTargetNumTotal',
    'InsuranceActualNum',
    'SkuTargetValueTotal',
    'SkuActualValue',
    'carYBTargetNumTotal',
    'YBActualNum',
    'otherBusinessTargetNumTotal',
    'OtherActualNum'
]

export const deriveTargetVal = [
    'FinancialTargetNum',
    'FinancialActualNum',
    'InsuranceTargetNum',
    'InsuranceActualNum',
    'SkuTargetValue',
    'SkuActualValue',
    'YBTargetNum',
    'YBActualNum',
    'OtherTargetNum',
    'OtherActualNum'
]