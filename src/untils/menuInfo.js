//2018-12-19修改
var menuInfoConfig = function(common) {
    return {
        // 二级菜单
        cataLog: [
            {
                modulName: '销售线索',
                iconClass: "iconfont icon-xiaoshouxiansuo",
                children: ['000481'] // 销售线索
            }, {
                modulName: '前台接待',
                iconClass: "iconfont icon-qiantaijiedai",
                children: ['000463'] // 前台接待
            }, {
                modulName: '金融管理',
                iconClass: "iconfont icon-jinrongguanli",
                children: [
                    '000186', // 金融机构
                    '000201', // 金融产品
                    '001186', // 金融协作报价
                    '001187'  // 贷款申请管理
                ]
            }, {
                modulName: '保险管理',
                iconClass: "iconfont icon-baoxianguanli",
                children: [
                    '000232', // 保险公司
                    '000246', // 保险方案
                    '001613', // 保险协作报价
                    '001670'  // 保险出单管理
                ]
            }, {
                modulName: '市场活动',
                iconClass: "iconfont icon-shichanghuodongguanlicopy",
                //          市场活动管理
                children: ['000217']
            }, {
                modulName: 'CRM调研',
                iconClass: "iconfont icon-CRMtiaoyan",
                children: [
                    '000252', // 调查问卷设置
                    '000275'  // 调研任务工作台
                ]
            }, {
                modulName: '订单中心',
                iconClass: "iconfont icon-dingdanzhongxin",
                children: [
                    '000551', // 整车订单信息
                    '000608', // 订单收款信息
                    '000601', // 订单发票信息
                    '000607', // 订单退款信息
                    '002331', // 行政挂车
                    '002361'  // 订单核销
                ]
            }, {
                modulName: '仓库管理',
                iconClass: "iconfont icon-cangkuguanli",
                children: [
                    '000402', // 仓库信息
                    '000442', // 仓库库区
                    '000448'  // 仓库库位
                ]
            }, {
                modulName: '库存管理',
                iconClass: "iconfont icon-cangkuguanli",
                children: [
                    '000454', // 商品库存查询
                    '001340'  // 整车库存查询
                ]
            }, {
                modulName: '供应商管理',
                iconClass: "iconfont icon-gongyinglianguanli",
                //          供应商信息
                children: ['000393']
            }, {
                modulName: '商品管理',
                iconClass: "iconfont icon-shangpinguanli",
                children: [
                    '000337', // 商品包装
                    '000302', // 商品产地
                    '000288', // 商品分类
                    '000315', // 商品目录
                    '000294', // 商品价格
                    '000343', // 商品单位
                    '000282', // 商品品牌
                    '000323', // 精品商品
                    '000349', // 组合商品
                    '000308', // 商品关联车型设置
                    '000429', // 精品采购订单
                    '000434'  // 精品采购入库
                ]
            }, {
                modulName: '整车商品管理',
                iconClass: "iconfont icon-chexingguanli",
                children: [
                    '000321', // 整车商品
                    '000767', // 车辆分享平台
                    '000769', // 车辆发布管理
                    '000818', // 调拨出库管理
                    '000826', // 调拨入库管理
                    '000333', // 整车锁定管理
                    '000410', // 整车采购订单
                    '000425', // 整车付款
                    '000421', // 整车开票
                    '000417', // 整车入库
                    '002326', // 科达整车采购
                    '002327', // 科达整车付款
                    '002282', // 车辆预装
                ]
            }, {
                modulName: '销售行政管理',
                iconClass: "iconfont icon-xiaoshouhangzhengguanli",
                children: [
                    '000048', // GP归属设置
                    '000056', // SNP归属设置
                    '000367', // 客户主档
                    '000499', // 销售目标
                    '002719', // 销售目标(单车)
                    '000516', // 商务政策
                    '000530',  // 门店审批流设置
                    '002197',  // 服务费设置
                    '002228',  // 审批流批量导入设置
                    '002526',  // SI调整
                    '002527'   // 手续费调整
                ]
            }, {
                modulName: '车型管理',
                iconClass: "iconfont icon-chexingguanli",
                children: [
                    '000111', // 车型-厂家信息
                    '000118', // 车型-品牌信息
                    '000125', // 车型-车系信息
                    '000132', // 车型-车型信息
                    '000139', // 车型-排量信息
                    '000146', // 车型-进气方式
                    '000153', // 主车型信息
                    '001050'  // 售后车型
                ]
            }, {
                modulName: '数据报表',
                iconClass: "iconfont icon-xiaoshouhangzhengguanli",
                children: [
                    '002221', // 销售看板
                    '000740', // 展厅流量日志
                    '001306', // LPE展厅客流日志
                    '001119', // DCC线索跟进转化表
                    '001120', // SC线索跟进转化表
                    '001203', // 跨部门策略表
                    '002503', // 跨部门月报
                    '001660', // 销售管理报表
                    '001415', // 经销商财务报表
                    '001671', // SC线索电话跟进清单
                    '000796', // CRM回访跟进表
                    '002074', // CRM调研内容情况表
                    '001740', // 展厅历史客流导入
                    '002183', // 虚拟销售管理报表
                    '002384', // 毛利预测表
                    '002647', // 新车精品销售台账
                    '002669',  //车型盈利销售看板
                    '002684'  //人员绩效销售看板
                ]
            }, {
                modulName: '基础设置',
                iconClass: "iconfont icon-jichushezhi",
                children: [
                    '000024', // 组织管理
                    '000030', // 岗位管理
                    '000039', // 角色管理
                    '002426', // 岗位类型角色管理
                    '000099', // 员工信息管理
                    '000001', // 数据字典
                    '000174', // 门店管理
                    '000183', // 销售车型管理
                    '000071', // 行政区域管理
                    '000085', // 采购区域管理
                    '000091', // 销售区域管理
                    '000079', // 配送区域管理
                    '000018', // 菜单管理
                    '000011', // 业务序号
                    '000167', // 统一任务调度
                    '001091', // 车型适配查询
                    '002350', // 公司管理
                    '002386', // 授信管理
                    '002510'  // 车款导出        //新增
                ]
            }
        ],
        // 老三级菜单 子菜单与父菜单匹配归类
        menuCataLog: [
            {
                modulName: '工作台',
                iconClass: 'iconfont icon-icon_shouye font-18',
                children: ['002190', '002221'] //新增销售PC数据看板
            },
            {
                modulName: '系统设置',
                iconClass: "iconfont icon-icon_xitongguanli font-18",
                children: [
                    '000001', // 数据字典
                    '000662', // 账务账期
                    '000011', // 业务序号
                    '000018', // 菜单管理
                    '000167', // 系统任务调度
                    '000048', // GP归属设置
                    '000056', // SNP归属设置
                    '000039', // 角色管理
                    '000530',  // 工作流管理
                    '002457',//维修工时配置
                    '002510'  // 车辆导出
                ]
            },
            {
                modulName: '行政管理',
                iconClass: "iconfont icon-icon_hangzhengguanli font-18",
                children: [
                    '000024', // 组织管理
                    '000030', // 岗位管理
                    '000979', // 员工管理
                    // '001015',  // 员工岗位
                    '002426'   // 岗位类型角色管理
                ]
            },
            {
                modulName: '门店管理',
                iconClass: "iconfont icon-xiaoshouhangzhengguanli",
                children: [
                    '001069', // 门店管理
                    '000183', // 销售车型管理
                    '000402', // 仓库信息
                    '000442', // 库区管理
                    '000448', // 库位管理
                    '000970', // 工位管理
                    '001425', // 摆放管理
                    '001390'  // 店长折扣
                ]
            },
            {
                modulName: '区域管理',
                iconClass: "iconfont icon-quyuguanlicopy",
                children: [
                    '000071', // 行政区域
                    '000091', // 销售区域
                    '000085', // 采购区域
                    '000079'  // 配送区域
                ]
            },
            {
                modulName: '车型管理',
                iconClass: "iconfont icon-icon_chexingguanli font-18",
                children: [
                    '000111', // 厂家管理
                    '000118', // 品牌管理
                    '000125', // 车系管理
                    '000132', // 车型管理
                    // '000139', // 排量管理
                    // '000146', // 进气方式
                    '000153', // 销售车型
                    '001050'  // 售后车型
                ]
            },
            {
                modulName: '金融管理',
                iconClass: "iconfont icon-icon_jinrongguanli font-18",
                children: [
                    '000186', // 金融机构
                    '000201', // 金融产品
                    '001186', // 协作报价
                    '001187'  // 贷款申请
                ]
            },
            {
                modulName: '保险管理',
                iconClass: "iconfont icon-icon_baoxianguanli font-18",
                children: [
                    '000232', // 保险公司
                    '000246', // 保险方案
                    '001613', // 协作报价
                    '001670'  // 保险出单
                ]
            },
            {
                modulName: '市场活动',
                iconClass: "iconfont icon-icon_shichanghuodong font-18",
                //         活动管理
                children: ['000217']
            },
            {
                modulName: 'CRM管理',
                iconClass: "iconfont icon-icon_CRMguanli font-18",
                children: [
                    '000252', // 问卷设置
                    '000275',  // 调研任务
                    '002299', // 售后招揽任务分配
                    '002332', // 售后招揽任务清单
                    '002292'  // 车辆保养参数配置
                ]
            },
            {
                modulName: '商品中心',
                iconClass: "iconfont icon-shangpinguanli",
                children: [
                    '000288', // 分类管理
                    '000315', // 目录管理
                    {
                        childName: '整车信息',
                        textCode: [
                            '000321', // 整车信息
                            '000333'  // 整车锁定/解锁
                        ]
                    }, {
                        childName: '商品信息',
                        textCode: [
                            '000325', // 商品管理
                            '000282', // 品牌管理
                            '000302', // 产地管理
                            '000337', // 包装管理
                            '000343', // 单位管理
                            '000294', // 商品定价
                            /* '000308', // 商品车型适配*/
                            '001093', // 商品适配概览
                            '001091'  // 车型适配查询
                        ]
                    }, {
                        childName: '组合信息',
                        textCode: [
                            '001032', // 组合商品
                            /* '001161', // 组合分类
                                '001155'  // 组合目录*/
                        ]
                    }
                ],
            },
            {
                modulName: '服务管理',
                iconClass: "iconfont icon-xiaoshouhangzhengguanli",
                children: [
                    '000786', // 分类管理
                    '000791', // 目录管理
                    {
                        childName: '服务信息',
                        textCode: [
                            '000877', // 服务管理
                            '000906'  // 服务商品用量
                        ]
                    }, {
                        childName: '服务定价',
                        textCode: [
                            '000884', // 车型工时管理
                            '000897'  // 套餐售价设置
                        ],
                    },
                    '002055', // 服务预约推荐配置
                    '001343' // 推荐服务
                ],
            },
            {
                modulName: '客户管理',
                iconClass: "iconfont icon-xiaoshouhangzhengguanli",
                //
                children: [
                    '001437', // 客户档案
                    '002649', // 车辆档案
                    '002350', // 公司管理
                    '002386', // 授信管理
                ]
            },
            {
                modulName: '供应商管理',
                iconClass: "iconfont icon-icon_gongyingshangguanli font-18",
                children: [
                    '000636', // 供应商信息
                    '000670'  // 采购合同
                ]
            },
            {
                modulName: '供应链管理',
                iconClass: "iconfont icon-gongzuoliuguanlicopy font-18",
                children: [
                    {
                        childName: '需求管理',
                        textCode: [
                            '001103', // 日常补货计划
                            '001126'  // 需求处理
                        ]
                    }, {
                        childName: '整车采购',
                        textCode: [
                            '000410', // 采购订单
                            '000425', // 采购付款
                            '000421', // 采购开票
                            '000417',  // 采购入库
                            '002326', // 科达整车采购
                            '002327', // 科达整车付款
                        ]
                    }, {
                        childName: '整车共享',
                        textCode: [
                            '000767', // 车辆分享
                            '000769', // 车辆发布
                            '000818', // 调拨出库
                            '000826'  // 调拨入库
                        ]
                    }, {
                        childName: '商品供应链',
                        textCode: [
                            '002141', // 商品采购
                            '002163', // 采购入库
                            '001326', // 采购退货
                            '000698', // 调拨出库
                            '000720', // 调拨入库
                            '000962', // 内售出库
                            '000957', // 内售入库
                            '001601', // 自采管理
                            '001602', // 自采到货处理
                            '001615', // 商品库存调整
                            '000684', // 报损/报溢
                            '002282'  // 车辆预装车
                        ]
                    }, {
                        childName: '库存信息',
                        textCode: [
                            '000454', // 商品库存
                            '001340', // 整车库存
                            '001319', // 入库批次查询
                            '001322', // 出入库查询
                            '001564'  // 调拨在途查询
                        ]
                    }, {
                        childName: '盘点管理',
                        textCode: [
                            '000622', // 盘点计划
                            '000610'  // 盘点处理
                        ]
                    }, {
                        childName: '对账/核销',
                        textCode: [
                            '001539', // 对账单管理
                            '001549'  // 核销单管理
                        ]
                    },
                    '001780' // 自采对账核销
                ]
            },
            {
                modulName: '整车交易',
                iconClass: "iconfont icon-icon_zhengchexiaoshou font-18",
                children: [
                    {
                        childName: '行政设置',
                        textCode: [
                            '000499', // 销售目标
                            '002719', // 销售目标(单车)
                            '000516', // 商务政策
                            '001740', // 历史客流导入
                            '002197', // 服务费设置
                            '002526',  // SI调整
                            '002527'   // 手续费调整
                        ]
                    }, {
                        childName: '新车销售',
                        textCode: [
                            '000551', // 订单信息
                            '000463', // 前台接待
                            '000481', // 销售线索
                            '002331', // 行政挂车
                            '000601', // 订单发票模块
                            '000607', // 订单退款信息
                            '000608', // 订单收款信息
                            '002361'  // 订单核销
                        ]
                    }
                ],
            },
            {
                modulName: '售后交易',
                iconClass: "iconfont icon-xiaoshouguanlicopy",
                children: [
                    {
                        childName: '行政设置',
                        textCode: [
                            '000836', // 员工排班
                            '001351'  // 检查模板
                        ]
                    },
                    '001742', // 快捷洗车
                    {
                        childName: '预约单',
                        textCode: ['001913'] // 预约单查询
                    },
                    {
                        childName: '售后维修',
                        textCode: [
                            '001697', // 预检单查询
                            '001672', // 工单查询
                            '000929', // 派工管理
                            '000951', // 打卡管理
                            '001741', // 维修领料
                            '002202', // 寄存查询
                            '001724', // 工单收款
                            '001371',  // 工单开票
                            '002302', // 完工检查
                            '002309', // 竣工校验
                            '002400', // 退货入库
                            '002512', // 提交结算
                            '002469', // 结算查询
                            '002611', // 备件外销
                        ]
                    }, {
                        childName: '退款',
                        textCode: ['002238'] // 退款查询
                    }
                ],
            },
            {
                modulName: '卡券中心',
                iconClass: "iconfont icon-icon_qiaquanzhongxin font-18",
                children: [
                    {
                        childName: '卡中心',
                        textCode: [
                            '001216', // 计次卡模版
                            '001566', // 储值卡模版
                            '001261', // 卡管理
                            '001226', // 卡销售
                            '001239', // 卡充值
                            '001307'  // 卡退换
                        ]
                    },
                    {
                        childName: '券中心',
                        textCode: [
                            '001469', // 券模板
                            '001667', // 券管理
                            '001952'  // 券销售
                        ]
                    }
                ],
            },
            {
                modulName: '财务管理',
                iconClass: "iconfont icon-icon_caiwuguanli font-18",
                children: [
                    // {
                    //     childName: '大客户对账管理',
                    //     textCode: [
                    //         '002561',  // 应收对账管理
                    //     ]
                    // },
                    // {
                    //     childName: '大客户核销管理',
                    //     textCode: [
                    //         '002582',  // 应收对账管理
                    //     ]
                    // },
                    {
                        childName: '发票管理',
                        textCode: [
                            '001376',   // 退票管理
                            '002632'    // 开票管理
                        ]
                    },
                    {
                        childName: '对账管理',
                        textCode: [
                            '002475',  // 应收对账管理
                            '002561'
                        ]
                    },
                    {
                        childName: '核销管理',
                        textCode: [
                            '002497',  // 应收核销管理
                            '002582'
                        ]
                    },
                {
                    childName: '出门单管理',
                    textCode: [
                        '002686',  // 出门单管理
                    ]
                },
                    '002538', // 收款单管理
                ],
            },
            {
                modulName: '数据报表',
                iconClass: "iconfont icon-icon_shujubaobiao font-18",
                children: [
                    {
                        childName: '整车交易',
                        textCode: [
                            '000740', // 展厅客流日志
                            '000796', // CRM回访跟进表
                            '001203', // 跨部门策略表
                            '002503', // 跨部门月报
                            '001119', // DCC线索跟进转化表
                            '001120', // SC线索跟进转化表
                            '001306', // LPE展厅客流日志
                            '001660', // 销售管理报表
                            '001415', // 经销商财务报表
                            '001671', // SC线索电话跟进清单
                            '002074', // CRM调研情况表
                            '002183', // 虚拟销售管理报表
                            '002384', // 毛利预测表
                            '002669',  // 车型盈利销售看板
                            '002684'   //人员绩效销售看板
                        ]
                    },
                    {
                        childName: '整车销售',
                        textCode: [
                            '002647', // 新车精品销售台账
                        ]
                    }
                ],
            },
        ],
        // 新三级菜单
        newMenuCataLog: [
            {
                modulName: '首页',
                iconClass: "iconfont icon-icon_shouye font-18",
                children: [
                    '002221', // 首页-PC端数据看板
                    '002190'  // 首页-售后看板
                ]
            },
            {
                modulName: '系统管理',
                iconClass: "iconfont icon-icon_xitongguanli font-18",
                children: [
                    {
                        childName: '系统设置',
                        textCode: [
                            '000011', // 业务序号
                            '000001', // 数据字典
                            '000018', // 菜单管理
                            '000167'  // 系统任务调度
                        ]
                    }, {
                        childName: '初始化设置',
                        textCode: [
                            '000530', // 审批流管理
                            '002228', // 审批流批量导入
                            '000786', // 服务分类
                            '000288', // 商品分类
                            '000791', // 服务目录
                            '000315'  // 商品目录
                        ]
                    }, {
                        childName: '行政设置',
                        textCode: [
                            '000048', // GP归属设置
                            '000056'  // SNP归属设置
                        ]
                    }, {
                        childName: '区域设置',
                        textCode: [
                            '000071', // 行政区域
                            '000091', // 销售区域
                            '000085', // 采购区域
                            '000079'  // 配送区域
                        ]
                    }, {
                        childName: '车型设置',
                        textCode: [
                            '000111', // 厂家管理
                            '000118', // 品牌管理
                            '000125', // 车系管理
                            '000132', // 车型管理
                            '001050', // 销售车型管理
                        ]
                    }
                ]
            }, {
                modulName: '组织管理',
                iconClass: "iconfont icon-icon_zuzhiguanli font-18",
                children: [
                    '000024', // 组织管理
                    '001069', // 门店管理
                    '000030', // 岗位管理
                    '000039', // 角色管理
                    '002426', // 岗位类型与角色管理
                    '000979'  // 员工信息管理
                ]
            }, {
                modulName: '仓库管理',
                iconClass: "iconfont icon-qitaleixingcopy font-18",
                children: [
                    '000402', // 仓库管理
                    '000442', // 库区管理
                    '000448', // 库位管理
                    '001425'  // 摆放管理
                ]
            }, {
                modulName: '行政管理',
                iconClass: "iconfont icon-icon_hangzhengguanli font-18",
                children: [
                    '002197', // 服务费设置
                    '000662', // 账务账期
                    '000516', // 商务政策
                    '000499', // 销售目标
                    '002719', // 销售目标(单车)
                    '002526', // SI调整
                    '002527', // 手续费调整
                    '000183', // 销售车型管理
                    '001740', // 历史客流导入
                    '002331', // 行政挂车
                    '000970', // 工位管理
                    '001390'  // 岗位折扣
                ]
            }, {
                modulName: '市场活动',
                iconClass: "iconfont icon-icon_shichanghuodong font-18",
                children: [
                    '000217' // 活动管理
                ]
            }, {
                modulName: 'CRM',
                iconClass: "iconfont icon-icon_CRMguanli font-18",
                children: [
                    {
                        childName: '基础设置',
                        textCode: ['000252'], // 问卷设置
                    },
                    '001437', // 客户档案
                    '002649', // 车辆档案
                    {
                        childName: '公司客户',
                        textCode: [
                            '002350', // 公司管理
                            '002386', // 授信管理
                        ]
                    },
                    '000275', // 调研回访
                    '002299', // 客户招揽分配
                    '002332', // 客户招揽清单
                ]
            }, {
                modulName: '整车销售',
                iconClass: "iconfont icon-icon_zhengchexiaoshou font-18",
                children: [
                    '000463', // 前台接待
                    '000481', // 销售线索
                    '000551', // 整车订单
                ]
            }, {
                modulName: '车辆管理',
                iconClass: "iconfont icon-icon_chexingguanli font-18",
                children: [
                    '000321', // 整车查询
                    '000333', // 整车锁定/解锁
                    {
                        childName: '整车采购',
                        textCode: [
                            '000410', // 采购订单
                            '000417', // 采购入库
                        ]
                    },
                    '002282', // 车辆预装
                    {
                        childName: '整车调拨',
                        textCode: [
                            '000767', // 车辆分享
                            '000769', // 车辆发布
                            '000818', // 调拨出库
                            '000826', // 调拨入库
                        ]
                    }, {
                        childName: '整车库存',
                        textCode: [
                            '001340', // 库存查询
                        ]
                    }
                ]
            }, {
                modulName: '金融管理',
                iconClass: "iconfont icon-icon_jinrongguanli font-18",
                children: [
                    '000186', // 金融机构
                    '000201', // 金融产品
                    '001186', // 协作报价
                    '001187'  // 金融申请
                ]
            }, {
                modulName: '保险管理',
                iconClass: "iconfont icon-icon_baoxianguanli font-18",
                children: [
                    '000232', // 保险公司
                    '000246', // 保险方案
                    '001613', // 协作报价
                    '001670'  // 保险出单
                ]
            }, {
                modulName: '财务管理',
                iconClass: "iconfont icon-icon_caiwuguanli font-18",
                children: [
                    {
                        childName: '整车采购结算',
                        textCode: [
                            '000425', // 整车采购付款
                            '000421', // 整车采购开票
                        ]
                    }, {
                        childName: '整车订单结算',
                        textCode: [
                            '000608', // 订单收款
                            '000607', // 订单退款
                            '000601', // 订单开票
                            '002361'  // 订单核销
                        ]
                    }, {
                        childName: '收付款管理',
                        textCode: [
                            '002538', // 收款管理
                        ]
                    }, {
                        childName: '对账管理',
                        textCode: [
                            '002475', // 应收对账管理
                            '002561', // 大客户对账管理
                            '001539', // 应付对账管理
                            '001780', // 自采对账核销管理
                        ]
                    }, {
                        childName: '核销管理',
                        textCode: [
                            '002497', // 应收核销管理
                            '002582', // 大客户核销管理
                            '001549', // 应付核销管理
                        ]
                    }, {
                        childName: '发票管理',
                        textCode: [
                            '002632', // 开票管理
                            '001376', // 退票管理
                        ]
                    },{
                    childName: '出门单管理',
                    textCode: [
                        '002686',  // 出门单管理
                    ]
                }
                ]
            }, {
                modulName: '卡券中心',
                iconClass: "iconfont icon-icon_qiaquanzhongxin font-18",
                children: [
                    {
                        childName: '卡中心',
                        textCode: [
                            '001216', // 计次卡模版
                            '001566', // 储值卡模版
                            '001261', // 卡管理
                            '001226', // 卡销售
                            '001239', // 卡充值
                            '001307', // 退换卡申请
                        ]
                    }, {
                        childName: '券中心',
                        textCode: [
                            '001469', // 券模板
                            '001667', // 券管理
                            '001952', // 券销售
                        ]
                    }
                ]
            }, {
                modulName: '供应商管理',
                iconClass: "iconfont icon-icon_gongyingshangguanli font-18",
                children: [
                    '000636', // 供应商信息
                    '000670', // 采购合同
                ]
            }, {
                modulName: '商品管理',
                iconClass: "iconfont icon-icon_shangpinguanli font-18",
                children: [
                    {
                        childName: '基础数据',
                        textCode: [
                            '000282', // 品牌管理
                            '000302', // 产地管理
                            '000337', // 包装管理
                            '000343', // 单位管理
                        ]
                    }, {
                        childName: '商品信息',
                        textCode: [
                            '000325', // 商品管理
                            '000294', // 商品定价
                            '000349', // 组合商品
                            '001093', // 商品适配设置
                            '001091', // 车型适配查询
                        ]
                    }, {
                        childName: '采购管理',
                        textCode: [
                            '001103', // 日常补货计划
                            '001126', // 需求处理
                            '002141', // 精品采购
                            '001601', // 自采管理
                            '001602', // 自采到货处理
                            '001326', // 采购退货
                        ]
                    }, {
                        childName: '入库管理',
                        textCode: [
                            '002163', // 采购入库
                            '000720', // 调拨入库
                            '000957', // 内售入库
                            '002400', // 领料退货入库
                        ]
                    }, {
                        childName: '出库管理',
                        textCode: [
                            '001741', // 维修领料
                            '000698', // 调拨出库
                            '000962', // 内售出库
                        ]
                    }, {
                        childName: '库存管理',
                        textCode: [
                            '000454', // 备件库存
                            '002202', // 寄存单查询
                            '001615', // 备件库存调整
                            '001319', // 入库批次查询
                            '001322', // 出入库查询
                            '001564', // 调拨在途查询
                        ]
                    }, {
                        childName: '盘点管理',
                        textCode: [
                            '000622', // 盘点计划
                            '000610', // 盘点处理
                            '000684', // 报损/报溢
                        ]
                    }
                ]
            }, {
                modulName: '维修管理',
                iconClass: "iconfont icon-icon_weixiuguanli font-18",
                children: [
                    {
                        childName: '基础数据管理',
                        textCode: [
                            '001351', // 检查模板
                            '002457', // 维修工时关联配置
                            '000836', // 员工排班
                            '002292', // 车辆保养参数设置
                        ]
                    }, {
                        childName: '服务管理',
                        textCode: [
                            '000877', // 服务设置
                            '000906', // 服务商品用量
                            '000884', // 服务工时管理
                            '002055', // 预约推荐服务设置
                            '000897', // 服务套餐价设置
                            '001343', // 车型推荐服务设置
                        ]
                    }, {
                        childName: '预约管理',
                        textCode: [
                            '001913', // 预约单
                        ]
                    }, {
                        childName: '售后维修',
                        textCode: [
                            '001697', // 预检单
                            '001742', // 快捷洗车
                            '002611', // 零件外销
                            '001672', // 工单管理
                            '002512', // 提交结算
                            '002469', // 结算单查询
                            '002238', // 退款申请
                        ]
                    }, {
                        childName: '车间管理',
                        textCode: [
                            '000929', // 派工管理
                            '000951', // 打卡管理
                            '002302', // 完工检查
                            '002309', // 竣工检验
                        ]
                    },
                ]
            }, {
                modulName: '数据报表',
                iconClass: "iconfont icon-icon_shujubaobiao font-18",
                children: [
                    {
                        childName: '整车销售报表',
                        textCode: [
                            '000740', // 展厅客流日志
                            '001306', // LPE展厅客流日
                            '001671', // SC线索电话跟进清单
                            '001203', // 跨部门策略表
                            '002503', // 跨部门策略表月报
                            '001119', // DCC线索跟进转化表
                            '001120', // SC线索跟进转化表
                            '000796', // CRM回访跟进表
                            '002074', // CRM调研内容情况
                            '001660', // 销售管理报表
                            '002183', // 虚拟销售管理报表
                            '002384', // 毛利预测表
                            '002647', // 新车精品销售台账
                            '002669',  //车型盈利销售看板
                            '002684' //人员绩效销售看板
                        ]
                    }, {
                        childName: '财务报表',
                        textCode: ['001415'] // 整车销售财务报表
                    }
                ]
            }
        ],
        //菜单sidebar 渲染
        menuMap: {
            // ==========================================以下为基础模块
            //数据字典
            '000001': {
                url: common.isweb() + '/dataDictionary/dataDictionary.html',
                isNative: common.isWebNative()
            },
            //根据岗位类型添加角色
            '002426': {
                url: common.isweb() + '/addingroles/addingroles.html',
                isNative: common.isWebNative()
            },
            //业务序号
            '000011': {
                url: common.isweb() + '/ordinal-info/ordinal-info.html',
                isNative: common.isWebNative()
            },
            //菜单管理
            '000018': {
                url: common.isweb() + '/menu/menu.html',
                isNative: common.isWebNative()
            },
            //组织管理
            '000024': {
                url: common.isweb() + '/organization/organization.html',
                isNative: common.isWebNative()
            },
            //岗位管理
            '000030': {
                url: common.isweb() + '/position/position.html',
                isNative: common.isWebNative()
            },
            //角色管理
            '000039': {
                url: common.isweb() + '/role/role.html',
                isNative: common.isWebNative()
            },
            //行政区域管理
            '000071': {
                url: common.isweb() + '/china/china.html',
                isNative: common.isWebNative()
            },
            //配送区域管理
            '000079': {
                url: common.isweb() + '/distribution/distribution.html',
                isNative: common.isWebNative()
            },
            //采购区域管理
            '000085': {
                url: common.isweb() + '/purchase/purchase.html',
                isNative: common.isWebNative()
            },
            //销售区域管理
            '000091': {
                url: common.isweb() + '/sale/sale.html',
                isNative: common.isWebNative()
            },
            //员工信息管理
            '000099': {
                url: common.isweb() + '/employee/employee.html',
                isNative: common.isWebNative()
            },
            //车型-厂家信息
            '000111': {
                url: common.isweb() + '/carType/factory/factory.html',
                isNative: common.isWebNative()
            },
            //车型-品牌信息
            '000118': {
                url: common.isweb() + '/carType/brand/brand.html',
                isNative: common.isWebNative()
            },
            //车型-车系信息
            '000125': {
                url: common.isweb() + '/carType/series/series.html',
                isNative: common.isWebNative()
            },
            //车型-车型信息
            '000132': {
                url: common.isweb() + '/carType/model/model.html',
                isNative: common.isWebNative()
            },
            //车型-排量信息
            '000139': {
                url: common.isweb() + '/carType/displacement/displacement.html',
                isNative: common.isWebNative()
            },
            //车型-进气方式
            '000146': {
                url: common.isweb() + '/carType/inlet/inlet.html',
                isNative: common.isWebNative()
            },
            //主车型信息
            '000153': {
                url: common.isweb() + '/carType/mainCarType/mainCarType.html',
                isNative: common.isWebNative()
            },
            //统一任务调度
            '000167': {
                url: common.isweb() + '/task/tasklist.html',
                isNative: common.isWebNative()
            },
            //门店管理
            '000174': {
                url: common.isweb() + '/store/storeInfo/storeInfo.html',
                isNative: common.isWebNative()
            },
            //门店可见车型设置
            '000183': {
                url: common.isweb() + '/store/storeVisibleCar/storeVisibleCar.html',
                isNative: common.isWebNative()
            },
            //主车型信息V2
            '001050': {
                url: common.isweb() + '/carType/saleMainCarType/saleMainCarType.html',
                isNative: common.isWebNative()
            },
            // ==========================================以下为销售模块
            //新销售数据看板
            '002221': {
                url: common.islivePro() + '/dashboardmarket',
                isNative: common.isliveProNative()
            },
            //商品关联车型设置
            '000308': {
                url: common.islivePro() + '/models/query',
                isNative: common.isliveProNative()
            },
            //市场活动管理
            "000217": {
                url: common.islivePro() + '/market/query',
                isNative: common.isliveProNative()
            },
            //金融机构
            "000186": {
                url: common.islivePro() + '/finance/mainFinance',
                isNative: common.isliveProNative()
            },
            //金融产品
            "000201": {
                url: common.islivePro() + '/financePro/mainFinancePro',
                isNative: common.isliveProNative()
            },
            //金融协作报价
            '001186': {
                url: common.islivePro() + '/financeWb/quote',
                isNative: common.isliveProNative()
            },
            //金融贷款申请
            '001187': {
                url: common.islivePro() + '/financeWb/loan',
                isNative: common.isliveProNative()
            },
            //保险协作报价
            "001613": {
                url: common.islivePro() + '/insuranceWorkbench/quote',
                isNative: common.isliveProNative()
            },
            //保险出单管理
            "001670": {
                url: common.islivePro() + '/insuranceWorkbench/out',
                isNative: common.isliveProNative()
            },
            //保险公司
            "000232": {
                url: common.islivePro() + '/insurance/query',
                isNative: common.isliveProNative()
            },
            //保险方案
            "000246": {
                url: common.islivePro() + '/insurancepro/query',
                isNative: common.isliveProNative()
            },
            //调查问卷设置
            "000252": {
                url: common.islivePro() + '/questionnaire/query',
                isNative: common.isliveProNative()
            },
            //调研任务工作台
            "000275": {
                url: common.islivePro() + '/research/query',
                isNative: common.isliveProNative()
            },
            // 商品分类
            "000288": {
                url: common.islivePro() + '/classification',
                isNative: common.isliveProNative()
            },
            // 商品目录
            "000315": {
                url: common.islivePro() + '/catalog',
                isNative: common.isliveProNative()
            },
            //商品品牌
            '000282': {
                url: common.islivePro() + '/commoditybrand',
                isNative: common.isliveProNative()
            },
            //商品价格
            '000294': {
                url: common.islivePro() + '/skuPrice/query',
                isNative: common.isliveProNative()
            },
            //商品产地
            '000302': {
                url: common.islivePro() + '/birthplace',
                isNative: common.isliveProNative()
            },
            //整车商品
            '000321': {
                url: common.islivePro() + '/archives/query',
                isNative: common.isliveProNative()
            },
            //车辆预装
            '002282': {
                url: common.islivePro() + '/preloadedCar',
                isNative: common.isliveProNative()
            },
            //商品包装
            '000337': {
                url: common.islivePro() + '/pack',
                isNative: common.isliveProNative()
            },
            //商品单位
            '000343': {
                url: common.islivePro() + '/commodityunit',
                isNative: common.isliveProNative()
            },
            //仓库信息
            '000402': {
                url: common.islivePro() + '/warehouse/query',
                isNative: common.isliveProNative()
            },
            //仓库库区
            '000442': {
                url: common.islivePro() + '/whArea',
                isNative: common.isliveProNative()
            },
            //仓库库位
            '000448': {
                url: common.islivePro() + '/whLocation',
                isNative: common.isliveProNative()
            },
            // 销售线索
            '000481': {
                url: common.islivePro() + '/dccthread/queryclientmain',
                isNative: common.isliveProNative()
            },
            //前台接待
            '000463': {
                url: common.islivePro() + '/receptionist',
                isNative: common.isliveProNative()
            },
            //整车订单
            '000551': {
                url: common.islivePro() + '/order',
                isNative: common.isliveProNative()
            },
            //订单收款
            '000608': {
                url: common.islivePro() + '/incollectmoney/query',
                isNative: common.isliveProNative()
            },
            //订单发票
            '000601': {
                url: common.islivePro() + '/billing/query',
                isNative: common.isliveProNative()
            },
            //订单退款
            '000607': {
                url: common.islivePro() + '/outcollectmoney/query',
                isNative: common.isliveProNative()
            },
            //商品库存查询
            '000454': {
                url: common.islivePro() + '/storeInfo/sku',
                isNative: common.isliveProNative()
            },
            //整车库存查询
            '001340': {
                url: common.islivePro() + '/storeInfo/car',
                isNative: common.isliveProNative()
            },
            //整车锁定管理
            '000333': {
                url: common.islivePro() + '/archiveslock',
                isNative: common.isliveProNative()
            },
            //整车采购订单
            '000410': {
                url: common.islivePro() + '/procurement/orderForm',
                isNative: common.isliveProNative()
            },
            //整车采购付款
            '000425': {
                url: common.islivePro() + '/pay/query',
                isNative: common.isliveProNative()
            },
            //整车采购开票
            '000421': {
                url: common.islivePro() + '/ticket/query',
                isNative: common.isliveProNative()
            },
            //整车采购入库
            '000417': {
                url: common.islivePro() + '/storage/query',
                isNative: common.isliveProNative()
            },
            //车辆资源共享平台
            '000767': {
                url: common.islivePro() + '/vehicle/share',
                isNative: common.isliveProNative()
            },
            //车辆资源发布
            '000769': {
                url: common.islivePro() + '/vehicle/release/main',
                isNative: common.isliveProNative()
            },
            //GP归属设置
            '000048': {
                url: common.islivePro() + '/gpbelonging/gp',
                isNative: common.isliveProNative()
            },
            //SNP归属设置
            '000056': {
                url: common.islivePro() + '/snpbelonging/snp',
                isNative: common.isliveProNative()
            },
            //销售目标
            '000499': {
                url: common.islivePro() + '/salesTargetPlan/query',
                isNative: common.isliveProNative()
            },
            //商务政策
            '000516': {
                url: common.islivePro() + '/businessaffairs',
                isNative: common.isliveProNative()
            },
            //门店审批流设置
            '000530': {
                url: common.islivePro() + '/salesAdmin/query',
                isNative: common.isliveProNative()
            },
            //服务费设置
            '002197': {
                url: common.islivePro() + '/serviceFree/index',
                isNative: common.isliveProNative()
            },
            //展厅客流日志
            '000740': {
                url: common.islivePro() + '/dataReport/exHallPassengerLog',
                isNative: common.isliveProNative()
            },
            //展厅历史客流导入
            '001740': {
                url: common.islivePro() + '/dataReport/exHallPassengerToChannel',
                isNative: common.isliveProNative()
            },
            //CRM跟进情况表
            '000796': {
                url: common.islivePro() + '/dataReport/crmFollowUp',
                isNative: common.isliveProNative()
            },
            //SC线索电话跟进清单
            '001671': {
                url: common.islivePro() + '/dataReport/phonecalllist',
                isNative: common.isliveProNative()
            },
            //SC线索跟进及转化表
            '001120': {
                url: common.islivePro() + '/dataReport/scThreadFollowUp',
                isNative: common.isliveProNative()
            },
            //DCC线索跟进及转化表
            '001119': {
                url: common.islivePro() + '/dataReport/dccThreadReport',
                isNative: common.isliveProNative()
            },
            //经销商财务报表
            '001415': {
                url: common.islivePro() + '/dataReport/financeReport',
                isNative: common.isliveProNative()
            },
            //销售管理报表
            '001660': {
                url: common.islivePro() + '/dataReport/salesManageOrder',
                isNative: common.isliveProNative()
            },
            //跨部门策略表
            '001203': {
                url: common.islivePro() + '/policyTable/list',
                isNative: common.isliveProNative()
            },
            // 跨部门周报
            '002503': {
                url: common.islivePro() + '/cross-cuetable/query',
                isNative: common.isliveProNative()
            },
            //LPE展厅客流日志
            '001306': {
                url: common.islivePro() + '/lpe/index',
                isNative: common.isliveProNative()
            },
            //内采内销调出单
            '000818': {
                url: common.islivePro() + '/vehicle/callOut/main',
                isNative: common.isliveProNative()
            },
            //内采内销调入单
            '000826': {
                url: common.islivePro() + '/vehicle/callIn/main',
                isNative: common.isliveProNative()
            },
            // CRM调研情况表
            '002074': {
                url: common.islivePro() + '/crm/index',
                isNative: common.isliveProNative()
            },
            //虚拟销售管理报表
            '002183': {
                url: common.islivePro() + '/dataReport/virtualMarketReportForm',
                isNative: common.isliveProNative()
            },
            //毛利预测表
            '002384': {
                url: common.islivePro() + '/dataReport/grossProfitForecastTable',
                isNative: common.isliveProNative()
            },
            // 车辆导入     //新增
            '002510': {
                url: common.islivePro() + '/carDataExport',
                isNative: common.isliveProNative()
            },
            //审批流批量导入设置
            '002228': {
                url: common.islivePro() + '/approvalFlowBatchImportSetting',
                isNative: common.isliveProNative()
            },
            // 科达整车采购
            '002326': {
                url: common.islivePro() + '/kedaprocurement/orderForm',
                isNative: common.isliveProNative()
            },
            // 科达整车付款
            '002327': {
                url: common.islivePro() + '/kedaprocurement/pay',
                isNative: common.isliveProNative()
            },
            // 行政挂车
            '002331': {
                url: common.islivePro() + '/salesQuote',
                isNative: common.isliveProNative()
            },
            // SI调整
            '002526': {
                url: common.islivePro() + '/income/si',
                isNative: common.isliveProNative()
            },
            // 手续费调整
            '002527': {
                url: common.islivePro() + '/adjustment/svc',
                isNative: common.isliveProNative()
            },
            // 销售目标（单车）
            '002719': {
                url: common.islivePro() + '/personalizedSalesSetting/query',
                isNative: common.isliveProNative()
            },
            // ==========================================以下为售后模块\
            // 精品商品 old
            '000323': {
                url: common.islivePro() + '/boutique',
                isNative: common.isliveProNative()
            },
            // 商品分类 new
            '000325': {
                url: common.isliveCs() + '/skuinfo/query',
                isNative: common.isliveCsNative()
            },
            // dashboard
            '002190': {
                url: common.isliveCs() + '/dashboard',
                isNative: common.isliveCsNative()
            },
            //精品采购订单 老 pro项目
            '000429': {
                url: common.islivePro() + '/purchaseOrder',
                isNative: common.isliveProNative()
            },
            //精品采购订单
            '002141': {
                url: common.isliveCs() + '/purchase-order/purchase-query',
                isNative: common.isliveCsNative()
            },
            //精品采购入库 老 pro项目
            '000434': {
                url: common.islivePro() + '/inStock',
                isNative: common.isliveProNative()
            },
            //精品采购入库
            '002163': {
                url: common.isliveCs() + '/notarchives-put/notarchives-query',
                isNative: common.isliveCsNative()
            },
            //员工岗位
            '001015': {
                url: common.isliveCs() + '/staffjobs/query',
                isNative: common.isliveCsNative()
            },
            //员工打卡
            '000951': {
                url: common.isliveCs() + '/clock/clock',
                isNative: common.isliveCsNative()
            },
            //盘点单
            '000610': {
                url: common.isliveCs() + '/blitem/blitemSearch',
                isNative: common.isliveCsNative()
            },
            //采购合同
            '000670': {
                url: common.isliveCs() + '/purchasecontract/search',
                isNative: common.isliveCsNative()
            },
            //员工管理
            '000979': {
                url: common.isliveCs() + '/staff/search',
                isNative: common.isliveCsNative()
            },
            //盘点计划
            '000622': {
                url: common.isliveCs() + '/checkplan/query',
                isNative: common.isliveCsNative()
            },
            //账务账期
            '000662': {
                url: common.isliveCs() + '/accounting/query',
                isNative: common.isliveCsNative()
            },
            //服务信息
            '000877': {
                url: common.isliveCs() + '/serviceitem/query',
                isNative: common.isliveCsNative()
            },
            //服务固定价格
            '000897': {
                url: common.isliveCs() + '/service-staticprice/query',
                isNative: common.isliveCsNative()
            },
            //服务工时车型适配
            '000884': {
                url: common.isliveCs() + '/service-manhour/query',
                isNative: common.isliveCsNative()
            },
            //非整车调拨入库单
            '000720': {
                url: common.isliveCs() + '/allotin/query',
                isNative: common.isliveCsNative()
            },
            //非整车调拨出库单
            '000698': {
                url: common.isliveCs() + '/allotout/query',
                isNative: common.isliveCsNative()
            },
            //报损报溢
            '000684': {
                url: common.isliveCs() + '/decrease-overflow/query',
                isNative: common.isliveCsNative()
            },
            //库存调整单
            '001615': {
                url: common.isliveCs() + '/stock-adjust/query',
                isNative: common.isliveCsNative()
            },
            //员工排班
            '000836': {
                url: common.isliveCs() + '/emp-scheduling',
                isNative: common.isliveCsNative()
            },
            //商品服务目录
            '000791': {
                url: common.isliveCs() + '/serviceCatalog/query',
                isNative: common.isliveCsNative()
            },
            //商品服务分类
            '000786': {
                url: common.isliveCs() + '/serviceClassify/query',
                isNative: common.isliveCsNative()
            },
            //商品服务-服务商品关系及数量信息
            '000906': {
                url: common.isliveCs() + '/servicesku',
                isNative: common.isliveCsNative()
            },
            //售后主业务（派工管理）
            '000929': {
                url: common.isliveCs() + '/resource-utilization/resource-utilization',
                isNative: common.isliveCsNative()
            },
            //供应商信息
            '000393': {
                url: common.islivePro() + '/supplier/query',
                isNative: common.isliveProNative()
            },
            //商品关联车型设置V2
            '001000': {
                url: common.isliveCs() + '/skuCar/skuCarSearch',
                isNative: common.isliveCsNative()
            },
            //车型查询适配SKU
            '001091': {
                url: common.isliveCs() + '/carSku',
                isNative: common.isliveCsNative()
            },
            //SKU车型适配全数据预览
            '001093': {
                url: common.isliveCs() + '/skuCarAll',
                isNative: common.isliveCsNative()
            },


            /*==========================================演示测试==============================================================*/
            //非整车采购订单
            '000955': {
                url: common.isliveCs() + '/purchase-order',
                isNative: common.isliveCsNative()
            },
            // 自采管理
            '001601': {
                url: common.isliveCs() + '/store-ownpurchase/search',
                isNative: common.isliveCsNative()
            },
            // 自采到货处理
            '001602': {
                url: common.isliveCs() + '/arrive-handle/query',
                isNative: common.isliveCsNative()
            },
            //日常补货计划
            '001103': {
                url: common.isliveCs() + '/dailyfill/query',
                isNative: common.isliveCsNative()
            },
            //商品摆放目录
            '001425': {
                url: common.isliveCs() + '/sku-place/query',
                isNative: common.isliveCsNative()
            },
            //非整车采购退货
            '001326': {
                url: common.isliveCs() + '/purchase-return/purchase-return-search',
                isNative: common.isliveCsNative()
            },
            //出入库清单明细
            '001322': {
                url: common.isliveCs() + '/warehousing-list',
                isNative: common.isliveCsNative()
            },
            //入库清单明细
            '001319': {
                url: common.isliveCs() + '/inventory-list',
                isNative: common.isliveCsNative()
            },
            //集团内调拨入库单
            '000957': {
                url: common.isliveCs() + '/group-allotin/query',
                isNative: common.isliveCsNative()
            },
            //集团调拨出库单
            '000962': {
                url: common.isliveCs() + '/group-allotout/query',
                isNative: common.isliveCsNative()
            },
            //需求单
            '001126': {
                url: common.isliveCs() + '/demand-order/require-goods',
                isNative: common.isliveCsNative()
            },
            // 组合
            // 由于有两个页面的 name 都是 skuComb，所以在本地点击此链接时
            // 由于重定向会跳到 001032 所对应的页面
            '000349': {
                url: common.islivePro() + '/skuComb',
                isNative: common.isliveProNative()
            },
            //组合商品
            '001032': {
                url: common.isliveCs() + '/skuComb/query',
                isNative: common.isliveCsNative()
            },
            // 组合分类
            '001161': {
                url: common.isliveCs() + '/groupClassify/query',
                isNative: common.isliveCsNative()
            },
            // 组合目录
            '001155': {
                url: common.isliveCs() + '/groupCatalog/query',
                isNative: common.isliveCsNative()
            },
            // 门店管理
            '001069': {
                url: common.isliveCs() + '/storemanage/query',
                isNative: common.isliveCsNative()
            },
            //门店工位信息
            '000970': {
                url: common.isliveCs() + '/store-station',
                isNative: common.isliveCsNative()
            },
            //卡模板管理计次卡
            '001216': {
                url: common.isliveCs() + '/card-template-counting/card-template-counting-query',
                isNative: common.isliveCsNative()
            },
            //卡充值
            '001239': {
                url: common.isliveCs() + '/card-pay/card-pay-search',
                isNative: common.isliveCsNative()
            },
            //卡管理
            '001261': {
                url: common.isliveCs() + '/card-manager/query',
                isNative: common.isliveCsNative()
            },
            //卡销售单
            '001226': {
                url: common.isliveCs() + '/card-sale-order/query',
                isNative: common.isliveCsNative()
            },
            //退卡退款
            '001307': {
                url: common.isliveCs() + '/back-card/back-card-query',
                isNative: common.isliveCsNative()
            },

            // 券模板
            '001469': {
                url: common.isliveCs() + '/ticket-template-counting/ticket-template-counting-query',
                isNative: common.isliveCsNative()
            },
            // 券管理
            '001667': {
                url: common.isliveCs() + '/ticket-manager/query',
                isNative: common.isliveCsNative()
            },
            // 券销售
            '001952': {
                url: common.isliveCs() + '/coupons-sale-order/query',
                isNative: common.isliveCsNative()
            },

            // 检查模板
            '001351': {
                url: common.isliveCs() + '/check-template/check-template-search',
                isNative: common.isliveCsNative()
            },
            // 对账单
            '001539': {
                url: common.isliveCs() + '/statement-account/query',
                isNative: common.isliveCsNative()
            },
            // 对账核销单
            '001549': {
                url: common.isliveCs() + '/statement-account-cancel/query',
                isNative: common.isliveCsNative()
            },
            // 自采对账核销
            '001780': {
                url: common.isliveCs() + '/account-check/index',
                isNative: common.isliveCsNative()
            },
            // 调拨相关清单
            '001564': {
                url: common.isliveCs() + '/allot-relative/query',
                isNative: common.isliveCsNative()
            },
            // 卡模版储值
            '001566': {
                url: common.isliveCs() + '/card-template-storedvalue/card-template-storedvalue-query',
                isNative: common.isliveCsNative()
            },
            // 退票
            '001376': {
                url: common.isliveCs() + '/refund/refund-query',
                isNative: common.isliveCsNative()
            },
            // 开票
            '001371': {
                url: common.isliveCs() + '/workOrderInvoice/workOrderInvoice',
                isNative: common.isliveCsNative()
            },
            // 完工
            '002302': {
                url: common.isliveCs() + '/finish/query',
                isNative: common.isliveCsNative()
            },
            // 竣工
            '002309': {
                url: common.isliveCs() + '/complete/query',
                isNative: common.isliveCsNative()
            },
            // 公司管理
            '002350': {
                url: common.isliveCs() + '/company/query',
                isNative: common.isliveCsNative()
            },
            // 授信管理
            '002386': {
                url: common.isliveCs() + '/credit/query',
                isNative: common.isliveCsNative()
            },
            '002361': {
                url: common.isliveCs() + '/enterprise-verification/query',
                isNative: common.isliveCsNative()
            },
            // 售后招揽任务分配
            '002299': {
                url: common.isliveCs() + '/solicit-allocation/query',
                isNative: common.isliveCsNative()
            },
            // 售后招揽任务清单
            '002332': {
                url: common.isliveCs() + '/solicit/query',
                isNative: common.isliveCsNative()
            },
            // 车辆保养配置
            '002292': {
                url: common.isliveCs() + '/vehicle-maintain/query',
                isNative: common.isliveCsNative()
            },
            // 退款查询
            '002238': {
                url: common.isliveCs() + '/repair-order-refund/query',
                isNative: common.isliveCsNative()
            },
            // 洗车
            '001742': {
                url: common.isliveCs() + '/vehicle-cleaning/vehicle-cleaning-add',
                isNative: common.isliveCsNative()
            },
            // 维修合同
            '001689': {
                url: common.isliveCs() + '/work-order/work-order-search',
                isNative: common.isliveCsNative()
            },
            // 预约单
            '001913': {
                url: common.isliveCs() + '/appoint/query',
                isNative: common.isliveCsNative()
            },
            // 预检单
            '001697': {
                url: common.isliveCs() + '/precheck-fix/precheck-fix-query',
                isNative: common.isliveCsNative()
            },
            // 订单结算
            '001724': {
                url: common.isliveCs() + '/workOrderPay/workOrderPay',
                isNative:  common.isliveCsNative()
            },
            // 领料
            '001741': {
                url: common.isliveCs() + '/store-requisition/query',
                isNative:  common.isliveCsNative()
            },
            // 寄存查询
            '002202': {
                url: common.isliveCs() + '/consign/consign-query',
                isNative:  common.isliveCsNative()
            },
            // 非整车工单基础包
            '001672': {
                url: common.isliveCs() + '/check-fix-list/query',
                isNative: common.isliveCsNative()
            },
            // 促销折扣权限
            '001390': {
                url: common.isliveCs() + '/sale-discount/sale-discount-search',
                isNative: common.isliveCsNative()
            },
            //供应商
            '000636': {
                url: common.isliveCs() + '/supplier/supplierSearch',
                isNative: common.isliveCsNative()
            },
            // 服务预约推荐配置
            '002055': {
                url: common.isliveCs() + '/store-appointment-service/store-appointment-service-query',
                isNative: common.isliveCsNative()
            },
            // 服务推荐
            '001343': {
                url: common.isliveCs() + '/service-recommend/query',
                isNative: common.isliveCsNative()
            },
            //客户主档 pre 销售环境老的 客户主档
            '000367': {
                url: common.isliveCs() + '/mancar/query',
                isNative: common.isliveCsNative()
            },
            // 人车-会员车辆信息
            '001437': {
                url: common.isliveCs() + '/mancar/query',
                isNative: common.isliveCsNative()
            },
            // 车辆管理
            '002649': {
                url: common.isliveCs() + '/vehicle/query',
                isNative: common.isliveCsNative()
            },
            // 商品信息
            '000905': {
                url: common.isliveCs() + '/skuinfo/query',
                isNative: common.isliveCsNative()
            },
            // 服务信息
            '000803': {
                url: common.isliveCs() + '/serviceitem/query',
                isNative: common.isliveCsNative()
            },
            // 非整车商品采购
            '001506': {
                url: common.isliveCs() + '/notarchives-put/notarchives-query',
                isNative: common.isliveCsNative()
            },
            // 退货入库
            '002400': {
                url: common.isliveCs() + '/refund-sku-instock/query',
                isNative: common.isliveCsNative()
            },
            // 应收对账管理
            '002475': {
                url: common.isliveCs() + '/finance/reconciliation/reconciliation-query',
                isNative: common.isliveCsNative()
            },
            // 应收核销管理
            '002497': {
                url: common.isliveCs() + '/verifications/verification/query',
                isNative: common.isliveCsNative()
            },
            //大客户核销
            '002582': {
                url: common.isliveCs() + '/customers/customer/query',
                isNative: common.isliveCsNative()
            },
          //出门单管理
           '002686' :{
               url: common.isliveCs() + '/release/query',
               isNative: common.isliveCsNative()
             },
            // 大客户对账
            '002561': {
                url: common.isliveCs() + '/customer/reconciliation/customer-reconciliation-query',
                isNative: common.isliveCsNative()
            },
            // 收款单管理
            '002538': {
                url: common.isliveCs() + '/collection-query/query',
                isNative: common.isliveCsNative()
            },
            //维修工时配置
            '002457': {
                url: common.isliveCs() + '/maintenance-work-config/query',
                isNative: common.isliveCsNative()
            },
            //提交结算
            '002512': {
                url: common.isliveCs() + '/settlement/submit',
                isNative: common.isliveCsNative()
            },
            //结算查询
            '002469': {
                url: common.isliveCs() + '/settlement-query/query',
                isNative: common.isliveCsNative()
            },
            // 备件外销
            '002611': {
                url: common.isliveCs() + '/spare-parts-sale/insert',
                isNative: common.isliveCsNative()
            },
            // 开票管理
            '002632': {
                url: common.isliveCs() + '/receipt/receipt-query',
                isNative: common.isliveCsNative()
            },
            // 新车精品销售台账
            '002647': {
                url: common.islivePro() + '/dataReport/qualityGoodsExport',
                isNative: common.isliveProNative()
            },
            // 车型盈利销售看板
            '002669': {
                url: common.islivePro() + '/dataReport/groupProfitDashboard',
                isNative: common.isliveProNative()
            },
            // 人员绩效销售看板
            '002684': {
                url: common.islivePro() + '/dataReport/persionProfitDashboard',
                isNative: common.isliveProNative()
            }
        }
    }
}