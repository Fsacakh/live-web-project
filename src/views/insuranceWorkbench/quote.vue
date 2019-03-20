<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="销售顾问" label-text-align="right" :label-cols="4">
                        <b-form-input type="text" v-model.trim="storeManageSalesOrder.scName"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="保险机构" label-text-align="right" :label-cols="4">
                        <search ref="insuranceOrgRef" :dataList="insuranceOrgs" :option="'coName'" @itemValue="backInsurance" :showSearch="false" @comScroll="getInsuranceOrgs" @clickShowBack="getInsuranceOrgs"></search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="保险报价状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="insuranceStatusList" v-model="storeManageSalesOrder.insuranceStatus"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户姓名" label-text-align="right" :label-cols="4">
                        <b-form-input type="text" v-model.trim="storeManageSalesOrder.customName"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户电话" label-text-align="right" :label-cols="4">
                        <b-form-input type="text" v-model.trim="storeManageSalesOrder.mobilePhone"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <!-- 订单状态 -->
            <div class="row">
              <div class="col-md-6 col-lg-6">
                  <b-form-fieldset horizontal label="订单状态" label-text-align="right" :label-cols="4">
                    <b-form-select :options="wfStatusList" v-model.trim="orderStatus"></b-form-select>
                  </b-form-fieldset>
              </div>
            </div>
            <div class="row">
               <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="clear">重置</b-button>
                        <b-button size="sm" variant="primary" @click="search">查询</b-button>
                    </div>
               </div>
           </div>
        </b-card>
        <b-card class="mb-4">
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :fields="fields" :items="list">
                    <template slot="index" slot-scope="data">
                        {{ data.index + 1 + (pager.pageNo - 1)* pager.pageSize }}
                    </template>
                    <template slot="customName" slot-scope="data">
                        <a @click.prevent="showDetail(data.item.wbRootCode, data.item.insuranceWbCode, data.item.orderNo)" href="#">{{ data.item.customName }}</a>
                    </template>
                    <template slot="insuranceStatus" slot-scope="data">
                        {{ [data.item.insuranceStatus,data.item.syncByCode] | switchInsuranceStatus }}
                    </template>
                    <template slot="scSyncTime" slot-scope="data">
                        {{data.item.scSyncTime | formatDate}}
                    </template>
                    <template slot="syncTime" slot-scope="data">
                        {{data.item.syncTime | formatDate}}
                    </template>
                    <!-- 订单状态 -->
                    <template slot="wfStatus" slot-scope="data">
                        {{data.item.wfStatus | wfStatusData(data.item.currentOrderWfTypeCode, data.item.closingFlag)}}
                    </template>
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total" :total-pages="pager.totalPages">
                    </pagination>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../common/config'
    import api from '../../common/api'
    import pagination from 'components/pagination/pagination'
    import treepicker from 'components/treepicker/treepicker'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import search from '../../components/iris-search/search.vue'
    import { MessageBox, Message } from 'element-ui'
      const list = config.order.status; // 订单状态
      const _statusList = [];
      list.forEach(item => {
          var data = {
              text: item.text,
              value: JSON.stringify(item.value)
          }
          _statusList.push(data)
      })
    export default {
        mounted() {
            let _this = this
            //_this.search();
        },
        destroyed(){
            let _this = this
        },
        data: function() {
            return {
                orderStatus: '', //订单状态
                fields: {
                    index: {
                        label: '序号'
                    },
                    customName: {
                        label: '客户姓名'
                    },
                    mobilePhone: {
                        label: '手机号码'
                    },
                    storeName: {
                        label: '门店'
                    },
                    carFactoryName: {
                        label: '厂家'
                    },
                    carBrandName: {
                        label: '品牌'
                    },
                    carSeriesName: {
                        label: '车系'
                    },
                    carModelName: {
                        label: '车型'
                    },
                    insuranceStatus: {
                        label: '保险报价状态'
                    },
                    insOrderStatus: {
                        label: '出单状态'
                    },
                    wfStatus: {
                        label: '订单状态'
                    },
                    strongInsuranceOrg: {
                        label: '交强险机构'
                    },
                    strongInsurancePrice: {
                        label: '交强险实收'
                    },
                    businessInsuranceOrg: {
                        label: '商业险机构'
                    },
                    businessInsurancePrice: {
                        label: '商业险实收'
                    },
                    scName: {
                        label: '所属SC'
                    },
                    scSyncTime: {
                        label: '推送时间'
                    },
                    syncTime: {
                        label: '同步时间'
                    },
                    syncByName: {
                        label: '操作人'
                    }
                },
                insuranceStatusList: [
                    {
                        value: 0,
                        text: '待报价'
                    },
                    {
                        value: 1,
                        text: '销售顾问报价'
                    },
                    {
                        value: 2,
                        text: '保险专员报价'
                    },
                    {
                        value: 3,
                        text: '保险战败'
                    },
                ],
                insuranceOrg :{
                    load : false,
                    totalPages : 0,
                    pageStart : 1,
                    pageNums: config.pageNums,
                    onOffFlag: '0'
                },
                insuranceOrgs : [],
                orderList: [],
                wfStatusList: _statusList, //订单状态
                storeManageSalesOrder: {
                    scName: '',   //销售顾问名称
                    insOrgCode :'',  //保险机构
                    insuranceStatus: '',   //报价状态
                    customName: '',    //客户名称
                    mobilePhone: '',   //客户手机号码
                    salesAreaCode: '',  //
                    storeCode: '',  //门店名称
                    pageStart: 1, //第几页
                    pageNums: config.pageNums,
                    wfStatus: ''   //订单状态
                }
            }
        },
        computed: {
            ...mapState('insuranceWorkbench', [
                'insuranceWorkbenchInfoList',
                'pager'
            ]),
            ...mapGetters('insuranceWorkbench', [
                'list'
            ])
        },
        methods: {
            clear: function() {
                let _this = this
                _this.$refs.insuranceOrgRef.setValue('');
                _this.orderStatus = '';
                _this.$data.storeManageSalesOrder = {
                    scName: '',
                    insOrgCode :'',
                    insuranceStatus: '',
                    wfStatus: '',
                    customName: '',
                    mobilePhone: '',
                    salesAreaCode: _this.storeManageSalesOrder.salesAreaCode,
                    storeCode: _this.storeManageSalesOrder.storeCode,
                    pageStart: 1,
                    pageNums: config.pageNums
                }
            },
            selectStores: function(sales, stores) {
                let _this = this
                if (sales instanceof Array) {
                    _this.storeManageSalesOrder.salesAreaCode = sales[0].code
                } else if (sales.hasOwnProperty('code')) {
                    _this.storeManageSalesOrder.salesAreaCode = sales.code
                }
                if (stores instanceof Array) {
                    _this.storeManageSalesOrder.storeCode = ''
                } else if (stores.value === 0) {
                    _this.storeManageSalesOrder.storeCode = ''
                } else if (stores.hasOwnProperty('value')) {
                    _this.storeManageSalesOrder.salesAreaCode = ''
                    _this.storeManageSalesOrder.storeCode = stores.value
                }
            },
            // 查询信息
            search: function() {
                var that = this;
                that.$data.storeManageSalesOrder.pageStart = 1
                that.getInsuranceWorkbenchInfoList(that.$data.storeManageSalesOrder)
            },
            pageChange: function(num) {
                let _this = this
                _this.$data.storeManageSalesOrder.pageStart = num;
                _this.getInsuranceWorkbenchInfoList(_this.$data.storeManageSalesOrder)
            },
            getInsuranceOrgs() {
                var $this = this;
                if($this.insuranceOrg.load || ($this.insuranceOrg.pageStart > $this.insuranceOrg.totalPages && $this.insuranceOrg.totalPages !=0) )return;
                //获取保险公司数据
                $this.insuranceOrg.load = true
                api.insurancePro.queryCompanyInfoByCodesAndPagination({pageNums:$this.insuranceOrg.pageNums,
                        pageStart:this.insuranceOrg.pageStart,onOffFlag:'0'},function(res){
                        $this.insuranceOrg.load = false
                        if(res.data.code == 'success'){
                            $this.insuranceOrg.pageStart ++;
                            $this.insuranceOrg.totalPages = res.data.obj.pages;
                            for(var i = 0, len = res.data.obj.list.length; i<len; i++){
                                $this.insuranceOrgs.push(res.data.obj.list[i]);
                            }
                        }
                    }
                )
            },
            backInsurance(item){
                this.storeManageSalesOrder.insOrgCode = item.coCode;
            },
            showDetail: function(wbRootCode, insuranceWbCode, orderNo) {
                let _this = this
                _this.$router.push('/insuranceWorkbench/order/'+ wbRootCode + '/' + insuranceWbCode + '/' + orderNo + '/' + config.insuranceWorkbench.quoteFlag + '/' + config.insuranceWorkbench.editFlag)
            },
            ...mapActions('insuranceWorkbench', [
                "getInsuranceWorkbenchInfoList",
            ])
        },
        components: {
            pagination,
            treepicker,
            search,
            areaqueryshop
        },
        watch: {
          // 根据订单状态的不同 分别传递不同的参数字段
          orderStatus(val) {
              if (val) {
                  const value = JSON.parse(val)
                  if (value.wfStatus !== undefined) {
                      delete this.storeManageSalesOrder.wfTypeCode;
                      delete this.storeManageSalesOrder.closingFlag;
                      this.storeManageSalesOrder.wfStatus = value.wfStatus;
                      if (value.wfTypeCode && value.wfTypeCode !== 'NewCarContractWfType') {
                        delete this.storeManageSalesOrder.closingFlag;
                        this.storeManageSalesOrder.wfTypeCode = value.wfTypeCode;
                      } else if (value.wfTypeCode && value.wfTypeCode === 'NewCarContractWfType') {
                        this.storeManageSalesOrder.closingFlag = 0;
                        this.storeManageSalesOrder.wfTypeCode = value.wfTypeCode;
                      }
                  } else if (value.closingFlag !== undefined) {
                      delete this.storeManageSalesOrder.wfStatus;
                      delete this.storeManageSalesOrder.wfTypeCode;
                      this.storeManageSalesOrder.closingFlag = value.closingFlag;
                  }
              }
          }
        },
        filters: {
          wfStatusData(sta,code,clos) {
            let text = '';
            if (sta == -1) {
              text = '待提交';
            } else if (sta == 0) {
              text="审批中";
            } else if (clos == 1) {
              text = "交车";
            } else if (sta == 1 && code == 'NewCarIntentionOrderWfType') {
              text ="意向单";
            } else if (sta == 1 && code == 'NewCarOrderWfType')  {
              text = "订单";
            } else if (sta == 1 && code == 'NewCarContractWfType') {
              text = "合同";
            } else if (sta == 1 && code == 'NewCarRefuseWfType') {
              text = "退订";
            }
            return text;
          }
        }
    }
</script>
