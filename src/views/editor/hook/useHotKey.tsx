import hotkeys, { KeyHandler } from "hotkeys-js";
import { computed, onMounted, onUnmounted } from "vue";
import useEditor from "./useEditor";
import useEditorStore from "@/store/editor";

/**
 * It binds a key handler to the hotkeys library.
 * @param {string} keys - A string of keys and key combinations delimited by spaces.
 * @param {KeyHandler} callback - The function that will be called when the hotkey is pressed.
 */
const registerHotKey = (keys: string, callback: KeyHandler): void => {
  onMounted(() => {
    hotkeys(keys, callback);
  });

  onUnmounted(() => {
    hotkeys.unbind(keys, callback);
  });
};

const useHotKey = () => {
  const { handleDelete } = useEditor();
  const editorStore = useEditorStore();
  const currentComponent = computed(() => editorStore.currentComponent);
  const parent = computed(() => editorStore.parent);

  registerHotKey("backspace, delete", () => {
    if (currentComponent.value && parent.value) {
      handleDelete(null, currentComponent.value, parent.value);
    }
  });

  registerHotKey("esc", () => {
    editorStore.cancelActive();
  });
};
export default useHotKey;
