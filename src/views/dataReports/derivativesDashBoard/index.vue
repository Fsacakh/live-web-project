<template>
    <div class="animated fadeIn">
        <b-card>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <car-info :col="2" :flag="isStartByBrand" :showCar="false"></car-info>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button @click="reset" size="sm">重置</b-button>
                        <b-button @click="queryCarSkuSalesListBySearch" size="sm" variant="primary">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <com-table :dashboardData="financeGp"></com-table>
                </div>
                <div class="col-md-6 col-lg-6">
                    <com-table :dashboardData="insuranceGp"></com-table>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <com-table :dashboardData="extendsGp"></com-table>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <b-card>
                        <div class="card-top">
                            <h5 class="pull-left">{{ skuGp.title }}</h5>
                            <div class="pull-right">{{ skuGp.totalNum }}</div>
                        </div>
                        <div class="card-text">
                            <div class="content-right">
                                <table>
                                    <thead>
                                        <tr>
                                            <th rowspan="2"></th>
                                            <th rowspan="2">车系</th>
                                            <th v-for="(item, index) in skuGp.thead" :key="index" colspan="4">{{ item.label }}</th>
                                        </tr>
                                        <tr>
                                            <template v-for="(item, index) in skuGp.thead">
                                               <th v-for="column in item.children"> {{ column }} </th>  
                                            </template>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in skuGp.body" :key="index">
                                            <td class="radius"></td>
                                            <td v-for="(v, index) in item" :key="index">{{v}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </b-card>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import carInfo from 'components/iris-car'
    import comTable from 'components/table/comTable'
    import areaqueryshop from 'components/iris-areaqueryshop'
    import config from 'common/config'
    export default {
        data: function() {
            return {
                financeGp: {
                    title: '金融毛利 贡献排行',
                    totalNum: '共 170.56万',
                    thead: ['车系', '毛利实际', '毛利/台', '金融台数', '渗透率'],
                    body: [
                        ['全新英朗', '10k', '5k', '30', '66%'],
                        ['威朗', '4k', '4k', '6', '50%'],
                        ['昂科威', '3k', '3k', '10', '90%'],
                        ['GL8商旅车', '3.5k', '8k', '7', '45%'],
                        ['全新一代君越', '2k', '2k', '3', '50%'],
                        ['全新一代君越', '2k', '2k', '3', '45%'],
                    ]
                },
                insuranceGp: {
                    title: '保险毛利 贡献排行',
                    totalNum: '共 50万',
                    thead: ['车系', '毛利实际', '毛利/台', '保险台数', '渗透率'],
                    body: [
                        ['全新英朗', '10k', '7k', '30', '90%'],
                        ['威朗', '4k', '3k', '6', '90%'],
                        ['昂科威', '3k', '8k', '10', '90%'],
                        ['GL8商旅车', '3.5k', '2k', '7', '90%'],
                        ['全新一代君越', '2k', '6k', '3', '90%'],
                        ['全新一代君越', '2k', '6k', '3', '90%'],
                    ]
                },
                extendsGp: {
                    title: '延保毛利 贡献排行',
                    totalNum: '共 100万',
                    thead: ['车系', '延保总毛利', '延保台数', '延保毛利/台', '延保渗透率', '厂家延保毛利', '厂家延保台数', '毛利/台', '集团延保毛利', '集团延保台数', '毛利/台'],
                    body: [
                        ['全新英朗', '500k', '2', '5k', '66%', '500k', '2', '5k', '0.5k', '2', '5k', '', '', ],
                        ['威朗', '2k', '1', '4k', '50%', '2k', '1', '4k', '2k', '1', '4k', '', '', ],
                        ['昂科威', '12k', '4', '3k', '90%', '12k', '4', '3k', '12k', '4', '3k', '', '', ],
                        ['GL8商旅车', '35k', '2', '8k', '--', '35k', '2', '8k', '35k', '2', '8k', '', ],
                        ['全新一代君越', '7k', '3', '2k', '100%', '7k', '3', '2k', '7k', '3', '2k', '', '', ],
                        ['全新一代君越', '7k', '3', '2k', '100%', '7k', '3', '2k', '7k', '3', '2k', '', '', ],
                    ]
                },
                skuGp: {
                    title: '精品毛利 贡献排行',
                    totalNum: '共 100万',
                    thead: [{
                        label: '精品',
                        children: ['精品总毛利', '毛利/台', '精品台数', '精品渗透率']
                    }, {
                        label: '厂家精品',
                        children: ['毛利', '毛利/台', '精品台数', '毛利占比']
                    }, {
                        label: '集采精品',
                        children: ['毛利', '毛利/台', '精品台数', '毛利占比']
                    }, {
                        label: '自集精品',
                        children: ['毛利', '毛利/台', '精品台数', '毛利占比']
                    }],
                    body: [
                        ['全新英朗', '10k', '5k', '90', '90%', '10k', '5k', '90', '90%', '10k', '5k', '90', '10%', '0', '0', '0', '0%'],
                        ['威朗', '4k', '4k', '6', '90%', '4k', '4k', '6', '90%', '4k', '4k', '6', '10%', '0', '0', '0', '0%', ],
                        ['昂科威', '3k', '3k', '10', '90%', '3k', '3k', '10', '90%', '3k', '3k', '10', '10%', '0', '0', '0', '0%', ],
                        ['GL8商旅车', '3.5k', '8k', '7', '90%','3.5k', '8k', '7', '90%','3.5k', '8k', '7', '10%','0', '0', '0', '0%', ],
                        ['全新一代君越', '2k', '2k', '3', '90%', '2k', '2k', '3', '90%', '2k', '2k', '3', '10%', '0', '0', '0', '0%' ],
                        ['全新一代君越', '2k', '2k', '3', '90%', '2k', '2k', '3', '90%', '2k', '2k', '3', '10%',  '0', '0', '0', '0%'],
                    ]
                },
                isStartByBrand: config.isShowFactory
            }
        },
        methods: {},
        components: {
            carInfo,
            comTable,
            areaqueryshop
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        border-radius: 5px;
    }
    .card-top {
        height: 30px;
        font-size: 12px;
        border-bottom: 1px solid #c2cfd6;
    }
    .card-text {
        .content-right {
            width: 100%;
            table {
                tr {
                    height: 38px;
                    line-height: 38px;
                    border-bottom: 1px solid #e9f0f5;
                }
                thead {
                    background: #fff !important;
                    th:nth-child(1) {
                        padding-left: 20px;
                    }
                    th:nth-child(n+3) {
                        text-align: center
                    }
                }
                width: 100%;
                tbody {
                    .radius {
                        margin-left: 5px;
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #6E9EF1;
                    }
                    tr {
                        &:hover {
                            box-shadow: 0px 2px 2px #ccc;
                            cursor: pointer;
                        }
                    }
                    tr:nth-child(2n) {
                        background: #f7fbff;
                    }
                    td:nth-child(n+3) {
                        text-align: center
                    }
                }
            }
        }
    }
</style>