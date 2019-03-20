<template>
    <div class="">
        <b-row>
            <div class=" col-12">
                <div class="col-5" v-if="tabType=='home'">
                    <b-form-fieldset horizontal label="适用范围类型" :label-cols="4" class="text-right">
                        <b-form-select value="home" @input="changeType" :options="scopeType" class="mb-3"></b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-12 float-right">
                    <sales v-if="tabType=='sales'"></sales>
                    <div v-else-if="tabType=='shop'">
                        <shop></shop>
                    </div>
                    <div v-else-if="tabType=='government'">
                        行政区域
                    </div>
                    <div v-if="tabType=='istabType'">
                        <tableShow></tableShow>
                    </div>
                </div>
            </div>
        </b-row>
    </div>
</template>
<script>
import Vue from 'vue'
import sales from './sales'
import shop from './shop'
import tableShow from './tableShow'
import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            rangeType: "1", //适用范围类型值
            // 适用范围类型
            scopeType: [{
                value: "home",
                text: "请选择",
            }, {
                value: "shop",
                text: "经销商店",
            }, {
                value: "sales",
                text: "销售区域"
            },
            {
                value: "government",
                text: "行政区域",
            }
            ],
        }
    },
    methods: {
        changeType(value) {
            let params = {
                tabType: value,
                istabType: false
            };
            this.getTableType(params)
        },
        ...mapActions({
            getTableType: 'finance/preserveShop'
        })
    },
    components: {
        sales,
        shop,
        tableShow,
    },
    computed: {
        ...mapState('finance', [
            'tabType',
            'istabType'
        ])
    },
}
</script>

<style lang="css">

</style>
