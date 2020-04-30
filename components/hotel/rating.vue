<template>
  <div>
    <canvas id="myCanvas" ref="myCanvas" width="90px" height="90px">您的浏览器不支持canvas标签。</canvas>
  </div>
</template>

<script>
export default {
  props: ["text", "scores"],
  data() {
    return {
      datas: 8.9,
      texts: "环境"
    };
  },
  watch: {
    scores() {
      // console.log(this.text, this.scores);
      var canvas = this.$refs.myCanvas;
      if (canvas.getContext) {
        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext("2d");
        //开始一个新的绘制路径
        ctx.beginPath();
        //设置弧线的颜色为蓝色
        ctx.strokeStyle = "#FF9900";
        var circle = {
          x: canvas.width / 2, //圆心的x轴坐标值
          y: canvas.height / 2, //圆心的y轴坐标值
          r: canvas.height / 2 //圆的半径
        };
        let rad = (Math.PI * 2) / 100;
        ctx.arc(
          circle.x,
          circle.y,
          circle.r,
          -Math.PI / 2,
          -Math.PI / 2 + this.scores * 10 * rad,
          false
        );
        //按照指定的路径绘制弧线
        ctx.stroke();
        //   绘制文字
        var context = this.$refs.myCanvas.getContext("2d");
        // 设置字体
        context.font = "16px bold 黑体";
        // 设置颜色
        context.fillStyle = "#FF9D0B";
        // 设置水平对齐方式
        context.textAlign = "center";
        // 设置垂直对齐方式
        context.textBaseline = "middle";
        // 绘制文字（参数：要写的字，x坐标，y坐标）
        context.fillText(this.text, canvas.width / 2, canvas.width / 2 - 10);
        // 绘制评分
        let scoresContent = this.$refs.myCanvas.getContext("2d");
        // 设置字体
        context.font = "16px bold 黑体";
        // 设置颜色
        context.fillStyle = "#FF9D0B";
        // 设置水平对齐方式
        context.textAlign = "center";
        // 设置垂直对齐方式
        context.textBaseline = "middle";
        // 绘制文字（参数：要写的字，x坐标，y坐标）
        context.fillText(this.scores, canvas.width / 2, canvas.width / 2 + 15);
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>