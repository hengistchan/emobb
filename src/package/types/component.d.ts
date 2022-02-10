/**
 * 组件类型定义
 */
import { CSSProperties } from "vue";

export interface Component {
  // component ID
  _id: string;
  // module name
  moduleName: string;
  // component name
  key: string;
  // component label
  label: string;
  // css style
  styles: CSSProperties;
  // check had resize
  hasResize: true;
  // data props
  props: Record<string, any>;
  // v-model
  model: Record<string, string>;
  // draggable
  draggable: boolean;
  showStyleConfig?: boolean;
  events: { label: string; value: string }[];
  [prop: string]: any;
}

export interface EditorComponent {
  _id?: string;
  name: string;
  moduleName: keyof ComponentModules;
  label: string;
  preview: () => JSX.Element;
  render: (data: {
    props: any;
    model: any;
    styles: CSSProperties;
    component: Component;
    custom: Record<string, any>;
  }) => () => JSX.Element;
  draggable?: boolean;
  showStyleConfig?: boolean;
  props?: Record<string, unknown>;
  events?: { label: string; value: string }[];
  styles?: CSSProperties;
}
