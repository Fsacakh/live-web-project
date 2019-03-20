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
                    <b-form-fieldset horizontal label="产地" :label-cols="4" class="text-right">
                        <div class="text-left" @click="unitType=true">
                            <selects
                                ref='skuAreaName'
                                URL = "skuAreaUrl"
                                option="skuAreaName"
                                optionCode='skuAreaCode'
                                @itemValue="getValue"
                                :disabled="true"
                                >
                            </selects>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="目录" :label-cols="4" class="text-right">
                        <input class="form-control" v-model="catlogName" :disabled="true" @click="$showHide"/>
                        <div v-show="showHide1" class="text-left" style="position:absolute; z-index: 33;width:100%; height: 300px; overflow: auto;">
                            <el-tree :data="treeData" :props="propOption1" :load="loadNode1" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="hasExpandClick" @node-click="handleNodeClick1">
                            </el-tree>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="分类" :label-cols="4" class="text-right">
                        <input class="form-control" v-model="categoryName"  @click="EshowHide" :disabled="true"/>
                        <div v-show="showHide" class="text-left" style="position:absolute; z-index: 33;width:100%; height: 300px; overflow: auto;">
                            <el-tree :data="treeData" :props="propOption" :load="loadNode" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="hasExpandClick" @node-click="handleNodeClick" @node-expand="expandClick">
                            </el-tree>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="原厂编码" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.originalCode" readonly/> 
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="外部编码" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.externalCode" readonly/> 
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.carVinNo" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="生产号/预生产号" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.productionCode" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="是否仓库盘点" :label-cols="4" class="text-right">
                        <select class="form-control" v-model="edit.warehouseCheckFlag" :disabled="true">
                            <option v-for="(item, index) in warehouseCheckFlag" :value="item.value" :key="index">{{item.text}}</option>
                        </select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="上下架状态" :label-cols="4" class="text-right">
                        <select class="form-control" v-model="edit.onOffFlag" :disabled="true">
                            <option v-for="(item, index) in onOffFlag" :value="item.value" :key="index">{{item.text}}</option>
                        </select>
                    </b-form-fieldset>
                </div>
            </div>
            <iris-car 
                :col="2" 
                :initData="intentionCarInfoVos[0]" 
                ref="car" 
                @callBack="back" 
                :disabled="true"
                @validete="validateCar">
            </iris-car>
        </b-card>
        <b-card header="采购信息">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="采购单位" :label-cols="4" class="text-right">
                        <div class="text-left" @click="unitType=true">
                            <selects
                                ref='purchaseUnitName'
                                URL = "unitUrl"
                                option="unitName"
                                optionCode='purchaseUnitCode'
                                @itemValue="getValue"
                                :disabled="true"
                                >
                            </selects>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="核算单位" :label-cols="4" class="text-right">
                        <div class="text-left" @click="unitType=true">
                            <selects
                                ref='checkUnitName'
                                URL = "unitUrl"
                                option="unitName"
                                optionCode='checkUnitCode'
                                @itemValue="getValue"
                                :disabled="true"
                                >
                            </selects>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="采购单位" :label-cols="4" class="text-right">
                        <select class="form-control" v-model="edit.purchaseUnitCode" :disabled="true">
                            <option v-for="(item, index) in unitList" :value="item.unitCode" :key="index">{{item.unitName}}</option>
                        </select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="核算单位" :label-cols="4" class="text-right">
                        <select class="form-control" v-model="edit.checkUnitCode" :disabled="true">
                            <option v-for="(item, index) in unitList" :value="item.unitCode" :key="index">{{item.unitName}}</option>
                        </select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="采购/核算单位转换系数" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.purchaseToCheckNums" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="标准成本" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.standardCost" readonly/>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <b-card header="商品属性">
            <div class="row">
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
                    <b-form-fieldset horizontal label="备注" :label-cols="4" class="text-right">
                        <b-form-input v-model="edit.remark" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    
                </div>
                <!-- <div class="col-md-6">
                    <b-form-fieldset horizontal label="大图" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <upload :addParams="addParams" 
                                    :buttonName='buttonName.bigPicture'>
                            </upload>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="中图" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <upload :addParams="addParams1" 
                                    :buttonName='buttonName.midPicture'>
                            </upload>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="小图" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <upload :addParams="addParams2" 
                                    :buttonName='buttonName.smallPicture'>
                            </upload>
                        </div>
                    </b-form-fieldset>
                </div> -->
            </div>
        </b-card>
        <b-card header="状态" v-if="type == 'edit'">
            <div class="row">
                <div class="col-md-6">
                    <p class="text-center">销售状态：&ensp;<span>{{ edit.salesStatus == '-1' ? '不可销售' : (edit.salesStatus == '0' ? '可销售' : '已销售') }}</span></a></p>
                </div>
                <div class="col-md-6">
                    <p class="text-center">物流状态：&ensp;
                        <span>{{edit.logisticsStatus=='-1'?'采购待确认':(edit.logisticsStatus=='1'?'在途':'入库')}}</span>
                        <span v-if="edit.logisticsStatus=='1'">
                            <i>--</i>
                            <a href="javascript:;" v-b-modal.insert @click="getSukAddInfo">
                                {{edit.logisticsSubStatus=='0'?'采购确认':(edit.logisticsSubStatus=='1'?'管线中':'运输中')}}
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </b-card>
        <div class="row" v-if="false">
            <div class="col-md-12 mb-3 text-right">
                <router-link to="/archives/query">
                    <b-button>取消</b-button>
                </router-link>
                <b-button variant="primary" @click="saveArchives(type)">保存</b-button>
            </div>
        </div>
        <!-- <modal :showModal="showModal" :skuAddInfoVoList="skuAddInfoVoList"></modal> -->
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { Tree, Button, MessageBox, Message} from 'element-ui'
    import config from '../../../common/config.js'
    import api from '../../../common/api'
    import Modal from './modal'
    import Upload from '../../../components/iris-upload'
    import IrisCar from 'components/iris-car'
    import Selects from 'components/select/index.vue'
    Vue.use(Tree);
    Vue.use(Button)
    export default {
        components: {
            Tree,
            Modal,
            Upload,
            IrisCar,
            Selects
        },
        data() {
            return {
                intentionCarInfoVos: [],
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
                showModal: false,
                matchCarFlag: [
                    {
                        value: '1',
                        text: '需要'
                    },
                    {
                        value: '0',
                        text: '不需要'
                    }
                ],
                warehouseCheckFlag: [
                    {
                        value: '1',
                        text: '是'
                    },
                    {
                        value: '0',
                        text: '否'
                    }
                ],
                onOffFlag: [
                    {
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
                fileList: [{
                    name: '',
                    url: ''
                }],
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
                hasExpandClick: false,   // 箭头节点严格区分
                type: 'add',
                edit: {
                    id: '',
                    brandCode: '',
                    calCostType: config.archivesCostType,
                    skuCode: '',
                    skuName: '',
                    skuType: config.product.archives.archivesType,
                    catlogCode: '',
                    catlogName: '',
                    categoryCode: '',
                    categoryName: '',
                    originalCode: '',
                    externalCode: '',
                    skuAreaCode: '',
                    barCode: '',                //基本信息

                    checkUnitCode: '',
                    purchaseUnitCode: '',
                    purchaseToCheckNums: '',
                    standardCost: '',           //采购信息

                    grossWeight: '',
                    netWeight: '',
                    skuLong: '',
                    skuWeight: '',
                    skuHeight: '',               //商品属性

                    carVinNo: '',
                    // carCode: '',
                    // carDisplayName: '',
                    carFactoryCode: '',
                    carFactoryName: '',
                    carBrandCode: '',
                    carBrandName: '',
                    carSeriesCode: '',
                    carSeriesName: '',
                    carModelCode: '',
                    carModelName: '',
                    carOpvCode: '',
                    carOpvName: '',
                    carIotypeCode: '',
                    carIotypeName: '',

                    warehouseCheckFlag: '',
                    onOffFlag: '',
                    productionCode: '',
                    remark: '',
                    bigPic: '',
                    midPic: '',
                    smallPic: '',                //其他信息

                    logisticsStatus: '',          //附加信息
                    logisticsSubStatus: '',
                    salesStatus: '',        
                },
                skuAddInfoVoList: [],      //附加属性信息

                queryParams: {
                    pageNums: '20',
                    pageStart: "0"
                },
                // brandList: [],
                skuAreaList: [],
                unitList: []
            }
        },
        computed: {
            ...mapState('archives', [
                    'skuCode',
                    'arList',
                ]),
        },
        created() {
            this.getBrandCode()
            this.getCode()
            // this.getCarTypeInfo(this.parameter.carFactory)
            // this.getMianCarInfo()
        },
        mounted() {
            this.closeModal()
            this.getCode()
        },
        methods: {
            getValue: function(val, code) {
                this.edit[code] = val.unitCode
            },
            setecho: function(id, name) {
                this.$refs[id].setValue(name)
            },
            back(val) {
                const $this = this
                $this.edit.carFactoryCode = val.factoryCode
                $this.edit.carBrandCode = val.brandCode
                $this.edit.carSeriesCode = val.seriesCode
                $this.edit.carModelCode = val.modelCode
                $this.edit.carCode = val.carCode
            },
            validateCar() {},
            //获取数据字典整车商品附加信息
            getSukAddInfo: function () {
                const _this = this;
                _this.$store.dispatch('archives/getSukAddInfo', {
                    poros: {
                        "refCode": config.product.archives.refCode,
                        "refName": "",
                        "pageNums": config.pageNums,
                        "pageStart": "1"
                    },
                    callBack: function (msg) {
                        if (msg.data.code == 'success') {
                            
                        }
                    }
                    
                })
            },
            $showHide(e) {
                if (this.showHide) {
                    this.showHide1 = !this.showHide1
                    this.showHide = !this.showHide
                } else {
                    this.showHide1 = !this.showHide1
                }
                this.stopBubble (e)
            },
            EshowHide(e) {
                if (this.showHide1) {
                    this.showHide1 = !this.showHide1
                    this.showHide = !this.showHide
                } else {
                    this.showHide = !this.showHide
                }
                this.stopBubble (e)                   
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
            handleSuccess(response, file, fileList) {
                Message({
                    type: 'info',
                    message: config.messInfo.success
                });
            },
            handleErr(err, file, fileList) {
                Message({
                    type: 'info',
                    message: config.messInfo.fail
                });
            },
            //获取品牌编码
            getBrandCode() {
                const $this = this
                // api.product.commodityBrand.queryCommodityBrand(this.queryParams, (res) => {
                //     if (res.data.code == "success") {
                //         $this.brandList = res.data.obj.list
                //     } 
                // })
                api.product.commodityBirthplace.queryCommodityBirthplace(this.queryParams, (res) => {
                    if (res.data.code == "success") {
                        $this.skuAreaList = res.data.obj.list
                    } 
                })
                api.product.commodityUnit.queryCommodityUnit(this.queryParams, (res) => {
                    if (res.data.code == "success") {
                        $this.unitList = res.data.obj.list
                    } 
                })
            },
            showClick: function () {
                this.showHide = !this.showHide
            },
            // 加载子树数据
            loadNode1(node, resolve) {
                if (node.level === 0) {
                    let params = { catlogCode: config.product.catalog.rootCode };
                    api.product.catalog.getSkuCatLogInfoByCatlogCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let obj = res.data.obj;
                            if (obj) {
                                let arr = [{
                                    id: 0,   // 默认展示一级节点
                                    catlogName: obj.catlogName,
                                    catlogCode: obj.catlogCode
                                }];
                                return resolve(arr);
                            }
                        }
                    })
                } else {
                    let params = { catlogCode: node.data.catlogCode };
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
                this.edit.catlogName = data.catlogName;
                this.catlogName = data.catlogName;
            },
            // 加载子树数据
            loadNode(node, resolve) {
                if (node.level === 0) {
                    let params = { categoryCode: config.product.classification.rootCode };
                    api.product.classification.getSkuCategoryInfoBycategoryCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let obj = res.data.obj;
                            if (obj) {
                                let arr = [{
                                    id: 0,   // 默认展示一级节点
                                    categoryName: obj.categoryName,
                                    categoryCode: obj.categoryCode
                                }];
                                return resolve(arr);
                            }
                        }
                    })
                } else {
                    let params = { categoryCode: node.data.categoryCode };
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
                // console.log(data)
                this.edit.categoryCode = data.categoryCode;
                this.edit.categoryName = data.categoryName;
                this.categoryName = data.categoryName;
            },
            getCode: function () {
                const $this = this
                if ($this.$route.params.id == '0') {
                    $this.type = 'add'
                    this.$store.dispatch('archives/getCode', {
                        poros: {"serviceCode": config.product.archives.getSkuCode},
                        callBack: function (msg) {
                            if (msg.data.code == "success") {
                                $this.edit.skuCode = msg.data.obj
                                $this.addParams.relationCode = $this.skuCode;
                                $this.addParams1.relationCode = $this.skuCode;
                                $this.addParams2.relationCode = $this.skuCode;
                            }
                        }
                    })
                } else {
                    const $this = this
                    $this.type = 'edit'
                    let params = {
                        skuCode: $this.$route.params.id,
                    }
                    $this.$store.dispatch('archives/getEditInfo', {
                        poros: params,
                        callBack: function (msg) {
                            if(msg.data.code == "success") {
                                let obj = $this.arList==''?msg.data.obj:$this.arList
                                for(let i in $this.edit) {
                                    $this.edit[i] = obj[i]
                                }
                                let carObj = {
                                    factoryCode: obj.carFactoryCode,
                                    brandCode: obj.carBrandCode,
                                    seriesCode: obj.carSeriesCode,
                                    modelCode: obj.carModelCode,
                                    carCode: obj.carCode,
                                }
                                $this.$refs.car.setValue(carObj)
                                $this.categoryName = obj.categoryName
                                $this.catlogName = obj.catlogName
                                $this.skuAddInfoVoList = obj.skuAddInfoVoList

                                $this.setecho('skuAreaName',obj.skuAreaName)
                                $this.setecho('checkUnitName',obj.checkUnitName)
                                $this.setecho('purchaseUnitName',obj.purchaseUnitName)
                            }
                        }
                    })
                }
            },
            saveArchives: function (type) {
                const $this = this
                if (type == 'add') {
                    this.$store.dispatch('archives/addArchives', {
                        poros: $this.edit,
                        callBack: function (msg) {
                            if(msg.data.code == "success") {
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                                $this.$router.push({
                                    path: `/archives/query`
                                })
                            }
                        }
                    })
                } else {
                    this.$store.dispatch('archives/editArchives', {
                        poros: $this.edit,
                        callBack: function (msg) {
                            if(msg.data.code == "success") {
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                                $this.$router.push({
                                    path: `/archives/query`
                                })
                            }
                        }
                    })
                }

            },
        },
        watch: {
            carCode: function () {
                if (this.carCode) {
                    this.edit.carCode = this.carCode.carCode
                    this.edit.carDisplayName = this.carCode.displayName
                }
            },
            arList: function () {
            }
        }
    }
</script>

<style>
    .upload-demo {
    }
</style>