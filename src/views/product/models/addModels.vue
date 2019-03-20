<template>
    <div class="animated">
        <b-card header="商品车型关系信息">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="商品名称 *" :label-cols="4" class="text-right">
                        <!-- <select class="form-control" v-model="edit.skuCode">
                            <option v-for="(item, index) in skuList" :value="item.value" :key="index">{{item.text}}</option>
                        </select> -->
                        <div class="text-left">
                            <search
                                :hasCheck="required"
                                ref="search"
                                :dataList="datalist"
                                option="skuName"
                                @dataChange="querySelect"
                                @itemValue="itemClick"
                                @clearValue="clearValue"
                                @comScroll="scrollBottom">
                            </search>
                                <!-- @clickShowBack="firstLoad" -->

                        </div>
                    </b-form-fieldset>
                </div>
            </div>
            <iris-car :col="2" :initData="intentionCarInfoVos[0]" ref="car" @callBack="back" @validete="validateCar"></iris-car>
                <div>
                    <!-- <div class="col-md-6">
                        <b-form-fieldset horizontal label="厂家" :label-cols="4" class="text-right">
                            <select class="form-control" v-model="factoryCode" :disabled="factory">
                                <option v-for="item in carFactory" :value="item">{{item.factoryName}}</option>
                            </select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="品牌" :label-cols="4" class="text-right">
                            <select class="form-control" v-model="brandCode" :disabled="brand">
                                <option v-for="item in carBrand" :value="item">{{item.brandName}}</option>
                            </select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="车系" :label-cols="4" class="text-right">
                            <select class="form-control" v-model="seriesCode" :disabled="series">
                                <option v-for="item in carSeries" :value="item">{{item.seriesName}}</option>
                            </select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="车型" :label-cols="4" class="text-right">
                            <select class="form-control" v-model="modelCode" :disabled="model">
                                <option v-for="item in carModel" :value="item">{{item.modelName}}</option>
                            </select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="排量" :label-cols="4" class="text-right">
                            <select class="form-control" v-model="opvCode" :disabled="opv">
                                <option v-for="item in carOpv" :value="item">{{item.opvName}}</option>
                            </select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="进气方式" :label-cols="4" class="text-right">
                            <select class="form-control" v-model="iotypeCode" :disabled="iotype">
                                <option v-for="item in carIotype" :value="item">{{item.iotypeName}}</option>
                            </select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="主车型" :label-cols="4" class="text-right">
                            <select class="form-control" v-model="carCode">
                                <option v-for="item in carmain" :value="item">{{item.displayName}}</option>
                            </select>
                        </b-form-fieldset>
                    </div> -->
                <div class="col-md-12 text-right">
                    <router-link to="/models/query">
                        <b-button>取消</b-button>
                    </router-link>
                    <b-button variant="primary" @click="saveModels(type)">保存</b-button>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { MessageBox, Message} from 'element-ui'
    import config from '../../../common/config.js'
    import api from '../../../common/api'
    import Search from 'components/iris-search/search'
    import IrisCar from 'components/iris-car'

    export default {
        data() {
            return {
                intentionCarInfoVos: [],
                type: '',
                skuInfo: '',
                query: {
                    // skuCode: '',
                    skuType: config.product.archives.boutuqueType,
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                edit: {
                    id: '',
                    skuCode: '',
                    skuName: '',
                    relationCode: '',
                    factoryCode: '',
                    factoryName : '',
                    brandCode: '',
                    brandName: '',
                    seriesCode: '',
                    seriesName: '',
                    modelCode: '',
                    modelName: '',
                    opvCode : '',
                    opvName : '',
                    iotypeCode: '',
                    iotypeName: '',
                    carCode: '',
                    carName: '',
                    remark: ''
                },
                parameter: {
                    carFactory: {
                        "code": "",
                        "level": "1",
                        "type": "0",
                    },
                    carBrand: {
                        "code": "",
                        "level": "2",
                        "type": "0",
                    },
                    seriesCode: {
                        "code": "",
                        "level": "4",
                        "type": "1",
                    },
                    carModel: {
                        "code": "",
                        "level": "8",
                        "type": "2",
                    },
                    carOpv: {
                        "code": "",
                        "level": "16",
                        "type": "3",
                    },
                    carIotype: {
                        "code": "",
                        "level": "32",
                        "type": "4",
                    }
                },
                skuList: [],
                // update by lwx on 2018/01/11
                datalist: [],
                selectParams: {
                    skuType: config.product.archives.boutuqueType,
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                isLastPage: false,
                required: false
            }
        },
        components: {
            Search,
            IrisCar
        },
        computed: {
            ...mapState('models', [
                    'relationCode'
                ])
        },
        created() {
            this.getCode()
            // this.getCarTypeInfo(this.parameter.carFactory)
            this.getMianCarInfo()
            this.querySelect()
        },
        methods: {
            back(val) {
                const $this = this
                for (let i in val) {
                    $this.edit[i] = val[i]
                }
            },
            validateCar() {},
            getCode: function () {
                const $this = this
                // $this.$store.dispatch('archives/queryArchives', {
                //     poros: $this.query,
                //     callBack: function (msg) {
                //         if(msg.data.code == "success") {
                //             let skuData = msg.data.obj.list
                //             skuData.forEach(function(item) {
                //                 let obj = {};
                //                 obj.value = item.skuCode
                //                 obj.text = item.skuName
                //                 $this.skuList.push(obj)
                //             });
                //         }
                //     }
                // })
                if ($this.$route.params.id == '0') {
                    $this.type = 'add'
                    $this.$store.dispatch('models/getCode', {
                        poros: {"serviceCode": config.product.goodsModels.getRelationCode},
                        callBack: function (msg) {
                            if (msg.data.code == "success") {
                                $this.edit.relationCode = $this.relationCode
                            }
                        }
                    })
                } else {
                    $this.type = 'edit'
                    this.$store.dispatch('models/queryModels', {
                        poros: {relationCode: $this.$route.params.id},
                        callBack: function (msg) {
                            if(msg.data.code == "success") {
                                let data = msg.data.obj.list[0]
                                for(let i in $this.edit) {
                                    $this.edit[i] = data[i]
                                }
                                $this.$refs.car.setValue(data)
                                $this.$refs.search.setValue(data.skuName)
                            }
                        }
                    })
                }
            },
            saveModels: function (type) {
                console.log(this.edit)
                if(!this.edit.skuCode) {
                    Message({
                        type: 'warning',
                        message: '商品名称必填！'
                    });
                    this.required = true
                    return
                }
                this.required = false
                const $this = this
                if (type == 'add') {
                    $this.$store.dispatch('models/addModels', {
                        poros: $this.edit,
                        callBack: function (msg) {
                            if(msg.data.code == "success") {
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                                $this.$router.push({
                                    path: `/models/query`
                                })
                            }
                        }
                    })
                } else {
                    let obj = $this.$route.params.id
                    $this.edit.relationCode = obj
                    console.log(this.edit.id)
                    $this.$store.dispatch('models/editModels', {
                        poros: $this.edit,
                        callBack: function (msg) {
                            if(msg.data.code == "success") {
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                            }
                        }
                    })
                }
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
                //         } else if (params == this.parameter.carOpv) {
                //             this.carOpv = res.data.obj
                //         } else if (params == this.parameter.carIotype) {
                //             this.carIotype = res.data.obj
                //         }
                //     }
                // })
            },
            getMianCarInfo: function () {
                api.product.models.getQueryInfo({})
                .then((res) => {
                    if (res.data.code == "success") {
                        this.carmain = res.data.obj.list
                    }
                })
            },

            // update by lwx on 2018/01/11
            clearValue() {
                this.edit.skuCode = '';
            },
            // 这里不需要
            firstLoad() {
                if(this.selectParams.skuName) {
                    delete this.selectParams.skuName;
                }else if(this.datalist.length !== 0) {
                    return;
                }
                let params = this.selectParams;
                this.querySkuList(params, obj => {
                    this.datalist = obj.list;
                });
            },
            querySelect(data) {
                this.selectParams.pageStart = 1;
                this.selectParams.skuName = data;
                let params = this.selectParams;
                this.querySkuList(params, obj => {
                    this.isLastPage = obj.isLastPage;
                    this.datalist = obj.list;
                });
            },
            itemClick(item) {
                this.edit.skuName = item.skuName
                this.edit.skuCode = item.skuCode;
                this.required = false
            },
            scrollBottom(isEnd) {
                if (isEnd && !this.isLastPage) {
                    this.selectParams.pageStart ++
                    let params = this.selectParams;
                    this.querySkuList(params, obj => {
                        this.isLastPage = obj.isLastPage;
                        this.datalist = this.datalist.concat(obj.list);
                    });
                }
            },
            querySkuList(params, callback) {
                api.product.archives.queryArchives(params).then(res => {
                    if (res.data.code == "success") {
                        let obj = res.data.obj;
                        callback(obj);
                    }
                })
            },
        },
        // 深度监听也不是那么的靠谱啊。。。
        // watch: {
        //     edit: {
        //         handler: function(val) {
        //             console.log(val)
        //             val.skuName
        //                 ? this.required = false
        //                 : this.required = true
        //         },
        //         deep: true
        //     }
        // }
    }
</script>
