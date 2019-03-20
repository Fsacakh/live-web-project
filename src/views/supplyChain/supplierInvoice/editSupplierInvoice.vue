<template>
    <div class="animated fadeIn">
        <b-card header="供应商发票信息">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="发票抬头" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInvoiceInfo.invoiceTitle"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="发票类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="invoiceTypes" v-model="supplierInvoiceInfo.invoiceType"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="税率" label-text-align="right" :label-cols="4">
                        <b-form-input type="number" v-model="supplierInvoiceInfo.taxRate" @change="checkTaxRate"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="备注" label-text-align="right" :label-cols="4">
                        <b-form-textarea :rows="2" v-model.trim="supplierInvoiceInfo.remark"></b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="goBack">取消</b-button>
                        <b-button size="sm" variant="primary" @click="editSupplierInvoiceInfo">确定</b-button>
                    </div>
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
     export default {
         mounted() {
           let _this = this
           _this.getInvoiceCode({
               callback: (invoiceCode) => {
                   _this.$data.supplierInvoiceInfo.invoiceCode = invoiceCode
               }
           })
           _this.getInvoiceTypes()
           _this.$data.supplierInvoiceInfo.supplierCode = _this.$route.params.supplierCode
         },
         data: function() {
             return {
                supplierInvoiceInfo: {
                   invoiceCode: '',
                   invoiceName: '',
                   invoiceTitle: '',
                   invoiceType: '',
                   supplierCode: '',
                   taxRate: 0,
                   remark: ''
                }
             }
         },
         computed: {
           ...mapState('supplierInvoice', [
               'invoiceTypes'
           ])
         },
         methods: {
             editSupplierInvoiceInfo: function() {
                 let _this = this
                 let supplierInvoices = [_this.$data.supplierInvoiceInfo]
                 _this.editSupplierInvoice({
                     supplierInvoices: supplierInvoices,
                     callback: () => {
                         _this.goBack()
                     }
                 })
             },
             goBack: function() {
                 let _this = this
                 _this.$router.go(-1)
             },
             checkTaxRate: function() {
                 let _this = this
                 if (_this.$data.supplierInvoiceInfo.taxRate < 0) {
                     _this.$data.supplierInvoiceInfo.taxRate = 0
                 } else if (_this.$data.supplierInvoiceInfo.taxRate > 1) {
                     _this.$data.supplierInvoiceInfo.taxRate = 1
                 }
             },
             ...mapActions('supplierInvoice', [
                'getInvoiceTypes',
                'getInvoiceCode',
                'editSupplierInvoice'
            ]) 
         },
         components: {

         }
     }
</script>