<script lang="tsx">
  import { defineComponent, reactive, ref } from "vue";
  import {
    User as UserIcon,
    Lock,
    ChatLineRound,
    Finished,
  } from "@element-plus/icons-vue";
  import User from "@/api/user";
  import message from "@/helper/message";
  import type { ElForm } from "element-plus";
  import { registerRules as rules } from "./rules";
  import { useRouter } from "vue-router";

  export default defineComponent({
    setup() {
      const router = useRouter();
      const register = reactive({
        username: "",
        password: "",
        confirm_password: "",
        code: "",
        email: "",
      });
      const formRef = ref<InstanceType<typeof ElForm> | null>(null);
      const loadingSumit = ref(false);
      const loadingCode = ref(false);
      const handleRegister = async () => {
        loadingSumit.value = false;
        const { message: msg } = await User.register(register);
        if (msg) {
          message("success", msg + `, 3秒后跳转到登陆页`);
        }
        loadingSumit.value = true;
        setTimeout(() => {
          router.replace("/user/login");
        }, 3000);
      };
      const handleCode = async () => {
        loadingCode.value = true;
        const { message: msg } = await User.code({
          email: register.email,
          action: 0,
        });
        loadingCode.value = false;
        if (msg) {
          message("success", msg);
        }
      };
      return () => (
        <div class="register">
          <div class="register-container">
            <div class="title">用户注册</div>
            <div class="tips">请填写邮箱获取验证码后注册</div>
            <el-form
              class="register-form"
              rules={rules}
              model={register}
              ref={(el: typeof formRef.value) => (formRef.value = el)}
            >
              <el-form-item class="register-form-item" prop="username">
                <el-input
                  v-model={register.username}
                  placeholder="用户名"
                  auto-complete="on"
                  class="form-input"
                  size="large"
                >
                  {{
                    prefix: () => (
                      <el-icon class="register-icon" size={23}>
                        <UserIcon />
                      </el-icon>
                    ),
                  }}
                </el-input>
              </el-form-item>
              <el-form-item class="register-form-item" prop="email">
                <el-input
                  v-model={register.email}
                  placeholder="用户邮箱"
                  class="form-input"
                  size="large"
                  type={"email"}
                >
                  {{
                    prefix: () => (
                      <el-icon class="register-icon" size={23}>
                        <ChatLineRound />
                      </el-icon>
                    ),
                  }}
                </el-input>
              </el-form-item>
              <el-form-item
                class="register-form-item register-mail"
                prop="code"
              >
                <el-input
                  v-model={register.code}
                  placeholder="验证码"
                  class="form-input"
                  size="large"
                  type={"email"}
                >
                  {{
                    prefix: () => (
                      <el-icon class="register-icon" size={23}>
                        <Finished />
                      </el-icon>
                    ),
                  }}
                </el-input>
                <el-button
                  type="primary"
                  size="large"
                  onClick={() => handleCode()}
                  loading={loadingCode.value}
                >
                  获取验证码
                </el-button>
              </el-form-item>
              <el-form-item class="register-form-item" prop="password">
                <el-input
                  v-model={register.password}
                  placeholder="密码"
                  type="password"
                  class="form-input"
                  show-password
                  size="large"
                >
                  {{
                    prefix: () => (
                      <el-icon class="register-icon" size={23}>
                        <Lock />
                      </el-icon>
                    ),
                  }}
                </el-input>
              </el-form-item>
              <el-form-item class="register-form-item" prop="confirm_password">
                <el-input
                  v-model={register.confirm_password}
                  placeholder="确认密码"
                  type="password"
                  auto-complete="on"
                  class="form-input"
                  show-password
                  size="large"
                >
                  {{
                    prefix: () => (
                      <el-icon class="register-icon" size={23}>
                        <Lock />
                      </el-icon>
                    ),
                  }}
                </el-input>
              </el-form-item>
              <div>
                <el-button
                  class="register-button"
                  type="primary"
                  plain
                  size="large"
                  loading={loadingCode.value}
                  onClick={() => handleRegister()}
                >
                  注 册
                </el-button>
                <el-button
                  class="register-button"
                  plain
                  size="large"
                  onClick={() => {
                    console.log(formRef.value);

                    formRef?.value && formRef.value.resetFields();
                  }}
                >
                  重 置
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
  .register {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .register-container {
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
      .register-form {
        margin-top: 20px;
        width: 400px;
        .register-form-item {
          margin-top: 15px;
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
            .register-icon {
            }
          }
        }
        .register-mail {
          .el-form-item__content {
            justify-content: space-between;
          }
          .form-input {
            width: 265px;
          }
        }
        .register-button {
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
