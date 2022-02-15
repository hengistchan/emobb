import { defineComponent, PropType, SetupContext, VNodeProps } from "vue";
import { ElForm } from "element-plus";

export default (props: VNodeProps, { slots }: SetupContext) => (
  <ElForm labelPosition={"left"} labelWidth={80}>
    {slots.default && slots.default()}
  </ElForm>
);
