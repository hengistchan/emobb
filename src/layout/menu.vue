<script lang="tsx">
  import { defineComponent, ref } from "vue";
  import { HomeFilled, UserFilled } from "@element-plus/icons-vue";
  import { useRouter } from "vue-router";

  export default defineComponent({
    setup() {
      const activeIndex = ref("1");
      const router = useRouter();
      return () => (
        <el-menu
          class="layout-menu"
          mode="vertical"
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          default-activite={activeIndex.value}
        >
          <el-menu-item index="1">
            <el-icon size={24}>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="3" title="134">
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2" onClick={() => router.push("/mine")}>
            <el-icon size={24}>
              <UserFilled />
            </el-icon>
            <span>用户信息</span>
          </el-menu-item>
        </el-menu>
      );
    },
  });
</script>

<style lang="scss">
  .layout-menu {
    height: calc(100vh - 60px);
    .el-menu-item {
      font-size: 16px;
    }
  }
</style>
