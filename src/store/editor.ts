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
    getPage: (state) => state.page,
  },
});

export default editorStore;
