/**
 * 左侧组件模块类型定义
 */
import { EditorComponent } from "./component";
import { Component, VNode } from "vue";

interface ModuleIcon {
  name: string;
  render: () => JSX.Element;
}

export interface ComponentModule {
  // 组件模块名称
  name: string;
  // label
  label: string;
  // 顺序
  order: number;
  // 组件下的所有组件
  components: EditorComponent[];
  // 显示组件模块的icon
  icon: Component;
  // component map
  componentMap: { [key: string]: EditorComponent };
}
