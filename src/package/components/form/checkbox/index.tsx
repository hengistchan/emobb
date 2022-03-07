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
import { Checkbox, CheckboxGroup } from "vant";
import { computed, ref } from "vue";
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
    const checkList = computed({
      get() {
        return typeof model[props.prop] === "string"
          ? model[props.prop].split(",")
          : model[props.prop];
      },
      set(val) {
        model[props.prop] = val;
      },
    });

    return () => {
      return (
        <FormItemWrapper {...pick(props, commonFormKeys)}>
          <CheckboxGroup
            v-model={checkList.value}
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
      defaultValue: "0",
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
  },
  icon: IconHelper("mdi:checkbox-marked-outline"),
  draggable: true,
  order: 4,
} as EditorComponent;
