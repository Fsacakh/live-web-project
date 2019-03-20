<template>
    <div>
        <b-card>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-12">
                    <iris-car :col="2" :showCar="showCar" :showModel="showModel"></iris-car>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" variant="primary">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>

        <b-card>
            <div class="row">
                <div class="col-md-6">
                    <comTable :dashboardData="TGPcontributionData"></comTable>
                </div>
                <div class="col-md-6">
                    <comTable :dashboardData="GP1contributionData"></comTable>
                </div>
                <div class="col-md-6">
                    <comTable :dashboardData="GP2contributionData"></comTable>
                </div>
                <div class="col-md-6">
                    <comTable :dashboardData="GP3contributionData"></comTable>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import Vue from 'vue'
import irisCar from 'components/iris-car/index'
import comTable from 'components/table/comTable'
import Areaqueryshop from 'components/iris-areaqueryshop/index'

export default {
    data(){
        return{
            showCar: false,
            showModel: false,
            TGPcontributionData:{
                title: 'T.GP 贡献排行',
                totalNum: '共 17 万',
                thead: ['车系','T.GP实际','T.GP/台','T.GP%','零售数(零/批)','衍生品毛利','衍生品毛利/台'],
                body:[
                    ['全新英朗','100K','30K','5%','141(120:21)','10K','1K'],
                    ['威朗','40K','7K','6%','68(48:20)','10K','1K'],
                    ['昂科威','90K','10K','8%','14(12:2)','10K','1K'],
                    ['GL8商旅车','35K','7K','5%','13(11:2)','10K','1K'],
                    ['全新一代君威','70K','3K','9.5%','18(12:6)','10K','1K'],
                    ['全新一代君越','35K','7K','5%','7(7:0)','10K','1K']
                ]
            },
            GP1contributionData:{
                title: 'GP1 贡献排行',
                totalNum: '共 -600 万',
                thead: ['车系','GP1实际','GP1/台','GP1%','零售数(零/批)','平均采购价','平均销售价'],
                body:[
                    ['全新英朗','100K','30K','5%','141(120:21)','255K','258K'],
                    ['威朗','40K','5K','6%','68(48:20)','255K','258K'],
                    ['昂科威','90K','2K','8%','14(12:2)','255K','258K'],
                    ['GL8商旅车','35K','1K','2%','13(11:2)','255K','258K'],
                    ['全新一代君威','70K','10K','9.5%','18(12:6)','255K','258K'],
                    ['全新一代君越','35K','10K','9.5%','7(7:0)','255K','258K']
                ]
            },
            GP2contributionData:{
                title: 'GP2 贡献排行',
                totalNum: '共 -50 万',
                thead: ['车系','GP2实际','GP2/台','GP2%','零售数(零/批)','经销商赠送','厂家赠送'],
                body:[
                    ['全新英朗','100K','3K','5%','141(120:21)','0','0'],
                    ['威朗','40K','2K','6%','68(48:20)','0','5K'],
                    ['昂科威','90K','7K','8%','14(12:2)','0','0'],
                    ['GL8商旅车','35K','1K','4%','13(11:2)','1K','1K'],
                    ['全新一代君威','70K','20K','9.5%','18(12:6)','2K','2K'],
                    ['全新一代君越','35K','1K','4%','7(7:0)','1K','1K']
                ]
            },
            GP3contributionData:{
                title: 'GP3 贡献排行',
                totalNum: '共 -10 万',
                thead: ['车系','GP3实际','GP3/台','GP3%','零售数(零/批)','SI总值','SI/台'],
                body:[
                    ['全新英朗','100K','3K','5%','141(120:21)','10K','1K'],
                    ['威朗','40K','2K','6%','68(48:20)','4K','0.4K'],
                    ['昂科威','90K','7K','8%','14(12:2)','9K','0.9K'],
                    ['GL8商旅车','35K','1K','8%','13(11:2)','3K','0.35K'],
                    ['全新一代君威','70K','20K','9.5%','18(12:6)','7K','0.7K'],
                    ['全新一代君越','70K','20K','9.5%','7(7:0)','2K','0.3K']
                ]
            }
        }
    },
    components: {
        irisCar,
        comTable,
        Areaqueryshop
    },
    methods: {
        selectStores(val){
           
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


