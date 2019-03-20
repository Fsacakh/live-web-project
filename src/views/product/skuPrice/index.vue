<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-7 col-lg-6">
                    <b-form-fieldset horizontal label="商品编码/备件代码/商品名称" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <searchSku ref="codeSearch" :hasCheck='skuCheck' :dataList="codeDatalist" option="originalCode" @dataChange="codeQuerySelect" @itemValue="codeItemClick" @clickShowBack="codeFirstLoad" @clearValue="codeClearValue" @comScroll="codeScrollBottom">
                            </searchSku>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="渠道" label-text-align="right" :label-cols="4">
                        <b-form-select :options="channelTypes" v-model="skuPrice.channelType" placeholder=""></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="选择经销商店" label-text-align="right" :label-cols="4">
                        <areaqueryshop ref="areaqueryshop" @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="reset">重置</b-button>
                        <b-button size="sm" variant="primary" @click="searchSkuPrices">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-4">
            <div class="row mb-2">
                <div class="col-md-6">
                    <div class="pull-left">
                        <b-button v-if="addBtn" size="sm" variant="success" @click="addSkuPrice">新增</b-button>
                        <b-button v-if="editBtn" size="sm" variant="primary" @click="updateSkuPrice">编辑</b-button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="pull-right">
                        <b-button v-if="syncBtn" size="sm" variant="warning" @click="initRedis">同步数据</b-button>
                    </div>
                </div>
            </div>
            <div class="table-scrollable mb-2">
                <b-table striped hover bordered show-empty :items="skuPriceInfoList" :fields="fields">
                    <template slot="selectRow" slot-scope="data">
                        <input type="radio" :value="data.index" v-model="selectRow" name="selectRow"></input>
                    </template>
                    <template slot="guidingPrice" slot-scope="data">
                        {{ data.item.guidingPriceMin }} ~ {{ data.item.guidingPriceMax }}
                    </template>
                    <template slot="marketPrice" slot-scope="data">
                        {{ data.item.marketPriceMin }} ~ {{ data.item.marketPriceMax }}
                    </template>
                    <template slot="startTime" slot-scope="data">
                        {{ data.item.startTime | switchDate }}
                    </template>
                    <template slot="endTime" slot-scope="data">
                        {{ data.item.endTime | switchDate }}
                    </template>
                    <template slot="operate" slot-scope="data">
                        <b-button v-if="data.item.onOffFlag === 0 && operateBtn" size="sm" variant="success" @click="editSkuPriceOnOffFlag(data.index)">启用</b-button>
                        <b-button v-if="data.item.onOffFlag === 1 && operateBtn" size="sm" variant="danger" @click="editSkuPriceOnOffFlag(data.index)">停用</b-button>
                    </template>
                    <template slot="empty">
                        暂无数据
                    </template>
                </b-table>
           </div>
           <div class="row">
                <div class="col-md-12">
                     <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total" :total-pages="pager.totalPages">
                     </pagination>
                </div>
           </div>
       </b-card>
   </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import searchSku from '../../../components/iris-search/searchSku'
    import config from '../../../common/config'
    import pagination from '../../../components/pagination/pagination'
    import treepicker from '../../../components/treepicker/treepicker'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import api from 'common/api'
    import apiUrls from 'common/api-url'
    import {
        hasBtn
    } from 'common/com-api'
    export default {
        mounted() {
            this.getChannelTypes()
        },
        destroyed() {
        },
        data: function() {
            return {
                skuPrice: {
                    skuCode: '',
                    storeCodes: [],
                    channelType: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                selectRow: -1,
                fields: {
                    selectRow: {
                        label: '选择'
                    },
                    skuCode: {
                        label: '商品编码'
                    },
                    originalCode: {
                        label: '备件代码'
                    },
                    skuName: {
                        label: '商品名称'
                    },
                    skuPrice: {
                        label: '商品销售价格'
                    },
                    guidingPrice: {
                        label: '指导价'
                    },
                    marketPrice: {
                        label: '市场价'
                    },
                    startTime: {
                        label: '开始时间'
                    },
                    endTime: {
                        label: '结束时间'
                    },
                    operate: {
                        label: '操作'
                    }
                },
                skuCheck: false,
                codeDatalist: [],
                codeSelectParams: {
                    skuType:"goodsTypeGood",
                    pageNums: config.pageNums,
                    pageStart: 1
                },
            }
        },
        computed: {
            addBtn() {
                return hasBtn(apiUrls.product.skuPrice.editSkuPriceInfoVos)
            },
            editBtn() {
                return hasBtn(apiUrls.product.skuPrice.editSkuPriceInfoVos)
            },
            syncBtn() {
                return hasBtn(apiUrls.product.skuPrice.initRedis)
            },
            operateBtn() {
                return hasBtn(apiUrls.product.skuPrice.update)
            },
            ...mapState('skuPrice', [
                'channelTypes',
                'skuPriceInfoList',
                'pager'
            ])
        },
        methods: {
            ...mapActions('skuPrice', [
                'getChannelTypes',
                'getChinaAreaInfoByAreaCode',
                'showAddModal',
                'showUpdateModal',
                'updateSkuPriceInfoFlag'
            ]),
            searchSkuPrices: function() {
                this.$data.skuPrice.pageStart = 1
                if(this.$data.skuPrice.originalCode == null){
                    this.$data.skuPrice.originalCode = ''
                }
                this.$store.dispatch('skuPrice/getSkuPriceList', this.$data.skuPrice)
            },
            search: function() {
                this.$store.dispatch('skuPrice/getSkuPriceList', this.$data.skuPrice)
            },
            reset: function() {
                this.$data.skuPrice = {
                    originalCode: '',
                    skuName: '',
                    storeCodes: this.$data.skuPrice.storeCodes,
                    channelType: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
                this.$refs.codeSearch.clearValue()
            },
            pageChange: function(num) {
                this.$data.skuPrice.pageStart = num
                this.search()
            },
            // 同步数据功能
            initRedis() {
                api.product.skuPrice.initRedis((res) => {
                    if (res.data.code === 'success') {
                        Message({
                            type: 'success',
                            message: '数据同步成功'
                        })
                    }
                })
            },
            addSkuPrice: function() {
                this.$router.push('/skuPrice/add')
            },
            updateSkuPrice: function() {
                let _this = this
                if (parseInt(_this.selectRow) != -1) {
                    let priceCode = _this.skuPriceInfoList[_this.selectRow].priceCode
                    this.$router.push('/skuPrice/edit/' + priceCode)
                } else {
                    Message.closeAll()
                    Message({
                        type: 'error',
                        message: config.messInfo.selectOneRow
                    })
                }
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (stores instanceof Array) {
                    _this.skuPrice.storeCodes = []
                    stores.forEach((item) => {
                        _this.skuPrice.storeCodes.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.skuPrice.storeCodes = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.skuPrice.storeCodes = []
                    _this.skuPrice.storeCodes[0] = stores.value
                }
            },
            editSkuPriceOnOffFlag: function(index) {
                let _this = this
                let h = _this.$createElement
                MessageBox({
                    title: '提示',
                    message: h('h6', '确定修改商品价格启用停用状态!'),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: (action, instance) => {
                        if (action === 'confirm') {
                            _this.updateSkuPriceInfoFlag({
                                index: index,
                                callback: () => {
                                    _this.search()
                                }
                            })
                        }
                    }
                })
            },
            codeQuerySelect(data) {
                this.codeSelectParams.pageStart = 1;
                this.codeSelectParams.skuCodeOrName = data;
                let params = this.codeSelectParams;
                this.querySerInfo(params, obj => {
                    this.codeIsLastPage = obj.isLastPage;
                    this.codeDatalist = obj.list;
                });
            },
            codeItemClick(item) {
                this.skuPrice.skuCode = item.skuCode
            },
            codeFirstLoad() {
                if(this.codeSelectParams.skuCode) {
                    delete this.codeSelectParams.skuCode;
                }else if(this.codeDatalist.length !== 0) {
                    return;
                }
                let params = this.codeSelectParams;        
                this.querySerInfo(params, obj => {
                    this.codeDatalist = obj.list;
                });
            },
            codeClearValue() {
                this.skuPrice.skuCode = ''
                this.skuPrice.skuName = ''
                this.$refs.codeSearch.setValue()
            },
            codeScrollBottom(isEnd) {
                if (isEnd && !this.isLastPage) {
                    this.codeSelectParams.pageStart ++
                    let params = this.codeSelectParams;        
                    this.querySerInfo(params, obj => {
                        this.codeIsLastPage = obj.isLastPage;
                        this.codeDatalist = this.codeDatalist.concat(obj.list);
                    });
                }
            },
            querySerInfo(params, callback) {
                api.product.skuPrice.skuInfo(params, res => {
                    if (res.data.code === "success") {
                        let obj = res.data.obj;
                        callback(obj);
                    }
                })
            },
        },
        components: {
            pagination,
            treepicker,
            areaqueryshop,
            searchSku
        }
    }
</script>
