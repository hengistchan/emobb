<script lang="tsx">
  import { computed, defineComponent, ref, watch } from "vue";
  import useEditorStore from "@/store/editor";
  import { Component } from "@/package/types/component";
  import { pickBy } from "lodash-es";

  interface ComponentTree {
    label: string;
    _id?: string;
    component?: Component;
    children: ComponentTree[];
  }

  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const topLevelComponents = computed(() => editorStore.page?.components);
      const topLevelTree = computed(() =>
        topLevelComponents.value?.map(
          (cpn) =>
            ({
              label: cpn.label,
              _id: cpn._id,
              children: [],
              component: cpn,
            } as ComponentTree),
        ),
      );
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
      return () => (
        <el-tree
          data={tree.value}
          default-expand-all={true}
          expand-on-click-node={false}
          check-on-click-node={true}
        >
          {{
            default: ({ data }: { data: ComponentTree }) => (
              <div>
                <span>{data.label}</span>
                {data?._id && data._id}
              </div>
            ),
          }}
        </el-tree>
      );
    },
  });
</script>
