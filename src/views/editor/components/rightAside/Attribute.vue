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
              <el-form-item label="组件ID" labelWidth={"76px"}>
                {currentComponent.value._id}
                <el-popover
                  width={200}
                  trigger="hover"
                  effect="dark"
                  content={`你可以利用该组件ID。对该组件进行获取和设置其属性，组件可用属性可在控制台输入：$$refs.${currentComponent.value._id} 进行查看`}
                >
                  {{
                    reference: () => (
                      <el-icon class={"ml-6px"}>
                        <Warning />
                      </el-icon>
                    ),
                  }}
                </el-popover>
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
          <el-form labelPosition={"left"}>
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
