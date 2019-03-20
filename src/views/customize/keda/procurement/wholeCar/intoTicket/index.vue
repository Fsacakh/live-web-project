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
                            <areaqueryshop ref="areaqueryshop" :reset="storeShow" :error="judgeStateOne" :readonly="isforbidden"  @select-change="selectedfun"></areaqueryshop>
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
                            <!-- isforbidden -->
                            <b-form-select v-model="queryParams.accountPeriodCode" :state="judgeAccount" :options="limitTypes" :disabled="isforbidden"/>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="采购总金额" :label-cols="4" class="text-right">
                            <!-- isforbidden -->
                            <b-form-input v-model="queryParams.totalMoney" type="number" :readonly="true"/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="运费" :label-cols="4" class="text-right">
                            <!-- isforbidden -->
                            <b-form-input v-model="queryParams.totalFreightFee" type="number" :readonly="true"/>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-right">
                        <b-button v-if="saveShow" size="sm" variant="primary" @click="save">保存</b-button>
                        <b-button v-if="onceShow" size="sm" variant="primary" @click="saveAgain">保存</b-button>
                        <b-button v-if="submitShow" size="sm" variant="primary" @click="submit">提交</b-button>
                        <b-button v-if="changeShow" size="sm" variant="primary" @click="change">编辑</b-button>
                        <b-button v-if="removeShow" size="sm" variant="danger" @click="remove">废单</b-button>
                    </div>
                </div>
            </b-card>
        </div>
        <div v-if="tableShow" class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-12 text-left">
                        <upload :buttonName="buttonName" :addParams="addParams" :analysisExcel="analysisExcel" :url="url" :showBack="showBack"></upload>
                        <b-button v-if="tableList.length > 0" size="sm" variant="danger" @click="removeItem">作废</b-button>
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
                        <template slot="skuName" slot-scope="data">
                            {{ data.item.skuName }}
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
import areaqueryshop from 'components/iris-areaqueryshop/'
import { MessageBox, Message } from 'element-ui'
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
            tableShow: false,
            removeShow: false,
            submitShow: false,
            saveShow: true,
            changeShow: false,
            resetBtn: true,
            onceShow: false,
            storeShow: false,
            judgeAccount: null,
            uploadShow: true,
            judgeStateTwo: null,
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
                accountPeriodCode: '',
                accountPeriodName: '',
                id: ''
            },
            fields: {
                radio: {
                    label: '  '
                },
                orderNo: {
                    label: '采购订单号'
                },
                carFactoryName: {
                    label: '厂家'
                },
                skuName: {
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
            isforbidden: false,
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
            this.limitTypes.forEach(item => {
              if(item.value == _this.queryParams.accountPeriodCode) {
                _this.queryParams.accountPeriodName = item.text;
              }
            })
            // 校验必填项
            if(_this.queryParams.whCode === '' || _this.queryParams.purchaseTypeCode === '' || _this.queryParams.storeCode === '' || _this.queryParams.supplierCode === '' || _this.queryParams.accountPeriodCode === '') {
                if(_this.queryParams.purchaseTypeCode != '') {
                    _this.judgeState = null
                }else {
                    _this.judgeState = false
                }
                if(_this.queryParams.storeCode != '') {
                    _this.judgeStateOne = false
                }else {
                    _this.judgeStateOne = true
                }
                if(_this.queryParams.supplierCode != ''){
                    _this.required = false
                }else {
                    _this.required = true
                }
                if(_this.queryParams.accountPeriodCode != '') {
                    _this.judgeAccount = null
                }else {
                    _this.judgeAccount = false
                }
                if(_this.queryParams.whCode != '') {
                    _this.judgeStateTwo = null
                }else {
                    _this.judgeStateTwo = false
                }
            } else {
                _this.judgeAccount = null
                _this.judgeStateTwo = null
                _this.judgeState = null
                _this.judgeStateOne = false
                _this.required = false
                let options = {
                    'orderNo' : _this.queryParams.orderNo,
                    'orderType' : _this.queryParams.orderType,
                    'supplierCode' : _this.queryParams.supplierCode,
                    'whCode' : _this.queryParams.whCode? _this.queryParams.whCode: '你好',
                    'purchaseTypeCode': _this.queryParams.purchaseTypeCode,
                    'storeCode': _this.queryParams.storeCode,
                    'accountPeriodCode': _this.queryParams.accountPeriodCode,
                    'accountPeriodName': _this.queryParams.accountPeriodName
                }
                api.supplyChain.keda.purchaseOrder.insertPurchaseOrderInfo(options, function(res) {
                    if(res.data.code === 'success') {
                        Message({
                            type: 'info',
                            message: '保存成功'
                        });
                        _this.tableShow = true
                        _this.saveShow = false
                        _this.submitShow = false
                        _this.changeShow = true
                        _this.resetBtn = false
                        _this.queryParams.id = res.data.obj.id
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
        // 修改
        saveAgain() {
            const _this = this
            this.limitTypes.forEach(item => {
              if(item.value == _this.queryParams.accountPeriodCode) {
                _this.queryParams.accountPeriodName = item.text;
              }
            })
            const option = {
                'orderNo' : _this.queryParams.orderNo,
                'orderType' : _this.queryParams.orderType,
                'supplierCode' : _this.queryParams.supplierCode,
                'whCode' : _this.queryParams.whCode? _this.queryParams.whCode: '你好',
                'purchaseTypeCode': _this.queryParams.purchaseTypeCode,
                'accountPeriodCode': _this.queryParams.accountPeriodCode,
                'accountPeriodName': _this.queryParams.accountPeriodName,
                'id': _this.queryParams.id
            }
            api.supplyChain.keda.purchaseOrder.updatePurchaseOrderInfo(option,function(res){
                if(res.data.code === 'success') {
                    _this.isforbidden = true
                    _this.changeShow = true
                    _this.onceShow = false
                    Message({
                        type: 'info',
                        message: config.messInfo.success
                    })
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
                'accountPeriodCode': _this.queryParams.accountPeriodCode,
                'accountPeriodName': _this.queryParams.accountPeriodName
            }
            api.supplyChain.keda.purchaseOrder.submitPurchaseOrderInfo(option, function(res) {
                if(res.data.code === 'success') {
                    _this.removeShow = true
                    _this.saveShow = false
                    _this.submitShow = false
                    _this.changeShow = false
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
                    _this.submitShow = true
                    _this.changeShow = false
                    _this.tableList = res.data.obj
                    _this.queryParams.totalMoney = 0
                    _this.queryParams.totalFreightFee = 0
                    for(let i = 0; i< _this.tableList.length; i++) {
                        _this.queryParams.totalMoney += (_this.tableList[i].purchaseFee -0)
                        _this.queryParams.totalFreightFee += (_this.tableList[i].freightFee -0)
                    }
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
                            if(res.data.code === "success"){
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                                _this.tableShow= false
                                _this.removeShow= false
                                _this.submitShow= false
                                _this.saveShow= true
                                _this.changeShow= false
                                _this.resetBtn = true
                                _this.reset()
                                const params1 = {
                                    'serviceCode': config.supplyChain.purchaseOrder.sequence
                                }
                                api.ordinalInfo.getSequence(params1, function(res) {
                                    if(res.data.code === 'success') {
                                        _this.queryParams.orderNo = res.data.obj
                                    }
                                })
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
            if(_this.index === '') {
                Message({
                    type: 'warning',
                    message: '请选择删除项'
                })
                return
            }
            let option = {
                'orderNo': _this.queryParams.orderNo,
                'id': _this.tableList[_this.index]['id']
            }
            api.supplyChain.procurement.deleteItem(option, function(res) {
                if(res.data.code === 'success') {
                    const params = {
                        "orderNo": _this.queryParams.orderNo
                    }
                    _this.index = ''
                    api.supplyChain.procurement.queryNewOrder(params, function(res){
                        _this.tableList = res.data.obj
                    })
                }
            })
        },
        // 修改（改变按钮样式事件）
        change() {
            const _this = this
            _this.isforbidden = false
            _this.changeShow = false
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
                _this.queryParams.storeCode = data1.value
            }
            options.storeCodeSet.push(data1.value)
            options.warehouseTypeFlag = 1
            // 根据经销商店获取仓库
            api.supplyChain.procurement.getEntrepot(options, function(res){
                if(res.data.code === 'success') {
                    const array = res.data.obj
                    _this.entreList = [];
                    for(var i =0; i< array.length; i++) {
                        let obj = {}
                        obj.text = array[i].warehouseName
                        obj.value = array[i].warehouseCode
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
            if(_this.datalist.length != 0 ){
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
                this.selectParams.pageStart ++
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
        getSupplierName(params,callback) {
            api.supplyChain.supplier.querySupplierInfo(params, res => {
                if (res.data.code === "success") {
                    let obj = res.data.obj;
                    callback(obj);
                }
            })
        },
        // 获取额度类型的数据字典
        getLimitType() {
            const _this = this
            let option = {
                refCode: config.supplyChain.purchaseOrder.refCode,
                pageNums: config.pageNums
            }
            api.supplyChain.procurement.queryDictionaryDetails(option, res => {
                if(res.data.code === 'success') {
                    let tempArr = res.data.obj.list
                    _this.limitTypes = []
                    for(var i = 0; i<tempArr.length; i++) {
                        let obj = {}
                        obj.text = tempArr[i].refDetailName
                        obj.value = tempArr[i].refDetailCode
                        _this.limitTypes.push(obj)
                    }
                }
            })
        },
        // 获取业务编码
        getSequenceCode() {
            const _this = this
            const params1 = {
                'serviceCode': config.supplyChain.purchaseOrder.sequence
            }
            api.ordinalInfo.getSequence(params1, function(res) {
                if(res.data.code === 'success') {
                    _this.queryParams.orderNo = res.data.obj
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
            api.supplyChain.procurement.queryDictionaryDetails(params2, function(res){
                let  array = res.data.obj.list
                _this.typeList = []
                for(var i = 0; i<array.length; i++) {
                    let obj = {}
                    obj.text = array[i].refDetailName
                    obj.value = array[i].refDetailCode
                    _this.typeList.push(obj)
                }
            })
        }
    },
    created() {
        this.getSequenceCode()
        this.getProcumentType()
        this.getLimitType()
    }
}
</script>
<style scoped>

</style>
