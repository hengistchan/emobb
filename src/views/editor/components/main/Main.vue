/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <div class="simulator-container">
    <div class="simulator-editor">
      <draggable
        v-model="page!.components"
        tag="transition-group"
        group="components"
        item-key="_id"
      >
        <template #item="{ element }">
          <edit-wrapper :element="element">
            <render-component :element="element">
              <template
                v-for="(value, key) in element.props?.slots"
                :key="key"
                #[key]
              >
                <slot-item :slot-data="value" :slot-key="key" />
              </template>
            </render-component>
          </edit-wrapper>
        </template>
      </draggable>
    </div>
  </div>
</template>

<!--  -->

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import draggable from "vuedraggable";
  import useEditorStore from "@/store/editor";
  import useEditor from "@/views/editor/hook/useEditor";
  import RenderComponent from "./RenderComponent";
  import EditWrapper from "./EditWrapper.vue";
  import SlotItem from "./SlotItem.vue";

  export default defineComponent({
    components: { draggable, RenderComponent, EditWrapper, SlotItem },
    setup() {
      const editorStore = useEditorStore();
      const page = computed(() => editorStore.page);
      const currentComponent = computed(() => editorStore.currentComponent);
      const { handleClick, handleMouseOver } = useEditor();
      const change = (e: any) => {
        console.log(e);
      };
      return {
        page,
        change,
        handleClick,
        currentComponent,
        handleMouseOver,
      };
    },
  });
</script>

<style lang="scss">
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
      // overflow-y: auto;
      // overflow-x: hidden;
    }
  }
</style>
