<template>
  <el-container class="editor-main-container">
    <el-header class="editor-main-header">
      <tool-bar />
    </el-header>
    <el-main class="editor-main-area">
      <simulator-editor />
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import ToolBar from "./Toolbar.vue";
  import SimulatorEditor from "./Main.vue";

  export default defineComponent({
    components: {
      ToolBar,
      SimulatorEditor,
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="scss">
  .editor-main-container {
    height: 100%;

    .editor-main-header {
      height: 40px;
      background-color: #fdfdfd;
      position: relative;

      &::after {
        content: "";
        width: 100%;
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: #e4e7ed;
      }
    }

    .editor-main-area {
    }
  }
</style>
