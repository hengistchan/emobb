import _axios from "@/helper/request";
import { UserInfo } from "@/store/user";
import { CommonResp } from "types";

enum CodeAction {
  REGISTER = 0,
  RESET_PASSWORD = 1,
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginVO {
  token: string;
}

export interface RegisterDTO {
  username: string;
  password: string;
  confirm_password: string;
  email: string;
  code: string;
}

export interface ResetPasswordDTO {
  password: string;
  confirm_password: string;
  email: string;
  code: string;
}

export interface CodeDTO {
  email: string;
  action: CodeAction;
}

export interface updateDTO {
  nickname?: string;
  gender?: number;
  picture?: string;
  phone?: string;
}

export default class User {
  static login(loginDTO: LoginDTO) {
    return _axios.post<LoginVO>("/user/login", loginDTO);
  }

  static code(codeDTO: CodeDTO) {
    return _axios.post<CommonResp>("/user/code", codeDTO);
  }

  static register(registerDTO: RegisterDTO) {
    return _axios.post<CommonResp>("/user/register", registerDTO);
  }

  static getUserInfo() {
    return _axios.get<UserInfo>("/user");
  }

  static resetPassword(dto: ResetPasswordDTO) {
    return _axios.post<CommonResp>("/user/reset/password", dto);
  }

  static updateUserInfo(dto: updateDTO) {
    return _axios.put<CommonResp>("/user", dto);
  }
}
