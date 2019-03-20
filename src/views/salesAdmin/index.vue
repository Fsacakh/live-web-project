<template>
    <div class="animated fadeIn">
        <b-card>
            <div class="row">
                <div class="col-md-6 fatherPosition">
                    <b-form-fieldset horizontal label="组织架构" :label-cols="4" class="text-right">
                        <div @click="orgClick" ref="org">
                            <b-form-input v-model="approve.orgName" readonly/>
                        </div>
                        <div class="text-left specialPosition select-tree" v-show="orgShow">
                            <el-tree :data="orgTreeData" :props="orgOptions" :load="orgLoad" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="false" @node-click="orgItemClick">
                            </el-tree>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="是否上架" :label-cols="4" class="text-right">
                        <!-- <b-form-input v-model="approve.onOffFlag"/> -->
                        <b-form-select v-model="approve.onOffFlag" :options="isOrlist"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <!-- <div class="col-md-6">
                    <b-form-fieldset horizontal label="审核指标" :label-cols="4" class="text-right">
                        <b-form-input v-model="approve.approvalCriteriaType"/>
                    </b-form-fieldset>
                </div> -->
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="审批类型" :label-cols="4" class="text-right">
                        <b-form-select v-model="approve.wfTypeCode" :options="typelist"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <car ref="car" :col="2" @callBack="callBack"></car>
            <searchbtn @reset="reset" @query="query(1)"></searchbtn>
        </b-card>
         <b-card>
            <div class="row">
                <div class="col-md-12">
                    <b-button v-if="addBtn" size="sm" variant="success" @click="add">新建</b-button>
                    <b-button size="sm" variant="primary" @click="edit">编辑</b-button>
                    <b-button v-if="syncBtn" size="sm" variant="warning" class="pull-right" @click="init">同步数据</b-button>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="tablelist" :fields="fields">
                    <template slot="index" slot-scope="data">
                        <div @click="setIndex(data.index)">
                            <input type="radio" name="radio" />
                        </div>
                    </template>
                    <!-- <template slot="workFlow" slot-scope="data">
                        {{ data.item.wfName }}
                    </template> -->
                    <template slot="factoryName" slot-scope="data">
                        {{ data.item.carFactoryName }}
                    </template>
                    <template slot="brand" slot-scope="data">
                        {{ data.item.carBrandName }}
                    </template>
                    <template slot="carStyle" slot-scope="data">
                        {{ data.item.carModelName }}
                    </template>
                    <template slot="carSeries" slot-scope="data">
                        {{ data.item.carSeriesName }}
                    </template>
                    <template slot="carFee" slot-scope="data">
                        {{ data.item.carDisplayName }}
                    </template>
                    <template slot="approveStyle" slot-scope="data">
                        {{ data.item.wfTypeName }}
                    </template>
                    <template slot="store" slot-scope="data">
                        {{ data.item.orgName }}
                    </template>
                    <template slot="time" slot-scope="data">
                        {{ data.item.createTimeStr }}
                    </template>
                    <template slot="isOn" slot-scope="data">
                        {{ data.item.onOffFlag == 0 || data.item.onOffFlag == -1 ? '否' : '是' }}
                        <!-- <b-button v-if="data.item.onOffFlag === 0" size="sm" variant="success" @click="changeState(data.item.onOffFlag, data.item.id, data.item.isDeleted)">启用</b-button>
                        <b-button v-if="data.item.onOffFlag === 1" size="sm" variant="danger" @click="changeState(data.item.onOffFlag, data.item.id, data.item.isDeleted)">停用</b-button> -->
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <div class="row mt-2">
                <div class="col-md-12">
                    <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total" :total-pages="pager.totalPages">
                    </pagination>
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
    import areaqueryshop from 'components/iris-areaqueryshop/'
    import Searchbtn from 'components/searchBtn/searchBtn'
    import api from 'common/api'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import config from 'common/config'
    import common from 'common/common'
    import car from 'components/iris-car/'
    import pagination from '../../components/pagination/pagination'
    import { MessageBox, Message, Tree, DatePicker } from 'element-ui'
    import Vue from 'vue'
    Vue.use(Tree)
    Vue.use(DatePicker)
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        components: {
            Searchbtn,
            areaqueryshop,
            car,
            pagination
        },
        data() {
            return {
                approve: {
                    wfTypeCode: '',
                    approvalCriteriaType: '',
                    storeCode: '',
                    onOffFlag: '',
                    wfName: '',
                    orgCode: '',
                    orgName: ''
                },
                orgTreeData: [],
                orgOptions: {
                    children: 'children',
                    label: 'name'
                },
                fields: {
                    index: {
                        label: '   '
                    },
                    // workFlow: {
                    //     label: '工作流名称'
                    // },
                    factoryName: {
                        label: '厂家'
                    },
                    brand: {
                        label: '品牌'
                    },
                    carSeries: {
                        label: '车系'
                    },
                    carStyle: {
                        label: '车型'
                    },
                    carFee: {
                        label: '车款'
                    },
                    approveStyle: {
                        label: '审批类型'
                    },
                    store: {
                        label: '门店'
                    },
                    time: {
                        label: '创建日期'
                    },
                    isOn: {
                        label: '是否上架'
                    }
                },
                isforbidden: false,
                storeShow: false,
                typelist: [],
                carObj: {},
                pageStart: 1,
                index: '',
                isOrlist: [],
                orgShow: false,
                judgeFlag: true,
                userType: ''
            }
        },
        computed: {
            addBtn() {
                return hasBtn(apiUrls.workFlow.addWorkFlow)
            },
            editBtn() {
                return hasBtn(apiUrls.workFlow.updataWorkFlow)
            },
            syncBtn() {
                return hasBtn(apiUrls.workFlow.init)
            },
            ...mapState('salesAdmin',[
                'tablelist',
                'pager'
            ])
        },
        methods: {
            ...mapActions('salesAdmin', [
               'getTableList'
            ]),
            init() {
                api.workFlow.init(function(res){
                    if (res.data.code === 'success') {
                        Message({
                            type: 'success',
                            message: "操作成功"
                        })
                    }
                })
            },
            orgClick() {
                this.orgShow = !this.orgShow
            },
            orgItemClick(data) {
                this.approve.orgCode = data.code
                this.approve.orgName = data.name
                this.orgShow = false
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
            // 设置标识
            setIndex(index){
                this.index = index
            },
            // 设置组件的回调函数  拿值
            callBack(res) {
                const _this = this
                _this.carObj = res
            },
            // 重置
            reset() {
                const _this = this
                _this.approve.wfTypeCode = ''
                _this.approve.approvalCriteriaType = ''
                _this.approve.storeCode = ''
                _this.approve.onOffFlag = ''
                _this.approve.orgName = ''
                _this.approve.orgCode = ''
                _this.$refs.car.clear()
                _this.getUserType()
            },
            query(judge) {
                if(judge === 1) {
                    const _this = this
                    const option = {
                        pageNums: config.pageNums,
                        pageStart: 1,
                        approvalCriteriaType: _this.approve.approvalCriteriaType,
                        carBrandCode: _this.carObj.brandCode,
                        carFactoryCode: _this.carObj.factoryCode,
                        carModelCode: _this.carObj.modelCode,
                        carSeriesCode: _this.carObj.seriesCode,
                        carCode: _this.carObj.carCode,
                        wfTypeCode: _this.approve.wfTypeCode,
                        orgCode: _this.approve.orgCode,
                        onOffFlag: _this.approve.onOffFlag,
                        wfName: _this.approve.wfName
                    }
                    _this.getTableList(option)
                }else {
                    const _this = this
                    const option = {
                        pageNums: config.pageNums,
                        pageStart: _this.pageStart,
                        approvalCriteriaType: _this.approve.approvalCriteriaType,
                        carBrandCode: _this.carObj.brandCode,
                        carFactoryCode: _this.carObj.factoryCode,
                        carModelCode: _this.carObj.modelCode,
                        carSeriesCode: _this.carObj.seriesCode,
                        carCode: _this.carObj.carCode,
                        wfTypeCode: _this.approve.wfTypeCode,
                        orgCode: _this.approve.orgCode,
                        onOffFlag: _this.approve.onOffFlag,
                        wfName: _this.approve.wfName
                    }
                    _this.getTableList(option)
                }

            },
            selectedfun(arg1, arg2) {
                const _this = this
                _this.approve.storeCode = arg2.value
            },
            // 查询审批类型
            getApproveType() {
                const _this = this;
                const option = {
                    refCode: config.workFlow.approveType
                }
                if(_this.typelist.length === 0) {
                    api.ref.getDataDictionarys(option, function(res) {
                        if(res.data.code === 'success') {
                            let array = res.data.obj.referenceDetailInfos
                            _this.typelist = []
                            for(var i = 0; i<array.length; i++) {
                                let obj = {}
                                obj.text = array[i].refDetailName
                                obj.value = array[i].refDetailCode
                                _this.typelist.push(obj)
                            }
                        }
                    })
                }else {
                    return
                }
            },
            // 编辑
            edit() {
                const _this = this
                const index = _this.index
                if(index === '') {
                    Message({
                        type: 'info',
                        message: '请选择编辑项'
                    })
                }else {
                    const code = _this.tablelist[index].wfCode
                    this.$router.push({
                        path : `/salesAdmin/edit/${code}`
                    })
                }
            },
            // 新增
            add() {
                const _this = this
                this.$router.push({
                    path : `/salesAdmin/add`
                })
            },
            pageChange(num, pageSize) {
                const _this = this
                _this.pageStart = num
                _this.query()
            },
            // 获取账号类型
            getUserType() {
                let userInfo = JSON.parse(common.getSession('userInfo'))
                api.getUserAvailableInfo(msg => {
                    if(msg.data.message === "success") {
                        this.userType = msg.data.obj.availableType
                        this.approve.orgCode = userInfo.inCharegSubOrgVo.orgCode
                        this.approve.orgName = userInfo.inCharegSubOrgVo.orgName
                    }
                })
            }
        },
        created() {
            this.getUserType()
        },
        mounted() {
            const _this = this
            _this.judgeFlag = config.isShowFactory
            _this.isOrlist = config.salesAdminList
            _this.getApproveType()
        }
    }
</script>
<style>
    .specialPosition {
        position: absolute;
        z-index: 999999;
        width: 96%;
        left: 2%;
    }
    .fatherPosition {
        position: relative;
    }
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

