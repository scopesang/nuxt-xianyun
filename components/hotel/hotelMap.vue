<template>
  <div class="map">
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=5304a15f7059cdfd9afd8314936aa0d0"
    ></script>
    <div id="container"></div>
    <div class="mapMessage">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风景" name="first"></el-tab-pane>
        <el-tab-pane label="交通" name="second"></el-tab-pane>
      </el-tabs>
      <div class="around">
        <p v-for="(item,index) in mapMessage.scenic" :key="index">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mapMessage"],
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  watch: {
    mapMessage() {
      setTimeout(() => {
        var map = new AMap.Map("container", {
          zoom: 11, //级别
          center: [
            this.mapMessage.location.longitude,
            this.mapMessage.location.latitude
          ], //中心点坐标
          viewMode: "3D" //使用3D视图
        });

        // 显示酒店坐标
        var content = '<i class="el-icon-location"></i>';

        var marker = new AMap.Marker({
          content: content, // 自定义点标记覆盖物内容
          position: [
            this.mapMessage.location.longitude,
            this.mapMessage.location.latitude
          ] // 基点位置
        });
        map.add(marker);
        // 加载搜索插件;
        AMap.plugin("AMap.PlaceSearch", () => {
          var placeSearch = new AMap.PlaceSearch({
            // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
            city: this.mapMessage.real_city
          });

          placeSearch.search(
            this.mapMessage.scenic[1].name,
            (status, result) => {
              // 查询成功时，result即对应匹配的POI信息
              console.log(result);
            }
          );
        });
      }, 0);
    }
  },
  mounted() {}
};
</script>

<style scoped lang='less'>
.map {
  display: flex;
  margin: 30px 0;
}
#container {
  width: 580px;
  height: 350px;
}
/deep/.mapMessage {
  flex: 1;
  padding: 0 20px;
  .el-tabs {
    width: 100%;
    .is-top {
      font-size: 18px;
    }
  }
}
.around {
  height: 295px;
  overflow: auto;
  p {
    padding: 10px 0;
    cursor: pointer;
  }
}
</style>