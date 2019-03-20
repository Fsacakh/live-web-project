<template>

		<div class="row">
		    <div class="col-md-4" v-show="!isShowFactory">
		        <b-form-fieldset horizontal label="厂家 *" :label-cols="4" class="text-right">
		            <b-form-select :state="factoryState" v-model="carCurr.factoryCode" :options="factory" :disabled="disabled">
		            </b-form-select>
		        </b-form-fieldset>
		    </div>
		    <div class="col-md-4">
		        <b-form-fieldset horizontal label="品牌 *" :label-cols="4" class="text-right">
		            <b-form-select :state="brandState" v-model="carCurr.brandCode" :options="brand" :disabled="disabled">
		            </b-form-select>
		        </b-form-fieldset>
		    </div>
		    <div class="col-md-4">
		        <b-form-fieldset horizontal label="车系 *" :label-cols="4" class="text-right">
		            <b-form-select :state="seriesState" v-model="carCurr.seriesCode" :options="series" :disabled="disabled">
		            </b-form-select>
		        </b-form-fieldset>
		    </div>
		    <div class="col-md-4">
		        <b-form-fieldset horizontal label="车型 *" :label-cols="4" class="text-right">
		            <b-form-select :state="modelState" v-model="carCurr.modelCode" :options="model" :disabled="disabled">
		            </b-form-select>
		        </b-form-fieldset>
		    </div>
		    <div class="col-md-4">
		        <b-form-fieldset horizontal label="车款 *" :label-cols="4" class="text-right">
		            <b-form-select :state="carState" v-model="carCurr.carCode" :options="car" :disabled="disabled"  >
		            </b-form-select>
		        </b-form-fieldset>
		    </div>
		</div>


</template>
<script>
	import api from '../../common/api'
	import config from '../../common/config'
	export default {
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
				isShowFactory:config.isShowFactory,

			}
		},
		created(){
			//false 从厂家开始，true从品牌开始
			if(this.isShowFactory){
				//获取品牌
				this.getData('', 2, 0, 'brand','');
			}else{
				//获取厂家
				this.getData('', 1, 0, 'factory');
			}

		},

		props: {
      initData:{},
      disabled: Boolean
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
				var num = this.isShowFactory?1:0, len,i;
				for(i = num, len = this.mapArr.length; i < len; i++){
					this.carCurr[this.mapArr[i]+'Code'] = data[this.mapArr[i]+'Code'];
				}
			},
			validate(){
				var flag = true;
				var num = this.isShowFactory?1:0, i, len;
				for(i = num, len = this.mapArr.length; i < len; i++){
					if(!this.carCurr[this.mapArr[i]+'Code']){
						this[this.mapArr[i]+'State'] = false;
						flag = false;
					}else{
						this[this.mapArr[i]+'State'] = null;
					}
				}
				this.$emit('validete',flag);
			},
			//获取车节点数据
			getData(code, level, type, name){
			    var $this = this, code = code || '';
			    //if(code == '' && name != 'factory')return;
			    api.car.queryCarInfoByCarSearch({
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
				//obj = [];
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
				var num = this.mapArr.indexOf(str);
				for(var i = num, len = this.mapArr.length; i < len; i++){
					this.carCurr[this.mapArr[i]+'Code'] = null;
					this[this.mapArr[i]] = [];
				}
			}

		},
		watch:{
			//监听厂家获取品牌
			_factoryCode(val){
				this.resetSelectData('brand');
				this.$emit('callBack',this.carCurr);
				this.getData(val, 2, 0, 'brand');
			},
			//监听品牌获取车系
			_brandCode(val){
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
			//监听车型获取车款
			_carCode(val){
				this.$emit('callBack',this.carCurr);
				//this.getData(val, 64, 3, 'car');
			}
		}


	}


</script>
