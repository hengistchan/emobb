<template>
  <div><router-link to="/editor">editor</router-link></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from "vue";
  import useUser from "@/hook/useUser";

  export default defineComponent({
    setup() {
      const { getUserInfo } = useUser();
      onMounted(async () => {
        await getUserInfo(true);
      });
      return {};
    },
  });
</script>

<style lang="scss"></style>
