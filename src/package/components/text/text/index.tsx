import {
  createColorProp,
  createInputProp,
  createSelectProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { fonts, textAlign } from "./props";
import useEditor from "@/views/editor/hook/useEditor";
import IconHelper from "@/helper/IconHelper";

export default {
  name: "text",
  moduleName: "text",
  label: "普通文本",
  preview: () => <p>普通文本</p>,
  render: ({ props, styles, component }) => {
    const { registerRef } = useEditor();

    return () => {
      return (
        <p
          ref={(el) => registerRef(el, component._id)}
          style={{
            ...styles,
            color: props.color as string,
            fontSize: props.fontSize,
            fontFamily: props.fontFamily,
            textAlign: props.textAlign,
          }}
        >
          {props.value}
        </p>
      );
    };
  },
  props: {
    value: createInputProp({ label: "文本内容", defaultValue: "默认文本" }),
    color: createColorProp({ label: "字体颜色", defaultValue: "" }),
    fontSize: createInputProp({
      label: "字体大小",
      defaultValue: "16px",
      tips: "当前页面，1rem = 16px",
    }),
    fontFamily: createSelectProp({ label: "字体名称", options: fonts }),
    textAlign: createSelectProp({
      label: "对齐",
      options: textAlign,
      defaultValue: "center",
    }),
  },
  icon: IconHelper("mdi:format-color-text"),
} as EditorComponent;
