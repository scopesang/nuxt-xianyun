<template>
  <div class="recommend-list">
   <nuxt-link :to="'/post/detail?id='+data.id">
      <div class="post-text">
        <div>{{data.title}}</div>
        <p>{{moment(data.updated_at).format('YYYY-MM-DD')}} 阅读{{data.watch}}</p>
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
  props:{
    data:{
      type:Object
    }
  }
};
</script>

<style lang="less" scoped>
.recommend-list {
  .post-text {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    p {
      margin-top: 30px;
      font-size: 12px;
      color: #9999b3;
    }
  }
  .post-img {
    padding: 20px 10px 0 0;
    float: left;
    img {
      margin: 0;
      width: 85px;
      height: 80px;
    }
  }
}
</style>