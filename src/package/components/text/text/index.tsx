import {
  createInputProp,
  createSelectProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { Document } from "@element-plus/icons-vue";
import { commonComponentStyles } from "@/package/style";
import { fonts, textAlign } from "./props";

export default {
  name: "text",
  moduleName: "text",
  label: "普通文本",
  preview: () => <p>普通文本</p>,
  render: ({ props, styles, component }) => {
    return () => (
      <p
        style={{
          ...styles,
          color: props.color as string,
          fontSize: props.fontSize,
          fontFamily: props.fontFamily,
          textAlign: props.textAlign,
        }}
      >
        {props.text || "默认文本"}
      </p>
    );
  },
  props: {
    value: createInputProp({ label: "文本内容" }),
    color: createInputProp({ label: "字体颜色" }),
    fontSize: createInputProp({
      label: "字体大小",
      defaultValue: "1rem",
      tips: "当前页面，1rem = 16px",
    }),
    fontFamily: createSelectProp({ label: "字体名称", options: fonts }),
    textAlign: createSelectProp({
      label: "对齐",
      options: textAlign,
      defaultValue: "center",
    }),
  },
  icon: Document,
} as EditorComponent;
