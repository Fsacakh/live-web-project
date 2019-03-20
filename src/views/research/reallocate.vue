<template>
    <div class="animated fadeIn">
        <b-modal id="reallocate" ref="reallocate" :title="'重新分配'" hide-footer>
            <div class="row">
                <div class="col-md-10">
                    <b-form-fieldset horizontal label="客户姓名:" :label-cols="4" class="text-right">
                        <div class="text-left form-control border-none">{{taskInfo.custName}}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-10">
                    <b-form-fieldset horizontal label="客户电话:" :label-cols="4" class="text-right">
                        <div class="text-left form-control border-none">{{taskInfo.custMobilePhone}}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-10">
                    <b-form-fieldset horizontal label="销售顾问:" :label-cols="4" class="text-right">
                        <div class="text-left form-control border-none">{{taskInfo.leadLastSaName}}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-10">
                    <b-form-fieldset horizontal label="重新分配原因:" :label-cols="4" class="text-right">
                            <b-form-textarea
                            :state="status"
                            v-model="reassignReason"
                                placeholder="请输入．．．"
                                :rows="3"
                                :max-rows="10">
                            </b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mb-3 text-right" v-if="btnds">
                    <b-button @click="hideMadel()">取消</b-button>
                    <b-button variant="primary" @click="submit()">确定</b-button>
                </div>
                <div class="col-md-12 mb-3 text-right" v-else>
                    <b-button @click="hideMadel()">关闭</b-button>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import { MessageBox, Message} from 'element-ui'
    import config from 'common/config.js'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                reassignReason: '',
                status: null
            }
        },
        computed: {
            ...mapState('research', [
                'taskInfo',
            ]),
            btnds: function() {
                if (this.taskInfo.taskStatusCode!='taskStatusSucc') {
                    if(this.taskInfo.taskStatusCode!='taskStatusFail') {
                        return true
                    }
                }
            }
        },
        watch: {
          reassignReason: function() {
              if(this.reassignReason != '') {
                  this.status = null
              }
          }  
        },
        methods: {
            showModal: function (val) {
                this.reassignReason = this.taskInfo.reassignReason || val
                this.$refs.reallocate.show()
            },
            hideMadel() {
                this.$refs.reallocate.hide()
            },
            submit:function() {
                if(this.reassignReason=='') {
                    this.status = false
                    Message({
                        type: 'warning',
                        message: config.messInfo.qaInfo
                    });
                } else {
                    this.$emit('reassign', this.reassignReason)
                    this.$refs.reallocate.hide()
                }
            },
            clear: function() {}
        }
    }
</script>
<style>
    .border-none {
        border: none !important;
    }
</style>
