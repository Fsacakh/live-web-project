<template>
    <div class="row" @click="boxClick">
        <div class="col-md-6">
            <b-form-fieldset horizontal label="组织" :label-cols="4" class="text-right">
                <div @click="orgClick" ref="org">
                    <b-form-input v-model="params.orgName" readonly/>
                </div>
                <div class="text-left select-tree" v-show="orgShow">
                    <el-tree :data="orgTreeData" :props="orgOptions" :load="orgLoad" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="false" @node-click="orgItemClick">
                    </el-tree>
                </div>
            </b-form-fieldset>
        </div>
        <div class="col-md-6">
            <b-form-fieldset horizontal label="国标行政区域" :label-cols="4" class="text-right">
                <div @click="chinaClick" ref="china">
                    <b-form-input v-model="params.chinaName" readonly/>
                </div>
                <div class="text-left select-tree" v-show="chinaShow">
                    <el-tree :data="chinaTreeData" :props="chinaOptions" :load="chinaLoad" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="false" @node-click="chinaItemClick">
                    </el-tree>
                </div>
            </b-form-fieldset>
        </div>
        <div class="col-md-6">
            <b-form-fieldset horizontal label="配送区域" :label-cols="4" class="text-right">
                <div @click="distrClick" ref="distr">
                    <b-form-input v-model="params.distrName" readonly />
                </div>
                <div class="text-left select-tree" v-show="distrShow">
                    <el-tree :data="distrTreeData" :props="distrOptions" :load="distrLoad" node-key="id" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="false" @node-click="distrItemClick">
                    </el-tree>
                </div>
            </b-form-fieldset>
        </div>
        <div class="col-md-6">
            <b-form-fieldset horizontal label="开业时间" :label-cols="4" class="text-right">
                <el-date-picker v-model="openHours" type="date" placeholder="选择日期" :picker-options="pickerOptions" :disabled="isWatch">
                </el-date-picker>
            </b-form-fieldset>
        </div>
    </div>
</template>
<script>
    import config from 'common/config'
    import api from 'common/api'
    import {
        mapGetters
    } from 'vuex'
    import Vue from 'vue'
    import {
        Tree,
        DatePicker
    } from 'element-ui'
    Vue.use(Tree)
    Vue.use(DatePicker)
    import AreaTree from 'components/iris-areaqueryshop/index'
    export default {
        components: {
            AreaTree
        },
        data() {
            return {
                params: {
                    orgName: '',
                    chinaName: '',
                    saleName: '',
                    distrName: '',
                },
                saleName: '',
                salesCode: '',
                openHours: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                // org
                orgTreeData: [],
                orgOptions: {
                    children: 'children',
                    label: 'name'
                },
                orgShow: false,
                // china
                chinaTreeData: [],
                chinaOptions: {
                    children: 'children',
                    label: 'name'
                },
                chinaShow: false,
                // sale
                saleTreeData: [],
                saleOptions: {
                    label: 'name',
                    children: 'zones'
                },
                saleShow: false,
                // distr
                distrTreeData: [],
                distrOptions: {
                    label: 'name',
                    children: 'children'
                },
                distrShow: false,
                // store
                storeOptions: [],
                storeCode: ''
            }
        },
        mounted() {
            if (this.$route.params.id !== 'insert') {
                this.params = {
                    orgName: this.getWhDetail.orgName,
                    chinaName: this.getWhDetail.chinaCityName,
                    distrName: this.getWhDetail.deliveryAreaName,
                };
                this.saleName = this.getWhDetail.salesName;
                this.salesCode = this.getWhDetail.salesCode;
                this.storeCode = this.getWhDetail.storeCode;
                this.openHours = this.getWhDetail.openHours;
            }
        },
        computed: {
            ...mapGetters('classification', [
                'getWhDetail',
                'isWatch'
            ])
        },
        methods: {
            selectChange(sales, stores) {
                this.$emit('getStoreCode', stores);
            },
            // 组织
            orgLoad(node, resolve) {
                if (node.level === 0) {
                    let params = {
                        orgCode: config.areaRoot.org
                    };
                    api.area.getOrg(params).then(res => {
                        if (res.data.code === 'success') {
                            let obj = res.data.obj;
                            let arr = [{
                                id: 0,
                                name: obj.orgName,
                                code: obj.orgCode
                            }];
                            return resolve(arr);
                        }
                    })
                } else {
                    let params = {
                        orgCode: node.data.code
                    };
                    api.area.getOrg(params).then(res => {
                        if (res.data.code === 'success') {
                            let items = res.data.obj.childOrganizations;
                            let arr = [];
                            if (items !== null) {
                                items.forEach((item, index) => {
                                    let data = {
                                        name: item.orgName,
                                        code: item.orgCode
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
            orgItemClick(data) {
                this.params.orgName = data.name;
                this.$emit('getOrgCode', data);
                this.orgShow = false;
            },
            orgClick() {
                if (this.isWatch) {
                    return
                }
                this.orgShow = !this.orgShow;
            },
            boxClick() {
                try {
                    this.$refs.org.firstChild.id = ''
                    this.$refs.china.firstChild.id = ''
                    this.$refs.sale.firstChild.id = ''
                    this.$refs.distr.firstChild.id = ''
                } catch (e) {
                    return
                }
            },
            // 行政区域
            chinaLoad(node, resolve) {
                if (node.level === 0) {
                    let params = {
                        areaCode: config.areaRoot.area
                    };
                    api.area.getChinaAreaInfoByAreaCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let obj = res.data.obj;
                            let arr = [{
                                id: 0,
                                name: obj.areaName,
                                code: obj.areaCode
                            }];
                            return resolve(arr);
                        }
                    })
                } else {
                    let params = {
                        areaCode: node.data.code
                    };
                    api.area.getChinaAreaInfoByAreaCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let items = res.data.obj.chinaAreaSubInfo;
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
            chinaItemClick(data) {
                this.params.chinaName = data.name;
                this.$emit('getChinaCode', data);
                this.chinaShow = false;
            },
            chinaClick() {
                if (this.isWatch) {
                    return
                }
                this.chinaShow = !this.chinaShow;
            },
            // 销售区域
            saleLoad(node, resolve) {
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
            saleItemClick(data) {
                this.saleName = data.name;
                this.salesCode = data.code;
                this.$emit('getSaleCode', data);
                this.saleShow = false;
            },
            saleClick() {
                if (this.isWatch) {
                    return
                }
                this.saleShow = !this.saleShow;
            },
            // 配送区域
            distrLoad(node, resolve) {
                if (node.level === 0) {
                    let params = {
                        areaCode: config.areaRoot.darea
                    };
                    api.area.getDeliveryAreaInfoByAreaCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let obj = res.data.obj;
                            let arr = [{
                                id: 0,
                                name: obj.areaName,
                                code: obj.areaCode
                            }];
                            return resolve(arr);
                        }
                    })
                } else {
                    let params = {
                        areaCode: node.data.code
                    };
                    api.area.getDeliveryAreaInfoByAreaCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let items = res.data.obj.deliveryAreaSubInfo;
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
            distrItemClick(data) {
                this.params.distrName = data.name;
                this.$emit('getDistrCode', data);
                this.distrShow = false;
            },
            distrClick() {
                if (this.isWatch) {
                    return
                }
                this.distrShow = !this.distrShow;
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
        },
        watch: {
            saleName(val) {
                if (val) {
                    this.storeOptions = [];
                    let params = {
                        salesAreaCodes: [this.salesCode],
                        needPageFlag: '0'
                    }
                    this.getStore(params)
                }
            },
            storeCode(val) {
                this.$emit('getStoreCode', val)
            },
            openHours(val) {
                this.$emit('getOpenDate', val)
            },
            orgShow(val) {
                document.addEventListener('click', (e) => {
                    let _oTree = this.$refs.org;
                    if (_oTree && !_oTree.contains(e.target)) this.orgShow = false
                })
            },
            chinaShow(val) {
                document.addEventListener('click', (e) => {
                    let _oTree = this.$refs.china;
                    if (_oTree && !_oTree.contains(e.target)) this.chinaShow = false
                })
            },
            saleShow(val) {
                document.addEventListener('click', (e) => {
                    let _oTree = this.$refs.sale;
                    if (_oTree && !_oTree.contains(e.target)) this.saleShow = false
                })
            },
            distrShow(val) {
                document.addEventListener('click', (e) => {
                    let _oTree = this.$refs.distr;
                    if (_oTree && !_oTree.contains(e.target)) this.distrShow = false
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
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
