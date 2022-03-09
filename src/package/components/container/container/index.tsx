import {
  createInputProp,
  createNumberInputProp,
  createSelectProp,
  createSwitchProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { useSlots, renderSlot } from "vue";
import useEditor from "@/views/editor/hook/useEditor";
import { Col, Row } from "vant";
import IconHelper from "@/helper/IconHelper";

interface SlotItem {
  value: string;
  [prop: string]: any;
}

const createSlots = (str: string): SlotItem =>
  str.split(":").reduce(
    (prev, curr, index) => {
      prev[`slot${index}`] = {
        key: `slot${index}`,
        span: curr,
        children: [],
      };
      return prev;
    },
    { value: str } as SlotItem,
  );

export default {
  name: "container",
  moduleName: "container",
  label: "普通容器",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component }) => {
    const slots = useSlots();
    const { registerRef } = useEditor();
    return () => (
      <div
        ref={(el) => registerRef(el, component._id)}
        style={styles}
        class="container"
      >
        <Row {...props}>
          {Object.values(
            Object.keys(props.slots).length
              ? props.slots
              : createSlots("12:12"),
          )
            ?.filter((item) => typeof item !== "string")
            .map((spanItem: any, spanIndex) => {
              return (
                <>
                  <Col span={parseInt(spanItem.span)}>
                    {renderSlot(slots, `slot${spanIndex}`)}
                  </Col>
                </>
              );
            })}
        </Row>
      </div>
    );
  },
  props: {
    slots: createSelectProp({
      label: "列比例",
      options: [
        { label: "24", value: createSlots("24") },
        { label: "12:12", value: createSlots("12:12") },
        { label: "6:18", value: createSlots("6:18") },
        { label: "18:6", value: createSlots("18:6") },
        { label: "8:8:8", value: createSlots("8:8:8") },
        { label: "6:12:6", value: createSlots("6:12:6") },
        { label: "6:6:6:6", value: createSlots("6:6:6:6") },
      ],
      defaultValue: createSlots("12:12"),
    }),
    gutter: createNumberInputProp({
      label: "列间隔",
      defaultValue: 0,
    }),
    wrap: createSwitchProp({
      label: "是否换行",
      defaultValue: true,
    }),
  },
  icon: IconHelper("mdi:page-layout-header-footer"),
  draggable: true,
} as EditorComponent;
