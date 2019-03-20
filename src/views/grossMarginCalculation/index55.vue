<template>
	<div>
		<div class="row">
			<div class="col-md-12" style="overflow: auto;">
				<table class="grossTable">
					<tr>
						<th></th>
						<th :colspan="a.length + 2">库存管理</th>
						<th :colspan="b.length">漏斗管理</th>
						<th :colspan="c.length">新车毛利管理</th>
						<th :colspan="d.length">衍生业务管理</th>
						<th :colspan="e.length">综合毛利</th>
					</tr>
					<tr>
						<th rowspan="2">品牌</th>
						<th rowspan="2">车系</th>
						<th rowspan="2">车型</th>
						<th v-for="item in a" rowspan="2"><div>{{item.name}}</div></th>
						<th v-for="item in b" rowspan="2"><div>{{item.name}}</div></th>
						<th v-for="(item,i) in c" rowspan="2" ><div>{{item.name}}</div></th>
					<!--	<th colspan="2">赠品/台</th>
						<th v-for="(item,i) in f" rowspan="2" ><div>{{item}}</div></th>-->
						<th v-for="(item,i) in d" colspan="2" v-if="i%2==0">
							{{item.name && item.name.substring(0,item.name.length - 4) }}
						</th>
						<th v-for="(item,i) in e" colspan="2" v-if="i%2==0">
							{{item.name && item.name.substring(0,item.name.length - 4) }}
						</th>
					</tr>
					<tr>
						<!--<th v-for="(item,i) in 2">
							<span v-show="i%2 == 0">上月</span>
							<span v-if="i%2 !== 0">下月</span>
						</th>-->
						<th  v-for="(item,i) in d">
							<span v-show="i%2 == 0">上月</span>
							<span v-if="i%2 !== 0">下月</span>
						</th>
						<th v-for="(item,i) in e">
							<span v-if="i%2 == 0">上月</span>
							<span v-if="i%2 !== 0">下月</span>
						</th>
					</tr>
					<!--内容-->
					<tr v-for="item in list">
						<td rowspan="12">{{ item.brandName}}</td>
						<!--<td>{{ item.seriesName}}</td>
						<td>{{ item.modelName}}</td><td v-for="em in item.list">{{ em.addValue}}</td>-->
					</tr>
					<tr v-for="item in lists">
						<td>{{ item.seriesName}}</td>
						<td>{{ item.modelName}}</td>
						<td v-for="em in item.list">{{ em.addValue}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
 	import config from "common/config";
 	import common from "common/common";
 	import {getType} from"common/com-api";
  	import api from "common/api";
  	import Pagination from "components/pagination/pagination";
	export default{
		data(){
			return{
				a:[
				'车系','车型','上月在库可售库存','上月计划到库的在途库存',
				'上月销售台数','上月批售台数','预计月底库存台数','预计本月可售库存周转天数','目标 本月可售库存周转天数'
				],
				b:['本月库存安全销售目标','上月进店线索数	','本月进店线索数目标',
				'上月进店线索订单率','本月进店线索订单率目标','本月新增订单数目标',
				'上月留存订单数','上月订单零售率','本月订单零售率目标','展厅零售目标',
				'厂家SI获取需要的额外销售目标','本月销售目标（库存安全目标+SI额外目标）',
				],
				c:['二级批售配额','平均进货成本（千）','上月平均销售金额   (千）',
				'目标零售限价金额 / 台 (千）','豪车消费税 （10%）','预计本月GP1 （千）',		
				],
				f:['预计本月GP2/台',	'预估厂家SI（千）','预估年度返利','预计本月GP4/台','预计本月GP4%'],
				d:['金融渗透率','平均金融手续费/台','金融服务费/台','金融毛利','保险渗透率',
				'平均保险手续费/台','保险毛利','精品渗透率','精品销售额/台','精品毛利/台',
				'精品毛利率',	'精品毛利','新车延保销售额/台',	'新车延保渗透率','延保毛利/台',		
				'新车延保毛利','其他业务渗透率','其他毛利/台','其他业务毛利','衍生业务毛利/台',
				'衍生业务毛利'
				],
				e:['GP4.5/台','GP4.5%','GP4.5合计'],
				list:[],
				lists:[],
				storeCode:'',
			}
		},
		mounted(){
			this.queryList();
			this.MaoriStockManage();
			this.MaoriFunnelManage();
			this.MaoriNewCarManage();
			this.MaoriDerivationManage();
			this.MaoriSynthetical();
		},
		created(){
			this.storeCode = JSON.parse(common.getSession('userInfo')).userAvailableInfo.storeInfoVo.storeCode
		},
		methods:{
			//查询报表数据
			queryList(){
				const option ={
				  storeCode:this.storeCode,
				  "brandCode": "CARB2000004",
				  "modelCode": "Y038020",
				  "seriesCode": "Y038020",
				  /*"storeCode": "STORE2000735",*/
				  "maoriCode": "",
				  /*"dateVersion": "2018-09",*/
				  
				}
				
				api.MaoriForecast.queryMaoriForecastInfo(option,res=>{
					if(res.data.code == 'success'){
						const obj = res.data.obj;
						this.lists = res.data.obj 
						console.log(obj)
						const this_ = this;
						obj.forEach(item => {
							const index = this_.list.findIndex(em => em.brandCode == item.brandCode);
							if(index == -1){
								this_.list.push({
									brandCode:item.brandCode,
									brandName:item.brandName,
									list:[{...item}],
								})
							}else{
								this_.list[index].list.push({...item})
							}
						})
						console.log(222)
						console.log(this.list)
						this.getItemValue();
					}
				})
				
			},
			/*每行数据值分解*/
			getItemValue(){
				this.list.forEach((item,inde) => {
					item.lists = []
					this.pForeach(this.a,item,inde);
					this.pForeach(this.b,item,inde);
					this.pForeach(this.c,item,inde);
					this.pForeach(this.d,item,inde);
					this.pForeach(this.e,item,inde)
					
				})
			},
			//公共循环遍历方法
			pForeach(obj,item,inde){
				const This = this;
				obj.forEach(em =>{
					const index = item.list.findIndex(vo => vo.addCode == em.code);
					if(index !== -1){
						item.lists.push({
							addCode:This.list[inde].list[index].addCode,
							addName:This.list[inde].list[index].addName,
							addValue:This.list[inde].list[index].addValue,
						})
					}
				})
			},
			//数据字典库存管理
			MaoriStockManage(){
				this.a = [];
				getType('MaoriStockManage',res =>{
					res.forEach(item=>{
						this.a.push({
							code:item.refDetailCode,
							name:item.refDetailName
						})
					})
				})
			},
			//漏斗管理
			MaoriFunnelManage(){
				this.b = [];
				getType('MaoriFunnelManage',res =>{
					res.forEach(item=>{
						this.b.push({
							code:item.refDetailCode,
							name:item.refDetailName
						})
					})
				})
			},
			//毛利管理
			MaoriNewCarManage(){
				this.c = []
				getType('MaoriNewCarManage',res =>{
					res.forEach(item=>{
						this.c.push({
							code:item.refDetailCode,
							name:item.refDetailName
						})
					})
				})
			},
			//衍生业务管理
			MaoriDerivationManage(){
				this.d = [];
				getType('MaoriDerivationManage',res =>{
					res.forEach(item=>{
						this.d.push({
							code:item.refDetailCode,
							name:item.refDetailName
						})
					})
				})
			},
			//综合毛利
			MaoriSynthetical(){
				this.e = [];
				getType('MaoriSynthetical',res =>{
					res.forEach(item=>{
						this.e.push({
							code:item.refDetailCode,
							name:item.refDetailName
						})
					})
				})
				
				console.log(this.e)
			},
		}
	}
</script>

<style lang="scss">
	.grossTable{
		background: #fff;
		td,th{
			text-align: center;
			min-width:80px;
			border: 1px solid #c2cfd6;
			.subTh{
				width: 100px;
				span{
					border: 1px solid #c2cfd6;
					display: inline-block;
				}
			}
		}
		th{
		 	background: #EDF1F7;	
		}
	}
</style>