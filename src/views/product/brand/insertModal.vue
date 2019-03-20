<template>
    <b-modal @show="showbefor" id="insert" ref="insert" title="新增商品品牌" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <b-form-fieldset horizontal label="商品品牌名称" :label-cols="4" class="text-right">
                            <b-form-input @input="datachang" :state="brandNameState" v-model="brandName" />
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
                brandName: "",
                brandNameState: null
            }
        },
        methods: {
            showbefor() {
                this.brandNameState = ""
            },
            handleOk(evt) {
                if (this.brandName) {
                    api.ordinalInfo.getSequence({
                        serviceCode: config.product.commodityBrand.sequence
                    }, (msg) => {
                        if (msg.data.message == "success") {
                            api.product.commodityBrand.updataCommodityBrand([{
                                brandName: this.brandName,
                                brandCode: msg.data.obj
                            }], (msg) => {
                                if (msg.data.message == 'success') {
                                    this.$emit('reQuery')
                                    this.brandName = ""
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
                    this.brandNameState = 'invalid'
                    evt.cancel()
                }
            },
            datachang() {
                this.brandNameState = null
            }
        },
        mounted() {
            this.brandNameState = null
            this.brandName = ""
        }
    }
</script>
<style>
    .modal-dialog {
        margin: 80px auto !important;
    }
</style>

