<script lang="tsx">
  import { defineComponent, computed, ref } from "vue";
  import useEditor from "../../hook/useEditor";
  import { Warning } from "@element-plus/icons-vue";
  import PropConfig from "./components/basic/PropConfig.vue";
  import attributes from "./components/index";

  export default defineComponent({
    components: { Warning, PropConfig },
    setup() {
      const { currentComponent, currentEditorComponent } = useEditor();
      const activeName = ref("basic");
      return () => (
        <div class={"editor-right-attribute"}>
          <el-form labelPosition={"left"} label-width={90}>
            <el-form-item label="组件ID">
              {currentComponent.value && currentComponent.value._id}
            </el-form-item>
          </el-form>
          <el-collapse v-model={activeName.value}>
            {attributes.map(
              (attribute, index) =>
                currentComponent.value &&
                currentEditorComponent.value && (
                  <el-collapse-item
                    key={index}
                    name={attribute.label}
                    title={attribute.name}
                  >
                    {attribute?.component &&
                      attribute?.component(
                        currentComponent.value,
                        currentEditorComponent.value,
                      )}
                  </el-collapse-item>
                ),
            )}
          </el-collapse>
        </div>
      );
    },
  });
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
