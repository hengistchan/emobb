import { createInputProp } from "@/package/helper/CreateProps";
import { EditorComponent, Model } from "@/package/types/component";
import { ElInput } from "element-plus";
import { v4 as uuidv4 } from "uuid";
import useFormItem, { formItemProps } from "@/package/helper/useFormItem";
import { Icon } from "@iconify/vue";
import IconHelper from "@/helper/IconHelper";

export default {
  name: "input",
  moduleName: "form",
  label: "输入框",
  preview: () => <p>输入框</p>,
  render: ({ props, id, styles }) => {
    const { model, FormItemWrapper } = useFormItem(props, id);
    return () => (
      <FormItemWrapper props={props} style={styles}>
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
  icon: IconHelper("mdi:card-text-outline"),
  draggable: true,
  order: 2,
} as EditorComponent;
