<template>
<div>
    <transition name="fade">
        <div class="msg-wrapper" v-if="show" @click="close">
            <div class="msg-box"  ref="msgBox">
                <div class="msg-title">
                    <strong>{{titleText}}</strong>
                    <div class="pull-right" @click="close">
                        <i class="el-message-box__close el-icon-close"></i>
                    </div>
                </div>
                <div class="msg-content el-message-box__content">
                    <div class="el-message-box__status el-icon-information msg-icon"></div>
                    <div class="el-message-box__message con-style">
                        <p>
                            <span>{{contentText}}</span>
                        </p>
                    </div>
                    <div class="pull-right">
                        <button type="button" class="el-button el-button--default el-button--primary " @click="btn1Click">
                            <span>{{buttonText1}}</span>
                        </button>
                        <button type="button" class="el-button el-button--default el-button--primary " @click="btn2Click">
                            <span>{{buttonText2}}</span>
                        </button>
                    </div>  
                </div>
            </div>
        </div>
    </transition>
    <div class="msg-modal" v-show="show" @click="close"></div>
</div>
</template>
<script>
/**
 *  create by lwx 2018/01/04 
 *  @version 0.0.1
 *  @prop 
 *  @event 
 * 
 */

    export default {
        props: {
            titleText: {
                type: String,
                default: '提示' 
            },
            contentText: {
                type: String,
                default: '内容....' 
            },
            buttonText1: {
                type: String,
                default: '查看今日接待'
            },
            buttonText2: {
                type: String,
                default: '开始接待'
            }
        },
        data() {
            return {
                show: false,
            }
        },
        computed: {
            
        },
        methods: {
            open() {
                this.show = true
            },
            close() {
                this.show = false
            },
            btn1Click() {
                this.close()
                this.$emit('btn1Click')
            },
            btn2Click() {
                this.close()
                this.$emit('btn2Click')
            }
        }
    }
</script>
<style lang="css" scoped>
    .msg-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 2003;
    }
    .msg-box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -80px;
        margin-left: -210px;
        padding: 20px 20px;
        text-align: left;
        display: inline-block;
        vertical-align: middle;
        background-color: #fff;
        width: 420px;
        height: 160px;
        border-radius: 3px;
        font-size: 16px;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .msg-icon {
        margin-left: -20px;
    }
    .con-style {
        margin-left: 30px;
    }
    .msg-modal {
        position: fixed;
        -webkit-transform: translateZ(0);
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
        z-index: 99;
    }

    .fade-enter-active, .fade-leave-active {
        top: 0;
        transition: .2s ease-out;
    }
    .fade-enter, .fade-leave-to {
        top: -300px;
    }
</style>
