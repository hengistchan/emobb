/**
 * 创建右侧表单栏
 */
import { EditorProp, EditorPropType } from "../types/prop.d";

interface EditorInputProp {
  label: string;
  defaultValue?: any;
  tips?: string;
  required?: boolean;
  type?: string;
}

export type EditorSelectOptions = {
  label: string;
  value: string | number | boolean | object;
  [prop: string]: any;
}[];

interface EditorSelectProp {
  label: string;
  options: EditorSelectOptions;
  defaultValue?: any;
  multiple?: boolean;
  tips?: string;
  render?: () => JSX.Element;
}

export const createInputProp = ({
  label,
  defaultValue,
  tips,
  required,
  type = "text",
}: EditorInputProp): EditorProp => ({
  type: EditorPropType.input,
  label,
  tips,
  defaultValue,
  required,
  inputType: type,
});

export function createSelectProp({
  label,
  options,
  defaultValue,
  tips,
  multiple,
}: EditorSelectProp): EditorProp {
  return {
    type: EditorPropType.select,
    label,
    defaultValue,
    tips,
    options,
    multiple,
  };
}

interface EditorColorProp {
  label: string;
  defaultValue?: string;
}

export function createColorProp({
  label,
  defaultValue,
}: EditorColorProp): EditorProp {
  return {
    type: EditorPropType.color,
    label,
    defaultValue,
  };
}

interface EditorCrossSortableProp {
  label: string;
  labelPosition?: "top" | "";
  multiple?: boolean;
  showItemPropsConfig?: boolean;
  defaultValue?: string[] | EditorSelectOptions;
}

export function createCrossSortableProp({
  label,
  labelPosition,
  multiple,
  showItemPropsConfig,
  defaultValue,
}: EditorCrossSortableProp): EditorProp {
  return {
    type: EditorPropType.crossSortable,
    label,
    multiple,
    showItemPropsConfig,
    labelPosition,
    defaultValue,
  };
}

export function createCrossSortableInputProp({
  label,
  defaultValue,
}: EditorCrossSortableProp): EditorProp {
  return {
    type: EditorPropType.crossSortableInput,
    label,
    defaultValue,
  };
}

interface EditorSwitchProp {
  label: string;
  defaultValue?: boolean;
  tips?: string;
}

export function createSwitchProp({
  label,
  defaultValue,
  tips,
}: EditorSwitchProp): EditorProp {
  return {
    type: EditorPropType.switch,
    label,
    tips,
    defaultValue,
  };
}

interface EditorNumberInputProp {
  label: string;
  defaultValue?: any;
  tips?: string;
}

export const createNumberInputProp = ({
  label,
  defaultValue,
  tips,
}: EditorNumberInputProp): EditorProp => ({
  type: EditorPropType.inputNumber,
  label,
  tips,
  defaultValue,
});

export type EditorTableOption = {
  options: {
    label: string; // 列显示文本
    field: string; // 列绑定的字段
  }[];
  showKey: string;
};

interface EditorTableProp {
  label: string;
  // option: EditorTableOption;
  // defaultValue?: { label: string; value: string }[];
}

export function createTableProp({
  label,
}: // option,
// defaultValue,
EditorTableProp): EditorProp {
  return {
    type: EditorPropType.table,
    label,
    // table: option,
    // defaultValue,
  };
}

interface InputWithSymbolProp {
  label: string;
  defaultValue?: string;
}

export function createInputWithSymbolProp({
  label,
  defaultValue,
}: InputWithSymbolProp): EditorProp {
  return {
    type: EditorPropType.inputSymbol,
    label,
    defaultValue,
  };
}

interface CrossSortableInputWithCheckboxProp {
  label: string;
  defaultValue: { label: string; value: string }[];
}

export function createCrossSortableInputWithCheckboxProp({
  label,
  defaultValue,
}: CrossSortableInputWithCheckboxProp): EditorProp {
  return {
    type: EditorPropType.crossSortableInputWithCheckbox,
    label,
    defaultValue,
  };
}
