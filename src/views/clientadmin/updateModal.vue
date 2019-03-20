<template>
    <div class="row">
        <div class="col-md-12">
            <b-card header="基本信息">
                <div class="row">
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="客户类型 *" :label-cols="4" class="text-right">
                            <b-form-select :state="customTypeState" v-model="params.customType" :options="customType" class="mb-3">
                            </b-form-select>
                            <b-form-feedback class="text-left">
                            </b-form-feedback>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="客户来源 *" :label-cols="4" class="text-right">
                            <b-form-select :state="customSourceState" v-model="params.customSource" :options="clientsource" class="mb-3">
                            </b-form-select>
                            <b-form-feedback class="text-left">
                            </b-form-feedback>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="客户群体" :label-cols="4" class="text-right">
                            <b-form-select v-model="params.customGroup" :options="clientgroup" class="mb-3">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                </div>
            </b-card>
        </div>
        <div class="col-md-12">
            <b-card header="个人信息">
                <div class="row">
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="客户姓名 *" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.customName" :state="customNameState" placeholder="必填项" />
                            <b-form-feedback class="text-left">
                            </b-form-feedback>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="客户性别" :label-cols="4" class="text-right">
                            <b-form-select v-model="params.gender" :options="gender" class="mb-3">
                            </b-form-select>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="固定电话" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.customPhone" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="移动电话 *" :label-cols="4" class="text-right">
                            <b-form-input :state="mobilePhoneState" v-model="params.mobilePhone" placeholder="必填项" />
                            <b-form-feedback class="text-left">
                            </b-form-feedback>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="证件号码" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.idNo" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="生日" :label-cols="4" class="text-right">
                            <date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="params.birthday" @change="birthday" type="date" placeholder="选择日期">
                            </date-picker>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="邮箱" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.email" />
                        </b-form-fieldset>
                    </div>
                </div>
            </b-card>
        </div>
        <div class="col-md-12">
            <b-card header="联系地址">
                <div class="row">
                    <div class="col-md-4" @click="treedisplay">
                        <b-form-fieldset horizontal label="行政区域" :label-cols="4" class="text-right">
                            <b-form-input v-model="countyName" readonly/>
                            <div class="treepick-warp text-left" v-if="show">
                                <Tree ref="tree" @current-change="currentChange" :data="treeData" style="border: none;" :expand-on-click-node="false" :check-strictly="true" :highlight-current='true' :props="propOption" :load="loadNodeSales" lazy empty-text="暂无数据">
                                </Tree>
                            </div>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="详细地址" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.address" />
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4">
                        <b-form-fieldset horizontal label="邮政编码" :label-cols="4" class="text-right">
                            <b-form-input v-model="params.postalCode" />
                        </b-form-fieldset>
                    </div>
                </div>
            </b-card>
        </div>
        <div class="col-md-12" v-if="clientadditiveinfo.length !== 0">
            <b-card header="客户附加信息">
                <div class="row">
                    <div class="col-md-4" v-for="item in clientadditiveinfo">
                        <b-form-fieldset horizontal :label="item.addName" :label-cols="4" class="text-right">
                            <b-form-input v-model="item.addValue" />
                        </b-form-fieldset>
                    </div>
                </div>
            </b-card>
        </div>
        <div class="col-md-12 text-right mb-3">
            <b-button class="mr-1" @click="close" type="button" variant="">取消</b-button>
            <b-button class="ml-1" @click="preserve" type="button" variant="primary">保存</b-button>
        </div>
    </div>
</template>
<script>
    import SearchBtn from 'components/searchBtn/searchBtn'
    import Vue from 'vue'
    import api from 'common/api'
    import config from 'common/config'
    import {
        MessageBox,
        DatePicker,
        Tree
    } from 'element-ui'
    Vue.component(MessageBox.name, MessageBox)
    export default {
        components: {
            SearchBtn,
            DatePicker,
            Tree
        },
        data() {
            return {
                clientadditiveinfo: [], //客户附加信息
                customType: [], //客户类型
                clientsource: [], //客户来源
                clientgroup: [], //客户群体
                provincialarea: [], //省级行政区域
                cityarea: [], //市级区域
                county: [], //县区区域
                gender: [{
                    value: "1",
                    text: "男"
                }, {
                    value: "0",
                    text: "女"
                }],
                params: {
                    customName: "", //客户名字
                    customPhone: "", //固定电话
                    mobilePhone: "", //移动电话
                    idNo: "", //身份证号码
                    birthday: "", //生日
                    email: "", //邮箱
                    customCode: "", //客户编码
                    customType: "", //客户类value
                    customSource: "", //客户来源value
                    customGroup: "", //客户群体类型value
                    address: "", //详细地址
                    postalCode: "", //邮政编码
                    gender: "0", //客户性别
                    county: "" //区县
                },
                customNameState: null,
                customCodeState: null,
                customSourceState: null,
                customTypeState: null,
                mobilePhoneState: null,
                show: false,
                treeData: [],
                propOption: {
                    label: 'text',
                    children: 'zones'
                },
                countyName: ""
            }
        },
        methods: {
            getarea(areaCode, sc) {
                //查询省级行政区域
                api.area.getChinaAreaInfoByAreaCode({
                    areaCode: areaCode
                }).then((msg) => {
                    if (msg.data.code == 'success') {
                        let data = msg.data.obj && msg.data.obj.chinaAreaSubInfo || []
                        sc(data)
                    }
                })
            },
            preserve() {
                if (!this.params.customName) {
                    this.customNameState = 'invalid'
                }
                if (!this.params.customCode) {
                    this.customCodeState = 'invalid'
                }
                if (!this.params.customSource) {
                    this.customSourceState = 'invalid'
                }
                if (!this.params.customType) {
                    this.customTypeState = 'invalid'
                }
                if (!this.params.mobilePhone) {
                    this.mobilePhoneState = 'invalid'
                }
                if (!this.params.customName || !this.params.customCode || !this.params.customSource || !this.params.customType || !this.params.mobilePhone) {
                    return
                }
                this.params.customAddInfos = this.clientadditiveinfo
                if (this.params.birthday === "") {
                    delete this.params.birthday
                }
                api.clientadmin.clientmaininfo.updataclientmaininfo(this.params, (msg) => {
                    if (msg.data.code === 'success') {
                        this.$router.push({
                            path: `/clientmain/queryclientmain/${this.params.customCode}`
                        })
                    }
                })
            },
            close() {
                this.$router.push({
                    path: `/clientmain/queryclientmain/${"customcode"}`
                })
            },
            getDataDictionary(refCode, obj) {
                api.ref.getDataDictionary({
                    refCode: refCode
                }).then((msg) => {
                    if (msg.data.message == 'success') {
                        let data = msg.data.obj.referenceDetailInfos || [];
                        for (var i = 0; i < data.length; i++) {
                            for (var i = 0; i < data.length; i++) {
                                this.$set(obj, i, {
                                    value: data[i].refDetailCode,
                                    text: data[i].refDetailName
                                })
                            }
                        }
                    }
                })
            },
            birthday() {
                let timeOne = this.params.birthday
                this.params.birthday = timeOne.getFullYear() + '-' + (timeOne.getMonth() + 1) + '-' + timeOne.getDate()
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
            currentChange(value, data) {
                this.treedisplay()
                this.params.county = value.value
                this.countyName = value.text
            }
        },
        mounted() {
            this.params.customCode = this.$route.params.id
            //获取附加信息
            api.ref.getDataDictionary({
                refCode: config.client.clientmaininfo
            }).then((msg) => {
                if (msg.data.message == 'success') {
                    let data = msg.data.obj.referenceDetailInfos || [];
                    for (var i = 0; i < data.length; i++) {
                        this.$set(this.clientadditiveinfo, i, {
                            addCode: data[i].refDetailCode,
                            addName: data[i].refDetailName,
                            addValue: "",
                            customCode: this.params.customCode
                        })
                    }
                }
            })
            //查询修改的数据并渲染页面
            api.clientadmin.clientmaininfo.queryallclientmaininfo({
                customCode: this.params.customCode
            }, (msg) => {
                if (msg.data.code === 'success') {
                    let data = msg.data.obj;
                    let customAddInfos = data.customAddInfos;
                    this.params = {
                        customName: data.customName, //客户名字
                        gender: data.gender, //客户性别
                        customPhone: data.customPhone, //固定电话
                        mobilePhone: data.mobilePhone, //移动电话
                        idNo: data.idNo, //身份证号码
                        birthday: data.birthday, //生日
                        email: data.email, //邮箱
                        customCode: data.customCode, //客户编码
                        customType: data.customType, //客户类value
                        customSource: data.customSource, //客户来源value
                        customGroup: data.customGroup, //客户群体类型value
                        address: data.address, //详细地址
                        postalCode: data.postalCode, //邮政编码
                        id: data.id,
                        county: data.county
                    }
                    this.countyName = data.countyName
                    for (let i = 0; i < customAddInfos.length; i++) {
                        for (let j = 0; j < this.clientadditiveinfo.length; j++) {
                            if (this.clientadditiveinfo[j].addCode === customAddInfos[i].addCode) {
                                this.clientadditiveinfo[j].addValue = customAddInfos[i].addValue
                            }
                        }
                    }
                }
            })
            //获取客户类型
            this.getDataDictionary(config.client.clienttypecode, this.customType)
            //客户来源
            this.getDataDictionary(config.client.clientsourcecode, this.clientsource)
            //客户群体
            this.getDataDictionary(config.client.clientgroupcode, this.clientgroup)
        }
    }
</script>
<style>
    .treepick-warp {
        width: 100%;
        position: absolute;
        height: 250px;
        overflow: auto;
        box-shadow: 0 6px 8px 0 rgba(155, 155, 155, 0.50);
        background-color: #fff;
        z-index: 999;
        top: 100%;
        padding: 0 5px;
        box-sizing: border-box;
    }
</style>
