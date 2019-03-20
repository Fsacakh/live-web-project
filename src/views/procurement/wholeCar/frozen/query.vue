<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div slot="header">
                    <strong>查询</strong>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="采购单号" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.orderNo" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="SKU编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.skuCode" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="SKU名称" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.skuName" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="生产号" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.carProductionCode" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="车架号" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.carVinCode" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="供应商" :label-cols="4" class="text-right">
                            <div class="text-left">
                                <search
                                    ref="search"
                                    :dataList="datalist"
                                    @clearValue="clearValue"
                                    option="supplierName"
                                    @dataChange="querySelect"
                                    @itemValue="itemClick"
                                    @clickShowBack="firstLoad"
                                    @comScroll="scrollBottom">
                                </search>
                            </div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                            <area-tree  @select-change="selectChange"
                            ></area-tree>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="付款状态" :label-cols="4" class="text-right">
                            <b-form-select v-model="queryParams.paymentType" :options="statusOptions">
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
import { mapActions, mapGetters } from "vuex";
import AreaTree from 'components/iris-areaqueryshop/index'

export default {
    components: {
        SearchBtn,
        Search,
        AreaTree
    },
    data() {
        return {
            queryParams: {
                whCode: '',
                stroeCode: '',
                orderNo: '',
                carProductionCode: '',
                skuCode: '',
                skuName: '',
                carVinCode: '',
                paymentType: '',
                pageNums: config.pageNums,
                pageStart: 1
            },
            statusOptions: [
                {
                    value: 0,
                    text: '未付款'
                },
                {
                    value: 1,
                    text: '已付款'
                }
            ],

            datalist: [],
            selectParams: {
                pageNums: config.pageNums,
                pageStart: 1
            },
            isLastPage: false,
        }
    },
    methods: {
        selectChange(sales, stores) {
            this.queryParams.storeCode = stores.value
        },
        query() {
            this.queryParams.pageStart = 1;
            let params = this.queryParams;
            this.getPayObj(params);        
            this.$emit("query", this.queryParams);
        },
        reset() {
            this.queryParams = {
                whCode: '',
                stroeCode: '',
                orderNo: '',
                carProductionCode: '',
                skuCode: '',
                carVinCode: '',
                pageNums: config.pageNums,
                pageStart: 1
            };
            this.$refs.search.setValue()
        },
        // 供应商名称 - 下拉搜索
        clearValue() {
            this.queryParams.supplierCode = '';
        },
        firstLoad() {
            if(this.selectParams.warehouseName) {
                delete this.selectParams.warehouseName;
            }else if(this.datalist.length !== 0) {
                return;
            }
            let params = this.selectParams;        
            this.queryWhInfo(params, obj => {
                this.isLastPage = obj.isLastPage;                
                this.datalist = obj.list;
            });
        },
        querySelect(data) {
            this.selectParams.pageStart = 1;
            this.selectParams.supplierName = data;
            let params = this.selectParams;        
            this.queryWhInfo(params, obj => {
                this.isLastPage = obj.isLastPage;            
                this.datalist = obj.list;
            });
        },
        itemClick(item) {
            this.queryParams.supplierCode = item.supplierCode;
        },
        scrollBottom(isEnd) {
            if (isEnd && !this.isLastPage) {
                this.selectParams.pageStart ++
                let params = this.selectParams;        
                this.queryWhInfo(params, obj => {
                    this.isLastPage = obj.isLastPage;
                    this.datalist = this.datalist.concat(obj.list);
                });
            }
        },
        queryWhInfo(params, callback) {
            api.supplyChain.supplier.querySupplierInfo(params, res => {
                if (res.data.code === "success") {
                    let obj = res.data.obj;
                    callback(obj);
                }
            });
        },
        ...mapActions({
            getPayObj: "lVehicle/getPayObj"
        })
    },
    watch: {
        
    }
};
</script>
<style lang="scss" scoped>
.tree {
    position: relative;
}
.tree-box {
    position: absolute;
    width: 100%;
    z-index: 100;
    margin-top: 6px;
}

</style>

