<script lang="tsx">
  import { computed, defineComponent, ref, watch } from "vue";
  import useEditorStore from "@/store/editor";
  import { Component } from "@/package/types/component";
  import { lowerFirst, pickBy } from "lodash-es";
  import { Delete } from "@element-plus/icons-vue";
  import useEditor from "../../hook/useEditor";

  interface ComponentTree {
    label: string;
    _id?: string;
    component?: Component;
    children: ComponentTree[];
    parent?: Component[];
  }

  export default defineComponent({
    components: { Delete },
    setup() {
      const editorStore = useEditorStore();
      const { setActive, handleDelete } = useEditor();
      const topLevelComponents = computed(() => editorStore.page?.components);
      // console.log(topLevelTree.value);

      const generateTree = (arr: Component[] | undefined) => {
        const root: ComponentTree[] = [];
        if (arr == null) return;
        arr.forEach((cpn) => {
          root.push({
            label: cpn.label,
            _id: cpn._id,
            children: [],
            component: cpn,
            parent: arr,
          });
        });
        const hasSlots = (cpn: Component) => cpn.props?.slots !== null;
        const getSlots = (cpn: Component) => {
          const slots = pickBy(cpn.props?.slots, (value, key) =>
            key.startsWith("slot"),
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
              root[i].children[root[i].children.length - 1].children =
                generateTree(slot.children) ?? [];
            }
          }
        }
        return root;
      };
      const tree = computed(() => generateTree(topLevelComponents.value));
      const handleClick = (componentId: string | null | undefined) => {
        if (componentId == null) return;
        editorStore.currentComponent = componentId;
      };
      return () => (
        <el-tree
          data={tree.value}
          default-expand-all={true}
          expand-on-click-node={false}
          check-on-click-node={true}
        >
          {{
            default: ({ data }: { data: ComponentTree }) => {
              return (
                <div
                  class={"editor-component-tree"}
                  onClick={() => {
                    if (data._id && data.parent) {
                      setActive(data._id, data.parent);
                    }
                  }}
                >
                  <span>{data.label}</span>
                  {data?._id && (
                    <div>
                      <span>{data?._id}</span>
                      <span>
                        <el-icon>
                          <delete
                            onClick={(e: Event) => {
                              e.stopPropagation();
                              if (data._id && data.parent) {
                                handleDelete(null, data._id, data.parent);
                              }
                            }}
                          />
                        </el-icon>
                      </span>
                    </div>
                  )}
                </div>
              );
            },
          }}
        </el-tree>
      );
    },
  });
</script>

<style lang="scss">
  .editor-component-tree {
    width: 100%;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    > * {
      display: inline-block;
    }

    i {
      vertical-align: text-bottom;
    }

    .el-tree {
      --el-tree-node-hover-bg-color: rgb(53, 53, 53);
    }
  }
</style>
