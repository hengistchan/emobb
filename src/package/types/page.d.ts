import { Component } from "./component";

/**
 * 页面类型定义
 */
export interface Page {
  title: string;
  props?: PageProps;
  components: Component[];
}

export interface PageProps {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
}