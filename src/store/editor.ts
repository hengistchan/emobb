import { defineStore } from "pinia";
import { Component } from "@/package/types/component";
import { Page } from "@/package/types/page";

interface EditorState {
  currentComponent: Nullable<string>;
  page: Nullable<Page>;
  componentMap: { [componentId: string]: Component };
  tick: number;
  parent: Nullable<Component[]>;
}

const editorStore = defineStore("editor", {
  state: (): EditorState => ({
    currentComponent: null,
    page: null,
    componentMap: {},
    tick: 0,
    parent: null,
  }),
  getters: {},
  actions: {
    addComponent(cpn: Component) {
      this.componentMap[cpn._id] = cpn;
    },
  },
});

export default editorStore;
