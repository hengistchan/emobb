<template>
  <div
    class="edit-wrapper"
    :data-id="element._id"
    :data-label="element.label"
    :class="{
      active: currentComponent === element._id,
    }"
    @click.stop="handleClick($event, element)"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Component } from "@/package/types/component";
  import { defineComponent, PropType, computed } from "vue";
  import useEditor from "@/views/editor/hook/useEditor";
  import useEditorStore from "@/store/editor";

  export default defineComponent({
    props: {
      element: {
        type: Object as PropType<Component>,
        required: true,
      },
    },
    setup() {
      const editorStore = useEditorStore();
      const currentComponent = computed(() => editorStore.currentComponent);
      const { handleClick } = useEditor();
      return {
        handleClick,
        currentComponent,
      };
    },
  });
</script>

<style lang="scss">
  .edit-wrapper {
    cursor: grab;
    padding: 2px;
    position: relative;

    &:hover {
      cursor: grab;
      outline: 2px dotted #006eff;
      outline-offset: -2px;
    }

    &.active {
      outline: 2px solid #006eff;
      outline-offset: -2px;
    }

    &:hover::before,
    &.active::before {
      display: block;
      position: absolute;
      font-size: 12px;
      font-weight: 600;
      transform: translate(-100%, 0);
      color: #fff;
      height: 18px;
      line-height: 18px;
      padding: 0 6px;
      top: 0;
      left: -2px;
      border-radius: 3px;
      content: attr(data-label);
    }

    &:hover::before {
      background-color: #8ab0ee;
    }

    &.active::before {
      background-color: #0052d9;
    }
  }

  /**
  * 编辑器中组件拖拽的样式
  */
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

  .edit-wrapper.sortable-ghost {
    outline: none;
    padding: 0;
    &:hover,
    &.active {
      outline: none;
    }
  }
</style>
