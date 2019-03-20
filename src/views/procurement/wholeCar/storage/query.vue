<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="查询">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="单据号" :label-cols="4" class="text-right">
                            <b-form-input v-if="getType" v-model="queryParams.orderNo" />
                            <b-form-input v-else v-model="queryParams.inStockNo" />
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
                    <!-- 销售区域, 经销商店级联开始 -->
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                            <area-tree  @select-change="selectChange" :storeAll="true" ref="area"
                            ></area-tree>
                        </b-form-fieldset>
                    </div>
                    <!-- 销售区域, 经销商店级联结束 -->
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="入库状态" :label-cols="4" class="text-right">
                            <b-form-select v-model="queryParams.rowStatus" :options="statusOptions">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="确认日期" :label-cols="4" class="text-right">
                            <el-date-picker v-model="time" type="date" placeholder="选择日期" >
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
import SearchBtn from "components/searchBtn/searchBtn";
import Search from "components/iris-search/search";
import config from "common/config";
import api from "common/api";
import { formatDate } from 'common/com-api'
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import AreaTree from 'components/iris-areaqueryshop/index'

import Vue from 'vue'
import { DatePicker } from 'element-ui'
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
        if (Object.keys(this.storageParams).length > 0) {
            _this.$emit("query", JSON.parse(JSON.stringify(this.storageParams)));
        }
    },
    data() {
        return {
            queryParams: {
                orderType: '0',
                storeCodes: [],
                inStockNo: '',
                orderNo:'',
                carProductionCode: '',
                skuCode: '',
                skuName: '',
                carVinCode: '',
                supplierCode: '',
                rowStatus: '',
                invoiceOrderType: 'invoiceOrderTypeCarPurchase',
                pageNums: config.pageNums,
                pageStart: 1
            },
            statusOptions: [
                {
                    value: 0,
                    text: '未入库'
                },
                {
                    value: 1,
                    text: '已入库'
                }
            ],
            datalist: [],
            selectParams: {
                pageNums: config.pageNums,
                pageStart: 1
            },
            isLastPage: false,
            time: ''
        }
    },
    computed: {
        ...mapState('lVehicle', [
            'invoiceOrderTypes',
            'isInnerPurchase_',
            'storageParams'
        ]),
        _invoiceOrderType: function() {
            return this.queryParams.invoiceOrderType
        },
        getType: function() {
            return (this.queryParams.invoiceOrderType === config.invoiceOrderType.carPurchase)
        }
    },
    watch: {
        _invoiceOrderType: function(oldVal, newVal) {
            if(newVal == config.invoiceOrderType.internalProcurement) {
                this.GET_INVOICERTYPE(true)
            } else {
                this.GET_INVOICERTYPE(false)
            }
            this.$nextTick(val => {
                console.log(this.isInnerPurchase_)
            })
        }
    },
    created() {
        // if(this.queryParams.invoiceOrderType == config.invoiceOrderType.internalProcurement) {
            //this.query()
        // }
    },
    methods: {
        ...mapMutations('lVehicle',[
            'GET_INVOICERTYPE'
        ]),
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
            this.query();
        },
        query() {
            this.queryParams.pageStart = 1;
            this.queryParams.auditSystemDate = formatDate(this.time)
            let params = this.queryParams;
            this.$emit("query", this.queryParams);

            this.GET_INVOICERTYPE(JSON.parse(JSON.stringify(params)))
        },
        reset() {
            this.queryParams.inStockNo = ''
            this.queryParams.orderNo = ''
            this.queryParams.carProductionCode = ''
            this.queryParams.skuCode = ''
            this.queryParams.skuName = ''
            this.queryParams.carVinCode = ''
            this.queryParams.rowStatus = ''
            this.queryParams.supplierCode = ''
            this.queryParams.auditSystemDate = ''
            this.time = ''
            this.queryParams.invoiceOrderType ='invoiceOrderTypeCarPurchase'
            this.$refs.search.setValue()
            this.$refs.area.resetToStart()
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
            getStorageObj: "lVehicle/getStorageObj",
            getInvoiceOrderTypes: 'lVehicle/getInvoiceOrderTypes',
        })
    }
};
</script>
<style scoped>
.tree {
    position: relative;
}
.tree-box {
    position: absolute;
    width: 100%;
    z-index: 100;
    margin-top: 6px;
}
.el-tree-node {
    text-align: left !important;
}
</style>


