import {
  createInputProp,
  createSelectProp,
  createSwitchProp,
} from "@/package/helper/CreateProps";
import { EditorComponent, Model } from "@/package/types/component";
import useVantFormItem, {
  createCommonFormProps,
} from "@/package/helper/useVantFormItem";
import IconHelper from "@/helper/IconHelper";
import { Calendar, Field } from "vant";
import { ref } from "vue";
import { doActions } from "@/package/helper/doActions";
import dayjs from "dayjs";
import { fa } from "element-plus/es/locale";

const confirmCode = `function action({ date, model, prop, dayjs }) {
  model[prop] = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}`;

export default {
  name: "calendar",
  moduleName: "form",
  label: "日历",
  preview: () => <p>日历</p>,
  render: ({ props, id, styles, actions }) => {
    const { model } = useVantFormItem(props, id);
    const isShow = ref(false);
    return () => {
      return (
        <div>
          <Field
            {...props}
            v-model={model[props.prop]}
            readonly={true}
            is-link={true}
            onClick={() => {
              isShow.value = true;
            }}
          ></Field>
          <Calendar
            {...props}
            v-model:show={isShow.value}
            onConfirm={(date: Date | Date[]) => {
              actions &&
                doActions(actions.confirm, {
                  date,
                  model,
                  prop: props.prop,
                  dayjs,
                });
              isShow.value = false;
            }}
          ></Calendar>
        </div>
      );
    };
  },
  props: {
    default: createInputProp({
      label: "默认值",
      defaultValue: "",
    }),
    ...createCommonFormProps("日历", "请输入日期"),
    title: createInputProp({ label: "日历标题", defaultValue: null }),
    type: createSelectProp({
      label: "日历类型",
      options: [
        { label: "选择单个日期", value: "single" },
        { label: "选择多个日期", value: "multiple" },
        { label: "选择日期区间", value: "range" },
      ],
    }),
    clearable: createSwitchProp({
      label: "清除图标",
      defaultValue: false,
    }),
  },
  icon: IconHelper("mdi:calendar-range-outline"),
  draggable: true,
  order: 3,
  events: [{ label: "选择日期后触发", value: "confirm", code: confirmCode }],
} as EditorComponent;
