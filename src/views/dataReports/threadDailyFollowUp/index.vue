<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="选择经销商店*" :label-cols="4" label-text-align="right" >
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="日期*" :label-cols="4" label-text-align="right">
                        <date-picker format="yyyy-MM-dd" v-model="dailyFollowUp.salesDate" @change="dateChange">
                        </date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="渠道*" :label-cols="4" label-text-align="right">
                        <b-form-select
                            :plain="true"
                            :options="allChannels"
                            v-model="dailyFollowUp.channelCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售顾问" :label-cols="4" label-text-align="right">
                        <search v-model="dailyFollowUp.scCode"
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
                        <b-button size="sm" variant="primary" @click="search">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div>
                <b-button size="sm" variant="info" type="button" @click="exportTab">导出</b-button>
            </div>
            <div class="table-scrollable" id="hideTabe">
                <b-table striped hover bordered show-empty :items="items" :fields="fields">

                </b-table>
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
import areaqueryshop from "components/iris-areaqueryshop";
import search from "../../../components/search/search";
import { MessageBox, Message, DatePicker } from "element-ui";
import config from "../../../common/config";
import api from "../../../common/api";
import XLSX from "xlsx";

export default {
  components: {
    areaqueryshop,
    search,
    DatePicker
  },
  data: function() {
    return {
      dailyFollowUp: {
        salesDate: "",
        channelCode: "",
        scCode: "",
        storeCode: "",
        salesYear: "",
        salesMonth: ""
      },
      allSCList: [],
      allChannels: [],
      filterSCList: [],
      fields: {
        name: { label: "" },
        keepThread: { label: "存留线索数" },
        monthPlanFollowUp: { label: "当月计划跟进数" },
        monthCall: { label: "当月电话呼出数" },
        monthValidCall: { label: "当月有效电话呼出数" },
        monthStoreTarget: { label: "当月进店线索数（目标）" },
        monthStoreActual: { label: "当月进店线索数（实际）" },
        dayPlanFollowUp: { label: "当日计划跟进数" },
        dayCall: { label: "当日电话呼出数" },
        dayValidCall: { label: "当日有效电话呼出数" },
        tomorrowPlan: { label: "明日计划跟进数" }
      },
      items: [
        {
          name: "销售顾问小计",
          keepThread: "159",
          monthPlanFollowUp: "357",
          monthCall: "139",
          monthValidCall: "741",
          monthStoreTarget: "486",
          monthStoreActual: "356",
          dayPlanFollowUp: "564",
          dayCall: "222",
          dayValidCall: "111",
          tomorrowPlan: "333"
        },
        {
          name: "李峰SC",
          keepThread: "78",
          monthPlanFollowUp: "67",
          monthCall: "56",
          monthValidCall: "45",
          monthStoreTarget: "34",
          monthStoreActual: "92",
          dayPlanFollowUp: "81",
          dayCall: "86",
          dayValidCall: "52",
          tomorrowPlan: "31"
        },
        {
          name: "李前SC",
          keepThread: "29",
          monthPlanFollowUp: "86",
          monthCall: "35",
          monthValidCall: "8",
          monthStoreTarget: "17",
          monthStoreActual: "58",
          dayPlanFollowUp: "42",
          dayCall: "75",
          dayValidCall: "155",
          tomorrowPlan: "102"
        },
        {
          name: "姜玮SC",
          keepThread: "25",
          monthPlanFollowUp: "77",
          monthCall: "47",
          monthValidCall: "14",
          monthStoreTarget: "86",
          monthStoreActual: "53",
          dayPlanFollowUp: "42",
          dayCall: "88",
          dayValidCall: "6",
          tomorrowPlan: "46"
        },
        {
          name: "徐晋敏SC",
          keepThread: "85",
          monthPlanFollowUp: "76",
          monthCall: "46",
          monthValidCall: "15",
          monthStoreTarget: "86",
          monthStoreActual: "56",
          dayPlanFollowUp: "35",
          dayCall: "84",
          dayValidCall: "56",
          tomorrowPlan: "53"
        },
        {
          name: "李苏云SC",
          keepThread: "19",
          monthPlanFollowUp: "35",
          monthCall: "13",
          monthValidCall: "41",
          monthStoreTarget: "86",
          monthStoreActual: "6",
          dayPlanFollowUp: "4",
          dayCall: "22",
          dayValidCall: "141",
          tomorrowPlan: "233"
        }
      ]
    };
  },
  mounted() {
    this.getChannels();
    this.getCurrentDate();
  },
  methods: {
    getChannels: function() {
      let _this = this;
      let params = { refCode: config.addclientmain.channelCode };
      api.ref.getDataDictionary(params).then(res => {
        if (res.data.code === "success") {
          _this.allChannels = [];
          let list = res.data.obj.referenceDetailInfos;
          if (Array.isArray(list)) {
            _this.allChannels.unshift({
              value: "",
              text: "全部"
            });
            list.forEach(item => {
              _this.allChannels.push({
                value: item.refDetailCode,
                text: item.refDetailName
              });
            });
          }
        }
      });
    },
    getCurrentDate: function() {
      let date = new Date();
      let _this = this;
      _this.dailyFollowUp.salesDate =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        "-";
    },
    selectStores: function(sales, stores) {
      let _this = this;
      if (stores.hasOwnProperty("value") && stores.value != "0") {
        _this.dailyFollowUp.storeCode = stores.value;
        _this.getSClist();
      }
    },
    getSClist: function() {
      let _this = this;
      let param = {
        storeCode: _this.dailyFollowUp.storeCode,
        postnTypeCode: config.postnTypeCode.sc
      };
      api.emp.queryEmpByStoreCode(param, res => {
        if (res.data.code === "success") {
          let list = res.data.obj;
          _this.allSCList = [];
          if (Array.isArray(list) && list.length > 0) {
            _this.allSCList.unshift({
              value: "",
              text: "All"
            });
            list.forEach(item => {
              _this.allSCList.push({
                value: item.empCode,
                text: item.empCnName
              });
            });
            _this.filterSCList = _this.allSCList;
          }
        }
      });
    },
    getSCListByName: function(scName) {
      let _this = this;
      _this.filterSCList = [];
      _this.dailyFollowUp.allSCList.forEach(element => {
        let op = element.text;
        if (op.includes(scName)) {
          _this.filterSCList.push(element);
        }
      });
    },
    checkStore: function() {
      if (this.$data.dailyFollowUp.storeCode) {
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
    dateChange: function(date) {
      console.log(date);
    },
    clear: function() {
      console.log("clear");
    },
    search: function() {
      console.log("search");
    },
    exportTab: function() {
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
      XLSX.writeFile(
        worksheet,
        "线索日常跟进情况表-" + currentTimeStr + ".xlsx"
      );
    }
  }
};
</script>
