<script lang="tsx">
  import { defineComponent, watch } from "vue";
  import useEditorStore from "@/store/editor";
  import { useVModel } from "@vueuse/core";
  import ImageUpload from "./components/ImageUpload.vue";
  import InputWithSymbol from "./components/layout/InputWithSymbol.vue";

  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      // const page = computed(() => editorStore.page);
      const backgroundRepeat = [
        { name: "repeat", label: "默认" },
        { name: "repeat-x", label: "x轴重复" },
        { name: "repeat-y", label: "y轴重复" },
        { name: "no-repeat", label: "不重复" },
      ];
      const page = useVModel(editorStore, "page");
      watch(
        () => page.value?.props?.backgroundImage,
        (n) => {
          if (n) {
            let url: RegExpExecArray | null | string =
              /url\(['"](.*)['"]\)/g.exec(n);
            if (url && url.length >= 1 && url[1] !== "") {
              url = url[1];
              const image = new Image();
              image.src = url;
              image.onload = () => {
                editorStore.page &&
                  editorStore.page.props &&
                  editorStore.page.props.height &&
                  (editorStore.page.props.height =
                    Math.floor((image.height * 377) / image.width) + "px");
              };
            }
          }
        },
      );
      return () => (
        <>
          {page.value && page.value.props && (
            <el-form labelPosition={"left"} label-width={95}>
              <el-form-item label="页面标题">
                <el-input v-model={page.value.title} />
              </el-form-item>
              <el-form-item label="页面高度">
                <InputWithSymbol v-model={page.value.props.height} />
              </el-form-item>
              <el-form-item label="背景颜色">
                <el-color-picker
                  v-model={page.value.props.backgroundColor}
                  show-alpha
                  predefine={[
                    "#ffffff",
                    "#f5222d",
                    "#fa541c",
                    "#fadb14",
                    "#52c41a",
                    "#1890ff",
                    "#722ed1",
                    "#8c8c8c",
                    "rgba(255, 69, 0, 0.68)",
                    "#000000",
                  ]}
                ></el-color-picker>
              </el-form-item>
              <el-form-item label="背景重复">
                <el-select v-model={page.value.props.backgroundRepeat}>
                  {backgroundRepeat.map((option) => (
                    <el-option
                      label={option.label}
                      value={option.name}
                    ></el-option>
                  ))}
                </el-select>
              </el-form-item>
              <el-form-item label="背景大小">
                <el-input
                  v-model={page.value.props.backgroundSize}
                  placeholder="length|percentage|cover|contain"
                ></el-input>
              </el-form-item>
              <ImageUpload v-model={page.value.props.backgroundImage} />
              <el-form-item label="页面图标">
                <el-input
                  v-model={page.value.props.icon}
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-form>
          )}
        </>
      );
    },
  });
</script>

<style lang="scss"></style>
