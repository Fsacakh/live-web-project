<template>
    <div>
        <div class="history-child">
            <div>
                <span>工单号: GDH324379799</span>
                <span>DA: Klevin</span>
                <span>共四个增项方案</span>
            </div>
            <div class="specialBottomLine">
                <span>工时总计: ¥2,200</span>
                <span>备件总计: ¥8,800</span>
                <span>总计金额: ¥11,000</span>
            </div>
            <ul>
                <li>
                    <div>项目</div>
                    <div>状态</div>
                    <div>配件</div>
                    <div>工时</div>
                    <div>支付类型</div>
                </li>
                <li>
                    <div>PO231制动片组件</div>
                    <div>成功</div>
                    <div>¥6.51</div>
                    <div>¥6.51</div>
                    <div>自费</div>
                </li>
                <li>
                    <div>PO231制动片组件</div>
                    <div>成功</div>
                    <div>¥6.51</div>
                    <div>¥6.51</div>
                    <div>自费</div>
                </li>
                <li>
                    <div>PO231制动片组件</div>
                    <div>成功</div>
                    <div>¥6.51</div>
                    <div>¥6.51</div>
                    <div>自费</div>
                </li>
                <li>
                    <div>PO231制动片组件</div>
                    <div class="history-red">战败</div>
                    <div></div>
                    <div></div>
                    <div></div>
                </li>
                <li>
                    <div>PO231制动片组件</div>
                    <div>成功</div>
                    <div>¥6.51</div>
                    <div>¥6.51</div>
                    <div>自费</div>
                </li>
            </ul>
        </div>
        <div class="history-child">
            <div>
                <span>工单号: GDH324379799</span>
                <span>DA: Klevin</span>
                <span>共三个增项方案</span>
            </div>
            <div class="specialBottomLine">
                <span>工时总计: ¥2,000</span>
                <span>备件总计: ¥8,500</span>
                <span>总计金额: ¥10,000</span>
            </div>
            <ul>
                <li>
                    <div>项目</div>
                    <div>状态</div>
                    <div>配件</div>
                    <div>工时</div>
                    <div>支付类型</div>
                </li>
                <li>
                    <div>PO231制动片组件</div>
                    <div>成功</div>
                    <div>¥6.51</div>
                    <div>¥6.51</div>
                    <div>自费</div>
                </li>
                <li>
                    <div>PO231制动片组件</div>
                    <div>成功</div>
                    <div>¥6.51</div>
                    <div>¥6.51</div>
                    <div>自费</div>
                </li>
                <li>
                    <div>PO231制动片组件</div>
                    <div>成功</div>
                    <div>¥6.51</div>
                    <div>¥6.51</div>
                    <div>自费</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {

        }
    }
</script>
<style>
    .specialBottomLine {
        border-bottom: 1px solid #F2F2F2;
    }
    .history-red {
        color: red;
    }
    .history-child {
        font-size: 12px;
        border-radius: 5px;
        box-shadow: 1px 1px 5px #ccc;
    }
    .history-child:nth-child(2) {
        margin-top: 20px;
    }
    .history-child ul {
        padding: 0;
        margin: 0;
    }
    .history-child ul li {
        list-style: none;
        padding: 10px 0px;
        border-bottom: 1px solid #F2F2F2;
    }
    .history-child ul li div {
        border-right: 1px solid #F2F2F2;
    }
    .history-child ul li:first-child div {
        border: none;
    }
    .history-child ul li div:last-child {
        border-right: none;
    }
    .history-child ul li:first-child {
        background-color: #F9F8F8;
    }
    .history-child ul li {
        display: flex;
    }
    .history-child ul li div {
        flex: 2;
        text-align: center;
    }
    .history-child ul li div:first-child {
        flex: 4;
    }
    .history-child ul li div:nth-child(2) {
        flex: 2;
    }
    .history-child>div:first-child {
        display: flex;
        height: 35px;
        background-color: #F6F8FA;
        line-height: 35px;
        border-bottom: 1px solid #F2F2F2;
    }
    .history-child>div:first-child span {
        flex: 2;
    }
    .history-child>div:first-child span:first-child {
        flex: 3;
        padding-left: 5px;
    }
    .history-child>div:nth-child(2) {
        display: flex;
        height: 35px;
        background-color: #F6F8FA;
        line-height: 35px;
    }
    .history-child>div:nth-child(2) span {
        flex: 1;
    }
    .history-child>div:nth-child(2) span:first-child {
        padding-left: 5px;
    }
</style>

