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
                            <!-- <b-form-input/> -->
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
                            <areaqueryshop ref="areaqueryshop" :reset="storeShow" :readonly="isforbidden || availableType=='0'" @select-change="selectedfun" @available-type="getavailable"></areaqueryshop>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="收货仓库 *" :label-cols="4" class="text-right">
                            <b-form-select v-model="queryParams.whCode" :state="judgeStateOne" :options="entreList" :disabled="isforbidden"></b-form-select>
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
                        <b-form-fieldset horizontal label="采购总金额" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.totalMoney" type="number" readonly/>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="运费" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.totalFreightFee" type="number" readonly/>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-right">
                        <b-button v-if="onceShow&&!submitShow" size="sm" variant="primary" @click="saveAgain">保存</b-button>
                        <b-button v-if="submitShow&&!onceShow" size="sm" variant="primary" @click="submit">提交</b-button>
                        <b-button v-if="changeShow" size="sm" variant="primary" @click="change">编辑</b-button>
                        <b-button v-if="removeShow&&!onceShow" size="sm" variant="danger" @click="remove">废单</b-button>
                    </div>
                </div>
            </b-card>
        </div>
        <div class="col-md-12">
            <b-card>
                <!-- <b-button size="sm" variant="primary" @click="getIn">导入明细</b-button> -->
                <div class="row">
                    <div class="col-md-12 text-left">
                    	<!--<b-button v-if="isShowImport" size="sm" variant="primary" @click="add">新增</b-button>-->
                        <upload ref="upload" v-if="isShowImport" :buttonName="buttonName" :addParams="addParams" :analysisExcel="analysisExcel" :url="url" :showBack="showBack"></upload>
                        <FTupload :buttonName="FTbuttonName" :addParams="FTaddParams" :analysisExcel="FTanalysisExcel" :url="FTurl" :showBack="FTshowBack" v-show="FTshowBtn && isShowImport" ></FTupload>
                        <b-button v-if="isShowDelete" size="sm" variant="danger" @click="removeItem">作废</b-button>
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
                            {{ data.item.freightFee | toFixed(2) }}
                        </template>
                        <template slot="hasBelongCost" slot-scope="data">
                            {{ data.item.calFreigthFlag === 0 ? '否' : '是' }}
                        </template>
                        <template slot="priceOfpurchase" slot-scope="data">
                            {{ data.item.purchaseFee | toFixed(2) }}
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
    import FTupload from 'components/iris-upload'
    import upload from './uploadspecial'
    export default {
        components: {
            Search,
            areaqueryshop,
            upload,
            FTupload
        },
        data() {
            return {
                availableType: '',
                // 明细表格的显示控制
                tableShow: false,
                // 作废按钮控制
                removeShow: true,
                // 提交按钮控制
                submitShow: false,
                // 编辑按钮控制
                changeShow: true,
                // 编辑对应的保存按钮控制
                onceShow: false,
                // 原组件参数  怀疑已失效
                storeShow: false,
                // 可能是更新迭代取消的数据  没有发现在其他位置使用
                uploadShow: true,
                // 明细作废按钮控制
                isShowDelete: true,
                // 主表数据
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
                    storeCode: '',
                    id: ''
                },
                //丰田个性化数据
                FTshowBtn: false,
                FTurl: '/v1/fileSys/file/parsePurchaseOrderYIQIExcelFile',
                FTaddParams: {},
                FTshowBack: {

                },
                FTbuttonName: '一丰采购导入',

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
                // 主表只读状态控制
                isforbidden: false,
                // 采购类型数据
                typeList: [],
                // 仓库数据
                entreList: [],
                // 导入的按钮名称
                buttonName: '导入明细',
                // 导入所需要的参数
                addParams: {},
                // 解析的地址
                url: '/v1/fileSys/file/parsePurchaseOrderExcelInfo',
                // 解析的参数
                showBack: {},
                // 明细的数据
                tableList: [],
                // 可能是更新迭代取消的数据  暂时在其他位置没有发现使用
                removeId: '',
                // 设置明细操作标识符
                index: '',
                // 采购类型校验必填项状态
                judgeState: null,
                // 仓库校验必填项状态
                judgeStateOne: null,
                // 下拉列表相关参数
                datalist: [],
                selectParams: {
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                // 滚动加载 是否是最后一页
                isLastPage: false,
                // 供应商校验状态
                required: false,
                // 应该不需要
                orderNo: '',
                // 导入显示控制
                isShowImport: true
            }
        },
        methods: {
        	/*新增*/
        	add(){
        		this.$router.push({
        			name:'add'
        		})
        	},
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
                _this.isforbidden = false
                _this.storeShow = true
                _this.$refs.areaqueryshop.resetToStart()
                _this.entreList = []
            },
            // 修改
            saveAgain() {
                const _this = this
                // 组装更新时需要的数据
                const option = {
                    'orderNo': _this.queryParams.orderNo,
                    'orderType': _this.queryParams.orderType,
                    'supplierCode': _this.queryParams.supplierCode,
                    'whCode': _this.queryParams.whCode ? _this.queryParams.whCode : '你好',
                    'purchaseTypeCode': _this.queryParams.purchaseTypeCode,
                    'id': _this.queryParams.id
                }
                api.supplyChain.procurement.changeOrder(option, function(res) {
                    if (res.data.code === 'success') {
                        // 更新成功后 主表只读 编辑按钮显示 提交按钮显示 编辑对应的保存按钮隐藏
                        _this.isforbidden = true
                        _this.changeShow = true
                        _this.onceShow = false
                        _this.submitShow = true
                        Message({
                            type: 'info',
                            message: config.messInfo.success
                        })
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
                _this.FTaddParams.relationCode = _this.addParams.relationCode = _this.queryParams.orderNo
                _this.FTaddParams.singleFlag =  _this.addParams.singleFlag = '1'
                _this.FTaddParams.businessType = _this.addParams.businessType = ''

                // 设置解析参数
                _this.FTshowBack.orderNo = _this.showBack.orderNo = _this.queryParams.orderNo
                _this.FTshowBack.continueFlag = _this.showBack.continueFlag = false;
                _this.FTshowBack.createOrgCode = _this.showBack.createOrgCode = '000001'
                api.supplyChain.purchaseOrder.getPurchaseOrderInfoByCode(option, function(res) {
                    if (res.data.code === 'success') {
                        let queryObj = res.data.obj
                        // 查询的订单数据赋值到本页面
                        _this.queryParams.orderNo = queryObj.orderNo
                        _this.queryParams.id = queryObj.id
                        _this.queryParams.purchaseTypeCode = queryObj.purchaseTypeCode
                        _this.queryParams.whCode = queryObj.whCode
                        _this.queryParams.supplierCode = queryObj.supplierCode
                        _this.queryParams.totalMoney = queryObj.totalMoney
                        _this.queryParams.totalFreightFee = queryObj.totalFreightFee
                        _this.FTshowBack.storeCode = _this.FTaddParams.storeCode = _this.queryParams.storeCode = queryObj.storeCode
                        // 通过判断采购单的状态   控制按钮显示和隐藏
                        if (queryObj.orderStatus === 0) {
                            _this.changeShow = true
                            _this.isforbidden = true
                            _this.submitShow = true
                        } else if (queryObj.orderStatus === -1) {
                            _this.changeShow = false
                            _this.onceShow = false
                            _this.submitShow = false
                            _this.removeShow = false
                            _this.isforbidden = true
                            _this.isShowImport = false
                            _this.isShowDelete = false
                        } else {
                            _this.changeShow = false
                            _this.onceShow = false
                            _this.submitShow = false
                            _this.removeShow = true
                            _this.isforbidden = true
                            _this.isShowImport = false
                        }
                        _this.$refs.search.setValue(queryObj.supplierName)
                        _this.$refs.areaqueryshop.setselect({
                            value: queryObj.storeCode,
                            text: queryObj.storeName
                        })
                    }
                })
                // 查询订单明细的数据
                api.supplyChain.procurement.queryNewOrder(option, function(res) {
                    if (res.data.code === 'success') {
                        // 接收数据并赋值
                        _this.tableList = res.data.obj
                        _this.uploadShow = false
                    }
                })
            },
            // 提交
            submit() {
                const _this = this
                // 组装提交的参数
                let option = {
                    'orderNo': _this.queryParams.orderNo,
                    'orderType': 0
                }
                // 调用提交接口  提交整车订单
                api.supplyChain.procurement.submitOrder(option, function(res) {
                    if (res.data.code === 'success') {
                        // 作废按钮显示
                        _this.removeShow = true
                        // 提交按钮消失
                        _this.submitShow = false
                        // 编辑按钮消失
                        _this.changeShow = false
                        // 禁用状态启用
                        _this.isforbidden = true
                        // 导入按钮消失
                        _this.isShowImport = false
                        Message({
                            type: 'info',
                            message: '提交已完成'
                        })
                    }
                })
            },
            // 接受解析的结果
            analysisExcel(res) {
                const _this = this
                const params = {
                    "orderNo": _this.queryParams.orderNo
                }

                function queryNewOrder(params){
                    api.supplyChain.procurement.queryNewOrder(params, function(res) {
                        _this.submitShow = true
                        _this.changeShow = true
                        _this.tableList = res.data.obj
                        // _this.removeId = _this.tableList[0].id
                        _this.uploadShow = false
                        // 合计运费和金额
                        // 由于 模板没有   暂时不写
                    })
                }



                if (res.data.code === 'success') {
                    if(res.data.obj != null){
                        const h = this.$createElement;
                        MessageBox({
                            title: '提示',
                            // 具体消息提示是由定义的h方法 创建标签 添加进去的
                            message: h('p', null, [
                                h('span', null, '采购价格（含税）/标配MSRP（含税）小于70%，请确认是否导入'),
                                h('i', { style: 'fontStyle: normal' })
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

                                    var promiseInsert = new Promise(function(resolve, reject) {
                                      _this.$refs.upload.analysisExcelpropsAgain(resolve);
                                    });

                                    Promise.all([promiseInsert]).then(function() {
                                        queryNewOrder(params);
                                    });
                                    done();
                                } else {
                                    done();
                                }
                            }
                        })
                    }
                    queryNewOrder(params);
                }
            },
            //一丰个性化导入解析结果
            FTanalysisExcel(res){
                const _this = this
                const params = {
                    "orderNo": _this.queryParams.orderNo
                }
                api.supplyChain.procurement.queryNewOrder(params, function(res) {
                    _this.submitShow = true
                    _this.changeShow = true
                    _this.tableList = res.data.obj
                    // _this.removeId = _this.tableList[0].id
                    _this.uploadShow = false
                    // 合计运费和金额
                    // 由于 模板没有   暂时不写
                })
            },
            // 作废（整车订单）
            remove() {
                const _this = this
                let option = {
                    'orderNo': _this.queryParams.orderNo
                }
                const h = this.$createElement;
                // 警示框弹出
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
                                    // 成功后变为新增整车订单 表格消失 作废按钮消失 提交按钮消失 编辑按钮消失 并且重置主表的数据
                                    _this.tableShow = false
                                    _this.removeShow = false
                                    _this.submitShow = false
                                    _this.changeShow = false
                                    _this.reset()
                                    // 请求后台接口  生成新的业务编码
                                    const params1 = {
                                        'serviceCode': config.supplyChain.purchaseOrder.sequence
                                    }
                                    api.ordinalInfo.getSequence(params1, function(res) {
                                        if (res.data.code === 'success') {
                                            // 将新的业务编码赋值到当前页面的数据中
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
                // 明细作废的入参组装  明细作废需要主订单业务编码  以及明细的id
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
                        // 明细作废成功后 重新查询该整车订单下的明细
                        const params = {
                            "orderNo": _this.queryParams.orderNo
                        }
                        api.supplyChain.procurement.queryNewOrder(params, function(res) {
                            // 接收返回的明细列表
                            _this.tableList = res.data.obj
                        })
                    }
                })
            },
            // 修改（改变按钮样式事件）
            change() {
                const _this = this
                // 点击编辑  解除主表禁用状态 提交按钮隐藏 编辑按钮消失  编辑对应的保存按钮显示
                _this.isforbidden = false
                _this.changeShow = false
                _this.onceShow = true
                _this.submitShow = false
            },
            // 区域经销商店
            selectedfun(data, data1) {
                const _this = this
                //在这里可以获取到经销商店的选择数据
                const options = {
                    'storeCodeSet': []
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
                            // 请求仓库成功 接受仓库的数据
                            const array = res.data.obj
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


        //丰田个性化导入
        // 一汽丰田通商导入按钮显示隐藏切换
        getJurisdictionShow (){
            api.ref.getDictionaryDetails ({refDetailCode: 'SystemRelationGroup'}).then(res=>{
                if(res.data.code == 'success'){
                    let obj = res.data.obj.refDetailValue
                    if (obj.indexOf('000004') >= 0) {
                        this.FTshowBtn = true
                    }
                }
            })
        },


            // 下拉列表操作
            // 搜索框内值改变   触发搜索
            querySelect(data) {
                const _this = this
                _this.selectParams.pageStart = 1;
                _this.selectParams.supplierName = data;
                let params = _this.selectParams;
                params.supplyType = 0 ;
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
                params.supplyType = 0 ;
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
                    params.supplyType = 0 ;
                    this.getSupplierName(params, obj => {
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
            }
        },
        created() {
            const _this = this
            _this.getDetailData()
            const params2 = {
                'refCode': config.supplyChain.procurement.sequence,
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
            this.getJurisdictionShow()
        }
    }
</script>
<style scoped>

</style>

