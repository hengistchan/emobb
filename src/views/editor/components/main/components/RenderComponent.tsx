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
    const editorComponent =
      componentModules[props.element.moduleName].componentMap[
        props.element.name
      ];

    return editorComponent.render({
      styles: props.element.styles,
      props: props.element.props || {},
      component: props.element,
      actions: props.element.actions,
    });
  },
});
