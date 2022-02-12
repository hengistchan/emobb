import { Component, EditorComponent } from "@/package/types/component";
import { Page } from "@/package/types/page.d";
import useEditorStore from "@/store/editor";
import { computed, defineComponent, PropType } from "vue";
import { v4 as uuidv4 } from "uuid";
import { commonComponentStyles } from "@/package/style";
import componentModules from "@/package";

const useEditor = () => {
  const editorStore = useEditorStore();

  /**
   * 生成新页面
   * @param param0 页面数据
   * @returns 页面实例
   */
  const createNewPage = ({ title = "页面" }: { title: string }): Page => ({
    title,
    props: {
      backgroundColor: "#ffffff",
      backgroundImage: "",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    },
    components: [],
  });

  /**
   * 生成新组件
   * @param component 编辑器组件实例
   * @returns 组件实例
   */
  const createNewComponent = (component: EditorComponent): Component => ({
    _id: `${uuidv4().slice(0, 5)}_${editorStore.page?.components.length || 0}`,
    moduleName: component.moduleName,
    name: component.name,
    label: component.label,
    styles: {
      ...commonComponentStyles,
    },
    hasResize: false,
    props: Object.keys(component.props || {}).reduce((prev, curr) => {
      // const { propObj, prop } = useDotProp(prev, curr);
      if (component.props && (component.props[curr] as any)?.defaultValue) {
        // propObj[prop] = prev[curr] = component.props![curr]?.defaultValue;
        prev[curr] = (component.props[curr] as any)?.defaultValue;
      }
      return prev;
    }, {} as { [key: string]: any }),
    draggable: component.draggable ?? true, // 是否可以拖拽
    showStyleConfig: component.showStyleConfig ?? true, // 是否显示组件样式配置
    events: component.events || [], // 事件集合
    model: {},
  });

  /**
   * 设置当前点击组件
   * @param componentId 组件ID
   */
  const setActive = (componentId: string): void => {
    editorStore.currentComponent = componentId;
  };

  /**
   * 各种组件事件
   */

  /**
   * 点击组件
   * @param event 鼠标事件
   * @param component 组件实例
   */
  const handleClick = (event: MouseEvent, component: Component) => {
    component._id && setActive(component._id);
  };

  /**
   * 鼠标悬停
   * @param event 鼠标事件
   * @param component 组件实例
   */
  const handleMouseOver = (event: MouseEvent, component: Component) => {
    console.log(event);
  };

  return {
    createNewPage,
    createNewComponent,
    setActive,
    handleClick,
    handleMouseOver,
  };
};

export default useEditor;
