<script lang="tsx">
  import { defineComponent, PropType } from "vue";

  export default defineComponent({
    props: {
      props: {
        type: Object as PropType<any>,
        required: true,
      },
    },
    setup(props, { slots }) {
      return () => (
        <>
          <el-form-item
            prop={props.props.prop}
            label={props.props.label}
            labelWidth={props.props.labelWidth}
            required={props.props.required}
            inlineMessage={props.props.inlineMessage}
          >
            {slots.default && slots.default()}
          </el-form-item>
        </>
      );
    },
  });
</script>

<style lang="scss"></style>
