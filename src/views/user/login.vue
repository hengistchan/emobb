<script lang="tsx">
  import { defineComponent, reactive, ref } from "vue";
  import { User as UserIcon, Lock } from "@element-plus/icons-vue";
  import User from "@/api/user";
  import message from "@/helper/message";
  import store from "store2";
  import { useRouter } from "vue-router";
  import { loginRules as rules } from "./rules";
  import type { ElForm } from "element-plus";

  export default defineComponent({
    setup() {
      const loginRef = ref<InstanceType<typeof ElForm> | null>(null);
      const router = useRouter();
      const user = reactive({
        username: "",
        password: "",
      });
      const loading = ref(false);
      const handleLogin = async () => {
        loading.value = true;
        const { token, error } = await User.login(user);
        if (token && !error) {
          message("success", "登录成功");
          store("token", token);
          router.push("/");
        }
        loading.value = false;
      };
      return () => (
        <div class="login">
          <div class="login-container">
            <div class="title">欢迎回来</div>
            <div class="tips">使用用户名和密码登录</div>
            <el-form
              class="login-form"
              prop={"password"}
              rules={rules}
              ref={loginRef.value}
              model={user}
            >
              <el-form-item class="login-form-item" prop={"username"}>
                <el-input
                  v-model={user.username}
                  placeholder="用户名"
                  auto-complete="on"
                  class="form-input"
                  size="large"
                >
                  {{
                    prefix: () => (
                      <el-icon class="login-icon" size={23}>
                        <UserIcon />
                      </el-icon>
                    ),
                  }}
                </el-input>
              </el-form-item>
              <el-form-item
                class="login-form-item login-password"
                prop={"password"}
              >
                <el-input
                  v-model={user.password}
                  placeholder="密码"
                  type="password"
                  auto-complete="on"
                  class="form-input"
                  show-password
                  size="large"
                >
                  {{
                    prefix: () => (
                      <el-icon class="login-icon" size={23}>
                        <Lock />
                      </el-icon>
                    ),
                  }}
                </el-input>
                <el-button
                  type="info"
                  size="large"
                  onClick={() => router.push("/user/find")}
                >
                  找回密码
                </el-button>
              </el-form-item>
              <div>
                <el-button
                  class="login-button"
                  type="primary"
                  plain
                  size="large"
                  loading={loading.value}
                  onClick={() => handleLogin()}
                >
                  登 录
                </el-button>
                <el-button class="login-button" plain size="large">
                  <router-link to="/user/register">注 册</router-link>
                </el-button>
              </div>
            </el-form>
          </div>
        </div>
      );
    },
  });
</script>

<style lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-container {
      width: 400px;
      // height: 250px;
      // background-color: #f0f0f0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      // justify-content: space-around;
      transform: translateY(-40px);

      .title {
        font-size: 40px;
        font-weight: 700;
      }
      .tips {
        font-size: 22px;
        font-weight: 500;
        color: #666666;
        margin-top: 15px;
      }
      .login-form {
        margin-top: 20px;
        width: 400px;
        .login-form-item {
          margin-top: 25px;
          &:first-child {
            margin-top: 0;
          }
          .form-input {
            font-size: 18px;

            // border-radius: 5px;
            .el-input__inner {
              padding-left: 45px;
            }
            .el-input__prefix-inner {
              align-items: center;
              margin-right: 20px;
            }
            .login-icon {
            }
          }
          &.login-password {
            .form-input {
              width: 295px;
            }
            .el-form-item__content {
              justify-content: space-between;
              // width: 10px;
            }
          }
        }
        .login-button {
          width: 120px;
          margin-left: 25px;
          font-size: 16px;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }
</style>
