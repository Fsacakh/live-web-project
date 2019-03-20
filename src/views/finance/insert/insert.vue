<template>
  <div class="animated fadeIn">
    <b-card header="主档信息">
      <b-form>
        <div class="row">
          <div class="col-md-6">
            <b-form-fieldset horizontal label="金融机构 *" :label-cols="4" class="text-right">
              <b-form-input :maxlength="18" v-model="financeMain.financeName" type="text" :readonly='!financeTop.cancel'></b-form-input>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="金融机构类型" :label-cols="4" class="text-right">
              <b-form-select v-model="financeMain.financeType" :options="options" class="mb-3" :disabled='!financeTop.cancel'></b-form-select>
            </b-form-fieldset>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <b-form-fieldset horizontal label="是否有租赁" :label-cols="4" class="text-right">
              <b-form-select v-model="financeMain.leaseValue" :options="lease" class="mb-3" :disabled='!financeTop.cancel'></b-form-select>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="是否有贴息" :label-cols="4" class="text-right">
              <b-form-select v-model="financeMain.interestValue" :options="interest" class="mb-3" :disabled='!financeTop.cancel'></b-form-select>
            </b-form-fieldset>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <b-form-fieldset horizontal label="是否有手续费" :label-cols="4" class="text-right">
              <b-form-select v-model="financeMain.proceduresValue" :options="proceduresList" class="mb-3" :disabled='!financeTop.cancel'></b-form-select>
            </b-form-fieldset>
          </div>
        </div>
        <div class="col-md-12 text-right">
          <div>
            <!-- <router-link to="/finance/mainFinance"> -->
            <b-button type="button" @click="callback" v-if="financeTop.cancel" variant="secondary">取消</b-button>
            <!-- </router-link> -->
            <b-button type="button" @click.stop="details()" :variant="financeTop.cancel ? 'primary':'warning'  ">{{financeTop.value}}</b-button>
          </div>
        </div>
      </b-form>
    </b-card>
    <b-card class="mb-4" header="附加字段信息" v-if="tabsdispaly">
      <b-tabs pills @input="tabActive(tabindex)" v-model="tabindex">
        <b-tab title="适用范围" active>
          <suitscope @shop-preserve="shoppreserve" @data-change="datachange" @remove-tr="removetr" :tab-data="tabledata" @sales-preserve="salesPreserve"></suitscope>
        </b-tab>
        <b-tab title="贴息方案" v-if="financeMain.interestValue=='1'">
          <attach ref="1" :tabs="0"></attach>
        </b-tab>
        <b-tab title="手续费方案" v-if="financeMain.proceduresValue== '1'">
          <attach ref="2" :tabs="1"></attach>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import Vue from "vue";
import { MessageBox, Message } from "element-ui";
import { mapState, mapGetters, mapActions } from "vuex";
import api from "../../../common/api.js";
import common from "../../../common/common.js";
import config from "../../../common/config";
// import attach from './attach'
import attach from "./attach";
import suitscope from "../../../components/iris-suitscope/";
Vue.component(MessageBox.name, MessageBox); //用use会在页面一加载的时候弹出一个框来
export default {
  data() {
    return {
      options: [], //金融机构类型
      // 是否有租赁
      lease: [
        {
          value: "1",
          text: "是"
        },
        {
          value: "0",
          text: "否"
        }
      ],
      // 是否有贴息
      interest: [
        {
          value: "1",
          text: "是"
        },
        {
          value: "0",
          text: "否"
        }
      ],
      // 是否有手续费
      proceduresList: [
        {
          value: "1",
          text: "是"
        },
        {
          value: "0",
          text: "否"
        }
      ],
      //用来控制上面是显示创建取消还是显示修改
      financeTop: {
        cancel: true,
        value: "确认"
      },
      financeMain: {
        financeName: "", //金融机构名称
        financeType: "a", //金融机构类型
        leaseValue: "0", //是否有租赁
        interestValue: "1", //是否有贴息
        proceduresValue: "1" //是否有手续费
      },
      tabsdispaly: false, //下面的tabs的显示与隐藏
      isAddLin: true, //是否加一行
      tabindex: 0, //tab的index
      tabindexArr: [0],
      financeId: "",
      tabledata: [],
      revise: null
    };
  },
  methods: {
    details() {
      if (this.financeTop.cancel) {
        //点击创建验证是否有未填写的选项
        //逻辑运算符如果有一个项为空的话返回的就是哪个为空flag就是空的 如果全部都不为空的话flag就是最后一项的值
        let flag = this.financeMain.financeName && this.financeMain.financeType;
        if (!flag) {
          //有未填写的项
          common.alertInfo("error");
        } else {
          // 所有项都已经填写
          this.first = true;
          this.createdFinance(); //发送ajax创建金融机构
        }
      } else {
        //这里是点击修改触发的代码
        this.tabsdispaly = false; //让下面的tabs隐藏掉
        this.financeTop.cancel = true; //把取消按钮加上
        this.financeTop.value = "确认"; //让按钮变成创建
      }
    },
    callback() {
      if (this.revise) {
        //修改
        this.tabsdispaly = true; //让下面的tabs显示出来
        this.financeTop.value = "修改"; //让按钮变成修改
        this.financeTop.cancel = false; //把取消按钮去掉
      } else {
        if (!this.first) {
          this.$router.push({
            path: "/finance/mainFinance"
          });
        } else {
          //修改
          this.tabsdispaly = true; //让下面的tabs显示出来
          this.financeTop.value = "修改"; //让按钮变成修改
          this.financeTop.cancel = false; //把取消按钮去掉
        }
      }
    },
    getFinanceType() {
      //获取金融机构类型
      api.menu.getReferenceInfo(
        {
          refCode: config.addFinanceCode.refCode
        },
        msg => {
          let list = msg.data.obj.referenceDetailInfos;
          for (var i = 0; i < list.length; i++) {
            this.$set(this.options, i, {
              value: list[i].refDetailCode,
              text: list[i].refDetailName
            });
          }
        }
      );
    },
    tabActive(val) {
      this.tabindexArr.push(val);
      if (this.tabindexArr[this.tabindexArr.length - 2] == 0) {
        // 不管有几个tab栏第一个始终是适用范围 ，进入这里说明可以判断适用范围有没有保存
        for (var i in this.tabsscope) {
          if (this.tabsscope[i] == false) {
            //说明有一个适用范围没有保存
            this.attachFun();
          }
        }
      }
      if (
        this.financeMain.interestValue == "1" &&
        this.financeMain.proceduresValue == "1"
      ) {
        if (this.tabindexArr[this.tabindexArr.length - 2] == 1) {
          // 说明下标一的为贴息方案
          if (!this.interestFlag) {
            this.attachFun();
          }
        } else if (this.tabindexArr[this.tabindexArr.length - 2] == 2) {
          if (!this.poundage) {
            this.attachFun();
          }
        }
      } else {
        if (this.tabindexArr[this.tabindexArr.length - 2] == 1) {
          if (this.financeMain.interestValue == "1") {
            //贴息
            if (!this.interestFlag) {
              this.attachFun();
            }
          } else if (this.financeMain.proceduresValue == "1") {
            //手续费
            if (!this.poundage) {
              this.attachFun();
            }
          }
        }
      }
    },
    //发送ajax创建金融机构
    createdFinance() {
      api.finance.insertOrUpdata(
        {
          financeOrgCode: this.financeCode,
          financeOrgName: this.financeMain.financeName,
          financeOrgType: this.financeMain.financeType,
          leaseFlag: this.financeMain.leaseValue,
          interestSubsidyFlag: this.financeMain.interestValue,
          serviceChargeFlag: this.financeMain.proceduresValue,
          id: this.financeId
        },
        msg => {
          if (msg.data.message === "success") {
            common.alertInfo("success");
            this.querytableinfo(); //查询适用范围列表页
            this.financeId = msg.data.obj.id;
            this.tabsdispaly = true; //让下面的tabs显示出来
            this.financeTop.value = "修改"; //让按钮变成修改
            this.financeTop.cancel = false; //把取消按钮去掉
          }
        }
      );
    },
    attachFun(type) {
      MessageBox.confirm("是否保存该方案", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "info"
      })
        .then(() => {
          // 点击是的话在这里帮他保存
          this.tabindex = this.tabindexArr[this.tabindexArr.length - 2];
        })
        .catch(() => {});
    },
    getQueryList() {
      api.finance
        .detail({
          financeOrgCode: this.updataFinanceId.split("&")[1]
        })
        .then(res => {
          if (res.data.message == "success") {
            this.financeMain.financeName = res.data.obj.financeOrgName;
            this.financeMain.financeType = res.data.obj.financeOrgType;
            this.financeMain.leaseValue = res.data.obj.leaseFlag;
            this.financeMain.interestValue = res.data.obj.interestSubsidyFlag;
            this.financeMain.proceduresValue = res.data.obj.serviceChargeFlag;
          }
        });
    },
    //经销商店点击保存的事件触发
    shoppreserve(data) {
      if (data) {
        let arr = [];
        //整理数据
        for (var i = 0; i < data.length; i++) {
          arr[i] = {
            financeOrgCode: this.financeCode,
            rangeCode: data[i].rangeCode,
            rangeType: data[i].rangeType,
            remark: data[i].remark,
            storeCode: data[i].storeCode
          };
          if (i == data.length - 1) {
            //发送后端
            api.finance.batchInsertOrUpdata(arr, msg => {
              if (msg.data.message == "success") {
                let data = msg.data.obj;
                common.alertInfo("success");
                //保存成功需要再去查询适用范围数据
                this.querytableinfo();
                this.$store.dispatch("finance/setTabsAcative", [
                  "shopstatus",
                  true
                ]);
              } else {
                common.alertInfo("warning");
              }
            });
          }
        }
      }
    },
    //删除的时候触发的回调
    removetr(val) {
      for (var i = 0; i < val.length; i++) {
        val[i].isDeleted = "1"; //加上删除参数
        if (i == val.length - 1) {
          // 发送ajax
          api.finance.batchInsertOrUpdata(val, msg => {
            if (msg.data.message == "success") {
              common.alertInfo("success");
              console.log(1);
              this.querytableinfo();
            } else {
              common.alertInfo("warning");
            }
          });
        }
      }
    },
    //销售区域点击保存的时候触发的函数
    salesPreserve(data) {
      if (data) {
        let arr = [];
        for (var i = 0; i < data.length; i++) {
          arr[i] = {
            financeOrgCode: this.financeCode,
            rangeCode: data[i].rangeCode,
            rangeType: data[i].rangeType,
            remark: data[i].remark,
            salesAreaCode: data[i].salesAreaCode
          };
          if (i == data.length - 1) {
            api.finance.batchInsertOrUpdata(arr, msg => {
              if (msg.data.message == "success") {
                let data = msg.data.obj;
                common.alertInfo("success");
                this.querytableinfo();
                this.$store.dispatch("finance/setTabsAcative", [
                  "salestatus",
                  true
                ]);
              } else {
                common.alertInfo("warning");
              }
            });
          }
        }
      }
    },
    //查询列表页的ajax
    querytableinfo() {
      api.finance.getQueryScope(
        {
          financeOrgCode: this.financeCode
        },
        msg => {
          this.tabledata = [];
          if (msg.data.message == "success") {
            let data = msg.data.obj || [];
            for (var i = 0; i < data.length; i++) {
              this.$set(this.tabledata, i, {
                nationwide: "", //暂时不用传
                sales: data[i].salesAreaName, //销售区域
                shop: data[i].storeName || "全部", //经销商店
                id: data[i].id, //唯一标识符
                salesAreaCode: data[i].salesAreaCode, //销售区域编码
                storeCode: data[i].storeCode, //经销商店编码
                storeName: data[i].storeName, //经销商店编码
                financeOrgCode: data[i].financeOrgCode, //删除的时候需要金融机构编码
                rangeCode: data[i].rangeCode //删除的时候需要适用范围类型
              });
            }
          }
        }
      );
    },
    //当数据发生变化的时候触发的事件
    datachange(data) {
      if (data == "sales") {
        this.$store.dispatch("finance/setTabsAcative", ["salestatus", false]);
      } else if (data == "shop") {
        this.$store.dispatch("finance/setTabsAcative", ["shopstatus", false]);
      }
    }
  },
  computed: {
    // mapState是vuex的辅助函数 https://vuex.vuejs.org/zh-cn/state.html#the-mapstate-helper
    // 创建组件的计算属性返回 Vuex store 中的状态
    ...mapState("finance", [
      "addFinance", //获取金融机构的编码
      "financeCode", //新增金融机构的编码
      "tabsscope", //适用范围三个保存否
      "salesData", //销售区域数据
      "shopData", //门店数据
      "intersubsidyData", //贴息方案
      "interestFlag", //贴息方案保存否
      "poundage", //手续费保存否
      "updataFinanceId" //修改金融机构id
    ])
  },
  components: {
    attach,
    suitscope
  },
  mounted() {
    //每次加载这个组件的时候需要初始化一遍vuex的数据
    this.$store.dispatch("finance/getFinanceCode", " ");
    this.$store.dispatch("finance/preserveShop", {
      tabType: "home",
      istabType: false
    });
    this.$store.dispatch("finance/setShopData", []);
    this.$store.dispatch("finance/setSalesData", []);
    this.$store.dispatch("finance/setGovernmentData", []);
    this.$store.dispatch("finance/setTabsAcative");
    this.$store.dispatch("finance/setInterest", true);
    this.$store.dispatch("finance/setPoundage", true);
    this.$store.dispatch("finance/setIntersubsidyData", false);
    let data = this.$route.params.id || "";
    this.$store.dispatch("finance/setFinanceId", data); //组件一加载就获取路由传送过来的id并且存入vuex
    this.getFinanceType(); //获取金融机构类型
    if (this.$route.params.id) {
      this.revise = true;
      let arr = this.updataFinanceId.split("&");
      //说明有id就是修改需要调接口查数据
      this.getQueryList();
      this.$store.dispatch("finance/getFinanceCode", arr[1]); //设置金融机构编码
      this.querytableinfo(); //查询适用范围列表页
      this.financeId = arr[0]; //记录id
      this.tabsdispaly = true; //让下面的tabs显示出来
      this.financeTop.value = "修改"; //让按钮变成修改
      this.financeTop.cancel = false; //把取消按钮去掉
    } else {
      //无id说明是新增页面就要生成金融机构编码
      //获取新增金融机构编码
      this.$store.dispatch("finance/getFinanceCode");
    }
  }
};
</script>
<style>

</style>
