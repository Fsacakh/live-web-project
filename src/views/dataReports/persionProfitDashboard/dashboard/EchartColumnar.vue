<template>
    <div id="capacity" :style="{width: '100%', height: '290px'}"></div>
</template>
<script>
import Vue from 'vue'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
export default {
    data () {
        return {

        }
	},
	props:{
		seriesName: {
			type: Array,
			default:function (){
				return []
			}
		},
		seriesNum:{
			type: Array,
			default: function (){
				return []
			}
		}
	},
    mounted(){
        this.capacityEachart()
    },
    methods:{
        capacityEachart(){
      			let capacity=this.$echarts.init(document.getElementById("capacity"));//eacharts实例
      			let options = {
      				title: {
						text: '车系销量排名',
						padding: [10, 0, 20, 40],
				        textStyle:{
							fontSize:20,
							color: '#151B1E'
                        },
				    },
				    color: ['#81A5FF'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
							type : 'category',
							axisLabel:{ 
								interval: 0 
							},
							data : this.seriesName,
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
							type : 'value',
							minInterval : 1,
							boundaryGap : [ 0, 0.1 ]
				        }
				    ],
				    series : [
				        {
				            name:'销售量',
				            type:'bar',
				            barWidth: '60%',
							data: this.seriesNum
				        }
				    ]
                };
                capacity.setOption(options)
                  window.addEventListener('resize',function(){
      				capacity.resize()
      			})
        }
	},
	watch:{
		seriesName:{
			handler(val){
				this.capacityEachart()
			}
		},
		seriesNum:{
			handler(val){
				this.capacityEachart()
			}
		}
	}
}
</script>
