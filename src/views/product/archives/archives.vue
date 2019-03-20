<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="选择经销商店" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <areaqueryshop :readonly="false" @select-change="selectedfun"></areaqueryshop>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="仓库名称" :label-cols="4" class="text-right">
                        <b-form-select v-model="query.whCode" :options="entreList"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <iris-car :col="2" :initData="intentionCarInfoVos[0]" ref="car" @callBack="backSkuCar" @validete="validateCar"></iris-car>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品名称" :label-cols="4" class="text-right">
                        <b-form-input v-model="query.skuName" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" :label-cols="4" class="text-right">
                        <b-form-input v-model="query.carVinNo" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="生产号" :label-cols="4" class="text-right">
                        <b-form-input v-model="query.productionCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="上下架状态" :label-cols="4" class="text-right">
                        <select class="form-control" v-model="query.onOffFlag">
                                <option v-for="(item, index) in onOffFlag" :key="index" :value="item.value">{{item.text}}</option>
                            </select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button @click="clear">重置</b-button>
                        <b-button variant="primary" @click="queryArchives(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div>
                <router-link to="/archives/addarchives/0">
                    <b-button v-if="addBtn" size="sm" variant="success" type="button">新增</b-button>
                </router-link>
                <b-button v-if="editBtn" size="sm" variant="primary" type="button" @click="jumpDetail(selitem)">编辑</b-button>
                <b-button v-if="syncBtn" class="pull-right" size="sm" variant="warning" @click="cache">同步数据</b-button>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="archivesList" :fields="fields">
                    <template slot="checkbox" slot-scope="data" class="text-center">
                        <input type="radio" name="models" v-model="selitem" :value="data.item.skuCode">
                    </template>
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pager.pageNo - 1) * pager.pageSize + 1 }}
                    </template>
                    <template slot="skuCode" slot-scope="data">
                        <a href="javascript:;" @click.prevent="checkDetail(data.item.skuCode)">{{data.item.skuCode}}</a>
                    </template>
                    <template slot="carIotypeName" slot-scope="data">
                        {{ data.item.carIotypeName }}
                    </template>
                    <template slot="onOffFlag" slot-scope="data">
                        {{ data.item.onOffFlag == '0' ? '下架' : '上架' }}
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination
                class="pull-right"
                @page-change="pageChange"
                :page-no="pager.pageNo"
                :page-size="pager.pageSize"
                :total-result="pager.total"
                :total-pages="pager.totalPages">
            </pagination>
        </b-card>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {
        mapState,
        mapActions
    } from 'vuex'
    import config from '../../../common/config.js'
    import apiUrls from 'common/api-url'
    import {
        hasBtn
    } from 'common/com-api'
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import api from '../../../common/api'
    import Pagination from 'components/pagination/pagination'
    import Areaqueryshop from 'components/iris-areaqueryshop/index'
    import IrisCar from 'components/iris-car'
    export default {
        mounted() {
            if (this.$route.query.params === 'update') {
                this.queryArchives(1)
            }
        },
        data() {
            return {
                intentionCarInfoVos: [],
                entreList: [],
                onOffFlag: [{
                        value: '1',
                        text: '上架'
                    },
                    {
                        value: '0',
                        text: '下架'
                    }
                ],
                selitem: '',
                query: {
                    storeCode: '',
                    brandCode: '',
                    whCode: '',
                    skuName: '',
                    onOffFlag: '',
                    productionCode: '',
                    carVinNo: '',
                    skuType: config.product.archives.archivesType,
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                fields: {
                    checkbox: {
                        label: '   '
                    },
                    index: {
                        label: '序号'
                    },
                    skuCode: {
                        label: '商品编码'
                    },
                    skuName: {
                        label: '商品名称'
                    },
                    carBrandName: {
                        label: '品牌名称'
                    },
                    carSeriesName: {
                        label: '车系名称'
                    },
                    carModelName: {
                        label: '车型名称'
                    },
                    whName: {
                        label: '仓库名称'
                    },
                    carVinNo: {
                        label: '车架号'
                    },
                    productionCode: {
                        label: '生产号'
                    },
                    storeName: {
                        label: '所属门店'
                    },
                    onOffFlag: {
                        label: "状态"
                    }
                },
                list: []
            }
        },
        computed: {
            addBtn() {
                return hasBtn(apiUrls.product.archives.addArchives)
            },
            editBtn() {
                return hasBtn(apiUrls.product.archives.editArchives)
            },
            syncBtn() {
                return hasBtn(apiUrls.product.archives.cache)
            },
            ...mapState('archives', [
                'pager',
                'skuCode',
                'archivesList',
                'arList'
            ])
        },
        methods: {
            backSkuCar(val) {
                const $this = this
                $this.query.carFactoryCode = val.factoryCode
                $this.query.carBrandCode = val.brandCode
                $this.query.carSeriesCode = val.seriesCode
                $this.query.carModelCode = val.modelCode
                $this.query.carCode = val.carCode
            },
            validateCar() {},
            selectedfun(sales, stores) {
                let _this = this;
                let options = {
                    storeCodeSet: []
                };
                if (stores instanceof Array) {
                    stores.forEach(item => {
                        options.storeCodeSet.push(item.value);
                    });
                } else if (stores.value === 0) {
                    options.storeCodeSet = [];
                    _this.$data.query.storeCode = '';
                } else if (stores.hasOwnProperty("value")) {
                    options.storeCodeSet = [];
                    options.storeCodeSet[0] = stores.value;
                    _this.$data.query.storeCode = stores.value;
                }
                options.warehouseTypeFlag = 1;
                if (options.storeCodeSet.length > 0) {
                    api.supplyChain.procurement.getEntrepot(options, function(res) {
                        if (res.data.code === "success") {
                            const array = res.data.obj;
                            _this.entreList = [];
                            for (var i = 0; i < array.length; i++) {
                                let obj = {};
                                obj.text = array[i].warehouseName;
                                obj.value = array[i].warehouseCode;
                                _this.entreList.push(obj);
                            }
                            if (_this.entreList.length === 0) {
                                let tempObj = {};
                                tempObj.text = "请选择仓库";
                                tempObj.value = "";
                                _this.entreList.push(tempObj);
                            }
                        }
                    });
                } else {
                    _this.entreList = [];
                }
            },
            cache: function() {
                api.product.archives.cache({}, (res) => {
                    if (res.data.code == "success") {
                        Message({
                            type: 'info',
                            message: config.messInfo.success
                        });
                    }
                })
            },
            clear: function() {
                this.$refs.car.clear() //清除重置
                this.query.skuName = ''
                this.query.carVinNo = ''
                this.query.productionCode = ''
                this.query.onOffFlag = ''
                this.query.whCode = ''
            },
            pageChange(page) { //分页查询
                this.queryArchives(page)
            },
            checkDetail: function(id) {
                this.setIsNotEdit(true)
                this.$router.push({
                    path: `/archives/carloadDetails/${id}`
                })
            },
            jumpDetail: function(id) {
                if (id == '') {
                    Message({
                        type: 'info',
                        message: config.messInfo.select
                    });
                } else {
                    const $this = this
                    let params = {
                        skuCode: id
                    }
                    this.setIsNotEdit(false)
                    this.$store.dispatch('archives/getEditInfo', {
                        poros: params,
                        callBack: function(msg) {
                            if (msg.data.code == "success") {
                                $this.$router.push({
                                    path: `/archives/carloadDetails/${id}`
                                })
                            }
                        }
                    })
                }
            },
            queryArchives: function(page) { //查询列表
                const $this = this
                this.query.pageStart = page;
                $this.query.pageNums = config.pageNums
                $this.query.skuType = config.product.archives.archivesType
                this.$store.dispatch('archives/queryArchives', {
                    poros: $this.query,
                    callBack: function(msg) {
                        if (msg.data.code == "success") {}
                    }
                })
            },
            ...mapActions('archives', [
                'setIsNotEdit'
            ])
        },
        components: {
            Pagination,
            Areaqueryshop,
            IrisCar
        }
    }
</script>
