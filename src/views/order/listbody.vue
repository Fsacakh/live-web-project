<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <b-button size="sm" variant="" @click="downLoadData">导出</b-button>
                <div class="table-scrollable mb-2">
                    <b-table striped hover bordered show-empty :items="obj.list" :fields="fields">
                        <template slot="index" slot-scope="data">{{data.index + 1 + listIndex}}</template>
                        <template slot="orderNo" slot-scope="row">
                            <a href="#" @click.stop.prevent="toDetail(row.item)">{{row.value}}</a>
                        </template>
                        <!-- row.value | status  -->
                        <template slot="auditPassTime" slot-scope="data">
                            {{ data.item.auditPassTime | formatDate }}
                        </template>
                        <!-- 首次签署时间 -->
                        <template slot="carOrderFirstPassTime" slot-scope="data">
                            {{ data.item.carOrderFirstPassTime | formatDate }}
                        </template>
                        <template slot="actualInvoiceDate" slot-scope="data">
                            {{ data.item.actualInvoiceDate | formatDate }}
                        </template>
                        <template slot="bookingClosingDate" slot-scope="data">
                            {{ data.item.bookingClosingDate | switchDate }}
                        </template>
                        <template slot="closingDate" slot-scope="data">
                            {{ data.item.closingDate | switchDate }}
                        </template>
                        <!-- <template slot="wfStatus" slot-scope="row">{{getStatus(row.item)}}</template> -->
                        <template slot="empty">暂无数据</template>
                    </b-table>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <pagination class="pull-right" @page-change="pageChange" :page-no="obj.pageNum" :page-size="obj.pageSize" :total-pages="obj.pages" :total-result="obj.total">
                        </pagination>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Pagination from 'components/pagination/pagination'
import { mapGetters, mapActions } from 'vuex'
import { Message, MessageBox } from 'element-ui'
import common from 'common/common'
import api from 'common/api'
import config from 'common/config'
Vue.prototype.$confirm = MessageBox.confirm;
const TO_BE_SUBMIT = '待提交',
      IN_APPROVAL = '审批中',
      INTENTION_ORDER = '意向单',
      ORDER = '订单',
      CONTRACT = '合同',
      UNSUBSCRIBE = '退订',
      GIVE_CAR = '交车';
export default {
    components: {
        Pagination
    },
    props: ['queryParams','obj'],
    data() {
        return {
            fields: {
                index: {
                    label: '序号'
                },
                orderNo: {
                    label: '订单号'
                },
                storeName: {
                    label: '门店'
                },
                vinNo: {
                    label: '车架号'
                },
                carBrandName: {
                    label: '品牌'
                },
                carSeriesName: {
                    label: '车系'
                },
                carModelName: {
                    label: '车型'
                },
                carDisplayName: {
                    label: '车款'
                },
                custName: {
                    label: '客户姓名'
                },
                custMobile: {
                    label: '手机号码'
                },
                salesEmpName: {
                    label: '销售顾问'
                },
                actualTotalPrice: {
                    label: '订单总价'
                },
                //订单类型
                currentOrderWfTypeName: {
                    label: '订单类型'
                },
                //当前审批状态
                wfStatusName: {
                    label: '当前审批状态'
                },

                //首次签署时间
                carOrderFirstPassTime: {
                    label: '首次签署时间'
                },

                auditPassTime: {
                    label: '最后审批通过时间'
                },
                actualInvoiceDate: {
                    label: '整车开票时间'
                },
                bookingClosingDate: {
                    label: '预计交车时间'
                },
                closingDate: {
                    label: '实际交车时间'
                }
            },
            list: [{
                order_no: '232323232'
            }],
           orderObjList:[],
        }
    },
    computed: {
        listIndex() {
            return (this.obj.pageNum - 1) * this.obj.pageSize
        },
        ...mapGetters('order', [
            'orderObj'
        ])

    },
    methods: {
        getStatus(item) {
            if(item.closingFlag === 1) {
                return GIVE_CAR
            }else if(item.wfStatus === -1) {
                return TO_BE_SUBMIT
            }else if(item.wfStatus === 0) {
                return IN_APPROVAL
            }else if(item.wfStatus === 1) {
                if(item.currentOrderWfTypeCode === 'NewCarIntentionOrderWfType') {
                    return INTENTION_ORDER
                }else if(item.currentOrderWfTypeCode === 'NewCarOrderWfType') {
                    return ORDER
                }else if(item.currentOrderWfTypeCode === 'NewCarContractWfType') {
                    return CONTRACT
                }else if(item.currentOrderWfTypeCode === 'NewCarRefuseWfType') {
                    return UNSUBSCRIBE
                }
            }
        },
        toDetail(item) {
            let url = process.env.NODE_ENV === 'development' ? window.location.origin + `/order/detail/${item.orderNo}` : window.location.origin + `/livepro/order/detail/${item.orderNo}`
            window.open(url)
        },
        pageChange(page) {
            this.queryParams.pageStart = page;
            this.queryParams.pageNums = config.pageNums
            /*this.setOrderObj(this.queryParams)*/
            this.$emit('changeQuery',page)
        },
        ...mapActions({
            setOrderObj: 'order/setOrderObj'
        }),
        downLoadData() {
            if(this.downLoadDataParams === '') {
                Message({
                    type: "warning",
                    message: "请查询线索！"
                });
                return;
            }
            if(!this.obj.hasOwnProperty('list')|| !this.obj.list.length){
        		Message({
                    type: "warning",
                    message: "暂无数据,请先查询数据"
                });
                return;
            }
            //表格导出
            // api.order.downLoadData(this.queryParams,function(res){
            //     if(res.data.code == 'success'){
            //         if(res.data.obj === null ) {
            //             Message({
            //                 type: "warning",
            //                 message: "未查询到数据！"
            //             });
            //             return;
            //         }else {
            //             let url =common.getOrigin() + res.data.obj;
            //             location.href = url;
            //         }
            //     }
            // })
            //表格信息导出
            api.ordinalInfo.getSequence({ serviceCode: 'FILEEXPORTSEQ'}, res => {
                if(res.data.code == 'success'){
                    let fileExportType = res.data.obj
                    this.queryParams.exportFileStatus = 1
                    let options = {
                        fileExportCode: fileExportType,
                        fileExportType: config.fileExportType.fileExportTypeOrder,
                        fileRelactionCode: 'ExportTemplateSalesOrderList',
                        parameters: this.queryParams
                    }
                    api.downLoad.insertFileExportInfo(options, res => {
                        if(res.data.code == 'success'){
                            MessageBox.confirm("请在导出中心下载生成的文件", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        })
                        }
                    })
                }
            })
        }
    },
    watch:{
    	obj:{
    		handler(newV,oldV){
    			this.obj = newV
    		},
    		deep:true
    	}
    },
    filters: {
        status(val) {
            if(val == -1) {
                return '待审批'
            }else if(val == 0) {
                return '审批中'
            }else if(val == 1) {
                return '已通过'
            }
        }
    }
}
</script>
