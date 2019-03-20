<template>
<div class="row" ref="personal">
    <div class="col-md-12">
        <div class="table-scrollable mb-2">
            <b-table striped hover bordered show-empty :items="list" :fields="fields">
                <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                <template slot="intentionCarName" slot-scope="row">{{ intentionCarName(row.item) }}</template>
                <template slot="receptionStartTime" slot-scope="data">{{data.value | timeSlice}}</template>
                <template slot="receptionEndTime" slot-scope="data">
                    <b-button size="sm" variant="danger" @click="endWork(data)" v-if="data.item.receptionTime === 0">结束</b-button>
                    <span v-if="data.item.receptionTime > 0">{{data.value | timeSlice}}</span>
                </template>
                <template slot="tryDriveStatus" slot-scope="data">
                    <b-button size="sm" @click="drive(data)" v-if="data.value <= 1 && data.item.receptionTime === 0" :variant="data.value?'danger':'success'">
                        {{data.value | driveStatus}}
                    </b-button>
                    <span v-if="data.value > 1 || (data.value === 0 && data.item.receptionTime > 0)">{{ data.value === 0 ? '否' : '是'}}</span>
                </template>
                <template slot="keepFileStatus" slot-scope="data">{{data.value | comStatus}}</template>
                <template slot="quotedPriceStatus" slot-scope="data">{{data.value | comStatus}}</template>
                <template slot="createOrderStatus" slot-scope="data">{{data.value | comStatus}}</template>
                <template slot="finishCarStatus" slot-scope="data">{{data.value | comStatus}}</template>
                <template slot="operation" slot-scope="data">
                    <div class="clearfix" :style="{width: limitTime ? '122px' : '60px'}">
                        <b-button class="pull-left mr-2" size="sm" variant="danger" 
                            @click="revoke(data)"
                            v-show="limitTime"
                            :disabled="!showCancelBtn(data)">
                            撤销
                        </b-button> 
                        <b-button class="pull-left" size="sm" variant="primary" @click="changeSc(data)" v-show="!data.item.receptionEndTime">切换</b-button>
                    </div>
                </template>
                <template slot="empty">暂无数据</template> 
            </b-table>
        </div>
        <!-- tryDrive -->
        <b-modal ref="tryDrive" id="tryDrive" title="请选择试乘试驾车"  @ok="cirfromDrive" ok-title="确定" cancel-title="取消">
            <select-car ref="select"
                :brandCheck='brandCheck'
                :seriesCheck='seriesCheck'
                :modelCheck='modelCheck'                
                @getBrandCode="getBrandCode"
                @getSeriesCode="getSeriesCode"
                @getModelCode="getModelCode">
            </select-car>
        </b-modal>
        <!-- changeSc -->
        <b-modal ref="changeSc" title="切换销售顾问" @ok="confirmChangeSc" ok-title="确定" cancel-title="取消">
          <el-radio-group v-model="scEmp">
            <el-radio v-if="item.empCode != currentSc" :label="item" v-for="(item, index) in getScList" :key="index">{{item.empCnName}}</el-radio>
          </el-radio-group>
        </b-modal>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import { MessageBox, Message , Radio,RadioButton, RadioGroup} from 'element-ui'
Vue.component(MessageBox.name, MessageBox)
Vue.component(Radio.name, Radio)
Vue.component(RadioButton.name, RadioButton)
Vue.component(RadioGroup.name, RadioGroup)
import config from 'common/config'
import api from 'common/api'
import { queryTodayList } from './com-reception'
import { getSequence, getRefDetail } from 'common/com-api'
import { mapGetters } from 'vuex'
import SelectCar from './select-car'
export default {
    components: {
        SelectCar
    },
    data() {
        return {
            id:'',
            currentSc:'',
            scEmp: {},
            options: [
                { text: 'First radio', value: 'first' },
                { text: 'Second radio', value: 'second' },
                { text: 'Third radio', value: 'third' }
            ],
            fields: {
                index: {
                    label: '序号'
                },
                scName: {
                    label: '销售顾问'
                },
                customName: {
                    label: '顾客姓名'
                },
                mobilePhone: {
                    label: '电话号码'
                },
                intentionCarName: {
                    label: '意向车型'
                },
                channelName: {
                    label: '渠道'
                },
                intentionLevelName: {
                    label: '客户级别'
                },
                receptionStartTime: {
                    label: '开始接待'
                },
                receptionEndTime: {
                    label: '结束接待'
                },
                keepFileStatus: {
                    label: '留档'
                },
                tryDriveStatus: {
                    label: '试乘试驾'
                },
                quotedPriceStatus: {
                    label: '报价'
                },
                createOrderStatus: {
                    label: '订单'
                },
                finishCarStatus: {
                    label: '交车'
                },
                operation: {
                    label: '操作'
                }
            },
            list: [],
            driveParams: {},
            itemData: {},
            actualTrialDriveCode: '',

            brandCheck: false,
            seriesCheck: false,
            modelCheck: false,
            
            limitTime: 0
        }
    },
    created() {
        getRefDetail(config.reception.recepCancelLimit, res => {
            this.limitTime = res.refDetailValue
        })
    },
    computed: {
        ...mapGetters('receptionist', [
            'getSeeHistory',
            'getScItem',
            'getUserAvailableInfo',
            'getScList'
        ])
    },
    methods: {
        getBrandCode(code) {
            this.driveParams.brandCode = code
        },
        getSeriesCode(code) {
            this.driveParams.seriesCode = code
        },
        getModelCode(code) {
            this.driveParams.modelCode = code
        },
        // 试乘试驾
        drive(data) {
            // if(!data.item.mobilePhone) {
            if(!data.item.leadCode) {
                Message({
                    type: 'warning',
                    message: "请销售顾问先成功保存线索!"
                })
                return;
            }
            // 开始试驾 => 选择试乘试驾车
            if(data.value === 0) {
                this.itemData = data.item
                getSequence(config.reception.driveSeq, (res) => {
                    this.actualTrialDriveCode = res
                })
                this.$refs.select.brandClearValue()
                this.$refs.select.seriesClearValue()
                this.$refs.select.modelClearValue()
                this.$refs.tryDrive.show()
            // 结束试驾
            }else if(data.value === 1) {
                let params = {actualTrialDriveCode: data.item.actualTrialDriveCode}
                this.endDrive(params, () => {
                    this._queryList(data.item.scCode)
                })
            }
        },
        // 确认试乘试驾
        cirfromDrive(event) {
            let params = {
                actualTrialDriveCode: this.actualTrialDriveCode,
                receptionCode: this.itemData.receptionCode,
                leadCode: this.itemData.leadCode,
                brandCode: this.driveParams.brandCode,
                seriesCode: this.driveParams.seriesCode,
                modelCode: this.driveParams.modelCode
            }
            if(!params.brandCode || !params.seriesCode || !params.modelCode) {
                Message({
                    type: 'warning',
                    message: "请完整填写车型信息!"
                })
                params.brandCode ? this.brandCheck = false : this.brandCheck = true
                params.seriesCode ? this.seriesCheck = false : this.seriesCheck = true
                params.modelCode ? this.modelCheck = false : this.modelCheck = true
                
                event.cancel()
                return
            }
            this.startDrive(params, () => {
                this._queryList(this.itemData.scCode)
            })
        },
        // 开始试驾
        startDrive(params, success) {
            api.receptionist.startTryDriver(params).then( res => {
                if(res.data.code === 'success') {
                    success()
                    Message({
                        type: 'success',
                        message: "开始试驾成功"
                    })
                }else {
                    Message({
                        type: 'error',
                        message: "开始试驾失败"
                    })
                }
            })
        },
        // 结束试驾
        endDrive(params, success) {
            api.receptionist.updateDrives(params).then( res => {
                if(res.data.code === 'success') {
                    success()
                    Message({
                        type: 'success',
                        message: "结束试驾成功"
                    })
                }else {
                    Message({
                        type: 'error',
                        message: "结束试驾失败"
                    })
                }
            })
        },
        // 结束工作
        endWork(data) {
            if(data.item.tryDriveStatus === 1) {
                Message({
                    type: 'warning',
                    message: "请先结束试驾再结束工作!"
                })
            }else {
                let params = {
                    receptionCode: data.item.receptionCode,
                    receptionEndTime: ''
                }
                this.$nextTick(() => {
                    this.updateItem(params, () => {
                        this.$emit('remove')
                        this._queryList(data.item.scCode)
                    })
                })
            }
        },
        // ( 更新进店接待列表信息 ) =>  结束工作
        updateItem(params, success) {
            api.receptionist.updateInfoList(params).then(res => {
                if(res.data.code === 'success') {
                    success()
                    Message({
                        type: 'success',
                        message: "操作成功"
                    })
                }else {
                    Message({
                        type: 'error',
                        message: "操作失败"
                    })
                }
            })
        },
        // 撤销
        revoke(data) {
            if(data.item.leadCode) {
                Message({
                    type: 'warning',
                    message: "客户已留档, 无法撤销"
                })
                return
            }
            const o_el = this.$createElement;
            MessageBox({
                title: '提示',
                message: o_el('p', null, [
                    o_el('span', null, `是否确定撤销${data.item.scName}的此次接待？`)
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        let params = {
                            receptionCode: data.item.receptionCode,
                            mobilePhone: data.item.mobilePhone,
                            storeCode: data.item.storeCode,
                            leadCode: data.item.leadCode
                        }
                        this.cirfromRevoke(params, data)
                        done()
                    } else {
                        done()
                    }
                }
            }).catch(() => {})
        },
        // 确定撤销接待
        cirfromRevoke(params, data) {
            api.receptionist.cancelReception(params).then(res => {
                if(res.data.code === 'success') {
                    if(res.data.obj === '该客户已经留档，撤销失败') {
                        Message({
                            type: 'warning',
                            message: "新客户已留档, 撤销失败"
                        })
                    }else {
                        Message({
                            type: 'success',
                            message: "撤销成功"
                        })
                        this._queryList(data.item.scCode)
                        this.$emit('remove')
                    }
                }
            })
        },
        time(item) {
            if(item.receptionEndTime) {
                return 1
            }else {
                return 0
            }
        },
        tryDrive(item) {   //0  0, 1  0, 1, 1
            if(!item.actualTryTimeBegin && !item.actualTryTimeEnd) {
                return 0
            }else if(item.actualTryTimeBegin && !item.actualTryTimeEnd) {
                return 1
            }else if (item.actualTryTimeBegin && item.actualTryTimeEnd) {
                return 2
            }
        },
        intentionCarName(item) {
            return `${item.factoryName || ''} ${item.brandName || ''}
                    ${item.seriesName || ''} ${item.modelName || ''}`
        },
        _queryList(code) {
            let params = {
                scCode: code,
                storeCode: this.getUserAvailableInfo.storeInfoVo.storeCode,
                pageNums: 1000,
                pageStart: 1
            }
            this.list = []
            queryTodayList(params, (obj) => {                
                obj.list.forEach(item => {
                    let data = {
                        id: item.id,
                        actualTrialDriveCode: item.actualTrialDriveCode,
                        receptionCode: item.receptionCode,
                        leadCode: item.leadCode,
                        storeCode: item.storeCode,
                        scCode: item.scCode,
                        scName: item.scName,
                        customName: item.customName,
                        mobilePhone: item.mobilePhone,
                        displayName: item.displayName,
                        channelName: item.channelName,
                        intentionLevelName: item.intentionLevelName,
                        receptionStartTime: item.receptionStartTime,
                        receptionEndTime: item.receptionEndTime,
                        receptionTime: this.time(item),                // 是否结束工作
                        keepFileStatus: item.keepFileStatus,
                        tryDriveStatus: this.tryDrive(item),           // 是否试乘试驾
                        quotedPriceStatus: item.quotedPriceStatus,
                        createOrderStatus: item.createOrderStatus,
                        finishCarStatus: item.finishCarStatus,
                        factoryName: item.factoryName,
                        brandName: item.brandName,
                        seriesName: item.seriesName,
                        modelName: item.modelName,
                        currentTime: item.currentTime
                    }
                    this.list.push(data)
                })
            })
        },
        changeSc(data){
            if(data.item.keepFileStatus !== 0){
                Message({
                    type: 'warning',
                    message: "客户已留档, 无法切换"
                })
                return
            }
            this.$refs.changeSc.show();
            this.currentSc = data.item.scCode;
            var index = data.index;
            this.id = this.list[index].id
        },
        //切换SC 
        confirmChangeSc(){
            var params = {
                id: this.id,
                scCode:this.scEmp.empCode,
                scName:this.scEmp.empCnName
            }
            api.receptionist.changeReceptionReceiver(params).then(function(res){
                if(res.data.code == 'success'){
                    window.location.reload(true);
                }
            });
        },
        // 不显示撤销按钮  ! limitTime || limitTime + receptionStartTime < currentTime || ! receptionEndTime
        showCancelBtn(row) {
            const item = row.item,
                canCancelTime = this.limitTime * 1000 + new Date(item.receptionStartTime).getTime(),
                currentTime = new Date(item.currentTime).getTime()
            return this.limitTime && canCancelTime >= currentTime && !item.receptionEndTime
        }
    },
    watch: {
        getSeeHistory(val) {
            this.$refs.personal.scrollIntoView()
            // this._queryList(this.checkItem.empCode)
            this._queryList(this.getScItem.empCode)
        },
        scEmp(val){
            console.info(val);
        }
    },
    filters: {
        driveStatus(val) {
            if(val === 0) {
                return '开始试驾'
            }else if(val === 1) {
                return '结束试驾'
            }
        },
        comStatus(val) {
            if(val === 0) {
                return '否'
            }else if(val > 0) {
                return '是'
            }
        },
        timeSlice(val) {
            if(val) {
                return val.slice(0, 19)
            }
        }
    }
}
</script>
<style lang="css" scoped>
/* 没用到 => 回头就删掉 */
.el-dialog {
    top: 50% !important;
}
.el-radio-group .el-radio{
    display:inline-block;
    width: 30%;
}
.el-radio+.el-radio{
    margin-left: 0;
}
</style>
