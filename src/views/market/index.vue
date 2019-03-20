<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="活动编码" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="market.maCode" placeholder="" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="活动名称" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="market.maName" placeholder="" />
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="外部活动编码" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="market.externalCode" placeholder="" />
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
                    <b-form-fieldset horizontal label="活动时段" :label-cols="4" class="text-right">
                        <el-date-picker
                            v-model="timeStep"
                            type="daterange"
                            @change="datechange()"
                            :clearable="true"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="活动类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="getMaTypeList" v-model="market.maType"/>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="状态" label-text-align="right" :label-cols="4">
                        <b-form-select v-model="market.onOffFlag" :options="stateList" class=""></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="refresh">重置</b-button>
                        <b-button size="sm" variant="primary" @click="search(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-4">
            <div class="row mb-2">
                <div class="col-md-12">
                    <div class="pull-left">
                        <b-button size="sm" v-if="addBtn" variant="success" @click.prevent="showDetail('0')">新增</b-button>
                    </div>
                    <div class="pull-right">
                        <b-button variant="warning" v-if="syncBtn" size="sm" @click="synchronization">同步数据</b-button>
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="list" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                    </template>
                    <template slot="maCode" slot-scope="data">
                        <a href="javascript:;" @click.prevent="showDetail(data.item.id)">{{ data.item.maCode }}</a>
                    </template>
                    <template slot="externalCode" slot-scope="data">
                        {{ data.item.externalCode }}
                    </template>
                    <template slot="activeBelong" slot-scope="data">
                        {{ data.item.storeCode }}
                    </template>
                    <template slot="carStyle" slot-scope="data">
                        {{ data.item.extendInfoList}}
                    </template>
                    <template slot="startTime" slot-scope="data">
                        {{ data.item.startTime.substring(0,10) }}
                    </template>
                    <template slot="endTime" slot-scope="data">
                        {{ data.item.endTime.substring(0,10) }}
                    </template>
                    <template slot="activeState" slot-scope="data">
                        {{ data.item.onOffFlag === 0 ? '已启用' : '已停用'}}
                    </template>
                    <template slot="onOffFlag" slot-scope="data">
                        {{ data.onOffFlag }}
                        <b-button v-if="data.item.onOffFlag === 0" size="sm" variant="danger" @click="showTips(data.item.onOffFlag, data.item.id, data.item.maName)">停用</b-button>
                        <b-button v-if="data.item.onOffFlag === 1" size="sm" variant="success" @click="showTips(data.item.onOffFlag, data.item.id, data.item.maName)">启用</b-button>
                    </template>
                    <template slot="empty">
                            暂无数据...
                    </template>
                </b-table>
            </div>
            <div class="row mt-2">
               <div class="col-md-12">
                 <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total" :total-pages="pager.totalPages">
                 </pagination>
               </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import Vue from 'vue'
    import config  from '../../common/config'
    import VueDate from 'vue-date'
    import pagination from '../../components/pagination/pagination'
    import treepicker from '../../components/treepicker/treepicker'
    // 按需引入element组件
    import { MessageBox, Message, DatePicker } from 'element-ui'
    import areaqueryshop from 'components/iris-areaqueryshop/'
    // import DatePicker from 'components/datepicker/datepicker'
    import api from 'common/api'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    Vue.use(DatePicker)
    export default {
        data() {
            return {
                carOptions: [],
                judgeName: '',
                // 请求数据参数
                selected: '',
                market: {
                    maCode: '',
                    maName: '',
                    maType: '',
                    startTime: '',
                    endTime: '',
                    pageNums: config.pageNums,
                    pageStart: 1,
                    chinaAareaCodes: [],
                    salesAreaCodes: [],
                    storeCodes: [],
                    onOffFlag: '',
                    externalCode: ''
                },
                fields: {
                    index: {
                        label: '序号'
                    },
                    maCode: {
                        label: '内部活动编码'
                    },
                    externalCode: {
                        label: '外部活动编码'
                    },
                    maName: {
                        label: '活动名称'
                    },
                    maTypeName: {
                        label: '活动类型'
                    },
                    activeBelong: {
                        label: '所属门店'
                    },
                    carStyle: {
                        label: '车系'
                    },
                    startTime: {
                        label: '开始时间'
                    },
                    endTime: {
                        label: '结束时间'
                    },
                    activeState: {
                        label: '活动状态'
                    },
                    onOffFlag: {
                        label: '操作'
                    }
                },
                // 区域和经销商店联动效果数据
                options: {
                    treeData: [],
                    treeProps: {
                       label: 'name',
                       children: 'zones'
                    },
                    loadNode: this.loadChildren
                },
                stateList: [{text: '停用', value : 1},{text: '启用', value : 0}],
                areaChoose: '',
                judge: false,
                timeStep: '',
            }
        },
        computed: {
            addBtn() {
                return hasBtn(apiUrls.marketActivity.createdMarketActivity)
            },
            syncBtn() {
                return hasBtn(apiUrls.market.synchronization)
            },
           ...mapState('market', [
               'list',
               'pager',
               'listlength',
               'result',
               'areas',
               'cars'
           ]),
           ...mapState('marketActivity', [
               'getMaTypeList'
           ])
        },
        created() {
            // 获取活动类型的数据
            this.$store.dispatch('marketActivity/getMaType', {
                    poros: {"refCode": config.market.refCode},
                    callBack: function () {

                    }
                })
            let options = {"areaCode" : config.areaRoot.sale}
            // 获取行政区域
            this.$store.dispatch('market/getMarketAreas', { options: options })
        },
        methods: {
            synchronization: function() {
                api.market.synchronization({}, res=>{
                    if(res.data.code == 'success') {
                        Message({
                            type: 'success',
                            message: '同步成功'
                        });
                    }
                })
            },
            datechange() {
                const _this = this
                if(_this.timeStep[0]) {
                    let timeOne = _this.timeStep[0]
                    let timeTwo = _this.timeStep[1]
                    _this.market.startTime = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                    _this.market.endTime = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
                }else {
                    _this.market.startTime = ''
                    _this.market.endTime = ''
                }
            },
            pageChange: function(num, pageSize) {
                this.$data.market.pageStart = num
                this.search()
            },
            search: function(judge) {
                // 此处的请求方法写在了vuex中，在vuex里进行请求，并将值进行储存
                if(judge === 1){
                    this.market.pageStart = 1
                    let store = this.$store
                    this.$store.dispatch('market/getMarkets', {"options":this.market,callback: function(res){
                        let options = []
                        let list = res.data.obj.list
                        if(list.length === 0) {
                            Message({
                                type: 'warning',
                                message: '没有符合条件的记录'
                            });
                        }
                        list.forEach((v)=>{
                            options.push(v.maCode)
                        })
                        store.dispatch('market/getMarketActivityDetail', {"maCodesList":options})
                        store.dispatch('market/getMarketActivityStores', {"maCodesList":options})
                    }})
                }else {
                    let store = this.$store
                    this.$store.dispatch('market/getMarkets', {"options":this.market,callback: function(res){
                        let options = []
                        let list = res.data.obj.list
                        list.forEach((v)=>{
                            options.push(v.maCode)
                        })
                        store.dispatch('market/getMarketActivityDetail', {"maCodesList":options})
                        store.dispatch('market/getMarketActivityStores', {"maCodesList":options})
                    }})
                }

            },
            selectedfun(sales, stores){
                let _this = this
                _this.market.salesAreaCodes = []
                _this.market.storeCodes = []
                if(sales && sales.length > 0) {
                    sales.forEach((item) => {
                        _this.market.salesAreaCodes.push(item.code)
                    }) 
                }
                if (stores instanceof Array) {
                    stores.forEach(item => {
                        _this.market.storeCodes.push(item.value)
                    })
                } else if (stores.hasOwnProperty("value")) {
                    _this.market.storeCodes[0] = stores.value
                }
            },
            refresh() {
                this.market.maCode = ""
                this.market.maName = ""
                this.market.maType = ""
                this.market.startTime = ""
                this.market.endTime = ""
                this.market.onOffFlag = ""
                this.market.externalCode = ""
                this.selected = ""
                this.timeStep = ""
            },
            // 区域和经销商店联动所需方法
            loadChildren(node, resolve) {
                let options
                let callback = function(res){
                    let data = []
                    let arr = res.data.obj.salesAreaSubInfo
                    if(arr != null) {
                    arr.forEach((item) => {
                        let node = {
                            "name": item.areaName,
                            "code": item.areaCode
                        }
                        data.push(node)
                        })
                    }
                    resolve(data)
                }
                if(node.level === 0){
                   options = {
                       "areaCode" : config.areaRoot.sale
                   }
                } else {
                    options = {
                        "areaCode" : node.data.code
                    }
                }
                this.$store.dispatch('market/getMarketCurrent',{options: options, callback: callback})
            },
            handleDataChange(data, checked, indeterminate) {
                let codesArray = []
                codesArray.push(data.code)
                let carOptions = this.carOptions
                let options = {
                    "salesAreaCodes" : codesArray,
                    "needPageFlag": 0
                    // "areaName" : data.name
                }
                // 处理  每选中一片区域 调用的api接口  返回经销商店的信息
                let callback = function(res) {
                }
                this.$store.dispatch( 'market/getMarketStore', options )
            },
            handleClose() {
                // this.close()
            },
            getActionType(){
                // 获取活动类型的数据
                this.$store.dispatch('marketActivity/getMaType', {
                    "refCode": config.market.refCode,
                    "refName": "",
                    "pageNums": config.pageNums,
                    "pageStart": "1"
                })
                let options = {"areaCode" : config.areaRoot.sale}
                // 获取行政区域
                this.$store.dispatch('market/getMarketAreas', { options: options })
            },
             // 路由参数传递
            showDetail(item){
                this.$router.push({
                    path : '/marketActivity/addMarketActivity/' + item
                })
            },
            showTips(arg1, arg2, arg3) {
                // 记录方法 和参数  方便在提示框关闭之后回调函数使用
                let callback = this.pageChange
                // 记录当前页面
                let pager = this.pager.pageNo
                // 记录每页的活动条数
                let pageSize = this.pager.pageSize
                // 修改活动启用或禁用状态
                let onOffFlag = arg1 === 0? 1 : 0
                let options = {
                    "id":arg2,
                    "onOffFlag":onOffFlag
                }
                let isForbidden = '启用';
                isForbidden = onOffFlag===1 ? '停用': '启用';
                // 定义一个用于创建元素的h方法
                const h = this.$createElement;
                // MessageBox 和 Message 都是全局方法  所以直接调用
                MessageBox({
                    title: '提示',
                    // 具体消息提示是由定义的h方法 创建标签 添加进去的
                    message: h('p', null, [
                            h('span', null, '确定'+ isForbidden),
                            h('i', { style: 'fontStyle: normal' }, arg3 + "?")
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
                            this.$store.dispatch('market/modifyMarket', {options:options, callback:function(res) {
                                if(res.data.code === "success"){
                                    Message({
                                        type: 'success',
                                        message: config.messInfo.success
                                    });
                                }else {
                                    Message({
                                        type: 'failed',
                                        message: config.messInfo.fail
                                    });
                                }
                            }})
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
                    callback: function(){
                        // 在MessageBox参数对象中，如果不使用Promise，则需要在对象参数中添加callback，否则控制台会报 Uncaught (in promise) cancel ， callback中可以不做任何事情，但必须有
                        callback(pager, pageSize)
                    }
                })
            }
        },
        watch: {
            market: {
                handler() {
                },
                deep: true
            }
        },
        components: {
            VueDate,
            pagination,
            treepicker,
            areaqueryshop
        }
    }
</script>
<style lang="scss" scoped>
    .el-input .el-input__inner {
        border-radius: 0 !important;
    }
    .el-input.is-disabled .el-input__inner{
        background-color: #c2cfd6 !important;
        border-radius: 0 !important;
    }
    .el-input__icon {
        color: #536c79 !important;
    }
    .el-input {
        width: 100% !important;
    }
</style>

