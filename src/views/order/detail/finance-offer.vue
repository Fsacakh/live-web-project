<template>
<div class="row">
<div class="col-md-12">
    <b-card :header="title">
        <!-- <div slot="header" @click="toggle">
            <strong>金融报价 ({{obj.financialOrderNo}})</strong>
        </div> -->
        <div v-show="!show">
            <div class="row">
                <div class="col-md-4">
                    <p>
                        <strong>产品类型 : </strong>
                        <span>{{detail.financeTypeName}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>金融机构 : </strong>
                        <span>{{detail.financeOrgName}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>首付金额 : </strong>
                        <span>{{detail.downPaymentAmount}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>贷款金额 : </strong>
                        <span>{{detail.valueOfLoan}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>期数 : </strong>
                        <span>{{detail.cycleMonth}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>利率( % ) : </strong>
                        <span>{{detail.taxRate}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>月供 : </strong>
                        <span>{{detail.payForMonth}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>还款方式 : </strong>
                        <span>{{detail.repaymentMethodName}}</span>                  
                    </p>
                </div>

                <div class="col-md-4">
                    <p>
                        <strong>尾款金额 : </strong>
                        <span>{{detail.balancePaymentValue}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>保证金 : </strong>
                        <span>{{detail.cautionMoney}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>机构贴息 : </strong>
                        <span>{{detail.financeSubsidyInterest}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>本店贴息 : </strong>
                        <span>{{detail.storeSubsidyInterest}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>金融手续费 : </strong>
                        <span>{{obj.totalCommissionFee | substring}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>毛利( ￥ ) : </strong>
                        <span>{{detail.gpValue | substring}}</span>                  
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>毛利( % ) : </strong>
                        <span></span>
                        <!-- <span>{{detail.businessGpValue | substring}}</span>                   -->
                    </p>
                </div>
                <div class="col-md-4">
                    <p>
                        <strong>毛利所属 : </strong>
                        <span>{{detail.gpAscription}}</span>                  
                    </p>
                </div>
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
            show: false,
            obj: {
                financialOrderNo: ''
            },
            detail: {}
        }
    },
    computed: {
        title() {
            return `金融报价 ( ${this.obj.financialOrderNo} )`
        },
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
            this.obj = this.orderDetailObj.financialOrderInfoVoList[0] || this.obj
            if(!this.orderDetailObj.financialOrderInfoVoList[0]) {
                this.detail = {}
            }else {
                this.detail = this.orderDetailObj.financialOrderInfoVoList[0].financialOrderDetailInfo        
            }
            if(this.orderDetailObj.orderCommissionFeeInfoList.length > 0){
                let index = this.orderDetailObj.orderCommissionFeeInfoList.findIndex((item) => {
                    return (item.financialOrderNo && item.financialOrderNo != '')
                })
                if (index >= 0) {
                    let feeInfo = this.orderDetailObj.orderCommissionFeeInfoList[index]
                    this.detail.gpValue = feeInfo.gpValue
                    this.detail.gpAscription = feeInfo.gpAscription 
                }
            }
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