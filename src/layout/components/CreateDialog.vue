<script lang="tsx">
  import { defineComponent, reactive } from "vue";
  import { useVModel } from "@vueuse/core";
  import { Nullable } from "types";
  import Work from "@/api/work";
  import message from "@/helper/message";
  import { useRouter } from "vue-router";

  interface Form {
    title: Nullable<string>;
    description: Nullable<string>;
  }

  export default defineComponent({
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { emit }) {
      const model = useVModel(props, "modelValue", emit);
      const form = reactive<Form>({
        title: null,
        description: null,
      });

      const router = useRouter();
      const handleClick = async () => {
        const { error, message: msg, ...data } = await Work.createWork(form);
        if (error) {
          message("error", msg);
          return;
        }
        message("success", "创建成功");
        router.push("/editor?id=" + data.uuid);
        model.value = false;
      };
      return () => (
        <>
          <el-dialog v-model={model.value} width="500px">
            {{
              title: () => <span class="title">创建新页面</span>,
              default: () => (
                <el-form>
                  <el-form-item label="页面标题">
                    <el-input
                      v-model={form.title}
                      placeholder="页面标题"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="页面描述">
                    <el-input
                      v-model={form.description}
                      placeholder="页面描述"
                      type="textarea"
                      rows={5}
                    ></el-input>
                  </el-form-item>
                </el-form>
              ),
              footer: () => (
                <>
                  <el-button type="primary" onClick={() => handleClick()}>
                    提交
                  </el-button>
                  <el-button
                    type="danger"
                    onClick={() => (model.value = false)}
                  >
                    关闭
                  </el-button>
                </>
              ),
            }}
          </el-dialog>
        </>
      );
    },
  });
</script>

<style lang="scss" scoped>
  .title {
    font-size: 20px;
    font-weight: 600;
    color: black;
  }
</style>
