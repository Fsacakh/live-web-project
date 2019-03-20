<template>
    <div class="gruph">
        <canvas id="gruph" width="300" height="250"></canvas>
    </div>
</template>
<script>
export default {
  data() {
    return {
      //   percent: 200,    //实际
      //   target: 100,    //目标值
      circleX: 300,
      circleY: 300,
      radius: 100,
      lineWidth: 15,
      process: 0,
      timer: ""
    };
  },
  props: {
    instrumentID: {
      type: Object,
      default: {}
    }
  },
  computed: {
    value() {
      if (this.instrumentID.target < 0) {
        if (2 - this.instrumentID.percent / this.instrumentID.target < 0) {
          return 0
        } else {
          return Number((2 - this.instrumentID.percent / this.instrumentID.target) > 1 ? 1 : (2 - this.instrumentID.percent / this.instrumentID.target))
        }
      } else if (this.instrumentID.target > 0) {
        if (this.instrumentID.percent / this.instrumentID.target < 0) {
          return 0
        } else {
         return Number(this.instrumentID.percent / this.instrumentID.target > 1 ? 1 : this.instrumentID.percent / this.instrumentID.target)
        }
      }
    }
  },
  mounted() {
    let canvas = document.getElementById("gruph");
    let ctx = canvas.getContext("2d");
    let cx = canvas.width / 2; //初始化X轴
    let cy = canvas.height / 2 + 50; //初始化Y轴
    let r = this.radius; //初始化半径
    let startAngle = Math.PI / 3 * 2; //开始点
    // let process = this.process
    let percent = this.instrumentID.percent;
    // this.drawText(ctx, cx, cy, r)
    this.instrumentLoading(ctx, cx, cy, r, percent);
  },
  methods: {
    //默认圆弧
    circle(cx, cy, r, ctx) {
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = "#eee";
      ctx.arc(cx, cy, r, Math.PI / 6 * 5, Math.PI / 6 * 13);
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "#989B9C";
      ctx.fill();
      ctx.closePath();
    },
    //运动圆弧
    sector(cx, cy, r, ctx) {
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      var linGrad = ctx.createLinearGradient(0, 0, 170, 0); //渐变色
      linGrad.addColorStop(1, "#CE5A7E ");
      linGrad.addColorStop(0, "#6274E8");
      ctx.strokeStyle = linGrad;
      ctx.lineCap = "round"; //起点样式
      ctx.arc(cx, cy, r, Math.PI / 6 * 5, Math.PI / 6 * 5 + 4 / 3 * Math.PI * this.process)
      ctx.stroke();
    },
    //画刻度
    drawBigScale(ctx, cx, cy, r) {
      for (var i = 0; i < 9; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(i / 12 * 2 * Math.PI + -2 / 3 * Math.PI);
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#989B9C";
        ctx.moveTo(0, -80);
        ctx.lineTo(0, -70);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    },
    //绘制小的刻度
    drawSmallScale(ctx, cx, cy, r) {
      for (var i = 0; i < 25; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(i / 36 * 2 * Math.PI + -2 / 3 * Math.PI);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#989B9C";
        ctx.moveTo(0, -80);
        ctx.lineTo(0, -75);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    },
    //绘制指针
    drawPointer(ctx, cx, cy, percent) {
        
      ctx.save();
      ctx.translate(150, 175);
      ctx.rotate( 4 / 3 * Math.PI * this.process +-2 / 3 * Math.PI )
    //  if(!this.instrumentID.target){
    //     ctx.rotate(Math.PI * 4 / 3);
    //   }
    //  else if(this.instrumentID.target < 0){
    //       if((2-(this.instrumentID.percent / this.instrumentID.target) < 0 )){
    //         ctx.rotate(Math.PI * 4 / 3);
    //       }else{
    //         ctx.rotate(
    //       ((2-(this.instrumentID.percent / this.instrumentID.target )) > 1 ? 1:2-(this.instrumentID.percent / this.instrumentID.target )) * 4 / 3 * Math.PI +
    //         -2 / 3 * Math.PI);
    //       }
    //     }else if(this.instrumentID.target > 0){
    //       if( this.instrumentID.percent / this.instrumentID.target < 0 ){
    //         ctx.rotate( Math.PI * 4 / 3 );
    //       }else {
    //          ctx.rotate(
    //           (this.process > this.instrumentID.target ? this.instrumentID.target : this.process) / this.instrumentID.target * 4 / 3 * Math.PI +
    //             -2 / 3 * Math.PI
    //           );
    //       }
    //     }
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 6;
      ctx.moveTo(-2, 3);
      ctx.lineTo(0, -60);
      ctx.lineTo(2, 3);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    },
    //绘制文字
    drawText(ctx, cx, cy, r, percent) {
      ctx.clearRect(0, 0, 600, 600);
      ctx.font = "12px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("T.GP 目标预计达成率", 150, 230);
      ctx.fillText("T.GP目标预计达成率", 150, 10);
      ctx.font = "bold 30px Arial";
      ctx.fillStyle = "#000";
      if(this.instrumentID.target <= 0){
         ctx.fillText( Number(this.instrumentID.target) ?  (Math.round((2-(this.instrumentID.percent / this.instrumentID.target).toFixed(2)) * 100)
              ) + "%" : "N/A",
        150,
        40
        );
      }else if(this.instrumentID.target > 0 ){
        ctx.fillText((Math.round(( this.instrumentID.percent / this.instrumentID.target).toFixed(2) * 100)
              ) + "%",
        150,
        40
        );     
      }
      this.circle(cx, cy, r, ctx);
      this.sector(cx, cy, r, ctx);
      this.drawBigScale(ctx, cx, cy, r);
      this.drawSmallScale(ctx, cx, cy, r);
      this.drawPointer(ctx, cx, cy);
      if(this.instrumentID.target < 0 && (2 - this.instrumentID.percent / this.instrumentID.target) > 0){
            if(this.process >= ((2 - this.instrumentID.percent / this.instrumentID.target) > 1 ? 1 : (2 - this.instrumentID.percent / this.instrumentID.target))) return;
            this.process +=0.01 ;
        }
      else if ( !Number(this.instrumentID.target) || this.instrumentID.percent / this.instrumentID.target <= 0) {
        this.process = 0;
        return;
      } else {
        if (this.process >= this.value) return;
        this.process += 0.01;
      }
    },
    //仪表盘
    instrumentLoading(ctx, cx, cy, r, percent) {
      let _this = this;
      setTimeout(function(){
        _this.drawText(ctx, cx, cy, r, percent);
      },30)
    }
  },
  watch: {
    process:function(){
        let canvas = document.getElementById('gruph'); //获取dom节点
        let ctx = canvas.getContext("2d");
        let cx = canvas.width / 2; //初始化X轴
        let cy = canvas.height / 2 + 50; //初始化Y轴
        let r = this.radius; //初始化半径
        let percent = this.instrumentID.percent;
        this.instrumentLoading(ctx, cx, cy, r, percent)
    },
    instrumentID: {
      handler(val) {
        let canvas = document.getElementById("gruph");
        let ctx = canvas.getContext("2d");
        let cx = canvas.width / 2; //初始化X轴
        let cy = canvas.height / 2 + 50; //初始化Y轴
        let r = this.radius; //初始化半径
        let startAngle = Math.PI / 3 * 2; //开始点
        // let process = this.process
        let percent = this.instrumentID.percent;
        // this.drawText(ctx, cx, cy, r)
        this.process = 0;
        this.instrumentLoading(ctx, cx, cy, r, percent);
      },
      deep: true
    } 
  }
};
</script>
<style lang="scss" scoped>
.gruph {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
</style>
