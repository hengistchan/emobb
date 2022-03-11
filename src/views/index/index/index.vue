<script lang="tsx">
  import { computed, defineComponent, onMounted, reactive, ref } from "vue";
  import useUserStore from "@/store/user";
  import IconHelper from "@/helper/IconHelper";
  import Work, { WorkDTO } from "@/api/work";
  import { dateFormat } from "@/helper";
  import { useRouter } from "vue-router";
  import { useQRCode } from "@vueuse/integrations/useQRCode";

  export default defineComponent({
    setup() {
      const userStore = useUserStore();
      const userInfo = computed(() => userStore.userInfo);
      const router = useRouter();
      const avatar =
        "http://file.hengistchan.site/9e335ad40618455daa12c19e5b6f28e8.png";
      const works = ref<WorkDTO[]>([]);
      let counts = reactive<{
        sum: number;
        template: number;
        publish: number;
      }>({
        sum: 0,
        template: 0,
        publish: 0,
      });
      onMounted(async () => {
        const res = (await Work.getRecentWork(5)) as WorkDTO[];
        counts = await Work.getCount();
        works.value = res;
      });
      const url = ref("");
      const qrcode = useQRCode(url);
      return () => (
        <>
          <el-container class="index-container">
            <div class="top">
              <div class="left">
                <h2 class="title">最近编辑</h2>
                <el-link
                  class="more"
                  type="primary"
                  underline={false}
                  icon={IconHelper("mdi:dots-horizontal", 18)}
                  href="/#/work"
                >
                  查看更多
                </el-link>
                <el-table
                  data={works.value}
                  max-height={310}
                  height={310}
                  size="large"
                  stripe={true}
                >
                  <el-table-column
                    label="ID"
                    prop="id"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="标题"
                    prop="title"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="是否热门" align="center">
                    {{
                      default: ({ row }: { row: WorkDTO }) => (
                        <>
                          {row.is_hot ? (
                            <el-tag type="danger">是</el-tag>
                          ) : (
                            <el-tag type="info">否</el-tag>
                          )}
                        </>
                      ),
                    }}
                  </el-table-column>
                  <el-table-column label="是否模板" align="center">
                    {{
                      default: ({ row }: { row: WorkDTO }) => (
                        <>
                          {row.is_template ? (
                            <el-tag type="success">是</el-tag>
                          ) : (
                            <el-tag type="info">否</el-tag>
                          )}
                        </>
                      ),
                    }}
                  </el-table-column>
                  <el-table-column label="状态" prop="status" align="center">
                    {{
                      default: ({ row }: { row: WorkDTO }) => (
                        <el-tag type={row.status === 1 ? "success" : "danger"}>
                          {row.status === 1 ? "正常" : "强制下线"}
                        </el-tag>
                      ),
                    }}
                  </el-table-column>
                  <el-table-column label="发布时间" align="center">
                    {{
                      default: ({ row }: { row: WorkDTO }) =>
                        row.latest_publish_time
                          ? dateFormat(row.latest_publish_time)
                          : "无",
                    }}
                  </el-table-column>
                  <el-table-column label="编辑 / 预览" align="center">
                    {{
                      default: ({ row }: { row: WorkDTO }) => (
                        <el-popover
                          placement="right"
                          trigger="hover"
                          width={100}
                          hide-after={0}
                          onBeforeEnter={() =>
                            (url.value = `http://hengistchan.site:8082/preview/#/?id=${row.uuid}`)
                          }
                        >
                          {{
                            reference: () => (
                              <el-button
                                type="primary"
                                size="small"
                                onClick={() =>
                                  router.push("/editor?id=" + row.uuid)
                                }
                              >
                                编辑
                              </el-button>
                            ),
                            default: () => (
                              <el-image
                                width="100"
                                height="100"
                                src={qrcode.value}
                              ></el-image>
                            ),
                          }}
                        </el-popover>
                      ),
                    }}
                  </el-table-column>
                </el-table>
              </div>
              <div class="right">
                <div class="avatar">
                  <el-avatar
                    size={150}
                    src={userInfo.value.picture || avatar}
                  ></el-avatar>
                </div>
                <div class="name">{userInfo.value.username}</div>
                <div class="infos">
                  <div class="info" onClick={() => router.push("/work")}>
                    <span class="num">{counts.sum}</span>
                    <span class="title">作品数</span>
                  </div>
                  <div class="info" onClick={() => router.push("/template")}>
                    <span class="num">{counts.template}</span>
                    <span class="title">模板数</span>
                  </div>
                  <div class="info" onClick={() => router.push("/work")}>
                    <span class="num">{counts.publish}</span>
                    <span class="title">已发布</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="middle">
              <div class="inner">
                <h2 class="title">热门模板</h2>
                <el-link
                  class="more"
                  type="primary"
                  underline={false}
                  icon={IconHelper("mdi:dots-horizontal", 18)}
                  href="/#/work"
                >
                  查看更多
                </el-link>
              </div>
            </div>
          </el-container>
        </>
      );
    },
  });
</script>

<style lang="scss">
  .index-container {
    width: 100%;
    height: 100%;
    padding: 0 40px 0 40px;
    display: block;
    .top {
      display: flex;
      width: 100%;
      height: 350px;
      flex-wrap: wrap;
      .left {
        flex: 1;
        height: 100%;
        // border: 1px solid black;
        min-width: 600px;
        background-color: #fff;
        border-radius: 25px;
        margin-right: 40px;
        position: relative;
        .title {
          position: absolute;
          top: 8px;
          left: 20px;
        }
        .more {
          position: absolute;
          top: 15px;
          right: 24px;
          .el-icon {
            margin-right: 3px;
          }
        }
        .el-table {
          border-radius: 25px;
          margin-top: 40px;
        }
      }
      .right {
        height: 100%;
        width: 450px;
        min-width: 450px;
        // border: 1px solid black;
        background-color: #fff;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        .avatar {
          width: 100%;
          margin: 0 auto;
          text-align: center;
          margin-top: 20px;
          .el-avatar {
            box-shadow: 0 0 3px 3px #cfd5e3;
          }
        }
        .name {
          font-size: 25px;
          font-weight: 700;
          text-align: center;
          margin-top: 25px;
        }
        .infos {
          margin-top: 40px;
          display: flex;
          width: 100%;
          justify-content: space-around;
          .info {
            display: flex;
            width: 100%;
            flex-direction: column;
            text-align: center;
            cursor: pointer;
            &:nth-child(1) {
              color: #00c292;
            }
            &:nth-child(2) {
              color: #fec108;
            }
            &:nth-child(3) {
              color: #03a9f3;
            }
            .num {
              font-size: 25px;
              font-weight: 600;
            }
            .title {
              font-size: 14px;
              font-weight: 300;
              margin-top: 8px;
              color: #aa98ae;
            }
          }
        }
      }
    }
    .middle {
      height: 350px;
      width: 100%;
      margin-top: 20px;
      .inner {
        height: 100%;
        width: 100%;
        border-radius: 25px;
        background-color: #fff;
        position: relative;
        .title {
          position: absolute;
          top: 8px;
          left: 20px;
        }
        .more {
          position: absolute;
          top: 15px;
          right: 24px;
          .el-icon {
            margin-right: 3px;
          }
        }
      }
    }
  }
</style>
