<template>
    <div class="animated fadeIn">
        <b-card header="市场活动信息">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="活动名称 *" :label-cols="3" class="text-right">
                        <b-form-input v-model="maName" :readonly="judge" :maxlength="15" :state="checkout.maName"  placeholder="必填"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="活动类型 *" :label-cols="3" class="text-right">
                        <b-form-select v-model="maType" :options="macType.getMaTypeList" :state="checkout.maType" :disabled="judge"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="活动时段 *" :label-cols="3" class="text-right">
                        <div :class="{timeborder: checkout.timeQuantum}">
                            <el-date-picker
                                v-model="value3"
                                type="daterange"
                                @change="datechange"
                                :clearable="true"
                                :disabled="judge"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="外部编码" :label-cols="3" class="text-right">
                        <b-form-input v-model="edit.externalCode" :readonly="judge" :maxlength="15" placeholder="请输入外部代码"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="活动发起" :label-cols="3"  class="text-right">
                        <b-form-select v-model="edit.maChannel" :options="initiator" :disabled="judge"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="活动外链" :label-cols="3" class="text-right">
                        <div>
                            <input class="form-control" type="url" v-model="edit.h5Url" placeholder="请输入网址" :readonly="judge"/>
                        </div>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="活动目的" :label-cols="3"  class="text-right">
                        <b-form-textarea
                            :readonly="judge"
                            v-model="edit.maPurpose"
                            placeholder="请输入．．．"
                            :maxlength="30"
                            :rows="3"
                            :max-rows="10">
                        </b-form-textarea>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="活动海报" :label-cols="3" class="text-right">
                        <div class="text-left" v-if="!fileName">
                            <upload 
                                    v-if="addCheckBtn"
                                    :disabled= "false"
                                    :addParams="addParams"
                                    :buttonName='buttonName'
                                    :theEcho='imgInfo'
                                    :onlyImage="true">
                            </upload>
                        </div>
                        <div v-else class="text-left form-control border-none" >
                            <a href="javascript:;" @click="showMadel">{{fileName}}</a>
                            <b-button v-if="addCheckBtn" class="ml-2" size="sm" variant="" @click="fileName = !fileName">
                            重新上传
                            </b-button>
                        </div>
                    </b-form-fieldset>
                </div>
                <div v-if="!judge" class="col-md-12 text-right mb-3">
                    <b-button @click="judge = true, subjoin=false, type='add'">取消</b-button>
                    <b-button v-if="addCheckBtn" variant="primary" @click="type=='add'?addSubmit():editSubmit()">
                        保存
                    </b-button>
                </div>
                <div v-if="judge" class="col-md-12 text-right">
                    <!-- <router-link to="/market/query">
                        <b-button>取消</b-button>
                    </router-link> -->
                    <b-button variant="success" v-if="addCheckBtn" @click="judge = false, subjoin=true, type='edit'">
                        修改
                    </b-button>
                </div>
            </div>
        </b-card>
        <b-card class="coverFather" v-if="subjoin">
            <div class="row">
                <div class="col-md-12">
                    <b-tabs pills @input="tabActive(tabindex)" v-model="tabindex">
                        <b-tab title="活动车型" active>
                            <div class="tabBodyScroll">
                                <div class="row">
                                    <AddCarInfo ref="marketCar"></AddCarInfo>
                                    <!-- <v-carinfo></v-carinfo> -->
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="活动话术">
                            <div class="tabBodyScroll">
                                <div class="row">
                                    <add-words ref="words"></add-words>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="活动名单">
                            <!--<AddCarInfo></AddCarInfo>-->
                            <div class="row">
                                <div class="col-md-12">
                                    <v-rollcall ref="refrollcall"
                                        :callParams="addParams2" :marketName='maName'>
                                    </v-rollcall>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </b-card>
        <b-modal id="maket" ref="maket" size="lg" hide-footer :title="'活动海报'">
            <div class="showImg">
                <img :src="filePath">
            </div>
        </b-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex'
    import { MessageBox, Button, Message, DatePicker} from 'element-ui'
    import AddWords from './addWords'
    import AddCarInfo from './addCarInfo'
    import VRollcall from './rollCall'
    import api from '../../common/api.js'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import config from '../../common/config.js'
    import upload from 'components/iris-upload/index'
    import { format } from 'common/com-api'
    Vue.component(MessageBox.name, MessageBox)
    Vue.use(Button)
    Vue.use(DatePicker)

    export default {
        data() {
            return {
                storeCode: '',
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() <= Date.now() - 8.64e7;
                    }
                },
                fileName: '',
                filePath: '',
                value3: [],
                sureJudge: false,
                buttonName: "上传活动海报",
                addParams: {
                    relationCode: '',
                    relationName: '',
                    singleFlag: '1',
                    businessType: 'haibao'
                },
                addParams2: {
                    relationCode: '',
                    relationName: '',
                    singleFlag: '1',
                    businessType: 'roll'
                },
                subjoin: true,
                type: 'add',
                posterFile: "",                   //活动海报
                modalshow: false,                 //模态框的显示隐藏   '', '', ''
                selectedCar: [],
                initiator: [
                    {
                        text: '厂商',
                        value: '厂商',
                    },
                    {
                        text: '总部',
                        value: '总部',
                    },
                    {
                        text: '经销商',
                        value: '经销商',
                    },
                ],
                judge: false,
                macType: {
                    getMaTypeList: []
                },                   //控制表单是否可编辑
                edit: {
                    id: '',
                    externalCode: '',
                    maName: '',
                    maType: '',
                    maChannel: '',
                    maPurpose: '',
                    h5Url: '',
                    startTime: '',
                    endTime: '',
                    doType: '1',
                    onOffFlag: '1',
                    maCarCode: '',             //活动车型
                    wordsCode: '',             //活动话术
                    wordsName: '',
                    wordsValue: '',
                    extendInfoList: {}
                },
                //树
                regions: [{
                    'name': 'region1'
                }, {
                    'name': 'region2'
                }],
                props: {
                    label: 'name',
                    children: 'zones'
                },
                count: 1,
                tabArr: [],
                tabindex: 0,
                checkout: {
                    maName: null,
                    maType: null,
                    timeQuantum: false
                },
                maType: '',
                maName: ''
            }
        },
        components: {
            upload,
            AddWords,
            VRollcall,
            AddCarInfo
        },
        computed: {
            addCheckBtn() {
                return hasBtn(apiUrls.marketActivity.createdMarketActivity)
            },
            ...mapState('marketActivity', [
                'wordsList',
                'dataList',
                'addBtn',
                'editBtn',
                'addMarketActivity',
                'additionalArea',         //控制附加信息的显示
                'addActivityWords',       //新增话术
                'getMaTypeList',          //获取结果
                'getSequence',            //获取市场活动编码
                'maCode',
                'editData',                  //获取的编辑数据
                'wordsSaveState',            //话术保存状态
                'carSaveState',              //车型保存状态
                'listSaveState',              //活动名单状态
                'addCarData',                 //车型参数
                'addWordsData',               //话术参数
                'addlistData'                 //名单参数
            ])
        },
        mounted() {
            this.getMaType()
            this.getEditData()
            this.getUserInfo();
        },
        methods: {
            getUserInfo() {
                api.getUserAvailableInfo((res) => {
                    let userInfo = res.data.obj;
                    if (userInfo != null) {
                        this.storeCode = userInfo.storeInfoVo.storeCode 
                    }
                })
            },
            ...mapActions('marketActivity', [
                'getCallList'
            ]),
            showMadel() {
                this.$refs.maket.show()
            },
            imgInfo(name, path) {
                this.fileName = name
                this.filePath = path
            },
            datechange() {
                if (this.value3 && this.value3.length > 1 && this.value3[0] && this.value3[1]) {
                   this.edit.startTime = this.value3[0].getFullYear() + '-' + (this.value3[0].getMonth() + 1) + '-' + this.value3[0].getDate();
                   this.edit.endTime = this.value3[1].getFullYear() + '-' + (this.value3[1].getMonth() + 1) + '-' + this.value3[1].getDate();
                   this.checkout.timeQuantum = false
                } else {
                   this.edit.startTime = ''
                   this.edit.endTime = '' 
                   this.checkout.timeQuantum = true
                }   
            },
            handleSuccess(response, file, fileList) {
                Message({
                    type: 'info',
                    message: config.messInfo.success
                })
            },
            handleErr(err, file, fileList) {
                Message({
                    type: 'info',
                    message: config.messInfo.fail
                })
            },
            tabActive: function (value) {
                let _this = this
                _this.tabArr.push(value);
                sessionStorage.setItem('maType', this.maType);
                if (value == '1') {
                    _this.$refs.words.queryWords()
                    // REFD2000333 厂商车辆召回 活动类型
                } else if (value == '2' && this.maType == 'REFD2000333') {
                    let data = {
                        relationCode: this.maCode,
                        relationName: this.maName,
                        recallFlag: '1',
                        pageStart: 1,
                        pageNums: config.pageNums,
                        storeCode: this.storeCode
                    }
                    api.marketActivity.queryVehicleRecallInfo(data, (res) => {
                        if (res.data.code == 'success') {
                            this.getCallList({
                                list: res.data.obj.list,
                                pager: {
                                    pageNo: res.data.obj.pageNum,
                                    totalPages: res.data.obj.pages,
                                    pageSize: res.data.obj.pageSize,
                                    total: res.data.obj.total,
                                }      
                            })
                        }
                    }) 
                }
                if (this.tabArr[this.tabArr.length-2]=='0'){               //保存车型
                    if (false) {
                        MessageBox.confirm('是否保存该方案', '提示', {
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                            type: 'warning'
                        }).then(() => {
                               _this.tabindex = _this.tabArr[_this.tabArr.length-2];
                        }).catch(() => {
                            this.tabArr.push(value);
                        });
                    }
                } else if(this.tabArr[this.tabArr.length-2]=='1'){
                    if (this.wordsSaveState) {
                        MessageBox.confirm('是否保存该方案', '提示', {
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                            type: 'info'
                        }).then(() => {
                            _this.tabindex = _this.tabArr[_this.tabArr.length-2];
                        })
                    }
                }else if(this.tabArr[this.tabArr.length - 2]=='2'){                     //保存活动名单
                    if (!this.listSaveState) {
                    }
                }
            },
            //新增
            addSubmit: function () {
                const _this = this
                let bleanoon = _this.maName == '' || _this.maType == '' || _this.edit.endTime == ''
                if (bleanoon) {
                    let required = {
                        maName: _this.maName,
                        maType: _this.maType,
                        endTime: _this.edit.endTime
                    }
                    for(let i in required) {
                        if(!required[i]) {
                            _this.checkout[i] = false;
                            _this.checkout.timeQuantum = true;
                            Message({
                                message:config.messInfo.qaInfo,
                                type: 'warning'
                            });
                        } else {
                            _this.checkout[i] = null;
                            _this.checkout.timeQuantum = false;
                        }
                    }
                } else {
                    this.$store.dispatch('marketActivity/addMarketActivity',
                    {
                        poros: {
                            "externalCode": _this.edit.externalCode,
                            "maCode": _this.maCode,
                            "maName": _this.maName,
                            "maType": _this.maType,
                            "maChannel": _this.edit.maChannel,
                            "doType": _this.edit.doType,
                            "h5Url": _this.edit.h5Url,
                            "onOffFlag": _this.edit.onOffFlag,
                            "startTime": _this.edit.startTime,
                            "endTime": _this.edit.endTime,
                            "maPurpose": _this.edit.maPurpose,
                        },
                        callBack: (msg) => {
                            if (msg.data.code == 'success') {
                                _this.edit.id = msg.data.obj.id
                                Message({
                                type: 'success',
                                    message: config.messInfo.success
                                });
                                _this.judge = true
                                _this.subjoin=true
                                _this.$nextTick(() => {
                                    _this.$refs.refrollcall.setMaName(_this.maName, _this.maCode)
                                })
                                _this.addParams.relationCode = _this.maCode
                                _this.addParams.relationName = _this.maName
                                _this.addParams2.relationCode = _this.maCode
                                _this.addParams2.relationName = _this.maName
                            } else {
                                if(msg.data.message == "请使用门店账号操作") {
                                    Message({
                                        type: 'error',
                                        message: '请使用门店账号操作'
                                    });
                                } else {
                                    Message({
                                        type: 'error',
                                        message: config.messInfo.fail
                                    });
                                }
                            }
                        }
                    })
                }
            },
            getMaType: function () {
                const _this = this;
                _this.$store.dispatch('marketActivity/getMaType', {
                    poros: {"refCode": config.market.refCode},
                    callBack: function (msg) {
                        _this.macType.getMaTypeList = JSON.parse(JSON.stringify(_this.getMaTypeList))
                        _this.macType.getMaTypeList[0].text = '请选择'
                    }
                })
            },
            //请求要编辑的数据
            getEditData: function () {
                const _this = this
                let id = _this.$route.params.id
                if (id == 0) {
                    _this.type = 'add'
                    this.subjoin = false
                     _this.$store.dispatch('marketActivity/getSequence', {
                        poros: {"serviceCode": config.market.getMaCode},
                        callBack: function (msg) {
                            _this.addParams.relationCode = _this.maCode
                            _this.addParams.relationName = _this.maName
                            _this.addParams2.relationCode = _this.maCode
                            _this.addParams2.relationName = _this.maName
                        }
                    })
                } else {
                    _this.type = 'edit'
                    _this.edit.id = id;
                    _this.$store.dispatch('marketActivity/getEditData', {
                        poros: {"id": id},
                        callBack: function (res) {
                            for(let i in _this.edit) {
                                _this.edit[i] = _this.editData[i]
                            }

                            _this.maName = _this.editData.maName
                            _this.maType = _this.editData.maType
                            _this.edit.startTime = _this.editData.startTime.slice(0,10)
                            _this.edit.endTime = _this.editData.endTime.slice(0,10)
                            _this.judge = true
                            let dateInfo = []
                            dateInfo.push(format(_this.editData.startTime))
                            dateInfo.push(format(_this.editData.endTime))

                            _this.value3  = dateInfo
                            _this.addParams.relationCode = _this.editData.maCode
                            _this.addParams.relationName = _this.editData.maName
                            _this.addParams2.relationCode = _this.editData.maCode
                            _this.addParams2.relationName = _this.editData.maName
                            _this.$refs.marketCar.getCarInfo(_this.editData.maCode)
                            api.market.getFileInfo({relationCode: _this.editData.maCode, businessType: 'haibao'}, res => {
                                if(res.data.code == 'success') {
                                    let fileInfo = res.data.obj[0]
                                    _this.filePath = fileInfo.filePath
                                    _this.fileName = fileInfo.fileOrgName
                                }
                            })
                            _this.$refs.refrollcall.setMaName(_this.editData.maName, _this.editData.maCode)
                        }
                    })
                }
            },
            //修改
            editSubmit: function () {
                const _this = this
                let bleanoon = _this.maName=='' || _this.maType=='' || _this.edit.endTime==''
                if (bleanoon) {
                    let required = {
                        maName: _this.maName,
                        maType: _this.maType,
                        endTime: _this.edit.endTime
                    };
                    for(let i in required) {
                        if(required[i]=="") {
                            _this.checkout[i] = false;
                            _this.checkout.timeQuantum = true;
                            Message({
                                message:config.messInfo.qaInfo,
                                type: 'warning'
                            });
                        } else {
                            _this.checkout[i] = null;
                            _this.checkout.timeQuantum = false;
                        }
                    }
                } else {
                        this.$store.dispatch('marketActivity/addMarketActivity',
                        {
                            poros: {
                                    "id": _this.edit.id,
                                    "externalCode": _this.edit.externalCode,
                                    "maCode": _this.maCode,
                                    "maName": _this.maName,
                                    "maType": _this.maType,
                                    "doType": _this.edit.doType,
                                    "maChannel": _this.edit.maChannel,
                                    "h5Url": _this.edit.h5Url,
                                    "onOffFlag": _this.edit.onOffFlag,
                                    "startTime": _this.edit.startTime,
                                    "endTime": _this.edit.endTime,
                                    "maPurpose": _this.edit.maPurpose,
                                    },
                            callBack: function (msg) {
                                if (msg.data.code == 'success') {
                                    Message({
                                        type: 'success',
                                        message: config.messInfo.success
                                    });
                                    _this.judge = true
                                } else {
                                    if(msg.data.message == "请使用门店账号操作") {
                                        Message({
                                            type: 'error',
                                            message: '请使用门店账号操作'
                                        });
                                    } else {
                                        Message({
                                            type: 'error',
                                            message: config.messInfo.fail
                                        });
                                    }
                                }
                            }
                        })
                    }
            }
        },
        watch: {
            maType: function () {
                const $this = this;
                if($this.matype != '') {
                    $this.checkout.maType = null;
                }
            },
            maName: function () {
                const $this = this;
                if($this.maName != '') {
                    $this.checkout.maName = null;
                }
            }
        }
    }
</script>
<style lang="scss">
    .border-none { 
        border: none !important;
    }
    .border-none > a {
        display: inline-block;
        width: 60%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .showImg {
        width: 80%;
        height: auto;
        overflow: hidden;
        margin: 0 auto;
    }
    .showImg img {
        width: 100%;
        height: auto;
    }
    .el-input.is-disabled .el-input__inner{
        background-color: #c2cfd6 !important;
        border-radius: 0 !important;
        color: #3e515b !important;
    }
    .el-input__icon {
        color: #536c79 !important;
    }
    .el-input {
        width: 100% !important;
    }
    .timeborder .el-input__inner {
        border-color: #f86c6b !important;
    }
    .already {
        height: 200px;
        overflow: auto;
        border: 1px solid #ccc;
    }
    .uPfile {
        width: 100px;
        height: 60px;
        opacity: 0
    }
    .tabBodyScroll {
        height: 280px;
    }
    .coverFather {
        position: relative;
        overflow: hidden;
    }
    .coverDiv {
        display: inline-block;
        position: absolute;
        z-index: 9999;
        width: 100%;
        height: 300px;
    }
</style>
