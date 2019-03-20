<template>
    <div class="echart" ref="echart" />
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/tooltip'
    import "echarts/lib/component/title"

    export default {
        props: {
            pastData: {
                type: Boolean,
                default: false
            },
            dataList: {
                type: Array,
                default: []
            },
            addCount: {
                type: Number,
                default: 0
            },
            showDetail: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.initChart(this.dataList)
        },
        watch: {
            dataList(dataList) {
                this.initChart(dataList)
            }
        },
        methods: {
            initChart(dataList) {

                const chart = echarts.init(this.$refs.echart)
                const colorList = ['#587EB9', '#EAEBEF', '#EAEBEF', '#EAEBEF', '#EAEBEF', '#EAEBEF', '#EAEBEF']
                const addList = [0, 0, 0, 0, 0, 0, this.addCount || 0]

                if (this.pastData) {
                    colorList[0] = '#EAEBEF'
                    colorList[6] = '#587EB9'
                }
               
                const option = {
                    tooltip: {
                        axisPointer: {           
                            type: 'shadow',
                        },
                        formatter: function(params) {
                            if (params.dataIndex == 6) {
                                if (params.seriesName == 'bar1') 
                                    return params.value + addList[params.dataIndex]
                                if (params.seriesName == 'bar2')
                                    return params.value + dataList[params.dataIndex]
                            } else 
                                return dataList[params.dataIndex]
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type : 'category',
                            show: this.showDetail,
                            data: ['', '', '', '', '', '', ''],
                            axisTick: {
                                alignWithLabel: false
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type : 'value',
                            show: this.showDetail
                        }
                    ],
                    series: [
                        {
                            name: 'bar1',
                            type:'bar',
                            barWidth: '60%',
                            stack: 'total',
                            itemStyle: {
                                normal: {  
                                    color: function (params) {
                                        return colorList[params.dataIndex]
                                    }
                                },
                            },
                            data: dataList
                        }
                    ]
                }
                
                if(this.pastData && this.showDetail) {
                    const addVo = {
                        name: 'bar2',
                        type:'bar',
                        barWidth: '60%',
                        stack: 'total',
                        itemStyle:{
                            normal:{
                                color: 'red',
                            }
                        },
                        data: addList
                    }
                    option.series.push(addVo)
                } 

                chart.setOption(option)

                chart.on('click', params => {
                    if (params.dataIndex === 6 && this.pastData) {
                        this.$store.commit('showPastEchart')
                        event.preventDefault()
                        event.stopPropagation()
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echart {
        width: 100%;
        height: 150px;
        margin-top: -25px;
    }
</style>
