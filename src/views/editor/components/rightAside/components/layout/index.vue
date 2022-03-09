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
  import {
    computed,
    defineComponent,
    PropType,
    reactive,
    ref,
    watch,
  } from "vue";
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
      const currentComponent = computed(() => props.currentComponent);

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
                <el-form-item label={"宽度"} class="input-mini">
                  <el-input
                    v-model={currentComponent.value.styles["width"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label={"高度"} class="input-mini">
                  <el-input
                    v-model={currentComponent.value.styles["height"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label="上内边距" class="input-mini">
                  <el-input
                    v-model={currentComponent.value.styles["paddingTop"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label="右内边距" class="input-mini">
                  <el-input
                    v-model={currentComponent.value.styles["paddingRight"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label="下内边距" class="input-mini">
                  <el-input
                    v-model={currentComponent.value.styles["paddingBottom"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label="左内边距" class="input-mini">
                  <el-input
                    v-model={currentComponent.value.styles["paddingLeft"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label="上外边距" class="input-mini">
                  <el-input
                    v-model={currentComponent.value.styles["marginTop"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label="右外边距" class="input-mini">
                  <el-input
                    v-model={currentComponent.value.styles["marginRight"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label="下外边距" class="input-mini">
                  <el-input
                    v-model={currentComponent.value.styles["marginBottom"]}
                  ></el-input>
                </el-form-item>
                <el-form-item label="左外边距" class="input-mini">
                  <el-input
                    v-model={currentComponent.value.styles["marginLeft"]}
                  ></el-input>
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
