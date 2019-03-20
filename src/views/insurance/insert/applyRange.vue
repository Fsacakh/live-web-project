<template>
    <div class="row">
        <div class="col-md-12">
            <div class="mb-3">
                <b-button variant="success" @click="showModal">新增</b-button>
                <b-button variant="primary" @click="save" v-show="saleList.length !== 0">保存</b-button>
            </div>

            <b-modal ref="range_Modal" size="lg" title="新增适用范围" ok-title="确定" cancel-title="取消" @ok="okClick(showStore ? '0' : '1')">
                <div class="row col-md-12">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="适用范围" :label-cols="3" class="text-left">
                            <b-form-select v-model="rangeValue" :options="rangeOptions">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6"></div>
                    <div class="col-md-6">
                        <!-- 销售区域树形图 -->
                        <div v-show="showSaleTree">
                            <el-tree :data="regions" :props="propOption" :load="loadNode" node-key="id" :default-expanded-keys="[0]" lazy accordion show-checkbox @check-change="handleCheckChange">
                            </el-tree>
                        </div>
                        <!-- 经销商树形图 -->
                        <div v-show="showStore">
                            <el-tree :data="regions" :props="propOption" :load="loadNode" node-key="id" :default-expanded-keys="[0]" lazy accordion show-checkbox check-strictly @check-change="storeHandleCheckChange">
                            </el-tree>
                        </div>
                    </div>
                    <div class="col-md-6 store-style" v-show="showStore">
                        <div class="store-header">
                            <strong>经销商店</strong>
                        </div>
                        <div v-for="item in storeItemsList" class="padding-10">
                            <div class="pull-left padding-right sale-color">
                                <span class="pull-left">{{item.sale}} : </span>
                            </div>
                            <div v-for="storeItem in item.store" class="pull-left padding-right">
                                <el-checkbox v-model="storeItem.checked" @change="storeChecked(item)"></el-checkbox>
                                <span>{{storeItem.text}}</span>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
            </b-modal>
            <!-- 销售区域 => tablelist -->
            <div class="table-scrollable" v-show="showSaleTree">
                <b-table striped hover bordered show-empty :items="saleList" :fields="fields">
                    <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                    <template slot="operation" slot-scope="data">
                        <b-button type="text" variant="danger" size="sm" @click="remove(data.item)">
                            删除
                        </b-button>
                    </template>
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
            <!-- 经销商店 => tablelist -->
            <div class="table-scrollable" v-show="showStore">
                <b-table striped hover bordered show-empty :items="storeItems" :fields="storeFields">
                    <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                    <template slot="operation" slot-scope="data">
                        <b-button type="text" variant="danger" size="sm" @click="removeStore(data.item)">
                            删除
                        </b-button>
                    </template>
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
        </div>
    </div>
</template>
<script>

import Api from 'common/api'
import Vue from 'vue'
import { Tree, Checkbox,Message } from 'element-ui'
Vue.use(Tree)
Vue.use(Checkbox)

export default {
    data() {
        return {
            rangeOptions: [
                // {
                //     value: 'a',
                //     text: '行政区域'
                // },
                {
                    value: 'b',
                    text: '销售区域'
                },
                {
                    value: 'c',
                    text: '经销商店'
                }
            ],
            rangeValue: '',
            // tree => options
            regions: [],
            propOption: {
                label: 'name',
                children: 'zones'
            },
            paramsList: [],
            inputText: [],
            showSaleTree: false,
            showStore: false,
            fields: {
                index: {
                    label: '序号'
                },
                country: {
                    label: '全国'
                },
                sale: {
                    label: '销售区域'
                },
                store: {
                    label: '经销商店'
                },
                operation: {
                    label: '操作'
                }
            },
            saleList: [],
            storeFields: {
                index: {
                    label: '序号'
                },
                country: {
                    label: '全国'
                },
                sale: {
                    label: '销售区域'
                },
                store: {
                    label: '经销商店'
                },
                cost: {
                    label: '手续费'
                },
                operation: {
                    label: '操作'
                }
            },
            // 获取经销商的必要参数
            storeParams: [],
            storeItems: [],
            storeItemsList: [],
            code: '',
            storeCode: ''
        };
    },
    methods: {
        showModal() {
            this.$refs.range_Modal.show();
        },
        hideModal() {
            this.$refs.range_Modal.hide();
        },
        handleCheckChange(data, checked, indeterminate) {
            if (data && checked) {
                this.paramsList.push(data.code)
                this.inputText.push(data.name)
                // this.inputValue = this.inputText.toString()
            }
            for (let i = 0, len = this.paramsList.length; i < len; i++) {
                if (data && !checked && this.paramsList[i] == data.code) {
                    this.paramsList.splice(i, 1)
                }
            }
            console.log(this.paramsList)
            for (let j = 0, len = this.inputText.length; j < len; j++) {
                if (data && !checked && this.inputText[j] == data.name) {
                    this.inputText.splice(j, 1)
                    // this.inputValue = this.inputText.toString()
                }
            }
        },
        // 两颗树可以共用
        loadNode(node, resolve) {
            if (node.level === 0) {
                Api.finance.getSalesArea().then(res => {
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
                Api.area.getSalesAreaInfoByAreaCode(params, (res) => {
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
                        }
                        return resolve(arr)
                    }
                })
            }
        },
        storeHandleCheckChange(data, checked, indeterminate) {
            if (data && checked) {
                this.storeParams.push(data.code)
                let obj = {
                    code: data.code,
                    sale: data.name,
                    store: []
                }
                this.storeItemsList.push(obj)
                // 获取区域下对应的经销商
                let params = {
                    salesAreaCodes: [data.code],
                    needPageFlag: '0'
                }
                this.code = data.code;
                this.getStore(params)
                // if (this.storeItemsList.length > 1) {
                //     Message({
                //         type: 'warning',
                //         message: '一次只能选择一个销售区域'
                //     });
                //     console.log(indeterminate)
                //     checked = false
                //     this.storeItemsList = [];
                // }
            }
            // 维护获取门店所需要的销售区域code列表
            for (let i = 0, len = this.storeParams.length; i < len; i++) {
                if (data && !checked && this.storeParams[i] == data.code) {
                    this.storeParams.splice(i, 1)
                    break
                }
            }
            // 维护给用户选择经销商店的数组列表
            for (let i = 0, len = this.storeItemsList.length; i < len; i++) {
                if (data && !checked && this.storeItemsList[i].code == data.code) {
                    this.storeItemsList.splice(i, 1)
                    break
                }
            }
        },
        storeChecked(item) { // 可能不需要
            // console.log(item)
            this.storeCode = item.code
        },
        okClick(e) {
            if (e === '1') {
                this.saleList = [];
                let text = this.inputText;
                for (let i = 0, len = text.length; i < len; i++) {
                    let data = {
                        country: null,
                        sale: text[i],
                        store: '全部'
                    }
                    this.saleList.push(data)
                }
            } else {
                let items = this.storeItemsList;
                console.log(items)
                for (let i = 0, len = items.length; i < len; i++) {
                    for (let j = 0, l = items[i].store.length; j < l; j++) {
                        // 无用功...
                        // if (items[i].store[j].checked && items[i].code === this.storeCode) {
                        if (items[i].store[j].checked) {
                            items.forEach((item) => {
                                let data = {
                                    sale: item.sale,
                                    store: items[i].store[j].text
                                }
                                this.storeItems.push(data)
                                // console.log(this.storeItems)
                            })
                        }
                    }
                }
                console.log(this.storeItems)
            }
        },
        // 后台没好，暂时空着、、、
        save() {

        },
        remove(item) {
            let list = this.saleList;
            for (let i = 0, len = list.length; i < len; i++) {
                if (item.sale === list[i].sale) {
                    list.splice(i, 1)      // success
                    break                  // 不加 return 或者 break error 'sale' is undefined
                }
            }
        },
        removeStore(item) {
            let list = this.storeItems;
            for (let i = 0, len = list.length; i < len; i++) {
                if (item.store === list[i].store) {
                    list.splice(i, 1)
                    break
                }
            }
        },
        getStore(params) {
            Api.store.queryStoreBysale(params).then(res => {
                if (res.data.code === 'success') {
                    let obj = res.data.obj;
                    for (let i = 0; i < this.storeItemsList.length; i++) {
                        if (this.storeItemsList[i].code === this.code) {
                            obj.forEach((item) => {
                                let data = {
                                    salesCode: item.salesCode,
                                    text: item.storeName,
                                    value: item.storeCode,
                                    checked: false
                                }
                                this.storeItemsList[i].store.push(data)
                            })
                        }
                    }
                }
            })
        },
    },
    watch: {
        rangeValue(val) {
            if (val === 'b') {             // sale
                this.showSaleTree = true;
                this.showStore = false;
            } else if (val === 'c') {      // store
                this.showSaleTree = false;
                this.showStore = true
            } else {                      //  area
                this.showSaleTree = false;
                this.showStore = false;
            }
        }
    }

}
</script>
<style>
.el-tree>div {
    min-height: 34px !important;
}

.store-style {
    border: 1px solid #d1dbe5;
}

.store-header {
    text-align: center
}
.padding-10 {
    padding: 10px;
}
.sale-color {
    color: red
}
.padding-right {
    padding-right: 10px;
}
</style>
