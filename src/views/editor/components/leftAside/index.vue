<template>
  <div class="editor-aside-container">
    <el-tabs v-model="activeTab" class="tabs">
      <el-tab-pane label="组件列表" name="component-list">
        <component-list></component-list>
      </el-tab-pane>
    </el-tabs>
    <component-tree></component-tree>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import ComponentList from "./ComponentList.vue";
  import ComponentTree from "./ComponentTree.vue";

  const activeTab = ref("component-list");
</script>

<style lang="scss">
  .editor-aside-container {
    position: relative;
  }
</style>
