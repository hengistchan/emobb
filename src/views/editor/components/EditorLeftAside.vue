<template>
  <div class="editor-aside-container bg-light-50 w-full">
    <el-tabs v-model="activeTab" class="tabs">
      <el-tab-pane label="组件列表" name="component-list">
        <component-list></component-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import ComponentList from "./ComponentList.vue";

  const activeTab = ref("component-list");
</script>

<style lang="scss"></style>
