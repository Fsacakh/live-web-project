<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="选择经销商店*" label-text-align="right" :label-cols="4" :class="{'input-box' : storeState}">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-3">
                    <b-form-fieldset horizontal label="年度*" :label-cols="4" label-text-align="right" :class="{'input-box' : yearState}">
                        <date-picker format="yyyy" v-model="year"  type="year" @change="yearChange" >
                        </date-picker>
                    </b-form-fieldset>
                </div>

                <div class="col-md-3">
                    <b-form-fieldset horizontal label="月份" :label-cols="4" label-text-align="right">
                        <b-form-select
                            :plain="true"
                            :options="[1,2,3,4,5,6,7,8,9,10,11,12]"
                            v-model="crmFollowUpCondition.crmMonth"
                            >
                            <!-- :options="[1,2,3,4,5,6,7,8,9,10,11,12]" -->
                            <!-- @change="monthChange" -->
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="调研任务类型*" :label-cols="4" label-text-align="right" :class="{'input-box' : typeState}">
                        <b-form-select
                            :plain="true"
                            :options="taskTypes"
                            v-model="crmFollowUpCondition.taskTypeCode">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="调研人员" :label-cols="2" label-text-align="right">
                        <search v-model="crmFollowUpCondition.taskOperatorCode"
                        :dataList="filterCRMList"
                        :valueName="'text'"
                        :keyName="'value'"
                        @dataChange="getCRMListByName"
                        @clickShowBack="checkStore"></search>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="searchCRMFollowUpConditions">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div>
                <b-button v-if="exportTabBtn" size="sm" variant="info" type="button" @click="exportTab">导出</b-button>
            </div>
            <div class="col-md-12 text-center table-title">CRM跟进及转化表</div>
            <div class="table-scrollable">
                <table class="table table-striped table-hover table-bordered" id="hideTabe">
                    <template v-if="isCRMEmpty">
                        <tbody>
                            <tr >
                                <td colspan='27' class="text-left">暂无数据...</td>
                            </tr>
                        </tbody>
                    </template>
                    <template v-else>
                        <thead >
                            <tr class="text-center">
                                <th class="text-center">
                                    门店:{{storeName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CRM人员:{{crmName}}
                                </th>
                                <th class="text-center" v-for=" key in crmKeys" :key="key">
                                   {{param.crmYear}}年{{key}}月
                                </th>
                            </tr>
                            <tr class="text-center">
                                <th class="text-center">
                                    类型：{{typeStr}}
                                </th>
                                <th class="text-center" v-for=" key in crmKeys" :key="key">
                                    数量
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                             <tr class="text-center" v-for=" (item, index) in dataList" :key="index">
                                 <td class="text-center" v-for=" (v, i) in item" :key="i">
                                    {{v}}
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </b-card>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import pagination from "../../../components/pagination/pagination";
import areaqueryshop from "components/iris-areaqueryshop";
import { MessageBox, Message, DatePicker } from "element-ui";
import XLSX from "xlsx";
import search from "../../../components/search/search";
import apiUrl from 'common/api-url'
import {hasBtn} from 'common/com-api'
export default {
  mounted() {
    this.getTaskTypes();
    this.getCrmConditionTypes();
  },
  data: function() {
    var date = new Date();
    return {
      storeState: false,
      yearState: false,
      typeState: false,
      year: date,
      //   resultYear: "",
      operatorName: "",
      crmFollowUpCondition: {
        salesAreaCodeSet: [],
        storeCodeSet: [],
        crmMonth: 0,
        crmYear: date.getFullYear(),
        taskTypeCode: "", //crm调研类型
        taskOperatorCode: "", //专员code
        storeName: ""
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
      let day = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      )[date.getDay()];
      let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let currentTimeStr =
        year + "-" + month + "-" + d + "-" + hour + ":" + minute + ":" + second;
      XLSX.writeFile(worksheet, "CRM跟进表-" + currentTimeStr + ".xlsx");
    },
    clear: function() {
      let _this = this;
      _this.$data.crmFollowUpCondition = {
        salesAreaCodeSet: _this.$data.crmFollowUpCondition.salesAreaCodeSet,
        storeCodeSet: _this.$data.crmFollowUpCondition.storeCodeSet,
        storeName: _this.$data.crmFollowUpCondition.storeName,
        crmMonth: 0,
        crmYear: "",
        taskType: "",
        taskTypeCode: ""
      };
      _this.$data.year = "";
    },
    getCRMListByName: function(crmName) {
      this.getCRMListByNameAction(crmName);
    },
    selectStores: function(sales, stores) {
      let _this = this;
      if (sales instanceof Array) {
        _this.crmFollowUpCondition.salesAreaCodeSet = [];
        sales.forEach(item => {
          _this.crmFollowUpCondition.salesAreaCodeSet.push(item.code);
        });
      } else if (sales.code === 0) {
        _this.crmFollowUpCondition.salesAreaCodeSet = [];
      }
      if (stores instanceof Array) {
        _this.crmFollowUpCondition.storeCodeSet = [];
        stores.forEach(item => {
          _this.crmFollowUpCondition.storeCodeSet.push(item.value);
        });
      } else if (stores.value === 0) {
        _this.crmFollowUpCondition.storeCodeSet = [];
      } else if (stores.hasOwnProperty("value")) {
        _this.crmFollowUpCondition.storeCodeSet = [];
        _this.crmFollowUpCondition.storeCodeSet[0] = stores.value;
        _this.crmFollowUpCondition.storeName = stores.text;
        _this.getCRMCRMSpecialist({
          storeCode: _this.crmFollowUpCondition.storeCodeSet[0]
        });
      }
    },
    yearChange: function() {
      let _this = this;
      if (_this.year != undefined && _this.year != "") {
        let time = _this.year.getFullYear();
        _this.crmFollowUpCondition.crmYear = time;
      } else {
        _this.crmFollowUpCondition.crmYear = "";
      }
    },
    searchCRMFollowUpConditions: function() {
      if (this.checkStore() && this.checkYear() && this.checkType()) {
        let _this = this;
        if (_this.$data.crmFollowUpCondition.crmMonth > 0) {
          _this.queryCRMFollowUpCondition(_this.$data.crmFollowUpCondition);
        } else {
          let param = delete _this.$data.crmFollowUpCondition.crmMonth;
          _this.queryCRMFollowUpCondition(_this.$data.crmFollowUpCondition);
        }
      }
    },
    checkStore: function() {
      //   let result = false;
      //   let stores = this.$data.crmFollowUpCondition.storeCodeSet;
      //   if (stores.length > 0) {
      //     this.$data.storeState = false;
      //     result = true;
      //   } else {
      //     this.$data.storeState = true;
      //     result = false;
      //   }
      //   console.log("this.$data.storeState " + this.$data.storeState);
      //   console.log("checkStore result " + result);
      //   return result;
      if (this.$data.crmFollowUpCondition.storeCodeSet.length === 1) {
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
    checkType: function() {
      if (this.$data.crmFollowUpCondition.taskTypeCode !== "") {
        return true;
      } else {
        Message.closeAll();
        Message({
          type: "warning",
          message: "请选择任务类型"
        });
        return false;
      }
    },
    checkYear: function() {
      //   let result = false;
      //   let year = this.$data.crmFollowUpCondition.crmYear;
      //   if (year !== "") {
      //     this.$data.yearState = false;
      //     result = true;
      //   } else {
      //     this.$data.yearState = true;
      //     result = false;
      //   }
      // //   console.log("checkYear result " + result);
      //   return result;

      if (this.$data.crmFollowUpCondition.crmYear !== "") {
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
    ...mapActions("crmFollowUpCondition", [
      "queryCRMFollowUpCondition",
      "getTaskTypes",
      "getCRMListByNameAction",
      "getCRMCRMSpecialist",
      "exportCRMFollowUpCondition",
      "getCrmConditionTypes"
    ])
  },
  computed: {
    ...mapState("crmFollowUpCondition", [
      "crmFollowUpConditionList",
      "taskTypes",
      "taskOperators",
      "param"
    ]),
    ...mapGetters("crmFollowUpCondition", [
      "crmMap",
      // "allTypes",
      "crmKeys",
      "dataList",
      "isCRMEmpty",
      "typeStr",
      "storeName",
      "crmName",
      "filterCRMList"
    ]),
    exportTabBtn(){
      return hasBtn(apiUrl.exHibitionHallFlow.export)
    }
  },
  components: {
    areaqueryshop,
    pagination,
    DatePicker,
    search
  }
};
</script>
<style lang="scss" @scoped>
.table-title {
  font-size: 20px;
}
</style>
