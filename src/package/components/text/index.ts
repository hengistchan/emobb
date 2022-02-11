import { ComponentModule } from "@/package/types/module";
import { Document } from "@element-plus/icons-vue";
import { EditorComponent } from "@/package/types/component";
import { mapValues } from "lodash-es";

const c = import.meta.globEager("./*/index.tsx");
const components: EditorComponent[] = [];
const componentMap: { [key: string]: EditorComponent } = {};
mapValues(c, (component: { default: EditorComponent }) => {
  components.push(component.default);
  componentMap[component.default.name] = component.default;
});

const m: ComponentModule = {
  name: "text",
  label: "文本组件",
  icon: Document,
  order: 1,
  components,
  componentMap,
};

export default m;
