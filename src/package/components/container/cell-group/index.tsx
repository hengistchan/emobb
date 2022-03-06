import IconHelper from "@/helper/IconHelper";
import {
  createInputProp,
  createSwitchProp,
  createTableProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { Tickets } from "@element-plus/icons-vue";
import type { FormInstance } from "vant";
import { CellGroup } from "vant";
import { useSlots, renderSlot, provide, ref, Ref, reactive } from "vue";

export type FormRef = Ref<FormInstance>;

export default {
  name: "cell-group",
  moduleName: "container",
  label: "单元格组",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component, models }) => {
    const slots = useSlots();
    return () => (
      <CellGroup {...props}>{renderSlot(slots, "default")}</CellGroup>
    );
  },
  props: {
    "slots.default.children": createTableProp({
      label: "子组件ID",
    }),
    title: createInputProp({ label: "分组标题", defaultValue: null }),
    inset: createSwitchProp({ label: "圆形卡片", defaultValue: false }),
    border: createSwitchProp({ label: "外边框", defaultValue: true }),
  },
  icon: IconHelper("mdi:view-stream"),
  draggable: true,
  order: 4,
} as EditorComponent;
