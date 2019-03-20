<template>
    <div class="animated fadeIn">
         <b-card header="查询">
             <div class="row">
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="库存主信息编码" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInvoiceInfo.invoiceCode"></b-form-input>
                      </b-form-fieldset>
                 </div>
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="仓库" label-text-align="right" :label-cols="4">
                         <b-form-select v-model.trim="supplierInvoiceInfo.invoiceName"></b-form-select>
                      </b-form-fieldset>
                 </div>
             </div>
             <div class="row">
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="发票编码" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInvoiceInfo.invoiceCode"></b-form-input>
                      </b-form-fieldset>
                 </div>
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="发票名称" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInvoiceInfo.invoiceName"></b-form-input>
                      </b-form-fieldset>
                 </div>
             </div>
             <div class="row">
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="发票编码" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInvoiceInfo.invoiceCode"></b-form-input>
                      </b-form-fieldset>
                 </div>
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="发票名称" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInvoiceInfo.invoiceName"></b-form-input>
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
                         <b-button size="sm" variant="danger" @click="removeSupplier">删除</b-button>
                     </div>
                 </div>
             </div>
             <div class="table-scrollable mb-2">
                 <b-table striped hover bordered show-empty :fields="fields" :items="supplierInfoList">
                      <template slot="selectRow" slot-scope="data">
                         <input type="radio" :value="data.index" v-model="selectRow" name="selectRow"></input>
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
     import { MessageBox, Message } from 'element-ui'

     export default {

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
             }
         },
         methods: {

         },
         components: {
             pagination
         }
     }
</script>
