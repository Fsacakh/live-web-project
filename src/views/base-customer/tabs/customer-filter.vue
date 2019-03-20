<template>
    <div>
        <div class="row mt-3">
        	<div class="col-md-5 col-lg-5">
        		<b-card class="ml-3" header="筛选目标用户">
        			<div class="row">
        				<div class=" col-md-12 col-lg-12">
        					<b-form-group horizontal label="系统推荐"  :label-cols="2" class="text-right ml-2">
		                       <b-form-select/>
		                    </b-form-group>
        				</div>
        				<div class=" col-md-12 col-lg-12">
        					<b-form-fieldset horizontal label="时间范围" :label-cols="2"class="text-right ml-2">
		                          <el-date-picker
								      v-model="value6"
								      type="daterange"
								      range-separator="至"
								      start-placeholder="开始日期"
								      end-placeholder="结束日期">
								    </el-date-picker>
		                    </b-form-fieldset>
        				</div>
    				<!--	<div class=" col-md-12 col-lg-12">
        					<b-form-fieldset horizontal label="标签搜索" :label-cols="3" class="text-right">
		                       <b-form-input/>
		                    </b-form-fieldset>
        				</div>
    					<div class=" col-md-12 col-lg-12">
        					<b-form-fieldset horizontal label="车主联系" :label-cols="3" class="text-right">
		                       <b-form-input/>
		                    </b-form-fieldset>
        				</div>-->
        			</div>
        			<div class="row">
    					<div class=" col-md-6 col-lg-6">
        					<b-form-fieldset horizontal label="活动名称" :label-cols="5" class="text-right">
		                       <b-form-input placeholder="输入活动名称"/>
		                    </b-form-fieldset>
        				</div>
    					<div class=" col-md-6 col-lg-6">
        					<b-form-fieldset horizontal label="  车型" :label-cols="5" class="text-right">
		                       <b-form-select />
		                    </b-form-fieldset>
        				</div>
        			</div>
        			<div class="row">
    					<div class=" col-md-6 col-lg-6">
        					<b-form-fieldset horizontal label="标签搜索" :label-cols="5" class="text-right">
		                       <b-form-input placeholder="输入活动名称"/>
		                    </b-form-fieldset>
        				</div>
    					<div class=" col-md-6 col-lg-6">
        					<b-form-fieldset horizontal label="车主联系" :label-cols="5" class="text-right">
		                       <b-form-input placeholder="输入车主联系方式"/>
		                    </b-form-fieldset>
        				</div>
        			</div>
        			<div class="row">
        				<div class="col-lg-12">
        					<div class="pull-right">
        						<b-button>清空</b-button>
        						<b-button variant="primary">查询</b-button>
        					</div>
        				</div>
        			</div>
        		</b-card>
        	</div>
        	<div class="col-md-7 col-lg-7">
        		<b-card class="mr-3" header="系统历史任务清单">
        			<table class="myTable">
        				<tr><th v-for="list in field">{{list.label}}</th></tr>
        				<tr v-for="item in list"><td v-for="items in item">{{items}}</td><td class="w-20"><el-progress :percentage="Math.ceil(Math.random()*100)">666</el-progress></td></tr>
        			</table>
        		</b-card>
        	</div>
        </div>
        <div class="row">
        	<div class="col-md-12 col-lg-12">
        		<b-card class="ml-3 mr-3">
        			<table class="myTable">
        				<tr><th v-for="list in field2">{{list.label}}</th><th><el-radio v-model="b" label="全选"></el-radio></th></tr>
        				<tr v-for="item in list2"><td v-for="items in item">{{items}}</td><td> <el-radio v-model="a"></el-radio></td></tr>
        			</table>
        			<div class="row mt-4">
        				<div class="clo-lg-12 col-md-12">
        					<div class="pull-left"><i class="el-icon-delete"></i></div>
        					<div class="pull-right">
        						<span class="mr-3">查询到目标用户：1,200 人</span>
        						<b-button>暂存</b-button>
        						<b-button variant="primary" class="ml-3">立即分配</b-button>
        					</div>
        				</div>
        			</div>
        		</b-card>
        	</div>
        </div>
        
    </div>
</template>
<script>
	
	import Vue from 'vue'
    import {Progress,DatePicker,Steps,Step,Radio} from 'element-ui'
    
    Vue.use(Progress)
    Vue.use(DatePicker)
   	Vue.use(Steps)
    Vue.use(Step)
    Vue.use(Radio)
    export default {
        data() {
            return {
            	text:'',
            	a:1,
            	b:1,
            	value6:'',
				list:[{
					number:1,
        			content:'3月回厂营销活动',
        			time:'2018/03/14 14:00',
        			type:'sms',
        			num:'1,200',
				},{
					number:2,
        			content:'5月初保障保养促销',
        			time:'2018/03/14 14:00',
        			type:'wechat',
        			num:'2,200',
				},{
					number:3,
        			content:'3月回厂营销活动',
        			time:'2018/03/14 14:00',
        			type:'sms',
        			num:'1,200',
        			
				},{
					number:4,
        			content:'4月初保障保养促销',
        			time:'2018/03/14 14:00',
        			type:'wechat',
        			num:'2,200',
        		
				},
				],
				list2:[],
				field:{
					a:{
						label:'序号',
					},
					b:{
						label:'内容',
					},
					c:{
						label:'分配时间',
					},
					d:{
						label:'分配类型',
					},
					e:{
						label:'目标数量',
					},
					f:{
						label:'状态',
					}
				},
				field2:{
					a:{
						label:'序号',
					},
					b:{
						label:'车型',
					},
					c:{
						label:'车牌',
					},
					d:{
						label:'车主',
					},
					e:{
						label:'手机绑定',
					},
					f:{
						label:'微信绑定',
					},
					g:{
						label:'已联系次数',
					},
					k:{
						label:'最近联系',
					},
					
				},
				linelist:[{
					service:'首次保养',
					time:'15:00pm - 2017.12.20',
					name:'kelvin',
					img:'./static/icon/copy2.png',
					active:true
				},{
					service:'20000km保养，更新雨刷',
					time:'15:00pm - 2017.12.20',
					name:'kelvin',
					img:'./static/icon/icon-youtong.png',
					active:false
				},{
					service:'20000km保养，更新雨刷',
					time:'15:00pm - 2017.12.20',
					name:'kelvin',
					img:'./static/icon/icon-weixiu.png',
					active:false
				},{
					service:'20000km保养，更新雨刷',
					time:'15:00pm - 2017.12.20',
					name:'kelvin',
					img:'./static/icon/icon-you.png',
					active:false
				},{
					service:'20000km保养，更新雨刷',
					time:'15:00pm - 2017.12.20',
					name:'kelvin',
					img:'./static/icon/icon-youtong.png',
					active:false
				}],
            }
        },
        created(){
        	for(let i=1;i<=8;i++){
        		this.list2.push({
        			number:i,
        			type:'2017款Macan 3.6T',
        			licenseplate:'沪AG876543',
        			owner:'klevin',
        			phone:'18655341256',
        			weixin:'Openid020230123',
        			count:Math.ceil(Math.random()*10),
        			Recently:'2月营销活动',
        			
        			
        		})
        	}
        },
        methods: {
            
        }
    }
</script>
<style scoped>
.myTable{
	width: 100%;
	
}
.myTable td,.myTable th{
	padding: 13px 8px;
	border-bottom:1px solid #F2F2F2;
	color: #48576A;
}
.w-20{
	width: 20%;
}
#lineTime{
    margin-top: 10px;
    position: relative;
    padding: 40px 0;
}
#lineTime:before{
	content: '';
	background:#F1F1F1;
	position: absolute;
	top:40px;
	left:20px;
	width: 3px;
	height: 160px;
	margin-left: 20px;
}
.line-time-block{
	position: relative;
	margin: 20px 0;
}
.line-time-img{
	position: absolute;
	top:0px;
	width: 40px;
	height: 40px;
	left:22px;
	background:#F5F5F5;
	border-radius:50%;
	display: flex;
	align-items: center;
	justify-content:center;
	text-align: center;
}
.line-time-img.hover{
	background: #5FB870;
}
.line-time-content{
	float: right;
	width:86%;
	position: relative;
	background: #F5F5F5;
	padding: 10px 10px 0 10px;
}
.line-time-content p{
	margin-bottom: 5px;
}
.line-time-content:before{
	content:'';
	position: absolute;
	top:10px;
	left:-13px;
	right: 100%;
	height: 0;
	width: 0;
	border: 7px solid transparent;
	border-right: 7px solid #F5F5F5;
}
</style>
