<script lang="tsx">
  import { Component, EditorComponent } from "@/package/types/component";
  import { EditorProp, EditorPropType } from "@/package/types/prop.d";
  import { defineComponent, PropType } from "vue";

  export default defineComponent({
    props: {
      editorComponent: {
        type: Object as PropType<EditorComponent>,
        required: true,
      },
      component: {
        type: Object as PropType<Component>,
        required: true,
      },
    },
    setup(props) {
      const renderFormItem = (key: string, propConfig: EditorProp) => {
        const listForProp: { [k: string]: () => JSX.Element } = {
          [EditorPropType.input]: () => {
            return (
              <el-input
                type="input"
                v-model={props.component.props[key]}
                placeholder={propConfig.tips || propConfig.label}
              ></el-input>
            );
          },
          [EditorPropType.select]: () => {
            return (
              <el-select
                v-model={props.component.props[key]}
                placeholder={propConfig.tips || propConfig.label}
              >
                {propConfig.options?.map((option) => (
                  <el-option
                    label={option.label}
                    value={option.value}
                    style={{ fontFamily: option.value }}
                  ></el-option>
                ))}
              </el-select>
            );
          },
          [EditorPropType.color]: () => (
            <el-color-picker
              v-model={props.component.props[key]}
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
          ),
          [EditorPropType.inputNumber]: () => (
            <el-input-number
              v-model={props.component.props[key]}
              placeholder={propConfig.tips || propConfig.label}
            ></el-input-number>
          ),
          [EditorPropType.switch]: () => (
            <el-switch v-model={props.component.props[key]}></el-switch>
          ),
        };

        return listForProp[propConfig.type]();
      };
      return () => (
        <>
          {Object.entries(props.editorComponent.props ?? {}).map(
            ([propName, propConfig]) => {
              return (
                <>
                  <el-form-item key={props.component._id + "_" + propName}>
                    {{
                      label: () => <>{propConfig.label}</>,
                      default: () => renderFormItem(propName, propConfig),
                    }}
                  </el-form-item>
                </>
              );
            },
          )}
        </>
      );
    },
  });
</script>
