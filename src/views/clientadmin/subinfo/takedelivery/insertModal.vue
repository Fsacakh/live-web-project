<template>
    <b-modal @show="showbefor" id="insert4" title="新增收货信息" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="收货人姓名" :label-cols="4" class="text-right">
                            <b-form-input :state="receiverNameState" v-model="params.receiverName" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="收货人手机号" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.receiverMobilePhone" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="收货人电话号" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.receiverPhone" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6" @click="treedisplay">
                        <b-form-fieldset horizontal label="行政区域" :label-cols="4" class="text-right">
                            <b-form-input v-model="countyName" readonly/>
                            <div class="treepick-warp text-left" v-if="show">
                                <Tree ref="tree" @current-change="currentChange" :data="treeData" style="border: none;" :expand-on-click-node="false" :check-strictly="true" :highlight-current='true' :props="propOption" :load="loadNodeSales" lazy empty-text="暂无数据">
                                </Tree>
                            </div>
                        </b-form-fieldset>
                    </div>
                    <!-- <div class="col-md-6">
                        <b-form-fieldset horizontal label="省份" :label-cols="4" class="text-right">
                            <b-form-select @input="provincialareachange" v-model="provincialareaValue" :options="provincialarea" class="mb-3">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="地级市" :label-cols="4" class="text-right">
                            <b-form-select @input="cityareachange" v-model="cityareaValue" :options="cityarea" class="mb-3">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="市、区、县" :label-cols="4" class="text-right">
                            <b-form-select v-model="countyValue" :options="county" class="mb-3">
                            </b-form-select>
                        </b-form-fieldset>
                    </div> -->
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="联系地址" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.address" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="邮政编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.postalCode" />
                        </b-form-fieldset>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import api from 'common/api'
    import config from 'common/config'
    import common from 'common/common'
    import {
        Message
    } from 'element-ui'
    import {
        Tree
    } from 'element-ui'
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        components: {
            Tree
        },
        data() {
            return {
                provincialarea: [], //省级行政区域
                cityarea: [], //市级区域
                county: [], //县区区域
                provincialareaValue: "", //省级value
                cityareaValue: "", //市级value
                countyValue: "", //区县级value
                params: {
                    address: "", //联系地址
                    receiverName: "", //收货人姓名
                    receiverMobilePhone: "", //收货人手机号
                    receiverPhone: "", //收货人电话号
                    address: "", //联系地址
                    postalCode: "", //邮政编码
                    customCode: "", //客户编码
                    receiverCode: "", //收货信息编码
                    countyCode: "" //区县
                },
                receiverNameState: null,
                treeData: [],
                propOption: {
                    label: 'text',
                    children: 'zones'
                },
                show: false,
                countyName: ""
            }
        },
        methods: {
            showbefor() {
                this.receiverNameState = null
            },
            treedisplay() {
                this.show = !this.show;
            },
            currentChange(value, data) {
                this.treedisplay()
                this.params.countyCode = value.value
                this.countyName = value.text
            },
            loadNodeSales(node, resolve) {
                if (node.level === 0) {
                    api.area.getChinaAreaInfoByAreaCode({
                        areaCode: config.areaRoot.area
                    }).then(res => {
                        if (res.data.code === 'success') {
                            let obj = res.data.obj;
                            var arr = [{
                                id: 0,
                                text: obj.areaName,
                                value: obj.areaCode
                            }];
                            resolve(arr);
                        }
                    })
                } else {
                    this.getarea(node.data.value, (data) => {
                        this.county = []
                        for (var i = 0; i < data.length; i++) {
                            this.$set(this.county, i, {
                                value: data[i].areaCode,
                                text: data[i].areaName
                            })
                        }
                        resolve(this.county);
                    })
                }
            },
            handleOk(evt) {
                if (!this.params.receiverName) {
                    this.receiverNameState = 'invalid'
                }
                if (!this.params.receiverMobilePhone) {
                    if (!this.params.receiverPhone) {
                        Message({
                            message: "收货人电话与收货人手机不可以同时为空",
                            type: "error"
                        })
                    }
                }
                if (!this.params.receiverName || (!this.params.receiverMobilePhone && !this.params.receiverPhone)) {
                    evt.cancel()
                    return
                }
                //获取编码
                if (!this.params.receiverPhone && !this.params.receiverMobilePhone) {
                    Message({
                        message: '收货人电话与收货人手机不可以同时为空',
                        type: 'warning'
                    });
                    return;
                }
                api.ordinalInfo.getSequence({
                    serviceCode: config.client.clienttakedeliverycode
                }, (msg) => {
                    if (msg.data.code == 'success') {
                        this.params.receiverCode = msg.data.obj
                        api.clientadmin.clientreceiver.addclientreceiver(this.params, (msg) => {
                            if (msg.data.code == 'success') {
                                common.alertInfo("success")
                                this.$store.dispatch("clientmaininfo/queryclientreceiver", this.params.receiverCode)
                                // this.params = {
                                //     receiverName: "", //收货人姓名
                                //     receiverMobilePhone: "", //收货人手机号
                                //     receiverPhone: "", //收货人电话号
                                //     address: "", //联系地址
                                //     postalCode: "", //邮政编码
                                //     receiverCode: "", //收货信息编码
                                //     countyCode: "" //区县
                                // }
                                this.params.address = "" //联系地址
                                this.params.receiverName = "", //收货人姓名
                                    this.params.receiverMobilePhone = "", //收货人手机号
                                    this.params.receiverPhone = "", //收货人电话号
                                    this.params.postalCode = "", //邮政编码
                                    this.params.receiverCode = "", //收货信息编码
                                    this.params.countyCode = "" //区县
                                this.provincialareaValue = "" //省级value
                                this.cityareaValue = "" //市级value
                                this.countyValue = "" //区县级value
                            } else {
                                common.alertInfo("warning")
                            }
                        })
                    }
                })
            },
            // 省
            // provincialareachange() {
            //     this.cityareaValue = ""
            //     this.countyValue = ""
            //     if (!this.provincialareaValue) return
            //     this.getarea(this.provincialareaValue, (data) => {
            //         this.cityarea = []
            //         this.county = []
            //         for (var i = 0; i < data.length; i++) {
            //             this.$set(this.cityarea, i, {
            //                 value: data[i].areaCode,
            //                 text: data[i].areaName
            //             })
            //         }
            //     })
            // },
            // 市
            // cityareachange() {
            //     this.countyValue = ''
            //     if (!this.cityareaValue) return
            //     this.getarea(this.cityareaValue, (data) => {
            //         this.county = []
            //         for (var i = 0; i < data.length; i++) {
            //             this.$set(this.county, i, {
            //                 value: data[i].areaCode,
            //                 text: data[i].areaName
            //             })
            //         }
            //     })
            // },
            getarea(areaCode, sc) {
                //查询省级行政区域
                api.area.getChinaAreaInfoByAreaCode({
                    areaCode: areaCode
                }).then((msg) => {
                    if (msg.data.code == 'success') {
                        let data = msg.data.obj.chinaAreaSubInfo || []
                        sc(data)
                    }
                })
            },
            // getcounty() {
            //     if (this.provincialareaValue) {
            //         if (this.cityareaValue) {
            //             if (this.countyValue) {
            //                 this.params.countyCode = this.countyValue;
            //                 return this.params.countyCode
            //                 console.log('市级' + this.params.countyCode)
            //             }
            //             this.params.countyCode = this.cityareaValue;
            //             console.log('市级' + this.params.countyCode)
            //             return this.params.countyCode
            //         }
            //         this.params.countyCode = this.provincialareaValue;
            //         console.log('省级' + this.params.countyCode)
            //         return this.params.countyCode
            //     }
            // }
        },
        mounted() {
            //获取客户编码
            this.params.customCode = this.$route.params.code
            //获取省级城市
            // this.getarea(config.areaRoot.area, (data) => {
            //     this.provincialarea = []
            //     for (var i = 0; i < data.length; i++) {
            //         this.$set(this.provincialarea, i, {
            //             value: data[i].areaCode,
            //             text: data[i].areaName
            //         })
            //     }
            // })
        }
    }
</script>
<style>
    .modal-dialog {
        margin: 80px auto !important;
    }
</style>

