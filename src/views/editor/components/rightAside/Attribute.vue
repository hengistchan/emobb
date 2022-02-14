<script lang="tsx">
  import { defineComponent, computed } from "vue";
  import useEditorStore from "@/store/editor";
  import componentModules from "@/package";
  import useEditor from "../../hook/useEditor";
  import { Warning } from "@element-plus/icons-vue";
  import PropConfig from "./PropConfig.vue";

  export default defineComponent({
    components: { Warning, PropConfig },
    setup() {
      const editorStore = useEditorStore();
      const {} = useEditor();
      const currentId = computed(() => editorStore.currentComponent);
      const currentComponent = computed(() =>
        editorStore.getComponentById(currentId.value),
      );
      const currentEditorComponent = computed(() => {
        if (currentComponent.value) {
          return componentModules[currentComponent.value.moduleName]
            .componentMap[currentComponent.value.name];
        }
        return null;
      });
      const FormEditor = () => {
        const content: JSX.Element[] = [];
        if (!!currentComponent.value?._id) {
          content.push(
            <>
              <el-form-item label="组件ID">
                {currentComponent.value._id}
              </el-form-item>
            </>,
          );
          const editorComponent =
            componentModules[currentComponent.value.moduleName].componentMap[
              currentComponent.value.name
            ];
          if (!!editorComponent.props) {
            content.push(
              <PropConfig
                component={currentComponent.value}
                editorComponent={editorComponent}
              />,
            );
          }
        }
        return <>{content}</>;
      };
      return () => (
        <div class="editor-right-attribute">
          <el-form labelPosition={"left"} label-width={90}>
            <FormEditor />
          </el-form>
        </div>
      );
    },
  });
</script>

<style lang="scss">
  .editor-right-attribute {
    font-weight: 500;
  }
</style>
