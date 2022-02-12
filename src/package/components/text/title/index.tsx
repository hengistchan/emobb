import { createInputProp } from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { EditPen } from "@element-plus/icons-vue";

const titleStyle = {
  h1: {
    fontSize: "2rem",
  },
  h2: {
    fontSize: "1.5rem",
  },
  h3: {
    fontSize: "1.17rem",
  },
  h4: {
    fontSize: "1rem",
  },
  h5: {
    fontSize: "0.83rem",
  },
  h6: {
    fontSize: "0.67rem",
  },
};

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
          // fontSize: props.size,
          fontFamily: props.font,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2rem",
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
