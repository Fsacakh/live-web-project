<template>
    <div class="animated fadeIn">
        <b-card>
            <div class="row">
                <div class="col-md-12">
                    <upload buttonName="导入" :addParams="addParams" :url="uploadUrl" :analysisExcel="analysisExcel" :showBack="showBack"></upload>
                    <b-button size="sm" variant="primary" class="pull-right" @click="query">查询记录</b-button>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :fields="fields" :items="workflowList">
                    <template slot="index" slot-scope="data">
                        {{ data.index + 1 + (pager.pageNo - 1)* pager.pageSize }}
                    </template>
                    <template slot="operate" slot-scope="data">
                        <a @click="updateWorkflowOff(data.item.sourceBatchNo, data.item.onOffFlag)" herf="#">
                            {{  data.item.onOffFlag == 0 ? ' 上架': (data.item.onOffFlag == 1 ? '已上架': '' ) }}
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a @click="downloadFile(data.item.fileRelativePath)" href="#">下载</a>
                    </template>
                    <template slot="empty">
                        暂无数据
                    </template>
                </b-table>
            </div>
            <div class="row">
                <div class="col-md-12">
                     <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total" :total-pages="pager.totalPages">
                     </pagination>
                </div>
            </div>
        </b-card>    
    </div>
</template>
<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from "vuex";
    import upload from 'components/iris-upload'
    import pagination from "../../../components/pagination/pagination";
    import api from "@/common/api"
    import config from "@/common/config"
    import common from "@/common/common"
    import {
        MessageBox,
        Message,
        DatePicker
    } from 'element-ui'
    export default {
        mounted() {},
        data: function() {
            return {
                fields: {
                    index: {
                        label: '序号'
                    },
                    fileCode: {
                        label: '导入编号'
                    },
                    fileCreateTime: {
                        label: '导入时间'
                    },
                    workFlowNum: {
                        label: '工作流数量'
                    },
                    fileCreateName: {
                        label: '操作人'
                    },
                    operate: {
                        label: '操作'
                    }
                },
                pager: {
                    pageNo: 1,
                    pageSize: 15,
                    total: 0,
                    totalPages: 0
                },
                addParams: {
                    relationCode: '',
                    singleFlag: '1',
                    businessType: ''
                },
                showBack: {
                    financeCode: ''
                },
                workflowList: [],
                uploadUrl: config.workFlow.batchImportSetting.uploadUrl,
                pageStart: 1,
                pageNums: config.pageNums,
            }
        },
        computed: {},
        methods: {
            pageChange: function(num) {
                let _this = this
                _this.pageStart = num
                _this.query()
            },
            query: function() {
                let _this = this
                api.workFlow
                    .queryWorkflowList({
                        pageStart: _this.pageStart,
                        pageNums: _this.pageNums
                    }, (res) => {
                        if (res.data.code === 'success') {
                            _this.$data.pager = {
                                pageNo: res.data.obj.pageNum,
                                pageSize: res.data.obj.pageSize,
                                total: res.data.obj.total,
                                totalPages: res.data.obj.pages
                            }
                            _this.$data.workflowList = res.data.obj.list
                        }
                    })
            },
            updateWorkflowOff: function(batchNo, onOffFlag) {
                let _this = this
                if (onOffFlag === 0) {
                    api.workFlow
                        .updateWorkflowOff({
                            sourceBatchNo: batchNo
                        }, (res) => {
                            if (res.data.code === 'success') {
                                _this.query()
                            }
                        })
                }
            },
            downloadFile: function(filePath) {
                let _this = this
                window.location.href = common.isDevTemplate() + filePath
            },
            analysisExcel: function(res) {
                let _this = this
                if (res.data.code === 'success') {
                    _this.pageStart = 1
                    _this.query()
                    Message({
                        type: 'success',
                        message: config.messInfo.uploadSuccess
                    })
                }
            },
        },
        components: {
            upload,
            pagination
        }
    }
</script>
<style lang="scss" @scoped>

</style>