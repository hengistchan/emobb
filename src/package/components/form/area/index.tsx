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
import { Popup, Area, Field } from "vant";
import { areaList } from "@vant/area-data";
import { computed, ref } from "vue";
import { doActions } from "@/package/helper/doActions";
import dayjs from "dayjs";
import { pick, omit } from "lodash-es";

const confirmCode = `function action({ data }) {
  // model[prop] = datetime;
}`;

export default {
  name: "area",
  moduleName: "form",
  label: "省市区选择",
  preview: () => <p>省市区选择</p>,
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
            <Area
              columnsNum={props.columnsNum}
              areaList={areaList}
              onConfirm={(data: any) => {
                actions.confirm &&
                  doActions(actions.confirm, {
                    data,
                    model,
                    prop: props.prop,
                  });
                showPicker.value = false;
              }}
              onCancel={() => (showPicker.value = false)}
            ></Area>
          </Popup>
        </div>
      );
    };
  },
  props: {
    default: createInputProp({
      label: "默认值",
      defaultValue: "",
      tips: '默认值，以","分割',
    }),
    ...createCommonFormProps("省市区选择", "请选择"),
    columnsNum: createSelectProp({
      label: "显示列数",
      options: [
        { label: "省市区", value: 3 },
        { label: "省市", value: 2 },
        { label: "省", value: 1 },
      ],
      defaultValue: 3,
    }),
  },
  icon: IconHelper("mdi:map-marker-outline"),
  draggable: true,
  events: [{ label: "确认时", value: "confirm", code: confirmCode }],
  order: 5,
} as EditorComponent;
