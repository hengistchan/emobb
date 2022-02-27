<script lang="tsx">
  import { computed, defineComponent, onUnmounted, ref } from "vue";
  import { DArrowLeft, DArrowRight, Delete } from "@element-plus/icons-vue";
  import useEditorStore from "@/store/editor";
  import useEditor from "../../hook/useEditor";
  import useHistoryEditor from "../../hook/useHistoryEditor";
  import Work from "@/api/work";
  import { getCurrentUUID } from "../../hook/useEditorInit";
  import { Page } from "@/package/types/page";
  import message from "@/helper/message";
  import useAutoSaveWork from "../../hook/useAutoSaveWork";

  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const { handleDelete } = useEditor();
      const { historyNext, historyPrev } = useHistoryEditor();
      const parent = computed(() => editorStore.parent);
      const currentComponent = computed(() => editorStore.currentComponent);
      const uuid = getCurrentUUID();
      const saveLoading = ref(false);
      const autoSave = useAutoSaveWork(saveLoading, 60000);
      onUnmounted(() => {
        autoSave();
      });
      const saveWorkContent = async () => {
        saveLoading.value = true;
        const { error } = await Work.saveWorkContent(uuid ?? "", {
          page: editorStore.page as Page,
        });
        if (!error) {
          message("success", "保存成功");
        }
        saveLoading.value = false;
      };
      const showPreview = ref(false);
      const onPreview = async () => {
        await saveWorkContent();
        showPreview.value = true;
      };
      return () => (
        <>
          <el-dialog
            title="预览页面"
            center={true}
            v-model={showPreview.value}
            width={"70%"}
            top={"3%"}
            append-to-body={true}
            destroy-on-close={true}
          >
            <div
              class="editor-preview"
              style={{
                height: editorStore.page?.props?.height ?? "670px",
              }}
            >
              <iframe
                src={`/preview/#/?id=${editorStore.uuid}`}
                frameborder="0"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </el-dialog>
          <div class="editor-toolbar">
            <div class="toolbar-left"></div>
            <div class="toolbar-right">
              <div class="toolbar-history">
                <el-button
                  type="primary"
                  plain
                  loading={saveLoading.value}
                  onClick={() => onPreview()}
                >
                  预览
                </el-button>
                <el-button
                  type="primary"
                  onClick={() => saveWorkContent()}
                  loading={saveLoading.value}
                >
                  保存
                </el-button>
                <el-tooltip effect="light" placement="top-start" content="撤销">
                  <el-button
                    plain={true}
                    icon={DArrowLeft}
                    onClick={() => historyPrev()}
                    disabled={editorStore.checkHistoryPrev}
                  ></el-button>
                </el-tooltip>
                <el-tooltip effect="light" placement="top-start" content="恢复">
                  <el-button
                    plain={true}
                    icon={DArrowRight}
                    onClick={() => historyNext()}
                    disabled={editorStore.checkHistpryNext}
                  ></el-button>
                </el-tooltip>
                <el-tooltip effect="light" placement="top-start" content="删除">
                  <el-button
                    disabled={
                      parent.value == null ||
                      currentComponent.value == null ||
                      currentComponent.value === ""
                    }
                    plain={true}
                    icon={Delete}
                    type="danger"
                    onClick={(e: Event) => {
                      e.stopPropagation();
                      handleDelete(e, null, null);
                    }}
                  ></el-button>
                </el-tooltip>
              </div>
            </div>
          </div>
        </>
      );
    },
  });
</script>

<style lang="scss">
  .editor-preview {
    width: 337px;
    margin: 0 auto;
    border: 1px solid black;
    .el-dialog__body {
      padding: 0;
    }
  }
  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .toolbar-right {
      margin-right: 10px;
      height: 100%;
      // background-color: #000;
      .toolbar-history {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
