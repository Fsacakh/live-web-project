<template>
<div class="row">
    <div class="col-md-6">
        <b-form-fieldset horizontal label="销售区域" :label-cols="4" class="text-right">
            <area-tree @sales-data="getSales" @select-change="selectChange" ref="area" :storeAll='true'
            ></area-tree>
        </b-form-fieldset>
    </div>
    <div class="col-md-6">
        <b-form-fieldset horizontal label="金融机构" :label-cols="4" class="text-right">
            <b-form-select  :options="financeOptions" v-model="financeOrg">
            </b-form-select>
        </b-form-fieldset>
    </div>
    <div class="col-md-6">
        <b-form-fieldset horizontal label="有效时间" label-text-align="right" :label-cols="4">
            <el-date-picker
                v-model="date"
                type="daterange"
                :editable="false"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                >
            </el-date-picker>
            <!-- :picker-options="pickerOptions" -->
        </b-form-fieldset>
    </div>
</div>
</template>
<script>

import config from 'common/config'
import api from 'common/api'
import common from 'common/common'
import AreaTree from 'components/iris-areaqueryshop/index'

export default {
    components: {
        AreaTree
    },
   created() {
       this.getFinanceOrg()
   },
   data() {
     return {
        financeOptions: [],
        financeOrg: '',
        date: '',
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
            }
        }
     }
   },
   methods: {
       // 获取金融机构
        getFinanceOrg() {
            let key = config.empTokenKey
            let param = { 'empToken': common.getCookie(key) }
            api.financePro.getAuthorizationOrgs(param, (res) => {
                if(res.data.code === 'success') {
                    let items = res.data.obj;
                    items.forEach((item, index) => {
                        let data = {
                            text: item.financeOrgName,
                            value: item.financeOrgCode
                        }
                        this.financeOptions.push(data)
                    })
                }
            })
        },
        getSales(data) {
            let sales = []
            data.forEach(item => { 
                sales.push(item.code)
                this.$emit('salesArea', sales)                
            })
        },
        selectChange(sales, stores) {
            // console.log(stores.value)
            this.$emit('store', stores) 
        },
        clear() {
            this.date = ''
            this.financeOrg = ''
            // this.$refs.area.reset()
        }
   },
   watch: {
       financeOrg(val) {
           this.$emit('financeOrg', val)
       },
       date(val) {
           this.$emit('date', val)
       }
   }
}
</script>
<style>

</style>