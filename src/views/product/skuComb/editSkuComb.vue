<template>
    <div class="animated fadeIn">
        <b-card header="主档信息">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="组合编码" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="skuComb.combinationCode" readonly></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="组合名称*" label-text-align="right" :label-cols="4">
                        <b-form-input :state="combinationNameState" :disabled="addSkuCombSucc" v-model.trim="skuComb.combinationName"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="商品分类" label-text-align="right" :label-cols="4">
                        <tree-picker :name="categoryName" :load="loadSkuCategoryData" :disabled="addSkuCombSucc" @node-click="getSkuCategoryData"></tree-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="商品目录" label-text-align="right" :label-cols="4">
                        <tree-picker :name="catlogName" :load="loadSkuCatlogData" :disabled="addSkuCombSucc" @node-click="getSkuCatlogData"></tree-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="生效时间" label-text-align="right" :label-cols="4" :class="{ 'input-box' : startTimeState || endTimeState }">
                        <date-picker v-model="timeStep" type="daterange" @change="dateChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :disabled="addSkuCombSucc" :picker-options="pickerOptions">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="组合备注" label-text-align="right" :label-cols="4">
                        <b-form-textarea v-model.trim="skuComb.remark" :rows="3" :disabled="addSkuCombSucc"></b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="pull-right mt-2">
                        <b-button size="sm" @click="goBack">取消</b-button>
                        <b-button v-if="addSkuCombSucc" size="sm" variant="warning" @click="resetAddSkuCombSucc">编辑</b-button>
                        <b-button v-else size="sm" variant="primary" @click="editCombinationInfo">确定</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card header="附加字段信息" class="mb-3" v-show="showAddition">
            <b-tabs pills>
                <b-tab title="组合SKU设置" active>
                    <div class="animated fadeIn">
                        <div class="row mb-2">
                            <div class="col-md-12">
                                <div class="pull-left">
                                    <b-button size="sm" variant="success" @click="showSelectModal">新增</b-button>
                                    <b-button size="sm" variant="danger" @click="removeSkuCombDetailInfoList">删除</b-button>
                                    <b-button size="sm" variant="primary" @click="editCombinationDetailList">保存</b-button>
                                </div>
                            </div>
                        </div>
                        <div class="table-scrollable">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="field in skuFields" :key="field.label">
                                            {{ field.label }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in skuItems" :key="item.combinationDetailCode">
                                        <td>
                                            <input type="radio" :value="index" v-model="selectSkuInfoRow" name="selectSkuInfoRow"></input>
                                        </td>
                                        <td>
                                            {{ item.detailCode }}
                                        </td>
                                        <td>
                                            {{ item.originalCode }}
                                        </td>
                                        <td>
                                            {{ item.detailName }}
                                        </td>
                                        <td>
                                            {{ item.standardCost }}
                                        </td>
                                        <td>
                                            <b-form-input type="number" v-model="item.detailNums"></b-form-input>
                                        </td>
                                    </tr>
                                    <tr v-if="skuItems.length == 0">
                                        <td colspan='10' class="text-left">暂无数据...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="组合销售价格">
                    <div class="animated fadeIn">
                        <div class="row mb-2">
                            <div class="col-md-12">
                                <div class="pull-left">
                                    <b-button size="sm" variant="success" @click="addCombinationPriceList">新增</b-button>
                                    <b-button size="sm" variant="danger" @click="removeSkuCombPriceInfoList">删除</b-button>
                                    <b-button size="sm" variant="primary" @click="editCombinationPriceList">保存</b-button>
                                </div>
                            </div>
                        </div>
                        <div class="table-scrollable">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th v-for="field in priceFields" :key="field.label">
                                            {{ field.label }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in priceItems" :key="item.combinationPriceCode">
                                        <td>
                                            <input type="radio" :value="index" v-model="selectPriceRow" name="selectPriceRow"></input>
                                        </td>
                                        <td>
                                            <b-form-select v-model="item.channelType" :options="channelTypes">
                                            </b-form-select>
                                        </td>
                                        <td>
                                            <b-form-input type="number" v-model="item.combinationPrice"></b-form-input>
                                        </td>
                                    </tr>
                                    <tr v-if="priceItems.length == 0">
                                        <td colspan='3' class="text-left">暂无数据...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="适用范围">
                    <div class="animated fadeIn">
                        <suit-scope @shop-preserve="shopPreserve" @sales-preserve="salesPreserve" @remove-tr="removetr" :tab-data="useRanges">
                        </suit-scope>
                    </div>
                </b-tab>
            </b-tabs>
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
    import treePicker from '../../../components/iris-treepicker'
    import suitScope from '../../../components/iris-suitscope'
    import selectModal from './selectModal'
    import {
        MessageBox,
        Message,
        DatePicker
    } from 'element-ui'
    export default {
        mounted() {
            let _this = this
            if (!_this.isUpdate) {
                _this.getSkuCombCode({
                    callback: (skuCombCode) => {
                        _this.skuComb.combinationCode = skuCombCode
                    }
                })
            } else {
                _this.getCombinationInfo({
                    combinationCode: _this.$route.params.combinationCode
                })
                _this.getSkuCombDetailInfoList({
                    combinationCode: _this.$route.params.combinationCode
                })
                _this.getSkuCombPriceInfoList({
                    combinationCode: _this.$route.params.combinationCode
                })
                _this.getSkuCombUseRangeList({
                    combinationCode: _this.$route.params.combinationCode
                })
            }
            _this.getChannelTypes()
            _this.preserveShop({
                tabType: 'istabType',
                istabType: true
            })
        },
        destroyed() {
            let _this = this
            _this.resetSkuCombInfo()
        },
        data: function() {
            return {
                selectSkuInfoRow: -1,
                selectPriceRow: -1,
                skuComb: {
                    combinationCode: '',
                    combinationName: '',
                    categoryCode: '',
                    catlogCode: '',
                    startTime: '',
                    endTime: '',
                    remark: ''
                },
                skuFields: {
                    selectRows: {
                        label: '选择'
                    },
                    detailCode: {
                        label: '商品编码'
                    },
                    originalCode: {
                        label: '备件代码'
                    },
                    detailName: {
                        label: '商品名称'
                    },
                    standardCost: {
                        label: '成本价'
                    },
                    detailNums: {
                        label: '数量'
                    }
                },
                priceFields: {
                    selectRows: {
                        label: '选择'
                    },
                    channelType: {
                        label: '渠道'
                    },
                    combinationPrice: {
                        label: '组合销售价格'
                    }
                },
                skuItems: [],
                priceItems: [],
                useRanges: [],
                categoryCodes: [],
                catlogCodes: [],
                timeStep: [],
                categoryName: '',
                catlogName: '',
                combinationNameState: null,
                startTimeState: false,
                endTimeState: false,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }
        },
        computed: {
            ...mapState('skuComb', [
                'addSkuCombSucc',
                'showAddition',
                'skuCombInfo',
                'skuCombDetailList',
                'skuCombPriceList',
                'skuCombUseRangeList',
            ]),
            ...mapState('skuPrice', [
                'channelTypes'
            ]),
            isUpdate: function() {
                let combinationCode = this.$route.params.combinationCode
                if (combinationCode != null && combinationCode != '') {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            goBack: function() {
                this.$router.go(-1)
            },
            checkValues: function() {
                let _this = this
                if (_this.skuComb.combinationName == '') {
                    _this.combinationNameState = 'invalid'
                    return false
                } else {
                    _this.combinationNameState = null
                }
                return true
            },
            checkTime: function() {
                let result = false
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getUTCMonth() + 1
                let day = date.getUTCDate()
                let toDay = new Date(year + '-' + month + '-' + day)
                let startTime = new Date(this.$data.skuComb.startTime)
                let endTime = new Date(this.$data.skuComb.endTime)
                if ((startTime.getTime() >= toDay.getTime() && endTime.getTime() >= startTime.getTime()) || (this.$data.skuComb.startTime == '' && this.$data.skuComb.endTime == '')) {
                    this.$data.startTimeState = false
                    this.$data.endTimeState = false
                    result = true
                } else {
                    this.$data.startTimeState = true
                    this.$data.endTimeState = true
                    result = false
                }
                return result
            },
            loadSkuCatlogData: function(node, resolve) {
                let _this = this
                if (node.level === 0) {
                    _this.getSkuCatLogInfoByCatlogCode({
                        catlogCode: config.product.catalog.rootCode,
                        level: 0,
                        callback: resolve
                    })
                } else {
                    _this.getSkuCatLogInfoByCatlogCode({
                        catlogCode: node.data.code,
                        level: node.level,
                        callback: resolve
                    })
                }
            },
            loadSkuCategoryData: function(node, resolve) {
                let _this = this
                if (node.level === 0) {
                    _this.getSkuCategoryInfoBycategoryCode({
                        categoryCode: config.product.classification.rootCode,
                        level: 0,
                        callback: resolve
                    })
                } else {
                    _this.getSkuCategoryInfoBycategoryCode({
                        categoryCode: node.data.code,
                        level: node.level,
                        callback: resolve
                    })
                }
            },
            getSkuCategoryData: function(data) {
                this.skuComb.categoryCode = data.code
            },
            getSkuCatlogData: function(data) {
                this.skuComb.catlogCode = data.code
            },
            editCombinationInfo: function() {
                let _this = this
                if (_this.checkValues() && _this.checkTime()) {
                    _this.editCombinationInfos({
                        skuComb: _this.$data.skuComb
                    })
                }
            },
            editCombinationDetailList: function() {
                let _this = this
                _this.editSkuCombDetailInfoList(_this.$data.skuItems)
            },
            removeSkuCombDetailInfoList: function() {
                let _this = this
                if (parseInt(_this.selectSkuInfoRow) != -1) {
                    if (_this.isUpdate) {
                        _this.deleteSkuCombDetailInfo({
                            index: _this.selectSkuInfoRow
                        })
                    } else {
                        _this.removeSkuCombDetailInfo({
                            index: _this.selectSkuInfoRow
                        })
                    }
                } else {
                    Message.closeAll()
                    Message({
                        type: 'error',
                        message: config.messInfo.selectOneRow
                    })
                }
            },
            editCombinationPriceList: function() {
                let _this = this
                _this.editSkuCombPriceInfoList(_this.$data.priceItems)
            },
            removeSkuCombPriceInfoList: function() {
                let _this = this
                if (parseInt(_this.$data.selectPriceRow) != -1) {
                    if (_this.isUpdate) {
                        _this.deleteSkuCombPriceInfo({
                            index: _this.selectPriceRow
                        })
                    } else {
                        _this.removeSkuCombPriceInfo({
                            index: _this.selectPriceRow
                        })
                    }
                } else {
                    Message.closeAll()
                    Message({
                        type: 'error',
                        message: config.messInfo.selectOneRow
                    })
                }
            },
            shopPreserve: function(data) {
                let _this = this
                if (data) {
                    let arr = []
                    data.forEach((item) => {
                        arr.push({
                            combinationCode: _this.skuCombInfo.combinationCode,
                            rangeCode: item.rangeCode,
                            rangeType: item.rangeType,
                            remark: item.remark,
                            storeCode: item.storeCode
                        })
                    })
                    _this.editSkuCombUseRangeList(arr)
                }
            },
            salesPreserve: function(data) {
                let _this = this
                if (data) {
                    let arr = []
                    data.forEach((item) => {
                        arr.push({
                            combinationCode: _this.skuCombInfo.combinationCode,
                            rangeCode: item.rangeCode,
                            rangeType: item.rangeType,
                            remark: item.remark,
                            salesAreaCode: item.salesAreaCode
                        })
                    })
                    _this.editSkuCombUseRangeList(arr)
                }
            },
            removetr: function(items) {
                let _this = this
                if (items.length > 0) {
                    items.forEach((item) => {
                        item.isDeleted = '1'
                    })
                    _this.editSkuCombUseRangeList(items)
                }
            },
            dateChange: function() {
                let _this = this
                if (_this.$data.timeStep && _this.$data.timeStep.length > 0) {
                    let timeOne = _this.timeStep[0]
                    let timeTwo = _this.timeStep[1]
                    _this.$data.skuComb.startTime = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                    _this.$data.skuComb.endTime = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
                } else {
                    _this.$data.skuComb.startTime = ''
                    _this.$data.skuComb.endTime = ''
                }
            },
            ...mapActions('skuComb', [
                'showSelectModal',
                'getSkuCombCode',
                'getSkuCatLogInfoByCatlogCode',
                'getSkuCategoryInfoBycategoryCode',
                'editCombinationInfos',
                'getSkuCombDetailCode',
                'getSkuCombPriceCode',
                'getSkuCombUseRangeCode',
                'editSkuCombDetailInfoList',
                'getSkuCombDetailInfoList',
                'addCombinationPriceList',
                'editSkuCombPriceInfoList',
                'getSkuCombPriceInfoList',
                'removeSkuCombPriceInfo',
                'deleteSkuCombPriceInfo',
                'removeSkuCombDetailInfo',
                'deleteSkuCombDetailInfo',
                'editSkuCombUseRangeList',
                'getSkuCombUseRangeList',
                'resetAddSkuCombSucc',
                'getCombinationInfo',
                'resetSkuCombInfo',
                'cancelResetAddSkuCombSucc'
            ]),
            ...mapActions('skuPrice', [
                'getChannelTypes'
            ]),
            ...mapActions('suitscope', [
                'preserveShop'
            ])
        },
        watch: {
            skuCombInfo: {
                handler(val) {
                    let _this = this
                    _this.$data.skuComb = {
                        id: val.id,
                        combinationCode: val.combinationCode,
                        combinationName: val.combinationName,
                        categoryCode: val.categoryCode,
                        catlogCode: val.catlogCode,
                        startTime: val.startTime == null ? '' : val.startTime,
                        endTime: val.endTime == null ? '' : val.endTime,
                        remark: val.remark
                    }
                    _this.$data.timeStep = []
                    _this.$data.timeStep.push(new Date(_this.skuComb.startTime))
                    _this.$data.timeStep.push(new Date(_this.skuComb.endTime))
                    _this.getSkuCategoryInfoBycategoryCode({
                        categoryCode: val.categoryCode,
                        level: 0,
                        callback: (arr) => {
                            if (arr != null && arr.length > 0) {
                                _this.$data.categoryName = arr[0].name
                            }
                        }
                    })
                    _this.getSkuCatLogInfoByCatlogCode({
                        catlogCode: val.catlogCode,
                        level: 0,
                        callback: (arr) => {
                            if (arr != null && arr.length > 0) {
                                _this.$data.catlogName = arr[0].name
                            }
                        }
                    })
                    // 新增组合商品后，点击适用范围应该请求出相应门店
                    _this.getSkuCombUseRangeList({
                        combinationCode: val.combinationCode
                    })
                },
                deep: true
            },
            skuCombDetailList: {
                handler(list) {
                    let _this = this
                    _this.$data.skuItems = []
                    list.forEach((item) => {
                        _this.$data.skuItems.push({
                            id: item.id,
                            combinationCode: item.combinationCode,
                            combinationDetailCode: item.combinationDetailCode,
                            detailCode: item.detailCode,
                            detailName: item.detailName,
                            detailType: item.detailType,
                            standardCost: item.standardCost,
                            detailNums: item.detailNums,
                            isDeleted: item.isDeleted,
                            remark: item.remark
                        })
                    })
                },
                deep: true
            },
            skuCombPriceList: {
                handler(list) {
                    let _this = this
                    _this.$data.priceItems = []
                    list.forEach((item) => {
                        _this.$data.priceItems.push({
                            id: item.id,
                            combinationCode: item.combinationCode,
                            combinationPrice: item.combinationPrice,
                            combinationPriceCode: item.combinationPriceCode,
                            channelType: item.channelType,
                            remark: item.remark
                        })
                    })
                },
                deep: true
            },
            skuCombUseRangeList: {
                handler(data) {
                    let _this = this
                    _this.useRanges = []
                    data.forEach((item) => {
                        _this.useRanges.push(item)
                    })
                },
                deep: true
            }
        },
        components: {
            DatePicker,
            treePicker,
            selectModal,
            suitScope
        }
    }
</script>