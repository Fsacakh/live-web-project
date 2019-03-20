<template>
<div class="row">
<div class="col-md-12">
    <b-card header='审批履历'>
        <!-- <div slot="header" @click="toggle">
            <strong>审批履历</strong>
        </div> -->
        <div v-show="!show">
            <div class="table-scrollable mb-2">
                <b-table striped hover bordered show-empty :items="list" :fields="fields">
                    <!-- -1：提交审批、0：驳回、1：通过  -->
                    <template slot="operatorName" slot-scope="row">{{nodeType(row.item)}}</template>
                    <!--<template slot="nodeStatus" slot-scope="row">{{getResult(row.item)}}</template>-->
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
        </div>
    </b-card>
</div>
</div>
</template>
<script>
import api from 'common/api'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            fields: {
                orderTypeName: {
                    label: '操作'
                },
                operatorName: {
                    label: '操作人'
                },
                nodeStatus: {
                    label: '操作结果'
                },
                updateTimeStr: {
                    label: '更新时间'
                },
                remark: {
                    label: '意见'
                }
            },
            list: [],
            show: false,
            orderNo: ''
        }
    },
    computed: {
        ...mapGetters('order', [
            'orderDetailObj'
        ])
    },
    methods: {
        nodeType(item) {
            return item.nodeType !== 1 ? item.operatorName : ''
        },
        toggle() {
            this.show = !this.show
        },
        queryList(_orderNo) {
            const params = {orderNo: _orderNo}
            api.order.queryApproveResume(params).then(res => {
                if(res.data.code === 'success') {
                   if(res.data.obj){
                   		res.data.obj.map((item,i)=>{
                            if(item.nodeName == '提交审批'){
                                item.nodeStatus = '提交审批'
                            }else if(item.nodeName == '审批结束'){
                                item.nodeStatus = '审批结束'
                            }else{
                                if(item.nodeStatus == '-2'){
                                    item.nodeStatus = '撤回'
                                }else if(item.nodeStatus == '-1'){
                                    item.nodeStatus = '待审批'
                                }else if(item.nodeStatus == '0'){
                                    item.nodeStatus = '驳回'
                                }else if(item.nodeStatus == '1'){
                                    item.nodeStatus = '通过'
                                }
                            }
                   			
                   		})
                   }
                   this.list = res.data.obj
                }
            })
        },
        getResult(item) {
            if(item.nodeType === -1) {
                return '提交审批'
            }else if(item.nodeStatus === -2) {
                return '撤回'
            }else if(item.nodeStatus === 0) {
                return '驳回'
            }else if(item.nodeStatus === 1) {
                return '通过'
            }else if(item.nodeStatus === 2) {
                return '审批结束'
            }
        }
    },
    watch: {
        orderDetailObj() {
            this.orderNo = this.orderDetailObj.orderNo
            if(this.orderNo) {
                this.queryList(this.orderNo)
            }
        }
    }
}
</script>
