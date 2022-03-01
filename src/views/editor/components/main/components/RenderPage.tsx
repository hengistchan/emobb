import {
  computed,
  defineComponent,
  provide,
  InjectionKey,
  watchEffect,
} from "vue";
import useEditorStore from "@/store/editor";

export default defineComponent({
  setup(props, { slots }) {
    const editorEditor = useEditorStore();
    return () => (
      <div style={editorEditor.page?.props}>
        {slots.default && slots.default()}
      </div>
    );
  },
});
