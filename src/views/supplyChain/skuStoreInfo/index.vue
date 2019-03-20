<template lang="html">
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset label="选择经销商店" :label-cols="4" horizontal class="text-right">
                        <areaqueryshop ref="areaqueryshop" :reset="storeShow" :readonly="true" @select-change="selectedfun"></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="仓库名称" :label-cols="4" class="text-right">
                        <b-form-select v-model="query.whCode" :state="judgeStateOne" :options="entreList"></b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-7 col-lg-6">
                    <b-form-fieldset horizontal label="商品编码/备件代码/商品名称" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <searchSku ref="codeSearch" :hasCheck='skuCheck' :dataList="codeDatalist" option="originalCode" @dataChange="codeQuerySelect" @itemValue="codeItemClick" @clickShowBack="codeFirstLoad" @clearValue="codeClearValue" @comScroll="codeScrollBottom">
                            </searchSku>
                        </div>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="reset">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryware()">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-4">
            <div>
                <b-button v-if="downLoadListBtn" size="sm" @click="downLoadList">导出</b-button>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="stockList" :fields="fields">
                    <template slot="index" slot-scope="data">
                                    {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
</template>
<template slot="skuCode" slot-scope="data">
    <a href="javascript:;" @click.prevent="jumpDetail(data.item.skuCode, data.item.carVinNo)">{{ data.item.skuCode }}</a>
</template>
<template slot="empty">
     暂无数据...
</template>
                </b-table>
            </div>
            <pagination
                class="pull-right"
                @page-change="pageChange"
                :page-no="pager.pageNo"
                :page-size="pager.pageSize"
                :total-result="pager.total"
                :total-pages="pager.totalPages">
            </pagination>
        </b-card>
    </div>
</template>
<script>
    import {
        MessageBox,
        Button,
        Message,
        TimePicker,
        DatePicker
    } from 'element-ui'
    import config from '../../../common/config.js'
    import searchSku from '../../../components/iris-search/searchSku'
    import api from '../../../common/api'
    import Pagination from 'components/pagination/pagination'
    import Areaqueryshop from 'components/iris-areaqueryshop'
    import car from 'components/iris-car'
    import apiUrl from 'common/api-url'
    import {
        hasBtn
    } from 'common/com-api'
    export default {
        data() {
            return {
                storeShow: false,
                entreList: [],
                judgeStateOne: null,
                skuTypeCode: config.product.archives.boutuqueType,
                query: {
                    originalCode: '',
                    whCode: "",
                    skuCode: '',
                    skuName: '',
                    storeCode: '',
                    carVinNo: '',
                    skuTypeCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                pager: {
                    pageNo: 1,
                    pageSize: 15,
                    total: 1,
                    totalPages: 1
                },
                select: [],
                stockList: [],
                fields: {
                    index: {
                        label: '序号'
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
                    whName: {
                        label: '仓库名称'
                    },
                    whAreaName: {
                        label: '库区名称'
                    },
                    whLocationName: {
                        label: '库位名称'
                    },
                    stockNums: {
                        label: '库存总数'
                    },
                    lockNums: {
                        label: '锁定数量'
                    },
                    availableNums: {
                        label: '可用数量'
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
            downLoadListBtn() {
                return hasBtn(apiUrl.supplyChain.procurement.downloadOrder)
            }
        },
        methods: {
            downLoadList: function() {
                // console.log(666)
                let obj = {
                    whCode: this.query.whCode,
                    skuCode: this.query.skuCode,
                    skuName: this.query.skuName,
                    storeCodes: this.query.storeCode ? [this.query.storeCode] : [],
                    carVinNo: this.query.carVinNo,
                    skuTypeCode: "goodsTypeGood",
                    pageNums: this.query.pageNums,
                    pageStart: this.query.pageStart
                }
                api.supplyChain.procurement.downloadOrder(obj, res => {
                    if (res.data.code == 'success') {
                        let path = res.data.obj
                        window.location.href = path
                    }
                })
            },
            reset() {
                this.$data.query = {
                    originalCode: '',
                    whCode: "",
                    skuCode: '',
                    skuName: '',
                    storeCode: this.$data.query.storeCode,
                    carVinNo: '',
                    skuTypeCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
                this.$refs.codeSearch.clearValue()
            },
            selectedfun(sales, stores) {
                let _this = this
                let options = {
                    'storeCodeSet': []
                }
                if (stores instanceof Array) {
                    stores.forEach((item) => {
                        options.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    options.storeCodeSet = []
                    _this.$data.query.storeCode = ''
                } else if (stores.hasOwnProperty('value')) {
                    options.storeCodeSet = []
                    options.storeCodeSet[0] = stores.value
                    _this.$data.query.storeCode = stores.value
                }
                options.warehouseTypeFlag = 0
                if (options.storeCodeSet.length > 0) {
                    api.supplyChain.procurement.getEntrepot(options, function(res) {
                        if (res.data.code === 'success') {
                            const array = res.data.obj
                            _this.entreList = [];
                            for (var i = 0; i < array.length; i++) {
                                let obj = {}
                                obj.text = array[i].warehouseName
                                obj.value = array[i].warehouseCode
                                _this.entreList.push(obj)
                            }
                            if (_this.entreList.length === 0) {
                                let tempObj = {}
                                tempObj.text = "请选择仓库"
                                tempObj.value = ""
                                _this.entreList.push(tempObj)
                            }
                        }
                    })
                } else {
                    _this.entreList = []
                }
            },
            jumpDetail: function(id, carVinNo) {
                if (carVinNo) {
                    this.$router.push({
                        path: `/archives/addArchives/${id}`
                    })
                } else {
                    this.$router.push({
                        path: `/boutique/boutiqueDetial/${id}`
                    })
                }
            },
            getInventory(data, obj, page) {
                const $this = this;
                let params = data
                params.pageStart = page;
                api.supplyChain.queryInventory(params, (res) => {
                    if (res.data.code == "success") {
                        if (obj) {
                            $this.stockList = Object.assign(res.data.obj.list[0], obj);
                        }
                        $this.stockList = res.data.obj.list;
                        $this.pager.pageNo = res.data.obj.pageNum
                        $this.pager.totalPages = res.data.obj.pages
                        $this.pager.pageSize = res.data.obj.pageSize
                        $this.pager.total = res.data.obj.total
                    }
                })
            },
            queryware(page) {
                const $this = this
                this.query.skuTypeCode = this.skuTypeCode
                $this.getInventory(this.query, '', page)
            },
            pageChange(page) {
                this.query.pageStart = page
                this.queryware(page)
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
                console.log(item)
                // this.skuPrice.skuName = item.skuName
                this.query.skuCode = item.skuCode
                // this.skuPrice.originalCode = item.originalCode
            },
            codeFirstLoad() {
                if (this.codeSelectParams.skuCode) {
                    delete this.codeSelectParams.skuCode;
                } else if (this.codeDatalist.length !== 0) {
                    return;
                }
                let params = this.codeSelectParams;
                this.querySerInfo(params, obj => {
                    this.codeDatalist = obj.list;
                });
            },
            codeClearValue() {
                this.query.skuCode = ''
                this.$refs.codeSearch.setValue()
            },
            codeScrollBottom(isEnd) {
                if (isEnd && !this.isLastPage) {
                    this.codeSelectParams.pageStart++
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
            Areaqueryshop,
            Pagination,
            car,
            searchSku
        },
    }
</script>
