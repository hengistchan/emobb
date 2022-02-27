<template>
  <RenderPage v-if="page" :props="page.props">
    <template v-for="outElement in page.components" :key="outElement._id">
      <SlotItem :element="outElement"></SlotItem>
    </template>
  </RenderPage>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import { getURLParam, getPage } from "./helper/index";
  import RenderPage from "./views/RenderPage";
  import { Page } from "@/package/types/page";
  import SlotItem from "./views/SlotItem.vue";
  export default defineComponent({
    components: {
      RenderPage,
      SlotItem,
    },
    setup() {
      const page = ref<Page | null>(null);
      onMounted(async () => {
        const uuid = getURLParam("id") as string;
        const data = await getPage(uuid);
        page.value = data.page;
        document.title = page.value?.title || "Vite";
      });
      return {
        page,
      };
    },
  });
</script>

<style lang="scss"></style>
