<template>
    <div>
        <b-card>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="所属门店：" label-text-align="right" :label-cols="2">
                        <areaqueryshop :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <div class="pull-right inquireAll">
                        <b-button size="sm" variant="primary">查询</b-button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <comTable :dashboardData="funelData"></comTable>
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
import comTable from 'components/table/comTable'
import Areaqueryshop from 'components/iris-areaqueryshop/index'
export default {
    data () {
        return {
            funelData:{
                thead: ['车系','库存总数','未下线','在途','在库','已订单库存', '未零售开票', '库存占比', '60天以上库龄', '60天以上占比'],
                body:[
                    ['全新英朗', '48', '15', '18', '15', '5', '0', '15%','5','26.3%'],
                    ['威朗','34','10','14','10','3', '0', '12','4','21.1%'],
                    ['吊科威','58','2','23','30','7', '1', '18%','3','15.8%'],
                    ['GL8商旅车','30','7','15','8','2', '0', '10%','2','10.5%'],
                    ['全新一代君威','15','8','5','2','1','0','13%','2','10.5%'],
                    ['全新一代君威', '15','5','8','2','0','0','5%','1','5.3%'],
                    ['GL8豪华商旅车', '11','1','2','8','1','0','6.2%','0','0%'],
                    ['GL6','10','0','0','10','2','0','6%','2','10.5%'],
                    ['全新一代凯越','7','0','1','6','0','0','4.3%','0','0%'],
                    ['阅朗','5','0','0','5','0','0','3.1%','0','0%'],
                    ['新昂科拉','4','0','0','4','0','0','2.4%','0','0%']
                ]
            }
        }
    },
    methods:{

    },
    components:{
        comTable,
        Areaqueryshop
    }
}
</script>

<style lang="scss" scoped>
.inquireAll {
  padding-top: 6px;
}
</style>

