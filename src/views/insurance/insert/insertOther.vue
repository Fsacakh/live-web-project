<template>
    <div class="animated fadeIn" v-show="show">
        <div class="row">
            <div class="col-md-12">
                <b-card class="mb-3" header="业务信息">
                    <b-tabs pills>
                        <b-tab title="适用范围" active>
                            <suitscope @shop-preserve="saveStores" :tab-data="tabdata" @sales-preserve="saveSales" @remove-tr="remove"></suitscope>
                        </b-tab>
                        <b-tab title="险种">
                            <ins-type></ins-type>
                        </b-tab>
                        <b-tab title="手续费">
                            <cost></cost>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </div>
    </div>
</template>
<script>
    import ApplyRange from './applyRange'
    import Suitscope from 'components/iris-suitscope/'
    import Cost from './cost'
    import InsType from './insType'
    import {
        mapGetters
    } from 'vuex'
    import api from 'common/api'
    import common from 'common/common'
    export default {
        components: {
            ApplyRange,
            // InsuranceType,
            Suitscope,
            Cost,
            InsType
        },
        data() {
            return {
                typeOptions: [],
                tabdata: []
            }
        },
        computed: {
            show() {
                if (this.$route.params.id) {
                    return true
                } else {
                    if (this.insertOver) {
                        return true
                    }
                    return false
                }
            },
            ...mapGetters('insurance', [
                'coCode',
                'isUpdata',
                'insertOver'
            ])
        },
        mounted() {
            let _coCode = this.$route.params.id;
            if (_coCode) {
                this.getQueryRange({
                    coCode: _coCode
                }, res => {
                    this.tabdata = [];
                    res.forEach(item => {
                        let data = {
                            nationwide: "",
                            sales: item.salesAreaName,
                            shop: item.storeName || '全部',
                            id: item.id,
                            coCode: item.coCode,
                            rangeCode: item.rangeCode,
                            storeCode: item.storeCode,
                            salesAreaCode: item.salesAreaCode
                        }
                        this.tabdata.push(data)
                    })
                })
            }
        },
        methods: {
            // 保存经销商店
            saveStores(storelists) {
                this.save(storelists)
            },
            // 保存销售区域
            saveSales(salelists) {
                this.save(salelists)
            },
            remove(items) {
                // 之前是对象, 现已修改为数组
                let paramsArr = []
                for (let i = 0; i < items.length; i++) {
                    paramsArr.push({
                        "coCode": items[i].coCode,
                        "rangeCode": items[i].rangeCode,
                        "salesAreaCode": items[i].salesAreaCode,
                        "isDeleted": '1',
                        "id": items[i].id
                    })
                }
                this.insertRange(paramsArr.length == 0 ? null : paramsArr, (msg) => {
                    if (msg.data.code == "success") {
                        for (let i = 0; i < this.tabdata.length; i++) {
                            for (let j = 0; j < paramsArr.length; j++) {
                                if (this.tabdata[i].id == paramsArr[j].id) {
                                    this.tabdata.splice(i, 1)
                                }
                            }
                        }
                    }
                })
            },
            // 新增适用范围
            insertRange(params, callback = () => null) {
                api.insurance.insertOrUpdataRange(params.length === 0 ? null : params).then(res => {
                    if (res.data.code === 'success') {
                        common.alertInfo('success')
                        callback(res)
                    } else {
                        common.alertInfo('warning')
                    }
                })
            },
            // 查询适用范围
            getQueryRange(params, callback) {
                api.insurance.queryRange(params).then(res => {
                    if (res.data.code === 'success') {
                        let obj = res.data.obj
                        callback(obj)
                    }
                })
            },
            save(e) {
                let saveParams = [];
                let promise = new Promise((resolve, reject) => {
                    resolve()
                })
                promise.then(() => {
                    e.forEach(item => {
                        let data = {
                            "coCode": this.$route.params.id || this.coCode,
                            "rangeCode": item.rangeCode,
                            "salesAreaCode": item.salesAreaCode,
                            "storeCode": item.storeCode || ''
                        }
                        saveParams.push(data)
                    });
                }).then(() => {
                    this.insertRange(saveParams, () => {
                        let param = {
                            coCode: this.$route.params.id || this.coCode
                        };
                        this.getQueryRange(param, res => {
                            this.tabdata = [];
                            res.forEach(item => {
                                let data = {
                                    nationwide: "",
                                    sales: item.salesAreaName,
                                    shop: item.storeName || '全部',
                                    id: item.id,
                                    coCode: item.coCode,
                                    rangeCode: item.rangeCode,
                                    storeCode: item.storeCode,
                                    salesAreaCode: item.salesAreaCode
                                }
                                this.tabdata.push(data)
                            })
                        })
                    })
                })
            }
        }
    }
</script>
<style>

</style>


