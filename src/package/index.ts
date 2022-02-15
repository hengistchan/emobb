import { ComponentModule } from "./types/module";
import { mapValues } from "lodash-es";
import { computed } from "vue";

const ms = import.meta.globEager("./components/*/index.ts");

const componentModules: { [key: string]: ComponentModule } = {};

mapValues(ms, (modules: { default: ComponentModule }) => {
  componentModules[modules.default.name] = modules.default;
});

/**
 * 用于筛选除了普通属性外所有的通用样式
 */
export const generalStyles = [
  { label: "内边距", name: "padding", defaultValue: "0 0 0 0" },
  { label: "布局", name: "display", defaultValue: "block" },
];
export const spreadGeneralStyles = (
  props: { [key: string]: any },
  styles: { [key: string]: any },
) => {
  props.display = "0";
  styles.display = props.display;
};

export default componentModules;
