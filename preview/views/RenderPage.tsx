import { Page } from "@/package/types/page";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    props: {
      type: Object as PropType<Page["props"]>,
      required: true,
    },
  },
  setup(props, { slots }) {
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
      <div class="page" style={props.props}>
        {slots.default && slots.default()}
      </div>
    );
  },
});
