/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <div class="simulator-container">
    <div ref="editorRef" class="simulator-editor">
      <DraggableTransitionGroup
        v-model:drag="drag"
        v-model="page!.components"
        draggable=".item-drag"
        item-key="_id"
      >
        <template #item="{ element: outElement }">
          <EditWrapper
            class="list-group-item"
            :element="outElement"
            :data-label="outElement.label"
            :class="{
              focus: outElement.focus,
              focusWithChild: outElement.focusWithChild,
              drag,
              ['has-slot']: !!Object.keys(outElement.props.slots || {}).length,
            }"
            :parent="page!.components"
          >
            <render-component
              :key="outElement._vid"
              :element="outElement"
              :style="{
                pointerEvents: Object.keys(outElement.props?.slots || {}).length
                  ? 'auto'
                  : 'none',
              }"
            >
              <template
                v-for="(value, slotKey) in outElement.props?.slots"
                :key="slotKey"
                #[slotKey]
              >
                <SlotItem
                  v-model:children="value.children"
                  v-model:drag="drag"
                  :slot-key="`${slotKey}`"
                />
              </template>
            </render-component>
          </EditWrapper>
        </template>
      </DraggableTransitionGroup>
    </div>
  </div>
</template>

<!--  -->

<script lang="ts">
  import { defineComponent, computed, reactive, toRefs, ref } from "vue";
  import useEditorStore from "@/store/editor";
  import useEditor from "@/views/editor/hook/useEditor";
  import RenderComponent from "./RenderComponent";
  import EditWrapper from "./EditWrapper.vue";
  import SlotItem from "./SlotItem.vue";
  import DraggableTransitionGroup from "./draggable-transition-group.vue";

  export default defineComponent({
    components: {
      SlotItem,
      DraggableTransitionGroup,
      RenderComponent,
      EditWrapper,
    },
    setup() {
      const editorStore = useEditorStore();
      const editorRef = ref<HTMLElement | null>(null);
      const page = computed(() => editorStore.page);
      const { handleClick } = useEditor();
      const state = reactive({
        drag: false,
      });
      return {
        page,
        handleClick,
        editorRef,
        ...toRefs(state),
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

      .ghost {
        width: 100%;
        display: block;
        background-color: #016fff;
        height: 2px;
        > * {
          display: none;
        }
        // &::before,
        // &::after {
        //   content: "" !important;
        //   display: block !important;
        //   width: 4px !important;
        //   height: 4px !important;
        //   border: 2px solid #016fff !important;
        //   position: absolute !important;
        //   top: 0 !important;
        //   font-size: 16px !important;
        //   font-weight: 600 !important;
        //   transform: translate(0, -3px) !important;
        //   color: #fff !important;
        //   line-height: 0px !important;
        //   padding: 0 !important;
        //   border-radius: 50% !important;
        //   background-color: #fff !important;
        // }
        // &::before {
        //   left: -2px !important;
        // }
        // &::after {
        //   right: -2px !important;
        // }
      }

      .edit-wrapper.ghost {
        outline: none;
        padding: 0;
        &:hover,
        &.active {
          outline: none;
        }
      }
    }
  }
</style>
