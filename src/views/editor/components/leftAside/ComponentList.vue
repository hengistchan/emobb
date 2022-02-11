<template>
  <div class="component-module-list">
    <el-collapse v-model="activeName">
      <el-collapse-item
        v-for="item in componentList"
        :key="item.name"
        :title="item.label"
        :name="item.name"
      >
        <template v-slot:title>
          <el-icon :size="20"><component :is="item.icon" /></el-icon>
          <div class="component-module-label">{{ item.label }}</div>
        </template>
        <draggable
          v-model="item.components"
          class="component-container drag-area"
          :sort="false"
          :group="{ name: 'components', pull: 'clone', put: false }"
          item-key="label"
          @change="onDrag"
        >
          <template #item="{ element: cpn }">
            <div class="component">
              <!-- <component :is="cpn.preview" /> -->
              <el-icon :size="20">
                <component :is="cpn.icon" />
              </el-icon>
              <div class="component-label">
                {{ cpn.label }}
              </div>
            </div>
          </template>
        </draggable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import componentModules from "@/package";
  import RenderVNode from "@/helper/RenderVNode";
  import draggable from "vuedraggable";

  export default defineComponent({
    components: {
      RenderVNode,
      draggable,
    },
    setup() {
      const activeName = ref("text");
      const componentList = computed(() =>
        Object.values(componentModules).sort((a, b) => a.order - b.order),
      );
      const onDrag = (e: any) => {
        console.log(e);
      };
      return {
        activeName,
        componentList,
        onDrag,
      };
    },
  });
</script>

<style lang="scss">
  .component-module-list {
    .component-module-label {
      padding-left: 8px;
      font-weight: 600;
    }

    .component-container {
      display: flex;
      margin: 10px 0;
      padding: 0 20px;
      justify-content: space-around;

      .component {
        width: 50%;
        height: 25px;
        line-height: 25px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        &:hover {
          border-radius: 3px;
          background-color: #f0f0f0;
          cursor: pointer;
        }
        .component-label {
          display: inline-block;
          vertical-align: top;
          padding-left: 5px;
        }
      }
    }

    .el-collapse-item {
      .el-collapse-item__header {
        padding-left: 15px;
        height: 30px;
        color: #505050;
        &.is-active {
          color: rgb(34, 34, 34);
        }
      }
    }
  }
</style>
