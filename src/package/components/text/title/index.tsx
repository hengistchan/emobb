import {
  createColorProp,
  createInputProp,
  createSelectProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { EditPen } from "@element-plus/icons-vue";
import { fonts, textAlign } from "../text/props";

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
    return () => (
      <p
        style={{
          ...styles,
          color: props.color,
          fontFamily: props.fontFamily,
          textAlign: props.textAlign,
          fontWeight: "bold",
          fontSize: props.fontSize,
        }}
      >
        {props.text || "默认标题"}
      </p>
    );
  },
  props: {
    value: createInputProp({ label: "文本内容" }),
    color: createColorProp({ label: "字体颜色" }),
    fontSize: createInputProp({
      label: "字体大小",
      defaultValue: "2rem",
      tips: "当前页面，1rem = 16px",
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
