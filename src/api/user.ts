import _axios from "@/helper/request";

export default class User {
  static login() {
    return _axios.get<string>("/login");
  }
}
