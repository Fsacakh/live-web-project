<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="选择经销商店*" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-3">
                    <b-form-fieldset horizontal label="年度*" :label-cols="4" label-text-align="right">
                        <date-picker format="yyyy" v-model="year"  type="year" @change="yearChange">
                        </date-picker>
                         <!--  -->
                    </b-form-fieldset>
                </div>
                
                <div class="col-md-3">
                    <b-form-fieldset horizontal label="月份" :label-cols="4" label-text-align="right">
                        <b-form-select
                            :plain="true"
                            :options="['1','2','3','4','5','6','7','8','9','10','11','12']"
                            v-model="scFollowUpCondition.monthStr">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="渠道*" :label-cols="4" label-text-align="right">
                        <b-form-select
                            :plain="true"
                            :options="allChannels"
                            v-model="scFollowUpCondition.channelCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售顾问" :label-cols="2" label-text-align="right">
                        <search v-model="scFollowUpCondition.operatorName"
                        :dataList="filterSCList"
                        :valueName="'text'"
                        :keyName="'text'"
                        @dataChange="getSCListByName"
                        @clickShowBack="checkStore"></search>
                    </b-form-fieldset>
                </div>
            </div> 
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="searchSCOrderAndThreadConditions">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div>
                <b-button size="sm" variant="info" type="button" @click="exportTab">导出</b-button>
            </div>
            <div class="table-scrollable">
                <table class="table table-striped table-hover table-bordered" id="hideTabe">
                    <thead>
                            <tr class="text-center">
                                <th class="text-center">门店</th>
                                <th class="text-center">年份</th>
                                <th class="text-center">月份</th>
                                <th class="text-center">销售顾问</th>
                                <th class="text-center">渠道</th>
                                <th class="text-center">保有线索</th>
                                <th class="text-center">新增散客线索</th>
                                <th class="text-center">新增非散客线索</th>
                                <th class="text-center">进店线索数</th>
                                <th class="text-center">试乘试驾线索数</th>
                                <th class="text-center">SC准战败数</th>
                                <th class="text-center">报价数</th>
                                <th class="text-center">订单数</th>
                                <!-- <th class="text-center">合同数</th> -->
                                <th class="text-center">退订数</th>
                                <th class="text-center">车辆开票数</th>
                                <th class="text-center">交车数</th>
                            </tr>
                    </thead>
                    <tbody>
                            <template v-if="dataList.length === 0">
                                <tr>
                                    <td colspan='27' class="text-left">暂无数据...</td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr class="text-center" v-for=" (item, index) in dataList" :key="index">
                                     <td >
                                        {{item.store}}
                                    </td>
                                     <td >
                                        {{item.year}}
                                    </td>
                                     <td >
                                        {{item.month}}
                                    </td>
                                     <td >
                                        {{item.scName}}
                                    </td>
                                     <td >
                                        {{item.channel}}
                                    </td>
                                    <!-- let leadKeys = [
                                            "keep_count",//保留线索
                                            "individual_leads_count",//新增散客
                                            "unIndividual_leads_count",//新增非散客
                                            "intoStore_count",  //进店
                                            "trialDrive_count",//试乘试驾
                                            "scDefeat_count",//准战败
                                        ]-->

                                     <td >
                                        {{item.keep_count}}
                                    </td>
                                     <td >
                                        {{item.individual_leads_count}}
                                    </td>
                                     <td >
                                        {{item.unIndividual_leads_count}}
                                    </td>
                                     <td >
                                        {{item.intoStore_count}}
                                    </td>
                                     <td >
                                        {{item.trialDrive_count}}
                                    </td>
                                     <td >
                                        {{item.scDefeat_count}}
                                    </td>
                                    <!-- let orderKeys = [
                                            "9",//报价
                                            "2",//订单 (包含"1" :意向单)
                                            "3",//合同
                                            "0",//退订
                                            "4",//开票
                                            "5",//交车
                                        ]  -->
                                     <td >
                                        {{item.order9}}
                                    </td>
                                     <td >
                                        {{item.order9999}}  
                                    </td>
                                     <!-- <td >
                                        {{item.order3}}
                                    </td> -->
                                     <td >
                                        {{item.order0}}
                                    </td>
                                     <td >
                                        {{item.order4}}
                                    </td>
                                     <td >
                                        {{item.order5}}
                                    </td>
                                </tr>
                            </template>
                     </tbody>
                </table>
            </div>
            <!-- <div class="row">
                <div class="col-md-12">
                     <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total" :total-pages="pager.totalPages">
                     </pagination>
                </div>
           </div> -->
        </b-card>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import config from "../../../common/config";
import pagination from "../../../components/pagination/pagination";
import areaqueryshop from "components/iris-areaqueryshop";
import { MessageBox, Message, DatePicker } from "element-ui";
import XLSX from "xlsx";
import search from "../../../components/search/search";

export default {
  mounted() {
    this.getChannels();
    this.getCurrentYear();
  },
  data: function() {
    return {
      year: "",
      scFollowUpCondition: {
        salesAreaCodeSet: [],
        storeName: "",
        storeCodes: [],
        monthStr: "",
        yearStr: "",
        channelCode: "",
        // scCode: "",
        operatorName: "",
        postType: "1", // 0:dcc  1:sc
        modeType: 0
      }
    };
  },
  methods: {
    // 导出表格
    exportTab() {
      let _this = this;
      let worksheet = XLSX.utils.table_to_book(
        document.getElementById("hideTabe")
      );
      var date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let d = date.getDate();
      let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let currentTimeStr =
        year + "-" + month + "-" + d + "-" + hour + ":" + minute + ":" + second;
      // console.log(currentTimeStr);
      XLSX.writeFile(
        worksheet,
        "销售顾问线索跟进转化表-" + currentTimeStr + ".xlsx"
      );
    },
    clear: function() {
      let _this = this;
      _this.$data.scFollowUpCondition = {
        salesAreaCodeSet: _this.$data.scFollowUpCondition.salesAreaCodeSet,
        storeCodes: _this.$data.scFollowUpCondition.storeCodes,
        storeName: _this.$data.scFollowUpCondition.storeName,
        monthStr: "",
        yearStr: "",
        channelCode: "",
        // scCode: "",
        operatorName: "",
        postType: "1" // 0:dcc  1:sc
      };
      _this.$data.year = "";
    },
    scChange: function(text) {
      let _this = this;
      _this.$data.scFollowUpCondition.scName = text;
    },
    getSCListByName: function(scName) {
      this.getSCListByNameAction(scName);
    },
    selectStores: function(sales, stores) {
      let _this = this;
      if (sales instanceof Array) {
        _this.scFollowUpCondition.salesAreaCodeSet = [];
        sales.forEach(item => {
          _this.scFollowUpCondition.salesAreaCodeSet.push(item.code);
        });
      } else if (sales.code === 0) {
        _this.scFollowUpCondition.salesAreaCodeSet = [];
      }
      if (stores instanceof Array) {
        _this.scFollowUpCondition.storeCodes = [];
        stores.forEach(item => {
          _this.scFollowUpCondition.storeCodes.push(item.value);
        });
      } else if (stores.value === 0) {
        _this.scFollowUpCondition.storeCodes = [];
      } else if (stores.hasOwnProperty("value")) {
        _this.scFollowUpCondition.storeCodes = [];
        _this.scFollowUpCondition.storeCodes[0] = stores.value;
        _this.scFollowUpCondition.storeName = stores.text;
        _this.getSClist({
          storeCode: _this.scFollowUpCondition.storeCodes[0]
        });
      }
    },
    yearChange: function() {
      let _this = this;
      if (_this.year != undefined && _this.year != "") {
        let time = _this.year.getFullYear();
        _this.scFollowUpCondition.yearStr = time;
      } else {
        _this.scFollowUpCondition.yearStr = "";
      }
    },
    searchSCOrderAndThreadConditions: function() {
      let _this = this;
      //   _this.queryOrderReport(_this.$data.scFollowUpCondition);
      if (this.checkStore() && this.checkYear()) {
        if ("All" == _this.scFollowUpCondition.operatorName) {
          _this.scFollowUpCondition.modeType = 1;
        } else {
          _this.scFollowUpCondition.modeType = 0;
        }
        _this.queryScSalesLeadsReport(_this.scFollowUpCondition);
      }
    },
    checkStore: function() {
      if (this.$data.scFollowUpCondition.storeCodes.length === 1) {
        return true;
      } else {
        Message.closeAll();
        Message({
          type: "warning",
          message: "请选择门店"
        });
        return false;
      }
    },
    checkYear: function() {
      if (this.$data.scFollowUpCondition.yearStr !== "") {
        return true;
      } else {
        Message.closeAll();
        Message({
          type: "warning",
          message: "请选择年份"
        });
        return false;
      }
    },
    getCurrentYear: function() {
      this.year = new Date();
    },
    ...mapActions("scThreadFollowUp", [
      "queryScSalesLeadsReport",
      "getChannels",
      "getSClist",
      "getSCListByNameAction"
    ])
  },
  computed: {
    ...mapState("scThreadFollowUp", [
      "orderList",
      "leadsList",
      "channels",
      "scs"
    ]),
    ...mapGetters("scThreadFollowUp", [
      "allChannels",
      "dataList",
      "filterSCList"
    ])
  },
  components: {
    areaqueryshop,
    pagination,
    DatePicker,
    search
  }
};
</script>
<style>
</style>