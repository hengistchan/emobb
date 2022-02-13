<template>
  <div class="editor-aside-container">
    <el-tabs v-model="activeTab" class="tabs">
      <el-tab-pane label="属性" name="attribute">
        <attribute />
      </el-tab-pane>
      <el-tab-pane label="样式" name="styles"> </el-tab-pane>
      <el-tab-pane label="页面" name="page"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import Attribute from "@/views/editor/components/rightAside/Attribute.vue";

  export default defineComponent({
    components: {
      Attribute,
    },
    setup() {
      const activeTab = ref("attribute");
      return { activeTab };
    },
  });
</script>

<style lang="scss"></style>
