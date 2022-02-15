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
    setup() {
      const position = [
        { name: "static", label: "静态定位", icon: <Aim /> },
        // { name: "flex", label: "flex布局", icon: <Grid /> },
        { name: "abs", label: "块状布局", icon: <CopyDocument /> },
        { name: "inline-block", label: "行内块布局", icon: <Connection /> },
        { name: "none", label: "隐藏", icon: <Close /> },
      ];
      const padding = reactive({
        paddingLeft: "0",
        paddingRight: "0",
        paddingTop: "0",
        paddingBottom: "0",
      });
      return {};
    },
  });
</script>

<style lang="scss"></style>
