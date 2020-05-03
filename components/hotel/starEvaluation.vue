<template>
  <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
</template>

<script>
export default {
  props: ["stars"],
  data() {
    return {
      value: 3.7
    };
  },
  watch: {
    stars() {
      this.value = this.stars;
    }
  }
};
</script>

<style>
</style>