<template>
    <div class="animated">
        <b-card header="查询">
            <iris-car :col="2" :initData="intentionCarInfoVos[0]" ref="car" @callBack="backSkuCar" @validete="validateCar"></iris-car>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品名称" :label-cols="4" class="text-right">
                        <!-- <select class="form-control"> -->
                            <b-form-input v-model="query.skuName"/>
                            <!-- <option v-for="item in skuList" :value="item.skuCode">{{item.skuName}}</option> -->
                        <!-- </select> -->
                    </b-form-fieldset>
                </div>
                <div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button @click="clear">重置</b-button>
                        <b-button variant="primary" @click="queryModels">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div>
                <router-link to="addModels/0">
                    <b-button v-if="addBtn" variant="success" type="button">新增</b-button>
                </router-link>
                <b-button v-if="editBtn" variant="info" type="button" @click="jumpDetail(selitem)">编辑</b-button>
            </div>
            <div class="table-scrollable">
                    <b-table striped hover bordered show-empty :items="list" :fields="fields">
                        <template slot="checkbox" slot-scope="data" class="text-center">
                            <input type="radio" name="models" v-model="selitem" :value="data.item.relationCode">
                        </template>
                        <template slot="index" slot-scope="data">
                            {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1  }}</a>
                        </template>
                        <template slot="isDeleted" slot-scope="data">
                            <b-button v-if="editBtn" variant="danger" size="sm" @click="deleteModels(data.item)">删除</b-button>
                        </template>
                        <template slot="empty">
                                暂无数据...
                        </template>
                    </b-table>
                </div>
                <pagination class="pull-right" @page-change="pageChange"
                            :page-no="pager.pageNo"
                            :page-size="pager.pageSize"
                            :total-result="pager.total"
                            :total-pages="pager.totalPages">
                </pagination>
        </b-card>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import config from '../../../common/config.js'
    import { MessageBox, Message} from 'element-ui'
    import api from '../../../common/api'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import Search from 'components/iris-search/search'
    import Pagination from 'components/pagination/pagination'
    import IrisCar from 'components/iris-car'
    export default {
        data() {
            return {
                intentionCarInfoVos: [],
                selitem: '',
                pager: {
                    pageNo: 1,
                    pageSize: 15,
                    total: 1,
                    totalPages: 1
                },
                query: {
                    skuName: '',
                    factoryCode: '',
                    brandCode: '',
                    seriesCode: '',
                    modelCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                fields: {
                    checkbox: {label: '   '},
                    index: {label: '序号'},
                    relationCode: {label: '关系编码'},
                    skuName: {label: '商品名称'},
                    // factoryName: {label: '厂家'},
                    brandName: {label: '品牌'},
                    seriesName: {label: '车系'},
                    modelName: {label: '车型'},
                    isDeleted: {label: '操作'}
                },
                list: [],
                skuList: [],
            }
        },
        components: {
            Pagination,
            IrisCar
        },
        computed: {
            addBtn() {
                return hasBtn(apiUrls.product.models.addMOdels)
            },
            editBtn() {
                return hasBtn(apiUrls.product.models.editModels)
            },
            ...mapState('models', [
                    'addCode',
                    'skuCode'
                ])
        },
        created() {
            // this.getCarTypeInfo(this.parameter.carFactory)
        },
        methods: {
            backSkuCar(val) {
                const $this = this
                for (let i in val) {
                    $this.query[i] = val[i]
                }

            },
            validateCar() {},
            jumpDetail: function (id) {
                if (id == '') {
                    Message({
                        type: 'info',
                        message: config.messInfo.select
                    });
                } else {
                    this.$router.push({
                        path: `/models/editModels/${id}`
                    })
                }
            },
            clear: function () {
                this.$refs.car.clear()
                for(let i in this.query) {
                    this.query[i] = ""
                }
                this.query.pageNums = config.pageNums
                this.query.pageStart = 1
            },
            queryModels: function () {
                const $this = this
                $this.query.pageNums = config.pageNums
                $this.pageStart = 1
                this.$store.dispatch('models/queryModels', {
                    poros: $this.query,
                    callBack: function (msg) {
                        if(msg.data.code == "success") {
                            $this.list = msg.data.obj.list
                            $this.pager.pageNo = msg.data.obj.pageNum
                            $this.pager.totalPages = msg.data.obj.pages
                            $this.pager.pageSize = msg.data.obj.pageSize
                            $this.pager.total = msg.data.obj.total
                        }
                    }
                })
            },
            pageChange(page) {
                this.query.pageStart = page
                this.queryModels()
            },
            deleteModels: function (arg) {
                const $this = this
                let params = arg;
                params.isDeleted = "1"
                let name = params.addName
                MessageBox.confirm('确定删除 ' + name + '?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            $this.$store.dispatch('models/editModels', {
                                poros: params,
                                callBack: function (msg) {
                                    if(msg.data.code == "success") {
                                        $this.queryModels()
                                        Message({
                                            type: 'info',
                                            message: config.messInfo.success
                                        });
                                    }
                                }
                            })
                            done();
                        } else {
                            done();
                            return
                        }
                    },
                    callBack: function () {

                    }
                })
            },
            getCarTypeInfo: function (params) {
                // api.marketActivity.getCarTypeInfo(params)
                // .then((res) => {
                //     if (res.data.code == "success") {
                //         if (params == this.parameter.carFactory) {
                //             this.carFactory = res.data.obj
                //         } else if (params == this.parameter.carBrand) {
                //             this.carBrand = res.data.obj
                //         } else if (params == this.parameter.seriesCode) {
                //             this.carSeries = res.data.obj
                //         } else if (params == this.parameter.carModel) {
                //             this.carModel = res.data.obj
                //         }
                //     }
                // })
            },
        },
        watch: {
            //     factoryCode: function () {
            //         if (this.factoryCode) {
            //             this.brand = false
            //             this.parameter.carBrand.code = this.factoryCode.factoryCode
            //             this.query.factoryCode = this.factoryCode.factoryCode
            //             // this.query.factoryName = this.factoryCode.factoryName
            //             this.getCarTypeInfo(this.parameter.carBrand)
            //         }
            //     },
            //     brandCode: function () {
            //         if (this.brandCode) {
            //             this.series = false
            //             this.parameter.seriesCode.code = this.brandCode.brandCode
            //             this.query.brandCode = this.brandCode.brandCode
            //             // this.query.brandName = this.brandCode.brandName
            //             this.getCarTypeInfo(this.parameter.seriesCode)
            //         }
            //     },
            //     seriesCode: function () {
            //         if (this.seriesCode) {
            //             this.model = false
            //             this.parameter.carModel.code = this.seriesCode.seriesCode
            //             this.query.seriesCode = this.seriesCode.seriesCode
            //             // this.query.seriesName = this.seriesCode.seriesName
            //             this.getCarTypeInfo(this.parameter.carModel)
            //         }
            //     },
            //     modelCode: function () {
            //         if (this.modelCode) {
            //             this.opv = false
            //             this.parameter.carOpv.code = this.modelCode.modelCode
            //             this.query.modelCode = this.modelCode.modelCode
            //             // this.query.modelName = this.modelCode.modelName
            //             this.getCarTypeInfo(this.parameter.carOpv)
            //         }
            //     },
        }
    }
</script>
