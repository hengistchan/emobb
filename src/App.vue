<template>
  <router-view />
</template>

<script setup lang="ts">
  import { RouterView } from "vue-router";
  import useEditorStore from "@/store/editor";
  import useEditor from "@/views/editor/hook/useEditor";

  // 初始化数据
  // const editorStore = useEditorStore();
  // const { createNewPage } = useEditor();
  // editorStore.page = createNewPage({ title: "新页面" });
</script>

<style lang="scss">
  //body {
  //  #app {
  //    background-color: #000;
  //  }
  //}
</style>
