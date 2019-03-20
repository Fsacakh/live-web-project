<template>
  <div class="animated fateIn">
    <b-card :header="payStatus == '1' ? '收款信息' : '退款信息'">
      <b-card>
        <div class="row">
          <div class="col-md-6">
            <b-form-fieldset horizontal label="订单号:" label-text-align="right" :label-cols="4">
              <div class="text-left form-control border-none"><a href="javascript:;" @click.prevent="showDetail(orderInfo.orderNo)">{{orderInfo.orderNo}}</a></div>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="客户姓名:" label-text-align="right" :label-cols="4">
              <div class="text-left form-control border-none">{{orderInfo.custName}}</div>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="销售顾问:" label-text-align="right" :label-cols="4">
              <div class="text-left form-control border-none">{{orderInfo.salesEmpName}}</div>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="订单类型:" label-text-align="right" :label-cols="4">
              <div class="text-left form-control border-none">{{orderInfo.orderTypeName}}</div>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="应收订金金额:" label-text-align="right" :label-cols="4">
              <div class="text-left form-control border-none">{{ parseFloat(orderInfo.orderAddInfoDeposit).toFixed(2) }}</div>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="备注:" :label-cols="4" class="text-right">
              <b-form-textarea readonly v-model="orderInfo.remark" placeholder="暂无数据" :rows="3" :max-rows="10" :maxlength="50">
              </b-form-textarea>
            </b-form-fieldset>
          </div>
        </div>
      </b-card>
      <b-card>
        <div class="row">
          <div class="col-md-6">
            <b-form-fieldset horizontal label="应收总额:" label-text-align="right" :label-cols="4">
              <div class="text-left form-control border-none">￥{{ parseFloat(orderInfo.actualTotalPrice).toFixed(2) }}</div>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="公司挂账金额:" label-text-align="right" :label-cols="4">
              <div class="text-left form-control border-none">￥{{parseFloat(orderInfo.discountTotalPrice).toFixed(2)}}</div>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="金融挂账金额:" label-text-align="right" :label-cols="4">
              <div class="text-left form-control border-none">￥{{parseFloat(orderInfo.onAccountTotalPrice).toFixed(2)}}</div>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="实收金额:" label-text-align="right" :label-cols="4">
              <div class="text-left form-control border-none">￥{{ parseFloat(orderInfo.actualAmountTotal).toFixed(2) }}</div>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <b-form-fieldset horizontal label="二手车挂账金额:" label-text-align="right" :label-cols="4">
              <div class="text-left form-control border-none">￥{{parseFloat(orderInfo.customerPayablesTotal).toFixed(2)}}</div>
            </b-form-fieldset>
          </div>
          <div class="col-md-6">
            <div v-for="(item, index) in informationgs" :key="index">
              <b-form-fieldset horizontal :label="item.name" label-text-align="right" :label-cols="4">
                <div class="text-left form-control border-none">￥{{ parseFloat(item.price).toFixed(2) }}</div>
              </b-form-fieldset>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 text-right">
            <b-button size="sm" variant="info" @click="refund(payStatus)">{{btnName}}</b-button>
          </div>
          <div class="col-md-2 text-right">
            <b-button size="sm" variant="primary" @click="mount()">公司客户挂账</b-button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="table-scrollable" style="width:100%; overflow：scroll">
              <table style="50px" class="table table-bordered">
                <thead style="50px">
                  <tr style="50px">
                    <td nowrap>
                      序号
                    </td>
                    <td nowrap>
                      类别
                    </td>
                    <td nowrap>
                      类别总金额
                    </td>
                    <template v-for="n in orderPriceList.num">
                                <td nowrap>
                                  项目
                                </td>
                                <td nowrap>
                                  金额
                                </td>
</template>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in orderPriceList.orderPriceInfolist" :key="index">
                  <tr>
                    <td nowrap>
                      {{index+1}}
                    </td>
                    <td nowrap>
                      {{item.type}}
                    </td>
                    <td nowrap>
                      {{item.totalPrice}}
                    </td>
<template v-for="n in orderPriceList.num">
  <td nowrap>
    {{item.infoList[n-1] ? item.infoList[n-1].addName: ''}}</td>
  <td nowrap>{{item.infoList[n-1] ? item.infoList[n-1].addValue: ''}}</td>
</template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </b-card>
    </b-card>
    <b-card :header="historyTitle">
      <div>
        <b-button size="sm" variant="danger" @click="deletePayInfo('deleted')">删除</b-button>
        <b-button size="sm" variant="primary" @click="updatePayInfo()">修改</b-button>
      </div>
      <div class="table-scrollable">
        <b-table striped hover bordered show-empty :items="historyList" :fields="payStatus=='1' ? fields : fields2">
<template slot="checkbox" slot-scope="data">
  <div :class="{'disabled-box' : data.item.isDeleted == '1'}">
    <input type="radio" name="models" v-model="selitem" :value="data.item" :disabled="data.item.isDeleted == '1'">
    <div class="disabled-line" v-show="data.item.isDeleted == '1'" />
  </div>
</template>
<template slot="index" slot-scope="data">
  <div :class="{'disabled-box' : data.item.isDeleted == '1'}">
    {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
    <div class="disabled-line" v-show="data.item.isDeleted == '1'" />
  </div>
</template>
          <!-- 支付方式    paymentTypeName-->
<template slot="paymentTypeName" slot-scope="data">
  <div :class="{'disabled-box' : data.item.isDeleted == '1'}">
    <span>{{ data.item.paymentTypeName }}</span>
    <div class="disabled-line" v-show="data.item.isDeleted == '1'" />
  </div>
</template>
          <!-- 挂账类型  paymentSubTypeName-->
<template slot="paymentSubTypeName" slot-scope="data">
  <div :class="{'disabled-box' : data.item.isDeleted == '1'}">
    <span>{{data.item.paymentSubTypeName}}</span>
    <div class="disabled-line" v-show="data.item.isDeleted == '1'" />
  </div>
</template>
          <!-- 挂账金额 moneyPrice -->
<template slot="moneyPrice" slot-scope="data">
  <div :class="{'disabled-box' : data.item.isDeleted == '1'}">
    <span>{{ data.item.moneyPrice | toFixed(2) }}</span>
    <div class="disabled-line" v-show="data.item.isDeleted == '1'" />
  </div>
</template>
<template slot="createTimeStr" slot-scope="data">
  <div :class="{'disabled-box' : data.item.isDeleted == '1'}">
    <span>{{data.item.createTimeStr}}</span>
    <div class="disabled-line" v-show="data.item.isDeleted == '1'" />
  </div>
</template>
<template slot="paymentTransactionNo" slot-scope="data">
  <div :class="{'disabled-box' : data.item.isDeleted == '1'}">
    <span>{{data.item.paymentTransactionNo}}</span>
    <div class="disabled-line" v-show="data.item.isDeleted == '1'" />
  </div>
</template>
<template slot="payeeName" slot-scope="data">
  <div :class="{'disabled-box' : data.item.isDeleted == '1'}">
    <span>{{data.item.payeeName}}</span>
    <div class="disabled-line" v-show="data.item.isDeleted == '1'" />
  </div>
</template>
<template slot="remark" slot-scope="data">
  <div :class="{'disabled-box' : data.item.isDeleted == '1'}">
    <span>{{data.item.remark}}</span>
    <div class="disabled-line" v-show="data.item.isDeleted == '1'" />
  </div>
</template>
<template slot="empty">
   暂无数据...
</template>
        </b-table>
      </div>
      <pagination 
        class="pull-right"
        @page-change="pageChange"
        :page-no="pager.pageNo"
        :page-size="pager.pageSize"
        :total-result="pager.total"
        :total-pages="pager.totalPages">
      </pagination>
    </b-card>
    <collectmodel 
      @getPayHistory="childModel"
      ref='collect'>
    </collectmodel>
    <b-modal id="modal1" title="公司客户挂账"  ref="myModalRef" size="lg" @ok="handleOk" @shown="clearName" ok-title="确定" cancel-title="取消" disabled>
      <div class="row">
        <div class="col-md-6">
          <div class="my-4">支付方式:公司挂账</div>
        </div>
        <div class="col-md-6">
          <div class="my-4">公司名称:{{this.companyName}}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="my-4" style="line-height: 40px;">社会信息代码:{{ this.socialCreditCode }}</div>
        </div>
        <div class="col-md-6">
          <b-form-fieldset class="my-4" horizontal label="选择授信合同*" :label-cols="4">
            <b-form-select :state="status.contractCode" :options="contractCode" v-model="contractCodeValue" @change="selectChange(contractCode.startingPointCode)"/>
          </b-form-fieldset>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="my-4">
            <span class="my-4">总授信额度:</span>
            <span>{{ selectInfo.companyCredit | currentRemaining }}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="my-4">
            <span class="my-4"> 剩余额度:</span>
            <span>{{selectInfo.currentRemainingAmounts | currentRemaining}}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b-form-fieldset horizontal label="挂账金额*" :label-cols="4" class="my-4">
            <b-form-input type='number' :state="status.moneyPrice" placeholder="请输入" v-model="OrderPaymentInfoVo.moneyPrice"/>
          </b-form-fieldset>
        </div>
        <div class="col-md-6">
          <b-form-fieldset horizontal label="备注" :label-cols="4" class="my-4">
            <b-form-input placeholder="请输入" v-model="OrderPaymentInfoVo.remark"/>
          </b-form-fieldset>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
  import Vue from "vue";
  import {
    mapState,
    mapActions,
    mapGetters
  } from "vuex";
  import {
    MessageBox,
    Message,
    Dialog
  } from "element-ui";
  import config from "common/config";
  import api from "common/api";
  import collectmodel from "./collectmodel";
  import Pagination from "components/pagination/pagination";
  Vue.use(Dialog);
  export default {
    components: {
      collectmodel,
      Pagination
    },
    data() {
      return {
        closingFlag: 0, //判斷該訂單是否已經交車  已交車  1   未交車  0
        status: { //驗證
          contractCode: null, //选择授信合同
          moneyPrice: null //金額
        },
        disaled: false,
        something: false, //控制是否顯示隱藏
        informationgs: [],
        PriceInfo: [], //拼接
        OrderPaymentInfoVo: { //挂账点确定的入参对象
          paymentCode: this.paymentCode, //支付流水业务编码
          paymentTypeCode: 'PaymentModeTypeBill', //支付方式编码【数据字典】
          sourceOrderNo: '', //交易单号
          sourceOrderTypeCode: 'transactionNoteTypeNewCarSales', //交易单据类型编码【数据字典】
          payStatus: 1,
          paymentSubTypeCode: 'CompanyOnAccount', //企业挂账必填
          companyCode: '', //企业编码  *
          companyCreditCode: '', //企业授信额度编码  *
          longestCreditDays: '', //	最长挂账时间  *
          startingPointCode: '', //挂账起始点设置编码*
          moneyPrice: '',
          remark: '',
          paymentSubTypeName: '公司挂账'
        },
        company: [], //授信额度数组
        contractCodeValue: "", //当前选中的contractCode
        companyCredit: "", //总授信额度
        currentRemainingAmounts: "",
        contractCode: [], //下拉框名字
        socialCreditCode: "", //社会信息代码
        companyName: "",
        mountarray: [],
        querycompany: {
          searchDate: "", // 当前日期
          companyCode: "", // 企业编码
          applyBusinessCode: "ApplyBusinessSale", // 适用业务
          storeCodes: [],
          companyCreditStatus: 2,
          wfStatus: 1 // 门店适用范围
        },
        showDialog: false,
        wfStatus: Number,
        customArray: [], //储存
        newDate: new Date(),
        customType: "",
        historyTitle: "",
        btnName: "",
        payStatus: "",
        moneyPrice: "",
        selitem: "",
        query: {
          sourceOrderNo: "",
          payStatus: "",
          pageNums: config.pageNums,
          pageStart: 1,
          isDeleted: ''
        },
        pager: {
          pageNo: 1,
          pageSize: 15,
          total: 1,
          totalPages: 1
        },
        readonly: true,
        select: [],
        historyList: [],
        isCompanyOnAccount: 1, //是否公司挂账  是公司客户 1    否  0
        fields: {
          checkbox: {
            label: "选择"
          },
          index: {
            label: "序号"
          },
          paymentTypeName: {
            label: "支付方式"
          },
          paymentSubTypeName: {
            label: "挂账类型"
          },
          moneyPrice: {
            label: "收款金额"
          },
          createTimeStr: {
            label: "收款日期"
          },
          paymentTransactionNo: {
            label: "交易凭证号"
          },
          payeeName: {
            label: "收款员"
          },
          remark: {
            label: "备注"
          }
        },
        fields2: {
          checkbox: {
            label: "   "
          },
          index: {
            label: "序号"
          },
          paymentTypeName: {
            label: "退款方式"
          },
          moneyPrice: {
            label: "退款金额"
          },
          createTimeStr: {
            label: "退款日期"
          },
          paymentTransactionNo: {
            label: "交易凭证号"
          },
          payeeName: {
            label: "退款员"
          },
          remark: {
            label: "备注"
          }
        },
        fields3: {
          index: {
            label: "序号"
          },
          accountTypeName: {
            label: "类别"
          },
          moneyPrice: {
            label: "类别总金额"
          },
          createTimeStr: {
            label: "项目"
          },
          paymentTransactionNo: {
            label: "金额"
          },
          createTimeStr: {
            label: "项目"
          },
          paymentTransactionNo: {
            label: "金额"
          }
        },
        selectInfo: {
          companyCredit: '',
          currentRemainingAmounts: ''
        }
      }
    },
    filters: {
      currentRemaining(val) {
        return val === '' ? '' : '￥' + val
      }
    },
    computed: {
      ...mapState("financing", [
        "paymentType",
        "orderInfo",
        'paymentCode'
      ]),
      ...mapGetters('financing', [
        'orderPriceList'
      ])
    },
    watch: {
      orderInfo(Vo) {
        Vo && this.getPayInfos()
        Vo && this.querycustomtype()
        Vo && this.information()
      },
      contractCodeValue(val) {
        this.selectChange()
      }
    },
    created() {
      this.queryPayHistory();
      this.initialize();
      this.getPayInfo();
      this.childModel();
      this.getOrderPriceInfo({
        'orderNo': this.$route.params.id.replace('+1', '')
      });
    },
    mounted() {
      window.vue = this;
    },
    methods: {
      getPayInfos() {
        api.financing.getPayInfo({
          orderNo: this.orderInfo.orderNo,
          allSubOrderFlag: true
        }, res => {
          if (res.data.code == "success") {
            this.closingFlag = res.data.obj.closingFlag
          }
        });
      },
      //公司收款或者掛賬信息
      information() {
        this.informationgs = []
        this.orderInfo.orderPaymentInfoList.forEach(item => {
          this.informationgs.push({
            name: item.sourceOrderTypeName,
            price: item.moneyPrice
          })
        })
      },
      //根据编码查询订单头信息   通过this.orderInfo.orderNo   去查询  封装
      clearName() {
        this.hide()
      },
      handleOk(e) {
        // this.$refs.myModalRef.show()
        if (this.contractCodeValue === '') {
          this.status.contractCode = "invalid"
          e.preventDefault()
          return
        } else if (this.OrderPaymentInfoVo.moneyPrice === '') {
          this.status.moneyPrice = "invalid"
          e.preventDefault()
          return
        } else if (this.OrderPaymentInfoVo.moneyPrice > this.selectInfo.currentRemainingAmounts) {
          Message({
            type: "error",
            message: '无法挂账进行 挂账金额不足'
          });
          e.preventDefault()
          return
        } else if (this.OrderPaymentInfoVo.moneyPrice <= 0) {
          Message({
            type: "error",
            message: '挂账金额不能为零或负数'
          });
          e.preventDefault()
          return
        }
        let params = []
        params.push(this.OrderPaymentInfoVo)
        // if(this.OrderPaymentInfoVo.moneyPrice) {}
        api.financing.addPayInfoList(params, (res) => {
          if (res.data.code == 'success') {
            Message({
              type: "info",
              message: '挂账成功'
            });
            this.queryPayHistory();
            this.childModel();
          }
        })
      },
      selectChange(startingPointCode) {
        this.mountarray.forEach(item => {
          if (item.contractCode === this.contractCodeValue) {
            this.OrderPaymentInfoVo.companyCreditCode = item.companyCreditCode
            this.OrderPaymentInfoVo.longestCreditDays = item.longestCreditDays
            this.selectInfo = { ...item
            }
            this.OrderPaymentInfoVo.startingPointCode = item.startingPointCode
          }
        })
      },
      hide() {
        this.showDialog = false;
      },
      show() {
        this.showDialog = true;
      },
      // 修改
      updatePayInfo() {
        if (this.selitem == "") {
          Message({
            type: "info",
            message: config.messInfo.select
          });
          return;
        }
        let params = [];
        MessageBox.prompt("修改交易凭证号", "修改信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({
          value
        }) => {
          this.selitem.isDeleted = "";
          this.selitem.paymentTransactionNo = value;
          params.push(this.selitem);
          api.financing.addPayInfoList(params, res => {
            if (res.data.code == "success") {
              Message({
                type: "info",
                message: config.messInfo.success
              });
              this.selitem = ''
            }
          });
        });
      },
      mountconfirm() {
        this.OrderPaymentInfoVo.moneyPrice = ''
        this.contractCodeValue = ''
        this.selectInfo.companyCredit = ''
        this.selectInfo.currentRemainingAmounts = ''
        let params = {};
        this.contractCode = []
        this.querycompany.searchDate = this.newDate.getFullYear() + '-' + (this.newDate.getMonth() + 1) + '-' + this.newDate.getDate();
        this.querycompany.storeCodes = []
        this.querycompany.storeCodes.push(this.orderInfo.storeCode);
        api.ProcessingInfo.getPayInfo(this.querycompany, res => {
          if (res.data.code === "success") {
            this.mountarray = res.data.obj;
          } else if (res.data.code === "fail") {
            Message({
              type: "error",
              message: res.data.message
            });
            return
          }
          this.mountarray.forEach(item => {
            this.contractCode.push({
              text: item.contractCode,
              value: item.contractCode
            });
            this.company.push({
              companyCredit: item.companyCredit,
              currentRemainingAmounts: item.currentRemainingAmounts
            });
          });
          this.$refs.myModalRef.show()
        });
      },
      querycustomtype() {
        api.ByCustomCode.ByCustomCodes({
          customCode: this.orderInfo.custCode
        }, res => {
          if (res.data.code === "success") {
            this.customArray = res.data.obj;
            this.customArray.forEach(item => {
              this.customType = item.customType;
              this.wfStatus = item.wfStatus;
              this.querycompany.companyCode = item.companyCode;
              this.OrderPaymentInfoVo.companyCode = item.companyCode
              this.OrderPaymentInfoVo.longestCreditDays = item.longestCreditDays
              this.OrderPaymentInfoVo.startingPointCode = item.startingPointCode
              this.companyName = item.companyName;
              this.socialCreditCode = item.socialCreditCode;
            });
          }
        });
      },
      //点击公司客户挂账
      mount() {
        if (!this.customType) {
          MessageBox.confirm(
            "该客户不是公司客户,请为客户关联公司后再挂账",
            "提示", {
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: "关闭",
              type: "error"
            }
          );
          return;
        }
        //如果是个人账户  直接提示    如果是公司账户并且已经审批通过直接弹挂账   如果
        if (this.wfStatus != 1) {
          MessageBox.confirm(
            "该公司客户还未完成审批,请在审批通过后再进行挂账",
            "提示", {
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: "关闭",
              type: "error"
            }
          );
          return;
        }
        if (this.customType) {
          this.mountconfirm();
        }
      },
      commonOrderNo: function() {
        let code = this.$route.params.id;
        let num = code.indexOf("+");
        let params = code.slice(0, num);
        return params;
      },
      refund: function(code) {
        this.$refs.collect.showMadel(this.payStatus);
        this.moneyPrice = "";
      },
      showDetail(code) {
        this.$router.push({
          path: "/order/detail/" + code
        });
      },
      initialize: function() {
        const $this = this;
        this.$store.dispatch("financing/getType", {
          poros: {
            refCode: config.financing.paymentTypeCode
          },
          callBack: function(msg) {
            if (msg.data.code == "success") {}
          }
        });
      },
      childModel: function() {
        const $this = this;
        let params = this.commonOrderNo();
        this.$store.dispatch("financing/newgetPayInfo", {
          poros: {
            sourceOrderNo: params,
            allSubOrderFlag: true
          },
          callBack: function(msg) {
            $this.queryPayHistory();
          }
        });
      },
      getPayInfo: function() {
        const $this = this;
        let code = this.$route.params.id;
        let num = code.indexOf("+");
        let params = code.slice(0, num);
        let status = code.slice(num + 1, num + 2);
        if (status == "1") {
          this.payStatus = config.income;
          this.historyTitle = "收款历史";
          this.btnName = "收款";
        } else {
          this.payStatus = config.outcome;
          this.historyTitle = "退款历史";
          this.btnName = "退款";
        }
        $this.$store.dispatch("financing/newgetPayInfo", {
          poros: {
            sourceOrderNo: params
          },
          callBack: function(msg) {}
        });
      },
      queryPayHistory: function() {
        const $this = this;
        this.query.sourceOrderNo = this.commonOrderNo();
        this.OrderPaymentInfoVo.sourceOrderNo = this.commonOrderNo();
        this.query.payStatus = Number(this.payStatus);
        $this.$store.dispatch("financing/queryPayHistory", {
          poros: $this.query,
          callBack: function(msg) {
            if (msg.data.code == "success") {
              $this.historyList = msg.data.obj.list;
              $this.pager.pageNo = msg.data.obj.pageNum;
              $this.pager.totalPages = msg.data.obj.pages;
              $this.pager.pageSize = msg.data.obj.pageSize;
              $this.pager.total = msg.data.obj.total;
            }
          }
        });
      },
      pageChange(page) {
        this.query.pageStart = page;
        this.queryPayHistory();
      },
      deletePayInfo: function(type) {
        if (this.closingFlag === 1) {
          Message({
            type: "error",
            message: '交车之后无法删除'
          });
          return
        }
        if (this.selitem.paymentSubTypeName === '金融挂账') {
          Message({
            type: "error",
            message: '金融挂账无法删除'
          });
          return
        }
        if (this.selitem.paymentSubTypeName === '二手车挂账') {
          Message({
            type: "error",
            message: '二手车挂账无法删除'
          });
          return
        }
        const $this = this;
        if (this.selitem == "") {
          Message({
            type: "info",
            message: config.messInfo.select
          });
          return;
        }
        if (type == "deleted") {
          let params = [];
          MessageBox.prompt("请输入删除记录的具体原因", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            callBack: function() {}
          }).then(({
            value
          }) => {
            $this.selitem.isDeleted = "1";
            $this.selitem.remark = value;
            params.push($this.selitem);
            $this.$store.dispatch("financing/addPayInfoList", {
              poros: params,
              callBack: function(msg) {
                if (msg.data.code == "success") {
                  Message({
                    type: "info",
                    message: config.messInfo.success
                  });
                  $this.selitem = ''
                  $this.queryPayHistory();
                  $this.getPayInfo();
                }
              }
            });
          });
        }
      },
      ...mapActions('financing', [
        'getOrderPriceInfo'
      ])
    }
  };
</script>
<style lang="scss">
  .border-none {
    border: none !important;
  }
  .disabled-box {
    position: relative;
    height: 23px;
  }
  .disabled-line {
    position: absolute;
    top: 11px;
    left: 0px;
    width: calc(100% + 1.6rem);
    margin-left: -13px;
    border-top: 2px solid rgba(0, 0, 0, 0.4);
  }
</style>
