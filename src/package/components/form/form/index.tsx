import {
  createTableProp,
  createInputProp,
  createSelectProp,
  createSwitchProp,
  createInputWithSymbolProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { Tickets } from "@element-plus/icons-vue";
import { Form, CellGroup } from "vant";
import type { FormInstance } from "vant";
import { useSlots, renderSlot, provide, ref, Ref, reactive } from "vue";
import useEditor from "@/views/editor/hook/useEditor";
import { Nullable } from "types";

export type FormRef = Ref<FormInstance>;

export default {
  name: "container",
  moduleName: "form",
  label: "表单容器",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component, models }) => {
    const slots = useSlots();

    const formRef = ref<FormInstance | null>(null);
    const model = reactive({});
    Object.values(models).reduce((prev, next) => {
      next.name !== undefined &&
        (prev[next.name] = next.defaultValue ?? undefined);
      return prev;
    }, model as { [key: string]: any });
    provide("$$fromRef", formRef); // 表单引用
    provide("$$formModels", models); // 表单上的model
    provide("$$model", model); // 真实的model
    return () => (
      <Form
        {...props}
        style={{ ...styles, width: "100%" }}
        class="form form-container"
        ref={(el: FormInstance) => (formRef.value = el)}
        model={model}
      >
        {renderSlot(slots, "default")}
      </Form>
    );
  },
  props: {
    "slots.default.children": createTableProp({
      label: "子组件ID",
    }),
    labelWidth: createInputWithSymbolProp({
      label: "表单宽度",
      defaultValue: "6em",
    }),
    labelAlign: createSelectProp({
      label: "表单项对齐",
      options: [
        { label: "左", value: "left" },
        { label: "居中", value: "center" },
        { label: "右", value: "right" },
      ],
      defaultValue: "left",
    }),
    inputAlign: createSelectProp({
      label: "输入框对齐",
      options: [
        { label: "左", value: "left" },
        { label: "居中", value: "center" },
        { label: "右", value: "right" },
      ],
      defaultValue: "left",
    }),
    errorMessageAlign: createSelectProp({
      label: "错误消息对齐",
      options: [
        { label: "左", value: "left" },
        { label: "居中", value: "center" },
        { label: "右", value: "right" },
      ],
      defaultValue: "left",
    }),
    colon: createSwitchProp({
      label: "label添加冒号",
      defaultValue: false,
    }),
    disabled: createSwitchProp({
      label: "禁用输入",
      defaultValue: false,
    }),
    readonly: createSwitchProp({
      label: "只读",
      defaultValue: false,
    }),
  },
  icon: Tickets,
  draggable: true,
  order: 1,
} as EditorComponent;
