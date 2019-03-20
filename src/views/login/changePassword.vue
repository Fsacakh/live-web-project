<template>
    <div>
        <!-- <div class="content">
            <div class="oldPassword">
                <div class="tips">原密码&nbsp;:</div>
                <div class="password">
                    <input type="password" placeholder="原密码" v-model="oldpassword"/>
                </div>
            </div>
            <div class="newPassword">
                <div class="tips">新密码&nbsp;:</div>
                <div class="password">
                    <input type="password" placeholder="新密码" v-model="newpassword"/>
                </div>
            </div>
            <div class="makesure">
                <div class="tips">确认密码&nbsp;:</div>
                <div class="password">
                    <input type="password" placeholder="新密码" v-model="surepassword"/>
                </div>
            </div>
            <div class="choice">
                <div class="cancel">
                    <button @click.prevent="cancel">取消</button>
                </div>
                <div class="submit">
                    <button @click.prevent="submit">确认</button>
                </div>
            </div>
        </div> -->
        <b-card>
            <div class="col-md-9 col-lg-9">
                <b-form-fieldset horizontal label="原密码 :" label-text-align="right" :label-cols="4">
                    <b-form-input type="password" v-model="oldLoginPassword" placeholder="" />
                </b-form-fieldset>
            </div>
            <div class="col-md-9 col-lg-9">
                <b-form-fieldset horizontal label="新密码 :" label-text-align="right" :label-cols="4">
                    <b-form-input type="password" v-model="loginPwd" placeholder="" />
                </b-form-fieldset>
            </div>
            <div class="col-md-9 col-lg-9">
                <b-form-fieldset horizontal label="确认新密码 :" label-text-align="right" :label-cols="4">
                    <b-form-input type="password" v-model="surepassword" placeholder="" />
                </b-form-fieldset>
            </div>
            <div class="row mb-2">
                <div class="col-md-9">
                    <div class="pull-right">
                        <!-- <b-button size="sm" variant="failed" class="mr-2" @click.prevent="cancel">取消</b-button> -->
                        <!-- <b-button size="sm" class="" variant="primary" @click.prevent="reset">重置</b-button> -->
                        <b-button size="sm" variant="success" class="mr-2" @click.prevent="submit">确定</b-button>
                    </div>
                    <!-- <div class="pull-right"> -->
                        <!-- <b-button size="sm" variant="failed" @click.prevent="cancel">取消</b-button> -->
                        <!-- <b-button size="sm" class="" variant="primary" @click.prevent="reset">重置</b-button> -->
                        <!-- <b-button size="sm" variant="success" @click.prevent="submit">确定</b-button> -->
                    <!-- </div> -->
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import Vue from 'vue'
    import api from '../../common/api'
    import { MessageBox, Message } from 'element-ui'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        data() {
            return {
                oldLoginPassword: "",
                loginPwd: "",
                surepassword: ""
                }
            },
        computed: {
            ...mapState('login',[
                'page'
            ])
        },
        methods: {
            submit() {
             console.log(this.oldLoginPassword,this.loginPwd,this.surepassword)
                let page = this.page
                if(this.surepassword.length < 6) {
                    Message({
                        type: 'warning',
                        message: "密码长度不能小于6"
                    })
                    return
                }
                if(this.loginPwd === this.surepassword) {
                    api.resetpassword.reset({'loginPasswd': this.loginPwd,'oldLoginPassword': this.oldLoginPassword}, function(res){

                        if(res.data.code === 'login') {
                            console.log("成功",res.data.code)
                            Message({
                                type: 'success',
                                message: "密码修改成功"
                            })
                            setTimeout(function(){
                               // window.location.href = page? page : 'http://local.iris.com:8000/login'
                                window.location.href = "https://www.baidu.com/?tn=sitehao123_15"
                            }, 1000)
                        } else {
                             console.log("失败",res.data.code)
                            Message({
                                type: 'error',
                                message: "密码修改失败"
                            })
                        }
                    })
                }else {
                    Message({
                        type: 'error',
                        message: "新密码两次输入不一致"
                    })
                }

            },
            cancel() {
                window.location.href = this.page? this.page : 'http://local.iris.com:8000/livepro/index'
            },
            reset() {
                this.loginPwd = ""
                this.oldLoginPassword = ""
                this.surepassword = ""
            }
        },
        components: {

        }
    }
</script>

<style scoped lang="css">
    /* .content {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 100px;
        margin: auto;
        width: 400px;
        height: 340px;
        background-color: #ccc;
        padding: 30px;
    }
    .content input {
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 5px;
    }
    .content .choice {
        padding-top: 10px;
        display: flex
    }
    .content .choice>div {
        flex: 1
    }
    .content .tips {
        font-size: 18px;
        padding: 10px 0px;
    }
    .content button {
        padding: 5px 10px;
    }
    .content .submit {
        text-align: right;
    } */
</style>
