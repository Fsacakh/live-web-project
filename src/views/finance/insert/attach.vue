<template>
  <div class="animated fadeIn">
    <table class="table table-striped table-bordered">
      <thead>
        <tr class="text-center">
          <th class="text-center" v-for="item in fields">{{item.label}}</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="(value, index) in params">
          <th class="text-center">{{parseInt(index)+1}}</th>
          <th class="text-center">
            <select :disabled='disableFlag' @change="updata" v-model="value.isPercent" class="form-control">
                <option value="-1">请选择</option>
                <option value="1">{{percentage.first}}</option>
                <option value="0">{{percentage.last}}</option>
            </select>
          </th>
          <th v-if="tabs=='0'" class="text-center"><input type="number" :readonly="disableFlag" placeholder="" @change="updata" v-model="value.intersubsidyName" class="form-control" /></th>
          <th v-if="tabs=='1'" class="text-center"><input type="number" :readonly="disableFlag" placeholder="" @change="updata" v-model="value.serviceChargeValue" class="form-control" /></th>
          <th class="text-center">
            <b-button class="pl-3 pr-3 pt-2 pb-2" variant="danger" @click="remove(value)">删除</b-button>
          </th>
        </tr>
        <tr v-for="(value, index) in addParams">
          <th class="text-center">{{parseInt(index) + parseInt(params.length) + 1}}</th>
          <th class="text-center">
            <select @change="updata" v-model="value.isPercent" autocomplete="off" class="form-control">
                <option value="0" selected="selected">{{percentage.last}}</option>              
                <option value="1">{{percentage.first}}</option>
            </select>
          </th>
          <th v-if="tabs=='0'" class="text-center"><input type="number" @change="updata" v-model="value.intersubsidyName" class="form-control" /></th>
          <th v-if="tabs=='1'" class="text-center"><input type="number" @change="updata" v-model="value.serviceChargeValue" class="form-control" /></th>
          <th class="text-center">
            <b-button class="pl-3 pr-3 pt-2 pb-2" variant="danger" @click="remove(value,index)">删除</b-button>
          </th>
        </tr>
        <tr v-if="params.length==0 && addParams.length==0">
          <td colspan='13' class="text-left">暂无数据...</td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-md-6">
        <b-button type="button" @click="addRow()" variant="success">新增</b-button>
      </div>
      <div class="col-md-6 text-right">
        <b-button type="button" @click="submintInterest()" variant="primary">保存</b-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import api from '../../../common/api.js'
  import common from '../../../common/common.js'
  import config from '../../../common/config.js'
  import {
    Message,
    MessageBox
  } from 'element-ui'
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  Vue.component(Message.name, Message) //用use会在页面一加载的时候弹出一个框来
  Vue.component(MessageBox.name, MessageBox) //用use会在页面一加载的时候弹出一个框来
  export default {
    data() {
      return {
        // 贴息方案表头模拟数据
        fields: {
          index: {
            label: "序号",
          },
          percentage: {
            label: "百分比/金额",
          },
          interestRate: {
            label: "利率/金额",
          },
          option: {
            label: "操作",
          }
        },
        interestTab: [], //贴息行
        percentage: {
          first: '百分比',
          last: '金额'
        },
        params: [], //列表渲染的数据
        // paramsIdArr: [],//有ID的数据
        disableFlag: true,
        addParams: [] //新增的list
      }
    },
    methods: {
      submintInterest() {
        if (this.tabs == '0') {
          var str = 'intersubsidyName'
        } else if (this.tabs == '1') {
          var str = 'serviceChargeValue'
        }
        if (this.addParams.length != 0) {
          //打包数据发送给后台
          for (let i = 1, len = this.params.length; i < len; i++) {
            if ((this.params[i].isPercent == "-1") || (!this.params[i][str])) {
              common.alertInfo('error')
              return;
            }
          }
          this.collectInfo(this.tabs)
        } else {
          common.alertInfo('error');
        }
      },
      remove(value, index, bb) {
        MessageBox.confirm('是否删除该信息', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'info'
        }).then(() => {
          // 点击是的话在这里帮他保存
          if (index != undefined) {
            //有index说明是添加的需要删除
            this.addParams.splice(index, 1);
          } else {
            if (this.tabs == '0') {
              // 贴息方案
              api.finance.addIntersubsidyCode([{
                id: value.id,
                isDeleted: '1',
                intersubsidyCode: value.intersubsidyCode,
                intersubsidyName: value.intersubsidyName,
                financeOrgCode: value.financeOrgCode
              }], (msg) => {
                api.finance.getQueryIntersubsidy({
                  "financeOrgCode": this.financeCode
                }, (msg) => {
                  if (msg.data.message == 'success') {
                    let data = msg.data.obj;
                    this.params = []
                    for (var i in data) {
                      for (let j = 0; j < data[i].length; j++) {
                        if (data[i][j].isPercent == 1) {
                          data[i][j].intersubsidyName = common.dealNumberWithPoint(data[i][j].intersubsidyName, 2)
                        }
                      }
                      this.params.push.apply(this.params, data[i])
                    }
                  }
                })
              })
            } else if (this.tabs == '1') {
              //手续费方案
              api.finance.addProceduresCode([{
                id: value.id,
                isDeleted: '1',
                financeOrgCode: value.financeOrgCode,
                serviceChargeValue: value.serviceChargeValue,
                serviceChargeCode: value.serviceChargeCode
              }], (msg) => {
                api.finance.getFinanceOrgsServiceCharge({
                  "financeOrgCode": this.financeCode
                }, (msg) => {
                  if (msg.data.message == 'success') {
                    let data = msg.data.obj;
                    this.params = []
                    for (var i in data) {
                      for (let j = 0; j < data[i].length; j++) {
                        if (data[i][j].isPercent == 1) {
                          data[i][j].serviceChargeValue = common.dealNumberWithPoint(data[i][j].serviceChargeValue, 2)
                        }
                      }
                      this.params.push.apply(this.params, data[i])
                    }
                  }
                })
              })
            }
          }
        }).catch(() => {});
      },
      setIntersubsidy(params) {
        //添加贴息方案ajax
        for (let i = 0; i < params.length; i++) {
          if (params[i].isPercent == 1) {
            params[i].intersubsidyName = common.dealNumberWithSmall(params[i].intersubsidyName, 8)
          }
        }
        api.finance.addIntersubsidyCode(params, (msg) => {
          if (msg.data.message == 'success') {
            this.$store.dispatch('finance/setInterest', true);
            this.addParams = [];
            api.finance.getQueryIntersubsidy({
              "financeOrgCode": this.financeCode
            }, (msg) => {
              if (msg.data.message == 'success') {
                let data = msg.data.obj;
                this.params = []
                for (var i in data) {
                  for (let j = 0; j < data[i].length; j++) {
                    if (data[i][j].isPercent == 1) {
                      data[i][j].intersubsidyName = common.dealNumberWithPoint(data[i][j].intersubsidyName, 2)
                    }
                  }
                  this.params.push.apply(this.params, data[i])
                }
              }
            })
            common.alertInfo('success');
          } else {
            common.alertInfo('warning');
          }
        })
      },
      setProcedures(params) {
        //添加手续费ajax
        for (let i = 0; i < params.length; i++) {
          if (params[i].isPercent == 1) {
            params[i].serviceChargeValue = common.dealNumberWithSmall(params[i].serviceChargeValue, 8)
          }
        }
        api.finance.addProceduresCode(params, (msg) => {
          if (msg.data.message == 'success') {
            this.$store.dispatch('finance/setPoundage', true)
            common.alertInfo('success');
            this.addParams = []
            api.finance.getFinanceOrgsServiceCharge({
              "financeOrgCode": this.financeCode
            }, (msg) => {
              if (msg.data.message == 'success') {
                let data = msg.data.obj;
                this.params = []
                for (var i in data) {
                  for (let j = 0; j < data[i].length; j++) {
                    if (data[i][j].isPercent == 1) {
                      data[i][j].serviceChargeValue = common.dealNumberWithPoint(data[i][j].serviceChargeValue, 2)
                    }
                  }
                  this.params.push.apply(this.params, data[i])
                }
              }
            })
          } else {
            common.alertInfo('warning');
          }
        })
      },
      collectInfo(value) {
        if (value == '0') {
          // 贴息方案
          this.setIntersubsidy(this.addParams);
        } else if (value == '1') {
          //手续费方案
          this.setProcedures(this.addParams);
        }
      },
      addRow() {
        api.ordinalInfo.getSequence({
          serviceCode: config.addFinanceCode.interest
        }, (msg) => {
          let obj = null;
          if (this.tabs == '0') {
            obj = {
              financeOrgCode: this.financeCode,
              intersubsidyName: "",
              intersubsidyCode: msg.data.obj,
              isPercent: "1"
            }
          } else if (this.tabs == '1') {
            obj = {
              financeOrgCode: this.financeCode,
              serviceChargeValue: "",
              serviceChargeCode: msg.data.obj,
              isPercent: "1"
            }
          }
          this.addParams.push(obj)
        })
      },
      updata() {
        if (this.tabs == '0') {
          this.$store.dispatch('finance/setInterest', false)
        } else if (this.tabs == '1') {
          this.$store.dispatch('finance/setPoundage', false)
        }
        this.$store.dispatch('finance/setIntersubsidyData', this.params);
      }
    },
    computed: {
      // mapState是vuex的辅助函数 https://vuex.vuejs.org/zh-cn/state.html#the-mapstate-helper
      // 创建组件的计算属性返回 Vuex store 中的状态
      ...mapState('finance', [
        'financeCode',
        'updataFinanceId'
      ]),
      intersubsidyData: {
        get() {
          return this.$store.state.finance.intersubsidyData;
        },
        set() {}
      }
    },
    watch: {
      params: function() {
        this.$store.dispatch('finance/setIntersubsidyData', this.params);
      }
    },
    created() {
      if (this.$route.params.id) {
        if (this.tabs == '0') {
          // 贴息方案
          api.finance.getQueryIntersubsidy({
            financeOrgCode: this.financeCode
          }, (msg) => {
            if (msg.data.message == 'success') {
              let data = msg.data.obj;
              for (var i in data) {
                for (let j = 0; j < data[i].length; j++) {
                  if (data[i][j].isPercent == 1) {
                    data[i][j].intersubsidyName = (data[i][j].intersubsidyName * 100).toFixed(2)
                  }
                }
                this.params.push.apply(this.params, data[i])
              }
            }
          })
        } else if (this.tabs == '1') {
          //手续费方案
          api.finance.getQueryProcedures({
            financeOrgCode: this.financeCode
          }, (msg) => {
            if (msg.data.message == 'success') {
              let data = msg.data.obj;
              for (var i in data) {
                for (let j = 0; j < data[i].length; j++) {
                  if (data[i][j].isPercent == 1) {
                    data[i][j].serviceChargeValue = (data[i][j].serviceChargeValue * 100).toFixed(2)
                  }
                }
                this.params.push.apply(this.params, data[i])
              }
            }
          })
        }
      }
    },
    props: ['tabs']
  }
</script>

<style lang="css">

</style>
