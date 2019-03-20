<template>
    <div class="control-dashboard">
        <div class="dashboard-container">
            <div class="dashboard-left">
                <div class="dashboard-left-tabs">
                    <!-- <div>预约确定 <span>99</span></div>
                    <div>今日在店 <span>9</span></div>
                    <div></div> -->
                    <ul>
                        <li class="special-line-li">预约确认&nbsp;<span>99</span></li>
                        <li>在场车辆&nbsp;<span>9</span></li>
                        <li></li>
                    </ul>
                </div>
                <div class="dashboard-left-time">
                    <div class="dashboard-left-time-container">
                        <span>2018/01/08</span>
                        <span><</span>
                        <span>></span>
                    </div>
                    <div class="dashboard-left-time-choose">
                        排序&nbsp;&nbsp;<span class="el-icon-caret-bottom"></span>
                    </div>
                </div>
                <div class="dashboard-left-list" @click="listItemClick">
                    <ul>
                        <li>
                            <div class="font-size-border">朱先生</div>
                            <div class="font-size-border">沪AG23765</div>
                            <div>
                                <span>工作进度</span>
                                <span>
                                <el-progress :text-inside="true" :stroke-width="18" :percentage="30" status="exception"></el-progress>
                                </span>
                                <span class="font-color-dai">待确定</span>
                            </div>
                            <div>
                                预约时间: &nbsp;&nbsp;&nbsp;<span class="font-size-border">9:00&nbsp;&nbsp;AM</span>
                            </div>
                        </li>
                        <li>
                            <div class="font-size-border">朱先生</div>
                            <div class="font-size-border">沪AG23765</div>
                            <div>
                                <span>工作进度</span>
                                <span>
                                <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
                                </span>
                                <span class="font-color-dai">待确定</span>
                            </div>
                            <div>
                                预约时间: &nbsp;&nbsp;&nbsp;<span class="font-size-border">9:00&nbsp;&nbsp;AM</span>
                            </div>
                        </li>
                        <li>
                            <div class="font-size-border">朱先生</div>
                            <div class="font-size-border">沪AG23765</div>
                            <div>
                                <span>工作进度</span>
                                <span>
                                <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
                                </span>
                                <span class="font-color-dai">待确定</span>
                            </div>
                            <div>
                                预约时间: &nbsp;&nbsp;&nbsp;<span class="font-size-border">9:00&nbsp;&nbsp;AM</span>
                            </div>
                        </li>
                        <li>
                            <div class="font-size-border">朱先生</div>
                            <div class="font-size-border">沪AG23765</div>
                            <div>
                                <span>工作进度</span>
                                <span>
                                <el-progress :text-inside="true" :stroke-width="18" :percentage="70" status="exception"></el-progress>
                                </span>
                                <span class="font-color-dai">待确定</span>
                            </div>
                            <div>
                                预约时间: &nbsp;&nbsp;&nbsp;<span class="font-size-border">9:00&nbsp;&nbsp;AM</span>
                            </div>
                        </li>
                        <li>
                            <div class="font-size-border">朱先生</div>
                            <div class="font-size-border">沪AG23765</div>
                            <div>
                                <span>工作进度</span>
                                <span>
                                <el-progress :text-inside="true" :stroke-width="18" :percentage="20" status="exception"></el-progress>
                                </span>
                                <span class="font-color-dai">待确定</span>
                            </div>
                            <div>
                                预约时间: &nbsp;&nbsp;&nbsp;<span class="font-size-border">9:00&nbsp;&nbsp;AM</span>
                            </div>
                        </li>
                        <li>
                            <div class="font-size-border">朱先生</div>
                            <div class="font-size-border">沪AG23765</div>
                            <div>
                                <span>工作进度</span>
                                <span>
                                <el-progress :text-inside="true" :stroke-width="18" :percentage="40" status="exception"></el-progress>
                                </span>
                                <span class="font-color-dai">待确定</span>
                            </div>
                            <div>
                                预约时间: &nbsp;&nbsp;&nbsp;<span class="font-size-border">9:00&nbsp;&nbsp;AM</span>
                            </div>
                        </li>
                        <li>
                            <div class="font-size-border">朱先生</div>
                            <div class="font-size-border">沪AG23765</div>
                            <div>
                                <span>工作进度</span>
                                <span>
                                <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
                                </span>
                                <span class="font-color-dai">待确定</span>
                            </div>
                            <div>
                                预约时间: &nbsp;&nbsp;&nbsp;<span class="font-size-border">9:00&nbsp;&nbsp;AM</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="dashboard-right">
                <div class="dashboard-right-container">
                    <div class="dashboard-right-container-title">
                        <div class="dashboard-right-container-left">
                            <span>
                                <img src="./../../../static/image/dashboardpic/side_2.png" alt=""><br>新建预约单
                            </span>
                            <span>
                                <img src="./../../../static/image/dashboardpic/side_2.png" alt=""><br>新建预检单
                            </span>
                            <span>
                                <img src="./../../../static/image/dashboardpic/side_1.png" alt=""><br>查看工位利用
                            </span>
                        </div>
                        <div class="dashboard-right-container-right">
                            <p>
                                <span>消息</span>&nbsp;&nbsp;零件到货poe12213
                            </p>
                            <p>
                                <span>消息</span>&nbsp;&nbsp;系统更新完毕。
                            </p>
                            <p>
                                <span>消息</span>&nbsp;&nbsp;沪AG9304,已经进场准备后续工作
                            </p>
                        </div>
                    </div>
                    <div class="dashboard-right-container-echarts">
                        <div class="echarts-position" id="echartsMain">

                        </div>
                        <div class="echarts-finish">
                            <div>
                                <p>日产值完成</p>
                                <p>13,500<span>CNY</span></p>
                                <p class="shangshanjiao-special">Orders</p>
                            </div>
                            <div>
                                <p>日进度</p>
                                <p class="shangsanjiao">85%</p>
                                <p class="shangshanjiao-special">Selling Items</p>
                            </div>
                            <div>
                                <p>客户维持率</p>
                                <p class="shangsanjiao">72%</p>
                                <p class="shangshanjiao-special">Items</p>
                            </div>
                            <div>
                                <p>累计接待顾客</p>
                                <p>230</p>
                                <p class="shangshanjiao-special">Customers</p>
                            </div>
                        </div>
                    </div>
                    <div class="dashboard-right-container-info">
                        <div class="dashboard-right-container-info-tabs">
                            <span style="cursor: pointer;" @click="tempShowChange('信息看板')" :class="{'factory-car-info': tempShow}">信息看板</span>
                            <span style="cursor: pointer;" @click="tempShowChange('车间资源')" :class="{'factory-car-info': !tempShow}">车间资源</span>
                            <div class="detail">详情</div>
                        </div>
                        <div v-if="tempShow" class="dashboard-right-container-info-pic">
                            <div class="dashboard-right-container-info-detail">
                                <img src="./../../../static/image/dashboardpic/car.png" alt="">
                                <div class="dashboard-right-container-info-detailright">
                                    <p>David Williams&nbsp;&nbsp;<span>车主</span></p>
                                    <p>
                                        <span>汽车车牌: 沪AG6987</span>
                                        <span>联系电话: 18247483293</span>
                                    </p>
                                    <p>
                                        <span>车辆车型: 2017款 Macan Turbo 3.6T</span>
                                        <span>VIN码: GNI1299DHYSTO</span>
                                    </p>
                                    <p>
                                        <span>购车日期: 2017.2.16</span>
                                        <span>预计里程数: 8000km</span>
                                    </p>
                                </div>
                            </div>
                            <div class="dashboard-right-container-describe">
                                <div class="dashboard-describe-left">
                                    <div class="limit-circle">
                                        <div>
                                            <div class="limit-circle-rotate">
                                                <span>A+</span>
                                                <br>
                                                <span>客户星级</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="limit-circle">
                                        <div>
                                            <div class="limit-circle-rotate">
                                                <span>活跃</span>
                                                <br>
                                                <span>客户类别</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="limit-circle">
                                        <div>
                                            <div class="limit-circle-rotate">
                                                <span>高</span>
                                                <br>
                                                <span>消费指数</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dashboard-describe-right">
                                    <div>
                                        <p>优惠卷</p>
                                        <p>99</p>
                                    </div>
                                    <div>
                                        <p>预付卡余额(元)</p>
                                        <p>10,600</p>
                                    </div>
                                    <div>
                                        <p>当前积分</p>
                                        <p>9,800</p>
                                    </div>
                                    <div>
                                        <p>历史消费</p>
                                        <p>10,000</p>
                                    </div>
                                </div>
                            </div>
                            <div class="appointment-info">
                                <div class="appointment-info-title">预约信息</div>
                                <div class="appointment-info-main">
                                    <span>预约下单时间</span>
                                    <span>2017-12-25  16:40:54 pm</span>
                                    <span>送修人</span>
                                    <span>Tony.C</span>
                                </div>
                                <div class="appointment-info-main">
                                    <span>车牌来源</span>
                                    <span>微信</span>
                                    <span>联系电话 </span>
                                    <span>18301686830</span>
                                </div>
                                <div class="appointment-info-main">
                                    <span>车牌号码</span>
                                    <span>沪AG98765</span>
                                    <span>预计进场时间</span>
                                    <span>2017-12-26  09:30:00 am</span>
                                </div>
                                <div class="appointment-info-main">
                                    <span>公里数</span>
                                    <span>100000km</span>
                                    <span>备注</span>
                                    <span>主要内容填写</span>
                                </div>
                                <div class="maintain-describe">
                                    维修描述&nbsp;&nbsp;&nbsp;&nbsp;【保养】20000km小保养。&nbsp;&nbsp;【保养】更换空滤。&nbsp;&nbsp;【美容】发动机舱清洗镀膜&nbsp;&nbsp;【喷漆】面*2
                                </div>
                                <div class="one-open-dan">
                                    <span style="cursor: pointer;" @click="opendan">一键开单</span>
                                    <span style="cursor: pointer;" @click="opendan">取消预约</span>
                                    Tips2：上次消费：发动机舱清洗镀膜、更换雨刮
                                </div>
                            </div>
                        </div>
                        <div v-if="!tempShow" class="dashboard-right-container-info-factory">
                            <div class="factory-status">车间状态</div>
                            <div class="factory-status-table">
                                <table>
                                    <tbody>
                                         <tr>
                                            <td>技师项目包剩余</td>
                                            <td>未派工项目包</td>
                                            <td>其他负荷</td>
                                            <td>通知备注</td>
                                        </tr>
                                        <tr>
                                            <td>技师1&nbsp;&nbsp;<span>12</span></td>
                                            <td>保养&nbsp;&nbsp;<span>1</span></td>
                                            <td>洗车未完成&nbsp;&nbsp;<span>23</span></td>
                                            <td>XXX</td>
                                        </tr>
                                        <tr>
                                            <td>技师2&nbsp;&nbsp;<span>10</span></td>
                                            <td>查修&nbsp;&nbsp;<span>7</span></td>
                                            <td>洗车未完成&nbsp;&nbsp;<span>23</span></td>
                                            <td>XXX</td>
                                        </tr>
                                        <tr>
                                            <td>技师3&nbsp;&nbsp;<span>15</span></td>
                                            <td>钣金&nbsp;&nbsp;<span>12</span></td>
                                            <td>洗车未完成&nbsp;&nbsp;<span>23</span></td>
                                            <td>XXX</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="factory-status customer-relation-ticket">客户联系清单</div>
                            <div class="customer-relation-table">
                                <ul>
                                    <li>
                                        <div>张军</div>
                                        <div>2017款 Macan Turbo 3.6T</div>
                                        <div>18616801680</div>
                                        <div>A+</div>
                                        <div>1月市场活动</div>
                                        <div><span>查看</span></div>
                                    </li>
                                    <li>
                                        <div>马云</div>
                                        <div>2017款 Macan Turbo 3.6T</div>
                                        <div>18616801680</div>
                                        <div>A+</div>
                                        <div>1月市场活动</div>
                                        <div><span>查看</span></div>
                                    </li>
                                    <li>
                                        <div>马化腾</div>
                                        <div>2017款 Macan Turbo 3.6T</div>
                                        <div>18616801680</div>
                                        <div>A+</div>
                                        <div>1月市场活动</div>
                                        <div><span>查看</span></div>
                                    </li>
                                    <li>
                                        <div>马明哲</div>
                                        <div>2017款 Macan Turbo 3.6T</div>
                                        <div>18616801680</div>
                                        <div>A+</div>
                                        <div>1月市场活动</div>
                                        <div><span>查看</span></div>
                                    </li>
                                    <li>
                                        <div>李嘉诚</div>
                                        <div>2017款 Macan Turbo 3.6T</div>
                                        <div>18616801680</div>
                                        <div>A+</div>
                                        <div>1月市场活动</div>
                                        <div><span>查看</span></div>
                                    </li>
                                    <li>
                                        <div>雷军</div>
                                        <div>2017款 Macan Turbo 3.6T</div>
                                        <div>18616801680</div>
                                        <div>A+</div>
                                        <div>1月市场活动</div>
                                        <div><span>查看</span></div>
                                    </li>
                                    <li>
                                        <div>李彦宏</div>
                                        <div>2017款 Macan Turbo 3.6T</div>
                                        <div>18616801680</div>
                                        <div>A+</div>
                                        <div>1月市场活动</div>
                                        <div><span>查看</span></div>
                                    </li>
                                </ul>
                            </div>
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
    import echarts from "echarts"
    var Scharts = require('echarts')
    require('echarts/lib/chart/line')
    Vue.use(Rate)
    Vue.use(Progress)
    export default {
        data() {
            return {
                tempShow: true,
                option: {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['0','2','4','6','8','10','12','14','16']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'奥迪',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[1, 3, 2, 4, 6, 3, 1, 7, 6]
                        },
                        {
                            name:'宝马',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            // data:[220, 182, 191, 234, 290, 330, 310,311,342]
                            data:[1, 3, 2, 4, 6, 3, 1, 7, 6]
                        },
                        {
                            name:'奔驰',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            // data:[150, 232, 201, 154, 190, 330, 410, 435, 465]
                            data:[1, 3, 2, 4, 6, 3, 1, 7, 6]
                        },
                        {
                            name:'凯迪拉克',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            // data:[320, 332, 301, 334, 390, 330, 320,434,420]
                            data:[1, 3, 2, 4, 6, 3, 1, 7, 6]
                        },
                        {
                            name:'沃尔沃',
                            type:'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {normal: {}},
                            // data:[820, 932, 901, 934, 1290, 1330, 1320,1322,1345]
                            data:[1, 3, 2, 4, 6, 3, 1, 7, 6]
                        }
                    ]
                }
            }
        },
        methods: {
            tempShowChange(arg) {
                if(arg === '信息看板') {
                    this.tempShow = true
                }else if(arg === '车间资源') {
                    this.tempShow = false
                }
            },
            opendan() {
                this.$router.push({
                    path: '/afterappointment'
                })
            },
            listItemClick() {
                this.$router.push({
                    path: '/precheck'
                })
            }
        },
        mounted() {
            var myChart = Scharts.init(document.getElementById('echartsMain'))
            myChart.setOption(this.option)
        }
    }
</script>
<style>
    .customer-relation-table>ul {
        padding: 0;
        margin: 0;
    }
    .customer-relation-table>ul>li {
        list-style: none;
        height: 30px;
    }
    .customer-relation-table>ul>li:nth-child(2n) {
        background-color: #F8F9FD;
    }
    .customer-relation-table>ul>li div {
        float: left;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        padding-left: 10px;
    }
    .customer-relation-table>ul>li div:first-child {
        width: 15%;
    }
    .customer-relation-table>ul>li div:nth-child(2) {
        width: 35%;
    }
    .customer-relation-table>ul>li div:nth-child(3) {
        width: 15%;
    }
    .customer-relation-table>ul>li div:nth-child(4) {
        width: 5%;
    }
    .customer-relation-table>ul>li div:nth-child(5) {
        width: 15%;
    }
    .customer-relation-table>ul>li div:nth-child(6) {
        width: 15%;
    }
    .customer-relation-table>ul>li div:nth-child(6) span {
        display: inline-block;
        height: 25px;
        line-height: 25px;
        background-color: #2A4A7C;
        color: #fff;
        padding: 0px 10px;
        border-radius: 3px;
    }
    .customer-relation-ticket {
        margin-top: 20px;
    }
    .factory-status-table>table {
        width: 100%;
        border: 1px solid #D8D8D8;
        font-size: 12px;
    }
    .factory-status-table>table tr {
        height: 25px;
        border-bottom: 1px solid #D8D8D8;
    }
    .factory-status-table>table tr td {
        padding-left: 10px;
        border-right: 1px solid #D8D8D8;
    }
    .factory-status-table>table tr td span {
        color: #EF624C;
    }
    .factory-status-table>table tr th {
        padding-left: 10px;
        border-right: 1px solid #D8D8D8;
    }
    .factory-status-table {
        margin-top: 10px;
    }
    .dashboard-right-container-info-factory {
        padding-top: 10px;
    }
    .factory-status {
        height: 25px;
        line-height: 25px;
        padding-left: 10px;
        font-size: 12px;
        background-color: #F5F5F5;
    }
    .one-open-dan {
        height: 35px;
        line-height: 35px;
        font-size: 12px;
        text-align: center;
    }
    .one-open-dan>span {
        float: right;
        height: 25px;
        line-height: 25px;
        padding: 0px 10px;
        margin-top: 5px;
        margin-right: 20px;
        border-radius: 3px;
    }
    .one-open-dan>span:first-child {
        background-color: #587EB9;
        color: #fff;
    }
    .one-open-dan>span:last-child {
        background-color: #F2F3F5;
    }
    .maintain-describe {
        font-size: 12px;
        height: 25px;
        line-height: 25px;
        border-bottom: 1px solid #F2F2F2;
    }
    .appointment-info-main {
        height: 25px;
        line-height: 25px;
    }
    .appointment-info-main>span {
        float: left;
        height: 25px;
        width: 21%;
        margin-right: 5.33%;
        border-bottom: 1px solid #F2F2F2;
        font-size: 12px;
    }
    .appointment-info-main>span:last-child {
        margin-right: 0;
    }
    .appointment-info-title {
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #F2F2F2;
        font-size: 12px;
    }
    .dashboard-describe-right {
        float: right;
        width: 60%;
        height: 80px;
        box-sizing: border-box;
        border-left: 1px solid #D8D8D8;
        padding: 10px 0px;
    }
    .dashboard-describe-right>div {
        float: right;
        width: 25%;
        height: 60px;
        box-sizing: border-box;
        border-left: 1px solid #D8D8D8;
    }
    .dashboard-describe-right>div:last-child {
        border-left: none;
    }
    .dashboard-describe-right>div p {
        padding: 0;
        margin: 0;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    .dashboard-describe-right>div p:last-child {
        font-size: 18px;
        font-weight: 700;
    }
    .dashboard-right-container-describe {
        padding: 10px 0px;
        height: 100px;
    }
    .dashboard-describe-left {
        float: left;
        width: 40%;
        height: 80px;
    }
    .dashboard-describe-left .limit-circle {
        float: left;
        width: 23.33%;
        margin: 5px 5%;
        height: 70px;
        /* font-size: 12px;
        border-radius: 50%; */
    }
    .dashboard-describe-left .limit-circle>div {
        height: 65px;
        width: 65px;
        box-sizing: border-box;
        border-top: 2px solid #589FFF;
        border-right: 2px solid #589FFF;
        border-left: 2px solid #589FFF;
        border-bottom: 2px solid #D8D8D8;
        text-align: center;
        font-size: 12px;
        border-radius: 50%;
        transform:rotateZ(-45deg);
    }
    .dashboard-describe-left .limit-circle>div>.limit-circle-rotate {
        height: 60px;
        line-height: 25px;
        transform:rotateZ(45deg);
    }
    .dashboard-describe-left .limit-circle>div>.limit-circle-rotate span:first-child {
        color: #589FFF;
        font-size: 18px;
        font-weight: 700;
    }

    .dashboard-right-container-info-detailright>p {
        padding: 0;
        margin: 0;
    }
    .dashboard-right-container-info-detailright>p:first-child {
        font-size: 14px;
        font-weight: 700;
    }
    .dashboard-right-container-info-detailright>p:first-child>span {
        display: inline-block;
        height: 16px;
        line-height: 16px;
        padding: 0px 3px;
        border-radius: 2px;
        background-color: #2A4B6D;
        font-size: 12px;
        font-weight: normal;
        color: #fff;
    }
    .dashboard-right-container-info-detailright>p:nth-child(2) {
        display: flex;
        border-bottom: 1px solid #F2F2F2;
        font-size: 12px;
        height: 25px;
        line-height: 25px;
    }
    .dashboard-right-container-info-detailright>p:nth-child(2)>span{
        flex: 1;
    }
    .dashboard-right-container-info-detailright>p:nth-child(3) {
        display: flex;
        border-bottom: 1px solid #F2F2F2;
        font-size: 12px;
        height: 25px;
        line-height: 25px;
    }
    .dashboard-right-container-info-detailright>p:nth-child(3)>span{
        flex: 1;
    }
    .dashboard-right-container-info-detailright>p:nth-child(4) {
        display: flex;
        border-bottom: 1px solid #F2F2F2;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
    }
    .dashboard-right-container-info-detailright>p:nth-child(4)>span{
        flex: 1;
    }
    .dashboard-right-container-info-pic {
        padding-top: 10px;
    }
    .dashboard-right-container-info-detail {
        padding-left: 120px;
        height: 100px;
    }
    .dashboard-right-container-info-detail>img {
        float: left;
        /* width: 20%; */
        width: 100px;
        margin-left: -120px;
        height: 100px;
    }
    .dashboard-right-container-info {
        background-color: #fff;
        margin-top: 10px;
        padding: 10px;
        position: relative;
    }
    .dashboard-right-container-info-tabs>.detail {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 20px;
        width: 50px;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #E3E4E4;
    }
    .dashboard-right-container-info-tabs {
        height: 30px;
        border-bottom: 1px solid #F2F2F2;
    }
    .dashboard-right-container-info-tabs>span {
        float: left;
        width: 15%;
        text-align: center;
        height: 30px;
        box-sizing: border-box;
        border-bottom: 2px solid transparent;
    }
    .factory-car-info {
        border-bottom: 2px solid #587EB9!important;
    }
    .shangshanjiao-special {
        color: #888888;
    }
    .shangsanjiao {
        position: relative;
    }
    .shangsanjiao::after {
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        right: 40%;
        bottom: 8px;
        border-top: 5px solid transparent;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #2B96DF;
    }
    .echarts-finish {
        padding: 10px 0px;
        height: 80px;
    }
    .echarts-finish>div {
        float: left;
        width: 25%;
        height: 60px;
        border-right: 1px solid #EFEFEF;
    }
    .echarts-finish>div:last-child {
        border-right: none;
    }
    .echarts-finish>div>p {
        padding: 0;
        margin: 0;
        font-size: 12px;
        padding-left: 25%;
        
    }
    .echarts-finish>div>p:first-child {
        color: #EF624C;
    }
    .echarts-finish>div>p:nth-child(2) {
        font-size: 20px;
        font-weight: 700;
    }
    .echarts-finish>div>p:nth-child(2) span {
        font-size: 12px;
        font-weight: normal;
    }
    .echarts-position {
        height: 200px;
        width: 100%;
        border-bottom: 2px solid #EFEFEF;
    }
    .dashboard-right-container-echarts {
        padding: 10px;
    }
    .dashboard-right-container-echarts {
        margin-top: 10px;
        background-color: #fff;
    }
    .dashboard-right-container-right {
        float: left;
        width: 50%;
        height: 60px;
        box-sizing: border-box;
        padding-left: 10px;
    }
    .dashboard-right-container-right p {
        height: 20px;
        line-height: 20px;
        padding: 0;
        margin: 0;
        font-size: 12px;
    }
    .dashboard-right-container-right p span {
        display: inline-block;
        height: 16px;
        line-height: 16px;
        padding: 0px 5px;
        border: 1px solid #FD5A53;
        color: #FD5A53;
        border-radius: 3px;
        font-size: 10px;
    }
    .dashboard-right-container-title {
        background-color: #fff;
        padding: 10px;
        height: 80px;
    }
    .dashboard-right-container-left {
        float: left;
        width: 50%;
        height: 60px;
        box-sizing: border-box;
        border-right: 1px solid #CAC9CA;
    }
    .dashboard-right-container-left>span {
        float: left;
        width: 33.33%;
        height: 60px;
        text-align: center;
        font-size: 12px;
        color: #9FA1A2;
    }
    .control-dashboard {
        /* padding: 10px; */
    }
    .dashboard-container {
        display: flex;
    }
    .dashboard-left {
        flex: 2;
        background-color: #fff;
    }
    .dashboard-right {
        flex: 3;
        padding-left: 10px;
    }
    .dashboard-right-container {
        /* background-color: #fff; */
    }
    .dashboard-left-tabs ul {
        padding: 0;
        margin: 0;
        height: 40px;
    }
    .dashboard-left-tabs ul li {
        list-style: none;
        float: left;
        height: 40px;
        width: 33%;
        line-height: 40px;
        text-align: center;
        border-bottom: 2px solid transparent;
        cursor: pointer;
    }
    .dashboard-left-tabs ul li span {
        padding: 2px;
        background-color: #ED6F64;
        color: #fff;
        border-radius: 3px;
    }
    .special-line-li {
        border-bottom: 2px solid #ED6F64 !important;
    }
    .dashboard-left-time {
        border-top: 1px solid #F2F2F2;
        border-bottom: 1px solid #F2F2F2;
        height: 30px;
        padding-right: 60px;
        padding-left: 20px;
        position: relative;
    }
    .dashboard-left-time-container {
        border-right: 1px solid #F2F2F2;
        height: 30px;
        line-height: 30px;
    }
    .dashboard-left-time-container>span {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        background-color: #EFF0F1;
        border-radius: 3px;
        /* padding: 5px; */
        padding: 0px 5px;
        font-size: 12px;
    }
    .dashboard-left-time-choose {
        /* float: right; */
        position: absolute;
        right: 0px;
        top: 0px;
        width: 60px;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        font-size: 12px;
        /* margin-right: -60px; */
    }
    .dashboard-left-list ul {
        padding: 0;
        margin: 0;
    }
    .dashboard-left-list ul li {
        list-style: none;
        padding: 5px 10px;
        position: relative;
        border-bottom: 1px solid #F2F2F2;
    }
    .dashboard-left-list ul li>div:last-child {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 12px;
        color: #888888;
    }
    .dashboard-left-list ul li>div:nth-child(1) {
        padding: 5px 0px;
        font-size: 14px;
    }
    .dashboard-left-list ul li>div:nth-child(2) {
        padding: 5px 0px;
        font-size: 14px;
    }
    .dashboard-left-list ul li>div:nth-child(3) {
        padding: 5px 0px;
        font-size: 14px;
        height: 30px;
        /* line-height: 40px; */
        width: 100%;
    }
    .dashboard-left-list ul li>div:nth-child(3) span {
        float: left;
        width: 20%;
        height: 30px;
        text-align: center;
    }
    .dashboard-left-list ul li>div:nth-child(3) span:nth-child(2) {
        width: 60%;
        padding: 3px 10px 0px;
        height: 30px;
    }
    .dashboard-left-list ul li>div:last-child span {
        font-size: 14px;
        color: #000000;
    }
    .font-size-border {
        font-weight: 700 !important;
    }
    .font-color-dai {
        color: #ED6F64 !important;
    }
    /* .dashboard-left-tabs {
        display: flex;
    }
    .dashboard-left-tabs>div {
        flex: 1;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 2px solid transparent;
    }
    .dashboard-left-tabs>div span {
        display: inline-block;
        background-color: #ED6F64;
    }
    .dashboard-left-tabs>div:first-child {
        border-bottom: 2px solid #ED6F64;
    } */
</style>


