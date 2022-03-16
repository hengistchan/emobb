import { Component } from "@/package/types/component";
import { createVNode, render } from "vue";
import ContextMenu from "../components/main/components/ContextMenu.vue";
import useEditor from "./useEditor";
import useEditorStore from "@/store/editor";

export interface ActionItem {
  action: (cid?: string, parent?: Component[]) => void;
  text: string;
  shortcut: string;
}
let dom: HTMLDivElement | null = null;
/**
 * It creates a context menu.
 * @returns The `handleContextMenu` function is being returned.
 */
const useContextMenu = () => {
  const { handleDelete } = useEditor();
  const editorStore = useEditorStore();

  const actions: ActionItem[] = [
    {
      shortcut: "Backspace / Delete",
      text: "删除组件",
      action: () => {
        handleDelete(null, null, null);
      },
    },
  ];
  const initContextMenu = () => {
    const container = document.createElement("div");
    const vm = createVNode(ContextMenu, {
      actions,
    });
    render(vm, container);
    dom = document.body.appendChild(container);
    document.addEventListener("click", () => {
      if (dom) {
        (dom.children[0] as HTMLDivElement).style.display = "none";
      }
    });
    return () => {
      render(null, container);
      document.body.removeChild(container);
    };
  };
  const handleContextMenu = (
    event: MouseEvent,
    componentId: string,
    parent: Component[],
  ) => {
    if (dom) {
      const domElement = dom.children[0] as HTMLElement;
      domElement.style.display = "block";
      domElement.style.top = event.pageY + "px";
      domElement.style.left = event.pageX + "px";
      editorStore.setActive(componentId, parent);
    }
    event.preventDefault();
  };
  return { handleContextMenu, initContextMenu };
};

export default useContextMenu;
