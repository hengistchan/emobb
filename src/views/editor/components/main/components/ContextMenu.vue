<script lang="tsx">
  import { defineComponent, PropType, ref } from "vue";
  import { ActionItem } from "../../../hook/useContentMenu";
  export default defineComponent({
    props: {
      actions: {
        type: Array as PropType<ActionItem[]>,
        required: true,
      },
    },
    setup(props) {
      const menuRef = ref<HTMLElement | null>(null);
      const componentId = ref("");
      return () => (
        <div ref={menuRef} class="context-menu-component menu-container">
          <ul>
            {props.actions.map((action, index) => (
              <li key={index} onClick={() => action.action(componentId.value)}>
                <span class="item-text">{action.text}</span>
                <span class="item-shortcut">{action.shortcut}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    },
  });
</script>

<style lang="scss">
  .context-menu-component {
    display: none;
    position: absolute;
    background-color: #fff;

    border: 1px solid black;
    li {
      cursor: pointer;
      padding: 10px;
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
</style>
