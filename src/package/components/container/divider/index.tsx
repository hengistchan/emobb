import {
  createInputProp,
  createSelectProp,
  createCrossSortableInputProp,
  createSwitchProp,
  createNumberInputProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import useEditor from "@/views/editor/hook/useEditor";
import { Minus } from "@element-plus/icons-vue";
import { Divider } from "vant";

export default {
  name: "divider",
  moduleName: "container",
  label: "分割线",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component }) => {
    const { registerRef } = useEditor();

    return () => (
      <div class="container" ref={(el) => registerRef(el, component._id)}>
        <Divider {...props}>{props.value}</Divider>
      </div>
    );
  },
  props: {
    value: createInputProp({ label: "文字", defaultValue: "" }),
    "content-position": createSelectProp({
      label: "文案位置",
      defaultValue: "center",
      options: [
        { label: "left", value: "left" },
        { label: "right", value: "right" },
        { label: "center", value: "center" },
      ],
    }),
    dashed: createSwitchProp({
      label: "是否虚线",
      defaultValue: false,
    }),
    hairline: createSwitchProp({
      label: "0.5px 线",
      defaultValue: true,
    }),
  },
  icon: Minus,
  draggable: true,
} as EditorComponent;
