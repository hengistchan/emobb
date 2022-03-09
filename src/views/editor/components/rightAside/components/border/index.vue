<script lang="tsx">
  import { Component, EditorComponent } from "@/package/types/component";
  import { Menu, SemiSelect, Close, MoreFilled } from "@element-plus/icons-vue";
  import { defineComponent, PropType, reactive, ref, watch } from "vue";
  import FormWrapper from "../FormWrapper";
  import InputWithSymbol from "../layout/InputWithSymbol.vue";
  import { useVModel } from "@vueuse/core";
  import SliderWithSymbol from "./SliderWithSymbol.vue";
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
      const borders = [
        { name: "none", label: "无", icon: <Close /> },
        { name: "solid", label: "实线", icon: <SemiSelect /> },
        { name: "dotted", label: "虚线", icon: <MoreFilled /> },
        // { name: "fixed", label: "固定定位", icon: <Lock /> },
      ];
      return () => (
        <>
          <FormWrapper>
            {{
              default: () => (
                <>
                  <el-form-item label={"边框"}>
                    <el-radio-group
                      v-model={currentComponent.value.styles["borderStyle"]}
                      size={"small"}
                    >
                      {borders.map((border) => (
                        <el-radio-button label={border.name}>
                          <el-tooltip
                            effect={"dark"}
                            content={border.label}
                            placement={"top"}
                          >
                            <el-icon size={12}>{border.icon}</el-icon>
                          </el-tooltip>
                        </el-radio-button>
                      ))}
                    </el-radio-group>
                  </el-form-item>
                  {currentComponent.value.styles["borderStyle"] &&
                    currentComponent.value.styles["borderStyle"] !== "none" && (
                      <>
                        <el-form-item label={"边框宽度"} class="input-mini">
                          <el-input
                            v-model={
                              currentComponent.value.styles[`borderWidth`]
                            }
                            placeholder=""
                          ></el-input>
                        </el-form-item>
                        <el-form-item label={"边框颜色"}>
                          <el-color-picker
                            v-model={
                              currentComponent.value.styles["borderColor"]
                            }
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
                        <el-form-item label={"边框圆角"}>
                          <SliderWithSymbol
                            min={0}
                            max={50}
                            v-model={
                              currentComponent.value.styles["borderRadius"]
                            }
                          ></SliderWithSymbol>
                        </el-form-item>
                      </>
                    )}
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
