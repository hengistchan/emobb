<template>
  <div></div>
</template>

<script lang="tsx">
  import { useVModel } from "@vueuse/core";
  import { ElMessage } from "element-plus/es";
  import { defineComponent, ref } from "vue";
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
      return () => (
        <>
          <el-form-item label="背景图片">
            {status.value === "success" && (
              // <el-form-item label="">
              <el-image
                src={url.value}
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid black",
                }}
                preview-src-list={[url.value]}
                fit={"scale-down"}
              ></el-image>
              // </el-form-item>
            )}
            <div
              style={{ marginLeft: status.value === "success" ? "5px" : "0" }}
            >
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
  .upload-demo {
  }
</style>
