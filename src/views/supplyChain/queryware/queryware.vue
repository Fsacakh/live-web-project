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
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset label="商品类型" :label-cols="4" horizontal class="text-right">
                        <b-form-select v-model="skuTypeCode" :options="skuTypeOption" class=""></b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" :label-cols="4" class="text-right">
                        <b-form-input :disabled="isReadOnly" placeholder="" v-model="query.carVinNo" />
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品编码" label-text-align="right" :label-cols="4">
                        <b-form-input :disabled="!isReadOnly" placeholder="" v-model="query.skuCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品名称" label-text-align="right" :label-cols="4">
                        <b-form-input :disabled="!isReadOnly" placeholder="" v-model="query.skuName"/>
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
    import Vue from 'vue'
    import {
        MessageBox,
        Button,
        Message,
        TimePicker,
        DatePicker
    } from 'element-ui'
    import config from '../../../common/config.js'
    import api from '../../../common/api'
    import Pagination from 'components/pagination/pagination'
    import Areaqueryshop from 'components/iris-areaqueryshop/index'
    import car from 'components/iris-car/index'
    export default {
        data() {
            return {
                storeShow: false,
                entreList: [],
                judgeStateOne: null,
                skuTypeOption: [{
                    text: '整车',
                    value: 'goodsTypeCar'
                }, {
                    text: '非整车',
                    value: 'goodsTypeGood'
                }],
                skuTypeCode: 'goodsTypeCar',
                query: {
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
                        label: 'SKU编码'
                    },
                    skuName: {
                        label: '商品名称'
                    },
                    productionCode: {
                        label: '生产号'
                    },
                    carVinNo: {
                        label: '车架号'
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
            }
        },
        components: {
            Areaqueryshop,
            Pagination,
            car
        },
        computed: {
            isReadOnly() {
                return !(this.skuTypeCode == 'goodsTypeCar');
            }
        },
        methods: {
            reset() {
                this.query.whCode = '';
                this.query.skuCode = '';
                this.query.skuName = '';
                this.query.storeCode = '';
                this.query.storeCode = '';
                this.query.carVinNo = '';
            },
            carMethods(val) {
                console.log(val)
            },
            selectedfun(val, val2) {
                const $this = this
                $this.query.storeCode = val2['value']
                //在这里可以获取到经销商店的选择数据
                let options = {
                    'storeCodeSet': []
                }
                options.storeCodeSet.push(val2['value'])
                api.supplyChain.procurement.getEntrepot(options, function(res) {
                    if (res.data.code === 'success') {
                        const array = res.data.obj
                        $this.entreList = [];
                        for (var i = 0; i < array.length; i++) {
                            let obj = {}
                            obj.text = array[i].warehouseName
                            obj.value = array[i].warehouseCode
                            $this.entreList.push(obj)
                        }
                        if ($this.entreList.length === 0) {
                            let tempObj = {}
                            tempObj.text = "请选择仓库"
                            tempObj.value = ""
                            $this.entreList.push(tempObj)
                        }
                    }
                })
            },
            jumpDetail: function(id, carVinNo) {
                if (carVinNo) {
                    this.$router.push({
                        path: `/archives/addArchives/${id}`
                    })
                } else {
                    this.$router.push({
                        path: `/boutique/addBoutique/${id}`
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
                            console.info(obj);
                            $this.stockList = Object.assign(res.data.obj.list[0], obj);
                            console.info($this.stockList);
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
                const $this = this;
                //如果是整车
                if (this.skuTypeCode == 'goodsTypeCar') {
                    if (!$this.query.carVinNo) {
                        $this.stockList = '';
                        Message({
                            type: 'info',
                            message: '请输入车架号'
                        });
                        return;
                    }
                    api.product.archives.queryArchives({
                            carVinNo: $this.query.carVinNo,
                            skuTypeCode: config.product.archives.archivesType,
                            pageNums: config.pageNums,
                            pageStart: 1
                        })
                        .then((res) => {
                            if (res.data.code == "success") {
                                if (res.data.obj.list.length > 1) {
                                    Message({
                                        type: 'info',
                                        message: '请将车架号补充完整'
                                    });
                                }
                                if (res.data.obj.list.length == 1) {
                                    console.info(res.data.obj.list[0].skuCode);
                                    //通过skuCode 查询库存
                                    $this.getInventory({
                                        skuCode: res.data.obj.list[0].skuCode,
                                        pageNums: config.pageNums,
                                        pageStart: 1
                                    }, {
                                        productionCode: res.data.obj.list[0].productionCode,
                                        carVinNo: res.data.obj.list[0].carVinNo
                                    });
                                } else {
                                    $this.stockList = '';
                                }
                            }
                        })
                } else {
                    this.query.skuTypeCode = this.skuTypeCode
                    $this.getInventory(this.query, '', page);
                }
            },
            pageChange(page) {
                this.query.pageStart = page
                this.queryware(page)
            },
        },
        watch: {
            skuTypeCode(val) {
                if (val != 'goodsTypeCar') {
                    this.carVinNo = '';
                }
            }
        }
    }
</script>

