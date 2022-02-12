/**
 * 创建右侧表单栏
 */
import { EditorProp, EditorPropType } from "../types/prop.d";

interface EditorInputProp {
  label: string;
  defaultValue?: any;
  tips?: string;
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
}

export const createInputProp = ({
  label,
  defaultValue,
  tips,
}: EditorInputProp): EditorProp => ({
  type: EditorPropType.input,
  label,
  tips,
  defaultValue,
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
