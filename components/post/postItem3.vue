<template>
  <div class="recommend-list">
    <nuxt-link :to="'/post/detail?id='+data.id">
      <div class="post-img clearfix">
        <img :src="item" v-for="(item,index) in data.images" :key="index" alt />
      </div>
      <div class="post-text">
        <div>{{data.title}}</div>
        <p>{{moment(data.created_at).format('YYYY-MM-DD')}} 阅读{{data.watch}}</p>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data()
  {
    return{
      moment
    }
  },
  props: {
    data: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped>
.clearfix::after {
  content: "";
  height: 0;
  clear: both;
  display: block;
  visibility: hidden;
}
.recommend-list {
  .post-img {
    padding: 20px 10px 0 0;
    width: 100%;
    img {
      float: left;
      margin: 0 5px 0 0;
      width: 85px;
      height: 80px;
    }
  }
  .post-text {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    p {
      margin-top: 15px;
      font-size: 12px;
      color: #9999b3;
    }
  }
}
</style>