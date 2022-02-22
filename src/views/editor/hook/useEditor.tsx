import { Component, EditorComponent } from "@/package/types/component";
import { Page } from "@/package/types/page.d";
import useEditorStore, { EditorHistory } from "@/store/editor";
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  Ref,
} from "vue";
import { v4 as uuidv4 } from "uuid";
import { commonComponentStyles } from "@/package/style";
import { findKey, pickBy } from "lodash-es";
import componentModules from "@/package";
import { getParentElement } from "@/helper";
import useHistoryEditor from "./useHistoryEditor";
import { useDotProp } from "./useDotProp";

type HistoryType = "edit" | "delete" | "add";

const useEditor = () => {
  const editorStore = useEditorStore();
  const { pushHistory } = useHistoryEditor();

  onMounted(() => {});

  onUnmounted(() => {});

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
      height: "669px",
    },
    components: [],
  });

  /**
   * 生成新组件
   * @param component 编辑器组件实例
   * @returns 组件实例
   */
  const createNewComponent = (component: EditorComponent): Component => {
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
        if (component.props && (component.props[curr] as any)?.defaultValue) {
          propObj[prop] = prev[curr] = component.props![curr]?.defaultValue;
          // prev[curr] = (component.props[curr] as any)?.defaultValue;
        }
        return prev;
      }, {} as { [key: string]: any }),
      draggable: component.draggable ?? true, // 是否可以拖拽
      showStyleConfig: component.showStyleConfig ?? true, // 是否显示组件样式配置
      events: component.events || [], // 事件集合
      model: {},
    };
    editorStore.addComponent(cpn);
    // 防止删除组件时删除不干净产生的情况
    editorStore.tick++;
    return cpn;
  };

  /**
   * 在componentMap上注册组件实例
   * @param el dom实例
   * @param componentId 组件ID
   */
  const registerRef = (el: any, componentId: string) => {
    editorStore.componentMap[componentId] &&
      (editorStore.componentMap[componentId]["ref"] = el);
  };

  const currentId = computed(() => editorStore.currentComponent);
  const currentComponent = computed(() =>
    editorStore.getComponentById(currentId.value),
  );
  const currentEditorComponent = computed(() => {
    if (currentComponent.value) {
      return componentModules[currentComponent.value.moduleName].componentMap[
        currentComponent.value.name
      ];
    }
    return null;
  });

  /**
   * 根据ID查找组件是否存在
   * @param componentId 组件ID
   * @returns 布尔值
   */
  const checkComponentExist = (componentId: string) => {
    return !!findKey(editorStore.componentMap, componentId);
  };

  /**
   * 删除组件
   * @param event 删除事件
   * @param componentId 组件ID
   * @param parent 父组件
   */
  const handleDelete = (
    event: Event | null,
    componentId: string | undefined | null,
    parent: Component[] | undefined | null,
  ) => {
    componentId = componentId || editorStore.currentComponent || "";
    parent = parent || editorStore.parent || [];
    const i = parent.findIndex((item) => item._id === componentId);
    if (i !== -1) {
      const history: EditorHistory = {
        type: "delete",
        fromIndex: -1,
        toIndex: i,
        from: null,
        to: parent,
        component: parent[i],
      };
      const pparent = getParentById(
        editorStore.page?.components as Component[],
        componentId,
        editorStore.page,
        true,
        null,
      );
      if (pparent) {
        history.toRootId = pparent.isRoot ? "root" : pparent.parent._id;
        history.toSlot = pparent.isRoot ? "" : pparent.slot;
      }
      pushHistory(history);
      parent.splice(i, 1);
      delete editorStore.componentMap[componentId];
      cancelActive();
    }
  };

  const getParentById = (
    arr: Component[],
    id: string,
    parent: any,
    isRoot: boolean,
    slot: string | null,
  ): any => {
    const root: any[] = [];
    if (arr == null) return;
    for (let i = 0; i < arr.length; i++) {
      root.push({
        label: arr[i].label,
        _id: arr[i]._id,
        children: [],
        component: arr[i],
        parent: arr,
      });
      if (arr[i]._id === id) return { parent, isRoot, slot };
    }
    const hasSlots = (cpn: Component) => cpn.props?.slots !== null;
    const getSlots = (cpn: Component) => {
      const slots = pickBy(cpn.props?.slots, (value, key) =>
        key.startsWith("slot"),
      );
      return Object.values(slots);
    };
    for (let i = 0; i < root.length; i++) {
      if (hasSlots(root[i].component as Component)) {
        const slots = getSlots(root[i].component as Component);
        root[i].children = root[i].children ?? [];

        for (let j = 0; j < slots.length; j++) {
          const slot = slots[j];
          root[i].children.push({
            label: `插槽_${slot.key}`,
            children: [],
          });
          return getParentById(
            slot.children,
            id,
            root[i].component,
            false,
            slot.key,
          );
        }
      }
    }
  };

  /**
   * 设置当前点击组件
   * @param componentId 组件ID
   */
  const setActive = (componentId: string, parent: Component[]): void => {
    editorStore.currentComponent = componentId;
    editorStore.parent = parent;
  };

  const cancelActive = (): void => {
    editorStore.currentComponent = "";
    editorStore.parent = null;
  };

  /**
   * 各种组件事件
   */

  /**
   * 点击组件
   * @param event 鼠标事件
   * @param component 组件实例
   */
  const handleClick = (
    event: MouseEvent,
    component: Component,
    parent: Component[],
  ) => {
    if (component._id) {
      setActive(component._id, parent);
    }
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
    checkComponentExist,
    handleDelete,
    cancelActive,
    currentId,
    currentEditorComponent,
    currentComponent,
    registerRef,
  };
};

export default useEditor;
