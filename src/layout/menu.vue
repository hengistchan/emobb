<script lang="tsx">
  import { defineComponent, ref } from "vue";
  import {
    HomeFilled,
    UserFilled,
    Collection,
    TrendCharts,
    Tools,
    Delete,
  } from "@element-plus/icons-vue";
  import { useRouter } from "vue-router";
  import CreateDrawer from "@/layout/components/CreateDialog.vue";

  export default defineComponent({
    setup() {
      const activeIndex = ref("1");
      const router = useRouter();
      const showCreateDrawer = ref(false);
      const iconSize = 18;
      return () => (
        <div>
          <CreateDrawer v-model:modelValue={showCreateDrawer.value} />
          <el-menu
            class="layout-menu"
            mode="vertical"
            active-text-color="#fff"
            background-color="#1e222d"
            text-color="#c1c6c8"
            default-activite={activeIndex.value}
          >
            <el-menu-item index="1" onClick={() => router.push("/")}>
              <el-icon size={iconSize}>
                <HomeFilled />
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="2">
              {{
                title: () => (
                  <>
                    <el-icon size={iconSize}>
                      <Collection />
                    </el-icon>
                    新建作品
                  </>
                ),
                default: () => (
                  <>
                    <el-menu-item
                      index="2-1"
                      onClick={() => (showCreateDrawer.value = true)}
                    >
                      新建空白模板
                    </el-menu-item>
                    <el-menu-item index="2-2">从模板新建</el-menu-item>
                  </>
                ),
              }}
            </el-sub-menu>
            <el-menu-item index="3" onClick={() => router.push("/work")}>
              <el-icon size={iconSize}>
                <TrendCharts />
              </el-icon>
              <span>作品管理</span>
            </el-menu-item>
            <el-menu-item index="4" onClick={() => router.push("/template")}>
              <el-icon size={iconSize}>
                <Tools />
              </el-icon>
              <span>模板管理</span>
            </el-menu-item>
            <el-menu-item index="5" onClick={() => router.push("/recycler")}>
              <el-icon size={iconSize}>
                <Delete />
              </el-icon>
              <span>回收站</span>
            </el-menu-item>
            <el-menu-item index="6" onClick={() => router.push("/mine")}>
              <el-icon size={iconSize}>
                <UserFilled />
              </el-icon>
              <span>用户信息</span>
            </el-menu-item>
          </el-menu>
        </div>
      );
    },
  });
</script>

<style lang="scss">
  .layout-menu {
    height: calc(100vh - 60px);
    padding-top: 35px;
    .el-menu-item,
    .el-sub-menu__title {
      font-size: 14px;
      i {
        margin-right: 15px;
      }
      &.is-active {
        background-color: #006eff;
      }
    }
    .el-menu-item {
      height: 45px;
      span {
        line-height: 45px;
        // margin-left: 15px;
      }
    }
  }
</style>
