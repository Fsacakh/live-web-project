<template>
    <b-modal title="选择商品"
                v-model="showModal"
                no-close-on-backdrop
                no-close-on-esc
                hide-footer
                size="lg"
                button-size="sm"
                @hidden="hide">
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="商品编号:" label-text-align="right" :label-cols="4">
                    <b-form-input v-model.trim="queryParams.skuCode"></b-form-input>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="商品名称:" label-text-align="right" :label-cols="4">
                    <b-form-input v-model.trim="queryParams.skuName"></b-form-input>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="69码:" label-text-align="right" :label-cols="4">
                    <b-form-input v-model.trim="queryParams.barCode"></b-form-input>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="商品品牌:" label-text-align="right" :label-cols="4">
                    <search
                        ref="search"
                        :dataList="datalist"
                        @clearValue="clearValue"
                        option="brandName"
                        @dataChange="querySelect"
                        @itemValue="itemClick"
                        @clickShowBack="firstLoad"
                        @comScroll="scrollBottom">
                    </search>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="pull-right">
                    <b-button size="sm" variant="default" @click="reset">重置</b-button>
                    <b-button size="sm" variant="primary" @click="query(1)">查询</b-button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 com-lg-12">
                <div class="table-scrollable">
                    <b-table striped hover bordered show-empty :fields="fields" :items="skuInfoList">
                        <template slot="index" slot-scope="data">
                            <input type="checkbox" name="selectRows" :value="data.item" v-model="addSkuPriceInfoList" />
                        </template>
                        <template slot="empty">
                            暂无数据...
                        </template>
                    </b-table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <pagination class="pull-right" @page-change="pageChange" :page-no="skuPager.pageNo" :page-size="skuPager.pageSize" :total-result="skuPager.total" :total-pages="skuPager.totalPages">
                </pagination>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 com-lg-12">
                <b-form-fieldset horizontal label="已选商品:" label-text-align="right" :label-cols="2">
                    <div class="card">
                        <div class="card-block">
                            <div class="card m-0 float-left ml-2" v-for="(skuPrice, index) in addSkuPriceInfoList">
                                <div class="card-body p-0 clearfix ml-1">
                                    {{ skuPrice.skuName }}
                                    <i @click="checkSku(index)" class="fa fa-remove bg-danger p-1  ml-3 float-right white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <div class="pull-right">
                    <b-btn size="sm" variant="default" @click="hide">取消</b-btn>
                    <b-btn size="sm" variant="primary" @click="commitSkuPriceList">确定</b-btn>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import {Message} from 'element-ui';
    import search from '../../../components/iris-search/search.vue'
    import config from 'common/config'
    import Pagination from 'components/pagination/pagination'
    import api from 'common/api'
    export default {
        components: {
            search,
            Pagination
        },
        props:{
            baseCarData1: {
                type: Object,
                default: {}
            }
        },
        data() {
           return {
               // 查询参数
                queryParams: {
                    skuCode: '',
                    skuName: '',
                    brandCode: '',
                    brandName: '',
                    barCode: '',
                    skuType: config.product.archives.boutuqueType,
                    pageNums: config.pageNums,
                    pageStart: 1
                    // 新增

                },
                // 已选数据
                addSkuPriceInfoList: [],
                // 分页数据
                skuPager: {

                },
                // 查询列表数据
                skuInfoList: [],
                fields: {
                    index: {
                        label: '选择'
                    },
                    skuCode: {
                        label: '商品编码'
                    },
                    skuName: {
                        label: '商品名称'
                    },
                    skuModel: {
                        label: '型号'
                    },
                    categoryName: {
                        label: '分类'
                    },
                    brandName: {
                        label: '品牌'
                    }
                },
                // 控制模态框的显示和隐藏
                showModal: false,
                // 商品品牌数据
                datalist: [],
                // 是否是最后一页
                isLastPage: false,
                // 品牌框查询入参
                selectParams: {
                    pageNums: config.pageNums,
                    pageStart: 1
                },

                // baseCarData: {}
            }
        },
        watch: {
            baseCarData1(Vo) {
                this.baseCarData = Vo
            }
        },
        methods: {
            // 确定事件
            commitSkuPriceList() {
                if(this.addSkuPriceInfoList.length > 0){
                    this.$emit('getData', this.addSkuPriceInfoList)
                }else{
                    Message({
                        message: '请先选择要添加的商品',
                        type: 'warning'
                    });
                }
            },
            // 模态框数据重置方法
            modalDataReset() {
                // 模态框查询条件重置
                this.queryParams = {
                    skuCode: '',
                    skuName: '',
                    brandCode: '',
                    brandName: '',
                    barCode: '',
                    skuType: config.product.archives.boutuqueType,
                    pageNums: config.pageNums,
                    pageStart: 1
                }
                // 已选数据清空
                this.addSkuPriceInfoList = []
                // 商品品牌查询条件重置
                this.selectParams = {
                    pageNums: config.pageNums,
                    pageStart: 1
                }
                // 滚动加载数据重置
                this.isLastPage = false
                // 商品品牌选择框数据清空
                this.datalist = []
                // 模态框分页页码数据清空
                this.skuPager = {

                }
                // 模态框列表数据清空
                this.skuInfoList = []
            },
            hide() {
                this.showModal = false
                // 取消按钮 清空模态框数据
                this.modalDataReset()
            },
            show() {
                this.showModal = true
            },
            // 查询事件
            query(arg) {
                let params = this.queryParams;
                params.pageStart = arg;
                params.onOffFlag = 1;
                // 新增入参
                params.pageNums = this.queryParams.pageNums

                //这里的值由父组件传入
                params.storeCode = this.baseCarData1.storeCode;
                params.skuCarRelationInfoVos = [{
                    carCode: this.baseCarData1.carCode,
                    brandCode: this.baseCarData1.carBrandCode,
                    seriesCode: this.baseCarData1.carSeriesCode,
                    modelCode: this.baseCarData1.carModelCode,
                    factoryCode: this.baseCarData1.carFactoryCode
                }];
                
                api.preloadedCar.querySkuInfoAdapterCarList(params, (res) => {
                    if(res.data.code === 'success') {
                        console.log(params);
                        // 商品列表赋值
                        this.skuInfoList = res.data.obj.list
                        if(this.skuInfoList.length > 0) {
                            // 分页页码数据赋值
                            this.skuPager = {
                                pageNo: res.data.obj.pageNum,
                                pageSize: res.data.obj.pageSize,
                                total: res.data.obj.total,
                                totalPages: res.data.obj.pages
                            }
                        }
                    }
                })
            },
            // 已选中删除一项  参数是要删除的标识位
            checkSku(arg) {
                this.addSkuPriceInfoList.splice(arg, 1)
            },
            // 清除选择的品牌
            clearValue() {
                this.queryParams.brandName = ''
                this.queryParams.brandCode = ''
            },
            // 输入搜索查询
            querySelect(data) {
                this.selectParams.brandName = data   
                this.queryBrand(this.selectParams, obj => {
                    this.isLastPage = obj.isLastPage;            
                    this.datalist = obj.list;
                })
            },
            // 选择品牌
            itemClick(item) {
                this.queryParams.brandName = item.brandName
                this.queryParams.brandCode = item.brandCode
            },
            // 品牌选择框第一次加载数据 
            firstLoad() {
                if(this.datalist.length !== 0) {
                    return
                }
                this.selectParams.brandName = ''
                this.queryBrand(this.selectParams, obj => {
                    this.isLastPage = obj.isLastPage;                
                    this.datalist = obj.list;
                });
            },
            // 滚动加载
            scrollBottom(isEnd) {
                if (isEnd && !this.isLastPage) {
                    this.selectParams.pageStart ++     
                    this.queryBrand(this.selectParams, obj => {
                        this.isLastPage = obj.isLastPage;
                        this.datalist = this.datalist.concat(obj.list);
                    })
                }
            },
            // 封装查询商品品牌的数据
            queryBrand(params, callback) {
                api.product.commodityBrand.queryCommodityBrand(params, res => {
                    if (res.data.code === "success") {
                        let obj = res.data.obj;
                        callback(obj);
                    }
                });
            },
            // 分页事件
            pageChange(num) {
                // 拿到页码  调用查询方法
                this.query(num)
            },
            reset(){
                this.queryParams.skuCode = '';
                this.queryParams.skuName = '';
                this.queryParams.barCode = '';
                this.$refs.search.clearValue();
                this.clearValue();
            }
        }
    }
</script>
