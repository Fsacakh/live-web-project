<template>
    <div class="animated fadeIn">
        <b-card header="主档信息">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="发布单号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="carShareInfo.carShareNo" readonly></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="门店" label-text-align="right" :label-cols="4">
                        <areaqueryshop  ref="areaqueryshop" :storeAll="true" @select-change="selectStores" :readonly="addCarShareOrderSucc"></areaqueryshop>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="发布有效期" label-text-align="right" :label-cols="4">
                        <date-picker v-model="timeStep" type="daterange" @change="dateChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" :disabled="addCarShareOrderSucc">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="发布台数" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="carShareInfo.totalNum" readonly></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="pull-right">
                        <template v-if="addCarShareOrderSucc && !showDetail && carShareInfo.onOffFlag == 0">
                            <b-button size="sm" v-if="commitCarShareOrderBtn" variant="primary" @click="commitCarShareOrder">确认发布</b-button>
                            <b-button size="sm" variant="warning" @click="resetCarShareOrderSucc">修改</b-button>
                        </template>
                        <template v-if="!addCarShareOrderSucc && !isUpdate && editCarShareOrderBtn">
                            <b-button v-if="canEditCarShareInfo" size="sm" variant="primary" @click="editCarShareOrder">确认</b-button>
                            <b-button v-else size="sm" variant="success" @click="createCarShareOrder">创建</b-button>
                        </template>
                        <template v-if="isUpdate && !showDetail && carShareInfo.onOffFlag == 1">
                            <b-button v-if="cancelCarShareOrderBtn" size="sm" variant="primary" @click="cancelCarShareOrder">废单</b-button>
                        </template>    
                    </div>
                </div>
            </div>
        </b-card>     
        <b-card v-if="showAdditionalField" header="附加字段信息">
            <b-tabs pills>
                <b-tab title="车辆信息" active>
                    <div class="animated fadeIn">
                        <div class="row mb-2"> 
                           <div class="col-md-12">
                               <div class="pull-left">
                                   <template v-if="!showDetail && carShareInfo.onOffFlag == 1">
                                       <b-button size="sm" variant="danger" @click="updateCarShareOrderDetailInfoOff">下架</b-button>   
                                   </template>
                                   <template v-if="!showDetail && carShareInfo.onOffFlag == 0">
                                       <b-button size="sm" variant="success" @click="showSelectModal">新增</b-button>
                                       <b-button size="sm" variant="danger" @click="deleteCarShareOrderDetailInfo">删除</b-button>
                                   </template>
                               </div>    
                           </div>    
                        </div>
                        <div class="table-scrollable">
                           <table class="table table-striped table-hover table-bordered">
                               <thead>
                                   <tr>
                                      <th v-for="field in fields" :key="field.label">
                                         {{ field.label }}
                                      </th> 
                                   </tr>
                               </thead>
                               <tbody>
                                   <tr v-for="(item, index) in carShareDetailInfoList" :key="index">
                                      <td>
                                          <input type="radio" :value="index" v-model="selectRow" name="selectRow"/>
                                      </td>
                                      <td>
                                          {{ item.skuCode }}
                                      </td>
                                      <td>
                                          {{ item.carProductionCode }}
                                      </td>
                                      <td>
                                          {{ item.carVinCode }}
                                      </td>
                                      <td>
                                          {{ item.skuName }}
                                      </td>
                                      <td>
                                          1
                                      </td>
                                      <td>
                                          {{ item.msrp }}
                                      </td>
                                      <td>
                                          {{ item.purchaseFee }}
                                      </td>
                                      <td>
                                          {{ item.logisticsStatus  == 1 ? '在途':  (item.logisticsStatus  == 2 ? '在库': '')}}  
                                      </td>
                                   </tr>
                                   <tr v-if="carShareDetailInfoList.length == 0">
                                       <td colspan='13' class="text-left">暂无数据...</td>
                                   </tr>
                               </tbody>
                           </table>
                        </div>
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
    import {
        MessageBox,
        Message,
        DatePicker
    } from 'element-ui'
    import api from '../../../common/api'
    import Pagination from 'components/pagination/pagination'
    import search from '../../../components/search/search'
    import selectModal from './selectModal'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import apiUrl from 'common/api-url'
    import {hasBtn} from 'common/com-api'
    export default {
        mounted() {
            let _this = this
            if (_this.isUpdate) {
                _this.getCarShareOrder({
                    carShareNo: _this.$route.params.carShareNo
                }) 
                _this.getCarShareDetailInfoList({
                    carShareNo: _this.$route.params.carShareNo
                })
            } else {
                _this.getCarShareNo({
                    callback: (carShareNo) => {
                        _this.$data.carShareInfo.carShareNo = carShareNo
                    }
                })
            }
        },
        destroyed() {
            let _this = this
            _this.resetCarShareOrder()
        },
        data: function() {
            return {
                selectRow: -1,
                fields: {
                    selectRow: {
                        label: '选择'
                    },
                    skuCode: {
                        label: 'SKU编码'
                    },
                    carProductionCode: {
                        label: '生产号'
                    },
                    carVinCode: {
                        label: '车架号'
                    },
                    skuName: {
                        label: '商品名称'
                    },
                    number: {
                        label: '数量'
                    },
                    msrp: {
                        label: '实际MSRP(含税)'
                    },
                    purchaseFee: {
                        label: '采购价格'
                    },
                    logisticsStatus: {
                        label: '物流状态'
                    }
                },
                carShareInfo: {
                    carShareNo: '',
                    carFactoryCode: '',
                    carBrandCode: '',
                    carSeriesCode: '',
                    carModelCode: '',
                    carCode: '',
                    skuCode: '',
                    carVinCode: '',
                    carProductionCode: '',
                    startTime: '',
                    endTime: '',
                    salesAreaCode: '',
                    storeCode: '',
                    storeCodeSet: [],
                    totalNum: null,
                    onOffFlag: 0,
                },
                timeStep: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }
        },
        computed: {
            ...mapState('releaseVehicleResource', [
                'carShareInfoData',
                'addCarShareOrderSucc',
                'showAdditionalField',
                'carShareDetailInfoList'
            ]),
            ...mapGetters('releaseVehicleResource', [
                'canEditCarShareInfo'
            ]),
            isUpdate: function() {
                let _this = this
                let carShareNo = _this.$route.params.carShareNo
                if(carShareNo != null && carShareNo!= '') {
                    return true 
                } else {
                    return false
                }
            },
            showDetail: function() {
                let _this = this
                let flag = _this.$route.params.flag
                if(flag != null && flag == config.showDetailFlag) {
                    return true 
                } else {
                    return false
                }
            },
            //确认修改权限
            commitCarShareOrderBtn(){
                return hasBtn(apiUrl.supplyChain.carShareInfo.submitCarShareInfo)
            },
            editCarShareOrderBtn(){
                return hasBtn(apiUrl.supplyChain.carShareInfo.update)
            },
            cancelCarShareOrderBtn(){
                return hasBtn(apiUrl.supplyChain.carShareInfo.cancelCarShareInfo)
            }
        },
        methods: {
            goBack: function() {
                this.$router.go(-1)
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.carShareInfo.salesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.carShareInfo.salesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.carShareInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.carShareInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.carShareInfo.storeCodeSet = []
                    _this.carShareInfo.storeCode = '' 
                } else if (stores.hasOwnProperty('value')) {
                    _this.carShareInfo.storeCodeSet = []
                    _this.carShareInfo.storeCodeSet[0] = stores.value
                    _this.carShareInfo.storeCode = stores.value 
                }
            },
            dateChange: function() {
                let _this = this
                if (_this.$data.timeStep && _this.$data.timeStep.length > 0) {
                    let timeOne = _this.timeStep[0]
                    let timeTwo = _this.timeStep[1]
                    _this.$data.carShareInfo.startTime = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
                    _this.$data.carShareInfo.endTime = timeTwo.getFullYear() + '-' + (timeTwo.getMonth() + 1) + '-' + timeTwo.getDate()
                } else {
                    _this.$data.carShareInfo.startTime = ''
                    _this.$data.carShareInfo.endTime = ''
                }
            },
            createCarShareOrder: function() {
                let _this = this
                _this.addCarShareOrder(_this.$data.carShareInfo)
            },
            editCarShareOrder: function() {
                let _this = this
                _this.updateCarShareOrder(_this.$data.carShareInfo)
            },
            commitCarShareOrder: function() {
                let _this = this
                _this.submitCarShareOrder({
                    carShareInfo: _this.$data.carShareInfo,
                    callback: () => {
                        _this.goBack()
                    }
                }) 
            },
            cancelCarShareOrder: function() {
                let _this = this
                _this.cancelCarShareInfo({
                    carShareInfo: _this.$data.carShareInfo,
                    callback: () => {
                        _this.goBack()
                    }
                }) 
            },
            deleteCarShareOrderDetailInfo: function() {
                let _this = this
                if(parseInt(_this.selectRow) != -1) {
                   _this.deleteCarShareDetailInfoList(parseInt(_this.selectRow)) 
                } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                }     
            },
            updateCarShareOrderDetailInfoOff: function() {
                let _this = this
                if(parseInt(_this.selectRow) != -1) {
                   _this.updateCarShareDetailInfoListOff(parseInt(_this.selectRow)) 
                    Message({
                       type: 'info',
                       message: '下架成功'
                    })
                } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                }
            },
            ...mapActions('releaseVehicleResource', [
                'getCarShareNo',
                'addCarShareOrder',
                'updateCarShareOrder',
                'getCarShareOrder',
                'resetCarShareOrder',
                'resetCarShareOrderSucc',
                'showSelectModal',
                'submitCarShareOrder',
                'cancelCarShareInfo',
                'deleteCarShareDetailInfoList',
                'updateCarShareDetailInfoListOff',
                'getCarShareDetailInfoList'
            ])
        },
        watch: {
            carShareInfoData: {
                handler(val) {
                    let _this = this
                    _this.$data.carShareInfo = {
                        id: val.id,
                        carShareNo: val.carShareNo,
                        carFactoryCode: val.carFactoryCode,
                        carBrandCode: val.carBrandCode,
                        carSeriesCode: val.carSeriesCode,
                        carModelCode: val.carModelCode,
                        carCode: val.carCode,
                        skuCode: val.skuCode,
                        carVinCode: val.carVinCode,
                        carProductionCode: val.carProductionCode,
                        startTime: val.startTime,
                        endTime: val.endTime,
                        salesAreaCode: val.salesAreaCode,
                        storeCode: val.storeCode,
                        storeCodeSet: val.storeCodeSet,
                        totalNum: val.totalNum,
                        onOffFlag: val.onOffFlag
                    }
                    _this.$data.timeStep = []
                    _this.$data.timeStep.push(new Date(_this.carShareInfo.startTime))
                    _this.$data.timeStep.push(new Date(_this.carShareInfo.endTime))
                    _this.$refs.areaqueryshop.setselect({
                        value: (val.storeCode === '0' ? '' : val.storeCode),
                        salesCode: val.salesAreaCode
                    })
                },
                deep: true
            }
        },
        components: {
            search,
            DatePicker,
            Pagination,
            selectModal,
            areaqueryshop
        }
    }
</script>