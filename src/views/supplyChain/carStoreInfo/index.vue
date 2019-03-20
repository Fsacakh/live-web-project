<template lang="html">
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset label="选择经销商店" :label-cols="4" horizontal class="text-right">
                        <areaqueryshop ref="areaqueryshop" :reset="storeShow" :readonly="true" @select-change="selectedfun"></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="仓库名称" :label-cols="4" class="text-right">
                        <b-form-select v-model="query.whCode" :state="judgeStateOne" :options="entreList"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="SKU编码" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model.trim="query.skuCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车架号" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model.trim="query.carVinNo" />
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                 <div class="col-md-6">
                    <b-form-fieldset horizontal label="生产号" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model.trim="query.productionCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="库存状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="stockStatusList" placeholder="" v-model="query.stockStatus" />
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="MSRP范围" label-text-align="right" :label-cols="4">
                        <div class="row">
                            <div class="col-md-5">
                                <b-form-input type="number" placeholder="" v-model.number="query.minMSRP" />
                            </div>
                            <label class="col-md-2 text-center">
                                到
                            </label>
                            <div class="col-md-5">
                                <b-form-input type="number" placeholder="" v-model.number="query.maxMSRP" />
                            </div>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="外观颜色" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model.trim="query.carAppertanceName"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="内饰颜色" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model.trim="query.carInteriorName"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="零售开票状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="invoiceStatusList" placeholder="" v-model.trim="query.invoiceStatus"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6" v-if="showFactory">
                    <b-form-fieldset horizontal label="厂商" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="query.carFactoryCode" :options="factoryCodes" @input="factoryCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="品牌" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="query.carBrandCode" :options="brandCodes" @input="brandCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车系" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="query.carSeriesCode" :options="seriesCodes" @input="seriesCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车型" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="query.carModelCode" :options="modelCodes" @input="modelCodesChange">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="车款" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="query.carCode" :options="carCodes">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="库龄筛选方式" :label-cols="4" label-text-align="right">
                        <b-form-select v-model="query.inventoryCycleType" :options="inventoryCycleTypes">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="库龄天数" :label-cols="4" label-text-align="right">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="row">
                                <div class="col-md-9">
                                   <b-form-input type="number" min="1" placeholder="" v-model.number="query.startDayNumber" @change="checkStartDayNumber" :disabled="query.inventoryCycleType == null"/>
                                </div>
                                <div class="col-md-1">
                                   <label class="text-left">
                                       到
                                   </label>
                                </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row">
                                <div class="col-md-9">
                                   <b-form-input type="number" min="1" placeholder="" v-model.number="query.endDayNumber" @change="checkEndDayNumber" :disabled="query.inventoryCycleType == null"/>
                                </div>
                                <div class="col-md-1">
                                    <label class="pull-left">
                                        天
                                   </label>
                                </div>
                                </div>
                            </div>
                        </div>
                    </b-form-fieldset>
                </div>

                <!-- 入库时间 -->
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="入库时间" :label-cols="4" label-text-align="right">
                         <el-date-picker
                        v-model="value2"
                        @change="datechangeTwo('add')"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        placeholder="请输入时间范围"
                        :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>

                <!-- 出库时间 -->
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="出库时间" :label-cols="4" label-text-align="right">
                         <el-date-picker
                        v-model="value1"
                        @change="datechangeOne('add')"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        placeholder="请输入时间范围"
                        :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>

            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="reset">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryware()">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-4">
            <div class="top">
                <b-button size="sm" variant="info" type="button" @click="exportIntoExcel">导出</b-button>
                <!-- 新增数据总览 -->
                <div class="dataTotal" v-if="isDataShow">
                    <p>共搜索到{{ pager.total }}条数据,新车实际采购总价为{{ totalPrice | numTokilo }}</p>
                </div>
            </div>

            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="stockList" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                    </template>
                    <template slot="skuCode" slot-scope="data">
                        <a href="javascript:;" @click.prevent="checkDetail(data.item.skuCode)">{{data.item.skuCode}}</a>
                    </template>
                    <template slot="msrp" slot-scope="data">
                         {{ data.item.msrp | toFixed(2) }}
                    </template>
                    <template slot="purchaseFee" slot-scope="data">
                         {{ data.item.purchaseFee | toFixed(2) }}
                    </template>
                    <template slot="paymentDate" slot-scope="data">
                        {{ data.item.paymentDate | switchDate }}
                    </template>
                    <template slot="invoiceDate" slot-scope="data">
                        {{ data.item.invoiceDate | switchDate }}
                    </template>
                    <template slot="businessActualArriveTime" slot-scope="data">
                        {{ data.item.inStockBusinessTime | switchDate }}
                    </template>
                    <!-- 出库时间 -->
                    <template slot="outStockBusinessTime" slot-scope="data">
                        {{ data.item.outStockBusinessTime | switchDate }}
                    </template>
                    <template slot="stockStatus" slot-scope="data">
                        {{ (data.item.stockStatus == 1 ? '出库': (data.item.logisticsStatus == 1 ? '在途': (data.item.logisticsStatus == 2 ? '在库': ''))) }}
                    </template>
                    <template slot="salesStatus" slot-scope="data">
                        {{ data.item.salesStatus == '-1' ? '不可销售' : (data.item.salesStatus == '0' ? '可销售' : '已销售') }}
                    </template>
                    <template slot="lockStatus" slot-scope="data">
                        {{ data.item.lockStatus == 1 ? '锁定': '未锁定'}}
                    </template>
                    <template slot="invoiceStatus" slot-scope="data">
                        {{ data.item.invoiceStatus == 0 ? '未开票' : (data.item.invoiceStatus == 1 ? '已开票' : '') }}
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination
                class="pull-right"
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {
  MessageBox,
  Button,
  Message,
  TimePicker,
  DatePicker
} from "element-ui";
import config from "../../../common/config.js";
import api from "../../../common/api";
import common from "../../../common/common";
import Pagination from "components/pagination/pagination";
import Areaqueryshop from "components/iris-areaqueryshop";
import skuModal from "./skuModal.vue";
import car from "components/iris-car";
import Vue from 'vue'
Vue.use(DatePicker)
export default {
  mounted() {
    let _this = this;
    if (!config.isShowFactory) {
      this.queryCarInfoByCarSearch({
        code: "",
        level: 1,
        type: config.car.none
      });
    } else {
      this.queryCarInfoByCarSearch({
        code: "",
        level: 2,
        type: config.car.factoryRefCode
      });
    }
  },
  data() {
    return {
      storeShow: false,
      entreList: [],
      judgeStateOne: null,
      skuTypeCode: config.product.archives.archivesType,
      isDataShow: false,
      value1: [],
      value2: [],
      totalPrice: 0,  //查询条数总价总价
      query: {
        whCode: "",
        skuCode: "",
        storeCodeSet: [],
        carVinNo: "",
        productionCode: "",
        stockStatus: null,
        invoiceStatus: "",
        carFactoryCode: "",
        carBrandCode: "",
        carSeriesCode: "",
        carModelCode: "",
        carCode: "",
        minMSRP: null,
        maxMSRP: null,
        carAppertanceName: "",
        carInteriorName: "",
        startDayNumber: null,
        endDayNumber: null,
        inventoryCycleType: null,
        pageNums: config.pageNums,
        pageStart: 1,
        businessActualArriveTimeStart: null,
        businessActualArriveTimeEnd: null,
        outStockBusinessTimeStart: null,
        outStockBusinessTimeEnd: null
      },
      pager: {
        pageNo: 1,
        pageSize: 15,
        total: 1,
        totalPages: 1
      },
      timeStep: [],
      stockList: [],
      stockStatusList: [
          {
          text: "全部",
          value: null
        },
        {
          text: "在库",
          value: 3
        },
        {
          text: "在途",
          value: 2
        },
        {
          text: "出库",
          value: 1
        }
      ],
      invoiceStatusList: [
        {
          text: "全部",
          value: null
        },
        {
          text: "未开票",
          value: 0
        },
        {
          text: "已开票",
          value: 1
        }
      ],
      inventoryCycleTypes: [
        {
          text: "付款库龄",
          value: 1
        },
        {
          text: "开票库龄",
          value: 2
        },
        {
          text: "入库库龄",
          value: 4
        }
      ],
      fields: {
        index: {
          label: "序号"
        },
        skuCode: {
          label: "SKU编码"
        },
        storeName: {
          label: "门店"
        },
        productionCode: {
          label: "生产号"
        },
        carVinNo: {
          label: "车架号"
        },
        carFactoryName: {
          label: "厂家"
        },
        carBrandName: {
          label: "品牌"
        },
        carSeriesName: {
          label: "车系"
        },
        carModelName: {
          label: "车型"
        },
        carDisplayName: {
          label: "车款"
        },
        whName: {
          label: "仓库名称"
        },
        carAppertanceName: {
          label: "外观"
        },
        carInteriorName: {
          label: "内饰"
        },
        msrp: {
          label: "实际MSRP (含税)"
        },
        purchaseFee: {
          label: "新车实际采购价"
        },
        paymentDate: {
          label: "采购付款时间"
        },
        invoiceDate: {
          label: "采购开票时间"
        },
        businessActualArriveTime: {
          label: "实际入库时间"
        },
        //出库时间
         outStockBusinessTime:{
             label:'出库时间'
         },
        stockStatus: {
          label: "库存状态"
        },
        salesStatus: {
          label: "商品状态"
        },
        lockStatus: {
          label: "订单锁定状态"
        },
        invoiceStatus: {
          label: "零售开票状态"
        }
      }
    };
  },
  computed: {
    showFactory: function() {
      return !config.isShowFactory;
    },
    ...mapState("carInfo", [
      "factoryCodes",
      "brandCodes",
      "seriesCodes",
      "modelCodes",
      "carCodes"
    ])
  },
  methods: {
    reset() {
      let _this = this;
      _this.$data.query = {
        whCode: "",
        skuCode: "",
        storeCodeSet: _this.$data.query.storeCodeSet,
        carVinNo: "",
        productionCode: "",
        stockStatus: null,
        invoiceStatus: "",
        carFactoryCode: "",
        carBrandCode: "",
        carSeriesCode: "",
        carModelCode: "",
        carCode: "",
        minMSRP: null,
        maxMSRP: null,
        carAppertanceName: "",
        carInteriorName: "",
        startDayNumber: null,
        endDayNumber: null,
        inventoryCycleType: null,
        pageNums: config.pageNums,
        pageStart: 1,
        businessActualArriveTimeStart:null,
        businessActualArriveTimeEnd:null,
        outStockBusinessTimeStart:null,
        outStockBusinessTimeEnd:null
      };
      _this.value1 = ''
      _this.value2 = ''
      if (_this.showFactory) {
        this.setBrandCodes({options: []})
      }
      this.setSeriesCodes({options: []})
      this.setModelCodes({options: []})
      this.setCarCodes({options: []})
    },
    //时间格式转换
    datechangeOne(val){
      let _this = this
        this.query.outStockBusinessTimeStart = common.eleTimeFormat(_this.value1[0])
        this.query.outStockBusinessTimeEnd = common.eleTimeFormat(_this.value1[1])
    },
    datechangeTwo(val){
      let _this = this
        this.query.businessActualArriveTimeStart = common.eleTimeFormat(_this.value2[0])
        this.query.businessActualArriveTimeEnd = common.eleTimeFormat(_this.value2[1])
    },
    selectedfun(sales, stores) {
      let _this = this;
      let options = {
        storeCodeSet: []
      };
      if (stores instanceof Array) {
        stores.forEach(item => {
          options.storeCodeSet.push(item.value);
          _this.$data.query.storeCodeSet.push(item.value);
        });
      } else if (stores.value === 0) {
        options.storeCodeSet = [];
        _this.$data.query.storeCodeSet = [];
      } else if (stores.hasOwnProperty("value")) {
        options.storeCodeSet = [];
        options.storeCodeSet[0] = stores.value;
        _this.$data.query.storeCodeSet[0] = stores.value;
      }
      options.warehouseTypeFlag = 1;
      options.whSkuAndCarTypeFlag = 0;
      if (options.storeCodeSet.length > 0) {
        api.supplyChain.procurement.getEntrepot(options, function(res) {
          if (res.data.code === "success") {
            const array = res.data.obj;
            _this.entreList = [];
            for (var i = 0; i < array.length; i++) {
              let obj = {};
              obj.text = array[i].warehouseName;
              obj.value = array[i].warehouseCode;
              _this.entreList.push(obj);
            }
            if (_this.entreList.length === 0) {
              let tempObj = {};
              tempObj.text = "请选择仓库";
              tempObj.value = "";
              _this.entreList.push(tempObj);
            }
          }
        });
      } else {
        _this.entreList = [];
      }
    },
    jumpDetail: function(id, carVinNo) {
      if (carVinNo) {
        this.$router.push({
          path: `/archives/addArchives/${id}`
        });
      } else {
        this.$router.push({
          path: `/boutique/addBoutique/${id}`
        });
      }
    },
    checkDetail: function(id) {
      this.$store.dispatch("archives/setIsNotEdit", true);
      this.$router.push({
        path: `/archives/carloadDetails/${id}`
      });
    },
    getTotalPrice(params) {
      api.supplyChain.stockInfo.queryCarStockPurchaseFee(params, res => {
        if (res.data.code == "success") {
          this.totalPrice = res.data.obj;
        }
      });
    },
    getInventory(data, obj, page) {
      const $this = this;
      let params = data;
      params.pageStart = page;
      api.supplyChain.stockInfo.queryCarStockInfos(params, res => {
        if (res.data.code == "success") {
          $this.stockList = res.data.obj.list;
          $this.stockList.forEach(item => {
            if (item.skuAddInfoVos.length) {
              item.skuAddInfoVos.forEach(skuAddInfo => {
                switch (skuAddInfo.addCode) {
                  case config.product.skuAddInfos.carAppertanceName.refCode:
                    item.carAppertanceName = skuAddInfo.addValue;
                    break;
                  case config.product.skuAddInfos.carInteriorName.refCode:
                    item.carInteriorName = skuAddInfo.addValue;
                    break;
                  case config.product.skuAddInfos.actualMSRPInclusiveTax
                    .refCode:
                    item.msrp = skuAddInfo.addValue;
                    break;
                }
              });
            }
          });
          $this.pager.pageNo = res.data.obj.pageNum;
          $this.pager.totalPages = res.data.obj.pages;
          $this.pager.pageSize = res.data.obj.pageSize;
          $this.pager.total = res.data.obj.total;
        }
      });
    },
    queryware(page) {
      const $this = this;
      // 判断入参的值是否为''如果为空转为null
      this.query.businessActualArriveTimeStart = this.query.businessActualArriveTimeStart === ''? null : this.query.businessActualArriveTimeStart
      this.query.businessActualArriveTimeEnd = this.query.businessActualArriveTimeEnd === ''? null : this.query.businessActualArriveTimeEnd
      this.query.outStockBusinessTimeStart = this.query.outStockBusinessTimeStart === ''? null : this.query.outStockBusinessTimeStart
      this.query.outStockBusinessTimeEnd = this.query.outStockBusinessTimeEnd === ''? null : this.query.outStockBusinessTimeEnd
      $this.getInventory(this.query, "", page);
      $this.getTotalPrice(this.query);
      $this.isDataShow = true;
    },
    pageChange(page) {
      this.query.pageStart = page;
      this.queryware(page);
    },
    exportIntoExcel: function() {
      const $this = this;
      api.ordinalInfo.getSequence({serviceCode: 'FILEEXPORTSEQ'}, res => {
        if(res.data.code == 'success'){
          let fileExportType = res.data.obj
          let parameters
          let _this = this;
          // _this.$data.query.exportFileStatus = 1
          let copyquery = JSON.parse(JSON.stringify(_this.$data.query))
          copyquery.exportFileStatus = 1
          let options = {
            fileExportType: config.fileExportType.FileExportTypeStock,
            fileExportCode: fileExportType,
            fileRelactionCode: 'ExportTemplateCarStockList',
            parameters: copyquery
          }
          api.downLoad.insertFileExportInfo(options, res => {
            if (res.data.code === "success") {
                  MessageBox.confirm("请在导出中心下载生成的文件", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                  })
            }
          });
        }
      })

    },
    factoryCodesChange: function() {
      if (!this.query.carFactoryCode) return
      let _this = this;
      _this.queryCarInfoByCarSearch({
        code: _this.query.carFactoryCode,
        level: 2,
        type: config.car.factoryRefCode,
        carFactoryCode: config.isShowFactory ? null : _this.query.carFactoryCode
      });
    },
    brandCodesChange: function() {
      if (!this.query.carBrandCode) return
      let _this = this;
      _this.queryCarInfoByCarSearch({
        code: _this.query.carBrandCode,
        level: 4,
        type: config.car.brandRefCode,
        carFactoryCode: config.isShowFactory ? null : _this.query.carFactoryCode,
        carBrandCode: _this.query.carBrandCode
      });
    },
    seriesCodesChange: function() {
      if (!this.query.carSeriesCode ) return
      let _this = this;
      _this.queryCarInfoByCarSearch({
        code: _this.query.carSeriesCode,
        level: 8,
        type: config.car.seriesRefCode,
        carFactoryCode: config.isShowFactory ? null : _this.query.carFactoryCode,
        carBrandCode: _this.query.carBrandCode,
        carSeriesCode: _this.query.carSeriesCode
      });
    },
    modelCodesChange: function() {
      if (!this.query.carModelCode ) return
      let _this = this;
      _this.queryCarInfoByCarSearch({
        code: _this.query.carModelCode,
        level: 64,
        type: config.car.modelRefCode,
        carFactoryCode: config.isShowFactory ? null : _this.query.carFactoryCode,
        carBrandCode: _this.query.carBrandCode,
        carSeriesCode: _this.query.carSeriesCode,
        carModelCode: _this.query.carModelCode
      });
    },
    showSkuDetail: function(skuCode) {
      let _this = this;
      _this.$refs.modal.getDefaultInfo({
        skuCode: skuCode,
        callback: () => {
          _this.showSkuModal();
        }
      });
    },
    checkStartDayNumber: function() {
      let _this = this;
      if (parseFloat(_this.$data.query.startDayNumber) < 0) {
        _this.$data.query.startDayNumber = 0;
      }
      if (
        parseFloat(_this.$data.query.startDayNumber) >
        parseFloat(_this.$data.query.endDayNumber)
      ) {
        _this.$data.query.endDayNumber = _this.$data.query.startDayNumber;
      }
    },
    checkEndDayNumber: function() {
      let _this = this;
      if (parseFloat(_this.$data.query.endDayNumber) < 0) {
        _this.$data.query.endDayNumber = 0;
      }
      if (
        parseFloat(_this.$data.query.startDayNumber) >
        parseFloat(_this.$data.query.endDayNumber)
      ) {
        _this.$data.query.endDayNumber = _this.$data.query.startDayNumber;
      }
    },
    ...mapActions("carInfo", ["queryCarInfoByCarSearch"]),
    ...mapActions("releaseVehicleResource", ["showSkuModal"]),
    ...mapMutations({
        setBrandCodes: 'carInfo/CARINFO_GET_BRAND_CODES',
        setSeriesCodes: 'carInfo/CARINFO_GET_SERIES_CODES',
        setModelCodes: 'carInfo/CARINFO_GET_MODEL_CODES',
        setCarCodes: 'carInfo/CARINFO_GET_CAR_CODES'
    })
  },
  beforeRouteLeave(to, from, next) {
      this.reset()
      next()
  },
  components: {
    Areaqueryshop,
    Pagination,
    DatePicker,
    skuModal,
    car
  }
};
</script>
<style lang="scss" scoped>
.top {
  display: flex;
}
.dataTotal {
  flex: 1;
}
.dataTotal p {
  color: #151B1E;
  text-align: right;
}
</style>



