<template> 
<div class="row">
    <div class="col-md-12">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="产品编码" :label-cols="4" class="text-right">
                        <b-form-input v-model="queryParams.financeCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="产品名称" :label-cols="4" class="text-right">
                        <b-form-input v-model="queryParams.financeName"/>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="产品类型" :label-cols="4" class="text-right">
                        <b-form-select v-model="queryParams.financeType" :options="proTypeList">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="产品状态" :label-cols="4" class="text-right">
                        <b-form-select v-model="queryParams.onOffFlag" :options="status">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <cascade 
                     ref="model"
                     @financeOrg="getFinanceOrg" 
                     @salesArea="getSalesCode"
                     @store="getStoreCode"
                     @date="getDate">
            </cascade>
            <search-btn @reset="reset" @query="query"></search-btn>
        </b-card>
    </div>
 </div>
</template> 
<script>

import Vue from 'vue'
import SearchBtn from 'components/searchBtn/searchBtn'
import Cascade from './cascade'
import config from 'common/config'
import Api from 'common/api'
import { mapActions } from 'vuex'
import { DatePicker } from  'element-ui'
Vue.use(DatePicker)
import {getType, format} from 'common/com-api'

export default {
   components: {
       SearchBtn,
       Cascade
   },
   created() { 
    getType(config.financeProType.proCode, (items) => {
        items.forEach((item) => {
            if(item.refDetailFatherCode === '0') {
                let data = {
                    text: item.refDetailName,
                    value: item.refDetailCode
                }
                this.proTypeList.push(data)   
            }
        })
    })
   },
   data() {
     return {
        queryParams: {
            financeCode: '',
            financeName: '',
            financeType: '',
            onOffFlag: '',
            effectStarttime: '',
            effectEndtime: '',
            financeOrgCode: '',
            saleCodes: [],
            storeCodes: [],
            pageStart: 1,
            pageNums: config.pageNums
        },
        status: [{
            value: '0',
            text: '上架'
            },
            {
            value: '1',
            text: '下架'
            }
        ],
        proTypeList: []
     }
   },
   methods: {
       reset() {
        //   this.queryParams = {}
          this.$refs.model.clear()

          this.queryParams.financeCode = ''
          this.queryParams.financeName = ''
          this.queryParams.financeType = ''
          this.queryParams.onOffFlag = ''
       },
       query() {
          let params = this.queryParams;
          params.pageStart = 1
          params.pageNums = config.pageNums
          this.$emit('query', params)
          this.getObj(params)
       },
       getFinanceOrg(data) {
           this.queryParams.financeOrgCode = data;
       },
       getSalesCode(data) {
          this.queryParams.saleCodes = data;   
       },
       getStoreCode(data) { 
        //    if(data === 0) {
        //        this.queryParams.storeCodes = []
        //    }else if(data){
        //        this.queryParams.storeCodes = []; 
        //        this.queryParams.storeCodes.push(data);
        //    }

           if(Array.isArray(data) === true) {
                this.queryParams.storeCodes = []
                data.forEach(item => {
                this.queryParams.storeCodes.push(item.value)
                })
            }
            
            if(data.value === 0) {
                this.queryParams.storeCodes = []
            }else if(data.hasOwnProperty('value')) {
                this.queryParams.storeCodes = []
                this.queryParams.storeCodes[0] = data.value
            }
       },
       getDate(datelist) {
           this.queryParams.effectStarttime = format(datelist[0])
           this.queryParams.effectEndtime = format(datelist[1])                      
       },
       ...mapActions({
            getObj: 'financePro/getObj'                        
       })
   }
} 
</script>  
<style>
.el-date-editor.el-input {
  width: 100% !important;
}
</style>  