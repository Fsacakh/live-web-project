<template>
<div class="row">
<div class="col-md-12">
    <b-card header="商务政策">
        <!-- <div slot="header" @click="toggle">
            <strong>商务政策</strong>
        </div> -->
        <div v-show="!show">
            <div class="table-scrollable mb-2">
                <b-table striped hover bordered show-empty :items="list" :fields="fields">
                    <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                    <template slot="_promotionTypeName" slot-scope="row">{{getPromTypeName(row.item)}}</template>
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
                // ,  accountTypeCode
                _promotionTypeName: {
                    label: '政策类型'
                },

                promotionName: {
                    label: '政策名称'
                },
                businessCost: {
                    label: 'SI 金额'
                },
                promotionCost: {
                    label: 'SI 成本'
                },
                accountTypeName: {
                    label: '账类'
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
        },
        getPromTypeName(item) {
            return item.accountTypeName
        }
    },
    watch: {
        orderDetailObj() {
            this.list = this.orderDetailObj.orderPromotionInfoVoList
        }
    },
    filters: {
        substring(val) {
            if(!val && val !== 0) {
                return ''
            }
            return val.toFixed(2)
        }
    }
}
</script>
