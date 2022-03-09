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
  name: "textarea",
  moduleName: "text",
  label: "富文本",
  preview: () => <p>富文本展示</p>,
  render: ({ props, styles, component }) => {
    console.log(styles);

    return () => {
      return (
        <p
          style={{
            ...styles,
            color: props.color as string,
            fontSize: props.fontSize,
            fontFamily: props.fontFamily,
            textAlign: props.textAlign,
          }}
          v-html={props.value}
        ></p>
      );
    };
  },
  props: {
    value: createInputProp({
      label: "文本内容",
      defaultValue: '<p style="color: red;">展示文本</p>',
      type: "textarea",
    }),
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
  icon: IconHelper("mdi:format-text"),
} as EditorComponent;
