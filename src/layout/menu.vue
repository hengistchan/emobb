<script lang="tsx">
  import { defineComponent, ref } from "vue";
  import {
    HomeFilled,
    UserFilled,
    Collection,
    TrendCharts,
    Tools,
  } from "@element-plus/icons-vue";
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
          <el-menu-item index="1" onClick={() => router.push("/")}>
            <el-icon size={24}>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            {{
              title: () => (
                <>
                  <el-icon size={24}>
                    <Collection />
                  </el-icon>
                  新建作品
                </>
              ),
              default: () => (
                <>
                  <el-menu-item index="2-1">新建空白模板</el-menu-item>
                  <el-menu-item index="2-2">从模板新建</el-menu-item>
                </>
              ),
            }}
          </el-sub-menu>
          <el-menu-item index="3" onClick={() => router.push("/mine")}>
            <el-icon size={24}>
              <TrendCharts />
            </el-icon>
            <span>作品管理</span>
          </el-menu-item>
          <el-menu-item index="4" onClick={() => router.push("/mine")}>
            <el-icon size={24}>
              <Tools />
            </el-icon>
            <span>模板管理</span>
          </el-menu-item>
          <el-menu-item index="5" onClick={() => router.push("/mine")}>
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
    .el-menu-item,
    .el-sub-menu__title {
      font-size: 16px;
    }
  }
</style>
