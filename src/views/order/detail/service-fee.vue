<template>
<div class="row">
<div class="col-md-12">
    <b-card header="服务费及其他">
        <!-- <div slot="header" @click="toggle">
            <strong>服务费及其他</strong>
        </div> -->
        <div v-show="!show">
            <div class="table-scrollable mb-2">
                <b-table striped hover bordered show-empty :items="list" :fields="fields">
                    <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                    <template slot="agentBusinessFlag" slot-scope="row">{{row.value | businessFlag}}</template>
                    <template slot="gpValue" slot-scope="row">{{row.value | substring}}</template>
                    <!-- <template slot="businessGpValue" slot-scope="row">{{row.value | substring}}</template> -->
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
        </div>
    </b-card>
</div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            fields: {
                index: {
                    label: '序号'
                },
                serviceFeeTypeName: {
                    label: '费用名称'
                },
                // queren  ?  actualServiceFee 实际服务费金额
                actualServiceFee: {
                    label: '金额'
                },
                accountTypeName: {
                    label: '记账类型'
                },
                // 1 0
                agentBusinessFlag: {
                    label: '收入方式'
                },
                gpValue: {
                    label: '毛利( ￥ )'
                },
                no: {
                    label: '毛利( % )'
                },
                gpAscription: {
                    label: '毛利所属'
                }
            },
            list: [],
            show: false
        }
    },
    computed: {
        ...mapGetters('order', [
            'orderDetailObj'
        ])
    },
    methods: {
        toggle() {
            this.show = !this.show
        }
    },
    watch: {
        orderDetailObj() {
            this.list = this.orderDetailObj.orderServiceFeeInfoVoList
        }
    },
    filters: {
        substring(val) {
            if(!val && val !== 0) {
                return ''
            }
            return val.toFixed(2)
        },
        businessFlag(val) {
            if(val === '1') {
                return '代付'
            }else if(val === '0') {
                return '非代付'
            }
        }
    }
}
</script>
