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
        <p v-for="(item,index) in mapMessage.scenic" :key="index" @click="handleCircum(item)">
          <span>{{item.name}}</span>
          <span>{{(item.distance/1000).toFixed(2)}}公里</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mapMessage"],
  data() {
    return {
      activeName: "first",
      // 地图对象
      map: {},
      // 周边信息对象
      circumMarker: []
    };
  },
  methods: {
    // 切换栏
    handleClick(tab, event) {
      this.circumMarker.forEach(item => {
        this.map.remove(item);
      });
      this.getCircum(tab.label);
    },
    // 获取周边
    getCircum(tab) {
      AMap.service(["AMap.PlaceSearch"], () => {
        this.circumMarker = [];
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 30, // 每页10条
          pageIndex: 1, // 获取第一页
          city: this.mapMessage.real_city // 指定城市名(如果你获取不到城市名称，这个参数也可以不传，注释掉)
        });
        // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
        // 第二个参数是经纬度，数组类型
        // 第三个参数是半径，周边的范围
        // 第四个参数为回调函数
        placeSearch.searchNearBy(
          tab,
          [
            this.mapMessage.location.longitude,
            this.mapMessage.location.latitude
          ],
          5000,
          (status, result) => {
            if (result.info === "OK") {
              let locationList = result.poiList.pois; // 周边地标建筑列表 // 生成地址列表html
              // 拿出周边的数据
              this.mapMessage.scenic = locationList;
              // 渲染点
              locationList.forEach((item, index) => {
                let circumMarker = new AMap.Marker({
                  title: item.name,
                  position: new AMap.LngLat(
                    item.location.lng,
                    item.location.lat
                  ) // 基点位置
                });
                this.circumMarker.push(circumMarker);
                this.map.add(circumMarker);
              });
            } else {
              console.log("获取位置信息失败!");
            }
          }
        );
      });
    },
    // 点击周边
    handleCircum(item) {
      this.circumMarker.forEach(item => {
        this.map.remove(item);
      });
      this.map.setCenter([item.location.lng, item.location.lat]);
      // 创建点标记对象
      let marker = new AMap.Marker({
        position: new AMap.LngLat(item.location.lng, item.location.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: item.name
      });
      // 将点标记存进周边信息对象里
      this.circumMarker.push(marker);
      // 在地图上画出点标记
      this.map.add(marker);
    }
  },
  watch: {
    mapMessage() {
      setTimeout(() => {
        var map = new AMap.Map("container", {
          zoom: 16, //级别
          center: [
            this.mapMessage.location.longitude,
            this.mapMessage.location.latitude
          ], //中心点坐标
          viewMode: "3D" //使用3D视图
        });
        // 拿出map对象
        this.map = map;
        // 显示酒店坐标
        var content =
          '<i class="el-icon-location" style="font-size:30px;color:#3993F8"></i>';

        var marker = new AMap.Marker({
          title: "酒店",
          content: content, // 自定义点标记覆盖物内容
          position: [
            this.mapMessage.location.longitude,
            this.mapMessage.location.latitude
          ] // 基点位置
        });
        map.add(marker);
        // 获取周边
        this.getCircum("风景");
      }, 0);
    }
  },
  mounted() {},
  beforeDestroy() {
    this.map.destroy();
  }
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
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    cursor: pointer;
  }
}
</style>