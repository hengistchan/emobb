import { inject, watch } from "vue";
import { FormRef } from "../components/form/form";
import { Model } from "../types/component";

const useFormItem = (props: any, id: string) => {
  const formRef = inject("$$fromRef") as FormRef;
  const formModels = inject("$$formModels") as any;
  const model = inject("$$model") as any;
  watch(
    () => props.prop,
    (newProp, oldProp) => {
      if (!formModels[id]) {
        formModels[id] = {
          name: props.prop,
          key: id,
          defaultValue: undefined,
        } as Model;
      } else {
        formModels[id].name = newProp;
      }
    },
  );
  return {
    formRef,
    formModels,
    model,
  };
};

export default useFormItem;
