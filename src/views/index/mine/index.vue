<template>
  <el-form label-width="120px" label-position="left" class="mine">
    <el-form-item label="用户头像">
      <el-upload
        class="avatar-uploader"
        action="http://hengistchan.site:8088/file"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :multiple="false"
        :headers="headers"
      >
        <el-image
          v-if="userInfo?.picture"
          :src="userInfo.picture"
          :style="{ width: '160px' }"
        ></el-image>
        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="用户昵称">
      <el-input v-model="userInfo.nickname" placeholder="请输入昵称"></el-input>
    </el-form-item>
    <el-form-item label="手机">
      <el-input v-model="userInfo.phone" placeholder="请输入手机"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="userInfo.gender">
        <el-radio-button :label="0">男</el-radio-button>
        <el-radio-button :label="1">女</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="button">
      <el-button type="primary" @click="handleClick">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import useUserStore from "@/store/user";
  import { Plus } from "@element-plus/icons-vue";
  import { UploadFile } from "element-plus/es/components/upload/src/upload.type";
  import User from "@/api/user";
  import message from "@/helper/message";
  import store from "store2";

  export default defineComponent({
    components: { Plus },
    setup() {
      const userStore = useUserStore();
      const userInfo = computed(() => userStore.userInfo);
      const token = `Bearer ${store("token")}`;
      const headers = new Headers();
      headers.append("Authorization", token);
      const handleAvatarSuccess = async (res: any, file: UploadFile) => {
        userInfo.value.picture = res[0].path;
        if (userInfo.value.picture) {
          const { error, message: errMsg } = await User.updateUserInfo({
            picture: userInfo.value.picture,
          });
          !error && message("success", "用户头像更新成功");
          error && message("error", errMsg);
        }
      };
      const beforeAvatarUpload = (file: UploadFile, fileList: UploadFile[]) => {
        return true;
      };
      const handleClick = async () => {
        const { error, message: errMsg } = await User.updateUserInfo({
          picture: userInfo.value.picture,
          nickname: userInfo.value.nickname,
          phone: userInfo.value.phone,
          gender: userInfo.value.gender,
        });
        !error && message("success", "更新成功");
        error && message("error", errMsg);
      };
      return {
        userInfo,
        handleAvatarSuccess,
        beforeAvatarUpload,
        headers,
        handleClick,
      };
    },
  });
</script>

<style lang="scss">
  .mine {
    width: 600px;
    margin: 0 auto;
    margin-top: 40px;
    .button {
      margin-top: 30px;
      .el-button {
        width: 90px;
      }
    }
    .avatar-uploader {
      position: relative;
      .el-image {
        position: relative;
        &:hover {
          &::before {
            content: "点击上传";
            display: block;
            position: absolute;
            color: #fff;
            left: calc(50% - 30px);
            top: calc(50% - 15px);
            z-index: 99999;
          }
          &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #000;
            width: 100%;
            height: 100%;
            opacity: 0.5;
          }
        }
      }
    }
    .el-form-item__label {
      font-size: 15px;
      font-weight: 600;
      color: black;
    }
  }
</style>
