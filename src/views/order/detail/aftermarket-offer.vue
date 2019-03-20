<template>
<div class="row">
<div class="col-md-12">
    <b-card :header='title'>
        <!-- <div slot="header" @click="toggle">
            <strong>后市场报价 ( {{skuOrderNo}} )</strong>
        </div> -->
        <div v-show="!show">
            <div class="table-scrollable mb-2">
                <b-table striped hover bordered show-empty :items="list" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{data.index + 1}}
                    </template>
                    <template slot="skuCode" slot-scope="row">
                        <template v-if="row.item.combinationCode">
                            <a href="javascript:;" @click="queryDetail(row.item)">
                                {{ row.item.combinationCode }}
                            </a>
                        </template>
                        <template v-else>
                            {{ row.item.skuCode }}  
                        </template>         
                    </template>
                    <template slot="skuName" slot-scope="row">{{getSkuName(row.item)}}</template>
                    <template slot="gpValue" slot-scope="row">{{row.value | substring}}</template>
                    <!-- <template slot="businessGpValue" slot-scope="row">{{row.value | substring}}</template> -->

                    <template slot="detailNums" slot-scope="row">{{ 1 }}</template>
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
        </div>
    </b-card>

    <b-modal id="detail" ref="detail" title="商品详细信息" size="lg" ok-title="确定" cancel-title="取消">
        <div class="table-scrollable mb-2">
            <b-table striped hover bordered show-empty :items="detailList" :fields="fields">
                <template slot="index" slot-scope="data">
                    {{data.index + 1}}
                </template>
                <template slot="gpValue" slot-scope="row">{{row.value | substring}}</template>
                <!-- <template slot="businessGpValue" slot-scope="row">{{row.value | substring}}</template>  -->
                <!-- <template slot="detailNums">{{ 1 }}</template> -->

                <template slot="empty">暂无数据</template>
            </b-table>
        </div>
    </b-modal>
</div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import {Message} from 'element-ui'
import api from 'common/api'
export default {
    data() {
        return {
            fields: {
                index: {
                    label: '序号'
                },
                skuCode: {
                    label: 'SKU编码'
                },
                skuName: {
                    label: '商品名称'
                },
                catlogNameLevel3: {
                    label: '商品目录一'
                },
                catlogNameLevel4: {
                    label: '商品目录二'
                },
                originalSalesPrice: {
                    label: '销售原价'
                },
                actualSalesPrice: {
                    label: '实际销售价'
                },
                // 后台无对应字段
                detailNums: {
                    label: '个数'
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
            detailList: [],
            show: false,
            orderNo: '',
            skuOrderNo: ''
        }
    },
    computed: {
        title() {
            return `后市场报价 ( ${this.skuOrderNo} )`
        },
        ...mapGetters('order', [
            'orderDetailObj'
        ])
    },
    methods: {
        toggle() {
            this.show = !this.show
        },
        getSkuCode(item) {
            return item.skuCode || item.combinationCode
        },
        getSkuName(item) {
            return item.skuName || item.combinationName
        },
        queryDetail(item) {
            if(!item.combinationCode) {
                Message({
                    type: 'warning',
                    message: '当前商品不是组合商品'
                })
                return
            }
            this.$refs.detail.show()
            const params = {
                orderNo: this.orderNo,
                combinationCode: item.combinationCode,
                combinationDetailCode: item.combinationDetailCode
            }
            api.order.querySkuDetail(params).then(res => {
                if(res.data.code === 'success') {
                    this.detailList = res.data.obj
                }
            })
        },
        getSkuOrderNo() {
            const params = {orderNo: this.orderNo}
            api.order.getSkuOrderNo(params).then(res => {
                const obj = res.data.obj
                if(res.data.code === 'success' && obj != null) {
                    this.skuOrderNo = obj.skuOrderNo
                }
            })
        }
    },
    watch: {
        orderDetailObj() {
            this.list = this.orderDetailObj.skuOrderInfoVoList
            this.orderNo = this.orderDetailObj.orderNo
            this.getSkuOrderNo()
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
<style scoped>
.check-box {
    position: relative;
}
.up {
    position: absolute;
    top: 2px;
    right: 0;
    width: 6px;
    height: 6px;
    border-top: 6px solid transparent;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 6px solid #666;
}
.down {
    position: absolute;
    top: 8px;
    right: 0;
    width: 6px;
    height: 6px;
    border-top: 6px solid #666;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 6px solid transparent;
}

</style>
