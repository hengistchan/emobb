import { defineComponent, PropType } from "vue";
import { Component } from "@/package/types/component";
import componentModules from "@/package";

export default defineComponent({
  name: "render",
  props: {
    element: {
      type: Object as PropType<Component>,
      default: () => ({}),
    },
  },
  setup({ element }) {
    return componentModules[element.moduleName].componentMap[
      element.name
    ].render({
      styles: element.styles,
      props: element.props || {},
      model: {},
      component: element,
      custom: {},
    });
  },
});
