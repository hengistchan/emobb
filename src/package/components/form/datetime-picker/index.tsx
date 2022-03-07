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
import { Popup, DatetimePicker, Field } from "vant";
import { computed, ref } from "vue";
import { doActions } from "@/package/helper/doActions";
import dayjs from "dayjs";
import { pick, omit } from "lodash-es";

const confirmCode = `function action({ datetime, model, prop }) {
  model[prop] = datetime;
}`;

export default {
  name: "datetime-picker",
  moduleName: "form",
  label: "日期时间选择",
  preview: () => <p>日期选择</p>,
  render: ({ props, id, styles, actions }) => {
    const { model } = useVantFormItem(props, id);
    const showPicker = ref(false);
    return () => {
      return (
        <div>
          <Field
            {...pick(props, commonFormKeys)}
            is-link={true}
            readonly={true}
            v-model={model[props.prop]}
            onClick={() => (showPicker.value = true)}
            rules={new Function(`${props.rules}; return rules;`)()}
          ></Field>
          <Popup position="bottom" v-model:show={showPicker.value}>
            <DatetimePicker
              type={props.type}
              title={props.title}
              onConfirm={(datetime: string) => {
                actions.confirm &&
                  doActions(actions.confirm, {
                    datetime,
                    model,
                    prop: props.prop,
                  });
                showPicker.value = false;
              }}
              onCancel={() => (showPicker.value = false)}
            ></DatetimePicker>
          </Popup>
        </div>
      );
    };
  },
  props: {
    default: createInputProp({
      label: "默认值",
      defaultValue: "",
      tips: '默认值，以","分割',
    }),
    ...createCommonFormProps("日期选择", "请选择日期"),
    type: createSelectProp({
      label: "类型",
      options: [
        { label: "年 - 月 - 日 - 时 - 分", value: "datetime" },
        { label: "年 - 月 - 日 - 时", value: "datehour" },
        { label: "年 - 月 - 日", value: "date" },
        { label: "时 - 分", value: "time" },
        { label: "年 - 月", value: "year-month" },
        { label: "月 - 日", value: "month-day" },
      ],
    }),
    title: createInputProp({
      label: "标题",
      defaultValue: "",
    }),
  },
  icon: IconHelper("mdi:clock-outline"),
  draggable: true,
  events: [{ label: "确认时间时", value: "confirm", code: confirmCode }],
  order: 5,
} as EditorComponent;
