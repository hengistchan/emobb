import { createInputProp } from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";

export default {
  key: "text",
  moduleName: "text",
  label: "文本",
  preview: () => <span>文本</span>,
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
} as EditorComponent;
