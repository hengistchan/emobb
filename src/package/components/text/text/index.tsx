import { createInputProp } from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { Document } from "@element-plus/icons-vue";

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
          color: props.color,
          fontSize: props.size,
          fontFamily: props.font,
        }}
      >
        {props.text || "默认文本"}
      </p>
    );
  },
  props: {
    color: createInputProp({ label: "文本" }),
  },
  icon: Document,
} as EditorComponent;
