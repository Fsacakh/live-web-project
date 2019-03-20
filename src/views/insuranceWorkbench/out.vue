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
                    <b-form-fieldset horizontal label="保险出单状态" label-text-align="right" :label-cols="4">
                        <b-form-select :options="orderStatusList" v-model="storeManageSalesOrder.applyType"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户电话" label-text-align="right" :label-cols="4">
                        <b-form-input type="text" v-model.trim="storeManageSalesOrder.mobilePhone"></b-form-input>
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
            <div class="row">
                    <div class="col-md-12">
                        <b-button size="sm" variant="primary" @click="showDetail('index', '', '', '')">编辑</b-button>
                    </div>
                </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :fields="fields" :items="list">
                    <template slot="radio" slot-scope="data">
                            <div @click="check(data.index)">
                                <input type="radio" name="radio" />
                            </div>
                        </template>
                    <template slot="index" slot-scope="data">
                        {{ data.index + 1 + (pager.pageNo - 1)* pager.pageSize }}
                    </template>
                    <template slot="customName" slot-scope="data">
                        <a @click.prevent="showDetail('', data.item.wbRootCode, data.item.insuranceWbCode, data.item.orderNo)" href="#">{{ data.item.customName }}</a>
                    </template>
                    <template slot="insuranceStatus" slot-scope="data">
                        {{[data.item.insuranceStatus,data.item.syncByCode] | switchInsuranceStatus}}
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
                index: '',
                fields: {
                    radio: {
                        label: '选择'
                    },
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
                orderStatusList: [
                    {
                        value: 3,
                        text: '出单成功'
                    },
                    {
                        value: 1,
                        text: '批增'
                    },
                    {
                        value: 2,
                        text: '批减'
                    },
                    {
                        value: -1,
                        text: '批退'
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
                storeManageSalesOrder: {
                    scName: '',
                    insOrgCode :'',
                    insuranceStatus: '',
                    applyType:'',
                    customName: '',
                    mobilePhone: '',
                    salesAreaCode: '',
                    storeCode: '',
                    pageStart: 1,
                    pageNums: config.pageNums
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
            check(index) {
                this.index = index;
            },
            clear: function() {
                let _this = this
                _this.$refs.insuranceOrgRef.setValue('');
                _this.index = ''
                _this.$data.storeManageSalesOrder = {
                    scName: '',
                    insOrgCode :'',
                    insuranceStatus: '',
                    applyType: '',
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
            search: function() {
                let _this = this
                _this.$data.storeManageSalesOrder.pageStart = 1
                _this.getInsuranceWorkbenchInfoList(_this.$data.storeManageSalesOrder)
            },
            pageChange: function(num) {
                let _this = this
                _this.$data.storeManageSalesOrder.pageStart = num
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
            showDetail: function(w, wbRootCode, insuranceWbCode, orderNo) {
                let _this = this
                if(w === 'index') {
                    if(this.index === '') {
                        Message({
                            type: 'warning',
                            message: "请选择一条数据"
                        })
                        return
                    }
                    let l = this.list
                    if(l != undefined && l != null && l.length > 0) {
                        let _whCode = l[this.index].insuranceWbCode
                        let _orderNo = l[this.index].orderNo
                        let _rootCode = l[this.index].wbRootCode
                        _this.$router.push('/insuranceWorkbench/order/'+ _rootCode + '/' + _whCode + '/' + _orderNo + '/' + config.insuranceWorkbench.outFlag + '/' + config.insuranceWorkbench.editFlag)
                    }
                } else {
                    _this.$router.push('/insuranceWorkbench/order/'+ wbRootCode + '/'+ insuranceWbCode + '/' + orderNo + '/' + config.insuranceWorkbench.outFlag + '/' + config.insuranceWorkbench.detailFlag)
                }
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
        }
    }
</script>
