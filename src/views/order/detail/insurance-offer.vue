<template>
<div class="row">
<div class="col-md-12">
    <b-card :header="title">
        <div v-show="!show">
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="交强险实价" :label-cols="4" class="text-right">
                        <b-form-input readonly :value="totalStrongInsurancePrice()"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="车船税实价" :label-cols="4" class="text-right">
                        <b-form-input :value="totalVehicleAndVesselTaxPrice()" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险实价" :label-cols="4" class="text-right">
                        <b-form-input :value="totalBusinessInsurancePrice()" readonly/>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <b-form-fieldset horizontal label="商业险预估总价" :label-cols="4" class="text-right">
                        <b-form-input readonly :value="allBusinessInsurancePrice()"/>
                    </b-form-fieldset>
                </div>
            </div>
            <div v-for='(item, value) in listObj' :key="value">
                <b-card :header="'保险公司('+ item.insuranceOrgName +')'">
                    <div class="table-scrollable mb-2">
                        <b-table striped hover bordered show-empty :items="item.detail" :fields="fields">
                            <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                            <template slot="actualInsuranceLimit" slot-scope="row">{{row.value | substring}}</template>
                            <template slot="firstInsurancePrice" slot-scope="row">{{row.value | substring}}</template>
                            <template slot="actualSdewPrice" slot-scope="row">{{row.value | substring}}</template>
                            <template slot="actualFirstInsurancePrice" slot-scope="row">{{row.value | substring}}</template>
                            <template slot="commionFee" slot-scope="row">{{row.value | substring}}</template>
                            <template slot="gpValue" slot-scope="row">{{row.value | substring}}</template>
                            <template slot="no" slot-scope="row">{{row.value | substring}}</template>
                            <template slot="agentBusinessFlag" slot-scope="row">{{row.value | isFlag}}</template>
                            <template slot="empty">暂无数据</template>
                        </b-table>
                    </div>
                </b-card>
            </div>
        </div>
    </b-card>
</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
const STRONG_INSURANCE = 'strongInsurance',
      VEHICLE_AND_VESSELTAX = 'vehicleAndVesselTax',
      ALL_BUSINESS_INSURANCE =  'commercialAllInsurance'
export default {
    data() {
        return {
            fields: {
                index: {
                    label: '序号'
                },
                insuranceTypeName: {
                    label: '险种'
                },
                insuranceMonth: {
                    label: '投保期( 月 )'
                },
                actualInsuranceLimit: {
                    label: '保额( 元 )'
                },
                firstInsurancePrice: {
                    label: '保费原价( 元 )'
                },
                actualSdewPrice: {
                    label: '不计免赔( 元 )'
                },
                actualFirstInsurancePrice: {
                    label: '实价( 元 )'
                },
                agentBusinessFlag: {
                    label: '是否代收'
                },
                commionFee: {
                    label: '手续费'
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
            show: false,
            obj: null,
            listObj: {}
        }
    },
    computed: {
        insuranceOrderNo() {
            return this.obj == null ? '' : this.obj.insuranceOrderNo
        },
        detail() {
            return this.obj == null ? [] : this.obj.detailList
        },
        insuranceCompany() {
            return this.obj == null ? '' : this.detail[0].insuranceOrgName
        },
        title() {
            return `保险报价 ( ${this.insuranceOrderNo} )`
        },
        ...mapGetters('order', [
            'orderDetailObj'
        ])
    },
    methods: {
        toggle() {
            this.show = !this.show
        },
        // 交强险总价
        totalStrongInsurancePrice() {
            for(let i = 0, len = this.detail.length; i < len; i++ ) {
                if(this.detail[i].insuranceTypeCode === STRONG_INSURANCE) {
                    return this.detail[i].actualFirstInsurancePrice.toFixed(2)
                }
            }
        },
        // 车船税总价
        totalVehicleAndVesselTaxPrice() {
            for(let i = 0, len = this.detail.length; i < len; i++ ) {
                if(this.detail[i].insuranceTypeCode === VEHICLE_AND_VESSELTAX) {
                    return this.detail[i].actualFirstInsurancePrice.toFixed(2)
                }
            }
        },
        // 商业险总价
        totalBusinessInsurancePrice() {
            let num = 0
            if (this.obj && this.obj.businessPriceModelType == 0) {
                for(let i = 0, len = this.detail.length; i < len; i++ ) {
                    if(this.detail[i].insuranceTypeCode !== STRONG_INSURANCE && this.detail[i].insuranceTypeCode !== VEHICLE_AND_VESSELTAX && this.detail[i].insuranceTypeCode !== ALL_BUSINESS_INSURANCE) {
                      num += this.detail[i].actualFirstInsurancePrice
                    }
                }
            }
            return num.toFixed(2)
        },
        // 商业险总价
        allBusinessInsurancePrice() {
            let num = 0
            for(let i = 0, len = this.detail.length; i < len; i++ ) {
                if(this.detail[i].insuranceTypeCode == ALL_BUSINESS_INSURANCE) {
                    num += this.detail[i].actualFirstInsurancePrice
                }
            }
            return num.toFixed(2)
        },
        getListObj() {
            for(let i = 0; i < this.detail.length; i++) {
                this.listObj[this.detail[i].insuranceOrgCode] = {
                    insuranceOrgCode: this.detail[i].insuranceOrgCode,
                    insuranceOrgName: this.detail[i].insuranceOrgName,
                    detail: []
                }
            }
            for(let i = 0; i < this.detail.length; i++) {
                if(this.listObj.hasOwnProperty(this.detail[i].insuranceOrgCode)) {
                    if(this.detail[i].insuranceOrgCode === this.listObj[this.detail[i].insuranceOrgCode].insuranceOrgCode) {
                        this.listObj[this.detail[i].insuranceOrgCode].detail.push(this.detail[i])
                    }
                }
            }
        }
    },
    watch: {
        orderDetailObj() {
            this.obj = this.orderDetailObj.insuranceOrderInfoVoList[0]
        },
        detail(val) {
            if(val) {
                this.getListObj()
            }
        }
    },
    filters: {
        substring(val) {
            if(!val && val !== 0) {
                return ''
            }
            return val.toFixed(2)
        },
        isFlag(val) {
            if(val === 0) {
                return '否'
            }else if(val === 1) {
                return '是'
            }
        }
    }
}
</script>
