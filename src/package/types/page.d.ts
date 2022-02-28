import { Component } from "./component";

/**
 * 页面类型定义
 */
export interface Page {
  title: string;
  props?: PageProps;
  components: Component[];
  models: { [key: string]: any };
}

export interface PageProps {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
  height?: string;
}
