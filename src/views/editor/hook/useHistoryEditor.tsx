import { getParentElement } from "@/helper";
import { Component } from "@/package/types/component";
import useEditorStore, { EditorHistory } from "@/store/editor";
import { HtmlAttributes } from "csstype";

const useHistoryEditor = () => {
  const editorStore = useEditorStore();

  const pushHistory = (history: EditorHistory) => {
    if (editorStore.historyIndex !== -1) {
      editorStore.histories = editorStore.histories.slice(
        0,
        editorStore.historyIndex,
      );
      editorStore.historyIndex = -1;
    }
    if (editorStore.historyLength > editorStore.histories.length) {
      editorStore.histories.push(history);
    } else {
      editorStore.histories.shift();
      editorStore.histories.push(history);
    }
  };

  const handleAdd = (event: any) => {
    // 判断是组件元素移动还是添加
    let type: EditorHistory["type"];
    if (event.pullMode === "clone") {
      // 添加组件
      type = "add";
      // 添加到根组件、添加到某个插槽
      const to = event.to as HTMLElement;
      const inner = to.classList.contains("inner-draggable");
      if (inner) {
        // 获取当前的slot-key
        const slotKey = to.dataset.key;
        // 获取插槽所在组件
        const root = getParentElement(to, "edit-wrapper");
        // 获取组件id
        const rootId = root?.dataset.id;
        // 取得soltChildren
        if (slotKey && root && rootId) {
          const slotChildren = editorStore.componentMap[rootId].props.slots[
            slotKey
          ].children as Component[];
          // 构造history对象
          const history: EditorHistory = {
            type,
            from: null,
            fromIndex: -1,
            to: slotChildren,
            toIndex: event.newDraggableIndex,
            toRootId: rootId,
            toSlot: slotKey,
            component: slotChildren[event.newDraggableIndex],
          };
          pushHistory(history);
        }
      } else {
        const history: EditorHistory = {
          type,
          from: null,
          fromIndex: -1,
          to: editorStore.page?.components as Component[],
          toIndex: event.newDraggableIndex,
          component: editorStore.page?.components[
            event.newDraggableIndex
          ] as Component,
          toRootId: "root",
          toSlot: "",
        };
        pushHistory(history);
      }
    }
  };

  const handleEnd = (event: any) => {
    // 组件移动
    const history: { [key: string]: any } = {
      type: "edit",
      fromIndex: event.oldDraggableIndex,
      from: null,
      toIndex: event.newDraggableIndex,
      to: null,
      component: null,
    };
    const from = event.from as HTMLElement;
    const to = event.to as HTMLElement;

    // 组件开始移动时在slot还是根组件
    const fromInner = event.from.classList.contains("inner-draggable");
    // 组件移动结束时在slot还是根组件
    const toInner = event.to.classList.contains("inner-draggable");
    if (fromInner) {
      history.fromSlot = from.dataset.key;
      history.fromRootId = getParentElement(from, "edit-wrapper")?.dataset.id;
    } else {
      history.fromRootId = "root";
    }
    if (toInner) {
      history.toSlot = to.dataset.key;
      history.toRootId = getParentElement(to, "edit-wrapper")?.dataset.id;
    } else {
      history.toRootId = "root";
    }
    history.component = toInner
      ? editorStore.componentMap[history.toRootId].props.slots[history.toSlot]
          .children[history.toIndex]
      : editorStore.page?.components[history.toIndex];
    pushHistory(history as EditorHistory);
  };

  const historyNext = () => {
    // 向后
    if (editorStore.historyIndex === -1) {
      return;
    }
    const history = editorStore.histories[editorStore.historyIndex];

    switch (history.type) {
      case "add": {
        if (history.toRootId === "root") {
          editorStore.page?.components.splice(
            history.toIndex,
            0,
            history.component,
          );
        } else {
          const slotChildren = editorStore.componentMap[
            history.toRootId as string
          ].props.slots[history.toSlot as string].children as Component[];
          slotChildren.splice(history.toIndex, 0, history.component);
        }
        break;
      }
      case "edit": {
        // 取出父组件
        const toParent = (
          history.toRootId === "root"
            ? editorStore.page?.components
            : editorStore.componentMap[history.toRootId as string].props.slots[
                history.toSlot as string
              ].children
        ) as Component[];
        const fromParent = (
          history.fromRootId === "root"
            ? editorStore.page?.components
            : editorStore.componentMap[history.fromRootId as string].props
                .slots[history.fromSlot as string].children
        ) as Component[];

        const i = fromParent.findIndex((item) => {
          return item._id === (history.component as Component)._id;
        });
        toParent.splice(history.toIndex, 0, fromParent.splice(i, 1)[0]);
        break;
      }
      case "delete": {
        const toParent = (
          history.toRootId === "root"
            ? editorStore.page?.components
            : editorStore.componentMap[history.toRootId as string].props.slots[
                history.toSlot as string
              ].children
        ) as Component[];
        toParent.splice(history.toIndex, 1);
        break;
      }
    }
    editorStore.historyIndex++;
  };
  const historyPrev = () => {
    // 向前
    if (editorStore.historyIndex === -1) {
      editorStore.historyIndex = editorStore.histories.length - 1;
    } else {
      editorStore.historyIndex--;
    }
    const history = editorStore.histories[editorStore.historyIndex];

    switch (history.type) {
      case "add": {
        const toParent = (
          history.toRootId === "root"
            ? editorStore.page?.components
            : editorStore.componentMap[history.toRootId as string].props.slots[
                history.toSlot as string
              ].children
        ) as Component[];
        const i = toParent.findIndex((item) => {
          return item._id === (history.component as Component)._id;
        });
        if (history.toRootId === "root") {
          editorStore.page?.components.splice(i, 1);
        } else {
          const slotChildren = editorStore.componentMap[
            history.toRootId as string
          ].props.slots[history.toSlot as string].children as Component[];
          slotChildren.splice(i, 1);
        }
        break;
      }
      case "edit": {
        // 取出父组件
        const toParent = (
          history.toRootId === "root"
            ? editorStore.page?.components
            : editorStore.componentMap[history.toRootId as string].props.slots[
                history.toSlot as string
              ].children
        ) as Component[];
        const fromParent = (
          history.fromRootId === "root"
            ? editorStore.page?.components
            : editorStore.componentMap[history.fromRootId as string].props
                .slots[history.fromSlot as string].children
        ) as Component[];

        const i = toParent.findIndex((item) => {
          return item._id === (history.component as Component)._id;
        });
        fromParent.splice(history.fromIndex, 0, toParent.splice(i, 1)[0]);
        break;
      }
      case "delete": {
        const toParent = (
          history.toRootId === "root"
            ? editorStore.page?.components
            : editorStore.componentMap[history.toRootId as string].props.slots[
                history.toSlot as string
              ].children
        ) as Component[];
        toParent.splice(history.toIndex, 0, history.component);
        break;
      }
    }
  };
  return {
    handleAdd,
    historyNext,
    historyPrev,
    handleEnd,
    pushHistory,
  };
};

export default useHistoryEditor;
