<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12">
                <b-card header="查询">
                    <div class="row">
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="商品品牌名称" :label-cols="4" class="text-right">
                                <b-form-input v-model="queryParams.brandName" />
                            </b-form-fieldset>
                        </div>
                    </div>
                    <search-btn @reset="reset" @query="query"></search-btn>
                </b-card>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <b-card>
                    <div class="row">
                        <div class="col-md-12">
                            <b-button v-if="addBtn" size="sm" variant="success" v-b-modal.insert>新增</b-button>
                            <b-button v-if="editBtn" size="sm" variant="primary" v-b-modal.update>编辑</b-button>
                            <b-button v-if="syncBtn" size="sm" variant="warning" class="pull-right" @click="init">同步数据</b-button>
                        </div>
                    </div>
                    <div class="table-scrollable mb-2">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th class="text-center"></th>
                                    <th class="text-center">序号</th>
                                    <th class="text-center">商品品牌编码</th>
                                    <th class="text-center">商品品牌名称</th>
                                    <th class="text-center">操作</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="(item,index) in datalist" class="text-center">
                                    <th class="text-center"><input :value="index" v-model="selectRow" type="radio" name="radio" @click="checked(item)"/></th>
                                    <th class="text-center">{{index+1 + (datalistobj.pageNum - 1)* datalistobj.pageSize }}</th>
                                    <th class="text-center">{{item.brandCode}}</th>
                                    <th class="text-center">{{item.brandName}}</th>
                                    <th class="text-center">
                                        <button v-if="editBtn" @click="removeTree(item)" type="button" class="btn btn-danger btn-sm">删除</button>
                                    </th>
                                </tr>
                                <tr v-if="datalist.length==0">
                                    <td colspan='13' class="text-left">暂无数据...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <!-- :page-no="obj.pageNum" :page-size="obj.pageSize" :total-pages="obj.pages" :total-result="obj.total" -->
                            <pagination class="pull-right" @page-change="pageChange" :page-no="datalistobj.pageNum" :page-size="datalistobj.pageSize" :total-pages="datalistobj.pages" :total-result="datalistobj.total">
                            </pagination>
                        </div>
                    </div>
                    <insert-modal @reQuery="query" ></insert-modal>
                    <update-modal @reQuery="query" :updateBrand="updateBrand"></update-modal>
                </b-card>
            </div>
        </div>
    </div>
</template>
<script>
import SearchBtn from "components/searchBtn/searchBtn";
import Vue from "vue";
import Pagination from "components/pagination/pagination";
import InsertModal from "./insertModal";
import UpdateModal from "./updateModal";
import api from "../../../common/api";
import apiUrls from "common/api-url";
import { hasBtn } from "common/com-api";
import common from "../../../common/common";
import config from "common/config";
import { MessageBox, Message } from "element-ui";
import { mapState, mapGetters, mapActions } from "vuex";
Vue.component(MessageBox.name, MessageBox); //用use会在页面一加载的时候弹出一个框来
export default {
  components: {
    SearchBtn,
    Pagination,
    InsertModal,
    UpdateModal
  },
  data() {
    return {
      selectRow: -1,
      updateBrand:{},
      datalist: [],
      datalistobj: {},
      pageStart: 1,
      pageNums: config.pageNums,
      queryParams: {
        brandCode: "",
        brandName: ""
      }
    };
  },
  methods: {
    pageChange(page) {
      this.pageStart = page;
      this.querylist(this.queryParams.brandName);
    },
    querylist(brandName) {
      var obj = {
        brandName: brandName,
        pageStart: this.pageStart,
        pageNums: this.pageNums
      };
      api.product.commodityBrand.queryCommodityBrand(obj, msg => {
        if (msg.data.message == "success") {
          this.datalistobj = msg.data.obj;
          this.datalist = msg.data.obj.list;
          this.updateBrand = {};
          this.selectRow = -1;
        }
      });
    },
    removeTree(item) {
      MessageBox.confirm("是否删除该数据", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "info"
      })
        .then(() => {
          // 点击是的话在这里帮他保存
          api.product.commodityBrand.updataCommodityBrand(
            [
              {
                id: item.id,
                brandCode: item.brandCode,
                brandName: item.brandName,
                isDeleted: "1"
              }
            ],
            msg => {
              if (msg.data.message == "success") {
                common.alertInfo("success");
                this.querylist(this.queryParams.brandName);
              } else {
                common.alertInfo("warning");
              }
            }
          );
        })
        .catch(() => {});
    },
    checked(item) {
      this.updateBrand = item;
    },
    init() {
      api.product.commodityBrand.initCommodityBrand(msg => {
        if (msg.data.message == "success") {
          common.alertInfo("success");
        } else {
          common.alertInfo("warning");
        }
      });
    },
    query() {
      this.pageStart = 1;
      this.querylist(this.queryParams.brandName);
    },
    reset() {
      this.queryParams.brandName = "";
    }
  },
  computed: {
    addBtn() {
      return hasBtn(apiUrls.product.commodityBrand.updataCommodityBrand);
    },
    editBtn() {
      return hasBtn(apiUrls.product.commodityBrand.updataCommodityBrand);
    },
    syncBtn() {
      return hasBtn(apiUrls.product.commodityBrand.initCommodityBrand);
    }
  }
};
</script>
<style>
</style>
