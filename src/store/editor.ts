import { defineStore } from "pinia";
import { Component } from "@/package/types/component";
import { Page } from "@/package/types/page";
import { find } from "lodash-es";
import { Nullable } from "types";

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
  getters: {
    // todo
    getComponentById: (state) => (id?: string | null) => {
      if (id == null && state.currentComponent == null) {
        return null;
      }
      id = id || state.currentComponent;
      return find(state.componentMap, (item) => item._id === id);
    },
    // getTree: (state) => {},
  },
  actions: {
    addComponent(cpn: Component) {
      this.componentMap[cpn._id] = cpn;
    },
  },
});

export default editorStore;
