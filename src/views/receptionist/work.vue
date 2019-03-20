<template>
<div class="animated fadeIn">
    <div class="row">
        <div class="col-md-12">
            <!-- <b-card>
                <div slot="header">
                    <strong>查询</strong>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <b-form-fieldset horizontal label="销售顾问" :label-cols="4" class="text-right">
                            <b-form-input v-model="customer"/>
                        </b-form-fieldset>
                    </div>
                </div>
                <search-btn @reset="reset" @query="query"></search-btn>
            </b-card> -->
            <!-- Transfer -->
            <b-card header="值班排班">
                <el-transfer v-model="workList" 
                    filterable :data="dataList" 
                    :titles="['销售顾问', '值班销售顾问']">
                </el-transfer>
                <div class="row mt-3">
                    <div class="col-md-12 text-right">
                        <b-button size="sm" variant="primary" @click="save">保存</b-button>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</div>
</template>
<script>

import LTransfer from './l-transfer'
import SearchBtn from 'components/searchBtn/searchBtn'
import Vue from 'vue'
import {Transfer, Message} from 'element-ui'
Vue.use(Transfer)
import api from 'common/api'
import { alertInfo, sortChinese } from 'common/com-api'
export default {
    components: {
        SearchBtn,
        LTransfer
    },
    data() {
        return {
            dataList: [],
            workList: [],
            customer: '',  //queryModal - param => delete - after 
            list: [],
            useInfo: {}
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getStoreCode()
            .then(params => {
                this.queryScList(params)
                .then(list => {
                    this.getWorkSc(list)            
                })
            })
        })
    },
    methods: {
        // queryModal delete - after - start
        reset() {
           this.customer = ''
        },
        query() { 
            this.getStoreCode().then(params => {
                this.queryScList(params)
            })
        },
        // queryModal delete - after - end  

        save() {
            let _workList = new Set(this.workList)
            if(_workList.size > 0) {
                let params = [], obj = {}, arr = []
                for(let j =0; j<this.list.length; j++) {     
                    for (let item of _workList.values()) {
                        let obj = this.list[item]
                        arr.push(obj)
                    }
                    break
                }
                arr.forEach(item => {
                    let data = {
                        empCode: item.empCode,
                        orgCode: this.useInfo.orgCode,
                        storeCode: this.useInfo.storeCode
                    }
                    params.push(data)
                })
                this.edit(params)
            }else {
                let params = [{empCode: ""}]
                this.edit(params)
                // Message({
                //     type: 'warning',
                //     message: "请先选择值班销售顾问!"
                // })
            }
        },
        edit(params) {
            api.receptionist.editArrange(params).then( res => {
                alertInfo(res, () => {
                    this.getStoreCode()
                    .then(params => {
                        this.queryScList(params)
                            .then(list => {
                                this.getWorkSc(list)            
                            })
                    })
                })
            })
        },
        // 获取值班销售顾问
        getWorkSc(list) {
            this.list = list
            const params = {
                orgCode: this.useInfo.orgCode,
                storeCode: this.useInfo.storeCode
            }
            api.receptionist.queryWorkSc(params).then( res => {
                const data = res.data
                if(data.code === 'success' && data.obj) {
                    this.workList = []
                    for(let j = 0; j < list.length; j ++) {
                        for(let i = 0; i < data.obj.length; i ++) {                          
                            if(data.obj[i].empName === list[j].empCnName) {
                                this.workList.push(j)
                            }
                        }
                    }                   
                }
            })
        },
        // 获取该账号对应的门店和组织code
        getStoreCode() {
            return new Promise((resolve, reject) => {
                api.toLogin.getJurisdiction().then(res => {
                    const storeInfoVo = res.data.obj.storeInfoVo
                    if(res.data.code === 'success' && storeInfoVo !== null) {
                        let params = {
                            empCnName: this.customer,
                            orgCode: storeInfoVo.orgCode,
                            storeCode: storeInfoVo.storeCode,
                            postnTypeCode: 'positionTypeSC'
                        }
                        this.useInfo = {
                            orgCode: storeInfoVo.orgCode,
                            storeCode: storeInfoVo.storeCode
                        }
                        resolve(params)
                    }
                })
            })
        },
        queryScList(params) {
            return new Promise((resolve, reject) => {
                api.receptionist.queryWorkList(params).then( res => {
                    const data = res.data
                    if(data.code === 'success' && data.obj) {
                        // this.list = data.obj
                        this.dataList = []
                        data.obj.sort(sortChinese('empCnName'))
                        data.obj.forEach((item, i) => {
                            let obj = {
                                key: i,
                                label: `(${i+1}) ${item.empCnName} -- ${item.empMobile}`
                            }
                            this.dataList.push(obj)
                        })
                        resolve(data.obj)
                    }
                })
            })
        }
    }
}
</script>
<style lang="css" scope>
.el-transfer-panel {
  width: 280px !important;
  height: 506px !important;
}

.el-transfer-panel__list,
.el-transfer-panel__body {
  height: 400px !important;
}

.el-transfer-panel__filter .el-input__inner {
  height: 40px !important;
}

.el-checkbox + .el-checkbox,
.el-button + .el-button {
  margin-left: 0 !important;
}
.el-checkbox + .el-transfer-panel__item {
  display: inherit !important; 
}
.el-transfer-panel__item {
  display: inherit !important;     
}
</style>
