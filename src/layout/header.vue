<script lang="tsx">
  import { defineComponent } from "vue";

  export default defineComponent({
    setup() {
      return () => <div class="layout-header-container"></div>;
    },
  });
</script>

<style lang="scss">
  .layout-header-container {
    width: 100%;
    height: 100%;
    display: flex;
  }
</style>
