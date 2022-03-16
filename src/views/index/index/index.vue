<script lang="tsx">
  import { computed, defineComponent, onMounted, reactive, ref } from "vue";
  import useUserStore from "@/store/user";
  import IconHelper from "@/helper/IconHelper";
  import Work, { WorkDTO } from "@/api/work";
  import { dateFormat } from "@/helper";
  import { useRouter } from "vue-router";
  import { useQRCode } from "@vueuse/integrations/useQRCode";
  import { ElMessageBox } from "element-plus";
  import message from "@/helper/message";

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
      const templates = ref<(WorkDTO & { username: string })[]>([]);
      onMounted(async () => {
        const res = (await Work.getRecentWork(5)) as WorkDTO[];
        counts = await Work.getCount();
        templates.value = await Work.getTemplates();
        works.value = res;
      });
      const url = ref("");
      const qrcode = useQRCode(url);
      const handleClickTemplate = (uuid: string) => {
        ElMessageBox.confirm("确认使用该模板创建吗?", "创建页面", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
        })
          .then(async () => {
            const { error, ...data } = await Work.createWorkByTemplate(uuid);
            if (!error) {
              message("success", "创建成功");
              router.push("/editor?id=" + data.uuid);
            }
          })
          .catch(() => ({}));
      };
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
                  <el-table-column
                    label="发布时间"
                    align="center"
                    width="180px"
                  >
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
                {templates.value.map((item, index) => (
                  <el-card
                    class="inner-template__item"
                    shadow="hover"
                    onClick={() => handleClickTemplate(item.uuid)}
                    style={
                      index === 0
                        ? { marginLeft: "0px" }
                        : { marginLeft: "10px" }
                    }
                  >
                    <div class="inner-image">
                      <div
                        class="image"
                        style={{
                          backgroundImage: `url(${item.cover_img})`,
                        }}
                      ></div>
                    </div>
                    <div class="bottom">
                      <span>{item.title}</span>
                      <div class="copied_count">
                        <div class="name">作者：{item.username}</div>
                        <div class="count">
                          {IconHelper("mdi:account-outline")}
                          {item.copied_count}
                        </div>
                      </div>
                    </div>
                  </el-card>
                ))}
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
    width: 80%;
    height: 100%;
    // padding: 0 40px 0 40px;
    margin: 0 auto;
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
        width: 27%;
        // min-width: 450px;
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
      // height: 350px;
      width: 100%;
      margin-top: 20px;
      .inner {
        height: 100%;
        width: 100%;
        border-radius: 25px;
        background-color: #fff;
        position: relative;
        display: flex;
        justify-content: flex-start;
        padding: 40px 20px 40px 20px;
        align-items: stretch;
        flex-wrap: wrap;
        box-sizing: border-box;
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
        .inner-template__item {
          width: 300px;
          height: 380px;
          border-radius: 5px;
          cursor: pointer;
          position: relative;
          &:hover {
            &::before {
              content: "从该模板创建";
              display: block;
              width: 300px;
              height: 380px;
              position: absolute;
              top: 0;
              left: 0;
              color: rgb(243, 243, 243);
              font-size: 16px;
              font-weight: 600;
              line-height: 380px;
              text-align: center;
              background-color: rgba($color: #000000, $alpha: 0.5);
            }
          }
          .inner-image {
            height: 280px;
            .image {
              height: 100%;
              background-size: cover;
              background-position: 0 0;
            }
          }
          .bottom {
            padding: 10px 0 0 0;
            > span {
              height: 20px;
              line-height: 20px;
              font-size: 16px;
              color: #333;
              font-weight: 500;
            }
            .copied_count {
              display: flex;
              width: 100%;
              justify-content: space-between;
              margin-top: 18px;
              color: #999;
              font-size: 14px;
              .el-icon {
                vertical-align: bottom;
                margin-right: 3px;
              }
            }
          }
        }
      }
    }
  }
</style>
