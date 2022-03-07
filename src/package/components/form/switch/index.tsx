import {
  createInputProp,
  createNumberInputProp,
  createSelectProp,
  createSwitchProp,
} from "@/package/helper/CreateProps";
import { EditorComponent, Model } from "@/package/types/component";
import useVantFormItem, {
  createCommonFormProps,
  commonFormKeys,
} from "@/package/helper/useVantFormItem";
import IconHelper from "@/helper/IconHelper";
import { Switch } from "vant";
import { pick } from "lodash-es";

export default {
  name: "switch",
  moduleName: "form",
  label: "开关",
  preview: () => <p>开关</p>,
  render: ({ props, id, styles }) => {
    const { model, FormItemWrapper } = useVantFormItem(props, id);
    return () => (
      <FormItemWrapper
        {...pick(props, commonFormKeys)}
        rules={new Function(`${props.rules}; return rules;`)()}
        value={model[props.prop]}
      >
        <Switch v-model={model[props.prop]} size={props.size}></Switch>
      </FormItemWrapper>
    );
  },
  props: {
    default: createNumberInputProp({
      label: "默认值",
      defaultValue: false,
    }),
    ...createCommonFormProps("字段", "请输入内容"),
    size: createInputProp({
      label: "开关尺寸",
      defaultValue: "20px",
    }),
  },
  icon: IconHelper("mdi:toggle-switch-outline"),
  draggable: true,
  order: 8,
} as EditorComponent;
