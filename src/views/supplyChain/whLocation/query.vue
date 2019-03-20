<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="查询">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="库位编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.whLocationCode" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="库位名称" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.whLocationName" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                            <areaqueryshop :storeAll="true" ref="area" @select-change="selectChange"></areaqueryshop>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="仓库名称" :label-cols="4" class="text-right">
                            <div class="text-left">
                                <search
                                    ref="searchWh"
                                    :dataList="datalist"
                                    option="warehouseName"
                                    @clearValue="clearValue"
                                    @dataChange="querySelect"
                                    @itemValue="itemClick"
                                    @clickShowBack="firstLoad"
                                    @comScroll="scrollBottom"> 
                                </search>
                            </div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="库区名称" :label-cols="4" class="text-right">
                            <div class="text-left">
                                <search
                                    ref="searchWhArea"
                                    :dataList="whAreaList"
                                    option="whAreaName"
                                    @clearValue="whAreaClearValue"
                                    @dataChange="whAreaQuerySelect"
                                    @itemValue="whAreaItemClick"
                                    @clickShowBack="whAreaFirstLoad"
                                    @comScroll="whAreaScrollBottom">
                                </search>
                            </div>
                        </b-form-fieldset>
                    </div>
                </div>
                <search-btn @reset="reset" @query="query"></search-btn>
            </b-card>
        </div>
    </div>
</template>
<script>

import SearchBtn from 'components/searchBtn/searchBtn'
import Search from "components/iris-search/search"
import config from 'common/config'
import Areaqueryshop from 'components/iris-areaqueryshop'
import api from 'common/api'
import { mapActions } from 'vuex'

export default {
    components: {
        SearchBtn,
        Search,
        Areaqueryshop
    },
    data() {
        return {
            queryParams: {
                whLocationCode: '',
                whLocationName: '',
                warehouseCode: '',
                whAreaCode: '',
                storeCodeSet: [],
                pageNums: config.pageNums,
                pageStart: 1
            },
            // 仓库名称参数
            datalist: [],
            selectParams: {
                storeCodeSet: [],
                pageNums: config.pageNums,
                pageStart: 1
            },
            isLastPage: false,
            // 库区名称参数
            whAreaList: [],
            whAreaSelectParams: {
                storeCode: '',
                pageNums: config.pageNums,
                pageStart: 1
            },
            whAreaisLastPage: false,
        }
    },
    created() {
        api.toLogin.getJurisdiction().then(res => {
            if(res.data.code === 'success') {
                const Vo = res.data.obj || {}
                const storeVo = Vo.storeInfoVo
                this.selectParams.storeCodeSet = storeVo ? [storeVo.storeCode] : []
                this.whAreaSelectParams.storeCode = storeVo ? storeVo.storeCode : ''
            }
        })
    },
    methods: {
        
        // 选择门店
        selectChange(sales, stores) {
            if (stores instanceof Array) {
                stores.forEach((item) => { 
                    item.value && this.queryParams.storeCodeSet.push(item.value)
                    item.value && this.selectParams.storeCodeSet.push(item.value) 
                })
            } else {
                this.queryParams.storeCodeSet = stores.value ? [stores.value] : []
                this.selectParams.storeCodeSet = stores.value ? [stores.value] : []
                this.$refs.searchWh.setValue('')
                this.$refs.searchWhArea.setValue('')
                this.queryParams.whAreaCode = ''
                this.queryParams.warehouseCode = ''
                this.firstLoad()
            }
        },
        
        query() {
            this.queryParams.pageStart = 1;
            let params = this.queryParams;
            this.getWhlocationObj(params)
            this.$emit('query', this.queryParams)
        },
        reset() {
            
            this.queryParams.whLocationCode = ''
            this.queryParams.whLocationName = ''
            this.queryParams.warehouseCode = ''
            this.queryParams.whAreaCode = ''
            this.queryParams.pageNums = config.pageNums
            this.queryParams.pageStart = 1

            this.selectParams.pageNums = config.pageNums
            this.selectParams.pageStart = 1

            this.$refs.searchWh.setValue()
            this.$refs.searchWhArea.setValue()
            this.$refs.area.reset()
        },
        // 仓库名称 - 下拉搜索
        clearValue() {
            this.queryParams.warehouseCode = '';
        },
        firstLoad() {
            if(this.selectParams.warehouseName) {
                delete this.selectParams.warehouseName;
            }
            let params = this.selectParams;   
            this.selectParams.pageStart = 1     
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
            this.$refs.searchWhArea.setValue()
            this.queryParams.whAreaCode = '';
            this.queryParams.warehouseCode = item.warehouseCode;
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
            api.supplyChain.warehouse.getQueryInfo(params).then(res => {
                if (res.data.code === "success") {
                    let obj = res.data.obj;
                    callback(obj);
                }
            });
        },
        // 库区名称 - 下拉搜索
        whAreaClearValue() {
            this.queryParams.whAreaCode = '';            
        },
        whAreaFirstLoad() {
            if(this.whAreaSelectParams.whAreaName) {
                delete this.whAreaSelectParams.whAreaName;
            }
            let params = this.whAreaSelectParams;   
            params.warehouseCode = this.queryParams.warehouseCode;   
            if(params.warehouseCode) {
                this.queryWhAreaInfo(params, obj => {
                    this.whAreaList = obj.list;
                });
            }    
        },
        whAreaQuerySelect(data) {
            this.whAreaSelectParams.pageStart = 1;
            this.whAreaSelectParams.whAreaName = data;
            this.whAreaSelectParams.warehouseCode = this.queryParams.warehouseCode;  
            let params = this.whAreaSelectParams;        
            this.queryWhAreaInfo(params, obj => {
                this.isLastPage = obj.isLastPage;            
                this.whAreaList = obj.list;
            });
        },
        whAreaItemClick(item) {
            this.queryParams.whAreaCode = item.whAreaCode;
        },
        whAreaScrollBottom(isEnd) {
            if (isEnd && !this.isLastPage) {
                this.whAreaSelectParams.pageStart ++
                let params = this.whAreaSelectParams;        
                this.queryWhAreaInfo(params, obj => {
                    this.isLastPage = obj.isLastPage;
                    this.whAreaList = this.whAreaList.concat(obj.list);
                });
            }
        },
        queryWhAreaInfo(params, callback) {
            api.supplyChain.whArea.getQueryInfo(params).then(res => {
                if (res.data.code === "success") {
                    let obj = res.data.obj;
                    callback(obj);
                }
            });
        },
        ...mapActions({
            getWhlocationObj: 'classification/getWhlocationObj'
        })
    }
}
</script>

