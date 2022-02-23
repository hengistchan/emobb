import _axios from "@/helper/request";
import { Page } from "@/package/types/page";
import { CommonResp } from "types";

interface WorkDTO {
  id: number;
  uuid: string;
  title: string;
  description: string;
  user_id: number;
  cover_img: string;
  is_template: boolean;
  status: number;
  copied_count: number;
  last_publish_time: string;
  is_hot: boolean;
  is_publish: boolean;
}

interface WorkDetailDTO extends WorkDTO {
  page: Page;
}

interface WorkContent {
  page: Page;
}

class Work {
  static getByUUID(uuid: string) {
    return _axios.get<WorkDTO>(`/work/${uuid}`);
  }

  static getDetailByUUID(uuid: string) {
    return _axios.get<WorkDetailDTO>(`/work/detail/${uuid}`);
  }

  static saveWorkContent(uuid: string, data: WorkContent) {
    return _axios.put(`/work/content/${uuid}`, data);
  }
}

export default Work;
