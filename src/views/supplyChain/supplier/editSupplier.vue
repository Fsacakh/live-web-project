<template>
    <div class="animated fadeIn">
        <b-card header="供应商信息">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="供应商名称*" label-text-align="right" :label-cols="4">
                        <b-form-input :state="supplierNameState" v-model.trim="supplierInfo.supplierName"></b-form-input>
                        <b-form-feedback>
                            供应商名称不可为空！
                        </b-form-feedback>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="供应商类型" label-text-align="right" :label-cols="4">
                        <b-form-select :state="supplierTypeState" :options="supplierTypes" v-model="supplierInfo.supplierType"></b-form-select>
                        <b-form-feedback>
                            供应商类型不可为空！
                        </b-form-feedback>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="采购区域" label-text-align="right" :label-cols="4">
                        <treepicker :name="purchasingAreaName" :load="loadPurchaseData" :clearButton="true" placeholder="选择采购区域" @node-click="getPurchaseData"></treepicker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="邮编" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInfo.postCode"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="税号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInfo.dutyParagraph"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="邓白氏编码" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInfo.dbEncoding"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="发票抬头" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInfo.invoiceTitle"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="银行账号" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInfo.bankAccount"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="开户行地址" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInfo.bankAddress"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="开户行名称" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInfo.bankName"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="公司电话" label-text-align="right" :label-cols="4">
                        <b-form-input type="tel" v-model.trim="supplierInfo.compPhone"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="联系人" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInfo.contactName"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="联系人手机" label-text-align="right" :label-cols="4">
                        <b-form-input type="tel" v-model.trim="supplierInfo.contactMobile" v-on:blur="telChange(supplierInfo.contactMobile, $event,'phoneFail')" @change="telChange(supplierInfo.contactMobile, $event,'phoneFail')"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="联系人电话" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInfo.contactPhone"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="联系人传真" label-text-align="right" :label-cols="4">
                        <b-form-input v-model.trim="supplierInfo.contactFax"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="联系人性别" label-text-align="right" :label-cols="4">
                        <b-form-select :options="sexes" v-model.trim="supplierInfo.contactSex"></b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="是否合同供应商" label-text-align="right" :label-cols="4">
                        <b-form-select :options="contractSupplierFlags" v-model="supplierInfo.contractSupplierFlag"></b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="供应商简介" label-text-align="right" :label-cols="4">
                        <b-form-textarea v-model.trim="supplierInfo.supplierDesc"></b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="备注" label-text-align="right" :label-cols="4">
                        <b-form-textarea  v-model.trim="supplierInfo.remark"></b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="goBack">取消</b-button>
                        <b-button v-if="!isUpdate" size="sm" variant="success" @click="addSupplierInfo">创建</b-button>
                        <b-button v-else size="sm" variant="primary" @click="editSupplierInfo">确定</b-button>
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
    import api from "../../../common/api";
    import common from "../../../common/common.js";
    import config from '../../../common/config'
    import treepicker from '../../../components/iris-treepicker'
    import { Message } from 'element-ui'
    export default {
        mounted() {
            let _this = this
            _this.getSupplierTypes()
            if(_this.isUpdate) {
               let supplierCode = _this.$route.params.supplierCode
               _this.getSupplierInfoByCode({
                   supplierCode: supplierCode,
                   callback: (supplierInfo) => {
                       _this.$data.supplierInfo = supplierInfo
                       if (supplierInfo.purchasingAreaCode !=null && supplierInfo.purchasingAreaCode !='') {
                            _this.getPurchasingAreaInfoByAreaCode({
                                areaCode: supplierInfo.purchasingAreaCode
                            })
                       }
                   }
               })
            } else {
               _this.getSupplierCode({
                   callback: (supplierCode) => {
                       _this.$data.supplierInfo.supplierCode = supplierCode
                   }
               })
            }
        },
        data: function() {
            return {
                supplierInfo: {
                    supplierCode: '',
                    supplierName: '',
                    supplierType: '',
                    purchasingAreaCode: '',
                    postCode: '',
                    dutyParagraph: '',
                    dbEncoding: '',
                    invoiceTitle: '',
                    bankAccount: '',
                    bankAddress: '',
                    bankName: '',
                    compPhone: '',
                    contactName: '',
                    contactMobile: '',
                    contactPhone: '',
                    contactFax: '',
                    contactSex: '',
                    contractSupplierFlag: '',
                    supplierDesc: '',
                    remark: ''
                },
                sexes: [{
                        value: 0,
                        text: '男'
                    },
                    {
                        value: 1,
                        text: '女'
                    }
                ],
                contractSupplierFlags: [{
                        value: 0,
                        text: '不是'
                    },
                    {
                        value: 1,
                        text: '是'
                    }
                ],
                supplierNameState: null,
                supplierTypeState: null,
            }
        },
        computed: {
            ...mapState('supplier', [
                'purchasingAreaName',
                'supplierTypes',
            ]),
            isUpdate: function() {
                let supplierCode = this.$route.params.supplierCode
                if(supplierCode != null && supplierCode != '') {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            goBack: function() {
                this.$router.go(-1)
            },
            addSupplierInfo: function() {
                let _this = this
                if(_this.checkValues()) {
                   _this.insertSupplierInfo({
                       supplierInfo: _this.supplierInfo,
                       callback: () => {
                           _this.goBack()
                       }
                   })
                }
            },
            editSupplierInfo: function() {
                let _this = this
                if(_this.checkValues()) {
                   _this.updateSupplierInfo({
                       supplierInfo: _this.supplierInfo,
                       callback: () => {
                        //    _this.goBack()
                       }
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
            getPurchaseData: function(data) {
                let _this = this
                _this.$data.supplierInfo.purchasingAreaCode = data.code
            },
            checkValues: function() {
                let _this = this
                if(!common.isTel(_this.supplierInfo.contactMobile)){
                    Message.error(config.messInfo['phoneFail']);
                    return false
                }
                if(_this.supplierInfo.supplierName == '') {
                    _this.supplierNameState = 'invalid'
                    return false
                } else {
                    _this.supplierNameState = null
                }
                if(_this.supplierInfo.supplierType == '') {
                   _this.supplierTypeState = 'invalid'
                   return false
                } else {
                   _this.supplierTypeState = null
                }
                return true
            },
            // 号码输入事件
            telChange(val, event,type) {
                this.checkMobile(val,type);
            },
            // 手机号码验证
            checkMobile(val,type) {
                if (!common.isTel(val)) {
                    Message.error(config.messInfo[type]);
                    return false;
                }
            },
            ...mapActions('supplier', [
                'insertSupplierInfo',
                'updateSupplierInfo',
                'getSupplierTypes',
                'getSupplierCode',
                'getSupplierInfoByCode',
                'getSalesAreaInfoByAreaCode',
                'getPurchasingAreaInfoByAreaCode'
            ])
        },
        components: {
            treepicker
        }
    }
</script>
