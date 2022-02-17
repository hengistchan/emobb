<script lang="tsx">
  import { defineComponent } from "vue";

  export default defineComponent({
    setup() {
      return () => (
        <el-menu lass="layout-menu" mode="vertial">
          1
        </el-menu>
      );
    },
  });
</script>

<style lang="scss">
  .layout-menu {
    height: 100vh;
  }
</style>
