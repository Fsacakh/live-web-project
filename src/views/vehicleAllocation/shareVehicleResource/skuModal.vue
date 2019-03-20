<template>
    <b-modal title="详细信息" v-model="showModal" no-close-on-backdrop no-close-on-esc size="lg" button-size="sm" @hidden="hideModal" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>厂家 : </strong>
                    <span>{{detailInfo.carFactoryName}}</span>
                </p>
            </div>
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>品牌 : </strong>
                    <span>{{detailInfo.carBrandName}}</span>
                </p>
            </div>
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>车系 : </strong>
                    <span>{{detailInfo.carSeriesName}}</span>
                </p>
            </div>
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>车型 : </strong>
                    <span>{{detailInfo.carModelName}}</span>
                </p>
            </div>
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>物流状态 : </strong>
                    <span>{{detailInfo.logisticsStatus | filter}}</span>
                </p>
            </div>
            <div class="col-md-4 col-sm-6">
                <p>
                    <strong>排量/进气 : </strong>
                    <span>{{opvAndIoType}}</span>
                </p>
            </div>
            <div v-for="(item, index) in list" class="col-md-4 col-sm-6">
                <p>
                    <strong>{{getKey(item.addCode)}} : </strong>
                    <span>{{item.addValue}}</span>
                </p>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import {
        getType
    } from 'common/com-api'
    import config from 'common/config'
    import api from 'common/api'
    export default {
        data() {
            return {
                showModal: false,
                detailInfo: {},
                dataList: [],
                refList: [],
                list: []
            }
        },
        computed: {
            opvAndIoType() {
                return `${this.detailInfo.carOpvName}/${this.detailInfo.carIotypeName}`
            },
            ...mapState('shareVehicleResource', [
                'showSkuModal'
            ])
        },
        created() {
            getType(config.product.archives.refCode, (items) => {
                this.refList = items
            })
        },
        methods: {
            getDefaultInfo(params) {
                let _this = this
                let newparams = {
                    skuCode: params.skuCode
                }
                api.product.archives.getEditInfo(newparams).then(res => {
                    if (res.data.code === 'success') {
                        _this.load = true
                        _this.detailInfo = res.data.obj
                        _this.list = []
                        let skuAddInfoVoList = res.data.obj.skuAddInfoVoList
                        if (skuAddInfoVoList != null) {
                            skuAddInfoVoList.forEach((item) => {
                                let obj = {
                                    addCode: item.addCode,
                                    addName: item.addName,
                                    addValue: item.addValue
                                }
                                _this.list.push(obj)
                            })
                        }
                        params.callback()
                    }
                })
            },
            getKey(item) {
                for (let i = 0, len = this.refList.length; i < len; i++) {
                    if (item == this.refList[i].refDetailCode) {
                        return this.refList[i].refDetailName
                    }
                }
            },
            _sort(name) {
                return (a, b) => a[name] - b[name]
            },
            hideModal: function() {
                this.$data.detailInfo = {}
                this.hideSkuModal()
            },
            ...mapActions('shareVehicleResource', [
                'hideSkuModal'
            ])
        },
        watch: {
            showSkuModal: {
                handler() {
                    this.showModal = this.showSkuModal
                }
            }
        },    
        filters: {
            filter(val) {
                if (val === -1) {
                    return '采购待确认'
                } else if (val === 1) {
                    return '在途'
                } else if (val === 2) {
                    return '入库'
                }
            }
        }
    }
</script>
