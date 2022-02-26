import {
  createInputProp,
  createSelectProp,
  createCrossSortableInputProp,
  createSwitchProp,
  createNumberInputProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import useEditor from "@/views/editor/hook/useEditor";
import { SwitchButton } from "@element-plus/icons-vue";
import { ElButton, ElCarouselItem, ElImage } from "element-plus";
import { onMounted } from "vue";

export default {
  name: "button",
  moduleName: "container",
  label: "按钮",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component }) => {
    const { registerRef } = useEditor();
    return () => (
      <div
        style={styles}
        class="container"
        ref={(el) => registerRef(el, component._id)}
      >
        <ElButton
          type={props.type}
          size={props.size}
          // plain={props.plain}
          round={props.round}
          disabled={props.disabled}
        >
          {props.value}
        </ElButton>
      </div>
    );
  },
  props: {
    value: createInputProp({ label: "按钮", defaultValue: "button" }),
    type: createSelectProp({
      label: "按钮类型",
      defaultValue: "primary",
      options: [
        { label: "primary", value: "primary" },
        { label: "success", value: "success" },
        { label: "warning", value: "warning" },
        { label: "danger", value: "danger" },
        { label: "info", value: "info" },
      ],
    }),
    size: createSelectProp({
      label: "按钮尺寸",
      defaultValue: "default",
      options: [
        { label: "大", value: "large" },
        { label: "正常", value: "default" },
        { label: "小", value: "small" },
      ],
    }),
    // plain: createSwitchProp({ label: "朴素按钮", defaultValue: false }),
    round: createSwitchProp({ label: "圆角按钮", defaultValue: false }),
    disabled: createSwitchProp({ label: "禁用", defaultValue: false }),
  },
  icon: SwitchButton,
  draggable: true,
  events: [
    {
      label: "点击按钮",
      value: "click",
    },
  ],
} as EditorComponent;
