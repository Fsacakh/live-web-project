<template>
    <div class="animated fadeIn">
        <b-card header="商品价格信息">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="选择经销商店" label-text-align="right" :label-cols="4">
                        <areaqueryshop ref="areaqueryshop" @select-change="selectStores"></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="渠道" label-text-align="right" :label-cols="4">
                        <b-form-select :disabled="isUpdate" v-model="skuPriceInfo.channelType" :options="channelTypes" placeholder=""></b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6" v-show="!isUpdate">
                    <b-form-fieldset horizontal label="有效时间" label-text-align="right" :label-cols="4">
                        <date-picker v-model="timeStep" type="daterange" @change="dateChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                        </date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <!-- <div class="row" v-show="!isUpdate">
                  <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="有效时间" label-text-align="right" :label-cols="4">
                           <date-picker
                               v-model="timeStep"
                               type="daterange"
                               @change="dateChange"
                               range-separator="至"
                               start-placeholder="开始日期"
                               end-placeholder="结束日期"
                               :picker-options="pickerOptions">
                           </date-picker>
                      </b-form-fieldset>
                  </div>
              </div> -->
            <b-tabs pills>
                <b-tab title="商品列表" active>
                    <div class="animated fadeIn">
                        <div class="row mb-2">
                            <div class="col-md-12">
                                <div class="pull-left" v-show="!isUpdate">
                                    <b-button size="sm" variant="success" @click="selectSkuInfo">新增</b-button>
                                    <b-button size="sm" variant="danger" @click="removeSkuInfo">删除</b-button>
                                </div>
                            </div>
                        </div>
                        <div class="table-scrollable">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <!-- <th v-for="(field) in fields" > -->
                                        <th v-for="field in fields" :key="field">
                                            {{ field.label }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- <tr v-for="(item, index) in items"> -->
                                    <tr v-for="(item, index) in items" :key="index">
                                        <td>
                                            <input type="radio" :value="index" v-model="selectRow" name="selectRow" />
                                            <!-- </input> -->
                                        </td>
                                        <td>
                                            {{ item.skuCode }}
                                        </td>
                                        <td>
                                            {{ item.originalCode }}
                                        </td>
                                        <td>
                                            {{ item.skuName }}
                                        </td>
                                        <td>
                                            <b-form-input type="number" v-model.trim="item.skuPrice"></b-form-input>
                                        </td>
                                        <td>
                                            <b-form-input type="number" v-model.trim="item.marketPriceMin"></b-form-input>
                                        </td>
                                        <td>
                                            <b-form-input type="number" v-model.trim="item.marketPriceMax"></b-form-input>
                                        </td>
                                        <td>
                                            <b-form-input type="number" v-model.trim="item.guidingPriceMin"></b-form-input>
                                        </td>
                                        <td>
                                            <b-form-input type="number" v-model.trim="item.guidingPriceMax"></b-form-input>
                                        </td>
                                        <td class="min-width">
                                            <date-picker v-model="item.startTime" value-format="yyyy-MM-dd" @change="setStartDate(index)">
                                            </date-picker>
                                        </td>
                                        <td class="min-width">
                                            <date-picker v-model="item.endTime" value-format="yyyy-MM-dd" @change="setEndDate(index)">
                                            </date-picker>
                                        </td>
                                    </tr>
                                    <tr v-if="items.length == 0">
                                        <td colspan='10' class="text-left">暂无数据...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </b-tab>
            </b-tabs>
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="pull-right mt-2">
                        <b-button size="sm" @click="goBack">取消</b-button>
                        <b-button size="sm" variant="primary" @click="addSkuPrice" :disabled="skuPriceInfo.onOffFlag == 1">确定</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <select-modal></select-modal>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../../common/config'
    import selectModal from './selectModal'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import {
        MessageBox,
        Message,
        DatePicker
    } from 'element-ui'
    export default {
        mounted() {
            let _this = this
            _this.getChannelTypes()
            if (_this.isUpdate) {
                _this.getSkuPriceInfoByCode({
                    priceCode: _this.$route.params.priceCode,
                    callback: (skuPriceInfo) => {
                        _this.$data.skuPriceInfo = JSON.parse(JSON.stringify(skuPriceInfo))
                        _this.$refs.areaqueryshop.setselect({
                            value: (skuPriceInfo.storeCode === '0' ? '' : skuPriceInfo.storeCode),
                            salesCode: skuPriceInfo.salesAreaCode
                        })
                    }
                })
            }
        },
        destroyed() {
            this.resetSkuPriceList()
        },
        data: function() {
            return {
                selectRow: -1,
                channelType: null,
                timeStep: [],
                skuPriceInfo: {
                    originalCode: '',
                    chinaAreaCode: '',
                    salesAreaCode: '',
                    storeCode: '',
                    channelType: '',
                    startTime: '',
                    endTime: ''
                },
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
                    marketPriceMin: {
                        label: '市场价【最低】'
                    },
                    marketPriceMax: {
                        label: '市场价【最高】'
                    },
                    guidingPriceMin: {
                        label: '指导价【最低】'
                    },
                    guidingPriceMax: {
                        label: '指导价【最高】'
                    },
                    startTime: {
                        label: '开始时间'
                    },
                    endTime: {
                        label: '截止时间'
                    }
                },
                items: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }
        },
        computed: {
            ...mapState('skuPrice', [
                'channelTypes',
                'selectSkuPriceInfoList'
            ]),
            isUpdate: function() {
                let priceCode = this.$route.params.priceCode
                if (priceCode != null && priceCode != '') {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            addSkuPrice: function() {
                let _this = this
                _this.editSkuPriceInfo({
                    skuPriceInfoList: _this.$data.items,
                    callback: function() {
                        _this.goBack()
                    }
                })
            },
            selectSkuInfo: function() {
                if (this.checkValues()) {
                    this.showSelectModal()
                }
            },
            removeSkuInfo: function() {
                let _this = this
                if (parseInt(this.selectRow) != -1) {
                    _this.items.splice(parseInt(this.selectRow), 1)
                    _this.removeSelectedSkuPriceList({
                        index: _this.selectRow,
                        callback: function() {
                            _this.selectRow = -1
                        }
                    })
                } else {
                    Message.closeAll()
                    Message({
                        type: 'error',
                        message: config.messInfo.selectOneRow
                    })
                }
            },
            dateChange: function() {
                let _this = this
                if (_this.$data.timeStep && _this.$data.timeStep.length > 0) {
                    let timeOne = _this.timeStep[0]
                    let timeTwo = _this.timeStep[1]
                    _this.$data.skuPriceInfo.startTime = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                    _this.$data.skuPriceInfo.endTime = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
                } else {
                    _this.$data.skuPriceInfo.startTime = ''
                    _this.$data.skuPriceInfo.endTime = ''
                }
            },
            goBack: function() {
                this.$router.go(-1)
            },
            checkValues: function() {
                if (this.skuPriceInfo.salesAreaCode == '' && this.skuPriceInfo.storeCode == '') {
                    Message.closeAll()
                    Message({
                        type: 'error',
                        message: '请选择行政区域或销售区域或门店'
                    })
                    return false
                }
                if (this.skuPriceInfo.channelType == '') {
                    Message.closeAll()
                    Message({
                        type: 'error',
                        message: '请选择销售渠道'
                    })
                    return false
                }
                return true
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array && sales.length > 0) {
                    _this.$data.skuPriceInfo.salesAreaCode = sales[0].code
                } else if (sales instanceof Object) {
                    _this.$data.skuPriceInfo.salesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.$data.skuPriceInfo.storeCode = stores[0].value
                } else if (stores.hasOwnProperty('value')) {
                    _this.$data.skuPriceInfo.storeCode = stores.value
                } else {
                    _this.$data.skuPriceInfo.storeCode = ''
                }
            },
            setStartDate: function(index) {
                let _this = this
                let time = _this.$data.items[index].startTime
                if (time != undefined && time != '') {
                    _this.$data.items[index].startTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
                }
            },
            setEndDate: function(index) {
                let _this = this
                let time = _this.$data.items[index].endTime
                let startTime = new Date(_this.$data.items[index].startTime)
                let endTime = new Date(_this.$data.items[index].endTime)
                if (endTime.getTime() < startTime.getTime()) {
                    _this.$data.items[index].endTime = _this.$data.items[index].startTime
                    return
                }
                if (time != undefined && time != '') {
                    _this.$data.items[index].endTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
                }
            },
            ...mapActions('skuPrice', [
                'getSkuPriceCode',
                'showSelectModal',
                'setSkuPriceInfo',
                'getChannelTypes',
                'getSkuPriceInfoByCode',
                'editSkuPriceInfo',
                'removeSelectedSkuPriceList',
                'resetSkuPriceList'
            ])
        },
        watch: {
            skuPriceInfo: {
                handler(val) {
                    let _this = this
                    _this.setSkuPriceInfo({
                        skuPriceInfo: {
                            chinaAreaCode: _this.$data.skuPriceInfo.chinaAreaCode,
                            salesAreaCode: _this.$data.skuPriceInfo.salesAreaCode,
                            storeCode: _this.$data.skuPriceInfo.storeCode,
                            channelType: _this.$data.skuPriceInfo.channelType,
                            startTime: _this.$data.skuPriceInfo.startTime,
                            endTime: _this.$data.skuPriceInfo.endTime
                        }
                    })
                    _this.$data.items.forEach((item) => {
                        item.chinaAreaCode = _this.$data.skuPriceInfo.chinaAreaCode
                        item.salesAreaCode = _this.$data.skuPriceInfo.salesAreaCode
                        item.storeCode = _this.$data.skuPriceInfo.storeCode
                        item.channelType = _this.$data.skuPriceInfo.channelType
                        item.startTime = _this.$data.skuPriceInfo.startTime
                        item.endTime = _this.$data.skuPriceInfo.endTime
                    })
                },
                deep: true
            },
            selectSkuPriceInfoList: {
                handler(val) {
                    let _this = this
                    _this.selectSkuPriceInfoList.forEach((item) => {
                        let index = _this.$data.items.findIndex((priceItem) => {
                            return (item.skuCode == priceItem.skuCode)
                        })
                        if (index < 0) {
                            _this.$data.items.push({
                                id: item.id,
                                onOffFlag: item.onOffFlag,
                                originalCode:item.originalCode,
                                priceCode: item.priceCode,
                                skuCode: item.skuCode,
                                skuName: item.skuName,
                                startTime: item.startTime,
                                endTime: item.endTime,
                                chinaAreaCode: item.chinaAreaCode,
                                salesAreaCode: item.salesAreaCode,
                                storeCode: item.storeCode,
                                channelType: item.channelType,
                                skuPrice: _this.isUpdate ? item.skuPrice : 0,
                                marketPriceMin: _this.isUpdate ? item.marketPriceMin : 0,
                                marketPriceMax: _this.isUpdate ? item.marketPriceMax : 0,
                                guidingPriceMin: _this.isUpdate ? item.guidingPriceMin : 0,
                                guidingPriceMax: _this.isUpdate ? item.guidingPriceMax : 0
                            })
                        }
                    })
                },
                deep: true
            }
        },
        components: {
            DatePicker,
            selectModal,
            areaqueryshop
        }
    }
</script>

<style lang="scss" scoped>
    .min-width {
        min-width: 20rem(20)
    }
</style>
