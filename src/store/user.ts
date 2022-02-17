import { defineStore } from "pinia";
import { Nullable } from "types";

export interface UserInfo {
  email: Nullable<string>;
  gender: Nullable<number>;
  latest_login_time: Nullable<string>;
  nickname: Nullable<string>;
  picture: Nullable<string>;
  username: Nullable<string>;
  phone: Nullable<string>;
}

export interface UserState {
  userInfo: UserInfo;
}

const userStore = defineStore("user", {
  state: (): UserState => ({
    userInfo: {
      email: null,
      gender: null,
      latest_login_time: null,
      nickname: null,
      phone: null,
      picture: null,
      username: null,
    },
  }),
});

export default userStore;
