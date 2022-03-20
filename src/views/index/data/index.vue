<script lang="tsx">
  import Data from "@/api/data";
  import type { DataSet, EventData } from "@/api/data";
  import Work, { WorkDTO } from "@/api/work";
  import { defineComponent, onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { Line } from "@antv/g2plot";
  import dayjs from "dayjs";
  import useMonacoEditor from "@/hook/useMonacoEditor";

  export default defineComponent({
    setup() {
      const route = useRoute();
      const { uuid } = route.params as { uuid: string };
      const work = ref<WorkDTO | null>(null);
      const data = ref<DataSet[] | null>(null);
      const event = ref<EventData[] | null>(null);
      const chartRef = ref<HTMLDivElement | null>(null);
      const dataRef = ref<HTMLDivElement | null>(null);
      const { updateVal, createEditor } = useMonacoEditor();
      onMounted(async () => {
        work.value = await Work.getByUUID(uuid);
        data.value = await Data.getData(uuid);
        event.value = await Data.getEvent(uuid);

        console.log(data.value);

        if (chartRef.value) {
          const line = new Line(chartRef.value, {
            data: event.value.reduce((prev, next) => {
              prev.push({
                label: "pv",
                value: next.eventData.pv,
                date: dayjs(next.eventDate).format("YYYY-MM-DD"),
              });
              prev.push({
                label: "uv",
                value: next.eventData.uv,
                date: dayjs(next.eventDate).format("YYYY-MM-DD"),
              });
              return prev;
            }, [] as any[]),
            xField: "date",
            xAxis: {
              type: "time",
            },
            yField: "value",
            seriesField: "label",
          });
          line.render();
        }

        createEditor(dataRef.value);
        updateVal(JSON.stringify(data.value, null, 2));
      });

      const handleClickDownload = async () => {
        window.location.href = `http://hengistchan.site:3002/api/data/excel/${uuid}`;
      };

      return () => (
        <>
          <el-container class="data-container">
            <div class="left">
              <div class="event">
                <div class="title">事件统计</div>
                <div
                  class="chart"
                  ref={(el) => {
                    chartRef.value = el as HTMLDivElement;
                  }}
                ></div>
              </div>
              <div class="data-set">
                <div class="title">
                  数据集
                  <el-button
                    type="primary"
                    size="small"
                    style="margin-left: 10px;"
                    onClick={() => handleClickDownload()}
                  >
                    下载excel文件
                  </el-button>
                </div>
                <div
                  class="data"
                  ref={(el) => (dataRef.value = el as HTMLDivElement)}
                ></div>
              </div>
            </div>
            <div class="right">
              <div class="title"></div>
              <div class="image"></div>
            </div>
          </el-container>
        </>
      );
    },
  });
</script>

<style lang="scss">
  .data-container {
    // background-color: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    min-width: 1024px;
    width: 85%;
    height: 98%;
    // box-sizing: border-box;
    margin: 0 auto;
    padding: 20px 20px 0 20px;
    display: flex;
    background-color: #ffffff;
    border-radius: 20px;
    .left {
      width: 700px;
      height: 100%;
      .event {
        .title {
          font-size: 16px;
          font-weight: 600;
          margin: 10px 15px;
        }
        .chart {
          width: 700px;
          height: 300px;
        }
      }
      .data-set {
        height: 400px;
        .title {
          font-size: 16px;
          font-weight: 600;
          margin: 40px 15px 10px 15px;
        }
        .data {
          width: 700px;
          height: 100%;
          background-color: black;
        }
      }
    }
    .right {
      flex: 1;
    }
  }
</style>
