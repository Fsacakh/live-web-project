<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12">
                <b-card :header="title">
                    <div class="row">
                        <div class="col-md-6">
                          <b-form-fieldset horizontal label="仓库归属门店" :label-cols="4" class="text-right">
                            <area-shop @select-change="selectChange" ref="area" :storeAll='true' :readonly="isWatch"></area-shop>
                          </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="仓库编码" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.warehouseCode" readonly/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="仓库名称*" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.warehouseName" :state="warehouseNameState" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="仓库缩写" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.warehouseAddrName" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="仓库地址" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.warehouseAddress" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="成本计算类型*" :label-cols="4" class="text-right">
                                <b-form-select v-model="params.calCostType" :options="calCostTypeOptions" :value="calCostType" ref="calCost" :disabled="isWatch">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="仓库类型*" :label-cols="4" class="text-right">
                                <b-form-select v-model="params.warehouseType" @change.native="warehouseSelect" :options="whTypeOptions" :disabled="isUpdate" :state="warehouseTypeState">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <area-tree @getOrgCode="getOrgCode" @getChinaCode="getChinaCode" @getSaleCode="getSaleCode" @getDistrCode="getDistrCode" @getStoreCode="getStoreCode" @getOpenDate="getOpenDate">
                    </area-tree>
                    <div class="row">
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="开始营业时间" :label-cols="4" class="text-right">
                                <el-time-select
                                  placeholder="起始时间"
                                  v-model="startTime"
                                  :picker-options="{
                                    start: '06:00',
                                    step: '00:15',
                                    end: '23:00'
                                  }"
                                  :disabled="isWatch">
                                </el-time-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="结束营业时间" :label-cols="4" class="text-right">
                                <el-time-select
                                  placeholder="结束时间"
                                  v-model="endTime"
                                  :picker-options="{
                                    start: '06:00',
                                    step: '00:15',
                                    end: '23:00',
                                    minTime: startTime
                                  }"
                                  :disabled="isWatch">
                                </el-time-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="联系人" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.contactPerson" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="联系电话" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.contactPhone" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="联系手机" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.contactMobile" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="传真号码" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.faxNumber" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="电子邮箱" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.email" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="仓库经度" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.warehouseLocalx" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="仓库纬度" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.warehouseLocaly" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="前缀" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.prefixValue" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="仓库标记" :label-cols="4" class="text-right">
                                <b-form-select v-model="params.warehouseTagCode" :options="warehouseTagOptions" :disabled="params.id ? true : false">
                                </b-form-select>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6">
                            <b-form-fieldset horizontal label="备注" :label-cols="4" class="text-right">
                                <b-form-input v-model="params.remark" :readonly="isWatch"/>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <b-tabs pills v-if="params.warehouseType === 'ShareWarehouse'">
                        <b-tab title="可售范围" active>
                            <div class="animated fadeIn">
                              <suit-scope @shop-preserve="shopPreserve" @remove-tr="removetr" :suitBtnControl="!isWatch" :tab-data="useRanges" :onlyStore="true">
                              </suit-scope>
                            </div>
                        </b-tab>
                    </b-tabs>
                    <div v-if="!isWatch" class="mt-2">
                      <search-btn @reset="cancel" @query="handOk" resetText="取消" queryText="确定"></search-btn>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import SearchBtn from "components/searchBtn/searchBtn";
import config from "common/config";
import api from "common/api";
import common from "common/common";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Message, MessageBox, TimeSelect } from "element-ui";
Vue.use(TimeSelect);
import AreaTree from "./areaTree";
import AreaShop from 'components/iris-areaqueryshop'
import SuitScope from 'components/iris-suitscope'
import { getType, formatDate } from 'common/com-api'
const COST_CALCULATION_TYPE = config.calCostType || 'CostCalculationType'

export default {
  created() {
    if (this.$route.params.id === "insert") {
      this.params.warehouseCode = this.getSequence;
    }
    getType(config.supplyChain.warehouse.whType, (items) => {
      items.forEach((item) => {
        let data = {
          text: item.refDetailName,
          value: item.refDetailCode
        }
        this.whTypeOptions.push(data)
      })
    })
    getType(COST_CALCULATION_TYPE, (items) => {
      items.forEach((item) => {
        let data = {
          text: item.refDetailName,
          value: item.refDetailCode
        }
        this.calCostTypeOptions.push(data);
        this.calCostTypeOptionsCache.push(data);
      })
    })
    getType(config.supplyChain.warehouse.warehouseTag, items => {
      this.warehouseTagOptions = items.map(item => ({
        text: item.refDetailName,
        value: item.refDetailCode
      }))
    }) 
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.params.id === "insert") {
        this.params.warehouseCode = this.getSequence;
      } else {
        this.params = JSON.parse(JSON.stringify(this.getWhDetail));
        let start = this.params.businessStartTime;
        let end = this.params.businessEndTime;
        if (start) {
          this.startTime = start.substring(0, 5);
        }
        if (end) {
          this.endTime = end.substring(0, 5);
        }
        this.getUseRanges(this.$route.params.id)
      }
      if (!this.params.warehouseCode) {
        this.$router.push({
          path: "/warehouse/query"
        });
      }
    });
  },
  data() {
    return {
      warehouseNameState: null,
      warehouseTypeState: null,
      params: {
        openHours: "",
        calCostType: 'average',
        warehouseType: '',
        warehouseTagCode: ''
      },
      calCostType:'',
      calCostTypeOptions: [
      ],
      calCostTypeOptionsCache:[],
      whTypeOptions: [],
      useRanges: [],
      startTime: "",
      endTime: "",
      queryParams: {
        pageNums: config.pageNums,
        pageStart: 1
      },
      warehouseTagOptions: []
    };
  },
  computed: {
    title() {
      return this.$route.params.id === "insert" ? "仓库信息" : "仓库信息";
    },
    isUpdate() {
       return this.$route.params.id != "insert"
    },
    ...mapGetters("classification", [
      "getSequence",
      "getWhDetail",
      'isWatch'
    ])
  },
  methods: {
    //选择仓库类型
    warehouseSelect(){
      setTimeout(() => {
        let optionsCache = [];
        //如果选择了寄存仓
        if(this.params.warehouseType == 'DepositWarehouse'){
          this.params.calCostType = 'byCount';
          for(let i = 0; i < this.calCostTypeOptions.length; i++){
            if(this.calCostTypeOptions[i].value === 'byCount'){
              optionsCache.push(this.calCostTypeOptions[i]);
            }
          }
          this.calCostTypeOptions = optionsCache;
        } else {
          this.calCostTypeOptions = this.calCostTypeOptionsCache;
        }
      }, 0);
    },
    getOrgCode(data) {
      this.params.orgCode = data.code;
    },
    getChinaCode(data) {
      this.params.chinaCityCode = data.code;
    },
    getSaleCode(data) {
      this.params.salesCode = data.code;
    },
    getDistrCode(data) {
      this.params.deliveryAreaCode = data.code;
    },
    getStoreCode(val) {
      this.params.storeCode = val.value;
    },
    getOpenDate(val) {
      if(!val) {
        this.params.openHours = ''
        return
      }
      this.params.openHours = formatDate(val);
    },
    selectChange(sales, stores) {
      let _this = this;
      if (stores.hasOwnProperty("value")) {
        _this.$data.params.storeCode = stores.value
      } else {
        _this.$data.params.storeCode = ''
      }
    },
    handOk() {
      let _this = this;
      const createElement = this.$createElement;
      if(this.params.calCostType === '' || this.params.calCostType == undefined){
        Message({
          type: "error",
          message: "必选字段请填写"
        });
        return false;
      }
      if (!_this.$data.params.warehouseName || _this.$data.params.warehouseName == '') {
        _this.$data.warehouseNameState = 'invalid'
        return
      } else {
        _this.$data.warehouseNameState = null
      }
      if (!_this.$data.params.warehouseType || _this.$data.params.warehouseType == '') {
        _this.$data.warehouseTypeState = 'invalid'
        return
      } else {
        _this.$data.warehouseTypeState = null
      }
      if (_this.params.warehouseType === 'ShareWarehouse' && _this.$data.useRanges.length <= 0) {
          MessageBox({
                title: '提示',
                message: createElement('p', null, [
                    createElement('span', null, `可售范围为空, 所有门店都无法查询到仓库内的整车库存，是否确认?`)
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        _this.edit()
                        done()
                        instance.confirmButtonLoading = false;
                    } else {
                        done();
                        instance.confirmButtonLoading = false;
                        return
                    }
                }
            }).then(action => {
                common.alertInfo(success)
            }).catch(() => {})
      } else {
        _this.edit()
      }
    },
    edit() {
      let _this = this;
      if (_this.$route.params.id === "insert") {
        _this.insert(_this.params);
      } else {
        let params = {
          id: _this.params.id,
          warehouseCode: _this.params.warehouseCode,
          warehouseName: _this.params.warehouseName,
          warehouseAddrName: _this.params.warehouseAddrName,
          warehouseAddress: _this.params.warehouseAddress,
          calCostType: _this.params.calCostType,
          warehouseType: _this.params.warehouseType,
          orgCode: _this.params.orgCode,
          chinaCityCode: _this.params.chinaCityCode,
          salesCode: _this.params.salesCode,
          deliveryAreaCode: _this.params.deliveryAreaCode,
          storeCode: _this.params.storeCode,
          openHours: _this.params.openHours,
          businessStartTime: _this.params.businessStartTime,
          businessEndTime: _this.params.businessEndTime,
          contactPerson: _this.params.contactPerson,
          contactPhone: _this.params.contactPhone,
          contactMobile: _this.params.contactMobile,
          faxNumber: _this.params.faxNumber,
          email: _this.params.email,
          warehouseLocalx: _this.params.warehouseLocalx,
          warehouseLocaly: _this.params.warehouseLocaly,
          remark: _this.params.remark,
          prefixValue: _this.params.prefixValue,
          warehouseTagCode: this.params.warehouseTagCode
        }
        _this.update(params);
      }
    },
    cancel() {
      this.$router.push({
        path: "/warehouse/query"
      });
    },
    insert(params) {
      api.supplyChain.warehouse.insert(params).then(res => {
        this.alertInfo(res, true);
      });
    },
    update(params) {
      api.supplyChain.warehouse.update(params).then(res => {
        this.alertInfo(res, true);
      });
    },
    alertInfo(res, flag = false) {
      if (res.data.code === "success") {
        Message({
          type: "success",
          message: "操作成功"
        });
        if (flag) {
          // 新增编辑用的是同一个参数params,故这里不用判断this.$route.params.id
          this.queryParams.warehouseCode = this.params.warehouseCode;
          this.getWhObj(this.queryParams);
          this.cancel();
        }
      }
    },
    getWhType() {
      const params = { refCode: config.supplyChain.warehouse.whType };
      this.getDictionary(params, this.whTypeOptions);
    },
    getDictionary(params, arr, callback = () => {}) {
      api.ref.queryDictionaryDetails(params).then(res => {
        if (res.data.code === "success") {
          let list = res.data.obj.list;
          list.forEach(item => {
            let data = {
              value: item.refDetailCode,
              text: item.refDetailName
            };
            arr.push(data);
          });
          callback();
        }
      });
    },
    shopPreserve: function(data) {
      let _this = this
      if (data.length != 0) {
        let arr = []
        data.forEach((item) => {
          arr.push({
            whCode: _this.params.warehouseCode,
            whName: _this.params.warehouseName,
            storeCode: item.storeCode,
            storeName: item.remark,
            rangeCode: item.rangeCode,
            rangeType: item.rangeType,
            remark: item.remark
          })
        })
        api.supplyChain
          .warehouse
          .insertWhStoreInfoList(arr, (res) => {
            if (res.data.code === 'success') {
              _this.getUseRanges(_this.params.warehouseCode)
            }
          })
      }
    },
    removetr: function(items) {
      let _this = this
      let arr = []
      if (items.length > 0) {
        items.forEach((item) => {
          arr.push({ id: item.id })
        })
        api.supplyChain
          .warehouse
          .deleteWhStoreInfoList(arr, (res) => {
            if (res.data.code === 'success') {
              _this.getUseRanges(_this.params.warehouseCode)
            }
          })
      }
    },
    getUseRanges: function(warehouseCode) {
      let _this = this
      api.supplyChain
        .warehouse
        .queryWhStoreInfoList({ whCode: warehouseCode }, (res) => {
          if (res.data.code === 'success') {
            let list = []
            let arr = res.data.obj || []
            arr.forEach((item) => {
              list.push({
                nationwide: "",
                sales: item.salesAreaName,
                shop: item.remark || '全部',
                id: item.id,
                salesAreaCode: item.salesAreaCode,
                storeCode: item.storeCode,
                rangeCode: item.rangeCode
              })
            })
            _this.$data.useRanges = list
          }
        })
    },
    ...mapActions("classification", [
      "getWhObj"
    ])
  },
  watch: {
    startTime(val) {
      this.params.businessStartTime = val;
    },
    endTime(val) {
      this.params.businessEndTime = val;
    }
  },
  components: {
    SearchBtn,
    AreaTree,
    AreaShop,
    SuitScope
  }
}
</script>
<style lang="scss" scoped>
.el-date-editor .el-input {
  width: 100% !important;
}
</style>

