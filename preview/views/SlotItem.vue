<template>
  <RenderComponent :element="element">
    <template v-for="(value, key) in element.props?.slots" :key="key" #[key]>
      <template v-for="item in value?.children" :key="item._id">
        <SlotItem :element="item"></SlotItem>
      </template>
    </template>
  </RenderComponent>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import RenderComponent from "./RenderComponent";
  import { Component } from "@/package/types/component";

  export default defineComponent({
    name: "SlotItem",
    components: { RenderComponent },
    props: {
      element: {
        type: Object as PropType<Component>,
        required: true,
      },
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="scss"></style>
