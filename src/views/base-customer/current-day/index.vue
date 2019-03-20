<template>
    <div>
        <div class="flex">
        	<div class="flex1">
        		<div class="box">
        			<div class="row">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left">滞留车信息</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-5 col-lg-5">
        					<el-select v-model="value" placeholder="未接待">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      v-model="selefty"
							      :value="item.value">
							    </el-option>
						  	</el-select>
						
        				</div>
        				<div class="col-md-7 col-lg-7">
        					<el-input
							  placeholder="请输入"
							  icon="search"
							  v-model="input2"
							  :on-icon-click="handleIconClick">
							</el-input>
        				</div>
        			</div>
        		</div>
        		
        		<div class="box">
        			<div class="row">
        				<div class="col-md-12 col-lg-12 currentborder">
        					<span class="pull-left">沪BE2135<label class="ml-3">王先生</label></span>
        					<span class="pull-right currentLightBlue">未派工</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left color-1">在店时长： 35min</span>
        					<span class="pull-right"> SA： 刘广</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left color-2">预定交车时间：2018年4月18号   14：00</span>
        				</div>
        				
        			</div>
        		</div>
        		<div class="box">
        			<div class="row">
        				<div class="col-md-12 col-lg-12 currentborder">
        					<span class="pull-left">沪CE7135<label class="ml-3">李先生</label></span>
        					<span class="pull-right currentBtnOrange">待施工</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left color-1">在店时长： 35min</span>
        					<span class="pull-right"> SA： 张亮</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left color-2">预定交车时间：2018年4月18号   14：00</span>
        				</div>
        				
        			</div>
        		</div>
        		<div class="box">
        			<div class="row">
        				<div class="col-md-12 col-lg-12 currentborder">
        					<span class="pull-left">沪A42135<label class="ml-3">刘先生</label></span>
        					<span class="pull-right currentBtnRed">施工中</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left color-1">在店时长： 35min</span>
        					<span class="pull-right"> SA： 王启明</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left color-2">预定交车时间：2018年4月18号   14：00</span>
        				</div>
        				
        			</div>
        		</div>
        		<div class="box">
        			<div class="row">
        				<div class="col-md-12 col-lg-12 currentborder">
        					<span class="pull-left">沪BE9135<label class="ml-3">谢先生</label></span>
        					<span class="pull-right currentBtnRed">施工中</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left color-1">在店时长： 35min</span>
        					<span class="pull-right"> SA： 王亮</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left color-2">预定交车时间：2018年4月18号   14：00</span>
        				</div>
        				
        			</div>
        		</div>
        		<div class="box">
        			<div class="row">
        				<div class="col-md-12 col-lg-12 currentborder">
        					<span class="pull-left">沪BE5135<label class="ml-3">李先生</label></span>
        					<span class="pull-right currentBtnBlue">待交车</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left color-1">在店时长： 35min</span>
        					<span class="pull-right"> SA： 李静</span>
        				</div>
        			</div>
        			<div class="row mt-2">
        				<div class="col-md-12 col-lg-12">
        					<span class="pull-left color-2">预定交车时间：2018年4月18号   14：00</span>
        				</div>
        				
        			</div>
        		</div>
        	</div>
        	<div class="flex3" style="margin-left: 20px;">
        		<img src="./../../../../static/image/currentday.png" style="width: 100%;" @click="show" v-if="isflx"/>
        		<img src="./../../../../static/image/currentday_.png" style="width: 100%;" @click="show" v-if="!isflx" />
        	</div>
        	<!--<b-modal ref="mymodal" title="沪BF-23125" hide-footer>
        		<div class="flex">
        			<span>车主：</span>
        			<span>李先生</span>
        			<span class="color-1">135778965678</span>
        		</div>
        		<div class="flex currentborder">
        			<span>送车人：</span>
        			<span>李太太</span>
        			<span class="color-1">135778965678</span>
        		</div>
        		<div class="flex mt-3">
        			<span>当前状态：</span>
        			<span>施工中</span>
        		</div>
        		<div class="flex currentborder">
        			<span>已在店试驾：</span>
        			<span>2h12m</span>
        		</div>
        		<div class="flex mt-3">
        			<span>SA：</span>
        			<span>李静</span>
        		</div>
        		<div class="flex currentborder">
        			<span>维修合同：</span>
        			<span>M12345678909</span>
        		</div>
        	</b-modal>-->
        </div>
    </div>
</template>
<script>
	import Vue from 'vue'
	import{Input,Select,Button,Option, }from 'element-ui'
	Vue.use(Input)
	Vue.use(Select)
	Vue.use(Button)
	Vue.use(Option)
    export default {
        data() {
            return {
            	isflx:true,
            	value:'',
            	input2:'',
            	selefty:'1',
            	options:[{
            		 value: '1',
          			label: '未接待'
            	},{
            		 value: '2',
          			label: '施工中'
            	},{
            		 value: '3',
          			label: '待交车'
            	},{
            		 value: '4',
          			label: '未派工'
            	}],
				list:[{
					
				},{
					
				}],
				input5:'',
				select:'1',
				img:'./../../../../static/image/dashboardpic/currentday.png',
            }
        },
        methods: {
			show(){
				/*if(this.img == './../../../static/image/currentday_.png'){
					this.img = './../../../static/image/currentday.png'
				}else{
					this.img = './../../../static/image/currentday_.png'
				}*/
				this.isflx = !this.isflx
			},
			handleIconClick(){
				
			},
        }
    }
</script>
<style scoped>
.flex{
	display: flex;
}
.flex1{
	flex:1
}
.flex3{
	flex:3.4
}
.color-1{
	color:#1E8EFF;
}
.color-2{
	color:#FF5F38 ;
}
.color-3{
	color:#FF0000 ;
}
.box{
	border:1px solid #E6E6E6;
	border-radius:5px;
	background:#FFFFFF;
	padding: 10px 20px;
	font-size: 12px;
	margin-bottom: 15px;
    width: 100%;
    height: auto;
}
.currentBtnRed,.currentBtnBlue,.currentBtnOrange,.currentLightBlue{
	text-align: center;
	color: #FFF;
	border-radius:20px;
	width: 76px;
}
.currentBtnRed{
	background-image:linear-gradient(45deg,#FB729C,#F99C99)
}
.currentBtnBlue{
	background-image:linear-gradient(45deg,#3883FB,#2B9CF6 )
}
.currentborder{
	border-bottom: 1px solid #E4E4E4;
	padding-bottom: 10px;
}
.currentBtnOrange{
	background-image:linear-gradient(45deg,#FCAD81,#ECB378)
}
.currentLightBlue{
	background: #DAE7FF;
	color: #3782F7;
}
.el-input__inner {
    min-width: 90px!important;
}
</style>
