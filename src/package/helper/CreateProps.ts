/**
 * 创建右侧表单栏
 */
import { EditorProp, EditorPropType } from "../types/prop.d";

interface EditorInputProp {
  label: string;
  defaultValue?: any;
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
