<template>
    <div>
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="服务费名称" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="queryParams.serviceCode" :options="serviceTypeList"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="适用范围" :label-cols="4" label-text-align="right">
                        <areaqueryshop ref="areaquery" :storeAll="true" @select-change="selectStores"></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="启用/停用" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="queryParams.onOffFlag" :options="upDownList" />
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" variant="primary" @click="query(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="row">
                <div class="col-md-6">
                    <div class="pull-left">
                        <b-button v-if="addBtn" size="sm" variant="success" @click="newAdd">新增</b-button>
                        <b-button v-if="editBtn" size="sm" variant="primary" @click="edit">编辑</b-button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="pull-right">
                        <b-button v-if="syncBtn" size="sm" variant="warning" @click="syncData">同步数据</b-button>
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="serviceFreeList" :fields="fields">
                    <template slot="chooseItem" slot-scope="data">
                        <input type="radio" name="selectitem" v-model="editData" :value="data.item" />
                    </template>
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                    </template>
                    <template slot="taxRate" slot-scope="data">
                        {{ (data.item.taxRate*100).toFixed(2) + '%' }}
                    </template>
                    <template slot="operate" slot-scope="data">
                        <b-button v-if="data.item.onOffFlag == 0 && editBtn" size="sm" variant="success" @click="onOrOffSet(data.item)">启用</b-button>
                        <b-button v-if="data.item.onOffFlag == 1 && editBtn" size="sm" variant="danger" @click="onOrOffSet(data.item)">停用</b-button>
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination class="pull-right"
                 @page-change="pageChange"
                 :page-no="pager.pageNo"
                 :page-size="pager.pageSize"
                 :total-result="pager.total"
                 :total-pages="pager.totalPages">
            </pagination>
        </b-card>
        <b-modal id="update" ref="update" :hide-footer="true" :title="modalTitle" size="lg">
            <div class="row">
                <div class="col-md-12">
                    <b-form-fieldset horizontal label="服务费名称*" :label-cols="4" class="text-right">
                        <b-form-select v-model="modalData.serviceCode" :state="modalState.serviceState" :disabled="editReadOnly" :options="serviceTypeList"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <b-form-fieldset horizontal label="成本" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="modalData.costPrice" @blur.native="checkCost"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <b-form-fieldset horizontal label="收费标准" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="modalData.salePrice" @blur.native="checkSale"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12 rate-service-seting">
                    <b-form-fieldset horizontal label="税率*" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="modalData.taxRate" :state="modalState.rateState"/><span>%</span>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <b-form-fieldset horizontal label="适用范围*" :label-cols="4" class="text-right">
                        <areaqueryshop ref="areaqueryadd" :error="modalState.storeState" :storeAll="true" :readonly="editReadOnly" @select-change="selectStoresadd"></areaqueryshop>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" variant="" @click="modalCancel">取消</b-button>
                        <b-button size="sm" variant="success" @click="handleOk">保存</b-button>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import Vue from 'vue'
    import api from 'common/api'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import config from 'common/config'
    import { Message } from 'element-ui'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import Pagination from 'components/pagination/pagination'
    export default {
        components: {
            Pagination,
            areaqueryshop
        },
        data() {
            return {
                // 重置当前页标记位
                setPageSign: 1,
                // 查询条件
                queryParams: {
                    serviceCode: '',
                    onOffFlag: '',
                    storeCodes: []
                },
                // 上下架选择内容
                upDownList: [],
                // 服务费类型内容
                serviceTypeList: [],
                // 模态框页头标题
                modalTitle: '',
                // 分页参数
                pager: {

                },
                // 需要编辑的数据
                editData: '',
                // 模态框门店只读状态
                editReadOnly: false,
                // 模态框里的数据  新增时  服务费默认是上架状态  所以onOffFlag为1
                modalData: {
                    serviceCode: '',
                    costPrice: '',
                    salePrice: '',
                    taxRate: '',
                    storeCode: '',
                    salesAreaCode: '',
                    onOffFlag: 1
                },
                // 模态框数据检验状态
                modalState: {
                    serviceState: null,
                    storeState: false,
                    rateState: null
                },
                // 服务费选项
                serviceFreeList: [],
                fields: {
                    chooseItem: {
                        label: '选择'
                    },
                    index: {
                        label: '序号'
                    },
                    serviceName: {
                        label: '服务费名称'
                    },
                    storeName: {
                        label: '适用范围'
                    },
                    costPrice: {
                        label: '成本'
                    },
                    salePrice: {
                        label: '标准售价'
                    },
                    taxRate: {
                        label: '税率'
                    },
                    operate: {
                        label: '操作'
                    }
                }
            }
        },
        computed: {
            // 按钮级权限控制
            addBtn() {
                return hasBtn(apiUrls.serviceFreeSeting.editServiceFeeManageBatch)
            },
            editBtn() {
                return hasBtn(apiUrls.serviceFreeSeting.editServiceFeeManageBatch)
            },
            syncBtn() {
                return hasBtn(apiUrls.serviceFreeSeting.loadServiceFeeManageCacheRedis)
            }
        },
        methods: {
            // 校验成本值 成本不可以小于0
            checkCost() {
                let judge = this.modalData.costPrice - 0
                if(judge < 0) {
                    this.modalData.costPrice = 0
                }
            },
            // 校验售价 不可以小于0
            checkSale() {
                let judge = this.modalData.salePrice - 0
                if(judge < 0) {
                    this.modalData.salePrice = 0
                }
            },
            // 模态框取消事件
            modalCancel() {
                this.$refs.update.hide()
            },
            // 列表上下架事件
            onOrOffSet(arg) {
                // 通过id 和 停用启用状态 组装停用启用需要的数据
                let option = {
                    id: arg.id,
                    onOffFlag: arg.onOffFlag == 0 ? 1 : 0
                }
                let params = [option]
                api.serviceFreeSeting.editServiceFeeManageBatch(params, res => {
                    if(res.data.code === 'success') {
                        Message({
                            type: 'success',
                            message: arg.onOffFlag == 0 ? '启用成功' : '停用成功'
                        })
                        // 停用启用成功后  重新查询列表的数据  更新列表中的停用启用状态
                        this.query(this.setPageSign)
                    }
                })
            },
            // 获取服务费类型
            getServiceTypeList() {
                let option = {
                    refCode: config.serviceFreeSeting.refCode
                }
                this.serviceTypeList.push({text: '', value: ''})
                api.ref.getDataDictionary(option).then(res => {
                    if(res.data.code === 'success') {
                        let tempArr = res.data.obj.referenceDetailInfos
                        tempArr.forEach(element => {
                            let obj = {}
                            obj.text = element.refDetailName
                            obj.value = element.refDetailCode
                            this.serviceTypeList.push(obj)
                        })
                    }
                })
            },
            // 同步数据
            syncData() {
                api.serviceFreeSeting.loadServiceFeeManageCacheRedis(res => {
                    if(res.data.code === 'success') {
                        Message({
                            type: 'success',
                            message: '同步数据成功'
                        })
                    }
                })
            },
            // 查询
            query(arg) {
                this.queryParams.pageNums = config.pageNums
                this.queryParams.pageStart = arg
                // 服务费查询
                api.serviceFreeSeting.queryServiceFeeManageList(this.queryParams, res => {
                    if(res.data.code === 'success') {
                        this.editData = ''
                        this.serviceFreeList = res.data.obj.list
                        this.pager = {
                            pageNo: res.data.obj.pageNum,
                            pageSize: res.data.obj.pageSize,
                            total: res.data.obj.total,
                            totalPages: res.data.obj.pages
                        }
                    }
                })
            },
            // 分页事件
            pageChange(arg) {
                this.setPageSign = arg
                this.query(arg)
            },
            // 查询条件门店组件事件
            selectStores(arg1, arg2) {
                this.queryParams.storeCodes = []
                if(Array.isArray(arg2)) {
                    arg2.forEach(element => {
                        if(element.value == 0) {
                            
                        }else {
                            this.queryParams.storeCodes.push(element.value)
                        }  
                    })
                }else {
                    if(arg2.value) {
                        this.queryParams.storeCodes.push(arg2.value)
                    }
                }
            },
            // 模态框 门店组件事件
            selectStoresadd(arg1, arg2) {
                if(Array.isArray(arg2)) {

                }else {
                    if(arg2) {
                        if(arg2.value) {
                            this.modalData.storeCode = arg2.value
                        }else {
                            this.modalData.storeCode = ''
                        }
                    }else {
                        this.modalData.storeCode = ''
                    }
                }
            },
            // 模态框确认事件
            handleOk() {
                let judge = true
                // 校验必填项   门店  税率  服务名称
                if(!this.modalData.serviceCode) {
                    judge = false
                    this.modalState.serviceState = false
                }else {
                    this.modalState.serviceState = null
                }
                if(!this.modalData.taxRate || this.modalData.taxRate - 0 < 0) {
                    judge = false
                    this.modalState.rateState = false
                }else {
                    this.modalState.rateState = null
                }
                if(!this.modalData.storeCode) {
                    judge = false
                    this.modalState.storeState = true
                }else {
                    this.modalState.storeState = false
                }
                if(!judge) {
                    return
                }
                if(this.modalData.id) {

                }else {
                    // 新增的服务费设置 默认启用
                    this.modalData.onOffFlag = 1
                }
                let submitObj = JSON.parse(JSON.stringify(this.modalData))
                // 税率数据处理
                submitObj.taxRate = ((submitObj.taxRate - 0)/100).toFixed(4)
                submitObj.costPrice = submitObj.costPrice ? submitObj.costPrice : 0
                submitObj.salePrice = submitObj.salePrice ? submitObj.salePrice : 0
                // 组装新增的入参数据
                let option = [submitObj]
                api.serviceFreeSeting.editServiceFeeManageBatch(option, res => {
                    if(res.data.code === 'success') {
                        // 判断提示的类型  编辑或者新增
                        if(this.modalData.id) {
                            Message({
                                type: 'success',
                                message: '编辑成功'
                            })
                        }else {
                            Message({
                                type: 'success',
                                message: '新增成功'
                            })
                        }
                        // 清空已选择的编辑的数据
                        this.editData = ''
                        // 重新查询列表数据
                        this.query(this.setPageSign)
                        // 模态框隐藏
                        this.$refs.update.hide()
                        // 新增成功后  数据校验状态重置
                        this.modalState = {
                            serviceState: null,
                            storeState: false,
                            rateState: null
                        }
                    }
                })
            },
            // 编辑服务费
            edit() {
                // 清除模态框中的数据
                this.modalData = {}
                // 模态框检查状态回到初始
                this.modalState = {
                    serviceState: null,
                    storeState: false,
                    rateState: null
                }
                // 检查是否选了编辑项  如果没有 则提示选择编辑项
                if(!this.editData){
                    Message({
                        type: 'warning',
                        message: '请选择编辑项'
                    })
                    return
                } 
                // 通过id获取要编辑的数据
                this.getDetailInfoAboutServiceFree()
                // 更改模态框页头
                this.modalTitle = "编辑服务费"
                // 模态框显示
                this.$refs.update.show()
            },
            // 新增服务费
            newAdd() {
                // 更改模态框页头
                this.modalTitle = "新增服务费"
                // 门店禁用状态解除
                this.editReadOnly = false
                // 模态框数据初始化
                this.modalData = {}
                // 模态框门店数据回到初始状态
                this.$refs.areaqueryadd.resetToStart()
                // 模态框数据检查状态回到初始
                this.modalState = {
                    serviceState: null,
                    storeState: false,
                    rateState: null
                }
                // 模态框显示
                this.$refs.update.show()
            },
            // 通过id获取详细的服务费信息
            getDetailInfoAboutServiceFree() {
                let option = {
                    id: this.editData.id
                }
                api.serviceFreeSeting.getServiceFeeManage(option, res => {
                    if(res.data.code === 'success') {
                        // 将查询的数据赋值到模态框中
                        this.modalData = {
                            id: res.data.obj.id,
                            serviceCode: res.data.obj.serviceCode,
                            costPrice: res.data.obj.costPrice,
                            salePrice: res.data.obj.salePrice,
                            taxRate: ((res.data.obj.taxRate - 0)*100).toFixed(2),
                            storeCode: res.data.obj.storeCode,
                            salesAreaCode: res.data.obj.salesAreaCode,
                            onOffFlag: res.data.obj.onOffFlag
                        }
                        // 组装门店需要的数据
                        let areaData = {
                            text: res.data.obj.storeName,
                            value: res.data.obj.storeCode
                        }
                        // 门店组件赋值
                        this.$refs.areaqueryadd.setselect(areaData)
                        // 编辑服务费时  门店不可更改
                        this.editReadOnly = true
                    }
                })
            }
        },
        // 初始化  选择框选项赋值
        created() {
            // 是否上架选项
            this.upDownList = config.serviceFreeSeting.upDownList
            // 服务类型  数据字典项
            this.getServiceTypeList()
        }
    }
</script>
<style>
    .rate-service-seting .col-sm-8 {
        padding-right: 20px;
        position: relative;
    }
    .rate-service-seting .col-sm-8>span {
        position: absolute;
        top: 50%;
        right: 0px;
        transform: translate(-50%, -50%);
    }
</style>

