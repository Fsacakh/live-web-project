<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12">
          <b-button size="sm" variant="success" @click="insert" v-b-modal.insert3>新增</b-button>
          <b-button size="sm" variant="info" @click="update" v-b-modal.updata3>编辑</b-button>
          <b-button size="sm" variant="primary" class="pull-right" @click="querylist">查询</b-button>
        </div>
      </div>
      <div class="table-scrollable mb-2">
        <table class="table table-striped table-bordered">
          <thead>
            <tr class="text-center">
              <th class="text-center"></th>
              <th class="text-center">序号</th>
              <th class="text-center">银行账号</th>
              <th class="text-center">开户行名称（全称）</th>
              <th class="text-center">操作</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(item,index) in datalist" class="text-center">
              <td class="text-center"><input type="radio" name="radio" value="" @click="checked(item)" /></td>
              <td class="text-center">{{index+1 + (datalistobj.pageNum - 1)* datalistobj.pageSize}}</td>
              <td class="text-center">{{item.bankAccount}}</td>
              <td class="text-center">{{item.bankName}}</td>
              <td class="text-center">
                <button @click="removeTree(item)" type="button" class="btn btn-danger btn-sm">删除</button>
              </td>
            </tr>
            <tr v-if="datalist.length==0">
              <td colspan='13' class="text-left">暂无数据...</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col-md-12">
          <pagination class="pull-right" @page-change="pageChange" :page-no="datalistobj.pageNum" :page-size="datalistobj.pageSize" :total-pages="datalistobj.pages" :total-result="datalistobj.total">
          </pagination>
        </div>
      </div>
      <!-- insert-modal -->
      <insert-modal></insert-modal>
      <!-- update-modal -->
      <update-modal></update-modal>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  import Pagination from "components/pagination/pagination";
  import InsertModal from "./insertModal";
  import UpdateModal from "./updateModal";
  import api from "common/api";
  import common from "common/common";
  import config from "common/config";
  import {
    MessageBox,
    Message
  } from "element-ui";
  import {
    mapState,
    mapGetters,
    mapActions
  } from "vuex";
  Vue.component(MessageBox.name, MessageBox); //用use会在页面一加载的时候弹出一个框来
  export default {
    components: {
      Pagination,
      InsertModal,
      UpdateModal
    },
    data() {
      return {
        datalist: [],
        datalistobj: {},
        pageStart: 1,
        pageNums: config.pageNums,
        customCode: "",
      };
    },
    methods: {
      insert() {},
      update() {},
      pageChange(page) {
        this.pageStart = page;
        this.querylist();
      },
      querylist() {
        this.datalist = []
        this.datalistobj = {}
        api.clientadmin.clientfinance.queryclientfinance({
          customCode: this.customCode,
          pageStart: this.pageStart,
          pageNums: this.pageNums,
        }, (msg) => {
          if (msg.data.code == 'success') {
            this.datalist = msg.data.obj.list
            this.datalistobj = msg.data.obj
            this.$store.dispatch("clientmaininfo/queryclientmaininfo", false)
            this.$store.dispatch("clientmaininfo/amendclientmaininfo", false);
          }
        })
      },
      removeTree(item) {
        MessageBox.confirm("是否删除该数据", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "info"
          })
          .then(() => {
            api.clientadmin.clientfinance.updataclientfinance({
              id: item.id,
              customCode: item.customCode,
              financeCode: item.financeCode,
              isDeleted: "1"
            }, (msg) => {
              if (msg.data.message == "success") {
                this.querylist()
                common.alertInfo("success");
              } else {
                common.alertInfo("warning");
              }
            })
          })
          .catch(() => {});
      },
      checked(item) {
        this.$store.dispatch("clientmaininfo/amendclientmaininfo", item.financeCode);
      },
      init() {
        api.product.commodityBrand.initCommodityBrand(msg => {
          if (msg.data.message == "success") {
            common.alertInfo("success");
            this.querylist()
          } else {
            common.alertInfo("warning");
          }
        });
      }
    },
    mounted() {
      //获取客户编码
      this.customCode = this.$route.params.code
      this.querylist()
    },
    computed: {
      ...mapState('clientmaininfo', [
        'querydata',
      ]),
    },
    watch: {
      querydata: function() {
        if (this.querydata) {
          this.datalist = []
          this.datalistobj = {}
          api.clientadmin.clientfinance.queryclientfinance({
            financeCode: this.querydata,
            pageStart: 1,
            pageNums: this.pageNums,
          }, (msg) => {
            if (msg.data.code == 'success') {
              this.datalist = msg.data.obj.list
              this.datalistobj = msg.data.obj
              this.$store.dispatch("clientmaininfo/amendclientmaininfo", false);
            }
          })
        }
      }
    }
  };
</script>
