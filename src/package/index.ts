import { ComponentModule } from "./types/module";
import { mapValues } from "lodash-es";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ms = import.meta.globEager("./components/*/index.ts");

const componentModules: { [key: string]: ComponentModule } = {};

mapValues(ms, (modules: { default: ComponentModule }) => {
  componentModules[modules.default.name] = modules.default;
});
export default componentModules;
