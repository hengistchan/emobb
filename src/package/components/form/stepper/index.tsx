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
import { Stepper } from "vant";
import { pick } from "lodash-es";

export default {
  name: "stepper",
  moduleName: "form",
  label: "步进器",
  preview: () => <p>步进器</p>,
  render: ({ props, id, styles }) => {
    const { model, FormItemWrapper } = useVantFormItem(props, id);
    return () => (
      <FormItemWrapper
        {...pick(props, commonFormKeys)}
        rules={new Function(`${props.rules}; return rules;`)()}
        value={model[props.prop]}
      >
        <Stepper
          v-model={model[props.prop]}
          min={props.min == null ? Number.MIN_SAFE_INTEGER : props.min}
          max={props.max === null ? Number.MAX_SAFE_INTEGER : props.max}
          step={props.step}
          theme={props.theme}
        ></Stepper>
      </FormItemWrapper>
    );
  },
  props: {
    default: createNumberInputProp({
      label: "默认值",
      defaultValue: 0,
    }),
    ...createCommonFormProps("字段", "请输入内容"),
    min: createNumberInputProp({
      label: "最小值",
      defaultValue: 0,
    }),
    max: createNumberInputProp({
      label: "最大值",
      defaultValue: 5,
    }),
    step: createNumberInputProp({
      label: "步长",
      defaultValue: 1,
    }),
    theme: createSelectProp({
      label: "主题",
      options: [
        { label: "默认", value: "" },
        { label: "圆形", value: "round" },
      ],
    }),
  },
  icon: IconHelper("mdi:step-forward"),
  draggable: true,
  order: 7,
} as EditorComponent;
