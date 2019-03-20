<template>
    <div ref="mybox" style="width:100%;height:800px;" ></div>
</template>
<script>
import echarts from 'echarts'
import china from 'echarts/map/js/china.js'
import weibo from './weibo.json'
export default {
    methods: {
        mycreated() {


            // ===============================================================

            //初始化
            var myChart = echarts.init(this.$refs.mybox);


            myChart.showLoading();//加载数据前显示的动画效果


            //读取微博JSON数据
            (function(weiboData) {

                myChart.hideLoading();//加载数据完成后隐藏动画



                //定义一个Data方法将读取的微博数据根据经纬度组合成新的JSON，用于显示

               var  Data = function(index) {

                    var data = weiboData[index];

                    var px = data[0] / 1000;

                    var py = data[1] / 1000;

                    var res = [[px, py]];



                    for (var i = 2; i < data.length; i += 2) {

                        var dx = data[i] / 1000;

                        var dy = data[i + 1] / 1000;

                        var x = px + dx;

                        var y = py + dy;

                        res.push([x, y, 1]);



                        px = x;

                        py = y;

                    }

                    return res;

                };

                //设置参数

                myChart.setOption({
                    backgroundColor: '#404a59',

                    title: {         //标题组件

                        text: 'IRIS点亮中国',

                        subtext: 'iRIS 汽车智能服务平台',

                        sublink: 'http://dev.iris.com/web/login/login.html',

                        left: 'center',

                        top: 'top',

                        textStyle: {

                            color: '#fff'

                        }

                    },

                    legend: {        //图例组件

                        left: 'left',

                        data: ['强', '中', '弱'],

                        textStyle: {

                            color: '#ccc'

                        }

                    },

                    geo: {           //地理坐标系组件

                        name: '强',

                        type: 'scatter',

                        map: 'china',

                        label: {

                            emphasis: {

                                show: false

                            }

                        },

                        itemStyle: {

                            normal: {

                                areaColor: '#323c48',

                                borderColor: '#111'

                            },

                            emphasis: {

                                areaColor: '#2a333d'

                            }

                        }

                    },

                    series: [{              //系列列表

                        name: '弱',

                        type: 'scatter',

                        coordinateSystem: 'geo',

                        symbolSize: 1,

                        large: true,

                        itemStyle: {

                            normal: {

                                shadowBlur: 2,

                                shadowColor: 'rgba(37, 140, 249, 0.8)',

                                color: 'rgba(37, 140, 249, 0.8)'

                            }

                        },

                        data: Data(0)

                    }, {

                        name: '中',

                        type: 'scatter',

                        coordinateSystem: 'geo',

                        symbolSize: 1,

                        large: true,

                        itemStyle: {

                            normal: {

                                shadowBlur: 2,

                                shadowColor: 'rgba(14, 241, 242, 0.8)',

                                color: 'rgba(14, 241, 242, 0.8)'

                            }

                        },

                        data: Data(1)

                    }, {

                        name: '强',

                        type: 'scatter',

                        coordinateSystem: 'geo',

                        symbolSize: 1,

                        large: true,

                        itemStyle: {

                            normal: {

                                shadowBlur: 2,

                                shadowColor: 'rgba(255, 255, 255, 0.8)',

                                color: 'rgba(255, 255, 255, 0.8)'

                            }

                        },

                        data: Data(2)

                    }]

                });

            })(weibo)
            // ===============================================================


        }
    },
    mounted() {
         this.$nextTick(function () {
        this.mycreated();

  })
    }
}
</script>

<style lang="css">
    
</style>
