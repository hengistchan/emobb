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
  import { findRules as rules } from "./rules";
  import { useRouter } from "vue-router";

  export default defineComponent({
    setup() {
      const router = useRouter();
      const find = reactive({
        password: "",
        confirm_password: "",
        code: "",
        email: "",
      });
      const formRef = ref<InstanceType<typeof ElForm> | null>(null);
      const loadingSumit = ref(false);
      const loadingCode = ref(false);
      const handlefind = async () => {
        loadingSumit.value = false;
        const v = await formRef.value?.validate();
        if (!v) {
          message("error", "类型验证不通过");
        }
        const { message: msg, error } = await User.resetPassword(find);
        if (msg && !error) {
          message("success", msg + `, 3秒后跳转到登陆页`);
          setTimeout(() => {
            router.replace("/user/login");
          }, 3000);
        }
        loadingSumit.value = true;
      };
      const handleCode = async () => {
        loadingCode.value = true;
        const { message: msg, error } = await User.code({
          email: find.email,
          action: 1,
        });
        loadingCode.value = false;
        if (msg && !error) {
          message("success", msg);
        }
      };
      return () => (
        <div class="find">
          <div class="find-container">
            <div class="title">找回密码</div>
            <div class="tips">请填写邮箱获取验证码后提交表单</div>
            <el-form
              class="find-form"
              rules={rules}
              model={find}
              ref={(el: typeof formRef.value) => (formRef.value = el)}
            >
              <el-form-item class="find-form-item" prop="email">
                <el-input
                  v-model={find.email}
                  placeholder="用户邮箱"
                  class="form-input"
                  size="large"
                  type={"email"}
                >
                  {{
                    prefix: () => (
                      <el-icon class="find-icon" size={23}>
                        <ChatLineRound />
                      </el-icon>
                    ),
                  }}
                </el-input>
              </el-form-item>
              <el-form-item class="find-form-item find-mail" prop="code">
                <el-input
                  v-model={find.code}
                  placeholder="验证码"
                  class="form-input"
                  size="large"
                  type={"email"}
                >
                  {{
                    prefix: () => (
                      <el-icon class="find-icon" size={23}>
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
              <el-form-item class="find-form-item" prop="password">
                <el-input
                  v-model={find.password}
                  placeholder="密码"
                  type="password"
                  class="form-input"
                  show-password
                  size="large"
                >
                  {{
                    prefix: () => (
                      <el-icon class="find-icon" size={23}>
                        <Lock />
                      </el-icon>
                    ),
                  }}
                </el-input>
              </el-form-item>
              <el-form-item class="find-form-item" prop="confirm_password">
                <el-input
                  v-model={find.confirm_password}
                  placeholder="确认密码"
                  type="password"
                  auto-complete="on"
                  class="form-input"
                  show-password
                  size="large"
                >
                  {{
                    prefix: () => (
                      <el-icon class="find-icon" size={23}>
                        <Lock />
                      </el-icon>
                    ),
                  }}
                </el-input>
              </el-form-item>
              <div>
                <el-button
                  class="find-button"
                  type="primary"
                  plain
                  size="large"
                  loading={loadingCode.value}
                  onClick={() => handlefind()}
                >
                  提 交
                </el-button>
                <el-button
                  class="find-button"
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
  .find {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .find-container {
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
      .find-form {
        margin-top: 20px;
        width: 400px;
        .find-form-item {
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
            .find-icon {
            }
          }
        }
        .find-mail {
          .el-form-item__content {
            justify-content: space-between;
          }
          .form-input {
            width: 265px;
          }
        }
        .find-button {
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
