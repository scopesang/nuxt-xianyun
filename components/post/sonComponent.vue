<template>
  <div class="son clearfix">
    <div class="user">
      {{data.account.nickname}}
      <span>{{moment(data.created_at).format('YYYY-MM-DD')}}</span>
    </div>
    <sonComponent :data="data.parent" v-if="data.parent" @reply="handleReply" />
    <div class="son-content">{{data.content}}</div>
    <div>
      <img
        v-for="(item,index) in data.pics"
        :key="index"
        :src="`http://157.122.54.189:9095`+item.url"
        alt
        style="width:80px;height:80px;padding-right:5px"
      />
    </div>
    <div class="cmt-ctrl">
      <a href="javascript:;" @click="handleReply(data)">回复</a>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "sonComponent",
  data() {
    return {
      moment
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    handleReply(data) {
      this.$emit("reply", data);
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
.son {
  border: 1px solid #ddd;
  padding: 3px;
  .user {
    padding: 5px;
    img {
      vertical-align: middle;
      width: 16px;
      height: 16px;
      margin: 0;
      border-radius: 50%;
      margin-right: 5px;
    }
    span {
      font-size: 12px;
      color: #99a6c4;
    }
  }
  .son-content {
    margin-top: 10px;
    word-wrap: break-word;
  }
  .cmt-ctrl {
    float: right;
    padding-right: 10px;
  }
}
.son > .cmt-ctrl {
  font-size: 14px;
  visibility: hidden;
}
.son:hover > .cmt-ctrl {
  visibility: initial;
}
</style>