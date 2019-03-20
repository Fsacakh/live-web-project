<template>
    <div>
       <div class="row">
        	<div class="col-md-12 col-lg-12" >
        		<section class="lineTime" v-for="list in linelist">
        			<div class="line-time-block" >
        				<div class="line-time-img" :class="list.active ? 'hover':''"><img :src="list.img"></div>
        				<div class="line-time-content">
        					<p>服务：{{list.service}}</p>
        					<p>时间：{{list.time}}</p>
        					<p>姓名：{{list.name}}</p>
        				</div>
        			</div>
        		</section>
        	</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
					time:'15:00pm - 2018.2.20',
					name:'kelvin',
					img:'./static/icon/icon-weixiu.png',
					active:false
				},{
					service:'20000km保养，更新雨刷',
					time:'15:00pm - 2018.2.20',
					name:'kelvin',
					img:'./static/icon/icon-you.png',
					active:false
				},{
					service:'20000km保养，更新雨刷',
					time:'15:00pm - 2018.2.20',
					name:'kelvin',
					img:'./static/icon/icon-youtong.png',
					active:false
				}],
        }
    },
    methods: {
        
    }
}
</script>
<style scoped>
.lineTime{
    margin-top: 10px;
    position: relative;
    padding: 40px 0;
}
.lineTime:first-child{
	padding-top: 0;
}
.lineTime:last-child{
	padding-bottom:0 ;
}
.lineTime:before{
	content: '';
	background:#F1F1F1;
	position: absolute;
	top:40px;
	left:20px;
	width: 3px;
	height: 110px;
	margin-left: 0px;
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
	left:0px;
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
	width:82%;
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
