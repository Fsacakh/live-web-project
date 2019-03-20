<template>
<div class="row">
<div class="col-md-12">
    <b-card :header='title'>
        <!-- <div slot="header" @click.native="toggle"> -->
            <!-- <strong>整车订单 ( {{item.carOrderNo}} )</strong>  -->
        <!-- </div> -->
        <div v-show="!show">
            <div class="row">
                <div class="col-md-4">
                    <p>
                        <strong>厂家 : </strong>
                        <span>{{obj.carFactoryName}}</span>
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>品牌 : </strong>
                        <span>{{obj.carBrandName}}</span>
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>车系 : </strong>
                        <span>{{obj.carSeriesName}}</span>
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>车型 : </strong>
                        <span>{{obj.carModelName}}</span>
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>车款 : </strong>
                        <span>{{obj.carDisplayName}}</span>
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>生产号 : </strong>
                        <span>{{obj.productionNo}}</span>
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>车架号 : </strong>
                        <span>{{obj.vinNo}}</span>
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>SKU编码 : </strong>
                        <span>{{obj.skuCode}}</span>
                    </p>
                </div>
            </div>
            <div class="table-scrollable mb-2">
                <b-table striped hover bordered show-empty :items="list" :fields="fields">
                    <!-- <template slot="discountPrice" slot-scope="row"></template>  -->
                    <template slot="discountPrice" slot-scope="row">
                        {{ row.value | substring }}
                    </template>
                    <template slot="gpValue" slot-scope="row">{{row.value | substring}}</template>
                    <!-- <template slot="businessGpValue" slot-scope="row">{{row.value | substring}}</template>                                                   -->
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
                // originalSalesPrice ( 之前的字段 )
                msrp: {
                    label: '车辆MSRP'
                },
                discountPrice: {
                    label: '车辆折后价'
                },
                additionalFee: {
                    label: '消费税及附加'
                },
                actualSalesPrice: {
                    label: '实际车辆售价'
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
            show: false,
            item: { carOrderNo: '' },
            obj: {}
        }
    },
    computed: {
        title() {
            return `整车订单( ${this.item.carOrderNo} )`
        },
        ...mapGetters('order', [
            'orderDetailObj'
        ])
    },
    methods: {
        getList() {
            let items = this.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList
            items.forEach(item => {
                const data = {
                    // originalSalesPrice: item.originalSalesPrice,
                    msrp: item.msrp,
                    discountPrice: item.actualSalesPrice - item.additionalFee,
                    additionalFee: item.additionalFee,
                    actualSalesPrice: item.actualSalesPrice,
                    accountTypeName: item.accountTypeName,
                    gpValue: item.gpValue,
                    businessGpValue: item.businessGpValue,              // 毛利 %
                    gpAscription: item.gpAscription
                }
                this.list.push(data)
            })
        },
        toggle() {
            this.show = !this.show
        }
    },
    watch: {
        orderDetailObj() {
            // 获取头部 子订单号
            this.item = this.orderDetailObj.carOrderInfoVoList[0]
            // 获取整车订单头信息
            this.obj = this.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0]
            // 获取列表信息
            this.getList()
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
