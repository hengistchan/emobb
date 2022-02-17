import _axios from "@/helper/request";

export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginVO {
  token: string;
}

export default class User {
  static login(loginDTO: LoginDTO) {
    return _axios.post<LoginVO>("/user/login", loginDTO);
  }
}
