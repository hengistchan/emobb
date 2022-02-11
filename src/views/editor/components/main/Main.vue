<template>
  <div class="simulator-container">
    <div class="simulator-editor">
      <draggable
        v-model="page!.components"
        tag="transition-group"
        group="components"
        item-key="_id"
        @change="change"
      >
        <template #item="{ element }">
          <render-component
            :key="element._id"
            :element="element"
          ></render-component>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import draggable from "vuedraggable";
  import useEditorStore from "@/store/editor";
  import RenderComponent from "./RenderComponent";

  export default defineComponent({
    components: { draggable, RenderComponent },
    setup() {
      const editorStore = useEditorStore();
      const page = computed(() => editorStore.page);
      const components = editorStore.page?.components;
      const change = (e: any) => {
        console.log(e);
      };
      return {
        page,
        components,
        change,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .simulator-container {
    width: 100%;
    height: calc(100vh - 90px);
    overflow-x: hidden;
    background-color: #ebedf1;
    overflow-y: auto;
    padding-bottom: 10px;
    .simulator-editor {
      width: 377px;
      height: 669px;
      margin: 20px auto 0;
      background-color: #fff;
      box-shadow: 0 8px 12px #ebedf0;
    }
  }
</style>
