<template>
    <b-modal id="detail" ref="detail" title="详细信息" size="lg" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-6">
                <b-form-fieldset horizontal label="厂家" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.carFactoryName" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="品牌" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.carBrandName" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="车系" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.carSeriesName" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="车型" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.carModelName" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="物流状态" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.logisticsStatus | filter" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="排量/进气" :label-cols="4" class="text-right">
                    <b-form-input :value="opvAndIoType" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="车款年份" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="生产日期" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="发动机号" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="生产号" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="底盘号" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="颜色代码" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="内饰代码" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="原厂配置" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="原厂加配" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="批发日期" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="批发付款日期" :label-cols="4" class="text-right">
                    <b-form-input :value="detailList.catlogCode" readonly/>
                </b-form-fieldset>
            </div>
        </div>
    </b-modal>
</template>
<script>
export default {
    props: ['detailList'],
    computed: {
        opvAndIoType() {
            if(this.detailList.length !== undefined) {
                return `${this.detailList.carOpvName}/${this.detailList.carIotypeName}`
            }else {
                return ''
            }
        }
    },
    filters: {
        filter(val) {
            if(val === -1) {
                return '采购待确认'
            }else if(val === 1) {
                return '在途'
            }else if(val === 2) {
                return '入库'
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
