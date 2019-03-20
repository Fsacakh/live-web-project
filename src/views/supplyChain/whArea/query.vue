<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="查询">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="库区编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.whAreaCode" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="库区名称" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.whAreaName" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                            <areaqueryshop :storeAll="storeShow" ref="area" @select-change="selectChange"></areaqueryshop>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="* 仓库名称" :label-cols="4" class="text-right">
                            <div class="text-left">
                                <search ref="search" :dataList="datalist" option="warehouseName" @dataChange="querySelect" @itemValue="itemClick" @clickShowBack="firstLoad" @clearValue="clearValue" @comScroll="scrollBottom">
                                </search>
                            </div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="库区类型" :label-cols="4" class="text-right">
                            <b-form-select v-model="queryParams.whAreaType" :options="whAreaType">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                </div>
                <search-btn @reset="reset" @query="query"></search-btn>
            </b-card>
        </div>
    </div>
</template>
<script>
    import SearchBtn from "components/searchBtn/searchBtn";
    import Search from "components/iris-search/search";
    import config from "common/config";
    import api from "common/api";
    import Areaqueryshop from 'components/iris-areaqueryshop'
    import { Tree, DatePicker, TimeSelect, Message } from 'element-ui'
    import {
        mapActions,
        mapGetters
    } from "vuex";
    export default {
        components: {
            SearchBtn,
            Search,
            Areaqueryshop
        },
        data() {
            return {
                storeShow: true,
                queryParams: {
                    whAreaCode: '',
                    whAreaName: '',
                    whAreaType: '',
                    warehouseCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                datalist: [],
                selectParams: {
                    storeCodeSet: [],
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                isLastPage: false,
            };
        },
        created() {
            const params = {
                refCode: config.supplyChain.whArea.type
            };
            this.getWhAreaType(params);
            api.toLogin.getJurisdiction().then(res => {
                if (res.data.code === 'success') {
                    const Vo = res.data.obj || {}
                    const storeVo = Vo.storeInfoVo
                    this.selectParams.storeCodeSet = storeVo ? [storeVo.storeCode] : []
                }
            })
        },
        mounted() {
            window.vue = this
        },
        computed: {
            ...mapGetters("classification", ["whAreaType"])
        },
        methods: {
            selectChange(sales, stores) {
                let _this = this
                if (stores instanceof Array) {
                    _this.selectParams.storeCodeSet = []
                    stores.forEach((item) => {
                        item.value && _this.selectParams.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.selectParams.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    this.queryParams.warehouseCode = ''
                    this.$refs.search.setValue()
                    _this.selectParams.storeCodeSet = []
                    _this.selectParams.storeCodeSet[0] = stores.value
                }
            },
            query() {
                if(!this.queryParams.warehouseCode) {
                    Message({
                        type: 'warning',
                        message: '请选择仓库名称'
                    })
                    return
                }
                this.queryParams.pageStart = 1;
                let params = this.queryParams;
                this.getWhAreaObj(params);
                this.$emit("query", this.queryParams);
            },
            reset() {
                this.queryParams.whAreaCode = ''
                this.queryParams.whAreaName = ''
                this.queryParams.warehouseCode = ''
                this.queryParams.whAreaType = ''
                this.queryParams.pageNums = config.pageNums
                this.queryParams.pageStart = 1

                this.selectParams.pageNums = config.pageNums
                this.selectParams.pageStart = 1
                
                this.$refs.search.setValue()
                this.$refs.area.reset()
            },
            // 仓库名称 - 下拉搜索
            clearValue() {
                this.queryParams.warehouseCode = '';
            },
            firstLoad() {
                if (this.selectParams.warehouseName) {
                    delete this.selectParams.warehouseName;
                } 
                let params = this.selectParams;
                this.queryWhInfo(params, obj => {
                    this.datalist = obj.list;
                });
            },
            querySelect(data) {
                this.selectParams.pageStart = 1;
                this.selectParams.warehouseName = data;
                let params = this.selectParams;
                this.queryWhInfo(params, obj => {
                    this.isLastPage = obj.isLastPage;
                    this.datalist = obj.list;
                });
            },
            itemClick(item) {
                this.queryParams.warehouseCode = item.warehouseCode;
            },
            scrollBottom(isEnd) {
                if (isEnd && !this.isLastPage) {
                    this.selectParams.pageStart++
                        let params = this.selectParams;
                    this.queryWhInfo(params, obj => {
                        this.isLastPage = obj.isLastPage;
                        this.datalist = this.datalist.concat(obj.list);
                    });
                }
            },
            queryWhInfo(params, callback) {
                api.supplyChain.warehouse.getQueryInfo(params).then(res => {
                    if (res.data.code === "success") {
                        let obj = res.data.obj;
                        callback(obj);
                    }
                });
            },
            ...mapActions({
                getWhAreaObj: "classification/getWhAreaObj",
                getWhAreaType: "classification/getWhAreaType"
            })
        }
    };
</script>

