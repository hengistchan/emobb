import { ComponentModule } from "@/package/types/module";
import { Document } from "@element-plus/icons-vue";
import { EditorComponent } from "@/package/types/component";
import { mapValues } from "lodash-es";

const c = import.meta.globEager("./*/index.tsx");
const components: EditorComponent[] = [];
mapValues(c, (component: { default: EditorComponent }) => {
  components.push(component.default);
});

const m: ComponentModule = {
  name: "text",
  label: "文本",
  icon: Document,
  order: 1,
  components,
};

export default m;
