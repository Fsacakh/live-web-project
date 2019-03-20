<template>
    <div>
        <div class="flex">
        	<div class="flex3" style=" margin-top: 30px;margin-left:30px;">
        			<div class="row mb-3" v-for="(item,index) in query" >
        				<div class="col-md-2 col-lg-2" style="padding: 0;  text-align: center;">
	        					<p class="title">{{item.title}}</p>
	        					<p class="subtitle">{{item.subTitle}}</p>
        				</div>
        				<div class="col-md-9 col-lg-9">
        					<div class="row">
        						<div  class="col-md-2 col-lg-2" style="padding: 10px;" v-for="(items,Index) in item.list" >
        							<div class="box" :class="items.active ? 'hover':''" @click="change(index,Index,items.text)">
		        						{{items.text}}
		        					</div>
        						</div>
        						
        					</div>
        					
        				</div>
        			</div>
        	</div>
        	<div class="flex2">
        		<b-card class="" style="margin-right:40px; margin-top: 30px;">
        			<b-form-group horizontal label="计划名称"  :label-cols="2" class="text-right ml-2">
                       <b-form-input placeholder="请输入"/>
                    </b-form-group>
        			<dl>
        				<dt class="w-1">标签</dt>
        				<dt class="w-5">已选数据标签</dt>
        				<dt class="w-2">用户规模</dt>
        				<dt class="w-3">取值</dt>
        			</dl>
        			<dl class="mb-2" v-for="item in list">
        				<dd class="w-1 pl-3">{{item.a}}</dd>
        				<dd class="w-5 " v-for="items in item.b"><span class="c1 p-1">{{items}}<i class="el-icon-close ic-c1ose ml-2"></i></span></dd>
        				<dd class="w-2">{{item.c}}</dd>
        				<dd class="w-3">
        					<b-button :variant="item.d? 'primary':''" class="mr-1" size="sm">交集</b-button>
        					<b-button :variant="item.e? 'primary':''">并集</b-button>
        				</dd>
        			</dl>
        			<b-card>
        				<p>组合方式：<span class="ml-3 c2">T1∩D1∩P1(L1∪L2)∩C1</span></p>
        				<p>用户规模：<span class="ml-3 c2">578</span></p>
        			</b-card>
        			<div>
        				<div class="pull-left"><i class="el-icon-delete"></i></div>
        				<div class="pull-right">
        					<b-button>数据调取</b-button>
        					<b-button variant="primary">立即分配</b-button>
        				</div>
        			</div>
        		</b-card>
        	</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
				list:[{
					a:'T',
					b:['(T1):过去一周到店'],
					c:'1,200',
					d:false,
					e:true
				},{
					a:'D',
					b:['(D1):5星'],
					c:'845',
					d:true,
					e:false
				},{
					a:'P',
					b:['(P1):本店购车'],
					c:'1,300',
					d:true,
					e:false
				},{
					a:'L',
					b:['(L1):华北大区','(L2):东城区',],
					c:'2,600',
					d:false,
					e:true
				},{
					a:'C',
					b:['(C1):活跃常客'],
					c:'3,000',
					d:true,
					e:false
				}],
				query:[{
					title:'时间维度(T)',
					subTitle:'数据采集时间配置',
					list:[{
						text:'过去一周进店',
						active:true
					},{
						text:'过去一个月',
						active:false
					},{
						text:'过去三个月',
						active:false
					},{
						text:'过去六个月',
						active:false
					},{
						text:'过去一年',
						active:false
					},{
						text:'自定义',
						active:false
					}],
				},
				{
					title:'客户星级(D)',
					subTitle:'客户星级，分类',
					list:[{
						text:'5星',
						active:true
					},{
						text:'4星',
						active:false
					},{
						text:'3星',
						active:false
					},{
						text:'2星',
						active:false
					},{
						text:'1星',
						active:false
					},{
						text:'新客',
						active:false
					}],
				},
				{
					title:'消费行为(P)',
					subTitle:'历史消费行为标签',
					list:[{
						text:'本店购车',
						active:true
					},{
						text:'购买续保',
						active:false
					},{
						text:'购买延保',
						active:false
					},{
						text:'高于客单价',
						active:false
					},{
						text:'平均客单价',
						active:false
					},{
						text:'购买增项',
						active:false
					}],
				},
				{
					title:'区域标签(L)',
					subTitle:'数据隶属区域门店',
					list:[{
						text:'华北大区当前区域',
						active:true
					},{
						text:'东安路',
						active:false
					},{
						text:'安远店',
						active:false
					},{
						text:'东城区',
						active:true
					},{
						text:'-',
						active:false
					},{
						text:'-',
						active:false
					}],
				},
				{
					title:'客户类别(C)',
					subTitle:'客户状态分类',
					list:[{
						text:'活跃常客',
						active:true
					},{
						text:'即将休眠',
						active:false
					},{
						text:'一般休眠',
						active:false
					},{
						text:'即将流失',
						active:false
					},{
						text:'过路客',
						active:false
					},{
						text:'准时到达',
						active:false
					}],
				},
				],
            }
        },
        methods: {
            change(index,Index,text){
            	this.query[index].list[Index].active = !this.query[index].list[Index].active;
            	if(this.query[index].list[Index].active){
            		this.list[index].b.push(text);
            	}else{
            		const a = this.list[index].b.findIndex(v=>v == text);
            		this.list[index].b.splice(a,1)
            	}
            }
        }
    }
</script>
<style scoped>
	.title,.subtitle{
		color: #48576A;
		font-size: 18px;
	}
	.title{
	    margin-top:15px;
    	margin-bottom: 2px;
	}
	.subtitle{
		font-size:12px;
	}
	.box{
		width:100%;
		height:70px;
		border-radius: 5px;
		box-shadow: 0 5px 20px 0 #DEDEDE;
		margin-right: 10px;
		display: flex;
		align-items: center;
		justify-content:center;
		text-align: center;
		cursor: pointer;
		float: left;
		
	}
	.hover{
		background:#587EB9 ;
		color: #FFF;
	}
	.row .box:last-child{
		margin-right: 0;
	}
	dl,dd{
		display: flex;
	}
	dt{
		text-align: center;
	}
	dd{
		background: #F8F8F8;
		padding: 8px 3px;
	}
	.w-1{
		width: 10%;
	}
	.w-5{
		width:70%;
	}
	.w-2{
		width:20%;
	}
	.w-3{
		width:30%;
	}
	.c1{
		background: #E8EAEC;
	}
	.ic-c1ose{
		color:#999 ;
		font-size: 10px;
	}
	.c2{
		color: #587EB9;
	}
	.flex{
		display: flex;
	}
	.flex1{
		flex: 1;
	}
	.flex2{
		flex: 2;
	}
	.flex3{
		flex: 3;
	}
</style>
