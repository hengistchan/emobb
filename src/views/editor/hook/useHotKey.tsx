import hotkeys, { KeyHandler } from "hotkeys-js";
import { computed, onMounted, onUnmounted } from "vue";
import useEditor from "./useEditor";
import useEditorStore from "@/store/editor";

const registerHotKey = (keys: string, callback: KeyHandler): void => {
  onMounted(() => {
    hotkeys(keys, callback);
  });

  onUnmounted(() => {
    hotkeys.unbind(keys, callback);
  });
};

const useHotKey = () => {
  const { handleDelete, cancelActive } = useEditor();
  const editorStore = useEditorStore();
  const currentComponent = computed(() => editorStore.currentComponent);
  const parent = computed(() => editorStore.parent);

  registerHotKey("backspace, delete", () => {
    if (currentComponent.value && parent.value) {
      handleDelete(null, currentComponent.value, parent.value);
    }
  });

  registerHotKey("esc", () => {
    cancelActive();
  });
};
export default useHotKey;
