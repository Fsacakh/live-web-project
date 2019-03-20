<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div slot="header">
                    <strong>基本信息</strong>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="客户姓名" :label-cols="4" class="text-right">
                            <b-form-input v-model="maininfo.customName" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="客户性别" :label-cols="4" class="text-right">
                            <b-form-input v-model="maininfo.gender" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="手机号" :label-cols="4" class="text-right">
                            <b-form-input v-model="maininfo.mobilePhone" readonly/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="客户群体" :label-cols="4" class="text-right">
                            <b-form-input v-model="maininfo.customGroup" readonly/>
                        </b-form-fieldset>
                    </div>
                </div>
            </b-card>
            <b-card class="mb-4">
                <div slot="header">
                    <strong>附加字段信息</strong>
                </div>
                <b-tabs pills>
                    <b-tab title="财务信息" active>
                        <finance></finance>
                    </b-tab>
                    <b-tab title="联系人信息">
                        <contacts></contacts>
                    </b-tab>
                    <b-tab title="证件类型信息">
                        <credentials></credentials>
                    </b-tab>
                    <b-tab title="收货信息">
                        <takedelivery></takedelivery>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>
<script>
    import SearchBtn from 'components/searchBtn/searchBtn'
    import Vue from 'vue'
    import api from 'common/api'
    import config from 'common/config'
    import finance from './finance/index'
    import credentials from './credentials/index'
    import contacts from './contacts/index'
    import takedelivery from './takedelivery/index'
    import {
        MessageBox
    } from 'element-ui'
    Vue.component(MessageBox.name, MessageBox)
    export default {
        components: {
            SearchBtn,
            finance,
            credentials,
            contacts,
            takedelivery
        },
        data() {
            return {
                maininfo: {
                    customName: "",
                    gender: "",
                    mobilePhone: "",
                    customGroup: ""
                }
            }
        },
        methods: {},
        mounted() {
            api.clientadmin.clientmaininfo.queryallclientmaininfo({
                customCode: this.$route.params.code
            }, (msg) => {
                if (msg.data.code === 'success') {
                    let data = msg.data.obj;
                    this.maininfo = {
                        customName: data.customName,
                        gender: data.gender === "1" ? "男" : "女",
                        mobilePhone: data.mobilePhone,
                        customGroup: data.customGroupName
                    }
                }
            })
        }
    }
</script>
