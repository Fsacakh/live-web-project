<template lang="html">
    <div class="row">
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}" v-if="!flag">
            <b-form-fieldset horizontal label="厂家" :label-cols="4" class="text-right">
                <b-form-select v-model="carCurr.factoryCode" :options="factory" @input="factoryCodesChange" :disabled="setDisabled">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}">
            <b-form-fieldset horizontal label="品牌" :label-cols="4" class="text-right">
                <b-form-select v-model="carCurr.brandCode" :options="brand" @input="brandCodesChange" :disabled="setDisabled">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}">
            <b-form-fieldset horizontal label="车系" :label-cols="4" class="text-right">
                <b-form-select v-model="carCurr.seriesCode" :options="series" @input="seriesCodesChange" :disabled="setDisabled">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}">
            <b-form-fieldset horizontal label="车型" :label-cols="4" class="text-right">
                <b-form-select v-model="carCurr.modelCode" :options="model" @input="modelCodesChange" :disabled="setDisabled">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}">
            <b-form-fieldset horizontal label="车款" :label-cols="4" class="text-right">
                <b-form-select v-model="carCurr.carCode" :options="car" :disabled="setDisabled">
                </b-form-select>
            </b-form-fieldset>
        </div>
    </div>
</template>
<script>
    import api from '../../common/api'
	import config from '../../common/config'
	import vm from "vue";
	export default {
        props: {
			flag: {
				type: Boolean,
				default: config.isShowFactory
			},
			col: {
				type: Number,
				default: '3'
			},
			initData: {
				type: Object,
				default: function() {
					return {
					}
				}
			},
			star: {
				type: Boolean,
				default: false
			}
        },
		data(){
			return {
				factory: [],
				brand: [],
				series: [],
				model: [],
				car: [],
				carCurr:{
					factoryCode: '',
					brandCode: '',
					seriesCode: '',
					modelCode: '',
					carCode: ''
				},
				mapArr:['factory', 'brand', 'series', 'model', 'car'],
				setDisabled: false,
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
			//false 从厂家开始，true从品牌开始
			if(this.star){				
				this.label = ['厂家 *','品牌 *','车系 *','车型 *','车款 *'];
			}
            //flag 为true从厂家开始 false从品牌开始
			if(!this.flag) {
				this.getFactoryCodes()
			}else{
				this.getBrandCodes()
			}
		},
		methods:{
			setReadonly() {
				const _this = this
				_this.setDisabled = true
			},
			setValue(data){
				var num = this.flag ? 1: 0;
				for(var i = num, len = this.mapArr.length; i < len; i++){
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
			// 增加重置功能 by lwx
			clear() {
				this.carCurr = {
					factoryCode: '',
					brandCode: '',
					seriesCode: '',
					modelCode: '',
					carCode: ''
				}
				this.$emit('callBack', this.carCurr);
			},
			getFactoryCodes: function() {
				let _this = this
			    api.car.queryCarInfoByCarSearch({
			        code: '',
			        level: 1,
			        type: config.car.none
			    },function(res){
			    	if(res.data.code == 'success'){
						_this.factory = []
						res.data.obj.forEach((item) => {
                           _this.factory.push({
							   text: item.factoryName,
							   value: item.factoryCode
						   })
						})
			    	}
			    })
			},
			getBrandCodes: function() {
				let _this = this
				api.car.queryCarInfoByCarSearch({
			        code: _this.carCurr.factoryCode,
			        level: 2,
			        type: config.car.factoryRefCode,
			        //厂家编码
			        carFactoryCode:_this.carCurr.factoryCode
			    },function(res){
			    	if(res.data.code == 'success'){
						_this.brand = []
						res.data.obj.forEach((item) => {
                           _this.brand.push({
							   text: item.brandName,
							   value: item.brandCode
						   })
						})
			    	}
			    })
			},
			getSeriesCodes: function() {
				let _this = this
				api.car.queryCarInfoByCarSearch({
			        code: _this.carCurr.brandCode,
			        level: 4,
			        type: config.car.brandRefCode,
			        //厂家编码
			        carFactoryCode:_this.carCurr.factoryCode,
			        // 品牌编码
			        carBrandCode:_this.carCurr.brandCode
			    },function(res){
			    	if(res.data.code == 'success'){
						_this.series = []
						res.data.obj.forEach((item) => {
                           _this.series.push({
							   text: item.seriesName,
							   value: item.seriesCode
						   })
						})
			    	}
			    })
			},
			getModelCodes: function() {
				let _this = this
				api.car.queryCarInfoByCarSearch({
			        code: _this.carCurr.seriesCode,
			        level: 8,
			        type: config.car.seriesRefCode,
			        //厂家编码
			        carFactoryCode:_this.carCurr.factoryCode,
			        // 品牌编码
			        carBrandCode:_this.carCurr.brandCode,
			         // 车系编码
			        carSeriesCode:_this.carCurr.seriesCode
			    },function(res){
			    	if(res.data.code == 'success'){
						_this.model = []
						res.data.obj.forEach((item) => {
                           _this.model.push({
							   text: item.modelName,
							   value: item.modelCode
						   })
						})
			    	}
			    })
			},
			getCarCodes: function() {
				let _this = this
                api.car.queryCarInfoByCarSearch({
			        code: _this.carCurr.modelCode,
			        level: 64,
			        type: config.car.modelRefCode,
			        //厂家编码
			        carFactoryCode: _this.carCurr.factoryCode,
			        // 品牌编码
			        carBrandCode: _this.carCurr.brandCode,
			         // 车系编码
			        carSeriesCode: _this.carCurr.seriesCode,
			         // 车型编码
			        carModelCode: _this.carCurr.modelCode
			    },function(res){
			    	if(res.data.code == 'success'){
						_this.car = []
						res.data.obj.forEach((item) => {
                           _this.car.push({
							   text: item.displayName,
							   value: item.carCode
						   })
						})
			    	}
			    })
			},
			selectBack(type, val){
				if(!type || !val)return;
				this.getData(val, 2, 0, 'brand');
			},
			resetSelectData(str){
				var num = this.mapArr.indexOf(str);
				for(var i = num, len = this.mapArr.length; i < len; i++){
					this.carCurr[this.mapArr[i]+'Code'] = null;
				}
            },
            factoryCodesChange: function() {
                let _this = this
				this.getBrandCodes()
			},
			brandCodesChange: function() {
                let _this = this
				this.getSeriesCodes()
			},
			seriesCodesChange: function() {
                let _this = this
				this.getModelCodes()
			},
			modelCodesChange: function() {
                let _this = this
				this.getCarCodes()
			}
        },
		watch: {
			initData: {
				handler(val) {
                    let _this = this
					_this.$data.carCurr = _this.initData
				},
				deep: true
			},
			carCurr: {
				handler(val) {
                    let _this = this
					this.$emit('callBack',this.carCurr);
				},
				deep: true
			}
		}
    }
</script>
<style lang="scss" scoped>

</style>
