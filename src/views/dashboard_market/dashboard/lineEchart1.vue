<template>
    <div class="echart-line-box" ref="echartLineBox"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/toolbox'
    import "echarts/lib/component/title"
    import "echarts/lib/component/legend"

    export default {
        data(){
            return {
                echartBox:''
            }
        },
        mounted() {
            this.initChart();
        },
        props: {
            option: Object
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
                this.echartBox.resize();
            },
            initChart() {
                let _this = this,
                    option = {
                        tooltip: {
                        trigger: 'item',
                            formatter: "{a} <br/>{c}"
                        },
                        legend: {
                            show: true,
                            left: 'center',
                            top: '95%',
                            data: [
                                {
                                    name: '单日客流数',
                                    icon: 'rect'
                                },
                                {
                                    name: '月总客流数',
                                },
                                {
                                    name: '单日客流线索数',
                                },
                                {
                                    name: '月总客流线索数',
                                },
                                {
                                    name: '客流目标',
                                },
                                {
                                    name: '月客流线索数',
                                }
                            ]
                        },
                        grid:{
                            width: '90%',
                            top: '10%',
                            left: '5%',
                            containLabel: false
                        },
                        xAxis:{
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        },
                        yAxis: [
                            {
                                name: '单日',
                                type: 'value',
                                position: 'left',
                                boundaryGap: false
                            },
                            {
                                name: '本月',
                                type: 'value',
                                position: 'right',
                                boundaryGap: false,
                            }
                        ],
                        series: [
                            {
                                name:'单日客流数',
                                center: ['50%', '50%'],
                                data: _this.option.ReceptionStatisticsCountArr,
                                type: 'line',
                                yAxisIndex: 0,
                                smooth: true,
                                itemStyle:{
                                    normal:{
                                        color: '#4071c8'
                                    }
                                }
                            },
                            {
                                name:'月总客流数',
                                center: ['50%', '50%'],
                                areaStyle: {normal: {}},
                                data: _this.option.totalReceptionStatisticsCountArr,
                                type: 'line',
                                yAxisIndex: 1,
                                smooth: true,
                                itemStyle:{
                                    normal:{
                                        color: '#ffc000'
                                    }
                                }
                            },
                            {
                                name:'单日客流线索数',
                                center: ['50%', '50%'],
                                data: _this.option.KeepReceptionStatisticsCountArr,
                                yAxisIndex: 0,
                                type: 'line',
                                smooth: true,
                                itemStyle:{
                                    normal:{
                                        color: '#5b9bd5'
                                    }
                                }
                            },
                            {
                                name:'月总客流线索数',
                                center: ['50%', '50%'],
                                data: _this.option.totalKeepReceptionStatisticsCountArr,
                                yAxisIndex: 1,
                                type: 'line',
                                smooth: true,
                                itemStyle:{
                                    normal:{
                                        color: '#70ad47'
                                    }
                                }
                            },
                            {
                                name:'客流目标',
                                center: ['50%', '50%'],
                                data: _this.option.passengerTarget,
                                yAxisIndex: 1,
                                type: 'line',
                                smooth: true,
                                itemStyle:{
                                    normal:{
                                        color: '#a04d47'
                                    }
                                }
                            },
                            {
                                name:'月客流线索数',
                                center: ['50%', '50%'],
                                data: _this.option.passengerResidueTarget,
                                yAxisIndex: 1,
                                type: 'line',
                                smooth: true,
                                itemStyle:{
                                    normal:{
                                        color: '#2e4a5c'
                                    }
                                }
                            }
                        ]
                    }
                for(let i = 0; i < _this.option.passengerTarget.length; i++){
                    option.xAxis.data.push((i + 1).toString());
                }
                _this.echartBox = echarts.init(this.$refs.echartLineBox);
                _this.echartBox.setOption(option)
            },
        }
    }

</script>

<style lang="scss" scoped>
    .echart-line-box{
        height: 360px;
    }
</style>
