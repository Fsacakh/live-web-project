<template>
    <div class="animated fadeIn">
        <b-card header="基本信息">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品名称" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.skuName" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品品牌" :label-cols="4" class="text-right">
                        <div class="text-left" @click="unitType=true">
                            <selects :disabled="true" ref='brandName' URL="brandUrl" option="brandName" optionCode='brandCode' @itemValue="getValue">
                            </selects>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="产地" :label-cols="4" class="text-right">
                        <div class="text-left" @click="unitType=true">
                            <selects :disabled="true" ref='skuAreaName' URL="skuAreaUrl" option="skuAreaName" optionCode='skuAreaCode' @itemValue="getValue">
                            </selects>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="包装" :label-cols="4" class="text-right">
                        <div class="text-left" @click="unitType=true">
                            <selects :disabled="true" ref='packName' URL="packUrl" option="packName" optionCode='packCode' @itemValue="getValue">
                            </selects>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="目录" :label-cols="4" class="text-right">
                        <input class="form-control" v-model="catlogName" :disabled="true" @click="$showHide" />
                        <div v-show="showHide1" class="text-left" style="position:absolute; z-index: 33;width:100%; height: 300px; overflow: auto;">
                            <el-tree :data="treeData" :props="propOption1" :load="loadNode1" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="hasExpandClick" @node-click="handleNodeClick1">
                            </el-tree>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="分类" :label-cols="4" class="text-right">
                        <input class="form-control" v-model="categoryName" :disabled="true" @click="EshowHide" />
                        <div v-show="showHide" class="text-left" style="position:absolute; z-index: 33; width:100%; height: 300px; overflow: auto;">
                            <el-tree :data="treeData" :props="propOption" :load="loadNode" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="hasExpandClick" @node-click="handleNodeClick" @node-expand="expandClick">
                            </el-tree>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="备件代码" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.originalCode" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="外部编码" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.externalCode" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="69码" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.barCode" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="是否适配车型" :label-cols="4" class="text-right">
                        <select class="form-control" v-model="edit.matchCarFlag" :disabled="true">
                                    <option  v-for="(item, index) in matchCarFlag" :value="item.value" :key="index">{{item.text}}</option>
                                </select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="是否仓库盘点" :label-cols="4" class="text-right">
                        <select class="form-control" v-model="edit.warehouseCheckFlag" :disabled="true">
                                    <option v-for="(item, index) in warehouseCheckFlag" :value="item.value"  :key="index">{{item.text}}</option>
                                </select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="上下架状态" :label-cols="4" class="text-right">
                        <select class="form-control" v-model="edit.onOffFlag" :disabled="true">
                                    <option v-for="(item, index) in onOffFlag" :value="item.value"  :key="index">{{item.text}}</option>
                                </select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="成本计算类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="calCostTypes" v-model="edit.calCostType" :disabled="true" />
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <b-card header="采购信息">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="采购单位" :label-cols="4" class="text-right">
                        <!-- <select class="form-control" v-model="edit.purchaseUnitCode">
                                    <option v-for="item in unitList" :value="item.unitCode">{{item.unitName}}</option>
                                </select> -->
                        <div class="text-left" @click="unitType=true">
                            <search ref="search1" :hasCheck="required" :dataList="unitList" option="unitName" @dataChange="querySelect" @itemValue="itemValue" @clickShowBack="firstLoad" @comScroll="comScroll" :disabled="true">
                            </search>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="核算单位" :label-cols="4" class="text-right">
                        <div class="text-left" @click="unitType=false">
                            <search ref="search2" :hasCheck="required" :dataList="unitList" option="unitName" @dataChange="querySelect" @itemValue="itemValue" @clickShowBack="firstLoad" @comScroll="comScroll" :disabled="true">
                            </search>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="采购/核算单位转换系数" :label-cols="4" class="text-right">
                        <b-form-input type="number" :state="purchaseToCheckNumsState" v-model="edit.purchaseToCheckNums" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="标准成本" :label-cols="4" class="text-right">
                        <b-form-input type="number" v-model="edit.standardCost" readonly/>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <b-card header="商品属性">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品规格" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.skuStandards" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品型号" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.skuModel" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品毛重" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.grossWeight" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品净重" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.netWeight" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品长" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.skuLong" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品宽" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.skuWeight" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品高" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.skuHeight" readonly/>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <b-card header="其他信息">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="质保天数" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.warrantyDays" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="备注" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.remark" readonly/>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <div class="row" v-if="false">
            <div class="col-md-12 mb-3 text-right">
                <router-link to="/boutique/query">
                    <b-button>取消</b-button>
                </router-link>
                <b-button variant="primary" @click="saveArchives(type)">保存</b-button>
            </div>
        </div>
    </div>
</template>
    
<script>
    import Vue from 'vue'
    import {
        mapState
    } from 'vuex'
    import {
        Tree,
        MessageBox,
        Message
    } from 'element-ui'
    import config from '../../../common/config.js'
    import api from '../../../common/api'
    import upload from '../../../components/iris-upload/index'
    import Search from 'components/iris-search/search.vue'
    import Selects from 'components/select/index.vue'
    Vue.use(Tree)
    export default {
        data() {
            return {
                purchaseToCheckNumsState: null,
                unitType: false,
                isforbidden: false,
                unitList: [],
                selectParams: {
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                required: false,
                addParams: {
                    relationCode: this.$route.params.id,
                    singleFlag: '1',
                    businessType: 'bigPic'
                },
                addParams1: {
                    relationCode: this.$route.params.id,
                    singleFlag: '1',
                    businessType: 'midPic'
                },
                addParams2: {
                    relationCode: this.$route.params.id,
                    singleFlag: '1',
                    businessType: 'smallPic'
                },
                buttonName: {
                    bigPicture: "上传大图",
                    midPicture: "上传中图",
                    smallPicture: "上传小图"
                },
                matchCarFlag: [{
                        value: '1',
                        text: '需要'
                    },
                    {
                        value: '0',
                        text: '不需要'
                    }
                ],
                warehouseCheckFlag: [{
                        value: '1',
                        text: '是'
                    },
                    {
                        value: '0',
                        text: '否'
                    }
                ],
                onOffFlag: [{
                        value: '1',
                        text: '上架'
                    },
                    {
                        value: '0',
                        text: '下架'
                    }
                ],
                catlogName: '',
                categoryName: '',
                showHide1: false,
                showHide: false,
                treeData: [],
                propOption1: {
                    children: 'children',
                    label: 'catlogName'
                },
                propOption: {
                    children: 'children',
                    label: 'categoryName'
                },
                hasExpandClick: false, // 箭头节点严格区分
                type: 'add',
                edit: {
                    id: '',
                    calCostType: config.archivesCostType,
                    skuCode: '',
                    skuName: '',
                    skuType: config.product.archives.boutuqueType,
                    catlogCode: '',
                    catlogName: '',
                    categoryCode: '',
                    categoryName: '',
                    originalCode: '',
                    externalCode: '',
                    skuAreaCode: '',
                    packCode: '',
                    barCode: '', //基本信息
                    brandCode: '',
                    checkUnitCode: '',
                    purchaseUnitCode: '',
                    purchaseToCheckNums: '',
                    standardCost: '', //采购信息
                    skuStandards: '',
                    skuModel: '',
                    grossWeight: '',
                    netWeight: '',
                    skuLong: '',
                    skuWeight: '',
                    skuHeight: '', //商品属性
                    warrantyDays: '',
                    matchCarFlag: '',
                    warehouseCheckFlag: '',
                    onOffFlag: '',
                    remark: '',
                    bigPic: '',
                    midPic: '',
                    smallPic: '' //其他信息
                },
                queryParams: {
                    pageNums: '10',
                    pageStart: "0"
                },
                queryCd: {
                    pageNums: '10',
                    pageStart: "0"
                },
                queryPack: {
                    pageNums: '10',
                    pageStart: "0"
                },
                brandList: [],
                skuAreaList: [],
                packList: [],
            }
        },
        components: {
            Tree,
            upload,
            Search,
            Selects,
        },
        computed: {
            ...mapState('archives', [
                'skuCode',
                'arList',
                'calCostTypes'
            ]),
        },
        created() {
            this.getCode()
            // this.getBrandCode()
            this.getcalCostTypes()
        },
        mounted() {
            this.closeModal()
        },
        methods: {
            getValue: function(val, code) {
                this.edit[code] = val[code]
            },
            setecho: function(id, name) {
                this.$refs[id].setValue(name)
            },
            //获取成本计算类型
            getcalCostTypes: function() {
                const $this = this
                this.$store.dispatch('archives/getCalCostType', {
                    poros: {
                        refCode: config.calCostType
                    },
                    callBack: function(msg) {}
                })
            },
            querySelect(data) {
                const _this = this
                this.selectParams.pageStart = 1;
                this.selectParams.unitName = data;
                let params = this.selectParams;
                this.queryUnit(params, obj => {
                    _this.isLastPage = obj.isLastPage;
                    _this.unitList = obj.list;
                });
            },
            // 选中某一项
            itemValue(value) {
                if (this.unitType === true) {
                    this.edit.purchaseUnitCode = value.unitCode
                } else {
                    this.edit.checkUnitCode = value.unitCode
                }
            },
            // 第一次加载数据
            firstLoad() {
                const _this = this
                if (this.selectParams.unitName) {
                    delete this.selectParams.unitName
                } else if (_this.unitList.length != 0) {
                    return
                }
                let params = _this.selectParams
                _this.queryUnit(params, function(res) {
                    _this.unitList = res.list
                })
            },
            // 滚动加载
            comScroll(isEnd) {
                if (isEnd && !this.isLastPage) {
                    this.selectParams.pageStart++
                        let params = this.selectParams;
                    this.queryUnit(params, obj => {
                        this.isLastPage = obj.isLastPage;
                        this.unitList = this.unitList.concat(obj.list);
                    });
                }
            },
            queryUnit: function(params, callBack) {
                api.product.commodityUnit.queryCommodityUnit(params, (res) => {
                    if (res.data.code == "success") {
                        let unit = res.data.obj
                        callBack(unit);
                    }
                })
            },
            reset(value, name) {
                if (value == 'search1') {
                    this.$refs.search1.setValue(name)
                } else {
                    this.$refs.search2.setValue(name)
                }
            },
            $showHide(e) {
                if (this.showHide) {
                    this.showHide1 = !this.showHide1
                    this.showHide = !this.showHide
                } else {
                    this.showHide1 = !this.showHide1
                }
                this.stopBubble(e)
            },
            EshowHide(e) {
                if (this.showHide1) {
                    this.showHide1 = !this.showHide1
                    this.showHide = !this.showHide
                } else {
                    this.showHide = !this.showHide
                }
                this.stopBubble(e)
            },
            closeModal(dom, onoff, displaystr) {
                const $this = this
                document.addEventListener('click', (event) => {
                    $this.showHide1 = false
                    $this.showHide = false
                })
            },
            stopBubble(e) {
                if (e && e.stopPropagation) {
                    e.stopPropagation(); //w3c
                } else {
                    window.event.cancelBubble = true; //IE
                }
            },
            showClick: function() {
                this.showHide = !this.showHide
            },
            // 加载子树数据
            loadNode1(node, resolve) {
                if (node.level === 0) {
                    let params = {
                        catlogCode: config.product.catalog.rootCode
                    };
                    api.product.catalog.getSkuCatLogInfoByCatlogCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let obj = res.data.obj;
                            if (obj) {
                                let arr = [{
                                    id: 0, // 默认展示一级节点
                                    catlogName: obj.catlogName,
                                    catlogCode: obj.catlogCode
                                }];
                                return resolve(arr);
                            }
                        }
                    })
                } else {
                    let params = {
                        catlogCode: node.data.catlogCode
                    };
                    api.product.catalog.getSkuCatLogInfoByCatlogCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let items = res.data.obj.skuCatLogSubInfo;
                            let arr = [];
                            if (items !== null) {
                                items.forEach((item, index) => {
                                    let data = {
                                        catlogName: item.catlogName,
                                        catlogCode: item.catlogCode
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
            },
            // 节点点击事件
            handleNodeClick1(data) {
                this.edit.catlogCode = data.catlogCode;
                this.catlogName = data.catlogName;
                // this.showHide1 = !this.showHide1
            },
            // 加载子树数据
            loadNode(node, resolve) {
                if (node.level === 0) {
                    let params = {
                        categoryCode: config.product.classification.rootCode
                    };
                    api.product.classification.getSkuCategoryInfoBycategoryCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let obj = res.data.obj;
                            if (obj) {
                                let arr = [{
                                    id: 0, // 默认展示一级节点
                                    categoryName: obj.categoryName,
                                    categoryCode: obj.categoryCode
                                }];
                                return resolve(arr);
                            }
                        }
                    })
                } else {
                    let params = {
                        categoryCode: node.data.categoryCode
                    };
                    api.product.classification.getSkuCategoryInfoBycategoryCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let items = res.data.obj.skuCategorySubInfo;
                            let arr = [];
                            if (items !== null) {
                                items.forEach((item, index) => {
                                    let data = {
                                        categoryName: item.categoryName,
                                        categoryCode: item.categoryCode
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
            },
            // 节点展开事件
            expandClick() {
            },
            // 节点点击事件
            handleNodeClick(data) {
                this.edit.categoryCode = data.categoryCode;
                this.categoryName = data.categoryName;
                // this.showHide = !this.showHide
            },
            getCode: function() {
                const $this = this
                if ($this.$route.params.id == '0') {
                    $this.type = 'add'
                    this.$store.dispatch('archives/getCode', {
                        poros: {
                            "serviceCode": config.product.archives.getSkuCode
                        },
                        callBack: function(msg) {
                            if (msg.data.code == "success") {
                                $this.edit.skuCode = $this.skuCode
                                $this.addParams.relationCode = $this.skuCode
                            }
                        }
                    })
                } else {
                    const $this = this
                    let params = {
                        skuCode: $this.$route.params.id,
                    }
                    $this.$store.dispatch('archives/getEditInfo', {
                        poros: params,
                        callBack: function(msg) {
                            if (msg.data.code == "success") {
                                let obj = msg.data.obj
                                $this.addParams.relationCode = obj.skuCode
                                $this.type = 'edit'
                                for (let i in $this.edit) {
                                    $this.edit[i] = obj[i]
                                }
                                $this.catlogName = obj.catlogName
                                $this.categoryName = obj.categoryName
                                $this.reset('search1', obj.purchaseUnitName)
                                $this.reset('search2', obj.checkUnitName)
                                $this.setecho('skuAreaName', obj.skuAreaName)
                                $this.setecho('brandName', obj.brandName)
                                $this.setecho('packName', obj.packName)
                            }
                        }
                    })
                }
            },
            saveArchives: function(type) {
                const $this = this
                if ($this.checkValues()) {
                    if (type == 'add') {
                        this.$store.dispatch('archives/addArchives', {
                            poros: $this.edit,
                            callBack: function(msg) {
                                if (msg.data.code == "success") {
                                    Message({
                                        type: 'success',
                                        message: config.messInfo.success
                                    });
                                    $this.$router.push({
                                        path: `/boutique/query`
                                    })
                                }
                            }
                        })
                    } else {
                        this.$store.dispatch('archives/editArchives', {
                            poros: $this.edit,
                            callBack: function(msg) {
                                if (msg.data.code == "success") {
                                    Message({
                                        type: 'success',
                                        message: config.messInfo.success
                                    });
                                    $this.$router.push({
                                        path: `/boutique/query`
                                    })
                                }
                            }
                        })
                    }
                }
            },
            checkValues: function() {
                let _this = this
                let result = false
                let reg = /^[1-9]\d*$/
                if (reg.test(_this.edit.purchaseToCheckNums)) {
                    _this.purchaseToCheckNumsState = null
                    result = true
                } else {
                    _this.purchaseToCheckNumsState = 'invalid'
                    result = false
                }
                return result
            }
        }
    }
</script>

<style>
    .selectBox {
        position: absolute;
        z-index: 33;
        width: 100%;
        height: 300px;
    }
</style>