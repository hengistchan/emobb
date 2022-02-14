<script lang="tsx">
  import { defineComponent, computed, ref } from "vue";
  import useEditorStore from "@/store/editor";
  import componentModules from "@/package";
  import useEditor from "../../hook/useEditor";
  import { Warning } from "@element-plus/icons-vue";
  import PropConfig from "./PropConfig.vue";
  import attributes from "./components/index";

  export default defineComponent({
    components: { Warning, PropConfig },
    setup() {
      const editorStore = useEditorStore();
      const {} = useEditor();
      const activeName = ref("basic");
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
      return () => (
        <div class={"editor-right-attribute"}>
          <el-form labelPosition={"left"} label-width={90}>
            <el-form-item label="组件ID">
              {currentComponent.value && currentComponent.value._id}
            </el-form-item>
          </el-form>
          <el-collapse v-model={activeName.value}>
            {attributes.map((attribute, index) => (
              <el-collapse-item
                key={index}
                name={attribute.label}
                title={attribute.name}
              >
                1
              </el-collapse-item>
            ))}
          </el-collapse>
        </div>
      );
    },
  });

  // // old
  // <div class="editor-right-attribute">
  //         <el-form labelPosition={"left"} label-width={90}>
  //           <FormEditor />
  //         </el-form>
  //       </div>
</script>

<style lang="scss">
  .editor-right-attribute {
    font-weight: 500;
    .el-collapse-item__header {
      padding-left: 18px;
      font-weight: 600;
    }
  }
</style>
