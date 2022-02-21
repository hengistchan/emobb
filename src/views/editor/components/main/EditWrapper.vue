<template>
  <div
    class="edit-wrapper"
    :data-id="element._id"
    :data-label="element.label"
    :class="{
      active: currentComponent === element._id,
    }"
    @click.stop="handleClick($event, element, parent)"
    @contextmenu.stop="handleContextMenu($event, element._id, parent)"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Component } from "@/package/types/component";
  import { defineComponent, PropType, computed } from "vue";
  import useEditor from "@/views/editor/hook/useEditor";
  import useEditorStore from "@/store/editor";
  import useContextMenu from "../../hook/useContentMenu";

  export default defineComponent({
    props: {
      element: {
        type: Object as PropType<Component>,
        required: true,
      },
      parent: {
        type: Array as PropType<Component[]>,
        required: true,
      },
    },
    setup() {
      const editorStore = useEditorStore();
      const currentComponent = computed(() => editorStore.currentComponent);
      const { handleContextMenu } = useContextMenu();
      const { handleClick } = useEditor();
      return {
        handleClick,
        currentComponent,
        handleContextMenu,
      };
    },
  });
</script>

<style lang="scss">
  /**
  * 编辑器中组件拖拽的样式
  */
  .simulator-editor {
    .sortable-ghost {
      width: 100%;
      display: block;
      background-color: #016fff;
      height: 2px;
      > * {
        display: none;
      }
      &::before,
      &::after {
        content: "" !important;
        display: block !important;
        width: 4px !important;
        height: 4px !important;
        border: 2px solid #016fff !important;
        position: absolute !important;
        top: 0 !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        transform: translate(0, -3px) !important;
        color: #fff !important;
        line-height: 0px !important;
        padding: 0 !important;
        border-radius: 50% !important;
        background-color: #fff !important;
      }
      &::before {
        left: -2px !important;
      }
      &::after {
        right: -2px !important;
      }
    }
  }

  .edit-wrapper.sortable-ghost {
    outline: none;
    padding: 0;
    &:hover,
    &.active {
      outline: none;
    }
  }
</style>
