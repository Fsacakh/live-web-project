<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="选择经销商店" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <areaqueryshop :readonly="false"  @sales-data="salesdata"  @select-change="selectedfun"></areaqueryshop>
                        </div>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
import { MessageBox, Message, TimePicker, DatePicker} from 'element-ui'
import Areaqueryshop from 'components/iris-areaqueryshop/index'
Vue.use(TimePicker)
Vue.use(DatePicker)
export default {
    components: {
        Areaqueryshop
    },
    data() {
        return {
            
        }
    },
    methods: {
        salesdata: function() {},
        selectedfun: function(val1, val2) {
            console.log(val1)
            console.log(val2)
        },
    }
}
</script>
<style>

</style>
