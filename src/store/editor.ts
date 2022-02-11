import { defineStore } from "pinia";
import { Component } from "@/package/types/component";
import { Page } from "@/package/types/page";

interface EditorState {
  currentComponent: Nullable<Component>;
  page: Nullable<Page>;
}

const editorStore = defineStore("editor", {
  state: (): EditorState => ({
    currentComponent: null,
    page: null,
  }),
  getters: {
    getComponentById:
      (state) =>
      (id: string): Nullable<Component> =>
        state?.page?.components.find((cpn) => cpn._id === id) || null,
  },
});

export default editorStore;
