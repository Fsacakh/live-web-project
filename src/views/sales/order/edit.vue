<template>
    <div class="animated">
        <div class="row">
            <div class="col-md-12">
                <b-card>
                    <div class="row">
                        <div class="col-md-4">
                            <p>
                                <strong>订单号 : </strong>
                                <span>{{orderDetailObj.orderNo}}</span>
                            </p>
                        </div>
                        <div class="col-md-4">
                            <p>
                                <strong>门店 : </strong>
                                <span>{{orderDetailObj.storeName}}</span>
                            </p>
                        </div>
                        <div class="col-md-4">
                            <p>
                                <strong>销售顾问 : </strong>
                                <span>{{orderDetailObj.salesEmpName}}</span>
                            </p>
                        </div>
                        <div class="col-md-4">
                            <p>
                                <strong>销售类型 : </strong>
                                <span>{{ salesType }}</span>
                            </p>
                        </div>
                        <div class="col-md-4">
                            <p>
                                <strong>订单客户 : </strong>
                                <span>{{orderDetailObj.custName}}</span>
                            </p>
                        </div>
                        <div class="col-md-4">
                            <p>
                                <strong>客户电话 : </strong>
                                <span>{{orderDetailObj.custMobile}}</span>
                            </p>
                        </div>
                        <div class="col-md-4">
                            <p>
                                <strong>订单总价 : </strong>
                                <span>{{orderDetailObj.actualTotalPrice}}</span>
                            </p>
                        </div>
                        <div class="col-md-4">
                            <p>
                                <strong>上牌类型 : </strong>
                                <span>{{ plateType }}</span>
                            </p>
                        </div>
                    </div>
                    <b-card header="整车订单">
                        <div class="row">
                            <div class="col-md-12">
                                <b-button size="sm" variant="primary" class="pull-right" @click="showSelectModal">查找车辆</b-button>
                            </div>
                        </div>
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
                                <template slot="discountPrice" slot-scope="row">
                                    {{ row.value | substring }}
                                </template>
                                <template slot="gpValue" slot-scope="row">
                                    {{ row.value | substring }}
                                </template>
                                <template slot="empty">
                                    暂无数据
                                </template>
                            </b-table>
                        </div>
                    </b-card>
                </b-card>
            </div>
        </div>
        <select-modal></select-modal>
    </div>
</template>

<script>
    const SALES_TYPE = 'orderAddInfoCarSalesSubKind',
        PLATE_TYPE = 'orderAddInfoPlateType'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import selectModal from './selectModal'
    export default {
        mounted() {
            this.getOrderInfo()
        },
        data: function() {
            return {
                fields: {
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
                salesType: '',
                plateType: '',
                list: [],
                show: false,
                item: {
                    carOrderNo: ''
                },
                obj: {}
            }
        },
        computed: {
            ...mapGetters('order', [
                'orderDetailObj'
            ])
        },
        methods: {
            getOrderInfo() {
                const params = {
                    orderNo: this.$route.params.id,
                    allSubOrderFlag: true
                }
                this.setDetailObj(params)
            },
            getTypes() {
                let addInfoList = this.orderDetailObj.orderAddInfos
                for (let i = 0, len = addInfoList.length; i < len; i++) {
                    if (addInfoList[i].addCode === SALES_TYPE) {
                        this.salesType = addInfoList[i].addValueName
                    } else if (addInfoList[i].addCode === PLATE_TYPE) {
                        this.plateType = addInfoList[i].addValueName
                    }
                }
            },
            getList() {
                this.list = []
                let items = this.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList
                items.forEach((item) => {
                    this.list.push({
                        msrp: item.msrp,
                        discountPrice: (item.actualSalesPrice - item.additionalFee),
                        additionalFee: item.additionalFee,
                        actualSalesPrice: item.actualSalesPrice,
                        accountTypeName: item.accountTypeName,
                        gpValue: item.gpValue,
                        businessGpValue: item.businessGpValue,
                        gpAscription: item.gpAscription
                    })
                })
            },
            ...mapActions({
                setDetailObj: 'order/setOrderDetailObj',
                showSelectModal: 'order/showSelectModal'
            })
        },
        watch: {
            orderDetailObj() {
                // 获取头部 子订单号
                this.item = this.orderDetailObj.carOrderInfoVoList[0]
                // 获取整车订单头信息
                this.obj = this.orderDetailObj.carOrderInfoVoList[0].carOrderDetailInfoList[0]
                this.getTypes()
                // 获取列表信息
                this.getList()
            }
        },
        filters: {
            substring(val) {
                if (!val && val !== 0) {
                    return ''
                }
                return val.toFixed(2)
            }
        },
        components: {
            selectModal
        }
    }
</script>
