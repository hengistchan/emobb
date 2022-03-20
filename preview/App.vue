<template>
  <RenderPage v-if="page" :props="page.props">
    <template v-for="outElement in page.components" :key="outElement._id">
      <SlotItem :element="outElement"></SlotItem>
    </template>
  </RenderPage>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import { getPage } from "./helper/index";
  import RenderPage from "./views/RenderPage";
  import { Page } from "@/package/types/page";
  import SlotItem from "./views/SlotItem.vue";
  import { useFavicon, useTitle, useUrlSearchParams } from "@vueuse/core";
  import { emit } from "./helper/events";

  export default defineComponent({
    components: {
      RenderPage,
      SlotItem,
    },
    setup() {
      const page = ref<Page | null>(null);
      const title = useTitle();
      const favicon = useFavicon();
      const params = useUrlSearchParams("hash");
      onMounted(async () => {
        const uuid = params.id as string;
        const data = await getPage(uuid);
        page.value = data.page;
        title.value = page.value?.title || "Vite";
        favicon.value =
          page.value?.props?.icon ||
          "http://file.hengistchan.site/c6582d71812141d39c74bfe34054b96f.ico";
        emit(uuid);
      });
      return {
        page,
      };
    },
  });
</script>

<style lang="scss"></style>
