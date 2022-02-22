import { defineComponent, reactive, watchEffect } from "vue";
import useEditorStore from "@/store/editor";

export default defineComponent({
  setup(props, { slots }) {
    const editorEditor = useEditorStore();
    // const pageStyles = reactive({
    //   backgroundColor: "",
    //   backgroundImage: "",
    //   backgroundRepeat: "",
    //   backgroundSize: "",
    // });
    // watchEffect(() => {
    //   const page = editorEditor.page;
    //   if (page && page.props) {
    //     pageStyles.backgroundColor =
    //       page.props.backgroundColor ?? pageStyles.backgroundColor;
    //   }
    // });
    return () => (
      <div style={editorEditor.page?.props}>
        {slots.default && slots.default()}
      </div>
    );
  },
});
