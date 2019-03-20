<template>
    <b-modal id="insert" ref="insert" title="新增商品包装" size="lg" @ok="handleOk" @cancel="cancelDown" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <b-form-fieldset horizontal label="商品包装 *" :label-cols="4" class="text-right">
                            <b-form-input @input="datachang" id="input-invalid" :state="judgeState" type="text" v-model="packName" />
                        </b-form-fieldset>
                        <b-form-fieldset horizontal label="备注" :label-cols="4" class="text-right">
                            <b-form-input v-model="remark" />
                        </b-form-fieldset>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import api from '../../../common/api'
    import config from '../../../common/config'
    import common from '../../../common/common'
    import {
        MessageBox,
        Message
    } from 'element-ui'
    export default {
        components: {
        },
        data() {
            return {
                packName: "",
                remark: "",
                judgeState: null
            }
        },
        computed: {
            checkInput() {
                return this.packName.length > 0 ? null : false
            }
        },
        methods: {
            handleOk(e) {
                const _this = this
                if (_this.packName === '') {
                    _this.judgeState = false
                    e.cancel()
                } else {
                    this.judgeState = null
                    e.cancel()
                    api.ordinalInfo.getSequence({
                        serviceCode: config.product.commodityPack.sequence
                    }, (msg) => {
                        if (msg.data.message == "success") {
                            api.product.commodityPack.updataCommodityPack([{
                                packName: _this.packName,
                                packCode: msg.data.obj,
                                remark: _this.remark
                            }], (msg) => {
                                if (msg.data.message == 'success') {
                                    _this.judgeState = null
                                    _this.remark = ''
                                    _this.packName = ''
                                    _this.$emit('reQuery')
                                    common.alertInfo('success')
                                } else {
                                    common.alertInfo('warning')
                                }
                            })
                            _this.$refs.insert.hide()
                        } else {
                            common.alertInfo('warning')
                        }
                    })
                }
            },
            datachang() {
                this.judgeState = null
            },
            cancelDown() {
                this.judgeState = null
            }
        },
        mounted() {
            this.packName = ""
            this.remark = ""
            this.judgeState = null
        }
    }
</script>
<style lang="scss" scoped>
    .modal-dialog {
        margin: 80px auto !important;
    }
</style>

