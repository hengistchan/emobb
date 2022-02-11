import { Component, EditorComponent } from "@/package/types/component";
import { Page } from "@/package/types/page.d";
import useEditorStore from "@/store/editor";
import { computed, defineComponent, PropType } from "vue";
import { v4 as uuidv4 } from "uuid";
import { commonComponentStyles } from "@/package/style";
import componentModules from "@/package";

const useEditor = () => {
  const editorStore = useEditorStore();

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

  const createNewComponent = (component: EditorComponent): Component => ({
    _id: `${uuidv4().slice(0, 5)}_${editorStore.page?.components.length || 0}`,
    moduleName: component.moduleName,
    name: component.name,
    label: component.label,
    styles: {
      ...commonComponentStyles,
      display: "flex",
      justifyContent: "flex-start",
      paddingTop: "0",
      paddingRight: "0",
      paddingLeft: "0",
      paddingBottom: "0",
    },
    hasResize: false,
    props: component.props || {},
    draggable: component.draggable ?? true, // 是否可以拖拽
    showStyleConfig: component.showStyleConfig ?? true, // 是否显示组件样式配置
    events: component.events || [], // 事件集合
    model: {},
  });

  return {
    createNewPage,
    createNewComponent,
  };
};

export default useEditor;
