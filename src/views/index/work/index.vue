<script lang="tsx">
  import { defineComponent, ref, onMounted } from "vue";
  import Work, { WorkDTO } from "@/api/work";
  import type { PageResp, Nullable } from "types";
  import { pageHelper } from "@/helper/index";
  import message from "@/helper/message";
  import { useRouter } from "vue-router";

  export default defineComponent({
    setup() {
      const data = ref<Nullable<PageResp<WorkDTO>>>(null);
      const search = ref<string>("");
      const page = pageHelper();
      const router = useRouter();
      const handleSearch = async () => {
        const { error, ...v } = await Work.getList(search.value, false, page);
        if (error) return;
        data.value = v;
      };
      const handleEdit = async (uuid: string) => {
        router.push("/editor?id=" + uuid);
      };
      onMounted(() => {
        handleSearch();
      });
      return () => (
        <>
          <el-container class="work-container">
            <el-form label-width={80} label-position="left" class="form">
              <el-form-item label="搜索">
                <el-input
                  v-model={search.value}
                  placeholder="请输入搜索内容, 回车键确认"
                  onChange={() => handleSearch()}
                  clearable={true}
                  onClear={() => handleSearch()}
                ></el-input>
              </el-form-item>
            </el-form>
            <el-table data={data.value?.items} class="table" stripe={true}>
              <el-table-column
                label="ID"
                prop="id"
                align="center"
              ></el-table-column>
              <el-table-column
                label="UUID"
                prop="uuid"
                align="center"
              ></el-table-column>
              <el-table-column
                label="标题"
                prop="title"
                align="center"
              ></el-table-column>
              <el-table-column
                label="封面"
                prop="cover_img"
                align="center"
              ></el-table-column>
              <el-table-column
                label="是否模板"
                prop="is_template"
                align="center"
              ></el-table-column>
              <el-table-column
                label="状态"
                prop="status"
                align="center"
              ></el-table-column>
              <el-table-column
                label="发布时间"
                prop="last_publish_time"
                align="center"
              ></el-table-column>
              <el-table-column label="操作" align="center">
                {{
                  default: (data: { row: WorkDTO }) => (
                    <el-button
                      type="primary"
                      onClick={() => handleEdit(data.row.uuid)}
                    >
                      编辑
                    </el-button>
                  ),
                }}
              </el-table-column>
            </el-table>
            <el-pagination
              class="pagination"
              background
              layout="prev, pager, next"
              total={data.value?.total ?? 0}
              v-model:page-size={page.count}
              onCurrentChange={(p: number) => {
                page.page = p;
                handleSearch();
              }}
            ></el-pagination>
          </el-container>
        </>
      );
    },
  });
</script>

<style lang="scss">
  .work-container {
    width: 85%;
    margin: 20px auto 0;
    flex-direction: column;
    justify-content: flex-start;
    .form {
      width: 400px;
      .el-input__suffix {
        align-items: center;
      }
    }
    .table {
      margin-top: 20px;
      .el-table__empty-block {
        height: 300px !important;
      }
    }
    .pagination {
      margin-top: 20px;
    }
  }
</style>