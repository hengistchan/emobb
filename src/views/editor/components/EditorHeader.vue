<template>
  <el-dialog
    v-model="showDialog"
    title="发布作品"
    top="20vh"
    width="900px"
    :append-to-body="false"
  >
    <div class="work-on-save-dialog-container">
      <div class="left">
        <div class="name">网页快照</div>
        <div class="image">
          <el-image
            :src="image"
            height="250px"
            :preview-src-list="[image]"
          ></el-image>
        </div>
      </div>
      <div class="right">
        <div class="name">发布作品</div>
        <div class="form">
          <el-form label-width="90px" label-position="left">
            <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                v-model="form.description"
                type="textarea"
                :rows="6"
              ></el-input>
            </el-form-item>
            <el-form-item label="发布为模板">
              <el-switch v-model="form.is_template"></el-switch>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button type="danger" size="large" @click="showDialog = false"
        >取消</el-button
      >
      <el-button type="primary" @click="handlePublish">发布</el-button>
    </template>
  </el-dialog>
  <el-page-header class="editor-header-container" @back="() => router.back()">
    <template #icon>
      <el-icon><arrow-left-bold /></el-icon>
    </template>
    <template #content>
      <div class="editor-header-content">
        <div class="page-name">{{ title }}</div>
        <div class="page-actions">
          <el-button type="primary" :loading="loading" @click="handleOpenDialog"
            >发布作品</el-button
          >
        </div>
      </div>
    </template>
  </el-page-header>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from "vue";
  import { ArrowLeftBold } from "@element-plus/icons-vue";
  import { useRouter } from "vue-router";
  import useEditorStore from "@/store/editor";
  import Work from "@/api/work";
  import message from "@/helper/message";
  import domtoimage from "dom-to-image";
  import { Page } from "@/package/types/page";
  import { blobToFile } from "@/helper/domHelper";
  import { uploadSingleFile } from "@/helper/uploadHelper";

  const editorStore = useEditorStore();
  const title = computed(() => editorStore.page?.title);
  const router = useRouter();
  const loading = ref(false);
  const showDialog = ref(false);
  const image = ref("");
  const form = reactive({
    title: "",
    description: "",
    is_template: false,
  });
  const handleOpenDialog = async () => {
    form.title = editorStore.page?.title ?? "";
    loading.value = true;
    const dom = document.querySelector(
      ".simulator-editor > .drag-area",
    ) as HTMLElement;
    if (dom == null) {
      loading.value = false;
      message("error", "获取作品dom元素失败");
      return;
    }
    try {
      const blob = await domtoimage.toBlob(dom);
      const file = await blobToFile(blob);
      const res = await uploadSingleFile(file);
      image.value = res[0].path;
      showDialog.value = true;
    } catch (err) {
      console.log(err);
      message("error", "unknow error");
    }
    loading.value = false;
  };
  const handlePublish = async () => {
    if (editorStore.uuid == null) {
      message("error", "获取作品UUID失败");
      return;
    }
    try {
      const { error: error0, message: msg0 } = await Work.saveWorkContent(
        editorStore.uuid,
        { page: editorStore.page as Page },
      );
      if (error0) {
        message("error", msg0);
        return;
      }
      const { error: error1, message: msg1 } = await Work.publish(
        editorStore.uuid,
        { ...form, cover_img: image.value },
      );
      if (!error1) {
        message("success", msg1);
      }
      showDialog.value = false;
    } catch (err) {
      console.log(err);
      message("error", "unknow error");
    }
  };
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
  .el-header {
    .el-dialog__body {
      padding-top: 0;
    }
  }
  .work-on-save-dialog-container {
    display: flex;
    width: 100%;
    height: 500px;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: column;
      width: 350px;
      height: 100%;
      .name {
        padding-bottom: 10px;
      }
      .image {
        overflow: hidden;
        height: 100%;
        .el-image {
          overflow: hidden;
          img {
            width: 268px;
            height: 550px;
          }
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      width: 60%;
      height: 100%;
      .name {
        padding-bottom: 10px;
      }
    }
  }
</style>
