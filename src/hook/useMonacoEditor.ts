import { monaco } from "@/plugin/Monaco";

/**
 * It creates a monaco editor.
 * @param [language=javascript] - The language of the editor.
 * @returns The `useMonacoEditor` function returns an object with the following properties:
 */
const useMonacoEditor = (language = "javascript") => {
  let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;
  let initReadOnly = false;
  const updateVal = async (val: string) => {
    monacoEditor?.setValue(val);
    setTimeout(async () => {
      initReadOnly && monacoEditor?.updateOptions({ readOnly: false });
      await monacoEditor?.getAction("editor.action.formatDocument").run();
      initReadOnly && monacoEditor?.updateOptions({ readOnly: true });
    }, 100);
  };

  const createEditor = (
    el: HTMLElement | null,
    editorOption: monaco.editor.IStandaloneEditorConstructionOptions = {},
  ) => {
    if (monacoEditor) {
      return;
    }
    initReadOnly = !!editorOption.readOnly;
    monacoEditor =
      el &&
      monaco.editor.create(el, {
        language,
        minimap: { enabled: false },
        theme: "vs-dark",
        multiCursorModifier: "ctrlCmd",
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
        tabSize: 2,
        automaticLayout: true, // 自适应宽高
        ...editorOption,
      });
    return monacoEditor;
  };
  const onFormatDoc = () => {
    monacoEditor?.getAction("editor.action.formatDocument").run();
  };
  return {
    updateVal,
    getEditor: () => monacoEditor,
    createEditor,
    onFormatDoc,
  };
};

export default useMonacoEditor;
