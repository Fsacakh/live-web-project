<template>
    <div class="animated fadeIn">
        <b-card>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="审批指标" :label-cols="4" class="text-right">
                        <b-form-select v-model="addParams.approvalCriteriaType" :options="approvelist" :disabled="disabled" @input="hideClum"></b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="审批类型 *" :label-cols="4" class="text-right">
                        <b-form-select v-model="addParams.wfTypeCode" :options="typelist" :disabled="disabled"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="业务编码" :label-cols="4" class="text-right">
                        <b-form-input v-model="addParams.wfCode" disabled />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="是否上架" :label-cols="4" class="text-right">
                        <b-form-select v-model="addParams.onOffFlag" :options="isOrlist" :disabled="showOnOffFlag"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="组织架构 *" :label-cols="4" class="text-right">
                        <div @click="!disabled && headClick()" ref="org">
                            <b-form-input v-model="addParams.orgName" readonly/>
                        </div>
                        <div class="text-left select-tree" v-show="headShow">
                            <el-tree :data="orgTreeData" :props="orgOptions" :load="orgLoad" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="false" @node-click="headClickChildren">
                            </el-tree>
                        </div>
                    </b-form-fieldset>
                </div>
            </div>
            <car ref="car" :initData="carData" :col="2" @callBack="callBack"  @validete="validateCar" :disabled="disabled" v-if="isshow"></car>
            <div class="row" v-if="editBtn">
                <div class="col-md-12 text-right">
                    <b-button v-if="showIsOrNo" type="reset" size="sm" @click="cancel">取消</b-button>
                    <b-button v-if="tempCode && showIsOrNo" size="sm" variant="primary" @click="save">保存</b-button>
                    <b-button v-if="!tempCode && showIsOrNo" size="sm" variant="primary" @click="build">创建</b-button>
                </div>
            </div>
        </b-card>
        <b-card v-if="isShowApprove">
            <b-list-group v-if="!isSave">
                <b-list-group-item>
                    <div class="row">
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="审批名称" :label-cols="4" class="text-right">
                                        <b-form-input  :value="addParams.approvalCriteriaType === 2 ? 'SNP%' : (addParams.approvalCriteriaType === 3 ? '让利率' : 'GP%')" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="节点名称 *" :label-cols="4" class="text-right">
                                        <b-form-input v-model="firstLine.nodeName" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="组织架构" :label-cols="4" class="text-right">
                                        <div @click="orgClick" ref="org">
                                            <b-form-input v-model="firstLine.orgName" readonly/>
                                        </div>
                                        <div class="text-left select-tree" v-show="orgShow && !disabled">
                                            <el-tree :data="orgTreeData" :props="orgOptions" :load="orgLoad" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="false" @node-click="orgItemClick">
                                            </el-tree>
                                        </div>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="岗位类型" :label-cols="4" class="text-right">
                                        <b-form-select v-model="firstLine.postTypeCode" :options="firstLine.typeslist" :disabled="disabled"></b-form-select>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 1">
                                    <b-form-fieldset horizontal label="GP%最大值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="firstLine.maxValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 1">
                                    <b-form-fieldset horizontal label="GP%最小值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="firstLine.minValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 2">
                                    <b-form-fieldset horizontal label="SNP%最大值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="firstLine.maxValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 2">
                                    <b-form-fieldset horizontal label="SNP%最小值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="firstLine.minValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 3">
                                    <b-form-fieldset horizontal label="让利率最大值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="firstLine.maxValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 3">
                                    <b-form-fieldset horizontal label="让利率最小值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="firstLine.minValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 row">
                            <div class="col-md-12 text-right">
                                <b-button v-if="items.length === 0&&editBtn" size="sm" variant="primary" @click="add">增加</b-button>
                            </div>
                        </div>
                    </div>
                </b-list-group-item>
                <b-list-group-item v-for="(item, index) in items" :key="index">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="审批名称" :label-cols="4" class="text-right">
                                        <b-form-input :value="addParams.approvalCriteriaType === 2 ? 'SNP%' : (addParams.approvalCriteriaType === 3 ? '让利率' : 'GP%')" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="节点名称 *" :label-cols="4" class="text-right">
                                        <b-form-input v-model="item.nodeName" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" @click="setIndex(index)">
                                    <b-form-fieldset horizontal label="组织架构" :label-cols="4" class="text-right">
                                        <div @click="orgClickChildren(item)" ref="org">
                                            <b-form-input v-model="item.orgName" readonly/>
                                        </div>
                                        <div class="text-left select-tree" v-show="item.orgShow && !disabled">
                                            <el-tree :data="orgTreeData" :props="orgOptions" :load="orgLoad" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="false" @node-click="orgItemClickChildren">
                                            </el-tree>
                                        </div>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="岗位类型" :label-cols="4" class="text-right">
                                        <b-form-select v-model="item.postTypeCode" :options="item.typeslist||[]" :disabled="disabled"></b-form-select>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 1">
                                    <b-form-fieldset horizontal label="GP%最大值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="item.maxValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 1">
                                    <b-form-fieldset horizontal label="GP%最小值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="item.minValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 2">
                                    <b-form-fieldset horizontal label="SNP%最大值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="item.maxValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 2">
                                    <b-form-fieldset horizontal label="SNP%最小值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="item.minValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 3">
                                    <b-form-fieldset horizontal label="让利率最大值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="item.maxValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 3">
                                    <b-form-fieldset horizontal label="让利率最小值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="item.minValue" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 row">
                            <div v-if="!disabled" class="col-md-12 text-right">
                                <b-button v-if="(index + 1) === items.length && editBtn" size="sm" variant="primary" @click="add">增加</b-button>
                                <b-button v-if="editBtn" size="sm" variant="danger" @click="remove(index)">删除</b-button>
                            </div>
                        </div>
                    </div>
                </b-list-group-item>
            </b-list-group>
            <b-list-group v-if="isSave">
                <b-list-group-item v-for="(item, index) in tempItems" :key="index">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="审批名称" :label-cols="4" class="text-right">
                                        <b-form-input :value="addParams.approvalCriteriaType === 2 ? 'SNP%' : (addParams.approvalCriteriaType === 3  ? '让利率' : 'GP%')" :disabled="disabled"/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="节点名称 *" :label-cols="4" class="text-right">
                                        <b-form-input :value="item.nodeName" readonly/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="组织架构" :label-cols="4" class="text-right">
                                        <b-form-input :value="item.orgName" disabled></b-form-input>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6">
                                    <b-form-fieldset horizontal label="岗位类型" :label-cols="4" class="text-right">
                                        <b-form-select :value="item.postTypeCode" :options="item.typeslist" disabled></b-form-select>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 1">
                                    <b-form-fieldset horizontal label="GP%最大值" :label-cols="4" class="text-right">
                                        <b-form-input :value="item.maxValue" readonly/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 1">
                                    <b-form-fieldset horizontal label="GP%最小值" :label-cols="4" class="text-right">
                                        <b-form-input :value="item.minValue" readonly/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 2">
                                    <b-form-fieldset horizontal label="SNP%最大值" :label-cols="4" class="text-right">
                                        <b-form-input :value="item.maxValue" readonly/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 2">
                                    <b-form-fieldset horizontal label="SNP%最小值" :label-cols="4" class="text-right">
                                        <b-form-input :value="item.minValue" readonly/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 3">
                                    <b-form-fieldset horizontal label="让利率最大值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="item.maxValue" readonly/>
                                    </b-form-fieldset>
                                </div>
                                <div class="col-md-6" v-if="addParams.approvalCriteriaType === 3">
                                    <b-form-fieldset horizontal label="让利率最小值" :label-cols="4" class="text-right">
                                        <b-form-input v-model="item.minValue" readonly/>
                                    </b-form-fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-list-group-item>
            </b-list-group>
            <div class="row" v-if="editBtn" style="margin-top: 20px;">
                <div class="col-md-12 text-right">
                    <b-button v-if="nodeSave && !disabled" size="sm" variant="primary" @click="saveApprove">保存</b-button>
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
    import areaqueryshop from 'components/iris-areaqueryshop/'
    import api from 'common/api'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import config from 'common/config'
    import car from 'components/iris-car2/'
    import Vue from 'vue'
    import { Tree, DatePicker } from 'element-ui'
    import common from 'common/common'
    Vue.use(Tree)
    Vue.use(DatePicker)
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        components: {
            car,
            areaqueryshop
        },
        data() {
            return {
                isCanEditNode: true,
                firstLine: {
                    nodeCode: '',
                    nodeName: '',
                    orgName: '',
                    orgCode: '',
                    postTypeCode: '',
                    maxValue: '',
                    minValue: '',
                    typeslist: [],
                    orglist: []
                },
                items: [],
                addParams: {
                    wfTypeCode: '',
                    wfTypeName: '',
                    approvalCriteriaType: '',
                    storeCode: '',
                    orgName: '',
                    orgCode: '',
                    onOffFlag: 0,
                    typelist: [],
                    wfCode: '',
                    maxValue: '',
                    minValue: '',
                    wfName: '123',
                },
                tempItems: [],
                carObj: {},
                isSave: false,
                isShowApprove: false,
                nodeSave: true,
                orgCode: '',
                typelist: [],
                orgTreeData: [],
                orgOptions: {
                    children: 'children',
                    label: 'name'
                },
                id: '',
                isOrlist: config.salesAdminList,
                approvelist: [],
                tempCode: '',
                showIsOrNo: true,
                tempData: {},
                orgShow: false,
                headShow: false,
                tempIndex: '',
                carData: {},
                userType: '',
                intentionCarInfoVos:[{
                    id:'',
                    //意向车型编码 seq
                    //intentionCarCode:'',
                    //线索CODE
                    leadCode:'',
                    //显示名称
                    //displayName:'',
                    //主车型编码 y
                    carCode:'',
                    //厂家编码 y
                    factoryCode:'',
                    //品牌编码 y
                    brandCode:'',
                    //车系编码 y
                    seriesCode:'',
                    //车型编码 y
                    modelCode:''
                }],
                judgeFlag: true,
                disabled: false,
                showOnOffFlag: false,
                isshow:true,
            }
        },
        methods: {
            ...mapActions('salesAdmin',[
                'delTableList',
                'getTableList'
            ]),
            hideClum(){
                let index = this.typelist.findIndex((item) => {
                        return item.value == 'WorkFlowTypeOrderUpdate'  
                    })
            	if (this.addParams.approvalCriteriaType == '0') {
                    this.isshow = false
                    this.$set(this.typelist[index], 'disabled', false)  
            	} else {
                    this.isshow = true
                    if (index > 0) {
                       this.$set(this.typelist[index], 'disabled', true)   
                    }
                }
            },
            validateCar(flag){
                this.checkCar = flag;
            },
            setIndex(index) {
               const _this = this
               _this.tempIndex = index
               for(let i =0;i<_this.items.length; i++) {
                   if(i != index){
                       _this.items[i].orgShow = false
                   }
               }
               _this.orgShow = false
            },
            orgItemClick(data) {
                this.firstLine.orgName = data.name;
                this.firstLine.orgCode = data.code;
                this.orgShow = false;
                // this.getOrgCode()
            },
            orgItemClickChildren(data) {
                const _this = this
                let index = _this.tempIndex
                _this.items[index].orgName = data.name
                _this.items[index].orgCode = data.code
                _this.items[index].orgShow = false
            },
            headClick() {
                this.headShow = !this.headShow;
            },
            headClickChildren(data) {
                const _this = this
                _this.addParams.orgName = data.name
                _this.addParams.orgCode = data.code
                _this.headShow = false
            },
            orgClick() {
                this.orgShow = !this.orgShow;
                this.items.forEach(function(element) {
                    element.orgShow = false
                })
            },
            orgClickChildren(item) {
                item.orgShow = !item.orgShow
                this.items = JSON.parse(JSON.stringify(this.items))
            },
            orgLoad(node, resolve) {
                let userInfo = JSON.parse(common.getSession('userInfo'))
                if(this.userType == 0 || this.userType == 1) {
                    if (node.level === 0) {
                        let params = { orgCode: userInfo.inCharegOrgVo.orgCode };
                        api.area.getOrg(params).then(res => {
                            if (res.data.code === 'success') {
                                let obj = res.data.obj;
                                let arr = [{
                                    id: 0,
                                    name: obj.orgName,
                                    code: obj.orgCode
                                }];
                                return resolve(arr);
                            }
                        })
                    } else {
                        let params = { orgCode: node.data.code };
                        api.area.getOrg(params).then(res => {
                            if (res.data.code === 'success') {
                                let items = res.data.obj.childOrganizations;
                                let arr = [];
                                if (items !== null) {
                                    items.forEach((item, index) => {
                                        let data = {
                                            name: item.orgName,
                                            code: item.orgCode
                                        }
                                        arr.push(data)
                                    })
                                } else {
                                    return resolve([])
                                }
                                return resolve(arr)
                            }
                        })
                    }
                }else {
                    if (node.level === 0) {
                        let params = { orgCode: config.areaRoot.org };
                        api.area.getOrg(params).then(res => {
                            if (res.data.code === 'success') {
                                let obj = res.data.obj;
                                let arr = [{
                                    id: 0,
                                    name: obj.orgName,
                                    code: obj.orgCode
                                }];
                                return resolve(arr);
                            }
                        })
                    } else {
                        let params = { orgCode: node.data.code };
                        api.area.getOrg(params).then(res => {
                            if (res.data.code === 'success') {
                                let items = res.data.obj.childOrganizations;
                                let arr = [];
                                if (items !== null) {
                                    items.forEach((item, index) => {
                                        let data = {
                                            name: item.orgName,
                                            code: item.orgCode
                                        }
                                        arr.push(data)
                                    })
                                } else {
                                    return resolve([])
                                }
                                return resolve(arr)
                            }
                        })
                    }
                }
            },
            // 回调函数  拿到选择的厂家  品牌  车型   车系   车款 的code值
            callBack(res) {
                const _this = this
                _this.carObj = res
                _this.carData.factoryCode = res.factoryCode
                _this.carData.brandCode = res.brandCode
                _this.carData.seriesCode = res.seriesCode
                _this.carData.modelCode = res.modelCode
                _this.carData.carCode = res.carCode
            },
            // 获取账号类型
            getUserType() {
                let userInfo = JSON.parse(common.getSession('userInfo'))
                api.getUserAvailableInfo(msg => {
                    if(msg.data.message === "success") {
                        this.userType = msg.data.obj.availableType
                        this.addParams.orgCode = userInfo.inCharegSubOrgVo.orgCode
                        this.addParams.orgName = userInfo.inCharegSubOrgVo.orgName
                        this.getEditData()
                    }
                })
            },
            // 取消行为
            cancel() {
                this.$router.push({
                    path: `/salesAdmin/query`
                })
            },
            // 设置新增工作流节点参数
            add() {
                const _this = this
                let obj = {}
                obj.nodeCode = ''
                obj.nodeName = ''
                // obj.framework = ''
                obj.orglist = []
                obj.postTypeCode = ''
                obj.maxValue = ''
                obj.minValue = ''
                obj.orgName = ''
                obj.orgCode = ''
                obj.wfCode = _this.addParams.wfCode
                obj.typeslist = []
                // obj.orgCode = _this.orgCode
                const params1 = {
                    'serviceCode': config.workFlow.serviceCode.node
                }
                api.ordinalInfo.getSequence(params1, function(res) {
                    if (res.data.code === 'success') {
                        obj.nodeCode = res.data.obj
                        obj.orgShow = false
                        const optionOne = {
                            refCode: config.workFlow.typePosition
                        }
                        api.ref.getDataDictionarys(optionOne, function(res) {
                            let array = res.data.obj.referenceDetailInfos
                            for (var i = 0; i < array.length; i++) {
                                let objtemp = {}
                                objtemp.text = array[i].refDetailName
                                objtemp.value = array[i].refDetailCode
                                obj.typeslist.push(objtemp)
                            }
                            _this.items.push(obj)
                        })
                        // })
                    }
                })
            },
            // 节点删除
            remove(index) {
                const _this = this
                _this.items.splice(index, 1)
            },
            // 审批流节点信息
            saveApprove() {
                const _this = this
                // 编辑状态下提交节点信息
                if (_this.tempCode) {
                    let tempArr = JSON.parse(JSON.stringify(_this.items))
                    tempArr.unshift(_this.firstLine)
                    _this.tempItems = JSON.parse(JSON.stringify(tempArr))
                    let option = JSON.parse(JSON.stringify(tempArr))
                    if(this.addParams.approvalCriteriaType) {
                      // if(this.addParams.approvalCriteriaType !== '让利率') {
                        for(let i =0; i<option.length; i++) {
                            if(option[i].nodeName === '' || option[i].maxValue === '' || option[i].minValue === '' || option[i].postTypeCode === '' || option.orgCode === '') {
                                Message({
                                    type: 'info',
                                    message: config.salesAdmintips.nodeTips
                                })
                                return;
                            }
                        }
                      // }
                    }else {
                        for(let i =0; i<option.length; i++) {
                            if(option[i].nodeName === '' || option[i].postTypeCode === '' || option.orgCode === '') {
                                Message({
                                    type: 'info',
                                    message: config.salesAdmintips.nodeTips
                                })
                                return;
                            }
                        }
                    }
                    option.forEach(function(element) {
                        element.wfCode = _this.addParams.wfCode
                        element.minValue = element.minValue/100
                        element.maxValue = element.maxValue/100
                        delete element.orglist
                        delete element.typeslist
                        delete element.orgShow
                        // element.id = _this.id
                    }, this)
                    api.workFlow.addWorkFlowNode(option, function(res) {
                        if (res.data.code === 'success') {
                            _this.nodeSave = false
                            _this.isSave = true
                            Message({
                                type: 'success',
                                message: config.messInfo.success
                            })
                        }
                    })
                } else {
                    // 新增状态下提交节点信息
                    let tempArr = JSON.parse(JSON.stringify(_this.items))
                    _this.firstLine.wfCode = _this.addParams.wfCode
                    tempArr.unshift(_this.firstLine)
                    // _this.items.unshift(_this.firstLine)
                    _this.tempItems = JSON.parse(JSON.stringify(tempArr))
                    // let option = JSON.parse(JSON.stringify(_this.items))
                    let option = JSON.parse(JSON.stringify(tempArr))
                    if(this.addParams.approvalCriteriaType) {
                        for(let i =0; i<option.length; i++) {
                            if(option[i].nodeName === '' || option[i].maxValue === '' || option[i].minValue === '' || option[i].postTypeCode === '' || option.orgCode === '' ) {
                                Message({
                                    type: 'info',
                                    message: config.salesAdmintips.nodeTips
                                })
                                // _this.items.splice(0, 1)
                                return;
                            }
                        }
                    }else {
                        for(let i =0; i<option.length; i++) {
                            if(option[i].nodeName === '' || option[i].postTypeCode === '' || option.orgCode === '' ) {
                                Message({
                                    type: 'info',
                                    message: config.salesAdmintips.nodeTips
                                })
                                // _this.items.splice(0, 1)
                                return;
                            }
                        }
                    }
                    option.forEach(function(element) {
                        element.minValue = element.minValue/100
                        element.maxValue = element.maxValue/100
                        delete element.orglist
                        delete element.typeslist
                        delete element.orgShow
                    }, this)
                    // debugger;
                    api.workFlow.addWorkFlowNode(option, function(res) {
                        if (res.data.code === 'success') {
                            _this.nodeSave = false
                            _this.isSave = true
                            Message({
                                type: 'success',
                                message: config.messInfo.success
                            });
                        }
                    })
                }
            },
            // 创建主表信息
            build() {
                const _this = this
                const option = {
                    wfCode: _this.addParams.wfCode,
                    wfName: _this.addParams.wfName,
                    wfTypeCode: _this.addParams.wfTypeCode,
                    orgCode: _this.addParams.orgCode,
                    carModelCode: _this.carObj.modelCode,
                    carFactoryCode: _this.carObj.factoryCode,
                    carSeriesCode: _this.carObj.seriesCode,
                    carBrandCode: _this.carObj.brandCode,
                    carCode: _this.carObj.carCode,
                    onOffFlag: _this.addParams.onOffFlag,
                    maxValue: (_this.addParams.maxValue - 0)/100,
                    minValue: (_this.addParams.minValue -0)/100,
                    approvalCriteriaType: _this.addParams.approvalCriteriaType
                }
                api.workFlow.addWorkFlow(option, function(res) {
                    if (res.data.code === 'success') {
                        _this.isShowApprove = true
                        _this.showIsOrNo = false
                        _this.showOnOffFlag = true
                        _this.$refs.car.setDisabled = true;
                        _this.$refs.car.setValue(_this.carData)
                        _this.$refs.car.setDisabled = true;
                        Message({
                            type: 'success',
                            message: config.messInfo.success
                        })
                    }
                })
            },
            // 更新保存审批流的信息(主表信息)
            save() {
                const _this = this
                const option = {
                    id: _this.id,
                    wfCode: _this.addParams.wfCode,
                    wfName: _this.addParams.wfName,
                    wfTypeCode: _this.addParams.wfTypeCode,
                    orgCode: _this.addParams.orgCode,
                    carModelCode: _this.carObj.modelCode,
                    carFactoryCode: _this.carObj.factoryCode,
                    carSeriesCode: _this.carObj.seriesCode,
                    carBrandCode: _this.carObj.brandCode,
                    carCode: _this.carObj.carCode,
                    onOffFlag: _this.addParams.onOffFlag,
                    maxValue: (_this.addParams.maxValue - 0)/100,
                    minValue: (_this.addParams.minValue -0)/100,
                    approvalCriteriaType: _this.addParams.approvalCriteriaType
                }
                api.workFlow.updataWorkFlow(option, function(res) {
                    if (res.data.code === 'success') {
                        _this.showIsOrNo = false
                        _this.showOnOffFlag = true
                        _this.$refs.car && (_this.$refs.car.setDisabled = true);
                        let objOne = res.data.obj
                        console.log(objOne,1111);
                        _this.carData.factoryCode = objOne.carFactoryCode
                        _this.carData.brandCode = objOne.carBrandCode
                        _this.carData.seriesCode = objOne.carSeriesCode
                        _this.carData.modelCode = objOne.carModelCode
                        _this.carData.carCode = objOne.carCode
                        Message({
                            type: 'success',
                            message: config.messInfo.success
                        })
                        if(option.onOffFlag == '1') {
                            _this.disabled = true
                        } else {
                            _this.disabled = false
                        }
                        _this.$router.go(-1);  //返回之前页面
                        // 调用查询接口
                        _this.getTableList({
                            pageNums: config.pageNums,
                            pageStart: _this.pageStart,
                            approvalCriteriaType: '',
                            carBrandCode: '',
                            carFactoryCode: '',
                            carModelCode: '',
                            carSeriesCode: '',
                            carCode: '',
                            wfTypeCode: '',
                            orgCode: '',
                            onOffFlag: '',
                            wfName: '',
                            orgCode: _this.addParams.orgCode
                        })
                    }
                })
            },
            // 拿到编辑的内容(主表)
            getEditData() {

                const _this = this
                const obj = _this.$route.params

                if (obj.index) {
                    _this.tempCode = obj.index
                    let option = {
                        wfCode: _this.tempCode
                    }
                    api.workFlow.queryAccordingToCode(option, function(res) {
                        if(res.data.code === 'success') {

                            if (!res.data.obj.length) return
                            let objOne = res.data.obj[0]
                            _this.addParams.wfTypeCode = objOne.wfTypeCode
                            // _this.addParams.storeCode = objOne.storeCode
                            _this.addParams.orgName = objOne.orgName
                            _this.addParams.orgCode = objOne.orgCode

                            _this.$nextTick(() => { _this.addParams.onOffFlag = objOne.onOffFlag })

                            // _this.addParams.maxValue = objOne.maxValue*100
                            _this.addParams.maxValue = common.dealNumberWithPoint(objOne.maxValue)
                            _this.addParams.minValue = common.dealNumberWithPoint(objOne.minValue)
                            // _this.addParams.minValue = objOne.minValue*100
                            _this.addParams.wfCode = objOne.wfCode
                            _this.addParams.wfTypeName = objOne.wfTypeName
                            _this.id = objOne.id
                            _this.addParams.wfName = objOne.wfName
                            _this.addParams.approvalCriteriaType = objOne.approvalCriteriaType
                            _this.carData.factoryCode = objOne.carFactoryCode
                            _this.carData.brandCode = objOne.carBrandCode
                            _this.carData.seriesCode = objOne.carSeriesCode
                            _this.carData.modelCode = objOne.carModelCode
                            _this.carData.carCode = objOne.carCode
                            _this.$refs.car.setDisabled = true;
                            if(objOne.onOffFlag == 1) _this.disabled = true
                            else _this.disabled = false
                        }
                    })
                    // 主表更新后  拿到节点的内容
                    api.workFlow.queryNodesByCode(option, function(res) {
                        if (res.data.code === 'success') {
                            let array = res.data.obj
                            if (res.data.obj.length === 0) {
                                _this.isShowApprove = true
                                const params1 = {
                                    'serviceCode': config.workFlow.serviceCode.node
                                }
                                api.ordinalInfo.getSequence(params1, function(res) {
                                    if (res.data.code === 'success') {
                                        _this.firstLine.nodeCode = res.data.obj
                                    }
                                })
                                const optionOne = {
                                    refCode: config.workFlow.typePosition
                                }

                                api.ref.getDataDictionarys(optionOne, function(res) {
                                    let array = res.data.obj.referenceDetailInfos

                                    _this.firstLine.typeslist = []
                                    for (var i = 0; i < array.length; i++) {
                                        let obj = {}
                                        obj.text = array[i].refDetailName
                                        obj.value = array[i].refDetailCode
                                        _this.firstLine.typeslist.push(obj)
                                    }
                                })
                            } else {
                                _this.isShowApprove = true
                                // debugger;
                                for(let i = 0;i<array.length; i++) {
                                    if(array[i].nodeOrder === 1) {
                                        // _this.firstLine = array[i]
                                        _this.firstLine.nodeCode = array[i].nodeCode
                                        _this.firstLine.nodeName = array[i].nodeName
                                        _this.firstLine.orgName = array[i].orgName
                                        _this.firstLine.orgCode = array[i].orgCode
                                        _this.firstLine.postTypeCode = array[i].postTypeCode
                                        // 浮点型存储问题处理
                                        _this.firstLine.maxValue = common.dealNumberWithPoint(array[i].maxValue)
                                        _this.firstLine.minValue = common.dealNumberWithPoint(array[i].minValue)
                                        array.splice(i, 1)
                                        break;
                                    }
                                }
                                if(array.length > 0) {
                                    array.sort(function(a, b){
                                        return a.nodeOrder - b.nodeOrder
                                    })
                                }
                                array.forEach(function(element){
                                    let obj = {}
                                    obj.nodeCode = element.nodeCode
                                    obj.nodeName = element.nodeName
                                    obj.orgName = element.orgName
                                    obj.orgCode = element.orgCode
                                    obj.postTypeCode = element.postTypeCode
                                    // obj.maxValue = element.maxValue*100
                                    obj.maxValue = common.dealNumberWithPoint(element.maxValue)
                                    obj.minValue = common.dealNumberWithPoint(element.minValue)
                                    // obj.minValue = element.minValue*100
                                    _this.items.push(obj)
                                })
                                const optionOne = {
                                    refCode: config.workFlow.typePosition
                                }
                                api.ref.getDataDictionarys(optionOne, function(res) {
                                    let array = res.data.obj.referenceDetailInfos
                                    _this.firstLine.typeslist = []
                                    for (var i = 0; i < array.length; i++) {
                                        let obj = {}
                                        obj.text = array[i].refDetailName
                                        obj.value = array[i].refDetailCode
                                        _this.firstLine.typeslist.push(obj)
                                    }
                                    _this.items.forEach(element => {
                                        element.typeslist = _this.firstLine.typeslist
                                    })
                                })
                            }
                        }
                    })
                } else {
                    _this.$data.showOnOffFlag = true
                }
            },
            // 获取组织编码
            getOrgCode() {
                const _this = this
                let obj = JSON.parse(sessionStorage.getItem("userInfo"))
                // 获取审批类型
                const option = {
                    refCode: config.workFlow.approveType
                }
                api.ref.getDataDictionarys(option, function(res) {
                    if (res.data.code === 'success') {
                        let array = res.data.obj.referenceDetailInfos
                        _this.typelist = []
                        for (var i = 0; i < array.length; i++) {
                            let obj = { disabled: true }
                            obj.text = array[i].refDetailName
                            obj.value = array[i].refDetailCode
                            _this.typelist.push(obj)
                        }
                    }
                })
            },
            // 根据工作流业务编码查询主表信息
            getDataAccordingToCode() {
                const _this = this
                const obj = _this.$route.params
                if (!obj.index) {
                    const params1 = {
                        'serviceCode': config.workFlow.serviceCode.main
                    }
                    api.ordinalInfo.getSequence(params1, function(res) {
                        if (res.data.code === 'success') {
                            _this.addParams.wfCode = res.data.obj
                            _this.getNodeCodeFirst()
                        }
                    })
                }
            },
            // 获取审批类型
            getApproveType() {
                const _this = this
                const option = {
                    refCode: config.workFlow.approveType
                }
                if (_this.typelist.length === 0) {
                    api.ref.getDataDictionarys(option, function(res) {
                        if (res.data.code === 'success') {
                            let array = res.data.obj.referenceDetailInfos
                            _this.typelist = []
                            for (var i = 0; i < array.length; i++) {
                                let obj = {}
                                obj.text = array[i].refDetailName
                                obj.value = array[i].refDetailCode
                                _this.typelist.push(obj)
                            }
                        }
                    })
                } else {
                    return
                }
            },
            // 获取节点流的nodeCode 和组织类型以及岗位编码
            getNodeCodeFirst() {
                const _this = this
                const params1 = {
                    'serviceCode': config.workFlow.serviceCode.node
                }
                const optionOne = {
                    refCode: config.workFlow.typePosition
                }
                api.ordinalInfo.getSequence(params1, function(res) {
                    if (res.data.code === 'success') {
                        _this.firstLine.nodeCode = res.data.obj
                    }
                })
                api.ref.getDataDictionarys(optionOne, function(res) {
                    let array = res.data.obj.referenceDetailInfos
                    for (var i = 0; i < array.length; i++) {
                        let obj = {}
                        obj.text = array[i].refDetailName
                        obj.value = array[i].refDetailCode
                        _this.firstLine.typeslist.push(obj)
                    }
                })
            },
            // 获取岗位类型 和  组织架构
            getNeedData() {
                const _this = this
                let objOne = []
                const optionOne = {
                    refCode: config.workFlow.typePosition
                }
                let objTwo = []
                api.ref.getDataDictionarys(optionOne, function(res) {

                    let array = res.data.obj.referenceDetailInfos
                    for (var i = 0; i < array.length; i++) {
                        let objtemp = {}
                        objtemp.text = array[i].refDetailName
                        objtemp.value = array[i].refDetailCode
                        objTwo.push(objtemp)
                    }
                    _this.tempData.typeslist = objTwo
                    _this.addParams.typeslist = objTwo
                    _this.tempData.orglist = objOne
                })
            }
        },
        // watch:{
        //     'addParams.approvalCriteriaType'(oldVal){
        //         if(oldVal != '0') {
        //             console.log(this.typelist)
        //             this.typelist.forEach(v=>{
        //                 if(v.value == 'WorkFlowTypeOrderUpdate'){
        //                     v.disabled = true
        //                     this.$set()
        //                 }
        //             })
        //             // disabled: true
        //             // let index = this.typelist.findIndex(item =>{
        //             //     return item.value == 'WorkFlowTypeOrderUpdate'
        //             // })
        //             // this.typelist.splice(index,1)
        //         }
        //     },
        // },
        computed: {
            editBtn() {
                return hasBtn(apiUrls.workFlow.updataWorkFlow)
            },

            ...mapState('salesAdmin', [
                'tablelist',
                'pager'
            ])
        },
        created() {
            const _this = this
            _this.judgeFlag = config.isShowFactory
            _this.approvelist = config.salesGpOrSnp
            _this.getUserType()
            _this.getNeedData()
            _this.getDataAccordingToCode()
            _this.getApproveType()
        },
        mounted() {
            window.vue = this
        },
        updated() {
            const _this = this
            if(_this.isshow) {
                _this.$refs.car.setValue(_this.carData)
            }
        }
    }
</script>
<style scoped>
    .select-tree {
        position: absolute;
        margin-top: 6px;
        width: 100%;
        z-index: 1000;
    }
    .el-tree {
        max-height: 300px;
        overflow-y: scroll;
    }
</style>
