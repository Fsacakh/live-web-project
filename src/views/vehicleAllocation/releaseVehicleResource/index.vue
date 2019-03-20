<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="所属门店" :label-cols="4" label-text-align="right">
                        <areaqueryshop @select-change="selectStores"></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="厂商" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="carShareDetailInfo.carFactoryCode" :options="factoryCodes" @input="factoryCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="品牌" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="carShareDetailInfo.carBrandCode" :options="brandCodes" @input="brandCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车系" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="carShareDetailInfo.carSeriesCode" :options="seriesCodes" @input="seriesCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车型" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="carShareDetailInfo.carModelCode" :options="modelCodes" @input="modelCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车款" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="carShareDetailInfo.carCode" :options="carCodes">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="SKU编码" :label-cols="4" label-text-align="right">
                        <b-form-input v-model.trim="carShareDetailInfo.skuCode">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" :label-cols="4" label-text-align="right">
                        <b-form-input v-model.trim="carShareDetailInfo.carVinCode">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="生产号" :label-cols="4" label-text-align="right">
                        <b-form-input v-model.trim="carShareDetailInfo.carProductionCode">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="发布单号" :label-cols="4" label-text-align="right">
                        <b-form-input v-model.trim="carShareDetailInfo.carShareNo">
                        </b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryAllVehicleResources">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="row mb-2">
                <div class="col-md-12">
                    <div class="pull-left">
                        <b-button size="sm" v-if="addReleaseVehicleResourceBtnType" variant="success" @click="addReleaseVehicleResource">新增车辆发布单</b-button>
                        <b-button size="sm" v-if="editReleaseVehicleResourceBtnType" variant="primary" @click="editReleaseVehicleResource">编辑</b-button>
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="vehicleResourceList" :fields="fields">
                    <template slot="selectRow" slot-scope="data">
                        <input type="radio" :value="data.index" v-model="selectRow" name="selectRow"></input>
                    </template>
                    <template slot="carShareNo" slot-scope="data">
                        <a @click="showDetail(data.item.carShareNo)">{{ data.item.carShareNo }}</a>
                    </template>
                    <template slot="skuCode" slot-scope="data">
                        <a @click="showSkuDetail(data.item.skuCode)">{{ data.item.skuCode }}</a>
                    </template>
                    <template slot="startTime" slot-scope="data">
                        {{ data.item.startTime | switchDate}}
                    </template>
                    <template slot="endTime" slot-scope="data">
                        {{ data.item.endTime | switchDate}}
                    </template>
                    <template slot="onOffFlag" slot-scope="data">
                        {{  data.item.onOffFlag == 0 ? '下架' : (data.item.onOffFlag == 1 ? '上架': '')}}
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination class="pull-right"
                 @page-change="pageChange"
                 :page-no="pager.pageNo"
                 :page-size="pager.pageSize"
                 :total-result="pager.total"
                 :total-pages="pager.totalPages">
            </pagination>
        </b-card>
        <sku-modal ref="modal"></sku-modal>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex'
    import config from '../../../common/config'
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import Pagination from 'components/pagination/pagination'
    import search from '../../../components/search/search'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import skuModal from './skuModal.vue'
    import apiUrl from 'common/api-url'
    import {hasBtn} from 'common/com-api'
    export default {
        mounted() {
            let _this = this
            if (!config.isShowFactory) {
               this.queryCarInfoByCarSearch({
                  code: '',
                  level: 1,
                  type: config.car.none
               })
            } else {
               this.queryCarInfoByCarSearch({
                  code: '',
                  level: 2,
                  type: config.car.factoryRefCode
               })
            }
        },
        data: function() {
            return {
                selectRow: -1,
                config: config,
                fields: {
                    selectRow: {
                        label: '选择'
                    },
                    carProductionCode: {
                        label: '生产号'
                    },
                    carShareNo: {
                        label: '发布单号'
                    },
                    skuCode: {
                        label: 'SKU编码'
                    },
                    carVinCode: {
                        label: '车架号'
                    },
                    startTime: {
                        label: '发布有效期开始'
                    },
                    endTime: {
                        label: '发布有效期截止'
                    },
                    carFactoryName: {
                        label: '厂家'
                    },
                    carBrandName: {
                        label: '品牌'
                    },
                    carSeriesName: {
                        label: '车系'
                    },
                    carModelName: {
                        label: '车型'
                    },
                    carDisplayName: {
                        label: '车款'
                    },
                    purchaseFee: {
                        label: '采购进价'
                    },
                    msrp: {
                        label: 'MSRP'
                    },
                    onOffFlag: {
                        label: '状态'
                    },
                    publicSystemTime: {
                        label: '发布日期'
                    }
                },
                carShareDetailInfo: {
                    carShareNo: '',
                    storeCodeSet: [],
                    carFactoryCode: '',
                    carBrandCode: '',
                    carSeriesCode: '',
                    carModelCode: '',
                    carCode: '',
                    skuCode: '',
                    carVinCode: '',
                    carProductionCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            }
        },
        computed: {
            ...mapState('releaseVehicleResource', [
                'vehicleResourceList',
                'pager'
            ]),
            ...mapState('carInfo', [
                'factoryCodes',
                'brandCodes',
                'seriesCodes',
                'modelCodes',
                'carCodes'
            ]),
            //新增车按钮显示状态
            addReleaseVehicleResourceBtnType(){
                return hasBtn(apiUrl.supplyChain.carShareInfo.update)
            },
            //编辑车按钮显示状态
            editReleaseVehicleResourceBtnType(){
                return hasBtn(apiUrl.supplyChain.carShareInfo.update)
            }
        },
        methods: {
            clear: function() {
                let _this = this
                _this.$data.carShareDetailInfo ={
                    storeCodeSet: _this.$data.carShareDetailInfo.storeCodeSet,
                    carFactoryCode: '',
                    carBrandCode: '',
                    carSeriesCode: '',
                    carModelCode: '',
                    carCode: '',
                    skuCode: '',
                    carVinCode: '',
                    carProductionCode: '',
                    carShareNo: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
                this.setBrandCodes({options: []})
                this.setSeriesCodes({options: []})
                this.setModelCodes({options: []})
                this.setCarCodes({options: []})
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (stores instanceof Array) {
                    _this.carShareDetailInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.carShareDetailInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.carShareDetailInfo.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.carShareDetailInfo.storeCodeSet = []
                    _this.carShareDetailInfo.storeCodeSet[0] = stores.value
                }
            },
            queryAllVehicleResources: function() {
                let _this = this
                _this.$data.carShareDetailInfo.pageStart = 1
                _this.getVehicleResourceList(_this.$data.carShareDetailInfo)
            },
            pageChange: function(num) {
                let _this = this
                _this.$data.carShareDetailInfo.pageStart = num
                _this.getVehicleResourceList(_this.$data.carShareDetailInfo)
            },
            factoryCodesChange: function() {
                if (!this.carShareDetailInfo.carFactoryCode) return
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.carShareDetailInfo.carFactoryCode,
                    level: 2,
                    type: config.car.factoryRefCode
                })
            },
            brandCodesChange: function() {
                if (!this.carShareDetailInfo.carBrandCode) return
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.carShareDetailInfo.carBrandCode,
                    level: 4,
                    type: config.car.brandRefCode
                })
            },
            seriesCodesChange: function() {
                if (!this.carShareDetailInfo.carSeriesCode) return
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.carShareDetailInfo.carSeriesCode,
                    level: 8,
                    type: config.car.seriesRefCode
                })
            },
            modelCodesChange: function() {
                if (!this.carShareDetailInfo.carModelCode) return
                let _this = this
                _this.queryCarInfoByCarSearch({
                    code: _this.carShareDetailInfo.carModelCode,
                    level: 64,
                    type: config.car.modelRefCode
                })
            },
            addReleaseVehicleResource: function() {
                let _this = this
                _this.$router.push('/vehicle/release/add')
            },
            editReleaseVehicleResource: function() {
                let _this = this
                if(parseInt(_this.selectRow) != -1) {
                    _this.$router.push('/vehicle/release/edit/' + _this.vehicleResourceList[parseInt(_this.selectRow)].carShareNo + '/' + config.editDetailFlag)
                } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                }
            },
            showDetail: function(carShareNo) {
                let _this = this
                _this.$router.push('/vehicle/release/edit/' + carShareNo + '/' + config.showDetailFlag)
            },
            showSkuDetail: function(skuCode) {
                let _this = this
                _this.$refs.modal.getDefaultInfo({
                    skuCode: skuCode,
                    callback: () => {
                        _this.showSkuModal()
                    }
                })
            },
            ...mapActions('releaseVehicleResource', [
                'getVehicleResourceList',
                'showSkuModal'
            ]),
            ...mapActions('carInfo', [
                'queryCarInfoByCarSearch'
            ]),
            ...mapMutations({
                setBrandCodes: 'carInfo/CARINFO_GET_BRAND_CODES',
                setSeriesCodes: 'carInfo/CARINFO_GET_SERIES_CODES',
                setModelCodes: 'carInfo/CARINFO_GET_MODEL_CODES',
                setCarCodes: 'carInfo/CARINFO_GET_CAR_CODES'
            })
        },
         beforeRouteLeave(to, from, next) {
            this.clear()
            next()
        },
        components: {
            search,
            skuModal,
            Pagination,
            areaqueryshop
        }
    }
</script>
