import Work from "@/api/work";
import useEditorStore from "@/store/editor";
import { Ref } from "vue";

/**
 * It saves the work content every `time` milliseconds.
 * @param model - Ref<boolean>
 * @param {number} time - The time interval in milliseconds between each save.
 * @returns The `useAutoSaveWork` function returns a function that clears the interval when it is
 * called.
 */
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
