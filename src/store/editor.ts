import { defineStore } from "pinia";
import { Component } from "@/package/types/component";
import { Page } from "@/package/types/page";
import { find } from "lodash-es";
import { Nullable } from "types";

interface ComponentTree {
  label: string;
  _id?: string;
  component?: Component;
  children: ComponentTree[];
  parent?: Component[];
}

export interface EditorHistory {
  type: "edit" | "add" | "delete";
  fromIndex: number;
  toIndex: number;
  from: Component[] | null;
  to: Component[];
  component: Component;
  toSlot?: string;
  toRootId?: string;
  fromSlot?: string;
  fromRootId?: string;
}

interface EditorState {
  currentComponent: Nullable<string>;
  page: Nullable<Page>;
  componentMap: { [componentId: string]: Component };
  tick: number;
  parent: Nullable<Component[]>;
  histories: EditorHistory[];
  historyIndex: number;
  historyLength: number;
  componentTree: ComponentTree[] | undefined;
  refs: { [key: string]: any };
}

const editorStore = defineStore("editor", {
  state: (): EditorState => ({
    currentComponent: null,
    page: null,
    componentMap: {},
    tick: 0,
    parent: null,
    histories: [],
    historyIndex: -1,
    historyLength: 10,
    componentTree: [],
    refs: {},
  }),
  getters: {
    getComponentById: (state) => (id?: string | null) => {
      if (id == null && state.currentComponent == null) {
        return null;
      }
      id = id || state.currentComponent;
      return find(state.componentMap, (item) => item._id === id);
    },
    checkHistoryPrev: (state) =>
      state.histories.length === 0 || state.historyIndex === 0,
    checkHistpryNext: (state) =>
      state.histories.length === 0 ||
      state.historyIndex === state.histories.length ||
      state.historyIndex === -1,
  },
  actions: {
    addComponent(cpn: Component) {
      this.componentMap[cpn._id] = cpn;
    },
    cancelActive() {
      this.currentComponent = "";
      this.parent = null;
    },
    setActive(componentId: string, parent: Component[]) {
      this.currentComponent = componentId;
      this.parent = parent;
    },
  },
});

export default editorStore;
