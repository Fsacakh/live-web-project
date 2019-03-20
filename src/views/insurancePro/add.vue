<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12">
                <b-card header="保险方案新增">
                    <irisCar ref="car" :disabled="isDetail" :flag="isShowFactory" :validateLen="3" :col="2" :star="true" @callBack="carBack" @validete="validateCar"></irisCar>
                    <hr>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="座位数" label-text-align="right" :label-cols="4">
                                <b-form-input v-model="info.seatCount" type="number" :readonly="isDetail"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="车辆均价" label-text-align="right" :label-cols="4">
                                <b-form-input v-model="info.averagePrice" type="number" :readonly="isDetail"/>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="车船税" label-text-align="right" :label-cols="4">
                                <b-form-input v-model="info.tax" type="number" :readonly="isDetail"/>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="启用/停用" label-text-align="right" :label-cols="4">
                                <b-form-select v-model="onOffFlag" :options="onOffFlagOptions" pull-left :disabled="isDetail"/>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="交强险保险公司 *" label-text-align="right" :label-cols="4">
                                <search ref="compulsoryInsurance" :disabled="isDetail" :hasCheck="checkInfo.compulsorySelectCode" :dataList="info.compulsoryInsurance" :option="'coName'" @itemValue="backFnInsurance" @comScroll="Insurance" @clickShowBack="Insurance" :showSearch="false"></search>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="交强险保费 *" label-text-align="right" :label-cols="4">
                                <b-form-input v-model="info.compulsoryPrice" :readonly="isDetail" @change="compulsoryChange" type="number" :state="null" placeholder="此项必填"/>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="商业险保险公司 *" label-text-align="right" :label-cols="4">
                                <search ref="commercialInsurance" :disabled="isDetail" :hasCheck="checkInfo.commercialSelectCode" :dataList="info.commercialInsurance" :option="'coName'" @itemValue="backFnInsurance" @comScroll="Insurance1" @clickShowBack="Insurance1" :showSearch="false"></search>
                            </b-form-fieldset>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="商业险保费 *" disabled label-text-align="right" :label-cols="4">
                                <b-form-input v-model="info.commercialPrice" readonly type="number" :state="null" placeholder="此项必填"/>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <b-form-fieldset horizontal label="保险总价 *" label-text-align="right" :label-cols="4">
                                <b-form-input type="number" v-model="totalPrice" readonly :state="null" placeholder="此项必填"/>
                            </b-form-fieldset>
                        </div>
                    </div>
                    <hr/>
                    <div class="row mt-4">
                        <div class="col-md-12 col-lg-12">
                            <h6>商业险方案</h6>
                            <div class="table-scrollable">
                                <b-table :fields="fields" :items="items" show-empty bordered>
                                    <template slot="index" slot-scope="data">
                                      {{data.index + 1}}
                                    </template>
                                    <template slot="name" slot-scope="data">
                                      {{data.item.insTypeName}}
                                    </template>
                                    <template slot="amountInForce" slot-scope="data">
                                      <b-form-input :value="'111'" v-model="data.item.amountInForce" :readonly="isDetail" @change="setPrice(data.item.amountInForce, data.index, 'amountInForce')" type="number"/>
                                    </template>
                                    <template slot="premium" slot-scope="data">
                                      <b-form-input @change="countTotalPrice(data.item.premium, data.index, 'premium')" :readonly="isDetail" v-model="data.item.premium" type="number"/>
                                    </template>
                                    <template slot="sdewPrice" slot-scope="data">
                                      <b-form-input v-model="data.item.sdewPrice" :readonly="isDetail" @change="setPrice(data.item.sdewPrice, data.index, 'sdewPrice')" type="number"/>
                                    </template>
                                    <template slot="empty">请选择商业险保险公司</template>
                                </b-table>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="!isDetail">
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

import search from '../../components/iris-search/search.vue'
import api from '../../common/api'
import config from '../../common/config'
import { Message } from 'element-ui'
import qs from 'querystring';
import url  from 'url';
import irisCar  from '../../components/iris-car/index.vue';

export default {
    data(){
        return {
            isDetail: false,
            factoryName:[],
            brandName:[],
            seriesName:[],
            modelName:[],
            displayName:[],
            currItem:{},
            insuranceFlag:true,
            info:{
                seatCount:0,
                averagePrice:'',
                tax:'',
                total:'',
                compulsoryInsurance:[],
                commercialInsurance:[],
                compulsoryPrice:0,
                commercialPrice:0
            },
            compulsorySelectCode:'',
            commercialSelectCode:'',
            editData:'',
            fields: [
              { key: 'index', label: '序号' },
              { key: 'insTypeName', label: '险种' },
              { key: 'amountInForce', label: '保额' },
              { key: 'premium', label: '保费' },
              { key: 'sdewPrice', label: '不计免赔' }
            ],
            items: [],
            priceArr:[],
            sdewPrice:[],
            sdewPricePrice:0,
            insCode:'',
            //车辆seq
            detailCarCode:'',
            onOffFlag:0,
            onOffFlagOptions:[{ value: 0, text: '启用' },{ value: 1, text: '停用' }],
            pageNums: config.pageNums,
            pageStart: 1,
            pageStartNum:1,
            compulsoryPageStart:0,
            commercialPageStart:0,
            isEdit:false,
            checkInfo:{
                factoryCode : false,
                brandCode : false,
                seriesCode : false,
                modelCode : false,
                carCode : false,
                compulsorySelectCode : false,
                commercialSelectCode : false
            },
            checkCar:false,
            isShowFactory:config.isShowFactory

        }
    },
    created(){
        var tar = url.parse(window.location.href).query,
            tmpObj = qs.parse(tar),
            $this = this;
            if ( tmpObj.isDetail ) {
                this.isDetail = true
            } else {

            }
        if(tmpObj.insCode){
            let options = {
                "insCode":tmpObj.insCode
            }

            $this.isEdit = true;
            api.insurancePro.queryInsuranceInfoVoByInsCode(options, function(res) {
                if (res.data.code === "success") {
                    $this.init(res.data.obj)
                }
            });
        }else {
            $this.isEdit = false;
            $this.init('');
        }
    },
    components: {
        search,
        irisCar
    },
    computed: {
        totalPrice:{
            set:function(){

            },
            get:function(){
                return Math.round((parseFloat(this.info.compulsoryPrice) + parseFloat(this.info.commercialPrice)).toFixed(2)*100) / 100;
            }
        }
    },
    watch:{
        //通过保险公司CODE 查询险种
        commercialSelectCode:function(newVal, oldVal){
            if(this.isEdit && oldVal == '')return;
            var $this = this;
            api.insurance.query({coCode:newVal}).then(function(res){
                if(res.data.code == 'success'){
                    var data = res.data.obj;
                    if(res.data.obj.length == 0)return;
                    $this.setTypeiInsurance(res.data.obj);
                }
            });
        }
    },
    methods:{
        validateCar(flag){
            this.checkCar = flag;
        },
        carBack(val){
            this.backFn(val);
        },
        init(data){
            var $this = this;
            if(!data){
                api.ordinalInfo.getSequenceList({serviceCode:config.insurancePro.serviceCode,getNums:2},function(res){
                    if(res.data.code == 'success'){
                        $this.insCode = res.data.obj[0];
                        $this.currItem.detailCarCode = res.data.obj[1];
                        $this.currItem.insCode = res.data.obj[0];
                    }
                })
            }else{
                $this.editData = data;
                //险种
                $this.items = data.insuranceVciInfoVo;
                for(var i = 0, len = $this.items.length; i < len; i++){
                    $this.items[i].amountInForce = parseFloat($this.items[i].amountInForce).toFixed(2);
                    $this.items[i].premium = parseFloat($this.items[i].premium).toFixed(2);
                    $this.items[i].sdewPrice = parseFloat($this.items[i].sdewPrice).toFixed(2);
                    $this.priceArr[i] = $this.items[i].premium;
                    $this.sdewPrice[i] = $this.items[i].sdewPrice;
                }
                Object.assign($this.info,{
                    //座位数
                    seatCount:data.seatCount,
                    //车辆平均价格
                    averagePrice:data.carPrice?parseFloat(data.carPrice).toFixed(2):'',
                    //税
                    tax:data.carTax?parseFloat(data.carTax).toFixed(2):'',
                    //总价格
                    total:parseFloat(data.totalPrice).toFixed(2),
                    //交强险选项
                    compulsoryInsurance:[],
                    //商业险选项
                    commercialInsurance:[],
                    //交强险价格
                    compulsoryPrice:parseFloat(data.tciPrice).toFixed(2),
                    //商业险价格
                    commercialPrice:parseFloat(data.vciPrice).toFixed(2)
                });
                //座位数
                $this.seatCount = data.seatCount;
                //保险方案code
                $this.insCode = data.insCode;
                //启用停用
                $this.onOffFlag = data.onOffFlag;
                //车辆信息
                Object.assign($this.currItem, data.insuranceCarInfoVo[0]);
                //商业险
                $this.$refs.commercialInsurance.setValue(data.vciCompanyName);
                this.commercialSelectCode = data.vciCompanyCode,
                //交强险
                $this.$refs.compulsoryInsurance.setValue(data.tciComapnyName);
                $this.compulsorySelectCode = data.tciComapnyCode;
            }
        },
        // 切换商业保险机构 价格重置
        resetPrice(){
            this.items.length = 0;
            this.priceArr.length = 0;
            this.sdewPrice.length = 0;
            this.info.commercialPrice = 0;
        },
        compulsoryChange(){
            this.totalPrice = parseFloat(this.info.compulsoryPrice) + parseFloat(this.info.commercialPrice);
        },
        setPrice(val, num, type){
            this.items[num][type] = val;
            if(type == 'sdewPrice'){
                this.sdewPrice[num] = val;
                this.sdewPricePrice = this.arrAddTotal(this.sdewPrice);
                this.info.commercialPrice = Math.round((this.arrAddTotal(this.priceArr) + this.sdewPricePrice).toFixed(2)*100) / 100;
            }
        },
        arrAddTotal(data, obj){
            var sum = 0;
            function getSum (item, index, array){
                item = item?item:0;
                sum += parseFloat(item);
            }
            for (var i = 0,len = data.length; i < len; i++){
                var sum = 0;
                data.map(getSum);
            }
            return sum;
        },
        countTotalPrice(val, num, type){
            this.priceArr[num] = val;
            this.info.commercialPrice = this.arrAddTotal(this.priceArr) + this.sdewPricePrice;
            this.items[num][type] = val;
        },
        //设置险种列表数据
       setTypeiInsurance(data){
            if(!data)return;
            this.resetPrice();
            var getNums = data.length;
            this.getSeqList({serviceCode:config.insurancePro.serviceCode, getNums:getNums}, data);
        },
       setItems(seqList, data){
            if(seqList.length == 0 || data.length == 0)return;
            for(var i=0, len = data.length; i<len; i++){
                Object.assign(data[i],{
                    amountInForce:0,
                    premium:0,
                    sdewPrice:0,
                    detailVciCode:seqList[i],
                    insCode:this.insCode
                });
                this.items.push(data[i]);
            }
       },
       //获取seqlist
       getSeqList(param, data){
            const $this = this;
            const myFirstPromise = new Promise((resolve, reject) => {
                api.ordinalInfo.getSequenceList(param,function(res){
                    if(res.data.code == 'success'){

                    }
                    resolve(res.data.obj,data);
                });
            });
            myFirstPromise.then(function(res){
                $this.setItems(res,data);
            });
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
       backFn(d){
            var k;
            var arr = ['factoryName', 'brandName', 'seriesName', 'modelName', 'displayName']
            for(var key in d){
                this.currItem[key] = d[key] == null?'':d[key];
            }
            arr.forEach((item, index) => {
                this.currItem[item] = ''
            })
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
                  code = this.currItem.factoryCode;
                  level = 2;
                  type = 0;
                  this.brandName.length = 0;
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
       scrollFn(val){
            this.$refs.oScroll.onScroll();
       },
       Insurance(flag) {
           if(!flag && flag != 'coName')return;
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
                        $this.info.compulsoryInsurance.push(res.data.obj.list[i]);
                    }
                }
            })
       },
       Insurance1(flag) {
           if(!flag && flag != 'coName')return;
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
                        $this.info.commercialInsurance.push(res.data.obj.list[i]);
                    }
                }
            })
       },
       backFnInsurance(item) {
            if(this.insuranceFlag){
                this.compulsorySelectCode = item.coCode;
            }else{
                this.commercialSelectCode = item.coCode;
            }
       },
       save(){
            var $this = this, isSubmit = true;
            var check = {
                factoryCode : $this.currItem.factoryCode,
                brandCode : $this.currItem.brandCode,
                compulsorySelectCode : $this.compulsorySelectCode,
                commercialSelectCode : $this.commercialSelectCode
            }
            this.$refs.car.validate();
            for(var i in check){
                if(!check[i]){
                    $this.checkInfo[i] = true;
                    if(!this.isShowFactory && (i == 'factoryCode' || i == 'brandCode') || (this.isShowFactory && i == 'brandCode')){
                        isSubmit = false;
                    }
                }else{
                    $this.checkInfo[i] = false;
                }
            }
            if(!isSubmit){
                Message({
                    message:config.messInfo.qaInfo,
                    type: 'warning'
                });
                return;
            }
            var params = {
                //车辆平均价格
                carPrice:this.info.averagePrice,
                //车船税
                carTax:this.info.tax,
                //座位数
                seatCount:this.info.seatCount,
                //保险方案编码
                insCode: this.insCode,
                //交强险公司编码
                tciComapnyCode:this.compulsorySelectCode,
                //交强险保费
                tciPrice:parseFloat(this.info.compulsoryPrice),
                //商业公司编码
                vciCompanyCode:this.commercialSelectCode,
                //商业险保费
                vciPrice:this.info.commercialPrice,
                //启用停用 启用、停用【0：启用、1：停用，默认：0】
                onOffFlag:this.onOffFlag,
                //车型信息
                insuranceCarInfoVo:[this.currItem],
                //保险方案商业险明细
                insuranceVciInfoVo:this.items,
                //扩展信息 非必填
                insuranceAddInfoVo:[]
            }
            function succCommon(res){
                if(res.data.code == 'success'){
                    Message({
                        message: config.messInfo.success,
                        type: 'success'
                    });
                    $this.$router.push({
                        path: `query`,
                        query:{form:'add'}
                    })

                }else{
                    Message.error(config.messInfo.fail);
                }
            }
            if($this.isEdit){
                //更新
                api.insurancePro.updateInsuranceInfoVo(params, function(res){
                    succCommon(res);
                });
            }else {
                //新增
                api.insurancePro.insertInsuranceInfo(params, function(res){
                    succCommon(res);
                });
            }
       }
    },
    updated(){
        if(!this.isEdit)return;
        this.$refs.car.setValue(this.editData.insuranceCarInfoVo[0]);
    }
}



</script>
