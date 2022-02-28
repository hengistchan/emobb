import {
  createTableProp,
  createInputProp,
  createSelectProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { Tickets } from "@element-plus/icons-vue";
import { ElForm } from "element-plus";
import { useSlots, renderSlot } from "vue";
import useEditor from "@/views/editor/hook/useEditor";

export default {
  name: "container",
  moduleName: "form",
  label: "表单容器",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component }) => {
    const slots = useSlots();
    const { registerRef } = useEditor();
    return () => (
      <div
        ref={(el) => registerRef(el, component._id)}
        style={styles}
        class="form form-container"
      >
        <ElForm {...props} style={{ width: "100%" }}>
          {renderSlot(slots, "default")}
        </ElForm>
      </div>
    );
  },
  props: {
    "slots.default.children": createTableProp({
      label: "表单项",
      option: {
        options: [
          { label: "显示值", field: "label" },
          { label: "绑定值", field: "value" },
          { label: "备注", field: "comments" },
        ],
        showKey: "label",
      },
      defaultValue: [],
    }),
  },
  icon: Tickets,
  draggable: true,
} as EditorComponent;
