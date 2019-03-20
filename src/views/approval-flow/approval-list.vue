<template>
	<div>
		<b-modal hide-footer title="待办事项列表" ref="myModel" size="lg" id="emp-insert2" @show="reload">
			<div class="row">
				<div class="col-md-4 col-lg-4">
					 <b-form-fieldset label="单据类型" :label-cols="4" horizontal class="text-right">
	                    <b-form-select v-model="query.orderTypeCode" :options="billType">
	                    </b-form-select>   
	                </b-form-fieldset>
				</div>	
				<div class="col-md-4 col-lg-4">
					 <b-form-fieldset label="单号" :label-cols="4" horizontal class="text-right">
	                    <b-form-input v-model="query.orderNo"/>   
	                  </b-form-fieldset>
				</div>
				<div class="col-md-4 col-lg-4">
					 <b-form-fieldset label="审批状态" :label-cols="4" horizontal class="text-right">
	                    <b-form-select v-model="query.nodeStatus" :options="approvalStatus">
	                    </b-form-select>   
	                </b-form-fieldset>
				</div>	
			</div>
			<div class="row">
				<div class="col-lg-12 col-md-12">
					<div class="pull-right">
						<b-button size="sm" variant="default" @click="reset">重置</b-button>
						<b-button size="sm" variant="primary" @click="getList()">查询</b-button>
					</div>
				</div>
			</div>
			<b-table striped hover bordered :items="list" :fields="field" show-empty empty-text="暂无数据" class="mt-3">
				<template slot="orderNo" slot-scope="data" >
					<div @click="hideModal">
						<span ><a  href="#" @click="changeHref(data.item.orderNo,data.item.orderTypeCode,data.item.orderWfCode)">{{data.item.orderNo}}</a></span>
                    </div>
				</template>
				<template slot="nodeStatus" slot-scope="data">
					{{data.item.nodeStatus | setnodeStatus}}
				</template>
			</b-table>
			<div class="row"> 
                    <div class="col-md-12">
                       <pagination class="pull-right" 
                        @page-change="pageChange" 
                        :pageNo="page.pageNo" 
                        :pageSize="page.pageSize" 
                        :totalPages="page.totalPages" 
                        :totalResult="page.totalResult">
                        </pagination>
                    </div>
                </div>
		</b-modal>
	</div>
</template>

<script>
import api from "common/api";
import Pagination from 'components/pagination/pagination'
import { getType } from 'common/com-api'
import common from 'common/common'
import config from "common/config"; 
import {Message, MessageBox} from 'element-ui'
export default{
	 components: {
        Pagination
    },
	data(){
		return{
			isPro:false,
			islive:false,
			islivecs:true,
			list:[{
				a:'3333'
			}],
			field:{
				orderNo:{
					label:'单号'
				},
				orderTypeName:{
					label:'单据类型'
				},
				storeName:{
					label:'门店'
				},
				createByName:{
					label:'提交人'
				},
				createTimeStr:{
					label:'提交时间'
				},
				nodeStatus:{
					label:'审批状态'
				},
			},
			approvalStatus:[{
				text:'待审批',
				value:-1
			},{
				text:'驳回',
				value:0
			},{
				text:'通过',
				value:1
			}],//审批状态
			billType:[],
			query:{
				orderTypeCode:'',
				orderNo:'',
				nodeStatus:null,
			},
			page:{
				pageNo:1,
				pageSize:config.pageNums,
				totalPages:0,
				totalResult:1,
			},
			getCount:0,
			getOrigin:'',
		}
	},
	mounted(){
		/*var env = process.env.NODE_ENV;
        return env === 'development' ? '' : '/livecs/approval-flow/details'
		console.log(/livecs/approval-flow/details)*/
		const pathName = window.location.pathname.split('/')[1];
		if(pathName == 'livepro'){
			this.isPro = true 
			this.islivecs = false
			this.islive = false
		}else if(pathName == 'web'){
			this.isPro = false 
			this.islivecs = false
			this.islive = true
		}else{
			this.isPro = false 
			this.islivecs = true
			this.islive = false
		}
		
		this.getList();
		this.getNumSlist();
		this.getOrigin = common.getOrigin();
		console.log(this.getOrigin)
	},
	created(){
		getType('WorkFlowBusinessTypeCode',(res)=>{
					res.forEach((item)=>{
						this.billType.push({
							value:item.refDetailCode,
							text:item.refDetailName
						})
					})
				})		
	},
	methods:{
		changeHref(orderNo,billtype,orderWfCode){
			window.location.href=`${this.getOrigin}/livecs/approval-flow/details?orderNo=${orderNo}&billtype=${billtype}&orderWfCode=${orderWfCode}`
		},
		reset(){
			for(let k of Object.keys(this.query)){
				this.query[k]=''
			}
		},
		reload(){
			this.getList();
		},
		pageChange(num){
			this.getList(num)
		},
		showModal(){
			this.$refs.myModel.show()
		},
		hideModal(){
			this.$refs.myModel.hide()
		},
		//获取列表
		getList(num = 1){
			console.log(JSON.parse(common.getSession('userInfo')).empToken)
			const option ={
				pageNums: config.pageNums,
				pageStart:num,
				empToken:JSON.parse(common.getSession('userInfo')).empToken,
			}
			Object.assign(this.query,option)
		    this.publicGetDate(this.query)
		},
		//获取总共的待审批数量
		getNumSlist(){
			console.log(JSON.parse(common.getSession('userInfo')).empToken)
			const option ={
				pageNums: config.pageNums,
				pageStart:1,
				empToken:JSON.parse(common.getSession('userInfo')).empToken,
				nodeStatus:-1

			}
			api.approval.query(option,res=>{
				if(res.data.code == 'success'){
					this.$emit('getNums',res.data.obj.total)
				}
			})
			//Object.assign(option)
  		},
		//公共查询
		publicGetDate(data){
				api.approval.query(data,res=>{
				if(res.data.code == 'success'){
					let obj = res.data.obj
					this.list = res.data.obj.list;
					/*if(this.query.nodeStatus == '-1'||this.query.nodeStatus == null){
						const getNum = this.list.filter(v => v.nodeStatus == '-1');
							this.$emit('getNums',getNum.length)
					}*/
					this.page = {
						pageNo:obj.pageNum,
						pageSize:config.pageNums,
						totalPages:obj.pages,
						totalResult:obj.total,
					}
				}
			})
		},
		//实时推送
		sendMes(){
			let websocket;  
			// 首先判断是否 支持 WebSocket  
			 if('WebSocket' in window) {  
			     websocket = new WebSocket("ws://localhost:8085/springTest/testHandler?userId=zhaoshouyun");  
			 } else if('MozWebSocket' in window) {  
			     websocket = new MozWebSocket("ws://localhost:8085/springTest/testHandler?userId=zhaoshouyun");  
			 } else {  
			     websocket = new SockJS("http://localhost:8085/springTest/socketJs/testHandler?userId=zhaoshouyun");  
			 }  
			 // 打开连接时  
			 websocket.onopen = function(evnt) {  
			     console.log(" websocket已创建 链接");  
			 };  
			 // 收到消息时  
			 websocket.onmessage = function(evnt) {
			 	console.log(evnt.data);
			 	this.$emit('sendNum',evnt.data)
			 	Message({
			 		type:'warning',
			 		message:'收到一条审批消息'
			 	})
			 };  
			 websocket.onerror = function(evnt) {  
			     console.log("  websocket.onerror  ");  
			 };  
			 websocket.onclose = function(evnt) {  
			     console.log("  websocket.onclose  ");  
			 }; 
		}
	},
	filters:{
		setnodeStatus(val){
			let text = '';
			switch(val){
				case -1:
				text = '待审批'
				break;
				case 0:
				text="驳回"
				break;
				case 1:
				text ="通过"
				break;
			}
			return text
		}
	},
}
</script>

<style scoped>
#emp-insert2 .modal-lg {
    max-width: 1200px !important;
}
#emp-insert2 .modal-body {
    height: auto !important;
}
</style>