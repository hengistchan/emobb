<script lang="tsx">
  import { defineComponent } from "vue";

  export default defineComponent({
    setup() {
      return () => (
        <el-container class="layout-header-container">
          <el-aside class="left"></el-aside>
          <el-aside class="right"></el-aside>
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
    justify-content: space-between;
    .left {
      width: 50%;
    }
    .right {
      width: 50%;
    }
  }
</style>
