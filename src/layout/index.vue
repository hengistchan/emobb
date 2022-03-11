<template>
  <el-container class="layout-container">
    <el-aside class="layout-aside" width="210px">
      <div class="logo" @click="() => router.push('/')">E M O</div>
      <Menu />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <Header />
      </el-header>
      <el-main class="layout-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from "vue";
  import useUser from "@/hook/useUser";
  import Menu from "./menu.vue";
  import { useRouter } from "vue-router";
  import Header from "./header.vue";

  export default defineComponent({
    components: { Menu, Header },
    setup() {
      const { getUserInfo } = useUser();
      const router = useRouter();
      onMounted(async () => {
        await getUserInfo(true);
      });
      return { router };
    },
  });
</script>

<style lang="scss">
  .layout-container {
    width: 100vw;
    height: 100vh;
    .layout-aside {
      height: 100%;
      .logo {
        height: 60px;
        width: 100%;
        text-align: center;
        font-size: 30px;
        font-weight: 700;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .layout-header {
      height: 60px;
      background-color: #545c64;
    }
    .layout-main {
      height: calc(100vh - 40px);
      padding: 20px 0 0 0;
      background-color: #f0f0f0;
    }
  }
</style>
