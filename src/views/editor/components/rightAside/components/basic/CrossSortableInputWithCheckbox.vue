<script lang="tsx">
  import { useVModel } from "@vueuse/core";
  import { computed, defineComponent, PropType, reactive } from "vue";
  import draggable from "vuedraggable";
  import { Rank, Remove, CirclePlus } from "@element-plus/icons-vue";
  import { ElCheckbox, ElCheckboxGroup, ElInput } from "element-plus";

  export default defineComponent({
    components: { draggable },
    props: {
      modelValue: {
        type: Array as PropType<{ label: string; value: string }[]>,
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
        const newItem = { label: "", value: "" };
        state.list.splice(index + 1, 0, newItem);
      };

      return () => (
        <div class="sortable-prop">
          {state.list.length !== 0 ? (
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
                item: ({ element, index }: { element: any; index: number }) => (
                  <div class="item">
                    <el-icon class="handle" size={16}>
                      <Rank />
                    </el-icon>
                    label:
                    <ElInput v-model={element.label}></ElInput>
                    value:
                    <ElInput v-model={element.value}></ElInput>
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
          ) : (
            <el-button
              type="primary"
              size="small"
              onClick={() => incrementOption(-1)}
            >
              添加
            </el-button>
          )}
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
