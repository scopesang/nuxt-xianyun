<template>
  <el-rate v-model="stars" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
</template>

<script>
export default {
  props: ["stars"],
  data() {
    return {
      value: 3.7
    };
  }
};
</script>

<style>
</style>