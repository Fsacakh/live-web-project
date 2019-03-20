<template>
    <div class="row warp">
        <div class="col-md-6" @click="inputshow">
            <b-form-input type="text" :state="error ? 'invalid' : null" v-model="salesValue" placeholder="请选择销售区域" readonly></b-form-input>
        </div>
        <div class="col-md-6">
            <b-form-select v-model="selectValue" :state="error ? 'invalid' : null" :options="options" :disabled="disabled"></b-form-select>
        </div>
        <div class="treepick-warp-container" v-if="show">
      <div class="treepick-warp text-left" >
            <Tree ref="tree" :data="treeData" style="border: none;" :show-checkbox="true" :check-strictly="true" :highlight-current='true' :props="propOption" :load="loadNodeSales" lazy empty-text="暂无数据" @check-change="handleCheckChange">
            </Tree>
        </div>
        <div class="text-right confirm">
            <button type="button" class=" btn btn-primary btn-sm pull-right mt-3 mr-3 mb-3 br-50%" @click="confirm">确定</button>
        </div> 
        </div>
    </div>
</template>
<script>
import treepicker from "components/treepicker/treepicker.vue";
import api from "common/api";
import config from "common/config";
import { Tree } from "element-ui";
export default {
  data() {
    return {
      options: [
        {
          value: 0,
          text: "请选择经销商店"
        }
      ],
      selectValue: 0,
      selectData: {},
      treeData: [],
      availableType: "",
      selesNanme: "",
      disabled: false,
      propOption: {
        label: "name",
        children: "zones"
      },
      show: false,
      salesValue: "",
      salesCode: '',
      defaultValue: ""
    };
  },
  props: {
    readonly: {
      type: Boolean,
      default: true
    },
    storeAll: {
      type: Boolean,
      default: false
    },
    error:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    stopBubble(e) {
      if (e && e.stopPropagation) {
        e.stopPropagation(); //w3c
      } else {
        window.event.cancelBubble = true; //IE
      }
    },
    loadNodeSales(node, resolve) {
      if (node.level === 0) {
        if (this.availableType === "1" || this.availableType === "2") {
          api.getSalesAreaInfoByUserAvailableAllLevel(msg => {
            if (msg.data.message == "success" && msg.data.obj.length != 0) {
              return resolve([
                {
                  name: msg.data.obj[0].areaName || "",
                  code: msg.data.obj[0].areaCode || ""
                }
              ]);
            }
          });
        }
        return;
      }
      api.area.getSalesAreaInfoByAreaCode(
        {
          areaCode: node.data.code
        },
        msg => {
          //获取子集
          let data = msg.data.obj.salesAreaSubInfo || 0;
          let arr = [];
          if (data) {
            for (var i = 0; i < data.length; i++) {
              arr[i] = {
                name: data[i].areaName,
                code: data[i].areaCode
              };
            }
            return resolve(arr);
          }
          return resolve([]);
        }
      );
    },
    handleCheckChange() {},
    confirm() {
      let data 
      if(this.defaultValue) {
        data = this.defaultValue
      }else {
        data = this.$refs.tree.getCheckedNodes(); //选择的树形结构
      }
      this.show = false;
      this.selectValue = 0;
      this.salesValue = this.renovateValue(data);
      if (data.length !== 0) {
        this.$emit("sales-data", data);
        let arr = [];
        //在这里查询经销商店
        for (var i = 0; i < data.length; i++) {
          arr.push(data[i].code);
        }
        api.finance.queryShopInfo(
          {
            salesAreaCodes: arr,
            needPageFlag: "0"
          },
          msg => {
            if (msg.data.message == "success") {
              this.options = [
                {
                  value: 0,
                  text: "请选择经销商店"
                }
              ];
              let obj = msg.data.obj;
              for (var i = 0; i < obj.length; i++) {
                this.$set(this.options, i + 1, {
                  text: obj[i].storeName,
                  value: obj[i].storeCode
                });
              }
            } else if (msg.data.message == "销售区域为空") {
              this.options = [
                {
                  value: 0,
                  text: "请选择经销商店"
                }
              ];
            }
            this.selectData = {};
            if (this.storeAll) {
              this.$emit("select-change", data, this.options);
            } else {
              this.$emit("select-change", data, "");
            }
          }
        );
        this.treeData = data;
      }
    },
    inputshow() {
      this.stopBubble();
      if (this.disabled) {
        this.show = false;
        return;
      }
      this.show = true;
    },
    renovateValue(data) {
      //因为唯一标识符是code name可能会出现重复所以value需要在datas变化的时候重新计算一遍
      var value = "";
      for (var i = 0; i < data.length; i++) {
        value += data[i].name + " ";
      }
      return value;
    },
    reset() {
      if(this.availableType == 0){
        return false;
      }
      this.selectValue = 0;
      this.options = [
        {
          value: 0,
          text: "请选择经销商店"
        }
      ];
      this.salesValue = "";
      this.treeData = [];
      this.$emit("select-change", this.salesValue, this.treeData);
    },
    setselect(storeData) {
      let _this = this
      if(typeof storeData == 'object' && storeData.value.length > 0){
        api.storeInfo.queryShopInfo({
          storeCode: storeData.value 
        },(msg)=>{
          if(msg.data.message == 'success'){
              let salesCode = msg.data.obj.salesCode
              api.finance.queryShopInfo({
                  salesAreaCodes: [salesCode],
                  needPageFlag: "0"
              }, (res) => {
                  if (res.data.code === 'success') {
                      _this.$data.options = [{
                          value: 0,
                          text: "请选择经销商店"
                      },]
                      let obj = res.data.obj;
                      for (var i = 0; i < obj.length; i++) {
                          _this.$set( _this.$data.options, i + 1, {
                              text: obj[i].storeName,
                              value: obj[i].storeCode
                          })
                      }
                  }
              })
              this.selectValue = storeData.value;
              this.salesValue = msg.data.obj.salesName
          }
        })
      }
    },
  },
  watch: {
    selectValue: function() {
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].value == this.selectValue) {
          this.selectData = this.options[i];
          this.$emit("select-change", this.treeData, this.selectData);
          return;
        }
      }
    },
    readonly: function() {
      if (this.readonly) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    }
  },
  components: {
    treepicker,
    Tree
  },
  mounted() {
    this.$nextTick(function() {
      document.addEventListener("click", event => {
        this.show = false;
      });
    });
    api.getUserAvailableInfo(msg => {
      if (msg.data.message === "success") {
        this.availableType = msg.data.obj.availableType;
        this.$emit("available-type", this.availableType);                 
        if (this.availableType === "0") {
          this.$set(this.options, 1, {
            value: msg.data.obj.storeInfoVo.storeCode,
            text: msg.data.obj.storeInfoVo.storeName
          });
          this.salesValue = msg.data.obj.storeInfoVo.salesName;
          this.salesCode = msg.data.obj.storeInfoVo.salesCode;
          this.selectValue = msg.data.obj.storeInfoVo.storeCode;
          this.treeData = {
            code: this.salesCode,
            name: this.salesValue
          };
          this.disabled = true;
          this.$emit("select-change", this.treeData, this.selectData);                   
        }else if(this.availableType === "1") {
              // debugger
          let needData = msg.data.obj.storeInfoVo
          let tempArr = []
          let obj = {
            name: needData.salesName,
            code: needData.salesCode
          }
          tempArr.push(obj)
          this.defaultValue = tempArr
          this.salesValue = obj.name
          this.confirm()
        }
      }
    });
  }
};
</script>

<style lang="css">
.treepick-warp {
  width: 100%;
  height: 200px;  
  overflow: auto;
}
.treepick-warp-container {
  position: absolute;
  width: 100%;
  height: 250px;
  top: 100%;
  background-color: #fff;
  z-index: 999;  
  box-shadow: 0 6px 8px 0 rgba(155, 155, 155, 0.5);
  box-sizing: border-box;  
}
.warp {
  position: relative;
}
.treepicker-inner {
  width: 100% !important;
  height: 200px !important;
}
.treepicker-popup {
  width: 200% !important;
}
</style>
