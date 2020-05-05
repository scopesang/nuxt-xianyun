<template>
  <div class="w">
    <!-- 页面详情开始 -->
    <div class="details">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="htmlRoute">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel?city='+hotel.city.id }">{{hotel.real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{hotel.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 页面详情结束 -->
    <!-- 展示图开始 -->
    <div class="roomPhoto">
      <div class="main">
        <img :src="showHotelImg" alt />
      </div>
      <div class="vice">
        <img :src="item" alt v-for="(item,index) in hotelImgs" :key="index" @click="showImg(item)" />
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
        <p v-for="(item,index) in hotel.products" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.bestType}}</span>
          <span>
            <span class="price">￥{{item.price}}</span>起
            <i class="el-icon-arrow-right"></i>
          </span>
        </p>
      </div>
    </div>
    <!-- 价格区结束 -->
    <!-- 地图开始 -->
    <hotelMap :mapMessage="hotel"></hotelMap>
    <!-- 地图结束 -->
    <!-- 房间基本信息开始 -->
    <div class="roomDetails">
      <p>
        <strong>基本信息</strong>
        <span>入住时间: 14:00之后</span>
        <span>离店时间: 12:00之前</span>
        <span>{{hotel.creation_time}}/ {{hotel.renovat_time}}</span>
        <span>酒店规模: 153间客房</span>
      </p>
      <!-- <p class="roomFacilities">
        <strong>主要设施</strong>
        <span>热水壶</span>
      </p>-->
      <p
        v-for="(item,index) in hotel.hotelassets"
        :key="index"
        :class="item.type.includes('设施')?'roomFacilities':''"
      >
        <strong>{{item.type}}</strong>
        <span>{{item.name}}</span>
      </p>
    </div>
    <!-- 房间基本信息结束 -->
    <!-- 评论开始 -->
    <div class="remarks">
      <h4>{{hotel.num_collected}}条用户真实评论</h4>
      <div>
        <ul>
          <li>总评数: {{hotel.all_remarks}}</li>
          <li>好评数: {{hotel.good_remarks + hotel.very_good_remarks}}</li>
          <li>差评数: {{hotel.bad_remarks + hotel.very_bad_remarks}}</li>
        </ul>
        <starEvaluation class="star" :stars="hotel.stars"></starEvaluation>
        <rating text="环境" :scores="hotel.scores.environment"></rating>
        <rating text="产品" :scores="hotel.scores.product"></rating>
        <rating text="服务" :scores="hotel.scores.service"></rating>
      </div>
    </div>
    <!-- 评论结束 -->
  </div>
</template>

<script>
import hotelMap from "@/components/hotel/hotelMap";
import rating from "@/components/hotel/rating";
import starEvaluation from "@/components/hotel/starEvaluation";

export default {
  data() {
    return {
      hotel: { scores: Object, city: Object },
      // 图片路径
      hotelImgs: [
        "https://ccm.ddcdn.com/ext/photo-w/12/8b/7e/4a/deluxe-twin-bed.jpg",
        "https://ccm.ddcdn.com/ext/photo-s/15/a5/c3/28/male-dormitory-2-beds.jpg",
        "https://ccm.ddcdn.com/ext/photo-s/0e/e6/fb/bc/living-room.jpg",
        "https://ccm.ddcdn.com/ext/photo-s/0f/3a/9e/b9/caption.jpg",
        "https://ccm.ddcdn.com/ext/photo-s/0c/ec/b3/14/caption.jpg",
        "https://ccm.ddcdn.com/ext/photo-w/15/9e/00/ce/lobby.jpg"
      ],
      // 主要展示的图片路径
      showHotelImg: "",
      // 页面路径信息
      BreadCrumbs: []
    };
  },
  methods: {
    // 变换展示的图片
    showImg(item) {
      this.showHotelImg = item;
    }
  },
  mounted() {
    // 获取酒店id
    let id = this.$route.query.id;
    // 请求数据
    this.$axios({
      url: "/hotels",
      params: {
        id: id
      }
    }).then(res => {
      // 把酒店数据拿出来
      this.hotel = res.data.data[0];
      // 设置第一张展示的图片
      this.showHotelImg = this.hotelImgs[0];
      let arr = this.hotel.breadcrumb;
      // 拿出页面面包屑
      this.BreadCrumbs = this.hotel.breadcrumb.split(">");
    });
  },
  components: {
    hotelMap,
    rating,
    starEvaluation
  }
};
</script>

<style scoped lang="less">
.w {
  width: 1000px;
  margin: 0 auto;
}
// 页面详情开始
/deep/.details {
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
      cursor: pointer;
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
// 评论开始
.remarks {
  margin: 50px 0;
  h4 {
    margin: 25px 0;
    font-size: 18px;
  }

  > div {
    display: flex;
    ul {
      li {
        line-height: 1.5;
      }
    }
    /deep/.star {
      margin-top: 34px;
      margin-left: 75px;
    }
    div {
      margin: 0 30px;
    }
  }
}
// 评论结束
</style>