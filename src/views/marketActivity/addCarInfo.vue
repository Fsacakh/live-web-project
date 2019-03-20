<template>
    <div class="animated fadeIn col-md-12">
        <div class="row">
            <div class="col-md-12 text-left mb-2">
                <b-button v-if="editBtn" variant="primary" class="pl-3 pr-3 pt-2 pb-2" @click="saveSubmit">
                    保存
                </b-button>
            </div>
            <div class="col-md-6">
                <div class="col-md-12 already">
                    <el-tree style="border: none"
                        :expand-on-click-node='false'
                        :highlight-current='true'
                        :data="regions"
                        :props="props"
                        :load="loadNode"
                        node-key='value'
                        empty-text="暂无数据"
                        lazy
                        :accordion="true"
                        @current-change="handleCheckChange">
                    </el-tree>
                </div>
            </div>
            <div class="col-md-6">
                <div  class="text-right already padding-15">
                    <div class="card m-0 float-left ml-2 mb-2" v-for="(item, index) in selectedCar" :key="index">
                        <div class="card-body p-0 clearfix ml-1">
                            {{item.longName}}
                            <i v-if="editBtn" @click="removeTree(item.longName, item)" class="fa fa-remove bg-danger p-1  ml-3 float-right white"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import config from '../../common/config.js'
    import common from '../../common/common.js'
    import api from '../../common/api.js'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import { tree, MessageBox, Message} from 'element-ui'
    Vue.use(tree)
    Vue.component(MessageBox.name, MessageBox)
    export default {
        data() {
            return {
                selectedCar: [],
                //树
                regions: [],
                props: {
                    label: 'name',
                    children: 'zones'
                },
                count: 1,
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
                },
                brandInfo: [],
                one: true
            }
        },
        components: {
        },
        computed: {
            editBtn() {
                return hasBtn(apiUrls.marketActivity.addCarType)
            },
            ...mapState('marketActivity', [
                'carFactory',                 //厂家信息
                'carBrand',                   //品牌信息
                'carSeries',                  //车系信息
                'carModel',                   //车型信息
                'maCode',
                'maCarCode'                 
            ])
        },
        created() {
            this.getCarTypeInfo()
        },
        mounted() {
            const _this = this
        },
        methods: {
            getCarInfo: function(maCode) {
                api.market.getMarketCarInfo([maCode], res => {
                    if (res.data.code == 'success') {
                        res.data.obj.forEach((item, index) => {
                            let obj = {

                            }
                            obj.maCarCode = item.maCarCode;
                            obj.id = item.id;
                            obj.isDeleted = item.isDeleted;
                            obj.brandCode = item.brandCode;
                            obj.seriesCode = item.seriesCode;
                            obj.modelCode = item.modelCode;
                            obj.longName = (item.brandName?item.brandName:"")+(item.seriesName?"/"+item.seriesName:"")+(item.modelName?"/"+item.modelName:'');
                            this.selectedCar.push(obj)
                        });
                    }
                })
            },
            getCarTypeInfo () {
                const _this = this;
                _this.$store.dispatch('marketActivity/getCarTypeInfo', {
                    poros: config.isShowFactory ? _this.parameter.carBrand:_this.parameter.carFactory,
                    callBack: function (msg) {
                        let carData = msg.data.obj
                        
                        for (let i = 0; i < carData.length; i++) {
                            carData[i].longName = carData[i].brandName || carData[i].factoryName;
                            carData[i].name = carData[i].brandName || carData[i].factoryName;
                            carData[i].code = carData[i].brandCode || carData[i].factoryCode;
                            _this.regions = carData
                        }
                    }
                })
            },
            saveSubmit: function () {
                // if(!this.selectedCar) {
                //     Message({
                //         type: 'info',
                //         message: '车型不能为空'
                //     });
                //     return
                // }
                let parameter = [];
                for (let i = 0; i < this.selectedCar.length; i++) {
                    let obj = {};
                    obj.maCode = this.maCode;
                    obj.id = this.selectedCar[i].id;
                    obj.maCarCode = this.selectedCar[i].maCarCode;
                    // obj.factoryCode = this.selectedCar[i].factoryCode;
                    obj.brandCode = this.selectedCar[i].brandCode;
                    obj.seriesCode = this.selectedCar[i].seriesCode;
                    obj.modelCode = this.selectedCar[i].modelCode;
                    parameter.push(obj);
                }
                this.$store.dispatch('marketActivity/addMarketCar', {
                    poros: parameter,
                    callBack: function (msg) {
                        if (msg.data.code == "success") {
                            Message({
                                type: 'info',
                                message: config.messInfo.success
                            });
                        } else {
                            // Message({
                            //     type: 'info',
                            //     message: config.messInfo.fail
                            // });
                        }
                        
                    }
                })
            },
            handleCheckChange(data, node) {
                const _this = this;
                for (let i = 0, len = _this.selectedCar.length; i<len; i++) {
                    let list = this.selectedCar[i].longName
                    if(list === data.longName) {
                        this.removeTree(data.longName, this.selectedCar[i])
                        return
                    }
                }
                this.$store.dispatch('marketActivity/getSequence', {
                    poros: {"serviceCode": config.market.getMaCarCode},
                    callBack: function (msg) {
                        let obj = {
                            id: '',
                            isDeleted: '0',
                            maCode: _this.maCode,
                            maCarCode: _this.maCarCode,
                            // "factoryCode": data.factoryCode,
                            brandCode: data.brandCode,
                            seriesCode: data.seriesCode,
                            modelCode: data.modelCode,
                            longName: data.longName,
                            level: node.level
                        };
                        _this.selectedCar.push(obj)
                    }
                })
            },
            loadNode(node, resolve) {
                const _this = this;
                if(config.isShowFactory) {
                    if (node.level === 1) {
                        _this.parameter.seriesCode.code = node.data.code
                        // console.log(node.data)
                        // console.log(_this.parameter.carBrand)
                        // console.log(_this.parameter.seriesCode)
                        this.$store.dispatch('marketActivity/getCarTypeInfo', {
                            poros: _this.parameter.seriesCode,
                            callBack: function (msg) {
                                let carData = msg.data.obj
                                for (let i = 0; i < carData.length; i++) {
                                    carData[i].longName = node.data.longName + '/' + carData[i].seriesName;
                                    carData[i].name = carData[i].seriesName
                                    carData[i].code = carData[i].seriesCode
                                    carData[i].brandName = node.data.brandName
                                    carData[i].brandCode = node.data.brandCode
                                    // carData[i].seriesName = node.data.seriesName
                                    // carData[i].seriesCode = node.data.seriesCode
                                }
                                return resolve(carData);
                            }
                        })
                    } else if (node.level === 2) {
                        _this.parameter.carModel.code = node.data.code
                        this.$store.dispatch('marketActivity/getCarTypeInfo', {
                            poros: _this.parameter.carModel,
                            callBack: function (msg) {
                                let carData = msg.data.obj
                                for (let i = 0; i < carData.length; i++) {
                                    carData[i].longName = node.data.longName + '/' + carData[i].modelName;
                                    // carData[i].name = carData[i].seriesName
                                    // carData[i].code = carData[i].seriesCode
                                    carData[i].name = carData[i].modelName
                                    carData[i].code = carData[i].modelCode
                                    carData[i].brandName = node.data.brandName
                                    carData[i].brandCode = node.data.brandCode
                                    carData[i].seriesName = node.data.seriesName
                                    carData[i].seriesCode = node.data.seriesCode
                                    // carData[i].modelName = node.data.modelName
                                    // carData[i].modelCode = node.data.modelCode
                                }
                                return resolve(carData);
                            }
                        })
                    } 
                    // else if (node.level === 3) {
                    //     _this.parameter.carModel.code = node.data.code
                    //     this.$store.dispatch('marketActivity/getCarTypeInfo', {
                    //         poros: _this.parameter.carModel,
                    //         callBack: function (msg) {
                    //             let carData = msg.data.obj
                    //             for (let i = 0; i < carData.length; i++) {
                    //                 carData[i].longName = node.data.longName + ': ' + carData[i].modelName;
                    //                 carData[i].name = carData[i].modelName
                    //                 carData[i].code = carData[i].modelCode
                    //                 carData[i].seriesName = node.data.seriesName
                    //                 carData[i].seriesCode = node.data.seriesCode
                    //                 carData[i].brandName = node.data.brandName
                    //                 carData[i].brandCode = node.data.brandCode
                    //                 carData[i].factoryName = node.data.factoryName
                    //                 carData[i].factoryCode = node.data.factoryCode
                    //             }
                    //             return resolve(carData);
                    //         }
                    //     })
                    // } 
                    else {
                        return resolve([]);
                    }
                } else {
                    if (node.level === 1) {
                        _this.parameter.carBrand.code = node.data.code
                        this.$store.dispatch('marketActivity/getCarTypeInfo', {
                            poros: _this.parameter.carBrand,
                            callBack: function (msg) {
                                let carData = msg.data.obj
                                for (let i = 0; i < carData.length; i++) {
                                    carData[i].longName = node.data.longName + '/' + carData[i].brandName;
                                    carData[i].name = carData[i].brandName
                                    carData[i].code = carData[i].brandCode
                                    carData[i].factoryName = node.data.factoryName
                                    carData[i].factoryCode = node.data.factoryCode
                                }
                                return resolve(carData);
                            }
                        })
                    } else if (node.level === 2) {
                        _this.parameter.seriesCode.code = node.data.code
                        this.$store.dispatch('marketActivity/getCarTypeInfo', {
                            poros: _this.parameter.seriesCode,
                            callBack: function (msg) {
                                let carData = msg.data.obj
                                for (let i = 0; i < carData.length; i++) {
                                    carData[i].longName = node.data.longName + '/' + carData[i].seriesName;
                                    carData[i].name = carData[i].seriesName
                                    carData[i].code = carData[i].seriesCode
                                    carData[i].brandName = node.data.brandName
                                    carData[i].brandCode = node.data.brandCode
                                    carData[i].factoryName = node.data.factoryName
                                    carData[i].factoryCode = node.data.factoryCode
                                }
                                return resolve(carData);
                            }
                        })
                    } else if (node.level === 3) {
                        _this.parameter.carModel.code = node.data.code
                        this.$store.dispatch('marketActivity/getCarTypeInfo', {
                            poros: _this.parameter.carModel,
                            callBack: function (msg) {
                                let carData = msg.data.obj
                                for (let i = 0; i < carData.length; i++) {
                                    carData[i].longName = node.data.longName + ': ' + carData[i].modelName;
                                    carData[i].name = carData[i].modelName
                                    carData[i].code = carData[i].modelCode
                                    carData[i].seriesName = node.data.seriesName
                                    carData[i].seriesCode = node.data.seriesCode
                                    carData[i].brandName = node.data.brandName
                                    carData[i].brandCode = node.data.brandCode
                                    carData[i].factoryName = node.data.factoryName
                                    carData[i].factoryCode = node.data.factoryCode
                                }
                                return resolve(carData);
                            }
                        })
                    } else {
                        return resolve([]);
                    }
                }
                
            },
            // removeHeavy(level) {
            //     for (var i = 0; i < this.selectedCar.length; i++) {
            //         if (this.selectedCar[i].level > level) {
            //             this.selectedCar.splice(i, 1);
            //         }
            //     }
            // },
            removeTree(longName, item) {
                let params = [item]
                let val = [...params]    
                let obj = val[0]
                if(item.id) {
                    obj.isDeleted = 1
                    api.marketActivity.addCarType(val, res => {
                        if(res.data.code == 'success') {
                        }
                    })
                }
                for (var i = 0; i < this.selectedCar.length; i++) {
                    if (this.selectedCar[i].longName === longName) {
                        this.selectedCar.splice(i, 1);
                        return true;
                    }
                }
                return false;
            },

        },
        watch: {
            selectedCar: function () {
                let carData = [];
                for (let i = 0; i < this.selectedCar.length; i++) {
                    let obj = {};
                    obj.maCode = this.maCode;
                    obj.maCarCode = this.maCarCode;
                    // obj.factoryCode = this.selectedCar[i].factoryCode;
                    obj.brandCode = this.selectedCar[i].brandCode;
                    obj.seriesCode = this.selectedCar[i].seriesCode;
                    obj.modelCode = this.selectedCar[i].modelCode;
                    carData.push(obj);
                }
                this.$store.dispatch('marketActivity/changeCarData', carData)
            }
        }
    }
</script>
<style scoped>
    .already {
        height: 200px;
        overflow: auto;
        border: 1px solid #ccc;
    }
    .padding-15 {
        padding: 15px;
    }
    .pointNone{
        margin-top: 10px;
    }
</style>