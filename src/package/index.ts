import { ComponentModule } from "./types/module";
import { mapValues } from "lodash-es";

const ms = import.meta.globEager("./components/*/index.ts");

const componentModules: { [key: string]: ComponentModule } = {};

mapValues(ms, (modules: { default: ComponentModule }) => {
  componentModules[modules.default.name] = modules.default;
});

/**
 * 用于筛选除了普通属性外所有的通用样式
 */
export const generalStyles = ["padding"];
export const spreadGeneralStyles = (props: { [key: string]: any }) => {
  return generalStyles.reduce((prev, next) => {
    prev[next] = props[next];
    return prev;
  }, {} as { [key: string]: any });
};

export default componentModules;
