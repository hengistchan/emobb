import { ElFormItem } from "element-plus";
import { AppContext, inject, SetupContext, watch } from "vue";
import { FormRef } from "../components/form/form";
import { Model } from "../types/component";
import {
  createInputProp,
  createInputWithSymbolProp,
  createSwitchProp,
} from "@/package/helper/CreateProps";

export const formItemProps = {
  label: createInputProp({
    label: "标签",
    defaultValue: "字段",
  }),
  required: createSwitchProp({
    label: "是否必须",
    defaultValue: false,
  }),
  labelWidth: createInputWithSymbolProp({
    label: "标签宽度",
    defaultValue: "60px",
  }),
  inlineMessage: createSwitchProp({
    label: "行内错误",
    defaultValue: false,
  }),
};

const useFormItem = (props: any, id: string) => {
  const formRef = inject("$$fromRef") as FormRef;
  const formModels = inject("$$formModels") as any;
  const model = inject("$$model") as any;
  watch(
    () => props,
    (newProp) => {
      if (!formModels[id]) {
        formModels[id] = {
          name: props.prop,
          key: id,
          defaultValue: null ? undefined : newProp.default,
        } as Model;
      } else {
        formModels[id].name = newProp.prop;
        formModels[id].defaultValue =
          newProp.default == null ? undefined : newProp.default;
      }
    },
    { deep: true, immediate: true },
  );

  const FormItemWrapper = (props: any, { slots }: SetupContext) => (
    <>
      <ElFormItem
        // style={props.style}
        prop={props.props.prop}
        label={props.props.label}
        labelWidth={props.props.labelWidth}
        required={props.props.required}
        inlineMessage={props.props.inlineMessage}
      >
        {slots.default && slots.default()}
      </ElFormItem>
    </>
  );

  return {
    formRef,
    formModels,
    model,
    FormItemWrapper,
  };
};

export default useFormItem;
