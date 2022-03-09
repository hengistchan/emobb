import {
  createCrossSortableInputProp,
  createCrossSortableInputWithCheckboxProp,
  createInnerEditorProp,
  createInputProp,
  createNumberInputProp,
  createSelectProp,
  createSwitchProp,
} from "@/package/helper/CreateProps";
import { EditorComponent, Model } from "@/package/types/component";
import useVantFormItem, {
  commonFormKeys,
  createCommonFormProps,
} from "@/package/helper/useVantFormItem";
import IconHelper from "@/helper/IconHelper";
import { Popup, Cascader, Field } from "vant";
import { computed, ref } from "vue";
import { doActions } from "@/package/helper/doActions";
import dayjs from "dayjs";
import { pick, omit } from "lodash-es";

const confirmCode = `function action({ data, model, prop }) {
  console.log(data)
}`;

export default {
  name: "cascader",
  moduleName: "form",
  label: "级联选择器",
  preview: () => <p>选择器</p>,
  render: ({ props, id, styles, actions }) => {
    const { model } = useVantFormItem(props, id);
    const showPicker = ref(false);
    return () => {
      return (
        <div>
          <Field
            {...pick(props, commonFormKeys)}
            is-link={true}
            readonly={true}
            v-model={model[props.prop]}
            onClick={() => (showPicker.value = true)}
            rules={new Function(`${props.rules}; return rules;`)()}
          ></Field>
          <Popup position="bottom" v-model:show={showPicker.value}>
            <Cascader
              options={new Function(`${props.options}; return options;`)()}
              onFinish={(data: any) => {
                actions.finish &&
                  doActions(actions.finish, {
                    data,
                    model,
                    prop: props.prop,
                  });
                showPicker.value = false;
              }}
            ></Cascader>
          </Popup>
        </div>
      );
    };
  },
  props: {
    options: createInnerEditorProp({
      label: "列数据",
      defaultValue: `/** 
       * 不要试图修改变量名
      */
      const options = [
        
      ]`,
    }),
    ...createCommonFormProps("选择器", "请选择"),
    title: createInputProp({
      label: "标题",
      defaultValue: "",
    }),
  },
  icon: IconHelper("mdi:chart-donut-variant"),
  draggable: true,
  events: [{ label: "选择完成时", value: "finish", code: confirmCode }],
  order: 15,
} as EditorComponent;
