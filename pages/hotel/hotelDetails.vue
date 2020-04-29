<template>
  <div class="w">
    <!-- 页面详情开始 -->
    <div class="details">
      <div class="htmlRoute">
        <router-link to="#">酒店</router-link>
        <i class="el-icon-arrow-right"></i>
        <router-link to="#">广州酒店</router-link>
        <i class="el-icon-arrow-right"></i>
        <span>锦江之星(吴泾店)</span>
      </div>
      <div class="hotelMessage">
        <h3>锦江之星(吴泾店)</h3>
        <p>jin jiang zhi xing (sahng hai min hang wu jing dian)</p>
        <p>
          <i class="el-icon-location-information">
            <span>剑川路165号(近龙吴路)</span>
          </i>
        </p>
      </div>
    </div>
    <!-- 页面详情结束 -->
    <!-- 展示图开始 -->
    <div class="roomPhoto">
      <div class="main">
        <img src="https://jdc.jd.com/img/600" alt />
      </div>
      <div class="vice">
        <img src="https://jdc.jd.com/img/200" alt />
        <img src="https://jdc.jd.com/img/200" alt />
        <img src="https://jdc.jd.com/img/200" alt />
        <img src="https://jdc.jd.com/img/200" alt />
        <img src="https://jdc.jd.com/img/200" alt />
        <img src="https://jdc.jd.com/img/200" alt />
      </div>
    </div>
    <!-- 展示图结束 -->
    <!-- 价格区开始 -->
    <div class="priceMessage">
      <h3 class="tableHeader">
        <span>价格来源</span>
        <span>低价房型</span>
        <span>最低价格/每晚</span>
      </h3>
      <div class="tableContent">
        <p>
          <span>携程</span>
          <span>高级大床房A</span>
          <span>
            <span class="price">￥193</span>起
            <i class="el-icon-arrow-right"></i>
          </span>
        </p>
      </div>
    </div>
    <!-- 价格区结束 -->
    <!-- 地图开始 -->

    <!-- 地图结束 -->
    <!-- 房间基本信息开始 -->
    <div class="roomDetails">
      <p>
        <strong>基本信息</strong>
        <span>入住时间: 14:00之后</span>
        <span>离店时间: 12:00之前</span>
        <span>2010年开业/ 2010年装修</span>
        <span>酒店规模: 153间客房</span>
      </p>
      <p class="roomFacilities">
        <strong>主要设施</strong>
        <span>热水壶</span>
      </p>
      <p>
        <strong>停车服务</strong>
      </p>
      <p>
        <strong>品牌信息</strong>
      </p>
    </div>
    <!-- 房间基本信息结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tableData: [
      //   {
      //     mall: "2016-05-02",
      //     room: "王小虎",
      //     price: "上海市普陀区金沙江路 1518 弄"
      //   }
      // ]
    };
  }
};
</script>

<style scoped lang="less">
.w {
  width: 1000px;
  margin: 0 auto;
}
// 页面详情开始
.details {
  margin-bottom: 40px;
  .htmlRoute {
    margin: 15px 0;
    // font-family: "宋体";
    color: #606266;
    font-size: 18px;
    a {
      font-weight: 700;
      color: #000;
    }
  }
  .hotelMessage {
    h3 {
      margin-bottom: 5px;
      font-size: 26px;
      font-weight: 400;
    }
    p {
      font-size: 16px;
      color: #6f6f6f;
    }
  }
}
// 页面详情结束
// 展示图开始
.roomPhoto {
  display: flex;
  .main {
    margin-right: 20px;
    img {
      width: 580px;
      height: 350px;
      object-fit: cover;
    }
  }
  .vice {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img {
      margin-bottom: 10px;
      width: 195px;
      height: 110px;
      object-fit: cover;
    }
  }
}
// 展示图结束
// 价格区开始
.priceMessage {
  margin-top: 30px;
  line-height: 60px;
  span {
    width: 430px;
    color: #909399;
    &:last-child {
      width: 150px;
    }
  }
  .tableHeader {
    display: flex;
    border-bottom: 1px solid #ebeef5;
  }
  .tableContent {
    border-bottom: 1px solid #ebeef5;
    p {
      display: flex;
      .price,
      i {
        margin: 0 5px;
        color: #ff9900;
      }
    }
  }
}
// 价格区结束
// 房间基本信息开始
.roomDetails {
  margin: 40px 0 20px;
  p {
    display: flex;
    width: 100%;
    line-height: 80px;
    border-bottom: 1px solid #ebeef5;
    strong {
      width: 150px;
      font-weight: 400;
    }
    span {
      margin-right: 45px;
      color: #666666;
    }
  }
  .roomFacilities {
    span {
      margin-top: 19px;
      height: 40px;
      padding: 0 15px;
      border-radius: 15px;
      color: #666666;
      line-height: 40px;
      background: #eeeeee;
    }
  }
}
// 房间基本信息结束
</style>