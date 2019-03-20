<template>
    <b-modal @show="showbefor" id="updata2" ref="updata" @shown="showmodal" title="编辑证件信息" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="证件号码" :label-cols="4" class="text-right">
                            <b-form-input :state="certificateNumberState" v-model="params.certificateNumber" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="证件类型" :label-cols="4" class="text-right">
                            <b-form-select :state="certificateTypeState" v-model="params.certificateType" :options="certificateType" class="mb-3">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import api from 'common/api'
    import config from 'common/config'
    import common from 'common/common'
    import {
        Message
    } from 'element-ui'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        components: {},
        data() {
            return {
                certificateType: [], //证件类型
                params: {
                    certificateNumber: "", //证件号码
                    certificateType: "", //证件类型
                    certificateCode: "", //证件编码
                    customCode: ""
                },
                certificateNumberState: null,
                certificateTypeState: null
            }
        },
        methods: {
            showbefor() {
                this.certificateNumberState = ""
                this.certificateTypeState = ""
            },
            handleOk(evt) {
                if (!this.params.certificateNumber) {
                    this.certificateNumberState = 'invalid'
                }
                if (!this.params.certificateType) {
                    this.certificateTypeState = 'invalid'
                }
                if (!this.params.certificateNumber || !this.params.certificateType) {
                    evt.cancel()
                    return
                }
                api.clientadmin.clientidtype.updataclientidtype(
                    this.params,
                    (msg) => {
                        if (msg.data.code == 'success') {
                            common.alertInfo("success")
                            this.$store.dispatch("clientmaininfo/queryidtype", this.params.certificateCode)
                            this.params.certificateNumber = "" //证件号码
                            this.params.certificateType = "" //证件类型
                            this.params.certificateCode = "" //证件编码
                        } else {
                            common.alertInfo("warning")
                        }
                    })
            },
            getDataDictionary(refCode, obj) {
                api.ref.getDataDictionary({
                    refCode: refCode
                }).then((msg) => {
                    if (msg.data.message == 'success') {
                        let data = msg.data.obj.referenceDetailInfos || [];
                        for (var i = 0; i < data.length; i++) {
                            this.$set(obj, i, {
                                value: data[i].refDetailCode,
                                text: data[i].refDetailName
                            })
                        }
                    }
                })
            },
            showmodal() {
                if (!this.amendidtypedata) {
                    this.$refs.updata.hide()
                }
            }
        },
        mounted() {
            //获取客户编码
            this.params.customCode = this.$route.params.code
            //获取证件类型
            this.getDataDictionary(config.client.certificateType, this.certificateType)
        },
        computed: {
            ...mapState('clientmaininfo', [
                'amendidtypedata',
            ]),
        },
        watch: {
            amendidtypedata: function() {
                if (this.amendidtypedata) {
                    api.clientadmin.clientidtype.querydetailedclientidtype({
                        certificateCode: this.amendidtypedata,
                    }, (msg) => {
                        if (msg.data.code == 'success') {
                            let data = msg.data.obj
                            this.params = {
                                id: data.id,
                                certificateNumber: data.certificateNumber, //证件号码
                                certificateType: data.certificateType, //证件类型
                                certificateCode: data.certificateCode, //证件编码
                                customCode: data.customCode
                            }
                        }
                    })
                }
            }
        }
    }
</script>
<style>
    .modal-dialog {
        margin: 80px auto !important;
    }
</style>

