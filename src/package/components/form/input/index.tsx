import { createInputProp } from "@/package/helper/CreateProps";
import { EditorComponent, Model } from "@/package/types/component";
import { Tickets } from "@element-plus/icons-vue";
import { ElInput } from "element-plus";
import { v4 as uuidv4 } from "uuid";
import useFormItem, { formItemProps } from "@/package/helper/useFormItem";

export default {
  name: "input",
  moduleName: "form",
  label: "输入框",
  preview: () => <p>输入框</p>,
  render: ({ props, id }) => {
    const { model, FormItemWrapper } = useFormItem(props, id);
    return () => (
      <FormItemWrapper props={props}>
        <ElInput v-model={model[props.prop]}></ElInput>
      </FormItemWrapper>
    );
  },
  props: {
    prop: createInputProp({
      label: "字段绑定",
      defaultValue: uuidv4().slice(0, 5),
      required: true,
    }),
    default: createInputProp({
      label: "默认值",
      defaultValue: "",
    }),
    ...formItemProps,
  },
  icon: Tickets,
  draggable: true,
} as EditorComponent;
