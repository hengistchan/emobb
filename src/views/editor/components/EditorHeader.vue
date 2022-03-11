<template>
  <el-page-header class="editor-header-container" @back="() => router.back()">
    <template #icon>
      <el-icon><arrow-left-bold /></el-icon>
    </template>
    <template #content>
      <div class="editor-header-content">
        <div class="page-name">{{ title }}</div>
        <div class="page-actions">
          <el-button type="primary" @click="handlePublish">发布作品</el-button>
        </div>
      </div>
    </template>
  </el-page-header>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { ArrowLeftBold } from "@element-plus/icons-vue";
  import { useRouter } from "vue-router";
  import useEditorStore from "@/store/editor";
  import Work from "@/api/work";
  import message from "@/helper/message";
  import domtoimage from "dom-to-image";

  export default defineComponent({
    components: {
      ArrowLeftBold,
    },
    setup() {
      const editorStore = useEditorStore();
      const title = computed(() => editorStore.page?.title);
      const router = useRouter();
      const handlePublish = async () => {
        if (editorStore.uuid == null) {
          message("error", "获取作品UUID失败");
          return;
        }
        const dom = document.querySelector(
          ".simulator-editor > .drag-area",
        ) as HTMLElement;
        if (dom == null) {
          message("error", "获取作品dom元素失败");
          return;
        }
        try {
          const png = await domtoimage.toPng(dom);
          const { error, message: msg } = await Work.publish(editorStore.uuid);
          if (!error) {
            message("success", msg);
          }
        } catch (err) {
          console.log(err);
          message("error", "unknow error");
        }
      };
      return { router, title, handlePublish };
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
      // display: flex;
      color: rgba(253, 253, 253, 1);
      // justify-content: center;
    }

    .el-page-header__content {
      width: 100%;
      text-align: center;
    }

    .page-name {
      transform: translateX(-150%);
      display: inline-block;
    }

    .page-actions {
      float: right;
      padding-right: 20px;
    }
  }
</style>
