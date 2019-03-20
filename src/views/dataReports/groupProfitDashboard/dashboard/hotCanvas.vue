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
    return {};
  },
  props: {
    ID: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    var canvas = document.getElementById(this.ID.ID);
    var context = canvas.getContext("2d");
    this.drawRoundRect(context, 10, 10, 120, 120, 60);
    this.circle(70, 70, 50, context);
  },
  methods: {
    //画外圈圆
    drawRoundRect(cxt, x, y, width, height, radius) {
      cxt.beginPath();
      var grad = cxt.createLinearGradient(10, 120, 10, 10);
      if( this.ID.percent / this.ID.target <= 1){
          grad.addColorStop(1,'#1476EB'); 
          grad.addColorStop(0, "#1476EB");
      }else if( (1 < this.ID.percent / this.ID.target) && (this.ID.percent / this.ID.target < 1.1) ){
          grad.addColorStop(1,'#1476EB'); 
          grad.addColorStop(0.1,'#1476EB');     
          grad.addColorStop(0, "#E86171");
      }else if( (1.1 < this.ID.percent / this.ID.target ) && this.ID.percent / this.ID.target <= 1.3 ){
          grad.addColorStop(1,'#1476EB'); 
          grad.addColorStop(0.3,'#1476EB');     
          grad.addColorStop(0, "#E86171");
      }else if( 1.3 < this.ID.percent / this.ID.target && this.ID.percent / this.ID.target <= 1.6 ){
          grad.addColorStop(1,'#1476EB'); 
          grad.addColorStop(0.5,'#1476EB');     
          grad.addColorStop(0, "#E86171");
      }else if( 1.6 < this.ID.percent / this.ID.target && this.ID.percent / this.ID.target <= 2 ){
          grad.addColorStop(1,'#1476EB'); 
          grad.addColorStop(0.3,'#E86171');     
          grad.addColorStop(0, "#E86171");
      }else if( this.ID.percent / this.ID.target > 2 ){
          grad.addColorStop(1,'#E86171'); 
          grad.addColorStop(0.3,'#E86171');     
          grad.addColorStop(0, "#E86171");
      }else{
          grad.addColorStop(1,'#1476EB'); 
          grad.addColorStop(0, "#1476EB");
      }
      cxt.fillStyle = grad;
      cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
      cxt.lineTo(width - radius + x, y);

      cxt.arc(
        width - radius + x,
        radius + y,
        radius,
        Math.PI * 3 / 2,
        Math.PI * 2
      );
      cxt.lineTo(width + x, height + y - radius);
      cxt.arc(
        width - radius + x,
        height - radius + y,
        radius,
        0,
        Math.PI * 1 / 2
      );
      cxt.lineTo(radius + x, height + y);
      cxt.arc(
        radius + x,
        height - radius + y,
        radius,
        Math.PI * 1 / 2,
        Math.PI
      );
      cxt.fill();
      cxt.closePath();
    },
    //画圆
    circle(cx, cy, radius, cxt) {
      cxt.beginPath();
      cxt.lineWidth = this.lineWidth;
      cxt.strokeStyle = "#eee";
      cxt.arc(cx, cy, radius, 0, Math.PI * 2);
      cxt.stroke();
      cxt.fillStyle = "white";
      cxt.fill();
      cxt.font = 20 + "px April";
      cxt.textAlign = "center";
      cxt.textBaseline = "middle";
      cxt.fillStyle = "#1F38DE";
      cxt.fillText( parseInt(this.ID.percent) + '天', 70, 60);
      cxt.font = 14 + "px April";
      cxt.fillText("库存周转天数", 70, 80);
    }
  },
  watch: {
    ID: {
      handler(val) {
        let canvas = document.getElementById(this.ID.ID); //获取dom节点
        let context = canvas.getContext("2d");
        this.drawRoundRect(context, 10, 10, 120, 120, 60);
        this.circle(70, 70, 50, context);
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


