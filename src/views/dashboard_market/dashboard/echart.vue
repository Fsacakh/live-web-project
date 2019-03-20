<template>
    <div class="echart-box" ref="echartBox">
        <h3 class="echart-item-title">{{option.title}}</h3>
        <div class="echart"></div>
        <h5>{{option.valDescribe}}</h5>
        <!-- option.lockVal + '/' +  -->
        <p v-if="option.type == 'c'" class="echart-item-text" :style="{color: option.color[0]}">{{option.targetVal}}</p>
        <p v-else class="echart-item-text" :style="{color: option.color[0]}">{{option.toDayVal}}</p>
        <div class="echart-item-target"><div v-if="option.type == 'b'"><span>今日目标:&nbsp;&nbsp;</span>{{option.toDayTarget}}</div></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/tooltip'
    import "echarts/lib/component/title"

    export default {
        data(){
            return {
                chartBox:''
            }
        },
        mounted() {
            this.initChart();
        },
        props: {
            option: Object,
            type: String
        },
        watch:{
            option:{
                handler(val, oldVal) {
                    this.initChart();
                },
                deep: true
            }
        },
        methods: {
            resizeChart(){
                this.chartBox.resize();
            },
            initChart() {
                let _this = this;
                this.chartBox = echarts.init(this.$refs.echartBox.children[1])
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c}"
                    },
                    series: [
                        {
                            name: _this.option.title,
                            type:'pie',
                            radius: ['65%', '90%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                normal: {  
                                    color(params){
                                        return _this.option.color[params.dataIndex]
                                    }
                                },
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            data:[
                                {value: _this.option.nowTargetVal, name: _this.option.nowTargetTitle},
                                {value: _this.option.targetVal == 0 ? _this.option.targetVal : _this.option.targetVal - _this.option.nowTargetVal, name: _this.option.targetTitle}
                            ]
                        }
                    ]
                };
                if(this.option.type == 'c'){
                    option.series[0].data = [];
                    option.series[0].data = [
                        {value: _this.option.nowTargetVal, name: _this.option.nowTargetTitle},
                        {value: _this.option.lockVal, name: _this.option.lockTitle},
                        {value: _this.option.targetVal - _this.option.nowTargetVal - _this.option.lockVal, name: _this.option.targetTitle}
                    ]
                }
                this.chartBox.setOption(option)
            },
        }
    }

</script>

<style lang="scss" scoped>
    .echart {
        width: 100%;
        height: 250px;
    }
    .echart-box{
        position: relative;
        h5{
            font-size:14px;
            font-weight: normal;
            position: absolute;
            width: 50%;
            top:40%;
            left: 50%;
            margin-left: -25%;
            text-align: center;
        }
        .echart-item-title{
            font-size: 24px;
            text-align: center;
        }
        .echart-item-text{
            position: absolute;
            width: 50%;
            top:50%;
            left: 50%;
            margin-left: -25%;
            font-size: 32px;
            text-align: center;
        }
        .echart-item-target{
            font-size: 18px;
            text-align: center;
            margin-top: 15px;
            height:20px;
            span{
                color:#4c5a63;
            }
        }
    }
</style>
