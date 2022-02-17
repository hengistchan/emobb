<script lang="tsx">
  import { defineComponent } from "vue";

  export default defineComponent({
    setup() {
      return () => (
        <div class="user-container">
          <el-row class="user-row">
            <el-col span={12} class="left-aside"></el-col>
            <el-col span={12} class="right-aside">
              <router-view></router-view>
            </el-col>
          </el-row>
        </div>
      );
    },
  });
</script>

<style lang="scss">
  .user-container {
    width: 100%;
    height: 100%;

    .user-row {
      height: 100%;

      .left-aside {
        background: transparent
          url("http://file.hengistchan.site/29e4f67ba3b04f5e87fd605297469a96.png")
          no-repeat;
        background-size: cover;
      }
    }
  }
</style>
