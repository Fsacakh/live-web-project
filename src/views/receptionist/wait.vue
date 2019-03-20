<template>
    <div class="row">
        <div class="col-md-12">
            <b-card>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card-header clear-border">
                            <strong>接待中</strong>
                        </div>
                        <b-card class="mb-2 padding-top-none">
                            <div class="pull-left reception-box" v-for="(item, index) in getScList" @click="operationSc(item, $event)" v-if="item.isStartReception" :key="index">
                                <i class="fa fa-user fa-lg mt-4" :class="item.isWork ? 'primary' : 'warning'"></i><br>
                                <span>{{item.empCnName}}</span>
                                <span>{{item.isWork | workStatus}}</span>
                            </div>
                        </b-card>
                    </div>
                    <div class="col-md-6">
                        <div class="card-header clear-border">
                            <strong>等待中</strong>
                        </div>
                        <b-card class="mb-2 padding-top-none">
                            <div class="clear-fix">
                                <div class="pull-left reception-box" v-for="(item, index) in getScList" @click="operationSc(item, $event)" v-if="!item.isStartReception" id="index" :key="index" :id="'popover-'+index">
                                    <i class="fa fa-user fa-lg mt-4" :class="item.isWork ? 'primary' : 'warning'"></i><br>
                                    <span>{{item.empCnName}}</span>
                                    <span>{{item.isWork | workStatus}}</span>
                                </div>
                            </div>
                        </b-card>
                    </div>
                </div>
            </b-card>
            <!-- queryPhone - modal -->
            <b-modal ref="recModal" id="recModal" :title="title" @ok="startReception" ok-title="开始接待" cancel-title="取消">
                <div class="row">
                    <div class="col-md-8">
                        <b-form-fieldset horizontal label="联系电话 " :label-cols="3" class="text-right">
                            <b-form-input v-model="mobilePhone" :state="phoneState" placeholder="查询时必填项" />
                            <b-form-feedback class="text-left"></b-form-feedback>
                        </b-form-fieldset>
                    </div>
                    <div class="col-md-4 ">
                        <b-button size="sm" variant="primary" @click="searchInfo">查询</b-button>
                    </div>
                    <div class="col-md-12">
                        <div class="table-scrollable mb-2">
                            <b-table striped hover bordered show-empty :items="list" :fields="fields">
                                <template slot="defeatStatus" slot-scope="row">
                                    <!-- {{row.value | status}} -->
                                    {{ getStatus(row.item) }}
                                </template>
                                <template slot="empty">
                                    暂无数据
                                </template>
                            </b-table>
                        </div>
                        <div class="pull-right">
                    	  	<b-form-checkbox
			                     v-model="selectAppoint"
			                     value="appointScFlag">
						      	是否指定sc
						    </b-form-checkbox>
                        </div>
                    </div>
                </div>
    </b-modal>
    <!-- poup - modal -->
    <b-modal ref="poup" id="poup" size="sm" :hide-footer="true" :title="modalTitle">
        <div class="row ">
            <div class="col-md-6">
               <b-button size="sm" class="pull-left" variant="primary" @click="showList">查看接待</b-button>
            </div>
            <div class="col-md-6">
               <b-button size="sm" class="pull-right" variant="success"  @click="showModal">开始接待</b-button>
            </div>
        </div>
    </b-modal>

</div>
</div>
</template>
<script>
    import {
        MessageBox,
        Message
    } from 'element-ui'
    import config from 'common/config'
    import api from 'common/api'
    import common from 'common/common'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'
    import {
        getStoreCode,
        compare
    } from './com-reception'
    import {
        getSequence
    } from 'common/com-api'
    export default {
        data() {
            return {
                scList: [],
                mobilePhone: '',
                fields: {
                    scName: {
                        label: '销售顾问'
                    },
                    customName: {
                        label: '顾客姓名'
                    },
                    mobilePhone: {
                        label: '联系电话'
                    },
                    defeatStatus: {
                        label: '线索状态'
                    }
                },
                list: [],
                checkItem: {},
                useInfo: {},
                receptionCode: '',
                phoneState: '',
                event: {},
                selectAppoint:[],
                appointScFlag:1,
            }
        },
        computed: {
            title() {
                return `新增接待 - 当前选中销售顾问 : ( ${this.checkItem.empCnName} )`
            },
            modalTitle() {
                return `销售顾问 : ( ${this.checkItem.empCnName} )`
            },
            ...mapGetters('receptionist', [
                'getScList'
            ])
        },
        created() {
            this.$nextTick(() => {
                this.getWorkSc()
            })
        },
        methods: {
            getReceptioning(params) {
                let _params = {
                    storeCode: params.storeCode
                }
                api.receptionist.getReceptioning(_params).then(res => {
                    const data = res.data
                    if (data.code === 'success' && data.obj) {
                        for (let i = 0; i < this.scList.length; i++) {
                            for (let j = 0; j < data.obj.length; j++) {
                                if (this.scList[i].empCode === data.obj[j].scCode) {
                                    this.scList[i].isStartReception = true
                                    break
                                } else {
                                    this.scList[i].isStartReception = false
                                }
                            }
                        }
                        this.setScList(this.scList)
                    }
                })
            },
            // 获取值班销售顾问
            getWorkSc() {
                getStoreCode().then(useInfo => {
                    this.useInfo = {
                        orgCode: useInfo.orgCode,
                        storeCode: useInfo.storeCode
                    }
                    const params = {
                        orgCode: useInfo.orgCode,
                        storeCode: useInfo.storeCode,
                        postnTypeCode: 'positionTypeSC'
                    }
                    this.queryScList(params).then(() => {
                        this._queryWorkSc(params).then(() => {
                            this.getReceptioning(params)
                        })
                    })
                })
            },
            // 查询当前门店所有sc
            queryScList(params) {
                return new Promise((resolve, reject) => {
                    api.receptionist.queryWorkList(params).then(res => {
                        const data = res.data
                        if (data.code === 'success' && data.obj) {
                            this.scList = data.obj
                            resolve()
                        }
                    })
                })
            },
            // 查询当前门店所有值班sc 截取非值班sc
            _queryWorkSc(params) {
                return new Promise((resolve, reject) => {
                    api.receptionist.queryWorkSc(params).then(res => {
                        const data = res.data
                        if (data.code === 'success' && data.obj) {
                            this.waitWorkList = data.obj
                            for (let i = 0; i < this.scList.length; i++) {
                                for (let j = 0; j < this.waitWorkList.length; j++) {
                                    if (this.scList[i].empCode === this.waitWorkList[j].empCode) {
                                        this.scList[i].isWork = 1
                                        this.scList[i].isStartReception = false
                                        break
                                    } else {
                                        this.scList[i].isWork = 0
                                        this.scList[i].isStartReception = false
                                    }
                                }
                            }
                            this.scList.sort(compare('isWork'))
                            resolve()
                        }
                    })
                })
            },
            // 操作Sc ( 查看sc接待历史, 开始接待 )
            operationSc(item, e) {
                // this.showMessageBox(item)  => el - modal (bug)
                this.checkItem = item
                this.$refs.poup.show()
            },
            showModal() {
                this.$refs.poup.hide()
                getSequence(config.reception.receSeq, (res) => {
                    this.receptionCode = res
                })
                this.phoneState = ''
                this.mobilePhone = ''
                this.list = []
                this.$refs.recModal.show()
            },
            showList() {
                this.$refs.poup.hide()
                this.setSeeHistory()
                this.setScItem(this.checkItem) // 这里用vuex 监听不会实时刷新， 修改为传统的数据通信方式，麻烦了一点
                // this.$emit('checkItem', this.checkItem)
            },
            // 修改之前用的方法...
            showMessageBox(item) {
                this.checkItem = item
                const createElement = this.$createElement;
                MessageBox({
                    title: '提示',
                    message: createElement('p', null, [
                        createElement('span', null, `${item.empCnName}`)
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '开始接待',
                    cancelButtonText: '查看今日接待',
                    type: 'info',
                    beforeClose: (action, instance, done) => {
                        // console.log(instance)
                        if (action === 'confirm') {
                            done()
                            getSequence(config.reception.receSeq, (res) => {
                                this.receptionCode = res
                            })
                            this.phoneState = ''
                            this.mobilePhone = ''
                            this.list = []
                            this.$refs.recModal.show()
                        } else {
                            this.setSeeHistory()
                            this.setScItem(item)
                            done();
                            return
                        }
                    }
                }).catch(() => {})
            },
            // 确认开始接待
            startReception(event) {
                // 非战败 并且 sc不相同不可以接待
                if (this.list.length > 0) {
                    if (this.list[0].defeatStatus !== 1 &&
                        this.list[0].scName &&
                        this.list[0].scName != " " &&
                        this.list[0].scName !== this.checkItem.empCnName) {
                        Message({
                            type: 'warning',
                            message: "该客户不属于此sc!"
                        })
                        event.cancel()
                    } else {
                        this.start(event)
                    }
                } else {
                    this.start(event)
                }
            },
            start(event) {
                // 新客户输入号码 需不需要传给后台 (待确认 => 林云龙先说要后来又不要)
                // if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.mobilePhone)) && this.mobilePhone) {
                //     this.phoneState = 'invalid'
                //     Message({
                //         type: 'warning',
                //         message: "手机号码格式不正确!"
                //     })
                //     event.cancel();
                //     return
                // }
                let params = {
                    receptionCode: this.receptionCode,
                    storeCode: this.useInfo.storeCode,
                    scCode: this.checkItem.empCode,
                    customName: this.list.length > 0 ? this.list[0].customName : '',
                    customCode: this.list.length > 0 ? this.list[0].customCode : '',
                    leadCode: this.list.length > 0 ? this.list[0].leadCode : '',
                    mobilePhone: this.list.length > 0 ? this.list[0].mobilePhone : '',
                    isEnd: this.list.length > 0 ? this.list[0].isEnd : '',
                    appointScFlag:this.selectAppoint.length ? 1:0,
                    
                }
                this._startReception(params, () => {
                    this.$emit('allListChange')
                    this.getWorkSc()
                }, event)
            },
            // 开始接待接口
            _startReception(params, success = () => {}, event) {
                api.receptionist.startReception(params).then(res => {
                    if (res.data.code === 'success') {
                        success()
                        Message({
                            type: 'success',
                            message: "开始接待成功"
                        })
                    } else {
                        // console.log(event)  无效
                        event.cancel()
                    }
                })
            },
            // 通过客户手机号查询客户留档信息
            searchInfo() {
                if (!this.mobilePhone) {
                    this.phoneState = 'invalid'
                    return
                } else if (!common.isTel(this.mobilePhone)) {
                    this.phoneState = 'invalid'
                    Message({
                        type: 'warning',
                        message: "联系电话格式不正确!"
                    })
                    return
                }
                let params = {
                    mobilePhone: this.mobilePhone,
                    storeCode: this.useInfo.storeCode
                }
                this.list = []
                api.receptionist.queryByPhone(params).then(res => {
                    if (res.data.code === 'success') {
                        let salesLeadsInfo = res.data.obj.salesLeadsInfoVo
                        let customInfo = res.data.obj.customInfoVo
                        if (salesLeadsInfo) {
                            this.fields = {
                                scName: {
                                    label: '销售顾问'
                                },
                                customName: {
                                    label: '顾客姓名'
                                },
                                mobilePhone: {
                                    label: '电话号码'
                                },
                                defeatStatus: {
                                    label: '线索状态'
                                }
                            }
                            this.list.push(salesLeadsInfo)
                        } else if (customInfo) {
                            this.fields = {
                                customName: {
                                    label: '顾客姓名'
                                },
                                mobilePhone: {
                                    label: '电话号码'
                                }
                            }
                            this.list.push(customInfo)
                        }
                        if (this.list.length === 0) {
                            Message({
                                type: 'warning',
                                message: "未查到该客户!"
                            })
                        }
                    }
                })
            },
            getStatus(item) {
                if (item.defeatStatus == -1) {
                    return '准战败'
                } else if (item.salesLeadsStatusInfoVos[0].tryDriveStatus > 0) {
                    return '试乘试驾'
                } else if (item.inStoreFlag == 1) {
                    return '到店'
                } else if (item.appointmentSubStatus > 0) {
                    return '已预约'
                } else if (item.appointmentSubStatus <= 0) {
                    return '待跟进'
                } else {
                    return ''
                }
            },
            ...mapMutations({
                setSeeHistory: 'receptionist/SET_SEE_HISTORY',
                setScItem: 'receptionist/SET_SC_ITEM',
                setScList: 'receptionist/SET_SC_LIST'
            })
        },
        filters: {
            status(val) {
                if (val > 0) {
                    return '准战败'
                } else if (this.list[0].tryDriveStatus > 0) {
                    return '试乘试驾'
                } else if (this.list[0].inStoreFlag > 0) {
                    return '到店'
                } else if (this.list[0].appointmentSubStatus > 0) {
                    return '已预约'
                } else if (this.list[0].appointmentSubStatus <= 0) {
                    return '待跟进'
                }
            },
            workStatus(val) {
                if (val === 1) {
                    return '( 值班 )'
                } else {
                    return '( 非值班 )'
                }
            }
        },
        watch: {
            mobilePhone(val) {
                if (val) {
                    this.phoneState = ''
                }
            }
        }
    }
</script>
<style lang="css">
    .reception-box {
        padding: 0 10px 10px 10px;
        cursor: pointer;
        text-align: center;
    }
    .reception-box>span {
        display: block;
        text-align: center;
    }
    .reception-box>i {
        font-size: 36px !important;
    }
    .clear-border {
        border-top: 1px solid #c2cfd6;
        border-left: 1px solid #c2cfd6;
        border-right: 1px solid #c2cfd6;
        border-bottom: none !important;
    }
    .padding-top-none>.card-body {
        padding-top: 0 !important;
        /* min-height: 300px;
        max-height: 300px; */
        height: 300px;
        overflow-y: scroll;
    }
    .table-pad {
        padding-left: 10px;
        padding-right: 10px;
    }
    .success {
        color: #4dbd74;
    }
    .primary {
        color: #20a8d8;
    }
    .warning {
        color: #ffc107;
    }
    .el-message-box__btns button:nth-child(2) {
        margin-left: 10px !important;
    }
    /* .modal-content  */
    .modal-dialog {
        top: 25% !important;
        /* margin-top: 200px !important; */
    }
</style>


