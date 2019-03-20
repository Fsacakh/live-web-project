<template>
    <b-modal id="cost" ref="cost" title="手续费" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <b-card>
                  <div class="col-md-10">
                      <b-form-fieldset :horizontal="true" label="适用门店" :label-cols="3" class="text-center">
                          <div class="row" v-show="obj.availableType !== '0' && !showRange">
                              <div class="col-md-6">
                                  <div class="text-left tree" ref="tree">
                                      <input type="text" class="form-control" @click="showTree" v-model="inputValue" readonly>
                                      <div class="tree-box" v-show="show">
                                          <el-tree :data="regions" :props="propOption" :load="loadNode" :default-expanded-keys="[0]" node-key="id" lazy accordion show-checkbox check-strictly @check-change="handleCheckChange">
                                          </el-tree>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <b-form-select v-model="storeCode" :options="storeOptions">
                                  </b-form-select>
                              </div>
                          </div>
                          <div class="row" v-show="obj.availableType === '0' || showRange">
                              <div class="col-md-6">
                                  <b-form-input v-model="saleName" readonly/>
                              </div>
                              <div class="col-md-6">
                                  <b-form-input v-model="storeName" readonly/>
                              </div>
                          </div>
                      </b-form-fieldset>
                  </div>
                  <div class="row col-md-12">
                      <div class="col-md-12 text-left padding-bottom" @click="changeCheck">
                          <el-checkbox v-model="unifiedCost"></el-checkbox>
                          <span>统一手续费</span>
                      </div>
                      <div class="col-md-4">
                          <b-form-fieldset horizontal label="费用类型" :label-cols="5" class="text-right">
                              <b-form-select :options="costTypeOptions" :disabled="!unifiedCost" v-model="allCostType">
                              </b-form-select>
                          </b-form-fieldset>
                      </div>
                      <div class="col-md-4">
                          <b-form-fieldset horizontal label="非营业个人" :label-cols="5" class="text-right">
                              <b-form-input :readonly="!unifiedCost" v-model="allPeople" placeholder="请输入数字" type="number"/>
                              <span class="symbol" v-show="allCostType == 0 || false">%</span>
                          </b-form-fieldset>
                      </div>
                      <div class="col-md-4">
                          <b-form-fieldset horizontal label="公司" :label-cols="4" class="text-right">
                              <b-form-input :readonly="!unifiedCost" v-model="allCompany" placeholder="请输入数字" type="number"/>
                              <span class="symbol" v-show="allCostType == 0 || false">%</span>
                          </b-form-fieldset>
                      </div>
                  </div>
                </b-card>
                <div class="row">
                    <div class="col-md-12">
                        <div class="table table-bordered table-striped table-scrollable max" @scroll="onScroll($event)" ref="tableBox">
                            <table style="width: 100%">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>险种</th>
                                        <th>费用类型</th>
                                        <th>类型</th>
                                        <th>手续费</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in datalist">
                                        <template v-if="(index + 1) % 2 !== 0">
                                            <td rowspan="2">{{index / 2 + 1}}</td>
                                            <td rowspan="2">{{item.refDetailName}}</td>
                                        </template>
                                        <td>
                                            <b-form-select :options="costTypeOptions" :disabled="unifiedCost" v-model="datalist[index].costType" @input="selectChange">
                                            </b-form-select>
                                        </td>
                                        <td>{{item.type}}</td>
                                        <td class="box-td">
                                          <div class="input_box_td">
                                            <b-form-input :readonly="unifiedCost" v-model="datalist[index].commFee" placeholder="请输入数字" type="number"/>
                                          </div>
                                            <span class="td-symbol" v-if="datalist[index].costType == 0 || false">%</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>
import Vue from "vue";
import { Tree, MessageBox, Message, Checkbox } from "element-ui";
import Api from "common/api";
import config from "common/config";
import common from "common/common";
import { mapGetters } from "vuex";
Vue.use(Tree);
Vue.use(Checkbox);

export default {
  props: ["obj", "getCode", "storeList"],
  data() {
    return {
      allCostType: "",
      allPeople: "",
      allCompany: "",
      // 区域和经销商店联动效果数据
      storeCode: "",
      storeOptions: [],
      inputValue: "",
      show: false,
      regions: [],
      propOption: {
        label: "name",
        children: "zones"
      },
      paramsList: [],
      inputText: [],
      // checkbox
      unifiedCost: undefined,
      costTypeOptions: [],
      datalist: [],
      insertCostParams: [],
      saleName: "",
      storeName: "",
      // 转换 checkbox (无用)
      costChexked: false,
      // 详情修改上面使用范围disable
      showRange: false
    };
  },
  created() {
    this.queryInauranceBaseType();
    this.getCostType();
    this.getSaleName();
    Math.signFigures = function(num, rank = 6) {
        if(!num) return(0);
        const sign = num / Math.abs(num);
        const number = num * sign;
        const temp = rank - 1 - Math.floor(Math.log10(number));
        let ans;
        if (temp > 0) {
            ans = parseFloat(number.toFixed(temp));
        } else if (temp < 0) {
            const temp = Math.pow(10, temp);
            ans = Math.round(number / temp) * temp;
        } else {
            ans = Math.round(number);
        }
        return (ans * sign);
    };
  },
  computed: {
    ...mapGetters("insurance", ["coCode", "costDetail"])
  },
  methods: {
    getSaleName() {
      Api.finance.getSalesArea().then(res => {
        if (res.data.code === "success") {
          if (res.data.obj) {
              this.saleName = res.data.obj[0].areaName;
          }
        }
      });
    },
    showTree() {
      this.show = !this.show;
    },
    // 点击 check-box 事件
    handleCheckChange(data, checked, indeterminate) {
      if (data && checked) {
        this.paramsList.push(data.code);
        this.inputText.push(data.name);
        this.inputValue = this.inputText.toString();
      }
      for (let i = 0, len = this.paramsList.length; i < len; i++) {
        if (data && !checked && this.paramsList[i] == data.code) {
          this.paramsList.splice(i, 1);
        }
      }
      for (let j = 0, len = this.inputText.length; j < len; j++) {
        if (data && !checked && this.inputText[j] == data.name) {
          this.inputText.splice(j, 1);
          this.inputValue = this.inputText.toString();
        }
      }
    },
    // 加载树子节点
    loadNode(node, resolve) {
      if (node.level === 0) {
        Api.finance.getSalesArea().then(res => {
          if (res.data.code === "success") {
            let obj = res.data.obj;
            let arr = [];
            obj.forEach((item, index) => {
              let data = {
                id: 0,
                name: item.areaName,
                code: item.areaCode
              };
              arr.push(data);
            });
            return resolve(arr);
          }
        });
      } else {
        let params = {
          areaCode: node.data.code
        };
        Api.area.getSalesAreaInfoByAreaCode(params, res => {
          if (res.data.code === "success") {
            let items = res.data.obj.salesAreaSubInfo;
            let arr = [];
            if (items !== null) {
              items.forEach((item, index) => {
                let data = {
                  name: item.areaName,
                  code: item.areaCode
                };
                arr.push(data);
              });
            }
            return resolve(arr);
          }
        });
      }
    },
    getStore(params) {
      Api.store.queryStoreBysale(params).then(res => {
        if (res.data.code === "success") {
          let obj = res.data.obj;
          this.storeOptions = [];
          obj.forEach(item => {
            let data = {
              text: item.storeName,
              value: item.storeCode
            };
            this.storeOptions.push(data);
          });
        }
      });
    },
    selectChange(e) {
      return e;
    },
    changeCheck() {
      this.costChexked = this.unifiedCost;
    },
    // 查询基础险种
    queryInauranceBaseType() {
      let params = {
        pageNums: config.insurance.pageNums,
        refCode: config.insurance.insuranceType
      };
      Api.ref.queryDictionaryDetails(params).then(res => {
        if (res.data.code === "success") {
          let list = res.data.obj.list;
          list.forEach(item => {
            let data_1 = {
              refDetailCode: item.refDetailCode,
              refDetailName: item.refDetailName,
              type: "非营业个人",
              checked: this.costChexked,
              costType: this.selectChange(),
              commFee: ""
            };
            let data_2 = {
              refDetailCode: item.refDetailCode,
              refDetailName: item.refDetailName,
              type: "公司",
              checked: this.costChexked,
              costType: this.selectChange(),
              commFee: ""
            };
            this.datalist.push(data_1);
            this.datalist.push(data_2);
          });
        }
      });
    },
    // 获取费用类型
    getCostType() {
      let params = { 
        pageNums: config.insurance.pageNums, 
        refCode: config.insurance.costType 
      };
      Api.ref.queryDictionaryDetails(params).then(res => {
        if (res.data.code === "success") {
          let list = res.data.obj.list;
          list.forEach(item => {
            let data = {
              value: item.refDetailName === "比例" ? "0" : "1",
              text: item.refDetailName
            };
            this.costTypeOptions.push(data);
          });
        }
      });
    },
    // 批量获取手续费 code ( 优化 squence)
    getCodeList(nums, callback) {
      let params = {
        getNums: nums,
        serviceCode: config.insurance.costCode
      };
      Api.ordinalInfo.getSequenceList(params, res => {
        if (res.data.code === "success") {
          let obj = res.data.obj;
          callback(obj);
        }
      });
    },
    setCommCodeList() {
      let len = this.datalist.length;
      this.getCodeList(len, obj => {
        for (let i = 0; i < len; i++) {
          this.datalist[i].commCode = obj[i];
        }
      });
    },
    // 批量新增手续费
    setInsertCost(params) {
      Api.insurance.insertCost(params).then(res => {
        if (res.data.code === "success") {
          this.$emit("success");
          Message({
            type: "success",
            message: "创建成功"
          });
        }
      });
    },
    // 确定新增  => 手续费
    handleOk() {
        if (!this.showRange) {
            // 新增
            let _storeList = new Set(this.storeList)
            if (!this.storeCode && this.obj.availableType !== "0") {
              Message({
                type: "warning",
                message: "门店不能为空"
              });
              return;
            }else if(_storeList.has(this.storeCode)) {
              Message({
                type: "warning",
                message: "当前门店已有手续费"
              });
              return;
            }
            this.insertCostParams = [];
            this.datalist.forEach((item, index) => {
              if(item.commFee && item.costType) {
                let obj = {
                  coCode: this.$route.params.id || this.coCode,                                      // 公司code
                  commCode: item.commCode,                                                           // 手续费code
                  commFee: item.costType === '0' ? item.commFee / 100 : item.commFee,                        // 手续费金额
                  commType: item.type,                                                               // 手续费类型
                  costType: item.costType,                                                           // 费用类型
                  insTypeCode: item.refDetailCode,                                                   // 险种编码
                  storeCode:
                    this.obj.availableType !== "0"
                      ? this.storeCode
                      : this.obj.storeInfoVo.storeCode                                                // 门店code
                };
                this.insertCostParams.push(obj);
              }
            });
            let params = this.insertCostParams;
            this.setInsertCost(params);
            this.resetModal();
        } else {
            // 修改
            this.insertCostParams = [];
            this.datalist.forEach((item, index) => {
              if(item.commFee && item.costType) {
                let obj = {
                  id: item.id,
                  coCode: this.$route.params.id || this.coCode,                                      // 公司code
                  commCode: item.commCode,                                                           // 手续费code
                  commFee: item.costType === '0' ? item.commFee / 100 : item.commFee,                        // 手续费金额
                  commType: item.type,                                                               // 手续费类型
                  costType: item.costType,                                                           // 费用类型
                  insTypeCode: item.refDetailCode,                                                   // 险种编码
                  storeCode:
                    this.obj.availableType !== "0"
                      ? this.storeCode
                      : this.obj.storeInfoVo.storeCode                                              // 门店code
                };
                this.insertCostParams.push(obj);
              }
            });
            let params = this.insertCostParams;
            this.setInsertCost(params);
        }
    },
    // 排序 (非必须)
    bubbleSort(arr) {
      var len = arr.length;
      for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
          if (arr[j].insTypeCode > arr[j + 1].insTypeCode) {
            //相邻元素两两对比
            var temp = arr[j + 1]; //元素交换
            arr[j + 1] = arr[j];
            arr[j] = temp;
          }
        }
      }
      return arr;
    },
    setPeople() {
      for (let i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].type == "非营业个人") {
          this.datalist[i].commFee = this.allPeople;
        }
      }
    },
    setCompany() {
      for (let i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].type == "公司") {
          this.datalist[i].commFee = this.allCompany;
        }
      }
    },
    resetModal() {
      this.datalist.forEach(item => {
        item.costType = "";
        item.commFee = "";
      });
      this.inputValue = "";
      this.storeCode = "";
      this.allCostType = "";
      this.allPeople = "";
      this.allCompany = "";
      this.unifiedCost = false;
    },
    onScroll(event) {
      let _scrollTop = event.target.scrollTop,
          _offsetHeight = event.target.offsetHeight,
          _scrollHeight = event.target.scrollHeight,
          _tableBox = this.$refs.tableBox.style
      if (_scrollTop + _offsetHeight >= _scrollHeight) {
          _tableBox.borderBottom = 0
          _tableBox.borderTop = '1px solid #ccc'
      } else if(_scrollTop == 0) {
          _tableBox.borderTop = 0
          _tableBox.borderBottom = '1px solid #ccc'
      }else if(_scrollTop > 0) {
          _tableBox.borderTop = '1px solid #ccc'
         _tableBox.borderBottom = '1px solid #ccc'
      }
    },
    // NoUse
    getNum(num) {
      let item = num.toString().split('.')
      if(!item[1]) {
        return item[0] * 100
      }
      // 0.12 | 1.12
      return item[0] === '0'
        ? item[1].split('')[0] === '0'
            ? item[1].split('')[1]
            : item[1]
        : `${item[0]}${item[1]}`
    },
  },
  watch: {
    paramsList(val) {
      if (val.length !== 0) {
        let params = {
          salesAreaCodes: val,
          needPageFlag: "0"
        };
        this.getStore(params);
      } else {
        this.storeOptions = [];
      }
    },
    allCostType(val) {
      // console.log(val)
      for (let i = 0; i < this.datalist.length; i++) {
        this.datalist[i].costType = val;
      }
    },
    allPeople(val) {
      if (val && val >= 0 && val - 0 !== NaN) {
        this.setPeople();
      } else if (!val) {
        return;
      } else {
        Message({
          type: "warning",
          message: "输入格式有误"
        });
        this.allPeople = "";
      }
      this.setPeople();
    },
    allCompany(val) {
      if (val && val >= 0 && val - 0 !== NaN) {
        this.setCompany();
      } else if (!val) {
        return;
      } else {
        Message({
          type: "warning",
          message: "输入格式有误"
        });
        this.allCompany = "";
      }
      this.setCompany();
    },
    obj(val) {
      if (val && val.availableType === "0") {
        this.storeName = val.storeInfoVo.storeName;
      }
    },
    // 获取手续费详细信息
    costDetail(val) {
      if (val) {
        this.showRange = true;
        this.bubbleSort(val);
        this.saleName = val[0].salesAreaName;
        this.storeName = val[0].storeName;
        this.storeCode = val[0].storeCode;
        val.forEach((item, i) => {
          for (let j = 0, len = this.datalist.length; j < len; j++) {
            if (
              this.datalist[j].refDetailCode === item.insTypeCode &&
              this.datalist[j].type === item.commType
            ) {
              this.datalist[j].costType = item.costType;
              this.datalist[j].commFee =  item.costType === '0' ? Math.signFigures(item.commFee * 100) : item.commFee;
              this.datalist[j].id = item.id; //修改唯一标识符id
              // checkbox状态无法获取、下面无效
              if (this.datalist[j].checked) {
                this.unifiedCost = true;
                this.allCostType = item.costType;
                if (item.commType === "非营业个人") {
                  this.allPeople = item.commFee.toString().split(".")[0];
                }
                if (item.commType === "公司") {
                  this.allCompany = item.commFee.toString().split(".")[0];
                }
              }
            }
          }
        });
      }
    },
    // 监听新增按钮是否触发 => 执行setCommCodeList
    getCode(val) {
      this.$refs.cost.show()
      this.resetModal();
      this.showRange = false;
      this.setCommCodeList();
    },
    show(val) {
        document.addEventListener('click', (e) => {
            let _tree = this.$refs.tree;
            if(_tree && !_tree.contains(e.target))  this.show = false
        })
    },
  },
  mounted() {
    document.addEventListener('click', (e) => {
        let _tree = this.$refs.tree;
        if(_tree && !_tree.contains(e.target))  this.show = false
    })
  },
  beforeDestroy () {
      window.removeEventListener('click', (e) => {
        let _tree = this.$refs.tree;
        if(_tree && !_tree.contains(e.target))  this.show = false
    })
  }
};
</script>
<style lang="css" scoped>
.padding-bottom {
  padding-bottom: 5px;
  padding-left: 35px;
}

.modal-dialog {
  margin: 80px auto !important;
}

.max {
  border: none;
  border-bottom: 1px solid #ccc;
  max-height: 260px;
  overflow-y: scroll;
}

.tree-box {
  position: absolute;
  min-width: 87%;
  margin-top: 6px;
  z-index: 100;
}
.el-tree {
    max-height: 200px;
    overflow-y: scroll;
}
.tree-box > div {
  padding-right: 10px;
}
.symbol {
  position: absolute;
  top: 6px;
  right: -18px;
  font-size: 20px;
}
.box-td {
  position: relative;
}
.td-symbol {
  position: absolute;
  top: 18px;
  right: 30px;
  font-size: 20px
}
.input_box_td {
  width: 80%;
}
</style>
