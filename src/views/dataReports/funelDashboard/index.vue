<template>
    <div>
        <b-card>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                            <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-12">
                        <iris-car :flag="isStartByBrand" :showCar="showCar" :col="2" @callBack="getCarInfo" ref="car"></iris-car>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" variant="primary" @click="queryData()">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <div class="row">
            <div class="col-md-6">
                <comTable :dashboardData="funelData"></comTable>
            </div>
            <div class="col-md-6">
                <comTable :dashboardData="orderData"></comTable>
            </div>
            <div class="col-md-6">
                <comTable :dashboardData="retailData"></comTable>
            </div>
            <div class="col-md-6">
                <comTable :dashboardData="transformData"></comTable>
            </div>
        </div>
    </div>
</template>
<script>
import comTable from 'components/table/comTable'
import Areaqueryshop from 'components/iris-areaqueryshop/index'
import irisCar from 'components/iris-car/index'
export default {
    data () {
        return {
            showCar: false,
            brandOptions:[],
            code: '',
            funelData:{
                title: '进店线索数',
                totalNum: '共1000人',
                thead: ['车系','H级','A级','B级','首次/再次','活跃/休眠'],
                body:[
                    ['全新英朗','159','80','70','149/60','50/10'],
                    ['威朗','129','60','30','149/60','40/20'],
                    ['昂科威','110','10','80','140/60','15/45'],
                    ['GL8商旅车','98','71','10','129/50','25/25'],
                    ['全新一代君威','54','32','7','73/20','17/3'],
                    ['全新一代君越','60','55','3','98/20','15/5']
                ]
            },
            orderData:{
                title: '订单数',
                totalNum: '共80单',
                thead: ['车系','报价数','新增订单数','留存订单数','订单总数','订单达成率'],
                body:[
                    ['全新英朗','151','145','10','155','90%'],
                    ['威朗','79','72','6','78','100%'],
                    ['昂科威','64','18','3','21','95%'],
                    ['GL8商旅车','32','7','2','9','85%'],
                    ['全新一代君威','96','24','1','25','90%'],
                    ['全新一代君越','15','10','0','10','80%']
                ]
            },
            retailData: {
                title: '零售数',
                totalNum: '共75单',
                thead: ['车系','零售开票数','未零售开票数','上报厂家数','零售批售比','本地上牌率'],
                body: [
                    ['全新英朗','141','2','141','120:21','95%'],
                    ['威朗','68','1','67','48:20','85%'],
                    ['昂科威','14','4','14','12:2','89%'],
                    ['GL8商旅车','13','2','13','11:2','100%'],
                    ['全新一代君威','18','3','18','12.6','90%'],
                    ['全新一代君越','7','0','7','7:0','95%']
                ]
            },
            transformData: {
                title: '销售漏斗各项转换率',
                totalNum: '',
                thead: ['车系','进店线索报价率','报价订单数','订单零售率','进店线索订单数'],
                body: [
                    ['全新英朗','49%','96%','97.2%','47.1%'],
                    ['威朗','43.2%','91.1%','94.4%','34.3%'],
                    ['昂科威','34.3%','81.8%','77.8%','28.1%'],
                    ['GL8商旅车','31.2%','70%','71.4%','21.9%'],
                    ['全新一代君威','29.2%','85.7%','75%','25%'],
                    ['全新一代君越','20.6%','66.7%','70%','13.7%']
                ]
            }
        }
    },
    methods:{
        selectStores(){

        }
    },
    components:{
        comTable,
        Areaqueryshop,
        irisCar
    }
}
</script>
