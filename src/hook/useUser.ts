import User from "@/api/user";
import message from "@/helper/message";
import { useRouter } from "vue-router";
import useUserStore from "@/store/user";
import store from "store2";

const useUser = () => {
  const router = useRouter();
  const userStore = useUserStore();

  /**
   * 获取用户信息
   * @param toLoginPage 发生错误时是否重定向到登陆页
   * @returns void
   */
  const getUserInfo = async (toLoginPage: boolean) => {
    const data = await User.getUserInfo();
    if (data?.error) {
      message("error", "未登录或登录已过期");
      toLoginPage && router.replace("/user");
      return;
    }
    message("success", "欢迎回来！");
    userStore.userInfo = data;
  };

  /**
   * 退出登录
   */
  const logout = () => {
    store.clearAll();
    userStore.$reset();
    router.replace("/user");
  };

  return { getUserInfo, logout };
};

export default useUser;
