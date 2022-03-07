import {
  createCrossSortableInputProp,
  createCrossSortableInputWithCheckboxProp,
  createInputProp,
  createNumberInputProp,
  createSelectProp,
  createSwitchProp,
} from "@/package/helper/CreateProps";
import { EditorComponent, Model } from "@/package/types/component";
import useVantFormItem, {
  commonFormKeys,
  createCommonFormProps,
} from "@/package/helper/useVantFormItem";
import IconHelper from "@/helper/IconHelper";
import { RadioGroup, Radio } from "vant";
import { computed, ref } from "vue";
import { doActions } from "@/package/helper/doActions";
import dayjs from "dayjs";
import { pick, omit } from "lodash-es";

export default {
  name: "radio",
  moduleName: "form",
  label: "单选框",
  preview: () => <p>单选框</p>,
  render: ({ props, id, styles, actions }) => {
    const { model, FormItemWrapper } = useVantFormItem(props, id);

    return () => {
      return (
        <FormItemWrapper {...pick(props, commonFormKeys)}>
          <RadioGroup v-model={model[props.prop]} direction={props.direction}>
            {props.options.map((item: any) => (
              <Radio
                name={item.value}
                shape={props.shape}
                style={{
                  marginTop: props.direction === "vertical" ? "3px" : "0",
                }}
              >
                {item.label}
              </Radio>
            ))}
          </RadioGroup>
        </FormItemWrapper>
      );
    };
  },
  props: {
    default: createInputProp({
      label: "默认值",
      defaultValue: "",
      tips: '默认值，以","分割',
    }),
    options: createCrossSortableInputWithCheckboxProp({
      label: "默认选项",
      defaultValue: [
        { label: "牛", value: "cow" },
        { label: "马", value: "horse" },
      ],
    }),
    ...createCommonFormProps("单选", "请选择内容"),
    shape: createSelectProp({
      label: "形状",
      options: [
        { label: "圆形", value: "round" },
        { label: "方形", value: "square" },
      ],
      defaultValue: "square",
    }),
    direction: createSelectProp({
      label: "排列方向",
      options: [
        { label: "水平", value: "horizontal" },
        { label: "垂直", value: "vertical" },
      ],
      defaultValue: "horizontal",
    }),
  },
  icon: IconHelper("mdi:checkbox-multiple-marked-circle-outline"),
  draggable: true,
  order: 6,
} as EditorComponent;
