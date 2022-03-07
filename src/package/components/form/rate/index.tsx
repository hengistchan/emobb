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
import { Rate } from "vant";
import { pick } from "lodash-es";

export default {
  name: "rate",
  moduleName: "form",
  label: "评分",
  preview: () => <p>评分</p>,
  render: ({ props, id, styles }) => {
    const { model, FormItemWrapper } = useVantFormItem(props, id);
    return () => (
      <FormItemWrapper
        {...pick(props, commonFormKeys)}
        rules={new Function(`${props.rules}; return rules;`)()}
        value={model[props.prop]}
      >
        <Rate
          v-model={model[props.prop]}
          count={props.count}
          allowHalf={props.allowHalf}
          size={props.size}
        ></Rate>
      </FormItemWrapper>
    );
  },
  props: {
    default: createNumberInputProp({
      label: "默认值",
      defaultValue: 3,
    }),
    ...createCommonFormProps("字段", "请输入内容"),
    count: createNumberInputProp({
      label: "图标个数",
      defaultValue: 5,
    }),
    allowHalf: createSwitchProp({
      label: "允许半选",
      defaultValue: false,
    }),
    size: createInputProp({
      label: "图标大小",
      defaultValue: "20px",
    }),
  },
  icon: IconHelper("mdi:star-outline"),
  draggable: true,
  order: 9,
} as EditorComponent;
