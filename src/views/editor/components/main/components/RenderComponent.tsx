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
  setup(props) {
    // console.log(props.element, "element");
    // console.log("render", props);

    return componentModules[props.element.moduleName].componentMap[
      props.element.name
    ].render({
      styles: props.element.styles,
      props: props.element.props || {},
      model: {},
      component: props.element,
      custom: {},
    });
  },
});
