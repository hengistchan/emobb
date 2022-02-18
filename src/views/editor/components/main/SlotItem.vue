<template>
  <draggable-transition-group
    v-model="slotChildren"
    v-model:drag="isDrag"
    class="inner-draggable"
    :class="{ slot: !slotChildren?.length }"
    draggable=".item-drag"
    :data-slot="`插槽（${slotKey}）\n 拖拽组件到此处`"
    item-key="_id"
  >
    <template #item="{ element: innerElement }">
      <edit-wrapper
        class="list-group-item inner"
        :data-label="innerElement.label"
        :class="{
          focus: innerElement.focus,
          focusWithChild: innerElement.focusWithChild,
        }"
        :element="innerElement"
        :parent="slotChildren"
      >
        <render-component
          :element="innerElement"
          :style="{
            pointerEvents: Object.keys(innerElement.props?.slots || {}).length
              ? 'auto'
              : 'none',
          }"
        >
          <template
            v-for="(value, key) in innerElement.props?.slots"
            :key="key"
            #[key]
          >
            <SlotItem
              v-model:children="value.children"
              v-model:drag="isDrag"
              :slot-key="`${key}`"
              :data-parent-id="innerElement._id"
            />
          </template>
        </render-component>
      </edit-wrapper>
    </template>
  </draggable-transition-group>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { useVModel } from "@vueuse/core";
  import DraggableTransitionGroup from "./draggable-transition-group.vue";
  import RenderComponent from "./RenderComponent";
  import { Component } from "@/package/types/component";
  import EditWrapper from "./EditWrapper.vue";

  export default defineComponent({
    name: "SlotItem",
    components: { RenderComponent, DraggableTransitionGroup, EditWrapper },
    props: {
      slotKey: {
        type: String as PropType<string>,
        default: "",
      },
      drag: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      children: {
        type: Array as PropType<Component[]>,
        default: () => [],
      },
    },
    emits: ["update:children", "on-selected", "update:drag"],
    setup(props, { emit }) {
      return {
        isDrag: useVModel(props, "drag", emit),
        slotChildren: useVModel(props, "children", emit),
      };
    },
  });
</script>

<style lang="scss">
  // @import "./func.scss";

  .inner-draggable {
    position: relative;
  }

  .inner-draggable.slot::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    height: auto;
    min-height: 40px;
    font-size: 12px;
    color: #8591a2;
    text-align: center;
    background: rgba(246, 247, 249, 0.5);
    content: attr(data-slot);
    outline: 1px dashed #dedede;
    outline-offset: -1px;
    flex-direction: column;
    justify-content: center;
  }

  .list-group-item {
    position: relative;
    padding: 3px;
    cursor: move;
  }
</style>
