<template>
    <div class="animated fadeIn">
         <b-card header="查询">
             <div class="row">
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="发票编码" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInvoiceInfo.invoiceCode"></b-form-input>
                      </b-form-fieldset>
                 </div>
                <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="发票抬头" label-text-align="right" :label-cols="4">
                         <b-form-input v-model.trim="supplierInvoiceInfo.invoiceTitle"></b-form-input>
                      </b-form-fieldset>
                 </div>
             </div>
             <div class="row">
                 <div class="col-md-6 col-lg-6">
                      <b-form-fieldset horizontal label="发票类型" label-text-align="right" :label-cols="4">
                         <b-form-select :options="invoiceTypes" v-model.trim="supplierInvoiceInfo.invoiceType"></b-form-select>
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
                        <b-button size="sm" variant="success" @click="addSupplierInvoice">新增</b-button>
                    </div>
                </div>
             </div>
             <div class="table-scrollable mb-2">
                 <b-table striped hover bordered show-empty :fields="fields" :items="supplierInvoiceInfoList">
                     <template slot="selectRow" slot-scope="data">
                         <input type="radio" :value="data.index" v-model="selectRow" name="selectRow"></input>
                     </template>
                     <template slot="empty">暂无数据</template>
                 </b-table>
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

   export default {
       mounted() {
           let _this = this
           _this.getInvoiceTypes()
           _this.$data.supplierInvoiceInfo.supplierCode = _this.$route.params.supplierCode
           _this.getSupplierInvoiceList(_this.$data.supplierInvoiceInfo)
       },
       data: function() {
           return {
               selectRow: -1,
               fields: {
                   invoiceCode: {
                       label: '发票编码'
                   },
                   invoiceTitle: {
                       label: '发票抬头'
                   },
                   invoiceName: {
                       label: '发票类型'
                   },
                   taxRate: {
                       label: '税率'
                   }
               },
               supplierInvoiceInfo: {
                   invoiceCode: '',
                   invoiceName: '',
                   invoiceTitle: '',
                   invoiceType: '',
                   supplierCode: ''
               }
           }
       },
       computed: {
           ...mapState('supplierInvoice', [
               'supplierInvoiceInfoList',
               'invoiceTypes',
               'pager'
           ])
       },
       methods: {
            search: function() {
                let _this = this
                _this.getSupplierInvoiceList(_this.$data.supplierInvoiceInfo)
            },
            reset: function() {
                let _this = this
                _this.$data.supplierInvoiceInfo = {
                    invoiceCode: '',
                    invoiceName: '',
                    invoiceTitle: '',
                    invoiceType: '',
                    supplierCode: _this.$route.params.supplierCode
                }
            },
            addSupplierInvoice: function() {
                let _this = this
                _this.$router.push('/supplier/addSupplierInvoiceInfo/' + _this.$route.params.supplierCode)
            },
            ...mapActions('supplierInvoice', [
                'getInvoiceTypes',
                'getSupplierInvoiceList'
            ])
       },
       components: {
           pagination
       }
   }
</script>
