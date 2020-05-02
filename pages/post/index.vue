<template>
  <main id="post">
    <banner></banner>
    <indexItem :data="ItemDate"></indexItem>
  </main>
</template>

<script>
import banner from "@/components/post/banner.vue";
import indexItem from "@/components/post/index-item.vue";
export default {
  data() {
    return {
      input: "",
      ItemDate: ""
    };
  },
  mounted() {
    this.getDate();
  },
  watch: {
    $route(to, from) {
      if (to.query) {
        this.getDate(to.query);
      }
    }
  },
  methods: {
    getDate(data) {
      this.$axios({
        url: "/posts",
        params: data
      }).then(res => {
        this.ItemDate = res.data.data;
        console.log(res);
      });
    }
  },
  components: {
    indexItem,
    banner
  }
};
</script>
<style lang="less" scoped >
#post {
  position: relative;
  min-width: 2100px;
}
</style> 