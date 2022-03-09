import useMonacoEditor from "@/hook/useMonacoEditor";
import { useVModel } from "@vueuse/core";
import { ElButton, ElDialog } from "element-plus";
import { defineComponent, nextTick, ref } from "vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    class: {
      type: String,
      default: uuidv4().slice(0, 5),
    },
  },
  setup(props, ctx) {
    const { createEditor, updateVal, getEditor } = useMonacoEditor();
    const dialogVisible = ref(false);
    const dialogRef = ref<any | null>(null);
    const modelValue = useVModel(props, "modelValue", ctx.emit);
    const handleOpenInnerEditor = async (code: string) => {
      dialogVisible.value = true;
      await nextTick();
      const dom = dialogRef.value.$el.nextElementSibling.querySelector(
        `.a_${props.class}`,
      ) as HTMLElement;
      createEditor(dom);
      updateVal(code);
    };
    const handleCloseInnerEditor = () => {
      const code = getEditor()?.getValue();
      modelValue.value = code ?? modelValue.value;
      dialogVisible.value = false;
    };

    return () => (
      <>
        <ElDialog
          modelValue={dialogVisible.value}
          title={props.title}
          width="900px"
          top="3vh"
          onClose={() => handleCloseInnerEditor()}
          ref={(el: any) => (dialogRef.value = el)}
        >
          {{
            default: () => (
              <div
                class={`a_${props.class}`}
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
                  onClick={() => handleCloseInnerEditor()}
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
  },
});
