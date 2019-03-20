<template>
    <b-modal title="选择车辆" v-model="showModal" no-close-on-backdrop no-close-on-esc size="lg" button-size="sm" @hidden="hideModal">
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="门店:" label-text-align="right" :label-cols="4">
                    <areaqueryshop :storeAll="true" @select-change="selectStores"></areaqueryshop>
                </b-form-fieldset>
            </div>
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="SKU编号:" label-text-align="right" :label-cols="4">
                    <b-form-input v-model.trim="skuInfo.skuCode"></b-form-input>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <b-form-fieldset horizontal label="车架号:" label-text-align="right" :label-cols="4">
                    <b-form-input v-model.trim="skuInfo.carVinCode"></b-form-input>
                </b-form-fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <div class="pull-right">
                    <b-button size="sm" @click="clear">重置</b-button>
                    <b-button size="sm" variant="primary" @click="search">查询</b-button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 com-lg-12">
                <div class="tableScrollable">
                    <table class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>选择</th>
                          <th>SKU编码</th>
                          <th>生产号</th>
                          <th>车架号</th>
                          <th>商品名称</th>
                          <th>数量</th>
                          <th>实际MSRP(含税)</th>
                          <th>采购价格</th>
                          <th>物流状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item ,index) in skuInfoList" :key="index">
                          <td><input type="checkbox" name="selectRows" v-model="selectRows[index].selected" @change="checkSku(item.skuCode, index)"></td>
                          <td>{{ item.skuCode }}</td>
                          <td>{{ item.carProductionCode }}</td>
                          <td>{{ item.carVinCode }}</td>
                          <td>{{ item.skuName }}</td>
                          <td>1</td>
                          <td>{{ item.msrp }}</td>
                          <td>{{ item.purchaseFee }}</td>
                          <td>{{ item.logisticsStatus == 1 ? '在途' : (item.logisticsStatus == 2 ? '在库' : '') }}</td>
                        </tr>
                        <tr v-show='skuInfoList.length == 0'>
                          <td colspan="9">暂无数据...</td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <b-table striped hover bordered show-empty :fields="fields" :items="skuInfoList">
                        <template slot="selectRows" slot-scope="data">
                            <input type="checkbox" name="selectRows" v-model="selectRows[data.index].selected" @change="checkSku(data.item.skuCode, data.index)"/>
                        </template>
                        <template slot="number" slot-scope="data">
                            1
                        </template>
                        <template slot="logisticsStatus" slot-scope="data">
                            {{ data.item.logisticsStatus  == 1 ? '在途':  (data.item.logisticsStatus  == 2 ? '在库': '')}}
                        </template>
                        <template slot="empty">
                            暂无数据...
                        </template>
                   </b-table> -->
                </div>
            </div>
        </div>
        <div class="row">
           <div class="col-md-12">
                <pagination class="pull-right" @page-change="pageChange" :page-no="skuPager.pageNo" :page-size="skuPager.pageSize" :total-result="skuPager.total" :total-pages="skuPager.totalPages">
                </pagination>
           </div>
        </div>
        <div class="row">
          <div class="col-md-12 com-lg-12">
               <b-form-fieldset horizontal label="已选车辆:" label-text-align="right" :label-cols="2">
                   <div class="card">
                       <div class="card-block">
                          <div class="card m-0 float-left ml-2" v-for="(carAdjustOutStockDetailInfo, index) in addCarAdjustOutStockDetailList" :key="index">
                             <div class="card-body p-0 clearfix ml-1">
                                 {{ carAdjustOutStockDetailInfo.skuName }}
                                 <i @click="checkSku(carAdjustOutStockDetailInfo.skuCode, carAdjustOutStockDetailInfo.index)" class="fa fa-remove bg-danger p-1  ml-3 float-right white"></i>
                             </div>
                          </div>
                       </div>
                   </div>
               </b-form-fieldset>
          </div>
          <div class="col-md-6">
                <b-form-fieldset horizontal label="目标仓库" :label-cols="4" label-text-align="right">
                    <search v-model="targetWHCode" :searchValue="warehouseName" checkText="" :dataList="wareHouses" :valueName="'warehouseName'" :keyName="'warehouseCode'" @dataChange="getWareHouseListByName" @comScroll="getWareHouseList" @clickShowBack="getWareHouseList" :isDisabled ="isDisabled" @input="getWareHouseCode" @getOptionName="getOptionName"></search>
                </b-form-fieldset>
          </div>
      </div>
      <div slot="modal-footer" class="w-100">
        <div class="float-right">
            <b-button variant="primary" @click="handleOk">确认</b-button>
            <b-button @click="closeModal">取消</b-button>
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
    import config from '../../../common/config'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import search from '../../../components/search/search'
    import pagination from '../../../components/pagination/pagination'
    import { Message } from 'element-ui'
    export default {
        data: function() {
            return {
                showModal: false,
                selectRow: -1,
                warehouseName: '',
                targetWHCode: '',
                targetWHName: '',
                fields: {
                    selectRows: {
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
                items: [],
                skuInfo: {
                    skuCode: '',
                    storeCode: '',
                    carVinCode: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                }
            }
        },
        props: {
            targetCode:{
                type: String,
                default:''
            }
        },
        computed: {
            ...mapGetters('callOutVehicleResource', [
                'getWareHousesPageStart'
            ]),
            ...mapState('callOutVehicleResource', [
                'wareHouses',
                'showSelectModal',
                'skuInfoList',
                'carAdjustOutStockData',
                'addCarAdjustOutStockDetailList',
                'skuPager',
                'carAdjustOutStockDetailList'
            ]),
            isDisabled(){
                return this.carAdjustOutStockDetailList.length ? true : false
            },
            getwarehouseName(){
                if (this.carAdjustOutStockDetailList && this.carAdjustOutStockDetailList.length > 0 ){
                    this.targetWhCode = this.carAdjustOutStockDetailList[0].targetWhCode
                    this.targetWhName = this.carAdjustOutStockDetailList[0].targetWhName
                }
            }
        },
        methods: {
            
            search: function() {
                this.$data.skuInfo.pageStart = 1
                this.getSkuInfoList(this.$data.skuInfo)
            },
            clear: function() {
                this.$data.skuInfo.skuCode = ''
                this.$data.skuInfo.carVinCode = ''
                this.$data.skuInfo.pageNums = config.pageNums
                this.$data.skuInfo.pageStart = 1;
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (stores instanceof Array) {
                    _this.skuInfo.storeCodeSet = []
                    stores.forEach((item) => {
                        _this.skuInfo.storeCodeSet.push(item.value)
                    })
                } else if (stores.value === 0) {
                    _this.skuInfo.storeCodeSet = []
                } else if (stores.hasOwnProperty('value')) {
                    _this.skuInfo.storeCodeSet = []
                    _this.skuInfo.storeCodeSet[0] = stores.value
                    _this.skuInfo.storeCode = stores.value
                }
            },
            checkSku: function(skuCode, num) {
                let index = this.addCarAdjustOutStockDetailList.findIndex((item) => {
                    return item.skuCode == skuCode
                })
                if (index == -1) {
                    let skuInfo = this.skuInfoList[num]
                    skuInfo.index = num
                    skuInfo.rate = skuInfo.purchaseRate
                    this.addCarAdjustOutStockDetailInfoList(skuInfo)
                } else {
                    this.selectRows[num].selected = false
                    this.removeCarAdjustOutStockDetailInfoList(index)
                }
            },
            //新增仓库
            getWareHouseListByName: function(warehouseName) {
                let _this = this
                _this.$data.warehouseName = warehouseName
                _this.resetWareHouses()
                _this.getWareHouses({
                    warehouseName: warehouseName,
                    storeCode: _this.targetCode,
                    pageNums: config.pageNums,
                    pageStart: _this.getWareHousesPageStart
                })
            },

            getWareHouseList: function() {
                let _this = this
                _this.getWareHouses({
                    warehouseName: _this.$data.warehouseName,
                    storeCode:  _this.targetCode,
                    pageNums: config.pageNums,
                    pageStart: _this.getWareHousesPageStart
                })
            },
            
            closeModal(){
                this.showModal = false
            },
            handleOk(){
                if (!this.targetWHCode) {
                    Message('请选择目标仓库')
                    return;
                }
                let _this = this
                _this.commitCarAdjustOutStockDetailInfoList({
                    targetWhCode: _this.targetWhCode,
                    targetWhName: _this.targetWhName
                })
                 this.showModal = false
            },

            getWareHouseCode(val){
                this.targetWhCode = val
            },
            getOptionName(val){
                this.targetWhName = val
            },
            hideModal: function() {
                this.$data.selectRows = []
                this.hideSelectModal()
                this.clear()
            },
            pageChange: function(num) {
                this.$data.skuInfo.pageStart = num
                this.getSkuInfoList(this.$data.skuInfo)
            },

            ...mapActions('callOutVehicleResource', [
                'getCarAdjustOutStockInfoList',
                'getWareHouses',
                'resetWareHouses',
                'hideSelectModal',
                'getSkuInfoList',
                'addCarAdjustOutStockDetailInfoList',
                'commitCarAdjustOutStockDetailInfoList',
                'removeCarAdjustOutStockDetailInfoList'
            ]),
        },
        watch: {
            showSelectModal: {
                handler() {
                    let _this = this
                    _this.showModal = _this.showSelectModal
                    _this.$data.skuInfo.storeCode = _this.carAdjustOutStockData.sourceStoreCode
                    _this.resetWareHouses()
                }
            },
            skuInfoList: {
                handler() {
                    this.selectRows = []
                    this.skuInfoList.forEach((item) => {
                        let index = this.addCarAdjustOutStockDetailList.findIndex((carAdjustOutStockDetailInfo) => {
                            return carAdjustOutStockDetailInfo.skuCode == item.skuCode
                        })
                        if (index == -1) {
                            this.selectRows.push({
                                selected: false
                            })
                        } else {
                            this.selectRows.push({
                                selected: true
                            })
                        }
                    })
                }
            }
        },
        components: {
            pagination,
            areaqueryshop,
            search
        }
    }
</script>
<style lang="scss" scoped>
.tableScrollable {
  white-space: nowrap;
  overflow: hidden;
  overflow-x: scroll;
  margin: 10px 0;
  table th {
    text-align: center;
  }
  table td {
    text-align: center;
  }
}
</style>

