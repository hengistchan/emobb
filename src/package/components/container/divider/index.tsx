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
import { ElDivider as Divider } from "element-plus";

export default {
  name: "divider",
  moduleName: "container",
  label: "分割线",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component }) => {
    const { registerRef } = useEditor();

    return () => (
      <div
        style={styles}
        class="container"
        ref={(el) => registerRef(el, component._id)}
      >
        <Divider
          contentPosition={props["content-position"]}
          direction={props.direction}
        >
          {props.value}
        </Divider>
      </div>
    );
  },
  props: {
    value: createInputProp({ label: "文案", defaultValue: "" }),
    "content-position": createSelectProp({
      label: "文案位置",
      defaultValue: "center",
      options: [
        { label: "left", value: "left" },
        { label: "right", value: "right" },
        { label: "center", value: "center" },
      ],
    }),
    direction: createSelectProp({
      label: "分割方向",
      defaultValue: "horizontal ",
      options: [
        { label: "水平", value: "horizontal " },
        { label: "垂直", value: "vertical" },
      ],
    }),
  },
  icon: Minus,
  draggable: true,
} as EditorComponent;
