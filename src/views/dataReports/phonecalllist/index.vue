<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="选择经销商店*" label-text-align="right" :label-cols="4" :class="{'input-box' : storeState}">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="日期*" :label-cols="4" label-text-align="right">
                        <date-picker
                            :picker-options="pickerOptions"
                            v-model="timeStep"
                            type="daterange"
                            @change="dateChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </date-picker>
                    </b-form-fieldset>
                </div>
            </div>
            <!-- 导出表格 -->
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button v-if="exportTabBtn" size="sm" variant="info" type="button" @click="exportTab">导出</b-button>
                    </div>
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import pagination from "../../../components/pagination/pagination";
import areaqueryshop from "components/iris-areaqueryshop";
import { MessageBox, Message, DatePicker } from "element-ui";
import config from "../../../common/config";
import search from "../../../components/search/search";
import apiUrl from 'common/api-url'
import {hasBtn} from 'common/com-api'
export default {
  data: function() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      config: config,
      timeStep: [],
      phonecall: {
        storeCode: "",
        enterBeginTime: "",
        enterEndTime: "",
      },
      storeState: false,
      yearState: false,
      year: "",
      fields: {
        scName: {
          label: "销售顾问"
        },
        leadCode: {
          label: "线索编码"
        },
        followUpCode: {
          label: "电话跟进编码"
        },
        telBeginTime: {
          label: "电话拨出时间"
        },
        telConnectBeginTime: {
          label: "电话接通时间"
        },
        telEndTime: {
          label: "电话结束时间"
        },
        telHoldTime: {
          label: "通话时间"
        },
        telNumber: {
          label: "通话手机号码"
        },
        telContent: {
          label: "电话跟进内容"
        },
        isConnected: {
          label: "是否接通"
        },
        telHomePlace: {
          label: "电话归属地"
        },
        remark: {
          label: "备注"
        },
      }
    };
  },
  methods: {
    // 导出表格
    exportTab() {
      if (this.checkStore() && this.checkYear()) {
        let _this = this;
        _this.exporPhoneCallList(_this.$data.phonecall);
      }
    },
    clear: function() {
      let _this = this;
      _this.$data.phonecall = {
        salesAreaCode: _this.$data.phonecall.salesAreaCode,
        storeCode: _this.$data.phonecall.storeCode,
        enterBeginTime: "",
        enterEndTime: ""
      };
      _this.$data.timeStep = [];
    },
    selectStores: function(sales, stores) {
      let _this = this;
      if (stores.hasOwnProperty("value")) {
        _this.phonecall.storeCode = stores.value;
      }
    },
    // 时间
    dateChange: function() {
      let _this = this;
      if (_this.$data.timeStep && _this.$data.timeStep.length > 0) {
        let timeOne = _this.timeStep[0];
        let timeTwo = _this.timeStep[1];
        let monthOne =
          timeOne.getMonth() + 1 < 10
            ? "0" + (timeOne.getMonth() + 1)
            : timeOne.getMonth() + 1;
        let monthTwo =
          timeTwo.getMonth() + 1 < 10
            ? "0" + (timeTwo.getMonth() + 1)
            : timeTwo.getMonth() + 1;
        let dayOne =
          timeOne.getDate() < 10 ? "0" + timeOne.getDate() : timeOne.getDate();
        let dayTwo =
          timeTwo.getDate() < 10 ? "0" + timeTwo.getDate() : timeTwo.getDate();
        _this.$data.phonecall.enterBeginTime =
          timeOne.getFullYear() + "-" + monthOne + "-" + dayOne;
        _this.$data.phonecall.enterEndTime =
          timeTwo.getFullYear() + "-" + monthTwo + "-" + dayTwo;
      } else {
        _this.$data.phonecall.enterBeginTime = "";
        _this.$data.phonecall.enterEndTime = "";
      }
    },
    pageChange: function(num) {
      let _this = this;
      _this.$data.phonecall.pageStart = num;
      _this.queryPhoneCallList(_this.$data.phonecall);
    },
    queryList: function() {
      if (this.checkStore() && this.checkYear()) {
        let _this = this;
        _this.queryPhoneCallList(_this.$data.phonecall);
      }
    },
    checkStore: function() {
      if (this.$data.phonecall.storeCode !== "") {
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
      if (
        this.$data.phonecall.enterBeginTime !== "" &&
        this.$data.phonecall.enterEndTime !== ""
      ) {
        return true;
      } else {
        Message.closeAll();
        Message({
          type: "warning",
          message: "请选择日期"
        });
        return false;
      }
    },
    ...mapActions("phonecalllist", ["queryPhoneCallList", "exporPhoneCallList"])
  },
  computed: {
    ...mapState("phonecalllist", ["list", "pager"]),
    exportTabBtn(){
      return hasBtn(apiUrl.scPhoneCallList.export)   //调用列表数据接口
    }
  },
  components: {
    areaqueryshop,
    pagination,
    DatePicker
  }
};
</script>
<style lang="scss" @scoped>
.table-title {
  font-size: 20px;
}
</style>
