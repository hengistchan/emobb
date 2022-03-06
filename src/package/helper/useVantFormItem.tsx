import { inject, SetupContext, watch } from "vue";
import { FormRef } from "../components/form/form";
import { Model } from "../types/component";
import { v4 as uuidv4 } from "uuid";
import { Field } from "vant";

import {
  createInputProp,
  createInputWithSymbolProp,
  createSelectProp,
  createSwitchProp,
} from "@/package/helper/CreateProps";

export const createCommonFormProps = (label: string, placeholder: string) => {
  return {
    prop: createInputProp({
      label: "字段绑定",
      defaultValue: uuidv4().slice(0, 5),
      required: true,
    }),
    label: createInputProp({
      label: "label文本",
      defaultValue: label,
    }),
    required: createSwitchProp({ label: "是否必填", defaultValue: false }),
    size: createSelectProp({
      label: "表单项大小",
      options: [
        { label: "正常", value: "" },
        { label: "大", value: "large" },
      ],
      defaultValue: "",
    }),
    placeholder: createInputProp({
      label: "占位文字",
      defaultValue: placeholder,
    }),
  };
};

const useVantFormItem = (props: any, id: string) => {
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
      <Field {...props}>
        {{ input: () => slots.default && slots.default() }}
      </Field>
    </>
  );

  return {
    formRef,
    formModels,
    model,
    FormItemWrapper,
  };
};

export default useVantFormItem;
