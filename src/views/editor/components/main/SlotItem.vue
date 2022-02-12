<template>
  <div class="slot">
    <draggable
      v-model="slotData!.children"
      group="components"
      item-key="_id"
      tag="transition-group"
    >
      <template #item="{ element }">
        <edit-wrapper :element="element">
          <render-component :element="element">
            <!-- {{ element.props?.slots }} -->
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
</template>

<script lang="ts">
  import { Component } from "@/package/types/component";
  import { defineComponent, PropType } from "vue";
  import draggable from "vuedraggable";
  import { useVModel } from "@vueuse/core";
  import RenderComponent from "./RenderComponent";
  import EditWrapper from "./EditWrapper.vue";

  export default defineComponent({
    components: {
      draggable,
      RenderComponent,
      EditWrapper,
    },
    props: {
      children: {
        type: Array as PropType<Component[]>,
        default: () => [],
      },
      slotData: {
        type: Object,
        required: true,
      },
    },
    emits: ["update:children"],
    setup(props, { emit }) {
      return {
        slotChildren: useVModel(props, "children", emit),
      };
    },
  });
</script>

<style lang="scss">
  .slot {
    position: relative;
    min-height: 40px;
    border: 1px solid black;
  }
</style>
