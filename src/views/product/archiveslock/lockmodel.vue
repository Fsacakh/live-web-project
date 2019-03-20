<template>
    <div class="animated fadeIn">
        <b-modal id="lcokModal" ref="lcokModal" :title="'整车锁定/解锁'" @ok="submit" @cancel="clear" ok-title="确定" cancel-title="取消">
            <div class="row">
                <div class="col-md-10 col-lg-10">
                    <b-form-fieldset horizontal label="锁定类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="lockType" v-model="edit.lockType"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-10">
                    <b-form-fieldset horizontal label="锁定原因:" :label-cols="4" class="text-right">
                            <b-form-textarea
                                v-model="edit.remark"
                                placeholder="请输入．．．"
                                :rows="3"
                                :max-rows="10">
                            </b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import config from '../../../common/config.js'    
    import { MessageBox, Message} from 'element-ui'
    export default {
        props: {
            lockInfo: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            querylockinfo: {
                type: Function,
                default: function() {}
            }
        },
        data() {
            return {
                lockType: config.lockType,
                edit: {
                    lockType: '',
                    skuCode: '',
                    lockingCode: '',
                    remark: ''
                }
            }
        },
        computed: {
            ...mapState('archives', [
                    'lockingCode',
                ]),
        },
        methods: {
            childShowModal: function () {
                this.edit.lockType = '';
                this.edit.remark = '';
                this.$refs.lcokModal.show();
            },
            submit:function() {
                const that = this
                that.edit.lockingCode = that.lockingCode;
                that.edit.skuCode = that.lockInfo.skuCode;
                this.$store.dispatch('archives/editlock', {
                        poros: that.edit,
                        callBack: function (msg) {
                            if (msg.data.code == "success") {
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                                that.querylockinfo();
                            }
                        }
                    })
            },
            clear: function() {
            }
        },
        created() {
            console.log(config.isShowFactory)
        }
    }
</script>
<style>
    .border-none {
        border: none !important;
    }
</style>
