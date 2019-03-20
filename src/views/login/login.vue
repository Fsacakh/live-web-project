<template>
    <div class="container">
        <div class="content">
            <div class="title">
                <h3>iris汽车智能服务平台</h3>
            </div>
            <div class="contentForm">
                <div class="skip">
                    <router-link to="/nav" tag="a">跳转到</router-link>
                </div>
                <div class="contentTitle">
                    <h4>Login to your account</h4>
                </div>
                <div class="username">
                    <i class="userHeader"></i>
                    <input type="text" placeholder="user" v-model="username"  @keyup.enter="login"/>
                </div>
                <div class="password">
                    <i class="userPass"></i>
                    <input type="password" placeholder="password" v-model="password"  @keyup.enter="login"/>
                </div>
                <div class="login">
                    <button @click.prevent="login">登录</button>
                </div>
            </div>
            <div class="copyRight">
                <p>2017 &copy; 润雅信息技术（上海）有限公司 版权所有</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { MessageBox, Message } from 'element-ui'
    import api from '../../common/api'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                username: "",
                password: ""
            }
        },
        computed: {
            ...mapState('login', [
                'page'
            ])
        },
        methods: {
            login() {
                let page = this.page
                if(this.password === '') {
                    Message({
                        type: 'error',
                        message: "密码不能为空"
                    })
                }else if(this.username === '') {
                    Message({
                        type: 'error',
                        message: "用户名不能为空"
                    })
                }else {
                    api.login.login({'loginName': this.username, 'loginPasswd': this.password}, function(res){
                        // console.log(res)
                        if(res.data.code === 'success'){
                            Message({
                                type: 'success',
                                message: "登录成功"
                            })
                            setTimeout(function(){
                                window.location.href = page? page: 'http://local.iris.com:8000/dashboard'
                            }, 500)
                        } else {
                            Message({
                                type: 'error',
                                message: "用户名或密码错误"
                            })
                        }
                    })
                }
                // console.log(this.username,this.password)
                // if(this.username === "system" && this.password === "system"){
                //     // console.log(window.location)
                //     window.location.href = "http://local.iris.com:8000/index"
                // }else {
                //     Message({
                //         type: 'error',
                //         message: "用户名或密码错误"
                //     })
                // }
            }
        },
        components: {

        }
    }
</script>

<style lang="css">
    body {
        background-image: url("./../../../static/login_img/1.jpg");
        background-size: cover;
        animation: changePicture 10s infinite alternate;
    }
    /* .container {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: #2468a2;
    } */
    .content {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 300px;
        margin: auto;
        width: 340px;
        height: 270px;
        padding: 30px;
        /* border-radius: 10px; */
        background-color: rgba(255,255,255,.2)
    }
    .content .title {
        position: absolute;
        left: 50%;
        top: 0;
        width: 100%;
        /* transform: translate(-50%, 50%); */
        transform: translate(-50%, -150%)
    }
    .content .title h3 {
        padding: 0px;
        margin: 0px;
        text-align: center;
        color: #fff;
    }
    .content .contentForm {
        margin-top: 20px;
        position: relative;
        /* background-color: #777 */
    }
    .content .contentForm .contentTitle h4 {
        padding: 0px;
        margin: 0px;
        text-align: center;
        color: #fff;
    }
    .content .contentForm .username {
        margin-top: 20px;
        position: relative;
    }
    .content .contentForm .username .userHeader {
        position: absolute;
        left: 5px;
        top: 2px;
        width: 25px;
        height: 25px;
        background-image: url("./../../../static/login_img/user1.png");
        background-size: 100%;
    }
    .content .contentForm .username input {
        outline: none;
        width: 100%;
        /* border-radius: 20px; */
        border: none;
    }
    .content .contentForm .password {
        margin-top: 20px;
        position: relative;
    }
    .content .contentForm .password .userPass {
        position: absolute;
        left: 5px;
        top: 4px;
        width: 25px;
        height: 25px;
        background-image: url("./../../../static/login_img/lock2.png");
        background-size: 100%;
    }
    .content .contentForm .password input {
        outline: none;
        width: 100%;
        /* border-radius: 20px; */
        border: none;
    }
    .content .contentForm .login {
        margin-top: 20px;
        text-align: right;
    }
    .content .contentForm .login button {
        padding: 5px 10px;
        /* border-radius: 20%; */
        outline: none;
        border: none;
    }
    .content input {
        height: 34px;
        line-height: 34px;
        padding: 2px 0px;
        padding-left: 35px;
    }
    .contentForm .skip {
        position: absolute;
        bottom: 0px;
        left: 0px;
    }
    .content .copyRight {
        text-align: center;
        position: absolute;
        width: 100%;
        left: 50%;
        bottom: 0;
        transform: translate(-50%,130%)
    }
    .content .copyRight p {
        font-size: 12px;
    }
    @keyframes changePicture {
        from { background-image: url('./../../../static/login_img/1.jpg') }
        to { background-image: url('./../../../static/login_img/2.jpg') }
    }
</style>
