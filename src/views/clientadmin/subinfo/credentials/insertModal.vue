<template>
    <b-modal @show="showbefor" id="insert2" ref="insert" title="新增证件信息" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
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
               this. certificateNumberState= ""
                this.certificateTypeState= ""
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
                //获取编码
                api.ordinalInfo.getSequence({
                    serviceCode: config.client.clientidtype
                }, (msg) => {
                    if (msg.data.code == 'success') {
                        this.params.certificateCode = msg.data.obj
                        api.clientadmin.clientidtype.addclientidtype(this.params, (msg) => {
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
        },
        mounted() {
            //获取客户编码
            this.params.customCode = this.$route.params.code
            //获取证件类型
            this.getDataDictionary(config.client.certificateType, this.certificateType)
        },
    }
</script>
<style>
    .modal-dialog {
        margin: 80px auto !important;
    }
</style>

