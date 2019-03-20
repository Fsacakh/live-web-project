<template>
    <div class="animated fadeIn">
        <b-card header="订单明细">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="订单号:" label-text-align="right" :label-cols="4">
                        <div class="text-left form-control border-none"><a href="javascript:;" @click.prevent="showDetail(orderInfo.orderNo)">{{orderInfo.orderNo}}</a></div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="门店:" label-text-align="right" :label-cols="4">
                        <div class="text-left form-control border-none">{{orderInfo.storeName}}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="客户姓名:" label-text-align="right" :label-cols="4">
                        <div class="text-left form-control border-none">{{orderInfo.custName}}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="客户手机:" label-text-align="right" :label-cols="4">
                        <div class="text-left form-control border-none">{{orderInfo.custMobile}}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售顾问:" label-text-align="right" :label-cols="4">
                        <div class="text-left form-control border-none">{{orderInfo.salesEmpName}}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="订单金额:" label-text-align="right" :label-cols="4">
                        <div class="text-left form-control border-none">{{ parseFloat(orderInfo.actualTotalPrice).toFixed(2) }}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="已开票金额:" label-text-align="right" :label-cols="4">
                        <div class="text-left form-control border-none">{{ parseFloat(orderInfo.actualInvoiceTotal).toFixed(2) }}</div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="更新日期:" label-text-align="right" :label-cols="4">
                        <div class="text-left form-control border-none">{{orderInfo.updateTimeStr && orderInfo.updateTimeStr.slice(0, 19)}}</div>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="mb-2">
                <b-button variant="success" size="sm" @click="getCode">新增</b-button>
                <b-button variant="primary" size="sm" @click="copyList">复制</b-button>
                <b-button variant="primary" size="sm" @click="addOrderBillingInfo('edit')">开票</b-button>
                <b-button variant="danger" size="sm" @click="deletedBilling">删除</b-button>
                <b-button variant="warning" size="sm" @click="showmodal">退票</b-button>
            </div>
            <div class="table-scrollable">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr class="text-center">
                            <th class="text-center" v-for="(item, index) in fields" :key="index">{{item}}</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="(item, index)  in invoiceList" :key="index">
                            <td class="text-cemter">
                                <input type="radio" name="invoiceDetail" :value="index" v-model="selectRow" />
                            </td>
                            <td class="text-center">{{index + 1}}</td>
                            <td class="text-center">
                                <select class="form-control" type="text" v-model="item.sourceSubOrderNo">
                                    <option v-for="(op, num) in subOrderInfo" :key="num" :value="op.value">{{ op.text }}</option>
                                </select>
                            </td>
                            <td class="text-center">
                                <select class="form-control" type="text" v-model="item.invoiceTypeCode">
                                    <option v-for="(op, num) in invoiceType" :key="num" :value="op.value">{{ op.text }}</option>
                                </select>
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.invoiceTitle" />
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.taxRegistrationNo" />
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.companyAddress" />
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.companyTelephone" />
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.openBankName" />
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.openBankAccount" />
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.invoicePrice" />
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.invoiceNo" />
                            </td>
                            <td class="text-center">
                                {{item.updateTimeStr}}
                            </td>
                            <td>{{item.refundInvoiceNo ? '退票': '开票'}}</td>
                        </tr>
                        <tr>
                            <td colspan="20" class="text-left" v-if="invoiceList.length == 0">暂无数据...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </b-card>
        <b-modal id="invoice" ref="invoice" size="lg" hide-footer :title="'退票'">
            <div class="col-md-11">
                <b-form-fieldset horizontal label="红冲发票编码" label-text-align="right" :label-cols="4">
                    <b-form-input v-model="orderBillingInfo.refundInvoiceNo" />
                </b-form-fieldset>
            </div>
            <div class="mb-2 text-right">
                <b-button variant="info" size="sm" @click="hide">取消</b-button>
                <b-button variant="success" size="sm" @click="submit">确定</b-button>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import {
        mapState
    } from "vuex";
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import config from "common/config";
    import api from "common/api";
    export default {
        created() {
            this.getOrderNoInfo();
            this.queryOrderBillingInfo();
            this.getType();
        },
        data() {
            return {
                query: {
                    sourceOrderNo: this.$route.params.id,
                    pageNums: config.maxPageNums,
                    pageStart: 1
                },
                fields: ['', '序号', '开票内容', '发票类型', '开票人/企业名称', '纳税人识别号', '地址', '电话', '开户行', '账号', '开票金额', '发票号', '更新时间', '状态'],
                invoiceList: [],
                orderBillingInfo: '',
                selectRow: -1
            }
        },
        computed: {
            ...mapState("financing", [
                "orderInfo",
                "subOrderInfo",
                "invoiceType",
                "invoiceCode"
            ]),
        },
        methods: {
            /*复制开票数据*/
            copyList() {
                if (this.selectRow < 0) {
                    Message({
                        type: 'warning',
                        message: '请先选择一条数据'
                    });
                    return
                }
                console.log(this.orderBillingInfo)
                this.orderBillingInfo = this.invoiceList[parseInt(this.selectRow)]
                delete this.orderBillingInfo.id
                delete this.orderBillingInfo.invoiceCode
                console.log(this.orderBillingInfo)
                this.invoiceList.push({
                    ...this.orderBillingInfo,
                    sourceSubOrderNo: null,
                    invoiceTypeCode: '',
                    invoicePrice: '',
                    invoiceNo: '',
                    updateTimeStr: '',
                })
            },
            showDetail(code) {
                this.$router.push({
                    path: '/order/detail/' + code
                })
            },
            showmodal() {
                if (this.invoiceList.length == 0) {
                    Message({
                        type: 'warning',
                        message: '请先添加发票'
                    });
                    return false;
                } else if (this.selectRow < 0) {
                    Message({
                        type: 'info',
                        message: config.messInfo.select
                    });
                } else {
                    this.orderBillingInfo = this.invoiceList[parseInt(this.selectRow)]
                    this.$refs.invoice.show();
                }
            },
            hide() {
                this.$refs.invoice.hide();
            },
            submit: function() {
                let $this = this;
                let params = [];
                if (!$this.orderBillingInfo.refundInvoiceNo) {
                    Message({
                        type: 'info',
                        message: config.messInfo.redNo
                    });
                    return
                }
                params.push($this.orderBillingInfo)
                $this.$store.dispatch('financing/addOrderBillingInfo', {
                    poros: params,
                    callBack: function(msg) {
                        if (msg.code === 'success') {
                            Message({
                                type: 'info',
                                message: config.messInfo.success
                            });
                            $this.queryOrderBillingInfo();
                            $this.$refs.invoice.hide();
                        }
                    },
                })
                this.hide();
            },
            getOrderNoInfo: function() {
                const $this = this;
                this.$store.dispatch('financing/getPayInfo', {
                    poros: {
                        orderNo: $this.$route.params.id,
                        allSubOrderFlag: true
                    },
                    callBack: function(msg) {
                        if (msg.data.code == "success") {}
                    }
                })
            },
            getType: function() {
                const $this = this;
                this.$store.dispatch("financing/getType", {
                    poros: {
                        refCode: config.financing.InvoiceType
                    },
                    callBack: function(msg) {
                        if (msg.data.code == "success") {}
                    }
                });
            },
            //获取开票抬头
            getInvoiceTitle() {
                let addValue;
                this.orderInfo.orderAddInfos.filter((currentValue, index, arr) => {
                    if (currentValue.addCode === "orderAddInfoInvoiceTitle") {
                        addValue = currentValue.addValue;
                    }
                });
                return addValue || '';
            },
            // 获取开票税号
            getInvoiceCusId() {
                let addValue;
                this.orderInfo.orderAddInfos.filter((currentValue, index, arr) => {
                    if (currentValue.addCode === "orderAddInfoInvoiceCusId") {
                        addValue = currentValue.addValue;
                    }
                });
                return addValue || '';
            },
            // 获取开票人联系方式
            getInvoiceCusMobile() {
                let addValue;
                this.orderInfo.orderAddInfos.filter((currentValue, index, arr) => {
                    if (currentValue.addCode === "orderAddInfoInvoiceCusMobile") {
                        addValue = currentValue.addValue;
                    }
                });
                return addValue || '';
            },
            getCode: function() {
                const $this = this
                let obj = {};
                obj.invoiceTypeCode = '';
                obj.invoiceTitle = this.getInvoiceTitle();
                obj.taxRegistrationNo = this.getInvoiceCusId();
                obj.companyAddress = '';
                obj.companyTelephone = this.getInvoiceCusMobile();
                obj.openBankName = '';
                obj.openBankAccount = '';
                obj.invoicePrice = '';
                obj.invoiceRate = '0'
                obj.invoiceNo = '';
                obj.sourceOrderNo = $this.$route.params.id
                obj.refundInvoiceNo = '';
                obj.sourceOrderTypeCode = $this.orderInfo.orderTypeCode;
                obj.sourceSubOrderNo = '';
                obj.createOrgCode = "2";
                $this.invoiceList.push(obj);
            },
            queryOrderBillingInfo: function() {
                const $this = this;
                $this.$store.dispatch('financing/queryOrderBillingInfo', {
                    poros: $this.query,
                    callBack: function(msg) {
                        if (msg.data.code == "success") {
                            let data = msg.data.obj.list
                            $this.invoiceList = [];
                            data.forEach(function(value, index) {
                                let obj = {};
                                obj.id = value.id;
                                obj.isDeleted = value.isDeleted;
                                obj.invoiceCode = value.invoiceCode;
                                obj.invoiceTypeCode = value.invoiceTypeCode;
                                obj.invoiceTitle = value.invoiceTitle;
                                obj.taxRegistrationNo = value.taxRegistrationNo;
                                obj.companyAddress = value.companyAddress;
                                obj.companyTelephone = value.companyTelephone;
                                obj.openBankName = value.openBankName;
                                obj.openBankAccount = value.openBankAccount;
                                obj.invoicePrice = value.invoicePrice;
                                obj.invoiceNo = value.invoiceNo;
                                obj.refundInvoiceNo = value.refundInvoiceNo;
                                obj.sourceOrderNo = value.sourceOrderNo;
                                obj.sourceOrderTypeCode = value.sourceOrderTypeCode;
                                obj.sourceSubOrderNo = value.sourceSubOrderNo;
                                obj.updateTimeStr = value.updateTimeStr;
                                $this.invoiceList.push(obj)
                            });
                            $this.getOrderNoInfo()
                        }
                    }
                })
            },
            deletedBilling: function() {
                const $this = this;
                if (this.selectRow < 0) {
                    Message({
                        type: 'warning',
                        message: config.messInfo.select
                    });
                    return
                }
                MessageBox.confirm('确定删除所选内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            $this.addOrderBillingInfo('deleted')
                            done();
                        } else {
                            done();
                            return
                        }
                    }
                })
            },
            addOrderBillingInfo: function(type) {
                const $this = this;
                if (type == 'deleted') {
                    let result = true
                    let params = [];
                    this.orderBillingInfo = this.invoiceList[parseInt(this.selectRow)]
                    this.orderBillingInfo.isDeleted = '1'
                    params.push(this.orderBillingInfo)
                    if (!result) {
                        this.invoiceList.splice(this.invoiceList.findIndex(l => l === this.orderBillingInfo), 1)
                        return
                    }
                    $this.$store.dispatch('financing/addOrderBillingInfo', {
                        poros: params,
                        callBack: function(msg) {
                            if (msg.data.code === 'success') {
                                Message({
                                    type: 'info',
                                    message: '删除成功'
                                });
                            }
                            $this.queryOrderBillingInfo()
                        },
                    })
                } else {
                    if (this.selectRow < 0) {
                        Message({
                            type: 'warning',
                            message: config.messInfo.select
                        });
                        return;
                    };
                    console.log(11111111)
                    this.orderBillingInfo = this.invoiceList[parseInt(this.selectRow)]
                    let sourceSubOrderTypeName = $this.subOrderInfo.filter((res) => {
                        if ($this.orderBillingInfo.sourceSubOrderNo == res.value) {
                            return res;
                        }
                    });
                    $this.orderBillingInfo.sourceSubOrderTypeName = sourceSubOrderTypeName[0].text;
                    $this.$store.dispatch('financing/addOrderBillingInfo', {
                        poros: [$this.orderBillingInfo],
                        callBack: function(msg) {
                            if (msg.data.code == "success") {
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                                $this.queryOrderBillingInfo()
                            }
                        },
                    })
                }
            },
        },
        components: {},
    }
</script>
<style lang="scss" scoped>
    .border-none {
        border: none !important;
    }
    .table-scrollable tr td {
        max-width: 150px !important;
        min-width: 150px !important;
    }
    .table-scrollable tr td:first-child {
        max-width: 50px !important;
        min-width: 50px !important;
    }
    .table-scrollable tr td:nth-child(2) {
        max-width: 80px !important;
        min-width: 80px !important;
    }
</style>


