<template>
  <div class="component-module-list">
    <el-collapse v-model="activeName">
      <el-collapse-item
        v-for="item in componentList"
        :key="item.name"
        :title="item.label"
        :name="item.name"
      >
        <template #title>
          <el-icon :size="20"><component :is="item.icon" /></el-icon>
          <div class="component-module-label">{{ item.label }}</div>
        </template>
        <draggable
          v-model="item.components"
          class="component-container drag-area"
          :sort="false"
          :group="{ name: 'components', pull: 'clone', put: false }"
          item-key="label"
          :clone="clone"
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
  import { Component, computed, defineComponent, ref } from "vue";
  import componentModules from "@/package";
  import RenderVNode from "@/helper/RenderVNode";
  import draggable from "vuedraggable";
  import { cloneDeep } from "lodash-es";
  import { EditorComponent } from "@/package/types/component";
  import { createNewComponent } from "./../../hook/useEditorInit";

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
      const clone = (cpn: EditorComponent): Component => {
        return createNewComponent(cloneDeep(cpn));
      };
      return {
        activeName,
        componentList,
        onDrag,
        clone,
      };
    },
  });
</script>

<style lang="scss">
  .component-module-list {
    margin-bottom: 35px;
    overflow-y: auto;
    .component-module-label {
      padding-left: 8px;
      font-weight: 600;
    }

    .component-container {
      display: flex;
      margin: 10px 0;
      padding: 0 20px;
      justify-content: flex-start;
      width: 240px;
      flex-wrap: wrap;

      .component {
        width: 110px;
        height: 25px;
        line-height: 25px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        margin-top: 5px;
        &:hover {
          border-radius: 3px;
          background-color: #f0f0f0;
          cursor: pointer;
        }
        .component-label {
          width: 100%;
          display: inline-block;
          vertical-align: top;
          padding-left: 5px;
        }
      }
    }
  }
</style>
