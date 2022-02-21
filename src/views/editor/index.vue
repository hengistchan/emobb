<template>
  <el-container class="editor-container">
    <el-header height="50px">
      <!-- 编辑器头部 -->
      <editor-header></editor-header>
    </el-header>
    <el-container>
      <!-- 编辑器侧边栏 -->
      <el-aside width="280px" class="editor-aside">
        <editor-left-aside />
      </el-aside>
      <!-- 编辑器主编辑区 -->
      <el-main>
        <editor-main />
      </el-main>
      <el-aside width="360px" class="editor-aside">
        <editor-right-aside />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import EditorHeader from "./components/EditorHeader.vue";
  import EditorLeftAside from "./components/leftAside/index.vue";
  import EditorRightAside from "./components/rightAside/index.vue";
  import EditorMain from "./components/main/index.vue";
  import useHotKey from "./hook/useHotKey";

  // console.log(componentModules);

  export default defineComponent({
    components: {
      EditorHeader,
      EditorLeftAside,
      EditorMain,
      EditorRightAside,
    },
    setup() {
      useHotKey();
      return {};
    },
  });
</script>

<style lang="scss">
  .editor-container {
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    .editor-aside {
      height: calc(100vh - 50px);
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .editor-aside-container {
      height: 100%;
      width: 100%;
      background-color: rgba(253, 253, 253, 1);
    }

    .el-main {
      padding: 0;
    }
  }
</style>
