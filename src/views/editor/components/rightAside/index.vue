<template>
  <div class="editor-aside-container editor-right-aside">
    <el-tabs v-model="activeTab" class="tabs">
      <el-tab-pane label="属性和样式" name="attribute">
        <attribute />
      </el-tab-pane>
      <el-tab-pane label="事件" name="event">
        <event />
      </el-tab-pane>
      <el-tab-pane label="页面" name="page">
        <page />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import Attribute from "./Attribute.vue";
  import Page from "./Page.vue";
  import Event from "./CEvent.vue";

  export default defineComponent({
    components: {
      Attribute,
      Page,
      Event,
    },
    setup() {
      const activeTab = ref("attribute");
      return { activeTab };
    },
  });
</script>

<style lang="scss">
  .editor-right-aside {
    .el-form-item__label {
      padding: 0 12px;
      color: #7c848e;
    }
    .el-form-item__content {
      margin-right: 20px;
    }
    .el-form-item--default {
      margin-bottom: 10px;
    }
    .el-color-picker__color {
      border: 0;
    }
  }
</style>
