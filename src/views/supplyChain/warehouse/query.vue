<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="查询">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="仓库编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.warehouseCode" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="仓库名称" :label-cols="4" class="text-right">
                            <b-form-input v-model="queryParams.warehouseName" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="仓库归属门店" :label-cols="4" class="text-right">
                            <areaqueryshop ref="area" :storeAll="storeShow" @select-change="selectChange"></areaqueryshop>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="仓库类型" :label-cols="4" class="text-right">
                            <b-form-select v-model="queryParams.warehouseTypeFlag" :options="whTypeOptions">
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

import SearchBtn from 'components/searchBtn/searchBtn'
import config from 'common/config'
import api from 'common/api'
import { mapActions } from 'vuex'
import Vue from 'vue'
import { Tree, DatePicker, TimeSelect } from 'element-ui'
Vue.use(TimeSelect)
Vue.use(DatePicker)
Vue.use(Tree)
import { getType } from 'common/com-api'
import Areaqueryshop from 'components/iris-areaqueryshop'

export default {
    components: {
        SearchBtn,
        Areaqueryshop
    },
    data() {
        return {
            queryParams: {
                warehouseTypeFlag: 1,
                salesCode: '',
                storeCodeSet: [],
                pageNums: config.pageNums,
                pageStart: 1
            },
            calCostTypeOptions: [],
            whTypeOptions: [{
                text: '全部',
                value: 1
            },{
                text: '寄存仓',
                value: -1
            }, {
                text: '门店仓',
                value: 0
            }, {
                text: '共享仓',
                value: 2
            }],
            storeOptions: [],
            saleName: '',
            treeData: [],
            propOption: {
                children: 'children',
                label: 'name'
            },
            storeShow: true,
            show: false
        }
    },
    created() {
        // this.getWhType()
    },
    methods: {
        selectChange(sales, stores) {
            let _this = this
            if (stores instanceof Array) {
                _this.queryParams.storeCodeSet = []
                stores.forEach((item) => {
                    _this.queryParams.storeCodeSet.push(item.value)
                })
            } else if (stores.value === 0) {
                _this.queryParams.storeCodeSet = []
            } else if (stores.hasOwnProperty('value')) {
                _this.queryParams.storeCodeSet = []
                _this.queryParams.storeCodeSet[0] = stores.value
            }
        },
        query() {
            this.queryParams.pageStart = 1;
            let params = this.queryParams;
            this.getWhObj(params)
            this.$emit('query', this.queryParams)
        },
        reset() {
            this.queryParams.warehouseTypeFlag = 1
            this.queryParams.warehouseCode = ''
            this.queryParams.warehouseName = ''
            this.queryParams.salesCode = ''
            this.queryParams.pageNums = config.pageNums
            this.queryParams.pageStart = 1
        },
        // 加载子树数据
        loadNode(node, resolve) {
            if (node.level === 0) {
                api.finance.getSalesArea().then(res => {
                    if (res.data.code === 'success') {
                        let obj = res.data.obj;
                        let arr = [];
                        obj.forEach((item, index) => {
                            let data = {
                                id: 0,
                                name: item.areaName,
                                code: item.areaCode
                            }
                            arr.push(data)
                        })
                        return resolve(arr);
                    }
                })
            } else {
                let params = {
                    areaCode: node.data.code
                };
                api.area.getSalesAreaInfoByAreaCode(params, (res) => {
                    if (res.data.code === 'success') {
                        let items = res.data.obj.salesAreaSubInfo;
                        let arr = [];
                        if (items !== null) {
                            items.forEach((item, index) => {
                                let data = {
                                    name: item.areaName,
                                    code: item.areaCode
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
        handleNodeClick(data) {
            this.saleName = data.name;
            this.queryParams.salesCode = data.code;
            this.show = false;
        },
        showSelect() {
            this.show = !this.show;
        },
        getStore(params) {
            api.store.queryStoreBysale(params).then(res => {
                if (res.data.code === 'success') {
                    let obj = res.data.obj;
                    this.storeOptions = [];
                    obj.forEach((item) => {
                        let data = {
                            text: item.storeName,
                            value: item.storeCode
                        }
                        this.storeOptions.push(data)
                    })
                }
            })
        },
        boxClick() {
            try{
                this.$refs.oTree.firstChild.id = ''
            }catch (e) {
                return
            }
        },
        getWhType() {
            const params = { refCode: config.supplyChain.warehouse.whType };
            this.getDictionary(params, this.whTypeOptions)
        },
        getDictionary(params, arr, callback = () => { }) {
            api.ref.queryDictionaryDetails(params).then(res => {
                if (res.data.code === 'success') {
                    let list = res.data.obj.list;
                    list.forEach(item => {
                        let data = {
                            value: item.refDetailCode,
                            text: item.refDetailName
                        }
                        arr.push(data);
                    })
                    callback()
                }
            })
        },
        ...mapActions({
            getWhObj: 'classification/getWhObj'
        })
    },
    watch: {
        saleName(val) {
            if(val) {
                this.storeOptions = [];
                let params = {
                    salesAreaCodes: [this.queryParams.salesCode],
                    needPageFlag: '0'
                }
                this.getStore(params)
            }
        },
        show(val) {
            document.addEventListener('click', (e) => {
                let _oTree = this.$refs.oTree
                if(_oTree && !_oTree.contains(e.target)) {
                    this.show = false
                }
            }, true)
        }
    }
}
</script>
<style lang="css" scoped>
.select-tree {
    position: absolute;
    margin-top: 6px;
    width: 100%;
    z-index: 1000;
}

.el-tree {
    max-height: 300px;
    overflow-y: scroll;
}
</style>

