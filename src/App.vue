<template>
  <el-config-provider :message="{ max: 1 }">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
  import { RouterView } from "vue-router";
</script>

<style lang="scss">
  //body {
  //  #app {
  //    background-color: #000;
  //  }
  //}
</style>
