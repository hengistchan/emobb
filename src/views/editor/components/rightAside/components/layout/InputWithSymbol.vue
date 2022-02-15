<script lang="tsx">
  import { defineComponent, ref } from "vue";
  import { useVModel } from "@vueuse/core";

  export default defineComponent({
    props: {
      symbol: {
        type: String,
        default: "px",
      },
      modelValue: {
        type: String,
        default: "",
      },
    },
    setup(props) {
      const symbol = ref<string>(props.symbol || "px");
      const number = ref<number | null>(null);
      const modelValue = useVModel(props, "modelValue");
      const handleChange = () => {
        modelValue.value = number.value + symbol.value;
      };
      return () => (
        <div class={"component-input-with-symbol"}>
          <el-input-number
            class="input-number"
            v-model={number.value}
            controls-position="right"
            onChange={() => handleChange()}
            controls={false}
          />
          <el-input
            class="input"
            v-model={symbol.value}
            onChange={() => handleChange()}
          ></el-input>
        </div>
      );
    },
  });
</script>

<style lang="scss">
  .component-input-with-symbol {
    display: inline-block;
    .input-number {
      display: inline-block;
      width: 50px;
    }
    .input {
      display: inline-block;
      width: 40px;
    }
  }
</style>
