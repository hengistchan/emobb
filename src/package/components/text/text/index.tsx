import { createInputProp } from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { Document } from "@element-plus/icons-vue";
import { commonComponentStyles } from "@/package/style";

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
          // fontSize: props.size,
          fontSize: "1rem",
          fontFamily: props.font,
          textAlign: "center",
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
  draggable: true,
} as EditorComponent;
