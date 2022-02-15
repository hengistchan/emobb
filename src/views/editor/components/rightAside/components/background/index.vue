<script lang="tsx">
  import { Component, EditorComponent } from "@/package/types/component";
  import { Menu, Lock, Operation, Rank } from "@element-plus/icons-vue";
  import { defineComponent, PropType, reactive, ref, watch } from "vue";
  import FormWrapper from "../FormWrapper";
  import InputWithSymbol from "../layout/InputWithSymbol.vue";
  import { useVModel } from "@vueuse/core";
  import { fonts } from "@/package/components/text/text/props";

  export default defineComponent({
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
      const currentComponent = useVModel(props, "currentComponent");
      return () => (
        <>
          <FormWrapper>
            {{
              default: () => (
                <>
                  <el-form-item label={"背景颜色"}>
                    <el-color-picker
                      v-model={currentComponent.value.styles["backgroundColor"]}
                      show-alpha
                      predefine={[
                        "#ffffff",
                        "#f5222d",
                        "#fa541c",
                        "#fadb14",
                        "#52c41a",
                        "#1890ff",
                        "#722ed1",
                        "#8c8c8c",
                        "rgba(255, 69, 0, 0.68)",
                        "#000000",
                      ]}
                    ></el-color-picker>
                  </el-form-item>
                </>
              ),
            }}
          </FormWrapper>
        </>
      );
    },
  });
</script>

<style lang="scss"></style>
