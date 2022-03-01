import { inject, watch } from "vue";
import { FormRef } from "../components/form/form";
import { Model } from "../types/component";

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
        console.log(newProp);
        formModels[id].name = newProp.prop;
        formModels[id].defaultValue =
          newProp.default == null ? undefined : newProp.default;
      }
    },
    { deep: true },
  );
  return {
    formRef,
    formModels,
    model,
  };
};

export default useFormItem;
