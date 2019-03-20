/**
 *  common config
 */
import common from './common.js'
export default {
    //报表导出类型
    fileExportType: {
        fileExportTypeLeads	:'FileExportTypeLeads',     //线索导出
        fileExportTypeLPE: 'FileExportTypeLPE',         //展厅客流日志导出
        fileExportTypeOrder: 'FileExportTypeOrder',      //订单导出
        FileExportTypeSkuOrder: 'FileExportTypeSkuOrder',      //新车精品台账导出
        FileExportTypeStock: 'FileExportTypeStock',    //库存导出
        FileExportTypeOrderPayMent: 'FileExportTypeOrderPayMent'
    },
    //websocket地址
    // wsUrl:  common.getOrigin1().replace('http', 'ws') + '/im-com/webSocket/empToken=',
    // wsUrl: 'ws://192.168.0.233:30099' + '/im-com/webSocket/empToken=',
    //登录页面的链接 暂时写死
    loginUrl: '/web/login/login.html',
    // loginUrl: '/livecs/login',
    // loginUrl: window.location.origin == 'http://sit.iris.com' ? '/web/login/login.html' : '/livecs/login',
    //登录token键值名
    empTokenKey: 'e_token',
    // 初始化pageNums
    pageNums: process.env.NODE_ENV === 'development' ? 10 : 15,
    // 最大分页数量
    maxPageNums: 10000,
    //文件上传地址
    // uploadUrl: '/v1/fileSys/file/upload',
    uploadUrl: process.env.NODE_ENV === 'development' ? 'http://dev.iris.com/v1/fileSys/file/upload':'/v1/fileSys/file/upload',
    //数据字典主表code
    ref: {
        getServiceType: 'ServiceType',
        accountType: 'AccountType',
        // salesType: 'OrderSalesType',
        // SalesTaskType: 'SalesTaskType',
        salesType: 'SalesTaskType',
        financeFailReasonType: 'FinanceFailReasonType',
        plateType: 'PlateType',
        orderAddInfoType: 'OrderAddInfoType',
        idtype: 'CertificateType',
        invoiceOrderType: 'invoiceOrderType',
        gpconfig: 'GpConverType',
        frontSystemName: 'frontSystemName',
        frontMenuLogo: 'frontMenuLogo',
        frontLogo: 'frontLogo',
        accountType: 'AccountType',
        gpSortType: 'GPSortTypeCode',
        pcBoardRole: 'PCBoardRoleSetting',

    },
    serviceId: '',
    // serviceId: _sit == 'sit' ? 'http://sit.iris.com':'http://dev.iris.com',
    //整车锁定类型
    lockType: [{
        value: '1',
        text: '集团锁定'
    }, {
        value: '2',
        text: '厂家锁定'
    }],
    //GP设置类型
    gpType: [{
        value: 'AccountType',
        text: '账类',
    }, {
        value: 'GPOrderType',
        text: '订单类型',
    },],
    lockStatus: [{
        value: '',
        text: ''
    }, {
        value: '-1',
        text: '未锁定'
    }, {
        value: '0',
        text: '销售锁定'
    }, {
        value: '1',
        text: '集团/经销商锁定'
    }, {
        value: '2',
        text: '厂家锁定'
    }, {
        value: '3',
        text: '调拨锁定'
    }],
    //行政、销售、配送、采购区域树状图根节点获取参数
    areaRoot: {
        org: "000001",
        area: "000001",
        sale: "000001",
        darea: "000001",
        parea: "000001"
    },
    // 车辆配置信息
    car: {
        none: '',
        factoryRefCode: '0',
        brandRefCode: '1',
        seriesRefCode: '2',
        modelRefCode: '3',
        carRefCode: '',
        skuAddInfos: {
            actualMSRPInclusiveTax: {
                refCode: 'actualMSRPInclusiveTax'
            },
            carloadProAddPurchaseFee: {
                refCode: 'carloadProAddPurchaseFee'
            }
        }
    },
    // 获取金融机构类型所需code
    financeType: {
        refCode: 'FinanceOrgType'
    },
    financeProType: {
        proCode: 'FinanceProType'
    },
    //市场活动部分配置数据
    market: {
        analysisUrlRecall: '/v1/file/importVehicleRecallInfo',  //召回导入
        analysisUrl: '/v1/file/parseMarketInvitationExcelFile',
        refCode: "MarketActivityTpye", //获取市场活动类型的数据字典编码
        getMaCode: "MKTACTIVITY", //获取市场活动编码业务序列
        getWordsCode: "MKTWORD", //获取市场活动话术编码
        getMaCarCode: "MKTCAR", //获取市场活动车型编码
        rollType: [
            {
                value: '',
                text: '全部'
            },
            {
                value: '0',
                text: '活动待邀约名单'
            },
            {
                value: '1',
                text: '邀约成功名单'
            },
            {
                value: '-1',
                text: '邀约未成功名单'
            }
        ],
        attendFlagList: [
            {
                value: '',
                text: '全部'
            },
            {
                value: '0',
                text: '未出席'
            },
            {
                value: '1',
                text: '已出席'
            },
        ]
    },
    // 服务费设置
    serviceFreeSeting: {
        refCode: 'ServiceType',
        rateRefCode: 'RateValue',
        upDownList: [
            {
                text: '全部',
                value: ''
            },
            {
                text: '启用',
                value: '1'
            },
            {
                text: '停用',
                value: '0'
            }
        ]
    },
    //crm调研
    questionnaire: {
        getQaType: "QuestionnaireTpye",
        getQaCode: "QUESTIONNAIRE",
        getTopicType: "QuestionnaireQueTpye",
        getQuestionCode: "QUQUESTION",
        getAnswer: "QUANSWER",
        getUseRangeer: "QUUSERANGE",
        CRMConditionTask: "CRMConditionTask",
    },
    getCode: {
        getUserAnswerCode: 'USERANSWERCODE'
    },
    // 金融产品配置(依次为: 金融产品编码业务序列号, 金融产品数据字典code, 利率/费率数据字典code, 贷款类型数据字典code)
    financePro: {
        getFinanceCode: 'FINPROD',
        getFinanceDetailCode: 'FINDETAIL',
        getFinanceDetailCarCode: 'FINDETAILCAR',
        getFinanceDetailInterCode: 'FINDETAILINTER',
        financeType: {
            refCode: 'FinanceProType',
            refDetailFatherCode: '0',
            interestFatherCode: 'financeProTypeDiscountProduct',
            standardFatherCode: 'financeProTypeStandardProduct',
            leaseFatherCode: 'financeProTypeLeasedProduct'
        },
        rateType: {
            refCode: 'Rate',
            interest: 'interestRate'
        },
        loanType: {
            refCode: 'LoadType'
        },
        treeArea: '000001', //适用范围销售区域树形获取全国数据的编码
        templateFileRelationCode: 'ImportTemplateFinance',
        uploadUrl: common.isDevFile() + '/v1/fileSys/file/parseFinanceExcelFile',
        downloadTemplateFileUrl: common.isDevTemplate() + '/v1/fileSys/file/downloadExcelTempletForFinance'
    },
    //保险机构部分配置数据
    insurance: {
        getCoCode: 'INSCO',
        companyType: 'InsuranceComTpye',
        getInsTypeCode: 'INSTYPE',
        insuranceType: 'InsuranceTpye', // 险种
        costType: 'InsuranceComFeeTpye',
        costCode: 'INSCOCOMM', // 手续费code
        pageNums: 100,
        insCompTypecode: "INSCOMPTYPE",
        accountType: 'AccountType',
        strongInsuranceType: 'strongInsurance',
        commercialAllInsuranceType: 'commercialAllInsurance',
        vehicleAndVesselTaxType: 'vehicleAndVesselTax',
        normalAccountType: 'normalSale',
        insuranceFailReasonType: 'InsDefeatReason',
    },
    // 提示信息 统一配置项目
    messInfo: {
        uploadSuccess: '导入成功',
        success: '操作成功',
        fail: '操作失败',
        requestFail: '请求失败',
        deleteInfo: "是否删除本条数据", //删除话术提示信息
        selectOneRow: '请选择一条记录',
        selectStore: '请选择门店',
        select: '请选择一条数据',
        deblocking: '确定解锁',
        qaInfo: '请补全信息后保存',
        zuofei: '所选采购单已作废',
        dccInfo: '该用户不能新增线索',
        dccInfo1: '该客户已经有主档',
        mobileFail: '联系人电话格式不正确',
        phoneFail: '联系人手机格式不正确',
        selectInStockSkus: '请选择入库商品',
        reassignReason: '重新分配原因不可以为空',
        complainInfo: '投诉信息不可以为空',
        taskStatusFail: '失败原因不可以为空',
        nextTime: '下次跟进时间不可以为空',
        collect: '非现金收款交易凭证号不为空',
        redNo: '红冲发票号不可为空',
        requiredFlag: '必答题不能不答',
        updateCarShareDetailInfoOffSucc: '下架',
        updateFinanceWbSucc: '保存金融方案成功',
        synchFinanceWbSucc: '同步金融方案成功',
        updateInsuranceWbSucc: '保存保险方案成功',
        synchInsuranceWbSucc: '同步保险方案成功',
        updateFinanceCustomSucc: '保存贷款客户联系资料成功',
        updateFinanceTrackSucc: '保存金融贷款跟踪成功',
        updateInsWbRecognizeeSucc: '保存被保车辆及被保人成功',
        updateOutInsuranceWbSucc: '保存保险出单信息成功',
    },
    checkInfo: {
        cancel: "取消选中状态成功",
        checked: "选中状态成功"
    },
    addFinanceCode: {
        refCode: 'FinanceOrgType', //获取金融机构编码
        scopeCode: 'FINORGUR', //适用范围的编码
        attackCode: "FINORGSC", //获取手续费编码
        interest: "SUBSIDY", //获取贴息编码
        salesCode: "FINORGUR" //门店编码
    },
    scope: 'RangeTpye', //获取适用范围类型的编码,
    rate: {
        refCode: 'RateValue'
    },
    //税率
    scopeType: {
        government: "rangeTpyeChinaArea",
        sales: "rangeTpyeSalesArea",
        shop: "rangeTpyeDealer"
    },
    //开票单据类型
    invoiceOrderType: {
        carPurchase: 'invoiceOrderTypeCarPurchase',
        internalProcurement: 'invoiceOrderTypeInternalProcurement'
    },
    // 商品
    product: {
        // 商品品牌
        commodityBrand: {
            sequence: "SKUBRAND"
        },
        commodityUnit: {
            sequence: "SKUUNIT"
        },
        // 商品产地和包装
        commodityBirthplace: {
            sequence: 'SKUAREA'
        },
        commodityPack: {
            sequence: 'SKUPACK'
        },
        // 商品分类
        classification: {
            rootCode: '000001',
            getCategoryCode: 'SKUCATEGORY'
        },
        //商品车型模块
        goodsModels: {
            getAddCode: "SKUADD",
            getSkuCode: "SKU",
            getRelationCode: "SKUCAR"
        },
        //商品档案模块
        archives: {
            getSkuCode: "SKU",
            refCode: 'CarloadProAdd',
            archivesType: 'goodsTypeCar', //整车商品
            boutuqueType: 'goodsTypeGood', //精品商品
            temporaryType: 'goodsTypeTemporary', //临时商品
            getlockCode: 'SKULOCK'
        },
        // 商品目录
        catalog: {
            rootCode: '000001',
            getCatlogCode: 'SKUCATLOG'
        },
        // 商品价格
        skuPrice: {
            sequence: 'SKUPRICE'
        },
        // 组合商品
        skuComb: {
            sequence: 'SKUCOMB',
            detail: {
                sequence: 'COMBDETAILSEQ'
            },
            price: {
                sequence: 'COMBPRICESEQ'
            },
            useRange: {
                sequence: 'COMBRANGESEQ'
            }
        },
        channelType: {
            refCode: 'ChannelCode',
        },
        skuAddInfos: {
            carAppertanceName: {
              refCode: 'carAppertanceName'
            },
            reportFactoryDate: {
              refCode: 'reportFactoryDate'
            },
            carInteriorName: {
              refCode: 'carInteriorName'
            },
            actualMSRPInclusiveTax: {
              refCode: 'actualMSRPInclusiveTax'
            },
            originalAddition: {
              refCode: 'originalAddition'
            },
            deceitCarAddCode: {
              refCode: 'deceitCarAddCode'
            }
        }
    },
    // 工作流
    workFlow: {
        batchImportSetting: {
            uploadUrl: common.isDevFile() + '/v1/dbinit/workflow/parseWorkflowInfoExcelInfo'
        },
        approveType: 'WorkFlowBusinessTypeCode',
        serviceCode: {
            node: 'WFNODE',
            main: 'WORKFLOW'
        },
        typePosition: 'PositionType',

    },
    //客户
    client: {
        clientmaininfo: "CustomAdd", //客户主档信息管理的附件信息编码
        clientmaininfosequence: "CUSTOM", //新增客户的sequence
        clienttypecode: "CustomType", //客户类型编码
        clientsourcecode: "CustomSourceType", //客户来源编码
        clientgroupcode: "CustomGroupType", //客户群体编码
        clientreceipttype: "RateRelation", //客户发票类型
        certificateType: "CertificateType", //证件类型
        clientsettlement: "SettleMethod", //结算方式
        clientfinancecode: "CUSFIN", //客户财务sequence
        clienttakedeliverycode: "CUSRECEIVER", //客户收货地址sequence
        clientlinkmancode: "CUSCONTACT", //客户联系人sequence
        clientidtype: "CUSIDTYPE", //证件类型sequence
        clienttypeofid: "CertificateType" //数据字典获取证件类型
    },
    //保险方案
    insurancePro: {
        serviceCode: 'INSURANCE',
        analysisUrl: '/v1/fileSys/file/parseInsuranceExcelFile',
    },
    // 供应链
    supplyChain: {
        // 仓库信息
        warehouse: {
            // calCostType: 'REF001010',
            whType: 'WarehouseType',
            sequence: 'WAREHOUSE',
            warehouseTag: 'WarehouseLabel'
        },
        // 仓库库区信息
        whArea: {
            type: 'ReservoirAreaType',
            sequence: 'WHAREA'
        },
        // 仓库库位信息
        whLocation: {
            sequence: 'WHLOCATION'
        },
        // 采购管理(整车)
        procurement: {
            sequence: 'PurchaseOrder',
            refCode: 'CustomizeGroupAccountPeriod'
        },
        // 供应商
        supplier: {
            sequence: 'SUPPLIER',
            supplierType: {
                refCode: 'SupplierType'
            },
        },
        // 供应商发票
        supplierInvoice: {
            sequence: 'SUPPLIERINV',
            invoiceType: {
                refCode: 'RateRelation'
            }
        },
        // 库存主表信息
        stockInfo: {
            sequence: '',
        },
        // 库存明细表信息
        stockDetailInfo: {
            sequence: '',
        },
        // 采购订单
        purchaseOrder: {
            sequence: 'PO',
            refCode: 'CustomizeGroupAccountPeriod',
            carOrderType: 0,
            normalOrderType: 1,
            deliveryType: {
                refCode: 'DispatchingType'
            },
            purchaseType: {
                refCode: 'PurchaseOrder'
            },
            poSkuDetail: {
                sequence: 'PODETAIL',
            }
        },
        // 库存主表信息
        stockInfo: {
            sequence: '',
            inStock: {
                inSourceTypeCode: 'inWhSourceTypeGoodPurchase'
            }
        },
        // 库存明细表信息
        stockDetailInfo: {
            sequence: '',
        }
    },
    // dcc
    addclientmain: {
        relationTypeCode: 'ListRelationTypeMarket',                 //线索市场活动关联Code
        relationCode: "ImportTemplateDCCLead",
        analysisUrl: '/v1/fileSys/file/parseSalesleadsExcelFile',   //线索模板解析接口
        //销售状态
        salesList: [
            {
                text: "全部",
                value: ""
            },
            {
                text: "未报价",
                value: "0"
            },
            {
                text: "报价",
                value: "1"
            },
            {
                text: "订单 ",
                value: "2"
            },
            {
                text: "合同",
                value: "4"
            },
            {
                text: "开票",
                value: "8"
            },
            {
                text: "交车",
                value: "16"
            }
        ],
        //sc线索状态
        clueList: [
            {
                text: "全部",
                value: ""
            },
            {
                text: "已预约",
                value: "1"
            },
            {
                text: "待跟进 ",
                value: "2"
            },
            {
                text: "到店",
                value: "4"
            },
            {
                text: "试乘试驾",
                value: "8"
            },
            {
                text: "准战败",
                value: "16"
            },
            {
                text: "无效线索",
                value: "32"
            },
            {
                text: "战败",
                value: "64"
            }
        ],
        //名单状态
        status: [{
            value: -2,
            text: "待甄别"
        }, {
            value: 0,
            text: "无效名单"
        }, {
            value: -1,
            text: "错误名单"
        }, {
            value: 1,
            text: "线索"
        }],
        // DCC线索跟进方式
        dccFollowTypeCode: 'LeadDccFollowType',
        // DCC线索未进店原因
        dotIntoStoreReasonCode: 'LeadNotIntoStoreReason',
        // 名单无效原因
        invalidReasonCode: 'LeadInvalidReason',
        //线索渠道
        channelCode: 'LeadsChannel',
        //休眠渠道
        dormancyChannelCode: 'LeadsChannelDormancy',
        //线索来源分类
        souceCode: 'LeadsSourceClassify',
        //新建线索编码
        serverCode: 'LEADS',
        //无效线索原因
        invalidCode: 'DefeatReason',
        //意向级别
        intentonLevel: 'IntentionLevel',
        //普通客户，客户类型
        customType: 'customTypeIndividualCus',
        //选择其他车辆
        uselessReasonCode: 'defeatReasonChangeStore'
    },
    //商务激励政策管理
    businessaffairs: {
        businessaffairstype: "SalesPolicyTypeCode"
    },
    // 销售
    sales: {
        salesTargetPlan: {
            uploadUrl: '/v1/file/parseSalesTargetExcelFile',
            sequence: 'SALESTARGET'
        },
        personalizedSalesSetting: {
            uploadUrl: '/v1/file/parseSalesTargetExcelFileSI',
        }
    },
    // 前台接待
    reception: {
        receSeq: 'RECEPTION',
        driveSeq: 'TRYDRIVE',
        recepCancelLimit: 'RecepCancelLimit'
    },
    appointmentSourceCode: {
        dcc: 'appointSourceTypeDccAppoint',
        sc: 'appointSourceTypeScAppoint'
    },
    //财务管理
    financing: {
        wfTypeCode: ['NewCarContractWfType', 'NewCarIntentionOrderWfType', 'NewCarOrderWfType'],
        paymentCode: 'PAYMENTSERIALNUMBERCODE',
        paymentTypeCode: 'PaymentModeType',
        sourceOrderTypeCode: 'OrderSalesType',
        invoiceContentCode: 'InvoiceContentCode',
        InvoiceType: 'RateRelation',
        getInvoiceCode: 'OrderInvoiceSeq',
        getGPdetail: 'GpConverType',
        gpbelonging: 'GP_CONFIG_DETAIL',
        getSNPdetail: 'SnpConverType',
        snpbelonging: 'SNPCONFIGDETAILCODE',
        orderAddInfoDeposit: 'OrderAddInfoDeposit',
        afterSalesInvoice: ['CardRecharge', 'CardSales']
    },
    //GP配置主表编码
    gpConfigCode: 'GPCONFIGBASE',
    research: {
        taskStatus: 'NewCarSalesLeadsTaskStatus',
        taskType: 'QuestionnaireTpye',
        failReason: 'newCarSalesLeadsTaskFailReason',
        //是否重新分配
        redistribution: [{
            value: 1,
            text: '是',
        }, {
            value: 0,
            text: '否',
        }],
        complaints: [{
            value: 1,
            text: '是',
        }, {
            value: 0,
            text: '否',
        }]
    },
    // 订单状态 map
    order: {
        status: [{
            text: '待提交',
            value: {
                wfStatus: -1
            }
        }, {
            text: '审批中',
            value: {
                wfStatus: 0
            }
        }, {
            text: '意向单',
            value: {
                wfStatus: 1,
                wfTypeCode: 'NewCarIntentionOrderWfType'
            }
        }, {
            text: '订单',
            value: {
                wfStatus: 1,
                wfTypeCode: 'NewCarOrderWfType'
            }
        }, {
            text: '合同',
            value: {
                wfStatus: 1,
                wfTypeCode: 'NewCarContractWfType'
            }
        }, {
            text: '退订',
            value: {
                wfStatus: 1,
                wfTypeCode: 'NewCarRefuseWfType'
            }
        }, {
            text: '交车',
            value: {
                // wfStatus: 1,
                closingFlag: 1
            }
        }],
        carInfo: {
            carAppertanceName: {
                refCode: 'OrderCarAddInfoColor'
            },
            carInteriorName: {
                refCode: 'OrderCarAddInfoInterior'
            },
            skuAddInfos: {
                carAppertanceName: {
                    refCode: 'carAppertanceName'
                },
                reportFactoryDate: {
                    refCode: 'reportFactoryDate'
                },
                carInteriorName: {
                    refCode: 'carInteriorName'
                },
                actualMSRPInclusiveTax: {
                    refCode: 'actualMSRPInclusiveTax'
                },
                originalAddition: {
                    refCode: 'originalAddition'
                },
                deceitCarAddCode: {
                    refCode: 'deceitCarAddCode'
                }
            },
            skuType: 'goodsTypeCar'
        },
    },
    // 审批流上下架状态
    salesAdminList: [{
        text: '是',
        value: 1
    }, {
        text: '否',
        value: 0
    }],
    salesGpOrSnp: [
    {
        text: '无条件',
        value: 0
    },
    {
        text: 'GP%',
        value: 1
    }, {
        text: 'SNP%',
        value: 2
    }, {
        text: '让利率',
        value: 3
    }],
    // 审批流提示信息
    salesAdmintips: {
        nodeTips: '请完善节点信息'
    },
    // 员工岗位类型
    postnTypeCode: {
        sc: 'positionTypeSC',
        dcc: 'positionTypeDCCSpecialist',
        dccManager: 'positionTypeDCCManager',
        CRMSpecialist: 'positionTypeCRMSpecialist'
    },
    // 车辆内采内销
    carShare: {
        sequence: 'CARSHARESEQ',
        detail: {
            sequence: 'CARSHAREDETAILSEQ'
        }
    },
    // 车辆调拨出库
    carAdjustOutStockInfo: {
        sequence: 'CARADJUSTOUTSEQ',
        detail: {
            sequence: 'CARDETAILADJUSTOUTSEQ'
        }
    },
    // 车辆调拨入库
    carAdjustInStockInfo: {
        sequence: 'CARADJUSTINTSEQ',
        detail: {
            sequence: 'CARDETAILADJUSTINTSEQ'
        }
    },
    showDetailFlag: 'detail',
    editDetailFlag: 'work',
    financeWorkbench: {
        quoteFlag: 'quote',
        loanFlag: 'loan',
        finanCustomInfo: {
            sequence: 'FINCUSTOMSEQ'
        },
        financeWorkbenchTrackInfo: {
            sequence: 'FINTRACKSEQ',
            approvalResult: {
                refCode: 'ApprovalResultType',
                applySuccess: 'ApprovalResultTypeApplySuccess',
                loanCompletion: 'ApprovalResultTypeLoanCompletion',
                mortgageCompletion: 'ApprovalResultTypeMortgageCompletion',
                replyFail: 'ApprovalResultTypeReplyFail',
                replySuccess: 'ApprovalResultTypeReplySuccess',
                submitReply: 'ApprovalResultTypeSubmitReply',
                conditionReply: 'ApprovalResultTypeConditionApproval',
                replyLoan: 'ApprovalResultTypeLoanApplication',
            },
            approvalResultReason: {
                refCode: 'ApprovalResultReasonType'
            }
        },
    },
    insuranceWorkbench: {
        quoteFlag: 'quote',
        outFlag: 'out',
        editFlag: 'edit',
        detailFlag: 'detail',
        vehicleSpecies: 'MotorVehicleSpecies',
        retreatingReason: 'RetreatingReason',
    },
    salesProfitGp: {
        gp1: 'GP1',
        gp1_rate: 'GP1%',
        gp2: 'GP2',
        gp2_rate: 'GP2%',
        gp3: 'GP3',
        gp3_rate: 'GP3%',
        gp4: 'GP4',
        gp4_rate: 'GP4%',
        gp45: 'GP4.5',
        gp45_rate: 'GP4.5%',
    },
    channelType: "OfflineStoreSales",
    // 成本计算类型
    calCostType: 'CostCalculationType',
    // 整车商品计算类型
    archivesCostType: 'average',
    // 是否显示厂家 false 从厂家开始，true从品牌开始
    isShowFactory: common.getSession('showFactory') === "false" ? false : true,
    // NoShowFactory: false,
    // 收退款状态
    income: '1',
    outcome: '-1',
    //查询商品品牌
    brandUrl: '/v1/sku/brand/querySkuBrandInfoForPageByVo',
    //产地
    skuAreaUrl: '/v1/sku/area/querySkuAreaInfoForPageByVo',
    //包装
    packUrl: '/v1/sku/pack/querySkuPackInfoForPageByVo',
    //单位
    unitUrl: '/v1/sku/unit/querySkuUnitInfoForPageByVo',
    //菜单logo
    menuLogoUrl: '/static/image/irislogo.png',
    // 整车交易(订单退款)
    TransactionNoteType: 'TransactionNoteType',
    //预装车页面 是否计入msrp
    msrpOption:[
        {
            text: '需要',
            value: 1
        },
        {
            text: '不需要',
            value: 0
        }
    ],
    preinstalled:[
        {
            text: '否',
            value: 0
        },
        {
            text: '是',
            value: 1
        }
    ],
    //si调整与手续费调整
    si:{
        //调整方式
        AdjustWay:'AdjustWay',
        //返利调整类型
        SiType:'SiType',
        //手续费类型
        ComFeeType:'ComFeeType',
        //车辆调整
        AdjustWayCarManagerment:'AdjustWayCarManagerment',
        //获取调整业余编码
        serviceCode:'INCOMMANAGERMENTSEQ',
        siUploadUrl: common.isDevFile() + '/v1/fileSys/file/parseCarSiManageInfo',
        scUploadUrl: common.isDevFile() + '/v1/fileSys/file/parseCommissionSiManageInfo'
    },
    cueTable: {
        sequence: 'CROSSDEPTMANAGERSEQ'
    },
    // 库存状态
    StockStateModule: {
        'StockTurnoverKpi': '库存周转天数',
        NotOrderFalseReportKpi: '未订已报台数',
        '181dayUpLibraryAgeKpi': '181天以上库龄',
        '91-180dayLibraryAgeKpi': '91-180天库龄',
        '61-90dayLibraryAgeKpi': '61-90天库龄',
        '31-60dayLibraryAgeKpi': '31-60天库龄',
        '0-30dayLibraryAgeKpi': '0-30天库龄'
    },
    // 漏斗表现
    FunnelPerformanceModule: {
        RetailRateKpi: '零售达成率',
        InStoreLeadNumKpi: '进店线索数',
        AddOrderNumKpi: '新增订单数',
        RetainOrderNumKpi: '留存订单数',
        InStoreLeadOrderRateKpi: '进店线索订单率',
        LocalCardKpi: '本地上牌',
        BatchSaleKpi: '批零比'
    },
    //销售毛利
    SaleMaoriModule: {
        TgpReachRateKpi: 'T.GP达成率',
        GP1ValueKpi: 'GP1',
        GP2ValueKpi: 'GP2',
        GP3ValueKpi: 'GP3',
        FactorySiReachKpi: '厂家返利达标（台)',
        StoreforecastSiKpi: '预计SI达成',
        BatchSaleAndRetailGP1Kpi: '批售和零售GP1差值'
    },
    //衍生业务
    DerivativeServicesModule: {
        DerivativeServiceReachRateKpi: '衍生业务毛利',
        FinanceGpReachRateKpi: '金融毛利',
        InsuranceGpReachRateKpi: '保险毛利',
        SkuGpReachRateKpi: '精品毛利',
        YanbaoGpReachRateKpi: '延保毛利',
        OtherGpReachRateKpi: '其他毛利'
    }

}
