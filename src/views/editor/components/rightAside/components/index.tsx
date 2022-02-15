import { EditorComponent, Component } from "@/package/types/component";
import Basic from "./basic/index.vue";
import Layout from "./layout/index.vue";
import Position from "./position/index.vue";
import Font from "./font/index.vue";
import Background from "./background/index.vue";
import Border from "./border/index.vue";

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
    component: (
      currentComponent: Component,
      currentEditorComponent: EditorComponent,
    ) => (
      <Position
        currentComponent={currentComponent}
        currentEditorComponent={currentEditorComponent}
      />
    ),
  },
  {
    label: "font",
    name: "字体",
    component: (
      currentComponent: Component,
      currentEditorComponent: EditorComponent,
    ) => (
      <Font
        currentComponent={currentComponent}
        currentEditorComponent={currentEditorComponent}
      />
    ),
  },
  {
    label: "background",
    name: "背景",
    component: (
      currentComponent: Component,
      currentEditorComponent: EditorComponent,
    ) => (
      <Background
        currentComponent={currentComponent}
        currentEditorComponent={currentEditorComponent}
      />
    ),
  },
  {
    label: "border",
    name: "边框",
    component: (
      currentComponent: Component,
      currentEditorComponent: EditorComponent,
    ) => (
      <Border
        currentComponent={currentComponent}
        currentEditorComponent={currentEditorComponent}
      />
    ),
  },
];

export default attributes;
