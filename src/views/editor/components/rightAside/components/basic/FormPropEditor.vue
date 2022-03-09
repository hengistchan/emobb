<script lang="tsx">
  import { useVModel } from "@vueuse/core";
  import { ElTag } from "element-plus";
  import { defineComponent, PropType } from "vue";

  export default defineComponent({
    props: {
      modelValue: { type: Array as PropType<any[]>, default: () => [] },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
      const model = useVModel(props, "modelValue", emit);
      return () => (
        <>
          {(model.value || []).map((item) => {
            return (
              <ElTag style={{ marginLeft: "2px", marginTop: "2px" }}>
                {item._id}
              </ElTag>
            );
          })}
        </>
      );
    },
  });
</script>

<style lang="scss"></style>
