<script lang="tsx">
  import { Component, EditorComponent } from "@/package/types/component";
  import { EditorProp, EditorPropType } from "@/package/types/prop.d";
  import { defineComponent, PropType, toRef } from "vue";

  export default defineComponent({
    props: {
      editorComponent: {
        type: Object as PropType<EditorComponent>,
        required: true,
      },
      component: {
        type: Object as PropType<Component>,
        required: true,
      },
    },
    setup(props) {
      const renderFormItem = (key: string, propConfig: EditorProp) => {
        const listForProp: { [k: string]: () => JSX.Element } = {
          [EditorPropType.input]: () => {
            return (
              <el-input
                type="input"
                v-model={props.component.props[key]}
              ></el-input>
            );
          },
        };

        return listForProp[propConfig.type]();
      };
      return () => (
        <>
          {Object.entries(props.editorComponent.props ?? {}).map(
            ([propName, propConfig]) => {
              return (
                <>
                  <el-form-item key={props.component._id + "_" + propName}>
                    {{
                      label: () => <>{propConfig.label}</>,
                      default: () => renderFormItem(propName, propConfig),
                    }}
                  </el-form-item>
                </>
              );
            },
          )}
        </>
      );
    },
  });
</script>
