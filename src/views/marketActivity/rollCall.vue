<template>
    <div>
        <div class="row">
            <div class="col-md-2">
                <select class="form-control" v-model="query.invitationStatus">
                    <option v-for="(item, index) in rollType" :value="item.value" :key="index">{{item.text}}</option>
                </select>
            </div>
            <div class="col-md-2">
                <select class="form-control" v-model="query.attendFlag">
                    <option v-for="(item, index) in attendFlagList" :value="item.value" :key="index">{{item.text}}</option>
                </select>
            </div>
            <div class="col-md-8 text-right">
                <!-- <b-button @click="uploadExcel" size="sm">厂家召回名单导入</b-button> -->
                <!-- 召回 -->
                <upload :disabled= "false"
                        :addParams="callParams" 
                        :buttonName='callButtonName3'
                        :analysisExcel="recallExcel"
                        :url="analysisUrlRecall" 
                        :showBack="showBack3"
                        >
                </upload>
                <b-button @click="downloadExcel" size="sm">预设模板导出</b-button>
                <upload :disabled= "false"
                        :addParams="callParams" 
                        :buttonName='callButtonName'
                        :analysisExcel="analysisExcel"
                        :url="analysisUrl" 
                        :showBack="showBack"
                        >
                </upload>
                <upload :disabled= "false"
                        :addParams="callParams" 
                        :buttonName='callButtonName2'
                        :analysisExcel="analysisExcel"
                        :url="analysisUrl" 
                        :showBack="showBack2"
                        >
                </upload>
                <b-button size="sm" @click="downLoad">
                    导出名单
                </b-button>
            </div>
        </div>
        <div class="table-scrollable pt-1">
            <b-table striped hover bordered show-empty :items="callList" :fields="fields">
                <template slot="index" slot-scope="data">
                    {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                </template>
                <!-- <template slot="maCode" slot-scope="data">
                    <a href="javascript:;" @click="routerTo(data.item.maCode)">{{data.item.maCode}}</a>
                </template> -->
                <template slot="empty">
                    暂无数据...
                </template>
            </b-table>
        </div>
        <pagination class="pull-right"
                    @page-change="pageChange"
                    :page-no="pager.pageNo"
                    :page-size="pager.pageSize"
                    :total-result="pager.total"
                    :total-pages="pager.totalPages">
        </pagination>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import { MessageBox, Message} from 'element-ui'
import api from 'common/api'
import config from 'common/config'
import upload from 'components/iris-upload/index'
import pagination from 'components/pagination/pagination'
import { LIST_OF_ACTIVITIES_IN_MARKET } from 'common/ref-code'
Vue.component(MessageBox.name, MessageBox)
export default {
    props: {
        callParams: {
            type: Object,
            default: function() {
                return {}
            }
        },
        marketName: {
            type: String,
            default: ''
        }
    },
    components: {
        upload,
        pagination
    },
    data() {
        return {
            storeCode: '',
            //导出表格链接
            excelLink: '',
            query: {
                relationCode: '',
                relationName: '',
                invitationStatus: '',
                pageNums: config.pageNums,
                pageStart: 1,
                attendFlag: '',
            },
            queryRecall: {
                relationCode: '',
                relationName: '',
                recallFlag: '1',
                pageStart: 1,
                pageNums: config.pageNums,
                storeCode: ''
            },
            showBack: {
                storeCode: '',
                relationName: '',
            },
            showBack2: {
                storeCode: '',
                relationName: '',
                attendFlag: '1'
            },
            //召回
            showBack3: {
                storeCode: '',
                relationName: '',
                recallFlag: '1'
            },
            analysisUrlRecall: config.market.analysisUrlRecall,
            analysisUrl: config.market.analysisUrl,
            attendFlagList: config.market.attendFlagList,
            rollType: config.market.rollType,         
            callButtonName: "导入邀约名单",
            callButtonName2: "导入出席名单",
            callButtonName3: "厂家召回名单导入",
            supplierList: [],
            fields: {
                index: {
                    label: "序号"
                },
                customName: {
                    label: "客户姓名"
                },
                mobilePhone: {
                    label: "手机号"
                },
                ownerDccName: {
                    label: "所属DCC专员"
                },
                ownerScName: {
                    label: "所属SC"
                },
                vinCode: {
                    label: "VIN码"
                },
                // FINCode: {
                //     label: "FIN码"
                // },
                vehicleTypeInfo: {
                    label: "车型"
                },
                vehicleLicenseNo: {
                    label: "车牌"
                }
            },
            downLoadParams: {}
        }
    },
    computed: {
        ...mapState('marketActivity', [
            'callList',
            'pager'
        ]),
        _invitationStatus: function() {
            return this.query.invitationStatus
        },
        _attendFlag: function() {
            return this.query.attendFlag 
        },
    },
    mounted() {
        let _this = this
        
        api.getUserAvailableInfo((res) => {
            let userInfo = res.data.obj
            if (userInfo != null) {
                _this.showBack.storeCode = userInfo.storeInfoVo.storeCode 
                _this.showBack2.storeCode = userInfo.storeInfoVo.storeCode 
                _this.showBack3.storeCode = userInfo.storeInfoVo.storeCode 
                this.storeCode = userInfo.storeInfoVo.storeCode;
            }
        })
        this.queryExHallList();
    },
    watch: {
        _invitationStatus: function(oldVal, newVal) {
            let params = {
                relationCode: this.query.relationCode,
                relationName: this.query.relationName,
                invitationStatus: this.query.invitationStatus,
                pageNums: config.pageNums,
                pageStart: 1,
            }
            let obj = {
                relationCode: this.query.relationCode,
                relationName: this.query.relationName,
                invitationStatus: this.query.invitationStatus, 
            }
            this.downLoadParams = obj

            this.queryCall({
                poros: params,
                callBack: function(res) {
                }
            })
        },
        _attendFlag: function(oldVal, newVal) {
            let params = {
                relationCode: this.query.relationCode,
                relationName: this.query.relationName,
                attendFlag: this.query.attendFlag,
                pageNums: config.pageNums,
                pageStart: 1,
            }
            let obj = {
                relationCode: this.query.relationCode,
                relationName: this.query.relationName,
                attendFlag: this.query.attendFlag,
            }
            this.downLoadParams = obj
            this.queryCall({
                poros: params,
                callBack: function(res) {
                }
            })
        }
    },
    methods: {
        ...mapActions('marketActivity', [
            'getCallList',
            'queryCall'
        ]),
        //查询表格
        queryExHallList(){
            api.dataReport.selectByRelationCode({
                relationCode: LIST_OF_ACTIVITIES_IN_MARKET,
            }, (res) => {
            this.excelLink = res.data.obj.list[0].filePath;
            })
        },
        downloadExcel(){
            window.location.href = this.excelLink;
        },
        setMaName: function(name, code) {
            this.showBack.relationName = name
            this.showBack2.relationName = name
            this.showBack3.relationName = name
            this.query.relationCode = code
            this.query.relationName = name
            this.queryRecall.relationCode = code
            this.queryRecall.relationName = name
            this.getCallInfo(1)
        },
        getCallInfo: function(page) {
            this.query.pageStart = page
            this.queryCall({
                poros: this.query,
                callBack: function(res) {
                }
            })
        },
        pageChange: function(page) {
            this.query.pageStart = page
            this.query.recallFlag = "1"
            // delete this.query.attendFlag
            // delete this.query.invitationStatus
            let maType = sessionStorage.getItem('maType');
            if(maType == 'REFD2000333') {
                api.marketActivity.queryVehicleRecallInfo(this.query, (res) => {
                    console.log('queryVehicleRecallInfo', res)
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
            }else {
                this.queryCall({
                    poros: this.query,
                    callBack: function(res) {
                    }
                })
            }
        },
        downLoad: function() {
            let params = this.downLoadParams
            if(!this.callList) {
                Message({
                    type: 'success',
                    message: '请查询要导出得数据'
                });
                return
            }
            // window.location.href = '/v1/fileSys/file/ListRelationInfosWriteIntoExcel'
            api.market.getOutput(params, res => {
                if(res.data.code === "success") {
                    let path = res.data.obj
                    window.location.href = path
                }
            })
        },
        analysisExcel: function(res) {
                
            Message({
                type: 'success',
                message: '导入成功'
            });
        },
        recallExcel: function(res) {
           Message({
                type: 'success',
                message: '召回导入成功'
            });
            // let data = {relationCode: LIST_OF_ACTIVITIES_IN_MARKET};
            this.queryRecall.storeCode = this.storeCode;
            api.marketActivity.queryVehicleRecallInfo(this.queryRecall, (res) => {
                console.log('queryVehicleRecallInfo', res)
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
    },
}
</script>

