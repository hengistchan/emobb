import { createInputProp } from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { EditPen } from "@element-plus/icons-vue";

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
          fontSize: props.size,
          fontFamily: props.font,
        }}
      >
        {props.text || "默认标题"}
      </p>
    );
  },
  props: {
    color: createInputProp({ label: "颜色" }),
  },
  icon: EditPen,
} as EditorComponent;
