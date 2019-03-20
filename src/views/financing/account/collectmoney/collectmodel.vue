<template>
    <div class="animated fateIn">
        <b-modal id="money" ref="money" size="lg" hide-footer :title="title">
            <div class="mb-2">
                <b-button variant="info" size="sm" @click="add">新增</b-button>
                <b-button variant="success" size="sm" @click="savePayInfo">保存</b-button>
            </div>
            <div class="scroll">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr class="text-center" v-if="payStatus == '1'">
                            <th class="text-center" v-for="(item, index) in fields" :key="index">{{item}}</th>
                        </tr>
                        <tr class="text-center" v-else>
                            <th class="text-center" v-for="(item, index) in fields2" :key="index">{{item}}</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="(item, index) in moneyList" :key="index">
                            <td class="text-center">{{index + 1}}</td>
                            <td class="text-center">
                                <select class="form-control" type="text" v-model="item.paymentTypeCode">
                                    <option v-for="(op, num) in paymentType" :key="num" :value="op.value">{{op.text}}</option>
                                </select>
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.moneyPrice"/>
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.paymentTransactionNo"/>
                            </td>
                            <td class="text-center">
                                <input class="form-control" type="text" v-model="item.remark"/>
                            </td>
                            <td class="text-center">
                                <b-button size="sm" variant="danger" @click="removeMoney(index)">删除</b-button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="20" class="text-left" v-if="moneyList.length=='0'">暂无数据...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { MessageBox, Message } from 'element-ui'
    import { mapState } from 'vuex'
    import config from 'common/config'
    import api from 'common/api'
    export default {
        data() {
            return {
                btnName: '',
                payStatus: '1',
                fields: ['序号', '支付方式', '金额', '交易凭证号','备注', '操作'],
                fields2: ['序号', '退款方式', '金额', '交易凭证号', '备注', '操作'],
                moneyList: [],
                title: '',
            }
        },
        computed: {
            ...mapState('financing', [
                    'orderInfo',
                    'paymentType',
                    'paymentCode',
                ])
        },
        created() {
        },
        methods: {
            showMadel: function (status) {
                this.moneyList = [];
                if(status == '1') {
                    this.title = '收款'
                    this.payStatus = config.income
                } else {
                    this.title = '退款'
                    this.payStatus = config.outcome
                }
                this.$refs.money.show()
            },
            add: function() {
                const $this = this
                // this.$store.dispatch('financing/getCode', {
                //     poros: {serviceCode: config.financing.paymentCode},
                //     callBack: function(msg) {
                        let obj = {};
                            obj.payStatus = $this.payStatus;
                            // obj.paymentCode = $this.paymentCode;
                            obj.paymentTypeCode = '';
                            obj.moneyPrice = '';
                            obj.paymentTransactionNo = '';
                            obj.sourceOrderNo = $this.orderInfo.orderNo;
                            obj.sourceOrderTypeCode = $this.orderInfo.orderTypeCode;
                            $this.moneyList.push(obj);
                //     }
                // })

            },
            removeMoney: function (num) {
                const $this = this
                MessageBox.confirm('确定执行此操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            let len = $this.moneyList.length
                            $this.moneyList.splice(num, 1);
                            if ($this.moneyList.length === len-1) {
                                done();
                            }
                        } else {
                            done();
                            return
                        }
                    },
                    callBack: function () {

                    }
                })
            },
            savePayInfo: function () {
                const $this = this
                // let  collectMoney = Number($this.orderInfo.actualTotalPrice) - Number($this.orderInfo.actualAmountTotal);
                // let moneyTotal = 0;
                // $this.moneyList.forEach(function(item, index) {
                //     moneyTotal += Number(item.moneyPrice)
                // });
                // if(moneyTotal > collectMoney) {
                //     Message({
                //         type: 'info',
                //         message: config.messInfo.collect + collectMoney
                //     });
                // }
                // for (let i = 0, len = $this.moneyList.length; i<len; i++ ) {
                //     if($this.moneyList[i].paymentTypeCode != 'paymentModeTypeCash') {
                //         console.log()
                //         if($this.moneyList[i].paymentTransactionNo == '') {
                //             // Message({
                //             //     type: 'warning',
                //             //     message: config.messInfo.collect
                //             // });
                //             console.log($this.moneyList[i])
                //             return
                //         }
                //     }
                // }
                let judge = false
                for(let j = 0; j<$this.moneyList.length; j++) {
                    if($this.moneyList[j].moneyPrice == 0 || ($this.moneyList[j].moneyPrice - 0) < 0) {
                        judge = true
                    }
                }
                if(!judge) {
                    $this.api()
                }else {
                    Message({
                        type: 'warning',
                        message: '金额不能为零或负数'
                    })
                    return
                }
                
            },
            api: function() {
                const $this = this

                this.$store.dispatch('financing/addPayInfoList', {
                    poros: $this.moneyList,
                    callBack: function(msg) {
                        if(msg.data.code == 'success') {
                            Message({
                                type: 'info',
                                message: config.messInfo.success
                            });
                            $this.$emit('getPayHistory', '')
                            $this.$refs.money.hide();
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="css" scoped>
    .scroll {
        height: 300px;
        overflow-y: scroll;
        /* overflow-x: hidden */
    }
    .text-center tr td {
        max-width: 150px !important;
        min-width: 150px !important;
    }
    .text-center tr td:first-child {
        max-width: 50px !important;
        min-width: 50px !important;
    }
    .text-center tr td:last-child {
        max-width: 80px !important;
        min-width: 80px !important;
    }
</style>
