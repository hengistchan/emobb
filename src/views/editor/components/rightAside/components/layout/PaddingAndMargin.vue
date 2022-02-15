<script lang="tsx">
  import { defineComponent } from "vue";
  import InputWithSymbol from "./InputWithSymbol.vue";
  export default defineComponent({
    setup() {
      return () => (
        <>
          <el-form-item label={"内边距"}></el-form-item>
          <el-form-item label-width="0" class="editor-right-aside__padding">
            <el-row style={{ width: "100%" }}>
              <el-col span={8} offset={8}>
                <InputWithSymbol
                  v-model={padding[`paddingTop` as keyof typeof padding]}
                ></InputWithSymbol>
              </el-col>
            </el-row>
            <el-row style={{ width: "100%" }}>
              <el-col span={8} offset={0}>
                <InputWithSymbol
                  v-model={padding[`paddingLeft` as keyof typeof padding]}
                ></InputWithSymbol>
              </el-col>
              <el-col span={8} offset={8}>
                <InputWithSymbol
                  v-model={padding[`paddingRight` as keyof typeof padding]}
                ></InputWithSymbol>
              </el-col>
            </el-row>
            <el-row style={{ width: "100%" }}>
              <el-col span={8} offset={8}>
                <InputWithSymbol
                  v-model={padding[`paddingBottom` as keyof typeof padding]}
                ></InputWithSymbol>
              </el-col>
            </el-row>
          </el-form-item>
        </>
      );
    },
  });
</script>

<style lang="scss"></style>
