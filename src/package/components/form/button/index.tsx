import {
  createColorProp,
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
import { Button, Notify } from "vant";
import { pick } from "lodash-es";
import { ref } from "vue";
import { doActions } from "@/package/helper/doActions";
import axios from "axios";

const clickCode = `async function action({axios, model}) {
  console.log(axios, model)
}`;

export default {
  name: "button",
  moduleName: "form",
  label: "按钮",
  preview: () => <p>按钮</p>,
  render: ({ props, id, styles, actions }) => {
    const { model, formRef } = useVantFormItem(props, id);
    const loading = ref(false);
    return () => (
      <Button
        {...props}
        style={styles}
        loading={loading.value}
        onClick={async () => {
          loading.value = true;
          actions.click &&
            (await doActions(actions.click, {
              axios,
              model,
              formRef,
              notify: Notify,
            }));
          loading.value = false;
        }}
      >
        {props.value}
      </Button>
    );
  },
  props: {
    value: createInputProp({
      label: "按钮文本",
      defaultValue: "按钮",
    }),
    type: createSelectProp({
      label: "按钮样式",
      defaultValue: "default",
      options: [
        { label: "primary", value: "primary" },
        { label: "success", value: "success" },
        { label: "warning", value: "warning" },
        { label: "danger", value: "danger" },
        { label: "default", value: "default" },
      ],
    }),
    size: createSelectProp({
      label: "按钮尺寸",
      defaultValue: "large",
      options: [
        { label: "大", value: "large" },
        { label: "正常", value: "small" },
        { label: "小", value: "mini" },
      ],
    }),
    plain: createSwitchProp({ label: "朴素按钮", defaultValue: false }),
    round: createSwitchProp({ label: "圆角按钮", defaultValue: false }),
    hairline: createSwitchProp({ label: "0.5px 边框", defaultValue: false }),
    block: createSwitchProp({
      label: "块级元素",
      defaultValue: false,
    }),
    color: createColorProp({
      label: "按钮颜色",
    }),
  },
  icon: IconHelper("mdi:gesture-tap-button"),
  draggable: true,
  events: [{ label: "点击时触发", value: "click", code: clickCode }],
  order: 10,
} as EditorComponent;
