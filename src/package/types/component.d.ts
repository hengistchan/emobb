/**
 * 组件类型定义
 */
import { CSSProperties, Ref } from "vue";
import { Component as VueComponent } from "vue";
import * as CSS from "csstype";

export interface Component {
  // component ID
  _id: string;
  // module name
  moduleName: string;
  // component name
  name: string;
  // component label
  label: string;
  // css style
  styles: CSSProperties;
  // check had resize
  hasResize: boolean;
  // data props
  props: Record<string, any>;
  // v-model
  models: Record<string, any>;
  // draggable
  draggable: boolean;
  showStyleConfig?: boolean;
  events: { label: string; value: string }[];
  actions: Actions;
  ref?: Ref;
  [prop: string]: any;
}

interface Action {
  key: string; // 事件唯一标识符
  event: string; // 该action属于哪一个event
  name: string; // 动作名称
  code: string; // 动作代码
}

export type Actions = { [key: string]: { [kkey: string]: Action } };

export interface EditorComponent {
  _id?: string;
  name: string;
  moduleName: string;
  label: string;
  preview: () => JSX.Element;
  render: (data: {
    props: any;
    styles: CSSProperties;
    component: Component;
    actions?: Actions;
  }) => (props?: any) => JSX.Element;
  draggable?: boolean;
  showStyleConfig?: boolean;
  props?: Record<string, any>;
  events?: { label: string; value: string }[];
  styles?: CSSProperties;
  icon: VueComponent;
}

export interface CommonComponentStyles extends Record<string, string> {
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  // position and x,y
  position: CSS.Property.Position;
  left: string;
  top: string;
  right: string;
}
