<template>
    <div class="animated fadeIn">
        <b-card>
            <template slot="header">
                当前节点:
            </template>
            <div class="row">
                <div class="col-md-3 col-lg-4">
                    <b-card class="card-container">
                        <template slot="header">
                            {{ rootName }}
                        </template>
                        <div class="row">
                            <div class="col-md-12 table-container">
                                <tree :data="treeData" :props="propOption" :load="loadNode" lazy accordion check-strictly @node-click="handleNodeClick" @node-expand="expandClick">
                                </tree>
                            </div>
                        </div>
                    </b-card>
                </div> 
                <div class="col-md-3 col-lg-4">
                    <b-card class="card-container">
                        <template slot="header">
                            {{ nodeName }}
                        </template>
                        <div class="row">
                            <div class="col-md-12 input-fixed">
                                <b-form-input v-if="apiUrl" v-model.trim="codeOrName" @change="findNodeValue"></b-form-input>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12 table-container">     
                                <table class="table table-hover table-clear">
                                    <tbody>
                                        <tr v-for="(node, index) in nodeList" @click="chooseNode(node)">
                                            <td>
                                                {{node.name}}{{'('+ node.code + ')'}}
                                            </td>    
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </b-card>
                </div> 
                <div class="col-md-3 col-lg-4">
                    <b-card class="card-container">
                        <template slot="header">
                            GP配置
                        </template>
                        <div class="row">
                            <div class="col-md-12">
                                <b-form-input v-model.trim="gpName" @change="findGpvalue"></b-form-input>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12 table-container">
                                <table class="table table-hover table-clear">
                                    <tbody>
                                        <tr v-for="(gp, index) in gpList" @click="chooseGp(gp)">
                                            <td>
                                                {{ gp.refDetailName }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </b-card>
                </div> 
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="goBack">取消</b-button>
                        <b-button size="sm" variant="primary" @click="editGpConfig">确定</b-button>
                    </div>
                </div>    
            </div>
        </b-card>    
    </div>
</template>
<script>
    import config from "common/config";
    import api from "common/api";
    import {
        mapState
    } from "vuex";
    import {
        MessageBox,
        Message,
        Tree
    } from "element-ui";
    export default {
        mounted() {
            let _this = this
            if (!_this.isUpdate) {
                _this.$store.dispatch("financing/getCode", {
                    poros: {
                        serviceCode: config.financing.gpbelonging
                    },
                    callBack: function(msg) {
                        if (msg.data.code == "success") {}
                    }
                })
            } else {
                api.GPbelonging
                   .getGpConfigDetailInfo({ 
                       gpConfigDetailCode: _this.$route.params.detailCode
                   }, (res) => {
                       if (res.data.code === 'success') {
                           _this.$data.nodeCode = res.data.obj.businessCode
                           _this.$data.codeOrName = res.data.obj.businessName
                           _this.$data.nodeName = res.data.obj.businessName
                           _this.$data.gpName = res.data.obj.gpConverName
                           _this.$data.gpCode = res.data.obj.gpConverCode
                           _this.$data.id = res.data.obj.id 
                       } 
                   })
            }
        },
        data: function() {
            return {
                treeData: [],
                propOption: {
                    rootName: '',
                    children: 'children',
                    label: 'refDetailName'
                },
                id: '',
                rootName: '',
                nodeName: '',
                nodeCode: '',
                gpName: '',
                gpCode: '',
                gpList: [],
                codeOrName: '',
                apiUrl: '',
                nodeList: []
            }
        },
        computed: {
            isUpdate: function() {
                let detailCode = this.$route.params.detailCode
                if (detailCode) {
                    return true
                } else {
                    return false
                }
            },
            ...mapState("financing", [
                "gpDetail",
                "gpbelongingCode",
                "detailSelect"
            ])
        },
        methods: {
            goBack: function() {
                this.$router.go(-1)
            },
            // 加载子树数据
            loadNode(node, resolve) {
                let _this = this
                if (node.level === 0) {
                    api.ref
                        .getDataDictionarys({
                            refCode: config.ref.accountType
                        }, (res) => {
                            if (res.data.code === 'success') {
                                let arr = [{
                                    refDetailName: res.data.obj.refName,
                                    refDetailCode: res.data.obj.refCode,
                                }]
                                _this.rootName = res.data.obj.refName
                                resolve(arr)
                            }
                        })
                } else if (node.level === 1) {
                    api.ref
                        .queryFirstLevelReferenceDetails({
                            refCode: config.ref.accountType,
                            displayType: 1
                        }, (res) => {
                            if (res.data.code === 'success') {
                                if (res.data.obj) {
                                    let refDetailSubInfo = res.data.obj
                                    if (refDetailSubInfo != null) {
                                        resolve(refDetailSubInfo)
                                    } else {
                                        resolve([])
                                    }
                                }
                            }
                        })
                } else {
                    api.ref
                        .queryNextReferenceDetails({
                            refCode: node.data.refCode,
                            refDetailCode: node.data.refDetailCode
                        }, (res) => {
                            if (res.data.code === 'success') {
                                if (res.data.obj) {
                                    let refDetailSubInfo = res.data.obj
                                    if (refDetailSubInfo != null) {
                                        resolve(refDetailSubInfo)
                                    } else {
                                        resolve([])
                                    }
                                }
                            }
                        })
                }
            },
            // 节点展开事件
            expandClick() {
            },
            // 节点点击事件
            handleNodeClick(data) {
                let _this = this
                _this.$data.nodeName = data.refDetailName
                _this.$data.apiUrl = data.refDetailValue
                _this.nodeList = []
                _this.$data.codeOrName = ''
                if (!_this.$data.apiUrl) {
                    _this.$data.codeOrName = data.refDetailName
                    _this.$data.nodeCode = data.refDetailCode
                }
            },
            findNodeValue() {
                let _this = this
                api.dynamicAllocation
                    .api(_this.$data.apiUrl, {
                        pageStart: 1,
                        pageNums: config.maxPageNums,
                        codeOrName: _this.$data.codeOrName
                    }, (res) => {
                        if (res.data.code === 'success') {
                            _this.nodeList = []
                            _this.nodeList = res.data.obj.list
                        }
                    })
            },
            findGpvalue() {
                let _this = this
                api.ref
                    .queryDictionaryDetails({
                        pageStart: 1,
                        pageNums: config.maxPageNums,
                        refCode: config.ref.gpconfig,
                        refDetailName: _this.gpName
                    }).then((res) => {
                        if (res.data.code === 'success') {
                            _this.gpList = []
                            _this.gpList = res.data.obj.list
                        }
                    })
            },
            chooseNode: function(item) {
                let _this = this
                _this.$data.codeOrName = item.name
                _this.$data.nodeCode = item.code
            },
            chooseGp: function(item) {
                let _this = this
                _this.$data.gpName = item.refDetailName
                _this.$data.gpCode = item.refDetailCode
            },
            addGpConfig: function() {
                let _this = this
                let params = {
                    gpConfigDetailCode: _this.gpbelongingCode,
                    gpConfigCode: "GPCONFIGBASE",
                    gpDetailTypeCode: config.ref.accountType,
                    businessCode: _this.$data.nodeCode,
                    businessName: _this.$data.codeOrName,
                    gpConverCode: _this.$data.gpCode,
                    gpConverName: _this.$data.gpName
                }
                if (!params.businessCode) {
                    Message({
                        type: "info",
                        message: '明细不能为空'
                    })
                    return
                }
                if (!params.gpConverCode) {
                    Message({
                        type: "info",
                        message: 'GP归属不能为空'
                    })
                    return
                }
                api.GPbelonging
                    .addDetail(params, (res) => {
                        if (res.data.code === 'success') {
                            _this.goBack()
                        }
                    })
            },
            updateGpConfig: function() {
                let _this = this
                let params = {
                    id: _this.$data.id,
                    gpConfigDetailCode: _this.$route.params.detailCode,
                    gpConfigCode: "GPCONFIGBASE",
                    gpDetailTypeCode: config.ref.accountType,
                    businessCode: _this.$data.nodeCode,
                    businessName: _this.$data.codeOrName,
                    gpConverCode: _this.$data.gpCode,
                    gpConverName: _this.$data.gpName
                }
                if (!params.businessCode) {
                    Message({
                        type: "info",
                        message: '明细不能为空'
                    })
                    return
                }
                if (!params.gpConverCode) {
                    Message({
                        type: "info",
                        message: 'GP归属不能为空'
                    })
                    return
                } 
                api.GPbelonging
                    .editDetail(params, (res) => {
                        if (res.data.code === 'success') {
                            _this.goBack()
                        }
                    })
            },
            editGpConfig: function() {
                let _this = this
                if (_this.isUpdate) {
                    _this.updateGpConfig()
                } else {
                    _this.addGpConfig()
                }
            }
        },
        components: {
            Tree
        }
    }
</script>
<style lang="scss" scoped>
    .card-container .card-body {
        height: 450px;
    }
    .table-container {
        height: 370px;
        overflow-y: scroll;
    }
</style>