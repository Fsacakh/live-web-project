<template>
	<div>
		<b-card>
			<div class="row">
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="所属门店:" :label-cols="4" horizontal class="text-right">
						<areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="SKU号:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="queryArchivesParams.skuCode"/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="车架号:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="queryArchivesParams.carVinNo"/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="生产号:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="queryArchivesParams.productionCode"/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="是否已预装" :label-cols="4" horizontal class="text-right">
						<b-form-select :options="preinstalled" v-model="queryArchivesParams.isPreinstalled"></b-form-select>
					</b-form-fieldset>
				</div>
			</div>
			<!-- 厂家、品牌、车系、车型选择组件 isShowFactory 类型:Boole 用于标识组件是否从厂家开始选择 -->
			<iris-car ref="carInfo" :col="3" :flag="isShowFactory" @callBack="backSkuCar"></iris-car>
			<div class="row">
				<div class="col-lg-12 col-md-12">
					<div class="pull-right">
						<b-button size="sm" variant="default" @click="reset">重置</b-button>
						<b-button size="sm" variant="primary" @click="queryPreinstalledCarList">查询</b-button>
					</div>
				</div>
			</div>
		</b-card>
		<b-card>
			<div class="row">
				<div class="col-lg-12 col-md-12">
					<div class="pull-left">
						<b-button size="sm" variant="default" @click="gotoEdit">编辑预装车</b-button>
					</div>
				</div>
			</div>
			<!--表格主体-->
			<div class="table-scrollable">
				<b-table striped hover bordered show-empty empty-text="暂无数据" class="mt-3" :items="carTableData" :fields="carTableFields">
					<template slot="check" slot-scope="data">
						<input type="radio" :ref="'carTableRadio' + data.index" v-model="carTableRadioData" :value="data.item">
					</template>
					<template slot="isPreinstalled" slot-scope="data">
						{{data.item.isPreinstalled | filterPreinstalled}}
					</template>
					<template slot="skuCode" slot-scope="data">
						 <router-link :to="{path:'/preloadedCar/detail',query: {skuCode: data.item.skuCode}}">{{data.item.skuCode}}</router-link>
					</template>
					<template slot="MSRPCode" slot-scope="data">
						<!-- data.item.preinstalledTotalPrice -->
						{{ filtersMsrp(data.item.actualMSRPInclusiveTaxValue, 0) }}
					</template>
				</b-table>
			</div>
		</b-card>
		<div class="row">
			<div class="col-md-12">
				<pagination class="pull-right"
					@page-change="pageChange"
					:page-no="pager.pageNo"
					:page-size="pager.pageSize"
					:total-result="pager.total"
					:total-pages="pager.totalPages">
                </pagination>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import { Message, MessageBox, Radio } from 'element-ui';
//common
import api from "common/api";
import config from "common/config";
//components
import IrisCar from 'components/iris-car/';
import areaqueryshop from "components/iris-areaqueryshop";
import Pagination from 'components/pagination/pagination';
//本组件lib
import lib from "./lib/lib.js";
Vue.use(Radio);
export default{
	 components: {
		IrisCar,
		Pagination,
		areaqueryshop
    },
	data(){
		return{
			pager:{ //分页数据
				pageNo: 1,
				pageSize: 1,
				total: 0,
				totalPages: 0
			},
			queryArchivesParams:{//整车商品查询参数
				skuCode: '', //SKU号
				pageStart: 1,
				productionCode: '', //生产号
				carVinNo: '', //车架号
				storeCode: '', //门店code
				carFactoryCode: '', //厂家code
				carBrandCode: '', //品牌code
				carSeriesCode: '', //车系code
				carModelCode: '', //车型code
				carCode: '', //车款code
				isPreinstalled: ''
			},
			//整车商品表格展示数据
			carTableData:[],
			carTableFields:{ //整车商品表格字段
				check: {
					label: '选择'
				},
				isPreinstalled:{
					label: '是否已预装'
				},
				skuCode:{
					label: 'SKU号'
				},
				carVinNo:{
					label: '车架号'
				},
				carFactoryName:{
					label: '厂家'
				},
				carBrandName:{
					label: '品牌'
				},
				carSeriesName:{
					label: '车系'
				},
				carModelName:{
					label: '车型'
				},
				carDisplayName:{
					label: '车款'
				},
				MSRPCode:{
					label: 'MSRP'
				},
				storeName:{
					label: '所属门店'
				}
			},
			carTableRadioData:'',//整车商品表格radio选择数据
			isShowFactory: true, //获取当前用户在筛选车型、车系、车款时候从品牌开始还是从厂家开始标识
			//是否已预装option
			preinstalled: config.preinstalled
		}
	},
	methods: {
		//页面初始执行
		initPage(){
			//获取当前用户在筛选车型、车系、车款时从品牌开始还是厂家开始
			this.isShowFactory = JSON.parse(common.getSession('showFactory'));
		},
		//分页回调方法
		pageChange(data){
			this.queryArchivesParams.pageStart = data;
			this.queryPreinstalledCarList();
		},
		//查询预装车列表信息
		queryPreinstalledCarList(){
			this.queryArchivesParams.pageNums = config.pageNums;
			api.preloadedCar.queryPreinstalledCarList(this.queryArchivesParams, res => {
				if(res.data.code === "success"){
					this.carTableData = res.data.obj.list;
					this.pager.pageNo = res.data.obj.pageNum;
					this.pager.pageSize = res.data.obj.pageSize;
					this.pager.total = res.data.obj.total;
					this.pager.totalPages = res.data.obj.pages;
					this.carTableRadioData = '';
				}
			});
		},
		//选择门店，获取门店code
		selectStores(sales, stores){
			if(stores){
				this.queryArchivesParams.storeCode = stores.value
			}
		},
		//选择厂家、品牌、车型、车系、车款后的回调
		backSkuCar(val) {
			this.queryArchivesParams.carFactoryCode = val.factoryCode
			this.queryArchivesParams.carBrandCode = val.brandCode
			this.queryArchivesParams.carSeriesCode = val.seriesCode
			this.queryArchivesParams.carModelCode = val.modelCode
			this.queryArchivesParams.carCode = val.carCode
		},
		//去预装车编辑页面
		gotoEdit(){
			if(this.carTableRadioData == ''){
				Message({
					message: '请先选择预装车数据',
					type: 'warning'
				});
				return;
			}
			this.$router.push({path: '/preloadedCar/edit', query:{skuCode: this.carTableRadioData.skuCode}});
		},
		//MSRP计算
		filtersMsrp(actualMSRPInclusiveTaxValue, preinstalledTotalPrice){
			//把这个方法提取到lib里，因为到了详情页的时候还要用一次
			return lib.filtersMsrp(actualMSRPInclusiveTaxValue, preinstalledTotalPrice);
		},
		//重置
		reset(){
			this.queryArchivesParams.skuCode = '';
			this.queryArchivesParams.productionCode = '';
			this.queryArchivesParams.carBrandCode = '';
			this.queryArchivesParams.carCode = '';
			this.queryArchivesParams.carFactoryCode = '';
			this.queryArchivesParams.carSeriesCode = '';
			this.queryArchivesParams.carModelCode = '';
			this.queryArchivesParams.carVinNo = '';
			this.queryArchivesParams.pageStart = 1;
			this.queryArchivesParams.isPreinstalled = '';
			this.$refs.carInfo.clearquery();
		}
	},
	filters: {
		filterPreinstalled(val){
			let result = '';
			for(let i = 0; i < config.preinstalled.length; i ++){
				if(val === config.preinstalled[i].value){
					result = config.preinstalled[i].text;
				}
			}
			return result;
		}
	}
}
</script>

<style scoped>
.table{
	min-width: 1300px;
}
</style>