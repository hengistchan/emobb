import {
  createTableProp,
  createInputProp,
  createSelectProp,
  createSwitchProp,
  createInputWithSymbolProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { Tickets } from "@element-plus/icons-vue";
import { ElForm } from "element-plus";
import {
  useSlots,
  renderSlot,
  provide,
  ref,
  InjectionKey,
  Ref,
  reactive,
  watch,
} from "vue";
import useEditor from "@/views/editor/hook/useEditor";
import { Nullable } from "types";

export type FormRef = Ref<InstanceType<typeof ElForm>>;

export default {
  name: "container",
  moduleName: "form",
  label: "表单容器",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component, models }) => {
    const slots = useSlots();

    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const model = reactive({});
    Object.values(models).reduce((prev, next) => {
      prev[next.name] = next.defaultValue ?? undefined;
      return prev;
    }, model as { [key: string]: any });
    provide("$$fromRef", formRef); // 表单引用
    provide("$$formModels", models); // 表单上的model
    provide("$$model", model); // 真实的model
    return () => (
      <ElForm
        {...props}
        style={{ ...styles, width: "100%" }}
        class="form form-container"
        ref={(el: InstanceType<typeof ElForm>) => (formRef.value = el)}
        model={model}
        inline={props.inline}
      >
        {renderSlot(slots, "default")}
      </ElForm>
    );
  },
  props: {
    "slots.default.children": createTableProp({
      label: "子组件ID",
    }),
    inline: createSwitchProp({
      label: "行内表单",
      defaultValue: false,
    }),
    labelPosition: createSelectProp({
      label: "标签位置",
      options: [
        { label: "左对齐", value: "left" },
        { label: "上对齐", value: "top" },
        { label: "右对齐", value: "right" },
      ],
      defaultValue: "left",
    }),
    labelSuffix: createInputProp({
      label: "标签后缀",
      defaultValue: "",
    }),
    size: createSelectProp({
      label: "表单尺寸",
      options: [
        { label: "大", value: "large" },
        { label: "默认", value: "default" },
        { label: "小", value: "small" },
      ],
      defaultValue: "large",
    }),
  },
  icon: Tickets,
  draggable: true,
} as EditorComponent;
