import { defineStore } from "pinia";
import { Component } from "@/package/types/component";
import { Page } from "@/package/types/page";
import { find, pickBy } from "lodash-es";
import { Nullable } from "types";
import { createNewPage } from "@/views/editor/hook/useEditorInit";

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
  refs: { [key: string]: any };
  uuid: Nullable<string>;
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
    refs: {},
    uuid: null,
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
    registerStore(page: Page) {
      // 遍历page，注册组件
      if (page == null) {
        this.page = createNewPage({ title: "新页面" });
        return;
      }
      let tick = 1;
      const registerComponents = (arr: Component[]): any => {
        const root: any[] = [];
        if (arr == null) return;
        for (let i = 0; i < arr.length; i++) {
          tick = Math.max(tick, parseInt(arr[i]._id.split("_")[1]));
          root.push({
            label: arr[i].label,
            _id: arr[i]._id,
            children: [],
            component: arr[i],
            parent: arr,
          });
          this.componentMap[arr[i]._id] = arr[i];
        }
        const hasSlots = (cpn: Component) => cpn.props?.slots !== null;
        const getSlots = (cpn: Component) => {
          const slots = pickBy(
            cpn.props?.slots,
            (value, key) => !key.startsWith("value"),
          );
          return Object.values(slots);
        };
        for (let i = 0; i < root.length; i++) {
          if (hasSlots(root[i].component as Component)) {
            const slots = getSlots(root[i].component as Component);
            root[i].children = root[i].children ?? [];

            for (let j = 0; j < slots.length; j++) {
              const slot = slots[j];
              root[i].children.push({
                label: `插槽_${slot.key}`,
                children: [],
              });
              registerComponents(slot.children);
            }
          }
        }
      };
      registerComponents(page.components);
      this.page = page;
      this.tick = ++tick;
    },
  },
});

export default editorStore;
