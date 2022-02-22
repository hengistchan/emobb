<script lang="tsx">
  import { computed, defineComponent } from "vue";
  import { DArrowLeft, DArrowRight, Delete } from "@element-plus/icons-vue";
  import useEditorStore from "@/store/editor";
  import useEditor from "../../hook/useEditor";
  import useHistoryEditor from "../../hook/useHistoryEditor";

  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const { handleDelete } = useEditor();
      const { historyNext, historyPrev } = useHistoryEditor();
      const parent = computed(() => editorStore.parent);
      const currentComponent = computed(() => editorStore.currentComponent);
      return () => (
        <div class="editor-toolbar">
          <div class="toolbar-left"></div>
          <div class="toolbar-right">
            <div class="toolbar-history">
              <el-button
                plain={true}
                icon={DArrowLeft}
                onClick={() => historyPrev()}
                disabled={editorStore.checkHistoryPrev}
              ></el-button>
              <el-button
                plain={true}
                icon={DArrowRight}
                onClick={() => historyNext()}
                disabled={editorStore.checkHistpryNext}
              ></el-button>
              <el-button
                disabled={
                  parent.value == null &&
                  (currentComponent.value == null ||
                    currentComponent.value === "")
                }
                plain={true}
                icon={Delete}
                type="danger"
                onClick={(e: Event) => {
                  e.stopPropagation();
                  handleDelete(e, null, null);
                }}
              ></el-button>
            </div>
          </div>
        </div>
      );
    },
  });
</script>

<style lang="scss">
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
