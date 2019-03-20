<template>
   <div class="animated fadeIn">
        <b-card header="查询">
             <div class="row">
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="供应商编码" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInfo.supplierCode"></b-form-input>
                      </b-form-fieldset>
                 </div>
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="供应商名称" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInfo.supplierName"></b-form-input>
                      </b-form-fieldset>
                 </div>
             </div>
             <div class="row">
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="供应商类型" label-text-align="right" :label-cols="4">
                         <b-form-select :options="supplierTypes" v-model="supplierInfo.supplierType"></b-form-select>
                      </b-form-fieldset>
                 </div>
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="采购区域" label-text-align="right" :label-cols="4">
                         <treepicker @ok-click="getAreaData" :pitchon="purchasingAreaName" :load="loadPurchaseData" :clearButton="true" placeholder="选择采购区域"></treepicker>
                      </b-form-fieldset>
                 </div>
             </div>
             <div class="row">
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="邓白氏编码" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInfo.dbEncoding"></b-form-input>
                      </b-form-fieldset>
                 </div>
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="税号" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInfo.dutyParagraph"></b-form-input>
                      </b-form-fieldset>
                 </div>
             </div>
             <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="reset">重置</b-button>
                        <b-button size="sm" variant="primary" @click="search">查询</b-button>
                    </div>
                </div>
             </div>
        </b-card>
        <b-card class="mb-4">
             <div class="row mb-2">
                <div class="col-md-12">
                    <div class="pull-left">
                        <b-button size="sm" variant="success" @click="insertSupplier">新增</b-button>
                        <b-button size="sm" variant="info" @click="updateSupplier">编辑</b-button>
                        <b-button size="sm" variant="primary" @click="querySupplierInvoice">供应商发票</b-button>
                        <b-button size="sm" variant="danger" @click="removeSupplier">删除</b-button>
                    </div>
                    <div class="pull-right">
                        <b-button variant="warning" size="sm" @click="supplierSync">同步数据</b-button>
                    </div>
                </div>
             </div>
             <div class="table-scrollable mb-2">
                 <b-table striped hover bordered show-empty :fields="fields" :items="supplierInfoList">
                     <template slot="selectRow" slot-scope="data">
                         <input type="radio" :value="data.index" v-model="selectRow" name="selectRow" />
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
     import config from '../../../common/config'
     import pagination from '../../../components/pagination/pagination'
     import treepicker from '../../../components/treepicker/treepicker'
     import api from "../../../common/api";
     import { MessageBox, Message } from 'element-ui'

     export default {
         mounted() {
             this.getSupplierTypes()
         },
         data: function() {
             return {
                 selectRow: -1,
                 fields: {
                     selectRow: {
                         label: '选择'
                     },
                     supplierCode: {
                         label: '供应商编码'
                     },
                     supplierName: {
                         label: '供应商名称'
                     },
                     supplierDesc: {
                         label: '供应商简介'
                     },
                     contactName: {
                         label: '联系人'
                     },
                     contactPhone: {
                         label: '联系人电话'
                     },
                     contactMobile: {
                         label: '联系人手机'
                     }
                 },
                 items: [],
                 supplierInfo: {
                     supplierCode: '',
                     supplierName: '',
                     supplierType: '',
                     purchasingAreaCode: '',
                     dbEncoding: '',
                     dutyParagraph: '',
                     pageNums: config.pageNums,
                     pageStart: 1
                 },
                 purchasingAreaName: null
             }
         },
         computed: {
             ...mapState('supplier', [
                'supplierInfoList',
                'supplierTypes',
                'pager'
             ])
         },
         methods: {
             getAreaData(data) {
                 console.log(data)
                 this.supplierInfo.purchasingAreaCode = data[0].code
             },
             search: function() {
                 this.$data.supplierInfo.pageStart = 1
                 this.$store.dispatch('supplier/getSupplierInfoList', this.$data.supplierInfo)
             },
             reset: function() {
                 this.$data.supplierInfo = {
                     supplierCode: '',
                     supplierName: '',
                     supplierType: '',
                     purchasingAreaCode: '',
                     dbEncoding: '',
                     dutyParagraph: '',
                     bankAccount: '',
                     pageNums: config.pageNums,
                     pageStart: 1
                 }
                 if (this.$data.purchasingAreaName == null) {
                    this.$data.purchasingAreaName = ''
                 } else {
                    this.$data.purchasingAreaName = null
                 }
             },
             //供应商同步数据
			supplierSync() {
				  api.supplyChain.supplier.supplierSyncBtn({}, (res) => {
                    if(res.data.code == 'success') {
                        Message({
                            type: 'success',
                            message: '同步数据成功'
                        });
                    }
                })
			},
             pageChange: function(num) {
                 this.$data.supplierInfo.pageStart = num
                 this.$store.dispatch('supplier/getSupplierInfoList', this.$data.supplierInfo)
             },
             insertSupplier: function() {
                 this.$router.push('/supplier/insert')
             },
             updateSupplier: function() {
                 let _this = this
                 if(parseInt(this.selectRow) != -1) {
                    let supplierCode = this.supplierInfoList[this.selectRow].supplierCode
                    this.$router.push('/supplier/update/' + supplierCode)
                 } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                 }
             },
             removeSupplier: function() {
                 let _this = this
                 let index = parseInt(_this.selectRow)
                 if(index != -1) {
                     let h = _this.$createElement
                     MessageBox({
                         title: '提示',
                         message: h('h6','确定删除供应商信息!'),
                         showCancelButton: true,
                         confirmButtonText: '确定',
                         cancelButtonText: '取消',
                         type: 'warning',
                         callback: (action, instance) => {
                            if(action === 'confirm') {
                               _this.removeSupplierInfo({
                                   index: index,
                                   callback: () => {
                                       _this.selectRow = -1
                                       _this.search()
                                   }
                               })
                            }
                         }
                     })
                 } else {
                     Message.closeAll()
                     Message({
                        type: 'error',
                        message: config.messInfo.selectOneRow
                     })
                 }
             },
             loadPurchaseData: function(node, resolve) {
                 let _this = this
                 if(node.level === 0) {
                     _this.getSalesAreaInfoByAreaCode({
                         areaCode: config.areaRoot.parea,
                         level: node.level,
                         callback: resolve
                     })
                 } else {
                     _this.getSalesAreaInfoByAreaCode({
                         areaCode: node.data.code,
                         level: node.level,
                         callback: resolve
                     })
                 }
             },
             commitPurchaseData: function(data) {

             },
             querySupplierInvoice: function() {
                 let _this = this
                 if(parseInt(this.selectRow) != -1) {
                    let supplierCode = this.supplierInfoList[this.selectRow].supplierCode
                    this.$router.push('/supplier/querySupplierInvoiceInfo/' + supplierCode)
                 } else {
                    Message.closeAll()
                    Message({
                       type: 'error',
                       message: config.messInfo.selectOneRow
                    })
                 }
             },
             ...mapActions('supplier', [
                'getSupplierTypes',
                'removeSupplierInfo',
                'getSalesAreaInfoByAreaCode'
             ])
         },
         components: {
             pagination,
             treepicker
         }
     }
</script>
