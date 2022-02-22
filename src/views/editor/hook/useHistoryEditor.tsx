import useEditorStore, { EditorHistory } from "@/store/editor";

const useHistoryEditor = () => {
  const editorStore = useEditorStore();
  const addInHistory = (
    type: "add" | "delete" | "edit",
    event: CustomEvent,
    parent: "page" | "slot",
  ) => {
    console.log(type, event, parent);
  };

  const handleAdd = (event: any) => {
    console.log(event);
  };

  const historyNext = () => {};
  const historyPrev = () => {
    // 向前
    if (editorStore.historyIndex === -1) {
      editorStore.historyIndex = editorStore.histories.length - 1;
    } else {
      editorStore.historyIndex--;
    }
    const history = editorStore.histories[editorStore.historyIndex];
    console.log(history.to);

    switch (history.type) {
      case "add": {
        const i = history.to.findIndex((item) => {
          return item._id === history.component._id;
        });
        console.log(i);

        if (i !== -1) {
          console.log(i, "inner");
          console.log(editorStore.page?.components, history.to);

          editorStore.page?.components.splice(i, 1);
        }
        break;
      }
    }
  };
  return {
    addInHistory,
    handleAdd,
    historyNext,
    historyPrev,
  };
};

export default useHistoryEditor;
