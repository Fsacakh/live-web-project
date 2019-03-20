<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="付款">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="单据号" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.orderNo" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="单据类型" :label-cols="4" class="text-right">
                            <b-form-select :options="invoiceOrderTypes" v-model="queryParams.invoiceOrderType"></b-form-select>
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
                            <area-tree  @select-change="selectChange" ref="area"
                            ></area-tree>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="付款状态" :label-cols="4" class="text-right">
                            <b-form-select v-model="queryParams.paymentType" :options="statusOptions">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="实际付款时间" :label-cols="4" class="text-right">
                            <el-date-picker
                                    v-model="paymentDate"
                                    type="daterange"
                                    :clearable="true"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="预计付款时间" :label-cols="4" class="text-right">
                            <el-date-picker
                                    v-model="estimatedPaymentDate"
                                    type="daterange"
                                    :clearable="true"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </b-form-fieldset>
                    </div>
                </div>
                <search-btn @reset="reset" @query="query"></search-btn>
            </b-card>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import SearchBtn from "components/searchBtn/searchBtn";
import common from 'common/common.js'
import Search from "components/iris-search/search";
import config from "common/config";
import api from "common/api";
import { mapActions, mapGetters, mapState } from "vuex";
import AreaTree from 'components/iris-areaqueryshop/index'
import {DatePicker} from 'element-ui'
Vue.use(DatePicker)
export default {
    components: {
        SearchBtn,
        Search,
        AreaTree
    },
    mounted() {
        let _this = this
        _this.getInvoiceOrderTypes()
        if (Object.keys(this.payParams).length > 0) {
            _this.$emit("query", JSON.parse(JSON.stringify(this.payParams)));
        }
    },
    data() {
        return {
            estimatedPaymentDate:'', //预计付款时间
            paymentDate:'', //实际付款时间
            queryParams: {
                invoiceDateStart:'',//开始时间
                invoiceDateEnd:'',//结束时间
                paymentDateStart: '',           //实际付款开始时间
                paymentDateEnd:'',              //实际付款结束时间
                estimatedPaymentDateStart: '',  //预计付款开始时间
                estimatedPaymentDateEnd:'',     //预计付款结束时间
                storeCode: '',
                orderNo: '',
                carProductionCode: '',
                skuCode: '',
                skuName: '',
                carVinCode: '',
                supplierCode: '',
                paymentType: '',
                invoiceOrderType: 'invoiceOrderTypeCarPurchase',
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
            invoiceOrderType: '',
            isLastPage: false,
        }
    },
    computed: {
        ...mapState('lVehicle', [
            'invoiceOrderTypes',
            'payParams'
        ])
    },
    methods: {
        selectChange(sales, stores) {
            // if(stores.value === 0) {
            //     this.queryParams.stroeCode = ''
            // }else {
            //     this.queryParams.storeCode = stores.value
            // }

            // 后端修改后替换如下
            if(Array.isArray(stores) === true) {
                this.queryParams.storeCodes = []
                stores.forEach(item => {
                this.queryParams.storeCodes.push(item.value)
                })
            }

            if(stores.value === 0) {
                this.queryParams.storeCodes = []
            }else if(stores.hasOwnProperty('value')) {
                this.queryParams.storeCodes = []
                this.queryParams.storeCodes[0] = stores.value
            }
        },
        query() {
            //实际付款开始时间
            this.queryParams.paymentDateStart = common.eleTimeFormat(this.paymentDate[0])
            //实际付款结束时间
            this.queryParams.paymentDateEnd = common.eleTimeFormat(this.paymentDate[1])
            //预计付款开始时间
            this.queryParams.estimatedPaymentDateStart = common.eleTimeFormat(this.estimatedPaymentDate[0])
            //预计付款结束时间
            this.queryParams.estimatedPaymentDateEnd = common.eleTimeFormat(this.estimatedPaymentDate[1])
            this.queryParams.pageStart = 1;
            let params = this.queryParams;
            this.$emit("query", this.queryParams);
        },
        reset() {
            // this.queryParams = {
            //     whCode: '',
            //     stroeCode: '',
            //     orderNo: '',
            //     carProductionCode: '',
            //     skuCode: '',
            //     carVinCode: '',
            //     pageNums: config.pageNums,
            //     pageStart: 1
            // };

            this.queryParams.orderNo = ''
            this.queryParams.carProductionCode = ''
            this.queryParams.skuCode = ''
            this.queryParams.skuName = ''
            this.queryParams.carVinCode = ''
            this.queryParams.paymentType = ''
            this.queryParams.supplierCode = ''
            this.queryParams.invoiceOrderType ='invoiceOrderTypeCarPurchase'
            this.estimatedPaymentDate = ''
            this.paymentDate = ''
            this.$refs.search.setValue()
            // this.$refs.area.reset()
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
            getPayObj: "lVehicle/getPayObj",
            getInvoiceOrderTypes: 'lVehicle/getInvoiceOrderTypes',
            getInternalProPayObj: 'lVehicle/getInternalProPayObj'
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

