<template>
    <div class="animated fadeIn">
        <!-- 基本信息 -->
        <b-card header="基本信息">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户姓名" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" :value="taskInfo.custName" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="性别" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" :value="taskInfo.custSex == 0 ? '男':'女'" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="客户电话" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" :value="taskInfo.custMobilePhone" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="首次进店日期" :label-cols="4" class="text-right">
                        <b-form-input placeholder="" :value="taskInfo.firstOutStoreDate " readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="意向车型" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" :value="taskInfo.carName" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="销售顾问" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" :value="taskInfo.leadLastSaName" readonly/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="调研专员" label-text-align="right" :label-cols="4">
                        <b-form-input placeholder="" :value="taskInfo.currentTaskOperatorName" readonly/>
                    </b-form-fieldset>
                    <!-- <el-time-picker
                        :picker-options="{
                            selectableRange: '18:30:00 - 20:30:00'
                        }"
                        placeholder="停业时间">
                    </el-time-picker> -->
                </div>
            </div>
        </b-card>
        <b-card header="调研记录">
            <div class="table-scrollable boxHeight scrollY">
                <b-table striped hover bordered show-empty :items="taskInfo.salesLeadsTaskHistoryInfoList" :fields="fields">
                    <template slot="index" slot-scope="data">
                    </template>
                    <template slot="nextDoTime" slot-scope="data">
                        {{data.item.nextDoTime==null?'':data.item.nextDoTime.slice(0, 16)}}
                    </template>
                    <template slot="empty">
                            暂无数据...
                    </template>
                </b-table>
            </div>
        </b-card>
        <b-card header="调研题目">
            <div class="boxHeight scrollY" v-if="questionData.length != 0">
                <div class="row" v-for="(item, num) in questionData" :key="num">
                    <div class="col-md-12">
                        <p>{{item.questionTitle}}</p>
                    </div>
                    <div class="col-md-12">
                        <div class="row">
                            <div :class="item.questionType==2?'col-md-12': 'col-md-7'">
                                <span class="inlines container row" v-for="(answer, index) in item.answerInfoVo" :key="index">
                                &emsp;<span class="inlines container row jianda" v-if="item.questionType == '2'">
                                        <b-form-fieldset horizontal class="text-right">
                                                <b-form-textarea
                                                    v-model="answer.questionAnswer"
                                                    placeholder="请输入．．．"
                                                    :rows="3"
                                                    >
                                                </b-form-textarea>
                                        </b-form-fieldset>
                                    </span>
                                    <span v-if="answer.questionType != '2'">
                                        <input @click="radioStatus(num, index)"  v-model="answer.isOpt" v-if="answer.questionType == '0'"
                                                type="radio"
                                                :id="'one' + index"
                                                :name="'radioName' + num"
                                                />
                                        <input  v-model="answer.isOpt" v-if="answer.questionType == '1'"
                                                type="checkbox"
                                                :id="'one' + index"
                                                :name="'checkboxName3' + num"
                                                />
                                        <label :for="'one' + index">{{answer.questionAnswer}}</label>&emsp;&emsp;&nbsp;
                                    </span>
                                </span>
                            </div>
                            <div class="col-md-5">
                                <span v-if="item.questionType != '2'" class="pull-right">
                                    <b-form-fieldset horizontal label="备注:" :label-cols="3" class="text-right">
                                        <b-form-textarea
                                            v-model="item.remark"
                                            placeholder="请输入．．．"
                                            :rows="1"
                                            >
                                        </b-form-textarea>
                                    </b-form-fieldset>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="questionData.length == '0'">暂无题目信息...</div>
        </b-card>
        <b-card header="调研状态明细">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="调研状态" label-text-align="right" :label-cols="4" :disabled="saveTaskData.taskStatusCode == 'taskStatusSucc'">
                        <b-form-select :options="disposeTaskStatus" v-model="saveTaskData.taskStatusCode" :disabled='!savebtns'/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <div v-if="saveTaskData.taskStatusCode == 'taskStatusFail'">
                        <b-form-fieldset horizontal label="失败原因" label-text-align="right" :label-cols="4">
                            <b-form-select :options="failReasonList" v-model="saveTaskData.taskFailReasonCode" :disabled='!savebtns'/>
                        </b-form-fieldset>
                    </div>
                    <div v-if="saveTaskData.taskStatusCode == 'taskStatusFollowUp'">
                        <b-form-fieldset horizontal label="下次跟进时间" label-text-align="right" :label-cols="4">
                            <el-date-picker
                                v-model="value1"
                                @change="datechange(value1)"
                                type="datetime"
                                :picker-options="pickerOptions1"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </b-form-fieldset>
                    </div>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="重新分配" label-text-align="right" :label-cols="4">
                        <b-form-select :options="redistribution" v-model="saveTaskData.isChangeSalesman" :disabled="saveTaskData.taskStatusCode != 'taskStatusSucc' || !savebtns"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <div v-if="saveTaskData.isChangeSalesman=='1'">
                        <b-button size="sm" variant="default" @click="getTaskInfo('reallocate')" :disabled="saveTaskData.taskStatusCode != 'taskStatusSucc'">重新分配</b-button>
                    </div>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="是否投诉" label-text-align="right" :label-cols="4">
                        <b-form-select :options="complaints" v-model="saveTaskData.isHaveComplain" :disabled='!savebtns'/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <div v-if="saveTaskData.isHaveComplain=='1'">
                        <b-button size="sm" variant="default" @click="getTaskInfo('complain')">投诉记录</b-button>
                    </div>
                </div>
                <div class="col-md-12 col-lg-12">
                    <b-form-fieldset horizontal label="备注" :label-cols="2"  class="text-right">
                        <b-form-textarea
                            v-model="saveTaskData.remark"
                            placeholder="请输入．．．"
                            :rows="3"
                            :max-rows="10">
                        </b-form-textarea>
                    </b-form-fieldset>
                </div>
            </div>
        </b-card>
        <div class="row" v-if="savebtns">
            <div class="col-md-12 mb-3 text-right">
                <router-link to="/research/query">
                    <b-button>取消</b-button>
                </router-link>
                <b-button variant="primary" v-if="editBtn" @click="saveTaskInfo">保存</b-button>
            </div>
        </div>
        <complain @complain="complainInfo"
                   ref="complain" >
        </complain>
        <reallocate @reassign="reassignReason"
                    ref="reallocate">
        </reallocate>
    </div>
</template>
<script>
    import Vue  from 'vue'
    import { mapState, mapGetters } from 'vuex'
    import { MessageBox, Button, Message, TimePicker, DatePicker} from 'element-ui'
    import api from 'common/api'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import config from 'common/config.js'
    import Complain from './complain'
    import { format } from 'common/com-api'
    import Reallocate from './reallocate'
    Vue.use(TimePicker)
    Vue.use(DatePicker)
    export default {
        components: {
            Complain,
            Reallocate
        },
        data() {
            return {
                pickerOptions1: {
                    disabledDate: (time) => {
                        return time.getTime()+ 24*60*60*1000 < Date.now();
                    }
                },
                history: false,
                savebtns: true,
                saveBen: true,
                value1: '',
                redistribution: config.research.redistribution,
                complaints: config.research.complaints,
                //调研任务信息
                taskQaCode: '',
                saveTaskData: {
                    taskFailReasonCode: '',
                    reassignReason: '',
                    isHaveComplain: 0,
                    isChangeSalesman: 0,
                    taskStatusCode: '',
                    taskCode: '',
                    custName: '',
                    custMobilePhone: '',
                    carDisplayName: '',
                    appointmentVisitTime: '',
                    taskQaInfoVo: {},
                    remark: ''
                },
                fields: {
                    createTimeStr: {
                        label: '联系日期'
                    },
                    historyStatus : {
                        label: '调研状态明细'
                    },
                    nextDoTime: {
                        label: '预约跟进日期'
                    },
                    taskRemark: {
                        label: '备注'
                    }
                },
                answerList: [],
                questionData: [],
                answerCodeList: {},
                shortAnswer: {},
                shortQuestion: {},
                complaintBtn: false,
                reallocateBtn: false,
                qaTemplateCode: ''
            }
        },
        computed: {
            editBtn() {
                return hasBtn(apiUrls.research.saveTaskInfo)
            },
            ...mapState('research', [
                'taskInfo',
                'taskStatus',
                'taskType',
                'failReason'
            ]),
            ...mapGetters('research', [
                'disposeTaskStatus',
                'failReasonList',
                'queryParams'
            ])
        },
        created() {
            this.getTaskInfo();
            this.getTaskStatus(config.research.taskStatus);
            this.getFailReason(config.research.failReason)
        },
        methods: {
            //单选状态控制
            radioStatus: function(num, index) {
                this.questionData[num].answerInfoVo.forEach((single, number) => {
                    this.questionData[num].answerInfoVo[number].isOpt = false
                    this.questionData[num].answerInfoVo[index].isOpt = null
                })
            },
            // appointmentVisitTime
            datechange(value1) {
                let years = value1.getFullYear()
                let month = this.formatting((value1.getMonth() + 1))
                let day = this.formatting(value1.getDate())
                let hour = this.formatting(value1.getHours())
                let minute = this.formatting(value1.getMinutes())
                let second = this.formatting(value1.getSeconds())
                let date  =  years + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
                this.saveTaskData.appointmentVisitTime = date
            },
            formatting(num) {
                let value;
                value = num < 10 ? '0' + num : num;
                return value
            },
            //投诉原因
            complainInfo: function(val) {
                this.saveTaskData.taskComplainInfoVo = val
            },
            //重新分配原因
            reassignReason: function(val) {
                this.saveTaskData.reassignReason = val
            },
            //主表code查询数据字典
            getRef: function(refCode) {
                const $this = this
                this.$store.dispatch('research/getTaskType', {
                    poros: {refCode: refCode},
                    callBack: function(msg) {
                    }
                })
            },
            //获取调研状态
            getTaskStatus: function(refCode) {
                this.getRef(refCode)
            },
            //获取调研失败原因
            getFailReason: function(refCode) {
                this.getRef(refCode)
            },
            getTaskInfo: function(type) {
                const $this = this
                this.$store.dispatch('research/getTaskInfo', {
                    poros: {taskCode: $this.$route.params.id},
                    callBack: function(msg) {
                        if (type === 'complain') {
                            $this.$refs.complain.showModal()
                        } else if (type === 'reallocate') {
                            $this.$refs.reallocate.showModal($this.saveTaskData.reassignReason)
                        } else {
                            for(let i in $this.saveTaskData) {
                                $this.saveTaskData[i] = $this.taskInfo[i]
                            }
                            if($this.taskInfo.taskStatusCode == 'taskStatusSucc'|| $this.taskInfo.taskStatusCode == 'taskStatusFail') {
                                $this.savebtns = false
                            } else {
                                $this.savebtns = true
                            }
                            $this.saveTaskData.reassignReason = ''
                            if($this.taskInfo.appointmentVisitTime) {
                                $this.value1 = [format($this.taskInfo.appointmentVisitTime)]
                            }
                            if($this.taskInfo.taskQaInfoVo != null) {
                                $this.history = true
                                $this.taskQaCode = $this.taskInfo.taskQaInfoVo.taskQaCode
                                $this.qaTemplateCode = $this.taskInfo.taskQaInfoVo.qaTemplateCode
                                let answerlist = $this.taskInfo.taskQaInfoVo.taskQaDetailInfoVos
                                answerlist.forEach(function(item, index) {
                                    let obj = {};
                                    obj.boole = true;
                                    obj.remark = item.remark;
                                    $this.answerCodeList[item.answerCode] = obj
                                    if(item.questionType == '2') {
                                        $this.shortAnswer[item.questionCode] = item.answerValue
                                        $this.shortQuestion[item.questionCode] = true
                                    }
                                })
                            } else {
                                $this.history = false
                            }
                            $this.queryQaTitle();
                        }
                    }
                })
            },
            queryQaTitle: function() {
                const $this = this
                this.$store.dispatch('research/queryQaTitle',{
                    poros: {qaType: $this.taskInfo.taskTypeCode, storeCode: $this.taskInfo.storeCode, qaCode: $this.qaTemplateCode},
                    callBack: function(msg) {
                        if(msg.data.code === "success") {
                            if (msg.data.obj.length != 0) {
                                let questionData = msg.data.obj[0].questionInfoVo;
                                $this.qaTemplateCode = msg.data.obj[0].qaCode
                                if (!questionData) {
                                    return
                                }
                                questionData.forEach(function(value, index) {
                                    let question = value;
                                    let answer = []
                                    if(value.answerInfoVo!=null) {
                                        value.answerInfoVo.forEach(function(val, num) {
                                            if($this.taskQaCode) {
                                                let obj = $this.answerCodeList[val.answerCode];
                                                if(obj) {
                                                    if(obj.boole) {
                                                        if(val.questionType == '0') {
                                                            val.isOpt = null;
                                                            value.remark = obj.remark
                                                        } else if(val.questionType == '1') {
                                                            val.isOpt = true;
                                                            value.remark = obj.remark
                                                        } else {
                                                            val.isOpt = false;
                                                        }
                                                    } else {
                                                            val.isOpt = false;
                                                    }
                                                } else {
                                                    val.isOpt = false;
                                                }

                                            } else {
                                                val.isOpt = false;
                                            }
                                            if(!$this.history) {
                                            val.isOpt = false;
                                            } else {
                                            }
                                            answer.push(val)
                                        })
                                    }
                                    if(value.questionType == '2') {
                                        if(!$this.history) {
                                            let arr = [];
                                            let obj = {}
                                            obj.questionAnswer = '';
                                            obj.questionType = 2;
                                            obj.qaCode = value.qaCode;
                                            obj.questionCode = value.questionCode;
                                            arr.push(obj)
                                            question.answerInfoVo = arr;
                                        } else {
                                            let arr = [];
                                            let obj = {}
                                            obj.questionAnswer = $this.shortAnswer[value.questionCode];
                                            obj.questionType = 2;
                                            obj.qaCode = value.qaCode;
                                            obj.questionCode = value.questionCode;
                                            arr.push(obj)
                                            question.answerInfoVo = arr;
                                        }
                                    } else {
                                        question.answerInfoVo = answer;
                                    }
                                    $this.questionData.push(question)
                                });
                            }
                        }
                    }
                })
            },
            saveTaskInfo: function () {
                const $this = this
                if($this.saveTaskData.taskStatusCode != 'taskStatusFollowUp') {
                    $this.saveTaskData.appointmentVisitTime = null
                }
                if($this.saveTaskData.taskStatusCode == 'taskStatusFollowUp') {
                    if (!$this.saveTaskData.appointmentVisitTime) {
                        Message({
                            type: 'warning',
                            message: config.messInfo.nextTime
                        });
                        return
                    }
                }
                if($this.saveTaskData.taskStatusCode == 'taskStatusFail') {
                    if(!$this.saveTaskData.taskFailReasonCode) {
                        Message({
                            type: 'warning',
                            message: config.messInfo.taskStatusFail
                        });
                        return
                    }
                }
                if($this.saveTaskData.isChangeSalesman == '1') {
                    if (!$this.saveTaskData.reassignReason) {
                        Message({
                            type: 'info',
                            message: config.messInfo.reassignReason
                        });
                        return
                    }
                }
                if($this.saveTaskData.isHaveComplain == '1') {
                    if (!$this.saveTaskData.taskComplainInfoVo) {
                        Message({
                            type: 'info',
                            message: config.messInfo.complainInfo
                        });
                        return
                    }
                }
                let taskQaInfoVo  = {
                    qaTemplateCode: $this.qaTemplateCode,
                    taskQaCode: $this.taskQaCode,
                    taskCode: $this.taskInfo.taskCode,
                    taskQaDetailInfoVos: []
                };
                $this.saveTaskData.taskCode = $this.taskInfo.taskCode
                $this.saveTaskData.custName = $this.taskInfo.custName
                $this.saveTaskData.custPhone = $this.taskInfo.custPhone
                $this.saveTaskData.carDisplayName = $this.taskInfo.carDisplayName
                taskQaInfoVo.taskQaDetailInfoVos = [];
                let questionData = $this.questionData
                for(let i=0, len=questionData.length; i<len; i++) {
                    let quit = questionData[i]
                    let item = questionData[i].answerInfoVo
                    let lock = false
                    if(quit.requireFlag == '1') {
                        let judge = [];
                        let n = 0;
                        item.forEach((unit, index) => {
                            if(unit.questionType == 2) {
                                if(unit.questionAnswer) {
                                    judge.push(false)
                                } else {
                                    judge.push(true)
                                }
                            } else {
                                if (unit.isOpt == true || unit.isOpt == null) {
                                    judge.push(false)
                                } else {
                                    judge.push(true)
                                }
                            }
                        })
                        judge.forEach((ut) => {
                            if (ut) {
                                n += 1
                            }
                        })
                        if (n == judge.length) {
                            lock = true
                        } else {
                            lock = false
                        }
                    }
                    if (lock && ($this.saveTaskData.taskStatusCode == 'taskStatusSucc')) {
                        Message({
                            type: 'warning',
                            message: config.messInfo.requiredFlag
                        });
                        return
                    }
                    item.forEach((unit, index) => {
                        if (unit.isOpt == true || unit.isOpt == null || unit.questionType == '2') {
                            let obj = {}
                            obj.answerCode = unit.answerCode
                            obj.answerValue = unit.questionAnswer
                            obj.questionCode  = unit.questionCode
                            obj.questionType  = unit.questionType
                            obj.taskCode  = $this.taskInfo.taskCode
                            obj.remark  = quit.remark
                            taskQaInfoVo.taskQaDetailInfoVos.push(obj)
                        }
                    })
                }
                if(taskQaInfoVo.taskQaDetailInfoVos.length != '0') {
                    $this.saveTaskData.taskQaInfoVo = taskQaInfoVo
                }
                // .empName == '' ? $this.saveTaskData.taskComplainInfoVo.empName:$this.saveTaskData.taskComplainInfoVo.complainInfo
                this.$store.dispatch('research/saveTaskResult', {
                    poros: $this.saveTaskData,
                    callBack: function (msg) {
                        if(msg.data.code == "success") {
                            Message({
                                type: 'success',
                                message: config.messInfo.success
                            });            
                            $this.$store.dispatch('research/queryTaskList', {
                                poros: $this.queryParams,
                                callBack: function (msg) {
                                    if(msg.data.code == 'success') {
                                        $this.$router.push({
                                            path: '/research/query'
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            },
            getuserAnswerCode(num,index, answerCode) {
                // console.log(num + "===" + index + "==" + answerCode)
            },

        }
    }
</script>
<style>
    .el-input {
        width: 100% !important;
    }
    .inlines {
        display: inline-block !important;
    }
    .boxHeight {
        height: 300px;
        padding-right: 15px;
    }
    .boxHeight tr td:nth-last-of-type(1) {
        max-width: 222px;
        min-width: 222px;
    }
    .scrollY {
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .style-type-2 {
        margin-bottom: -10px;
    }
    .jianda label {
        display: none;
    }
</style>
