import IconHelper from "@/helper/IconHelper";
import {
  createInputProp,
  createSelectProp,
  createCrossSortableInputProp,
  createSwitchProp,
  createNumberInputProp,
  createColorProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import useEditor from "@/views/editor/hook/useEditor";
import { Minus } from "@element-plus/icons-vue";
import { NoticeBar } from "vant";

export default {
  name: "notice-bar",
  moduleName: "container",
  label: "通知条",
  preview: () => <p>通知条</p>,
  render: ({ props, styles, component }) => {
    const { registerRef } = useEditor();

    return () => <NoticeBar {...props}>{props.value}</NoticeBar>;
  },
  props: {
    value: createInputProp({
      label: "文字",
      type: "textarea",
      defaultValue:
        "无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。",
    }),
    color: createColorProp({
      label: "文字颜色",
      defaultValue: "#ed6a0c",
    }),
    background: createColorProp({
      label: "背景颜色",
      defaultValue: "#fffbe8",
    }),
    wrapable: createSwitchProp({
      label: "换行显示",
      defaultValue: false,
    }),
    scrollable: createSwitchProp({
      label: "滚动播放",
      defaultValue: false,
    }),
    speed: createNumberInputProp({
      label: "滚动速率",
      defaultValue: 60,
    }),
  },
  icon: IconHelper("mdi:bell-outline"),
  draggable: true,
} as EditorComponent;
