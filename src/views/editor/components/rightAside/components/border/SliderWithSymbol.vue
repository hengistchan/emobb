<script lang="tsx">
  import { useVModel } from "@vueuse/core";
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    props: {
      modelValue: {
        type: String,
        default: "",
      },
      symbol: {
        type: String,
        default: "px",
      },
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 100,
      },
    },
    setup(props, { emit }) {
      const model = useVModel(props, "modelValue", emit);
      const number = ref(
        isNaN(parseInt(props.modelValue)) ? 0 : parseInt(props.modelValue),
      );
      const handleChange = (val: number) => {
        model.value = val + props.symbol;
      };
      return () => (
        <el-slider
          v-model={number.value}
          onChange={handleChange}
          min={props.min}
          max={props.max}
        ></el-slider>
      );
    },
  });
</script>

<style lang="scss"></style>
