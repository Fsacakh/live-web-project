<template>
    <div class="customerContrainers">
        <div class="leftContainerfromCustomer">
            <div class="customerTopic d-f-my-customer">
                <div class="customerTopicLeft f-my-5">
                    <div class="row">
                        <div class="col-md-7">
                            <b-form-fieldset horizontal label="车牌" :label-cols="5" class="text-left">
                                <b-form-select v-model="tempCar" :options="carDatalist" />
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-5">
                            <!-- <b-form-fieldset horizontal label="车牌号码" :label-cols="8" class="text-right"> -->
                                <b-form-input v-model="Carnumber"/>
                            <!-- </b-form-fieldset> -->
                        </div>
                    </div>
                    <div class="row">
                        <!-- <span class="b-c-my-customer p-m-customer-40 smallTriangle">2018年</span>
                        <span class="b-c-my-customer p-m-customer-30 smallTriangle">01月</span>
                        <span class="b-c-my-customer p-m-customer-30 smallTriangle">01日</span> -->
                        <div class="col-md-12 control-el-style">
                            <b-form-fieldset horizontal label="日期" :label-cols="3" class="text-left">
                                <el-date-picker
                                    v-model="tempTime"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </b-form-fieldset>
                        </div>
                    </div>
                </div>
                <div class="customerTopicRight f-my-5">
                    <div class="row">
                        <div class="col-md-12">
                            <b-form-fieldset horizontal label="联系号码" :label-cols="4" class="text-right">
                                <b-form-input v-model="tel"/>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <b-form-fieldset horizontal label="活动名称" :label-cols="4" class="text-right">
                                <b-form-input v-model="actName"/>
                            </b-form-fieldset>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sureOrCancel">
                <span @click="clear">清空</span>
                <span>查询</span>
            </div>
            <div class="recallObj">
                <span>DMS召回对象</span>
            </div>
            <div class="leftContainerfromCustomerTable">
                <ul>
                    <li v-for="(item, index) in tablelist" :key="index">
                        <div class="flex-my-3"><span>18616801689</span></div>
                        <div class="flex-my-2"><span>A+</span></div>
                        <div class="flex-my-3"><span>1月市场活动</span></div>
                        <div class="flex-my-3"><span :class="{'has-relation-background': item.hasRelation === '已联系'}">{{ item.hasRelation }}</span></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="rightContainerfromCustomer" :class="{'rightContainerfromCustomerLeftSpecial': !isShowRight}">
            <div class="rightContainerfromCustomerMain">
                <div class="rightContainerfromCustomerLeft" :class="{'rightContainerfromCustomerLeftSpecial': !isShowRight}">
                    <div class="iconPicTop">
                        <span class="el-icon-arrow-left" v-if="isShowRight" @click="hideRight" style="cursor: pointer;"></span>
                        <span class="el-icon-message" @click="showRight" style="cursor: pointer;"></span>
                    </div>
                    <div class="customInfomation">
                        <div class="customHeadPic">
                            <span>车主</span>
                        </div>
                        <div>
                            <span>Williams</span>
                        </div>
                    </div>
                    <div class="customIntegral">
                        <span>
                            <i>800</i>
                            <i>积分</i>
                        </span>
                        <span>
                            <i>1,600</i>
                            <i>预付卡余额</i>
                        </span>
                        <span>
                            <i>3</i>
                            <i>优惠券</i>
                        </span>
                        <span>
                            <i>5</i>
                            <i>代金券</i>
                        </span>
                    </div>
                    <div class="starLevelA">
                        <div>
                            <span>A+</span>
                            <span>客户星级</span>
                        </div>
                        <div>
                            <span>活跃</span>
                            <span>客户类型</span>
                        </div>
                        <div>
                            <span>高</span>
                            <span>消费指数</span>
                        </div>
                    </div>
                    <div class="customerDetailInfo">
                        <p>车牌: <span>沪AG98765</span></p>
                        <p>车型: 2017款 Macan Turbo 3.6T</p>
                        <p>购车日期: 2017.4.14</p>
                        <p>联系电话: 13245678912</p>
                        <p>VIN码: GN7689DH699YSD</p>
                        <p>里程数: <span>8000KM</span>(更新于2017年12月21日)</p>
                    </div>
                    <div class="customerHistory">
                        <p>历史消费记录</p>
                        <p><span class="el-icon-warning"></span>&nbsp;Tips1: 上次来店时间 <span>2017.5.16</span></p>
                        <p><span class="el-icon-warning"></span>&nbsp;Tips2: 未做项目:发动机舱清洁镀膜、更换雨刷 <span>2017.5.16</span></p>
                        <p><span class="el-icon-warning"></span>&nbsp;Tips3: 战败项目:发动机舱清洁镀膜、更换雨刷 <span>2017.5.16</span></p>
                    </div>
                    <div class="relationRecord">
                        <p>
                            <span><i class="el-icon-circle-cross"></i>&nbsp;新增</span>
                            <span><i class="el-icon-time"></i>&nbsp;转预约</span>
                        </p>
                    </div>
                </div>
                <div v-if="isShowRight" class="rightContainerfromCustomerRight">
                     <div class="rightContainerfromCustomerRightTitle">
                         <span :class="{'currentSpanRight': relation}" @click="toggleClassRight('relation')">联系履历</span>
                         <span :class="{'currentSpanRight': history}" @click="toggleClassRight('history')">维保记录</span>
                         <span></span>
                         <span></span>
                     </div>
                     <div class="rightContainerfromCustomerRightContainer">
                         <!-- <div v-if="relation">联系履历</div>
                         <div v-if="history">维保记录</div> -->
                         <tabhistory v-if="history"></tabhistory>
                         <tabrelation v-if="relation"></tabrelation>
                     </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { DatePicker } from 'element-ui'
    import tabhistory from './customer-tabs/history.vue'
    import tabrelation from './customer-tabs/relation.vue'
    Vue.use(DatePicker)
    export default {
        components: {
            tabhistory,
            tabrelation
        },
        data() {
            return {
                tempTime: '',
                tempCar: '0',
                carDatalist: [{text: '沪', value: '0'},{text: '浙', value: '1'},{text: '豫', value: '2'}],
                tablelist: [{'hasRelation': '未联系'},{'hasRelation': '未联系'},{'hasRelation': '已联系'},{'hasRelation': '已联系'},{'hasRelation': '未联系'}],
                relation: true,
                history: false,
                isShowRight: false,
                tel: '',
                actName: '',
                Carnumber: ''
            }
        },
        methods: {
            toggleClassRight(arg) {
                if(arg === 'relation') {
                    this.relation = true
                    this.history = false
                }else if(arg === 'history') {
                    this.relation = false
                    this.history = true
                }
            },
            showRight() {
                this.isShowRight = true
            },
            hideRight() {
                this.isShowRight = false
            },
            clear() {
                this.tempTime = {}
                this.tempCar = ''
                this.tel = ''
                this.actName = ''
                this.Carnumber = ''
            }
        }
    }
</script>
<style>
    .leftContainerfromCustomer {
        height: 880px;
    }
    .rightContainerfromCustomerLeft {
        height: 880px;
    }
    .control-el-style .el-input__inner {
        border-radius: 3px !important;
    }
    .rightContainerfromCustomerRightContainer {
        padding-top: 10px;
    }
    .rightContainerfromCustomerRightTitle {
        display: flex;
    }
    .rightContainerfromCustomerRightTitle span {
        flex: 1;
        text-align: center;
    }
    .rightContainerfromCustomerRightTitle span:first-child {
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        font-size: 12px;
        border-radius: 3px 0px 0px 3px;
        cursor: pointer;
    }
    .rightContainerfromCustomerRightTitle span:first-child {
        border-right: none;
    }
    .rightContainerfromCustomerRightTitle span:nth-child(2) {
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        font-size: 12px;
        border-radius: 0px 3px 3px 0px;
        cursor: pointer;
    }
    .currentSpanRight {
        background-color: #F8F8F8;
    }
    .rightContainerfromCustomerRight {
        padding: 10px 10px;
    }
    .relationRecord {
        padding-top: 30px;
        padding-bottom: 30px;
        /* border-bottom: 1px solid #E5EEFD; */
    }
    .relationRecord p span {
        float: right;
        font-weight: normal;
        margin-right: 10px;
        
    }
    .relationRecord p span:first-child i {
        color: #587EB9;
    }
    .relationRecord p span:last-child i{
        color: #5FB870;
    }
    .relationRecord p:first-child {
        font-weight: 700;
        height: 20px;
        line-height: 20px;
        padding: 0px;
        margin: 0px;
    }
    .customerHistory {
        padding-top: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #E5EEFD;
    }
    .customerHistory p {
        font-size: 12px;
    }
    .customerHistory p:first-child {
        font-weight: 700;
    }
    .customerHistory p span:first-child {
        color: #FF9A00;
    }
    .customerHistory p span:last-child {
        float: right;
    }
    .customerDetailInfo {
        padding-top: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #E5EEFD;
    }
    .customerDetailInfo p {
        height: 20px;
        line-height: 20px;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        padding-left: 20px;
    }
    .customerDetailInfo p span {
        color: #587EB9;
    }
    .customIntegral {
        display: flex;
        border-top: 1px solid #F2F2F2;
        border-bottom: 1px solid #F2F2F2;
        padding-top: 10px;
        padding-bottom: 10px;
        /* display: flex; */
    }
    .starLevelA {
        padding: 10px 0px;
        height: 80px;
        border-bottom: 1px solid #E5EEFD;
    }
    .starLevelA>div {
        float: left;
        height: 60px;
        width: 27%;
        margin: 0 3%;
        box-shadow: 1px 1px 5px #ccc;
        border-radius: 3px;
    }
    .starLevelA>div span{
        display: inline-block;
        width: 100%;
        padding-left: 10px;
    }
    .starLevelA>div span:first-child {
        height: 40px;
        font-size: 20px;
        line-height: 40px;
        font-weight: bolder;
    }
    .starLevelA>div span:last-child {
        height: 20px;
    }
    .customIntegral span {
        flex: 1;
        /* padding: 10px 5px; */
        /* height: 40px; */
        border-right: 1px solid #EFF2F7;
    }
    .customIntegral span i {
        font-style: normal;
        display: inline-block;
        width: 100%;
        padding-left: 10px;
    }
    .customIntegral span i:first-child {
        font-size: 20px;
        font-weight: border;
    }
    .customIntegral span i:last-child {
        font-size: 12px;
    }
    .customIntegral span:last-child {
        border-right: none;
    }
    .customHeadPic {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        background-color: #EFF2F7;
        margin: 0 auto;
        position: relative;
    }
    .customInfomation>div:nth-child(2) {
        padding: 10px 0px;
        font-size: 18px;
        text-align: center;
    }
    .customHeadPic span {
        position: absolute;
        width: 50px;
        top: 50%;
        right: 0px;
        transform: translate(120%, -50%);
        height: 25px;
        line-height: 25px;
        background-color: #E5EEFD;
        color: #587EB9;
        text-align: center;
    }
    .customHeadPic span::after {
        content: '';
        position: absolute;
        width: 0px;
        height: 0px;
        border-right: 5px solid #E5EEFD;
        border-top: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom:5px solid transparent;
        left: 0px;
        top: 50%;
        transform: translate(-100%, -50%)
    }
    .rightContainerfromCustomer {
        padding-left: 10px;
    }
    .rightContainerfromCustomerMain {
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        /* padding-left: 10px; */
    }
    .rightContainerfromCustomerLeft {
        /* background-color: #fff; */
        flex: 4;
        padding: 10px 10px;
        /* height: 1000px; */
        /* overflow: auto; */
        position: relative;
    }
    .rightContainerfromCustomerLeftSpecial {
        flex: 2 !important;
    }
    .rightContainerfromCustomerLeft::after {
        position: absolute;
        content: '';
        width: 1px;
        height: 98%;
        top: 1%;
        right: 0px;
        background-color: #F2F2F2;
    }
    .rightContainerfromCustomerRight {
        flex: 4;
    }
    .iconPicTop {
        height: 20px;
    }
    .iconPicTop span:first-child {
        float: left;
        margin-top: 5px;
        margin-left: 5px;
    }
    .iconPicTop span:last-child {
        float: right;
        margin-top: 5px;
        margin-right: 5px;
    }
    .customerContrainers {
        display: flex;
    }
    .leftContainerfromCustomer {
        flex: 4;
        padding-top: 20px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
        box-shadow: 1px 1px 5px #ccc;
        background-color: #fff;
    }
    .rightContainerfromCustomer {
        flex: 6;
    }
    .d-f-my-customer {
        display: flex;
    }
    .f-my-5 {
        flex: 1;
    }
    .flex-my-3 {
        flex: 3;
    }
    .flex-my-2 {
        flex: 2;
    }
    .p-m-customer-20 {
        width: 20%;
    }
    .p-m-customer-50 {
        width: 46%;
    }
    .p-m-customer-30 {
        width: 30%;
    }
    .p-m-customer-40 {
        width: 36%;
    }
    .p-m-customer-60 {
        width: 66%;
    }
    .b-c-my-customer {
        background-color: #F8F8F8;
    }
    .customerTopicLeft {
        padding: 10px 0px;
        line-height: 30px;
    }
    .customerTopicRight {
        padding: 10px 0px;
        line-height: 30px;
    }
    .customerTopicLeft div {
        text-align: right;
        /* margin-bottom: 20px; */
    }
    .customerTopicLeft div span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        text-align: left;
        box-sizing: border-box;
        padding-left: 5px;
        border-radius: 3px;
        position: relative;
    }
    .customerTopicRight div {
        /* margin-bottom: 20px; */
    }
    .customerTopicRight div span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        text-align: left;
        box-sizing: border-box;
        padding-left: 5px;
        border-radius: 3px;
        position: relative;
    }
    .smallTriangle::after {
        content: '';
        width: 0px;
        height: 0px;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translate(0, -40%);
        border-top: 5px solid #ccc;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
    .sureOrCancel {
        text-align: right;
        padding-bottom: 20px;
        border-bottom: 1px solid #F8F8F8;
    }
    .sureOrCancel span{
        display: inline-block;
        height: 30px;
        width: 80px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        margin-right: 10px;
    }
    .sureOrCancel span:first-child {
        background-color: #F2F3F5;
        color: #000;
    }
    .sureOrCancel span:last-child {
        background-color: #587EB9;
        color: #fff;
    }
    .recallObj {
        padding-top: 30px;
        padding-bottom: 20px;
    }
    .recallObj span {
        display: inline-block;
        height: 30px;
        width: 100px;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        background-color: #F8F8F8;
        font-size: 13px;
    }
    .leftContainerfromCustomerTable ul{
        padding: 0px;
        margin: 0px;
    }
    .leftContainerfromCustomerTable ul li {
        list-style: none;
        display: flex;
        cursor: pointer;
    }
    .leftContainerfromCustomerTable ul li div {
        height: 80px;
        /* line-height: 80px; */
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;
    }
    .leftContainerfromCustomerTable ul li div span {
        display: inline-block;
        height: 20px;
        width: 40px;
    }
    .leftContainerfromCustomerTable ul li div:nth-child(3) span {
        width: 100%;
    }
    .leftContainerfromCustomerTable ul li div:nth-child(2) span {
        background-color: #587EB9;
        border-radius: 3px;
        color: #fff;
    }
    .has-relation-background {
        background-color: #FFFFFF !important;
        color: #587EB9 !important;
    }
    .leftContainerfromCustomerTable ul li div:nth-child(4) {
        padding-top: 25px;
        padding-bottom: 25px;
    }
    .leftContainerfromCustomerTable ul li>div:nth-child(4)>span {
        height: 30px;
        line-height: 30px;
        width: 80px;
        background-color: #587EB9;
        border-radius: 3px;
        color: #fff;
        font-size: 14px;
        border: 1px solid #E8EAEC;
    }
    /* .leftContainerfromCustomerTable ul li div{
        list-style: none;
        display: flex;
    } */
    .leftContainerfromCustomerTable ul li:nth-child(2n) {
        background-color: #F9F8F8;
    }
</style>

