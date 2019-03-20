<template>
    <div>
       <b-card header="查询">
          <div class="row">
            <div class="col-md-6">
              <!--选择销售区域-->
              <b-form-fieldset horizontal label="选择经销商店*" label-text-align="right" :label-cols="4">
                  <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
              </b-form-fieldset>
            </div>
            <div class="col-md-6">
              <!--上报厂家日期-->
              <b-form-fieldset horizontal label="上报厂家日期" label-text-align="right" :label-cols="4">
                  <date-picker
                      format="yyyy-MM-dd"
                      type="daterange"
                      v-model="reportFactoryDate"
                      :editable="false"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions0"
                      >
                  </date-picker>
              </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="整车开票日期" label-text-align="right" :label-cols="4">
                    <date-picker
                        format="yyyy-MM-dd"
                        type="daterange"
                        v-model="carInvoiceDate"
                        :editable="false"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions1"
                        >
                    </date-picker>
                </b-form-fieldset>
              </div>
          </div>
          <!--厂家车型车系查询-->
          <iris-car ref="carInfo" :col="2" :flag="isShowFactory" :initData="intentionCarInfoVos[0]" @callBack="backSkuCar">
            <!-- <template slot="rest"> -->
              <!--整车开票日期-->
              
            <!-- </template> -->
          </iris-car>
          <div class="row">
            <div class="col-md-12">
              <div class="pull-right">
                <b-button @click="reset" size="sm">重置</b-button>
                <b-button @click="queryCarSkuSalesListBySearch" size="sm" variant="primary">查询</b-button>
              </div>
            </div>
          </div>
       </b-card>
      <b-card>
        <div class="row">
          <div class="col-md-12">
              <b-button v-if="skuSalesListWriteExcelBtn" @click="skuSalesListWriteExcel" size="sm">导出</b-button>
          </div>
        </div>
        <div class="table-total row">
          <div class="col-md-12">
              <div class="pull-left col-md-1">合计:</div>
              <div class="pull-right table-item">零售SI: <span class="value">{{totalData.totalRetailSI | filterToFixed}}</span></div>
              <div class="pull-right table-item">批售SI: <span class="value">{{totalData.totalManuSellSI | filterToFixed}}</span></div>
              <div class="pull-right table-item">GP1: <span class="value">{{totalData.totalGp1 | filterToFixed}}</span></div>
              <div class="pull-right table-item">实际销售价: <span class="value">{{totalData.totalActualSalesPrice | filterToFixed}}</span></div>
              <div class="pull-right table-item">新车实际采购价: <span class="value">{{totalData.totalPurchaseFee | filterToFixed}}</span></div>
          </div> 
        </div>
        <div class="table-scrollable">
          <b-table class="min-table-width" striped hover bordered show-empty :items="tableData" :fields="fields">
            <template slot="index" slot-scope="data">
              {{data.index + 1}}
            </template>
            <!--列出个别时间为时间格式化（去除尾部的点'.'）-->
            <!--整车入库时间-->
            <template slot="businessActualArriveTime" slot-scope="data">
              {{data.item.businessActualArriveTime | dateRepairFor}}
            </template>
            <!--零售开票时间-->
            <template slot="actualInvoiceDate" slot-scope="data">
              {{data.item.actualInvoiceDate | dateRepair}}
            </template>
            <!--整车交车时间-->
            <template slot="closingDate" slot-scope="data">
              {{data.item.closingDate | dateRepair}}
            </template>
            <!--采购付款时间-->
            <template slot="paymentDate" slot-scope="data">
              {{data.item.paymentDate | dateRepairFor}}
            </template>
            <!--采购开票时间-->
            <template slot="invoiceDate" slot-scope="data">
              {{data.item.invoiceDate | dateRepairFor}}
            </template>
            <!--单独列出template目的为小数点格式化-->
            <template slot="gp1" slot-scope="data">
              {{data.item.gp1 | filterToFixed}}
            </template>
            <template slot="actualMSRPInclusiveTax" slot-scope="data">
              {{data.item.actualMSRPInclusiveTax | filterToFixed}}
            </template>
            <template slot="actualSalesPrice" slot-scope="data">
              {{data.item.actualSalesPrice | filterToFixed}}
            </template>
            <template slot="purchaseFee" slot-scope="data">
              {{data.item.purchaseFee | filterToFixed}}
            </template>
            <template slot="manuSellSI" slot-scope="data">
              {{data.item.manuSellSI | filterToFixed}}
            </template>
            <template slot="retailSI" slot-scope="data">
              {{data.item.retailSI | filterToFixed}}
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
    </div>
</template>
<script>
//该页面查询条件中的厂商、品牌、车型、车系、车款联动为组件，会依据isShowFactory（从页面session storage中获取）作为是否显示厂商还是品牌条件
import { MessageBox, Message, DatePicker } from "element-ui";
//公司内部组件
import api from '../../../common/api';
import common from 'common/common';
import config from "../../../common/config";
import IrisCar from '../../../components/iris-car';
import pagination from "../../../components/pagination/pagination";
import areaqueryshop from "components/iris-areaqueryshop";
import apiUrl from 'common/api-url'
import {hasBtn} from 'common/com-api'
export default {
  components: {
    IrisCar,
    DatePicker,
    pagination,
    areaqueryshop,
  },
  watch:{
    //上报厂家日期
    reportFactoryDate(val){
      if(val[0] !== null && val != ''){
        let date = common.formattingTime(val);
        this.queryParams.reportFactoryDateStart = date.startTime;
        this.queryParams.reportFactoryDateEnd = date.endTime + " 23:59:59";
      }else{
        this.queryParams.reportFactoryDateStart = '';
        this.queryParams.reportFactoryDateEnd = '';
      }
    },
    //整车开票日期
    carInvoiceDate(val){
      if(val[0] !== null && val != ''){
        let date = common.formattingTime(val);
        this.queryParams.carInvoiceDateStart = date.startTime;
        this.queryParams.carInvoiceDateEnd = date.endTime + " 23:59:59";
      }else{
        this.queryParams.carInvoiceDateStart = '';
        this.queryParams.carInvoiceDateEnd = '';
      }
    }
  },
  filters:{
    filterToFixed(val){
      if(val != null){
        let result = (val * 1).toFixed(2),
            re = /\d{1,3}(?=(\d{3})+$)/g;
            result = result.toString().replace(/^(\d+)((\.\d+)?)$/, function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
        return result
      }
    },
    dateRepairFor(val){
      let result;
      if(val){
        result = val.slice(0,val.indexOf('.0') - 8);
      }
      return result;
    },
    dateRepair(val){
      let result;
      if(val){
        result = val.slice(0,val.indexOf('.0'));
      }
      return result;
    }
  },
  computed:{
    skuSalesListWriteExcelBtn(){
      return hasBtn(apiUrl.dataReport.skuSalesListWriteExcel)
    }
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }, 
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }, 
      pageStart: 1, //当前查询第几页
      isShowFactory: false, //获取当前用户在筛选车型、车系、车款时候从品牌开始还是从厂家开始标识
      reportFactoryDate: '', //上报厂家日期组件用数据
      carInvoiceDate: '', //整车开票时间组件用数据
      intentionCarInfoVos: [],
      totalData:{//表格合计数据
        totalRetailSI: 0,
        totalManuSellSI: 0,
        totalGp1: 0,
        totalActualSalesPrice: 0,
        totalPurchaseFee: 0
      }, 
      pager:{ //分页数据
        pageNo: 1,
        pageSize: 1,
        total: 0,
        totalPages: 0
      },
      queryParams:{
        reportFactoryDateStart: '', //上报厂家日期开始时间
        reportFactoryDateEnd: '', //上报厂家日期结束
        carInvoiceDateStart: '', //整车开票时间开始
        carInvoiceDateEnd:'' , //整车开票时间结束
        storeCode: '', //门店code
        carFactoryCode: '', //厂商code
        carBrandCode: '', //品牌code
        carSeriesCode: '', //车系
        carModelCode: '', //车型
        carCode: ''//车款
      },
      tableData:[],
      //表格字段
      fields:{
        index: {
          label: '序号'
        },
        storeName: {
          label: '所属门店'
        },
        carFactoryName: {
          label: '厂商'
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
        vinNo: {
          label: '车架号'
        },
        actualMSRPInclusiveTax: {
          label: 'MSRP'
        },
        reportFactoryDate: {
          label: '上报厂家日期'
        },
        paymentDate: {
          label: '采购付款时间'
        },
        invoiceDate: {
          label: '采购开票时间'
        },
        businessActualArriveTime: {
          label: '整车入库时间'
        },
        actualInvoiceDate: {
          label: '零售开票时间'
        },
        closingDate: {
          label: '整车交车时间'
        },
        inStockSourceInvoiceBusinessCycle: {
          label: '整车库龄(天)'
        },
        purchaseFee: {
          label: '新车实际采购价'
        },
        actualSalesPrice: {
          label: '实际销售价'
        },
        gp1: {
          label: 'GP1'
        },
        manuSellSI: {
          label: '批售SI'
        },
        retailSI: {
          label: '零售SI'
        }
      }
    }
  },
  mounted() {
    //页面初始执行
    this.initPage();
  },
  methods: {
    //重置查询信息
    reset(){
      this.$refs.carInfo.clear();
      for(let i in this.queryParams){
        this.queryParams[i] = '';
      }
      this.carInvoiceDate = '';
      this.reportFactoryDate = '';
    },
    //虚拟销售管理报表查询
    queryCarSkuSalesListBySearch(){
      this.queryParams.pageStart = this.pageStart;
      this.queryParams.pageNums = config.pageNums;
      api.dataReport.queryCarSkuSalesListBySearch(this.queryParams, (res) => {
        if(res.data.code === 'success'){
          this.tableData = res.data.obj.list;
          this.pager.pageNo = res.data.obj.pageNum;
          this.pager.pageSize = res.data.obj.pageSize;
          this.pager.total = res.data.obj.total;
          this.pager.totalPages = res.data.obj.pages;
          //查询合计数据
          api.dataReport.queryCarSkuSalesListNoPage(this.queryParams, (res) => {
            if(res.data.code === "success"){
              this.totalData = res.data.obj;
            }
          });
        }
      })
    },
    //分页查询方法
    pageChange(val){
      this.pageStart = val;
      this.queryParams.pageNums = config.pageNums;
      api.dataReport.queryCarSkuSalesListBySearch(this.queryParams, (res) => {
        if(res.data.code === 'success'){
          this.tableData = res.data.obj.list;
          this.pager.pageNo = res.data.obj.pageNum;
          this.pager.pageSize = res.data.obj.pageSize;
          this.pager.total = res.data.obj.total;
          this.pager.totalPages = res.data.obj.pages;
        }
      })
    },
    //页面初始执行
    initPage(){
      //获取当前用户在筛选车型、车系、车款时从品牌开始还是厂家开始
      this.isShowFactory = JSON.parse(common.getSession('showFactory'));
    },
    //选择门店，获取门店code
    selectStores(sales, stores){
      if(stores){
        this.queryParams.storeCode = stores.value
      }
    },
    //选择厂家、品牌、车型、车系、车款后的回调
    backSkuCar(val) {
      this.queryParams.carFactoryCode = val.factoryCode
      this.queryParams.carBrandCode = val.brandCode
      this.queryParams.carSeriesCode = val.seriesCode
      this.queryParams.carModelCode = val.modelCode
      this.queryParams.carCode = val.carCode
    },
    //导出表格
    skuSalesListWriteExcel(){
      api.dataReport.skuSalesListWriteExcel(this.queryParams, (res) => {
        if(res.data.code === "success"){
          window.open(res.data.obj);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.min-table-width{
  min-width: 2500px;
}

.table-total{
  margin-top: 20px;
  font-size:14px;
}

.table-total .table-item{
  padding-left:20px;
}
</style>