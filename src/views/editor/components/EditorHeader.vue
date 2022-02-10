<template>
  <el-page-header class="editor-header-container h-full bg-dark-800 text-light-50">
    <template v-slot:icon>
      <el-icon><arrow-left-bold /></el-icon>
    </template>
    <template v-slot:content>
      <div class="w-full flex text-light-50 justify-center">
        <div class="page-name">test</div>
        <div class="page-actions"></div>
      </div>
    </template>
  </el-page-header>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { ArrowLeftBold } from "@element-plus/icons-vue";

  export default defineComponent({
    components: {
      ArrowLeftBold,
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="scss">
  .editor-header-container {
    line-height: 50px;

    .el-page-header__content {
      width: 100%;
    }
  }
</style>
