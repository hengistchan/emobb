import { defineStore } from "pinia";
import { Nullable } from "types";

export interface UserInfo {
  email: string;
  gender: number;
  latest_login_time: string;
  nickname: string;
  picture: string;
  username: string;
  phone: string;
}

export interface UserState {
  userInfo: UserInfo;
}

const userStore = defineStore("user", {
  state: (): UserState => ({
    userInfo: {
      email: "",
      gender: 0,
      latest_login_time: "",
      nickname: "",
      phone: "",
      picture: "",
      username: "",
    },
  }),
});

export default userStore;
