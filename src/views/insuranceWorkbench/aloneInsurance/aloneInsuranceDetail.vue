<template>
    <div class="alone-insurance-detail">
        <b-card header="销售订单信息">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="销售区域" label-text-align="right" :label-cols="4">
                        <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户姓名" label-text-align="right" :label-cols="4">
                        <b-form-input type="text"></b-form-input>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户电话" label-text-align="right" :label-cols="4">
                        <b-form-input type="text"></b-form-input>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户电话" label-text-align="right" :label-cols="4">
                        <div id="radioStyle">
                            <label><input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>本店品牌</label>
                            <label><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" checked>他店品牌</label>
                        </div>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import {MessageBox, Message, DatePicker} from 'element-ui';
import api from 'common/api';
import config from 'common/config';
import common from 'common/common';
import areaqueryshop from 'components/iris-areaqueryshop';//销售区域选择组件
import pagination from 'components/pagination/pagination';
export default {
    components: {
        areaqueryshop
    },
    data() {
        return {
            selected: 'first',
            options: [
                { text: 'Toggle this custom radio', value: 'first' },
                { text: 'Or toggle this other custom radio', value: 'second' },
                { text: 'This one is Disabled', value: 'third', disabled: true },
                { text: 'This is the 4th radio', value: {fourth: 4} }
            ]
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        selectStores(){

        }
    },
    watch: {

    }
}
</script>

<style lang="scss" scope>
</style>
