<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="政策代码" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="params.externalCode" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="政策名称" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="params.policyName" />
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="政策类型" label-text-align="right" :label-cols="4">
                        <b-form-select v-model="params.policyAscriptionCode" :options="typeList" class=""></b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset label="选择经销商店" :label-cols="4" horizontal class="text-right">
                        <areaqueryshop ref="area" :readonly="false" @select-change="selectedfun"></areaqueryshop>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="活动时段" :label-cols="4" class="text-right">
                        <el-date-picker v-model="timeStep"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        @change="datechange()"
                                        :clearable="true"
                                        range-separator="至">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="政策状态" label-text-align="right" :label-cols="4">
                        <b-form-select v-model="params.policyStatus" :options="stateList" class=""></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="reset()">重置</b-button>
                        <b-button size="sm" @click="query()" variant="primary">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-4">
            <div class="row mb-2">
                <div class="col-md-12">
                    <div class="pull-left">
                        <upload :formatList="['xlsx']" :validate="validate" :buttonName="buttonName" :addParams="addParams" :analysisExcel="analysisExcel" :url="url" :showBack="showBack"></upload>
                        <!-- <a :href="data.item.filePath">下载</a> -->
                        <b-button @click="downloadExcel" size="sm">预设模板导出</b-button>
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr class="text-center">
                            <th class="text-center">政策代码</th>
                            <th class="text-center">政策名称</th>
                            <th class="text-center">政策类型</th>
                            <th class="text-center">启用时间</th>
                            <th class="text-center">停用时间</th>
                            <th class="text-center">品牌</th>
                            <th class="text-center">车系</th>
                            <th class="text-center">车型</th>
                            <th class="text-center">车款</th>
                            <th class="text-center">SI金额</th>
                            <th class="text-center">SI成本</th>
                            <th class="text-center">外部编码</th>
                            <th class="text-center">政策条件</th>
                            <th class="text-center">政策描述</th>
                            <th class="text-center">停用/启用</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="(item, index) in list" class="text-center" :key="index">
                            <td class="text-center">{{item.externalCode}}</td>
                            <td class="text-center">{{item.policyName}}</td>
                            <td class="text-center">{{item.policyAscriptionName}}</td>
                            <td class="text-center">{{item.policyStartTime && item.policyStartTime.slice(0, 10)}}</td>
                            <td class="text-center">{{item.policyEndTime && item.policyEndTime.slice(0, 10)}}</td>
                            <td class="text-center">{{item.carBrandName}}</td>
                            <td class="text-center">{{item.carSeriesName}}</td>
                            <td class="text-center">{{item.carModelName}}</td>
                            <td class="text-center">{{item.carDisplayName}}</td>
                            <td class="text-center">{{item.importTotalMoney && item.importTotalMoney.toFixed(2)}}</td>
                            <td class="text-center">{{item.importTotalCost && item.importTotalCost.toFixed(2)}}</td>
                            <td class="text-center">{{item.externalCode}}</td>
                            <td class="text-center">{{item.policyCheckCondition}}</td>
                            <td class="text-center">{{item.policyContent}}</td>
                            <td class="text-center">
                                <b-button size="sm" @click="operate(item)" :variant="item.policyStatus ==0 ? 'success': 'danger'">{{item.policyStatus ==0 ? '启用': '停用'}}</b-button>
                            </td>
                        </tr>
                        <tr v-if="list.length==0">
                            <td colspan='15' class="text-left">暂无数据...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row mt-2">
                <div class="col-md-12">
                    <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total" :total-pages="pager.pages">
                    </pagination>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import Vue from "vue";
import config from "../../common/config";
import VueDate from "vue-date";
import pagination from "../../components/pagination/pagination";
import treepicker from "../../components/treepicker/treepicker";
import upload from "components/iris-upload";
import common from "../../common/common";
// 按需引入element组件
import { BUSINESS_INCENTIVE_POLICY_MANAGEMENT } from 'common/ref-code'
import { MessageBox, Message, DatePicker } from "element-ui";
import areaqueryshop from "components/iris-areaqueryshop/";
import api from "common/api";
import { mapState, mapGetters, mapActions } from "vuex";
Vue.use(DatePicker);
export default {
  data() {
    return {
      //导出表格链接
      excelLink: '',
      stateList: [
        {
          text: "停用",
          value: 0
        },
        {
          text: "启用",
          value: 1
        }
      ],
      typeList: [], //政策类型
      timeStep: "",
      startTime: "",
      endTime: "",
      buttonName: "导入",
      addParams: {
        singleFlag: "0",
        businessType: "",
        relationCode: "1"
      },
      url: "/v1/fileSys/file/parseSalesPolicyExcelInfo",
      showBack: {
        storeCode: ""
      },
      pager: {},
      list: [],
      params: {
        pageStart: "0",
        pageNums: "10",
        externalCode: "",
        policyName: "",
        policyAscriptionCode: "",
        storeCode: "",
        policyStartTime: "",
        policyEndTime: "",
        policyStatus: ""
      }
    };
  },
  computed: {},
  created() {
    api.ref
      .getDataDictionary({
        refCode: config.businessaffairs.businessaffairstype
      })
      .then(msg => {
        if (msg.data.message == "success") {
          let data = msg.data.obj.referenceDetailInfos || [];
          for (let index = 0; index < data.length; index++) {
            this.$set(this.typeList, index, {
              text: data[index].refDetailName,
              value: data[index].refDetailCode
            });
          }
        }
      });
    api.getUserAvailableInfo(msg => {
      if (msg.data.message === "success" && msg.data.obj.availableType == 0) {
        this.showBack.storeCode = msg.data.obj.storeInfoVo.storeCode || "";
      }
    });
    this.queryExHallList();
  },
  methods: {
    //查询表格
    queryExHallList(){
        api.dataReport.selectByRelationCode({
            relationCode: BUSINESS_INCENTIVE_POLICY_MANAGEMENT,
        }, (res) => {
          this.excelLink = res.data.obj.list[0].filePath;
        })
    },
    downloadExcel(){
      window.location.href = this.excelLink;
    },
    validate() {
      if (this.showBack.storeCode) {
        return true;
      } else {
        return false;
      }
    },
    datechange() {
      this.datechangefilter();
      this.params.policyStartTime = this.startTime;
      this.params.policyEndTime = this.endTime;
    },
    // 日期时间过滤
    datechangefilter() {
      const _this = this;
      if (_this.timeStep.length !== 0) {
        let timeOne = _this.timeStep[0];
        let timeTwo = _this.timeStep[1];
        _this.startTime =
          timeOne.getFullYear() +
          "-" +
          (timeOne.getMonth() + 1) +
          "-" +
          timeOne.getDate();
        _this.endTime =
          timeTwo.getFullYear() +
          "-" +
          (timeTwo.getMonth() + 1) +
          "-" +
          timeTwo.getDate();
      }
      if(_this.timeStep.length == 0) {
        _this.startTime = '';
        _this.endTime = '';
      }
    },
    analysisExcel(res) {},
    // 查询政策信息
    query() {
      api.policyInfo.querypolicyInfo(this.params, msg => {
        if (msg.data.message == "success") {
          this.pager = msg.data.obj;
          this.list = msg.data.obj.list;
        }
      });
    },
    pageChange(num) {
      this.params.pageStart = num;
      this.query();
    },
    selectedfun(data1, data2) {
      if (data2) {
        this.params.storeCode = data2.value;
        this.showBack.storeCode = data2.value;
      }
    },
    // 重置清空选项
    reset() {
      this.params.pageStart = '0';
      this.params.pageNums = '10';
      this.params.externalCode = '';
      this.params.policyName = '';
      this.params.policyAscriptionCode = '';
      this.params.policyEndTime = '';
      this.params.policyStartTime = '';
      this.params.policyStatus = '';
      this.timeStep = [];
    },
    operate(item) {
      let Status;
      if (item.policyStatus == 0) {
        Status = 1;
      } else if (item.policyStatus == 1) {
        Status = 0;
      }
      api.policyInfo.revisepolicyInfo(
        {
          ID: item.id,
          policyStatus: Status,
          policyCode: item.policyCode
        },
        msg => {
          if (msg.data.message == "success") {
            item.policyStatus = item.policyStatus == 0 ? 1 : 0;
            common.alertInfo("success");
          } else {
            common.alertInfo("warning");
          }
        }
      );
    }
  },
  watch: {},
  components: {
    VueDate,
    pagination,
    treepicker,
    areaqueryshop,
    upload
  }
};
</script>
<style>
.el-input .el-input__inner {
  border-radius: 0 !important;
}
.el-input.is-disabled .el-input__inner {
  background-color: #c2cfd6 !important;
  border-radius: 0 !important;
}
.el-input__icon {
  color: #536c79 !important;
}
.el-input {
  width: 100% !important;
}
</style>

