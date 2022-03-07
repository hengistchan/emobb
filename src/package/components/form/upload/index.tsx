import {
  createInputProp,
  createNumberInputProp,
  createSelectProp,
  createSwitchProp,
} from "@/package/helper/CreateProps";
import { EditorComponent, Model } from "@/package/types/component";
import useVantFormItem, {
  createCommonFormProps,
  commonFormKeys,
} from "@/package/helper/useVantFormItem";
import IconHelper from "@/helper/IconHelper";
import { Uploader, Toast } from "vant";
import { pick } from "lodash-es";
import { computed, watch } from "vue";
import axios from "axios";
import { doActions } from "@/package/helper/doActions";

const afterReadCode = `function afterRead({file, axios, Toast}) {
  // 在此处进行文件上传，上传成功后把url写进file对象中
  console.log(file);
}`;

export default {
  name: "upload",
  moduleName: "form",
  label: "图片上传",
  preview: () => <p>上传</p>,
  render: ({ props, id, styles, actions }) => {
    const { model, FormItemWrapper } = useVantFormItem(props, id);
    const fileList = computed({
      get() {
        if (model[props.prop] == null || model[props.prop] === "") {
          model[props.prop] = [];
        }
        if (typeof model[props.prop] === "string") {
          model[props.prop] = model[props.prop]
            .split(",")
            .map((item: string) => ({ url: item }));
        }
        return model[props.prop];
      },
      set(val) {
        model[props.prop] = val;
      },
    });
    const onOversize = (file: any) => {
      console.log(file);
      Toast.fail(`文件不能超过 \`${parseFloat(props.size)} * 1024\` byte`);
    };
    return () => (
      <FormItemWrapper
        {...pick(props, commonFormKeys)}
        rules={new Function(`${props.rules}; return rules;`)()}
        value={model[props.prop]}
      >
        <Uploader
          v-model={fileList.value}
          maxCount={props.maxCount}
          accept={props.accept}
          multiple={props.multiple}
          capture={props.capture}
          imageFit={"scale-down"}
          maxSize={
            props.size == null || props.size == "" || isNaN(props.size)
              ? Infinity
              : parseFloat(props.size) * 1024
          }
          onOversize={(file) => onOversize(file)}
          afterRead={(file) => {
            actions.afterRead &&
              doActions(actions.afterRead, { file, axios, Toast });
          }}
        ></Uploader>
      </FormItemWrapper>
    );
  },
  props: {
    default: createInputProp({
      label: "默认值",
      tips: "以逗号隔开",
      type: "textarea",
      defaultValue: "",
    }),
    ...createCommonFormProps("字段", "请输入内容"),
    maxCount: createNumberInputProp({
      label: "上传限制",
      defaultValue: 1,
    }),
    accept: createInputProp({
      label: "文件类型",
      defaultValue: "image/*",
    }),
    multiple: createSwitchProp({
      label: "文件多选",
      defaultValue: false,
    }),
    capture: createSelectProp({
      label: "选取模式",
      options: [
        { label: "默认", value: "" },
        { label: "摄像头", value: "camera" },
      ],
    }),
    size: createInputProp({
      label: "限制大小",
      defaultValue: "",
      tips: "空则不限制, 单位为Kb",
    }),
  },
  icon: IconHelper("mdi:file-upload-outline"),
  draggable: true,
  events: [
    {
      label: "选择文件后",
      value: "afterRead",
      code: afterReadCode,
    },
  ],
  order: 11,
} as EditorComponent;
