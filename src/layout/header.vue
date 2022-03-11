<script lang="tsx">
  import message from "@/helper/message";
  import store from "store2";
  import { defineComponent } from "vue";
  import { useRouter } from "vue-router";
  import useUserStore from "@/store/user";

  export default defineComponent({
    setup() {
      const router = useRouter();
      const handleLogout = () => {
        message("success", "退出登录成功");
        store.clearAll();
        router.push("/user");
      };
      const userStore = useUserStore();
      return () => (
        <el-container class="layout-header-container">
          <el-aside class="left"></el-aside>
          <el-aside class="right">
            <el-button
              type="danger"
              class="logout-button"
              onClick={() => handleLogout()}
            >
              退出登录
            </el-button>
            <el-avatar
              src={userStore.userInfo.picture}
              onClick={() => router.push("/mine")}
            ></el-avatar>
          </el-aside>
        </el-container>
      );
    },
  });
</script>

<style lang="scss">
  .layout-header-container {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #1e222d;
    justify-content: space-between;
    .left {
      width: 50%;
    }
    .right {
      width: 50%;
      display: flex;
      justify-content: end;
      padding-right: 20px;
      align-items: center;
      .logout-button {
        margin-right: 20px;
      }
      .el-avatar {
        cursor: pointer;
      }
    }
  }
</style>
