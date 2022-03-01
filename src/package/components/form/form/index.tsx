import {
  createTableProp,
  createInputProp,
  createSelectProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { Tickets } from "@element-plus/icons-vue";
import { ElForm } from "element-plus";
import {
  useSlots,
  renderSlot,
  provide,
  ref,
  InjectionKey,
  Ref,
  reactive,
  watch,
} from "vue";
import useEditor from "@/views/editor/hook/useEditor";
import { Nullable } from "types";

export type FormRef = Ref<InstanceType<typeof ElForm>>;

export default {
  name: "container",
  moduleName: "form",
  label: "表单容器",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component, models }) => {
    const slots = useSlots();

    const formRef = ref<InstanceType<typeof ElForm> | null>(null);
    const model = reactive({});
    Object.values(models).reduce((prev, next) => {
      prev[next.name] = next.defaultValue ?? undefined;
      return prev;
    }, model as { [key: string]: any });
    provide("$$fromRef", formRef);
    provide("$$formModels", models);
    provide("$$model", model);
    return () => (
      <ElForm
        {...props}
        style={{ ...styles, width: "100%" }}
        class="form form-container"
        ref={(el: InstanceType<typeof ElForm>) => (formRef.value = el)}
        model={model}
      >
        {renderSlot(slots, "default")}
      </ElForm>
    );
  },
  props: {
    "slots.default.children": createTableProp({
      label: "子组件ID",
    }),
  },
  icon: Tickets,
  draggable: true,
} as EditorComponent;
