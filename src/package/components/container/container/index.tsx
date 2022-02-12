import {
  createInputProp,
  createSelectProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { FolderOpened } from "@element-plus/icons-vue";
import { ElRow as Row, ElCol as Col } from "element-plus";
import { useSlots, renderSlot } from "vue";

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
  render: ({ props, styles, component, custom }) => {
    const slots = useSlots();
    console.log(slots);

    return () => (
      <div style={styles} class="container">
        <Row {...custom} {...props}>
          {Object.values(
            Object.keys(props.slots).length
              ? props.slots
              : createSlots("12:12"),
          )
            ?.filter((item) => typeof item !== "string")
            .map((spanItem: any, spanIndex) => {
              // console.log(spanItem);

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
  },
  icon: FolderOpened,
  draggable: true,
} as EditorComponent;
