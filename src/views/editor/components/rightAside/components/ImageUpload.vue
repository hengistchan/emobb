<template>
  <div></div>
</template>

<script lang="tsx">
  import { useVModel } from "@vueuse/core";
  import { ElMessage } from "element-plus/es";
  import { defineComponent, ref, watch } from "vue";
  import { PictureFilled } from "@element-plus/icons-vue";
  // import { ElMessage } from "element-plus";

  export default defineComponent({
    props: {
      modelValue: {
        type: String,
        default: "",
      },
      action: {
        type: String,
        default: "http://hengistchan.site:8088/file",
      },
    },
    setup(props, ctx) {
      const status = ref<"ready" | "loading" | "success" | "error">("ready");
      const url = ref("");
      const model = useVModel(props, "modelValue", ctx.emit);
      const handleSuccess = (resp: any) => {
        url.value = resp[0].url;
        status.value = "success";
        model.value = `url('${url.value}')`;
        ElMessage.success({ message: "上传成功" });
      };
      const handleDelete = () => {
        model.value = "";
        url.value = "url('')";
        ElMessage.success({ message: "删除成功" });
      };
      watch(
        () => model.value,
        (m) => {
          const p = /url\(['"](.*)['"]\)/g.exec(m);
          url.value = (p && (p[1] as string)) || "";
        },
        { immediate: true },
      );
      return () => (
        <>
          <el-form-item label="背景图片">
            {
              // <el-form-item label="">
              <el-image
                src={url.value}
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                preview-src-list={[url.value]}
                fit={"scale-down"}
              >
                {{
                  error: () => (
                    <>
                      <div class="image-upload-picture-icon">
                        <el-icon>
                          <PictureFilled />
                        </el-icon>
                      </div>
                    </>
                  ),
                }}
              </el-image>
              // </el-form-item>
            }
            <div style={{ marginLeft: "5px" }}>
              <el-upload
                class="upload-demo"
                action={props.action}
                multiple={false}
                show-file-list={false}
                accept={"image/*"}
                on-success={(resp: any) => handleSuccess(resp)}
              >
                <el-button type="primary">点击上传</el-button>
              </el-upload>
              <el-button
                type="danger"
                onClick={() => handleDelete()}
                style={{ marginTop: "10px" }}
              >
                删除图片
              </el-button>
            </div>
          </el-form-item>
        </>
      );
    },
  });
</script>

<style lang="scss">
  .image-upload-picture-icon {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    i {
      color: rgb(78, 78, 78);
    }
  }
</style>
