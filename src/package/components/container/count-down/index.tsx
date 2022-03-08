import IconHelper from "@/helper/IconHelper";
import {
  createInputProp,
  createSelectProp,
  createCrossSortableInputProp,
  createSwitchProp,
  createNumberInputProp,
} from "@/package/helper/CreateProps";
import { doActions } from "@/package/helper/doActions";
import { EditorComponent } from "@/package/types/component";
import useEditor from "@/views/editor/hook/useEditor";
import { Minus } from "@element-plus/icons-vue";
import { CountDown } from "vant";

export default {
  name: "count-down",
  moduleName: "container",
  label: "倒计时",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component, actions }) => {
    const { registerRef } = useEditor();

    return () => (
      <CountDown
        {...props}
        onFinish={() => {
          actions.finish && doActions(actions.finish);
        }}
      ></CountDown>
    );
  },
  props: {
    time: createNumberInputProp({
      label: "倒计时",
      defaultValue: 0,
    }),
    format: createInputProp({
      label: "时间格式",
      defaultValue: "HH:mm:ss",
    }),
    millisecond: createSwitchProp({
      label: "毫秒级渲染",
      defaultValue: false,
    }),
  },
  icon: IconHelper("mdi:camera-timer"),
  events: [{ label: "倒计时结束时", value: "finish" }],
  draggable: true,
} as EditorComponent;
