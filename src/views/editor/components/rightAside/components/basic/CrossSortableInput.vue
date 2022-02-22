<script lang="tsx">
  import { useVModel } from "@vueuse/core";
  import { computed, defineComponent, PropType, reactive } from "vue";
  import draggable from "vuedraggable";
  import { Rank, Remove, CirclePlus } from "@element-plus/icons-vue";

  export default defineComponent({
    components: { draggable },
    props: {
      modelValue: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
    },
    setup(props, { emit }) {
      const state = reactive({
        list: useVModel(props, "modelValue", emit),
        drag: false,
      });

      const dragOptions = computed(() => {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost",
        };
      });

      const incrementOption = (index: number) => {
        const length = state.list.length + 1;
        const newItem = "";
        state.list.splice(index + 1, 0, newItem);
      };
      return () => (
        <div class="sortable-prop">
          <draggable
            tag="ul"
            list={state.list}
            class="list-group"
            component-data={{
              tag: "ul",
              type: "transition-group",
              name: !state.drag ? "flip-list" : null,
            }}
            handle=".handle"
            {...dragOptions.value}
            itemKey={""}
            onStart={() => (state.drag = true)}
            onEnd={() => (state.drag = false)}
          >
            {{
              item: ({
                element,
                index,
              }: {
                element: string;
                index: number;
              }) => (
                <div class="item">
                  <el-icon class="handle" size={16}>
                    <Rank />
                  </el-icon>
                  <el-input
                    v-model={state.list[index]}
                    class={"item-input"}
                  ></el-input>
                  <div class="item-icons">
                    <el-icon onClick={() => incrementOption(index)} size={16}>
                      <CirclePlus></CirclePlus>
                    </el-icon>
                    <el-icon
                      onClick={() => state.list.splice(index, 1)}
                      size={16}
                    >
                      <Remove></Remove>
                    </el-icon>
                  </div>
                </div>
              ),
            }}
          </draggable>
        </div>
      );
    },
  });
</script>

<style lang="scss">
  .sortable-prop {
    // display: flex;
    .item {
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      margin-top: 5px;
      &:first-child {
        margin-top: 0;
      }
      .handle {
      }
      .item-input {
      }
      .item-icons {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
