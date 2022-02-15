<template>
  <router-view />
</template>

<script setup lang="ts">
  import { RouterView } from "vue-router";
  import useEditorStore from "@/store/editor";
  import useEditor from "@/views/editor/hook/useEditor";
  import { Vue } from ".pnpm/vue-demi@0.12.1_vue@3.2.30/node_modules/vue-demi";

  // 初始化数据
  const editorStore = useEditorStore();
  const { createNewPage } = useEditor();
  editorStore.page = createNewPage({ title: "新页面" });
</script>

<style lang="scss">
  //body {
  //  #app {
  //    background-color: #000;
  //  }
  //}
</style>
