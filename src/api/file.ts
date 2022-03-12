import _axios from "@/helper/request";

class File {
  static upload(data: FormData) {
    return _axios.post<{ path: string }[]>(`/file`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default File;
