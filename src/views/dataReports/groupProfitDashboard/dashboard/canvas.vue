<template>
  <div id="canvas-box">
    <canvas class="canvas-box" :id="ID.ID" width="140" height="140">
      <p>抱歉，您的浏览器不支持canvas</p>
    </canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // percent: 80,          //实际
      // target: 100,         //目标百分比
      circleX: 70, //中心X坐标
      circleY: 70, //中心Yz坐标
      radius: 60, //圆环半径
      lineWidth: 10, //圆形线条的宽度
      fontSize: 12, //字体大小
      process: 0,
      timer: "" //定时器
    };
  },
  props: {
    ID: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    let canvas = document.getElementById(this.ID.ID); //获取dom节点
    //初始化数据
    let ctx = canvas.getContext("2d");
    let cx = this.circleX; //初始化X轴
    let cy = this.circleY; //初始化Y轴
    let r = this.radius; //初始化半径
    let startAngle = -Math.PI / 2; //开始点
    let endAngle = this.process; //结束点
    this.percent = this.ID.percent;
    //初始化
    if(this.percent == 0)return;
    this.circleLoading(cx, cy, r, startAngle, ctx, this.percent);
  },
   computed: {
    value() {
      if (this.ID.target < 0) {
        if (2 - this.ID.percent / this.ID.target < 0) {
          return 0
        } else {
          return Number((2 - this.ID.percent / this.ID.target) > 1 ? 1 : (2 - this.ID.percent / this.ID.target))
        }
      } else if (this.ID.target > 0) {
        if (this.ID.percent / this.ID.target < 0) {
          return 0
        } else {
         return Number(this.ID.percent / this.ID.target > 1 ? 1 : this.ID.percent / this.ID.target)
        }
      }
    }
  },
  methods: {
    //初始化方法
    //画圆
    circle(cx, cy, r, ctx) {
      ctx.beginPath();
      //ctx.moveTo(cx + r, cy);
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = "#eee";
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    },
    //画弧
    sector(cx, cy, r, startAngle, ctx, percent) {
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth; //弧的宽度
      var linGrad = ctx.createLinearGradient(
        // 渐变色
        this.circleX - this.radius - this.lineWidth,
        this.circleY,
        this.circleX + this.radius + this.lineWidth,
        this.circleY
      );
      linGrad.addColorStop(0, "#2038DE");
      linGrad.addColorStop(1, "#0DD3FF");
      ctx.strokeStyle = linGrad;
      ctx.lineCap = "round";
      //圆弧
      ctx.arc(cx, cy, r, -Math.PI * 1 / 2, -Math.PI * 1 / 2 + 2 * Math.PI * this.process)
      ctx.stroke();
    },
    //刷新
    loading(circleX, circleY, radius, startAngle, ctx, percent) {
      this.percent = percent;
      //清除canvas内容
      ctx.clearRect(0, 0, circleX * 2, circleY * 2);
      //中间的字
      ctx.font = 20 + "px April";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#1F38DE";
      if(!Number(this.ID.target)){
        ctx.fillText( '--',
        circleX,
        circleY * 4 / 5
        );
      }
      else if(this.ID.target < 0){
         ctx.fillText((Math.round((2-(this.ID.percent / this.ID.target).toFixed(2)) * 100)
              ) + "%",
        circleX,
        circleY * 4 / 5
        );
      }else if(this.ID.target > 0 ){
        ctx.fillText((Math.round(( this.ID.percent / this.ID.target).toFixed(2) * 100)
              ) + "%",
        circleX,
        circleY * 4 / 5
        );     
      }
      ctx.font = 14 + "px April";
      ctx.fillStyle = "#244B7E ";
      ctx.fillText(this.ID.title, circleX, circleY * 6 / 5);
      //圆形
      this.circle(circleX, circleY, radius, ctx);
      //圆弧
      this.sector(circleX, circleY, radius, startAngle, ctx);
      if(this.ID.target < 0 && (2 - this.ID.percent / this.ID.target) > 0){
            if(this.process >= ((2 - this.ID.percent / this.ID.target) > 1 ? 1 : (2 - this.ID.percent / this.ID.target))) return;
            this.process +=0.01 ;
        }
      else if ( !Number(this.ID.target) || this.ID.percent / this.ID.target <= 0) {
        this.process = 0;
        return;
      } else {
        if (this.process >= this.value) return;
        this.process += 0.01;
      }
      // if(this.ID.percent / this.ID.target <=0){
      //   this.process = 0
      // }else{
      // if(this.process >= this.ID.percent)return;
      // this.process += (this.ID.percent / 100);
      // }
    },
    circleLoading(circleX, circleY, radius, startAngle, ctx, percent) {
      let _this = this;
      setTimeout(function(){
        _this.loading(circleX, circleY, radius, startAngle, ctx, percent);
      },30)
    }
  },
  watch: {
    process:function(){
        let canvas = document.getElementById(this.ID.ID); //获取dom节点
        let ctx = canvas.getContext("2d"); 
        let cx = this.circleX; //初始化X轴 
        let cy = this.circleY; //初始化Y轴 
        let r = this.radius; //初始化半径 
        let startAngle = -Math.PI / 2; //开始点  
        this.percent = this.ID.percent;
        this.circleLoading(cx, cy, r, startAngle, ctx, this.percent);
    },
    ID: {
      handler(val) {
        let canvas = document.getElementById(this.ID.ID); //获取dom节点
        let ctx = canvas.getContext("2d");
        let cx = this.circleX; //初始化X轴
        let cy = this.circleY; //初始化Y轴
        let r = this.radius; //初始化半径
        let startAngle = -Math.PI / 2; //开始点
        this.percent = this.ID.percent;
        this.process = 0
        this.circleLoading(cx, cy, r, startAngle, ctx, this.percent);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
#canvas-box {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
</style>


