<template>
  <div></div>
</template>

<script lang="tsx">
  import { Component, EditorComponent } from "@/package/types/component";
  import { ElFormItem, ElRadioButton, ElRadioGroup } from "element-plus";
  import { defineComponent, PropType } from "vue";
  import FormWrapper from "../FormWrapper";

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
      return () => (
        <FormWrapper>
          {{
            default: () => (
              <>
                <ElFormItem label={"布局模式"}>
                  <ElRadioGroup
                    v-model={props.currentComponent.styles["display"]}
                  >
                    <ElRadioButton label="flex"></ElRadioButton>
                  </ElRadioGroup>
                </ElFormItem>
              </>
            ),
          }}
        </FormWrapper>
      );
    },
  });
</script>

<style lang="scss"></style>
