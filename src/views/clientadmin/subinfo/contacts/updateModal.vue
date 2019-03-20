<template>
    <b-modal @show="showbefor" id="updata1" ref="updata" title="编辑联系人信息" size="lg" @shown="showmodal" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="联系人姓名" :label-cols="4" class="text-right">
                            <b-form-input :state="contactNameState" v-model="params.contactName" placeholder="必填信息" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="电子邮箱" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.email" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="生日" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.birthday" placeholder="格式：年-月-日" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="传真号码" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.faxNumber" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="性别" :label-cols="4" class="text-right">
                            <b-form-select v-model="params.gender" :options="gender" class="mb-3">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="身份证号码" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.idNumber" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="手机号" :label-cols="4" class="text-right">
                            <b-form-input :state="mobilePhoneState" v-model="params.mobilePhone" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="电话" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.phone" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="邮政编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.postalCode" />
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
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import {
        Tree
    } from 'element-ui'
    export default {
        components: {
            Tree
        },
        data() {
            return {
                // provincialarea: [], //省级行政区域
                // cityarea: [], //市级区域
                // county: [], //县区区域
                // provincialareaValue: "", //省级value
                // cityareaValue: "", //市级value
                // countyValue: "", //区县级value
                gender: [{
                    value: "1",
                    text: "男"
                }, {
                    value: "0",
                    text: "女"
                }],
                params: {
                    contactName: "", //联系人姓名
                    address: "", //	联系地址
                    birthday: "", //生日
                    faxNumber: "", //传真号码
                    email: "", //电子邮箱
                    gender: "", //性别
                    idNumber: "", //身份证号码
                    mobilePhone: "", //手机号
                    phone: "", //电话
                    postalCode: "", //邮政编码
                    countyCode: "", //所属区县编码
                    contactCode: "", //联系人编码
                    customCode: "" //客户编码
                },
                contactNameState: null,
                mobilePhoneState: null,
                countyName: "",
                show: false,
                treeData: [],
                propOption: {
                    label: 'text',
                    children: 'zones'
                },
            }
        },
        methods: {
            handleOk(evt) {
                if (!this.params.contactName) {
                    this.contactNameState = 'invalid'
                }
                if (!this.params.mobilePhone) {
                    this.mobilePhoneState = 'invalid'
                }
                if (!this.params.mobilePhone || !this.params.contactName) {
                    evt.cancel()
                    return
                }
                this.params.countyCode = this.getcounty();
                api.clientadmin.clientcontacts.updataclientcontacts(this.params, (msg) => {
                    if (msg.data.code == 'success') {
                        common.alertInfo("success")
                        this.$store.dispatch("clientmaininfo/querycontacts", this.params.contactCode);
                        this.params.contactName = "" //联系人姓名
                        this.params.address = "" //	联系地址
                        this.params.birthday = "" //生日
                        this.params.faxNumber = "" //传真号码
                        this.params.email = "" //电子邮箱
                        this.params.gender = "" //性别
                        this.params.idNumber = "" //身份证号码
                        this.params.mobilePhone = "" //手机号
                        this.params.phone = "" //电话
                        this.params.postalCode = "" //邮政编码
                        this.params.countyCode = "" //所属区县编码
                        this.params.contactCode = "" //联系人编码
                        this.provincialareaValue = "" //省级value
                        this.cityareaValue = "" //市级value
                        this.countyValue = "" //区县级value
                    } else {
                        common.alertInfo("warning")
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
            showmodal() {
                if (!this.amendcontactsdata) {
                    this.$refs.updata.hide()
                }
            },
            currentChange(value, data) {
                this.treedisplay()
                this.params.countyCode = value.value
                this.countyName = value.text
            },
            treedisplay() {
                this.show = !this.show;
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
            showbefor() {
                this.contactNameState = ""
                this.mobilePhoneState = ""
            },
            //     getcounty() {
            //         if (this.provincialareaValue) {
            //             if (this.cityareaValue) {
            //                 if (this.countyValue) {
            //                     this.params.countyCode = this.countyValue;
            //                     return this.params.countyCode
            //                     console.log('市级' + this.params.countyCode)
            //                 }
            //                 this.params.countyCode = this.cityareaValue;
            //                 console.log('市级' + this.params.countyCode)
            //                 return this.params.countyCode
            //             }
            //             this.params.countyCode = this.provincialareaValue;
            //             console.log('省级' + this.params.countyCode)
            //             return this.params.countyCode
            //         }
            //     }
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
        },
        computed: {
            ...mapState('clientmaininfo', [
                'amendcontactsdata',
            ]),
        },
        watch: {
            amendcontactsdata: function() {
                if (this.amendcontactsdata) {
                    api.clientadmin.clientcontacts.querydetailedclientcontacts({
                        contactCode: this.amendcontactsdata,
                    }, (msg) => {
                        if (msg.data.code == 'success') {
                            let data = msg.data.obj
                            this.params = {
                                contactName: data.contactName, //联系人姓名
                                address: data.address, //	联系地址
                                birthday: data.birthday, //生日
                                faxNumber: data.faxNumber, //传真号码
                                email: data.email, //电子邮箱
                                gender: data.gender, //性别
                                idNumber: data.idNumber, //身份证号码
                                mobilePhone: data.mobilePhone, //手机号
                                phone: data.phone, //电话
                                postalCode: data.postalCode, //邮政编码
                                countyCode: data.countyCode, //所属区县编码
                                contactCode: data.contactCode, //联系人编码
                                customCode: data.customCode, //客户编码
                                id: data.id,
                            }
                            this.countyName = data.countyName
                        }
                    })
                }
            }
        }
    }
</script>
<style>
    .modal-dialog {
        margin: 80px auto !important;
    }
</style>

