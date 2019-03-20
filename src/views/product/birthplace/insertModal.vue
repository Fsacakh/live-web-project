<template>
    <b-modal id="insert" ref="insert" title="新增商品产地" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <b-form-fieldset horizontal label="商品产地" :label-cols="4" class="text-right">
                            <b-form-input v-model="skuAreaName" :state="judgeState"/>
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
    export default {
        components: {},
        data() {
            return {
                skuAreaName: "",
                remark: "",
                judgeState: null
            }
        },
        methods: {
            handleOk(e) {
                const _this = this 
                if(_this.skuAreaName === '') {
                    _this.judgeState = false
                    e.cancel()
                }else {
                    api.ordinalInfo.getSequence({
                        serviceCode: config.product.commodityBirthplace.sequence
                    }, (msg) => {
                        if (msg.data.message == "success") {
                            api.product.commodityBirthplace.updataCommodityBirthplace([{
                                skuAreaName: this.skuAreaName,
                                skuAreaCode: msg.data.obj,
                                remark: this.remark
                            }], (msg) => {
                                if (msg.data.message == 'success') {
                                    _this.judgeState = null
                                    _this.remark = ''
                                    _this.skuAreaName = ''
                                    this.$emit('reQuery')
                                    common.alertInfo('success')
                                } else {
                                    common.alertInfo('warning')
                                }
                            })
                        } else {
                            common.alertInfo('warning')
                        }
                    })
                }
            }
        },
        mounted(){
            this.skuAreaName = "",
            this.remark = ""
        }
    }
</script>
<style>
    .modal-dialog {
        margin: 80px auto !important;
    }
</style>

