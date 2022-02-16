import {
  createInputProp,
  createSelectProp,
  createCrossSortableInputProp,
  createSwitchProp,
  createNumberInputProp,
} from "@/package/helper/CreateProps";
import { EditorComponent } from "@/package/types/component";
import useEditor from "@/views/editor/hook/useEditor";
import { ArrowDownBold } from "@element-plus/icons-vue";
import { ElCarousel, ElCarouselItem, ElImage } from "element-plus";

export default {
  name: "carousel",
  moduleName: "container",
  label: "轮播图",
  preview: () => <p>普通容器</p>,
  render: ({ props, styles, component, custom }) => {
    const { registerRef } = useEditor();
    return () => (
      <div
        style={styles}
        class="container"
        ref={(el) => registerRef(el, component._id)}
      >
        <ElCarousel
          trigger="hover"
          height={props.height}
          autoplay={props.autoplay}
          interval={props.interval}
          type={props.type === true ? "card" : ""}
          loop={props.loop}
          pause-on-hover={props["pause-on-hover"]}
        >
          {props.images.map((item: any) => (
            <ElCarouselItem key={item}>
              <ElImage src={item} fit={"scale-down"}></ElImage>
            </ElCarouselItem>
          ))}
        </ElCarousel>
      </div>
    );
  },
  props: {
    height: createInputProp({ label: "高度", defaultValue: "150px" }),
    images: createCrossSortableInputProp({
      label: "图片列表",
      labelPosition: "top",
      defaultValue: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
    }),
    autoplay: createSwitchProp({ label: "自动播放", defaultValue: true }),
    interval: createNumberInputProp({
      label: "播放间隔",
      defaultValue: 3000,
      tips: "单位为毫秒",
    }),
    type: createSwitchProp({ label: "卡片样式", defaultValue: false }),
    loop: createSwitchProp({ label: "循环显示", defaultValue: true }),
    "pause-on-hover": createSwitchProp({
      label: "悬停暂停",
      defaultValue: false,
    }),
  },
  icon: ArrowDownBold,
  draggable: true,
} as EditorComponent;
