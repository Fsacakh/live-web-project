import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var base = process.env.NODE_ENV === 'development' ? '/' : '/livepro';

var router = new Router({
    mode: 'history',
    base: base,
    routes: [
        {
            path: '/login',
            name: '登录',
            meta: {
                name: '登录'
            },
            component: resolve => require(['views/login/login.vue'], resolve)
        },
        {
            path: '/',
            redirect: '/index',
            name: '首页',
            meta: {
                label: '首页'
            },
            component: resolve => require(['components/containers/Full.vue'], resolve),
            children: [
                // 首页( dashboard )
                {
                    path: '/index',
                    meta: {
                        label: '工作台'
                    },
                    component: resolve => require(['views/dashboard_market/Dashboard'], resolve)
                },
                {
                    path: '/dashboardmarket',
                    meta: {
                        label: '工作台'
                    },
                    component: resolve => require(['views/dashboard_market/Dashboard'], resolve)
                },
                // 基础客群
                {
                    path: '/customer-group',
                    name: '基础客群',
                    meta: {
                        label: '基础客群'
                    },
                    component: resolve => require(['views/base-customer'], resolve)
                },
                // 客户跟进清单
                {
                    path: '/customer-recomand',
                    name: '客户跟进清单',
                    meta: {
                        label: '客户跟进清单'
                    },
                    component: resolve => require(['views/base-customer/customer-recomand.vue'], resolve)
                },
                // 当天车辆
                {
                    path: '/current-day',
                    name: '当天车辆',
                    meta: {
                        label: '当天车辆信息'
                    },
                    component: resolve => require(['views/base-customer/current-day'], resolve)
                },
                // dashboard - peng
                {
                    path: '/dashboard-may',
                    name: 'dashboard',
                    meta: {
                        label: 'dashboard'
                    },
                    component: resolve => require(['views/base-customer/dashboard.vue'], resolve)
                },
                // 金融机构
                {
                    path: '/finance/finance',
                    name: '金融机构中心',
                    meta: {
                        label: '金融机构中心'
                    },
                    redirect: '/finance/mainFinance',
                    component: {
                        render(a) {
                            return a('router-view')
                        }
                    },
                    children: [{
                        path: '/finance/mainFinance',
                        name: '金融机构',
                        meta: {
                            label: '金融机构'
                        },
                        component: resolve => require(['views/finance/mainFinance'], resolve)
                    }, {
                        path: '/finance/insert',
                        name: '新增金融机构',
                        meta: {
                            label: '新增金融机构'
                        },
                        component: resolve => require(['views/finance/insert/insert'], resolve)
                    }, {
                        path: '/finance/updata/:id',
                        name: '编辑金融机构',
                        meta: {
                            label: '编辑金融机构'
                        },
                        component: resolve => require(['views/finance/insert/insert'], resolve)
                    }]
                },
                // 金融产品
                {
                    path: '/financePro',
                    name: '金融产品设置',
                    redirect: '/financePro/mainFinancePro',
                    meta: {
                        label: '金融产品设置'
                    },
                    component: {
                        render(b) {
                            return b('router-view')
                        }
                    },
                    children: [{
                        path: 'mainFinancePro',
                        name: '金融产品查询',
                        meta: {
                            label: '金融产品查询'
                        },
                        component: resolve => require(['views/financePro/mainFinancePro'], resolve)
                    }, {
                        path: 'add',
                        name: '新增金融产品',
                        meta: {
                            label: '新增金融产品'
                        },
                        component: resolve => require(['views/financePro/addFinancePro'], resolve)
                    }, {
                        path: 'edit/:id',
                        name: '编辑金融产品',
                        meta: {
                            label: '编辑金融产品'
                        },
                        component: resolve => require(['views/financePro/editFinancePro'], resolve)
                    }, {
                        path: 'addProgram/:financeCode/:financeType/:financeOrgCode',
                        name: 'addProgram',
                        meta: {
                            label: '新增金融产品方案'
                        },
                        component: resolve => require(['views/financePro/addFinanceProProgram'], resolve)
                    }, {
                        path: 'editProgram/:financeCode/:financeType/:financeOrgCode/:financeDetailCode',
                        name: 'editProgram',
                        meta: {
                            label: '编辑金融产品方案'
                        },
                        component: resolve => require(['views/financePro/editFinanceProProgram'], resolve)
                    }, {
                        path: 'copyProgram/:financeCode/:financeType/:financeOrgCode/:financeDetailCode',
                        name: 'copyProgram',
                        meta: {
                            label: '复制新增金融产品方案'
                        },
                        component: resolve => require(['views/financePro/copyFinanceProProgram'], resolve)
                    },]
                },
                // 市场活动
                {
                    path: '/market',
                    redirect: '/market/query',
                    name: 'marketActivity',
                    meta: {
                        label: '市场活动'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        //新增市场活动
                        {
                            path: '/marketActivity/addMarketActivity/:id',
                            name: '新增市场活动',
                            meta: {
                                label: '新增市场活动'
                            },
                            component: resolve => require(['views/marketActivity/addMarketActivity'], resolve)
                        }, {
                            path: 'query',
                            name: 'marketQuery',
                            meta: {
                                label: '市场活动查询'
                            },
                            component: resolve => require(['views/market'], resolve)
                        }
                    ]
                },
                // 编辑密码
                {
                    path: '/resetPassword',
                    name: 'resetPassword',
                    meta: {
                        label: '编辑密码'
                    },
                    component: resolve => require(['views/login/changePassword'], resolve)
                },
                // 保险机构工作台
                {
                    path: 'insurance',
                    name: 'insurance',
                    redirect: 'insurance/query',
                    meta: {
                        label: '保险机构'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'insuranceQuery',
                        meta: {
                            label: '保险机构查询'
                        },
                        component: resolve => require(['views/insurance'], resolve)
                    }, {
                        path: 'insert/:id',
                        name: 'insuranceUpdata',
                        meta: {
                            label: '编辑保险机构'
                        },
                        component: resolve => require(['views/insurance/insert/insert'], resolve)
                    }, {
                        path: 'insert',
                        name: 'insuranceAdd',
                        meta: {
                            label: '新增保险机构'
                        },
                        component: resolve => require(['views/insurance/insert/insert'], resolve)
                    }]
                },
                // 保险方案推荐
                {
                    path: '/insurancepro',
                    name: 'insurancepro',
                    redirect: 'insurancepro/query',
                    meta: {
                        label: '保险方案推荐'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'insuranceproQuery',
                        meta: {
                            label: '保险方案查询'
                        },
                        component: resolve => require(['views/insurancePro'], resolve)
                    },
                    {
                        path: 'add',
                        name: 'insuranceproAdd',
                        meta: {
                            label: '保险方案新增'
                        },
                        component: resolve => require(['views/insurancePro/add.vue'], resolve)
                    }]
                },
                // 保险报价
                {
                    path: '/insuranceWorkbench',
                    name: 'insuranceWorkbench',
                    redirect: 'insuranceWorkbench/quote',
                    meta: {
                        label: '保险管理'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'quote',
                            name: 'quote',
                            meta: {
                                label: '保险客户协作报价'
                            },
                            component: resolve => require(['views/insuranceWorkbench/quote.vue'], resolve)
                        },
                        {
                            path: 'out',
                            name: 'out',
                            meta: {
                                label: '保险出单管理'
                            },
                            component: resolve => require(['views/insuranceWorkbench/out.vue'], resolve)
                        },
                        {
                            path: 'order/:wbRootCode/:insuranceWbCode/:orderNo/:flag/:canEdit',
                            name: 'order',
                            meta: {
                                label: '客户保险订单'
                            },
                            component: resolve => require(['views/insuranceWorkbench/order.vue'], resolve)
                        },
                        {
                            path: 'aloneInsurance',
                            name: 'aloneInsurance',
                            meta: {
                                label: '新增单售保险'
                            },
                            component: resolve => require(['views/insuranceWorkbench/aloneInsurance/aloneInsuranceDetail.vue'], resolve)
                        }
                    ]
                },
                //crm问题
                {
                    path: '/questionnaire',
                    redirect: '/questionnaire/query',
                    name: 'questionnaire',
                    meta: {
                        label: "CRM调研"
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'questionnaireQuery',
                        meta: {
                            label: '问卷调查查询'
                        },
                        component: resolve => require(['views/questionnaire/questionnaire'], resolve)
                    }, {
                        path: 'createdqa/:id',
                        name: 'createdQaName',
                        meta: {
                            label: '新增问卷调查'
                        },
                        component: resolve => require(['views/questionnaire/createdQa'], resolve),
                    }, {
                        path: 'editqa/:id',
                        name: 'editQaName',
                        meta: {
                            label: '编辑问卷调查'
                        },
                        component: resolve => require(['views/questionnaire/createdQa'], resolve),
                    }]
                },
                //新车调研
                {
                    path: '/research',
                    redirect: '/research/query',
                    name: 'research',
                    meta: {
                        label: "CRM新车调研"
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'researchQuery',
                        meta: {
                            label: '调研工作台'
                        },
                        component: resolve => require(['views/research/research'], resolve)
                    }, {
                        path: 'detail/:id',
                        name: 'researchDetail',
                        meta: {
                            label: '调研详情页'
                        },
                        component: resolve => require(['views/research/detail'], resolve),
                    }]
                },
                // 商品包装
                {
                    path: '/pack',
                    name: 'pack',
                    meta: {
                        label: '商品包装'
                    },
                    component: resolve => require(['views/product/pack/'], resolve)
                },
                // 商品产地
                {
                    path: '/birthplace',
                    name: 'birthplace',
                    meta: {
                        label: '商品产地'
                    },
                    component: resolve => require(['views/product/birthplace/'], resolve)
                },
                // 商品分类
                {
                    path: '/classification',
                    name: 'classification',
                    meta: {
                        label: '商品分类'
                    },
                    component: resolve => require(['views/product/classification/classification.vue'], resolve)
                },
                // 商品目录
                {
                    path: '/catalog',
                    name: 'catalog',
                    meta: {
                        label: '商品目录'
                    },
                    component: resolve => require(['views/product/catalog/catalog.vue'], resolve)
                },
                // 商品价格
                {
                    path: '/skuPrice',
                    name: 'skuPrice',
                    redirect: '/skuPrice/query',
                    meta: {
                        label: '商品价格'
                    },
                    component: {
                        render(b) {
                            return b('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'querySkuPrice',
                        meta: {
                            label: '商品价格查询'
                        },
                        component: resolve => require(['views/product/skuPrice'], resolve)
                    }, {
                        path: 'edit/:priceCode',
                        name: 'editSkuPrice',
                        meta: {
                            label: '编辑商品价格'
                        },
                        component: resolve => require(['views/product/skuPrice/editSkuPrice'], resolve)
                    }, {
                        path: 'add',
                        name: 'addSkuPrice',
                        meta: {
                            label: '新增商品价格'
                        },
                        component: resolve => require(['views/product/skuPrice/editSkuPrice'], resolve)
                    }]
                },
                // 组合商品
                {
                    path: '/skuComb',
                    name: 'skuComb',
                    redirect: '/skuComb/query',
                    meta: {
                        label: '组合商品'
                    },
                    component: {
                        render(b) {
                            return b('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'querySkuComb',
                        meta: {
                            label: '组合商品查询'
                        },
                        component: resolve => require(['views/product/skuComb'], resolve)
                    }, {
                        path: 'add',
                        name: 'addSkuComb',
                        meta: {
                            label: '新增组合商品'
                        },
                        component: resolve => require(['views/product/skuComb/editSkuComb'], resolve)
                    }, {
                        path: 'edit/:combinationCode',
                        name: 'editSkuComb',
                        meta: {
                            label: '编辑组合商品'
                        },
                        component: resolve => require(['views/product/skuComb/editSkuComb'], resolve)
                    }]
                },
                //商品品牌
                {
                    path: '/commoditybrand',
                    name: '商品品牌',
                    meta: {
                        label: '商品品牌'
                    },
                    component: resolve => require(['views/product/brand/index.vue'], resolve)
                },
                //商品车型
                {
                    path: '/models',
                    name: 'models',
                    redirect: 'models/query',
                    meta: {
                        label: '商品车型'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'getModelsInfo',
                        meta: {
                            label: '查询商品车型'
                        },
                        component: resolve => require(['views/product/models/models.vue'], resolve)
                    }, {
                        path: 'addModels/:id',
                        name: 'addModels',
                        meta: {
                            label: '新增商品车型'
                        },
                        component: resolve => require(['views/product/models/addModels.vue'], resolve),
                    }, {
                        path: 'editModels/:id',
                        name: 'editModels',
                        meta: {
                            label: '编辑商品车型'
                        },
                        component: resolve => require(['views/product/models/addModels.vue'], resolve),
                    }]
                },
                //整车商品
                {
                    path: '/archives',
                    name: 'archives',
                    redirect: 'archives/query',
                    meta: {
                        label: '整车商品'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'getArchives',
                        meta: {
                            label: '查询整车商品'
                        },
                        component: resolve => require(['views/product/archives/archives.vue'], resolve)
                    }, {
                        path: 'addarchives/:id',
                        name: 'addArchives',
                        meta: {
                            label: '新增整车商品'
                        },

                        component: resolve => require(['views/product/archives/addArchives.vue'], resolve),
                    },

                    {
                        path: 'editarchives/:id',
                        name: 'editArchives',
                        meta: {
                            label: '编辑整车商品'
                        },
                        component: resolve => require(['views/product/archives/addArchives.vue'], resolve),
                    },
                    {
                        path: 'archivesDetial/:id',
                        name: 'archivesDetial',
                        meta: {
                            label: '整车商品详情'
                        },
                        component: resolve => require(['views/product/archives/archivesDetial.vue'], resolve),
                    },
                    {
                        path: 'carloadDetails/:id',
                        name: 'carloadDetails',
                        meta: {
                            label: '整车商品详情'
                        },
                        component: resolve => require(['views/product/archives/carloadDetails.vue'], resolve),
                    }]
                },
                //整车商品锁定
                {
                    path: '/archiveslock',
                    name: 'archiveslock',
                    meta: {
                        label: '整车商品锁定'
                    },
                    component: resolve => require(['views/product/archiveslock/archiveslock.vue'], resolve)
                },
                //精品商品
                {
                    path: '/boutique',
                    name: 'boutique',
                    redirect: 'boutique/query',
                    meta: {
                        label: '精品商品'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'getBoutique',
                        meta: {
                            label: '查询精品商品'
                        },
                        component: resolve => require(['views/product/archives/boutique.vue'], resolve)
                    }, {
                        path: 'addboutique/:id',
                        name: 'addBoutique',
                        meta: {
                            label: '新增精品商品'
                        },

                        component: resolve => require(['views/product/archives/addBoutique.vue'], resolve),
                    },

                    {
                        path: 'editboutique/:id',
                        name: 'editBoutique',
                        meta: {
                            label: '编辑精品商品'
                        },
                        component: resolve => require(['views/product/archives/addBoutique.vue'], resolve),
                    },
                    {
                        path: 'boutiqueDetial/:id',
                        name: 'boutiqueDetial',
                        meta: {
                            label: '精品商品详情'
                        },
                        component: resolve => require(['views/product/archives/boutiqueDetial.vue'], resolve),
                    }
                    ]

                },
                //商品单位
                {
                    path: '/commodityunit',
                    name: '商品单位',
                    meta: {
                        label: '商品单位'
                    },
                    component: resolve => require(['views/product/unit/index.vue'], resolve)
                },
                // 前台接待
                {
                    path: '/receptionist',
                    name: 'receptionist',
                    redirect: '/receptionist',
                    meta: {
                        label: '前台工作台'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: '/receptionist',
                        name: 'receptionistoo',
                        meta: {
                            label: '前台接待'
                        },
                        component: resolve => require(['views/receptionist/receptionist.vue'], resolve)
                    }, {
                        path: '/appointment',
                        name: 'appointment',
                        meta: {
                            label: '预约接待'
                        },
                        component: resolve => require(['views/receptionist/appointment.vue'], resolve)
                    }, {
                        path: '/work',
                        name: 'work',
                        meta: {
                            label: '值班'
                        },
                        component: resolve => require(['views/receptionist/work.vue'], resolve)
                    }]
                },
                //客户主档信息管理
                {
                    path: '/clientmain',
                    name: 'clientmain',
                    redirect: `/clientmain/queryclientmain/${"customcode"}`,
                    meta: {
                        label: '客户管理'
                    },
                    component: {
                        render(a) {
                            return a('router-view')
                        },
                    },
                    children: [{
                        path: 'addclientmain',
                        name: 'addclientmain',
                        meta: {
                            label: '新增客户'
                        },
                        component: resolve => require(['views/clientadmin/insertModal.vue'], resolve)
                    }, {
                        path: 'queryclientmain/:code',
                        name: 'queryclientmain',
                        meta: {
                            label: '查询客户'
                        },
                        component: resolve => require(['views/clientadmin/index.vue'], resolve)
                    },
                    // 供应链 - 供应商
                    {
                        path: 'updataclientmain/:id',
                        name: 'updataclientmain',
                        meta: {
                            label: '编辑客户'
                        },
                        component: resolve => require(['views/clientadmin/updateModal.vue'], resolve)
                    }, {
                        path: 'subinfo/:code',
                        name: 'subinfo',
                        meta: {
                            label: '客户信息管理'
                        },
                        component: resolve => require(['views/clientadmin/subinfo/subinfo.vue'], resolve)
                    },
                    ]
                },
                // 仓库
                {
                    path: '/warehouse',
                    name: 'warehouse',
                    redirect: 'warehouse/query',
                    meta: {
                        label: '仓库信息'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'warehouseQuery',
                        meta: {
                            label: '仓库信息查询'
                        },
                        component: resolve => require(['views/supplyChain/warehouse/warehouse'], resolve)
                    }, {
                        path: 'insertOrUpdate/:id',
                        name: 'insertOrUpdate',
                        meta: {
                            label: '新增仓库信息'
                        },
                        component: resolve => require(['views/supplyChain/warehouse/insertOrUpdate'], resolve)
                    }]
                },
                // 仓库库区
                {
                    path: '/whArea',
                    name: 'whArea',
                    meta: {
                        label: '仓库库区'
                    },
                    component: resolve => require(['views/supplyChain/whArea/whArea'], resolve)
                },
                // 仓库库位
                {
                    path: '/whLocation',
                    name: 'whLocation',
                    meta: {
                        label: '仓库库位'
                    },
                    component: resolve => require(['views/supplyChain/whLocation/whLocation'], resolve)
                },
                //库存
                {
                    path: '/queryware',
                    name: 'queryware',
                    meta: {
                        label: '库存查询'
                    },
                    component: resolve => require(['views/supplyChain/queryware/queryware'], resolve)
                },
                //库存
                {
                    path: '/storeInfo',
                    name: 'storeInfo',
                    redirect: 'storeInfo/sku',
                    meta: {
                        label: '库存管理'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'sku',
                            name: 'skuStoreInfo',
                            meta: {
                                label: '精品库存查询'
                            },
                            component: resolve => require(['views/supplyChain/skuStoreInfo'], resolve)
                        },
                        {
                            path: 'car',
                            name: 'carStoreInfo',
                            meta: {
                                label: '整车库存查询'
                            },
                            component: resolve => require(['views/supplyChain/carStoreInfo'], resolve)
                        },
                    ]
                },
                // 供应链 - 供应商
                {
                    path: '/supplier',
                    name: 'supplier',
                    redirect: 'supplier/query',
                    meta: {
                        label: '供应商信息'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'querySupplierInfo',
                        meta: {
                            label: '查询供应商'
                        },
                        component: resolve => require(['views/supplyChain/supplier'], resolve)
                    }, {
                        path: 'insert',
                        name: 'insertSupplierInfo',
                        meta: {
                            label: '新增供应商'
                        },
                        component: resolve => require(['views/supplyChain/supplier/editSupplier'], resolve)
                    }, {
                        path: 'update/:supplierCode',
                        name: 'updateSupplierInfo',
                        meta: {
                            label: '编辑供应商'
                        },
                        component: resolve => require(['views/supplyChain/supplier/editSupplier'], resolve)
                    }, {
                        path: 'querySupplierInvoiceInfo/:supplierCode',
                        name: 'querySupplierInvoiceInfo',
                        meta: {
                            label: '查询供应商发票'
                        },
                        component: resolve => require(['views/supplyChain/supplierInvoice'], resolve)
                    }, {
                        path: 'addSupplierInvoiceInfo/:supplierCode',
                        name: 'addSupplierInvoiceInfo',
                        meta: {
                            label: '新增供应商发票'
                        },
                        component: resolve => require(['views/supplyChain/supplierInvoice/editSupplierInvoice'], resolve)
                    }]
                },
                // 供应链 - 供应商发票
                {
                    path: '/supplierInvoice',
                    name: 'supplierInvoice',
                    redirect: 'supplierInvoice/query',
                    meta: {
                        label: '供应商发票信息'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query/:supplierCode',
                        name: 'querySupplierInvoiceInfo',
                        meta: {
                            label: '查询供应商发票'
                        },
                        component: resolve => require(['views/supplyChain/supplierInvoice'], resolve)
                    }, {
                        path: 'add/:supplierCode',
                        name: 'addSupplierInvoiceInfo',
                        meta: {
                            label: '新增供应商发票'
                        },
                        component: resolve => require(['views/supplyChain/supplierInvoice/editSupplierInvoice'], resolve)
                    }]
                },
                // 供应链 - 采购订单
                {
                    path: '/purchaseOrder',
                    name: 'purchaseOrder',
                    redirect: '/purchaseOrder/query',
                    meta: {
                        label: '采购订单'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'queryPurchaseOrder',
                        meta: {
                            label: '查询采购订单'
                        },
                        component: resolve => require(['views/supplyChain/purchaseOrder/index'], resolve)
                    }, {
                        path: 'add',
                        name: 'addPurchaseOrder',
                        meta: {
                            label: '新增采购订单'
                        },
                        component: resolve => require(['views/supplyChain/purchaseOrder/editPurchaseOrder.vue'], resolve)
                    }, {
                        path: 'edit/:orderNo',
                        name: 'editPurchaseOrder',
                        meta: {
                            label: '编辑采购订单'
                        },
                        component: resolve => require(['views/supplyChain/purchaseOrder/editPurchaseOrder.vue'], resolve)
                    }]
                },
                // 供应链 - 非整车采购入库
                {
                    path: '/inStock',
                    name: 'inStock',
                    redirect: 'inStock/query',
                    meta: {
                        label: '精品采购入库'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'queryPurchaseOrders',
                        meta: {
                            label: '查询精品采购订单'
                        },
                        component: resolve => require(['views/supplyChain/inStock'], resolve)
                    }, {
                        path: 'edit/:orderNo',
                        name: 'editInStock',
                        meta: {
                            label: '采购入库'
                        },
                        component: resolve => require(['views/supplyChain/inStock/editInStock'], resolve)
                    }]
                },
                // 采购订单管理
                {
                    path: '/procurement',
                    name: 'procurement',
                    redirect: 'procurement/orderForm',
                    meta: {
                        label: '整车采购'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'orderForm',
                        name: 'orderForm',
                        meta: {
                            label: '整车采购订单'
                        },
                        component: resolve => require(['views/procurement/wholeCar/orderForm'], resolve)
                    }, {
                        path: 'intoTicket',
                        name: 'intoTicket',
                        meta: {
                            label: '整车采购订单页'
                        },
                        component: resolve => require(['views/procurement/wholeCar/intoTicket'], resolve)
                    }, {
                        path: 'editTicket/:orderNo',
                        name: 'eidt',
                        meta: {
                            label: '采购单编辑'
                        },
                        component: resolve => require(['views/procurement/wholeCar/intoTicket/edit'], resolve)
                    }]
                },
                // 科达采购订单管理
                {
                    path: '/kedaprocurement',
                    name: 'kedaprocurement',
                    redirect: 'kedaprocurement/orderForm',
                    meta: {
                        label: '整车采购'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'orderForm',
                        name: 'orderForm',
                        meta: {
                            label: '整车采购订单'
                        },
                        component: resolve => require(['views/customize/keda/procurement/wholeCar/orderForm'], resolve)
                    }, {
                        path: 'intoTicket',
                        name: 'intoTicket',
                        meta: {
                            label: '整车采购订单页'
                        },
                        component: resolve => require(['views/customize/keda/procurement/wholeCar/intoTicket'], resolve)
                    }, {
                        path: 'editTicket/:orderNo',
                        name: 'eidt',
                        meta: {
                            label: '采购单编辑'
                        },
                        component: resolve => require(['views/customize/keda/procurement/wholeCar/intoTicket/edit'], resolve)
                    }, {
                        path: 'pay',
                        name: 'pay',
                        meta: {
                            label: '整车付款'
                        },
                        component: resolve => require(['views/customize/keda/procurement/wholeCar/pay'], resolve)
                    }, {
                        path: 'confirm-pay',
                        name: 'confirm-pay',
                        meta: {
                            label: '确认付款'
                        },
                        component: resolve => require(['views/customize/keda/procurement/wholeCar/pay/confirm-pay'], resolve)
                    }]
                },
                // 整车采购入库
                {
                    path: '/storage',
                    name: 'storage',
                    redirect: 'storage/query',
                    meta: {
                        label: '整车采购入库'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'storageQuery',
                        meta: {
                            label: '整车入库'
                        },
                        component: resolve => require(['views/procurement/wholeCar/storage'], resolve)
                    }, {
                        path: 'confirm-storage',
                        name: 'confirm-storage',
                        meta: {
                            label: '确认入库'
                        },
                        component: resolve => require(['views/procurement/wholeCar/storage/confirm-storage'], resolve)
                    }]
                },
                // 整车采购付款
                {
                    path: '/pay',
                    name: 'pay',
                    redirect: 'pay/query',
                    meta: {
                        label: '整车采购付款'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'payQuery',
                        meta: {
                            label: '整车付款'
                        },
                        component: resolve => require(['views/procurement/wholeCar/pay'], resolve)
                    }, {
                        path: 'confirm-pay',
                        name: 'confirm-pay',
                        meta: {
                            label: '确认付款'
                        },
                        component: resolve => require(['views/procurement/wholeCar/pay/confirm-pay'], resolve)
                    }]
                },
                // 整车采购开票
                {
                    path: '/ticket',
                    name: 'ticket',
                    redirect: 'ticket/query',
                    meta: {
                        label: '整车采购开票'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'ticketQuery',
                        meta: {
                            label: '整车开票'
                        },
                        component: resolve => require(['views/procurement/wholeCar/ticket'], resolve)
                    }, {
                        path: 'confirm-ticket',
                        name: 'confirm-ticket',
                        meta: {
                            label: '确认开票'
                        },
                        component: resolve => require(['views/procurement/wholeCar/ticket/confirm-ticket'], resolve)
                    }]
                },
                // DCC线索管理
                {
                    path: '/dccthread',
                    name: 'dccthread',
                    redirect: `/dccthread/queryclientmain`,
                    meta: {
                        label: 'DCC线索信息'
                    },
                    component: {
                        render(a) {
                            return a('router-view')
                        },
                    },
                    children: [{
                        path: 'addclientmain/:code?',
                        name: 'addclientmain',
                        meta: {
                            label: '新增客户',
                            text: '编辑客户'
                        },
                        component: resolve => require(['views/dccthread/insertModal.vue'], resolve)
                    }, {
                        path: 'queryclientmain',
                        name: 'queryclientmain',
                        meta: {
                            label: '查询线索信息'
                        },
                        component: resolve => require(['views/dccthread/index.vue'], resolve)
                    }]
                },
                // 销售行政审批流
                {
                    path: '/salesAdmin',
                    name: 'salesAdmin',
                    redirect: 'salesAdmin/query',
                    meta: {
                        label: '审批流设置'
                    },
                    component: {
                        render(a) {
                            return a('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'query',
                        meta: {
                            label: '审批流查询'
                        },
                        component: resolve => require(['views/salesAdmin'], resolve)
                    }, {
                        path: 'edit/:index',
                        name: 'edit',
                        meta: {
                            label: '编辑'
                        },
                        component: resolve => require(['views/salesAdmin/add'], resolve)
                    }, {
                        path: 'add',
                        name: 'add',
                        meta: {
                            label: '新建'
                        },
                        component: resolve => require(['views/salesAdmin/add'], resolve)
                    }]
                },
                // 销售目标设置
                {
                    path: '/salesTargetPlan',
                    name: 'salesTargetPlan',
                    redirect: 'salesTargetPlan/query',
                    meta: {
                        label: '销售目标管理'
                    },
                    component: {
                        render(a) {
                            return a('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'querysalesTargetPlans',
                        meta: {
                            label: '整车销售目标'
                        },
                        component: resolve => require(['views/sales/salesTargetPlan'], resolve)
                    }]
                },
                // 个性化车辆销售设置
                {
                    path: '/personalizedSalesSetting',
                    name: 'personalizedSalesSetting',
                    redirect: 'personalizedSalesSetting/query',
                    meta: {
                        label: '销售目标管理'
                    },
                    component: {
                        render(a) {
                            return a('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'queryPersonalizedSalesSetting',
                        meta: {
                            label: '销售目标(单车)'
                        },
                        component: resolve => require(['views/sales/personalizedSalesSetting'], resolve)
                    }]
                },
                // 商务激励政策管理
                {
                    path: '/businessaffairs',
                    name: 'businessaffairs',
                    meta: {
                        label: '商务激励政策管理'
                    },
                    component: resolve => require(['views/businessaffairs/index.vue'], resolve)
                },
                //一丰个性化导入需求
                {
                    path: 'individuation',
                    name: 'individuation',
                    meta: {
                        label: '一汽丰田采购设置'
                    },
                    component: resolve => require(['views/sales/individuation'],resolve)
                },
                //财务管理-收款
                {
                    path: '/incollectmoney',
                    name: 'incollectmoney',
                    redirect: 'incollectmoney/query',
                    meta: {
                        label: '收款信息'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'query',          
                        meta: {
                            label: '查询'
                        },
                        component: resolve => require(['views/financing/account/collectmoney/index.vue'], resolve)
                    }, {
                        path: 'detail/:id',
                        name: 'detail',
                        meta: {
                            label: '收款明细'
                        },
                        component: resolve => require(['views/financing/account/collectmoney/detail.vue'], resolve)
                    }]
                }, {
                    path: '/outcollectmoney',
                    name: 'outcollectmoney',
                    redirect: 'outcollectmoney/query',
                    meta: {
                        label: '退款信息'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'query',
                        meta: {
                            label: '查询'
                        },
                        component: resolve => require(['views/financing/account/collectmoney/outcome.vue'], resolve)
                    }, {
                        path: 'detail/:id',
                        name: 'detail',
                        meta: {
                            label: '退款明细'
                        },
                        component: resolve => require(['views/financing/account/collectmoney/detail2.vue'], resolve)
                    }]
                },
                //财务管理-开票
                {
                    path: '/billing',
                    name: 'billing',
                    redirect: 'billing/query',
                    meta: {
                        label: '开票'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'query',
                        name: 'query',
                        meta: {
                            label: '查询'
                        },
                        component: resolve => require(['views/financing/invoice/billing'], resolve)
                    }, {
                        path: 'detail/:id',
                        name: 'detail',
                        meta: {
                            label: '开票操作'
                        },
                        component: resolve => require(['views/financing/invoice/billing/detail'], resolve)
                    }]
                },
                //GP归属设置
                {
                    path: 'gpbelonging',
                    name: 'GP',
                    meta: {
                        label: 'GP归属设置'
                    },
                    redirect: '/gpbelonging/gp',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'gp',
                            name: 'gp',
                            meta: {
                                label: '查询'
                            },
                            component: resolve => require(['views/gpbelonging'], resolve)
                        }, {
                            path: 'add',
                            name: 'add',
                            meta: {
                                label: '新增'
                            },
                            component: resolve => require(['views/gpbelonging/edit'], resolve)
                        }, {
                            path: 'edit/:detailCode',
                            name: 'edit',
                            meta: {
                                label: '编辑'
                            },
                            component: resolve => require(['views/gpbelonging/edit'], resolve)
                        }
                    ]
                },
                // SNP归属设置
                {
                    path: 'snpbelonging/snp',
                    name: 'SNP',
                    meta: {
                        label: 'SNP归属设置'
                    },
                    component: resolve => require(['views/gpbelonging/snp.vue'], resolve)
                },
                // 订单 ( 销售订单查看 )
                {
                    path: '/order',
                    name: 'order',
                    meta: {
                        label: '订单管理'
                    },
                    redirect: '/order',
                    component: {
                        render(a) {
                            return a('router-view')
                        }
                    },
                    children: [{
                        path: '/order',
                        name: 'orderQuery',
                        meta: {
                            label: '订单查询'
                        },
                        component: resolve => require(['views/order/order'], resolve)
                    }, {
                        path: '/order/detail/:id',
                        name: '订单明细',
                        meta: {
                            label: '订单明细'
                        },
                        component: resolve => require(['views/order/detail/detail'], resolve)
                    }]
                },
                // 销售行政报价
                {
                    path: '/salesQuote',
                    name: 'salesQuote',
                    meta: {
                        label: '销售行政'
                    },
                    redirect: '/salesQuote/order',
                    component: {
                        render(a) {
                            return a('router-view')
                        }
                    },
                    children: [{
                        path: 'order',
                        name: 'order',
                        meta: {
                            label: '订单管理'
                        },
                        component: resolve => require(['views/sales/order'], resolve)
                    },
                    {
                        path: 'edit/:id',
                        name: 'editOrder',
                        meta: {
                            label: '订单明细'
                        },
                        component: resolve => require(['views/sales/order/edit'], resolve)
                    },
                    ]
                },
                // 数据报表
                {
                    path: '/dataReport',
                    name: 'dataReport',
                    redirect: 'dataReport/exHallPassengerLog',
                    meta: {
                        label: '数据报表'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'virtualMarketReportForm',
                            name: 'virtualMarketReportForm',
                            meta: {
                                label: '虚拟销售管理报表'
                            },
                            component: resolve => require(['views/dataReports/virtualMarketReportForm'], resolve)
                        },
                        {
                            path: 'exHallPassengerLog',
                            name: 'exHallPassengerLog',
                            meta: {
                                label: '展厅流量日志'
                            },
                            component: resolve => require(['views/dataReports/exHallPassengerLog'], resolve)
                        },
                        {
                            path: 'exHallPassengerToChannel',
                            name: 'exHallPassengerToChannel',
                            meta: {
                                label: '展厅历史客流导入'
                            },
                            component: resolve => require(['views/dataReports/exHallPassengerToChannel'], resolve)
                        },
                        {
                            path: 'crmFollowUp',
                            name: 'crmFollowUp',
                            meta: {
                                label: 'CRM跟进情况表'
                            },
                            component: resolve => require(['views/dataReports/crmFollowUp'], resolve)
                        },
                        {
                            path: 'dccThreadReport',
                            name: 'dccThreadReport',
                            meta: {
                                label: 'DCC分渠道线索跟进表'
                            },
                            component: resolve => require(['views/dataReports/dccThreadFollowUpConversion'], resolve)
                        },
                        {
                            path: 'scThreadFollowUp',
                            name: 'scThreadFollowUp',
                            meta: {
                                label: '销售顾问线索转化表'
                            },
                            component: resolve => require(['views/dataReports/scThreadFollowUp'], resolve)
                        },
                        {
                            path: 'salesManageOrder',
                            name: 'salesManageOrder',
                            meta: {
                                label: '销售管理报表'
                            },
                            component: resolve => require(['views/dataReports/salesManage'], resolve)
                        },
                        {
                            path: 'financeReport',
                            name: 'financeReport',
                            meta: {
                                label: '财务报表'
                            },
                            component: resolve => require(['views/statement/list'], resolve)
                        },
                        {
                            path: 'phonecalllist',
                            name: 'phonecalllist',
                            meta: {
                                label: '线索电话跟进清单'
                            },
                            component: resolve => require(['views/dataReports/phonecalllist'], resolve)
                        },
                        {
                            path: 'threadDailyFollowUp',
                            name: 'threadDailyFollowUp',
                            meta: {
                                label: '线索日常跟进情况表'
                            },
                            component: resolve => require(['views/dataReports/threadDailyFollowUp'], resolve)
                        },
                        {
                            path: 'grossProfitForecastTable',
                            name: 'grossProfitForecastTable',
                            meta: {
                                label: '毛利预测报表设置'
                            },
                            component: resolve => require(['views/dataReports/grossProfitForecastTable'], resolve)
                        },
                        // 新车精品销售台账
                        {
                            path: 'qualityGoodsExport',
                            name: 'qualityGoodsExport',
                            meta: {
                                label: '新车精品销售台账'
                            },
                            component: resolve => require(['views/dataReports/qualityGoodsExport'], resolve)
                        },
                        //PCDA报表
                        {
                            path: 'groupProfitDashboard',
                            name: 'groupProfitDashboard',
                            redirect: 'groupProfitDashboard/index',
                            meta: {
                                label: '盈利销售看板'
                            },
                            component: {
                                render(c) {
                                    return c('router-view')
                                }
                            },
                            children: [
                                {
                                    path: 'index',
                                    name: 'zhujiemian',
                                    meta: {
                                        label: '盈利销售看板'
                                    },
                                    component: resolve => require(['views/dataReports/groupProfitDashboard'], resolve),
                                },
                                {
                                    path: 'funnelDashboard',
                                    name: 'funnelDashboard',
                                    meta: {
                                        label: '销售漏斗看板'
                                    },
                                    component: resolve => require(['views/dataReports/funelDashboard'], resolve)
                                },
                                {
                                    path: 'derivativesDashBoard',
                                    name: 'derivativesDashBoard',
                                    meta: {
                                        label: '衍生品看板'
                                    },
                                    component: resolve => require(['views/dataReports/derivativesDashBoard'], resolve)
                                },
                                //车型盈利库存看板
                                {
                                    path: 'carModelProfitStock',
                                    name: 'carModelProfitStock',
                                    meta: {
                                        label: '库存看板'
                                    },
                                    component: resolve => require(['views/dataReports/carModelProfitStock'], resolve)
                                },
                                //毛利看板
                                {
                                    path: 'grossProfitDashboard',
                                    name: 'grossProfitDashboard',
                                    meta: { label: '毛利看板' },
                                    component: resolve => require(['views/dataReports/grossProfitDashboard'], resolve)
                                }
                            ]
                        },
                        //人员绩效销售看板
                        {
                            path: 'persionProfitDashboard',
                            name: 'persionProfitDashboard',
                            meta: {
                                label: '人员绩效销售看板'
                            },
                            component: resolve => require(['views/dataReports/persionProfitDashboard'], resolve),
                        },
                        //经销商记账明细表
                        {
                            path: 'bookkeeping',
                            name: 'bookkeeping',
                            meta: {
                                label: '经销商记账明细表'
                            },
                            component: resolve => require(['views/dataReports/bookkeeping'], resolve),
                        }
                    ]
                },
                // 车辆管理
                {
                    path: '/vehicle',
                    name: 'vehicle',
                    redirect: 'vehicle/share',
                    meta: {
                        label: '车辆管理'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                        path: 'share',
                        name: 'share',
                        meta: {
                            label: '车辆资源分享',
                            code: 'P-vehicleShare'
                        },
                        component: resolve => require(['views/vehicleAllocation/shareVehicleResource'], resolve)
                    },
                    {
                        path: 'release',
                        name: 'release',
                        redirect: '/vehicle/release/main',
                        meta: {
                            label: '车辆资源发布',
                            code: 'P-releaseMain'
                        },
                        component: {
                            render(c) {
                                return c('router-view')
                            }
                        },
                        children: [{
                            path: 'main',
                            name: 'main',
                            meta: {
                                label: '车辆资源分享'
                            },
                            component: resolve => require(['views/vehicleAllocation/releaseVehicleResource'], resolve)
                        }, {
                            path: 'add',
                            name: 'add',
                            meta: {
                                label: '新增车辆资源发布'
                            },
                            component: resolve => require(['views/vehicleAllocation/releaseVehicleResource/edit.vue'], resolve)
                        }, {
                            path: 'edit/:carShareNo/:flag',
                            name: 'edit',
                            meta: {
                                label: '修改车辆资源发布'
                            },
                            component: resolve => require(['views/vehicleAllocation/releaseVehicleResource/edit.vue'], resolve)
                        }]
                    }, {
                        path: 'callOut',
                        name: 'callOut',
                        redirect: '/vehicle/callOut/main',
                        meta: {
                            label: '调拨出库管理',
                            code: 'P-callOut'
                        },
                        component: {
                            render(c) {
                                return c('router-view')
                            }
                        },
                        children: [{
                            path: 'main',
                            name: 'main',
                            meta: {
                                label: '调拨出库查询'
                            },
                            component: resolve => require(['views/vehicleAllocation/callOutVehicleResource'], resolve)
                        }, {
                            path: 'add',
                            name: 'add',
                            meta: {
                                label: '新增车辆调拨出库'
                            },
                            component: resolve => require(['views/vehicleAllocation/callOutVehicleResource/edit.vue'], resolve)
                        }, {
                            path: 'edit/:outStockNo/:flag',
                            name: 'edit',
                            meta: {
                                label: '修改车辆调拨出库'
                            },
                            component: resolve => require(['views/vehicleAllocation/callOutVehicleResource/edit.vue'], resolve)
                        }]
                    }, {
                        path: 'callIn',
                        name: 'callIn',
                        redirect: '/vehicle/callIn/main',
                        meta: {
                            label: '调拨入库管理',
                            code: 'P-callIn'
                        },
                        component: {
                            render(c) {
                                return c('router-view')
                            }
                        },
                        children: [{
                            path: 'main',
                            name: 'main',
                            meta: {
                                label: '调拨入库查询'
                            },
                            component: resolve => require(['views/vehicleAllocation/callInVehicleResource'], resolve)
                        }, {
                            path: 'add/:purchaseNo/:flag',
                            name: 'add',
                            meta: {
                                label: '新增车辆调拨入库'
                            },
                            component: resolve => require(['views/vehicleAllocation/callInVehicleResource/edit.vue'], resolve)
                        }, {
                            path: 'edit/:purchaseNo/:flag',
                            name: 'edit',
                            meta: {
                                label: '修改车辆调拨入库'
                            },
                            component: resolve => require(['views/vehicleAllocation/callInVehicleResource/edit.vue'], resolve)
                        }]
                    }]
                },
                // 金融工作台
                {
                    path: '/financeWb',
                    name: 'financeWorkbench',
                    redirect: 'financeWb/quote',
                    meta: {
                        label: '金融管理'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'quote',
                            name: 'quote',
                            meta: {
                                label: '金融客户报价管理'
                            },
                            component: resolve => require(['views/financeWorkbench/quote'], resolve)
                        },
                        {
                            path: 'loan',
                            name: 'loan',
                            meta: {
                                label: '客户贷款申报管理'
                            },
                            component: resolve => require(['views/financeWorkbench/loan'], resolve)
                        },
                        {
                            path: 'order/:financeWbCode/:orderNo/:id/:financialOrderNo/:flag',
                            name: 'order',
                            meta: {
                                label: '客户金融订单'
                            },
                            component: resolve => require(['views/financeWorkbench/order'], resolve)
                        },
                    ]
                },
                // 跨部门策略表
                {
                    path: '/policytable',
                    name: 'policytable',
                    redirect: 'policytable/list',
                    meta: {
                        label: '跨部门策略表'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: '/policytable/list',
                            name: 'policytablelist',
                            meta: {
                                label: '查询'
                            },
                            component: resolve => require(['views/policyTable/list/index.vue'], resolve)
                        },
                        {
                            path: '/policytable/details',
                            name: 'policytabledetails',
                            meta: {
                                label: '跨部门策略表详情'
                            },
                            component: resolve => require(['views/policyTable/details/index.vue'], resolve)
                        },
                    ]
                },
                // 跨部门月报
                {
                    path: 'cross-cuetable',
                    name: 'cue-table',
                    redirect: { name: 'cross-cuetable-query' },
                    meta: { label: '跨部门策略月报' },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'query',
                            name: 'cross-cuetable-query',
                            meta: { label: '查询' },
                            component: resolve => require(['views/cross-cuetable/query'], resolve)
                        }, {
                            path: 'add',
                            name: 'cross-cuetable-add',
                            meta: { label: '新增' },
                            component: resolve => require(['views/cross-cuetable/detail'], resolve)
                        }, {
                            path: 'edit',
                            name: 'cross-cuetable-edit',
                            meta: { label: '编辑' },
                            component: resolve => require(['views/cross-cuetable/detail'], resolve)
                        }, {
                            path: 'check',
                            name: 'cross-cuetable-check',
                            meta: { label: '查看' },
                            component: resolve => require(['views/cross-cuetable/detail'], resolve)
                        },
                    ]
                },
                //LPE展厅客流日志
                {
                    path: 'lpe',
                    name: 'lpe',
                    redirect: 'lpe/index',
                    meta: {
                        label: 'LPE展厅客流日志'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: '/lpe/index',
                            name: 'lpelist',
                            meta: {
                                label: '列表'
                            },
                            component: resolve => require(['views/lpe/list'], resolve)
                        }
                    ]
                },
                //crm调研情况
                {
                    path: 'crm',
                    name: 'crm',
                    redirect: 'crm/index',
                    meta: {
                        label: 'CRM调研情况'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: '/crm/index',
                            name: 'crmlist',
                            meta: {
                                label: '查询'
                            },
                            component: resolve => require(['views/crm'], resolve)
                        }
                    ]
                },
                //服务费设置
                {
                    path: 'serviceFree',
                    name: 'service-free',
                    redirect: 'serviceFree/index',
                    meta: {
                        label: '服务费设置'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: '/serviceFree/index',
                            name: 'serviceFree-index',
                            meta: {
                                label: '查询'
                            },
                            component: resolve => require(['views/serviceseting'], resolve)
                        }
                    ]
                },
                // 审批流批量导入设置
                {
                    path: '/approvalFlowBatchImportSetting',
                    name: 'approvalFlowBatchImportSetting',
                    meta: {
                        label: '审批流批量导入设置'
                    },
                    component: resolve => require(['views/dataReports/approvalFlowBatchImportSetting'], resolve)
                },
                //预装车
                {
                    path: 'preloadedCar',
                    name: 'preloadedCar',
                    redirect: '/preloadedCar',
                    meta: {
                        label: '车辆预装'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: '/preloadedCar',
                            name: 'preloadedCar',
                            meta: {
                                label: '查询'
                            },
                            component: resolve => require(['views/preloaded-car/preloaded-car'], resolve)
                        },
                        {
                            path: '/preloadedCar/edit',
                            name: 'edit',
                            meta: {
                                label: '编辑'
                            },
                            component: resolve => require(['views/preloaded-car/preloaded-edit'], resolve)
                        },
                        {
                            path: '/preloadedCar/detail',
                            name: 'detail',
                            meta: {
                                label: '编辑'
                            },
                            component: resolve => require(['views/preloaded-car/preloaded-edit'], resolve)
                        }
                    ]
                },
                //毛利计算
                {
                    path: '/grossMarginCalculation',
                    name: 'grossMarginCalculation',
                    meta: {
                        label: '销售毛利预测模板'
                    },
                    component: resolve => require(['views/grossMarginCalculation/index'], resolve)
                },
                //收入调整-si调整
                {
                    path: '/income/:type',
                    name: 'income',
                    meta: {
                        label: 'SI调整'
                    },
                    component: resolve => require(['views/incomeadjustment'], resolve)
                },
                // 收入调整-手续费调整
                {
                    path: '/adjustment/:type',
                    name: 'adjustment',
                    meta: {
                        label: '手续费调整'
                    },
                    component: resolve => require(['views/incomeadjustment'], resolve)
                },
                //车辆导出
                {
                    path: '/carDataExport',
                    name: 'export',
                    meta: {
                        label: '车款导出'
                    },
                    component: resolve => require(['views/dataReports/export'], resolve)
                }
            ]
        },
        // 404 页面
        {
            path: '/*',
            name: 'notfile',
            meta: {
                label: '报错页面'
            },
            component: resolve => require(['views/error/index.vue'], resolve)
        }]
})
router.afterEach((to, from) => {
    window.scrollTo(0, 0);
})
// 配置基础模块连接 当连接为 html的时候  页面进行跳转
router.beforeEach((to, from, next) => {
    if (to.fullPath.match(/^(.*\.html)$/)) {
        window.location.href = window.location.origin + to.fullPath;
        return;
    }
    next();
})
export default router
