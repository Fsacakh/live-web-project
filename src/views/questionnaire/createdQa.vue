<template>
    <div class="animated fadeIn">
        <b-card header="主档信息">
            <div class="row">
                <div class="col-md-6" v-if="type=='edit'">
                    <b-form-fieldset horizontal label="已答卷数" :label-cols="3" class="text-right">
                        <b-form-input v-model="answeredUsers" readonly />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="问卷名称 *" :label-cols="3" class="text-right">
                        <b-form-input v-model="qaName" :disabled="judge" :maxlength="18" :state="checkout.qaName"/>
                        <!-- <span v-if="edit.qaName.length>'18'" style="color: red">输入小于18个字符</span> -->
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="问卷类型 *" :label-cols="3" class="text-right">
                        <b-form-select v-model="qaType" :options="qaTypes" :disabled="judge || Number(answeredUsers) != 0" :state="checkout.qaType"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="问卷目的" :label-cols="3"  class="text-right">
                        <b-form-textarea v-model="edit.qaSubject"  :disabled="judge"
                            placeholder="请输入．．．"
                            :rows="3"
                            :max-rows="10" :maxlength="50">
                        </b-form-textarea>
                        <!-- <span v-if="edit.qaSubject.length>'50'" style="color: red">输入小于50个字符</span> -->
                    </b-form-fieldset>
                </div>
                <div class="col-md-6" v-if="type=='edit'"></div>
                <div class="col-md-6 text-right" v-if="!judge">
                    <!-- <router-link to="/questionnaire/query"> -->
                        <b-button @click="judge = true, subjoin=false" class="pl-3 pr-3 pt-2 pb-2">取消</b-button>
                    <!-- </router-link> -->
                    <b-button class="pl-3 pr-3 pt-2 pb-2" variant="primary" @click="type=='add' ? addQa() : editQa()" :disabled="edit.qaName.length>'18'|| edit.qaSubject.length>'50'">
                        保存
                    </b-button>
                </div>
                <div class="col-md-6 text-right" v-if="judge">
                    <!--<router-link to="/questionnaire/query">
                        <b-button class="pl-3 pr-3 pt-2 pb-2">取消</b-button>
                    </router-link>-->
                    <!--<b-button class="pl-3 pr-3 pt-2 pb-2" variant="info" @click="judge = false, subjoin=true">
                    </router-link>-->
                    <b-button class="pl-3 pr-3 pt-2 pb-2" variant="success" v-if="editBtn" @click="judge = false, subjoin=true">
                       	 编辑
                    </b-button>
                </div>
            </div>
        </b-card>
        <b-card header="附加信息" v-if="subjoin">
            <div class="row">
                <div class="col-md-12">
                    <b-tabs pills>
                        <b-tab title="问卷题目" active>
                            <addQuestion ref="addQuestion"></addQuestion>
                        </b-tab>
                        <b-tab title="适用范围">
                            <suitscope 
                                :suitBtnControl="editBtn"
                                @shop-preserve="saveStores" 
                                :tab-data="tabdata" 
                                @sales-preserve="saveSales" 
                                @remove-tr="remove">
                            </suitscope>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { MessageBox, Message} from 'element-ui'
    import config from '../../common/config.js'
    import api from '../../common/api'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import AddQuestion from './addQuestion'
    import Suitscope from 'components/iris-suitscope/'
    Vue.component(MessageBox.name, MessageBox)
    export default {
        data() {
          return {
            border: 'border-red',
            judge: false,
            subjoin: true,
            type: 'add',
            edit: {
                qaType: '',
                qaCode: '',
                qaName: '',
                startDate: '2017-02-20',
                associationFlag: '0',
                onOffFlag: '0',
                qaSubject: "",
                questionnaireAddInfoVo: []
            },
            answeredUsers: 0,
            tabdata: [],
            checkout: {
                qaName: null,
                qaType: null
            },
            qaName: '',
            qaType: '',
          }  
        },
        components: {
            AddQuestion,
            Suitscope
        },
        computed: {
            editBtn() {
                return hasBtn(apiUrls.crm.editQa)
            },
            ...mapState('questionnaire', [
                    'qaTypes',
                    'qaCode',
                    'useRangeCode'
                ]),
        },
        created() {
            this.type = this.$route.params.id
            this.getQaInfo();
            this.getUseRangeer('', ()=>{});
            if (this.$route.params.id != 0) {
                this.judge = true
                this.type = 'edit'
                this.getQaEditData()
            } else {
                this.type = 'add'
                this.subjoin = false
            }
        },
        watch: {
            qaName: function() {
                if(this.qaName!='') {
                    this.checkout.qaName = null;
                }
            },
            qaType: function() {
                if(this.qaType!='') {
                    this.checkout.qaType = null;
                }
            }
        },
        mounted() {
            this.queryREange()
        },
        methods: {
            //当数据发生变化的时候触发的事件
            
            //获取使用范围编码
            getUseRangeer: function (par, fun) {
                this.$store.dispatch('questionnaire/getQaCode', {
                    poros: {"serviceCode": config.questionnaire.getUseRangeer},
                    callBack: function (msg) {
                        fun()
                    }
                })
            },
            saveSales: function (salelists) {
                const $this = this
                $this.getUseRangeer('', () => {
                    $this.save(salelists)
                })
            },
            saveStores: function (storelists) {
                const $this = this
                $this.getUseRangeer('', () => {
                    $this.save(storelists)
                })
                
            },
            remove: function (item) {
                let params = []
                if (item.length != 0) {
                    let data = {
                        'useRangeCode': item[0].useRangeCode,
                        "isDeleted": '1',
                        "id": item[0].id,
                        // "qaCode": item[0].qaCode
                    }
                    params.push(data)
                }
                
                this.editRange(params)
            },
            //编辑适用范围信息
            editRange: function(params) {
                api.crm.editQaScope(params).then(res => {
                    if (res.data.code === 'success') {
                        // callback()
                        Message({
                            type: 'info',
                            message: config.messInfo.success
                        });
                    }
                })
            },
            // 新增适用范围
            insertRange(params, callback) {
                api.crm.addQaScope(params).then(res => {
                    if (res.data.code === 'success') {
                        callback()
                        Message({
                            type: 'info',
                            message: config.messInfo.success
                        });
                    }
                })
            },
            //初始化适用范围
            queryREange: function() {
                this.getQueryRange({qaCode: this.$route.params.id, pageStart: 1, pageNums: config.maxPageNums}, res => {
                            this.tabdata = [];
                            console.log(res)
                            res.forEach(item => {
                                let data = {
                                    nationwide: "",
                                    sales: item.salesAreaName,
                                    shop: item.storeName || "全部",
                                    id: item.id,
                                    salesAreaCode: item.salesAreaCode, //销售区域编码
                                    storeCode: item.storeCode, //经销商店编码
                                    storeName: item.storeName, //经销商店编码
                                    qaCode: item.qaCode,
                                    useRangeCode: item.useRangeCode,
                                    rangeCode: item.rangeCode
                                }
                                this.tabdata.push(data)
                            })
                        })
            },
            // 查询适用范围
            getQueryRange(params, callback) {
                api.crm.quertQaScopc(params).then(res => {
                    if (res.data.code === 'success') {
                        let obj = res.data.obj.list
                        callback(obj)
                    }
                })
            },
            save(e) {
                let saveParams = [];
                let promise = new Promise((resolve, reject) => {
                    resolve()
                })
                promise.then(() => {
                    e.forEach(item => {
                        let data = {
                            "qaCode": this.$route.params.id=='0'?this.qaCode:this.$route.params.id,
                            "useRangeCode": this.useRangeCode,
                            "rangeCode": item.rangeCode,
                            "salesAreaCode": item.salesAreaCode,
                            "storeCode": item.storeCode || ''
                        }
                        saveParams.push(data)
                    });
                }).then(() => {
                    this.insertRange(saveParams, () => {
                        let param = { qaCode: this.$route.params.id=='0'?this.qaCode:this.$route.params.id, pageStart: 1, pageNums: config.maxPageNums };
                        this.getQueryRange(param, res => {
                            this.tabdata = [];
                            res.forEach(item => {
                                let data = {
                                    nationwide: "",
                                    sales: item.salesAreaName,
                                    shop: item.storeName || '全部',
                                    id: item.id,
                                    salesAreaCode: item.salesAreaCode, //销售区域编码
                                    storeCode: item.storeCode, //经销商店编码
                                    storeName: item.storeName, //经销商店编码
                                    qaCode: item.qaCode,
                                    rangeCode: item.rangeCode,
                                    useRangeCode: item.useRangeCode,
                                }
                                this.tabdata.push(data)
                            })
                        })
                    })

                })
            },
            getQaInfo: function () {
                const $this = this
                this.$store.dispatch('questionnaire/getQaType', {
                    poros: {
                        "refCode": config.questionnaire.getQaType,
                        "pageNums": config.maxPageNums,
                        "pageStart": "1"
                    },
                    callBack: function (msg) {
                    }
                    
                })
                if ($this.$route.params.id == 0) {
                    this.$store.dispatch('questionnaire/getQaCode', 
                        {
                            poros: {"serviceCode": config.questionnaire.getQaCode},
                            callBack: function () {
                                $this.edit.qaCode = $this.qaCode
                            }
                        })
                }
            },
            addQa: function () {
                const $this = this
                let juge = $this.qaName=="" || $this.qaType == ""
                if (juge) {
                    let required = {
                        qaName: $this.qaName,
                        qaType: $this.qaType
                    }
                    for(let i in required) {
                        if (required[i] != '') {
                            $this.checkout[i] = null;
                        } else {
                            $this.checkout[i] = false;
                        }
                    }
                    Message({
                        type: 'warning',
                        message: config.messInfo.qaInfo
                    });
                } else {
                    $this.edit.qaName = $this.qaName;
                    $this.edit.qaType = $this.qaType;
                    let params = {
                        qaType: this.qaType,
                        qaCode: this.edit.qaCode,
                        qaName: this.qaName,
                        qaSubject: this.edit.qaSubject
                    };
                    this.$store.dispatch('questionnaire/addQa',{
                        tp: params,
                        callBack: function (msg) {
                            if (msg.data.code == "success") {
                                $this.judge = true
                                $this.subjoin = true
                                $this.type = "edit"
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                            }
                        }
                    })
                }
            },
            //获取编辑数据
            getQaEditData: function () {
                const _this = this
                let params = {
                    qaCode: _this.$route.params.id,
                    // qaName: '',
                    // qaType: '',
                    // startDate: '',
                    // associationFlag: '',
                    // onOffFlag: '',
                    pageNums: config.pageNums,
                    pageStart: 1
                };
                api.crm.getQaInfo(params)
                .then(function(res) {
                    if (res.data.code == "success") {
                        let data = res.data.obj.list[0]
                        for(let i in _this.edit) {
                            _this.edit[i] = data[i]
                        }
                        _this.qaName = data.qaName
                        _this.qaType = data.qaType
                        _this.answeredUsers = data.answeredUsers

                        //查询问题列表
                        _this.$refs.addQuestion.queryQuestion()
                    }
                })
            },
            editQa: function () {
                const $this = this
                let juge = $this.qaName=="" || $this.qaType == ""
                if (juge) {
                    let required = {
                        qaName: $this.qaName,
                        qaType: $this.qaType
                    }
                    for(let i in required) {
                        if (required[i] != '') {
                            $this.checkout[i] = null;
                        } else {
                            $this.checkout[i] = false;
                        }
                    }
                    Message({
                            type: 'warning',
                            message: config.messInfo.qaInfo
                        });
                } else {
                    $this.edit.qaName = $this.qaName;
                    $this.edit.qaType = $this.qaType;
                    let params = {
                        qaType: this.qaType,
                        qaCode: this.edit.qaCode,
                        qaName: this.qaName,
                        qaSubject: this.edit.qaSubject
                    };
                    this.$store.dispatch('questionnaire/editQa', {
                        tp:params,
                        callBack:function(msg) {
                            if(msg.data.code == "success") {
                                $this.judge = true
                                $this.type = "edit"
                                Message({
                                    type: 'info',
                                    message: config.messInfo.success
                                });
                            }
                        }

                    })
                }
            }
        }
    }
</script>
<style>
    .border-red {
        border: 1px solid red;
    }
    .border-red:focus {
        border: 1px solid red;
        outline: red;
    }
</style>