<script lang="tsx">
  import { Component, EditorComponent } from "@/package/types/component";
  import { Menu, Lock, Operation, Rank } from "@element-plus/icons-vue";
  import { defineComponent, PropType, reactive, ref, watch } from "vue";
  import FormWrapper from "../FormWrapper";
  import InputWithSymbol from "../layout/InputWithSymbol.vue";
  import { useVModel } from "@vueuse/core";

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
      const position = [
        { name: "static", label: "静态定位", icon: <Rank /> },
        { name: "absolute", label: "绝对定位", icon: <Operation /> },
        { name: "relative", label: "相对定位", icon: <Menu /> },
        // { name: "fixed", label: "固定定位", icon: <Lock /> },
      ];
      return () => (
        <FormWrapper>
          {{
            default: () => (
              <>
                <el-form-item label={"布局模式"}>
                  <el-radio-group
                    v-model={currentComponent.value.styles["position"]}
                    size={"small"}
                  >
                    {position.map((position) => (
                      <el-radio-button label={position.name}>
                        <el-tooltip
                          effect={"dark"}
                          content={position.label}
                          placement={"top"}
                        >
                          <el-icon size={12}>{position.icon}</el-icon>
                        </el-tooltip>
                      </el-radio-button>
                    ))}
                  </el-radio-group>
                </el-form-item>
                {currentComponent.value.styles["position"] !== "static" && (
                  <el-form-item
                    label-width="0"
                    class="editor-right-aside__padding"
                  >
                    <el-row style={{ width: "100%" }}>
                      <el-col span={8} offset={8}>
                        <InputWithSymbol
                          v-model={currentComponent.value.styles[`top`]}
                        ></InputWithSymbol>
                      </el-col>
                    </el-row>
                    <el-row style={{ width: "100%" }}>
                      <el-col span={8} offset={0}>
                        <InputWithSymbol
                          v-model={currentComponent.value.styles[`left`]}
                        ></InputWithSymbol>
                      </el-col>
                      <el-col span={8} offset={8}>
                        <InputWithSymbol
                          v-model={currentComponent.value.styles[`right`]}
                        ></InputWithSymbol>
                      </el-col>
                    </el-row>
                    <el-row style={{ width: "100%" }}>
                      <el-col span={8} offset={8}>
                        <InputWithSymbol
                          v-model={currentComponent.value.styles[`bottom`]}
                        ></InputWithSymbol>
                      </el-col>
                    </el-row>
                  </el-form-item>
                )}
              </>
            ),
          }}
        </FormWrapper>
      );
    },
  });
</script>

<style lang="scss"></style>
