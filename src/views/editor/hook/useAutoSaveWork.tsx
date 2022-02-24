import Work from "@/api/work";
import useEditorStore from "@/store/editor";
import { Ref } from "vue";

const useAutoSaveWork = (model: Ref<boolean>, time: number) => {
  const editorStore = useEditorStore();
  const timer = setInterval(async () => {
    if (editorStore.page) {
      model.value = true;
      const { error } = await Work.saveWorkContent(editorStore.uuid || "", {
        page: editorStore.page,
      });
      if (error) {
        clearInterval(timer);
      }
      model.value = false;
    }
  }, time);
  return () => {
    clearInterval(timer);
  };
};

export default useAutoSaveWork;
