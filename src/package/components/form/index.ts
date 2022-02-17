import { ComponentModule } from "@/package/types/module";
import { Tickets } from "@element-plus/icons-vue";
import { EditorComponent } from "@/package/types/component";
import { mapValues } from "lodash-es";

const c = import.meta.globEager("./*/index.vue");
const components: EditorComponent[] = [];
const componentMap: { [key: string]: EditorComponent } = {};
mapValues(c, (component: { default: EditorComponent }) => {
  components.push(component.default);
  componentMap[component.default.name] = component.default;
});

const m: ComponentModule = {
  name: "form",
  label: "表单组件",
  icon: Tickets,
  order: 3,
  components,
  componentMap,
};

export default m;
