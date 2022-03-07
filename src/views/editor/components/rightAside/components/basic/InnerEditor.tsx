import useMonacoEditor from "@/hook/useMonacoEditor";
import { useVModel } from "@vueuse/core";
import { ElButton, ElDialog } from "element-plus";
import { defineComponent, nextTick, Ref, ref } from "vue";

const useInnerEditor = () => {
  const { createEditor, updateVal, getEditor } = useMonacoEditor();
  const dialogVisible = ref(false);
  const handleOpenInnerEditor = async (code: string) => {
    dialogVisible.value = true;
    await nextTick();
    const dom = document.querySelector(".editor-rules") as HTMLElement;
    createEditor(dom);
    updateVal(code);
  };
  const handleCloseInnerEditor = (modelValue: Ref<string>) => {
    const code = getEditor()?.getValue();
    modelValue.value = code ?? modelValue.value;
    dialogVisible.value = false;
  };
  const InnerEditor = (props: any, ctx: any) => {
    const modelValue = useVModel(props, "modelValue", ctx.emit);
    return (
      <>
        <ElDialog
          modelValue={dialogVisible.value}
          title={props.title}
          width="900px"
          top="3vh"
        >
          {{
            default: () => (
              <div
                class={"editor-rules"}
                style={{ width: "100%", height: "50vh" }}
              ></div>
            ),
            footer: () => (
              <>
                <ElButton
                  type="danger"
                  onClick={() => (dialogVisible.value = false)}
                >
                  取消
                </ElButton>
                <ElButton
                  type="primary"
                  onClick={() => handleCloseInnerEditor(modelValue)}
                >
                  保存
                </ElButton>
              </>
            ),
          }}
        </ElDialog>
        <ElButton
          type="primary"
          size="small"
          onClick={() => handleOpenInnerEditor(modelValue.value)}
        >
          打开编辑器
        </ElButton>
      </>
    );
  };
  return { InnerEditor };
};

export default useInnerEditor;
