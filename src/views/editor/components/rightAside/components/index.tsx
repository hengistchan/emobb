import { EditorComponent } from "@/package/types/component";
import { Component } from "vue";
import Basic from "./basic/index.vue";
import Layout from "./layout/index.vue";

interface Attribute {
  label: string;
  name: string;
  component?: (
    currentComponent: Component,
    currentEditorComponent: EditorComponent,
  ) => JSX.Element;
}

const attributes: Attribute[] = [
  {
    label: "basic",
    name: "基础属性",
    component: (
      currentComponent: Component,
      currentEditorComponent: EditorComponent,
    ) => (
      <Basic
        currentComponent={currentComponent}
        currentEditorComponent={currentEditorComponent}
      />
    ),
  },
  {
    label: "layout",
    name: "布局",
    component: (
      currentComponent: Component,
      currentEditorComponent: EditorComponent,
    ) => (
      <Layout
        currentComponent={currentComponent}
        currentEditorComponent={currentEditorComponent}
      />
    ),
  },
  {
    label: "position",
    name: "定位",
  },
  {
    label: "font",
    name: "字体",
  },
  {
    label: "background",
    name: "背景",
  },
  {
    label: "border",
    name: "边框",
  },
];

export default attributes;
