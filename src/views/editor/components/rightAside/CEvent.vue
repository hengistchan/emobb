<script lang="tsx">
  import { computed, defineComponent, nextTick, reactive, ref } from "vue";
  import useEditorStore from "@/store/editor";
  import IconHelper from "@/package/helper/IconHelper";
  import useMonacoEditor from "@/hook/useMonacoEditor";
  import { Action } from "@/package/types/component";
  import { v4 as uuidv4 } from "uuid";

  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const isEdit = ref(false);
      const dialogVisible = ref(false);
      const { createEditor, updateVal, getEditor } = useMonacoEditor();
      const form = ref<Action>({
        key: "",
        event: "",
        name: "",
        code: "",
      });
      const events = computed(() => {
        if (editorStore.currentComponent) {
          return editorStore.componentMap[editorStore.currentComponent].events;
        }
        return [];
      });
      const actions = computed(() => {
        if (editorStore.currentComponent) {
          return editorStore.componentMap[editorStore.currentComponent].actions;
        }
        return {};
      });
      let currentAction: Action | null = null;
      const handleOpenDialog = async (
        edit: boolean,
        event: string | null,
        action?: Action,
      ) => {
        // 判断是否是编辑
        if (edit) {
          currentAction = { ...(action as Action) };
          form.value = action as Action;
        } else {
          form.value = {
            key: uuidv4().slice(0, 5),
            event: event as string,
            name: "",
            code: "",
          };
        }
        dialogVisible.value = true;
        isEdit.value = edit;
        await nextTick();
        const dom = document.querySelector(".editor-manaco") as HTMLElement;
        createEditor(dom);
        updateVal(form.value.code);
      };
      const handleCloseDialog = () => {
        const code = getEditor()?.getValue();
        form.value.code = code ?? form.value.code;
        if (isEdit.value) {
          currentAction &&
            delete actions.value[currentAction.event][currentAction.name];
        }
        actions.value[form.value.event][form.value.name] = form.value;
        dialogVisible.value = false;
      };
      return () => (
        <>
          <el-dialog
            v-model={dialogVisible.value}
            title={isEdit.value ? "编辑行为" : "添加行为"}
            width="900px"
            top={"3vh"}
          >
            {{
              default: () => (
                <el-form label-position="top" label-width={120} model={form}>
                  <el-form-item label="行为名称">
                    <el-input
                      v-model={form.value.name}
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="代码">
                    <div class="editor-manaco"></div>
                  </el-form-item>
                </el-form>
              ),
              footer: () => (
                <>
                  <el-button
                    type="danger"
                    onClick={() => (dialogVisible.value = false)}
                  >
                    取消
                  </el-button>
                  <el-button type="primary" onClick={() => handleCloseDialog()}>
                    保存
                  </el-button>
                </>
              ),
            }}
          </el-dialog>
          {events.value.length !== 0 ? (
            <div class="editor-right-events">
              {events.value.map((event) => (
                <div class="event">
                  <div class="event-name-add">
                    <div class="name">{event.label}</div>
                    <div class="add">
                      <el-button
                        type="primary"
                        size="small"
                        onClick={() => handleOpenDialog(false, event.value)}
                      >
                        添加行为
                      </el-button>
                    </div>
                  </div>
                  <div class="actions">
                    {actions.value[event.value] &&
                      Object.values(actions.value[event.value]).map(
                        (action) => (
                          <div class="action">
                            <div class="action-name">{action.name}</div>
                            <div class="action-action">
                              <div
                                onClick={() =>
                                  handleOpenDialog(true, null, action)
                                }
                              >
                                {IconHelper("mdi:playlist-edit", 24)}
                              </div>
                              <div
                                onClick={() =>
                                  delete actions.value[event.value][action.name]
                                }
                              >
                                {IconHelper(
                                  "mdi:delete-sweep-outline",
                                  24,
                                  "#c53838",
                                )}
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <el-empty description="no data"></el-empty>
          )}
        </>
      );
    },
  });
</script>

<style lang="scss">
  .editor-manaco {
    width: 100%;
    height: 50vh;
    * {
      // touch-action: none;
    }
  }

  .editor-right-events {
    .el-dialog__header {
      text-align: center;
    }
    .event {
      .event-name-add {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f3f3f3;
        .name {
          margin-left: 7px;
        }
        .add {
          margin-right: 16px;
        }
      }
      .actions {
        padding: 16px;
        .action {
          width: 100%;
          height: 30px;
          line-height: 30px;
          display: flex;
          font-size: 15px;
          justify-content: space-between;

          &:hover {
            background-color: #f4f4f4;
          }

          .action-name {
            margin-left: 10px;
          }
          .action-action {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            line-height: 1;

            i {
              border-radius: 5px;
              margin-right: 5px;
              padding: 2.6px;
              &:last-child {
                margin-right: 0;
              }
              &:hover {
                cursor: pointer;
                background-color: rgba($color: #000000, $alpha: 0.3);
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .el-dialog__body {
    padding-bottom: 3px;
  }
</style>
