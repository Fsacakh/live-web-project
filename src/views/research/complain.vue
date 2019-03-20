<!-- 点击任务页面的调研状态明细 -->
<template>
    <div class="animated fadeIn">
        <b-modal id="complain" ref="complain" :title="'投诉记录'" hide-footer @cancel="clear">
            <div class="row">
                <div class="col-md-10">
                    <b-form-fieldset horizontal label="客户姓名:" :label-cols="4" class="text-right">
                        <div class="text-left form-control border-none">{{taskComplainInfoVo.custName}}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-10">
                    <b-form-fieldset horizontal label="客户电话:" :label-cols="4" class="text-right">
                        <div class="text-left form-control border-none">{{taskComplainInfoVo.custMobilePhone}}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-10">
                    <b-form-fieldset horizontal label="销售顾问:" :label-cols="4" class="text-right">
                        <div class="text-left form-control border-none">{{taskComplainInfoVo.leadLastSaName}}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-10">
                    <b-form-fieldset horizontal label="投诉对象:" :label-cols="4" class="text-right">
                        <b-form-input placeholder="请输入" v-model="taskComplainInfoVo.empName" :state="checkout.empName"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-10">
                    <b-form-fieldset horizontal label="投诉内容:" :label-cols="4" class="text-right">
                            <b-form-textarea
                                :state="checkout.complainInfo"
                                v-model="taskComplainInfoVo.complainInfo"
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
                taskComplainInfoVo: {
                    complainInfo: '',
                    empName: '',
                    custName: '',
                    custMobilePhone: '',
                    leadLastSaName: '',
                    taskCode: '',
                },
                checkout: {
                    empName: null,
                    complainInfo: null
                },
            }
        },
        computed: {
            ...mapState('research', [
                'taskInfo',
            ]),
            $empName: function() {
                return this.taskComplainInfoVo.empName
            },
            $complainInfo: function() {
                return this.taskComplainInfoVo.complainInfo
            },
            btnds: function() {
                if (this.taskInfo.taskStatusCode!='taskStatusSucc') {
                    if(this.taskInfo.taskStatusCode!='taskStatusFail') {
                        return true
                    }
                }
            }
        },
        watch: {
            $empName: function() {
                if(this.taskComplainInfoVo.empName!='') {
                    this.checkout.qaName = null;
                }
            },
            $complainInfo: function() {
                if(this.taskComplainInfoVo.complainInfo!='') {
                    this.checkout.qaName = null;
                }
            }
        },
        methods: {
            showModal: function () {
                this.$refs.complain.show();
                this.taskComplainInfoVo.taskCode = this.taskInfo.taskCode
                this.taskComplainInfoVo.custName = this.taskInfo.custName
                this.taskComplainInfoVo.custMobilePhone = this.taskInfo.custMobilePhone
                this.taskComplainInfoVo.leadLastSaName = this.taskInfo.leadLastSaName
                if(this.taskInfo.taskComplainInfoVo != null) {
                    this.taskComplainInfoVo.complainInfo = this.taskInfo.taskComplainInfoVo.complainInfo
                    this.taskComplainInfoVo.empName = this.taskInfo.taskComplainInfoVo.empName
                }
                
            },
            hideMadel() {
                this.$refs.complain.hide();
            },
            submit:function() {
                const $this = this
                let jude = this.taskComplainInfoVo.empName == '' || this.taskComplainInfoVo.complainInfo == ''
                if(jude) {
                    let check =  {
                        empName: this.$empName,
                        complainInfo: this.$complainInfo
                    }
                    for(let i in check) {
                        if (check[i] != '') {
                            $this.checkout[i] = null;
                        } else {
                            $this.checkout[i] = false;
                        }
                    }
                    Message({
                        type: 'warning',
                        message: config.messInfo.qaInfo
                    });
                } else {
                    this.$emit('complain', this.taskComplainInfoVo)
                    this.$refs.complain.hide()
                }
            },
            clear: function() {}
        }
    }
</script>