<template>
    <div class="cuetable-detail">
        <div class="row">
            <div class="col-md-12">
                <b-card header="查询">
                    <el-row>
                        <el-col v-if="!isEdit && !disabled" :span="12">
                            <AreaQueryShop @select-change="selectStore" :readonly="isEdit || disabled" />
                        </el-col>
                        <el-col v-if="isEdit || disabled" :span="6">
                            <el-input v-model="storeName" disabled />
                        </el-col>
                        <el-col :span="6">
                            <el-date-picker
                                type="month"
                                placeholder="选择年/月"
                                v-model="date"
                                :disabled="isEdit || disabled"
                                :clearable="false"
                                @change="selectTime"
                            />
                        </el-col>
                    </el-row>
                    <div class="btn-wrap">
                        <el-button @click="cancel">{{ isEdit || disabled ? '返回' : '取消' }}</el-button>
                        <el-button v-if="!isEdit && !disabled" type="primary" @click="create">创建</el-button>
                    </div>
                </b-card>
            </div>
        </div>
        <div class="cue-table" v-if="isEdit || disabled">
            <div class="import">
                <upload 
                    v-if="!disabled"
                    buttonName='导入' 
                    :confirmStr="uploadConfirmStr"
                    :add-params="uploadParams" 
                    :url='analysisUrl'
                    :showBack="showBack"
                    :analysisExcel="analysisExcel"
                    @updateData="importExcel"
                />
                <b-button size="sm" variant="default" @click="exportExcel">导出</b-button>
            </div>
            <div class="wrap" ref="table" :style="{ height: tableHeight }">
                <div class="table-wrap">
                    <table class="collect-effect">
                        <tr>
                            <th :colspan="33">{{ date.slice(0, 4) }}年{{ date.slice(5, 7) }}月 集客渠道效果</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th v-for="(item, index) in collectEffectThead" :key="index" :colspan="4">{{ item }}</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td colspan="2">客流</td>
                            <td colspan="2">留档</td>
                            <td v-for="index in 14" :key="index" :colspan="!index ? 1 : 2">{{ index % 2 ? '总量' : '进店' }}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td v-for="(item, index) in dccEffectColVal" :key="index">{{ index % 2 ? '实际' : '目标' }}</td>
                        </tr>
                        <tr>
                            <td class="left">跨部门分解</td>
                            <td v-for="col in effectDeptVal" :key="col">{{ deptVo[col] || '' }}</td>
                        </tr>
                        <tr>
                            <td class="left">团队总和</td>
                            <td v-for="(col, index) in effectTeamCountVo" :key="index">{{ effectTeamVo[col] || '' }}</td>
                        </tr>
                        <tr>
                            <td class="left">市场专员</td>
                            <td v-for="(col, index) in marketList" :key="index">{{ col }}</td>
                        </tr>
                        <!-- DCC -->
                        <tr v-for="(row, index) in dccList" :key="`dcc${index}`">
                            <td :class="row.empCode ? 'right' : 'left'">{{ row.empCnName }}</td>
                            <td v-for="(col, i) in dccEffectColVal" :key="i">{{ row.empCode ? (Vo[col+row.empCode] || '') : '' }}</td>
                        </tr>
                        <!-- SC -->
                        <tr v-for="(row, index) in scList" :key="`sc${index}`">
                            <td :class="(row.empCode && row.empCode != 'scTotalCount') ? 'right' : 'left'">{{ row.empCnName }}</td>
                            <td v-for="(col, i) in scEffectColVal" :key="i">{{ row.empCode ? (Vo[col+row.empCode] || '') : '' }}</td>
                        </tr>
                    </table>
                    <table class="business-perform">
                        <tr>
                            <th :colspan="12">{{ date.slice(0, 4) }}年{{ date.slice(5, 7) }}月 销售漏斗业务表现</th>
                        </tr>
                        <tr>
                            <th v-for="(item, index) in businessPerformThead" :key="index" :colspan="2">{{ item }}</th>
                        </tr>
                        <tr style="height: 50px;">
                            <td v-for="(item, index) in scPerformColVal" :key="index">{{ index % 2 ? '实际' : '目标' }}</td>
                        </tr>
                        <!-- 跨部门 -->
                        <tr>
                            <td v-for="col in performDeptVal" :key="col">{{ deptVo[col] || '' }}</td>
                        </tr>
                        <!-- 团队总和 -->
                        <tr>
                            <td v-for="col in performTeamCountVo" :key="col">{{ performTeamVo[col] || '' }}</td>
                        </tr>
                        <tr><td v-for="col in 12" :key="col"></td></tr>
                        <!-- DCC -->
                        <tr v-for="(row, index) in dccList" :key="`dcc${index}`">
                            <td v-for="(col, i) in dccPerformColVal" :key="i">{{ row.empCode ? (Vo[col+row.empCode] || '') : '' }}</td>
                        </tr>
                        <!-- SC -->
                        <tr v-for="(row, index) in scList" :key="`sc${index}`">
                            <td v-for="(col, i) in scPerformColVal" :key="i">{{ row.empCode ? (Vo[col+row.empCode] || '') : '' }}</td>
                        </tr>
                    </table>
                    <table class="derive-perform">
                        <tr>
                             <th :colspan="10">{{ date.slice(0, 4) }}年{{ date.slice(5, 7) }}月 销售衍生业务表现</th>
                        </tr>
                        <tr>
                            <th v-for="(item, index) in drivePerformThead" :key="index" :colspan="2">{{ item }}</th>
                        </tr>
                        <tr style="height: 50px;">
                            <td v-for="(item, index) in deriveDeptVal" :key="index">{{ index % 2 ? '实际' : '目标' }}</td>
                        </tr>
                        <!-- 跨部门 -->
                        <tr>
                            <td v-for="col in deriveDeptVal" :key="col">{{ ((col == 'SkuTargetValueTotal') || (col == 'SkuActualValue')) ? tothousand(DerivativeValue[col]) :  DerivativeValue[col]}}</td>
                        </tr>
                        <!-- 团队总和 -->
                        <tr>
                            <td v-for="col in deriveDeptVal" :key="col">{{ ((col == 'SkuTargetValueTotal') || (col == 'SkuActualValue')) ? tothousand(DerivativeValue[col]) : DerivativeValue[col]}}</td>
                        </tr>
                        <!-- 市场人员 -->
                        <tr><td v-for="col in 10" :key="col"></td></tr>
                        <!-- DCC -->
                        <tr v-for="(row, index) in dccList" :key="`dcc${index}`">
                            <td v-for="(col, i) in deriveDeptVal" :key="i"></td>
                        </tr>
                        <!-- SC -->
                        <tr v-for="(row, index) in scList" :key="`sc${index}`">
                            <td v-for="(col, i) in deriveTargetVal" :key="i">
                                {{ ((col == 'SkuTargetValue') || (col == 'SkuActualValue')) ?
                                   tothousand(row.empCode ?
                                   (scderiveVal[col + '_' + row.empCode] ?
                                   (scderiveVal[col + '_' + row.empCode].actualNum || scderiveVal[col + '_' + row.empCode].targer_value || scderiveVal[col + '_' + row.empCode].actualPriceTotal) ?
                                   (scderiveVal[col + '_' + row.empCode].actualNum || scderiveVal[col + '_' + row.empCode].targer_value || scderiveVal[col + '_' + row.empCode].actualPriceTotal).toFixed(0) : ''
                                   : '')
                                   : '') : (row.empCode ?
                                   (scderiveVal[col + '_' + row.empCode] ?
                                   (scderiveVal[col + '_' + row.empCode].actualNum || scderiveVal[col + '_' + row.empCode].targer_value || scderiveVal[col + '_' + row.empCode].actualPriceTotal) ?
                                   (scderiveVal[col + '_' + row.empCode].actualNum || scderiveVal[col + '_' + row.empCode].targer_value || scderiveVal[col + '_' + row.empCode].actualPriceTotal).toFixed(0) : ''
                                   : '')
                                   : '') 
                                   }} 
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="table-wrap">
                    <table class="collect-effect">
                        <tr>
                            <th :colspan="17">{{ date.slice(0, 4) }}年{{ date.slice(5, 7) }}月 集客渠道效率</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th v-for="(item, index) in collectEffectRateThead" :key="index" :colspan="2">{{ item }}</th>
                        </tr>
                        <tr style="height: 50px;">
                            <td></td>
                            <td v-for="(col, index) in effectColRate" :key="index">{{ index % 2 ? '实际' : '目标' }}</td>
                        </tr>
                        <tr>
                            <td class="left">团队总和</td>
                            <td v-for="(col, index) in effectTeamRate" :key="index">
                                {{ effectTeamVo[col[1]] ? (effectTeamVo[col[0]] ? Math.round((effectTeamVo[col[1]])/effectTeamVo[col[0]] * 100) + '%' : 'NaN') : '' }}
                            </td>
                        </tr>
                        <tr v-for="(row, index) in scListRate" :key="index">
                            <td :class="row.empCode ? 'right' : 'left'">{{ row.empCnName }}</td>
                            <td v-for="(col, i) in effectColRate" :key="i">
                                {{ Vo[col[1]+row.empCode] ? (Vo[col[0]+row.empCode] ? Math.round((Vo[col[1]+row.empCode])/Vo[col[0]+row.empCode] * 100) + '%' : 'NaN') : '' }}
                            </td>
                        </tr>
                    </table>
                    <table class="business-perform">
                        <tr>
                            <th :colspan="12">{{ date.slice(0, 4) }}年{{ date.slice(5, 7) }}月 销售漏斗效率表现</th>
                        </tr>
                        <tr>
                            <th v-for="(item, index) in businessPerformRateThead" :key="index" :colspan="2">{{ item }}</th>
                        </tr>
                        <tr style="height: 50px;">
                            <td v-for="(item, index) in scPerformColVal" :key="index">{{ index % 2 ? '实际' : '目标' }}</td>
                        </tr>
                        <tr>
                            <td v-for="(col, index) in performTeamRate" :key="index">
                                <template v-if="index < 10">
                                    {{ performTeamVo[col[1]] ? (performTeamVo[col[0]] ? Math.round((performTeamVo[col[1]])/performTeamVo[col[0]] * 100) + '%' : 'NaN') : '' }}
                                </template>
                                <template v-else>
                                    {{ Vo[col[1]+'scTotalCount'] ? (Vo[col[0]+'scTotalCount'] ? Math.round((Vo[col[1]+'scTotalCount'])/Vo[col[0]+'scTotalCount'] * 100) + '%' : 'NaN') : '' }}
                                </template>
                            </td>
                        </tr>
                        <tr v-for="(row, index) in scListRate" :key="index">
                            <td v-for="(col, i) in performColRate" :key="i">
                                {{ Vo[col[1]+row.empCode] ? (Vo[col[0]+row.empCode] ? Math.round((Vo[col[1]+row.empCode])/Vo[col[0]+row.empCode] * 100) + '%' : 'NaN') : '' }}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
    * Author: Nassua
    * Creat time: 2018-09-06
    * Des: 跨部门线索表新增/编辑
    */
    import Vue from 'vue'
    import { Row, Col, DatePicker, Button, Message, Upload, Input } from 'element-ui'
    import AreaQueryShop from 'components/iris-areaqueryshop'
    import upload from "components/iris-upload/file-upload"
    import api from 'common/api'
    import common from 'common/common'
    import urlMap from 'common/api-url'
    import config from 'common/config'
    import { 
        
        collectEffectThead, 
        businessPerformThead, 
        collectEffectRateThead, 
        businessPerformRateThead,

        dccEffectColVal,
        scEffectColVal,
        dccPerformColVal,
        scPerformColVal,

        effectColRate,
        effectTeamRate,
        dccCustomerClueActual,
        customerClueTarget,
        instStoreClueActual,
        dccInstStoreClueTarget,
        scInstStoreClueTarget,
        performColRate,
        effectDeptVal,
        performDeptVal,
        custClueTarget,
        custClueActual,
        inStoreTarget,
        effectTeamCountVo,
        performTeamRate,
        performTeamCountVo,
        customerClueTeamActual,
        customerClueTeamTarget,
        inStoreClueTeamTarget,
        inStoreClueTeamActual,

        scCustomerClueActual,
        scCustomerClueTarget,
        dccCustomerClueTarget,
        dccInstStoreClueActual,
        scInstStoreClueActual,


        drivePerformThead,     //销售衍生业务
        deriveDeptVal,    //
        deriveTargetVal
    } from './config'
    
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Input)
    Vue.use(DatePicker)
    Vue.use(Button)
    Vue.use(Upload)

    export default {
        data() {
            return {
                
                disabled: this.$route.path.includes('check') ? true : false,
                isEdit: this.$route.path.includes('edit') ? true : false,
                storeCode: this.$route.query.store || '',
                storeName: this.$route.query.name || '',
                date: this.$route.query.date || '',
                managerCode: this.$route.query.manager || '',

                // 上传
                analysisUrl: urlMap.cueTable.importDepartmentReport,
                uploadConfirmStr: '导入列表信息将覆盖已有列表信息，请确认操作？',
                uploadParams: {
                    relationCode: 'importDepartmentReport',
                    singleFlag: '1',
                    businessType: 'excel'
                },
                showBack: {
                    storeCode: this.$route.query.store || ''
                },

                tableHeight: 0,

                collectEffectThead,
                businessPerformThead,
                collectEffectRateThead,
                businessPerformRateThead,
                scCustomerClueActual,

                dccEffectColVal,
                scEffectColVal,
                dccPerformColVal,
                scPerformColVal,

                effectColRate,
                effectTeamRate,
                performColRate,
                effectDeptVal,
                performDeptVal,
                effectTeamCountVo,
                performTeamCountVo,
                performTeamRate,


                drivePerformThead,
                deriveDeptVal,
                deriveTargetVal,

                // 跨部门分解
                deptVo: {},
                marketList: new Array(32),

                // 团队总和
                effectTeamVo: {},
                performTeamVo: {},
                
                Vo: {},
                dccVo: {}, // dcc 数据
                scVo: {}, // sc 数据 
                rowList: [], // dcc & sc 人员列表
                scList: [], // sc 人员列表
                scListRate: [],
                dccList: [], // dcc 人员列表

                DerivativeValue:[], //衍生
                scderiveVal: {}
            }
        },
        created() {
            !this.managerCode && this.initManageCode()
            if (this.disabled || this.isEdit) {
                this.initDeptVal()
                this.initEmpList()
                this.initTeamTotalCount()
                this.getCrossDerivativeBusinessActualTotal()
                this.getScCrossDerivativeBusiness()
                this.getScTargetCrossDerivativeBusiness()
            }
        },  
        mounted() {
            window.vue = this
            this.initTableHeight()
        },
        methods: {
            
            initTableHeight() {
                const offsetTop = this.$refs.table && this.$refs.table.offsetTop
                this.tableHeight = document.body.clientHeight - offsetTop - 50 + 'px'
            },

            // 初始化 managerCode
            initManageCode() {

                const params = { serviceCode: config.cueTable.sequence }
                
                api.ordinalInfo.getSequence(params, res => {
                    if(res.data.code == 'success'){
                        this.managerCode = res.data.obj;
                    }
                    this.uploadParams['managerCode'] = this.managerCode
                })
            },

            // 初始化 DCC && SC 列表
            initEmpList() {
                
                if (!this.storeCode) return

                const params = { storeCode: this.storeCode }

                api.cueTable.queryEmployeeInfoSCByStoreCode(params, res => {
                    if (res && res.data.code == 'success') {
                        
                        const dcc = res.data.obj.dcc || {}
                        const sc = res.data.obj.sc || {}
                        const sale = { empCode: 'scTotalCount', empCnName: '销售专员' }

                        // dcc
                        for (let [key, val] of Object.entries(dcc)) {
                            const titVo = { empCode: '', empCnName: key }
                            const list = val.map(({ empCode, empCnName }) => ({ empCode, empCnName }))
                            this.dccList = [...this.dccList, titVo, ...list]
                        }

                        // sc
                        for (let [key, val] of Object.entries(sc)) {
                            const titVo = { empCode: '', empCnName: key }
                            const list = val.map(({ empCode, empCnName }) => ({ empCode, empCnName }))
                            this.scListRate = [...this.scListRate, titVo, ...list]
                        }
                        this.scList = [sale, ...this.scListRate]
                        this.rowList = [...this.dccList, ...this.scList]
                        this.initActualVal()
                        this.initTargetVal()
                    }
                })
            },

            // 跨部门分解 实际值 && 目标值
            initDeptVal() {

                const params = {
                    dateVersion: new Date(this.date).Format('yyyy-MM'),
                    storeCode: this.storeCode
                }

                api.cueTable.departmentStrategyReport(params, res => {
                    if (res && res.data.code == 'success') {

                        const Vo = res.data.obj || {}
                        if (Vo.marketingSpecialist) {
                            this.marketList[1] = Vo.marketingSpecialist.LeadsChannelCustomer
                            this.marketList[13] = Vo.marketingSpecialist.leadsSourceClassifyActiveCollector
                        }

                        for (let [key, val] of Object.entries(Vo)) {
                            for (let [dataKey, dataVal] of Object.entries(val || {})) {
                                this.deptVo[key+dataKey] = dataVal
                            }
                        }

                        // 散客客流 + 线索 目标值
                        this.calcDeptVal(custClueTarget, 'customerClueTarget')

                        // 散客客流 + 线索 实际值
                        this.calcDeptVal(custClueActual, 'customerClueActual')

                        // 进店线索 目标值
                        this.calcDeptVal(inStoreTarget, 'inStoreTarget')
                    }
                })
            },

            // 团队总和
            initTeamTotalCount() {
                
                const params = {
                    dateVersion: new Date(this.date).Format('yyyy-MM'),
                    managerCode: this.managerCode,
                    storeCode: this.storeCode
                }

                api.cueTable.countTeamTotalSum(params, res => {
                    if (res && res.data.code == 'success') {
                        
                        const Vo = res.data.obj || {}
                        const dataVo = {}

                        for (let [key, item] of Object.entries(Vo)) { 
                            for(let [dataKey, dataItem] of Object.entries(item)) { dataVo[key+'_'+dataKey] = dataItem }
                        }

                        effectTeamCountVo.forEach(item => { this.effectTeamVo[item] = dataVo[item] || 0 })
                        performTeamCountVo.forEach(item => { 
                            this.performTeamVo[item] = this.performTeamVo[item] || dataVo[item] || 0 
                        })

                        this.effectTeamVo = { ...this.effectTeamVo }
                        this.performTeamVo = { ...this.performTeamVo }

                        // 散客客流+线索 目标值
                        this.calcTeamCount(customerClueTeamTarget, 'customer_clue_target')

                        // 散客客流+线索 实际值
                        this.calcTeamCount(customerClueTeamActual, 'customer_clue')

                        // 进店线索 目标值
                        this.calcTeamCount(inStoreClueTeamTarget, 'inStore_clue_target')

                        // 进店线索 实际值
                        this.calcTeamCount(inStoreClueTeamActual, 'inStore_clue')
                    }
                })
            },

            // 查询八大渠道实际值
            initActualVal() {

                const params = { storeCode: this.storeCode, dateVersion: new Date(this.date).Format('yyyy-MM') }

                api.cueTable.queryTotalEightChannelsNum(params, res => {
                    if (res && res.data.code == 'success') {
                        
                        const Vo = res.data.obj || {}
                        // 销售专员 实际值
                        const list = [...this.scEffectColVal, ...this.scPerformColVal]
                        list.forEach(item => {
                            if (!item.includes('target')) {
                                Vo[item + 'scTotalCount'] = 0
                                this.scListRate.forEach(row => {
                                    if (row.empCode)
                                        Vo[item + 'scTotalCount'] += (Vo[item + row.empCode] || 0)
                                })
                            }
                        })

                        this.performTeamVo['crossDeptFirstStoreTestDriveCount'] = Vo['sc_*_crossDeptFirstStoreTestDriveCount_*_scTotalCount']
                        this.deptVo['crossDeptFirstStoreTestDriveCount'] = Vo['sc_*_crossDeptFirstStoreTestDriveCount_*_scTotalCount']
                        this.Vo = { ...this.Vo, ...Vo }

                        // dcc 销售漏斗业务表现 散客客流 实际
                        this.calcColVal(dccCustomerClueActual, this.dccList, 'dcc_*_customer_clue_*_')
                        
                        // dcc 销售漏斗业务表现 进店线索 实际
                        this.calcColVal(dccInstStoreClueActual, this.dccList, 'dcc_*_inStore_clue_*_')

                        // sc 销售漏斗业务表现 散客客流 实际值
                        this.calcColVal(scCustomerClueActual, this.scList, 'sc_*_customer_clue_*_')

                        // sc 销售漏斗业务表现 进店线索 实际值
                        this.calcColVal(scInstStoreClueActual, this.scList, 'sc_*_inStore_clue_*_')
                    }
                })
            },

            // 查询八大渠道目标值
            initTargetVal() {

                const params = { storeCode: this.storeCode, dateVersion: new Date(this.date).Format('yyyy-MM') }
                
                api.cueTable.queryTargetDepartmentReportLists(params, res => {
                    if (res && res.data.code == 'success') {

                        const Vo = res.data.obj || {}

                        this.marketList[0] = Vo['ms_*_LeadsChannelCustomer_crossDeptFlowCount_target_*_positionTypeMarketingSpecialist']
                        this.marketList[12] = Vo['ms_*_leadsSourceClassifyActiveCollector_crossDeptLeadCount_target_*_positionTypeMarketingSpecialist']
                        
                        // 销售专员 目标值
                        const list = [...this.scEffectColVal, ...this.scPerformColVal]
                        list.forEach(item => {
                            if (item.includes('target')) {
                                Vo[item + 'scTotalCount'] = 0
                                this.scListRate.forEach(row => {
                                    if (row.empCode)
                                        Vo[item + 'scTotalCount'] += (Vo[item + row.empCode] || 0)
                                })
                            }
                        })

                        this.performTeamVo['driveCountTarget'] = Vo['sc_*_all_crossDeptFirstStoreTestDriveCount_target_*_scTotalCount']
                        this.deptVo['driveCountTarget'] = Vo['sc_*_all_crossDeptFirstStoreTestDriveCount_target_*_scTotalCount']
                        this.Vo = { ...this.Vo, ...Vo }
                        
                        // dcc 销售漏斗业务表现 散客客流 目标
                        this.calcColVal(dccCustomerClueTarget, this.dccList, 'dcc_*_customer_clue_target_*_')
                        
                        // dcc 销售漏斗业务表现 进店线索 目标值
                        this.calcColVal(dccInstStoreClueTarget, this.dccList, 'dcc_*_inStore_clue_target_*_')

                        // sc 销售漏斗业务表现 散客客流 目标
                        this.calcColVal(scCustomerClueTarget, this.scList, 'sc_*_customer_clue_target_*_')
                        
                        // sc 销售漏斗业务表现 进店线索 目标值
                        this.calcColVal(scInstStoreClueTarget, this.scList, 'sc_*_inStore_clue_target_*_')
                    }
                })
            }, 
            //查询衍生业务实际表现统计
            getCrossDerivativeBusinessActualTotal(){
                const params = { storeCode: this.storeCode, dateVersion: new Date(this.date).Format('yyyy-MM') }
                api.cueTable.getCrossDerivativeBusinessActualTotal(params, res=>{
                    if (res.data.code == 'success' && res.data.obj){
                        let actualValue = res.data.obj
                        //查询衍生业务表现目标统计
                        api.cueTable.getCrossDerivativeBusinessTargetTotal(params, res=>{
                            if (res.data.code == 'success' && res.data.obj){
                                let targetValue = res.data.obj[0]

                                this.DerivativeValue = {...actualValue,...targetValue} 
                            }
                        })
                    }
                    
                })
            },
            //查询衍生业务sc表现实际
            getScCrossDerivativeBusiness(){
                const params = { storeCode: this.storeCode, dateVersion: new Date(this.date).Format('yyyy-MM') }
                api.cueTable.getScCrossDerivativeBusiness(params, res=>{

                    if (res.data.code == 'success' && res.data.obj){
                        const Vo = res.data.obj || {}
                        const dataVo = {}
                        for (let [key, item] of Object.entries(Vo)) { 
                            for(let [dataKey, dataItem] of Object.entries(item)) {
                                dataVo[key + '_' + dataItem['scCode']] = dataItem }
                                let scTotalVal = 0
                                item.forEach(v =>{
                                    scTotalVal += (v.actualNum || v.actualPriceTotal) 
                                })
                                dataVo[key + '_' + 'scTotalCount'] = {actualNum: scTotalVal}
                        }
                        
                        this.scderiveVal = Object.assign(this.scderiveVal, dataVo)
                    }
                })
            },

            //查询衍生业务SC表现目标【金融、保险、精品、延保、其它】
            getScTargetCrossDerivativeBusiness(){
                const params = { storeCode: this.storeCode, dateVersion: new Date(this.date).Format('yyyy-MM') }
                api.cueTable.getScTargetCrossDerivativeBusiness(params, res=>{

                    if (res.data.code == 'success' && res.data.obj) {
                        const Vo = res.data.obj || {}
                        const dataVo = {}

                        for (let [key, item] of Object.entries(Vo)) { 
                            for(let [dataKey, dataItem] of Object.entries(item)) {
                                dataVo[key+'_'+dataItem['sc_code']] = dataItem }
                                let scTotalVal = 0     //sc总和
                                item.forEach(v =>{
                                    scTotalVal += v.targer_value
                                })
                                dataVo[key + '_' + 'scTotalCount'] = {targer_value: scTotalVal}
                        }

                        this.scderiveVal = Object.assign(this.scderiveVal, dataVo)
                    }
                })
            },

            // 销售漏斗业务中需要计算的值  
            calcColVal(unit, target, code) {
                target.forEach((row, i) => {
                    let val = 0
                    unit.forEach(item => { val += (this.Vo[item + row.empCode] || 0) })
                    this.Vo[code+ row.empCode] = val
                })
            },

            // 跨部门分解需要计算的值
            calcDeptVal(unit, target) {
                let val = 0
                unit.forEach(key => { val += (Number(this.deptVo[key]) || 0) })
                this.deptVo[target] = val
            },

            // 团队总和需要计算的值
            calcTeamCount(unit, target) {
                unit.forEach(item => {
                    this.performTeamVo[target] += (this.effectTeamVo[item] || 0)
                })
            },

            // 选择门店
            selectStore(area, store) {
                
                if (store instanceof Array) return
                
                this.storeCode = store.value
                this.storeName = store.text
            },

            // 选择时间
            selectTime() {
                this.date = this.date.Format('yyyy-MM')
            },

            // 取消
            cancel() {
                this.$router.push({ path: 'query' })
            },

            // 创建
            create() {

                if (this.storeCode == '') {
                    Message({
                        type: 'warning',
                        message: '请选择门店',
                        showClose: true
                    })
                    return
                }

                if (this.date == '') {
                    Message({
                        type: 'warning',
                        message: '请选择月份',
                        showClose: true
                    })
                    return
                }

                const params = {
                    storeCode: this.storeCode,
                    dateVersion: new Date(this.date).Format('yyyy-MM'),
                    crossDeptType: 1 // 跨部门月报
                }

                api.cueTable.editCrossDeptManagerInfoList([params], res => {
                    if (res && res.data.code == 'success') {
                        this.$router.push({ 
                            path: 'edit', 
                            query: { 
                                store: this.storeCode, 
                                name: this.storeName,
                                date: new Date(this.date).Format('yyyy-MM'),
                                manager: this.managerCode 
                            } 
                        })
                        this.isEdit = true
                        this['showBack'].storeCode = this.$route.query.store
                        this.initDeptVal()
                        this.initEmpList()
                        this.initTeamTotalCount()
                        this.initTableHeight()
                    }
                })
            },

            // 导出
            exportExcel() {

                const params = { 
                    storeCode: this.storeCode, 
                    dateVersion: new Date(this.date).Format('yyyy-MM'),
                    managerCode: this.managerCode
                }

                api.cueTable.exportDepartmentReport(params, res => {
                    if (res && res.data.code == 'success')
                        window.location.href = common.getUploadUrl() + res.data.obj.filePath
                })
            },

            // 导入
            importExcel() {
                this.initActualVal()
                this.initTargetVal()
                this.getCrossDerivativeBusinessActualTotal()
                this.getScCrossDerivativeBusiness()
                this.getScTargetCrossDerivativeBusiness()
            },

            analysisExcel() {
                Message({
                    type: 'success',
                    message: '解析跨部门策略表导入成功',
                    showClose: true
                })
            },
            tothousand(val){
                if (val === 0) {
                    return 0
                } else if (!val) {
                    return  val
                }  else {
                     return (Number(val) / 1000).toFixed(1)
                } 
            }
        },
        components: {
            AreaQueryShop,
            upload
        }
    }
</script>

<style lang="scss">
    .cuetable-detail {
        .el-col-6, .btn-wrap {
            box-sizing: border-box;
            padding-left: 30px;
        }
        input::-webkit-input-placeholder {
            color: #3e515b !important;
        }
        .btn-wrap {
            margin-top: 20px;
            text-align: right;
        }
        .import {
            padding: 20px 20px 0;
        }
        .cue-table {
            width: 100%;
            box-sizing: border-box;
            background: #FFF;
            overflow-x: auto;
            .wrap {
                overflow: auto;
                padding: 0 20px 20px;
                margin-top: 20px;
            }
            .table-wrap {
                display: flex;
                margin-bottom: 20px;
                justify-content: space-between;
            }
            .collect-effect {
                min-width: 1500px;
            }
            .business-perform {
                min-width: 700px;
                margin: 0 40px 0;
            }
            .derive-perform {
                min-width: 700px;
            }
            tr, th, td {
                height: 25px;
                border: 1px solid #DDD;
                text-align: center
            }
        }
        .el-input.is-disabled .el-input__inner {
            background-color: #EDF1F7 !important;
            border: 1px solid #BFCBD9;
        }
        .left {
            text-align: left !important;
            padding-left: 15px;
        }
        .right {
            text-align: right !important;
            padding-right: 15px;
        }
    }
</style>