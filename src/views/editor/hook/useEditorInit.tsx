import message from "@/helper/message";
import { commonComponentStyles } from "@/package/style";
import { Component, EditorComponent } from "@/package/types/component";
import { Page } from "@/package/types/page";
import useEditorStore from "@/store/editor";
import { v4 as uuidv4 } from "uuid";
import { useRoute } from "vue-router";
import { useDotProp } from "./useDotProp";

/**
 * 生成新页面
 * @param param0 页面数据
 * @returns 页面实例
 */
export const createNewPage = ({ title = "页面" }: { title: string }): Page => ({
  title,
  props: {
    backgroundColor: "#ffffff",
    backgroundImage: "",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "669px",
  },
  components: [],
});

/**
 * 生成新组件
 * @param component 编辑器组件实例
 * @returns 组件实例
 */
export const createNewComponent = (component: EditorComponent): Component => {
  const editorStore = useEditorStore();
  const cpn = {
    _id: `${uuidv4().slice(0, 5)}_${editorStore.tick || 0}`,
    moduleName: component.moduleName,
    name: component.name,
    label: component.label,
    styles: {
      ...commonComponentStyles,
    },
    hasResize: false,
    props: Object.keys(component.props || {}).reduce((prev, curr) => {
      const { propObj, prop } = useDotProp(prev, curr);
      if (
        component.props &&
        (component.props[curr] as any)?.defaultValue != null
      ) {
        propObj[prop] = prev[curr] = component.props![curr]?.defaultValue;
      }
      return prev;
    }, {} as { [key: string]: any }),
    draggable: component.draggable ?? true, // 是否可以拖拽
    showStyleConfig: component.showStyleConfig ?? true, // 是否显示组件样式配置
    events: component.events || [], // 事件集合
    actions: [], // 动作集合
    model: {},
  };
  editorStore.addComponent(cpn);
  // 防止删除组件时删除不干净产生的情况
  editorStore.tick++;
  return cpn;
};

export const getCurrentUUID = () => {
  const route = useRoute();
  const uuid = route.query?.id as string;
  if (uuid == null) {
    message("error", "请求的id不存在！");
    return null;
  }
  return uuid;
};
