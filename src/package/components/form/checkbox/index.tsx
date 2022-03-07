import {
  createCrossSortableInputProp,
  createCrossSortableInputWithCheckboxProp,
  createInnerEditorProp,
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
import { Checkbox, CheckboxGroup } from "vant";
import { computed, ref, watch } from "vue";
import { doActions } from "@/package/helper/doActions";
import dayjs from "dayjs";
import { pick, omit } from "lodash-es";

export default {
  name: "checkbox",
  moduleName: "form",
  label: "多选框",
  preview: () => <p>多选框</p>,
  render: ({ props, id, styles, actions }) => {
    const { model, FormItemWrapper } = useVantFormItem(props, id);

    watch(
      () => model[props.prop],
      (newV) => {
        if (typeof newV === "string") {
          model[props.prop] =
            newV === "" || newV == null ? [] : model[props.prop].split(",");
        }
      },
      { immediate: true },
    );

    return () => {
      return (
        <FormItemWrapper
          {...pick(props, commonFormKeys)}
          value={model[props.prop]}
          rules={new Function(`${props.rules}; return rules;`)()}
        >
          <CheckboxGroup
            v-model={model[props.prop]}
            max={props.max}
            direction={props.direction}
          >
            {props.options?.map((item: any) => (
              <Checkbox
                name={item.value}
                shape={props.shape}
                style={{
                  marginTop: props.direction === "vertical" ? "3px" : "0",
                }}
              >
                {item.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
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
        { label: "猪", value: "pig" },
      ],
    }),
    ...createCommonFormProps("多选", "请选择内容"),
    shape: createSelectProp({
      label: "形状",
      options: [
        { label: "圆形", value: "round" },
        { label: "方形", value: "square" },
      ],
      defaultValue: "square",
    }),
    max: createNumberInputProp({
      label: "最多可选",
      defaultValue: 0,
      tips: "0为无限制",
    }),
    direction: createSelectProp({
      label: "排列方向",
      options: [
        { label: "水平", value: "horizontal" },
        { label: "垂直", value: "vertical" },
      ],
      defaultValue: "horizontal",
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
  icon: IconHelper("mdi:checkbox-marked-outline"),
  draggable: true,
  order: 4,
} as EditorComponent;
