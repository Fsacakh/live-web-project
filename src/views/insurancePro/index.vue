<template>
    <div class="animated fadeIn">
        <b-card header="保险方案">
            <div class="row">
                <div class="col-md-6 col-lg-6" v-show="!isShowFactory">
                    <b-form-fieldset horizontal label="厂家" label-text-align="right" :label-cols="4">
                        <search ref="factoryName" :dataList="factoryName" :option="'factoryName'" @itemValue="backFn" @clearValue="clearValue" @clickShowBack="clickShowBack"></search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="品牌" label-text-align="right" :label-cols="4">
                       <search ref="brandName" @clearValue="clearValue" :dataList="brandName" :option="'brandName'" @itemValue="backFn" @clickShowBack="clickShowBack"></search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="车系" label-text-align="right" :label-cols="4">
                       <search ref="seriesName" @clearValue="clearValue" :dataList="seriesName" :option="'seriesName'" @itemValue="backFn" @clickShowBack="clickShowBack"></search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="车型" label-text-align="right" :label-cols="4">
                        <search ref="modelName" @clearValue="clearValue" :dataList="modelName" :option="'modelName'" @itemValue="backFn" @clickShowBack="clickShowBack"></search>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="商业险保险公司" label-text-align="right" :label-cols="4">
                        <search ref="commercialInsurance" :dataList="commercialInsurance" :option="'coName'" @itemValue="backFnInsurance" :showSearch="false" @comScroll="commercialInsuranceInsurance" @clickShowBack="commercialInsuranceInsurance"></search>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="交强险保险公司" label-text-align="right" :label-cols="4">
                        <search ref="compulsoryInsurance" :dataList="compulsoryInsurance" :option="'coName'" @itemValue="backFnInsurance" :showSearch="false" @comScroll="Insurance" @clickShowBack="Insurance"></search>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="适用范围"  label-text-align="right" :label-cols="4">
                        <areaShop @select-change="areaShop" :storeAll="true"></areaShop>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm" variant="secondary" @click="reset()">重置</b-button>
                        <b-button size="sm" variant="primary" @click="query(true)">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-4">
            <div class="row mb-2">
                <div class="col-md-12">
                    <div class="pull-left">
                        <b-button size="sm" variant="success" @click="add">新增</b-button>
                        <b-button size="sm" variant="primary" @click="edit">编辑</b-button>
                        <v-upload
                            :disabled= "false"
                            :addParams="addParams"
                            :buttonName='buttonName'
                            :analysisExcel="analysisExcel"
                            :url="analysisUrl"
                            :showBack="showBack"
                            >
                        </v-upload>
                        <b-button size="sm" variant="" @click="downLoad">保险热销方案下载</b-button>
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="list" :fields="fields">
                    <template slot="sel" slot-scope="data">
                        <input type="radio" name="models" v-model="radioselected" :value="data.item.insCode">
                    </template>
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pageNo - 1)* pageSize + 1 }}
                    </template>
                    <template slot="insCode" slot-scope="data">
                        <router-link :to="{ name: 'insuranceproAdd', query: { insCode: data.item.insCode, isDetail: true }}">{{ data.item.insCode }}</router-link>
                    </template>
                    <template slot="typeOfCompany" slot-scope="data">
                        {{ data.item.coTypeName }}
                    </template>
                    <template slot="tciPrice" slot-scope="data">
                        {{data.item.tciPrice | toFixed(2)}}
                    </template>
                    <template slot="vciPrice" slot-scope="data">
                        {{data.item.vciPrice | toFixed(2)}}
                    </template>
                    <template slot="onOffFlag" slot-scope="data">
                        <span v-if="data.item.onOffFlag === '0'">启用</span>
                        <span v-else>停用</span>
                    </template>
                    <template slot="empty">
                        暂无数据...
                    </template>
                </b-table>
            </div>
            <div class="row mt-2">
                <div class="col-md-12">
                    <pagination class="pull-right" @page-change="pageChange" :page-no="pageNo" :page-size="pageSize" :total-result="totalResult" :total-pages="totalPages">
                    </pagination>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import Vue from 'vue'
import config from '../../common/config'
import api from '../../common/api'
import areaShop from '../../components/iris-areaqueryshop'
import search from '../../components/iris-search/search.vue'
import VUpload from 'components/iris-upload'

Vue.filter('toFixed', function(value, num) {
    var val = parseFloat(value)
    return val.toFixed(num);
})

import pagination from '../../components/pagination/pagination'
import { Message } from 'element-ui'
import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
} from 'vuex'

export default {
    name: 'insurance',
    components: {
        areaShop,
        search,
        Message,
        VUpload,
        pagination
    },
    data() {
        return {
            buttonName: '导入',
            addParams: {
                relationCode: "",
                singleFlag: '1',
                businessType: ''
            },
            analysisUrl: config.insurancePro.analysisUrl,
            //showBack: {},
            insCode:'',
            //交强险保险公司
            compulsoryInsurance:[],
            compulsoryInsuranceCode:'',
            //商业险保险公司
            commercialInsurance:[],
            commercialInsuranceCode:'',
            //保险公司类型 默认 交强险
            insuranceFlag:true,
            factoryName:[],
            brandName:[],
            seriesName:[],
            modelName:[],
            displayName:[],
            currItem:{},
            radioselected:'',
            area:'',
            store:'',
            fields: {
                sel: {
                    label: '选择'
                },
                index: {
                    label: '序号'
                },
                insCode: {
                    label: '编码'
                },
                factoryName: {
                    label: '厂家'
                },

                brandName: {
                    label: '品牌'
                },

                seriesName: {
                    label: '车系'
                },
                modelName: {
                    label: '车型'
                },
                displayName: {
                    label: '车款'
                },

                tciComapnyCodeName: {
                    label: '交强险公司'
                },
                vciCompanyCodeName: {
                    label: '商业险公司'
                },
                tciPrice: {
                    label: '交强险保费'
                },
                vciPrice: {
                    label: '商业险保费'
                },
                onOffFlag:{
                    label: '状态'
                }
            },
            list:[],
            pageNo: 1,
            pageSize: 1,
            totalResult: 0,
            totalPages: 0,
            pageNums:config.pageNums,
            pageStart:1,
            pageStartNum:1,
            compulsoryPageStart:0,
            commercialPageStart:0,
            isShowFactory:config.isShowFactory

        }
    },
    computed:{
        showBack:function(){
            return this.store.length == 1 ? { storeCode: this.store[0].value } : { storeCode: '' };
        }
    },
    mounted(){
        if(this.$route.query.form == 'add'){
            this.query(true);
        }
    },
    methods: {
        //保险热销方案导出
        downLoad: function() {
            api.financePro.downLoad({ relationCode: 'TemplateInsuranceInfo' }, res => {
                if(res.data.code == 'success') {
                    window.location.href = res.data.obj[0].fileRelativePath
                }
            })
        },
        //解析数据
        analysisExcel: function(res) {
            Message({
                type: "success",
                message: "导入成功"
            });
        },
        clearValue(){
            this.reset();
        },
        areaShop(area, store){
            this.area = area;
            if(!Array.isArray( store )){
                store = [store];
            }
            this.store = store;
        },
        backFnInsurance(item){
            if(this.insuranceFlag){
                this.compulsoryInsuranceCode = item.coCode;
            }else{
                this.commercialInsuranceCode = item.coCode;
            }
        },
       getData(code, level, type, sub){
            var $this = this, code = code || '';
            //获得联动数据
            api.car.queryCarInfoByCarSearch({
                code:code,
                level:level,
                type:type
            },function(res){
                $this.curValue(res.data.obj, sub);
            })
       },
       curValue(d, sub){
            if(sub && d){
                this[sub].length = 0;
                for(var i = 0, len = d.length; i< len; i++){
                    this[sub].push(d[i])
                }

            }
       },
       clickShowBack(sub){
            var code, level = 1, type;
            switch (sub){
                //厂家
                case 'factoryName':
                  code = '';
                  level = 1;
                  type = 0;
                  break;
                //品牌
                case 'brandName':
                if(!this.isShowFactory){
                  code = this.currItem.factoryCode;
                  level = 2;
                  type = 0;
                  this.brandName.length = 0;
                }else{
                  code = '';
                  level = 2;
                  type = 0;
                  this.brandName.length = 0;
                }

                  break;
                //车系
                case 'seriesName':
                  code = this.currItem.brandCode;
                  level = 4;
                  type = 1;
                  break;
                //车型
                case 'modelName':
                  code = this.currItem.seriesCode;
                  level = 8;
                  type = 2;
                  break;
                //车款
                case 'displayName':
                  code = this.currItem.modelCode;
                  level = 64;
                  type = 3;
                  break;
            }

            if(!code && code!=''){
                console.info('请选择');
                return;
            }
            this.getData(code, level, type, sub);
       },
       backFn(d){
            for(var key in d){
                if(d[key]){
                    this.currItem[key] = d[key];
                }
            }
       },
        Insurance() {
            var $this = this;
            this.insuranceFlag = true;
            if($this.pageStart > $this.compulsoryPageStart && $this.compulsoryPageStart !=0)return;
            //获取交强险保险公司数据
            api.insurancePro.queryCompanyInfoByCodesAndPagination({pageNums:$this.pageNums,
                    pageStart:this.pageStart,onOffFlag:'0'},function(res){
                    if(res.data.code == 'success'){
                        $this.pageStart ++;
                        $this.compulsoryPageStart = res.data.obj.pages;
                        for(var i = 0, len = res.data.obj.list.length; i<len; i++){
                            $this.compulsoryInsurance.push(res.data.obj.list[i]);
                        }
                    }
            })
        },
        commercialInsuranceInsurance() {
            var $this = this;
            this.insuranceFlag = false;
            if($this.pageStartNum > $this.commercialPageStart && $this.commercialPageStart !=0)return;
            //获取交强险保险公司数据
            api.insurancePro.queryCompanyInfoByCodesAndPagination({pageNums:$this.pageNums,
                    pageStart:this.pageStartNum,onOffFlag:'0'},function(res){
                    if(res.data.code == 'success'){
                        $this.pageStartNum ++;
                        $this.commercialPageStart = res.data.obj.pages;
                        for(var i = 0, len = res.data.obj.list.length; i<len; i++){
                            $this.commercialInsurance.push(res.data.obj.list[i]);
                        }
                    }
            })
        },
        query(flag) {
            var salesAreaCodes = [], storeCodes = [];
            salesAreaCodes.length = 0;
            storeCodes.length = 0;
            for(var i = 0, len = this.store.length; i<len; i++){
                if(this.store[i].value){
                    storeCodes.push(this.store[i].value);
                }
            }
            for(var i = 0, len = this.area.length; i<len; i++){
                salesAreaCodes.push(this.area[i].code);
            }
            const _this = this
            let options = {
                "chinaAreaCodes":[],
                "insCode":this.insCode,
                "insuranceCarInfoVo":[
                    {
                        "brandCode":this.currItem.brandCode,
                        "factoryCode":this.currItem.factoryCode,
                        "modelCode":this.currItem.modelCode,
                        "seriesCode":this.currItem.seriesCode
                    }
                ],
                "onOffFlag":"",
                "pageNums":this.pageNums,
                "pageStart":flag?1:this.pageStart,
                "salesAreaCodes":salesAreaCodes,
                "storeCodes":storeCodes,
                "tciComapnyCode":this.compulsoryInsuranceCode,
                "vciCompanyCode":this.commercialInsuranceCode
            }
            api.insurancePro.queryInsuranceInfoVos(options, function(res) {
                if (res.data.code === "success") {
                    _this.list = res.data.obj.list;

                    _this.pageNo = res.data.obj.pageNum
                    _this.totalPages = res.data.obj.pages
                    _this.pageSize = res.data.obj.pageSize
                    _this.totalResult = res.data.obj.total

                }
            })
        },
        pageChange(page) {
            this.pageStart = page;
            this.query(false);
        },
        add() {
            this.$router.push({
                path: `add`
            })
        },
        edit(){
            if(!this.radioselected){
                Message({
                    message: config.messInfo.selectOneRow,
                    type: 'info'
                });
                return;
            }
            this.$router.push({
                path: `add?insCode=`+this.radioselected

            })
        },
        reset(){
            //重置
            var $this = this;
            var nameArr = ['factory', 'brand', 'series', 'model'];
            for(var i = 0, len = nameArr.length; i < len; i++){
                $this.$refs[nameArr[i]+'Name'].setValue('');

            }
            $this.currItem = [];
            $this.$refs.commercialInsurance.setValue('');
            $this.$refs.compulsoryInsurance.setValue('');

            $this.compulsoryInsuranceCode = '';
            $this.commercialInsuranceCode = '';
        }
    }
}
</script>

