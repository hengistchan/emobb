import {
  createInnerEditorProp,
  createInputProp,
  createNumberInputProp,
  createSelectProp,
  createSwitchProp,
} from "@/package/helper/CreateProps";
import { EditorComponent, Model } from "@/package/types/component";
import useVantFormItem, {
  createCommonFormProps,
} from "@/package/helper/useVantFormItem";
import IconHelper from "@/helper/IconHelper";
import { Field } from "vant";

export default {
  name: "input",
  moduleName: "form",
  label: "输入框",
  preview: () => <p>输入框</p>,
  render: ({ props, id, styles }) => {
    const { model } = useVantFormItem(props, id);
    return () => (
      <Field
        v-model={model[props.prop]}
        name={props.prop}
        {...props}
        rules={new Function(`${props.rules}; return rules;`)()}
      ></Field>
    );
  },
  props: {
    default: createInputProp({
      label: "默认值",
      defaultValue: "",
    }),
    ...createCommonFormProps("字段", "请输入内容"),
    readonly: createSwitchProp({
      label: "是否只读",
      defaultValue: false,
    }),
    clearable: createSwitchProp({
      label: "清除图标",
      defaultValue: false,
    }),
    rules: createInnerEditorProp({
      label: "校验规则",
      defaultValue: `/**
 * 在变量rules中键入规则，不要改变变量名称
 */
const rules = [

]`,
    }),
  },
  icon: IconHelper("mdi:card-text-outline"),
  draggable: true,
  order: 2,
} as EditorComponent;
