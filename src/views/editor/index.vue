<template>
  <el-container class="editor-container flex-col h-full">
    <el-header height="50px" style="--el-header-padding: 0">
      <!-- 编辑器头部 -->
      <editor-header></editor-header>
    </el-header>
    <el-container>
      <!-- 编辑器侧边栏 -->
      <el-aside width="280px">
        <editor-left-aside />
      </el-aside>
      <!-- 编辑器主编辑区 -->
      <el-main>
        <editor-main />
      </el-main>
      <el-aside width="280px">
        <editor-right-aside />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import EditorHeader from "./components/EditorHeader.vue";
  import EditorLeftAside from "./components/EditorLeftAside.vue";
  import EditorRightAside from "./components/EditorRightAside.vue";
  import EditorMain from "./components/EditorMain.vue";
  import componentModules from "@/package";

  console.log(componentModules);

  export default defineComponent({
    components: {
      EditorHeader,
      EditorLeftAside,
      EditorMain,
      EditorRightAside,
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="scss">
  .editor-container {
    .editor-aside-container {
      height: 100%;
    }
  }
</style>
