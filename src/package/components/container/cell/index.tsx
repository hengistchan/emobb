import IconHelper from "@/helper/IconHelper";
import {
  createInputProp,
  createSelectProp,
  createSwitchProp,
  createTableProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { Tickets } from "@element-plus/icons-vue";
import type { FormInstance } from "vant";
import { Cell } from "vant";
import { useSlots, renderSlot, provide, ref, Ref, reactive } from "vue";

export default {
  name: "cell",
  moduleName: "container",
  label: "单元格",
  preview: () => <p>普通容器</p>,
  render: ({ props }) => {
    return () => <Cell {...props}></Cell>;
  },
  props: {
    title: createInputProp({
      label: "左侧标题",
      defaultValue: "",
    }),
    value: createInputProp({
      label: "右侧内容",
      defaultValue: "",
    }),
    label: createInputProp({
      label: "描述信息",
      defaultValue: "",
      type: "textarea",
    }),
    size: createSelectProp({
      label: "大小",
      options: [
        {
          label: "默认",
          value: "",
        },
        { label: "大", value: "large" },
      ],
      defaultValue: "",
    }),
    url: createInputProp({
      label: "点击跳转",
      defaultValue: null,
    }),
    clickable: createSwitchProp({
      label: "点击反馈",
      defaultValue: false,
    }),
    isLink: createSwitchProp({
      label: "右侧箭头",
      defaultValue: false,
    }),
    arrowDirection: createSelectProp({
      label: "箭头方向",
      defaultValue: "right",
      options: [
        { label: "right", value: "" },
        { label: "left", value: "left" },
        { label: "up", value: "up" },
        { label: "down", value: "down" },
      ],
    }),
  },
  icon: IconHelper("mdi:view-agenda-outline"),
  events: [{ label: "点击时", value: "click" }],
  draggable: true,
  order: 6,
} as EditorComponent;
