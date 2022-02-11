import { Component, defineComponent, PropType } from "vue";

const RenderVNode = defineComponent({
  props: {
    vNode: Object as PropType<Component>,
  },
  render() {
    return this.vNode?.name;
  },
});

export default RenderVNode;
