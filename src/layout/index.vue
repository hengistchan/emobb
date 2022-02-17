<template>
  <el-container class="layout-container">
    <el-aside class="layout-aside">
      <Menu />
    </el-aside>
    <el-container>
      <el-header class="layout-header"></el-header>
      <el-main class="layout-main"> </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from "vue";
  import useUser from "@/hook/useUser";
  import Menu from "./menu.vue";

  export default defineComponent({
    components: { Menu },
    setup() {
      const { getUserInfo } = useUser();
      onMounted(async () => {
        await getUserInfo(true);
      });
      return {};
    },
  });
</script>

<style lang="scss">
  .layout-container {
    width: 100vw;
    height: 100vh;
    .layout-aside {
      height: 100%;
    }
    .layout-header {
      height: 60px;
    }
    .layout-main {
      height: calc(100vh - 40px);
    }
  }
</style>
