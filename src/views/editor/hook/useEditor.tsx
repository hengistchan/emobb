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

  /**
   * 在componentMap上注册组件实例
   * @param el dom实例
   * @param componentId 组件ID
   */
  const registerRef = (el: any, componentId: string) => {
    editorStore.componentMap[componentId] &&
      (editorStore.refs[componentId] = el);
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
      editorStore.cancelActive();
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
      const slots = pickBy(
        cpn.props?.slots,
        (value, key) => !key.startsWith("value"),
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
      editorStore.setActive(component._id, parent);
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
    handleClick,
    handleMouseOver,
    handleDelete,
    registerRef,
  };
};

export default useEditor;
