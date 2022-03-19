<script lang="tsx">
  import Data from "@/api/data";
  import Work, { WorkDTO } from "@/api/work";
  import { defineComponent, onMounted, ref } from "vue";
  import { useRoute } from "vue-router";

  export default defineComponent({
    setup() {
      const route = useRoute();
      const { uuid } = route.params as { uuid: string };
      const work = ref<WorkDTO | null>(null);
      onMounted(async () => {
        work.value = await Work.getByUUID(uuid);
        await Data.getData(uuid);
        await Data.getEvent(uuid);
      });
      return () => (
        <>
          <div>123</div>
        </>
      );
    },
  });
</script>

<style lang="scss"></style>
