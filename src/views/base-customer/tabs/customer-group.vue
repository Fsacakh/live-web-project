<template>
    <div class="flexContainer">
        <div class="jichuContainer">
            <div class="row weekStyle-control">
                <div class="col-md-3">
                    <!-- <b-form-fieldset horizontal label="车牌" :label-cols="5" class="text-left"> -->
                        <b-form-select v-model="weekValue" :options="weekOption" />
                    <!-- </b-form-fieldset> -->
                </div>
            </div>
            <div>
                <div class="jichukequnTopic">基础客群</div>
                <div class="jichukequn">
                    <div class="controlpaddingright" v-for="(item, index) in baseCustomlist" :key="index">
                        <div @click="chooseItemofBase(index)">
                            <span :class="{'spanBackground': index === currentBase }">{{ item.number }}</span>
                            <span :class="{'spanBackground': index === currentBase }">{{ item.text }}</span>
                        </div>
                    </div>
                </div>
                <div class="jichukequnTopic">计划定制</div>
                <div class="jihuadingzhi">
                    <div @click="chooseItemofPlan(index)" class="controlpaddingright" v-for="(item, index) in planCustomlist" :key="index">
                        <div>
                            <span :class="{'spanBackground': index === currentPlan }">{{ item.number }}</span>
                            <span :class="{'spanBackground': index === currentPlan }">{{ item.text }}</span>
                        </div>
                    </div>
                    <div class="controlpaddingright">

                    </div>
                    <div class="controlpaddingright">

                    </div>
                    <div class="controlpaddingright">

                    </div>
                    <div class="controlpaddingright">

                    </div>
                    <div class="controlpaddingright">

                    </div>
                </div>
                <div class="jichukequnTopic">
                    <div>上周数据</div>
                    <div style="color: #8FA3BA">CGR Data <a href="javascript:;">Last Week</a></div>
                </div>
                
                <div class="my-special-table">
                    <ul>
                        <li>
                            <div>生成日期</div>
                            <div>批次</div>
                            <div>用户类型</div>
                            <div>TOTAL</div>
                            <div>招揽完成度</div>
                        </li>
                        <li v-for="(item, index) in datalist" :key="index">
                            <div>2019/04/20</div>
                            <div>FT1001</div>
                            <div class="starRate">
                                <el-rate
                                :value="item.rateValue"
                                disabled
                                show-text
                                text-color="#ff9900"
                                text-template="{value}">
                                </el-rate>
                            </div>
                            <div>795</div>
                            <div class="progressSpecial">
                                <!-- <el-progress :text-inside="true" :stroke-width="12" :percentage="80" status="success"></el-progress> -->
                                <el-progress :percentage="70"></el-progress>
                            </div>
                        </li>
                    </ul>
                    <div class="changePageButton">
                        <span class="el-icon-arrow-left"></span>
                        <span @click="chooseChangeItem('1')" :class="{'changeBtn-background': btnArg === '1'}">1</span>
                        <span @click="chooseChangeItem('2')" :class="{'changeBtn-background': btnArg === '2'}">2</span>
                        <span @click="chooseChangeItem('3')" :class="{'changeBtn-background': btnArg === '3'}">3</span>
                        <span @click="chooseChangeItem('4')" :class="{'changeBtn-background': btnArg === '4'}">4</span>
                        <span @click="chooseChangeItem('5')" :class="{'changeBtn-background': btnArg === '5'}">5</span>
                        <span class="el-icon-arrow-right"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="jichuContainer">
            <div class="topPici">
                <div>
                    <span>生成批次FT001</span>
                    <div class="input-container">
                        <div class="select-every">车型</div>
                        <div class="select-every">手机号</div>
                        <div class="select-every">用户名</div>
                        <div class="select-every">2018-03-01至03-28</div>
                    </div>
                </div>
                <div class="inStoreTable">
                    <ul>
                        <li>
                            <div class="checkBox-yuan"><span></span>&nbsp;&nbsp;全选</div>
                            <div>用户名</div>
                            <div>车牌</div>
                            <div>上次到店时间</div>
                            <div>上次到店里程</div>
                            <div>分配类型</div>
                        </li>
                        <li v-for="(item, index) in instoreData" :key="index">
                            <div class="checkBox-yuan"><span></span></div>
                            <div class="control-user-name">崇大师</div>
                            <div>沪A88976</div>
                            <div>2017/12/14</div>
                            <div>10,000</div>
                            <div>末次接待SA</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bottomPici">
                <div class="bottomPiciLeft">
                    <div class="bottomPicipubContainer">
                        <div class="containersTabs">
                            <span class="chooseFirstSpan">按类型分配</span>
                            <span>按人员配额</span>
                            <span class="b-n"></span>
                        </div>
                        <div class="containerOptions">
                            <div class="titleTop titleTopSelect c-t">
                                Search Label
                            </div>
                            <div class="titleTop">
                                末次接待SA
                            </div>
                            <div class="titleTop">
                                专属服务顾问
                            </div>
                            <div class="titleTop">
                                等值自由分配
                            </div>
                            <div class="titleTop">
                                按SA名单顺序分配
                            </div>
                        </div>
                        <div class="sureButton">
                            确定
                        </div>
                    </div>
                </div>
                <div class="bottomPiciRight">
                    <div class="bottomPicipubContainer">
                        <div class="containerOptions">
                            <div class="titleTop c-t">
                                SA名单选择
                            </div>
                            <div class="titleTop c-t m-t-5-my">
                                SA001
                            </div>
                            <div class="titleTop c-t m-t-5-my c-b-my">
                                SA002
                            </div>
                            <div class="titleTop c-t m-t-5-my">
                                SA003
                            </div>
                            <div class="titleTop c-t m-t-5-my">
                                SA004
                            </div>
                        </div>
                        <div class="sureButton">
                            确定
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Rate, Progress} from 'element-ui'
    Vue.use(Rate)
    Vue.use(Progress)
    export default {
        data() {
            return {
                weekValue: 1,
                weekOption: [{text: '下一周', value: 1},{text: '上一周', value: 0}],
                carArray: [],
                datalist: [{'brandCode': 1, rateValue: 2.5},{'brandCode': 1, rateValue: 3.5},{'brandCode': 1, rateValue: 2.8},{'brandCode': 1, rateValue: 3.5},{'brandCode': 1, rateValue: 2.5},{'brandCode': 1, rateValue: 4.5},{'brandCode': 1, rateValue: 3.8}],
                instoreData: [{},{},{},{},{},{}],
                currentBase: 0,
                currentPlan: '',
                btnArg: '1',
                baseCustomlist: [
                    {
                        number: '856',
                        text: '保养到期'
                    },
                    {
                        number: '256',
                        text: '保修到期'
                    },
                    {
                        number: '13',
                        text: '配件到货'
                    },
                    {
                        number: '暂无',
                        text: '事故短信'
                    },
                    {
                        number: '暂无',
                        text: '市场活动'
                    },
                    {
                        number: '暂无',
                        text: 'DMS召回'
                    },
                    {
                        number: '856',
                        text: '保养到期'
                    },
                ],
                planCustomlist: [
                    {
                        number: '483',
                        text: '自定义内容'
                    },
                    {
                        number: '32',
                        text: '自定义内容'
                    }
                ]
            }
        },
        computed: {
            // retrunChooseBase(index) {
            //     if(index === this.currentBase) {
            //         return true
            //     }else {
            //         return false
            //     }
            // }
        },
        methods: {
            chooseItemofBase(index) {
                this.currentBase = index
            },
            chooseItemofPlan(index) {
                this.currentPlan = index
            },
            chooseChangeItem(arg) {
                this.btnArg = arg
            }
        }
    }
</script>
<style>
    .weekStyle-control {
        padding-top: 20px;
    }
    .jichuContainer {
        padding-top: 30px;
    }
    .flexContainer {
        display: flex;
    }
    .flexContainer>div:first-child {
        flex: 6;
    }
    .flexContainer>div:nth-child(2) {
        flex: 5;
    }
    .jichukequn {
        display: flex;
    }
    .jichukequn>div {
        flex: 1;
    }
    .jichukequn>div.controlpaddingright span {
        display: block;
        text-align: center;
    }
    .jichukequn>div span:first-child {
        font-family: PingFangSC-Semibold;
        font-size: 17px;
        color: #48576A;
    }
    .jichukequn>div span:last-child {
        font-size: 12px;
        color: #48576A;
    }
    .jichukequn .controlpaddingright {
        padding-right: 10px;
    }
    .jichukequn .controlpaddingright:last-child {
        padding-right: 0px;
    }
    .jichukequn>div.controlpaddingright div {
        box-shadow: 1px 2px 5px #ccc;
        border-radius: 5px;
        cursor: pointer;
    }
    .jichukequn>div.controlpaddingright div span:first-child{
        border-radius: 5px 5px 0px 0px;
    }
    .spanBackground {
        background-color: #587EB9;
        color: #fff !important;
    }
    .jichukequn>div.controlpaddingright div span:last-child{
        /* background-color: #587EB9; */
        border-radius: 0px 0px 5px 5px;
        /* color: #fff !important; */
    }
    .jihuadingzhi {
        display: flex;
    }
    .jihuadingzhi>div {
        flex: 1;
        cursor: pointer;
    }
    .jihuadingzhi>div.controlpaddingright span {
        display: block;
        text-align: center;
        /* cursor: pointer; */
    }
    .jihuadingzhi>div span:first-child {
        font-family: PingFangSC-Semibold;
        font-size: 17px;
        color: #48576A;
    }
    .jihuadingzhi>div span:last-child {
        font-size: 12px;
        color: #48576A;
    }
    .jihuadingzhi .controlpaddingright {
        padding-right: 10px;
    }
    .jihuadingzhi>div.controlpaddingright div {
        box-shadow: 1px 2px 5px #ccc;
        border-radius: 5px;
    }
    .jihuadingzhi>div.controlpaddingright div span:last-child{
        /* background-color: #587EB9; */
        border-radius: 0px 0px 5px 5px;
        /* color: #fff !important; */
    }
    .jihuadingzhi>div.controlpaddingright div span:first-child{
        /* background-color: #587EB9; */
        border-radius: 5px 5px 0px 0px;
        /* color: #fff !important; */
    }
    .my-special-table {
        box-shadow: 1px 1px 5px #F2F2F2;
        border-radius: 5px;
        padding-bottom: 10px;
    }
    .my-special-table ul {
        padding-left: 0px;
        border-radius: 5px;
    }
    .my-special-table ul li {
        display: flex;
        height: 34px;
        border-bottom: 1px solid #F2F2F2;
        border-top: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
        /* box-sizing: border-box; */
        padding: 7px 0px;
    }
    .my-special-table ul li:hover {
        border: 1px solid #1FB6FF;
    }
    .my-special-table ul li:first-child:hover {
        border-bottom: 1px solid #F2F2F2;
        border-top: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
    }
    .my-special-table ul li>div {
        flex: 1;
        height: 20px;
        line-height: 20px;
        text-align: center;
    }
    .my-special-table ul li div {
        border-right: 1px solid #F2F2F2;
    }
    .my-special-table ul li div:last-child {
        border-right: none;
    }
    .my-special-table ul li>div:nth-child(4) {
        color: #587EB9;
    }
    .my-special-table ul li:first-child>div:nth-child(4) {
        color: #48576A;
    }
    .my-special-table ul li:first-child div {
        border-right: none;
    }
    .changePageButton {
        width: 224px;
        margin: 0 auto;
        height: 32px;
        display: flex;
    }
    .changePageButton span {
        /* display: inline-block; */
        /* width: 32px; */
        flex: 1;
        height: 32px;
        text-align: center;
        line-height: 32px;
        border-radius: 3px;
        cursor: pointer;
    }
    .changePageButton span:nth-child(2) {
        /* background-color: #587EB9; */
        /* color: #fff; */
    }
    .changeBtn-background {
        background-color: #587EB9;
        color: #fff
    }
    .jichuContainer:first-child {
        border-right: 2px solid #F2F2F2;
        padding: 0px 10px;
    }
    .jichuContainer:last-child {
        padding: 10px 10px 0px;
    }
    .topPici {
        padding: 10px;
        border-radius: 5px;
        /* height: 36px; */
        box-shadow: 1px 2px 5px #ccc;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #48576A;
        letter-spacing: 0;
    }
    .input-container {
        float: right;
        height: 36px;
    }
    .select-every {
        display: inline-block;
        padding-right: 20px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        background-color: #F5F5F5;
        border: 1px solid #ccc;
        border-radius: 3px;
        position: relative;
        padding-left: 5px;
    }
    .select-every::after {
        content: '';
        position: absolute;
        height: 0px;
        width: 0px;
        right: 2px;
        top: 50%;
        transform: translate(0, -30%);
        border-top: 5px solid #48576A;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
    .inStoreTable {
        padding-top: 30px;
    }
    .inStoreTable ul {
        padding: 0px;
        margin: 0px;
        border: 1px solid #F2F2F2;
        border-radius: 5px;
    }
    .inStoreTable ul li {
        display: flex;
        height: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid #F2F2F2;
    }
    .inStoreTable ul li:last-child {
        border-bottom: none;
    }
    .inStoreTable ul li div {
        flex: 1;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-right: 1px solid #F2F2F2;
    }
    .inStoreTable ul li div:last-child {
        border-right: none;
    }
    .topSelect {
        width: 110px;
        height: 34px;
        margin-top: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        line-height: 34px;
        padding-left: 5px;
        padding-right: 10px;
        position: relative;
    }
    .topSelect::after {
        content: '';
        width: 0px;
        height: 0px;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        right: 10px;
        border-top: 5px solid #ccc;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
    .jichukequnTopic {
        padding: 10px 0px;
        margin-top: 10px;
    }
    .bottomPici {
        padding-top: 30px;
        display: flex;
    }
    .bottomPici .bottomPiciLeft {
        flex: 1;
        padding-right: 10px;
    }
    .bottomPici .bottomPiciRight {
        flex: 1;
        padding-left: 10px;
    }
    .bottomPicipubContainer {
        height: 300px;
        box-shadow: 1px 1px 5px #ccc;
        border-radius: 5px;
        padding: 10px 15px;
        position: relative;
    }
    .containersTabs {
        display: flex;
        height: 30px;
        margin-bottom: 10px;
    }
    .containersTabs>span {
        flex: 1;
        border-radius: 3px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #F2F2F2;
    }
    .chooseFirstSpan {
        background-color: #F8F8F8;
    }
    .b-n {
        border: none !important;
    }
    .titleTop {
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        padding-left: 10px;
        position: relative;
        padding-right: 10px;
    }
    .c-t {
        background-color: #F8F8F8;
    }
    .titleTopSelect::after {
        content: '';
        width: 0px;
        height: 0px;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translate(0, -50%);
        border-top: 5px solid #ccc;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
    .sureButton {
        position: absolute;
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #587EB9;
        color: #fff;
        border-radius: 3px;
        bottom: 0px;
        right: 0px;
        transform: translate(-50%, -50%);
    }
    .m-t-5-my {
        margin-top: 5px;
    }
    .c-b-my {
        background-color: #587EB9;
    }
    .starRate .el-rate__icon {
        font-size: 12px !important;
    }
    .progressSpecial .el-progress-bar__outer {
        /* height: 12px !important; */
        
    }
    .progressSpecial .el-progress__text {
        /* height: 12px !important; */
        font-size: 12px !important;
    }
    .checkBox-yuan {
        text-align: center;
    }
    .checkBox-yuan span {
        display: inline-block;
        height: 10px;
        width: 10px;
        border: 1px solid #ccc;
        border-radius: 50%;
    }
    .control-user-name {
        color: #587EB9;
    }
</style>
