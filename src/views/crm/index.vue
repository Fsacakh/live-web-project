<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
                        <areashop ref="areashop" @select-change="selectChange"></areashop>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="时间" :label-cols="4" class="text-right">
                        <el-date-picker
                        v-model="timeRange"
                        type="daterange"
                        :picker-options="pickerOptions0"
                        placeholder="选择日期范围">
                        </el-date-picker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="调研任务类型" :label-cols="4" class="text-right">
                        <b-form-select :options="taskTypes" v-model="taskTypeCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="问卷版本号" :label-cols="4" class="text-right">
                        <b-form-select :options="historylist" v-model="qaTemplateCode"/>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-right">
                    <b-button size="sm" variant="" @click="reset">重置</b-button>
                    <b-button size="sm" variant="primary" @click="query">查询</b-button>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="row">
                <div class="col-md-12">
                    问卷完成数: {{ userQaTotal }}
                </div>
            </div>
        </b-card>
        <b-card header="调研统计">
            <!-- <div class="row">
                <div class="col-md-12">
                    调研统计:
                </div>
            </div> -->
            <div class="crm-answer-style-margin-top" v-for="(item, index) in questionArr" :key="index">
                <p class="crm-question-style-font"><span>{{ index + 1 }}</span>.&nbsp;&nbsp;<span>{{ item.questionType == 1 ? '(多选)' : (item.questionType == 2 ? '(简答)' : '(单选)') }}&nbsp;&nbsp;{{ item.questionTitle }}</span></p>
                <div class="row" v-if="item.questionType == 0 || item.questionType == 1" v-for="(val, idx) in item.answerInfoVo">
                    <div class="col-md-12 crm-answer-style-padding-left">
                        <span>{{ idx | transferAbc }}</span> {{ val.questionAnswer }}&nbsp;&nbsp;{{ val.userAnswerTotal ? '(' + val.userAnswerTotal + ')' : '' }}
                    </div>
                    <div class="col-md-12 crm-answer-style-padding-left">
                        <el-progress :percentage="val.userAnswerRate"></el-progress>
                    </div>
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
    import Vue from 'vue'
    import areashop from 'components/iris-areaqueryshop/index'
    import { DatePicker, Message, Progress } from 'element-ui'
    import config from 'common/config'
    import api from 'common/api'
    import common from 'common/common'
    Vue.use(DatePicker)
    Vue.use(Progress)
    export default {
        components: {
            areashop
        },
        data() {
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                timeRange: [],
                taskTypes: [],
                historylist: [],
                userQaTotal: '',
                answerEndDate: '',
                answerStartDate: '',
                taskTypeCode: '',
                qaTemplateCode: '',
                // 写死  联调接口的
                // storeCode: 'STORE2000080',
                storeCode: '',
                questionArr: []
            }
        },
        methods: {
            // 重置
            reset() {
                this.timeRange = []
                this.qaTemplateCode = ''
                this.taskTypeCode = ''
                this.$refs.areashop.resetToStart()
            },
            query() {
                if(this.timeRange.length > 0) {
                    this.answerEndDate = common.formattingTime(this.timeRange).endTime === '1970-01-01' ? '' : common.formattingTime(this.timeRange).endTime
                    this.answerStartDate = common.formattingTime(this.timeRange).startTime === '1970-01-01' ? '' : common.formattingTime(this.timeRange).startTime
                }
                if(!this.storeCode || !this.answerEndDate || !this.answerStartDate || !this.qaTemplateCode) {
                    Message({
                        type: 'warning',
                        message: '请补全查询信息'
                    })
                    return
                }
                let option = {
                    // qaTemplateCode: this.qaTemplateCode
                    // 写死的 联调接口的
                    // qaTemplateCode: 'QU2000148'
                    qaCode: this.qaTemplateCode
                }
                api.crmSituation.querySingleQuestionnaireAllQuestionAndAnswerByCodeFromDB(option, res => {
                    if(res.data.code === 'success') {
                        this.questionArr = res.data.obj.questionInfoVo ? res.data.obj.questionInfoVo : []
                        let tempArr = res.data.obj.answerInfoVo ? res.data.obj.answerInfoVo : []
                        for(let i = 0; i<this.questionArr.length; i++) {
                            this.questionArr[i].answerInfoVo = []
                            for(let j = 0; j<tempArr.length; j++) {
                                if(this.questionArr[i].questionCode === tempArr[j].questionCode) {
                                    this.questionArr[i].answerInfoVo.push(tempArr[j])
                                }
                            }
                        }
                        let params = {
                            qaTemplateCode: this.qaTemplateCode,
                            // 写死   联调接口的
                            // qaTemplateCode: 'QU2000148',
                            answerEndDate: this.answerEndDate,
                            answerStartDate: this.answerStartDate,
                            // answerEndDate: '2018-00-00',
                            // answerStartDate: '2018-00-00',
                            taskTypeCode: this.taskTypeCode,
                            storeCode: this.storeCode
                        }
                        api.crmSituation.queryAnswerRate(params, res => {
                            if(res.data.code === 'success') {
                                this.userQaTotal = res.data.obj.userQaTotal
                                let RateArr = res.data.obj.taskQaDetailInfoVos ? res.data.obj.taskQaDetailInfoVos : []
                                for(let i = 0; i< this.questionArr.length; i++) {
                                    for(let j = 0; j< this.questionArr[i].answerInfoVo.length; j++) {
                                        for(let k = 0; k< RateArr.length; k++) {
                                            if(this.questionArr[i].answerInfoVo[j].answerCode === RateArr[k].answerCode) {
                                                this.questionArr[i].answerInfoVo[j].userAnswerRate = RateArr[k].userAnswerRate ? (RateArr[k].userAnswerRate * 100).toFixed(1) : 0
                                                // this.questionArr[i].answerInfoVo[j].userAnswerRate = 100
                                                this.questionArr[i].answerInfoVo[j].userAnswerTotal = RateArr[k].userAnswerTotal
                                            }
                                        }
                                    }
                                }
                                this.questionArr = JSON.parse(JSON.stringify(this.questionArr))
                            }
                        })
                    }
                })
            },
            selectChange(arg1, arg2) {
                if(arg2) {
                    this.storeCode = arg2.value
                }
            },
            // 从数据字典中拿取调研任务类型
            getTaskType() {
                let option = {
                    refCode: config.questionnaire.getQaType
                }
                api.ref.getDataDictionary(option).then((res) => {
                    if(res.data.code === 'success') {
                        let tempArr = res.data.obj.referenceDetailInfos
                        tempArr.forEach(element => {
                            let obj = {}
                            obj.text = element.refDetailName  
                            obj.value = element.refDetailCode
                            this.taskTypes.push(obj) 
                        })
                    }
                })
            }
        },
        created() {
            // 初始化数据
            this.getTaskType()
        },
        watch: {
            storeCode: function(value) {
                this.historylist = []
                if(this.storeCode && this.taskType) {
                    let option = {
                        storeCode: this.storeCode,
                        qaType: this.taskTypeCode
                    }
                    api.crmSituation.queryQaCodeByStoreCodeAndQaType(option, res => {
                        if(res.data.code === 'success') {
                            let tempArr = res.data.obj
                            tempArr.forEach(element => {
                                let obj = {}
                                obj.text = element
                                obj.value = element
                                this.historylist.push(obj)
                            })
                        }
                    })
                }else {
                    return
                }
            },
            taskTypeCode: function(value) {
                this.historylist = []
                if(this.storeCode && this.taskTypeCode) {
                    let option = { 
                        storeCode: this.storeCode,
                        qaType: this.taskTypeCode
                    }
                    api.crmSituation.queryQaCodeByStoreCodeAndQaType(option, res => {
                        if(res.data.code === 'success') {
                            let tempArr = res.data.obj
                            tempArr.forEach(element => {
                                let obj = {}
                                obj.text = element
                                obj.value = element
                                this.historylist.push(obj)
                            })
                        }
                    })
                }else {
                    return
                }
            }
        },
        filters: {
            transferAbc: function(val) {
                if(val === 0) {
                    return 'A'
                }else if(val){
                    let Arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N', '0', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                    return Arr[val]
                }else {
                    return
                }
            }
        }
    }
</script>
<style>
    .crm-answer-style-padding-left {
        padding-left: 30px;
    }
    .crm-answer-style-margin-top {
        margin-top: 20px;
        padding-bottom: 10px;
    }
    .crm-answer-style-margin-top:first-child {
        margin-top: 0px;
    }
    .crm-question-style-font {
        font-size: 15px;
        padding: 0px;
        margin: 0px;
        margin-top: 10px;
    }
    .crm-answer-style-padding-left .el-progress-bar{
        padding-right:80px !important;
    }
    .crm-answer-style-padding-left .el-progress__text{
        margin-left:0px !important;
    }
</style>


