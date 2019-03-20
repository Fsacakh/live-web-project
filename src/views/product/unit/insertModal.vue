<template>
    <b-modal @show="showbefor" id="insert" ref="insert" title="新增商品单位" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <b-form-fieldset horizontal label="商品单位名称" :label-cols="4" class="text-right">
                            <b-form-input @input="datachang" :state="unitNameState" v-model="unitName" />
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
    export default {
        components: {},
        data() {
            return {
                unitName: "",
                unitNameState: null
            }
        },
        methods: {
            showbefor() {
                this.unitNameState = ""
            },
            handleOk(evt) {
                const _this = this
                if (_this.unitName) {
                    api.ordinalInfo.getSequence({
                        serviceCode: config.product.commodityUnit.sequence
                    }, (msg) => {
                        if (msg.data.message == "success") {
                            api.product.commodityUnit.updataCommodityUnit([{
                                unitName: _this.unitName,
                                unitCode: msg.data.obj
                            }], (msg) => {
                                if (msg.data.message == 'success') {
                                    _this.unitName = ''
                                    _this.$emit('reQuery')
                                    common.alertInfo('success')
                                } else {
                                    common.alertInfo('warning')
                                }
                            })
                        } else {
                            common.alertInfo('warning')
                        }
                    })
                } else {
                    this.unitNameState = 'invalid'
                    evt.cancel()
                }
            },
            datachang() {
                this.unitNameState = null
            }
        },
        mounted() {
            this.unitNameState = null
            this.unitName = ""
        }
    }
</script>
<style>
    .modal-dialog {
        margin: 80px auto !important;
    }
</style>

