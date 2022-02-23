<template>
  <el-container
    v-loading.body="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="editor-container"
  >
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
  import { defineComponent, onMounted, ref } from "vue";
  import EditorHeader from "./components/EditorHeader.vue";
  import EditorLeftAside from "./components/leftAside/index.vue";
  import EditorRightAside from "./components/rightAside/index.vue";
  import EditorMain from "./components/main/index.vue";
  import useHotKey from "./hook/useHotKey";
  import message from "@/helper/message";
  import useEditorStore from "@/store/editor";
  import { useRoute, useRouter } from "vue-router";
  import Work from "@/api/work";
  import { Page } from "@/package/types/page";

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
      const loading = ref(true);
      const svg = `<path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`;
      const editorStore = useEditorStore();
      const route = useRoute();
      const router = useRouter();
      const uuid = route.query?.id as string;
      if (uuid == null) {
        message("error", "请求的id不存在！");
      }
      onMounted(async () => {
        const { error, ...data } = await Work.getDetailByUUID(uuid);
        if (error) {
          router.push("/");
        } else {
          editorStore.registerStore(data.page as Page);
        }
        loading.value = false;
      });
      return {
        loading,
        svg,
      };
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
