<template>
    <div class="animated fadeIn">
        <div class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="采购单号 *" :label-cols="4" class="text-right">
                            <b-form-input :value="queryParams.orderNo" disabled/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="供应商 *" :label-cols="4" class="text-right">
                            <div class="text-left">
                                <search ref="search" :hasCheck="required" :dataList="datalist" option="supplierName" @dataChange="querySelect" @itemValue="itemValue" @clickShowBack="firstLoad" @comScroll="comScroll" :disabled="isforbidden">
                                </search>
                            </div>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset label="选择经销商店 *" :label-cols="4" horizontal class="text-right">
                            <areaqueryshop ref="areaqueryshop" :reset="storeShow" :readonly="isforbidden || availableType=='0'" :error="judgeStateOne" @select-change="selectedfun" @available-type="getavailable"></areaqueryshop>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="收货仓库 *" :label-cols="4" class="text-right">
                            <b-form-select v-model="queryParams.whCode" :state="judgeStateTwo" :options="entreList" :disabled="isforbidden"></b-form-select>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="采购类型 *" :label-cols="4" class="text-right">
                            <b-form-select v-model="queryParams.purchaseTypeCode" :state="judgeState" :options="typeList" class="" :disabled="isforbidden"></b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="额度类型 *" :label-cols="4" class="text-right">
                            <b-form-select v-model="queryParams.accountPeriodCode" :state="judgeAccount" :options="limitTypes" :disabled="quotaType" />
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="采购总金额" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.totalMoney" type="number" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="运费" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.totalFreightFee" type="number" readonly/>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-right">
                        <b-button v-show="(onceShow && !submitShow) || (quotaBtn && queryParams.orderStatus == 1)" size="sm" variant="primary" @click="saveAgain">保存</b-button>
                        <b-button v-show="submitShow && !onceShow || queryParams.orderStatus == 0 || (quota && queryParams.orderStatus == 1)" size="sm" variant="primary" @click="submitBtn" :disabled="noclick">提交</b-button>
                        <b-button v-show="changeShow || (quota && queryParams.orderStatus == 1)" size="sm" variant="primary" @click="change" :disabled="noclick">编辑</b-button>
                        <b-button v-show="removeShow && !onceShow" size="sm" variant="danger" @click="remove">废单</b-button>
                    </div>
                </div>
            </b-card>
        </div>
        <div class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-12 text-left">
                        <upload v-if="isShowImport" :buttonName="buttonName" :addParams="addParams" :analysisExcel="analysisExcel" :url="url" :showBack="showBack"></upload>
                        <b-button v-if="isShowDelete && tableList.length > 0" size="sm" variant="danger" @click="removeItem">作废</b-button>
                    </div>
                </div>
                <div class="table-scrollable">
                    <b-table striped hover bordered show-empty :items="tableList" :fields="fields">
                        <template slot="radio" slot-scope="data">
                            <div v-if="data.item.rowStatus === 0" @click="check(data.index)">
                                <input type="radio" name="radio" />
                            </div>
                        </template>
                        <template slot="orderNo" slot-scope="data">
                            {{ data.item.orderNo }}
                        </template>
                        <template slot="productNo" slot-scope="data">
                            {{ data.item.carProductionCode }}
                        </template>
                        <template slot="carjiaNo" slot-scope="data">
                            {{ data.item.carVinCode }}
                        </template>
                        <template slot="skuName" slot-scope="data">
                            {{ data.item.skuName }}
                        </template>
                        <template slot="transportFee" slot-scope="data">
                            {{ data.item.freightFee }}
                        </template>
                        <template slot="hasBelongCost" slot-scope="data">
                            {{ data.item.calFreigthFlag === 0 ? '否' : '是' }}
                        </template>
                        <template slot="priceOfpurchase" slot-scope="data">
                            {{ data.item.purchaseFee}}
                        </template>
                        <template slot="isDeleted" slot-scope="data">
                            {{ data.item.rowStatus === -1 ? '作废' : '确认'}}
                        </template>
                        <template slot="carState" slot-scope="data">
                            {{ data.item.logisticsStatuName }}
                        </template>
                        <template slot="empty">
                            暂无数据...
                        </template>
                    </b-table>
                </div>
            </b-card>
        </div>
    </div>
</template>
<script>
    import Search from 'components/iris-search/search.vue'
    import config from 'common/config'
    import api from 'common/api'
    import areaqueryshop from 'components/iris-areaqueryshop/'
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import upload from 'components/iris-upload'
    export default {
        components: {
            Search,
            areaqueryshop,
            upload
        },
        data() {
            return {
                limitTypes: [],
                availableType: '',
                tableShow: false,
                removeShow: true,
                submitShow: false,
                noclick: false,
                saveShow: true,
                changeShow: true,
                resetBtn: true,
                onceShow: false,
                storeShow: false,
                uploadShow: true,
                isShowDelete: true,
                queryParams: {
                    orderNo: '',
                    orderType: 0,
                    supplierCode: '',
                    totalFreightFee: '',
                    totalMoney: '',
                    auditOperatorName: '',
                    orderStatus: 0,
                    whCode: '',
                    purchaseTypeCode: '',
                    accountPeriodCode: '',  // 额度code
                    accountPeriodName: '',  // 额度名称
                    storeCode: '',
                    id: ''
                },
                fields: {
                    radio: {
                        label: '  '
                    },
                    orderNo: {
                        label: '采购订单号'
                    },
                    skuCode: {
                        label: 'SKU编码'
                    },
                    skuName: {
                        label: 'SKU名称'
                    },
                    // carFactoryName: {
                    //     label: '厂家'
                    // },
                    productNo: {
                        label: '生产号'
                    },
                    carjiaNo: {
                        label: '车架号'
                    },
                    // carSeriesName: {
                    //     label: '车系'
                    // },
                    // carModelName: {
                    //     label: '车型'
                    // },
                    // carOpvName: {
                    //     label: '排量'
                    // },
                    // carIotypeName: {
                    //     label: '进气'
                    // },
                    transportFee: {
                        label: '运费'
                    },
                    hasBelongCost: {
                        label: '运费是否计入采购成本'
                    },
                    priceOfpurchase: {
                        label: '采购价格(含税)'
                    },
                    // msrpPrice: {
                    //     label: '标配MSRP(含税)'
                    // },
                    // plusPrice: {
                    //     label: '加配价格(含税)'
                    // },
                    purchaseRate: {
                        label: '采购税率'
                    },
                    isDeleted: {
                        label: '明细状态'
                    },
                    carState: {
                        label: '物流状态'
                    }
                },
                isforbidden: false,
                quotaType: false,
                typeList: [],
                entreList: [],
                typeName: 'refDetailName',
                entreName: 'warehouseName',
                buttonName: '导入明细',
                addParams: {},
                url: '/v1/fileSys/file/parsePurchaseOrderExcelInfo',
                showBack: {},
                tableList: [],
                removeId: '',
                index: '',
                judgeState: null,
                judgeStateOne: null,
                // 下拉列表相关参数
                datalist: [],
                selectParams: {
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                isLastPage: false,
                required: false,
                orderNo: '',
                isShowImport: true,
                judgeAccount: null,
                judgeStateTwo: null,
                quota: false,       // 额度待定
                quotaBtn: false     // 关于额度待定显示保存的情况
            }
        },
        methods: {
            getavailable: function(val) {
                this.availableType = val
            },
            // 保存所选项
            check(index) {
                this.index = index
            },
            // 重置
            reset() {
                const _this = this
                _this.$refs.search.setValue('')
                _this.queryParams.supplierCode = ''
                _this.queryParams.totalMoney = ''
                _this.queryParams.purchaseTypeCode = ''
                _this.queryParams.totalFreightFee = ''
                _this.queryParams.storeCode = ''
                _this.queryParams.whCode = ''
                _this.queryParams.accountPeriodCode = ''
                _this.isforbidden = false
                _this.quotaType = false;
                _this.storeShow = true
                _this.entreList = []
            },
            // 修改
            saveAgain() {
                const _this = this
                this.noclick = false;
                this.limitTypes.forEach(item => {
                if(item.value == _this.queryParams.accountPeriodCode) {
                    _this.queryParams.accountPeriodName = item.text;
                  }
                })
                // 校验必填项
                if (_this.queryParams.whCode === '' || _this.queryParams.purchaseTypeCode === '' || _this.queryParams.storeCode === '' || _this.queryParams.supplierCode === '' || _this.queryParams.accountPeriodCode === '') {
                    if (_this.queryParams.purchaseTypeCode != '') {
                        _this.judgeState = null
                    } else {
                        _this.judgeState = false
                    }
                    if (_this.queryParams.storeCode != '') {
                        _this.judgeStateOne = false
                    } else {
                        _this.judgeStateOne = true
                    }
                    if (_this.queryParams.supplierCode != '') {
                        _this.required = false
                    } else {
                        _this.required = true
                    }
                    if (_this.queryParams.accountPeriodCode != '') {
                        _this.judgeAccount = null
                    } else {
                        _this.judgeAccount = false
                    }
                    if (_this.queryParams.whCode != '') {
                        _this.judgeStateTwo = null
                    } else {
                        _this.judgeStateTwo = false
                    }
                } else {
                    _this.judgeState = null
                    _this.judgeStateOne = false
                    _this.judgeAccount = null
                    _this.judgeStateTwo = null
                    _this.required = false
                    const option = {
                        'orderNo': _this.queryParams.orderNo,
                        'orderType': _this.queryParams.orderType,
                        'supplierCode': _this.queryParams.supplierCode,
                        'whCode': _this.queryParams.whCode ? _this.queryParams.whCode : '你好',
                        'purchaseTypeCode': _this.queryParams.purchaseTypeCode,
                        'accountPeriodCode': _this.queryParams.accountPeriodCode,
                        'accountPeriodName': _this.queryParams.accountPeriodName,
                        'id': _this.queryParams.id
                    }
                    api.supplyChain.keda.purchaseOrder.updatePurchaseOrderInfo(option, function(res) {
                        if (res.data.code === 'success') {
                            _this.isforbidden = true
                            _this.quotaType = true;
                            _this.changeShow = true
                            _this.onceShow = false
                            _this.submitShow = true
                            Message({
                                type: 'info',
                                message: config.messInfo.success
                            })
                        }
                    })
                }
            },
            // 提交
            submitBtn() {
            	// 如果额度类型是额度待定，点击提交则给提交提示
            	if(this.queryParams.accountPeriodCode != 'REFD2000568') {
	        		this.$confirm('保存采购后将无法再编辑，请再次检查，是否确认保存？', '提示', {
		                confirmButtonText: '确定',
		                cancelButtonText: '取消',
		                type: 'warning'
		              }).then(() => {
		                this.submit();     // 调用提交接口
		              }).catch(() => {
		              });
            	} else {
            		this.submit();
            	}
            },
            // 获取账务账期的数据字典
            getLimitType() {
                const _this = this
                let option = {
                    refCode: config.supplyChain.purchaseOrder.refCode,
                    pageNums: config.pageNums
                }
                api.supplyChain.procurement.queryDictionaryDetails(option, res => {
                    if (res.data.code === 'success') {
                        let tempArr = res.data.obj.list
                        _this.limitTypes = []
                        for (var i = 0; i < tempArr.length; i++) {
                            let obj = {}
                            obj.text = tempArr[i].refDetailName
                            if(obj.value == 'REFD2000568') {
                              _this.quota = true;
                            }
                            obj.value = tempArr[i].refDetailCode
                            _this.limitTypes.push(obj)
                        }
                    }
                })
            },
            // 根据采购单号获取订单信息（主表）
            getDetailData() {
                const _this = this
                let tempNo = _this.$route.params.orderNo
                _this.queryParams.orderNo = tempNo
                let option = {
                    orderNo: tempNo
                }
                // 设置导入的参数
                _this.addParams.relationCode = _this.queryParams.orderNo
                _this.addParams.singleFlag = '1'
                _this.addParams.businessType = ''
                // 设置解析参数
                _this.showBack.orderNo = _this.queryParams.orderNo
                _this.showBack.createOrgCode = '000001'
                api.supplyChain.purchaseOrder.getPurchaseOrderInfoByCode(option, function(res) {
                    if (res.data.code === 'success') {
                        let queryObj = res.data.obj
                        _this.queryParams.orderNo = queryObj.orderNo
                        _this.queryParams.id = queryObj.id
                        _this.queryParams.purchaseTypeCode = queryObj.purchaseTypeCode
                        _this.queryParams.whCode = queryObj.whCode
                        _this.queryParams.supplierCode = queryObj.supplierCode
                        _this.queryParams.supplierCode = queryObj.supplierCode
                        _this.queryParams.totalMoney = queryObj.totalMoney
                        _this.queryParams.totalFreightFee = queryObj.totalFreightFee
                        _this.queryParams.storeCode = queryObj.storeCode
                        _this.queryParams.accountPeriodCode = queryObj.accountPeriodCode
                        _this.queryParams.accountPeriodName = queryObj.accountPeriodName
                        _this.queryParams.orderStatus = queryObj.orderStatus
                        // 通过判断采购单的状态   控制按钮显示和隐藏
                        // 采购订单为草稿
                        if (queryObj.orderStatus === 0) {
                          console.log(11)
                            _this.changeShow = true
                            _this.isforbidden = true
                            _this.quotaType = true
                            _this.submitShow = true
                        } else if (queryObj.orderStatus === -1) {   // 采购订单为作废
                        console.log(22)
                            _this.changeShow = false
                            _this.onceShow = false
                            _this.submitShow = false
                            _this.removeShow = false
                            _this.isforbidden = true
                            _this.quotaType = true
                            _this.isShowImport = false
                            _this.isShowDelete = false
                        } else {                                  // 采购订单为正式不可修改
                        console.log(33)
                            _this.changeShow = false
                            _this.onceShow = false
                            _this.submitShow = false
                            _this.removeShow = true
                            _this.isforbidden = true
                            _this.quotaType = true
                            _this.isShowImport = false
                            _this.quota = false;
                            _this.quotaBtn = false;
                        }
                        // 采购订单为草稿的时候并且额度类型不为额度待定的时候显示提交和编辑按钮
                        if(_this.queryParams.accountPeriodCode != 'REFD2000568' && queryObj.orderStatus !== 0) {
                            _this.noclick = true;
                        } else {
                            console.log(2)
                            _this.changeShow = true;
                            _this.submitShow = true;
                            _this.noclick = false
                        }
                        _this.$refs.search.setValue(queryObj.supplierName)
                        _this.$refs.areaqueryshop.setselect({
                            value: queryObj.storeCode,
                            text: queryObj.storeName
                        })
                        let options = {
                            storeCodeSet: [queryObj.storeCode]
                        }
                        options.warehouseTypeFlag = 1;
                        // 根据经销商店获取仓库
                        api.supplyChain.procurement.getEntrepot(options, function(res) {
                            if (res.data.code === 'success') {
                                const array = res.data.obj
                                _this.entreList = [];
                                for (var i = 0; i < array.length; i++) {
                                    _this.entreList.push({
                                        text: array[i].warehouseName,
                                        value: array[i].warehouseCode
                                    })
                                }
                            }
                        })
                    }
                })
                api.supplyChain.procurement.queryNewOrder(option, function(res) {
                    if (res.data.code === 'success') {
                        _this.tableList = res.data.obj
                        _this.uploadShow = false
                    }
                })
            },
            // 提交
            submit() {
                const _this = this
                this.limitTypes.forEach(item => {
                if(item.value == _this.queryParams.accountPeriodCode) {
                  _this.queryParams.accountPeriodName = item.text;
                  }
                })
                let option = {
                    'orderNo': _this.queryParams.orderNo,
                    'orderType': 0,
                    'accountPeriodCode': _this.queryParams.accountPeriodCode,      // 额度类型code
                    'accountPeriodName': _this.queryParams.accountPeriodName       // 额度类型名称
                }
                api.supplyChain.keda.purchaseOrder.submitPurchaseOrderInfo(option, function(res) {
                    if (res.data.code === 'success') {
                        _this.removeShow = true
                        _this.saveShow = false
                        _this.submitShow = false
                        _this.changeShow = false
                        _this.isforbidden = true
                        _this.quotaType = true
                        _this.isShowImport = false
                        Message({
                            type: 'info',
                            message: '提交已完成'
                        })
                    }
                })
                // 提交后如果额度类型不是额度待定，则不显示编辑和提交按钮
                if(_this.queryParams.accountPeriodCode != 'REFD2000568') {
                  this.submitShow = false;
                  this.onceShow = true;
                  this.quota = false;
                }
            },
            // 接受解析的结果
            analysisExcel(res) {
                const _this = this
                const params = {
                    "orderNo": _this.queryParams.orderNo
                }
                if (res.data.code === 'success') {
                    api.supplyChain.procurement.queryNewOrder(params, function(res) {
                        _this.submitShow = true
                        _this.changeShow = true
                        _this.tableList = res.data.obj
                        _this.uploadShow = false
                        // 合计运费和金额
                        // 由于 模板没有   暂时不写
                    })
                }
            },
            // 作废（整车订单）
            remove() {
                const _this = this
                let option = {
                    'orderNo': _this.queryParams.orderNo
                }
                const h = this.$createElement;
                MessageBox({
                    title: '提示',
                    // 具体消息提示是由定义的h方法 创建标签 添加进去的
                    message: h('p', null, [
                        h('span', null, '确定删除'),
                        h('i', {
                            style: 'fontStyle: normal'
                        }, _this.queryParams.orderNo)
                    ]),
                    // showCanceButton 值为false 取消不显示  值为true 取消显示
                    showCancelButton: true,
                    // 确定按钮的信息
                    confirmButtonText: '确定',
                    // 取消按钮的信息
                    cancelButtonText: '取消',
                    // 提示框关闭之前执行
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            api.supplyChain.procurement.deleteOrder(option, function(res) {
                                if (res.data.code === "success") {
                                    Message({
                                        type: 'info',
                                        message: config.messInfo.success
                                    });
                                    _this.tableShow = false
                                    _this.removeShow = false
                                    _this.submitShow = false
                                    _this.saveShow = true
                                    _this.changeShow = false
                                    _this.resetBtn = true
                                    _this.reset()
                                    const params1 = {
                                        'serviceCode': 'ORDER'
                                    }
                                    api.ordinalInfo.getSequence(params1, function(res) {
                                        if (res.data.code === 'success') {
                                            _this.queryParams.orderNo = res.data.obj
                                        }
                                    })
                                } else {
                                    Message({
                                        type: 'info',
                                        message: config.messInfo.fail
                                    });
                                }
                            })
                            setTimeout(() => {
                                // done方法不调用  提示框不消失
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 300);
                        } else {
                            done();
                        }
                    },
                    callback: function() {
                        // 在MessageBox参数对象中，如果不使用Promise，则需要在对象参数中添加callback，否则控制台会报 Uncaught (in promise) cancel ， 如果callback中可以不做任何事情，但必须有
                        // callback(pager, pageSize)
                    }
                })
            },
            // 删除（明细作废）
            removeItem() {
                const _this = this
                if (_this.index === '') {
                    Message({
                        type: 'warning',
                        message: '请选择作废项'
                    })
                    return
                }
                let option = {
                    'orderNo': _this.queryParams.orderNo,
                    'id': _this.tableList[_this.index]['id']
                }
                api.supplyChain.procurement.deleteItem(option, function(res) {
                    if (res.data.code === 'success') {
                        Message({
                            type: 'info',
                            message: config.messInfo.success
                        })
                        _this.index = ''
                        const params = {
                            "orderNo": _this.queryParams.orderNo
                        }
                        api.supplyChain.procurement.queryNewOrder(params, function(res) {
                            _this.tableList = res.data.obj
                        })
                    }
                })
            },
            // 修改（改变按钮样式事件）
            change() {
                const _this = this
                // 如果是额度待定的情况下,除了额度类型可以编辑其他情况放开
                if(_this.queryParams.accountPeriodCode == 'REFD2000568' && _this.queryParams.orderStatus !== 0) {
                  _this.isforbidden = true;
                  _this.quotaType = false;
                } else {
                  _this.quotaType = false
                  _this.changeShow = false;     // 隐藏编辑按钮
                  _this.quota = false;          // 隐藏编辑按钮
                  _this.onceShow = true
                  _this.submitShow = false
                  _this.quotaBtn = true;        // 点击编辑显示保存按钮
                  _this.isforbidden = false;
                  _this.noclick = true;
                }
            },
            // 区域经销商店
            selectedfun(data, data1) {
                const _this = this
                //在这里可以获取到经销商店的选择数据
                const options = {
                    storeCodeSet: []
                }
                if (data1.value) {
                    _this.queryParams.storeCode = data1.value
                    options.storeCodeSet.push(data1.value)
                }
                options.warehouseTypeFlag = 1;
                // 根据经销商店获取仓库
                if (options.storeCodeSet.length > 0) {
                    api.supplyChain.procurement.getEntrepot(options, function(res) {
                        if (res.data.code === 'success') {
                            const array = res.data.obj
                            _this.entreList = []
                            for (var i = 0; i < array.length; i++) {
                                let obj = {}
                                obj.text = array[i].warehouseName
                                obj.value = array[i].warehouseCode
                                _this.entreList.push(obj)
                            }
                        }
                    })
                }
            },
            // 下拉列表操作
            // 搜索框内值改变   触发搜索
            querySelect(data) {
                const _this = this
                _this.selectParams.pageStart = 1;
                _this.selectParams.supplierName = data;
                let params = _this.selectParams;
                _this.getSupplierName(params, function(res) {
                    _this.isLastPage = res.isLastPage
                    _this.datalist = res.list
                })
            },
            // 选中某一项
            itemValue(value) {
                const _this = this
                _this.queryParams.supplierCode = value.supplierCode
            },
            // 第一次加载数据
            firstLoad() {
                const _this = this
                if (_this.datalist.length != 0) {
                    return
                }
                let params = _this.selectParams
                _this.getSupplierName(params, function(res) {
                    _this.isLastPage = res.isLastPage
                    _this.datalist = res.list
                })
            },
            // 滚动加载
            comScroll(isEnd) {
                if (isEnd && !this.isLastPage) {
                    this.selectParams.pageStart++
                        let params = this.selectParams;
                    this.queryWhInfo(params, obj => {
                        this.isLastPage = obj.isLastPage;
                        this.datalist = this.datalist.concat(obj.list);
                    });
                }
            },
            // 清空值
            clearValue() {
                this.queryParams.supplierCode = ''
            },
            // 定义向后台请求supplierName的方法
            getSupplierName(params, callback) {
                api.supplyChain.supplier.querySupplierInfo(params, res => {
                    if (res.data.code === "success") {
                        let obj = res.data.obj;
                        callback(obj);
                    }
                })
            },
            // 获取采购类型的数据字典
            getProcumentType() {
                const _this = this
                const params2 = {
                    'refCode': config.supplyChain.purchaseOrder.purchaseType.refCode,
                    isDeleted: '0',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
                api.supplyChain.procurement.queryDictionaryDetails(params2, function(res) {
                    if (res.data.code === 'success') {
                        const array = res.data.obj.list
                        _this.typeList = []
                        for (var i = 0; i < array.length; i++) {
                            let obj = {}
                            obj.text = array[i].refDetailName
                            obj.value = array[i].refDetailCode
                            _this.typeList.push(obj)
                        }
                    }
                })
            }
        },
        created() {
            this.getDetailData()      // 根据采购单号获取订单信息（主表）
            this.getProcumentType()   // 获取采购类型的数据字典
            this.getLimitType()       // 获取账务账期的数据字典
        }
    }
</script>
<style lang="scss" scoped>
</style>

