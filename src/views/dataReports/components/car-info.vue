<template lang="html">
    <div class="row">
		<slot name="rest"></slot>
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}" v-if="!flag">
            <b-form-fieldset horizontal :label="label[0]" :label-cols="4" class="text-right">
                <b-form-select :state="factoryState" v-model="carCurr.factoryCode" :options="factory" :disabled="disabled">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}">
            <b-form-fieldset horizontal :label="label[1]" :label-cols="4" class="text-right">
                <b-form-select :state="brandState" v-model="carCurr.brandCode" :options="brand"  :disabled="disabled">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}">
            <b-form-fieldset horizontal :label="label[2]" :label-cols="4" class="text-right">
                <b-form-select :state="seriesState" v-model="carCurr.seriesCode" :options="series"  :disabled="disabled">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div v-if="showModel" :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}">
            <b-form-fieldset horizontal :label="label[3]" :label-cols="4" class="text-right">
                <b-form-select :state="modelState" v-model="carCurr.modelCode" :options="model" :disabled="disabled">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div v-if="showCar" :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}">
            <b-form-fieldset horizontal :label="label[4]" :label-cols="4" class="text-right">
                <b-form-select :state="carState" v-model="carCurr.carCode" :options="car" :disabled="disabled">
                </b-form-select>
            </b-form-fieldset>
        </div>
    </div>
</template>
<script>
    import api from 'common/api'
	import config from 'common/config'
	import vm from "vue";
	export default {
        props: {
			flag: {
				type: Boolean,
				default: config.isShowFactory
			},
			showCar: {
				type: Boolean,
				default: true
			},
			showModel: {
				type: Boolean,
				default: true
			},
			col: {
				type: Number,
				default: '3'
			},
			initData:{},
			star:{
				type:Boolean,
				default:false
			},
			//大于0的整数
			validateLen:{
				type:Number,
				default:0
			},
			disabled: {
				type: Boolean,
				default: false
			},
			selectData: {
				type: Function,
				default: function() {}
			},
			storeCode: {
				type: String,
				default: ''
			}
        },
		data(){
			return {
				factory:[],
				brand:[],
				series:[],
				model:[],
				car:[],
				carCurr:{
					factoryCode:'',
					brandCode:'',
					seriesCode:'',
					modelCode:'',
					carCode:'',
				},
				factoryState:null,
				brandState:null,
				seriesState:null,
				modelState:null,
				carState:null,
				mapArr:['factory', 'brand', 'series', 'model', 'car'],
				label:['厂家','品牌','车系','车型','车款']
			}
		},
		created(){
			if(this.star && !this.flag){
				this.label = ['厂家 *','品牌 *','车系 *','车型 *','车款 *'];
			} else if (this.star && this.flag) {
                this.label = ['厂家 *','品牌 *','车系','车型','车款'];
			}
			//false 从厂家开始，true从品牌开始
			// var flag = this.flag;

			// update by lwx
			// flag 为true从厂家开始 false从品牌开始
			this.once()
			// if(this.flag) {
			// 	this.getData('', 1, 0, 'factory');
			// }else{
			// 	this.getData('', 2, 0, 'brand');
			// }

		},
		computed:{
			_factoryCode:function(){
				return this.carCurr.factoryCode;
			},
			_brandCode:function(){
				return this.carCurr.brandCode;
			},
			_seriesCode:function(){
				return this.carCurr.seriesCode;
			},
			_modelCode:function(){
				return this.carCurr.modelCode;
			},
			_carCode:function(){
				return this.carCurr.carCode;
			}

		},
		methods:{
			setValue(data){
				var num = this.flag?1:0, len,i;
				//console.info(1111);
				for(var i = num, len = this.mapArr.length; i < len; i++){
				//console.info(22222);
					this.carCurr[this.mapArr[i]+'Code'] = data[this.mapArr[i]+'Code'];
					//console.info(data[this.mapArr[i]+'Code']);

				}
				//console.info(this.carCurr);
			},
			clearquery() {
				this.carCurr = {
					factoryCode: '',
					brandCode: '',
					seriesCode: '',
					modelCode: '',
					carCode: ''
				}
				this.factory = []
				this.brand = []
				this.series = []
				this.model = []
				this.car = []
				this.once()
			},
			// 增加重置功能 by lwx
			clear() {
				this.carCurr = {
					factoryCode: '',
					brandCode: '',
					seriesCode: '',
					modelCode: '',
					carCode: ''
				}
				this.factory = []
				this.brand = []
				this.series = []
				this.model = []
				this.car = []
				this.$emit('twoclick')
				this.$emit('callBack',this.carCurr);				
			},

			setValue(data){
				//console.info(22);
				var i = this.flag?0:1, len;
				for(i, len = this.mapArr.length; i < len; i++){
					this.carCurr[this.mapArr[i]+'Code'] = data[this.mapArr[i]+'Code'];
					//console.info(data[this.mapArr[i]+'Code'])
				}
			},
			validate(){
				var flag = true;
				var num = this.flag?1:0, i, len;
				for(i = num, len = this.mapArr.length-this.validateLen; i < len; i++){
					if(!this.carCurr[this.mapArr[i]+'Code']){
						this[this.mapArr[i]+'State'] = false;
						flag = false;
					}else{
						this[this.mapArr[i]+'State'] = null;
					}
				}
				this.$emit('validete',flag);
			},

			once: function() {
				if(!this.flag) {
					this.getData('', 1, 0, 'factory');
				}else{
					this.getData('', 2, 0, 'brand');
				}
			},

			//获取车节点数据
			getData(code, level, type, name){
			    var $this = this, code = code || '';
			    api.car.queryCarInfoByCarSearch({
					storeCode: $this.storeCode,
			        code:code,
			        level:level,
			        type:type,
			        //厂家编码
			        carFactoryCode:$this.carCurr.factoryCode,
			        // 品牌编码
			        carBrandCode:$this.carCurr.brandCode,
			         // 车系编码
			        carSeriesCode:$this.carCurr.seriesCode,
			         // 车型编码
			        carModelCode:$this.carCurr.modelCode
			    },function(res){
			    	if(res.data.code == 'success'){
						$this[name] = [];
			    		if(!res.data.obj)return;
			    		$this.setOptions($this[name], res.data.obj, name);


			    	}
			    })
			},
			//给选项添加数据
			setOptions(obj, data, nav){
				if(data.length == 0 && typeof data != 'object') return;
				for(var i = 0, len = data.length; i < len; i++){
					if(nav == 'car'){
						obj.push({text:data[i]['displayName'], value:data[i][nav+'Code']})
					}else{
						obj.push({text:data[i][nav+'Name'], value:data[i][nav+'Code']})
					}
				}
			},
			selectBack(type, val){
				if(!type || !val)return;
				this.getData(val, 2, 0, 'brand');
			},
			resetSelectData(str){
				// console.info(str);				
				var num = this.mapArr.indexOf(str);
				if(this[str].length == 0)return;
				for(var i = num, len = this.mapArr.length; i < len; i++){
					this.carCurr[this.mapArr[i]+'Code'] = null;
					//this[str] = [];
				}
            }
        },
        watch:{
			//监听门店是否并初始化数据
			storeCode(val, oldVal){
				this.once();
			},
			//监听厂家获取品牌
			_factoryCode(val){
				//this.resetSelectData('brand');
				this.$emit('callBack',this.carCurr);
				this.selectData(this.factoryState)
				this.getData(val, 2, 0, 'brand');
			},
			//监听品牌获取车系
			_brandCode(val){
				//console.info(val);
				this.resetSelectData('series');
				this.$emit('callBack',this.carCurr);
				this.getData(val, 4, 1, 'series');
			},
			//监听车系获取车型
			_seriesCode(val){
				this.resetSelectData('model');
				this.$emit('callBack',this.carCurr);
				this.getData(val, 8, 2, 'model');
			},
			//监听车型获取车款
			_modelCode(val){
				this.resetSelectData('car');
				this.$emit('callBack',this.carCurr);
				this.getData(val, 64, 3, 'car');
			},
			_carCode(val){
				this.$emit('callBack',this.carCurr);
			}
		}

    }
</script>
