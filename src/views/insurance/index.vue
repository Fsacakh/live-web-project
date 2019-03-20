<template>
    <div>
        <b-card header="保险">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="保险公司" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="insurance.company" @keyup.enter="query" placeholder="保险公司名称最多30个字" :maxlength="30"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset label="选择经销商店" :label-cols="4" horizontal class="text-right">
                        <areaqueryshop ref="areaqueryshop" :storeAll="true" @select-change="selectedfun"></areaqueryshop>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="启用/停用" label-text-align="right" :label-cols="4">
                        <b-form-select :options="isUse" v-model="insurance.state" placeholder="" />
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="refresh">重置</b-button>
                        <b-button size="sm" variant="primary" @click="query">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-4">
            <div class="row mb-2">
                <div class="col-md-12">
                    <div class="pull-left">
                        <router-link to="/insurance/insert">
                            <b-button size="sm" variant="success" @click="test">新增</b-button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="list" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pageNo - 1)* pageSize + 1 }}
                    </template>
                    <template slot="insuranceCompany" slot-scope="data">
                        <a href="javascript:;" @click.prevent="showDetail(data.item.coCode)">{{ data.item.coName }}</a>
                    </template>
                    <template slot="typeOfCompany" slot-scope="data">
                        {{ data.item.coTypeName }}
                    </template>
                    <template slot="rangeOfUsage" slot-scope="data">
                        <span v-if="data.item.companyUseRangeInfoVos != null" v-for="(list, idx) in data.item.companyUseRangeInfoVos">{{ list.salesAreaName }}</br></span>
                    </template>
                    <template slot="rangeOfStore" slot-scope="data">
                        <span v-if="data.item.companyUseRangeInfoVos != null" v-for="(list, idx) in data.item.companyUseRangeInfoVos">{{ list.storeName }}</br></span>
                    </template>
                    <template slot="status" slot-scope="data">
                        {{ data.item.onOffFlag === "0" ? "启用": "停用" }}
                    </template>
                    <template slot="operation" slot-scope="data">
                        <b-button v-if="data.item.onOffFlag === '1'" size="sm" variant="success" @click="showTips(data.item.coCode, data.item.coName, data.item.onOffFlag)">启用</b-button>
                        <b-button v-if="data.item.onOffFlag === '0'" size="sm" variant="danger" @click="showTips(data.item.coCode,data.item.coName, data.item.onOffFlag)">停用</b-button>
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <div class="row mt-2">
                <div class="col-md-12">
                    <pagination class="pull-right" @page-change="pageChange" :page-no="pageNo" :page-size="pageSize" :total-result="totalResult" :total-pages="totalPages">
                    </pagination>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import Vue from 'vue'
import config from '../../common/config'
import api from '../../common/api'
import areaqueryshop from 'components/iris-areaqueryshop/'
import treepicker from '../../components/treepicker/treepicker'
import pagination from '../../components/pagination/pagination'
import { Tree, MessageBox, Message } from 'element-ui'
import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
} from 'vuex'
Vue.use(Tree)
export default {
    name: 'insurance',
    components: {
        pagination,
        treepicker,
        Tree,
        areaqueryshop
    },
    data() {
        return {
            show: false,
            insurance: {
                chinaAreaCodes: '',
                companyInfoVo: '',
                salesAreaCodes: '',
                storeCodes: '',
                areaCode: [],
                coName: '',
                // areaCodes: '',
                stores: '',
                state: ''
            },
            fields: {
                index: {
                    label: '序号'
                },
                insuranceCompany: {
                    label: '保险公司'
                },
                typeOfCompany: {
                    label: '保险公司类型'
                },
                rangeOfUsage: {
                    label: '适用范围(区域)'
                },
                rangeOfStore: {
                    label: '适用范围(门店)'
                },
                status: {
                    label: '状态'
                },
                operation: {
                    label: '操作'
                }
            },
            rangs: '',
            stores: [],
            // 启用/停用数据
            isUse: [
                { text: '停用', value: "1" },
                { text: '启用', value: "0" }
            ],
            regions: [],
            propOption: {
                label: 'name',
                children: 'zones'
            },
            paramsList: [],
            inputText: [],
            items: [],
            inputValue: '',
            list: [],
            chinaAreaCodes: [],
            salesAreaCodes: [],
            storeCodes: [],
            pageNo: 1,
            pageSize: 1,
            totalResult: 0,
            totalPages: 0,
            tempPage: 1
        }
    },
    methods: {
        query() {
            const _this = this
            let options = {
                "chinaAreaCodes": _this.chinaAreaCodes,
                "coName": _this.insurance.company,
                "onOffFlag": _this.insurance.state,
                "pageNums": config.pageNums,
                "pageStart": 1,
                "salesAreaCodes": _this.salesAreaCodes,
                "storeCodes": _this.storeCodes
            }
            api.insurance.getInsuranceDivice(options, function(res) {
                if (res.data.code === "success") {
                    _this.list = res.data.obj.list
                    _this.pageNo = res.data.obj.pageNum
                    _this.totalPages = res.data.obj.pages
                    _this.pageSize = res.data.obj.pageSize
                    _this.totalResult = res.data.obj.total
                }
            })
        },
        pageChange(page) {
            const _this = this
            _this.tempPage = page
            let options = {
                "chinaAreaCodes": _this.chinaAreaCodes,
                "coName": _this.insurance.company,
                "onOffFlag": _this.insurance.state,
                "pageNums": config.pageNums,
                "pageStart": page,
                "salesAreaCodes": _this.salesAreaCodes,
                "storeCodes": _this.storeCodes
            }
            api.insurance.getInsuranceDivice(options, function(res) {
                if (res.data.code === "success") {
                    _this.list = res.data.obj.list
                    _this.pageNo = res.data.obj.pageNum
                    _this.totalPages = res.data.obj.pages
                    _this.pageSize = res.data.obj.pageSize
                    _this.totalResult = res.data.obj.total

                }
            })
        },
        showTree() {
            this.show = !this.show
        },
        selectedfun(sales, stores) {
            let _this = this
            _this.storeCodes = []
            _this.salesAreaCodes = []
            if(sales && sales.length > 0) {
                sales.forEach((item) => {
                    _this.salesAreaCodes.push(item.code)
                })
            }
            if (stores instanceof Array) {
                stores.forEach(item => {
                    _this.storeCodes.push(item.value)
                })
            } else if (stores.hasOwnProperty("value")) {
                _this.storeCodes[0] = stores.value
            }
        },
        test() {
            this.getInsertOver(false)
        },
        refresh() {
            let _this = this
            _this.$data.insurance = {
                chinaAreaCodes: '',
                companyInfoVo: '',
                salesAreaCodes: '',
                storeCodes: '',
                areaCode: [],
                coName: '',
                stores: '',
                state: ''
            }
        },
        loadNode(node, resolve) {
            if (node.level === 0) {
                api.insurance.getAreas().then(res => {
                    if (res.data.code === 'success') {
                        let obj = res.data.obj;
                        let arr = [];
                        obj.forEach((item, index) => {
                            let data = {
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
                        }
                        return resolve(arr)
                    }
                })
            }
        },
        handleCheckChange(data, checked, indeterminate) {
            const _this = this
            if (data && checked) {
                this.paramsList.push(data.code)
                this.chinaAreaCodes.push(data.code)
                this.inputText.push(data.name)
                this.inputValue = this.inputText.toString()
                let option = {
                    salesAreaCodes: [data.code],
                    needPageFlag: '0'
                }
                api.store.queryStoreBysale(option).then(res => {
                    if (res.data.code === 'success') {
                        let obj = res.data.obj
                        for(let i =0; i< obj.length; i++) {
                            let objTemp = {}
                            objTemp.value = obj[i].salesCode
                            objTemp.text = obj[i].remark
                            _this.stores.push(objTemp)
                        }
                    }
                })
            }
        },
        showTips(arg1, arg2, arg3) {
            const _this = this
            // 记录方法 和参数  方便在提示框关闭之后回调函数使用
            // let callback = this.pageChange
            // 记录当前页面
            // let pager = this.pager.pageNo
            // 记录每页的活动条数
            // let pageSize = this.pager.pageSize
            // 编辑活动启用或禁用状态
            let onOffFlag = arg3 === '0' ? '1' : '0'
            // let onOffFlag = 0
            let options = {
                "id":'1',
                "onOffFlag":onOffFlag,
                'coCode': arg1,
                'companyAddInfoVo': []
            }
            let isForbidden = onOffFlag === '0' ? '启用' : '停用';
            const itemName = arg2
            // isForbidden = arg1===1 ? '停用': '启用';
            // 定义一个用于创建元素的h方法
            const h = this.$createElement;
            // MessageBox 和 Message 都是全局方法  所以直接调用
            MessageBox({
                title: '提示',
                // 具体消息提示是由定义的h方法 创建标签 添加进去的
                message: h('p', null, [
                    h('span', null, '确定' + isForbidden),
                    h('i', { style: 'fontStyle: normal' }, itemName)
                ]),
                // showCanceButton 值为false 取消不显示  值为true 取消显示
                showCancelButton: true,
                // 确定按钮的信息
                confirmButtonText: '确定',
                // 取消按钮的信息
                cancelButtonText: '取消',
                // 提示框关闭之前执行
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        api.insurance.editInsurance(options, function(res){
                            if(res.data.code === "success"){
                                _this.pageChange(_this.tempPage)
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                            }else {
                                Message({
                                    type: 'info',
                                    message: config.messInfo.fail
                                });
                            }
                        })
                        setTimeout(() => {
                            // done方法不调用  提示框不消失
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 300);
                    } else {
                        done();
                    }
                },
                callback: function() {
                    // 在MessageBox参数对象中，如果不使用Promise，则需要在对象参数中添加callback，否则控制台会报 Uncaught (in promise) cancel ， 如果callback中可以不做任何事情，但必须有
                    // callback(pager, pageSize)
                }
            })
        },
        showDetail(arg1) {
            this.$router.push({
                path: `insert/${arg1}`
            })
        },
        // 获取用户信息
        // getUserInfo() {
        //     const _this = this
        //     api.getUserAvailableInfo(function(res) {
        //         if(res.data.code === 'success') {
        //             _this.storeCodes = res.data.obj.availableStoreCodes
        //         }
        //     })
        // },
        ...mapMutations({
            getInsertOver: 'insurance/GET_INSERT_OVER'
        })
    },
}
</script>

<style scoped lang="css">
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
