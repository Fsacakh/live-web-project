<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="选择经销商店" :label-cols="4" class="text-right">
                        <div class="text-left">
                            <areaqueryshop :storeAll='true'  @select-change="selectedfun"></areaqueryshop>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="订单号" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.orderNo"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售顾问" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.salesEmpName"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="客户姓名" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.custName"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="联系电话" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" v-model="query.custMobile"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="订单类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="sourceOrderType" v-model="query.orderTypeCode"/>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" @click="reset">重置</b-button>
                        <b-button size="sm" variant="primary" @click="queryPayInfo(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="outList" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                    </template>
                    <template slot="orderNo" slot-scope="data">
                        <a href="javascript:;" @click="routerTo(data.item.orderNo)">{{data.item.orderNo}}</a>
                    </template>
                    <template slot="actualTotalPrice" slot-scope="data">
                        {{ data.item.actualTotalPrice ? parseFloat(data.item.actualTotalPrice).toFixed(2) : '' }}
                    </template>
                    <template slot="moneyPriceTotal" slot-scope="data">
                        {{ data.item.moneyPriceTotal ? parseFloat(data.item.moneyPriceTotal).toFixed(2) : '' }}
                    </template>
                    <template slot="actualAmountTotal" slot-scope="data">
                        {{ data.item.actualAmountTotal ? parseFloat(data.item.actualAmountTotal).toFixed(2) : '' }}
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination 
                class="pull-right"
                @page-change="pageChange"
                :page-no="pager.pageNo"
                :page-size="pager.pageSize"
                :total-result="pager.total"
                :total-pages="pager.totalPages">
            </pagination>
        </b-card>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import config from 'common/config'
    import api from 'common/api'
    import Pagination from 'components/pagination/pagination'
    import areaqueryshop from 'components/iris-areaqueryshop'
    export default {
        components: {
            Pagination,
            areaqueryshop
        },
        data() {
            return {
                sourceOrderType: [
                  {
                    text: '请选择',
                    value: ''
                  }
                ],
                query: {
                    //退款原来是out  现在是refund
                    queryType: 'refund',
                    wfTypeCodeSet: ['NewCarRefuseWfType'],
                    orderNo: '',
                    salesEmpName: '',
                    custName: '',
                    custMobile: '',
                    orderTypeCode: '',
                    storeCodeSet: [],
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                select: [],
                tableList: [],
                fields: {
                    index: {
                        label: '序号'
                    },
                    orderNo: {
                        label: '订单号'
                    },
                    orderTypeName: {
                        label: '订单类型'
                    },
                    custName: {
                        label: '客户姓名'
                    },
                    custMobile: {
                        label: '客户电话'
                    },
                    salesEmpName: {
                        label: '销售顾问'
                    },
                    actualTotalPrice: {
                        label: '订单总金额'
                    },
                    moneyPriceTotal: {
                        label: '已退款金额'
                    },
                    actualAmountTotal: {
                        label: '实收金额'
                    }
                }
            }
        },
        computed: {
            ...mapState('financing', [
                'pager',
                'outList'
            ])
        },
        created() {
            // 订单类型
            api.ref.getDataDictionarys({
                refCode: 'TransactionNoteType'
            }, (res) => {
                if (res.data.code == 'success') {
                  this.getordertypes = res.data.obj.referenceDetailInfos
                  this.getordertypes.forEach(items => {
                      this.sourceOrderType.push(
                        {
                          text: items.refDetailName,
                          value: items.refDetailCode
                        },
                      )
                  })
                }
            })
            this.getOrderNoType()
        },
        methods: {
            selectedfun(sales, stores){
                let $this = this;
                $this.query.storeCodeSet = []
                if(Array.isArray(stores)){
                    stores.forEach(function(item){
                      if(item.value != 0){
                        $this.query.storeCodeSet.push(item.value);
                      }
                    });
                }else{
                    $this.query.storeCodeSet = [stores.value]
                }
            },
            reset() {
                this.query.orderNo = '';
                this.query.salesEmpName = '';
                this.query.custName = '';
                this.query.custMobile = '';
                this.query.orderTypeCode = '';
            },
            getOrderNoType: function () {
                this.$store.dispatch("financing/getType", {
                    poros: { refCode: config.financing.sourceOrderTypeCode },
                    callBack: function(msg) {
                        if (msg.data.code == "success") {
                        }
                    }
                });
            },
            queryPayInfo: function(page) {
                const $this = this
                this.query.pageStart = page
                this.$store.dispatch('financing/queryPayInfo', {
                    poros: $this.query,
                    callBack: function(msg) {
                        if(msg.data.code == 'success') {
                            // $this.tableList = msg.data.obj.list
                            // $this.pager.pageNo = msg.data.obj.pageNum
                            // $this.pager.totalPages = msg.data.obj.pages
                            // $this.pager.pageSize = msg.data.obj.pageSize
                            // $this.pager.total = msg.data.obj.total
                        }
                    }
                })
            },
            routerTo: function(code) {
                const $this = this
                this.$store.dispatch('financing/getPayInfo', {
                    poros: {orderNo: code},
                    callBack: function(msg) {
                        $this.$router.push(
                            {
                                path: `/outcollectmoney/detail/${code}-1`
                            }
                        )
                    }
                })

            },
            pageChange(page) {
                // this.query.pageStart = page
                this.queryPayInfo(page)
            }
        }
    }
</script>
<style lang="css" scoped>
</style>
