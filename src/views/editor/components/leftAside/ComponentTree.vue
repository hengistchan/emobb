<script lang="tsx">
  import { computed, defineComponent, ref } from "vue";
  import useEditorStore from "@/store/editor";
  import { Component } from "@/package/types/component";
  import { pickBy } from "lodash-es";
  import { Delete, Operation } from "@element-plus/icons-vue";
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
      const { handleDelete } = useEditor();
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
                label: `插槽${slot.key ? "_" + slot.key : ""}`,
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
      const itemModel = ref("tree");
      return () => (
        <el-collapse v-model={itemModel.value} class="item-tree">
          <el-collapse-item name="tree" title="组件树">
            {{
              title: () => (
                <>
                  <el-icon size={20}>
                    <Operation />
                  </el-icon>
                  <div
                    class="component-module-label"
                    style={{ paddingLeft: "8px", fontWeight: 600 }}
                  >
                    组件树
                  </div>
                </>
              ),
              default: () => (
                <el-tree
                  data={tree.value}
                  default-expand-all={true}
                  expand-on-click-node={false}
                  check-on-click-node={true}
                  highlight-current={true}
                  class="tree-conatiner"
                >
                  {{
                    default: ({ data }: { data: ComponentTree }) => {
                      return (
                        <div
                          class={"editor-component-tree"}
                          onClick={() => {
                            if (data._id && data.parent) {
                              editorStore.setActive(data._id, data.parent);
                            }
                          }}
                        >
                          <span>{data.label}</span>
                          {data?._id && (
                            <div class="tools">
                              <span>{data?._id}</span>
                              <span>
                                <el-icon>
                                  <delete
                                    onClick={(e: Event) => {
                                      e.stopPropagation();
                                      if (data._id && data.parent) {
                                        handleDelete(
                                          null,
                                          data._id,
                                          data.parent,
                                        );
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
              ),
            }}
          </el-collapse-item>
        </el-collapse>
      );
    },
  });
</script>

<style lang="scss">
  .item-tree {
    position: absolute;
    bottom: 10px;
    width: 100%;
    // max-height: 350px;
    .tree-conatiner {
      position: relative;
      overflow-y: auto;
      max-height: 300px;
      min-height: 150px;
      .editor-component-tree {
        width: 100%;
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        > * {
          display: inline-block;
        }

        i {
          vertical-align: text-bottom;
        }

        .el-tree {
          --el-tree-node-hover-bg-color: rgb(53, 53, 53);
        }
        .tools {
          margin-right: 20px;
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>
