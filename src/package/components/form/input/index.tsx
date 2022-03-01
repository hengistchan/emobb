import {
  createTableProp,
  createInputProp,
  createSelectProp,
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
      <ElFormItem prop={props.prop}>
        <ElInput v-model={model[props.prop]}></ElInput>
      </ElFormItem>
    );
  },
  props: {
    prop: createInputProp({
      label: "字段绑定",
      defaultValue: uuidv4().slice(0, 5),
    }),
  },
  icon: Tickets,
  draggable: true,
} as EditorComponent;
