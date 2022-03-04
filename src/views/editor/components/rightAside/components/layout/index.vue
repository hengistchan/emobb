/* eslint-disable vue/no-mutating-props */
<template>
  <div></div>
</template>

<script lang="tsx">
  import { Component, EditorComponent } from "@/package/types/component";
  import {
    Aim,
    Grid,
    CopyDocument,
    Connection,
    Close,
  } from "@element-plus/icons-vue";
  import { defineComponent, PropType, reactive, ref, watch } from "vue";
  import FormWrapper from "../FormWrapper";
  import InputWithSymbol from "./InputWithSymbol.vue";
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
      const displays = [
        { name: "inline", label: "内联布局", icon: <Aim /> },
        // { name: "flex", label: "flex布局", icon: <Grid /> },
        { name: "block", label: "块状布局", icon: <CopyDocument /> },
        { name: "inline-block", label: "行内块布局", icon: <Connection /> },
        { name: "none", label: "隐藏", icon: <Close /> },
      ];
      const padding = reactive({
        paddingLeft: "0",
        paddingRight: "0",
        paddingTop: "0",
        paddingBottom: "0",
      });
      const margin = reactive({
        marginLeft: "0",
        marginRight: "0",
        marginTop: "0",
        marginBottom: "0",
      });
      const currentComponent = useVModel(props, "currentComponent");
      if (!currentComponent.value.styles["padding"]) {
        currentComponent.value.styles["padding"] = "0 0 0 0";
      }
      if (!currentComponent.value.styles["margin"]) {
        currentComponent.value.styles["margin"] = "0 0 0 0";
      }
      watch(
        () => padding,
        (padding) => {
          currentComponent.value.styles[
            "padding"
          ] = `${padding.paddingTop} ${padding.paddingRight} ${padding.paddingBottom} ${padding.paddingLeft}`;
        },
        { deep: true },
      );

      watch(
        () => margin,
        (margin) => {
          currentComponent.value.styles[
            "margin"
          ] = `${margin.marginTop} ${margin.marginRight} ${margin.marginBottom} ${margin.marginLeft}`;
        },
        { deep: true },
      );

      return () => (
        <FormWrapper>
          {{
            default: () => (
              <>
                <el-form-item label={"布局模式"}>
                  <el-radio-group
                    v-model={currentComponent.value.styles["display"]}
                    size={"small"}
                  >
                    {displays.map((display) => (
                      <el-radio-button label={display.name}>
                        <el-tooltip
                          effect={"dark"}
                          content={display.label}
                          placement={"top"}
                        >
                          <el-icon size={12}>{display.icon}</el-icon>
                        </el-tooltip>
                      </el-radio-button>
                    ))}
                  </el-radio-group>
                </el-form-item>
                <el-form-item label={"宽度"}>
                  <el-input
                    v-model={currentComponent.value.styles["width"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label={"高度"}>
                  <el-input
                    v-model={currentComponent.value.styles["height"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label={"内边距"}></el-form-item>
                <el-form-item
                  label-width="0"
                  class="editor-right-aside__padding"
                >
                  <el-row style={{ width: "100%" }}>
                    <el-col span={8} offset={8}>
                      <InputWithSymbol
                        v-model={padding[`paddingTop` as keyof typeof padding]}
                      ></InputWithSymbol>
                    </el-col>
                  </el-row>
                  <el-row style={{ width: "100%" }}>
                    <el-col span={8} offset={0}>
                      <InputWithSymbol
                        v-model={padding[`paddingLeft` as keyof typeof padding]}
                      ></InputWithSymbol>
                    </el-col>
                    <el-col span={8} offset={8}>
                      <InputWithSymbol
                        v-model={
                          padding[`paddingRight` as keyof typeof padding]
                        }
                      ></InputWithSymbol>
                    </el-col>
                  </el-row>
                  <el-row style={{ width: "100%" }}>
                    <el-col span={8} offset={8}>
                      <InputWithSymbol
                        v-model={
                          padding[`paddingBottom` as keyof typeof padding]
                        }
                      ></InputWithSymbol>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label={"外边距"}></el-form-item>
                <el-form-item
                  label-width="0"
                  class="editor-right-aside__padding"
                >
                  <el-row style={{ width: "100%" }}>
                    <el-col span={8} offset={8}>
                      <InputWithSymbol
                        v-model={margin[`marginTop` as keyof typeof margin]}
                      ></InputWithSymbol>
                    </el-col>
                  </el-row>
                  <el-row style={{ width: "100%" }}>
                    <el-col span={8} offset={0}>
                      <InputWithSymbol
                        v-model={margin[`marginLeft` as keyof typeof margin]}
                      ></InputWithSymbol>
                    </el-col>
                    <el-col span={8} offset={8}>
                      <InputWithSymbol
                        v-model={margin[`marginRight` as keyof typeof margin]}
                      ></InputWithSymbol>
                    </el-col>
                  </el-row>
                  <el-row style={{ width: "100%" }}>
                    <el-col span={8} offset={8}>
                      <InputWithSymbol
                        v-model={margin[`marginBottom` as keyof typeof margin]}
                      ></InputWithSymbol>
                    </el-col>
                  </el-row>
                </el-form-item>
              </>
            ),
          }}
        </FormWrapper>
      );
    },
  });
</script>

<style lang="scss">
  @import "./styles.scss";
  .editor-right-aside__padding {
    .el-form-item__content {
      margin: 0 !important;
    }
  }
</style>
