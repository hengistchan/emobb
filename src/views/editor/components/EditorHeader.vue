<template>
  <el-page-header class="editor-header-container" @back="() => router.back()">
    <template #icon>
      <el-icon><arrow-left-bold /></el-icon>
    </template>
    <template #content>
      <div
        class="editor-header-content w-full flex text-light-50 justify-center"
      >
        <div class="page-name">{{ title }}</div>
        <div class="page-actions"></div>
      </div>
    </template>
  </el-page-header>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { ArrowLeftBold } from "@element-plus/icons-vue";
  import { useRouter } from "vue-router";
  import useEditorStore from "@/store/editor";

  export default defineComponent({
    components: {
      ArrowLeftBold,
    },
    setup() {
      const editorStore = useEditorStore();
      const title = computed(() => editorStore.page?.title);
      const router = useRouter();
      return { router, title };
    },
  });
</script>

<style lang="scss">
  .editor-header-container {
    line-height: 50px;
    height: 100%;
    background-color: rgba(24, 24, 24, 1);
    color: rgba(253, 253, 253, 1);

    .editor-header-content {
      width: 100%;
      display: flex;
      color: rgba(253, 253, 253, 1);
      justify-content: center;
    }

    .el-page-header__content {
      width: 100%;
    }

    .page-name {
      transform: translateX(-50px);
    }
  }
</style>
