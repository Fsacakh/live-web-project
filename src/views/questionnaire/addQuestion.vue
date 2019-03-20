<template>
    <div class="animated fadeIn">
        <div v-if="witchover">
            <b-card header="题目">
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <b-form-fieldset horizontal label="题目类型" :label-cols="3" class="text-right">
                            <b-form-select v-model="topic.questionType" :options="topicType"/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 mb-2">
                        <b-form-fieldset horizontal label="是否必答" :label-cols="3" class="text-right">
                            <b-form-select v-model="topic.requireFlag" :options="yesorno"/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6 mb-2">
                        <b-form-fieldset horizontal label="题目" :label-cols="3" class="text-right">
                            <!-- <b-form-input v-model="topic.questionTitle"/> -->
                            <b-form-textarea
                                v-model="topic.questionTitle"
                                placeholder="请输入题目内容．．．"
                                :rows="3"
                                 maxlength="50" onchange="this.value=this.value.substring(0,50)" onkeydown="this.value=this.value.substring(0, 50)" onkeyup="this.value=this.value.substring(0, 50)"
                               >
                            </b-form-textarea>
                        </b-form-fieldset>
                    </div>
                </div>
            </b-card>
            <b-card header="答案" v-if="topic.questionType != '2'">
                <div>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr class="text-center">
                                <th class="text-center" v-for="(item, index) in fields" :key="index">{{item}}</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr v-for="(item, index) in answerList" :key="index">
                                <th class="text-center">{{index + 1}}</th>
                                <th class="text-center"><input class="form-control" type="text" v-model="item.questionAnswer" maxlength="20"></th>
                                <th class="text-center"><input class="form-control" type="text" v-model="item.remark" maxlength="30"></th>
                                <th class="text-center"><b-button v-if="editBtn" class="pl-3 pr-3 pt-2 pb-2" variant="danger" @click="removeAnswer(index)">删除</b-button></th>
                            </tr>
                        </tbody>
                    </table>
                    <b-button variant="success" v-if="editBtn" @click="addAnswer">新增</b-button>
                </div>
            </b-card>
            <div class="text-right">
                <b-button @click="witchover = !witchover">取消</b-button>
                <b-button v-if="editBtn" variant="primary" @click="getQuestionCode()">保存</b-button>
            </div>
        </div>
        <div v-if="!witchover">
            <div class="mb-2" v-if="answeredUsers=='0'">
                <b-button v-if="editBtn" variant="primary" @click="add">新增</b-button>
                <b-button v-if="editBtn" variant="danger" @click="editQuestion">删除</b-button>
                <b-button v-if="editBtn" variant="warning" @click="move('up', num)">上移</b-button>
                <b-button v-if="editBtn" variant="warning" @click="move('down', num)">下移</b-button>
                <!-- <b-button class="pull-right" variant="info" @click="saveSort">保存</b-button> -->
            </div>
            <div class="mt-2">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr class="text-center">
                            <th class="text-center"></th>
                            <th class="text-center">题号</th>
                            <th class="text-center">类型</th>
                            <th class="text-center">题目</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="(item, index) in questionList" :key="index">
                            <td class="text-center"><input type="radio" name="question" v-model="select" :value="item.questionCode"></td>
                            <td class="text-center">{{item.questionOrder}}</td>
                            <td class="text-center">{{item.questionType=='0'?'单选':(item.questionType=='1'?'多选':'简答')}}</td>
                            <td class="text-center">{{item.questionTitle}}</td>
                        </tr>
                        <tr v-if="questionList.length == '0'">
                            <td colspan="20" class="text-left">暂无数据...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
    export default {
        created() {
            if(this.$route.params.id == 0) {

            } else {
                this.getQaEditData()
            }
        },
        mounted() {
        },
        data() {
            return {
                answeredUsers: '0',
                witchover: false,           //切换列表页与新增
                fields: ['序号', '答案', '答案相关', '操作'],
                topicType: [
                    {value: '0', text: '单选'},
                    {value: '1', text: '多选'},
                    {value: '2', text: '简答'}
                ],
                yesorno: [
                    {value: '1', text: '是'},
                    {value: '0', text: '否'}
                ],
                topic: {
                    qaCode: '',
                    questionCode: '',
                    questionTitle: '',
                    questionType:'',
                    questionOrder: '',
                    requireFlag: '0'
                },
                answerList: [],
                questionList: [
                ],
                select: '',
                question: {},
                num: '',
                ques: ''
            }
        },
        computed: {
            editBtn() {
                return hasBtn(apiUrls.crm.editQa)
            },
            ...mapState('questionnaire', [
                'qaCode',
                'questionCode',
                'answerCode',
                'storeQuestionList'
            ])
        },
        watch: {
            storeQuestionList: function () {
                this.questionList = JSON.parse(JSON.stringify(this.storeQuestionList))
            },
            select: function () {
               this.getData()
            }, 
        },
        methods: {
            //获取编辑数据
            getQaEditData: function () {
                const _this = this
                let params = {
                    qaCode: _this.$route.params.id==0?_this.qaCode:_this.$route.params.id,
                    pageNums: config.pageNums,
                    pageStart: 1
                };
                api.crm.getQaInfo(params)
                    .then(function(res) {
                            if (res.data.code == "success") {
                                let data = res.data.obj.list[0]
                                _this.answeredUsers = data.answeredUsers
                            }
                    })
            },
            //查询问题列表
            queryQuestion: function () {
                const $this = this
                let code = $this.$route.params.id==0?$this.qaCode:$this.$route.params.id
                this.$store.dispatch('questionnaire/queryQuestion', {
                    tp: {"qaCode": code, "pageStart": "1", "pageNums": config.maxPageNums},
                    callBack: function (msg) {
                        if (msg.data.code == 'success') {
                            $this.questionList = msg.data.obj.list
                            $this.ques = true
                        }
                    }
                })
            },
            add: function () {
                this.topic.questionTitle = '';
                this.topic.questionType = '0';
                this.topic.questionOrder = this.questionList.length + 1;
                this.answerList = []
                this.addAnswer()
                this.witchover = !this.witchover
            },
            //获取问题Code
            getQuestionCode: function () {
                const $this = this
                this.$store.dispatch('questionnaire/getQaCode', {
                    poros: {"serviceCode": config.questionnaire.getQuestionCode},
                    callBack: function (msg) {
                        $this.addTopic()
                    }
                })
            },
            //新增问题及答案
            addTopic: function() {
                let $this = this
                let answerList = []
                let params = [] 
                $this.topic.qaCode = $this.$route.params.id == 0 ? $this.qaCode:$this.$route.params.id
                $this.topic.questionCode = $this.questionCode
                for(var i = 0, len=$this.answerList.length; i<len; i++) {
                    $this.answerList[i].questionCode = $this.questionCode
                    $this.answerList[i].questionType = $this.topic.questionType
                    $this.answerList[i].qaCode = $this.topic.qaCode
                }
                if($this.topic.questionTitle) {
                    if ($this.topic.questionType == 0) {
                        $this.topic.questionTitle += ' (单选 '
                    } else if ($this.topic.questionType == 1) {
                        $this.topic.questionTitle += ' (多选 '
                    } else if ($this.topic.questionType == 2) {
                        $this.topic.questionTitle += ' (简答 '
                    }
                    if ($this.topic.requireFlag == 1) {
                        $this.topic.questionTitle += '必填)'
                    } else {
                        $this.topic.questionTitle += '非必填)'
                    }
                }
                $this.answerList.forEach(function(item, index) {
                    item.answerOrder = index
                    if(item.questionAnswer != '') {
                        answerList.push(item)
                    }
                });
                if($this.topic.questionType == 2) {
                    delete $this.topic.answerInfoVo
                } else {
                    $this.topic.answerInfoVo = answerList
                }
                params.push($this.topic)
                $this.$store.dispatch('questionnaire/addQuestion', {
                    tp: params,
                    callBack: function (msg) {
                        if (msg.data.code == "success") {
                            Message({
                                type: 'info',
                                message: config.messInfo.success
                            });
                            $this.queryQuestion()
                            $this.witchover = false
                        }
                    }
                })
            },
            //获取答案Code
            addAnswer: function () {
                const $this = this
                this.$store.dispatch('questionnaire/getQaCode', {
                    poros: {"serviceCode": config.questionnaire.getAnswer},
                    callBack: function () {
                        let obj = {};
                        obj.qaCode = $this.$route.params.id == 0 ? $this.qaCode:$this.$route.params.id;
                        obj.questionCode = '';
                        obj.answerCode = $this.answerCode;
                        obj.questionAnswer = "";
                        obj.questionType = '';
                        obj.answerScore = "0";
                        obj.scoreWeight = "100";
                        $this.answerList.push(obj)
                    }
                })
            },
            removeAnswer: function (num) {
                const $this = this
                MessageBox.confirm(config.messInfo.deleteInfo, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            let len = $this.answerList.length
                            $this.answerList.splice(num, 1);
                            if (len-1 == $this.answerList.length) {
                                done();
                            } 
                        } else {
                            done();
                            return
                        }
                    },
                    callBack: function () {
                        if (!$this.answerList[num]) {
                            Message({
                                type: 'info',
                                message: config.messInfo.success
                            });
                        }  
                    }
                })
            },
            //获取选中问题数据
            getData: function () {
                var $this = this;
                if(!$this.select){
                    Message({
                        type: 'info',
                        message: config.messInfo.select
                    });
                    return;
                }
                for(var i = 0, len = $this.questionList.length; i < len; i++){
                    if($this.questionList[i].questionCode == $this.select){
                        $this.question = $this.questionList[i];
                        $this.num = i
                    }
                }
            },
            //删除问题
            editQuestion: function () {
                const $this = this
                if(!this.select) {
                    Message({
                        type: 'info',
                        message: config.messInfo.select
                    });
                    return
                }
                let name = $this.question.questionTitle
                MessageBox.confirm('确定删除问题' + name + '?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            let params = []
                            $this.question.isDeleted = "1"
                            params.push($this.question)
                            $this.$store.dispatch('questionnaire/editQuestion', {
                                tp: params,
                                callBack: function (msg) {
                                    $this.queryQuestion()
                                }
                            })
                            done();
                        } else {
                            done();
                            return
                        }
                    },
                    callBack: function () {
                        
                    }
                })
            },
            //上移/下移
            move: function (type, num) {
            	if(!this.select) {
                    Message({
                        type: 'info',
                        message: config.messInfo.select
                    });
                    return
                } else {
                    if (type == 'up') {
                        if (num - 1 >= '0') {
                            this.questionList[num-1].questionOrder++
                            this.questionList[num].questionOrder--
                            let pointer = this.questionList.splice(num, 1)[0]
                            this.questionList.splice(num-1, 0, pointer)
                        }
                    } else {
                        if (num + 1 < this.questionList.length) {
                            this.questionList[num].questionOrder++
                            this.questionList[num+1].questionOrder--
                            let pointer = this.questionList.splice(num, 1)[0]
                            this.questionList.splice(num+1, 0, pointer)
                        }
                    }
                } 
                this.getData()
                this.saveSort()
            },
            //保存排序
            saveSort: function () {
                this.$store.dispatch('questionnaire/editQuestion', {
                    tp: this.questionList,
                    callBack: function (msg) {
                        if (msg.data.code == "success") {
                            Message({
                                type: 'info',
                                message: config.messInfo.success
                            });
                        }
                    }
                }) 
            }
        },
        components: {
            Message,
            MessageBox
        } 
    }
</script>