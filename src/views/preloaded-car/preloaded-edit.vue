<template>
	<div>
		<b-card>
			<!--车辆基础信息-->
			<div class="row">
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="品牌:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="baseCarData.carBrandName" readonly/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="车系:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="baseCarData.carSeriesName" readonly/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="车型:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="baseCarData.carModelName" readonly/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="车款:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="baseCarData.carDisplayName" readonly/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="SKU号:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="baseCarData.skuCode" readonly/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="车架号:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="baseCarData.carVinNo" readonly/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="生产号:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="baseCarData.productionCode" readonly/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="MSRP:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="msrpVal" readonly/>
					</b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					<b-form-fieldset label="预装总金额:" :label-cols="4" horizontal class="text-right">
						<b-form-input v-model.trim="preinstalledSaleTotalPrice" readonly/>
					</b-form-fieldset>
				</div>
			</div>
		</b-card>
		<!--预装商品列表-->
		<el-tabs type="border-card">
			<el-tab-pane label="商品信息">
				<div v-if="pageType" class="row">
					<div class="col-lg-12 col-md-12">
						<div class="pull-left">
							<b-button size="sm" variant="success" @click="showModal">新增</b-button>
							<b-button size="sm" variant="danger" @click="cancelPreinstalledCarDetailInfo">删除</b-button>
						</div>
					</div>
				</div>
				<!--表格主体 pageType用于判断是否是查看详情 如果是查看详情，则锁定输入框及select-->
				<div class="table-scrollable">
					<b-table striped hover bordered show-empty empty-text="暂无数据" class="mt-3" :items="commodityTableData" :fields="commodityTableFields">
						<template slot="check" slot-scope="data">
							<input type="radio" :ref="'commodityRadio' + data.index" v-model="currentCommodityData" :value="data.item" />
						</template>
						<template slot="skuCode" slot-scope="data">
							<router-link :to="{ path: '/boutique/boutiqueDetial/' + data.item.skuCode}">{{data.item.skuCode}}</router-link>
						</template>
						<template slot="skuSalePrice" slot-scope="data">
							{{ data.item.skuSalePrice | toFixed(2) }}
						</template>
						<template slot="unitPrice" slot-scope="data">
							<b-form-input v-model="commodityTableData[data.index].unitPrice" :readonly="!pageType" />
						</template>
						<template slot="skuNums" slot-scope="data">
							<b-form-input v-model="commodityTableData[data.index].skuNums" :readonly="!pageType"/>
						</template>
						<template slot="accountTypeCode" slot-scope="data">
							<b-form-select v-model="commodityTableData[data.index].accountTypeCode" :options="AccountTypeOption" :disabled="!pageType"></b-form-select>
						</template>
						<template slot="stockAvailableNums" slot-scope="data">
							{{data.item.stockAvailableNums === null ? 0 : data.item.stockAvailableNums}}
						</template>
						<template slot="calMsrpFlag" slot-scope="data">
							<b-form-select v-model="commodityTableData[data.index].calMsrpFlag" :options="msrpOption" :disabled="!pageType"></b-form-select>
						</template>
					</b-table>
				</div>
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
				<!--表格下方按钮 pageType用于判断是否是查看详情 如果是查看详情，则隐藏-->
				<div v-if="pageType" class="row">
					<div class="col-lg-12 col-md-12">
						<div class="pull-right">
							<b-button size="sm" variant="default" @click="gotoBack">取消</b-button>
							<b-button size="sm" variant="primary" @click="editPreinstalledCarInfoList">保存</b-button>
						</div>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
		<select-modal ref="selectModal" @getData="getData" :baseCarData1="baseCarData"></select-modal>
	</div>
</template>

<script>
import Vue from "vue";
import {Tabs, TabPane, Message, MessageBox} from 'element-ui';
//common
import api from "common/api";
import {getType} from "common/com-api.js"
import common from "common/common.js";
import config from "common/config.js";
//components
import IrisCar from 'components/iris-car/';
import areaqueryshop from "components/iris-areaqueryshop";
import Pagination from 'components/pagination/pagination';
//本组件lib
import lib from "./lib/lib.js";
import selectModal from './lib/select-modal';
Vue.use(Tabs);
Vue.use(TabPane);
export default{
	 components: {
		IrisCar,
		selectModal,
		areaqueryshop,
		Pagination
    },
	data(){
		return{
			pager:{ //分页数据
				pageNo: 1,
				pageSize: 1,
				total: 0,
				totalPages: 0,
				pageStart: 1
			},
			pageType: true, //用于判断页面是否是详情状态，如果是详情状态需要隐藏 ’新增‘ 和 ’删除‘ 按钮
			baseCarData: {}, //车辆基础信息
			isShowFactory: true, //获取当前用户在筛选车型、车系、车款时候从品牌开始还是从厂家开始标识
			AccountTypeOption: [], //账类选择的数据源 由getAccountType方法请求获取
			msrpOption: config.msrpOption, //是否计入MSRP
			currentCommodityData: '', //当前选中的表格数据
			commodityTableData: [], //添加的预装车商品表格数据
			commodityTableFields:{ //添加的预装车商品数据表格字段
				check: {
					label: '选择'
				},
				skuCode: {
					label: '商品编码'
				},
				skuName: {
					label: '商品名称'
				},
				brandName: {
					label: '商品品牌'
				},
				originalCode: {
					label: '原厂编码'
				},
				skuSalePrice: {
					label: '商品标准价格'
				},
				unitPrice: {
					label: '预装售价'
				},
				skuNums: {
					label: '数量'
				},
				stockAvailableNums: {
					label: '可用库存'
				},
				accountTypeCode: {
					label: '账类归属'
				},
				calMsrpFlag:{
					label: '是否计入车辆实际MSRP'
				}
			},
			//MSRP值独立计算的，仅用于展示，无需提交
			msrpVal: 0, //MSRP值
			//预装总金额 这里需要过滤展示小数和千分位，不用于提交和展示，通过baseCarData获取
			preinstalledSaleTotalPrice: 0//预装总金额
		}
	},
	mounted(){
		//优先执行账类请求，之后执行页面初始化
		this.getAccountType();
	},
	methods: {
		//页面初始执行
		initPage(){
			//判断如果页面为是详情状态，则设置为false 隐藏 ‘新增’ 和 ‘删除’ 按钮
			this.pageType = this.$route.name === 'detail' ? false : true;
			//查询预装车辆详情信息
			this.getPreinstalledCarInfo(this.$route.query.skuCode)
			//获取当前用户在筛选车型、车系、车款时从品牌开始还是厂家开始
			this.isShowFactory = JSON.parse(common.getSession('showFactory'));
		},
		//请求数据字典中的账类
		getAccountType(){
			//此处判断避免重复添加账类
			if(this.AccountTypeOption.length === 0){
				getType(config.gpType[0].value, (res) => {
					for(let i = 0; i < res.length; i++){
						this.AccountTypeOption.push({
							value: res[i].refDetailCode,
							text: res[i].refDetailName
						})
					}
					this.initPage();
				});
			}else{
				this.initPage();
			}
		},
		//查询预装车辆的详情信息
		getPreinstalledCarInfo(skuCode){
			api.preloadedCar.getPreinstalledCarInfo({skuCode: skuCode}, res => {
				if(res.data.code === "success"){
					this.baseCarData = res.data.obj;
					if(this.baseCarData.actualMSRPInclusiveTaxValue !== null){
						//预装总金额 这里需要过滤展示小数和千分位，不用于提交和展示，通过baseCarData获取 this.baseCarData.preinstalledTotalPrice
						this.msrpVal = lib.filtersMsrp(this.baseCarData.actualMSRPInclusiveTaxValue, 0);
					}
					if(this.baseCarData.preinstalledSaleTotalPrice !== null){
						//计算MSRP的值 仅用于展示无需提交
						this.preinstalledSaleTotalPrice = lib.priceFormat(this.baseCarData.preinstalledSaleTotalPrice.toFixed(2));
					}
					//查询预装车商品列表
					this.queryPreinstalledCarDetailInfoVos(this.baseCarData.preinstalledCarCode);
				}
			});
		},
		//分页查询预装车商品的明细信息
		queryPreinstalledCarDetailInfoVos(preinstalledCarCode){
			if(this.baseCarData.preinstalledCarCode === null || this.baseCarData.preinstalledCarCode == ''){
				return false;
			}
			api.preloadedCar.queryPreinstalledCarDetailInfoVos({
				preinstalledCarCode: preinstalledCarCode,
				storeCode: this.baseCarData.storeCode,
				pageNums: config.pageNums, 
				pageStart: this.pager.pageStart
			}, res => {
				if(res.data.code === "success"){
					//分页数据装填
					this.pager.pageNo = res.data.obj.pageNum;
					this.pager.pageSize = res.data.obj.pageSize;
					this.pager.total = res.data.obj.total;
					this.pager.totalPages = res.data.obj.pages;
					//明细数据
					this.commodityTableData = res.data.obj.list;
					if (this.commodityTableData && this.commodityTableData.length > 0) {
                        this.commodityTableData.forEach((data) => {
                            data.unitPrice = data.unitPrice.toFixed(2)
						})
					}
				}
			});
		},
		//选择预装车商品回调
		getData(data){
			//比对有无重复数据，如果没有的话则result返回空字符串
			let result = lib.unique(this.commodityTableData, data);
			if (result == '') {
				this.editPreinstalledCarInfoList(data);
			} else {
				Message({
					message: '商品"' + result + '"已选择请先移除重复商品后再添加',
					type: 'warning'
				});
			}
		},
		//批量新增／修改预装车信息
		editPreinstalledCarInfoList(data){
			let options = {
				carSkuCode: this.baseCarData.skuCode,
				storeCode: this.baseCarData.storeCode,
				preinstalledCarDetailList:[] //新增预装商品数据
			}
			//如果this.baseCarData.preinstalledCarId !== null，则为编辑，不然就是新增
			if(this.baseCarData.preinstalledCarId !== null || this.baseCarData.preinstalledCarId != ''){
				options.id = this.baseCarData.preinstalledCarId;
				options.preinstalledCarDetailList = [];

				//将已有的明细添加进去
				for(let i = 0; i < this.commodityTableData.length; i++){
					options.preinstalledCarDetailList.push(this.commodityTableData[i]);
				}
				
				//拼装新增数据预装的商品数据
				for(let i = 0; i < data.length; i++){
					options.preinstalledCarDetailList.push({
						carSkuCode: this.baseCarData.skuCode,
						skuCode: data[i].skuCode,
						//id: data[i].id, //注意
						unitPrice: data[i].unitPrice, //注意
						preinstalledCarCode: this.baseCarData.preinstalledCarCode, //注意
						accountTypeCode: 'normalSale',
						skuNums: '1'
					});
				}
			}else{
				//添加预装的商品数据
				for(let i = 0; i < data.length; i++){
					options.preinstalledCarDetailList.push({
						carSkuCode: this.baseCarData.skuCode,
						skuCode: data[i].skuCode,
						accountTypeCode: 'normalSale',
						skuNums: '1'
					});
				}
			}
			api.preloadedCar.editPreinstalledCarInfoList([options], res => {
				if(res.data.code === "success"){
					this.$refs.selectModal.hide();
					this.getPreinstalledCarInfo(this.$route.query.skuCode);

				}
			});
		},
		//删除预装车明细信息
		cancelPreinstalledCarDetailInfo(){
			if(this.currentCommodityData == ''){
				Message({
					message: '请选择要删除的明细',
					type: 'warning'
				});
				return false;
			}
			let options = {
				id: this.currentCommodityData.id,
				detailCode: this.currentCommodityData.detailCode
			}
			api.preloadedCar.cancelPreinstalledCarDetailInfo(options, res => {
				if(res.data.code === "success"){
					this.queryPreinstalledCarDetailInfoVos(this.baseCarData.preinstalledCarCode);
					this.currentCommodityData = '';
				}
			});
		},
		//显示弹层
		showModal() {
			this.$refs.selectModal.show()
		},
		//分页方法回调
		pageChange(val){
			this.pager.pageStart = val;
			this.queryPreinstalledCarDetailInfoVos(this.baseCarData.preinstalledCarCode)
		},
		//返回上一页
		gotoBack(){
			this.$router.push({path: '/preloadedCar'});
		}
	}
}
</script>

<style lang="scss" scoped>
	.table{
		min-width: 1500px;
	}
</style>