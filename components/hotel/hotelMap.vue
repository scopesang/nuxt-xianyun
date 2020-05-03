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
        <p v-for="(item,index) in mapMessage.scenic" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.distance}}米</span>
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
          zoom: 18, //级别
          center: [
            this.mapMessage.location.longitude,
            this.mapMessage.location.latitude
          ], //中心点坐标
          viewMode: "3D" //使用3D视图
        });

        // 显示酒店坐标
        var content = '<i class="el-icon-location" style="width:16px"></i>';

        var marker = new AMap.Marker({
          content: content, // 自定义点标记覆盖物内容
          position: [
            this.mapMessage.location.longitude,
            this.mapMessage.location.latitude
          ] // 基点位置
        });
        map.add(marker);
        AMap.service(["AMap.PlaceSearch"], () => {
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
            "",
            [
              this.mapMessage.location.longitude,
              this.mapMessage.location.latitude
            ],
            1000,
            (status, result) => {
              if (result.info === "OK") {
                let locationList = result.poiList.pois; // 周边地标建筑列表 // 生成地址列表html
                console.log(locationList);
                // 拿出周边景点的数据
                this.mapMessage.scenic = locationList;
                // 渲染点
                locationList.forEach((item, index) => {
                  let content = `<div class="marker-route marker-marker-bus-from">${index}</div>`;
                  let marker = new AMap.Marker({
                    // content: content, // 自定义点标记覆盖物内容
                    title: item.name,
                    position: new AMap.LngLat(
                      item.location.lng,
                      item.location.lat
                    ) // 基点位置
                  });
                  map.add(marker);
                });
              } else {
                console.log("获取位置信息失败!");
              }
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
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    cursor: pointer;
  }
}
</style>