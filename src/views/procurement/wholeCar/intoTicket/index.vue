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
                                <search
                                    ref="search"
                                    :hasCheck="required"
                                    :dataList="datalist"
                                    option="supplierName"
                                    @dataChange="querySelect"
                                    @itemValue="itemValue"
                                    @clickShowBack="firstLoad"
                                    @comScroll="comScroll"
                                    :disabled="isforbidden">
                                </search>
                            </div>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset label="选择经销商店 *" :label-cols="4" horizontal class="text-right">
                            <areaqueryshop ref="areaqueryshop" :reset="storeShow" :readonly="isforbidden"  @select-change="selectedfun"></areaqueryshop>
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
                            <!-- isforbidden -->
                            <b-form-input v-model="queryParams.totalMoney" type="number" :readonly="true"/>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="运费" :label-cols="4" class="text-right">
                            <!-- isforbidden -->
                            <b-form-input v-model="queryParams.totalFreightFee" type="number" :readonly="true"/>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-right">
                        <!-- <b-button v-if="resetBtn" size="sm" variant="default" @click="reset">重置</b-button> -->
                        <b-button v-if="saveShow" size="sm" variant="primary" @click="save">保存</b-button>
                        <b-button v-if="onceShow" size="sm" variant="primary" @click="saveAgain">保存</b-button>
                        <b-button v-if="submitShow" size="sm" variant="primary" @click="submit">提交</b-button>
                        <b-button v-if="changeShow" size="sm" variant="primary" @click="change">编辑</b-button>
                        <b-button v-if="removeShow" size="sm" variant="danger" @click="remove">废单</b-button>
                        <!-- <b-button v-if="removeShow" size="sm" variant="danger" @click="remove">作废</b-button> -->
                    </div>
                </div>
            </b-card>
        </div>
        <div v-if="tableShow" class="col-md-12">
            <b-card>
                <!-- <b-button size="sm" variant="primary" @click="getIn">导入明细</b-button> -->
                <div class="row">
                    <div class="col-md-12 text-left">
                        <upload :buttonName="buttonName" :addParams="addParams" :analysisExcel="analysisExcel" :url="url" :showBack="showBack"></upload>
                        <FTupload :buttonName="FTbuttonName" :addParams="FTaddParams" :analysisExcel="analysisExcel" :url="FTurl" :showBack="FTshowBack" v-show="FTshowBtn" ></FTupload>
                        <b-button size="sm" variant="danger" @click="removeItem">作废</b-button>
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
                        <template slot="carFactoryName" slot-scope="data">
                            {{ data.item.carFactoryName }}
                        </template>
                        <template slot="carBrandName" slot-scope="data">
                            {{ data.item.carBrandName }}
                        </template>
                        <template slot="carSeriesName" slot-scope="data">
                            {{ data.item.carSeriesName }}
                        </template>
                        <template slot="carModelName" slot-scope="data">
                            {{ data.item.carModelName }}
                        </template>
                        <template slot="carOpvName" slot-scope="data">
                            {{ data.item.carOpvName }}
                        </template>
                        <template slot="carIotypeName" slot-scope="data">
                            {{ data.item.carIotypeName }}
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
import apiUrls from 'common/api-url'
import { hasBtn } from 'common/com-api'
import FTupload from 'components/iris-upload'
import areaqueryshop from 'components/iris-areaqueryshop/'
import { MessageBox, Message } from 'element-ui'
import upload from 'components/iris-upload'
export default {
    components: {
        Search,
        areaqueryshop,
        upload,
        FTupload
    },
    data() {
        return {
            // 控制订单明细的显示或隐藏
            tableShow: false,
            // 作废按钮控制
            removeShow: false,
            // 提交按钮控制
            submitShow: false,
            // 新增时保存按钮的控制
            saveShow: true,
            // 编辑按钮控制
            changeShow: false,
            // 重置按钮控制
            resetBtn: true,
            // 编辑时 对应的保存按钮的控制
            onceShow: false,
            // 原门店组件事件
            storeShow: false,
            // 可能是后期迭代取消的数据
            uploadShow: true,
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
            FTaddParams: {
                singleFlag: '1',
                businessType: '',
                relationCode:''
            },
            FTshowBack: {
                orderNo:'',
                continueFlag: false,
                createOrgCode: '000001'
            },
            FTbuttonName: '一丰采购导入',
            fields: {
                radio: {
                    label: '   '
                },
                orderNo: {
                    label: '采购订单号'
                },
                carFactoryName: {
                    label: '厂家'
                },
                carBrandName: {
                    label: '品牌'
                },
                carSeriesName: {
                    label: '车系'
                },
                carModelName: {
                    label: '车型'
                },
                carOpvName: {
                    label: '排量'
                },
                carIotypeName: {
                    label: '进气'
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
            // 采购类型选项数据
            typeList: [],
            // 仓库数据
            entreList: [],
            // 导入的按钮的名称
            buttonName: '导入明细',
            // 导入的参数
            addParams: {},
            // 解析的地址
            url: '/v1/fileSys/file/parsePurchaseOrderExcelInfo',
            // 解析的参数
            showBack: {},
            // 明细的数据
            tableList: [],
            // 可能是迭代取消的数据 暂时没有发现用处
            removeId: '',
            // 明细作废时  明细的标识位
            index: '',
            // 采购类型必填项校验状态
            judgeState: null,
            // 收货仓库必填项校验状态
            judgeStateOne: null,
            // 下拉列表相关参数
            datalist: [],
            selectParams: {
                pageNums: config.pageNums,
                pageStart: 1,
                supplyType:0
            },
            // 是否是最后一页
            isLastPage: false,
            // 供应商必填项校验状态
            required: false
        }
    },
    computed: {
        //按钮权限校验
        saveBtn() {
            this.saveShow = hasBtn(apiUrls.supplyChain.procurement.saveProcurementNum)
        },
        //按钮权限校验
        saveAgainBtn(){
            this.onceShow = hasBtn(apiUrls.supplyChain.procurement.changeOrder)
            this.changeShow = this.onceShow
        },
        //按钮权限校验
        submitShowBtn(){
            this.submitShow = hasBtn(apiUrls.supplyChain.procurement.submitOrder)
        },
        //按钮权限校验
        removeShowBtn(){
            this.removeShow = hasBtn(apiUrls.supplyChain.procurement.deleteOrder)
        }
    },
    methods: {
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
            _this.$refs.areaqueryshop.reset()
            _this.entreList = []
        },
        // 保存
        save() {
            const _this = this
            // 主表新增时 校验必填项
            if(_this.queryParams.purchaseTypeCode === '' || _this.queryParams.storeCode === '' || _this.queryParams.supplierCode === '') {
                if(_this.queryParams.purchaseTypeCode != '') {
                    _this.judgeState = null
                }else {
                    _this.judgeState = false
                }
                if(_this.queryParams.storeCode != '') {
                    _this.judgeStateOne = null
                }else {
                    _this.judgeStateOne = false
                }
                if(_this.queryParams.supplierCode != ''){
                    _this.required = false
                }else {
                    _this.required = true
                }
            }else {
                _this.judgeState = null
                _this.judgeStateOne = null
                // 组装主表数据
                let options = {
                    'orderNo' : _this.queryParams.orderNo,
                    'orderType' : _this.queryParams.orderType,
                    'supplierCode' : _this.queryParams.supplierCode,
                    'whCode' : _this.queryParams.whCode? _this.queryParams.whCode: '',
                    'purchaseTypeCode': _this.queryParams.purchaseTypeCode,
                    'storeCode': _this.queryParams.storeCode
                }
                // 调取新增整车订单的保存接口
                api.supplyChain.procurement.saveProcurementNum(options, function(res) {
                    if(res.data.code === 'success') {
                        Message({
                            type: 'info',
                            message: '保存成功'
                        });
                        // 保存成功后  明细显示
                        _this.tableShow = true
                        // 新增保存按钮消失
                        _this.saveShow = false
                        // 提交按钮消失
                        _this.submitShow = false
                        // 编辑按钮显示
                        _this.changeShow = true
                        // 重置按钮消失
                        _this.resetBtn = false
                        // 将接口返回的订单的id赋值到当前页面  更新时需要
                        _this.queryParams.id = res.data.obj.id
                        // 禁用状态启用
                        _this.isforbidden = true
                        _this.uploadShow = true
                        // 设置导入的参数
                        _this.addParams.relationCode = _this.queryParams.orderNo
                        _this.addParams.singleFlag = '1'
                        _this.addParams.businessType = ''
                        // 设置解析参数
                        _this.showBack.orderNo = _this.queryParams.orderNo
                        _this.showBack.createOrgCode = '000001'
                    }
                })
            }
        },
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

        // 修改
        saveAgain() {
            const _this = this
            // 主表数据组装
            const option = {
                'orderNo' : _this.queryParams.orderNo,
                'orderType' : _this.queryParams.orderType,
                'supplierCode' : _this.queryParams.supplierCode,
                'whCode' : _this.queryParams.whCode? _this.queryParams.whCode: '',
                'purchaseTypeCode': _this.queryParams.purchaseTypeCode,
                'id': _this.queryParams.id
            }
            // 请求主表编辑接口 修改主表信息
            api.supplyChain.procurement.changeOrder(option,function(res){
                if(res.data.code === 'success') {
                    // 编辑保存成功  数据启用禁用状态
                    _this.isforbidden = true
                    // 编辑按钮显示
                    _this.changeShow = true
                    // 编辑按钮对应的保存按钮消失
                    _this.onceShow = false
                    // 消息提示
                    Message({
                        type: 'info',
                        message: config.messInfo.success
                    })
                }
            })
        },
        // 提交  整车订单提交 注意  提交之后就不可编辑   只可以作废主单或者作废明细
        submit() {
            const _this = this
            // 提交的入参只需要单号和单据类型的值
            let option = {
                'orderNo': _this.queryParams.orderNo,
                'orderType': 0
            }
            api.supplyChain.procurement.submitOrder(option, function(res) {
                if(res.data.code === 'success') {
                    // 提交成功后  废单按钮显示
                    _this.removeShow = true
                    // 提交成功后  保存按钮消失
                    _this.saveShow = false
                    // 提交成功后  提交按钮消失
                    _this.submitShow = false
                    // 提交成功后  编辑按钮消失
                    _this.changeShow = false
                    // 提交成功后  禁用状态
                    _this.isforbidden = true
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
            if(res.data.code === 'success') {
                api.supplyChain.procurement.queryNewOrder(params, function(res){
                    // 提交按钮显示
                    _this.submitShow = true
                    // 编辑按钮消失
                    _this.changeShow = false
                    // 接受明细数据
                    _this.tableList = res.data.obj
                    // 计算总金额  计算总运费
                    _this.queryParams.totalMoney = 0
                    _this.queryParams.totalFreightFee = 0
                    for(let i = 0; i< _this.tableList.length; i++) {
                        _this.queryParams.totalMoney += (_this.tableList[i].purchaseFee -0)
                        _this.queryParams.totalFreightFee += (_this.tableList[i].freightFee -0)
                    }
                    // 下面两个参数怀疑是后期迭代取消的数据 该页面没有使用
                    _this.removeId = _this.tableList[0].id
                    _this.uploadShow = false
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
            // 主表作废警示框  使用的element-ui的组件
            MessageBox({
                title: '提示',
                // 具体消息提示是由定义的h方法 创建标签 添加进去的
                message: h('p', null, [
                    h('span', null, '确定删除'),
                    h('i', { style: 'fontStyle: normal' }, _this.queryParams.orderNo)
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
                        api.supplyChain.procurement.deleteOrder(option, function(res){
                            // 判断作废主表是否成功 如果成功
                            if(res.data.code === "success"){
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                                // 废单逻辑是 作废当前订单 并开始新建新的订单 表格按钮消失 废单按钮消失 提交按钮消失 保存按钮出现 编辑按钮消失 重置按钮出现
                                _this.tableShow= false
                                _this.removeShow= false
                                _this.submitShow= false
                                _this.saveShow= true
                                _this.changeShow= false
                                _this.resetBtn = true
                                _this.reset()
                                // 请求接口 生成新的订单业务编码
                                const params1 = {
                                    'serviceCode': 'ORDER'
                                }
                                api.ordinalInfo.getSequence(params1, function(res) {
                                    if(res.data.code === 'success') {
                                        _this.queryParams.orderNo = res.data.obj
                                    }
                                })
                            // 判断作废主表是否成功  如果不成功
                            }else {
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
            // 作废明细的接口入参 只需要主表的业务编码  以及明细的id即可
            let option = {
                'orderNo': _this.queryParams.orderNo,
                'id': _this.tableList[_this.index]['id']
            }
            api.supplyChain.procurement.deleteItem(option, function(res) {
                if(res.data.code === 'success') {
                    // 明细作废成功后  请求接口  入参为该订单的单号  重新获取该订单的明细
                    const params = {
                        "orderNo": _this.queryParams.orderNo
                    }
                    api.supplyChain.procurement.queryNewOrder(params, function(res){
                        // 明细数据接收
                        _this.tableList = res.data.obj
                    })
                }
            })
        },
        // 修改（改变按钮样式事件）
        change() {
            // 该事件的主要的作用就是控制主单相关按钮的接口显示或隐藏  当点击编辑按钮  事件触发 禁用状态消失  编辑按钮消失 编辑对应的保存按钮显示
            const _this = this
            _this.isforbidden = false
            _this.changeShow = false
            // _this.saveShow = true
            _this.onceShow = true
        },
        // 区域经销商店
        selectedfun(data, data1){
            const _this = this
            //在这里可以获取到经销商店的选择数据
            const options = {
                'storeCodeSet' : []
            }
            if(data1.value) {
                _this.FTshowBack.storeCode = _this.queryParams.storeCode = data1.value
            }
            options.storeCodeSet.push(data1.value)
            options.warehouseTypeFlag = 1;
            // 根据经销商店获取仓库
            api.supplyChain.procurement.getEntrepot(options, function(res){
                if(res.data.code === 'success') {
                    const array = res.data.obj
                    _this.entreList = [];
                    for(var i =0; i< array.length; i++) {
                        let obj = {}
                        obj.text = array[i].warehouseName
                        obj.value = array[i].warehouseCode
                        // 接收仓库的数据  仓库选择项
                        _this.entreList.push(obj)
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
            // 触发供应商的查询 并接收相关参数
            _this.getSupplierName(params, function(res) {
                _this.isLastPage = res.isLastPage
                _this.datalist = res.list
            })
        },
        // 选中某一项
        itemValue(value) {
            const _this = this
            // 选择供应商
            _this.queryParams.supplierCode = value.supplierCode
        },
        // 第一次加载数据
        firstLoad() {
            const _this = this
            // 通过判断供应商的数据选项是否存在 来判断是否进行第一次供应商数据的加载
            if(_this.datalist.length != 0 ){
                return
            }
            // 如果没有加载过数据   则进行供应商数据的加载
            let params = _this.selectParams
            _this.getSupplierName(params, function(res) {
                _this.isLastPage = res.isLastPage
                _this.datalist = res.list
            })
        },
        // 滚动加载
        comScroll(isEnd) {
            // 滚动加载 判断选择框中的数据是否触底以及供应商的数据是否已加载完最后的一页的数据
            // 当触底并且没有加载到最后一页的数据  才会继续请求接口获取数据
            if (isEnd && !this.isLastPage) {
                this.selectParams.pageStart ++
                let params = this.selectParams;
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
        // 提取方法  定义向后台请求supplierName的方法
        getSupplierName(params,callback) {
            api.supplyChain.supplier.querySupplierInfo(params, res => {
                if (res.data.code === "success") {
                    let obj = res.data.obj;
                    callback(obj);
                }
            })
        }
    },
    created() {
        // 初始化数据
        const _this = this
        const option = {}
        const params1 = {
            'serviceCode': config.supplyChain.purchaseOrder.sequence
        }
        const params2 = {
            'refCode': config.supplyChain.purchaseOrder.purchaseType.refCode,
            isDeleted: '0',
            pageNums: config.pageNums,
            pageStart: 1
        }
        // 生成主单的业务编码
        api.ordinalInfo.getSequence(params1, function(res) {
            if(res.data.code === 'success') {
                _this.FTshowBack.orderNo = _this.FTaddParams.relationCode = _this.queryParams.orderNo = res.data.obj
            }
        })
        // 获取数据字典数据  并赋值
        api.supplyChain.procurement.queryDictionaryDetails(params2, function(res){
            const array = res.data.obj.list
            _this.typeList = []
            for(var i = 0; i<array.length; i++) {
                let obj = {}
                obj.text = array[i].refDetailName
                obj.value = array[i].refDetailCode
                _this.typeList.push(obj)
            }
        })
        this.getJurisdictionShow()
    }
}
</script>

