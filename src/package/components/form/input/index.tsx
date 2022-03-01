import {
  createTableProp,
  createInputProp,
  createSelectProp,
  createInputWithSymbolProp,
  createSwitchProp,
} from "@/package/helper/CreateProps";
import { EditorComponent, Model } from "@/package/types/component";
import { Tickets } from "@element-plus/icons-vue";
import { ElFormItem, ElInput } from "element-plus";
import { v4 as uuidv4 } from "uuid";
import {
  useSlots,
  renderSlot,
  provide,
  ref,
  InjectionKey,
  Ref,
  inject,
  watch,
} from "vue";
import useEditor from "@/views/editor/hook/useEditor";
import { Nullable } from "types";
import { FormRef } from "../form";
import { useVModel } from "@vueuse/core";
import useFormItem from "@/package/helper/useFormItem";

export default {
  name: "input",
  moduleName: "form",
  label: "输入框",
  preview: () => <p>输入框</p>,
  render: ({ props, styles, component, models, id }) => {
    const { model } = useFormItem(props, id);
    return () => (
      <ElFormItem
        prop={props.prop}
        label={props.label}
        labelWidth={props.labelWidth}
        required={props.required}
        inlineMessage={props.inlineMessage}
      >
        <ElInput v-model={model[props.prop]}></ElInput>
      </ElFormItem>
    );
  },
  props: {
    prop: createInputProp({
      label: "字段绑定",
      defaultValue: uuidv4().slice(0, 5),
      required: true,
    }),
    label: createInputProp({
      label: "标签",
      defaultValue: "输入字段",
    }),
    required: createSwitchProp({
      label: "是否必须",
      defaultValue: false,
    }),
    labelWidth: createInputWithSymbolProp({
      label: "标签宽度",
      defaultValue: "60px",
    }),
    inlineMessage: createSwitchProp({
      label: "行内错误",
      defaultValue: false,
    }),
    default: createInputProp({
      label: "默认值",
      defaultValue: "",
    }),
  },
  icon: Tickets,
  draggable: true,
} as EditorComponent;
