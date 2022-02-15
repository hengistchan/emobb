<script lang="tsx">
  import { Component, EditorComponent } from "@/package/types/component";
  import { defineComponent, PropType } from "vue";
  import PropConfig from "./PropConfig.vue";
  import FormWrapper from "../FormWrapper";

  export default defineComponent({
    components: { PropConfig },
    props: {
      currentComponent: {
        type: Object as PropType<Component>,
        required: true,
      },
      currentEditorComponent: {
        type: Object as PropType<EditorComponent>,
        required: true,
      },
    },
    setup(props) {
      return () => (
        <FormWrapper>
          {{
            default: () => (
              <PropConfig
                component={props.currentComponent}
                editorComponent={props.currentEditorComponent}
              ></PropConfig>
            ),
          }}
        </FormWrapper>
      );
    },
  });
</script>
