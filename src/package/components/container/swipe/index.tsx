import IconHelper from "@/helper/IconHelper";
import {
  createInputProp,
  createSelectProp,
  createCrossSortableInputProp,
  createSwitchProp,
  createNumberInputProp,
  createColorProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import { Swipe, SwipeItem, Image } from "vant";

export default {
  name: "swipe",
  moduleName: "container",
  label: "轮播图",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component }) => {
    return () => (
      <Swipe
        autoplay={props.autoplay}
        duration={props.duration}
        loop={props.loop}
        indicatorColor={props.indicatorColor}
      >
        {props.images.map((image: string) => (
          <SwipeItem key={image}>
            <Image
              width={"100%"}
              height={"100%"}
              src={image}
              fit="scale-down"
            ></Image>
          </SwipeItem>
        ))}
      </Swipe>
    );
  },
  props: {
    images: createCrossSortableInputProp({
      label: "图片列表",
      labelPosition: "top",
      defaultValue: [
        "//d302.paixin.com/thumbs/14847044/176257628/staff_1024.jpg",
        "//d302.paixin.com/thumbs/16149430/189869742/staff_1024.jpg",
      ],
    }),
    autoplay: createNumberInputProp({ label: "自动播放", defaultValue: 500 }),
    duration: createNumberInputProp({
      label: "动画时长",
      defaultValue: 500,
      tips: "单位为毫秒",
    }),
    loop: createSwitchProp({ label: "循环播放", defaultValue: true }),
    indicatorColor: createColorProp({
      label: "指示器",
      defaultValue: "#1989fa",
    }),
  },
  icon: IconHelper("mdi:view-carousel-outline"),
  draggable: true,
  order: 10,
} as EditorComponent;
