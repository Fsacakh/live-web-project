<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="问卷名称" :label-cols="4" class="text-right">
                        <b-form-input v-model="query.qaName"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="问卷类型" :label-cols="4" class="text-right">
                        <b-form-select v-model="query.qaType" :options="qaTypes"/>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="问卷状态" :label-cols="4" class="text-right">
                            <b-form-select v-model="query.onOffFlag" :options="offFlag"/>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="选择经销商店" :label-cols="4" class="text-right">
                            <areaqueryshop :readonly="false" @select-change="selectedfun"></areaqueryshop>
                        </b-form-fieldset>
                    </div>
            </div> 
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="问卷编码" :label-cols="4" class="text-right">
                        <b-form-input v-model="query.qaCode"/>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button @click="clear">重置</b-button>
                        <b-button variant="primary" @click="queryQaInfo(1)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card>
            <div>
                <b-button v-if="addBtn" variant="success" size="sm" type="button" @click="jumpDetail(0)">新增</b-button>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="qaList" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1  }}
                    </template>
                    <template slot="qaCode" slot-scope="data">
                        <a href="javascript:;" @click.prevent="jumpDetail(data.item.qaCode)">{{data.item.qaCode}}</a>
                    </template>
                    <template slot="qaUseRangeInfoVos" slot-scope="data">
                        {{data.item.qaUseRangeInfoVos}}
                    </template>
                    <template slot="onOffFlag" slot-scope="data">
                        {{data.item.onOffFlag == '0'?'启用':'停用'}}
                    </template>
                    <template slot="opration" slot-scope="data">
                        <b-button v-if="data.item.onOffFlag == 0" size="sm" variant="danger" @click="changeFlag(data.item.onOffFlag, data.item.qaCode, data.item.qaName)">停用</b-button>
                        <b-button v-if="data.item.onOffFlag == 1" size="sm" variant="success" @click="changeFlag(data.item.onOffFlag, data.item.qaCode, data.item.qaName)">启用</b-button>
                    </template>
                    <template slot="empty">
                            暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination 
                class="pull-right" 
                @page-change="pageChange"
                :page-no="pager.pageNo"
                :page-size="pager.pageSize"
                :total-result="pager.total"
                :total-pages="pager.totalPages">
            </pagination>
        </b-card>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { MessageBox, Message} from 'element-ui'
    import Pagination from '../../components/pagination/pagination'
    import Areaqueryshop from '../../components/iris-areaqueryshop/index'
    import api from '../../common/api'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import config from '../../common/config'
    Vue.component(MessageBox.name, MessageBox)
    export default {
        components: {
            Pagination,
            Areaqueryshop
        },
        data() {
            return {
                storeCodes: [],
                query: {
                    qaCode: '',
                    qaName: '',
                    qaType: '',
                    startDate: '',
                    associationFlag: '',
                    onOffFlag: '',
                    storeCodes: [],
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                list: [],
                offFlag: [
                    {value: '', text: ''},
                    {value: 0, text: '启用'},
                    {value: 1, text: '停用'}
                ],
                fields: {
                    index: {
                        label: '序号'
                    },
                    qaCode: {
                        label: '问卷编码'
                    },
                    qaName: {
                        label: '问卷名称'
                    },
                    rangeOfUsage: {
                        label: '版本号'
                    },
                    qaTypeName: {
                        label: '问卷类型'
                    },
                    answeredUsers: {
                        label: '已答卷数'
                    },
                    qaUseRangeInfoVos: {
                        label: '适用范围'
                    },
                    createTimeStr: {
                        label: '问卷创建时间'
                    },
                    onOffFlag: {
                        label: '状态'
                    },
                    opration: {
                        label: '操作'
                    },
                },
                data: [
                    {}
                ]
            }
        },
        computed: {
            addBtn() {
                return hasBtn(apiUrls.crm.addQa)
            },
            ...mapState('questionnaire', [
                'pager',
                'qaList',
                'qaTypes'
            ])
        },
        mounted() {
            this.getQaType()
        },
        methods: {
            selectedfun(arg1,arg2){
               this.storeCodes = [];
               if(arg2.value) {
                   this.storeCodes.push(arg2.value)
               }
            },
            //查询列表信息
            queryQaInfo: function (page) {
                const $this = this
                this.query.pageStart = page
                $this.query.pageNums = config.pageNums
                $this.query.storeCodes = $this.storeCodes
                this.$store.dispatch('questionnaire/queryQaInfo', {
                    tp: this.query,
                    callBack: function(msg) {
                    }
                })
            },
            getQaType: function () {
                this.$store.dispatch('questionnaire/getQaType', { poros: {
                        'isDeleted':0,
                        "refCode": config.questionnaire.getQaType,
                        "pageNums": config.maxPageNums,
                        "pageStart": "1"
                    },
                    callBack: function(msg) {
                        if(msg.data.code == 'success') {
                        }
                    }
                })
            },
            pageChange(page) {
                this.queryQaInfo(page)
            },
            jumpDetail: function (msg) {
                if(msg == '0') {
                    this.$router.push({
                        path: `/questionnaire/createdqa/${msg}`
                    })
                } else {
                    this.$router.push({
                        path: `/questionnaire/editqa/${msg}`
                    })
                }

            },
            //重置
            clear: function () {
                this.query.qaCode = ''
                this.query.qaName = ''
                this.query.qaType = ''
                this.query.onOffFlag = ''
            },
            changeFlag: function (flag, id, name) {
                const $this = this
                let callback = this.pageChange
                let pager = this.pager.pageNo
                let pageSize = this.pager.pageSize
                let onOffFlag = flag == 0? 1 : 0
                let options = {
                    "qaCode": id,
                    'onOffFlag': onOffFlag
                }
                let isForbidden = '启用';
                isForbidden = flag == 0 ? '停用': '启用';
                const h = this.$createElement;
                MessageBox({
                    title: '提示',
                    message: h('p', null, [
                            h('span', null, '确定'+ isForbidden),
                            h('i', { style: 'fontStyle: normal' }, name + "?")
                        ]),
                    showCancelButton: true,
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            this.$store.dispatch('questionnaire/editQa', {tp:options, callBack:function(res) {
                                if(res.data.code == "success"){
                                    $this.queryQaInfo(1)
                                    Message({
                                        type: 'success',
                                        message: config.messInfo.success
                                    });
                                }
                                done();
                            }})
                        } else {
                            done();
                        }
                    },
                })
            }
        }
    }
</script>
