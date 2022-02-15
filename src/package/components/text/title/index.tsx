import {
  createColorProp,
  createInputProp,
  createSelectProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { EditPen } from "@element-plus/icons-vue";
import { fonts, textAlign } from "../text/props";
import useEditor from "@/views/editor/hook/useEditor";
const titleStyle = [
  { label: "H1", value: "2rem" },
  { label: "H2", value: "1.5rem" },
  { label: "H3", value: "1.17rem" },
  { label: "H4", value: "1rem" },
  { label: "H5", value: "0.83rem" },
  { label: "H6", value: "0.67rem" },
];

export default {
  name: "title",
  moduleName: "text",
  label: "标题",
  preview: () => <h3>标题</h3>,
  render: ({ props, styles, component }) => {
    const { registerRef } = useEditor();
    return () => (
      <p
        ref={(el) => registerRef(el, component._id)}
        style={{
          ...styles,
          color: props.color,
          fontFamily: props.fontFamily,
          textAlign: props.textAlign,
          fontWeight: "bold",
          fontSize: props.fontSize,
        }}
      >
        {props.value}
      </p>
    );
  },
  props: {
    value: createInputProp({ label: "标题", defaultValue: "默认标题" }),
    color: createColorProp({ label: "字体颜色", defaultValue: "" }),
    fontSize: createSelectProp({
      label: "大小",
      options: titleStyle,
      defaultValue: "2rem",
    }),
    fontFamily: createSelectProp({ label: "字体名称", options: fonts }),
    textAlign: createSelectProp({
      label: "对齐",
      options: textAlign,
      defaultValue: "center",
    }),
  },
  icon: EditPen,
} as EditorComponent;
