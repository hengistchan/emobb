/**
 * 右侧表单栏类型定义
 */
export enum EditorPropType {
  /** 输入框 */
  input = "input",
  /** 数字输入框 */
  inputNumber = "InputNumber",
  /** 颜色选择器 */
  color = "color",
  /** 下拉选择器 */
  select = "select",
  /** 表格 */
  table = "table",
  /** 开关 */
  switch = "switch",
  /** 可拖拽项 */
  crossSortable = "CrossSortable",
  /** 可拖拽输入项 */
  crossSortableInput = "CrossSortableInput",
  /** 带单位的输入框 */
  inputSymbol = "InputSymbol",
}

export type EditorProp = {
  type: PropType;
  label: string;
  tips?: string;
  /** 表单域标签的位置 */
  labelPosition?: string;
  /** 表单项默认值 */
  defaultValue?: any;
  required?: boolean;
} & {
  /** 可选项 */
  options?: SelectOptions;
  /** 是否可以多选 */
  multiple?: boolean;
  /** 项属性配置 */
  showItemPropsConfig?: boolean;
} & {
  max?: number;
  min?: number;
} & {
  table?: TableOption;
};

export type SelectOptions = {
  label: string;
  value: string | number | boolean | object;
  [prop: string]: any;
}[];

export type TableOption = {
  options: {
    label: string; // 列显示文本
    field: string; // 列绑定的字段
  }[];
  showKey: string;
};
